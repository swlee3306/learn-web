/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Quick Add</h1>
  <input id="inp" placeholder="Enter로 추가" />
  <ul id="out"></ul>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 10px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
ul{margin:12px 0 0 18px;line-height:1.8;}
`,
  js: `const inp = document.querySelector('#inp');
const out = document.querySelector('#out');
const items = [];

function render(){
  out.innerHTML = items.map(x => \`<li>\${x}</li>\`).join('');
}

render();

// TODO: inp에서 keydown 이벤트로 Enter를 처리해서
// items에 추가하고 render() 호출.
`
};

export default function mission29() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});

  const inp=document.querySelector('#inp');
  const out=document.querySelector('#out');
  if(!inp) fail('입력창 (#inp)'); else pass('입력창 (#inp)');
  if(!out) fail('리스트 (#out)'); else pass('리스트 (#out)');
  if(!inp||!out) return results;

  inp.value='hi';
  inp.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  const li=[...out.querySelectorAll('li')].map(x=>x.textContent.trim());
  if(!li.includes('hi')) fail('Enter로 추가', {tab:'js', fix:'keydown에서 key=="Enter"면 items.push(inp.value) 후 render() 해줘.'});
  else pass('Enter로 추가');

  if(inp.value.trim()!=='') fail('추가 후 input 비움', {tab:'js', fix:'추가 후 inp.value=""로 비워줘.'});
  else pass('추가 후 input 비움');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 29 — Enter로 항목 추가(키보드)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-29" title="Mission 29" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-30" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Enter로 리스트에 추가`}</GuideBox>
          <GuideBox title="2)">{`빈 값이면 추가 안 함`}</GuideBox>
          <GuideBox title="3)">{`추가 후 input 비움`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
