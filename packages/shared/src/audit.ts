import { z } from 'zod';

export const AUDIT_ACTIONS = [
  'recording.create',
  'recording.upload_complete',
  'recording.transcribe_submit',
  'recording.transcribe_complete',
  'recording.audio_deleted',
  'recording.audio_retained',
  'recording.delete',
  'transcript.read',
  'transcript.export',
  'transcript.speaker_rename',
  'entry.create_draft',
  'entry.update',
  'entry.approve',
  'entry.sync_clio',
  'entry.void',
  'matter.create',
  'matter.delete',
  'matter.legal_hold_enable',
  'matter.legal_hold_disable',
  'stt.cutover_triggered',
  'stt.hard_stop_reached',
] as const;
export type AuditAction = (typeof AUDIT_ACTIONS)[number];

export const AuditEventSchema = z.object({
  id: z.string(),
  firmId: z.string(),
  actorUid: z.string(),
  action: z.enum(AUDIT_ACTIONS),
  objectType: z.enum(['recording', 'transcript', 'time_entry', 'matter', 'firm', 'stt']),
  objectId: z.string(),
  at: z.string(), // ISO8601
  ip: z.string(),
  ua: z.string(),
  hash: z.string().optional(), // SHA-256 for audio/transcript verification
  details: z.record(z.string(), z.unknown()).optional(),
});
export type AuditEvent = z.infer<typeof AuditEventSchema>;
