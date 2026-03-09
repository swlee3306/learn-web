'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">카운트다운</h1>
  <div class="card">
    <div id="timer" class="timer">Ready</div>
    <button id="start" class="primary">Start</button>
    <div class="hint">목표: 버튼을 누르면 3 → 2 → 1 → GO! (setTimeout)</div>
  </div>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(860px,92vw);} .h1{margin:0 0 10px 0;font-size:28px;}
.card{border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.25);border-radius:16px;padding:16px;display:grid;gap:12px;justify-items:start;}
.timer{font-size:56px;font-weight:1000;letter-spacing:1px;padding:10px 12px;border-radius:16px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.06)}
button{border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button:hover{background:rgba(255,255,255,0.12);} button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
button:disabled{opacity:0.45;cursor:not-allowed}
.hint{opacity:0.7;font-size:12px}
`,
  js: `// 목표: Start를 누르면 3..2..1..GO!가 순서대로 출력되게 해.
// 힌트: setTimeout을 여러 번 쓰거나, 함수로 체인 만들기.

const el = document.getElementById('timer');
const btn = document.getElementById('start');
let running = false;

function start(){
  // TODO: 중복 시작 방지 (running)
  // TODO: btn.disabled = true
  // TODO: 3 → 2 → 1 → GO! 순서대로 업데이트
  // TODO: 끝나면 running=false, btn.disabled=false
}

btn.addEventListener('click', start);
`
};

export default function Mission15() {
  const testsJs = useMemo(() => {
    return `
      window.__learnRunTests = async function() {
        const results = [];
        const pass = (name, details) => results.push({name, pass:true, details: details || ''});
        const fail = (name, details) => results.push({name, pass:false, details: details || ''});

        const el = document.getElementById('timer');
        const btn = document.getElementById('start');
        if (!el || !btn) {
          fail('필수 요소 존재', {tab:'html', fix:'#timer/#start 필요'});
          return results;
        }
        pass('필수 요소 존재');

        try {
          btn.click();
          await new Promise(r => setTimeout(r, 50));
          const t0 = (el.textContent || '').trim();
          if (t0 !== '3' && t0 !== '2' && t0 !== '1') {
            fail('시작하면 숫자가 뜸', {tab:'js', fix:'start()에서 바로 3을 출력하고 타이머를 시작해.', snippet:"function start(){\\n  if (running) return;\\n  running = true;\\n  btn.disabled = true;\\n  el.textContent = \"3\";\\n  setTimeout(() => { el.textContent = \"2\"; }, 200);\\n  setTimeout(() => { el.textContent = \"1\"; }, 400);\\n  setTimeout(() => {\\n    el.textContent = \"GO!\";\\n    running = false;\\n    btn.disabled = false;\\n  }, 600);\\n}"});
          } else pass('시작하면 숫자가 뜸', t0);

          await new Promise(r => setTimeout(r, 750));
          const t1 = (el.textContent || '').trim();
          if (t1 !== 'GO!') fail('마지막에 GO!', {tab:'js', fix:'setTimeout 체인의 마지막에서 GO!를 출력해.'});
          else pass('마지막에 GO!');
        } catch (e) {
          fail('카운트다운', String(e && (e.stack || e)));
        }

        return results;
      };
    `;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 15 — 타이머 흉내(3..2..1)</h1>
        <p className="p">setTimeout으로 “순차 UI 업데이트”를 만들어보자.</p>
      </section>

      <WebSandboxPanel missionId="mission-15" title="Mission 15" defaults={DEFAULT} testsJs={testsJs} minutes={15} />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1) setTimeout 체인">{`3→2→1→GO! 순서`}</GuideBox>
          <GuideBox title="2) 중복 시작 방지">{`running 플래그 + 버튼 disabled`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
