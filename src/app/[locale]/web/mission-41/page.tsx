/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Quote</h1>
  <button id="btn" class="primary">Get</button>
  <p id="out" class="msg">-</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const btn=document.querySelector('#btn');
const out=document.querySelector('#out');

// TODO: 클릭하면 out에 'Loading...'을 먼저 보여주고,
// https://api.quotable.io/random 에서 content를 받아 표시해.
// 실패하면 out에 'Error' 표시.
`
};

export default function mission41() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn=document.querySelector('#btn');
  const out=document.querySelector('#out');
  if(!btn||!out){ fail('요소 존재', {tab:'html', fix:'#btn, #out 필요'}); return results; }
  pass('요소 존재');

  btn.click();
  await new Promise(r=>setTimeout(r,50));
  const t=(out.textContent||'').trim();
  if(!t) fail('클릭 시 출력', {tab:'js', fix:'클릭 후 out.textContent가 바뀌어야 해.'});
  else pass('클릭 시 출력', t.slice(0,30));

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 41 — fetch로 랜덤 명언 가져오기(실패 처리)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-41" title="Mission 41" defaults={DEFAULT} testsJs={testsJs} minutes={24} nextMissionId="mission-42" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`버튼 클릭 시 로딩 표시`}</GuideBox>
          <GuideBox title="2)">{`성공 시 문구 표시`}</GuideBox>
          <GuideBox title="3)">{`실패 시 에러 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
