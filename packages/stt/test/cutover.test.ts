import { describe, it, expect } from 'vitest';
import { resolveProvider, DEFAULT_BUDGET_CONFIG } from '../src/cutover.js';

describe('STT Metered Cutover Engine', () => {
  it('defaults to deepgram when spend is within budget', () => {
    const decision = resolveProvider({
      mode: 'prerecorded',
      cumulativeDeepgramSpendUsd: 50.0,
    });

    expect(decision.providerId).toBe('deepgram');
    expect(decision.isCutoverActive).toBe(false);
    expect(decision.isHardStopActive).toBe(false);
    expect(decision.alert).toBeUndefined();
  });

  it('triggers automatic cutover to soniox when spend hits cutoverAtUsd ($185)', () => {
    const decision = resolveProvider({
      mode: 'prerecorded',
      cumulativeDeepgramSpendUsd: 185.25,
    });

    expect(decision.providerId).toBe('soniox');
    expect(decision.isCutoverActive).toBe(true);
    expect(decision.isHardStopActive).toBe(false);
    expect(decision.alert).toBeDefined();
    expect(decision.alert?.type).toBe('stt_cutover');
    expect(decision.alert?.message).toContain('Deepgram credit nearly used');
  });

  it('honors provider override when under hardStopUsd ($198)', () => {
    // Normal case with override to soniox early
    const earlySoniox = resolveProvider({
      mode: 'prerecorded',
      cumulativeDeepgramSpendUsd: 10.0,
      providerOverride: 'soniox',
    });
    expect(earlySoniox.providerId).toBe('soniox');

    // Override to deepgram when cutover is active but under hard stop
    const forcedDeepgram = resolveProvider({
      mode: 'prerecorded',
      cumulativeDeepgramSpendUsd: 188.0,
      providerOverride: 'deepgram',
    });
    expect(forcedDeepgram.providerId).toBe('deepgram');
    expect(forcedDeepgram.isCutoverActive).toBe(true);
  });

  it('strictly enforces hard stop at $198 refusing deepgram even under override', () => {
    // Without override
    const hardStop = resolveProvider({
      mode: 'prerecorded',
      cumulativeDeepgramSpendUsd: 198.5,
    });
    expect(hardStop.providerId).toBe('soniox');
    expect(hardStop.isHardStopActive).toBe(true);
    expect(hardStop.alert?.type).toBe('stt_hard_stop');

    // With explicit deepgram override: must throw
    expect(() =>
      resolveProvider({
        mode: 'prerecorded',
        cumulativeDeepgramSpendUsd: 198.5,
        providerOverride: 'deepgram',
      })
    ).toThrow(/Deepgram hard stop reached/);
  });
});
