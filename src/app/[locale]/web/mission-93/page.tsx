/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Format</h1>
  <input id="n" placeholder="number" />
  <p id="out" class="msg">-</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
  js: `const n=document.querySelector('#n');
const out=document.querySelector('#out');
const fmt=new Intl.NumberFormat('en-US');

function render(){
  const v=Number((n.value||'').trim());
  out.textContent = Number.isFinite(v) ? fmt.format(v) : '-';
}

render();

// TODO: input 이벤트에서 render() 호출
`
};

export default function mission93() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const nEl=document.querySelector('#n');
  const out=document.querySelector('#out');
  if(!nEl||!out){ fail('요소 존재', {tab:'html', fix:'#n #out 필요'}); return results; }
  pass('요소 존재');

  nEl.value='1000'; nEl.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if((out.textContent||'').trim()!=='1,000') fail('천 단위 콤마', {tab:'js', fix:'input에서 Intl로 포맷 render'});
  else pass('천 단위 콤마');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 93 — 간단한 숫자 포맷(천 단위 콤마)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-93" title="Mission 93" defaults={DEFAULT} testsJs={testsJs} minutes={20} nextMissionId="mission-94" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`입력하면 포맷 출력`}</GuideBox>
          <GuideBox title="2)">{`NaN 처리`}</GuideBox>
          <GuideBox title="3)">{`초기 상태 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
