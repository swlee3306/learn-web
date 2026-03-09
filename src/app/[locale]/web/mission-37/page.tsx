/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Load more</h1>
  <p id="count" class="msg">0 / 0</p>
  <ul id="list"></ul>
  <button id="more" class="primary">More</button>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 10px 0;font-size:28px;}
.msg{opacity:0.9;margin:0 0 12px 0;}
ul{margin:0 0 12px 18px;line-height:1.9;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
button:disabled{opacity:0.4;cursor:not-allowed;}
`,
  js: `const items = Array.from({length: 10}, (_,i)=>'Item '+(i+1));
const list=document.querySelector('#list');
const more=document.querySelector('#more');
const count=document.querySelector('#count');
let n=0;

function render(){
  const shown = items.slice(0, n);
  list.innerHTML = shown.map(x => '<li>' + x + '</li>').join('');
  count.textContent = shown.length + ' / ' + items.length;
  more.disabled = shown.length >= items.length;
}

render();

// TODO: More 클릭 시 n을 3 증가시키고 render() 호출 (최대 items.length)
`
};

export default function mission37() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const more=document.querySelector('#more');
  const list=document.querySelector('#list');
  if(!more||!list){ fail('요소 존재', {tab:'html', fix:'#more, #list 필요'}); return results; }
  pass('요소 존재');

  const before=list.querySelectorAll('li').length;
  more.click();
  await new Promise(r=>setTimeout(r,40));
  const after=list.querySelectorAll('li').length;
  if(after <= before) fail('3개씩 추가 로드', {tab:'js', fix:'More 클릭 시 3개씩 늘려줘.'});
  else pass('3개씩 추가 로드', String(before)+'→'+String(after));

  // click until disabled
  for(let i=0;i<10;i++){ more.click(); await new Promise(r=>setTimeout(r,10)); }
  await new Promise(r=>setTimeout(r,40));
  if(!more.disabled) fail('끝나면 disabled', {tab:'js', fix:'전부 표시되면 more.disabled=true'});
  else pass('끝나면 disabled');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 37 — 더보기 버튼으로 리스트 3개씩 추가 로드</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-37" title="Mission 37" defaults={DEFAULT} testsJs={testsJs} minutes={20} nextMissionId="mission-38" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`More 클릭 시 3개씩 추가`}</GuideBox>
          <GuideBox title="2)">{`끝까지 가면 버튼 disabled`}</GuideBox>
          <GuideBox title="3)">{`현재 개수 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
