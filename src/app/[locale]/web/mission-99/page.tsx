/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Calc</h1>
  <div class="row">
    <input id="a" placeholder="a" />
    <select id="op">
      <option value="+">+</option>
      <option value="-">-</option>
      <option value="*">*</option>
      <option value="/">/</option>
    </select>
    <input id="b" placeholder="b" />
  </div>
  <button id="go" class="primary">Calc</button>
  <p id="out" class="big">0</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:grid;grid-template-columns:1fr 80px 1fr;gap:8px;}
input,select{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
button{margin-top:10px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.big{font-size:44px;margin:12px 0 0 0;text-align:center;}
`,
  js: `const a=document.querySelector('#a');
const b=document.querySelector('#b');
const op=document.querySelector('#op');
const go=document.querySelector('#go');
const out=document.querySelector('#out');

function calc(){
  const x=Number(a.value);
  const y=Number(b.value);
  if(!Number.isFinite(x) || !Number.isFinite(y)) return '0';
  switch(op.value){
    case '+': return String(x+y);
    case '-': return String(x-y);
    case '*': return String(x*y);
    case '/': return y===0 ? 'Error' : String(x/y);
  }
  return '0';
}

// TODO: go 클릭 시 out.textContent=calc()
`
};

export default function mission99() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const go=document.querySelector('#go');
  const a=document.querySelector('#a');
  const b=document.querySelector('#b');
  const out=document.querySelector('#out');
  if(!go||!a||!b||!out){ fail('요소 존재', {tab:'html', fix:'#go #a #b #out 필요'}); return results; }
  pass('요소 존재');

  a.value='2'; b.value='3';
  go.click();
  await new Promise(r=>setTimeout(r,30));
  if((out.textContent||'').trim()==='0') fail('계산', {tab:'js', fix:'go 클릭에서 out 갱신'});
  else pass('계산', out.textContent.trim());

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 99 — 간단한 수식 계산기(+ - * /)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-99" title="Mission 99" defaults={DEFAULT} testsJs={testsJs} minutes={22} nextMissionId="mission-100" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`a/b 입력 + op 선택`}</GuideBox>
          <GuideBox title="2)">{`Calc 클릭 시 결과 표시`}</GuideBox>
          <GuideBox title="3)">{`0으로 나누기 처리`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
