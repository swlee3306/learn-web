/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Reset</h1>
  <input id="name" placeholder="name" />
  <button id="save" class="primary">Save</button>
  <button id="reset">Reset</button>
  <p id="msg" class="msg">-</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;margin-bottom:10px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;margin-right:8px;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const nameEl=document.querySelector('#name');
const save=document.querySelector('#save');
const reset=document.querySelector('#reset');
const msg=document.querySelector('#msg');

// TODO:
// - save 클릭 시 msg='Saved: '+nameEl.value
// - reset 클릭 시 nameEl.value='' 그리고 msg='-'
`
};

export default function mission78() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const nameEl=document.querySelector('#name');
  const reset=document.querySelector('#reset');
  const msg=document.querySelector('#msg');
  if(!nameEl||!reset||!msg){ fail('요소 존재', {tab:'html', fix:'#name #reset #msg 필요'}); return results; }
  pass('요소 존재');

  nameEl.value='x';
  reset.click();
  await new Promise(r=>setTimeout(r,30));
  if(nameEl.value!=='') fail('리셋', {tab:'js', fix:'reset 클릭 시 input을 비워줘.'});
  else pass('리셋');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 78 — 간단한 폼 reset 버튼 구현</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-78" title="Mission 78" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-79" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Reset 클릭 시 입력 초기화`}</GuideBox>
          <GuideBox title="2)">{`메시지 초기화`}</GuideBox>
          <GuideBox title="3)">{`기본값 유지`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
