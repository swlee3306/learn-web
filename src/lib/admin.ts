import {db} from '@/lib/db';

export function ensureAdminSchema() {
  const cols = db().prepare('PRAGMA table_info(users)').all() as Array<{name: string}>;
  const has = new Set(cols.map(c => c.name));
  if (!has.has('is_admin')) {
    db().exec('ALTER TABLE users ADD COLUMN is_admin INTEGER NOT NULL DEFAULT 0');
  }
}

export function isAdminUser(userId: string) {
  ensureAdminSchema();
  const row = db().prepare('SELECT is_admin FROM users WHERE id=?').get(userId) as {is_admin: number} | undefined;
  return Boolean(row && row.is_admin === 1);
}
