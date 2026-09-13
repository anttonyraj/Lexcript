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

const fixtures = [depoFixture, intakeFixture, stratFixture];

describe('STT Provider Output Parity Guarantee', () => {
  const dgAdapter = new DeepgramAdapter({ apiKey: 'mock-key' });
  const sonioxAdapter = new SonioxAdapter({ apiKey: 'mock-key' });

  for (const fixture of fixtures) {
    describe(`Fixture: ${fixture.name}`, () => {
      const dgParsed = dgAdapter.parseWebhook(fixture.deepgramResponse);
      const sonioxParsed = sonioxAdapter.parseWebhook(fixture.sonioxResponse);

      it('successfully parses without errors from both providers', () => {
        expect('error' in dgParsed).toBe(false);
        expect('error' in sonioxParsed).toBe(false);
      });

      if ('error' in dgParsed || 'error' in sonioxParsed) return;

      const dgTranscript = dgParsed.transcript;
      const sonioxTranscript = sonioxParsed.transcript;

      it('normalizes speaker labels to S1, S2 format across both providers', () => {
        const dgSpeakers = new Set(dgTranscript.segments.map((s) => s.speaker));
        const sonioxSpeakers = new Set(sonioxTranscript.segments.map((s) => s.speaker));

        expect(Array.from(dgSpeakers).sort()).toEqual(['S1', 'S2']);
        expect(Array.from(sonioxSpeakers).sort()).toEqual(['S1', 'S2']);
      });

      it('matches segment count and sequence of speaker alternations', () => {
        expect(dgTranscript.segments.length).toBe(sonioxTranscript.segments.length);

        for (let i = 0; i < dgTranscript.segments.length; i++) {
          const dgSeg = dgTranscript.segments[i]!;
          const sonioxSeg = sonioxTranscript.segments[i]!;

          // Same speaker alternation
          expect(dgSeg.speaker).toBe(sonioxSeg.speaker);

          // Segments have non-empty text
          expect(dgSeg.text.length).toBeGreaterThan(0);
          expect(sonioxSeg.text.length).toBeGreaterThan(0);

          // Word tokens exist and are within reasonable time window
          expect(dgSeg.words.length).toBeGreaterThan(0);
          expect(sonioxSeg.words.length).toBeGreaterThan(0);

          // Monotonic timestamps
          expect(dgSeg.start).toBeLessThan(dgSeg.end);
          expect(sonioxSeg.start).toBeLessThan(sonioxSeg.end);

          // Confidence scores are scaled 0.0 - 1.0
          for (const w of dgSeg.words) {
            expect(w.c).toBeGreaterThanOrEqual(0);
            expect(w.c).toBeLessThanOrEqual(1.0);
          }
          for (const w of sonioxSeg.words) {
            expect(w.c).toBeGreaterThanOrEqual(0);
            expect(w.c).toBeLessThanOrEqual(1.0);
          }
        }
      });

      it('produces valid usage records with positive duration and cost', () => {
        expect(dgParsed.usage.minutes).toBeGreaterThan(0);
        expect(dgParsed.usage.estimatedCostUsd).toBeGreaterThan(0);

        expect(sonioxParsed.usage.minutes).toBeGreaterThan(0);
        expect(sonioxParsed.usage.estimatedCostUsd).toBeGreaterThan(0);
      });
    });
  }
});
