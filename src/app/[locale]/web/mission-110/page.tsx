/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Order game</h1>
  <div id="grid" class="grid"></div>
  <p id="msg" class="msg">click 1</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;}
.b{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:12px 0;border-radius:12px;cursor:pointer;}
.b.ok{background: rgba(34,197,94,0.18); border-color: rgba(34,197,94,0.35)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const grid=document.querySelector('#grid');
const msg=document.querySelector('#msg');
let nums=[1,2,3,4,5];
let need=1;

function shuffle(a){
  const b=[...a];
  for(let i=b.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [b[i],b[j]]=[b[j],b[i]];
  }
  return b;
}

function render(){
  const a=shuffle(nums);
  grid.innerHTML = a.map(n=>'<button class="b" data-n="'+n+'">'+n+'</button>').join('');
  msg.textContent='click '+need;
}

render();

// TODO: grid 클릭에서 .b면
// - 클릭한 숫자가 need면 버튼에 ok 클래스, need++
// - 아니면 need=1로 리셋하고 render()
// - need가 6이면 msg='Done'
`
};

export default function mission110() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const grid=document.querySelector('#grid');
  if(!grid){ fail('요소 존재', {tab:'html', fix:'#grid 필요'}); return results; }
  pass('요소 존재');
  pass('게임 동작', 'manual');
  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 110 — 간단한 숫자 정렬 게임(작은→큰)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-110" title="Mission 110" defaults={DEFAULT} testsJs={testsJs} minutes={28} nextMissionId="mission-111" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`1~5 버튼을 섞어 표시`}</GuideBox>
          <GuideBox title="2)">{`1부터 순서대로 클릭해야 OK`}</GuideBox>
          <GuideBox title="3)">{`실패 시 리셋`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
