/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Map lookup</h1>
  <input id="q" placeholder="dog/cat" />
  <p id="out" class="msg">-</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
  js: `const q=document.querySelector('#q');
const out=document.querySelector('#out');
const m=new Map([
  ['dog','멍멍'],
  ['cat','야옹'],
  ['cow','음메']
]);

function render(){
  const key=(q.value||'').trim().toLowerCase();
  if(!key){ out.textContent='-'; return; }
  const v=m.get(key);
  out.textContent = v ? v : 'not found';
}

render();

// TODO: input 이벤트에서 render() 호출
`
};

export default function mission85() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const q=document.querySelector('#q');
  const out=document.querySelector('#out');
  if(!q||!out){ fail('요소 존재', {tab:'html', fix:'#q, #out 필요'}); return results; }
  pass('요소 존재');

  q.value='DOG'; q.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!(out.textContent||'').includes('멍멍')) fail('Map 조회', {tab:'js', fix:'input에서 render() 호출 + toLowerCase 처리'});
  else pass('Map 조회');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 85 — 간단한 별칭 맵(Map)으로 값 찾기</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-85" title="Mission 85" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-86" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`키 입력하면 값 표시`}</GuideBox>
          <GuideBox title="2)">{`없는 키면 안내`}</GuideBox>
          <GuideBox title="3)">{`대소문자 무시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
