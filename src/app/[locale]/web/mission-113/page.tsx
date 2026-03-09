/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Canvas dots</h1>
  <canvas id="c" width="320" height="220"></canvas>
  <button id="clear" class="primary">Clear</button>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
canvas{border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);}
button{margin-top:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
`,
  js: `const c=document.querySelector('#c');
const clear=document.querySelector('#clear');
const ctx=c.getContext('2d');

function dot(x,y){
  ctx.fillStyle='#ffd43b';
  ctx.beginPath();
  ctx.arc(x,y,5,0,Math.PI*2);
  ctx.fill();
}

function wipe(){
  ctx.clearRect(0,0,c.width,c.height);
}

wipe();

// TODO:
// - canvas click에서 getBoundingClientRect로 좌표 계산해서 dot
// - clear 클릭에서 wipe
`
};

export default function mission113() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const c=document.querySelector('#c');
  if(!c){ fail('요소 존재', {tab:'html', fix:'#c 필요'}); return results; }
  pass('요소 존재');
  pass('canvas', 'manual');
  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 113 — 간단한 canvas 점 찍기</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-113" title="Mission 113" defaults={DEFAULT} testsJs={testsJs} minutes={26} nextMissionId="mission-114" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`캔버스 클릭 시 점 그리기`}</GuideBox>
          <GuideBox title="2)">{`좌표 계산`}</GuideBox>
          <GuideBox title="3)">{`초기화 버튼`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
