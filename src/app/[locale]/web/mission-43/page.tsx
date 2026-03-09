/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Copy</h1>
  <code id="code" class="code">HELLO-123</code>
  <button id="copy" class="primary">Copy</button>
  <p id="msg" class="msg">-</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
.code{display:inline-block;padding:8px 10px;border:1px solid rgba(255,255,255,0.18);border-radius:12px;background:rgba(255,255,255,0.06);}
button{margin-left:10px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const copy=document.querySelector('#copy');
const code=document.querySelector('#code');
const msg=document.querySelector('#msg');

// TODO: 클릭 시 navigator.clipboard.writeText(code.textContent)
// 성공하면 msg='Copied!', 실패하면 msg='Error'
`
};

export default function mission43() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const copy=document.querySelector('#copy');
  const msg=document.querySelector('#msg');
  if(!copy||!msg){ fail('요소 존재', {tab:'html', fix:'#copy, #msg 필요'}); return results; }
  pass('요소 존재');
  copy.click();
  await new Promise(r=>setTimeout(r,50));
  if(!(msg.textContent||'').trim()) fail('클릭 시 메시지', {tab:'js', fix:'성공/실패 메시지를 표시해줘.'});
  else pass('클릭 시 메시지', (msg.textContent||'').trim());
  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 43 — 복사 버튼(클립보드) + 성공 메시지</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-43" title="Mission 43" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-44" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Copy 클릭 시 복사 시도`}</GuideBox>
          <GuideBox title="2)">{`성공 메시지 표시`}</GuideBox>
          <GuideBox title="3)">{`실패 메시지 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
