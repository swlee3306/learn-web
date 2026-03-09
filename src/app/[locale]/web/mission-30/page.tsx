/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Modal</h1>
  <button id="open">Open</button>
  <div id="overlay" class="overlay">
    <div class="modal">
      <p id="text">Hello modal</p>
      <button id="close">Close</button>
    </div>
  </div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
.overlay{position:fixed;inset:0;display:none;place-items:center;background:rgba(0,0,0,0.55);}
.overlay.on{display:grid;}
.modal{background:#101a35;border:1px solid rgba(255,255,255,0.18);padding:16px;border-radius:14px;min-width:260px;}
`,
  js: `const openBtn=document.querySelector('#open');
const closeBtn=document.querySelector('#close');
const overlay=document.querySelector('#overlay');

function open(){ overlay.classList.add('on'); }
function close(){ overlay.classList.remove('on'); }

// TODO: openBtn 클릭 → open()
// closeBtn 클릭 → close()
// overlay(배경) 클릭 → close() (단, modal 클릭은 닫히면 안 됨)
// ESC 키 → close()
`
};

export default function mission30() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});

  const openBtn=document.querySelector('#open');
  const closeBtn=document.querySelector('#close');
  const overlay=document.querySelector('#overlay');
  const modal=document.querySelector('.modal');
  if(!openBtn||!closeBtn||!overlay||!modal){ fail('요소 존재', {tab:'html', fix:'open/close/overlay/modal 요소가 필요해.'}); return results; }
  pass('요소 존재');

  openBtn.click();
  await new Promise(r=>setTimeout(r,30));
  if(!overlay.classList.contains('on')) fail('Open → 표시', {tab:'js', fix:'openBtn 클릭 시 overlay.classList.add("on")'}); else pass('Open → 표시');

  closeBtn.click();
  await new Promise(r=>setTimeout(r,30));
  if(overlay.classList.contains('on')) fail('Close → 숨김', {tab:'js', fix:'closeBtn 클릭 시 overlay.classList.remove("on")'}); else pass('Close → 숨김');

  openBtn.click();
  await new Promise(r=>setTimeout(r,30));
  overlay.click();
  await new Promise(r=>setTimeout(r,30));
  if(overlay.classList.contains('on')) fail('배경 클릭 → 닫힘', {tab:'js', fix:'overlay 배경 클릭 시 닫혀야 해.'}); else pass('배경 클릭 → 닫힘');

  openBtn.click();
  await new Promise(r=>setTimeout(r,30));
  document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(overlay.classList.contains('on')) fail('ESC → 닫힘', {tab:'js', fix:'keydown에서 Escape면 close()'}); else pass('ESC → 닫힘');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 30 — 모달 열기/닫기(배경/ESC)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-30" title="Mission 30" defaults={DEFAULT} testsJs={testsJs} minutes={20} nextMissionId="mission-31" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Open 클릭 시 모달 표시`}</GuideBox>
          <GuideBox title="2)">{`배경 클릭/Close 클릭 시 닫힘`}</GuideBox>
          <GuideBox title="3)">{`ESC로 닫힘`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
