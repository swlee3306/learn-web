import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {cookieName, verifySession} from '@/lib/auth';
import {getCompletedForUser} from '@/lib/progress';
import {levelForXp, nextLevelXp, xpForMission} from '@/lib/xp';

export async function GET() {
  const jar = await cookies();
  const token = jar.get(cookieName())?.value;
  if (!token) return NextResponse.json({ok: true, completed: []});

  let user;
  try {
    user = await verifySession(token);
  } catch {
    return NextResponse.json({ok: true, completed: []});
  }

  const completed = getCompletedForUser(user.userId);

  const missionIds = completed.map(r => r.missionId);
  const totalXp = missionIds.reduce((sum, id) => sum + xpForMission(id), 0);
  const level = levelForXp(totalXp);
  const nextLevel = nextLevelXp(level);

  // streak (UTC days)
  const days = new Set<string>();
  for (const r of completed) {
    const d = new Date(r.completedAt);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
    days.add(key);
  }
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    d.setUTCDate(d.getUTCDate() - i);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
    if (days.has(key)) streak += 1;
    else break;
  }

  return NextResponse.json({ok: true, completed, stats: {totalXp, level, nextLevelXp: nextLevel, streak}});
}
