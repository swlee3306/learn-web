/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Countdown</h1>
  <button id="start" class="primary">Start</button>
  <p id="n" class="big">10</p>
  <p id="msg" class="msg">-</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.big{font-size:56px;margin:10px 0 0 0;}
.msg{opacity:0.9;margin:8px 0 0 0;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
`,
  js: `const start=document.querySelector('#start');
const nEl=document.querySelector('#n');
const msg=document.querySelector('#msg');
let n=10;
let timer=null;

function render(){
  nEl.textContent=String(n);
}
render();

// TODO: Start 클릭 시 이미 timer가 있으면 무시.
// - n=10으로 리셋하고 render()
// - setInterval로 1초마다 n--
// - n이 0이면 clearInterval + timer=null + msg='Done'
`
};

export default function mission76() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const start=document.querySelector('#start');
  const nEl=document.querySelector('#n');
  if(!start||!nEl){ fail('요소 존재', {tab:'html', fix:'#start, #n 필요'}); return results; }
  pass('요소 존재');

  start.click();
  const before=Number(nEl.textContent||'0');
  await new Promise(r=>setTimeout(r,1100));
  const after=Number(nEl.textContent||'0');
  if(after>=before) fail('감소', {tab:'js', fix:'setInterval로 1초마다 n-- 해줘.'});
  else pass('감소', String(before)+'→'+String(after));

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 76 — 카운트다운 타이머(10→0)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-76" title="Mission 76" defaults={DEFAULT} testsJs={testsJs} minutes={22} nextMissionId="mission-77" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Start 누르면 10부터 감소`}</GuideBox>
          <GuideBox title="2)">{`0이면 멈춤`}</GuideBox>
          <GuideBox title="3)">{`중복 시작 방지`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
