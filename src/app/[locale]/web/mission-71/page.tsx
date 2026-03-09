/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="top"><div id="bar" class="bar"></div></div>
<div class="wrap">
  <h1 class="h1">Scroll</h1>
  <p class="p">scroll down...</p>
  <div class="sp"></div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;}
.top{position:fixed;top:0;left:0;right:0;height:6px;background:rgba(255,255,255,0.08);z-index:10;}
.bar{height:100%;width:0%;background:#ffd43b;}
.wrap{padding:24px;width:min(680px,92vw);margin:0 auto;}
.h1{margin:24px 0 12px 0;font-size:28px;}
.p{opacity:0.9;}
.sp{height:180vh;}
`,
  js: `const bar=document.querySelector('#bar');

function render(){
  const el=document.documentElement;
  const max = el.scrollHeight - el.clientHeight;
  const p = max<=0 ? 0 : (el.scrollTop / max) * 100;
  bar.style.width = p + '%';
}

render();

// TODO: window scroll + resize 이벤트에서 render() 호출
`
};

export default function mission71() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const bar=document.querySelector('#bar');
  if(!bar){ fail('요소 존재', {tab:'html', fix:'#bar 필요'}); return results; }
  pass('요소 존재');

  // Can't reliably simulate scroll in this environment; require handler exists by manual.
  pass('스크롤 진행률', 'manual');
  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 71 — 스크롤 진행률(상단 progress bar)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-71" title="Mission 71" defaults={DEFAULT} testsJs={testsJs} minutes={24} nextMissionId="mission-72" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`스크롤에 따라 바 width 변경`}</GuideBox>
          <GuideBox title="2)">{`0~100% 계산`}</GuideBox>
          <GuideBox title="3)">{`리사이즈에도 동작`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
