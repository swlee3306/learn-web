/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Stopwatch</h1>
  <div id="t" class="big">0.0</div>
  <div class="row">
    <button id="start" class="primary">Start</button>
    <button id="lap">Lap</button>
    <button id="reset">Reset</button>
  </div>
  <ul id="laps"></ul>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.big{font-size:52px;margin:0 0 12px 0;}
.row{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
ul{margin:12px 0 0 18px;line-height:1.9;text-align:left;}
`,
  js: `const t=document.querySelector('#t');
const start=document.querySelector('#start');
const lap=document.querySelector('#lap');
const reset=document.querySelector('#reset');
const lapsEl=document.querySelector('#laps');

let timer=null;
let startAt=0;
let elapsed=0;
let laps=[];

function render(){
  t.textContent = (elapsed/1000).toFixed(1);
  start.textContent = timer ? 'Stop' : 'Start';
  lapsEl.innerHTML = laps.map(x=>'<li>'+x+'</li>').join('');
}
render();

// TODO:
// - start 클릭: timer 없으면 startAt=Date.now()-elapsed; setInterval로 elapsed 업데이트; 있으면 clearInterval
// - lap 클릭: 현재 time을 laps에 추가(최대 3개)
// - reset 클릭: stop + elapsed=0 + laps=[]
`
};

export default function mission112() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const start=document.querySelector('#start');
  const t=document.querySelector('#t');
  if(!start||!t){ fail('요소 존재', {tab:'html', fix:'#start #t 필요'}); return results; }
  pass('요소 존재');

  start.click();
  await new Promise(r=>setTimeout(r,120));
  const v=Number(t.textContent||'0');
  if(!(v>0)) fail('시간 증가', {tab:'js', fix:'Start에서 setInterval로 elapsed 업데이트'});
  else pass('시간 증가', String(v));

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 112 — 간단한 스톱워치(랩 3개까지)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-112" title="Mission 112" defaults={DEFAULT} testsJs={testsJs} minutes={30} nextMissionId="mission-113" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Start/Stop`}</GuideBox>
          <GuideBox title="2)">{`Lap 저장(최대 3)`}</GuideBox>
          <GuideBox title="3)">{`Reset`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
