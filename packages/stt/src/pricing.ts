import type { SttProviderId } from '@lexcript/shared';

/**
 * Published Pricing Table for Lexcript STT Providers
 *
 * Sources:
 * - Deepgram Nova-3:
 *   Base pre-recorded: $0.0043 / min
 *   Diarization add-on: $0.0030 / min
 *   Smart formatting: included
 *   Total Nova-3 diarized rate: $0.0073 - $0.0079 / min (Source: https://deepgram.com/pricing, 2025/2026)
 *
 * - Soniox Speech-to-Text:
 *   Standard transcription + diarization: $0.0040 / min
 *   (Source: https://soniox.com/pricing, 2025/2026)
 */

export interface ProviderPricing {
  basePerMinute: number;
  diarizationAddonPerMinute: number;
  currency: 'USD';
  source: string;
}

export const STT_PRICING: Record<SttProviderId, ProviderPricing> = {
  deepgram: {
    basePerMinute: 0.0049,
    diarizationAddonPerMinute: 0.003,
    currency: 'USD',
    source: 'Deepgram Nova-3 published pricing schedule (https://deepgram.com/pricing)',
  },
  soniox: {
    basePerMinute: 0.004,
    diarizationAddonPerMinute: 0.0, // Soniox bundles diarization in standard API
    currency: 'USD',
    source: 'Soniox API pricing schedule (https://soniox.com/pricing)',
  },
};

/**
 * Calculates estimated USD cost for an STT job.
 */
export function calculateEstimatedCost(
  providerId: SttProviderId,
  minutes: number,
  features: string[]
): number {
  const pricing = STT_PRICING[providerId];
  if (!pricing) {
    throw new Error(`Unknown pricing for provider: ${providerId}`);
  }

  let ratePerMinute = pricing.basePerMinute;
  if (features.includes('diarization')) {
    ratePerMinute += pricing.diarizationAddonPerMinute;
  }

  const cost = minutes * ratePerMinute;
  // Round to 4 decimal places
  return Math.round(cost * 10000) / 10000;
}
