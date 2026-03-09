/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Stepper</h1>
  <div class="row">
    <button id="minus">-</button>
    <div id="n" class="n">0</div>
    <button id="plus" class="primary">+</button>
  </div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;align-items:center;justify-content:center;gap:10px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;min-width:44px;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.n{width:90px;padding:12px 0;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);font-size:28px;}
`,
  js: `const minus=document.querySelector('#minus');
const plus=document.querySelector('#plus');
const nEl=document.querySelector('#n');
let n=0;

function render(){
  nEl.textContent=String(n);
}
render();

// TODO: plus 클릭 시 n++ (최대 10) 후 render()
// TODO: minus 클릭 시 n-- (최소 0) 후 render()
`
};

export default function mission60() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const plus=document.querySelector('#plus');
  const nEl=document.querySelector('#n');
  if(!plus||!nEl){ fail('요소 존재', {tab:'html', fix:'#plus, #n 필요'}); return results; }
  pass('요소 존재');

  const before=Number(nEl.textContent||'0');
  plus.click();
  await new Promise(r=>setTimeout(r,30));
  const after=Number(nEl.textContent||'0');
  if(after<=before) fail('증가', {tab:'js', fix:'plus 클릭 처리'});
  else pass('증가', String(before)+'→'+String(after));

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 60 — 숫자 스텝퍼(+/-) 만들기</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-60" title="Mission 60" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-61" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`+ 클릭 시 +1`}</GuideBox>
          <GuideBox title="2)">{`- 클릭 시 -1`}</GuideBox>
          <GuideBox title="3)">{`0~10 제한`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
