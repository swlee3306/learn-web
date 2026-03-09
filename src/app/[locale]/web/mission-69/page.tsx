/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Range</h1>
  <input id="r" type="range" min="0" max="100" value="40" />
  <p id="out" class="msg">40</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const r=document.querySelector('#r');
const out=document.querySelector('#out');

function render(){
  out.textContent = r.value;
}

render();

// TODO: r input 이벤트에서 render() 호출
`
};

export default function mission69() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const r=document.querySelector('#r');
  const out=document.querySelector('#out');
  if(!r||!out){ fail('요소 존재', {tab:'html', fix:'#r, #out 필요'}); return results; }
  pass('요소 존재');

  r.value='77'; r.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if((out.textContent||'').trim()!=='77') fail('값 반영', {tab:'js', fix:'input 이벤트에서 render 호출'});
  else pass('값 반영');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 69 — 간단한 슬라이더(range) 값 표시</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-69" title="Mission 69" defaults={DEFAULT} testsJs={testsJs} minutes={14} nextMissionId="mission-70" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`슬라이더 움직이면 숫자 표시`}</GuideBox>
          <GuideBox title="2)">{`초기값 표시`}</GuideBox>
          <GuideBox title="3)">{`0~100 범위`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
