/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Random Color</h1>
  <p id="now" class="msg">현재 색: (none)</p>
  <button id="pick" class="primary">Pick</button>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 10px 0;font-size:28px;}
.msg{opacity:0.9;margin:0 0 14px 0;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
`,
  js: `const colors = ['#1e3a8a','#0f766e','#7c3aed','#be123c'];
const pick = document.querySelector('#pick');
const now = document.querySelector('#now');

// TODO: 클릭하면 랜덤 색을 뽑아서 document.body.style.background 에 넣고
// now.textContent에도 표시
`
};

export default function mission31() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});

  const pick=document.querySelector('#pick');
  const now=document.querySelector('#now');
  if(!pick||!now){ fail('요소 존재', {tab:'html', fix:'#pick 버튼과 #now 문구가 필요해.'}); return results; }
  pass('요소 존재');

  const before = getComputedStyle(document.body).backgroundColor;
  pick.click();
  await new Promise(r=>setTimeout(r,50));
  const after = getComputedStyle(document.body).backgroundColor;
  if(after===before) fail('클릭 → 배경 변경', {tab:'js', fix:'pick 클릭에서 body 배경을 바꿔줘.'}); else pass('클릭 → 배경 변경', before+' → '+after);

  if(!(now.textContent||'').includes(':')) fail('현재 색 표시', {tab:'js', fix:'now.textContent에 현재 색을 표시해줘.'}); else pass('현재 색 표시');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 31 — 랜덤 배경색 뽑기(배열)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-31" title="Mission 31" defaults={DEFAULT} testsJs={testsJs} minutes={14} nextMissionId="mission-32" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`버튼 클릭 시 배경색 변경`}</GuideBox>
          <GuideBox title="2)">{`같은 색 연속 방지(옵션)`}</GuideBox>
          <GuideBox title="3)">{`현재 색 텍스트 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
