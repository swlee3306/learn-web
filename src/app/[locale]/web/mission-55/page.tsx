/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Filter</h1>
  <input id="q" placeholder="search" />
  <p id="msg" class="msg">-</p>
  <ul id="list"></ul>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.msg{opacity:0.9;margin:10px 0 0 0;}
ul{margin:10px 0 0 18px;line-height:1.9;}
`,
  js: `const q=document.querySelector('#q');
const msg=document.querySelector('#msg');
const list=document.querySelector('#list');
const items=['Apple','Banana','Cherry','Grape','Orange'];

function render(){
  const s=(q.value||'').trim().toLowerCase();
  const shown = items.filter(x => x.toLowerCase().includes(s));
  list.innerHTML = shown.map(x => '<li>' + x + '</li>').join('');
  msg.textContent = shown.length ? (shown.length + ' found') : 'no match';
}

render();

// TODO: input 이벤트에서 render() 호출
`
};

export default function mission55() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const q=document.querySelector('#q');
  const list=document.querySelector('#list');
  if(!q||!list){ fail('요소 존재', {tab:'html', fix:'#q, #list 필요'}); return results; }
  pass('요소 존재');

  q.value='ap'; q.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(list.querySelectorAll('li').length<1) fail('필터링', {tab:'js', fix:'input에서 render() 호출해줘.'});
  else pass('필터링');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 55 — 간단한 검색 필터(리스트)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-55" title="Mission 55" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-56" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`입력 시 실시간 필터`}</GuideBox>
          <GuideBox title="2)">{`매치 없으면 안내`}</GuideBox>
          <GuideBox title="3)">{`대소문자 무시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
