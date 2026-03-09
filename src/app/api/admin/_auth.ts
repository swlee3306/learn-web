import {cookies} from 'next/headers';
import {cookieName, verifySession} from '@/lib/auth';
import {ensureAdminSchema, isAdminUser} from '@/lib/admin';

export async function requireAdmin() {
  const jar = await cookies();
  const token = jar.get(cookieName())?.value;
  if (!token) return {ok: false as const, status: 401 as const, error: 'Not logged in'};

  let user;
  try {
    user = await verifySession(token);
  } catch {
    return {ok: false as const, status: 401 as const, error: 'Invalid session'};
  }

  ensureAdminSchema();
  if (!isAdminUser(user.userId)) {
    return {ok: false as const, status: 403 as const, error: 'Forbidden'};
  }

  return {ok: true as const, user};
}
