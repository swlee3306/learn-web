/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Tabs</h1>
  <div class="tabs">
    <button class="tab active" data-tab="a">A</button>
    <button class="tab" data-tab="b">B</button>
  </div>
  <div id="panel" class="panel">Panel A</div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.tabs{display:flex;gap:8px;}
.tab{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
.tab.active{background: rgba(34,197,94,0.18); border-color: rgba(34,197,94,0.35)}
.panel{margin-top:12px;padding:12px;border:1px solid rgba(255,255,255,0.18);border-radius:12px;background:rgba(255,255,255,0.06)}
`,
  js: `const tabs=[...document.querySelectorAll('.tab')];
const panel=document.querySelector('#panel');
let active='a';

function render(){
  tabs.forEach(b => b.classList.toggle('active', b.dataset.tab===active));
  panel.textContent = active==='a' ? 'Panel A' : 'Panel B';
}

render();

// TODO: 각 탭 클릭 시 active를 dataset.tab으로 바꾸고 render() 호출
`
};

export default function mission49() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btnB=document.querySelector('.tab[data-tab="b"]');
  const panel=document.querySelector('#panel');
  if(!btnB||!panel){ fail('요소 존재', {tab:'html', fix:'data-tab="b" 탭과 #panel 필요'}); return results; }
  pass('요소 존재');

  btnB.click();
  await new Promise(r=>setTimeout(r,40));
  if(!(panel.textContent||'').includes('B')) fail('패널 전환', {tab:'js', fix:'click에서 active 변경 후 render()'});
  else pass('패널 전환');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 49 — 간단한 탭 UI(2개) 만들기</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-49" title="Mission 49" defaults={DEFAULT} testsJs={testsJs} minutes={20} nextMissionId="mission-50" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Tab 클릭 시 패널 변경`}</GuideBox>
          <GuideBox title="2)">{`active 스타일`}</GuideBox>
          <GuideBox title="3)">{`초기 탭 설정`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
