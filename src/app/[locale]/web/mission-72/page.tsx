/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Todos</h1>
  <ul id="list" class="list"></ul>
  <p id="msg" class="msg">0 done</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.list{margin:0;padding:0;list-style:none;display:grid;gap:8px;}
.it{display:flex;gap:10px;align-items:center;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06)}
.it.done .t{text-decoration:line-through;opacity:0.7;}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const list=document.querySelector('#list');
const msg=document.querySelector('#msg');
let todos=[{id:1,text:'A',done:false},{id:2,text:'B',done:false}];

function render(){
  list.innerHTML = todos.map(t =>
    '<li class="it' + (t.done?' done':'') + '">' +
      '<input class="c" type="checkbox" data-id="' + t.id + '" ' + (t.done?'checked':'') + ' />' +
      '<span class="t">' + t.text + '</span>' +
    '</li>'
  ).join('');
  const done = todos.filter(t=>t.done).length;
  msg.textContent = done + ' done';
}

render();

// TODO: list change 이벤트에서 .c 체크박스면 해당 todo의 done을 토글 후 render()
`
};

export default function mission72() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const list=document.querySelector('#list');
  const msg=document.querySelector('#msg');
  if(!list||!msg){ fail('요소 존재', {tab:'html', fix:'#list, #msg 필요'}); return results; }
  pass('요소 존재');

  const c=list.querySelector('.c');
  if(!c){ fail('체크박스', {tab:'js', fix:'render에서 checkbox를 생성해줘.'}); return results; }
  c.checked=true; c.dispatchEvent(new Event('change',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!(msg.textContent||'').includes('1')) fail('완료 반영', {tab:'js', fix:'change에서 done 토글 후 render'});
  else pass('완료 반영');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 72 — 투두 완료 체크(완료/미완료 표시)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-72" title="Mission 72" defaults={DEFAULT} testsJs={testsJs} minutes={24} nextMissionId="mission-73" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`체크하면 취소선`}</GuideBox>
          <GuideBox title="2)">{`상태 토글`}</GuideBox>
          <GuideBox title="3)">{`완료 개수 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
