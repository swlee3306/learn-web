import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {db} from '@/lib/db';
import {cookieName, verifySession} from '@/lib/auth';
import {hashPassword, verifyPassword} from '@/lib/password';
import {passwordSchema} from '@/lib/validate';

export async function POST(req: Request) {
  const jar = await cookies();
  const token = jar.get(cookieName())?.value;
  if (!token) return NextResponse.json({ok: false, error: 'Unauthorized'}, {status: 401});

  const body = (await req.json().catch(() => ({}))) as {currentPassword?: string; newPassword?: string};
  const currentPassword = typeof body.currentPassword === 'string' ? body.currentPassword : '';
  const newPassword = passwordSchema.safeParse(body.newPassword);
  if (!currentPassword || !newPassword.success) {
    return NextResponse.json({ok: false, error: 'Invalid password'}, {status: 400});
  }

  let session: {userId: string; username: string};
  try {
    session = await verifySession(token);
  } catch {
    return NextResponse.json({ok: false, error: 'Unauthorized'}, {status: 401});
  }

  const row = db().prepare('SELECT pass_hash FROM users WHERE id=?').get(session.userId) as {pass_hash: string} | undefined;
  if (!row) return NextResponse.json({ok: false, error: 'User not found'}, {status: 404});

  if (!verifyPassword(currentPassword, row.pass_hash)) {
    return NextResponse.json({ok: false, error: 'Wrong current password'}, {status: 401});
  }

  // Prevent no-op change
  if (verifyPassword(newPassword.data, row.pass_hash)) {
    return NextResponse.json({ok: false, error: 'New password must be different'}, {status: 400});
  }

  const passHash = hashPassword(newPassword.data);
  db().prepare('UPDATE users SET pass_hash=? WHERE id=?').run(passHash, session.userId);

  return NextResponse.json({ok: true});
}
