/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Remove</h1>
  <ul id="list" class="list"></ul>
  <p id="msg" class="msg">-</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.list{margin:0;padding:0;list-style:none;display:grid;gap:8px;}
.item{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06)}
.x{border:none;background:transparent;color:#ffd43b;font-size:18px;cursor:pointer;}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const list=document.querySelector('#list');
const msg=document.querySelector('#msg');
let items=[{id:1,text:'A'},{id:2,text:'B'},{id:3,text:'C'}];

function render(){
  list.innerHTML = items.map(it =>
    '<li class="item">' +
      '<span>' + it.text + '</span>' +
      '<button class="x" data-id="' + it.id + '">×</button>' +
    '</li>'
  ).join('');
  msg.textContent = items.length ? (items.length + ' items') : 'empty';
}

render();

// TODO: list 클릭 이벤트에서 .x 버튼이면 dataset.id로 items를 filter해서 제거 후 render()
`
};

export default function mission68() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const list=document.querySelector('#list');
  if(!list){ fail('요소 존재', {tab:'html', fix:'#list 필요'}); return results; }
  pass('요소 존재');

  const before=list.querySelectorAll('li').length;
  const x=list.querySelector('.x');
  if(!x){ fail('삭제 버튼', {tab:'js', fix:'render에서 .x 버튼을 만들어줘.'}); return results; }
  x.click();
  await new Promise(r=>setTimeout(r,30));
  const after=list.querySelectorAll('li').length;
  if(after>=before) fail('삭제 동작', {tab:'js', fix:'click에서 filter로 제거 후 render'});
  else pass('삭제 동작', String(before)+'→'+String(after));

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 68 — 리스트에서 항목 삭제(× 버튼)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-68" title="Mission 68" defaults={DEFAULT} testsJs={testsJs} minutes={22} nextMissionId="mission-69" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`× 클릭 시 해당 항목 삭제`}</GuideBox>
          <GuideBox title="2)">{`삭제 후 렌더`}</GuideBox>
          <GuideBox title="3)">{`빈 리스트 처리`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
