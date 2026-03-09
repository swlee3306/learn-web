/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Table sort</h1>
  <p id="msg" class="msg">by: name</p>
  <table id="t" class="t"></table>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 8px 0;font-size:28px;}
.msg{opacity:0.85;margin:0 0 10px 0;}
.t{width:100%;border-collapse:collapse;}
th,td{border:1px solid rgba(255,255,255,0.18);padding:8px 10px;}
th{cursor:pointer;background:rgba(255,255,255,0.06)}
`,
  js: `const msg=document.querySelector('#msg');
const t=document.querySelector('#t');
const rows=[
  {name:'Kim', score:80},
  {name:'Lee', score:95},
  {name:'Park', score:70}
];
let by='name';

function render(){
  const a=[...rows].sort((x,y)=>{
    if(by==='score') return x.score-y.score;
    return String(x.name).localeCompare(String(y.name));
  });
  msg.textContent='by: '+by;
  t.innerHTML =
    '<thead><tr>'+
      '<th data-by="name">name</th>'+
      '<th data-by="score">score</th>'+
    '</tr></thead>'+
    '<tbody>'+
      a.map(r=>'<tr><td>'+r.name+'</td><td>'+r.score+'</td></tr>').join('')+
    '</tbody>';
}

render();

// TODO: table click에서 th면 by를 dataset.by로 바꾸고 render()
`
};

export default function mission120() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const t=document.querySelector('#t');
  if(!t){ fail('요소 존재', {tab:'html', fix:'#t 필요'}); return results; }
  pass('요소 존재');

  const scoreTh=t.querySelector('th[data-by="score"]');
  if(!scoreTh){ fail('헤더', {tab:'js', fix:'render에서 score 헤더 th 생성'}); return results; }
  scoreTh.click();
  await new Promise(r=>setTimeout(r,30));
  const firstScore=Number(t.querySelector('tbody tr td:nth-child(2)')?.textContent||'');
  if(firstScore!==70) fail('score 정렬', {tab:'js', fix:'score 클릭 시 by=score로 바꾸고 sort'});
  else pass('score 정렬');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 120 — 간단한 정렬 가능한 테이블(클릭 헤더)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-120" title="Mission 120" defaults={DEFAULT} testsJs={testsJs} minutes={30} nextMissionId="mission-121" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`name/score 정렬`}</GuideBox>
          <GuideBox title="2)">{`오름차순`}</GuideBox>
          <GuideBox title="3)">{`현재 정렬 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
