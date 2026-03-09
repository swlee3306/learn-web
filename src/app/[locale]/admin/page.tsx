import Link from 'next/link';
import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';
import {getLocale} from 'next-intl/server';
import {cookieName, verifySession} from '@/lib/auth';
import {isAdminUser} from '@/lib/admin';
import AdminPanelClient from '@/components/admin/AdminPanelClient';

export default async function AdminPage() {
  const locale = await getLocale();
  const jar = await cookies();
  const token = jar.get(cookieName())?.value;

  if (!token) {
    // Redirect rather than rendering a 200 page.
    return redirect(`/${locale}/login`);
  }

  let userId = '';
  try {
    const u = await verifySession(token);
    userId = u.userId;
  } catch {
    return (
      <div className="card">
        <h1 className="cardTitle">관리자</h1>
        <p className="cardDesc">세션이 유효하지 않아. 다시 로그인해줘.</p>
        <Link className="btn btnPrimary" href={`/${locale}/login`}>로그인 →</Link>
      </div>
    );
  }

  const isAdmin = isAdminUser(userId);
  if (!isAdmin) {
    return redirect(`/${locale}`);
  }

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">ADMIN</div>
        <h1 className="h1">관리자 패널</h1>
        <p className="p">검색/정렬 + 비밀번호 초기화 + 관리자 권한 토글</p>
        <div style={{marginTop: 10, display: 'flex', gap: 10, flexWrap: 'wrap'}}>
          <Link className="btn" href={`/${locale}`}>← 홈</Link>
          <Link className="btn" href={`/${locale}/me`}>내 계정</Link>
        </div>
      </section>

      <AdminPanelClient />
    </div>
  );
}
