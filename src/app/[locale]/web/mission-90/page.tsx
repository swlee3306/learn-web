/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Hash router</h1>
  <nav class="nav">
    <a href="#home" class="a">home</a>
    <a href="#about" class="a">about</a>
  </nav>
  <div id="page" class="page">home</div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.nav{display:flex;gap:10px;margin-bottom:12px;}
.a{color:#ffd43b;text-decoration:none;}
.page{padding:14px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);min-height:80px;display:grid;place-items:center;font-size:24px;}
`,
  js: `const page=document.querySelector('#page');

function get(){
  return (location.hash||'#home').slice(1);
}

function render(){
  const p=get();
  page.textContent=p;
}

render();

// TODO: window hashchange 이벤트에서 render() 호출
`
};

export default function mission90() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const page=document.querySelector('#page');
  if(!page){ fail('요소 존재', {tab:'html', fix:'#page 필요'}); return results; }
  pass('요소 존재');

  location.hash='#about';
  window.dispatchEvent(new HashChangeEvent('hashchange'));
  await new Promise(r=>setTimeout(r,30));
  if((page.textContent||'').trim()!=='about') fail('hash 라우팅', {tab:'js', fix:'hashchange에서 render() 호출'});
  else pass('hash 라우팅');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 90 — 간단한 클라이언트 라우팅 흉내(해시)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-90" title="Mission 90" defaults={DEFAULT} testsJs={testsJs} minutes={24} nextMissionId="mission-91" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`링크 클릭 시 해시 변경`}</GuideBox>
          <GuideBox title="2)">{`hashchange에서 렌더`}</GuideBox>
          <GuideBox title="3)">{`현재 페이지 표시`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
