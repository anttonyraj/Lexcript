import { z } from 'zod';
import type { Transcript } from '@lexcript/transcript';

export const SegmentRefSchema = z.object({
  segmentIndex: z.number().int().nonnegative(),
  charStart: z.number().int().nonnegative(),
  charEnd: z.number().int().nonnegative(),
});
export type SegmentRef = z.infer<typeof SegmentRefSchema>;

export const SummaryBulletSchema = z.object({
  text: z.string(),
  segmentRefs: z.array(SegmentRefSchema),
});
export type SummaryBullet = z.infer<typeof SummaryBulletSchema>;

export const InferredParticipantSchema = z.object({
  speakerId: z.string(),
  inferredRole: z.enum([
    'attorney',
    'deponent',
    'client',
    'witness',
    'opposing',
    'court_reporter',
    'judge',
    'other',
  ]),
  confidence: z.number().min(0).max(1),
});
export type InferredParticipant = z.infer<typeof InferredParticipantSchema>;

export const SummaryOutputSchema = z.object({
  bullets: z.array(SummaryBulletSchema),
  actionItems: z.array(z.string()),
  participants: z.array(InferredParticipantSchema),
});
export type SummaryOutput = z.infer<typeof SummaryOutputSchema>;

export const DraftTimeEntryOutputSchema = z.object({
  narrative: z.string().max(300),
  activityCode: z.string(), // e.g. "A106"
  taskCode: z.string().optional(), // e.g. "L110"
  confidence: z.number().min(0).max(1),
});
export type DraftTimeEntryOutput = z.infer<typeof DraftTimeEntryOutputSchema>;

// Phase 2 analyzers
export const InconsistencyAlertSchema = z.object({
  claimA: SegmentRefSchema,
  claimB: SegmentRefSchema,
  topic: z.string(),
  severity: z.enum(['low', 'medium', 'high']),
});
export type InconsistencyAlert = z.infer<typeof InconsistencyAlertSchema>;

export const DealTermSchema = z.object({
  kind: z.enum(['indemnity', 'liabilityCap', 'paymentTerm', 'deadline', 'verbalCommitment']),
  text: SegmentRefSchema,
  party: z.string(),
  confidence: z.number().min(0).max(1),
});
export type DealTerm = z.infer<typeof DealTermSchema>;

/**
 * Validates that all segment references in an intelligence output point to real,
 * existing characters in the stored transcript. Rejects hallucinated quotes.
 */
export function validateSegmentRefs(
  transcript: Transcript,
  refs: SegmentRef[]
): { valid: boolean; error?: string } {
  for (const ref of refs) {
    const seg = transcript.segments[ref.segmentIndex];
    if (!seg) {
      return {
        valid: false,
        error: `Segment index ${ref.segmentIndex} does not exist in transcript`,
      };
    }
    if (ref.charStart < 0 || ref.charEnd > seg.text.length || ref.charStart >= ref.charEnd) {
      return {
        valid: false,
        error: `Character offsets [${ref.charStart}, ${ref.charEnd}] out of bounds for segment ${ref.segmentIndex} (len: ${seg.text.length})`,
      };
    }
  }
  return { valid: true };
}

/**
 * Rule 1 Guard: Asserts that an object is not an LLM output being written into Transcript.segments.
 */
export function assertNotLlmSegment(segment: unknown): void {
  if (typeof segment === 'object' && segment !== null) {
    if ('isLlmGenerated' in segment || 'llmOutput' in segment) {
      throw new Error(
        'Rule 1 Violation: Transcript text must never be generated or overwritten by an LLM.'
      );
    }
  }
}
