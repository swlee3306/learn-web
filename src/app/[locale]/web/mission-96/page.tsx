/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Password</h1>
  <button id="gen" class="primary">Generate</button>
  <code id="out" class="out">-</code>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.out{display:inline-block;margin-top:12px;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06)}
`,
  js: `const gen=document.querySelector('#gen');
const out=document.querySelector('#out');

const U='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const L='abcdefghijklmnopqrstuvwxyz';
const D='0123456789';
const ALL=U+L+D;

function pick(s){
  return s[Math.floor(Math.random()*s.length)];
}

function make(){
  // TODO: 12자 만들기. 최소 1개씩 U/L/D 포함.
  return '-';
}

// TODO: gen 클릭 시 out.textContent=make()
`
};

export default function mission96() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const gen=document.querySelector('#gen');
  const out=document.querySelector('#out');
  if(!gen||!out){ fail('요소 존재', {tab:'html', fix:'#gen #out 필요'}); return results; }
  pass('요소 존재');

  gen.click();
  await new Promise(r=>setTimeout(r,30));
  const t=(out.textContent||'').trim();
  if(!t || t==='-') fail('생성', {tab:'js', fix:'make() 구현하고 click에서 out 업데이트'});
  else pass('생성', t);

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 96 — 랜덤 비밀번호 생성기</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-96" title="Mission 96" defaults={DEFAULT} testsJs={testsJs} minutes={22} nextMissionId="mission-97" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Generate 클릭 시 12자 비밀번호 생성`}</GuideBox>
          <GuideBox title="2)">{`대문자/소문자/숫자 포함`}</GuideBox>
          <GuideBox title="3)">{`복사 버튼(선택)`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
