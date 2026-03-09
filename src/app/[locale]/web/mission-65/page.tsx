/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Email regex</h1>
  <input id="email" placeholder="name@example.com" />
  <p id="msg" class="msg">-</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.msg{opacity:0.9;margin:10px 0 0 0;}
.msg.err{color:#fb7185;}
.msg.ok{color:#86efac;}
`,
  js: `const email=document.querySelector('#email');
const msg=document.querySelector('#msg');

function set(text, kind){
  msg.textContent=text;
  msg.classList.toggle('err', kind==='err');
  msg.classList.toggle('ok', kind==='ok');
}

// 간단 버전(완벽한 RFC가 아님)
const re=/^[^s@]+@[^s@]+.[^s@]+$/;

set('-', '');

// TODO: input 이벤트에서
// - 빈 값이면 '-'로
// - re.test(value)이면 OK
// - 아니면 Error
`
};

export default function mission65() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const email=document.querySelector('#email');
  const msg=document.querySelector('#msg');
  if(!email||!msg){ fail('요소 존재', {tab:'html', fix:'#email, #msg 필요'}); return results; }
  pass('요소 존재');

  email.value='a@b.com'; email.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!msg.classList.contains('ok')) fail('유효 이메일 OK', {tab:'js', fix:'re.test 통과 시 ok'});
  else pass('유효 이메일 OK');

  email.value='nope'; email.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!msg.classList.contains('err')) fail('무효 이메일 Error', {tab:'js', fix:'re.test 실패 시 err'});
  else pass('무효 이메일 Error');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 65 — 간단한 정규식 이메일 검증</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-65" title="Mission 65" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-66" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`입력 시 즉시 검증`}</GuideBox>
          <GuideBox title="2)">{`유효하면 ok 스타일`}</GuideBox>
          <GuideBox title="3)">{`유효하지 않으면 err 스타일`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
