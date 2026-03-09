/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Dark mode</h1>
  <button id="toggle" class="primary">Toggle</button>
  <p id="msg" class="msg">mode: dark</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;transition:background 200ms,color 200ms;}
body.light{background:#f8fafc;color:#0f172a;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
body.light button{color:#0f172a;border-color:#cbd5e1;background:#fff}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const toggle=document.querySelector('#toggle');
const msg=document.querySelector('#msg');
const KEY='learn.theme';
let mode = localStorage.getItem(KEY) || 'dark';

function render(){
  document.body.classList.toggle('light', mode==='light');
  msg.textContent='mode: '+mode;
}

render();

// TODO: toggle 클릭 시 mode를 'dark'/'light'로 토글하고
// localStorage.setItem(KEY, mode) 후 render()
`
};

export default function mission66() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const toggle=document.querySelector('#toggle');
  const msg=document.querySelector('#msg');
  if(!toggle||!msg){ fail('요소 존재', {tab:'html', fix:'#toggle, #msg 필요'}); return results; }
  pass('요소 존재');

  const before=msg.textContent;
  toggle.click();
  await new Promise(r=>setTimeout(r,30));
  const after=msg.textContent;
  if(after===before) fail('토글 동작', {tab:'js', fix:'클릭에서 mode 토글 + 저장 + render'});
  else pass('토글 동작');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 66 — Dark mode 토글(저장 포함)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-66" title="Mission 66" defaults={DEFAULT} testsJs={testsJs} minutes={20} nextMissionId="mission-67" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`버튼으로 dark 클래스 토글`}</GuideBox>
          <GuideBox title="2)">{`상태 저장/로드`}</GuideBox>
          <GuideBox title="3)">{`현재 모드 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
