/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Consent</h1>
  <label class="row"><input id="terms" type="checkbox" /> I agree</label>
  <button id="go" class="primary" disabled>Continue</button>
  <p id="msg" class="msg">동의가 필요해</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;align-items:center;gap:10px;margin:10px 0;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
button:disabled{opacity:0.4;cursor:not-allowed;}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const terms=document.querySelector('#terms');
const go=document.querySelector('#go');
const msg=document.querySelector('#msg');

function render(){
  go.disabled = !terms.checked;
  msg.textContent = terms.checked ? 'OK' : '동의가 필요해';
}

render();

// TODO: terms change 이벤트에서 render() 호출
`
};

export default function mission47() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const terms=document.querySelector('#terms');
  const go=document.querySelector('#go');
  if(!terms||!go){ fail('요소 존재', {tab:'html', fix:'#terms, #go 필요'}); return results; }
  pass('요소 존재');

  terms.checked=true; terms.dispatchEvent(new Event('change',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(go.disabled) fail('체크하면 활성', {tab:'js', fix:'render()에서 go.disabled를 제어해줘.'});
  else pass('체크하면 활성');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 47 — 체크박스 동의(terms) 없으면 버튼 비활성화</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-47" title="Mission 47" defaults={DEFAULT} testsJs={testsJs} minutes={14} nextMissionId="mission-48" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`체크하면 버튼 활성`}</GuideBox>
          <GuideBox title="2)">{`해제하면 비활성`}</GuideBox>
          <GuideBox title="3)">{`상태 문구 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
