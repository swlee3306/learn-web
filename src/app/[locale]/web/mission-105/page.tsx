/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Memo</h1>
  <div class="row">
    <input id="in" placeholder="memo" />
    <button id="add" class="primary">Add</button>
  </div>
  <ul id="list"></ul>
  <p id="msg" class="msg">-</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:8px;}
input{flex:1;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
ul{margin:12px 0 0 18px;line-height:1.9;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
  js: `const input=document.querySelector('#in');
const add=document.querySelector('#add');
const list=document.querySelector('#list');
const msg=document.querySelector('#msg');
const KEY='learn.memos';
let memos=[];

function save(){
  localStorage.setItem(KEY, JSON.stringify(memos));
}

function load(){
  try{
    memos = JSON.parse(localStorage.getItem(KEY) || '[]');
    if(!Array.isArray(memos)) memos=[];
  }catch(e){
    memos=[];
  }
}

function render(){
  list.innerHTML = memos.map(t=>'<li>'+t+'</li>').join('');
  msg.textContent = memos.length + ' memos';
}

load();
render();

// TODO: add 클릭 시 v=input.value.trim()
// v 있으면 memos.push(v); save(); input.value=''; render();
`
};

export default function mission105() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const input=document.querySelector('#in');
  const add=document.querySelector('#add');
  const list=document.querySelector('#list');
  if(!input||!add||!list){ fail('요소 존재', {tab:'html', fix:'#in #add #list 필요'}); return results; }
  pass('요소 존재');

  input.value='hi';
  add.click();
  await new Promise(r=>setTimeout(r,30));
  if(list.querySelectorAll('li').length<1) fail('추가', {tab:'js', fix:'add 클릭 시 memos push + save + render'});
  else pass('추가');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 105 — 간단한 메모 앱(추가 + localStorage 저장)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-105" title="Mission 105" defaults={DEFAULT} testsJs={testsJs} minutes={28} nextMissionId="mission-106" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Add로 메모 추가`}</GuideBox>
          <GuideBox title="2)">{`새로고침 후 유지`}</GuideBox>
          <GuideBox title="3)">{`삭제 버튼(선택)`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
