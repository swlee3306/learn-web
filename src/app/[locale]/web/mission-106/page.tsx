/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">BMI</h1>
  <input id="h" placeholder="height(cm)" />
  <input id="w" placeholder="weight(kg)" />
  <button id="go" class="primary">Calc</button>
  <p id="out" class="big">-</p>
  <p id="msg" class="msg">-</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;margin-bottom:10px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.big{font-size:40px;margin:14px 0 0 0;text-align:center;}
.msg{opacity:0.9;margin:8px 0 0 0;text-align:center;}
`,
  js: `const h=document.querySelector('#h');
const w=document.querySelector('#w');
const go=document.querySelector('#go');
const out=document.querySelector('#out');
const msg=document.querySelector('#msg');

function classify(bmi){
  if(bmi < 18.5) return 'under';
  if(bmi < 25) return 'normal';
  if(bmi < 30) return 'over';
  return 'obese';
}

// TODO: go 클릭 시
// - cm->m 변환 후 bmi = kg/(m*m)
// - 유효하면 out에 bmi.toFixed(1) 표시, msg에 classify 결과 표시
// - 아니면 out='-' msg='Error'
`
};

export default function mission106() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const go=document.querySelector('#go');
  const h=document.querySelector('#h');
  const w=document.querySelector('#w');
  const out=document.querySelector('#out');
  if(!go||!h||!w||!out){ fail('요소 존재', {tab:'html', fix:'#go #h #w #out 필요'}); return results; }
  pass('요소 존재');

  h.value='180'; w.value='70';
  go.click();
  await new Promise(r=>setTimeout(r,30));
  if((out.textContent||'').trim()==='-') fail('계산', {tab:'js', fix:'클릭 시 BMI 계산해서 out 업데이트'});
  else pass('계산', out.textContent.trim());
  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 106 — 간단한 BMI 계산기</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-106" title="Mission 106" defaults={DEFAULT} testsJs={testsJs} minutes={22} nextMissionId="mission-107" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Calc 클릭 시 BMI 계산`}</GuideBox>
          <GuideBox title="2)">{`정상/과체중 등 텍스트 표시`}</GuideBox>
          <GuideBox title="3)">{`NaN 처리`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
