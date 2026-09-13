import type { RoundingConfig } from './types.js';

export const DEFAULT_ROUNDING_CONFIG: RoundingConfig = {
  increment: 0.1, // 6-minute increment
  rule: 'up',
  minimumHours: 0.1,
};

/**
 * Converts a duration in seconds into billable hours according to firm rounding policy.
 * Defaults to rounding up to the next 0.1h (6-minute block) with a 0.1h minimum.
 */
export function calculateBillableHours(
  durationSec: number,
  config: Partial<RoundingConfig> = {}
): number {
  const { increment, rule, minimumHours } = { ...DEFAULT_ROUNDING_CONFIG, ...config };

  if (durationSec <= 0) {
    return 0;
  }

  const rawHours = durationSec / 3600;

  let roundedHours: number;
  if (rule === 'up') {
    roundedHours = Math.ceil(rawHours / increment) * increment;
  } else {
    roundedHours = Math.round(rawHours / increment) * increment;
  }

  // Apply firm minimum
  const finalHours = Math.max(roundedHours, minimumHours);

  // Return formatted to 1 decimal place (e.g. 0.1, 0.4)
  return Math.round(finalHours * 10) / 10;
}
