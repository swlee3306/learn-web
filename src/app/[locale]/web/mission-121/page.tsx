/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Contrast</h1>
  <button id="btn" class="primary">Random</button>
  <div id="box" class="box">#0b1020</div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.box{margin-top:12px;height:140px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);display:grid;place-items:center;font-size:22px;background:#0b1020;}
`,
  js: `const btn=document.querySelector('#btn');
const box=document.querySelector('#box');

function randHex(){
  const n=Math.floor(Math.random()*0xffffff);
  return '#' + n.toString(16).padStart(6,'0');
}

function luminance(hex){
  // hex: #rrggbb
  const r=parseInt(hex.slice(1,3),16);
  const g=parseInt(hex.slice(3,5),16);
  const b=parseInt(hex.slice(5,7),16);
  return 0.2126*r + 0.7152*g + 0.0722*b;
}

function apply(hex){
  box.style.background=hex;
  box.textContent=hex;
  const l=luminance(hex);
  box.style.color = l > 140 ? '#0b1020' : '#ffffff';
}

apply('#0b1020');

// TODO: btn 클릭 시 randHex()로 색을 만들고 apply()
`
};

export default function mission121() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn=document.querySelector('#btn');
  const box=document.querySelector('#box');
  if(!btn||!box){ fail('요소 존재', {tab:'html', fix:'#btn #box 필요'}); return results; }
  pass('요소 존재');

  const before=box.textContent;
  btn.click();
  await new Promise(r=>setTimeout(r,30));
  const after=box.textContent;
  if(after===before) fail('랜덤 적용', {tab:'js', fix:'btn 클릭에서 apply(randHex()) 호출'});
  else pass('랜덤 적용');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 121 — 간단한 색상 대비(텍스트 색 자동)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-121" title="Mission 121" defaults={DEFAULT} testsJs={testsJs} minutes={26} nextMissionId="mission-122" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`랜덤 배경색`}</GuideBox>
          <GuideBox title="2)">{`명도 기준 텍스트색 변경`}</GuideBox>
          <GuideBox title="3)">{`hex 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
