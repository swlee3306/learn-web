/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Markdown</h1>
  <textarea id="md" rows="5"># Title
Hello **world**</textarea>
  <div id="out" class="out"></div>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
textarea{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;resize:vertical;}
.out{margin-top:12px;padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.04);min-height:120px;}
.out h2{margin:0 0 10px 0;font-size:22px;}
`,
  js: `const md=document.querySelector('#md');
const out=document.querySelector('#out');

function render(){
  let s = md.value || '';
  // header: lines starting with "# "
  s = s.split('
').map(line => {
    if(line.startsWith('# ')) return '<h2>' + line.slice(2) + '</h2>';
    return '<p>' + line + '</p>';
  }).join('');
  // bold **x**
  s = s.replace(/**(.+?)**/g, '<strong>$1</strong>');
  out.innerHTML = s;
}

render();

// TODO: textarea input 이벤트에서 render() 호출
`
};

export default function mission109() {
  const testsJs = useMemo(() => {
    return String.raw`window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const md=document.querySelector('#md');
  const out=document.querySelector('#out');
  if(!md||!out){ fail('요소 존재', {tab:'html', fix:'#md #out 필요'}); return results; }
  pass('요소 존재');

  md.value='# A\nHi **x**';
  md.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!out.innerHTML.includes('<strong>')) fail('bold 변환', {tab:'js', fix:'input에서 render 호출 + **를 <strong>으로'});
  else pass('bold 변환');
  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 109 — 간단한 Markdown 미리보기(#, **만)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-109" title="Mission 109" defaults={DEFAULT} testsJs={testsJs} minutes={26} nextMissionId="mission-110" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`# 헤더 변환`}</GuideBox>
          <GuideBox title="2)">{`**bold** 변환`}</GuideBox>
          <GuideBox title="3)">{`줄바꿈 처리`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
