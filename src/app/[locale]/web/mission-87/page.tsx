/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Select one</h1>
  <ul id="list" class="list"></ul>
  <p id="msg" class="msg">selected: -</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.list{margin:0;padding:0;list-style:none;display:grid;gap:8px;}
.li{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);cursor:pointer;}
.li.on{background: rgba(34,197,94,0.18); border-color: rgba(34,197,94,0.35)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const list=document.querySelector('#list');
const msg=document.querySelector('#msg');
const items=[{id:'a',t:'Alpha'},{id:'b',t:'Beta'},{id:'c',t:'Gamma'}];
let selected=null;

function render(){
  list.innerHTML = items.map(it =>
    '<li class="li' + (it.id===selected?' on':'') + '" data-id="' + it.id + '">' + it.t + '</li>'
  ).join('');
  msg.textContent = 'selected: ' + (selected || '-');
}
render();

// TODO: list 클릭 이벤트에서 data-id를 읽고
// - 같은 id면 selected=null
// - 다르면 selected=id
// - render()
`
};

export default function mission87() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const list=document.querySelector('#list');
  const msg=document.querySelector('#msg');
  if(!list||!msg){ fail('요소 존재', {tab:'html', fix:'#list, #msg 필요'}); return results; }
  pass('요소 존재');

  const first=list.querySelector('.li');
  first.click();
  await new Promise(r=>setTimeout(r,30));
  if((msg.textContent||'').includes('-')) fail('선택 반영', {tab:'js', fix:'클릭 시 selected를 업데이트해줘.'});
  else pass('선택 반영');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 87 — 간단한 별도 상태(선택/비선택) 리스트</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-87" title="Mission 87" defaults={DEFAULT} testsJs={testsJs} minutes={20} nextMissionId="mission-88" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`아이템 클릭 시 선택`}</GuideBox>
          <GuideBox title="2)">{`다시 클릭 시 해제`}</GuideBox>
          <GuideBox title="3)">{`선택값 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
