import { z } from 'zod';
import {
  USER_ROLES,
  RETENTION_POLICIES,
  TRANSCRIPT_TYPES,
  RECORDING_KINDS,
  RECORDING_STATUSES,
  TIME_ENTRY_STATUSES,
  STT_PROVIDERS,
} from './constants.js';

export const FirmSettingsSchema = z.object({
  roundingIncrement: z.number().default(0.1),
  roundingRule: z.enum(['up', 'nearest']).default('up'),
  minimumHours: z.number().default(0.1),
  defaultRetention: z.enum(RETENTION_POLICIES).default('discardAudioImmediately'),
  allPartyConsentReminder: z.boolean().default(true),
  sttProviderOverride: z.enum(STT_PROVIDERS).optional(),
});
export type FirmSettings = z.infer<typeof FirmSettingsSchema>;

export const FirmSchema = z.object({
  id: z.string(),
  name: z.string(),
  state: z.string().length(2),
  plan: z.enum(['trial', 'solo', 'firm']).default('trial'),
  createdAt: z.string(),
  settings: FirmSettingsSchema,
  encryption: z.object({
    wrappedDataKey: z.string(), // base64 payload
  }),
  pm: z.object({
    provider: z.enum(['clio', 'mycase', 'practicepanther', 'mock']).nullable(),
    connectedAt: z.string().nullable(),
    tokensEnc: z.string().nullable(), // encrypted tokens
    lastSyncAt: z.string().nullable(),
  }),
});
export type Firm = z.infer<typeof FirmSchema>;

export const FirmUserSchema = z.object({
  uid: z.string(),
  firmId: z.string(),
  role: z.enum(USER_ROLES),
  name: z.string(),
  email: z.string().email(),
  defaultRateUsd: z.number().nonnegative(),
  barState: z.string().length(2).optional(),
  createdAt: z.string(),
});
export type FirmUser = z.infer<typeof FirmUserSchema>;

export const ClientSchema = z.object({
  id: z.string(),
  firmId: z.string(),
  nameEnc: z.string(), // encrypted
  pmExternalId: z.string().optional(),
  contactsEnc: z.array(z.string()).default([]), // encrypted list of contact blobs
  createdAt: z.string(),
});
export type Client = z.infer<typeof ClientSchema>;

export const MatterParticipantSchema = z.object({
  nameEnc: z.string(),
  role: z.enum(['attorney', 'client', 'witness', 'opposing', 'court_reporter', 'judge', 'other']),
});
export type MatterParticipant = z.infer<typeof MatterParticipantSchema>;

export const MatterRetentionSchema = z.object({
  policy: z.enum(RETENTION_POLICIES),
  keepAudioDays: z.number().optional(),
  legalHold: z.boolean().default(false),
});
export type MatterRetention = z.infer<typeof MatterRetentionSchema>;

export const MatterSchema = z.object({
  id: z.string(),
  firmId: z.string(),
  clientId: z.string(),
  nameEnc: z.string(),
  numberEnc: z.string(),
  practiceArea: z.string(),
  type: z.enum(['litigation', 'transactional', 'family', 'pi', 'other']),
  responsibleUid: z.string(),
  participants: z.array(MatterParticipantSchema).default([]),
  keyterms: z.array(z.string()).default([]), // encrypted strings or term tokens
  retention: MatterRetentionSchema,
  pmExternalId: z.string().optional(),
  status: z.enum(['open', 'closed']).default('open'),
  createdAt: z.string(),
});
export type Matter = z.infer<typeof MatterSchema>;

export const RecordingSchema = z.object({
  id: z.string(),
  firmId: z.string(),
  matterId: z.string(),
  createdBy: z.string(),
  kind: z.enum(RECORDING_KINDS),
  transcriptType: z.enum(TRANSCRIPT_TYPES),
  durationSec: z.number().nonnegative().default(0),
  clientSha256: z.string(),
  serverSha256: z.string().optional(),
  consentConfirmed: z.boolean(),
  consentConfirmedBy: z.string(),
  consentNote: z.string().optional(),
  status: z.enum(RECORDING_STATUSES),
  stt: z.object({
    providerId: z.enum(STT_PROVIDERS),
    model: z.string(),
    jobId: z.string().optional(),
    submittedAt: z.string().optional(),
    completedAt: z.string().optional(),
    usageId: z.string().optional(),
  }),
  audio: z.object({
    stagingBlobPath: z.string().optional(),
    retainedBlobPath: z.string().optional(),
    retainedEnc: z.boolean().default(false),
    deletedAt: z.string().optional(),
  }),
  transcriptRef: z.string().optional(),
  createdAt: z.string(),
});
export type Recording = z.infer<typeof RecordingSchema>;

export const TranscriptDocSchema = z.object({
  recordingId: z.string(),
  firmId: z.string(),
  matterId: z.string(),
  segmentsEnc: z.string(), // encrypted JSON of canonical segments
  speakerMap: z.record(
    z.string(),
    z.object({
      labelEnc: z.string(),
      role: z.enum(['attorney', 'deponent', 'client', 'witness', 'opposing', 'court_reporter', 'judge', 'other']),
      inferredByAi: z.boolean().optional(),
    })
  ),
  summaryEnc: z.string().optional(), // encrypted JSON of TranscriptSummary
  version: z.number().default(1),
  engineVersions: z.object({
    stt: z.string(),
    intelligence: z.string().optional(),
  }),
  createdAt: z.string(),
});
export type TranscriptDoc = z.infer<typeof TranscriptDocSchema>;

export const TimeEntrySchema = z.object({
  id: z.string(),
  firmId: z.string(),
  matterId: z.string(),
  recordingIds: z.array(z.string()),
  uid: z.string(),
  date: z.string(), // YYYY-MM-DD
  hours: z.number().positive(),
  rateUsd: z.number().nonnegative(),
  amountUsd: z.number().nonnegative(),
  activityCode: z.string(), // UTBMS e.g. A106
  taskCode: z.string().optional(), // UTBMS e.g. L110
  narrativeEnc: z.string(),
  draftNarrativeEnc: z.string().optional(),
  status: z.enum(TIME_ENTRY_STATUSES).default('draft'),
  approvedBy: z.string().optional(),
  approvedAt: z.string().optional(),
  pmExternalId: z.string().optional(),
  syncError: z.string().optional(),
  createdAt: z.string(),
});
export type TimeEntry = z.infer<typeof TimeEntrySchema>;

export const UsageDocSchema = z.object({
  id: z.string(),
  firmId: z.string(),
  recordingId: z.string(),
  providerId: z.enum(STT_PROVIDERS),
  minutes: z.number().nonnegative(),
  features: z.array(z.string()),
  estimatedCostUsd: z.number().nonnegative(),
  at: z.string(),
});
export type UsageDoc = z.infer<typeof UsageDocSchema>;

export const BudgetConfigSchema = z.object({
  deepgram: z.object({
    creditUsd: z.number().default(200),
    cutoverAtUsd: z.number().default(185),
    hardStopUsd: z.number().default(198),
  }),
});
export type BudgetConfig = z.infer<typeof BudgetConfigSchema>;
