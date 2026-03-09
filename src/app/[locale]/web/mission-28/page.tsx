/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Search</h1>
  <input id="q" placeholder="검색..." />
  <ul id="list"></ul>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 10px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
ul{margin:12px 0 0 18px;line-height:1.8;}
`,
  js: `const items = ['Apple','Banana','Cherry','Durian','Grape','Mango'];
const q = document.querySelector('#q');
const list = document.querySelector('#list');

function render(filtered){
  list.innerHTML = filtered.map(x => \`<li>\${x}</li>\`).join('');
}

render(items);

// TODO: q 입력이 바뀔 때마다 items를 필터링해서 render()
// - 대소문자 무시
// - 빈 문자열이면 전체
`
};

export default function mission28() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});

  const q=document.querySelector('#q');
  const list=document.querySelector('#list');
  if(!q) fail('입력창 존재 (#q)'); else pass('입력창 존재 (#q)');
  if(!list) fail('리스트 존재 (#list)'); else pass('리스트 존재 (#list)');
  if(!q||!list) return results;

  q.value='an'; q.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  const li=[...list.querySelectorAll('li')].map(x=>x.textContent.trim().toLowerCase());
  if(li.length===0) fail('필터 결과 출력', {tab:'js', fix:'input 이벤트에서 render(items.filter(...))를 호출해줘.'});
  else if(!li.every(x=>x.includes('an'))) fail('필터 정확도', {tab:'js', fix:'includes로 검색어 포함 항목만 보여줘.'});
  else pass('필터 정확도', li.join(', '));

  q.value=''; q.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  const all=[...list.querySelectorAll('li')].length;
  if(all < 5) fail('빈값 → 전체', {tab:'js', fix:'q.value가 빈 값이면 전체 items를 render 해줘.'});
  else pass('빈값 → 전체');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 28 — 입력창 필터로 리스트 검색</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-28" title="Mission 28" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-29" />

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
