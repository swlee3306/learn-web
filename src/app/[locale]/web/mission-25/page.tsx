/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Mission 25</h1>
  <div class="row">
    <button id="export" class="btn">Export</button>
    <button id="import" class="btn">Import</button>
  </div>
  <textarea id="box" class="box" rows="6" placeholder="여기에 JSON이 들어갑니다"></textarea>
  <p id="msg" class="msg"></p>
  <ul id="list" class="list"></ul>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(700px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:10px;flex-wrap:wrap;}
.btn{border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
.box{margin-top:12px;width:100%;padding:12px 14px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.04);color:white;font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;}
.msg{min-height:24px;margin:10px 0 0 0;}
.msg.err{color:#ff6b6b;}
.list{margin:12px 0 0 0;padding:0;list-style:none;display:grid;gap:8px;}
.list li{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.04);}
`,
  js: `// 목표: Export/Import 버튼으로 items를 JSON으로 내보내고 불러와.

const items = ['alpha', 'beta'];
const list = document.querySelector('#list');
const box = document.querySelector('#box');
const msg = document.querySelector('#msg');
const exportBtn = document.querySelector('#export');
const importBtn = document.querySelector('#import');

function render(){
  list.innerHTML = items.map(x=>\`<li>\${x}</li>\`).join('');
}

// TODO: exportBtn 클릭 시 box.value = JSON.stringify(items, null, 2)
// TODO: importBtn 클릭 시 box.value를 JSON.parse해서 items를 갱신하고 render()
// TODO: JSON.parse 실패하면 msg에 에러 표시

render();
`
};

export default function mission25() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const box=document.querySelector('#box');
  const exportBtn=document.querySelector('#export');
  const importBtn=document.querySelector('#import');
  const list=document.querySelector('#list');
  if(!box||!exportBtn||!importBtn||!list){ fail('요소 존재',{tab:'html',fix:'#box/#export/#import/#list를 만들어줘.'}); return results; }
  pass('요소 존재');
  try{
    exportBtn.click();
    await new Promise(r=>setTimeout(r,30));
    const v=(box.value||'').trim();
    if(!v.startsWith('[')) fail('Export JSON 출력',{tab:'js',fix:'export 클릭 시 box.value에 JSON.stringify(items)를 넣어.'});
    else pass('Export JSON 출력');

    box.value = JSON.stringify(['x','y','z']);
    importBtn.click();
    await new Promise(r=>setTimeout(r,30));
    const count=list.querySelectorAll('li').length;
    if(count<3) fail('Import 반영',{tab:'js',fix:'import 클릭 시 JSON.parse로 items 갱신 후 render() 해.'});
    else pass('Import 반영');
  }catch(e){ fail('동작 테스트', String(e && (e.stack||e))); }
  return results;
};
`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 25 — JSON 저장/불러오기(Export/Import)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-25" title="Mission 25" defaults={DEFAULT} testsJs={testsJs} minutes={24} nextMissionId="mission-26" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Export로 현재 items를 JSON으로 출력`}</GuideBox>
          <GuideBox title="2)">{`Import로 JSON을 읽어 items 갱신`}</GuideBox>
          <GuideBox title="3)">{`잘못된 JSON이면 에러 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
