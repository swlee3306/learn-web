/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Clock</h1>
  <p id="t" class="big">--:--:--</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.big{font-size:56px;margin:0;letter-spacing:0.05em;}
`,
  js: `const t=document.querySelector('#t');

function render(){
  const d=new Date();
  const hh=String(d.getHours()).padStart(2,'0');
  const mm=String(d.getMinutes()).padStart(2,'0');
  const ss=String(d.getSeconds()).padStart(2,'0');
  t.textContent = hh+':'+mm+':'+ss;
}

render();

// TODO: setInterval로 1초마다 render()
`
};

export default function mission117() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const t=document.querySelector('#t');
  if(!t){ fail('요소 존재', {tab:'html', fix:'#t 필요'}); return results; }
  pass('요소 존재');
  const before=t.textContent;
  await new Promise(r=>setTimeout(r,1100));
  const after=t.textContent;
  if(after===before) fail('1초 업데이트', {tab:'js', fix:'setInterval로 render()를 반복 호출'});
  else pass('1초 업데이트');
  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 117 — 간단한 아날로그 시계(텍스트로)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-117" title="Mission 117" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-118" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`현재 HH:MM:SS 표시`}</GuideBox>
          <GuideBox title="2)">{`1초마다 업데이트`}</GuideBox>
          <GuideBox title="3)">{`초기 렌더`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
