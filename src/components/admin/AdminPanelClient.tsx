'use client';

import {useEffect, useMemo, useState} from 'react';

type UserRow = {
  id: string;
  username: string;
  isAdmin: number | boolean;
  completedCount: number;
  createdAt: string;
};

const SORTS: Array<{id: string; label: string}> = [
  {id: 'created_desc', label: 'Newest'},
  {id: 'created_asc', label: 'Oldest'},
  {id: 'completed_desc', label: 'Most completed'},
  {id: 'completed_asc', label: 'Least completed'},
  {id: 'username_asc', label: 'Username A→Z'},
  {id: 'username_desc', label: 'Username Z→A'}
];

export default function AdminPanelClient() {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('created_desc');
  const [rows, setRows] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [toast, setToast] = useState<string>('');

  const query = useMemo(() => {
    const p = new URLSearchParams();
    if (q.trim()) p.set('q', q.trim());
    if (sort) p.set('sort', sort);
    return p.toString();
  }, [q, sort]);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const r = await fetch(`/learn/api/admin/users?${query}`, {cache: 'no-store'});
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || 'Failed');
      setRows(j.users as UserRow[]);
    } catch (e: unknown) {
      setError(String((e as {message?: string})?.message || e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  async function resetPassword(userId: string) {
    setToast('');
    const yes = confirm('Reset password? New temporary password will be shown once.');
    if (!yes) return;

    const r = await fetch('/learn/api/admin/users/reset-password', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({userId})
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      alert(j.error || 'Failed');
      return;
    }
    const msg = `Temp password for ${j.username}: ${j.tempPassword}`;
    setToast(msg);
    try {
      await navigator.clipboard.writeText(j.tempPassword);
    } catch {
      // ignore
    }
  }

  async function setAdmin(userId: string, isAdmin: boolean) {
    const r = await fetch('/learn/api/admin/users/set-admin', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({userId, isAdmin})
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      alert(j.error || 'Failed');
      return;
    }
    await load();
  }

  return (
    <section className="card">
      <h2 className="cardTitle" style={{fontSize: 20}}>Users</h2>

      <div style={{display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10}}>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search username..."
          style={{
            padding: 10,
            borderRadius: 12,
            border: '1px solid var(--border)',
            background: 'rgba(255,255,255,0.04)',
            color: 'white',
            minWidth: 240
          }}
        />
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 12,
            border: '1px solid var(--border)',
            background: 'rgba(10,10,12,0.6)',
            color: 'white'
          }}
        >
          {SORTS.map(s => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
        <button className="btn" onClick={load} disabled={loading}>Refresh</button>
      </div>

      {toast ? (
        <div className="smallText" style={{marginTop: 10, color: '#b6ffcc'}}>
          {toast} (copied if possible)
        </div>
      ) : null}

      {error ? (
        <div className="smallText" style={{marginTop: 10, color: '#ffb4b4'}}>
          {error}
        </div>
      ) : null}

      <div className="smallText" style={{marginTop: 8, color: 'var(--muted2)'}}>
        {loading ? 'Loading...' : `총 ${rows.length}명`}
      </div>

      <div style={{marginTop: 12, overflowX: 'auto'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', minWidth: 880}}>
          <thead>
            <tr style={{textAlign: 'left', color: 'var(--muted2)'}}>
              <th style={{padding: '10px 8px', borderBottom: '1px solid var(--border)'}}>username</th>
              <th style={{padding: '10px 8px', borderBottom: '1px solid var(--border)'}}>admin</th>
              <th style={{padding: '10px 8px', borderBottom: '1px solid var(--border)'}}>completed</th>
              <th style={{padding: '10px 8px', borderBottom: '1px solid var(--border)'}}>created</th>
              <th style={{padding: '10px 8px', borderBottom: '1px solid var(--border)'}}>actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(u => {
              const admin = u.isAdmin === true || u.isAdmin === 1;
              return (
                <tr key={u.id}>
                  <td style={{padding: '10px 8px', borderBottom: '1px solid var(--border)'}}>{u.username}</td>
                  <td style={{padding: '10px 8px', borderBottom: '1px solid var(--border)'}}>{admin ? 'yes' : 'no'}</td>
                  <td style={{padding: '10px 8px', borderBottom: '1px solid var(--border)'}}>{u.completedCount}</td>
                  <td style={{padding: '10px 8px', borderBottom: '1px solid var(--border)'}}>{u.createdAt}</td>
                  <td style={{padding: '10px 8px', borderBottom: '1px solid var(--border)'}}>
                    <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
                      <button className="btn" onClick={() => resetPassword(u.id)}>Reset PW</button>
                      {admin ? (
                        <button className="btn" onClick={() => setAdmin(u.id, false)}>Remove admin</button>
                      ) : (
                        <button className="btn btnPrimary" onClick={() => setAdmin(u.id, true)}>Make admin</button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
