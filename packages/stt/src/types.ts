import type { SttProviderId } from '@lexcript/shared';

export interface SttOptions {
  language: 'en';
  diarize: true;
  punctuate: true;
  wordTimestamps: true;
  keyterms: string[]; // case captions, party names, statute cites
}

export interface RawTranscriptWord {
  w: string;
  s: number; // start time in seconds
  e: number; // end time in seconds
  c: number; // confidence 0.0 - 1.0
}

export interface RawTranscriptSegment {
  start: number;
  end: number;
  speaker: string; // normalized e.g., "S1", "S2"
  text: string;
  words: RawTranscriptWord[];
}

export interface RawTranscript {
  segments: RawTranscriptSegment[];
  providerId: SttProviderId;
  model: string;
  durationSec: number;
}

export interface UsageRecord {
  firmId: string;
  recordingId: string;
  providerId: SttProviderId;
  minutes: number;
  features: string[];
  estimatedCostUsd: number;
  at: string;
}

export interface SttError {
  code: string;
  message: string;
  retryable: boolean;
}

export type SttStreamingClientFactory = (config: {
  wsUrl: string;
  token: string;
  onInterim: (segment: RawTranscriptSegment) => void;
  onFinal: (segment: RawTranscriptSegment) => void;
  onError: (error: Error) => void;
}) => {
  sendAudioChunk: (chunk: ArrayBuffer | Blob) => void;
  close: () => void;
};

export interface SttProvider {
  readonly id: SttProviderId;

  /** Async transcription of a file the provider fetches by signed URL; result arrives on webhook. */
  submitPrerecorded(input: {
    recordingId: string;
    audioUrl: string;
    callbackUrl: string;
    options: SttOptions;
  }): Promise<{ providerJobId: string }>;

  /** Parse a provider webhook body into our canonical Transcript. Must be pure. */
  parseWebhook(
    body: unknown,
    headers: Record<string, string>
  ): { recordingId: string; transcript: RawTranscript; usage: UsageRecord } | { error: SttError };

  /** Short-lived credential so the browser can open a streaming session directly with the provider. */
  mintStreamingToken(input: {
    firmId: string;
    ttlSeconds: number;
    options: SttOptions;
  }): Promise<{ token: string; wsUrl: string; expiresAt: string }>;

  /** Browser-side adapter factory */
  streamingClient: SttStreamingClientFactory;

  capabilities: {
    diarization: boolean;
    keyterms: boolean;
    wordTimestamps: boolean;
    streaming: boolean;
    maxKeyterms: number;
    languages: string[];
  };

  estimateCostUsd(usage: { minutes: number; features: string[] }): number;
}
