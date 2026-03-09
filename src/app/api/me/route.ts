import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {cookieName, verifySession} from '@/lib/auth';
import {isAdminUser} from '@/lib/admin';

export async function GET() {
  const jar = await cookies();
  const token = jar.get(cookieName())?.value;
  if (!token) return NextResponse.json({ok: true, user: null});

  try {
    const user = await verifySession(token);
    const isAdmin = isAdminUser(user.userId);
    return NextResponse.json({ok: true, user: {...user, isAdmin}});
  } catch {
    return NextResponse.json({ok: true, user: null});
  }
}
