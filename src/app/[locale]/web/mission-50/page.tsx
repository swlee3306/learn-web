/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Timer</h1>
  <div class="row">
    <button id="start" class="primary">Start</button>
    <button id="stop">Stop</button>
  </div>
  <p id="sec" class="big">0</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:8px;justify-content:center}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.big{font-size:44px;margin:14px 0 0 0;}
`,
  js: `const start=document.querySelector('#start');
const stop=document.querySelector('#stop');
const sec=document.querySelector('#sec');
let n=0;
let timer=null;

function render(){
  sec.textContent=String(n);
}
render();

// TODO: Start 클릭 시 timer가 없을 때만 setInterval로 1초마다 n++ 후 render()
// TODO: Stop 클릭 시 clearInterval 하고 timer=null
`
};

export default function mission50() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const start=document.querySelector('#start');
  const stop=document.querySelector('#stop');
  const sec=document.querySelector('#sec');
  if(!start||!stop||!sec){ fail('요소 존재', {tab:'html', fix:'#start #stop #sec 필요'}); return results; }
  pass('요소 존재');

  const before=Number(sec.textContent||'0');
  start.click();
  await new Promise(r=>setTimeout(r,1100));
  const after=Number(sec.textContent||'0');
  if(after<=before) fail('1초마다 증가', {tab:'js', fix:'setInterval로 증가시켜줘.'});
  else pass('1초마다 증가', String(before)+'→'+String(after));

  stop.click();
  const stopAt=Number(sec.textContent||'0');
  await new Promise(r=>setTimeout(r,1100));
  const afterStop=Number(sec.textContent||'0');
  if(afterStop!==stopAt) fail('Stop 멈춤', {tab:'js', fix:'stop에서 clearInterval 처리'});
  else pass('Stop 멈춤');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 50 — 타이머(초) 시작/정지</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-50" title="Mission 50" defaults={DEFAULT} testsJs={testsJs} minutes={22} nextMissionId="mission-51" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Start 누르면 1초마다 증가`}</GuideBox>
          <GuideBox title="2)">{`Stop 누르면 멈춤`}</GuideBox>
          <GuideBox title="3)">{`중복 interval 방지`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
