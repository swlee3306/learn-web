const spec = {
  track: 'web',
  batch: '56-65',
  missions: [
    {
      id: 'mission-56',
      titleKo: '미션 56 — 카드 뒤집기(클릭 토글)',
      pitchKo: 'classList.toggle로 앞/뒤를 전환한다.',
      minutes: 16,
      outcomesKo: ['classList.toggle', '상태', 'CSS transform'],
      checklistKo: ['카드 클릭 시 뒤집기', '앞/뒤 텍스트', '부드러운 애니메이션'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Flip</h1>
  <div id="card" class="card">
    <div class="face front">FRONT</div>
    <div class="face back">BACK</div>
  </div>
  <p id="msg" class="msg">click card</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.card{width:220px;height:140px;margin:0 auto;position:relative;transform-style:preserve-3d;transition:transform 400ms;cursor:pointer;}
.card.flip{transform:rotateY(180deg)}
.face{position:absolute;inset:0;display:grid;place-items:center;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);backface-visibility:hidden;font-weight:700;letter-spacing:0.08em;}
.back{transform:rotateY(180deg);background:rgba(255,212,59,0.12)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const card=document.querySelector('#card');
const msg=document.querySelector('#msg');
let flipped=false;

function render(){
  card.classList.toggle('flip', flipped);
  msg.textContent = flipped ? 'BACK' : 'FRONT';
}

render();

// TODO: card 클릭 시 flipped 토글 후 render() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const card=document.querySelector('#card');
  const msg=document.querySelector('#msg');
  if(!card||!msg){ fail('요소 존재', {tab:'html', fix:'#card, #msg 필요'}); return results; }
  pass('요소 존재');

  const before=msg.textContent;
  card.click();
  await new Promise(r=>setTimeout(r,30));
  const after=msg.textContent;
  if(after===before) fail('클릭 토글', {tab:'js', fix:'click에서 flipped=!flipped; render();'});
  else pass('클릭 토글', String(before)+'→'+String(after));

  return results;
};`
    },

    {
      id: 'mission-57',
      titleKo: '미션 57 — 아코디언(FAQ) 열고 닫기',
      pitchKo: '하나만 열리도록 상태를 관리한다.',
      minutes: 22,
      outcomesKo: ['이벤트 위임', 'dataset', '조건 렌더'],
      checklistKo: ['질문 클릭 시 답변 토글', '다른 항목 클릭 시 이전 닫기', '초기 모두 닫힘'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">FAQ</h1>
  <div id="faq" class="faq">
    <button class="q" data-id="1">Q1. what?</button>
    <div class="a" data-id="1">A1. ...</div>
    <button class="q" data-id="2">Q2. why?</button>
    <div class="a" data-id="2">A2. ...</div>
  </div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.q{width:100%;text-align:left;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);color:#fff;padding:12px 14px;border-radius:12px;cursor:pointer;margin:10px 0 6px 0;}
.a{display:none;opacity:0.9;padding:0 6px 6px 6px;}
.a.on{display:block;}
`,
        js: `const faq=document.querySelector('#faq');
const answers=[...document.querySelectorAll('.a')];
let openId=null;

function render(){
  answers.forEach(a => a.classList.toggle('on', a.dataset.id===openId));
}
render();

// TODO: faq 클릭 이벤트에서 .q 버튼이면
// - openId가 같으면 null로(닫기)
// - 다르면 해당 id로(열기)
// - render() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const q1=document.querySelector('.q[data-id="1"]');
  const a1=document.querySelector('.a[data-id="1"]');
  if(!q1||!a1){ fail('요소 존재', {tab:'html', fix:'data-id="1" q/a 필요'}); return results; }
  pass('요소 존재');

  q1.click();
  await new Promise(r=>setTimeout(r,30));
  if(!a1.classList.contains('on')) fail('클릭 시 열기', {tab:'js', fix:'클릭 시 openId 설정 후 render()'});
  else pass('클릭 시 열기');

  q1.click();
  await new Promise(r=>setTimeout(r,30));
  if(a1.classList.contains('on')) fail('다시 클릭 시 닫기', {tab:'js', fix:'같은 id면 openId=null'});
  else pass('다시 클릭 시 닫기');

  return results;
};`
    },

    {
      id: 'mission-58',
      titleKo: '미션 58 — 진행률 바(버튼으로 +10%)',
      pitchKo: '숫자 상태를 width 스타일로 연결한다.',
      minutes: 16,
      outcomesKo: ['style.width', 'Math.min', '렌더'],
      checklistKo: ['클릭 시 10% 증가', '최대 100% 제한', '퍼센트 텍스트 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Progress</h1>
  <div class="bar"><div id="fill" class="fill"></div></div>
  <p id="p" class="msg">0%</p>
  <button id="add" class="primary">+10</button>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.bar{height:18px;border-radius:999px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);overflow:hidden;}
.fill{height:100%;width:0%;background:linear-gradient(90deg, rgba(34,197,94,0.9), rgba(255,212,59,0.9));transition:width 200ms;}
button{margin-top:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
        js: `const fill=document.querySelector('#fill');
const p=document.querySelector('#p');
const add=document.querySelector('#add');
let n=0;

function render(){
  fill.style.width = n + '%';
  p.textContent = n + '%';
}
render();

// TODO: add 클릭 시 n을 10 증가 (최대 100) 후 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const add=document.querySelector('#add');
  const p=document.querySelector('#p');
  if(!add||!p){ fail('요소 존재', {tab:'html', fix:'#add, #p 필요'}); return results; }
  pass('요소 존재');

  const before=p.textContent;
  add.click();
  await new Promise(r=>setTimeout(r,30));
  const after=p.textContent;
  if(after===before) fail('증가', {tab:'js', fix:'click에서 n 업데이트 후 render()'});
  else pass('증가', String(before)+'→'+String(after));

  return results;
};`
    },

    {
      id: 'mission-59',
      titleKo: '미션 59 — 랜덤 배경색 생성 버튼',
      pitchKo: 'Math.random으로 색을 만들고 스타일에 적용한다.',
      minutes: 14,
      outcomesKo: ['Math.random', 'toString(16)', 'style'],
      checklistKo: ['버튼 클릭 시 배경색 변경', 'hex 코드 표시', '텍스트 대비 유지'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Random color</h1>
  <button id="btn" class="primary">Random</button>
  <p id="hex" class="msg">#0b1020</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;transition:background 200ms;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const btn=document.querySelector('#btn');
const hex=document.querySelector('#hex');

function randHex(){
  const n = Math.floor(Math.random()*0xffffff);
  return '#' + n.toString(16).padStart(6,'0');
}

// TODO: btn 클릭 시 body background를 랜덤 색으로 바꾸고 hex.textContent 업데이트
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn=document.querySelector('#btn');
  const hex=document.querySelector('#hex');
  if(!btn||!hex){ fail('요소 존재', {tab:'html', fix:'#btn, #hex 필요'}); return results; }
  pass('요소 존재');

  const before=hex.textContent;
  btn.click();
  await new Promise(r=>setTimeout(r,30));
  const after=hex.textContent;
  if(after===before) fail('랜덤 적용', {tab:'js', fix:'click에서 색 변경 후 hex 업데이트'});
  else pass('랜덤 적용', String(before)+'→'+String(after));

  return results;
};`
    },

    {
      id: 'mission-60',
      titleKo: '미션 60 — 숫자 스텝퍼(+/-) 만들기',
      pitchKo: '버튼으로 값을 증가/감소시키고 최소/최대를 제한한다.',
      minutes: 18,
      outcomesKo: ['상태', 'Math.min/max', '렌더'],
      checklistKo: ['+ 클릭 시 +1', '- 클릭 시 -1', '0~10 제한'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Stepper</h1>
  <div class="row">
    <button id="minus">-</button>
    <div id="n" class="n">0</div>
    <button id="plus" class="primary">+</button>
  </div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;align-items:center;justify-content:center;gap:10px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;min-width:44px;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.n{width:90px;padding:12px 0;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);font-size:28px;}
`,
        js: `const minus=document.querySelector('#minus');
const plus=document.querySelector('#plus');
const nEl=document.querySelector('#n');
let n=0;

function render(){
  nEl.textContent=String(n);
}
render();

// TODO: plus 클릭 시 n++ (최대 10) 후 render()
// TODO: minus 클릭 시 n-- (최소 0) 후 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const plus=document.querySelector('#plus');
  const nEl=document.querySelector('#n');
  if(!plus||!nEl){ fail('요소 존재', {tab:'html', fix:'#plus, #n 필요'}); return results; }
  pass('요소 존재');

  const before=Number(nEl.textContent||'0');
  plus.click();
  await new Promise(r=>setTimeout(r,30));
  const after=Number(nEl.textContent||'0');
  if(after<=before) fail('증가', {tab:'js', fix:'plus 클릭 처리'});
  else pass('증가', String(before)+'→'+String(after));

  return results;
};`
    },

    {
      id: 'mission-61',
      titleKo: '미션 61 — 배열 셔플 버튼(Fisher–Yates)',
      pitchKo: '셔플 알고리즘으로 순서를 랜덤하게 바꾼다.',
      minutes: 22,
      outcomesKo: ['배열', '루프', 'swap'],
      checklistKo: ['Shuffle 클릭 시 순서 변경', '원본 배열 복사', '렌더 업데이트'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Shuffle</h1>
  <button id="sh" class="primary">Shuffle</button>
  <ul id="list"></ul>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
ul{margin:12px 0 0 18px;line-height:1.9;}
`,
        js: `const sh=document.querySelector('#sh');
const list=document.querySelector('#list');
const items=['A','B','C','D','E'];
let cur=[...items];

function render(){
  list.innerHTML = cur.map(x=>'<li>'+x+'</li>').join('');
}
render();

// TODO: Shuffle 클릭 시 cur를 Fisher–Yates로 셔플한 새 배열로 만들고 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const sh=document.querySelector('#sh');
  const list=document.querySelector('#list');
  if(!sh||!list){ fail('요소 존재', {tab:'html', fix:'#sh, #list 필요'}); return results; }
  pass('요소 존재');

  const before=[...list.querySelectorAll('li')].map(li=>li.textContent).join('');
  sh.click();
  await new Promise(r=>setTimeout(r,30));
  const after=[...list.querySelectorAll('li')].map(li=>li.textContent).join('');
  if(after===before) fail('셔플 실행', {tab:'js', fix:'클릭 시 배열 순서가 바뀌어야 해(셔플).'});
  else pass('셔플 실행', before+'→'+after);

  return results;
};`
    },

    {
      id: 'mission-62',
      titleKo: '미션 62 — 모달 열기/닫기(ESC/오버레이)',
      pitchKo: '키보드 이벤트와 오버레이 클릭을 처리한다.',
      minutes: 26,
      outcomesKo: ['keydown', 'Escape', '이벤트'],
      checklistKo: ['Open 클릭 시 모달 표시', '오버레이 클릭/ESC로 닫기', '닫히면 원래 상태'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Modal</h1>
  <button id="open" class="primary">Open</button>
  <div id="overlay" class="overlay">
    <div class="modal" role="dialog" aria-modal="true">
      <h2 class="h2">Hello</h2>
      <p class="msg">press ESC or click outside</p>
      <button id="close">Close</button>
    </div>
  </div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,0.55);display:none;align-items:center;justify-content:center;padding:18px;}
.overlay.on{display:flex;}
.modal{width:min(420px,92vw);background:#0f172a;border:1px solid rgba(255,255,255,0.18);border-radius:14px;padding:14px;text-align:left;}
.h2{margin:0 0 8px 0;font-size:18px;}
.msg{opacity:0.9;margin:0 0 10px 0;}
`,
        js: `const open=document.querySelector('#open');
const overlay=document.querySelector('#overlay');
const close=document.querySelector('#close');

function set(on){
  overlay.classList.toggle('on', on);
}

set(false);

// TODO:
// - open 클릭 시 set(true)
// - close 클릭 시 set(false)
// - overlay 클릭(자기 자신 클릭) 시 set(false)
// - window keydown에서 Escape면 set(false)
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const open=document.querySelector('#open');
  const overlay=document.querySelector('#overlay');
  if(!open||!overlay){ fail('요소 존재', {tab:'html', fix:'#open, #overlay 필요'}); return results; }
  pass('요소 존재');

  open.click();
  await new Promise(r=>setTimeout(r,30));
  if(!overlay.classList.contains('on')) fail('오픈', {tab:'js', fix:'open click에서 set(true)'});
  else pass('오픈');

  window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(overlay.classList.contains('on')) fail('ESC 닫기', {tab:'js', fix:'keydown Escape 처리'});
  else pass('ESC 닫기');

  return results;
};`
    },

    {
      id: 'mission-63',
      titleKo: '미션 63 — 평점 별점(1~5) 선택 UI',
      pitchKo: 'data-value로 선택 값을 다룬다.',
      minutes: 20,
      outcomesKo: ['dataset', 'classList', '상태'],
      checklistKo: ['별 클릭 시 값 저장', '선택된 별 하이라이트', '현재 점수 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Rating</h1>
  <div id="stars" class="stars" aria-label="rating">
    <button class="star" data-v="1">★</button>
    <button class="star" data-v="2">★</button>
    <button class="star" data-v="3">★</button>
    <button class="star" data-v="4">★</button>
    <button class="star" data-v="5">★</button>
  </div>
  <p id="out" class="msg">0 / 5</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.stars{display:flex;gap:6px;justify-content:center}
.star{font-size:30px;line-height:1;border:none;background:transparent;color:rgba(255,255,255,0.25);cursor:pointer;padding:4px 6px;}
.star.on{color:#ffd43b}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const stars=[...document.querySelectorAll('.star')];
const out=document.querySelector('#out');
let score=0;

function render(){
  stars.forEach(b => b.classList.toggle('on', Number(b.dataset.v) <= score));
  out.textContent = score + ' / 5';
}
render();

// TODO: 별 클릭 시 score를 dataset.v로 바꾸고 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn3=document.querySelector('.star[data-v="3"]');
  const out=document.querySelector('#out');
  if(!btn3||!out){ fail('요소 존재', {tab:'html', fix:'data-v="3" star와 #out 필요'}); return results; }
  pass('요소 존재');

  btn3.click();
  await new Promise(r=>setTimeout(r,30));
  if(!(out.textContent||'').includes('3')) fail('점수 반영', {tab:'js', fix:'click에서 score 변경 후 render()'});
  else pass('점수 반영');

  return results;
};`
    },

    {
      id: 'mission-64',
      titleKo: '미션 64 — 간단한 페이지네이션(Prev/Next)',
      pitchKo: '인덱스를 이동시키며 항목을 보여준다.',
      minutes: 22,
      outcomesKo: ['인덱스', 'disabled', '렌더'],
      checklistKo: ['Prev/Next로 이동', '끝에서 버튼 비활성', '현재 페이지 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Pager</h1>
  <div class="row">
    <button id="prev">Prev</button>
    <button id="next" class="primary">Next</button>
  </div>
  <p id="page" class="msg">1 / 4</p>
  <div id="card" class="card">1</div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:8px;justify-content:center}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
button:disabled{opacity:0.4;cursor:not-allowed;}
.card{margin-top:12px;padding:18px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);font-size:40px;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
        js: `const prev=document.querySelector('#prev');
const next=document.querySelector('#next');
const page=document.querySelector('#page');
const card=document.querySelector('#card');
const total=4;
let i=1;

function render(){
  page.textContent = i + ' / ' + total;
  card.textContent = String(i);
  prev.disabled = i<=1;
  next.disabled = i>=total;
}
render();

// TODO: prev 클릭 시 i-- (최소 1) 후 render()
// TODO: next 클릭 시 i++ (최대 total) 후 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const next=document.querySelector('#next');
  const card=document.querySelector('#card');
  if(!next||!card){ fail('요소 존재', {tab:'html', fix:'#next, #card 필요'}); return results; }
  pass('요소 존재');

  const before=card.textContent;
  next.click();
  await new Promise(r=>setTimeout(r,30));
  const after=card.textContent;
  if(after===before) fail('Next 이동', {tab:'js', fix:'next click 처리'});
  else pass('Next 이동', String(before)+'→'+String(after));

  return results;
};`
    },

    {
      id: 'mission-65',
      titleKo: '미션 65 — 간단한 정규식 이메일 검증',
      pitchKo: 'regex로 이메일 패턴을 검사한다.',
      minutes: 18,
      outcomesKo: ['RegExp', 'test()', '상태 표시'],
      checklistKo: ['입력 시 즉시 검증', '유효하면 ok 스타일', '유효하지 않으면 err 스타일'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Email regex</h1>
  <input id="email" placeholder="name@example.com" />
  <p id="msg" class="msg">-</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.msg{opacity:0.9;margin:10px 0 0 0;}
.msg.err{color:#fb7185;}
.msg.ok{color:#86efac;}
`,
        js: `const email=document.querySelector('#email');
const msg=document.querySelector('#msg');

function set(text, kind){
  msg.textContent=text;
  msg.classList.toggle('err', kind==='err');
  msg.classList.toggle('ok', kind==='ok');
}

// 간단 버전(완벽한 RFC가 아님)
const re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

set('-', '');

// TODO: input 이벤트에서
// - 빈 값이면 '-'로
// - re.test(value)이면 OK
// - 아니면 Error
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const email=document.querySelector('#email');
  const msg=document.querySelector('#msg');
  if(!email||!msg){ fail('요소 존재', {tab:'html', fix:'#email, #msg 필요'}); return results; }
  pass('요소 존재');

  email.value='a@b.com'; email.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!msg.classList.contains('ok')) fail('유효 이메일 OK', {tab:'js', fix:'re.test 통과 시 ok'});
  else pass('유효 이메일 OK');

  email.value='nope'; email.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!msg.classList.contains('err')) fail('무효 이메일 Error', {tab:'js', fix:'re.test 실패 시 err'});
  else pass('무효 이메일 Error');

  return results;
};`
    }
  ]
};

export default spec;
