/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Users</h1>
  <button id="load" class="primary">Load</button>
  <p id="msg" class="msg">-</p>
  <ul id="list"></ul>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
ul{margin:10px 0 0 18px;line-height:1.9;}
`,
  js: `const load=document.querySelector('#load');
const msg=document.querySelector('#msg');
const list=document.querySelector('#list');

// TODO: load 클릭 시
// - msg='Loading...'
// - fetch('https://jsonplaceholder.typicode.com/users')
// - 성공: name 목록 렌더 + msg='OK'
// - 실패: msg='Error'
`
};

export default function mission70() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const load=document.querySelector('#load');
  const msg=document.querySelector('#msg');
  if(!load||!msg){ fail('요소 존재', {tab:'html', fix:'#load, #msg 필요'}); return results; }
  pass('요소 존재');

  load.click();
  await new Promise(r=>setTimeout(r,50));
  if(!(msg.textContent||'').trim()) fail('클릭 반응', {tab:'js', fix:'클릭 시 msg를 먼저 업데이트해줘.'});
  else pass('클릭 반응');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 70 — fetch로 사용자 목록 가져오기(JSONPlaceholder)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-70" title="Mission 70" defaults={DEFAULT} testsJs={testsJs} minutes={26} nextMissionId="mission-71" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Load 클릭 시 로딩 표시`}</GuideBox>
          <GuideBox title="2)">{`성공 시 이름 리스트`}</GuideBox>
          <GuideBox title="3)">{`실패 시 에러`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
