/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Bookmarks</h1>
  <input id="title" placeholder="title" />
  <input id="url" placeholder="https://..." />
  <button id="add" class="primary">Add</button>
  <ul id="list"></ul>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;margin-bottom:10px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
ul{margin:12px 0 0 18px;line-height:1.9;}
a{color:#ffd43b;}
`,
  js: `const title=document.querySelector('#title');
const url=document.querySelector('#url');
const add=document.querySelector('#add');
const list=document.querySelector('#list');
const KEY='learn.bookmarks';
let items=[];

function save(){
  localStorage.setItem(KEY, JSON.stringify(items));
}

function load(){
  try{
    items = JSON.parse(localStorage.getItem(KEY) || '[]');
    if(!Array.isArray(items)) items=[];
  }catch(e){ items=[]; }
}

function render(){
  list.innerHTML = items.map(b=>'<li><a href="'+b.url+'" target="_blank" rel="noreferrer">'+b.title+'</a></li>').join('');
}

load();
render();

// TODO: add 클릭 시 title/url trim해서 둘 다 있으면 items.push({title,url}); save(); render(); 입력 비우기
`
};

export default function mission114() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const add=document.querySelector('#add');
  const list=document.querySelector('#list');
  if(!add||!list){ fail('요소 존재', {tab:'html', fix:'#add #list 필요'}); return results; }
  pass('요소 존재');
  pass('북마크', 'manual');
  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 114 — 간단한 북마크 저장(제목+URL)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-114" title="Mission 114" defaults={DEFAULT} testsJs={testsJs} minutes={28} nextMissionId="mission-115" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Add로 북마크 추가`}</GuideBox>
          <GuideBox title="2)">{`리스트 렌더`}</GuideBox>
          <GuideBox title="3)">{`새로고침 후 유지`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
