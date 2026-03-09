/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Filter + Sort</h1>
  <input id="q" placeholder="search" />
  <p id="msg" class="msg">-</p>
  <ul id="list"></ul>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
ul{margin:10px 0 0 18px;line-height:1.9;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
  js: `const q=document.querySelector('#q');
const msg=document.querySelector('#msg');
const list=document.querySelector('#list');
const items=[
  {name:'Apple', price:3},
  {name:'Banana', price:1},
  {name:'Cherry', price:5},
  {name:'Grape', price:2}
];

function render(){
  const s=(q.value||'').trim().toLowerCase();
  const shown = items
    .filter(it => it.name.toLowerCase().includes(s))
    .sort((a,b)=>a.price-b.price);
  list.innerHTML = shown.map(it=>'<li>'+it.name+' $'+it.price+'</li>').join('');
  msg.textContent = shown.length + ' items';
}

render();

// TODO: input 이벤트에서 render() 호출
`
};

export default function mission100() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const q=document.querySelector('#q');
  const list=document.querySelector('#list');
  if(!q||!list){ fail('요소 존재', {tab:'html', fix:'#q #list 필요'}); return results; }
  pass('요소 존재');

  q.value='a'; q.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(list.querySelectorAll('li').length<1) fail('렌더', {tab:'js', fix:'input에서 render 호출'});
  else pass('렌더');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 100 — 간단한 데이터 정렬/필터 조합</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-100" title="Mission 100" defaults={DEFAULT} testsJs={testsJs} minutes={26} nextMissionId="mission-101" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`검색어로 필터`}</GuideBox>
          <GuideBox title="2)">{`가격 오름차순 정렬`}</GuideBox>
          <GuideBox title="3)">{`결과 카운트`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
