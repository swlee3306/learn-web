import {NextResponse} from 'next/server';
import crypto from 'node:crypto';
import {requireAdmin} from '@/app/api/admin/_auth';
import {db} from '@/lib/db';
import {hashPassword} from '@/lib/password';

function makeTempPassword() {
  // Friendly-ish temp password.
  const raw = crypto.randomBytes(9).toString('base64url');
  return `tmp_${raw}`;
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ok: false, error: auth.error}, {status: auth.status});

  const body = (await req.json().catch(() => ({}))) as {userId?: string};
  const userId = typeof body.userId === 'string' ? body.userId : '';
  if (!userId) return NextResponse.json({ok: false, error: 'userId required'}, {status: 400});

  const exists = db().prepare('SELECT id, username FROM users WHERE id=?').get(userId) as {id: string; username: string} | undefined;
  if (!exists) return NextResponse.json({ok: false, error: 'User not found'}, {status: 404});

  const tempPassword = makeTempPassword();
  const passHash = hashPassword(tempPassword);
  db().prepare('UPDATE users SET pass_hash=? WHERE id=?').run(passHash, userId);

  return NextResponse.json({ok: true, username: exists.username, tempPassword});
}
