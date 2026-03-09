'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">루피 토글</h1>
  <div class="card">
    <button id="luffy" class="primary">루피 버튼</button>
    <div id="mood" class="mood">😐 OFF</div>
  </div>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(860px,92vw);} .h1{margin:0 0 10px 0;font-size:28px;}
.card{border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.25);border-radius:16px;padding:16px;display:grid;gap:12px;justify-items:start;}
button{border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button:hover{background:rgba(255,255,255,0.12);} button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.mood{font-size:22px;font-weight:900}
`,
  js: `// 목표: 버튼을 누를 때마다 ON/OFF 토글
let on = false;
const btn = document.getElementById('luffy');
const mood = document.getElementById('mood');

function render(){
  mood.textContent = on ? '🔥 ON' : '😐 OFF';
}

btn.addEventListener('click', () => {
  // TODO: on 값을 반대로 뒤집고(render 포함)
});

render();
`
};

export default function Mission13() {
  const testsJs = useMemo(() => {
    return `
      window.__learnRunTests = async function() {
        const results = [];
        const pass = (name, details) => results.push({name, pass:true, details: details || ''});
        const fail = (name, details) => results.push({name, pass:false, details: details || ''});

        const btn = document.getElementById('luffy');
        const mood = document.getElementById('mood');
        if (!btn || !mood) {
          fail('필수 요소 존재', {tab:'html', fix:'#luffy/#mood가 필요'});
          return results;
        }
        pass('필수 요소 존재');

        try {
          const a = (mood.textContent || '').trim();
          btn.click();
          await new Promise(r => setTimeout(r, 30));
          const b = (mood.textContent || '').trim();
          btn.click();
          await new Promise(r => setTimeout(r, 30));
          const c = (mood.textContent || '').trim();

          if (a === b || b === c) {
            fail('토글 동작', {tab:'js', fix:'on = !on; render(); 를 클릭 이벤트에 넣어.', snippet:"btn.addEventListener(\"click\", () => {\\n  on = !on;\\n  render();\\n});"});
          } else {
            pass('토글 동작', a + ' → ' + b + ' → ' + c);
          }
        } catch (e) {
          fail('토글 동작', String(e && (e.stack || e)));
        }

        return results;
      };
    `;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 13 — 루피 버튼(토글)</h1>
        <p className="p">boolean 하나로 ON/OFF를 만들어보자.</p>
      </section>

      <WebSandboxPanel missionId="mission-13" title="Mission 13" defaults={DEFAULT} testsJs={testsJs} minutes={12} nextMissionId="mission-14" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1) on = !on">{`클릭할 때마다 상태를 반전`}</GuideBox>
          <GuideBox title="2) render()">{`상태를 화면에 그린다`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
