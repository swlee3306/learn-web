/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Random color</h1>
  <button id="btn" class="primary">Random</button>
  <p id="hex" class="msg">#0b1020</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;transition:background 200ms;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const btn=document.querySelector('#btn');
const hex=document.querySelector('#hex');

function randHex(){
  const n = Math.floor(Math.random()*0xffffff);
  return '#' + n.toString(16).padStart(6,'0');
}

// TODO: btn 클릭 시 body background를 랜덤 색으로 바꾸고 hex.textContent 업데이트
`
};

export default function mission59() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn=document.querySelector('#btn');
  const hex=document.querySelector('#hex');
  if(!btn||!hex){ fail('요소 존재', {tab:'html', fix:'#btn, #hex 필요'}); return results; }
  pass('요소 존재');

  const before=hex.textContent;
  btn.click();
  await new Promise(r=>setTimeout(r,30));
  const after=hex.textContent;
  if(after===before) fail('랜덤 적용', {tab:'js', fix:'click에서 색 변경 후 hex 업데이트'});
  else pass('랜덤 적용', String(before)+'→'+String(after));

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 59 — 랜덤 배경색 생성 버튼</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-59" title="Mission 59" defaults={DEFAULT} testsJs={testsJs} minutes={14} nextMissionId="mission-60" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`버튼 클릭 시 배경색 변경`}</GuideBox>
          <GuideBox title="2)">{`hex 코드 표시`}</GuideBox>
          <GuideBox title="3)">{`텍스트 대비 유지`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
