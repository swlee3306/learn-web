'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Mini Quiz</h1>

  <div class="bar">
    <span class="pill">Score: <b id="score">0</b></span>
    <span class="pill">Combo: <b id="combo">0</b></span>
    <button id="share">Share</button>
  </div>

  <div id="list" class="list"></div>
  <pre id="shareOut" class="out" hidden></pre>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;display:grid;place-items:center;min-height:100vh;}
.wrap{width:min(900px,92vw);}
.h1{font-size:28px;margin:0 0 12px 0;}
.bar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px;}
.pill{border:1px solid rgba(255,255,255,0.2);padding:6px 10px;border-radius:999px;background:rgba(255,255,255,0.06);}
button{border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;padding:10px 14px;border-radius:10px;cursor:pointer;}
button:hover{background:rgba(255,255,255,0.12);}
.list{display:grid;gap:10px;}
.q{border:1px solid rgba(255,255,255,0.15);border-radius:16px;padding:12px;background:rgba(0,0,0,0.25);}
.qTitle{font-weight:900;margin-bottom:8px;}
.choices{display:flex;gap:8px;flex-wrap:wrap;}
.choice{padding:8px 10px;border-radius:999px;border:1px solid rgba(255,255,255,0.2);cursor:pointer;background:rgba(255,255,255,0.06)}
.choice:hover{background:rgba(255,255,255,0.12)}
.choice.ok{border-color: rgba(124,255,107,0.35); background: rgba(124,255,107,0.12)}
.choice.no{border-color: rgba(255,180,180,0.35); background: rgba(255,180,180,0.10)}
.out{margin-top:12px;white-space:pre-wrap;border:1px solid rgba(255,255,255,0.15);border-radius:16px;padding:12px;background:rgba(255,255,255,0.06)}
`,
  js: `// TODO: add at least 5 questions
const QUESTIONS = [
  {q: 'HTML stands for?', choices: ['HyperText Markup Language','Hot Mail','How To Make Lasagna'], a: 0},
  {q: 'CSS is mainly for?', choices: ['Styling','Database','Payments'], a: 0},
];

let score = 0;
let combo = 0;

const elScore = document.getElementById('score');
const elCombo = document.getElementById('combo');
const elList = document.getElementById('list');
const elShare = document.getElementById('share');
const elOut = document.getElementById('shareOut');

function render(){
  elScore.textContent = String(score);
  elCombo.textContent = String(combo);
}

function resetUI(){
  elList.innerHTML = '';
  QUESTIONS.forEach((it, idx) => {
    const box = document.createElement('div');
    box.className = 'q';
    box.innerHTML = '<div class="qTitle">Q'+(idx+1)+'. '+it.q+'</div>';
    const row = document.createElement('div');
    row.className = 'choices';
    it.choices.forEach((c, ci) => {
      const b = document.createElement('button');
      b.className = 'choice';
      b.textContent = c;
      b.addEventListener('click', () => {
        const ok = (ci === it.a);
        if (ok) {
          score += 10;
          combo += 1;
          // TODO: combo bonus: e.g. +5 per combo
          b.classList.add('ok');
        } else {
          combo = 0;
          b.classList.add('no');
        }
        render();
      });
      row.appendChild(b);
    });
    box.appendChild(row);
    elList.appendChild(box);
  });
}

// Test hooks
window.__quiz_getShareText = function() { /* TODO */ };
window.__quiz_applyComboBonus = function(s, comboVal) { /* TODO */ };

elShare.addEventListener('click', () => {
  const txt = window.__quiz_getShareText();
  elOut.hidden = false;
  elOut.textContent = txt || '(empty)';
});

render();
resetUI();
`
};

export default function Mission4() {
  const testsJs = useMemo(() => {
    return `
      window.__learnRunTests = async function() {
        const results = [];
        const pass = (name, details) => results.push({name, pass:true, details: details || ''});
        const fail = (name, details) => results.push({name, pass:false, details: details || ''});

        // 1) At least 5 questions rendered
        try {
          const qs = document.querySelectorAll('.q');
          if (!qs || qs.length < 5) fail('문제 5개 추가', {tab:'js', fix:'QUESTIONS 배열에 최소 5개 문제를 추가해 (렌더된 .q가 5개 이상).', snippet:'// 예시\nQUESTIONS.push({q:"JS는?", choices:["언어","과일","운동"], a:0});'});
          else pass('문제 5개 추가', 'count=' + qs.length);
        } catch (e) {
          fail('문제 5개 추가', String(e && (e.stack || e)));
        }

        // 2) Combo bonus implemented
        try {
          if (typeof window.__quiz_applyComboBonus !== 'function') {
            fail('콤보 보너스', {tab:'js', fix:'combo에 따라 점수가 증가하도록 함수를 구현해. (예: score + combo*5)', snippet:'window.__quiz_applyComboBonus = function(score, combo) {\n  return Number(score||0) + Number(combo||0) * 5;\n};'});
          } else {
            const out = window.__quiz_applyComboBonus(10, 3);
            if (typeof out !== 'number') fail('콤보 보너스', {tab:'js', fix:'반드시 number를 반환해야 해.'});
            else if (out <= 10) fail('콤보 보너스', {tab:'js', fix:'combo=3이면 10보다 큰 값이 나와야 해.'});
            else pass('콤보 보너스', '10 + bonus → ' + out);
          }
        } catch (e) {
          fail('콤보 보너스', String(e && (e.stack || e)));
        }

        // 3) Share text
        try {
          if (typeof window.__quiz_getShareText !== 'function') {
            fail('결과 공유 텍스트', {tab:'js', fix:'점수/콤보/총문항 정보를 포함한 문자열을 만들어 반환해.', snippet:'window.__quiz_getShareText = function() {\n  return "MiniQuiz 결과 — 점수 " + score + ", 콤보 " + combo + ", 문항 " + QUESTIONS.length + "개";\n};'});
          } else {
            const txt = String(window.__quiz_getShareText() || '');
            if (txt.length < 20) fail('결과 공유 텍스트', {tab:'js', fix:'너무 짧아. 점수/콤보/총문항 같은 숫자를 포함해.'});
            else pass('결과 공유 텍스트');
          }
        } catch (e) {
          fail('결과 공유 텍스트', String(e && (e.stack || e)));
        }

        return results;
      };
    `;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 4 — 미니 퀴즈(점수/콤보)</h1>
        <p className="p">문제 리스트 렌더링 + 점수 + 콤보. <b>검사</b>를 통과하도록 기능을 추가해봐.</p>
      </section>

      <WebSandboxPanel missionId="mission-4" title="Mission 4" defaults={DEFAULT} testsJs={testsJs} minutes={20} nextMissionId="mission-5" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1) 문제 5개 추가">
            {`JS의 QUESTIONS 배열에 최소 5개 문제를 넣어.`}
          </GuideBox>
          <GuideBox title="2) 콤보 보너스">
            {`window.__quiz_applyComboBonus(score, combo)를 구현해.
예: score + combo*5 처럼.`}
          </GuideBox>
          <GuideBox title="3) 결과 공유 텍스트">
            {`window.__quiz_getShareText()를 구현해.
점수/콤보/총문항 등을 한 문장으로 요약.`}
          </GuideBox>
        </div>
      </section>
    </div>
  );
}
