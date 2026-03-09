/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Sort</h1>
  <div class="row">
    <button id="asc" class="primary">ASC</button>
    <button id="desc">DESC</button>
  </div>
  <p id="mode" class="msg">mode: asc</p>
  <ul id="list"></ul>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);}
.h1{margin:0 0 10px 0;font-size:28px;}
.row{display:flex;gap:8px;margin-bottom:10px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:0 0 10px 0;}
ul{margin:0 0 0 18px;line-height:1.9;}
`,
  js: `const nums=[7,1,9,3,5];
const list=document.querySelector('#list');
const mode=document.querySelector('#mode');
const asc=document.querySelector('#asc');
const desc=document.querySelector('#desc');
let dir='asc';

function render(){
  const a=[...nums].sort((x,y)=>dir==='asc'? x-y : y-x);
  list.innerHTML = a.map(n => '<li>' + n + '</li>').join('');
  mode.textContent='mode: '+dir;
}

render();

// TODO: 버튼 클릭 시 dir 바꾸고 render() 호출
`
};

export default function mission40() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const asc=document.querySelector('#asc');
  const desc=document.querySelector('#desc');
  const list=document.querySelector('#list');
  if(!asc||!desc||!list){ fail('요소 존재', {tab:'html', fix:'#asc #desc #list 필요'}); return results; }
  pass('요소 존재');
  desc.click();
  await new Promise(r=>setTimeout(r,40));
  const vals=[...list.querySelectorAll('li')].map(x=>Number(x.textContent.trim()));
  if(vals.length<3) fail('리스트 렌더', {tab:'js', fix:'render()에서 li를 만들어줘.'});
  else if(!(vals[0] >= vals[1])) fail('DESC 정렬', {tab:'js', fix:'desc 클릭 시 내림차순'});
  else pass('DESC 정렬', vals.join(','));
  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 40 — 간단한 정렬 버튼(오름/내림)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-40" title="Mission 40" defaults={DEFAULT} testsJs={testsJs} minutes={20} nextMissionId="mission-41" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`오름차순 정렬`}</GuideBox>
          <GuideBox title="2)">{`내림차순 정렬`}</GuideBox>
          <GuideBox title="3)">{`현재 정렬 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
