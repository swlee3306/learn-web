/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Color</h1>
  <input id="c" type="color" value="#ffd43b" />
  <div id="box" class="box"></div>
  <p id="hex" class="msg">#ffd43b</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.box{height:120px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:#ffd43b;margin-top:12px;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
  js: `const c=document.querySelector('#c');
const box=document.querySelector('#box');
const hex=document.querySelector('#hex');

function render(){
  box.style.background=c.value;
  hex.textContent=c.value;
}

render();

// TODO: color input 이벤트에서 render() 호출
`
};

export default function mission91() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const c=document.querySelector('#c');
  const hex=document.querySelector('#hex');
  if(!c||!hex){ fail('요소 존재', {tab:'html', fix:'#c #hex 필요'}); return results; }
  pass('요소 존재');

  c.value='#00ff00'; c.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if((hex.textContent||'').trim()!=='#00ff00') fail('색 반영', {tab:'js', fix:'input 이벤트에서 render 호출'});
  else pass('색 반영');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 91 — 간단한 색상 피커(input color) 적용</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-91" title="Mission 91" defaults={DEFAULT} testsJs={testsJs} minutes={14} nextMissionId="mission-92" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`색 변경 시 박스 색 변경`}</GuideBox>
          <GuideBox title="2)">{`현재 hex 표시`}</GuideBox>
          <GuideBox title="3)">{`초기값 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
