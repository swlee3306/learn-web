/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Keyboard select</h1>
  <p class="msg">Use ↑ ↓</p>
  <ul id="list" class="list"></ul>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 8px 0;font-size:28px;}
.msg{opacity:0.85;margin:0 0 12px 0;}
.list{margin:0;padding:0;list-style:none;display:grid;gap:8px;}
.li{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06)}
.li.on{background: rgba(34,197,94,0.18); border-color: rgba(34,197,94,0.35)}
`,
  js: `const list=document.querySelector('#list');
const items=['A','B','C','D'];
let i=0;

function render(){
  list.innerHTML = items.map((t,idx)=>'<li class="li' + (idx===i?' on':'') + '">'+t+'</li>').join('');
}
render();

// TODO: window keydown에서
// - ArrowDown이면 i++ (최대 items.length-1)
// - ArrowUp이면 i-- (최소 0)
// - render()
`
};

export default function mission82() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const list=document.querySelector('#list');
  if(!list){ fail('요소 존재', {tab:'html', fix:'#list 필요'}); return results; }
  pass('요소 존재');

  window.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  const on=[...list.querySelectorAll('.li.on')][0];
  if(!on || (on.textContent||'').trim()!=='B') fail('ArrowDown 이동', {tab:'js', fix:'keydown ArrowDown 처리'});
  else pass('ArrowDown 이동');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 82 — 키보드로 상하 이동(하이라이트)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-82" title="Mission 82" defaults={DEFAULT} testsJs={testsJs} minutes={26} nextMissionId="mission-83" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`ArrowDown/Up로 선택 이동`}</GuideBox>
          <GuideBox title="2)">{`경계 처리`}</GuideBox>
          <GuideBox title="3)">{`선택 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
