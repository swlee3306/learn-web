'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';

type Me = {
  username: string;
  isAdmin?: boolean;
} | null;

export default function MePill({locale}: {locale: string}) {
  const [me, setMe] = useState<Me>(null);
  const [loaded, setLoaded] = useState(false);

  async function refresh() {
    try {
      const r = await fetch('/learn/api/me', {cache: 'no-store'});
      const j = (await r.json()) as {user: Me};
      setMe(j.user ?? null);
    } finally {
      setLoaded(true);
    }
  }

  useEffect(() => {
    void refresh();
    const onAuth = () => void refresh();
    window.addEventListener('learn-auth-changed', onAuth);
    return () => window.removeEventListener('learn-auth-changed', onAuth);
  }, []);

  if (!loaded) {
    return <span className="pill" style={{opacity: 0.7}}>…</span>;
  }

  if (!me) {
    return <Link className="pill" href={`/${locale}/login`}>Login</Link>;
  }

  return (
    <span style={{display: 'inline-flex', gap: 8, alignItems: 'center'}}>
      {me.isAdmin ? <Link className="pill" href={`/${locale}/admin`}>Admin</Link> : null}
      <span className="pill" title={me.isAdmin ? 'admin' : 'user'}>
        {me.username}{me.isAdmin ? ' (admin)' : ''}
      </span>
      <button
        className="pill"
        onClick={async () => {
          await fetch('/learn/api/auth/logout', {method: 'POST'});
          window.dispatchEvent(new Event('learn-auth-changed'));
          await refresh();
        }}
      >
        Logout
      </button>
    </span>
  );
}
