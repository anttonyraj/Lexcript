import { describe, it, expect } from 'vitest';
import { calculateBillableHours } from '../src/rounding.js';

describe('Billable Hours Rounding Engine', () => {
  it('rounds 20-minute client call up to 0.4h (4 increments of 6 min)', () => {
    // 20 minutes = 1200 seconds -> 0.333h -> rounded up to 0.4h
    const hours = calculateBillableHours(1200);
    expect(hours).toBe(0.4);
  });

  it('enforces 0.1h minimum for very brief calls', () => {
    // 30 seconds -> rounds up to 0.1h
    const hours = calculateBillableHours(30);
    expect(hours).toBe(0.1);
  });

  it('handles exact 6-minute boundaries accurately', () => {
    // 6 minutes = 360 seconds -> 0.1h
    expect(calculateBillableHours(360)).toBe(0.1);
    // 12 minutes = 720 seconds -> 0.2h
    expect(calculateBillableHours(720)).toBe(0.2);
    // 18 minutes = 1080 seconds -> 0.3h
    expect(calculateBillableHours(1080)).toBe(0.3);
  });

  it('supports round-to-nearest when configured by firm', () => {
    // 7 minutes (420s) -> 0.116h -> rounds to 0.1h if nearest
    expect(calculateBillableHours(420, { rule: 'nearest' })).toBe(0.1);
    // 10 minutes (600s) -> 0.166h -> rounds to 0.2h if nearest
    expect(calculateBillableHours(600, { rule: 'nearest' })).toBe(0.2);
  });

  it('supports custom minimum hours (e.g. 0.2h minimum)', () => {
    expect(calculateBillableHours(120, { minimumHours: 0.2 })).toBe(0.2);
  });
});
