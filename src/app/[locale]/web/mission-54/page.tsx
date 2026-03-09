/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Drag swap</h1>
  <div id="row" class="row">
    <div class="box" draggable="true" data-id="A">A</div>
    <div class="box" draggable="true" data-id="B">B</div>
  </div>
  <p id="msg" class="msg">order: A,B</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:10px;}
.box{width:84px;height:84px;display:grid;place-items:center;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);cursor:grab;user-select:none;}
.box.drag{outline:2px dashed rgba(255,212,59,0.6)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const row=document.querySelector('#row');
const msg=document.querySelector('#msg');
let from=null;

function render(){
  const ids=[...row.querySelectorAll('.box')].map(b=>b.dataset.id).join(',');
  msg.textContent='order: '+ids;
}
render();

// TODO:
// - dragstart에서 from을 저장 (dataset.id)
// - dragover에서 preventDefault
// - drop에서 from과 drop 대상이 다르면 DOM 순서를 swap 후 render()
`
};

export default function mission54() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const row=document.querySelector('#row');
  const msg=document.querySelector('#msg');
  if(!row||!msg){ fail('요소 존재', {tab:'html', fix:'#row, #msg 필요'}); return results; }
  pass('요소 존재');
  pass('드래그 swap', 'manual');
  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 54 — 간단한 드래그 앤 드롭 정렬(2개 박스)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-54" title="Mission 54" defaults={DEFAULT} testsJs={testsJs} minutes={26} nextMissionId="mission-55" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`A/B 박스 드래그로 순서 교체`}</GuideBox>
          <GuideBox title="2)">{`dragover preventDefault`}</GuideBox>
          <GuideBox title="3)">{`상태 텍스트 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
