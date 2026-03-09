import Link from 'next/link';
import {getLocale, getTranslations} from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations('home');
  const locale = await getLocale();

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">BEGINNER-FRIENDLY • PROJECT-BASED</div>
        <h1 className="h1">{t('headline')}</h1>
        <p className="p">{t('desc')}</p>

        <div style={{marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap'}}>
          <Link className="btn btnPrimary" href={`/${locale}/web/mission-1`}>
            {t('startWeb')} →
          </Link>
          <span className="btn" style={{opacity: 0.7, cursor: 'not-allowed'}}>
            {t('startPython')}
          </span>
        </div>
      </section>

      <section className="cards">
        <div className="card">
          <h2 className="cardTitle">Web Starter</h2>
          <p className="cardDesc">HTML/CSS/JS로 “내가 만든 게 바로 화면에 뜨는” 경험부터. 비전공자에게 제일 재미가 빨리 옴.</p>
          <div style={{marginTop: 12}}>
            <Link className="pill pillActive" href={`/${locale}/web/mission-1`}>
              미션 1: 네온사인 만들기
            </Link>
          </div>
        </div>

        <div className="card" style={{opacity: 0.82}}>
          <h2 className="cardTitle">Python Starter</h2>
          <p className="cardDesc">브라우저 실행은 v2에서 지원 예정. 대신 로컬 설치/실행 가이드를 따라 “내 PC에서 진짜 프로그램”을 돌려볼 거야.</p>
          <div style={{marginTop: 12, color: 'var(--muted2)'}}>Coming soon</div>
        </div>
      </section>

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>진로 힌트</h3>
        <p className="cardDesc">웹이 재밌으면 프론트엔드, 자동화/데이터가 재밌으면 파이썬/백엔드, 최적화가 재밌으면 시스템/성능 쪽이 잘 맞을 확률이 커.</p>
      </section>
    </div>
  );
}
