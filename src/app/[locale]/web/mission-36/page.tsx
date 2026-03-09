/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Theme</h1>
  <select id="theme">
    <option value="dark" selected>dark</option>
    <option value="light">light</option>
    <option value="mint">mint</option>
  </select>
  <p id="now" class="msg">현재: dark</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;transition:background 200ms,color 200ms;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
select{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;}
.msg{opacity:0.9;margin:12px 0 0 0;}
body.light{background:#f8fafc;color:#0f172a;}
body.light select{background:#fff;color:#0f172a;border-color:#cbd5e1;}
body.mint{background:#062b2a;color:#d1fae5;}
`,
  js: `const theme=document.querySelector('#theme');
const now=document.querySelector('#now');

// TODO: theme change 시 document.body.className을 선택값으로 바꾸고
// now.textContent도 업데이트
`
};

export default function mission36() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const theme=document.querySelector('#theme');
  const now=document.querySelector('#now');
  if(!theme||!now){ fail('요소 존재', {tab:'html', fix:'#theme select와 #now 필요'}); return results; }
  pass('요소 존재');

  theme.value='light'; theme.dispatchEvent(new Event('change',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!document.body.classList.contains('light')) fail('테마 클래스 변경', {tab:'js', fix:'change에서 body.classList를 업데이트해줘.'});
  else pass('테마 클래스 변경', 'light');

  if(!(now.textContent||'').includes('light')) fail('현재 테마 표시', {tab:'js', fix:'now.textContent에 선택값을 넣어줘.'});
  else pass('현재 테마 표시');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 36 — 드롭다운(select)으로 색 테마 바꾸기</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-36" title="Mission 36" defaults={DEFAULT} testsJs={testsJs} minutes={16} nextMissionId="mission-37" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`테마 선택 시 body 클래스 변경`}</GuideBox>
          <GuideBox title="2)">{`선택값을 화면에 표시`}</GuideBox>
          <GuideBox title="3)">{`기본값은 dark`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
