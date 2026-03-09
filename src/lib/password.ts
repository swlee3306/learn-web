import crypto from 'node:crypto';

// Simple PBKDF2-based password hashing.
// Good enough for MVP; can be replaced with argon2 later.

const ITER = 210_000;
const KEYLEN = 32;
const DIGEST = 'sha256';

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, ITER, KEYLEN, DIGEST).toString('hex');
  // Format: pbkdf2$sha256$210000$salt$hash
  return `pbkdf2$${DIGEST}$${ITER}$${salt}$${hash}`.replace(/\$\$/g, '$');
}

export function verifyPassword(password: string, stored: string) {
  // Back-compat: older/broken hashes may contain duplicated separators ("$$").
  const normalized = stored.replace(/\$\$/g, '$');
  const parts = normalized.split('$');
  // Expected: ["pbkdf2", "sha256", "210000", "salt", "hash"]
  if (parts.length !== 5) return false;
  const digest = parts[1];
  const iterStr = parts[2];
  const salt = parts[3];
  const hash = parts[4];
  const iter = Number(iterStr);
  if (!iter || !salt || !hash) return false;
  if (digest !== 'sha256') return false;
  const derived = crypto.pbkdf2Sync(password, salt, iter, KEYLEN, 'sha256').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(derived, 'hex'));
}
