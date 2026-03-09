'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Mission 6</h1>
  <p id="msg" class="msg">버튼을 누르면 이 문장이 바뀌어야 해.</p>
  <button id="btn" class="primary">클릭</button>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(860px,92vw);}
.h1{margin:0 0 8px 0;font-size:28px;}
.msg{margin:0 0 14px 0;opacity:0.9;}
button{border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button:hover{background:rgba(255,255,255,0.12);}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
`,
  js: `// 목표: 버튼(#btn)을 클릭하면 #msg 텍스트를 바꿔.
// 힌트: document.querySelector / addEventListener / textContent

const btn = document.querySelector('#btn');
const msg = document.querySelector('#msg');

// TODO: 클릭 이벤트를 연결하고, msg.textContent를 바꿔.
// (옵션) 클릭할 때마다 두 문장을 번갈아 토글해도 좋아.
`
};

export default function Mission6() {
  const testsJs = useMemo(() => {
    return `
      window.__learnRunTests = async function() {
        const results = [];
        const pass = (name, details) => results.push({name, pass:true, details: details || ''});
        const fail = (name, details) => results.push({name, pass:false, details: details || ''});

        const btn = document.querySelector('#btn');
        const msg = document.querySelector('#msg');
        if (!btn) fail('버튼 존재 (#btn)', {tab:'html', fix:'id="btn"인 버튼을 만들어줘.'});
        else pass('버튼 존재 (#btn)');
        if (!msg) fail('메시지 존재 (#msg)', {tab:'html', fix:'id="msg"인 요소를 만들어줘.'});
        else pass('메시지 존재 (#msg)');

        try {
          if (!btn || !msg) return results;
          const before = (msg.textContent || '').trim();
          btn.click();
          await new Promise(r => setTimeout(r, 30));
          const after = (msg.textContent || '').trim();
          if (!after) fail('클릭 시 텍스트 변경', {tab:'js', fix:'msg.textContent에 새로운 문장을 넣어줘.'});
          else if (after === before) fail('클릭 시 텍스트 변경', {tab:'js', fix:'클릭 후 msg.textContent가 before와 달라야 해.', snippet:"btn.addEventListener('click', () => {\\n  msg.textContent = '바뀐 문장!';\\n});"});
          else pass('클릭 시 텍스트 변경', before + ' → ' + after);
        } catch (e) {
          fail('클릭 시 텍스트 변경', String(e && (e.stack || e)));
        }

        return results;
      };
    `;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 6 — 버튼 클릭 = 텍스트 바꾸기</h1>
        <p className="p">버튼을 클릭해서 DOM 텍스트를 바꿔봐. <b>검사</b>를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-6" title="Mission 6" defaults={DEFAULT} testsJs={testsJs} minutes={10} nextMissionId="mission-7" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1) 클릭 이벤트 연결">{`#btn에 addEventListener('click', ...)를 붙여.`}</GuideBox>
          <GuideBox title="2) 텍스트 바꾸기">{`msg.textContent를 클릭할 때마다 바뀌게 만들어.`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
