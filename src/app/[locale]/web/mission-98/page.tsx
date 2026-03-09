/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Follow</h1>
  <button id="btn" class="primary">Follow</button>
  <p id="msg" class="msg">-</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(34,197,94,0.18); border-color: rgba(34,197,94,0.35)}
button:disabled{opacity:0.45;cursor:not-allowed;}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const btn=document.querySelector('#btn');
const msg=document.querySelector('#msg');
let following=false;
let busy=false;

function render(){
  btn.textContent = following ? 'Following' : 'Follow';
  btn.disabled = busy;
  msg.textContent = busy ? 'Saving...' : '-';
}

render();

// TODO: btn 클릭 시 busy=true; following 토글; render();
// 500ms 후 busy=false; msg='Saved'로 표시(그리고 render)
`
};

export default function mission98() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn=document.querySelector('#btn');
  const msg=document.querySelector('#msg');
  if(!btn||!msg){ fail('요소 존재', {tab:'html', fix:'#btn #msg 필요'}); return results; }
  pass('요소 존재');

  const before=btn.textContent;
  btn.click();
  await new Promise(r=>setTimeout(r,30));
  const after=btn.textContent;
  if(after===before) fail('즉시 토글', {tab:'js', fix:'클릭 즉시 following 토글 + render'});
  else pass('즉시 토글');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 98 — 간단한 팔로우 버튼(optimistic UI)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-98" title="Mission 98" defaults={DEFAULT} testsJs={testsJs} minutes={24} nextMissionId="mission-99" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`클릭 즉시 Follow/Following 토글`}</GuideBox>
          <GuideBox title="2)">{`로딩 중 disabled`}</GuideBox>
          <GuideBox title="3)">{`완료 메시지`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
