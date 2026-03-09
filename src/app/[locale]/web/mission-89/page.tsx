/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Tooltip</h1>
  <button id="btn" class="primary" aria-describedby="tip">Hover me</button>
  <div id="tip" class="tip" role="tooltip">Hello</div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center;position:relative}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.tip{margin-top:10px;display:inline-block;padding:8px 10px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(15,23,42,0.95);opacity:0;transform:translateY(4px);transition:opacity 160ms, transform 160ms;}
.tip.on{opacity:1;transform:translateY(0)}
`,
  js: `const btn=document.querySelector('#btn');
const tip=document.querySelector('#tip');

function set(on){
  tip.classList.toggle('on', on);
}

set(false);

// TODO: btn mouseenter에서 set(true), mouseleave에서 set(false)
`
};

export default function mission89() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn=document.querySelector('#btn');
  const tip=document.querySelector('#tip');
  if(!btn||!tip){ fail('요소 존재', {tab:'html', fix:'#btn #tip 필요'}); return results; }
  pass('요소 존재');

  btn.dispatchEvent(new MouseEvent('mouseenter',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!tip.classList.contains('on')) fail('hover 표시', {tab:'js', fix:'mouseenter에서 set(true)'});
  else pass('hover 표시');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 89 — 간단한 툴팁(hover) 표시</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-89" title="Mission 89" defaults={DEFAULT} testsJs={testsJs} minutes={16} nextMissionId="mission-90" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`hover 시 tooltip 표시`}</GuideBox>
          <GuideBox title="2)">{`leave 시 숨김`}</GuideBox>
          <GuideBox title="3)">{`접근성 aria`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
