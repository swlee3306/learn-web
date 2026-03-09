/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Rating</h1>
  <div id="stars" class="stars" aria-label="rating">
    <button class="star" data-v="1">★</button>
    <button class="star" data-v="2">★</button>
    <button class="star" data-v="3">★</button>
    <button class="star" data-v="4">★</button>
    <button class="star" data-v="5">★</button>
  </div>
  <p id="out" class="msg">0 / 5</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.stars{display:flex;gap:6px;justify-content:center}
.star{font-size:30px;line-height:1;border:none;background:transparent;color:rgba(255,255,255,0.25);cursor:pointer;padding:4px 6px;}
.star.on{color:#ffd43b}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const stars=[...document.querySelectorAll('.star')];
const out=document.querySelector('#out');
let score=0;

function render(){
  stars.forEach(b => b.classList.toggle('on', Number(b.dataset.v) <= score));
  out.textContent = score + ' / 5';
}
render();

// TODO: 별 클릭 시 score를 dataset.v로 바꾸고 render()
`
};

export default function mission63() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn3=document.querySelector('.star[data-v="3"]');
  const out=document.querySelector('#out');
  if(!btn3||!out){ fail('요소 존재', {tab:'html', fix:'data-v="3" star와 #out 필요'}); return results; }
  pass('요소 존재');

  btn3.click();
  await new Promise(r=>setTimeout(r,30));
  if(!(out.textContent||'').includes('3')) fail('점수 반영', {tab:'js', fix:'click에서 score 변경 후 render()'});
  else pass('점수 반영');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 63 — 평점 별점(1~5) 선택 UI</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-63" title="Mission 63" defaults={DEFAULT} testsJs={testsJs} minutes={20} nextMissionId="mission-64" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`별 클릭 시 값 저장`}</GuideBox>
          <GuideBox title="2)">{`선택된 별 하이라이트`}</GuideBox>
          <GuideBox title="3)">{`현재 점수 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
