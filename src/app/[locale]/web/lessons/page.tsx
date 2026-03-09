import Link from 'next/link';
import {getLocale} from 'next-intl/server';
import {WEB_LESSON_TOPICS} from '@/content/webLessons';
import {WEB_MISSIONS} from '@/content/webMissions';

export default async function WebLessonsPage() {
  const locale = await getLocale();

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB LESSONS</div>
        <h1 className="h1">기초 강좌(영상)</h1>
        <p className="p" style={{maxWidth: 820}}>
          한국어 위주로, 짧게 나눠서 설명하는 영상만 “검증해서” 모아뒀어.
          미션을 하다가 막히면, 아래 토픽에서 관련 영상 1~2개만 먼저 보고 다시 돌아오면 된다.
        </p>
        <div style={{marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap'}}>
          <Link className="btn btnPrimary" href={`/${locale}/web`}>웹 미션 목록으로</Link>
          <Link className="btn" href={`/${locale}/web/guide`}>웹 가이드</Link>
        </div>
      </section>

      {WEB_LESSON_TOPICS.map(topic => {
        const missions = WEB_MISSIONS.filter(m => m.lessonTopicIds.includes(topic.id));

        return (
          <section key={topic.id} id={topic.id} className="card">
            <h3 className="cardTitle" style={{fontSize: 18}}>{topic.titleKo}</h3>
            <p className="cardDesc" style={{color: 'var(--muted)'}}>{topic.summaryKo}</p>

            {topic.videos.length ? (
              <ul style={{margin: '10px 0 0 18px', lineHeight: 1.8}}>
                {topic.videos.map((v, i) => (
                  <li key={i}>
                    <a href={v.url} target="_blank" rel="noreferrer" style={{color: '#ffd43b'}}>{v.titleKo}</a>
                    <span style={{opacity: 0.75}}>
                      {v.channel ? ` · ${v.channel}` : ''}
                      {typeof v.minutes === 'number' ? ` · ${v.minutes}m` : ''}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="smallText" style={{marginTop: 10, color: 'var(--muted)'}}>
                (여기에 검증된 영상 링크를 추가할 예정)
              </div>
            )}

            <div style={{marginTop: 14}}>
              <div className="kicker">이 토픽이 도움되는 미션</div>
              {missions.length ? (
                <div style={{marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 8}}>
                  {missions.map(m => (
                    <Link
                      key={m.id}
                      className="pill"
                      href={`/${locale}/web/${m.id}`}
                      style={{fontSize: 12, textDecoration: 'none'}}
                    >
                      {m.id}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="smallText" style={{marginTop: 8, color: 'var(--muted)'}}>
                  (아직 연결된 미션이 없어)
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
