import {db} from '@/lib/db';

export type CompletedRow = {missionId: string; completedAt: string};

export function getCompletedForUser(userId: string): CompletedRow[] {
  const rows = db()
    .prepare('SELECT mission_id as missionId, completed_at as completedAt FROM progress WHERE user_id=? ORDER BY completed_at DESC')
    .all(userId) as CompletedRow[];
  return rows;
}

export function getCompletedSetForUser(userId: string): Set<string> {
  const rows = db().prepare('SELECT mission_id FROM progress WHERE user_id=?').all(userId) as Array<{mission_id: string}>;
  return new Set(rows.map(r => r.mission_id));
}
