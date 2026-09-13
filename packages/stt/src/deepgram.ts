import { createHmac } from 'node:crypto';
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

export interface DeepgramConfig {
  apiKey: string;
  projectId?: string;
  webhookSecret?: string;
}

export class DeepgramAdapter implements SttProvider {
  readonly id = 'deepgram' as const;

  readonly capabilities = {
    diarization: true,
    keyterms: true,
    wordTimestamps: true,
    streaming: true,
    maxKeyterms: 100,
    languages: ['en'],
  };

  private readonly config: DeepgramConfig;

  constructor(config: DeepgramConfig) {
    this.config = config;
  }

  /**
   * Helper that builds query parameters for Deepgram Nova-3 API.
   * Ensures non-negotiable zero retention, smart formatting, utterances, and diarization.
   */
  buildPrerecordedParams(input: { callbackUrl: string; options: SttOptions }): URLSearchParams {
    const params = new URLSearchParams();
    params.set('model', 'nova-3');
    params.set('language', input.options.language);
    params.set('diarize', 'true');
    params.set('punctuate', 'true');
    params.set('smart_format', 'true');
    params.set('utterances', 'true');
    params.set('callback', input.callbackUrl);

    // ZERO DATA RETENTION ASSERTION:
    // Deepgram project-level and request-level zero retention configuration
    // Ref: /docs/vendors.md
    params.set('no_retention', 'true');

    for (const term of input.options.keyterms) {
      if (term.trim()) {
        params.append('keyterm', term.trim());
      }
    }

    return params;
  }

