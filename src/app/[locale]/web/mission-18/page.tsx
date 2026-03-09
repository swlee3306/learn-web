/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Mission 18</h1>
  <p class="desc">테마를 바꾸고 새로고침해도 유지되게 해봐.</p>
  <button id="themeBtn" class="btn">테마: dark</button>
  <div class="panel">패널</div>
</div>
`,
  css: `:root{--bg:#0b1020;--fg:#fff;--card:rgba(255,255,255,0.04);--border:rgba(255,255,255,0.15);}
body{margin:0;font-family:system-ui;background:var(--bg);color:var(--fg);min-height:100vh;display:grid;place-items:center;}
body.light{--bg:#f8fafc;--fg:#0f172a;--card:#fff;--border:rgba(15,23,42,0.18);}
.wrap{width:min(860px,92vw);}
.h1{margin:0 0 8px 0;font-size:28px;}
.desc{margin:0 0 14px 0;opacity:0.85;}
.btn{border:1px solid var(--border);background:var(--card);color:var(--fg);padding:10px 14px;border-radius:12px;cursor:pointer;}
.panel{margin-top:14px;padding:16px;border-radius:14px;border:1px solid var(--border);background:var(--card);}
`,
  js: `// 목표: themeBtn 클릭 시 body에 light 클래스를 토글하고, 값을 localStorage에 저장해.
// key 예: learn.theme = 'dark' | 'light'

const key = 'learn.theme';
const btn = document.querySelector('#themeBtn');

// TODO: 1) 초기 로드 시 localStorage 값을 읽어서 body/class와 버튼 텍스트를 맞춰.
// TODO: 2) 클릭 시 토글하고 저장해.
`
};

export default function mission18() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn=document.querySelector('#themeBtn');
  if(!btn) fail('버튼 존재(#themeBtn)',{tab:'html',fix:'id="themeBtn" 버튼을 만들어줘.'}); else pass('버튼 존재(#themeBtn)');
  if(!btn) return results;
  try{
    const before=document.body.classList.contains('light');
    btn.click();
    await new Promise(r=>setTimeout(r,30));
    const after=document.body.classList.contains('light');
    if(before===after) fail('클릭 시 테마 토글',{tab:'js',fix:'document.body.classList.toggle("light")를 구현해.'});
    else pass('클릭 시 테마 토글', String(before)+'→'+String(after));
    const v=localStorage.getItem('learn.theme');
    if(v!=='dark' && v!=='light') fail('localStorage 저장',{tab:'js',fix:'localStorage.setItem("learn.theme", "dark"|"light")를 저장해.'});
    else pass('localStorage 저장', v);
  }catch(e){ fail('동작 테스트', String(e && (e.stack||e))); }
  return results;
};
`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 18 — 테마 토글 + localStorage 저장</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-18" title="Mission 18" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-19" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`테마 버튼으로 dark/light 토글`}</GuideBox>
          <GuideBox title="2)">{`선택한 테마를 localStorage에 저장`}</GuideBox>
          <GuideBox title="3)">{`새로고침 후에도 유지`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
