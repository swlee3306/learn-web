/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Submit add</h1>
  <form id="f" class="row">
    <input id="in" placeholder="item" />
    <button class="primary" type="submit">Add</button>
  </form>
  <ul id="list"></ul>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:8px;}
input{flex:1;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
ul{margin:12px 0 0 18px;line-height:1.9;}
`,
  js: `const f=document.querySelector('#f');
const input=document.querySelector('#in');
const list=document.querySelector('#list');
let items=[];

function render(){
  list.innerHTML = items.map(t=>'<li>'+t+'</li>').join('');
}
render();

// TODO: f submit 이벤트에서 preventDefault 후
// - v=input.value.trim()
// - v 있으면 items.push(v), input.value='' 그리고 render()
`
};

export default function mission95() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const f=document.querySelector('#f');
  const input=document.querySelector('#in');
  const list=document.querySelector('#list');
  if(!f||!input||!list){ fail('요소 존재', {tab:'html', fix:'#f #in #list 필요'}); return results; }
  pass('요소 존재');

  input.value='x';
  f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
  await new Promise(r=>setTimeout(r,30));
  if(list.querySelectorAll('li').length<1) fail('submit 추가', {tab:'js', fix:'submit에서 preventDefault + items.push + render'});
  else pass('submit 추가');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 95 — 간단한 폼 제출 후 리스트에 추가</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-95" title="Mission 95" defaults={DEFAULT} testsJs={testsJs} minutes={22} nextMissionId="mission-96" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`submit 시 새로고침 방지`}</GuideBox>
          <GuideBox title="2)">{`trim 후 리스트 추가`}</GuideBox>
          <GuideBox title="3)">{`빈 값은 무시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