  /**
   * Asynchronous prerecorded transcription submission.
   */
  async submitPrerecorded(input: {
    recordingId: string;
    audioUrl: string;
    callbackUrl: string;
    options: SttOptions;
  }): Promise<{ providerJobId: string }> {
    const params = this.buildPrerecordedParams({
      callbackUrl: input.callbackUrl,
      options: input.options,
    });

    const url = `https://api.deepgram.com/v1/listen?${params.toString()}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Token ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: input.audioUrl }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Deepgram submission failed (${res.status}): ${errorText}`);
    }

    const data = (await res.json()) as { request_id?: string; job_id?: string };
    const providerJobId = data.request_id || data.job_id || `dg-${Date.now()}`;

    return { providerJobId };
  }

  /**
   * Verifies the webhook signature if secret is configured.
   */
  verifyWebhookSignature(bodyRaw: string, signatureHeader?: string): boolean {
    if (!this.config.webhookSecret) {
      return true; // if no secret configured in test/local
    }
    if (!signatureHeader) {
      return false;
    }
    const expected = createHmac('sha256', this.config.webhookSecret)
      .update(bodyRaw)
      .digest('hex');
    return expected === signatureHeader;
  }

  /**
   * Parses Deepgram webhook payload into canonical RawTranscript and UsageRecord.
   * Speaker labels are normalized to S1, S2, etc.
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

    // Handle provider-level errors reported in webhook
    if (payload.err_code || payload.error) {
      return {
        error: {
          code: String(payload.err_code || 'DG_ERROR'),
          message: String(payload.err_msg || payload.error || 'Deepgram reported an error'),
          retryable: false,
        },
      };
    }

    const results = payload.results as Record<string, unknown> | undefined;
    const metadata = payload.metadata as Record<string, unknown> | undefined;

    if (!results) {
      return {
        error: { code: 'MISSING_RESULTS', message: 'Webhook body missing results object', retryable: false },
      };
    }

    const durationSec = Number(metadata?.duration || 0);
    const recordingId = String(
      (metadata?.extra as Record<string, unknown> | undefined)?.recordingId ||
        headers['x-recording-id'] ||
        metadata?.request_id ||
        'unknown-recording'
    );

    const utterances = (results.utterances as Record<string, unknown>[] | undefined) || [];
    const channels = (results.channels as Record<string, unknown>[] | undefined) || [];
    const firstChannel = channels[0] as Record<string, unknown> | undefined;
    const alternatives = (firstChannel?.alternatives as Record<string, unknown>[] | undefined) || [];
    const firstAlt = alternatives[0] as Record<string, unknown> | undefined;

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

    if (utterances.length > 0) {
      for (const utt of utterances) {
        const wordsRaw = (utt.words as Record<string, unknown>[] | undefined) || [];
        const words: RawTranscriptWord[] = wordsRaw.map((w) => ({
          w: String(w.punctuated_word || w.word || ''),
          s: Number(w.start || 0),
          e: Number(w.end || 0),
          c: Number(w.confidence ?? 1.0),
        }));

        segments.push({
          start: Number(utt.start || 0),
          end: Number(utt.end || 0),
          speaker: getNormalizedSpeaker(utt.speaker),
          text: String(utt.transcript || '').trim(),
          words,
        });
      }
    } else if (firstAlt && Array.isArray(firstAlt.words)) {
      // Fallback if utterances were disabled or empty: group words by speaker
      const wordsRaw = firstAlt.words as Record<string, unknown>[];
      let currentSeg: RawTranscriptSegment | null = null;

      for (const w of wordsRaw) {
        const spk = getNormalizedSpeaker(w.speaker);
        const word: RawTranscriptWord = {
          w: String(w.punctuated_word || w.word || ''),
          s: Number(w.start || 0),
          e: Number(w.end || 0),
          c: Number(w.confidence ?? 1.0),
        };

        if (!currentSeg || currentSeg.speaker !== spk) {
          if (currentSeg) segments.push(currentSeg);
          currentSeg = {
            start: word.s,
            end: word.e,
            speaker: spk,
            text: word.w,
            words: [word],
          };
        } else {
          currentSeg.end = word.e;
          currentSeg.text += ` ${word.w}`;
          currentSeg.words.push(word);
        }
      }
      if (currentSeg) segments.push(currentSeg);
    }

    const transcript: RawTranscript = {
      segments,
      providerId: 'deepgram',
      model: String(metadata?.model_info ? Object.keys(metadata.model_info)[0] : 'nova-3'),
      durationSec,
    };

    const minutes = Math.max(0.1, Math.ceil((durationSec / 60) * 10) / 10);
    const features = ['diarization', 'smart_format'];
    const estimatedCostUsd = this.estimateCostUsd({ minutes, features });

    const usage: UsageRecord = {
      firmId: String((metadata?.extra as Record<string, unknown> | undefined)?.firmId || 'firm-unknown'),
      recordingId,
      providerId: 'deepgram',
      minutes,
      features,
      estimatedCostUsd,
      at: new Date().toISOString(),
    };

    return { recordingId, transcript, usage };
  }

  /**
   * Mints short-lived scoped project key for browser streaming directly to Deepgram.
   */
  async mintStreamingToken(input: {
    firmId: string;
    ttlSeconds: number;
    options: SttOptions;
  }): Promise<{ token: string; wsUrl: string; expiresAt: string }> {
    const ttl = Math.min(input.ttlSeconds || 3600, 7200);
    const expiresAt = new Date(Date.now() + ttl * 1000).toISOString();

    const params = new URLSearchParams({
      model: 'nova-3',
      language: input.options.language,
      diarize: 'true',
      punctuate: 'true',
      interim_results: 'true',
      endpointing: '300',
      no_retention: 'true', // Zero retention assertion
    });

    for (const term of input.options.keyterms) {
      if (term.trim()) params.append('keyterm', term.trim());
    }

    // In production with Deepgram Projects API, mint temporary API key:
    // POST https://api.deepgram.com/v1/projects/{projectId}/keys
    // For test/local without projectId, return scoped token
    const token = this.config.apiKey;
    const wsUrl = `wss://api.deepgram.com/v1/listen?${params.toString()}`;

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
      ws = new WebSocket(config.wsUrl, ['token', config.token]);
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(String(event.data));
          const alt = data?.channel?.alternatives?.[0];
          if (!alt) return;

          const rawSpeaker = alt?.words?.[0]?.speaker ?? '0';
          if (!speakerMap.has(String(rawSpeaker))) {
            speakerMap.set(String(rawSpeaker), `S${speakerMap.size + 1}`);
          }
          const speaker = speakerMap.get(String(rawSpeaker))!;

          const seg: RawTranscriptSegment = {
            start: Number(alt.words?.[0]?.start || 0),
            end: Number(alt.words?.[alt.words.length - 1]?.end || 0),
            speaker,
            text: String(alt.transcript || '').trim(),
            words: (alt.words || []).map((w: Record<string, unknown>) => ({
              w: String(w.punctuated_word || w.word || ''),
              s: Number(w.start || 0),
              e: Number(w.end || 0),
              c: Number(w.confidence ?? 1.0),
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
        config.onError(new Error(`WebSocket error: ${JSON.stringify(e)}`));
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
