import { describe, it, expect } from 'vitest';
import { getUtbmsCode, UTBMS_ACTIVITY_CODES } from '../src/utbms.js';

describe('UTBMS Codes Definition', () => {
  it('correctly maps client consultation calls to A106 (not A104)', () => {
    const a106 = getUtbmsCode('A106');
    expect(a106).toBeDefined();
    expect(a106?.name).toBe('Communicate (with client)');

    const a104 = getUtbmsCode('A104');
    expect(a104).toBeDefined();
    expect(a104?.name).toBe('Review/analyze');
  });

  it('contains complete official activity code range A101 to A111', () => {
    const codes = UTBMS_ACTIVITY_CODES.map((c) => c.code);
    expect(codes).toEqual([
      'A101',
      'A102',
      'A103',
      'A104',
      'A105',
      'A106',
      'A107',
      'A108',
      'A109',
      'A110',
      'A111',
    ]);
  });
});
