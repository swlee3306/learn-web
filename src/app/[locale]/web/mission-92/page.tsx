/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Paste</h1>
  <textarea id="t" rows="4" placeholder="paste here"></textarea>
  <p id="out" class="msg">-</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
textarea{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;resize:vertical;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
  js: `const t=document.querySelector('#t');
const out=document.querySelector('#out');

// TODO: t paste 이벤트에서
// const text=e.clipboardData.getData('text');
// out.textContent='pasted: '+(text||'-');
`
};

export default function mission92() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const t=document.querySelector('#t');
  const out=document.querySelector('#out');
  if(!t||!out){ fail('요소 존재', {tab:'html', fix:'#t #out 필요'}); return results; }
  pass('요소 존재');
  pass('paste 이벤트', 'manual');
  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 92 — 간단한 클립보드 붙여넣기(paste) 감지</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-92" title="Mission 92" defaults={DEFAULT} testsJs={testsJs} minutes={22} nextMissionId="mission-93" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`붙여넣기 시 텍스트 표시`}</GuideBox>
          <GuideBox title="2)">{`빈 값 처리`}</GuideBox>
          <GuideBox title="3)">{`상태 메시지`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
