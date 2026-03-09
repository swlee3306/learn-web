import {SignJWT, jwtVerify} from 'jose';
import crypto from 'node:crypto';

const COOKIE_NAME = 'learn_session';

function requireSecret() {
  const secret = process.env.LEARN_AUTH_SECRET;
  if (!secret) {
    throw new Error('LEARN_AUTH_SECRET is not set');
  }
  return secret;
}

function key() {
  const secret = requireSecret();
  return new TextEncoder().encode(secret);
}

export function cookieName() {
  return COOKIE_NAME;
}

export function newId() {
  return crypto.randomUUID();
}

export async function signSession(payload: {userId: string; username: string}) {
  return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(key());
}

export async function verifySession(token: string) {
  const {payload} = await jwtVerify(token, key());
  const userId = String(payload.userId || '');
  const username = String(payload.username || '');
  if (!userId || !username) throw new Error('invalid session');
  return {userId, username};
}
