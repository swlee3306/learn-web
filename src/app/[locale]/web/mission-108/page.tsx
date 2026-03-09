/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Slideshow</h1>
  <div id="view" class="view">1</div>
  <div class="row">
    <button id="prev">Prev</button>
    <button id="next" class="primary">Next</button>
    <button id="auto">Auto</button>
  </div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.view{height:180px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);display:grid;place-items:center;font-size:70px;}
.row{display:flex;gap:8px;justify-content:center;margin-top:12px;flex-wrap:wrap}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
`,
  js: `const view=document.querySelector('#view');
const prev=document.querySelector('#prev');
const next=document.querySelector('#next');
const autoBtn=document.querySelector('#auto');
const items=['1','2','3'];
let i=0;
let timer=null;

function render(){
  view.textContent = items[i];
  autoBtn.textContent = timer ? 'Stop' : 'Auto';
}
render();

function step(d){
  i = (i + d + items.length) % items.length;
  render();
}

// TODO:
// - prev 클릭: step(-1)
// - next 클릭: step(1)
// - auto 클릭: timer 없으면 setInterval(()=>step(1), 1000), 있으면 clearInterval
`
};

export default function mission108() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const next=document.querySelector('#next');
  const view=document.querySelector('#view');
  if(!next||!view){ fail('요소 존재', {tab:'html', fix:'#next #view 필요'}); return results; }
  pass('요소 존재');

  const before=view.textContent;
  next.click();
  await new Promise(r=>setTimeout(r,30));
  const after=view.textContent;
  if(after===before) fail('Next 이동', {tab:'js', fix:'next 클릭에서 step(1) 호출'});
  else pass('Next 이동');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 108 — 간단한 슬라이드 쇼(Prev/Next + 자동)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-108" title="Mission 108" defaults={DEFAULT} testsJs={testsJs} minutes={28} nextMissionId="mission-109" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Prev/Next로 이동`}</GuideBox>
          <GuideBox title="2)">{`Auto 토글`}</GuideBox>
          <GuideBox title="3)">{`끝에서 순환`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
