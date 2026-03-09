import Link from 'next/link';
import {problemCategories, problems} from '@/content/problems';

export default async function ProblemsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const countByCat: Record<string, number> = {};
  for (const p of problems) countByCat[p.categoryId] = (countByCat[p.categoryId] || 0) + 1;

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">PRACTICE</div>
        <h1 className="h1">문제 풀이</h1>
        <p className="p">객관식/단답 문제로 개념을 빠르게 점검해. (엄격 검사)</p>
        <div style={{marginTop: 10, display: 'flex', gap: 10, flexWrap: 'wrap'}}>
          <Link className="btn" href={`/${locale}`}>← 홈</Link>
          <Link className="btn btnPrimary" href={`/${locale}/problems/${problems[0]?.id}`}>첫 문제 풀기 →</Link>
        </div>
      </section>

      <section className="card">
        <h2 className="cardTitle">카테고리</h2>
        <p className="cardDesc">총 {problems.length}문제</p>
        <div style={{marginTop: 12, display: 'grid', gap: 10}}>
          {problemCategories.map(c => (
            <div key={c.id} className="smallCard">
              <div className="smallTitle">{c.title} · {countByCat[c.id] || 0}문제</div>
              <div className="smallText" style={{opacity: 0.85, marginTop: 6}}>{c.desc}</div>
              <div style={{marginTop: 10}}>
                <Link className="btn" href={`/${locale}/problems?cat=${c.id}`}>보기</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
