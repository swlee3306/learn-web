/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Highlight</h1>
  <input id="q" placeholder="search" />
  <p id="t" class="t"></p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.t{opacity:0.95;margin:12px 0 0 0;line-height:1.7;}
mark{background:rgba(255,212,59,0.35);color:#fff;padding:0 2px;border-radius:4px;}
`,
  js: `const q=document.querySelector('#q');
const t=document.querySelector('#t');
const text='The quick brown fox jumps over the lazy dog.';

t.textContent=text;

function esc(s){
  // 템플릿 리터럴과 충돌하는 패턴을 피하기 위해 간단 escape 사용
  return s.replace(/[.*+?^$()|[\]\]/g,'\$&');
}

function render(){
  const s=(q.value||'').trim();
  if(!s){ t.textContent=text; return; }
  const re=new RegExp(esc(s), 'gi');
  t.innerHTML = text.replace(re, m => '<mark>' + m + '</mark>');
}

// TODO: input 이벤트에서 render() 호출
`
};

export default function mission94() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const q=document.querySelector('#q');
  const t=document.querySelector('#t');
  if(!q||!t){ fail('요소 존재', {tab:'html', fix:'#q #t 필요'}); return results; }
  pass('요소 존재');

  q.value='fox'; q.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!t.innerHTML.includes('<mark>')) fail('하이라이트', {tab:'js', fix:'input에서 render 호출 + mark로 감싸기'});
  else pass('하이라이트');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 94 — 간단한 키워드 하이라이트(검색)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-94" title="Mission 94" defaults={DEFAULT} testsJs={testsJs} minutes={26} nextMissionId="mission-95" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`검색어 입력 시 하이라이트`}</GuideBox>
          <GuideBox title="2)">{`대소문자 무시`}</GuideBox>
          <GuideBox title="3)">{`빈 검색어면 원문`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
