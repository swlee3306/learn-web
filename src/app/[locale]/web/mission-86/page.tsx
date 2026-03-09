/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Stats</h1>
  <input id="in" placeholder="e.g. 1,2,3" />
  <button id="calc" class="primary">Calc</button>
  <pre id="out" class="out">-</pre>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;margin-bottom:10px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.out{margin:12px 0 0 0;min-height:80px;padding:10px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.04);white-space:pre-wrap;}
`,
  js: `const input=document.querySelector('#in');
const calc=document.querySelector('#calc');
const out=document.querySelector('#out');

function parse(){
  return (input.value||'')
    .split(',')
    .map(s=>Number(s.trim()))
    .filter(n=>Number.isFinite(n));
}

// TODO: calc 클릭 시
// - nums=parse()
// - 비어있으면 out='-' 유지
// - 아니면 min/max/avg를 계산해서 out에 표시
`
};

export default function mission86() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const input=document.querySelector('#in');
  const calc=document.querySelector('#calc');
  const out=document.querySelector('#out');
  if(!input||!calc||!out){ fail('요소 존재', {tab:'html', fix:'#in #calc #out 필요'}); return results; }
  pass('요소 존재');

  input.value='1,2,3';
  calc.click();
  await new Promise(r=>setTimeout(r,30));
  if(!(out.textContent||'').includes('min')) fail('통계 출력', {tab:'js', fix:'calc 클릭 시 out에 min/max/avg를 출력해줘.'});
  else pass('통계 출력');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 86 — 숫자 배열 통계(최소/최대/평균)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-86" title="Mission 86" defaults={DEFAULT} testsJs={testsJs} minutes={24} nextMissionId="mission-87" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`쉼표 입력을 숫자 배열로 변환`}</GuideBox>
          <GuideBox title="2)">{`min/max/avg 표시`}</GuideBox>
          <GuideBox title="3)">{`빈 값/NaN 처리`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
