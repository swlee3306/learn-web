'use client';

import {useEffect, useMemo, useState} from 'react';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {levelForXp, nextLevelXp as nextLevelXpForLevel, xpForMission} from '@/lib/xp';

type Me = {username: string; isAdmin?: boolean} | null;

type CompletedRow = {missionId: string; completedAt: string};

export default function MePage() {
  const params = useParams<{locale: string}>();
  const locale = params?.locale || 'ko';

  const [me, setMe] = useState<Me>(null);
  const [completed, setCompleted] = useState<CompletedRow[]>([]);
  const [serverStats, setServerStats] = useState<{totalXp: number; level: number; nextLevelXp: number; streak: number} | null>(null);

  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPw2, setNewPw2] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [pwBusy, setPwBusy] = useState(false);

  const stats = useMemo(() => {
    // fallback (should match server)
    const totalXp = completed.reduce((sum, r) => sum + xpForMission(r.missionId), 0);
    const level = levelForXp(totalXp);
    const nextLevelXp = nextLevelXpForLevel(level);
    return {totalXp, level, nextLevelXp, streak: 0};
  }, [completed]);

  const effectiveStats = serverStats || stats;

  async function refresh() {
    const r1 = await fetch('/learn/api/me', {cache: 'no-store'}).catch(() => null);
    const j1 = r1 ? await r1.json().catch(() => ({})) : {};
    setMe(j1.user || null);

    const r2 = await fetch('/learn/api/progress/me', {cache: 'no-store'}).catch(() => null);
    const j2 = r2 ? await r2.json().catch(() => ({})) : {};
    setCompleted(Array.isArray(j2.completed) ? j2.completed : []);
    setServerStats(j2.stats && typeof j2.stats === 'object' ? j2.stats : null);
  }

  useEffect(() => {
    void refresh();
    const onAuth = () => void refresh();
    window.addEventListener('learn-auth-changed', onAuth);
    return () => window.removeEventListener('learn-auth-changed', onAuth);
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">PROFILE</div>
        <h1 className="h1">내 계정</h1>
        <p className="p">미션 완료 기록은 로그인한 계정에 저장돼.</p>
        <div style={{marginTop: 10, display: 'flex', gap: 10, flexWrap: 'wrap'}}>
          <Link className="btn" href={`/${locale}`}>← 홈</Link>
          <Link className="btn" href={`/${locale}/login`}>로그인</Link>
        </div>
      </section>

      <section className="card">
        {me ? (
          <>
            <h2 className="cardTitle" style={{fontSize: 20}}>안녕, {me.username}!</h2>
            <div className="cardDesc" style={{marginTop: 8, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'baseline'}}>
              <span>레벨: <b>{effectiveStats.level}</b></span>
              <span>XP: <b>{effectiveStats.totalXp}</b> / {effectiveStats.nextLevelXp}</span>
              <span>연속: <b>{effectiveStats.streak}</b>일</span>
              <span>완료 미션: <b>{completed.length}</b></span>
            </div>

            {completed.length ? (
              <div style={{marginTop: 12}}>
                <div className="kicker">RECENT</div>
                <ul style={{color: 'var(--muted)', lineHeight: 1.7, margin: '10px 0 0 18px'}}>
                  {completed.slice(0, 5).map(r => (
                    <li key={r.missionId}>
                      <code>{r.missionId}</code>
                      <span style={{opacity: 0.7}}> · {new Date(r.completedAt).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="cardDesc" style={{marginTop: 10, color: 'var(--muted2)'}}>
                아직 완료한 미션이 없어. Web 트랙에서 하나만 끝내보자.
              </p>
            )}

            <div style={{marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap'}}>
              <Link className="btn btnPrimary" href={`/${locale}/web`}>웹 미션 하러 가기 →</Link>
              <button
                className="btn"
                onClick={async () => {
                  await fetch('/learn/api/auth/logout', {method: 'POST'});
                  window.dispatchEvent(new Event('learn-auth-changed'));
                  await refresh();
                }}
              >
                로그아웃
              </button>
            </div>

            <div style={{marginTop: 18}}>
              <div className="kicker">SECURITY</div>
              <h3 className="cardTitle" style={{fontSize: 18, marginTop: 6}}>비밀번호 변경</h3>
              <div className="grid" style={{marginTop: 10}}>
                <label className="smallText">현재 비밀번호</label>
                <input
                  type="password"
                  value={curPw}
                  onChange={e => setCurPw(e.target.value)}
                  placeholder="현재 비밀번호"
                  style={{padding: 12, borderRadius: 12, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)', color: 'white'}}
                />

                <label className="smallText">새 비밀번호</label>
                <input
                  type="password"
                  value={newPw}
                  onChange={e => setNewPw(e.target.value)}
                  placeholder="새 비밀번호(6자 이상)"
                  style={{padding: 12, borderRadius: 12, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)', color: 'white'}}
                />

                <label className="smallText">새 비밀번호 확인</label>
                <input
                  type="password"
                  value={newPw2}
                  onChange={e => setNewPw2(e.target.value)}
                  placeholder="새 비밀번호 다시 입력"
                  style={{padding: 12, borderRadius: 12, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)', color: 'white'}}
                />

                <button
                  className="btn btnPrimary"
                  disabled={pwBusy}
                  onClick={async () => {
                    setPwMsg('');
                    if (!curPw || !newPw) {
                      setPwMsg('비밀번호를 입력해줘.');
                      return;
                    }
                    if (newPw !== newPw2) {
                      setPwMsg('새 비밀번호가 서로 달라.');
                      return;
                    }
                    setPwBusy(true);
                    try {
                      const r = await fetch('/learn/api/auth/change-password', {
                        method: 'POST',
                        headers: {'content-type': 'application/json'},
                        body: JSON.stringify({currentPassword: curPw, newPassword: newPw})
                      });
                      const j = await r.json().catch(() => ({}));
                      if (!r.ok) {
                        setPwMsg(j.error || '변경 실패');
                        return;
                      }
                      setCurPw('');
                      setNewPw('');
                      setNewPw2('');
                      setPwMsg('비밀번호 변경 완료.');
                    } finally {
                      setPwBusy(false);
                    }
                  }}
                >
                  비밀번호 변경
                </button>

                {pwMsg ? <div className="smallText" style={{color: pwMsg.includes('완료') ? '#b6ffcc' : '#ffb4b4'}}>{pwMsg}</div> : null}
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="cardTitle" style={{fontSize: 20}}>로그인이 필요해</h2>
            <p className="cardDesc">로그인하면 완료한 미션을 기록으로 남길 수 있어.</p>
            <Link className="btn btnPrimary" href={`/${locale}/login`}>로그인 하러 가기 →</Link>
          </>
        )}
      </section>
    </div>
  );
}
