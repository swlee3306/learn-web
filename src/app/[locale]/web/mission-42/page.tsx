/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Spinner</h1>
  <button id="start" class="primary">Start</button>
  <div id="spin" class="spin" aria-label="spinner"></div>
  <p id="msg" class="msg">-</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center;}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.spin{width:46px;height:46px;border-radius:50%;border:6px solid rgba(255,255,255,0.15);border-top-color:#ffd43b;margin:14px auto;display:none;animation:rot 0.9s linear infinite;}
.spin.on{display:block;}
@keyframes rot{to{transform:rotate(360deg)}}
.msg{opacity:0.9;margin:0;}
`,
  js: `const start=document.querySelector('#start');
const spin=document.querySelector('#spin');
const msg=document.querySelector('#msg');
let busy=false;

// TODO: Start 클릭 시 busy면 무시.
// 아니면 spin.on을 켜고 msg='Loading...'
// 2초 후 spin.on 끄고 msg='Done'
`
};

export default function mission42() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const start=document.querySelector('#start');
  const spin=document.querySelector('#spin');
  if(!start||!spin){ fail('요소 존재', {tab:'html', fix:'#start, #spin 필요'}); return results; }
  pass('요소 존재');

  start.click();
  await new Promise(r=>setTimeout(r,50));
  if(!spin.classList.contains('on')) fail('스피너 표시', {tab:'js', fix:'Start 클릭 시 spin.classList.add("on")'});
  else pass('스피너 표시');

  // wait for hide
  let ok=false;
  for(let i=0;i<30;i++){ await new Promise(r=>setTimeout(r,100)); if(!spin.classList.contains('on')) {ok=true; break;} }
  if(!ok) fail('2초 후 숨김', {tab:'js', fix:'2초 후 spin.classList.remove("on")'});
  else pass('2초 후 숨김');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 42 — 로딩 스피너 표시/숨김</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-42" title="Mission 42" defaults={DEFAULT} testsJs={testsJs} minutes={16} nextMissionId="mission-43" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Start 누르면 spinner 표시`}</GuideBox>
          <GuideBox title="2)">{`2초 후 숨김`}</GuideBox>
          <GuideBox title="3)">{`중복 시작 방지`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
