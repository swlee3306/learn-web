/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Rating</h1>
  <div id="stars" class="stars">
    <button class="star" data-v="1">★</button>
    <button class="star" data-v="2">★</button>
    <button class="star" data-v="3">★</button>
    <button class="star" data-v="4">★</button>
    <button class="star" data-v="5">★</button>
  </div>
  <p id="val" class="msg">선택: 0</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
.stars{display:flex;gap:6px;}
.star{font-size:26px;line-height:1;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);color:#64748b;padding:10px 12px;border-radius:14px;cursor:pointer;}
.star.on{color:#ffd43b;border-color:rgba(255,212,59,0.35);background:rgba(255,212,59,0.12);}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const stars=document.querySelector('#stars');
const val=document.querySelector('#val');

// TODO: 별을 클릭하면 data-v 값을 읽어서 val.textContent를 업데이트하고
// 선택된 값 이하의 별에 .on 클래스를 붙여줘 (예: 3이면 1~3 on)
`
};

export default function mission33() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});

  const stars=[...document.querySelectorAll('.star')];
  const val=document.querySelector('#val');
  if(stars.length!==5||!val){ fail('요소 존재', {tab:'html', fix:'.star 5개와 #val 필요'}); return results; }
  pass('요소 존재');

  stars[3].click();
  await new Promise(r=>setTimeout(r,40));
  if(!(val.textContent||'').includes('4')) fail('값 표시', {tab:'js', fix:'#val에 선택 값을 표시해줘.'}); else pass('값 표시');

  const on=[...stars].filter(s=>s.classList.contains('on')).length;
  if(on<4) fail('강조(on) 적용', {tab:'js', fix:'선택 값 이하 별에 on 클래스를 붙여줘.'});
  else pass('강조(on) 적용', 'on='+on);

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 33 — 별점 선택(라디오 UI)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-33" title="Mission 33" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-34" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`별 1~5 중 클릭한 값 표시`}</GuideBox>
          <GuideBox title="2)">{`선택된 별을 강조`}</GuideBox>
          <GuideBox title="3)">{`다시 클릭하면 값이 바뀜`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
