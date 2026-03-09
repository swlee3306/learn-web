/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Debounce</h1>
  <input id="q" placeholder="type..." />
  <p id="out" class="msg">query: </p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
  js: `const q=document.querySelector('#q');
const out=document.querySelector('#out');
let t=null;

function apply(){
  out.textContent='query: '+q.value;
}

// TODO: input 이벤트에서
// - clearTimeout(t)
// - t=setTimeout(apply, 300)
`
};

export default function mission74() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const q=document.querySelector('#q');
  const out=document.querySelector('#out');
  if(!q||!out){ fail('요소 존재', {tab:'html', fix:'#q, #out 필요'}); return results; }
  pass('요소 존재');

  q.value='a'; q.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,50));
  if((out.textContent||'').includes('a')) fail('즉시 반영 금지', {tab:'js', fix:'debounce로 300ms 후 반영'});
  else pass('즉시 반영 금지');

  await new Promise(r=>setTimeout(r,320));
  if(!(out.textContent||'').includes('a')) fail('300ms 후 반영', {tab:'js', fix:'setTimeout(apply,300)'});
  else pass('300ms 후 반영');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 74 — 간단한 debounce(검색 입력)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-74" title="Mission 74" defaults={DEFAULT} testsJs={testsJs} minutes={26} nextMissionId="mission-75" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`입력 후 300ms 뒤에 반영`}</GuideBox>
          <GuideBox title="2)">{`연속 입력 시 이전 타이머 취소`}</GuideBox>
          <GuideBox title="3)">{`현재 쿼리 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
