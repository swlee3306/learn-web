/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Range min/max</h1>
  <label class="row">min <input id="min" type="range" min="0" max="100" value="20" /></label>
  <label class="row">max <input id="max" type="range" min="0" max="100" value="80" /></label>
  <p id="out" class="msg">20 ~ 80</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:12px;align-items:center;margin:10px 0;}
input{flex:1;}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const minEl=document.querySelector('#min');
const maxEl=document.querySelector('#max');
const out=document.querySelector('#out');

function render(){
  let a=Number(minEl.value);
  let b=Number(maxEl.value);
  if(a>b){
    // TODO: 관계 보정 (어느 쪽을 움직였는지에 따라 보정해도 됨)
  }
  out.textContent = a + ' ~ ' + b;
}

render();

// TODO: min/max input 이벤트에서 관계를 보정하고 render()
`
};

export default function mission119() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const minEl=document.querySelector('#min');
  const maxEl=document.querySelector('#max');
  const out=document.querySelector('#out');
  if(!minEl||!maxEl||!out){ fail('요소 존재', {tab:'html', fix:'#min #max #out 필요'}); return results; }
  pass('요소 존재');

  minEl.value='90'; minEl.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  // allow either auto-correct or just display; require output to change
  if(!(out.textContent||'').includes('90')) fail('업데이트', {tab:'js', fix:'input에서 render() 호출해줘.'});
  else pass('업데이트');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 119 — 간단한 숫자 범위 슬라이더 2개(최소/최대)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-119" title="Mission 119" defaults={DEFAULT} testsJs={testsJs} minutes={26} nextMissionId="mission-120" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`min/max 표시`}</GuideBox>
          <GuideBox title="2)">{`min이 max 넘으면 보정`}</GuideBox>
          <GuideBox title="3)">{`실시간 업데이트`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
