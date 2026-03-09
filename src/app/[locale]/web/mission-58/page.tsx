/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Progress</h1>
  <div class="bar"><div id="fill" class="fill"></div></div>
  <p id="p" class="msg">0%</p>
  <button id="add" class="primary">+10</button>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.bar{height:18px;border-radius:999px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);overflow:hidden;}
.fill{height:100%;width:0%;background:linear-gradient(90deg, rgba(34,197,94,0.9), rgba(255,212,59,0.9));transition:width 200ms;}
button{margin-top:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
  js: `const fill=document.querySelector('#fill');
const p=document.querySelector('#p');
const add=document.querySelector('#add');
let n=0;

function render(){
  fill.style.width = n + '%';
  p.textContent = n + '%';
}
render();

// TODO: add 클릭 시 n을 10 증가 (최대 100) 후 render()
`
};

export default function mission58() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const add=document.querySelector('#add');
  const p=document.querySelector('#p');
  if(!add||!p){ fail('요소 존재', {tab:'html', fix:'#add, #p 필요'}); return results; }
  pass('요소 존재');

  const before=p.textContent;
  add.click();
  await new Promise(r=>setTimeout(r,30));
  const after=p.textContent;
  if(after===before) fail('증가', {tab:'js', fix:'click에서 n 업데이트 후 render()'});
  else pass('증가', String(before)+'→'+String(after));

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 58 — 진행률 바(버튼으로 +10%)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-58" title="Mission 58" defaults={DEFAULT} testsJs={testsJs} minutes={16} nextMissionId="mission-59" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`클릭 시 10% 증가`}</GuideBox>
          <GuideBox title="2)">{`최대 100% 제한`}</GuideBox>
          <GuideBox title="3)">{`퍼센트 텍스트 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
