import { describe, it, expect } from 'vitest';
import { DeepgramAdapter } from '../src/deepgram.js';
import { SonioxAdapter } from '../src/soniox.js';

describe('Zero Data Retention & Privacy Posture (Rule 4)', () => {
  const options = {
    language: 'en' as const,
    diarize: true as const,
    punctuate: true as const,
    wordTimestamps: true as const,
    keyterms: ['In re Lexcript Matter', 'Fed. R. Civ. P. 30(b)(6)'],
  };

  it('asserts Deepgram prerecorded requests enforce no_retention=true', () => {
    const adapter = new DeepgramAdapter({ apiKey: 'test-key' });
    const params = adapter.buildPrerecordedParams({
      callbackUrl: 'https://api.lexcript.com/api/stt/webhook/deepgram',
      options,
    });

    expect(params.get('no_retention')).toBe('true');
    expect(params.get('model')).toBe('nova-3');
    expect(params.get('diarize')).toBe('true');
    expect(params.getAll('keyterm')).toContain('In re Lexcript Matter');
  });

  it('asserts Soniox prerecorded payload enforces storage_policy: do_not_store', () => {
    const adapter = new SonioxAdapter({ apiKey: 'test-key' });
    const payload = adapter.buildPrerecordedPayload({
      audioUrl: 'https://storage.lexcript.com/staging/firm1/rec1.wav',
      callbackUrl: 'https://api.lexcript.com/api/stt/webhook/soniox',
      options,
    });

    expect(payload.storage_policy).toBe('do_not_store');
    expect(payload.enable_speaker_identification).toBe(true);
    expect(payload.enable_global_speaker_identification).toBe(true);
    expect((payload.context as { terms: string[] }).terms).toContain('In re Lexcript Matter');
  });
});
