/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Validate</h1>
  <input id="n" placeholder="1~10" />
  <p id="msg" class="msg">값을 입력해줘</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.msg{opacity:0.9;margin:12px 0 0 0;}
.msg.err{color:#fb7185;}
.msg.ok{color:#86efac;}
`,
  js: `const n=document.querySelector('#n');
const msg=document.querySelector('#msg');

function set(text, kind){
  msg.textContent=text;
  msg.classList.toggle('err', kind==='err');
  msg.classList.toggle('ok', kind==='ok');
}

set('값을 입력해줘');

// TODO: input 이벤트에서
// - 빈 값이면 안내
// - 1~10이면 OK
// - 아니면 에러
`
};

export default function mission39() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const nEl=document.querySelector('#n');
  const msg=document.querySelector('#msg');
  if(!nEl||!msg){ fail('요소 존재', {tab:'html', fix:'#n, #msg 필요'}); return results; }
  pass('요소 존재');

  nEl.value='5'; nEl.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!msg.classList.contains('ok')) fail('범위 OK', {tab:'js', fix:'1~10이면 ok 클래스를 붙여줘.'});
  else pass('범위 OK');

  nEl.value='99'; nEl.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!msg.classList.contains('err')) fail('범위 밖 에러', {tab:'js', fix:'범위 밖이면 err 클래스를 붙여줘.'});
  else pass('범위 밖 에러');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 39 — 숫자 입력 검증(1~10) + 에러 표시</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-39" title="Mission 39" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-40" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`1~10이면 OK`}</GuideBox>
          <GuideBox title="2)">{`범위 밖이면 에러`}</GuideBox>
          <GuideBox title="3)">{`빈 값이면 안내`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
