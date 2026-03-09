/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">CSV</h1>
  <textarea id="csv" rows="5">name,age
Kim,22
Lee,30</textarea>
  <button id="go" class="primary">Parse</button>
  <div id="out"></div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
textarea{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;resize:vertical;}
button{margin-top:10px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
table{width:100%;border-collapse:collapse;margin-top:12px;}
th,td{border:1px solid rgba(255,255,255,0.18);padding:8px 10px;}
`,
  js: `const csv=document.querySelector('#csv');
const go=document.querySelector('#go');
const out=document.querySelector('#out');

function parse(text){
  return text
    .split('
')
    .map(l=>l.trim())
    .filter(Boolean)
    .map(l=>l.split(',').map(x=>x.trim()));
}

// TODO: go 클릭 시
// - rows=parse(csv.value)
// - 첫 줄을 헤더로 th 생성
// - 나머지 줄을 td로 생성해서 table을 out에 렌더
`
};

export default function mission102() {
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
  if(!out.querySelector('table')) fail('테이블 렌더', {tab:'js', fix:'go 클릭 시 table을 만들어 out에 넣어줘.'});
  else pass('테이블 렌더');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 102 — 간단한 CSV 테이블 렌더</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-102" title="Mission 102" defaults={DEFAULT} testsJs={testsJs} minutes={26} nextMissionId="mission-103" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Parse 클릭 시 테이블 생성`}</GuideBox>
          <GuideBox title="2)">{`헤더/바디 분리`}</GuideBox>
          <GuideBox title="3)">{`빈 줄 무시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
