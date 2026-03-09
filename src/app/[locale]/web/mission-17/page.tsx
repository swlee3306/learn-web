/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Mission 17</h1>
  <p id="picked" class="picked">선택: (없음)</p>
  <ul id="list" class="list">
    <li data-item="아메리카노">아메리카노</li>
    <li data-item="라떼">라떼</li>
    <li data-item="말차">말차</li>
  </ul>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(860px,92vw);}
.h1{margin:0 0 8px 0;font-size:28px;}
.picked{margin:0 0 12px 0;opacity:0.9;}
.list{list-style:none;padding:0;margin:0;display:grid;gap:8px;}
.list li{padding:12px 14px;border-radius:12px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.04);cursor:pointer;}
.list li:hover{background:rgba(255,255,255,0.08);}
.list li.on{border-color: rgba(124,255,107,0.55); box-shadow:0 0 0 3px rgba(124,255,107,0.12);}
`,
  js: `// 목표: #list에 클릭 이벤트 1개만 달아서(이벤트 위임) li를 선택(on)해.
// 선택된 항목의 data-item 값을 #picked에 표시해.

const list = document.querySelector('#list');
const picked = document.querySelector('#picked');

// TODO: list.addEventListener('click', (e) => { ... })
`
};

export default function mission17() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(name,details)=>results.push({name,pass:true,details:details||''});
  const fail=(name,details)=>results.push({name,pass:false,details:details||''});
  const list=document.querySelector('#list');
  const picked=document.querySelector('#picked');
  const items=list?Array.from(list.querySelectorAll('li')):[];
  if(!list) fail('리스트 존재(#list)',{tab:'html',fix:'id="list"인 ul을 만들어줘.'}); else pass('리스트 존재(#list)');
  if(!picked) fail('표시 영역(#picked)',{tab:'html',fix:'id="picked"인 요소를 만들어줘.'}); else pass('표시 영역(#picked)');
  if(items.length<2) fail('li 2개 이상',{tab:'html',fix:'li를 2개 이상 넣어줘.'}); else pass('li 2개 이상');
  if(!list||!picked||items.length<2) return results;
  try{
    items[0].click();
    await new Promise(r=>setTimeout(r,30));
    const t1=(picked.textContent||'').trim();
    if(!t1.includes(items[0].dataset.item||'')) fail('클릭 시 선택 표시',{tab:'js',fix:'e.target.closest("li")로 li를 찾고, picked.textContent를 갱신해.'});
    else pass('클릭 시 선택 표시', t1);
    items[1].click();
    await new Promise(r=>setTimeout(r,30));
    const onCount=items.filter(li=>li.classList.contains('on')).length;
    if(onCount!==1) fail('선택은 1개만',{tab:'js',fix:'선택 전 기존 .on을 제거하고 새 항목에만 .on을 붙여.'});
    else pass('선택은 1개만');
  }catch(e){ fail('동작 테스트', String(e && (e.stack||e))); }
  return results;
};
`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 17 — 리스트 아이템 클릭(이벤트 위임)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-17" title="Mission 17" defaults={DEFAULT} testsJs={testsJs} minutes={16} nextMissionId="mission-18" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`리스트에서 항목 클릭 시 선택 표시`}</GuideBox>
          <GuideBox title="2)">{`선택된 항목 텍스트를 상단에 표시`}</GuideBox>
          <GuideBox title="3)">{`다른 항목 클릭 시 선택이 이동`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
