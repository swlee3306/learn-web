/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Flip</h1>
  <div id="card" class="card">
    <div class="face front">FRONT</div>
    <div class="face back">BACK</div>
  </div>
  <p id="msg" class="msg">click card</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.card{width:220px;height:140px;margin:0 auto;position:relative;transform-style:preserve-3d;transition:transform 400ms;cursor:pointer;}
.card.flip{transform:rotateY(180deg)}
.face{position:absolute;inset:0;display:grid;place-items:center;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);backface-visibility:hidden;font-weight:700;letter-spacing:0.08em;}
.back{transform:rotateY(180deg);background:rgba(255,212,59,0.12)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const card=document.querySelector('#card');
const msg=document.querySelector('#msg');
let flipped=false;

function render(){
  card.classList.toggle('flip', flipped);
  msg.textContent = flipped ? 'BACK' : 'FRONT';
}

render();

// TODO: card 클릭 시 flipped 토글 후 render() 호출
`
};

export default function mission56() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const card=document.querySelector('#card');
  const msg=document.querySelector('#msg');
  if(!card||!msg){ fail('요소 존재', {tab:'html', fix:'#card, #msg 필요'}); return results; }
  pass('요소 존재');

  const before=msg.textContent;
  card.click();
  await new Promise(r=>setTimeout(r,30));
  const after=msg.textContent;
  if(after===before) fail('클릭 토글', {tab:'js', fix:'click에서 flipped=!flipped; render();'});
  else pass('클릭 토글', String(before)+'→'+String(after));

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 56 — 카드 뒤집기(클릭 토글)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-56" title="Mission 56" defaults={DEFAULT} testsJs={testsJs} minutes={16} nextMissionId="mission-57" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`카드 클릭 시 뒤집기`}</GuideBox>
          <GuideBox title="2)">{`앞/뒤 텍스트`}</GuideBox>
          <GuideBox title="3)">{`부드러운 애니메이션`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
