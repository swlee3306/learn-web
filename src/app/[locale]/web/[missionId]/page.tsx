import Link from 'next/link';
import {getLocale} from 'next-intl/server';
import {getWebMission} from '@/content/webMissions';
import {WEB_LESSON_TOPICS} from '@/content/webLessons';
import CompleteButton from '@/components/progress/CompleteButton';

export default async function WebMissionPage({params}: {params: Promise<{missionId: string}>}) {
  const locale = await getLocale();
  const {missionId} = await params;
  const m = getWebMission(missionId);

  if (!m) {
    return (
      <div className="card">
        <h1 className="cardTitle">미션을 찾을 수 없음</h1>
        <p className="cardDesc">{missionId}</p>
        <Link className="btn btnPrimary" href={`/${locale}/web`}>웹 스타터로</Link>
      </div>
    );
  }

  const title = m.title[locale as 'ko' | 'en'];
  const pitch = m.pitch[locale as 'ko' | 'en'];
  const outcomes = m.outcomes[locale as 'ko' | 'en'];
  const checklist = m.checklist[locale as 'ko' | 'en'];
  const checklistGuide = m.checklistGuide?.[locale as 'ko' | 'en'];

  const lessonTopics = WEB_LESSON_TOPICS.filter(t => m.lessonTopicIds.includes(t.id));

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">{m.stage} · {m.minutes}m</div>
        <h1 className="h1" style={{fontSize: 28}}>{title}</h1>
        <p className="p">{pitch}</p>
        <div style={{marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap'}}>
          <Link className="btn" href={`/${locale}/web`}>← 목록</Link>
          <CompleteButton missionId={m.id} />
          {m.next ? (
            <Link className="btn btnPrimary" href={`/${locale}/web/${m.next}`}>다음 미션 →</Link>
          ) : null}
        </div>
      </section>

      <section className="cards">
        <div className="card">
          <h2 className="cardTitle" style={{fontSize: 20}}>배우는 것</h2>
          <ul style={{color: 'var(--muted)', lineHeight: 1.7, margin: '10px 0 0 18px'}}>
            {outcomes.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </div>

        <div className="card">
          <h2 className="cardTitle" style={{fontSize: 20}}>관련 강좌(영상)</h2>
          {lessonTopics.length ? (
            <div style={{marginTop: 10, display: 'flex', flexDirection: 'column', gap: 12}}>
              {lessonTopics.map(t => (
                <div key={t.id} style={{borderTop: '1px solid var(--line)', paddingTop: 10}}>
                  <div className="kicker">{t.titleKo}</div>
                  <p className="cardDesc" style={{marginTop: 6}}>{t.summaryKo}</p>
                  {t.videos.length ? (
                    <ul style={{color: 'var(--muted)', lineHeight: 1.7, margin: '10px 0 0 18px'}}>
                      {t.videos.map(v => (
                        <li key={v.url}>
                          <a href={v.url} target="_blank" rel="noreferrer" style={{color: 'var(--link)'}}>
                            {v.titleKo}
                          </a>
                          {v.channel ? <span style={{color: 'var(--muted2)'}}> · {v.channel}</span> : null}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="cardDesc" style={{marginTop: 8, color: 'var(--muted2)'}}>
                      (이 토픽의 추천 영상은 곧 추가할게.)
                    </p>
                  )}
                </div>
              ))}
              <div style={{marginTop: 4}}>
                <Link className="btn" href={`/${locale}/web/lessons`}>강좌 전체 보기 →</Link>
              </div>
            </div>
          ) : (
            <p className="cardDesc" style={{marginTop: 10, color: 'var(--muted2)'}}>
              (이 미션에 연결된 강좌가 아직 없어. 곧 채워둘게.)
            </p>
          )}
        </div>

        <div className="card">
          <h2 className="cardTitle" style={{fontSize: 20}}>완료 체크</h2>
          <ul style={{color: 'var(--muted)', lineHeight: 1.7, margin: '10px 0 0 18px'}}>
            {checklist.map((x, i) => <li key={i}>{x}</li>)}
          </ul>

          {checklistGuide ? (
            <div style={{marginTop: 12}}>
              <div className="kicker">HOW TO</div>
              <ol style={{color: 'var(--muted)', lineHeight: 1.7, margin: '10px 0 0 18px'}}>
                {checklistGuide.map((x, i) => (
                  <li key={i} style={{marginBottom: 10}}>
                    <div style={{whiteSpace: 'pre-wrap'}}>{x}</div>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <p className="cardDesc" style={{marginTop: 10, color: 'var(--muted2)'}}>
              (이 미션의 상세 가이드는 순차적으로 추가할게. 막히면 Mission 1에서 HTML/CSS/JS 탭을 바꿔보며 감을 잡는 게 제일 빠름.)
            </p>
          )}
        </div>
      </section>

      <section className="card">
        <h2 className="cardTitle" style={{fontSize: 20}}>실습</h2>
        <p className="cardDesc">이 미션은 실습 페이지로 연결돼. 아래로 이동해서 코드 실행해봐.</p>
        <Link className="btn btnPrimary" href={`/${locale}/web/${m.id}`}>실습 페이지 열기 →</Link>
        <p className="cardDesc" style={{marginTop: 10, color: 'var(--muted2)'}}>
          (각 미션별 실습 페이지를 순차적으로 확장 중. 미션에 따라 “검사”가 통과하도록 기능을 추가해봐.)
        </p>
      </section>
    </div>
  );
}
