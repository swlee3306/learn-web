/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Post</h1>
  <div class="row">
    <input id="id" placeholder="1~100" />
    <button id="load" class="primary">Load</button>
  </div>
  <p id="msg" class="msg">-</p>
  <h2 id="title" class="h2"></h2>
  <p id="body" class="p"></p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:8px;}
input{flex:1;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
.h2{margin:12px 0 6px 0;font-size:18px;}
.p{opacity:0.9;margin:0;}
`,
  js: `const idEl=document.querySelector('#id');
const load=document.querySelector('#load');
const msg=document.querySelector('#msg');
const title=document.querySelector('#title');
const body=document.querySelector('#body');

// TODO: load 클릭 시
// - msg='Loading...'
// - fetch('https://jsonplaceholder.typicode.com/posts/'+id)
// - 성공: title/body 표시, msg='OK'
// - 실패: msg='Error'
`
};

export default function mission84() {
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
  if(!(msg.textContent||'').trim()) fail('로딩 표시', {tab:'js', fix:'클릭 직후 msg를 업데이트해줘.'});
  else pass('로딩 표시');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 84 — fetch로 포스트 1개 보기(로딩/에러)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-84" title="Mission 84" defaults={DEFAULT} testsJs={testsJs} minutes={26} nextMissionId="mission-85" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Load 클릭 시 로딩`}</GuideBox>
          <GuideBox title="2)">{`성공 시 title/body 표시`}</GuideBox>
          <GuideBox title="3)">{`실패 시 에러`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
