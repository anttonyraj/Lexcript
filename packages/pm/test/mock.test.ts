import { describe, it, expect } from 'vitest';
import { MockPmProvider } from '../src/mock.js';

describe('MockPmProvider', () => {
  it('lists default matters and filters by query', async () => {
    const provider = new MockPmProvider();
    const matters = await provider.listMatters('firm-1');
    expect(matters.length).toBeGreaterThan(0);

    const filtered = await provider.listMatters('firm-1', 'Apex');
    expect(filtered.length).toBe(1);
    expect(filtered[0]?.name).toContain('Apex Logistics');
  });

  it('creates time entry idempotently', async () => {
    const provider = new MockPmProvider();
    const entry = {
      id: 'lex-entry-101',
      firmId: 'firm-1',
      matterId: 'mat-1',
      pmMatterExternalId: 'clio-mat-101',
      userId: 'user-1',
      date: '2026-09-12',
      hours: 0.4,
      rateUsd: 450,
      amountUsd: 180,
      narrative: 'Telephone conference with client regarding contract breach notice.',
      activityCode: 'A106',
      approvedBy: 'user-1',
      approvedAt: '2026-09-12T14:00:00Z',
    };

    const res1 = await provider.createTimeEntry('firm-1', entry);
    expect(res1.externalId).toBeDefined();

    // Re-submission with same ID returns existing external ID
    const res2 = await provider.createTimeEntry('firm-1', entry);
    expect(res2.externalId).toBe(res1.externalId);
  });
});
