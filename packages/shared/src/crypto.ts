import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // 96 bits for GCM
const AUTH_TAG_LENGTH = 16; // 128 bits
const KEY_LENGTH = 32; // 256 bits

export interface EncryptedPayload {
  iv: string; // base64
  ciphertext: string; // base64
  tag: string; // base64
}

/**
 * Computes the SHA-256 hash of a string or buffer.
 */
export function computeSha256(data: string | Buffer | Uint8Array): string {
  const hash = createHash('sha256');
  if (typeof data === 'string') {
    hash.update(data, 'utf8');
  } else {
    hash.update(data);
  }
  return hash.digest('hex');
}

/**
 * Generates a random 256-bit AES key.
 */
export function generateKey(): Buffer {
  return randomBytes(KEY_LENGTH);
}

/**
 * Wraps (encrypts) a firm data encryption key (DEK) with the master key (KEK).
 */
export function wrapKey(dek: Buffer, masterKeyHexOrBuffer: string | Buffer): EncryptedPayload {
  const masterKey =
    typeof masterKeyHexOrBuffer === 'string'
      ? Buffer.from(masterKeyHexOrBuffer, 'hex')
      : masterKeyHexOrBuffer;

  if (masterKey.length !== KEY_LENGTH) {
    throw new Error(`Master key must be exactly ${KEY_LENGTH} bytes`);
  }

  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, masterKey, iv, { authTagLength: AUTH_TAG_LENGTH });
  const ciphertext = Buffer.concat([cipher.update(dek), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString('base64'),
    ciphertext: ciphertext.toString('base64'),
    tag: tag.toString('base64'),
  };
}

/**
 * Unwraps (decrypts) a wrapped firm data encryption key (DEK) using the master key (KEK).
 */
export function unwrapKey(payload: EncryptedPayload, masterKeyHexOrBuffer: string | Buffer): Buffer {
  const masterKey =
    typeof masterKeyHexOrBuffer === 'string'
      ? Buffer.from(masterKeyHexOrBuffer, 'hex')
      : masterKeyHexOrBuffer;

  if (masterKey.length !== KEY_LENGTH) {
    throw new Error(`Master key must be exactly ${KEY_LENGTH} bytes`);
  }

  const iv = Buffer.from(payload.iv, 'base64');
  const ciphertext = Buffer.from(payload.ciphertext, 'base64');
  const tag = Buffer.from(payload.tag, 'base64');

  const decipher = createDecipheriv(ALGORITHM, masterKey, iv, { authTagLength: AUTH_TAG_LENGTH });
  decipher.setAuthTag(tag);
  const dek = Buffer.concat([decipher.update(ciphertext), decipher.final()]);

  if (dek.length !== KEY_LENGTH) {
    throw new Error('Unwrapped key has invalid length');
  }

  return dek;
}

/**
 * Encrypts a plaintext string using the firm's AES-256 key.
 */
export function encryptText(plaintext: string, key: Buffer): string {
  if (key.length !== KEY_LENGTH) {
    throw new Error(`Key must be ${KEY_LENGTH} bytes`);
  }

  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv, { authTagLength: AUTH_TAG_LENGTH });
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  const payload: EncryptedPayload = {
    iv: iv.toString('base64'),
    ciphertext: ciphertext.toString('base64'),
    tag: tag.toString('base64'),
  };

  return JSON.stringify(payload);
}

/**
 * Decrypts an encrypted payload JSON string using the firm's AES-256 key.
 */
export function decryptText(encryptedJson: string, key: Buffer): string {
  if (key.length !== KEY_LENGTH) {
    throw new Error(`Key must be ${KEY_LENGTH} bytes`);
  }

  let payload: EncryptedPayload;
  try {
    payload = JSON.parse(encryptedJson) as EncryptedPayload;
  } catch {
    throw new Error('Invalid encrypted payload format');
  }

  if (!payload.iv || !payload.ciphertext || !payload.tag) {
    throw new Error('Malformed encrypted payload missing iv, ciphertext or tag');
  }

  const iv = Buffer.from(payload.iv, 'base64');
  const ciphertext = Buffer.from(payload.ciphertext, 'base64');
  const tag = Buffer.from(payload.tag, 'base64');

  const decipher = createDecipheriv(ALGORITHM, key, iv, { authTagLength: AUTH_TAG_LENGTH });
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);

  return decrypted.toString('utf8');
}
