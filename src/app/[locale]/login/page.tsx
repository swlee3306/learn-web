'use client';

import {useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
import {useParams, useRouter} from 'next/navigation';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [me, setMe] = useState<{username: string} | null>(null);
  const [msg, setMsg] = useState<string>('');
  const params = useParams<{locale: string}>();
  const locale = params?.locale || 'ko';
  const router = useRouter();

  type MeResponse = {user: {username: string} | null};

  const refreshMe = useCallback(async () => {
    const r = await fetch('/learn/api/me', {cache: 'no-store'}).catch(() => null);
    const j: MeResponse = r ? ((await r.json().catch(() => ({user: null}))) as MeResponse) : {user: null};
    setMe(j.user || null);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => void refreshMe(), 0);
    const onAuth = () => void refreshMe();
    window.addEventListener('learn-auth-changed', onAuth);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('learn-auth-changed', onAuth);
    };
  }, [refreshMe]);


  useEffect(() => {
    if (me) {
      // 이미 로그인 상태라면 로그인 페이지에 머무르지 말고 홈으로 이동.
      router.replace(`/${locale}`);
    }
  }, [me, locale, router]);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">ACCOUNT</div>
        <h1 className="h1">로그인</h1>
        <p className="p">완료한 미션을 기록으로 남기려면 로그인이 필요해.</p>
        <div style={{marginTop: 10, display: 'flex', gap: 10, flexWrap: 'wrap'}}>
          <Link className="btn" href={`/${locale}`}>← 홈</Link>
          <Link className="btn" href={`/${locale}/web`}>웹 스타터</Link>
        </div>
      </section>

      {me ? (
        <section className="card">
          <h2 className="cardTitle" style={{fontSize: 20}}>로그인됨</h2>
          <p className="cardDesc">홈으로 이동 중…</p>
          <button
            className="btn"
            onClick={async () => {
              await fetch('/learn/api/auth/logout', {method: 'POST'});
              await refreshMe();
            }}
          >
            로그아웃
          </button>
        </section>
      ) : (
        <section className="card">
          <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
            <button className={`tab ${mode === 'login' ? 'tabActive' : ''}`} onClick={() => setMode('login')}>로그인</button>
            <button className={`tab ${mode === 'register' ? 'tabActive' : ''}`} onClick={() => setMode('register')}>회원가입</button>
          </div>

          <div style={{marginTop: 12}} className="grid">
            <label className="smallText">아이디(영문/숫자/언더스코어, 3~20)</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="e.g. flant_2000"
              style={{padding: 12, borderRadius: 12, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)', color: 'white'}}
            />

            <label className="smallText">비밀번호(6자 이상)</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="******"
              style={{padding: 12, borderRadius: 12, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)', color: 'white'}}
            />

            {mode === 'register' ? (
              <>
                <label className="smallText">초대 코드(있다면)</label>
                <input
                  value={inviteCode}
                  onChange={e => setInviteCode(e.target.value)}
                  placeholder="(옵션)"
                  style={{padding: 12, borderRadius: 12, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)', color: 'white'}}
                />
              </>
            ) : null}

            <button
              className="btn btnPrimary"
              onClick={async () => {
                setMsg('');
                const endpoint = mode === 'login' ? '/learn/api/auth/login' : '/learn/api/auth/register';
                const r = await fetch(endpoint, {
                  method: 'POST',
                  headers: {'content-type': 'application/json'},
                  body: JSON.stringify({username, password, inviteCode})
                });
                const j = await r.json().catch(() => ({}));
                if (!r.ok) {
                  setMsg(j.error || '실패');
                  return;
                }
                await refreshMe();
                window.dispatchEvent(new Event('learn-auth-changed'));
                router.replace(`/${locale}`);
              }}
            >
              {mode === 'login' ? '로그인' : '회원가입'}
            </button>

            {msg ? <div className="smallText" style={{color: '#ffb4b4'}}>{msg}</div> : null}

            <div className="smallText" style={{color: 'var(--muted2)'}}>
              팁: 비전공자는 “아이디/비번 만들기”부터 낯설 수 있어. 간단한 규칙으로만 만들고, 잊어버리면 다시 만들자.
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
