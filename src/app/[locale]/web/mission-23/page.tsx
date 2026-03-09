/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Mission 23</h1>
  <button id="open" class="btn">Open modal</button>

  <div id="modal" class="modal hide" role="dialog" aria-modal="true">
    <div class="backdrop" id="backdrop"></div>
    <div class="sheet">
      <h2>모달</h2>
      <p>배경을 클릭하거나 Escape로 닫아봐.</p>
      <button id="close" class="btn">Close</button>
    </div>
  </div>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(560px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
.btn{border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
.modal{position:fixed;inset:0;display:grid;place-items:center;}
.modal.hide{display:none;}
.backdrop{position:absolute;inset:0;background:rgba(0,0,0,0.55);}
.sheet{position:relative;z-index:1;width:min(520px,92vw);border-radius:14px;border:1px solid rgba(255,255,255,0.15);background:#11183a;padding:16px;}
`,
  js: `// 목표: open/close/backdrop/Escape로 모달을 열고 닫아.

const modal = document.querySelector('#modal');
const openBtn = document.querySelector('#open');
const closeBtn = document.querySelector('#close');
const backdrop = document.querySelector('#backdrop');

function open(){
  // TODO
}
function close(){
  // TODO
}

// TODO: 이벤트 연결
`
};

export default function mission23() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const modal=document.querySelector('#modal');
  const openBtn=document.querySelector('#open');
  const closeBtn=document.querySelector('#close');
  const backdrop=document.querySelector('#backdrop');
  if(!modal||!openBtn||!closeBtn||!backdrop){ fail('요소 존재', {tab:'html',fix:'#modal/#open/#close/#backdrop를 만들어줘.'}); return results; }
  pass('요소 존재');
  try{
    openBtn.click();
    await new Promise(r=>setTimeout(r,30));
    if(modal.classList.contains('hide')) fail('Open 동작',{tab:'js',fix:'open()에서 modal.classList.remove("hide") 해.'});
    else pass('Open 동작');
    closeBtn.click();
    await new Promise(r=>setTimeout(r,30));
    if(!modal.classList.contains('hide')) fail('Close 동작',{tab:'js',fix:'close()에서 modal.classList.add("hide") 해.'});
    else pass('Close 동작');
  }catch(e){ fail('동작 테스트', String(e && (e.stack||e))); }
  return results;
};
`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 23 — 모달 열기/닫기</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-23" title="Mission 23" defaults={DEFAULT} testsJs={testsJs} minutes={16} nextMissionId="mission-24" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Open 클릭 시 모달 표시`}</GuideBox>
          <GuideBox title="2)">{`Close/배경 클릭 시 닫힘`}</GuideBox>
          <GuideBox title="3)">{`Escape로 닫힘`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
