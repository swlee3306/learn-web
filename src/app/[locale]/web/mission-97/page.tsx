/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">KRW → USD</h1>
  <input id="krw" placeholder="KRW" />
  <p id="usd" class="big">0.00</p>
  <p class="msg">rate: 0.00075</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.big{font-size:44px;margin:14px 0 0 0;text-align:center;}
.msg{opacity:0.85;margin:6px 0 0 0;text-align:center;}
`,
  js: `const krw=document.querySelector('#krw');
const usd=document.querySelector('#usd');
const rate=0.00075;

function render(){
  const n=Number((krw.value||'').trim());
  const v=Number.isFinite(n) ? n*rate : 0;
  usd.textContent = v.toFixed(2);
}

render();

// TODO: input 이벤트에서 render() 호출
`
};

export default function mission97() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const krw=document.querySelector('#krw');
  const usd=document.querySelector('#usd');
  if(!krw||!usd){ fail('요소 존재', {tab:'html', fix:'#krw #usd 필요'}); return results; }
  pass('요소 존재');

  krw.value='1000'; krw.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if((usd.textContent||'').trim()==='0.00') fail('변환', {tab:'js', fix:'input에서 render() 호출'});
  else pass('변환', usd.textContent.trim());

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 97 — 간단한 환율 계산기(고정 환율)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-97" title="Mission 97" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-98" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`KRW 입력 시 USD 출력`}</GuideBox>
          <GuideBox title="2)">{`빈 값 처리`}</GuideBox>
          <GuideBox title="3)">{`소수점 2자리`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
