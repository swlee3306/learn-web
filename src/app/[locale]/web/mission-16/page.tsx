/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Mission 16</h1>
  <p class="desc">버튼을 눌러 카드 강조를 켰다/껐다 해봐.</p>
  <div id="card" class="card">
    <b>카드</b> — 강조 토글 대상
  </div>
  <button id="btn" class="btn">강조 켜기</button>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(860px,92vw);}
.h1{margin:0 0 8px 0;font-size:28px;}
.desc{margin:0 0 14px 0;opacity:0.85;}
.card{padding:16px;border-radius:14px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.04);transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease;}
.card.on{border-color: rgba(255,212,59,0.45); box-shadow: 0 0 0 3px rgba(255,212,59,0.14); transform: translateY(-2px);}
.btn{margin-top:14px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
.btn:hover{background:rgba(255,255,255,0.12);}
`,
  js: `// 목표: 버튼(#btn)을 클릭하면 카드(#card)에 .on 클래스를 토글해.
// 힌트: element.classList.toggle('on')

const btn = document.querySelector('#btn');
const card = document.querySelector('#card');

// TODO: 클릭 이벤트를 연결하고, card의 on 상태에 따라 btn.textContent도 바꿔.
`
};

export default function mission16() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(name,details)=>results.push({name,pass:true,details:details||''});
  const fail=(name,details)=>results.push({name,pass:false,details:details||''});
  const btn=document.querySelector('#btn');
  const card=document.querySelector('#card');
  if(!btn) fail('버튼 존재(#btn)',{tab:'html',fix:'id="btn" 버튼을 만들어줘.'}); else pass('버튼 존재(#btn)');
  if(!card) fail('카드 존재(#card)',{tab:'html',fix:'id="card" 요소를 만들어줘.'}); else pass('카드 존재(#card)');
  if(!btn||!card) return results;
  try{
    const before=card.classList.contains('on');
    btn.click();
    await new Promise(r=>setTimeout(r,30));
    const after=card.classList.contains('on');
    if(before===after) fail('클릭 시 .on 토글',{tab:'js',fix:'card.classList.toggle("on")을 클릭 핸들러에 넣어.'});
    else pass('클릭 시 .on 토글', String(before)+'→'+String(after));
    const label=(btn.textContent||'').trim();
    if(!label) fail('버튼 문구 존재',{tab:'js',fix:'btn.textContent를 on/off에 맞게 설정해.'});
    else pass('버튼 문구 존재', label);
  }catch(e){ fail('동작 테스트', String(e && (e.stack||e))); }
  return results;
};
`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 16 — classList로 강조 토글</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-16" title="Mission 16" defaults={DEFAULT} testsJs={testsJs} minutes={14} nextMissionId="mission-17" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`버튼 클릭 시 카드가 강조(on) 상태로 토글`}</GuideBox>
          <GuideBox title="2)">{`ON일 때 버튼 문구 변경`}</GuideBox>
          <GuideBox title="3)">{`초기 상태는 OFF`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
