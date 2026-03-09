/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Sort by</h1>
  <select id="by">
    <option value="name" selected>name</option>
    <option value="age">age</option>
  </select>
  <p id="msg" class="msg">by: name</p>
  <ul id="list"></ul>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
select{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;}
ul{margin:10px 0 0 18px;line-height:1.9;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
  js: `const by=document.querySelector('#by');
const msg=document.querySelector('#msg');
const list=document.querySelector('#list');
const people=[{name:'Kim',age:22},{name:'Park',age:19},{name:'Lee',age:30}];

function render(){
  const key=by.value;
  const a=[...people].sort((x,y)=>{
    if(key==='age') return x.age-y.age;
    return String(x.name).localeCompare(String(y.name));
  });
  list.innerHTML = a.map(p=>'<li>'+p.name+' ('+p.age+')</li>').join('');
  msg.textContent='by: '+key;
}

render();

// TODO: select change 이벤트에서 render() 호출
`
};

export default function mission73() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const by=document.querySelector('#by');
  const list=document.querySelector('#list');
  if(!by||!list){ fail('요소 존재', {tab:'html', fix:'#by, #list 필요'}); return results; }
  pass('요소 존재');

  by.value='age'; by.dispatchEvent(new Event('change',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  const first=(list.querySelector('li')?.textContent)||'';
  if(!first.includes('(19)')) fail('age 정렬', {tab:'js', fix:'change에서 render 호출 + age 정렬'});
  else pass('age 정렬');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 73 — 드롭다운으로 정렬 기준 선택</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-73" title="Mission 73" defaults={DEFAULT} testsJs={testsJs} minutes={22} nextMissionId="mission-74" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`이름/나이 정렬`}</GuideBox>
          <GuideBox title="2)">{`오름차순`}</GuideBox>
          <GuideBox title="3)">{`선택값 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
