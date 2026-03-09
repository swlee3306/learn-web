/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Word count</h1>
  <textarea id="t" rows="4">Hello hello world</textarea>
  <button id="go" class="primary">Count</button>
  <pre id="out" class="out">-</pre>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
textarea{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;resize:vertical;}
button{margin-top:10px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.out{margin-top:12px;min-height:90px;padding:10px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.04);white-space:pre-wrap;}
`,
  js: `const t=document.querySelector('#t');
const go=document.querySelector('#go');
const out=document.querySelector('#out');

function countWords(text){
  const words = (text||'')
    .toLowerCase()
    .split(/s+/)
    .map(x=>x.trim())
    .filter(Boolean);

  const m=new Map();
  for(const w of words){ m.set(w, (m.get(w)||0)+1); }
  return [...m.entries()].sort((a,b)=>b[1]-a[1]);
}

// TODO: go 클릭 시 countWords(t.value) 결과를 out에 줄단위로 출력 (예: hello:2)
`
};

export default function mission107() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const go=document.querySelector('#go');
  const out=document.querySelector('#out');
  if(!go||!out){ fail('요소 존재', {tab:'html', fix:'#go #out 필요'}); return results; }
  pass('요소 존재');

  go.click();
  await new Promise(r=>setTimeout(r,30));
  if(!(out.textContent||'').includes(':')) fail('빈도 출력', {tab:'js', fix:'out에 "word:count" 형태로 출력해줘.'});
  else pass('빈도 출력');
  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 107 — 단어 빈도 세기</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-107" title="Mission 107" defaults={DEFAULT} testsJs={testsJs} minutes={24} nextMissionId="mission-108" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Count 클릭 시 빈도 출력`}</GuideBox>
          <GuideBox title="2)">{`대소문자 무시`}</GuideBox>
          <GuideBox title="3)">{`빈 단어 무시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
