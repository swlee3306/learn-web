/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Undo</h1>
  <div class="row">
    <button id="add" class="primary">+1</button>
    <button id="undo" disabled>Undo</button>
  </div>
  <p id="n" class="big">0</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:8px;justify-content:center;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button:disabled{opacity:0.45;cursor:not-allowed;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.big{font-size:50px;margin:12px 0 0 0;}
`,
  js: `const add=document.querySelector('#add');
const undo=document.querySelector('#undo');
const nEl=document.querySelector('#n');
let n=0;
let prev=null;

function render(){
  nEl.textContent=String(n);
  undo.disabled = prev===null;
}
render();

// TODO:
// - add 클릭: prev=n 저장 후 n=n+1, render
// - undo 클릭: n=prev; prev=null; render
`
};

export default function mission123() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const add=document.querySelector('#add');
  const undo=document.querySelector('#undo');
  const nEl=document.querySelector('#n');
  if(!add||!undo||!nEl){ fail('요소 존재', {tab:'html', fix:'#add #undo #n 필요'}); return results; }
  pass('요소 존재');

  add.click();
  await new Promise(r=>setTimeout(r,30));
  const afterAdd=nEl.textContent;
  undo.click();
  await new Promise(r=>setTimeout(r,30));
  if(nEl.textContent===afterAdd) fail('Undo', {tab:'js', fix:'undo에서 이전 값으로 되돌려줘.'});
  else pass('Undo');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 123 — 간단한 Undo(최근 1회)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-123" title="Mission 123" defaults={DEFAULT} testsJs={testsJs} minutes={24} nextMissionId="mission-124" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`+1 버튼`}</GuideBox>
          <GuideBox title="2)">{`Undo 버튼으로 되돌리기`}</GuideBox>
          <GuideBox title="3)">{`Undo 불가 시 disabled`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
