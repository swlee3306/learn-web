/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Query</h1>
  <p id="out" class="msg">name: -</p>
  <p class="hint">try ?name=kim</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.msg{opacity:0.9;margin:0;}
.hint{opacity:0.6;margin:10px 0 0 0;}
`,
  js: `const out=document.querySelector('#out');

function render(){
  const p=new URLSearchParams(location.search);
  const name=p.get('name');
  out.textContent = 'name: ' + (name || '-');
}

render();

// TODO(선택): popstate/replaceState 등과 연동해도 됨
`
};

export default function mission118() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const out=document.querySelector('#out');
  if(!out){ fail('요소 존재', {tab:'html', fix:'#out 필요'}); return results; }
  pass('요소 존재');
  pass('쿼리 파라미터', 'manual');
  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 118 — 간단한 URL 파라미터 읽기</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-118" title="Mission 118" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-119" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`name 파라미터 표시`}</GuideBox>
          <GuideBox title="2)">{`없으면 -`}</GuideBox>
          <GuideBox title="3)">{`decode 처리`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
