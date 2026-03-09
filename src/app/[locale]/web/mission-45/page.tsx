/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Form</h1>
  <form id="f">
    <input id="name" placeholder="name" />
    <input id="email" placeholder="email" />
    <button id="send" class="primary" type="submit">Send</button>
  </form>
  <p id="msg" class="msg">-</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
form{display:grid;gap:10px;}
input{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
.msg.err{color:#fb7185;}
.msg.ok{color:#86efac;}
`,
  js: `const f=document.querySelector('#f');
const nameEl=document.querySelector('#name');
const email=document.querySelector('#email');
const msg=document.querySelector('#msg');

function set(text, kind){
  msg.textContent=text;
  msg.classList.toggle('err', kind==='err');
  msg.classList.toggle('ok', kind==='ok');
}

// TODO: submit 이벤트에서 preventDefault
// - 이름 2글자 이상, 이메일에 @ 포함이면 OK
// - 아니면 에러
`
};

export default function mission45() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const f=document.querySelector('#f');
  const nameEl=document.querySelector('#name');
  const email=document.querySelector('#email');
  const msg=document.querySelector('#msg');
  if(!f||!nameEl||!email||!msg){ fail('요소 존재', {tab:'html', fix:'#f #name #email #msg 필요'}); return results; }
  pass('요소 존재');

  nameEl.value='ab'; email.value='a@b.com';
  f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!msg.classList.contains('ok')) fail('유효하면 OK', {tab:'js', fix:'유효성 통과 시 ok 클래스를 붙여줘.'});
  else pass('유효하면 OK');

  nameEl.value='a'; email.value='nope';
  f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!msg.classList.contains('err')) fail('유효하지 않으면 에러', {tab:'js', fix:'유효성 실패 시 err 클래스를 붙여줘.'});
  else pass('유효하지 않으면 에러');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 45 — 미니 폼 검증(이름/이메일) + submit 막기</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-45" title="Mission 45" defaults={DEFAULT} testsJs={testsJs} minutes={24} nextMissionId="mission-46" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`이름/이메일 유효하면 OK`}</GuideBox>
          <GuideBox title="2)">{`유효하지 않으면 에러`}</GuideBox>
          <GuideBox title="3)">{`submit 시 새로고침 방지`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
