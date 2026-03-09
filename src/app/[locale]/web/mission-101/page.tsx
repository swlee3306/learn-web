/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Dropdown</h1>
  <button id="btn" class="primary">Menu</button>
  <div id="menu" class="menu">
    <button class="it" data-v="One">One</button>
    <button class="it" data-v="Two">Two</button>
  </div>
  <p id="msg" class="msg">selected: -</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center;position:relative}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.menu{position:absolute;left:50%;transform:translateX(-50%);top:90px;display:none;flex-direction:column;gap:6px;padding:10px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(15,23,42,0.95);}
.menu.on{display:flex;}
.it{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.18)}
.msg{opacity:0.9;margin:120px 0 0 0;}
`,
  js: `const btn=document.querySelector('#btn');
const menu=document.querySelector('#menu');
const msg=document.querySelector('#msg');
let open=false;

function render(){
  menu.classList.toggle('on', open);
}
render();

// TODO:
// - btn 클릭 시 open 토글 후 render
// - window click에서 menu/btn 밖 클릭이면 open=false 후 render
// - menu 클릭에서 .it이면 msg 업데이트 + open=false 후 render
`
};

export default function mission101() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn=document.querySelector('#btn');
  const menu=document.querySelector('#menu');
  if(!btn||!menu){ fail('요소 존재', {tab:'html', fix:'#btn #menu 필요'}); return results; }
  pass('요소 존재');

  btn.click();
  await new Promise(r=>setTimeout(r,30));
  if(!menu.classList.contains('on')) fail('열기', {tab:'js', fix:'btn 클릭 시 open 토글'});
  else pass('열기');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 101 — 간단한 드롭다운 메뉴 열고 닫기</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-101" title="Mission 101" defaults={DEFAULT} testsJs={testsJs} minutes={24} nextMissionId="mission-102" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`버튼 클릭으로 열기/닫기`}</GuideBox>
          <GuideBox title="2)">{`바깥 클릭으로 닫기`}</GuideBox>
          <GuideBox title="3)">{`현재 선택 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
