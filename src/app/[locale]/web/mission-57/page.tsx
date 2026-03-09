/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">FAQ</h1>
  <div id="faq" class="faq">
    <button class="q" data-id="1">Q1. what?</button>
    <div class="a" data-id="1">A1. ...</div>
    <button class="q" data-id="2">Q2. why?</button>
    <div class="a" data-id="2">A2. ...</div>
  </div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.q{width:100%;text-align:left;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);color:#fff;padding:12px 14px;border-radius:12px;cursor:pointer;margin:10px 0 6px 0;}
.a{display:none;opacity:0.9;padding:0 6px 6px 6px;}
.a.on{display:block;}
`,
  js: `const faq=document.querySelector('#faq');
const answers=[...document.querySelectorAll('.a')];
let openId=null;

function render(){
  answers.forEach(a => a.classList.toggle('on', a.dataset.id===openId));
}
render();

// TODO: faq 클릭 이벤트에서 .q 버튼이면
// - openId가 같으면 null로(닫기)
// - 다르면 해당 id로(열기)
// - render() 호출
`
};

export default function mission57() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const q1=document.querySelector('.q[data-id="1"]');
  const a1=document.querySelector('.a[data-id="1"]');
  if(!q1||!a1){ fail('요소 존재', {tab:'html', fix:'data-id="1" q/a 필요'}); return results; }
  pass('요소 존재');

  q1.click();
  await new Promise(r=>setTimeout(r,30));
  if(!a1.classList.contains('on')) fail('클릭 시 열기', {tab:'js', fix:'클릭 시 openId 설정 후 render()'});
  else pass('클릭 시 열기');

  q1.click();
  await new Promise(r=>setTimeout(r,30));
  if(a1.classList.contains('on')) fail('다시 클릭 시 닫기', {tab:'js', fix:'같은 id면 openId=null'});
  else pass('다시 클릭 시 닫기');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 57 — 아코디언(FAQ) 열고 닫기</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-57" title="Mission 57" defaults={DEFAULT} testsJs={testsJs} minutes={22} nextMissionId="mission-58" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`질문 클릭 시 답변 토글`}</GuideBox>
          <GuideBox title="2)">{`다른 항목 클릭 시 이전 닫기`}</GuideBox>
          <GuideBox title="3)">{`초기 모두 닫힘`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
