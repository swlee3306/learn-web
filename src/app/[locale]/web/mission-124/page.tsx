/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Key log</h1>
  <p class="msg">press keys...</p>
  <ul id="list"></ul>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 8px 0;font-size:28px;}
.msg{opacity:0.85;margin:0 0 12px 0;}
ul{margin:0 0 0 18px;line-height:1.9;}
`,
  js: `const list=document.querySelector('#list');
let keys=[];

function render(){
  list.innerHTML = keys.map(k=>'<li>'+k+'</li>').join('');
}
render();

// TODO: window keydown에서 keys.unshift(e.key) 하고
// keys=keys.slice(0,10) 후 render()
`
};

export default function mission124() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const list=document.querySelector('#list');
  if(!list){ fail('요소 존재', {tab:'html', fix:'#list 필요'}); return results; }
  pass('요소 존재');

  window.dispatchEvent(new KeyboardEvent('keydown',{key:'x',bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(list.querySelectorAll('li').length<1) fail('키 기록', {tab:'js', fix:'keydown에서 keys 업데이트 후 render'});
  else pass('키 기록');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 124 — 간단한 키 입력 기록기(최근 10개)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-124" title="Mission 124" defaults={DEFAULT} testsJs={testsJs} minutes={22} nextMissionId="mission-125" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`키 누르면 기록 추가`}</GuideBox>
          <GuideBox title="2)">{`최근 10개만 유지`}</GuideBox>
          <GuideBox title="3)">{`렌더`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
