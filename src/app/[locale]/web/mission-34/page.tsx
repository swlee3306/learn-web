/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Memo</h1>
  <textarea id="memo" rows="5" placeholder="여기에 메모..."></textarea>
  <div class="row"><button id="clear">Clear</button><span id="hint" class="msg"></span></div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
textarea{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;resize:vertical;}
.row{display:flex;gap:10px;align-items:center;margin-top:10px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
.msg{opacity:0.8;}
`,
  js: `const KEY='learn.memo.v1';
const memo=document.querySelector('#memo');
const clear=document.querySelector('#clear');
const hint=document.querySelector('#hint');

// TODO: 페이지 로드시 localStorage에서 KEY를 읽어 textarea에 넣기
// TODO: 입력할 때마다 KEY로 저장
// TODO: Clear 클릭 시 저장 삭제 + textarea 비우기
`
};

export default function mission34() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});

  const memo=document.querySelector('#memo');
  const clear=document.querySelector('#clear');
  if(!memo||!clear){ fail('요소 존재', {tab:'html', fix:'#memo textarea와 #clear 버튼 필요'}); return results; }
  pass('요소 존재');

  memo.value='abc'; memo.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!localStorage.getItem('learn.memo.v1')) fail('저장', {tab:'js', fix:'input에서 localStorage.setItem(KEY, memo.value)'}); else pass('저장');

  clear.click();
  await new Promise(r=>setTimeout(r,30));
  if(localStorage.getItem('learn.memo.v1')) fail('Clear 삭제', {tab:'js', fix:'clear 클릭 시 localStorage.removeItem(KEY)'}); else pass('Clear 삭제');
  if(memo.value.trim()!=='') fail('Clear 비우기', {tab:'js', fix:'clear 클릭 시 memo.value=""'}); else pass('Clear 비우기');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 34 — 로컬스토리지에 텍스트 저장/복원</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-34" title="Mission 34" defaults={DEFAULT} testsJs={testsJs} minutes={16} nextMissionId="mission-35" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`입력하면 localStorage에 저장`}</GuideBox>
          <GuideBox title="2)">{`새로고침 시 복원`}</GuideBox>
          <GuideBox title="3)">{`Clear 버튼으로 삭제`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
