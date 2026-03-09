/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Pomodoro</h1>
  <p id="mode" class="msg">work</p>
  <p id="t" class="big">25:00</p>
  <div class="row">
    <button id="start" class="primary">Start</button>
    <button id="reset">Reset</button>
  </div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 10px 0;font-size:28px;}
.big{font-size:54px;margin:10px 0 0 0;}
.row{display:flex;gap:8px;justify-content:center;margin-top:12px;flex-wrap:wrap}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:0;}
`,
  js: `const modeEl=document.querySelector('#mode');
const tEl=document.querySelector('#t');
const start=document.querySelector('#start');
const reset=document.querySelector('#reset');

const WORK=25*60;
const BREAK=5*60;
let mode='work';
let left=WORK;
let timer=null;

function fmt(sec){
  const m=Math.floor(sec/60);
  const s=sec%60;
  return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
}

function render(){
  modeEl.textContent=mode;
  tEl.textContent=fmt(left);
  start.textContent = timer ? 'Stop' : 'Start';
}

render();

// TODO:
// - start 클릭: timer 없으면 setInterval로 left--, 0이면 mode 전환(work<->break) + left 리셋
//             timer 있으면 clearInterval
// - reset 클릭: stop + mode/work 초기화 + left=WORK + render
`
};

export default function mission116() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const start=document.querySelector('#start');
  const t=document.querySelector('#t');
  if(!start||!t){ fail('요소 존재', {tab:'html', fix:'#start #t 필요'}); return results; }
  pass('요소 존재');

  const before=t.textContent;
  start.click();
  await new Promise(r=>setTimeout(r,1100));
  const after=t.textContent;
  if(after===before) fail('타이머 감소', {tab:'js', fix:'setInterval로 left를 감소시키고 render()'});
  else pass('타이머 감소', before+'→'+after);

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 116 — 간단한 포모도로 타이머(25/5)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-116" title="Mission 116" defaults={DEFAULT} testsJs={testsJs} minutes={30} nextMissionId="mission-117" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Start/Stop`}</GuideBox>
          <GuideBox title="2)">{`25분 후 break 전환`}</GuideBox>
          <GuideBox title="3)">{`Reset`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
