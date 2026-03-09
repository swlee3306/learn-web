/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Tabs</h1>
  <div class="tabs">
    <button class="tab on" data-tab="a">A</button>
    <button class="tab" data-tab="b">B</button>
    <button class="tab" data-tab="c">C</button>
  </div>

  <div class="panel on" data-panel="a">Panel A</div>
  <div class="panel" data-panel="b">Panel B</div>
  <div class="panel" data-panel="c">Panel C</div>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(860px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
.tabs{display:flex;gap:8px;margin-bottom:12px;}
.tab{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;padding:8px 12px;border-radius:12px;cursor:pointer;}
.tab.on{background:rgba(255,212,59,0.18);border-color:rgba(255,212,59,0.25);}
.panel{display:none;border:1px solid rgba(255,255,255,0.18);padding:14px;border-radius:14px;}
.panel.on{display:block;}
`,
  js: `// 목표: 탭 버튼 클릭 시 패널을 전환해.
// 힌트: dataset / querySelectorAll / classList

const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

// TODO: 클릭된 버튼의 data-tab 값을 읽고,
// panels에서 같은 data-panel을 가진 것만 .on을 켜고 나머지는 끄기
`
};

export default function mission26() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(name,details)=>results.push({name,pass:true,details:details||''});
  const fail=(name,details)=>results.push({name,pass:false,details:details||''});

  const tabs=[...document.querySelectorAll('.tab')];
  const panels=[...document.querySelectorAll('.panel')];
  if(tabs.length!==3) fail('탭 버튼 3개', {tab:'html', fix:'class="tab" 버튼 3개를 만들어줘.'}); else pass('탭 버튼 3개');
  if(panels.length!==3) fail('패널 3개', {tab:'html', fix:'class="panel" 패널 3개를 만들어줘.'}); else pass('패널 3개');
  if(tabs.length<3||panels.length<3) return results;

  const clickB=tabs.find(t=>t.dataset.tab==='b')||tabs[1];
  clickB.click();
  await new Promise(r=>setTimeout(r,50));

  const onPanel=[...panels].find(p=>p.classList.contains('on'));
  if(!onPanel) fail('패널 전환', {tab:'js', fix:'클릭하면 해당 패널만 보이게(.on) 만들어줘.'});
  else if(onPanel.dataset.panel!=='b') fail('패널 전환', {tab:'js', fix:'B를 클릭하면 data-panel="b" 패널만 .on이어야 해.'});
  else pass('패널 전환', 'B');

  const onTab=[...tabs].find(t=>t.classList.contains('on'));
  if(!onTab) fail('활성 탭 표시(.on)', {tab:'js', fix:'클릭된 탭 버튼에 on 클래스를 붙여줘.'});
  else if(onTab.dataset.tab!=='b') fail('활성 탭 표시(.on)', {tab:'js', fix:'B를 클릭하면 B 탭만 .on이어야 해.'});
  else pass('활성 탭 표시(.on)', 'B');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 26 — 버튼 3개로 탭 전환(Show/Hide)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-26" title="Mission 26" defaults={DEFAULT} testsJs={testsJs} minutes={16} nextMissionId="mission-27" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`탭 버튼 클릭 시 패널 전환`}</GuideBox>
          <GuideBox title="2)">{`활성 탭에 on 클래스`}</GuideBox>
          <GuideBox title="3)">{`초기 탭은 첫 번째`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
