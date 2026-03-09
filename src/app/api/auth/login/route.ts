import {NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {verifyPassword} from '@/lib/password';
import {signSession, cookieName} from '@/lib/auth';
import {passwordSchema, usernameSchema} from '@/lib/validate';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const username = usernameSchema.safeParse(body.username);
  const password = passwordSchema.safeParse(body.password);

  if (!username.success || !password.success) {
    return NextResponse.json({ok: false, error: 'Invalid username or password'}, {status: 400});
  }

  const row = db()
    .prepare('SELECT id, username, pass_hash FROM users WHERE username=?')
    .get(username.data) as {id: string; username: string; pass_hash: string} | undefined;
  if (!row) {
    return NextResponse.json({ok: false, error: 'Wrong username or password'}, {status: 401});
  }
  if (!verifyPassword(password.data, row.pass_hash)) {
    return NextResponse.json({ok: false, error: 'Wrong username or password'}, {status: 401});
  }

  const token = await signSession({userId: row.id, username: row.username});
  const res = NextResponse.json({ok: true});

  // NOTE: Next/edge cookie helpers can force Secure in some deployments.
  // We build the Set-Cookie header ourselves so LAN http://IP access works.
  const cookieSecure = process.env.LEARN_COOKIE_SECURE === 'false' ? false : true;
  const maxAge = 60 * 60 * 24 * 30;
  const expires = new Date(Date.now() + maxAge * 1000).toUTCString();
  const parts = [
    `${cookieName()}=${token}`,
    `Path=/learn`,
    `Expires=${expires}`,
    `Max-Age=${maxAge}`,
    'HttpOnly',
    'SameSite=Lax'
  ];
  if (cookieSecure) parts.push('Secure');
  res.headers.append('Set-Cookie', parts.join('; '));

  return res;
}
