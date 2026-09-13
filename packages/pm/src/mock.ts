import type {
  PracticeManagementProvider,
  PmMatter,
  PmContact,
  ApprovedTimeEntry,
} from './types.js';

export class MockPmProvider implements PracticeManagementProvider {
  readonly id = 'mock' as const;

  private matters: Map<string, PmMatter[]> = new Map();
  private contacts: Map<string, PmContact[]> = new Map();
  private timeEntries: Map<string, ApprovedTimeEntry & { externalId: string }> = new Map();

  constructor() {
    // Seed sample test matters and contacts
    const defaultMatters: PmMatter[] = [
      {
        externalId: 'clio-mat-101',
        name: 'Apex Logistics Corp vs. BluePeak Global',
        number: '2026-CV-00412',
        clientId: 'clio-cli-501',
        clientName: 'Apex Logistics Corp',
        practiceArea: 'Commercial Litigation',
        responsibleAttorney: 'Arthur Sterling, Esq.',
        status: 'open',
      },
      {
        externalId: 'clio-mat-102',
        name: 'Estate of Eleanor Wright Planning',
        number: '2026-EP-0089',
        clientId: 'clio-cli-502',
        clientName: 'Eleanor Wright',
        practiceArea: 'Trusts & Estates',
        responsibleAttorney: 'Miriam Patel, Esq.',
        status: 'open',
      },
    ];

    const defaultContacts: PmContact[] = [
      {
        externalId: 'clio-cont-01',
        name: 'Jonathan Vance',
        email: 'jvance@apexlogistics.com',
        phone: '555-019-2834',
        type: 'client',
      },
      {
        externalId: 'clio-cont-02',
        name: 'David Rosenthal, Esq.',
        email: 'drosenthal@lawpartners.com',
        type: 'opposing_counsel',
      },
    ];

    this.matters.set('default', defaultMatters);
    this.contacts.set('default', defaultContacts);
  }

  async connect(firmId: string): Promise<{ authorizeUrl: string }> {
    return {
      authorizeUrl: `https://app.lexcript.com/api/pm/mock/oauth/authorize?firmId=${firmId}`,
    };
  }

  async handleCallback(_firmId: string, _code: string): Promise<{ success: boolean }> {
    return { success: true };
  }

  async listMatters(firmId: string, query?: string): Promise<PmMatter[]> {
    const list = this.matters.get(firmId) || this.matters.get('default') || [];
    if (!query) return list;
    const q = query.toLowerCase();
    return list.filter((m) => m.name.toLowerCase().includes(q) || m.number.toLowerCase().includes(q));
  }

  async listContacts(firmId: string, query?: string): Promise<PmContact[]> {
    const list = this.contacts.get(firmId) || this.contacts.get('default') || [];
    if (!query) return list;
    const q = query.toLowerCase();
    return list.filter((c) => c.name.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q));
  }

  async createTimeEntry(
    firmId: string,
    entry: ApprovedTimeEntry
  ): Promise<{ externalId: string }> {
    // Idempotency check: if entry already exists, return existing ID
    const existing = this.timeEntries.get(entry.id);
    if (existing) {
      return { externalId: existing.externalId };
    }

    const externalId = `mock-te-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    this.timeEntries.set(entry.id, { ...entry, externalId });

    return { externalId };
  }

  async updateTimeEntry(
    _firmId: string,
    externalId: string,
    entry: ApprovedTimeEntry
  ): Promise<void> {
    this.timeEntries.set(entry.id, { ...entry, externalId });
  }

  // Test inspection helper
  getStoredEntry(entryId: string) {
    return this.timeEntries.get(entryId);
  }
}
