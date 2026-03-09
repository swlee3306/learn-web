import {NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {requireAdmin} from '@/app/api/admin/_auth';

function safeSort(sort: string | null) {
  // allowlist to prevent SQL injection
  switch (sort) {
    case 'created_desc':
      return 'u.created_at DESC';
    case 'created_asc':
      return 'u.created_at ASC';
    case 'completed_desc':
      return 'completedCount DESC';
    case 'completed_asc':
      return 'completedCount ASC';
    case 'username_asc':
      return 'u.username ASC';
    case 'username_desc':
      return 'u.username DESC';
    default:
      return 'u.created_at DESC';
  }
}

export async function GET(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ok: false, error: auth.error}, {status: auth.status});

  const url = new URL(req.url);
  const q = (url.searchParams.get('q') || '').trim();
  const sort = safeSort(url.searchParams.get('sort'));

  const where = q ? 'WHERE u.username LIKE ?' : '';
  const params = q ? [`%${q}%`] : [];

  const users = db()
    .prepare(`
      SELECT u.id, u.username, u.is_admin as isAdmin, u.created_at as createdAt,
        (SELECT COUNT(*) FROM progress p WHERE p.user_id = u.id) as completedCount
      FROM users u
      ${where}
      ORDER BY ${sort}
      LIMIT 200
    `)
    .all(...params);

  return NextResponse.json({ok: true, users});
}
