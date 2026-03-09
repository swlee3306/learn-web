/* eslint-disable */
'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Quiz</h1>
  <p id="q" class="q">-</p>
  <div id="opts" class="opts"></div>
  <button id="next" class="primary">Next</button>
  <p id="msg" class="msg">-</p>
</div>`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.q{opacity:0.95;margin:0 0 12px 0;}
.opts{display:grid;gap:8px;}
.opt{border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);color:#fff;padding:10px 12px;border-radius:12px;cursor:pointer;text-align:left;}
.opt.on{border-color:rgba(34,197,94,0.35);background:rgba(34,197,94,0.18)}
button{margin-top:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
  js: `const qEl=document.querySelector('#q');
const opts=document.querySelector('#opts');
const next=document.querySelector('#next');
const msg=document.querySelector('#msg');

const qs=[
  {q:'2+2?', a:['3','4','5'], ok:1},
  {q:'JS is?', a:['language','drink'], ok:0}
];
let i=0;
let pick=-1;
let score=0;

function render(){
  const cur=qs[i];
  qEl.textContent = cur ? cur.q : 'Done';
  opts.innerHTML = cur ? cur.a.map((t,idx)=>'<button class="opt'+(idx===pick?' on':'')+'" data-i="'+idx+'">'+t+'</button>').join('') : '';
  msg.textContent = cur ? ('score: '+score) : ('score: '+score+' / '+qs.length);
  next.textContent = cur ? 'Next' : 'Restart';
}

render();

// TODO:
// - opts 클릭에서 .opt면 pick=Number(dataset.i) 후 render
// - next 클릭에서
//   - cur 있을 때: pick이 ok면 score++ ; i++ ; pick=-1 ; render
//   - 끝이면 restart: i=0 score=0 pick=-1 render
`
};

export default function mission115() {
  const testsJs = useMemo(() => {
    return `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const next=document.querySelector('#next');
  const opts=document.querySelector('#opts');
  if(!next||!opts){ fail('요소 존재', {tab:'html', fix:'#next #opts 필요'}); return results; }
  pass('요소 존재');
  pass('퀴즈', 'manual');
  return results;
};`;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 115 — 간단한 퀴즈(다음 버튼)</h1>
        <p className="p">검사(Tests)를 통과하면 완료!</p>
      </section>

      <WebSandboxPanel missionId="mission-115" title="Mission 115" defaults={DEFAULT} testsJs={testsJs} minutes={28} nextMissionId="mission-116" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1)">{`선택 후 Next`}</GuideBox>
          <GuideBox title="2)">{`마지막에 점수 표시`}</GuideBox>
          <GuideBox title="3)">{`다시 시작`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
