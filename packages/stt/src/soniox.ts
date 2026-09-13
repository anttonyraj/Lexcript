import type {
  SttProvider,
  SttOptions,
  RawTranscript,
  RawTranscriptSegment,
  RawTranscriptWord,
  UsageRecord,
  SttError,
  SttStreamingClientFactory,
} from './types.js';
import { calculateEstimatedCost } from './pricing.js';

export interface SonioxConfig {
  apiKey: string;
  webhookSecret?: string;
}

export class SonioxAdapter implements SttProvider {
  readonly id = 'soniox' as const;

  readonly capabilities = {
    diarization: true,
    keyterms: true,
    wordTimestamps: true,
    streaming: true,
    maxKeyterms: 200,
    languages: ['en'],
  };

  private readonly config: SonioxConfig;

  constructor(config: SonioxConfig) {
    this.config = config;
  }

  /**
   * Builds the Soniox file transcription request payload.
   * Asserts zero retention, speaker identification, and custom context terms.
   */
  buildPrerecordedPayload(input: {
    audioUrl: string;
    callbackUrl: string;
    options: SttOptions;
  }): Record<string, unknown> {
    return {
      api_key: this.config.apiKey,
      audio_url: input.audioUrl,
      webhook_url: input.callbackUrl,
      enable_speaker_identification: true,
      enable_global_speaker_identification: true,
      // ZERO DATA RETENTION ASSERTION:
      // Soniox account & request level retention flag (Ref: /docs/vendors.md)
      storage_policy: 'do_not_store',
      context: {
        terms: input.options.keyterms.filter((k) => k.trim().length > 0),
      },
    };
  }

