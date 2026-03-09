import {NextResponse} from 'next/server';
import {cookieName} from '@/lib/auth';

export async function POST() {
  const res = NextResponse.json({ok: true});
  const cookieSecure = process.env.LEARN_COOKIE_SECURE === 'false' ? false : true;

  const parts = [
    `${cookieName()}=`,
    'Path=/learn',
    'Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'Max-Age=0',
    'HttpOnly',
    'SameSite=Lax'
  ];
  if (cookieSecure) parts.push('Secure');
  res.headers.append('Set-Cookie', parts.join('; '));

  return res;
}
