/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Counter</h1>
  <textarea id="t" rows="5" placeholder="write..."></textarea>
  <p id="count" class="msg">0 / 100 (left 100)</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
textarea{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;resize:vertical;}
.msg{opacity:0.9;margin:10px 0 0 0;}
.msg.warn{color:#fb7185;}
`,
  js: `const t=document.querySelector('#t');
const count=document.querySelector('#count');
const MAX=100;

function render(){
  const n=t.value.length;
  const left=MAX-n;
  count.textContent = n + ' / ' + MAX + ' (left ' + left + ')';
  count.classList.toggle('warn', n>MAX);
}

render();

// TODO: textarea input 이벤트에서 render() 호출
`
};

export default function mission48() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const t=document.querySelector('#t');
  const count=document.querySelector('#count');
  if(!t||!count){ fail('요소 존재', {tab:'html', fix:'#t, #count 필요'}); return results; }
  pass('요소 존재');

  t.value='hello'; t.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!(count.textContent||'').includes('5')) fail('카운트 업데이트', {tab:'js', fix:'input 이벤트에서 render() 호출'});
  else pass('카운트 업데이트');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 48 — textarea 글자 수 카운터(최대 100)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-48" title="Mission 48" defaults={DEFAULT} testsJs={testsJs} minutes={16} nextMissionId="mission-49" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`현재 글자 수 표시`}</GuideBox>
          <GuideBox title="2)">{`100 초과 시 경고 스타일`}</GuideBox>
          <GuideBox title="3)">{`남은 글자 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
