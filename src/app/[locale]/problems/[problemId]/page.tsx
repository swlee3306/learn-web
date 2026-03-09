'use client';

import {useMemo, useState} from 'react';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {problems, problemsById} from '@/content/problems';

function norm(s: string) {
  return s.trim().toLowerCase();
}

export default function ProblemDetailPage() {
  const params = useParams<{locale: string; problemId: string}>();
  const locale = params?.locale || 'ko';
  const problemId = params?.problemId || '';
  const p = problemsById[problemId];

  const idx = useMemo(() => problems.findIndex(x => x.id === problemId), [problemId]);
  const prev = idx > 0 ? problems[idx - 1] : null;
  const next = idx >= 0 && idx < problems.length - 1 ? problems[idx + 1] : null;

  const [choice, setChoice] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<{pass: boolean; msg: string} | null>(null);
  const [saving, setSaving] = useState(false);

  if (!p) {
    return (
      <div className="grid">
        <section className="card">
          <h1 className="cardTitle">문제를 찾을 수 없어</h1>
          <Link className="btn" href={`/${locale}/problems`}>목록으로</Link>
        </section>
      </div>
    );
  }

  async function grade() {
    setResult(null);

    let pass = false;
    if (p.type === 'multiple_choice') {
      pass = choice !== '' && choice === String(p.answer);
    } else {
      const answers = Array.isArray(p.answer) ? p.answer : [String(p.answer)];
      pass = answers.map(a => norm(String(a))).includes(norm(text));
    }

    if (!pass) {
      setResult({pass: false, msg: 'FAIL — 정답이 아니야. 힌트: 문제의 핵심 용어를 다시 확인해봐.'});
      return;
    }

    setResult({pass: true, msg: 'PASS — 정답! 완료로 기록 중…'});
    setSaving(true);
    try {
      await fetch('/learn/api/progress/complete', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({missionId: `problem-${p.id}`})
      });
    } catch {
      // ignore
    } finally {
      setSaving(false);
      setResult({pass: true, msg: 'PASS — 정답! 완료로 기록했어.'});
    }
  }

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">PROBLEM {p.id}</div>
        <h1 className="h1">{p.title}</h1>
        <p className="p" style={{whiteSpace: 'pre-wrap'}}>{p.prompt}</p>
        <div style={{marginTop: 10, display: 'flex', gap: 10, flexWrap: 'wrap'}}>
          <Link className="btn" href={`/${locale}/problems`}>← 목록</Link>
          <Link className="btn" href={`/${locale}/me`}>내 진행</Link>
        </div>
      </section>

      <section className="card">
        <h2 className="cardTitle">답안</h2>

        {p.type === 'multiple_choice' ? (
          <div style={{display: 'grid', gap: 8, marginTop: 10}}>
            {(p.options || []).map((opt, i) => (
              <label key={i} className="smallCard" style={{display: 'flex', gap: 10, alignItems: 'baseline', cursor: 'pointer'}}>
                <input type="radio" name="opt" checked={choice === String(i)} onChange={() => setChoice(String(i))} />
                <span><b>{i + 1}.</b> {opt}</span>
              </label>
            ))}
          </div>
        ) : (
          <div style={{marginTop: 10, display: 'grid', gap: 8}}>
            <input
              className="input"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="정답을 입력"
            />
            <div className="smallText" style={{opacity: 0.8}}>대소문자/앞뒤 공백은 무시해.</div>
          </div>
        )}

        <div style={{marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap'}}>
          <button className="btn btnPrimary" onClick={grade} disabled={saving}>{saving ? '기록 중…' : '검사'}</button>
        </div>

        {result ? (
          <div className="smallText" style={{marginTop: 10, color: result.pass ? '#7CFF6B' : '#ffb4b4'}}>
            {result.msg}
            {result.pass ? (
              <div style={{marginTop: 8, opacity: 0.9}}>
                <b>해설:</b> {p.explanation}
              </div>
            ) : null}
          </div>
        ) : null}

        <hr className="sep" style={{marginTop: 14}} />

        <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
          {prev ? <Link className="btn" href={`/${locale}/problems/${prev.id}`}>← 이전</Link> : null}
          {next ? <Link className="btn btnPrimary" href={`/${locale}/problems/${next.id}`}>다음 →</Link> : null}
        </div>
      </section>
    </div>
  );
}
