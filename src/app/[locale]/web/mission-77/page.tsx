/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Sum</h1>
  <div class="row">
    <input id="a" placeholder="a" />
    <input id="b" placeholder="b" />
  </div>
  <p id="out" class="big">0</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
input{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.big{font-size:44px;margin:14px 0 0 0;text-align:center;}
`,
  js: `const a=document.querySelector('#a');
const b=document.querySelector('#b');
const out=document.querySelector('#out');

function num(x){
  const n=Number(x);
  return Number.isFinite(n) ? n : 0;
}

function render(){
  const sum = num(a.value) + num(b.value);
  out.textContent=String(sum);
}

render();

// TODO: a/b input 이벤트에서 render() 호출
`
};

export default function mission77() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const a=document.querySelector('#a');
  const b=document.querySelector('#b');
  const out=document.querySelector('#out');
  if(!a||!b||!out){ fail('요소 존재', {tab:'html', fix:'#a #b #out 필요'}); return results; }
  pass('요소 존재');

  a.value='2'; b.value='3';
  a.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if((out.textContent||'').trim()!=='5') fail('합계', {tab:'js', fix:'input 시 render 호출해서 합계 표시'});
  else pass('합계');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 77 — 숫자 합계 계산기(입력 2개)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-77" title="Mission 77" defaults={DEFAULT} testsJs={testsJs} minutes={16} nextMissionId="mission-78" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`a/b 입력 시 합계 표시`}</GuideBox>
          <GuideBox title="2)">{`빈 값은 0 취급`}</GuideBox>
          <GuideBox title="3)">{`NaN 방지`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
