/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Enter to add</h1>
  <input id="in" placeholder="type and press Enter" />
  <ul id="list"></ul>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
ul{margin:12px 0 0 18px;line-height:1.9;}
`,
  js: `const input=document.querySelector('#in');
const list=document.querySelector('#list');
const items=[];

function render(){
  list.innerHTML = items.map(t => '<li>' + t + '</li>').join('');
}
render();

// TODO: input keydown에서 Enter면
// - trim한 값이 있으면 items.push
// - input.value='' 하고 render()
`
};

export default function mission52() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const input=document.querySelector('#in');
  const list=document.querySelector('#list');
  if(!input||!list){ fail('요소 존재', {tab:'html', fix:'#in, #list 필요'}); return results; }
  pass('요소 존재');

  input.value='hi';
  input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(list.querySelectorAll('li').length<1) fail('Enter로 추가', {tab:'js', fix:'Enter 키 처리해줘.'});
  else pass('Enter로 추가');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 52 — 키보드 단축키(Enter)로 전송</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-52" title="Mission 52" defaults={DEFAULT} testsJs={testsJs} minutes={16} nextMissionId="mission-53" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Enter 누르면 항목 추가`}</GuideBox>
          <GuideBox title="2)">{`빈 값은 무시`}</GuideBox>
          <GuideBox title="3)">{`입력창 비우기`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
