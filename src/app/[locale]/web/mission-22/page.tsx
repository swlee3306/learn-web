/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Mission 22</h1>
  <input id="q" class="input" placeholder="검색..." />
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
  js: `// 목표: q 입력값으로 items를 필터링해 list에 렌더해.

const items = ['Kubernetes', 'Docker', 'TypeScript', 'Next.js', 'Python'];
const q = document.querySelector('#q');
const list = document.querySelector('#list');

function render(){
  // TODO: list.innerHTML = '' 후, 조건에 맞는 li를 다시 채워.
}

// TODO: input 이벤트로 render 호출
render();
`
};

export default function mission22() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const q=document.querySelector('#q');
  const list=document.querySelector('#list');
  if(!q||!list){ fail('요소 존재', {tab:'html',fix:'#q input과 #list ul을 만들어줘.'}); return results; }
  pass('요소 존재');
  try{
    q.value='py';
    q.dispatchEvent(new Event('input',{bubbles:true}));
    await new Promise(r=>setTimeout(r,30));
    const texts=Array.from(list.querySelectorAll('li')).map(li=>(li.textContent||'').toLowerCase());
    if(texts.length===0) fail('필터 결과 표시',{tab:'js',fix:'검색어에 맞는 항목을 렌더해.'});
    else if(!texts.some(t=>t.includes('python'))) fail('Python 포함',{tab:'js',fix:'대소문자 무시하고 includes로 필터해.'});
    else pass('필터 결과 표시', texts.join(','));
  }catch(e){ fail('동작 테스트', String(e && (e.stack||e))); }
  return results;
};
`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 22 — 검색어로 리스트 필터</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-22" title="Mission 22" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-23" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`검색어 입력 시 포함 항목만 표시`}</GuideBox>
          <GuideBox title="2)">{`빈 값이면 전체 표시`}</GuideBox>
          <GuideBox title="3)">{`대소문자 무시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
