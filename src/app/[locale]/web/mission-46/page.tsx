/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Shipping</h1>
  <label class="row"><input type="radio" name="ship" value="standard" checked /> Standard (0)</label>
  <label class="row"><input type="radio" name="ship" value="express" /> Express (5)</label>
  <label class="row"><input type="radio" name="ship" value="pickup" /> Pickup (0)</label>
  <p id="out" class="msg">standard / +0</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;align-items:center;gap:10px;margin:10px 0;opacity:0.95;}
.msg{margin:12px 0 0 0;opacity:0.9;padding:10px 12px;border:1px solid rgba(255,255,255,0.18);border-radius:12px;background:rgba(255,255,255,0.06)}
`,
  js: `const out=document.querySelector('#out');
const prices={standard:0, express:5, pickup:0};

function render(){
  const checked=document.querySelector('input[name="ship"]:checked');
  const v = checked ? checked.value : 'standard';
  out.textContent = v + ' / +' + prices[v];
}

render();

// TODO: name="ship" 라디오 change 이벤트에서 render() 호출
`
};

export default function mission46() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const out=document.querySelector('#out');
  const express=document.querySelector('input[value="express"]');
  if(!out||!express){ fail('요소 존재', {tab:'html', fix:'#out, value="express" radio 필요'}); return results; }
  pass('요소 존재');

  express.checked=true; express.dispatchEvent(new Event('change',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!(out.textContent||'').includes('express')) fail('선택값 반영', {tab:'js', fix:'change에서 render()를 호출해줘.'});
  else pass('선택값 반영');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 46 — 라디오 버튼으로 배송 옵션 선택하기</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-46" title="Mission 46" defaults={DEFAULT} testsJs={testsJs} minutes={16} nextMissionId="mission-47" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`옵션 선택 시 가격 표시`}</GuideBox>
          <GuideBox title="2)">{`기본값 preset`}</GuideBox>
          <GuideBox title="3)">{`선택값 텍스트 출력`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
