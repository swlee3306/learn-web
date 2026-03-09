import {NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {hashPassword} from '@/lib/password';
import {newId, signSession, cookieName} from '@/lib/auth';
import {passwordSchema, usernameSchema} from '@/lib/validate';

export async function POST(req: Request) {
  const invite = process.env.LEARN_INVITE_CODE;
  const body = await req.json().catch(() => ({}));

  const username = usernameSchema.safeParse(body.username);
  const password = passwordSchema.safeParse(body.password);
  const inviteCode = typeof body.inviteCode === 'string' ? body.inviteCode : '';

  if (!username.success || !password.success) {
    return NextResponse.json({ok: false, error: 'Invalid username or password'}, {status: 400});
  }

  if (invite && inviteCode !== invite) {
    return NextResponse.json({ok: false, error: 'Invite code required'}, {status: 403});
  }

  const id = newId();
  const passHash = hashPassword(password.data);

  try {
    const now = new Date().toISOString();
    db().prepare('INSERT INTO users(id, username, pass_hash, created_at) VALUES(?,?,?,?)')
      .run(id, username.data, passHash, now);
  } catch (e: unknown) {
    const msg = String((e as {message?: string})?.message || e);
    if (msg.includes('UNIQUE')) {
      return NextResponse.json({ok: false, error: 'Username already exists'}, {status: 409});
    }
    return NextResponse.json({ok: false, error: 'Failed to create user'}, {status: 500});
  }

  const token = await signSession({userId: id, username: username.data});
  const res = NextResponse.json({ok: true});

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
