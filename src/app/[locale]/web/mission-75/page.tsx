/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Toast</h1>
  <button id="show" class="primary">Show</button>
  <div id="toast" class="toast" role="status">Saved</div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.toast{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);padding:10px 12px;border-radius:999px;border:1px solid rgba(255,255,255,0.18);background:rgba(15,23,42,0.95);opacity:0;pointer-events:none;transition:opacity 160ms, transform 160ms;}
.toast.on{opacity:1;transform:translateX(-50%) translateY(-6px)}
`,
  js: `const show=document.querySelector('#show');
const toast=document.querySelector('#toast');
let t=null;

function on(){
  toast.classList.add('on');
  clearTimeout(t);
  t=setTimeout(()=>toast.classList.remove('on'), 1500);
}

// TODO: show 클릭 시 on() 호출
`
};

export default function mission75() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const show=document.querySelector('#show');
  const toast=document.querySelector('#toast');
  if(!show||!toast){ fail('요소 존재', {tab:'html', fix:'#show, #toast 필요'}); return results; }
  pass('요소 존재');

  show.click();
  await new Promise(r=>setTimeout(r,30));
  if(!toast.classList.contains('on')) fail('표시', {tab:'js', fix:'click에서 on() 호출'});
  else pass('표시');

  let ok=false;
  for(let i=0;i<30;i++){ await new Promise(r=>setTimeout(r,100)); if(!toast.classList.contains('on')) {ok=true; break;} }
  if(!ok) fail('자동 숨김', {tab:'js', fix:'1.5초 후 on 제거'});
  else pass('자동 숨김');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 75 — 간단한 Toast 알림(자동 닫힘)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-75" title="Mission 75" defaults={DEFAULT} testsJs={testsJs} minutes={22} nextMissionId="mission-76" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Show 클릭 시 토스트 표시`}</GuideBox>
          <GuideBox title="2)">{`1.5초 후 자동 숨김`}</GuideBox>
          <GuideBox title="3)">{`연속 클릭 시 타이머 리셋`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
