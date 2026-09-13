export interface PmMatter {
  externalId: string;
  name: string;
  number: string;
  clientId: string;
  clientName: string;
  practiceArea?: string;
  responsibleAttorney?: string;
  status: 'open' | 'closed';
}

export interface PmContact {
  externalId: string;
  name: string;
  email?: string;
  phone?: string;
  type: 'client' | 'opposing_counsel' | 'witness' | 'expert' | 'other';
}

export interface ApprovedTimeEntry {
  id: string; // Lexcript entryId
  firmId: string;
  matterId: string;
  pmMatterExternalId: string;
  userId: string;
  date: string; // YYYY-MM-DD
  hours: number;
  rateUsd: number;
  amountUsd: number;
  narrative: string;
  activityCode?: string; // UTBMS e.g. A106
  taskCode?: string; // UTBMS e.g. L110
  approvedBy: string;
  approvedAt: string;
}

export interface PracticeManagementProvider {
  readonly id: 'clio' | 'mycase' | 'practicepanther' | 'mock';

  /** Initiates OAuth connection and returns authorization URL */
  connect(firmId: string): Promise<{ authorizeUrl: string }>;

  /** Handles OAuth callback and securely persists tokens */
  handleCallback(firmId: string, code: string): Promise<{ success: boolean; error?: string }>;

  /** Lists matters accessible in PM system */
  listMatters(firmId: string, query?: string): Promise<PmMatter[]>;

  /** Lists contacts accessible in PM system */
  listContacts(firmId: string, query?: string): Promise<PmContact[]>;

  /** Creates time entry in PM system (idempotent by Lexcript entry ID) */
  createTimeEntry(firmId: string, entry: ApprovedTimeEntry): Promise<{ externalId: string }>;

  /** Updates existing time entry in PM system */
  updateTimeEntry(firmId: string, externalId: string, entry: ApprovedTimeEntry): Promise<void>;
}
