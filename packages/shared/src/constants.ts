/**
 * Non-negotiable positioning disclaimer.
 * Rule 2: Never claim certification.
 */
export const DRAFT_DISCLAIMER =
  'DRAFT — not a certified transcript. Prepared by Lexcript for attorney work product.';

/**
 * All-Party Consent Jurisdictions (US States & Jurisdictions)
 * Ref: See /docs/consent-laws.md for statutory citations and analysis.
 * States where all parties to a confidential conversation must consent to recording.
 */
export const ALL_PARTY_CONSENT_STATES = [
  'CA', // Cal. Penal Code § 632
  'CT', // Conn. Gen. Stat. § 52-570d (phone conversations)
  'DE', // 11 Del. C. § 1335
  'FL', // Fla. Stat. § 934.03
  'IL', // 720 ILCS 5/14-2
  'MD', // Md. Code, Cts. & Jud. Proc. § 10-402
  'MA', // Mass. Gen. Laws ch. 272 § 99
  'MT', // Mont. Code Ann. § 45-8-213
  'NV', // Nev. Rev. Stat. § 200.620 / 200.650
  'NH', // N.H. Rev. Stat. Ann. § 570-A:2
  'OR', // Or. Rev. Stat. § 165.540 (in-person requires notification)
  'PA', // 18 Pa. Cons. Stat. § 5704
  'WA', // Wash. Rev. Code § 9.73.030
] as const;

export type AllPartyConsentState = (typeof ALL_PARTY_CONSENT_STATES)[number];

export function isAllPartyConsentState(state: string): boolean {
  return (ALL_PARTY_CONSENT_STATES as readonly string[]).includes(state.toUpperCase());
}

export const USER_ROLES = ['owner', 'attorney', 'paralegal', 'billing'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const RETENTION_POLICIES = [
  'discardAudioImmediately',
  'keepAudioDays',
  'keepUntilMatterClosed',
  'legalHold',
] as const;
export type RetentionPolicy = (typeof RETENTION_POLICIES)[number];

export const TRANSCRIPT_TYPES = [
  'meeting',
  'call',
  'interview',
  'deposition',
  'negotiation',
] as const;
export type TranscriptType = (typeof TRANSCRIPT_TYPES)[number];

export const RECORDING_KINDS = ['upload', 'live', 'bot'] as const;
export type RecordingKind = (typeof RECORDING_KINDS)[number];

export const RECORDING_STATUSES = [
  'uploading',
  'queued',
  'transcribing',
  'ready',
  'failed',
  'discarded',
] as const;
export type RecordingStatus = (typeof RECORDING_STATUSES)[number];

export const TIME_ENTRY_STATUSES = [
  'draft',
  'approved',
  'synced',
  'sync_failed',
  'voided',
] as const;
export type TimeEntryStatus = (typeof TIME_ENTRY_STATUSES)[number];

export const STT_PROVIDERS = ['deepgram', 'soniox'] as const;
export type SttProviderId = (typeof STT_PROVIDERS)[number];
