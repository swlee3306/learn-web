/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Pager</h1>
  <div class="row">
    <button id="prev">Prev</button>
    <button id="next" class="primary">Next</button>
  </div>
  <p id="page" class="msg">1 / 4</p>
  <div id="card" class="card">1</div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:8px;justify-content:center}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
button:disabled{opacity:0.4;cursor:not-allowed;}
.card{margin-top:12px;padding:18px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);font-size:40px;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
  js: `const prev=document.querySelector('#prev');
const next=document.querySelector('#next');
const page=document.querySelector('#page');
const card=document.querySelector('#card');
const total=4;
let i=1;

function render(){
  page.textContent = i + ' / ' + total;
  card.textContent = String(i);
  prev.disabled = i<=1;
  next.disabled = i>=total;
}
render();

// TODO: prev 클릭 시 i-- (최소 1) 후 render()
// TODO: next 클릭 시 i++ (최대 total) 후 render()
`
};

export default function mission64() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const next=document.querySelector('#next');
  const card=document.querySelector('#card');
  if(!next||!card){ fail('요소 존재', {tab:'html', fix:'#next, #card 필요'}); return results; }
  pass('요소 존재');

  const before=card.textContent;
  next.click();
  await new Promise(r=>setTimeout(r,30));
  const after=card.textContent;
  if(after===before) fail('Next 이동', {tab:'js', fix:'next click 처리'});
  else pass('Next 이동', String(before)+'→'+String(after));

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 64 — 간단한 페이지네이션(Prev/Next)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-64" title="Mission 64" defaults={DEFAULT} testsJs={testsJs} minutes={22} nextMissionId="mission-65" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Prev/Next로 이동`}</GuideBox>
          <GuideBox title="2)">{`끝에서 버튼 비활성`}</GuideBox>
          <GuideBox title="3)">{`현재 페이지 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
