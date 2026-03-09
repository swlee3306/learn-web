import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {cookieName, verifySession} from '@/lib/auth';
import {db} from '@/lib/db';

export async function POST(req: Request) {
  const jar = await cookies();
  const token = jar.get(cookieName())?.value;
  if (!token) return NextResponse.json({ok: false, error: 'Not logged in'}, {status: 401});

  const body = await req.json().catch(() => ({}));
  const missionId = typeof body.missionId === 'string' ? body.missionId : '';
  if (!missionId) return NextResponse.json({ok: false, error: 'missionId required'}, {status: 400});

  let user;
  try {
    user = await verifySession(token);
  } catch {
    return NextResponse.json({ok: false, error: 'Invalid session'}, {status: 401});
  }

  db().prepare('DELETE FROM progress WHERE user_id=? AND mission_id=?').run(user.userId, missionId);
  return NextResponse.json({ok: true});
}