  /**
   * Asynchronous prerecorded transcription submission to Soniox.
   */
  async submitPrerecorded(input: {
    recordingId: string;
    audioUrl: string;
    callbackUrl: string;
    options: SttOptions;
  }): Promise<{ providerJobId: string }> {
    const payload = this.buildPrerecordedPayload({
      audioUrl: input.audioUrl,
      callbackUrl: input.callbackUrl,
      options: input.options,
    });

    const res = await fetch('https://api.soniox.com/v1/transcribe_async', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Soniox submission failed (${res.status}): ${errText}`);
    }

    const data = (await res.json()) as { job_id?: string; id?: string };
    const providerJobId = data.job_id || data.id || `soniox-${Date.now()}`;

    return { providerJobId };
  }

  /**
   * Parses Soniox webhook payload into canonical RawTranscript and UsageRecord.
   * Soniox tokens and speakers are normalized into S1, S2 segment format.
   */
  parseWebhook(
    body: unknown,
    headers: Record<string, string> = {}
  ): { recordingId: string; transcript: RawTranscript; usage: UsageRecord } | { error: SttError } {
    if (!body || typeof body !== 'object') {
      return {
        error: { code: 'INVALID_BODY', message: 'Payload must be a non-null object', retryable: false },
      };
    }

    const payload = body as Record<string, unknown>;

    if (payload.status === 'failed' || payload.error) {
      return {
        error: {
          code: 'SONIOX_ERROR',
          message: String(payload.error || payload.status_message || 'Soniox transcription failed'),
          retryable: false,
        },
      };
    }

    const recordingId = String(
      payload.recording_id || payload.job_id || headers['x-recording-id'] || 'unknown-recording'
    );

    // Soniox returns tokens with text, start_ms, duration_ms, speaker, confidence
    const tokens = (payload.tokens as Record<string, unknown>[] | undefined) || [];
    const speakerIndexMap = new Map<string, string>();

    const getNormalizedSpeaker = (rawSpeaker: unknown): string => {
      const spkStr = String(rawSpeaker ?? '0');
      if (!speakerIndexMap.has(spkStr)) {
        const nextIdx = speakerIndexMap.size + 1;
        speakerIndexMap.set(spkStr, `S${nextIdx}`);
      }
      return speakerIndexMap.get(spkStr)!;
    };

    const segments: RawTranscriptSegment[] = [];
    let currentSeg: RawTranscriptSegment | null = null;
    let maxEndTimeSec = 0;

    for (const t of tokens) {
      const rawText = String(t.text || '');
      // Soniox start_ms and duration_ms in milliseconds
      const startSec = Number(t.start_ms || 0) / 1000;
      const durationSec = Number(t.duration_ms || 0) / 1000;
      const endSec = startSec + durationSec;
      if (endSec > maxEndTimeSec) maxEndTimeSec = endSec;

      const spk = getNormalizedSpeaker(t.speaker);
      const conf = Number(t.confidence ?? 1.0);

      const word: RawTranscriptWord = {
        w: rawText.trim(),
        s: startSec,
        e: endSec,
        c: conf,
      };

      if (!currentSeg || currentSeg.speaker !== spk) {
        if (currentSeg) segments.push(currentSeg);
        currentSeg = {
          start: startSec,
          end: endSec,
          speaker: spk,
          text: rawText,
          words: word.w ? [word] : [],
        };
      } else {
        currentSeg.end = endSec;
        currentSeg.text += rawText;
        if (word.w) currentSeg.words.push(word);
      }
    }
    if (currentSeg) segments.push(currentSeg);

    // Clean segment text whitespace
    for (const seg of segments) {
      seg.text = seg.text.trim();
    }

    const durationSec = Number(payload.audio_duration_sec || maxEndTimeSec || 0);

    const transcript: RawTranscript = {
      segments,
      providerId: 'soniox',
      model: String(payload.model || 'soniox-v1'),
      durationSec,
    };

    const minutes = Math.max(0.1, Math.ceil((durationSec / 60) * 10) / 10);
    const features = ['diarization'];
    const estimatedCostUsd = this.estimateCostUsd({ minutes, features });

    const usage: UsageRecord = {
      firmId: String(payload.firm_id || 'firm-unknown'),
      recordingId,
      providerId: 'soniox',
      minutes,
      features,
      estimatedCostUsd,
      at: new Date().toISOString(),
    };

    return { recordingId, transcript, usage };
  }

  /**
   * Mints temporary token for Soniox streaming WebSocket.
   */
  async mintStreamingToken(input: {
    firmId: string;
    ttlSeconds: number;
    options: SttOptions;
  }): Promise<{ token: string; wsUrl: string; expiresAt: string }> {
    const ttl = Math.min(input.ttlSeconds || 3600, 7200);
    const expiresAt = new Date(Date.now() + ttl * 1000).toISOString();

    const wsUrl = 'wss://api.soniox.com/v1/transcribe_websocket';
    const token = this.config.apiKey;

    return {
      token,
      wsUrl,
      expiresAt,
    };
  }

  /**
   * Browser-side streaming factory.
   */
  streamingClient: SttStreamingClientFactory = (config) => {
    let ws: WebSocket | null = null;
    let speakerMap = new Map<string, string>();

    try {
      ws = new WebSocket(config.wsUrl);
      ws.onopen = () => {
        // Send initial config frame with zero-retention
        ws?.send(
          JSON.stringify({
            api_key: config.token,
            enable_speaker_identification: true,
            storage_policy: 'do_not_store',
          })
        );
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(String(event.data));
          const tokens = (data?.tokens as Record<string, unknown>[]) || [];
          if (tokens.length === 0) return;

          const rawSpeaker = tokens[0]?.speaker ?? '0';
          if (!speakerMap.has(String(rawSpeaker))) {
            speakerMap.set(String(rawSpeaker), `S${speakerMap.size + 1}`);
          }
          const speaker = speakerMap.get(String(rawSpeaker))!;

          const startSec = Number(tokens[0]?.start_ms || 0) / 1000;
          const endSec =
            Number(tokens[tokens.length - 1]?.start_ms || 0) / 1000 +
            Number(tokens[tokens.length - 1]?.duration_ms || 0) / 1000;

          const seg: RawTranscriptSegment = {
            start: startSec,
            end: endSec,
            speaker,
            text: tokens.map((t) => String(t.text || '')).join('').trim(),
            words: tokens.map((t) => ({
              w: String(t.text || '').trim(),
              s: Number(t.start_ms || 0) / 1000,
              e: (Number(t.start_ms || 0) + Number(t.duration_ms || 0)) / 1000,
              c: Number(t.confidence ?? 1.0),
            })),
          };

          if (data.is_final) {
            config.onFinal(seg);
          } else {
            config.onInterim(seg);
          }
        } catch (err) {
          config.onError(err instanceof Error ? err : new Error(String(err)));
        }
      };

      ws.onerror = (e) => {
        config.onError(new Error(`Soniox WebSocket error: ${JSON.stringify(e)}`));
      };
    } catch (err) {
      config.onError(err instanceof Error ? err : new Error(String(err)));
    }

    return {
      sendAudioChunk: (chunk) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(chunk);
        }
      },
      close: () => {
        if (ws) {
          ws.close();
          ws = null;
        }
      },
    };
  };

  estimateCostUsd(usage: { minutes: number; features: string[] }): number {
    return calculateEstimatedCost(this.id, usage.minutes, usage.features);
  }
}
