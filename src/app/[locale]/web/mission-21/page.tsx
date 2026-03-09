/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Mission 21</h1>
  <div id="time" class="time">0</div>
  <div class="row">
    <button id="start" class="btn">Start</button>
    <button id="stop" class="btn">Stop</button>
    <button id="reset" class="btn">Reset</button>
  </div>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(560px,92vw);text-align:center;}
.h1{margin:0 0 12px 0;font-size:28px;}
.time{font-size:56px;font-weight:800;letter-spacing:-1px;}
.row{margin-top:14px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;}
.btn{border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
.btn:hover{background:rgba(255,255,255,0.12);}
`,
  js: `// 목표: start/stop/reset 동작 구현
// 힌트: let timerId = null; setInterval/clearInterval

const timeEl = document.querySelector('#time');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const resetBtn = document.querySelector('#reset');

let t = 0;
let timerId = null;

function render(){
  timeEl.textContent = String(t);
}

// TODO: start 클릭 시 이미 동작 중이면 무시하고, 아니면 1초마다 t++ 후 render
// TODO: stop 클릭 시 clearInterval
// TODO: reset 클릭 시 t=0 후 render
render();
`
};

export default function mission21() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const timeEl=document.querySelector('#time');
  const start=document.querySelector('#start');
  const stop=document.querySelector('#stop');
  const reset=document.querySelector('#reset');
  if(!timeEl||!start||!stop||!reset){
    fail('요소 존재', {tab:'html',fix:'#time/#start/#stop/#reset를 만들어줘.'});
    return results;
  }
  pass('요소 존재');
  try{
    const before=(timeEl.textContent||'').trim();
    start.click();
    await new Promise(r=>setTimeout(r,1100));
    const after=(timeEl.textContent||'').trim();
    if(after===before) fail('Start 동작',{tab:'js',fix:'setInterval로 t를 증가시키고 render() 호출해.'});
    else pass('Start 동작', before+'→'+after);
    stop.click();
    const stopped=after;
    await new Promise(r=>setTimeout(r,1100));
    const afterStop=(timeEl.textContent||'').trim();
    if(afterStop!==stopped) fail('Stop 동작',{tab:'js',fix:'stop 클릭 시 clearInterval 해야 해.'});
    else pass('Stop 동작');
    reset.click();
    await new Promise(r=>setTimeout(r,30));
    const afterReset=(timeEl.textContent||'').trim();
    if(afterReset!=='0') fail('Reset 동작',{tab:'js',fix:'reset 클릭 시 t=0 후 render() 해.'});
    else pass('Reset 동작');
  }catch(e){ fail('동작 테스트', String(e && (e.stack||e))); }
  return results;
};
`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 21 — 스톱워치(시작/정지)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-21" title="Mission 21" defaults={DEFAULT} testsJs={testsJs} minutes={22} nextMissionId="mission-22" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Start 클릭 시 1초마다 증가`}</GuideBox>
          <GuideBox title="2)">{`Stop 클릭 시 멈춤`}</GuideBox>
          <GuideBox title="3)">{`Reset으로 0`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
