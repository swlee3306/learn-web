/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Countdown</h1>
  <p id="out" class="msg">Ready</p>
  <button id="start" class="primary">Start</button>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 10px 0;font-size:28px;}
.msg{opacity:0.9;margin:0 0 14px 0;font-size:22px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
`,
  js: `const out=document.querySelector('#out');
const start=document.querySelector('#start');

// TODO: Start를 누르면 out에 5,4,3,2,1,0을 표시하고
// 끝나면 GO! 로 바꿔.
// (옵션) 이미 진행 중이면 두 번 시작되지 않게 막아.
`
};

export default function mission32() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});

  const out=document.querySelector('#out');
  const start=document.querySelector('#start');
  if(!out||!start){ fail('요소 존재', {tab:'html', fix:'#out, #start가 필요해.'}); return results; }
  pass('요소 존재');

  start.click();
  await new Promise(r=>setTimeout(r,120));
  const t=(out.textContent||'').trim();
  if(!t) fail('카운트다운 시작', {tab:'js', fix:'Start 클릭 시 out.textContent를 숫자로 바꿔줘.'}); else pass('카운트다운 시작', t);

  let ok=false;
  for(let i=0;i<70;i++){
    if(/GO/i.test((out.textContent||''))) { ok=true; break; }
    await new Promise(r=>setTimeout(r,100));
  }
  if(!ok) fail('끝나면 GO!', {tab:'js', fix:'카운트다운이 끝나면 out.textContent를 GO! 로 바꿔줘.'}); else pass('끝나면 GO!');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 32 — 5초 카운트다운 후 GO</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-32" title="Mission 32" defaults={DEFAULT} testsJs={testsJs} minutes={20} nextMissionId="mission-33" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Start 누르면 5→0 카운트다운`}</GuideBox>
          <GuideBox title="2)">{`끝나면 GO 표시`}</GuideBox>
          <GuideBox title="3)">{`중복 시작 방지`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
