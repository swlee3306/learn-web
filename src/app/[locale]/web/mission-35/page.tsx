/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Calc</h1>
  <div class="row">
    <input id="a" placeholder="A"/>
    <input id="b" placeholder="B"/>
  </div>
  <div class="row">
    <button class="op" data-op="+">+</button>
    <button class="op" data-op="-">-</button>
    <button class="op" data-op="*">×</button>
    <button class="op" data-op="/">÷</button>
  </div>
  <p id="res" class="msg">결과: -</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:10px;margin:10px 0;}
input{flex:1;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
.msg{opacity:0.9;margin:0;}
`,
  js: `const a=document.querySelector('#a');
const b=document.querySelector('#b');
const res=document.querySelector('#res');

// TODO: .op 버튼 클릭 시 data-op에 맞게 계산해서 res.textContent 업데이트
// 힌트: Number(a.value)
`
};

export default function mission35() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});

  const a=document.querySelector('#a');
  const b=document.querySelector('#b');
  const res=document.querySelector('#res');
  const ops=[...document.querySelectorAll('.op')];
  if(!a||!b||!res||ops.length!==4){ fail('요소 존재', {tab:'html', fix:'#a #b #res와 .op 4개 필요'}); return results; }
  pass('요소 존재');

  a.value='8'; b.value='2';
  const plus=ops.find(x=>x.dataset.op==='+');
  plus?.click();
  await new Promise(r=>setTimeout(r,30));
  if(!(res.textContent||'').includes('10')) fail('+ 계산', {tab:'js', fix:'plus 클릭 시 결과가 10'}); else pass('+ 계산');

  const div=ops.find(x=>x.dataset.op==='/');
  div?.click();
  await new Promise(r=>setTimeout(r,30));
  if(!(res.textContent||'').includes('4')) fail('/ 계산', {tab:'js', fix:'나누기 결과 4'}); else pass('/ 계산');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 35 — 간단 계산기(+, -, ×, ÷)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-35" title="Mission 35" defaults={DEFAULT} testsJs={testsJs} minutes={22} nextMissionId="mission-36" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`사칙연산 버튼 동작`}</GuideBox>
          <GuideBox title="2)">{`NaN 처리(빈값/문자)`}</GuideBox>
          <GuideBox title="3)">{`결과를 화면에 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
