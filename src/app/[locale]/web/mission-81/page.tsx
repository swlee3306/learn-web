/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Filter cards</h1>
  <div id="cats" class="cats">
    <button class="c on" data-c="all">All</button>
    <button class="c" data-c="A">A</button>
    <button class="c" data-c="B">B</button>
  </div>
  <p id="msg" class="msg">-</p>
  <div id="grid" class="grid"></div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.cats{display:flex;gap:8px;margin-bottom:10px;}
.c{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
.c.on{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.card{padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);text-align:center;}
.msg{opacity:0.9;margin:0 0 10px 0;}
`,
  js: `const cats=document.querySelector('#cats');
const btns=[...document.querySelectorAll('.c')];
const msg=document.querySelector('#msg');
const grid=document.querySelector('#grid');
const items=[{t:'1',c:'A'},{t:'2',c:'B'},{t:'3',c:'A'},{t:'4',c:'B'}];
let cur='all';

function render(){
  btns.forEach(b=>b.classList.toggle('on', b.dataset.c===cur));
  const shown = cur==='all' ? items : items.filter(x=>x.c===cur);
  grid.innerHTML = shown.map(x=>'<div class="card">'+x.t+' / '+x.c+'</div>').join('');
  msg.textContent = shown.length + ' items';
}
render();

// TODO: cats 클릭 이벤트에서 .c 버튼이면 cur=dataset.c 후 render()
`
};

export default function mission81() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btnA=document.querySelector('.c[data-c="A"]');
  const grid=document.querySelector('#grid');
  if(!btnA||!grid){ fail('요소 존재', {tab:'html', fix:'data-c="A" 버튼과 #grid 필요'}); return results; }
  pass('요소 존재');

  btnA.click();
  await new Promise(r=>setTimeout(r,30));
  const cards=[...grid.querySelectorAll('.card')].map(x=>x.textContent||'').join(' ');
  if(!cards.includes('/ A') || cards.includes('/ B')) fail('필터', {tab:'js', fix:'A 클릭 시 A만 보이게 필터'});
  else pass('필터');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 81 — 간단한 카드 필터(카테고리 버튼)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-81" title="Mission 81" defaults={DEFAULT} testsJs={testsJs} minutes={22} nextMissionId="mission-82" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`All/A/B 필터`}</GuideBox>
          <GuideBox title="2)">{`활성 버튼 표시`}</GuideBox>
          <GuideBox title="3)">{`카운트 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
