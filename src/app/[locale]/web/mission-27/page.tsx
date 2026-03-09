/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Ready?</h1>
  <label><input class="ck" type="checkbox"/> 약관 동의</label><br/>
  <label><input class="ck" type="checkbox"/> 개인정보 동의</label><br/>
  <label><input class="ck" type="checkbox"/> 만 14세 이상</label>
  <p id="status" class="msg">아직 준비 안 됨</p>
  <button id="go" disabled>시작</button>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 10px 0;font-size:28px;}
.msg{opacity:0.9;margin:10px 0;}
button{margin-top:8px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;}
button:disabled{opacity:0.4;cursor:not-allowed;}
`,
  js: `// 목표: 체크박스 3개가 모두 체크되면 버튼(#go)을 활성화하고 status 문구를 바꿔.

const cks = document.querySelectorAll('.ck');
const go = document.querySelector('#go');
const status = document.querySelector('#status');

// TODO: change 이벤트를 걸고, 3개 모두 checked인지 확인해서
// go.disabled, status.textContent를 업데이트
`
};

export default function mission27() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});

  const cks=[...document.querySelectorAll('.ck')];
  const go=document.querySelector('#go');
  const status=document.querySelector('#status');
  if(cks.length!==3) fail('체크박스 3개', {tab:'html', fix:'class="ck" 체크박스를 3개 만들어줘.'}); else pass('체크박스 3개');
  if(!go) fail('버튼 존재 (#go)'); else pass('버튼 존재 (#go)');
  if(!status) fail('상태 문구 (#status)'); else pass('상태 문구 (#status)');
  if(cks.length!==3||!go||!status) return results;

  cks.forEach(x=>{x.checked=true; x.dispatchEvent(new Event('change',{bubbles:true}));});
  await new Promise(r=>setTimeout(r,30));
  if(go.disabled) fail('모두 체크 → enabled', {tab:'js', fix:'3개 모두 체크면 go.disabled=false로 만들어줘.'}); else pass('모두 체크 → enabled');

  cks[0].checked=false; cks[0].dispatchEvent(new Event('change',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!go.disabled) fail('하나 해제 → disabled', {tab:'js', fix:'하나라도 해제면 go.disabled=true로 만들어줘.'}); else pass('하나 해제 → disabled');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 27 — 체크박스 모두 체크되면 버튼 활성화</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-27" title="Mission 27" defaults={DEFAULT} testsJs={testsJs} minutes={14} nextMissionId="mission-28" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`3개 모두 체크되면 버튼 enabled`}</GuideBox>
          <GuideBox title="2)">{`하나라도 해제되면 disabled`}</GuideBox>
          <GuideBox title="3)">{`상태 문구 업데이트`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
