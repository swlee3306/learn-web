/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Search (debounce)</h1>
  <input id="q" placeholder="type..." />
  <p id="msg" class="msg">-</p>
  <ul id="list"></ul>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.msg{opacity:0.9;margin:10px 0 0 0;}
ul{margin:10px 0 0 18px;line-height:1.9;}
`,
  js: `const q=document.querySelector('#q');
const msg=document.querySelector('#msg');
const list=document.querySelector('#list');
let t=null;

async function run(){
  const s=(q.value||'').trim();
  if(!s){ list.innerHTML=''; msg.textContent='-'; return; }
  msg.textContent='Loading...';
  try{
    const res=await fetch('https://jsonplaceholder.typicode.com/posts?title_like='+encodeURIComponent(s));
    const data=await res.json();
    list.innerHTML = data.slice(0,5).map(p=>'<li>'+p.title+'</li>').join('');
    msg.textContent='OK';
  }catch(e){
    msg.textContent='Error';
  }
}

// TODO: input 이벤트에서 clearTimeout(t); t=setTimeout(run,300)
`
};

export default function mission122() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const q=document.querySelector('#q');
  const msg=document.querySelector('#msg');
  if(!q||!msg){ fail('요소 존재', {tab:'html', fix:'#q #msg 필요'}); return results; }
  pass('요소 존재');

  q.value='a'; q.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,50));
  if((msg.textContent||'').includes('Loading')) fail('즉시 실행 금지', {tab:'js', fix:'debounce로 300ms 후 run 호출'});
  else pass('즉시 실행 금지');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 122 — 간단한 debounce + fetch (검색)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-122" title="Mission 122" defaults={DEFAULT} testsJs={testsJs} minutes={30} nextMissionId="mission-123" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`300ms debounce`}</GuideBox>
          <GuideBox title="2)">{`로딩 표시`}</GuideBox>
          <GuideBox title="3)">{`결과 표시(제목)`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
