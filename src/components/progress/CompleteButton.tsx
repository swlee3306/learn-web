'use client';

import {useEffect, useState} from 'react';
import {isCompleted, markCompleted, markUncompleted, mergeServerCompleted} from './progressStore';

export default function CompleteButton({missionId}: {missionId: string}) {
  const initialDone = (() => {
    if (typeof window === 'undefined') return false;
    // Locale is in URL path for /[locale]/...; default to ko for safety.
    const locale = window.location.pathname.split('/')[2] || 'ko';
    return isCompleted('web', locale, missionId);
  })();

  const [done, setDone] = useState(initialDone);

  useEffect(() => {
    const locale = window.location.pathname.split('/')[2] || 'ko';
    // Hydrate from server when possible so completion is consistent across devices.
    fetch('/learn/api/progress/me', {cache: 'no-store'})
      .then(r => r.json())
      .then(j => {
        if (Array.isArray(j.completed)) mergeServerCompleted(j.completed, 'web', locale);
        setDone(isCompleted('web', locale, missionId));
      })
      .catch(() => void 0);
  }, [missionId]);

  return (
    <button
      className={`btn ${done ? '' : 'btnPrimary'}`}
      onClick={async () => {
        const locale = window.location.pathname.split('/')[2] || 'ko';
        if (done) {
          markUncompleted('web', locale, missionId);
          setDone(false);
          try {
            await fetch('/learn/api/progress/uncomplete', {
              method: 'POST',
              headers: {'content-type': 'application/json'},
              body: JSON.stringify({missionId})
            });
          } catch {
            // ignore
          }
          return;
        }

        // Always store local progress for instant feedback.
        markCompleted('web', locale, missionId);
        setDone(true);

        // If logged in, also persist on server.
        try {
          await fetch('/learn/api/progress/complete', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({missionId})
          });
        } catch {
          // ignore
        }
      }}
    >
      {done ? '완료 취소' : '미션 완료 체크'}
    </button>
  );
}
