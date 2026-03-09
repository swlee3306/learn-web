import Link from 'next/link';
import {getLocale} from 'next-intl/server';
import {cookies} from 'next/headers';
import {WEB_MISSIONS} from '@/content/webMissions';
import {WEB_LESSON_TOPICS} from '@/content/webLessons';
import {cookieName, verifySession} from '@/lib/auth';
import {getCompletedSetForUser} from '@/lib/progress';

export default async function WebTrackPage({searchParams}: {searchParams?: {topic?: string; stage?: string}}) {
  const locale = await getLocale();

  // If logged in, show completion badges.
  const jar = await cookies();
  const token = jar.get(cookieName())?.value;
  let completed = new Set<string>();
  if (token) {
    try {
      const user = await verifySession(token);
      completed = getCompletedSetForUser(user.userId);
    } catch {
      // ignore
    }
  }

  const activeTopic = searchParams?.topic;
  const validTopic = WEB_LESSON_TOPICS.find(t => t.id === activeTopic)?.id;

  const activeStage = searchParams?.stage;
  const validStage = ['S0', 'S1', 'S2', 'S3'].includes(activeStage || '') ? (activeStage as 'S0' | 'S1' | 'S2' | 'S3') : undefined;

  let missions = WEB_MISSIONS;
  if (validTopic) missions = missions.filter(m => m.lessonTopicIds.includes(validTopic));
  if (validStage) missions = missions.filter(m => m.stage === validStage);

  const topicShort: Record<string, string> = {
    'getting-started': '시작',
    'dom-events': 'DOM/이벤트',
    'state-render': '상태/렌더',
    'arrays-loops': '배열/루프',
    'forms-validation': '폼/검증',
    'fetch-async': 'fetch/비동기',
    'storage': '저장소',
    'timers': '타이머'
  };

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1">웹 스타터</h1>
        <p className="p">
          “눈에 보이는 결과”로 재미를 붙이는 트랙. 10~20분짜리 미션으로 성취감을 계속 쌓는다.
        </p>
      </section>

      <section style={{display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: -6, marginBottom: 14}}>
        <Link className="btn btnPrimary" href={`/${locale}/web/guide`}>가이드</Link>
        <Link className="btn" href={`/${locale}/web/lessons`}>기초 강좌(영상)</Link>
      </section>

      <section className="card">
        <div className="kicker">FILTER</div>

        <div style={{marginTop: 10}}>
          <div className="kicker" style={{opacity: 0.9}}>STAGE</div>
          <div style={{marginTop: 8, overflowX: 'auto'}}>
            <div style={{display: 'flex', gap: 8, flexWrap: 'nowrap', minWidth: 'max-content'}}>
              <Link className={validStage ? 'btn' : 'btn btnPrimary'} href={`/${locale}/web${validTopic ? `?topic=${validTopic}` : ''}`}>전체</Link>
              {(['S0', 'S1', 'S2', 'S3'] as const).map(s => (
                <Link
                  key={s}
                  className={validStage === s ? 'btn btnPrimary' : 'btn'}
                  href={`/${locale}/web?${new URLSearchParams({
                    ...(validTopic ? {topic: validTopic} : {}),
                    stage: s
                  }).toString()}`}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div style={{marginTop: 14}}>
          <div className="kicker" style={{opacity: 0.9}}>TOPIC</div>
          <div style={{marginTop: 8, overflowX: 'auto'}}>
            <div style={{display: 'flex', gap: 8, flexWrap: 'nowrap', minWidth: 'max-content'}}>
              <Link className={validTopic ? 'btn' : 'btn btnPrimary'} href={`/${locale}/web${validStage ? `?stage=${validStage}` : ''}`}>전체</Link>
              {WEB_LESSON_TOPICS.map(t => (
                <Link
                  key={t.id}
                  className={validTopic === t.id ? 'btn btnPrimary' : 'btn'}
                  href={`/${locale}/web?${new URLSearchParams({
                    ...(validStage ? {stage: validStage} : {}),
                    topic: t.id
                  }).toString()}`}
                  title={t.titleKo}
                >
                  {topicShort[t.id] ?? t.titleKo}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {validTopic ? (
          <p className="cardDesc" style={{marginTop: 10, color: 'var(--muted)'}}>
            {WEB_LESSON_TOPICS.find(t => t.id === validTopic)?.summaryKo}
          </p>
        ) : null}
      </section>

      <section className="cards">
        {missions.map(m => (
          <div key={m.id} className="card">
            <div className="kicker">{m.stage} · {m.minutes}m</div>
            <h2 className="cardTitle" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10}}>
              <span>{m.title[locale as 'ko' | 'en']}</span>
              {completed.has(m.id) ? (
                <span className="pill" style={{fontSize: 12, opacity: 0.9}}>완료 ✓</span>
              ) : null}
            </h2>
            <p className="cardDesc">{m.pitch[locale as 'ko' | 'en']}</p>

            <div style={{marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap'}}>
              {m.lessonTopicIds.map(tid => {
                const topic = WEB_LESSON_TOPICS.find(t => t.id === tid);
                if (!topic) return null;
                return (
                  <span key={tid} className="pill" style={{fontSize: 11, opacity: 0.9}}>
                    {topic.titleKo}
                  </span>
                );
              })}
            </div>

            <div style={{marginTop: 12}}>
              <Link className="btn btnPrimary" href={`/${locale}/web/${m.id}`}>시작하기 →</Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
