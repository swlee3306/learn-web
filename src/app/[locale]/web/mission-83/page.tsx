/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Bubbling</h1>
  <div id="box" class="box">
    <button id="btn" class="btn">Button</button>
  </div>
  <label class="row"><input id="stop" type="checkbox" /> stopPropagation</label>
  <pre id="log" class="log"></pre>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.box{padding:20px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);}
.btn{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
.row{display:flex;gap:10px;align-items:center;margin-top:10px;opacity:0.9;}
.log{margin-top:12px;min-height:80px;padding:10px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.04);white-space:pre-wrap;}
`,
  js: `const box=document.querySelector('#box');
const btn=document.querySelector('#btn');
const stop=document.querySelector('#stop');
const log=document.querySelector('#log');

function push(t){
  log.textContent = (log.textContent ? log.textContent + '
' : '') + t;
}

// TODO:
// - box click: push('box')
// - btn click: push('btn'); stop.checked면 e.stopPropagation()
`
};

export default function mission83() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn=document.querySelector('#btn');
  const log=document.querySelector('#log');
  if(!btn||!log){ fail('요소 존재', {tab:'html', fix:'#btn, #log 필요'}); return results; }
  pass('요소 존재');

  btn.click();
  await new Promise(r=>setTimeout(r,30));
  if(!(log.textContent||'').includes('btn')) fail('btn 로그', {tab:'js', fix:'btn click에서 push("btn")'});
  else pass('btn 로그');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 83 — 간단한 이벤트 버블링 실험(로그)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-83" title="Mission 83" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-84" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`box 클릭 로그`}</GuideBox>
          <GuideBox title="2)">{`button 클릭 로그`}</GuideBox>
          <GuideBox title="3)">{`stopPropagation 옵션`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
