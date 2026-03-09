/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Nickname</h1>
  <input id="name" placeholder="nickname" />
  <button id="save" class="primary">Save</button>
  <p id="msg" class="msg">-</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;margin-bottom:10px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const nameEl=document.querySelector('#name');
const save=document.querySelector('#save');
const msg=document.querySelector('#msg');
const KEY='learn.nick';

function load(){
  const v=localStorage.getItem(KEY);
  if(v){
    nameEl.value=v;
    msg.textContent='Loaded: '+v;
  } else {
    msg.textContent='No saved name';
  }
}

load();

// TODO: Save 클릭 시 localStorage.setItem(KEY, nameEl.value) 하고 msg 갱신
`
};

export default function mission51() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const nameEl=document.querySelector('#name');
  const save=document.querySelector('#save');
  if(!nameEl||!save){ fail('요소 존재', {tab:'html', fix:'#name, #save 필요'}); return results; }
  pass('요소 존재');

  nameEl.value='kim';
  save.click();
  await new Promise(r=>setTimeout(r,30));
  const v=localStorage.getItem('learn.nick');
  if(v!=='kim') fail('저장', {tab:'js', fix:'save click에서 localStorage.setItem(KEY, nameEl.value)'});
  else pass('저장');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 51 — localStorage로 닉네임 저장/불러오기</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-51" title="Mission 51" defaults={DEFAULT} testsJs={testsJs} minutes={20} nextMissionId="mission-52" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Save 클릭 시 저장`}</GuideBox>
          <GuideBox title="2)">{`Load 시 반영`}</GuideBox>
          <GuideBox title="3)">{`저장 여부 메시지`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
