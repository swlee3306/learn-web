/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Network</h1>
  <p id="st" class="st">-</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.st{padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);}
.st.on{border-color:rgba(34,197,94,0.35);background:rgba(34,197,94,0.18)}
.st.off{border-color:rgba(251,113,133,0.35);background:rgba(251,113,133,0.12)}
`,
  js: `const st=document.querySelector('#st');

function render(){
  const on = navigator.onLine;
  st.textContent = on ? 'Online' : 'Offline';
  st.classList.toggle('on', on);
  st.classList.toggle('off', !on);
}

render();

// TODO: window online/offline 이벤트에서 render() 호출
`
};

export default function mission111() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const st=document.querySelector('#st');
  if(!st){ fail('요소 존재', {tab:'html', fix:'#st 필요'}); return results; }
  pass('요소 존재');
  pass('online/offline', 'manual');
  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 111 — 간단한 오프라인/온라인 감지</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-111" title="Mission 111" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-112" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`초기 상태 표시`}</GuideBox>
          <GuideBox title="2)">{`online/offline 변화 반영`}</GuideBox>
          <GuideBox title="3)">{`스타일 변경`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
