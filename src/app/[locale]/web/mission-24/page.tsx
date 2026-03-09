/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Mission 24</h1>
  <input id="todo" class="input" placeholder="할 일 입력 후 Enter" />
  <ul id="list" class="list"></ul>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(560px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
.input{width:100%;padding:12px 14px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.04);color:white;}
.list{margin:12px 0 0 0;padding:0;list-style:none;display:grid;gap:8px;}
.list li{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.04);}
`,
  js: `// 목표: Enter를 누르면 input 값을 list에 추가해.

const input = document.querySelector('#todo');
const list = document.querySelector('#list');
const items = [];

function render(){
  list.innerHTML = items.map(x => \`<li>\${x}</li>\`).join('');
}

// TODO: input.addEventListener('keydown', (e) => { if(e.key==='Enter') ... })
render();
`
};

export default function mission24() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const input=document.querySelector('#todo');
  const list=document.querySelector('#list');
  if(!input||!list){ fail('요소 존재',{tab:'html',fix:'#todo input과 #list ul을 만들어줘.'}); return results; }
  pass('요소 존재');
  try{
    input.value='abc';
    input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
    await new Promise(r=>setTimeout(r,30));
    const lis=list.querySelectorAll('li');
    if(lis.length===0) fail('Enter로 추가',{tab:'js',fix:'Enter일 때 items.push 후 render() 해.'});
    else pass('Enter로 추가');
  }catch(e){ fail('동작 테스트', String(e && (e.stack||e))); }
  return results;
};
`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 24 — 키보드 단축키(Enter로 추가)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-24" title="Mission 24" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-25" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Enter로 항목 추가`}</GuideBox>
          <GuideBox title="2)">{`빈 값이면 추가 안 함`}</GuideBox>
          <GuideBox title="3)">{`추가 후 input 비움`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
