/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Toggle</h1>
  <button id="sw" class="sw">OFF</button>
  <p id="state" class="msg">현재: OFF</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center;}
.h1{margin:0 0 14px 0;font-size:28px;}
.sw{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:12px 18px;border-radius:999px;cursor:pointer;min-width:110px;}
.sw.on{background:rgba(34,197,94,0.18);border-color:rgba(34,197,94,0.35);}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const sw=document.querySelector('#sw');
const state=document.querySelector('#state');
let on=false;

function render(){
  sw.textContent = on ? 'ON' : 'OFF';
  state.textContent = '현재: ' + (on ? 'ON' : 'OFF');
  sw.classList.toggle('on', on);
}

render();

// TODO: sw 클릭 시 on을 토글하고 render() 호출
`
};

export default function mission38() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const sw=document.querySelector('#sw');
  const state=document.querySelector('#state');
  if(!sw||!state){ fail('요소 존재', {tab:'html', fix:'#sw와 #state 필요'}); return results; }
  pass('요소 존재');
  const before=sw.textContent.trim();
  sw.click();
  await new Promise(r=>setTimeout(r,30));
  const after=sw.textContent.trim();
  if(after===before) fail('클릭 시 토글', {tab:'js', fix:'클릭에서 on=!on; render();'});
  else pass('클릭 시 토글', String(before)+'→'+String(after));
  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 38 — 토글 스위치 만들기(ON/OFF)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-38" title="Mission 38" defaults={DEFAULT} testsJs={testsJs} minutes={14} nextMissionId="mission-39" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`클릭 시 ON/OFF 토글`}</GuideBox>
          <GuideBox title="2)">{`상태 문구 변경`}</GuideBox>
          <GuideBox title="3)">{`스위치 스타일 변경`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
