/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Tags</h1>
  <div class="row">
    <input id="in" placeholder="tag" />
    <button id="add" class="primary">Add</button>
  </div>
  <div id="tags" class="tags"></div>
  <p id="msg" class="msg">0 tags</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:8px;}
input{flex:1;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.tags{margin-top:12px;display:flex;flex-wrap:wrap;gap:8px;}
.tag{padding:8px 10px;border-radius:999px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);cursor:pointer;}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const input=document.querySelector('#in');
const add=document.querySelector('#add');
const tagsEl=document.querySelector('#tags');
const msg=document.querySelector('#msg');
let tags=[];

function render(){
  tagsEl.innerHTML = tags.map(t=>'<span class="tag" data-t="'+t+'">'+t+'</span>').join('');
  msg.textContent = tags.length + ' tags';
}
render();

// TODO:
// - Add 클릭 시 input.value trim해서 비어있지 않고 tags에 없으면 push
// - input 비우고 render
// - tagsEl 클릭 시 .tag면 data-t로 tags에서 제거 후 render
`
};

export default function mission88() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const input=document.querySelector('#in');
  const add=document.querySelector('#add');
  const tagsEl=document.querySelector('#tags');
  if(!input||!add||!tagsEl){ fail('요소 존재', {tab:'html', fix:'#in #add #tags 필요'}); return results; }
  pass('요소 존재');

  input.value='hi';
  add.click();
  await new Promise(r=>setTimeout(r,30));
  if(tagsEl.querySelectorAll('.tag').length<1) fail('태그 추가', {tab:'js', fix:'Add 클릭 시 태그를 추가해줘.'});
  else pass('태그 추가');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 88 — 입력값을 태그로 추가/삭제</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-88" title="Mission 88" defaults={DEFAULT} testsJs={testsJs} minutes={26} nextMissionId="mission-89" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Add로 태그 추가`}</GuideBox>
          <GuideBox title="2)">{`중복은 무시`}</GuideBox>
          <GuideBox title="3)">{`태그 클릭 시 삭제`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
