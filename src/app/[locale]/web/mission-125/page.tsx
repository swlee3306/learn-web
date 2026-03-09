/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Stepper</h1>
  <div id="steps" class="steps"></div>
  <div class="row">
    <button id="prev">Prev</button>
    <button id="next" class="primary">Next</button>
  </div>
  <p id="msg" class="msg">step 1 / 3</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.steps{display:flex;gap:10px;justify-content:center;margin-bottom:12px;}
.step{width:34px;height:34px;border-radius:999px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);display:grid;place-items:center;opacity:0.6;}
.step.on{opacity:1;background: rgba(34,197,94,0.18); border-color: rgba(34,197,94,0.35)}
.row{display:flex;gap:8px;justify-content:center;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button:disabled{opacity:0.45;cursor:not-allowed;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const stepsEl=document.querySelector('#steps');
const prev=document.querySelector('#prev');
const next=document.querySelector('#next');
const msg=document.querySelector('#msg');
const total=3;
let i=1;

function render(){
  stepsEl.innerHTML = Array.from({length: total}, (_,idx)=>{
    const n=idx+1;
    return '<div class="step'+(n===i?' on':'')+'">'+n+'</div>';
  }).join('');
  msg.textContent='step '+i+' / '+total;
  prev.disabled = i<=1;
  next.disabled = i>=total;
}
render();

// TODO: prev/next 클릭 시 i를 -/+1 (범위 제한) 후 render()
`
};

export default function mission125() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const next=document.querySelector('#next');
  const msg=document.querySelector('#msg');
  if(!next||!msg){ fail('요소 존재', {tab:'html', fix:'#next #msg 필요'}); return results; }
  pass('요소 존재');

  const before=msg.textContent;
  next.click();
  await new Promise(r=>setTimeout(r,30));
  if(msg.textContent===before) fail('Next 이동', {tab:'js', fix:'next 클릭에서 i 증가 후 render()'});
  else pass('Next 이동');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 125 — 간단한 단계 진행(stepper) UI</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-125" title="Mission 125" defaults={DEFAULT} testsJs={testsJs} minutes={24} nextMissionId="mission-126" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Next/Prev로 단계 이동`}</GuideBox>
          <GuideBox title="2)">{`경계에서 disabled`}</GuideBox>
          <GuideBox title="3)">{`현재 단계 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
