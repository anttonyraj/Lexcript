import { describe, it, expect } from 'vitest';
import { assertNotLlmSegment, validateSegmentRefs } from '../src/types.js';
import type { Transcript } from '@lexcript/transcript';

describe('Non-Negotiable Rule 1: Zero LLM Transcript Text', () => {
  it('throws an error if an LLM-marked object attempts to populate a transcript segment', () => {
    const invalidSegment = {
      isLlmGenerated: true,
      text: 'Hallucinated deposition testimony',
    };

    expect(() => assertNotLlmSegment(invalidSegment)).toThrow(
      /Rule 1 Violation: Transcript text must never be generated or overwritten by an LLM/
    );
  });

  it('validates segment references accurately against verbatim stored transcript', () => {
    const mockTranscript: Transcript = {
      id: 'rec-test-1',
      firmId: 'firm-1',
      matterId: 'mat-1',
      durationSec: 10,
      speakerMap: {},
      createdAt: new Date().toISOString(),
      engineVersions: { sttProvider: 'deepgram', sttModel: 'nova-3' },
      segments: [
        {
          id: 'seg-1',
          start: 0,
          end: 4,
          speakerId: 'S1',
          text: 'The vendor breached the software licensing agreement.',
          words: [],
        },
      ],
    };

    // Valid quote: "software licensing agreement" -> indices [24, 52]
    const validRefs = [{ segmentIndex: 0, charStart: 24, charEnd: 52 }];
    const resValid = validateSegmentRefs(mockTranscript, validRefs);
    expect(resValid.valid).toBe(true);

    // Invalid quote: out of bounds offset
    const invalidRefs = [{ segmentIndex: 0, charStart: 40, charEnd: 999 }];
    const resInvalid = validateSegmentRefs(mockTranscript, invalidRefs);
    expect(resInvalid.valid).toBe(false);
    expect(resInvalid.error).toContain('out of bounds');

    // Invalid segment index
    const missingSegRefs = [{ segmentIndex: 5, charStart: 0, charEnd: 10 }];
    const resMissing = validateSegmentRefs(mockTranscript, missingSegRefs);
    expect(resMissing.valid).toBe(false);
    expect(resMissing.error).toContain('does not exist in transcript');
  });
});
