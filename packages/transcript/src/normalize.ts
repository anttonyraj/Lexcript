import type { RawTranscript } from '@lexcript/stt';
import type { Transcript, TranscriptSegment, SpeakerMetadata } from './model.js';

/**
 * Normalizes a raw STT provider transcript into Lexcript's canonical Transcript model.
 * Assigns deterministic segment IDs and initializes the default speaker map.
 */
export function normalizeRawTranscript(input: {
  recordingId: string;
  firmId: string;
  matterId: string;
  raw: RawTranscript;
}): Transcript {
  const { recordingId, firmId, matterId, raw } = input;

  const speakerMap: Record<string, SpeakerMetadata> = {};

  const segments: TranscriptSegment[] = raw.segments.map((seg, idx) => {
    if (!speakerMap[seg.speaker]) {
      speakerMap[seg.speaker] = {
        label: seg.speaker,
        role: 'other',
      };
    }

    return {
      id: `${recordingId}-seg-${idx + 1}`,
      start: seg.start,
      end: seg.end,
      speakerId: seg.speaker,
      text: seg.text,
      words: seg.words.map((w) => ({
        word: w.w,
        start: w.s,
        end: w.e,
        confidence: w.c,
      })),
    };
  });

  return {
    id: recordingId,
    firmId,
    matterId,
    segments,
    speakerMap,
    durationSec: raw.durationSec,
    engineVersions: {
      sttProvider: raw.providerId,
      sttModel: raw.model,
    },
    createdAt: new Date().toISOString(),
  };
}
