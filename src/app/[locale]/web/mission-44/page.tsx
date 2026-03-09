/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Mouse</h1>
  <div id="box" class="box">move mouse</div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
.box{border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);padding:14px;border-radius:14px;min-height:44px;}
`,
  js: `const box=document.querySelector('#box');

// TODO: window mousemove에서 좌표를 읽어 box.textContent를 업데이트
`
};

export default function mission44() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const box=document.querySelector('#box');
  if(!box){ fail('요소 존재', {tab:'html', fix:'#box 필요'}); return results; }
  pass('요소 존재');

  window.dispatchEvent(new MouseEvent('mousemove',{clientX:12, clientY:34, bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!(box.textContent||'').includes('12') && !(box.textContent||'').includes('34')) fail('좌표 표시', {tab:'js', fix:'mousemove에서 box.textContent를 업데이트해줘.'});
  else pass('좌표 표시', (box.textContent||'').slice(0,30));

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 44 — 간단한 마우스 좌표 트래커</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-44" title="Mission 44" defaults={DEFAULT} testsJs={testsJs} minutes={16} nextMissionId="mission-45" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`마우스 움직이면 좌표 표시`}</GuideBox>
          <GuideBox title="2)">{`좌표 박스 스타일`}</GuideBox>
          <GuideBox title="3)">{`초기 문구 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
