/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Click</h1>
  <button id="btn" class="primary">Click me</button>
  <p id="n" class="big">0</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.big{font-size:44px;margin:14px 0 0 0;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
`,
  js: `const btn=document.querySelector('#btn');
const nEl=document.querySelector('#n');
let n=0;

function render(){
  nEl.textContent=String(n);
}
render();

// TODO: btn click에서 n+=1, dblclick에서 n+=2 후 render()
`
};

export default function mission79() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn=document.querySelector('#btn');
  const nEl=document.querySelector('#n');
  if(!btn||!nEl){ fail('요소 존재', {tab:'html', fix:'#btn, #n 필요'}); return results; }
  pass('요소 존재');

  btn.dispatchEvent(new MouseEvent('dblclick',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(Number(nEl.textContent||'0')<2) fail('dblclick +2', {tab:'js', fix:'dblclick 이벤트에서 +2 처리'});
  else pass('dblclick +2');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 79 — 클릭 카운터(더블클릭은 +2)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-79" title="Mission 79" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-80" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`클릭하면 +1`}</GuideBox>
          <GuideBox title="2)">{`더블클릭하면 +2`}</GuideBox>
          <GuideBox title="3)">{`화면 업데이트`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
