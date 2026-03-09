/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Mission 19</h1>
  <label class="label">Email</label>
  <input id="email" class="input" placeholder="you@example.com" />
  <p id="msg" class="msg"></p>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(560px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
.label{display:block;margin-bottom:6px;opacity:0.9;}
.input{width:100%;padding:12px 14px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.04);color:white;}
.msg{margin:10px 0 0 0;min-height:24px;}
.msg.ok{color:#7CFF6B;}
.msg.err{color:#ff6b6b;}
`,
  js: `// 목표: email 입력값을 검증해서 msg에 결과를 보여줘.
// 규칙: 빈 값이면 msg 비움. 이메일이면 'OK', 아니면 '이메일 형식이 아니야'

const input = document.querySelector('#email');
const msg = document.querySelector('#msg');

// TODO: input 이벤트를 달고 검증 로직을 작성해.
`
};

export default function mission19() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const input=document.querySelector('#email');
  const msg=document.querySelector('#msg');
  if(!input) fail('입력 존재(#email)',{tab:'html',fix:'id="email" input을 만들어줘.'}); else pass('입력 존재(#email)');
  if(!msg) fail('메시지 존재(#msg)',{tab:'html',fix:'id="msg" 요소를 만들어줘.'}); else pass('메시지 존재(#msg)');
  if(!input||!msg) return results;
  try{
    input.value='';
    input.dispatchEvent(new Event('input',{bubbles:true}));
    await new Promise(r=>setTimeout(r,30));
    const t0=(msg.textContent||'').trim();
    if(t0) fail('빈 값이면 비움',{tab:'js',fix:'빈 값이면 msg.textContent를 빈 문자열로.'});
    else pass('빈 값이면 비움');

    input.value='nope';
    input.dispatchEvent(new Event('input',{bubbles:true}));
    await new Promise(r=>setTimeout(r,30));
    const t1=(msg.textContent||'').trim();
    if(!t1) fail('잘못된 형식 에러',{tab:'js',fix:'잘못된 형식이면 에러 문구를 표시해.'});
    else pass('잘못된 형식 에러', t1);

    input.value='a@b.com';
    input.dispatchEvent(new Event('input',{bubbles:true}));
    await new Promise(r=>setTimeout(r,30));
    const t2=(msg.textContent||'').trim().toLowerCase();
    if(!t2.includes('ok')) fail('올바른 이메일이면 OK',{tab:'js',fix:'email 형식이면 msg에 OK를 표시해.'});
    else pass('올바른 이메일이면 OK', t2);
  }catch(e){ fail('동작 테스트', String(e && (e.stack||e))); }
  return results;
};
`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 19 — 입력 검증(이메일) + 에러 표시</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-19" title="Mission 19" defaults={DEFAULT} testsJs={testsJs} minutes={20} nextMissionId="mission-20" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`이메일 형식이면 OK 표시`}</GuideBox>
          <GuideBox title="2)">{`형식이 아니면 에러 메시지 표시`}</GuideBox>
          <GuideBox title="3)">{`빈 값이면 에러 숨김`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
