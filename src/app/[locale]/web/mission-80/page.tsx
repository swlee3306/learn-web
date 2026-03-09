/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Gallery</h1>
  <div id="main" class="main">1</div>
  <div id="thumbs" class="thumbs">
    <button class="th on" data-v="1">1</button>
    <button class="th" data-v="2">2</button>
    <button class="th" data-v="3">3</button>
  </div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.main{height:180px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);display:grid;place-items:center;font-size:60px;}
.thumbs{display:flex;gap:8px;justify-content:center;margin-top:12px;}
.th{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;min-width:48px;}
.th.on{background: rgba(34,197,94,0.18); border-color: rgba(34,197,94,0.35)}
`,
  js: `const main=document.querySelector('#main');
const thumbs=document.querySelector('#thumbs');
const ths=[...document.querySelectorAll('.th')];
let v='1';

function render(){
  main.textContent=v;
  ths.forEach(b=>b.classList.toggle('on', b.dataset.v===v));
}
render();

// TODO: thumbs 클릭 이벤트에서 .th 버튼이면 v=dataset.v 후 render()
`
};

export default function mission80() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn2=document.querySelector('.th[data-v="2"]');
  const main=document.querySelector('#main');
  if(!btn2||!main){ fail('요소 존재', {tab:'html', fix:'data-v="2" 썸네일과 #main 필요'}); return results; }
  pass('요소 존재');

  btn2.click();
  await new Promise(r=>setTimeout(r,30));
  if((main.textContent||'').trim()!=='2') fail('메인 변경', {tab:'js', fix:'클릭 시 v 업데이트 후 render'});
  else pass('메인 변경');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 80 — 간단한 이미지 갤러리(썸네일 클릭)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-80" title="Mission 80" defaults={DEFAULT} testsJs={testsJs} minutes={22} nextMissionId="mission-81" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`썸네일 클릭 시 메인 변경`}</GuideBox>
          <GuideBox title="2)">{`선택 표시`}</GuideBox>
          <GuideBox title="3)">{`초기 선택`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
