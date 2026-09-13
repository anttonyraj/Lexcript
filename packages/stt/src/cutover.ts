import type { SttProviderId } from '@lexcript/shared';

export interface BudgetConfig {
  deepgram: {
    creditUsd: number;
    cutoverAtUsd: number;
    hardStopUsd: number;
  };
}

export const DEFAULT_BUDGET_CONFIG: BudgetConfig = {
  deepgram: {
    creditUsd: 200,
    cutoverAtUsd: 185,
    hardStopUsd: 198,
  },
};

export interface AdminAlert {
  id: string;
  type: 'stt_cutover' | 'stt_hard_stop';
  message: string;
  at: string;
  details: {
    spendUsd: number;
    thresholdUsd: number;
    activeProvider: SttProviderId;
  };
}

export interface CutoverDecision {
  providerId: SttProviderId;
  alert?: AdminAlert;
  isCutoverActive: boolean;
  isHardStopActive: boolean;
}

/**
 * Determines which STT provider to use based on cumulative Deepgram spend,
 * budget thresholds, and optional firm/environment overrides.
 *
 * Rules:
 * 1. If cumulative spend >= hardStopUsd ($198), Deepgram is strictly forbidden, even under override.
 * 2. If cumulative spend >= cutoverAtUsd ($185), default provider flips to 'soniox', and alert is generated.
 * 3. Environment or firm override ('deepgram' | 'soniox') is honored only if hardStopUsd has not been reached.
 */
export function resolveProvider(params: {
  firmId?: string;
  mode: 'prerecorded' | 'streaming';
  cumulativeDeepgramSpendUsd: number;
  providerOverride?: SttProviderId;
  budget?: BudgetConfig;
}): CutoverDecision {
  const { cumulativeDeepgramSpendUsd, providerOverride } = params;
  const budget = params.budget ?? DEFAULT_BUDGET_CONFIG;
  const { cutoverAtUsd, hardStopUsd } = budget.deepgram;

  const isHardStopActive = cumulativeDeepgramSpendUsd >= hardStopUsd;
  const isCutoverActive = cumulativeDeepgramSpendUsd >= cutoverAtUsd;

  // Hard stop reached: refuse Deepgram unconditionally
  if (isHardStopActive) {
    if (providerOverride === 'deepgram') {
      throw new Error(
        `Deepgram hard stop reached ($${cumulativeDeepgramSpendUsd.toFixed(2)} >= $${hardStopUsd.toFixed(2)}). Override rejected.`
      );
    }
    return {
      providerId: 'soniox',
      isCutoverActive: true,
      isHardStopActive: true,
      alert: {
        id: `alert-hardstop-${Date.now()}`,
        type: 'stt_hard_stop',
        message: `Deepgram hard stop reached ($${cumulativeDeepgramSpendUsd.toFixed(2)}). All transcriptions routed to Soniox.`,
        at: new Date().toISOString(),
        details: {
          spendUsd: cumulativeDeepgramSpendUsd,
          thresholdUsd: hardStopUsd,
          activeProvider: 'soniox',
        },
      },
    };
  }

  // If firm or environment override exists and hard stop is not reached, honor it
  if (providerOverride) {
    return {
      providerId: providerOverride,
      isCutoverActive,
      isHardStopActive: false,
    };
  }

  // Automatic cutover check
  if (isCutoverActive) {
    return {
      providerId: 'soniox',
      isCutoverActive: true,
      isHardStopActive: false,
      alert: {
        id: `alert-cutover-${Date.now()}`,
        type: 'stt_cutover',
        message: `Deepgram credit nearly used ($${cumulativeDeepgramSpendUsd.toFixed(2)} >= $${cutoverAtUsd.toFixed(2)}); new transcriptions now run on Soniox.`,
        at: new Date().toISOString(),
        details: {
          spendUsd: cumulativeDeepgramSpendUsd,
          thresholdUsd: cutoverAtUsd,
          activeProvider: 'soniox',
        },
      },
    };
  }

  // Under threshold: default to Deepgram launch credit
  return {
    providerId: 'deepgram',
    isCutoverActive: false,
    isHardStopActive: false,
  };
}
