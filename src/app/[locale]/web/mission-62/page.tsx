/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Modal</h1>
  <button id="open" class="primary">Open</button>
  <div id="overlay" class="overlay">
    <div class="modal" role="dialog" aria-modal="true">
      <h2 class="h2">Hello</h2>
      <p class="msg">press ESC or click outside</p>
      <button id="close">Close</button>
    </div>
  </div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,0.55);display:none;align-items:center;justify-content:center;padding:18px;}
.overlay.on{display:flex;}
.modal{width:min(420px,92vw);background:#0f172a;border:1px solid rgba(255,255,255,0.18);border-radius:14px;padding:14px;text-align:left;}
.h2{margin:0 0 8px 0;font-size:18px;}
.msg{opacity:0.9;margin:0 0 10px 0;}
`,
  js: `const open=document.querySelector('#open');
const overlay=document.querySelector('#overlay');
const close=document.querySelector('#close');

function set(on){
  overlay.classList.toggle('on', on);
}

set(false);

// TODO:
// - open 클릭 시 set(true)
// - close 클릭 시 set(false)
// - overlay 클릭(자기 자신 클릭) 시 set(false)
// - window keydown에서 Escape면 set(false)
`
};

export default function mission62() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const open=document.querySelector('#open');
  const overlay=document.querySelector('#overlay');
  if(!open||!overlay){ fail('요소 존재', {tab:'html', fix:'#open, #overlay 필요'}); return results; }
  pass('요소 존재');

  open.click();
  await new Promise(r=>setTimeout(r,30));
  if(!overlay.classList.contains('on')) fail('오픈', {tab:'js', fix:'open click에서 set(true)'});
  else pass('오픈');

  window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(overlay.classList.contains('on')) fail('ESC 닫기', {tab:'js', fix:'keydown Escape 처리'});
  else pass('ESC 닫기');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 62 — 모달 열기/닫기(ESC/오버레이)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-62" title="Mission 62" defaults={DEFAULT} testsJs={testsJs} minutes={26} nextMissionId="mission-63" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Open 클릭 시 모달 표시`}</GuideBox>
          <GuideBox title="2)">{`오버레이 클릭/ESC로 닫기`}</GuideBox>
          <GuideBox title="3)">{`닫히면 원래 상태`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
