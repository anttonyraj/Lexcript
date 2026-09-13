import type { SttProviderId } from '@lexcript/shared';

export interface TranscriptWord {
  word: string;
  start: number; // seconds
  end: number; // seconds
  confidence: number;
}

export interface TranscriptSegment {
  id: string;
  start: number;
  end: number;
  speakerId: string; // S1, S2, etc.
  text: string;
  words: TranscriptWord[];
}

export interface SpeakerMetadata {
  label: string; // e.g. "MR. ANDERSON (Deponent)"
  role:
    | 'attorney'
    | 'deponent'
    | 'client'
    | 'witness'
    | 'opposing'
    | 'court_reporter'
    | 'judge'
    | 'other';
  inferredByAi?: boolean;
}

export interface TranscriptSummaryBullet {
  text: string;
  segmentRefs: {
    segmentIndex: number;
    charStart: number;
    charEnd: number;
  }[];
}

export interface TranscriptSummary {
  bullets: TranscriptSummaryBullet[];
  actionItems: string[];
  participants: { speakerId: string; inferredRole: string; confidence: number }[];
}

export interface Transcript {
  id: string; // recordingId
  firmId: string;
  matterId: string;
  segments: TranscriptSegment[];
  speakerMap: Record<string, SpeakerMetadata>;
  summary?: TranscriptSummary;
  durationSec: number;
  engineVersions: {
    sttProvider: SttProviderId;
    sttModel: string;
    intelligenceModel?: string;
  };
  createdAt: string;
}
