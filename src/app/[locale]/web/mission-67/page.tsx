/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Guess</h1>
  <input id="n" placeholder="1~20" />
  <button id="btn" class="primary">Guess</button>
  <p id="msg" class="msg">-</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;margin-bottom:10px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const n=document.querySelector('#n');
const btn=document.querySelector('#btn');
const msg=document.querySelector('#msg');

const answer = Math.floor(Math.random()*20) + 1;

// TODO: btn 클릭 시
// - 입력을 숫자로 변환
// - answer보다 작으면 'UP', 크면 'DOWN', 같으면 'Bingo!'
`
};

export default function mission67() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn=document.querySelector('#btn');
  const msg=document.querySelector('#msg');
  if(!btn||!msg){ fail('요소 존재', {tab:'html', fix:'#btn, #msg 필요'}); return results; }
  pass('요소 존재');

  btn.click();
  await new Promise(r=>setTimeout(r,30));
  if(!(msg.textContent||'').trim()) fail('출력', {tab:'js', fix:'클릭 시 msg를 업데이트해줘.'});
  else pass('출력');

  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 67 — 숫자 맞추기(랜덤 1~20)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-67" title="Mission 67" defaults={DEFAULT} testsJs={testsJs} minutes={24} nextMissionId="mission-68" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`Guess 버튼으로 비교`}</GuideBox>
          <GuideBox title="2)">{`UP/DOWN 힌트`}</GuideBox>
          <GuideBox title="3)">{`정답이면 축하 메시지`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
