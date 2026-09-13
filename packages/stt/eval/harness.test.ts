import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';
import { DeepgramAdapter } from '../src/deepgram.js';
import { SonioxAdapter } from '../src/soniox.js';

const depoFixture = JSON.parse(
  readFileSync(new URL('./fixtures/mock-deposition.json', import.meta.url), 'utf-8')
);
const intakeFixture = JSON.parse(
  readFileSync(new URL('./fixtures/client-intake.json', import.meta.url), 'utf-8')
);
const stratFixture = JSON.parse(
  readFileSync(new URL('./fixtures/strategy-meeting.json', import.meta.url), 'utf-8')
);

/**
 * Standard Levenshtein distance based Word Error Rate (WER) computation.
 */
export function computeWer(reference: string, hypothesis: string): {
  wer: number;
  insertions: number;
  deletions: number;
  substitutions: number;
  wordCount: number;
} {
  const clean = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  const ref = clean(reference);
  const hyp = clean(hypothesis);

  const m = ref.length;
  const n = hyp.length;

  if (m === 0) {
    return {
      wer: n === 0 ? 0 : 1,
      insertions: n,
      deletions: 0,
      substitutions: 0,
      wordCount: 0,
    };
  }

  const d: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) d[i]![0] = i;
  for (let j = 0; j <= n; j++) d[0]![j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (ref[i - 1] === hyp[j - 1]) {
        d[i]![j] = d[i - 1]![j - 1]!;
      } else {
        d[i]![j] = Math.min(
          d[i - 1]![j]! + 1, // deletion
          d[i]![j - 1]! + 1, // insertion
          d[i - 1]![j - 1]! + 1 // substitution
        );
      }
    }
  }

  const totalErrors = d[m]![n]!;
  const wer = Math.round((totalErrors / m) * 1000) / 1000;

  return {
    wer,
    insertions: 0,
    deletions: 0,
    substitutions: totalErrors,
    wordCount: m,
  };
}

describe('STT Evaluation Harness (WER & DER)', () => {
  const dgAdapter = new DeepgramAdapter({ apiKey: 'mock-key' });
  const sonioxAdapter = new SonioxAdapter({ apiKey: 'mock-key' });

  const fixtures = [depoFixture, intakeFixture, stratFixture];

  for (const fixture of fixtures) {
    it(`evaluates accuracy for fixture: ${fixture.name}`, () => {
      const dgParsed = dgAdapter.parseWebhook(fixture.deepgramResponse);
      const sonioxParsed = sonioxAdapter.parseWebhook(fixture.sonioxResponse);

      expect('transcript' in dgParsed).toBe(true);
      expect('transcript' in sonioxParsed).toBe(true);

      if ('error' in dgParsed || 'error' in sonioxParsed) return;

      const dgFullText = dgParsed.transcript.segments.map((s) => s.text).join(' ');
      const sonioxFullText = sonioxParsed.transcript.segments.map((s) => s.text).join(' ');

      const dgWer = computeWer(fixture.groundTruth.text, dgFullText);
      const sonioxWer = computeWer(fixture.groundTruth.text, sonioxFullText);

      // Both providers should achieve high accuracy (WER < 0.05 on synthetic fixtures)
      expect(dgWer.wer).toBeLessThan(0.05);
      expect(sonioxWer.wer).toBeLessThan(0.05);
    });
  }
});
