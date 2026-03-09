import {NextResponse} from 'next/server';
import {requireAdmin} from '@/app/api/admin/_auth';
import {db} from '@/lib/db';

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ok: false, error: auth.error}, {status: auth.status});

  const body = (await req.json().catch(() => ({}))) as {userId?: string; isAdmin?: boolean};
  const userId = typeof body.userId === 'string' ? body.userId : '';
  const isAdmin = Boolean(body.isAdmin);
  if (!userId) return NextResponse.json({ok: false, error: 'userId required'}, {status: 400});

  const row = db().prepare('SELECT id, is_admin FROM users WHERE id=?').get(userId) as {id: string; is_admin: number} | undefined;
  if (!row) return NextResponse.json({ok: false, error: 'User not found'}, {status: 404});

  // Prevent removing the last admin.
  if (!isAdmin && row.is_admin === 1) {
    const admins = db().prepare('SELECT COUNT(*) as c FROM users WHERE is_admin=1').get() as {c: number};
    if (admins.c <= 1) {
      return NextResponse.json({ok: false, error: 'Cannot remove the last admin'}, {status: 400});
    }
  }

  db().prepare('UPDATE users SET is_admin=? WHERE id=?').run(isAdmin ? 1 : 0, userId);
  return NextResponse.json({ok: true});
}
