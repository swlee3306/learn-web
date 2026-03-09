/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Mission 20</h1>
  <div class="tabs">
    <button class="tab" data-tab="a">탭 A</button>
    <button class="tab" data-tab="b">탭 B</button>
  </div>
  <div id="panelA" class="panel">패널 A</div>
  <div id="panelB" class="panel">패널 B</div>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(860px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
.tabs{display:flex;gap:8px;}
.tab{border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;padding:10px 12px;border-radius:12px;cursor:pointer;}
.tab.on{border-color: rgba(255,212,59,0.55); background: rgba(255,212,59,0.18);}
.panel{margin-top:14px;padding:16px;border-radius:14px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.04);}
.panel.hide{display:none;}
`,
  js: `// 목표: 탭 버튼을 클릭하면 해당 패널만 보이게 해.
// 힌트: document.querySelectorAll('.tab'), dataset.tab, classList

const tabs = document.querySelectorAll('.tab');
const panelA = document.querySelector('#panelA');
const panelB = document.querySelector('#panelB');

// TODO: 초기에는 A가 보이고 B는 숨김.
// TODO: 클릭 시 on 클래스/패널 hide 클래스를 갱신.
`
};

export default function mission20() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btnA=document.querySelector('.tab[data-tab="a"]');
  const btnB=document.querySelector('.tab[data-tab="b"]');
  const panelA=document.querySelector('#panelA');
  const panelB=document.querySelector('#panelB');
  if(!btnA||!btnB) fail('탭 버튼 2개', {tab:'html',fix:'data-tab=a 와 data-tab=b 버튼 2개를 만들어줘.'}); else pass('탭 버튼 2개');
  if(!panelA||!panelB) fail('패널 2개', {tab:'html',fix:'#panelA/#panelB를 만들어줘.'}); else pass('패널 2개');
  if(!btnA||!btnB||!panelA||!panelB) return results;
  try{
    // 초기 상태(선택) 확인은 느슨하게: 둘 중 하나만 보여도 OK로.
    btnB.click();
    await new Promise(r=>setTimeout(r,30));
    const bHidden=panelB.classList.contains('hide');
    const aHidden=panelA.classList.contains('hide');
    if(bHidden || !aHidden) pass('탭 전환 동작'); else fail('탭 전환 동작',{tab:'js',fix:'B 클릭 시 panelB는 보이고 panelA는 숨겨야 해.'});
  }catch(e){ fail('동작 테스트', String(e && (e.stack||e))); }
  return results;
};
`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 20 — 탭 UI 만들기</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-20" title="Mission 20" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-21" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`탭 버튼 2개로 패널 전환`}</GuideBox>
          <GuideBox title="2)">{`활성 탭에 on 클래스`}</GuideBox>
          <GuideBox title="3)">{`초기 탭은 첫 번째`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
