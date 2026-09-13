import { describe, it, expect } from 'vitest';
import {
  generateKey,
  wrapKey,
  unwrapKey,
  encryptText,
  decryptText,
  computeSha256,
} from '../src/crypto.js';

describe('Envelope Encryption & Cryptography', () => {
  it('computes correct SHA-256 hashes', () => {
    const input = 'Lexcript Privilege by Default';
    const hash = computeSha256(input);
    expect(hash).toHaveLength(64);
    expect(computeSha256(input)).toBe(hash);
    expect(computeSha256(Buffer.from(input))).toBe(hash);
  });

  it('wraps and unwraps firm data keys (DEK) with master key (KEK)', () => {
    const masterKey = generateKey();
    const firmDataKey = generateKey();

    const wrapped = wrapKey(firmDataKey, masterKey);
    expect(wrapped.iv).toBeDefined();
    expect(wrapped.ciphertext).toBeDefined();
    expect(wrapped.tag).toBeDefined();

    const unwrapped = unwrapKey(wrapped, masterKey);
    expect(unwrapped).toEqual(firmDataKey);
  });

  it('fails to unwrap with wrong master key', () => {
    const masterKey1 = generateKey();
    const masterKey2 = generateKey();
    const firmDataKey = generateKey();

    const wrapped = wrapKey(firmDataKey, masterKey1);
    expect(() => unwrapKey(wrapped, masterKey2)).toThrow();
  });

  it('encrypts and decrypts text payloads using firm key', () => {
    const firmKey = generateKey();
    const sensitiveNarrative =
      'Client strategy conference regarding deposition testimony and expert witness preparation.';

    const encrypted = encryptText(sensitiveNarrative, firmKey);
    expect(encrypted).not.toContain('deposition');

    const decrypted = decryptText(encrypted, firmKey);
    expect(decrypted).toBe(sensitiveNarrative);
  });

  it('detects tampering with encrypted ciphertext or tag', () => {
    const firmKey = generateKey();
    const plaintext = 'Privileged attorney-client communication';
    const encrypted = encryptText(plaintext, firmKey);

    const parsed = JSON.parse(encrypted);
    // Corrupt ciphertext
    const corruptedCiphertext = Buffer.from(parsed.ciphertext, 'base64');
    corruptedCiphertext[0] = (corruptedCiphertext[0] ?? 0) ^ 0xff;
    parsed.ciphertext = corruptedCiphertext.toString('base64');

    expect(() => decryptText(JSON.stringify(parsed), firmKey)).toThrow();
  });
});
