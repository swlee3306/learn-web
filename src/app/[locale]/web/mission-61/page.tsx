/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Shuffle</h1>
  <button id="sh" class="primary">Shuffle</button>
  <ul id="list"></ul>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
ul{margin:12px 0 0 18px;line-height:1.9;}
`,
  js: `const sh=document.querySelector('#sh');
const list=document.querySelector('#list');
const items=['A','B','C','D','E'];
let cur=[...items];

function render(){
  list.innerHTML = cur.map(x=>'<li>'+x+'</li>').join('');
}
render();

// TODO: Shuffle 클릭 시 cur를 Fisher–Yates로 셔플한 새 배열로 만들고 render()
`
};

export default function mission61() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const sh=document.querySelector('#sh');
  const list=document.querySelector('#list');
  if(!sh||!list){ fail('요소 존재', {tab:'html', fix:'#sh, #list 필요'}); return results; }
  pass('요소 존재');

  const before=[...list.querySelectorAll('li')].map(li=>li.textContent).join('');
  sh.click();
  await new Promise(r=>setTimeout(r,30));
  const after=[...list.querySelectorAll('li')].map(li=>li.textContent).join('');
  if(after===before) fail('셔플 실행', {tab:'js', fix:'클릭 시 배열 순서가 바뀌어야 해(셔플).'});
  else pass('셔플 실행', before+'→'+after);

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 61 — 배열 셔플 버튼(Fisher–Yates)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-61" title="Mission 61" defaults={DEFAULT} testsJs={testsJs} minutes={22} nextMissionId="mission-62" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Shuffle 클릭 시 순서 변경`}</GuideBox>
          <GuideBox title="2)">{`원본 배열 복사`}</GuideBox>
          <GuideBox title="3)">{`렌더 업데이트`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
