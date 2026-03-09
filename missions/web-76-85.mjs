const spec = {
  track: 'web',
  batch: '76-85',
  missions: [
    {
      id: 'mission-76',
      titleKo: '미션 76 — 카운트다운 타이머(10→0)',
      pitchKo: 'setInterval로 카운트다운을 만들고 종료를 처리한다.',
      minutes: 22,
      outcomesKo: ['setInterval', 'clearInterval', '상태'],
      checklistKo: ['Start 누르면 10부터 감소', '0이면 멈춤', '중복 시작 방지'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Countdown</h1>
  <button id="start" class="primary">Start</button>
  <p id="n" class="big">10</p>
  <p id="msg" class="msg">-</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.big{font-size:56px;margin:10px 0 0 0;}
.msg{opacity:0.9;margin:8px 0 0 0;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
`,
        js: `const start=document.querySelector('#start');
const nEl=document.querySelector('#n');
const msg=document.querySelector('#msg');
let n=10;
let timer=null;

function render(){
  nEl.textContent=String(n);
}
render();

// TODO: Start 클릭 시 이미 timer가 있으면 무시.
// - n=10으로 리셋하고 render()
// - setInterval로 1초마다 n--
// - n이 0이면 clearInterval + timer=null + msg='Done'
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const start=document.querySelector('#start');
  const nEl=document.querySelector('#n');
  if(!start||!nEl){ fail('요소 존재', {tab:'html', fix:'#start, #n 필요'}); return results; }
  pass('요소 존재');

  start.click();
  const before=Number(nEl.textContent||'0');
  await new Promise(r=>setTimeout(r,1100));
  const after=Number(nEl.textContent||'0');
  if(after>=before) fail('감소', {tab:'js', fix:'setInterval로 1초마다 n-- 해줘.'});
  else pass('감소', String(before)+'→'+String(after));

  return results;
};`
    },

    {
      id: 'mission-77',
      titleKo: '미션 77 — 숫자 합계 계산기(입력 2개)',
      pitchKo: '입력값을 숫자로 변환해 합계를 표시한다.',
      minutes: 16,
      outcomesKo: ['Number()', 'input 이벤트', '렌더'],
      checklistKo: ['a/b 입력 시 합계 표시', '빈 값은 0 취급', 'NaN 방지'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Sum</h1>
  <div class="row">
    <input id="a" placeholder="a" />
    <input id="b" placeholder="b" />
  </div>
  <p id="out" class="big">0</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
input{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.big{font-size:44px;margin:14px 0 0 0;text-align:center;}
`,
        js: `const a=document.querySelector('#a');
const b=document.querySelector('#b');
const out=document.querySelector('#out');

function num(x){
  const n=Number(x);
  return Number.isFinite(n) ? n : 0;
}

function render(){
  const sum = num(a.value) + num(b.value);
  out.textContent=String(sum);
}

render();

// TODO: a/b input 이벤트에서 render() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const a=document.querySelector('#a');
  const b=document.querySelector('#b');
  const out=document.querySelector('#out');
  if(!a||!b||!out){ fail('요소 존재', {tab:'html', fix:'#a #b #out 필요'}); return results; }
  pass('요소 존재');

  a.value='2'; b.value='3';
  a.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if((out.textContent||'').trim()!=='5') fail('합계', {tab:'js', fix:'input 시 render 호출해서 합계 표시'});
  else pass('합계');

  return results;
};`
    },

    {
      id: 'mission-78',
      titleKo: '미션 78 — 간단한 폼 reset 버튼 구현',
      pitchKo: '초기값으로 되돌리고 UI를 리셋한다.',
      minutes: 18,
      outcomesKo: ['reset', '상태', '렌더'],
      checklistKo: ['Reset 클릭 시 입력 초기화', '메시지 초기화', '기본값 유지'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Reset</h1>
  <input id="name" placeholder="name" />
  <button id="save" class="primary">Save</button>
  <button id="reset">Reset</button>
  <p id="msg" class="msg">-</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;margin-bottom:10px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;margin-right:8px;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const nameEl=document.querySelector('#name');
const save=document.querySelector('#save');
const reset=document.querySelector('#reset');
const msg=document.querySelector('#msg');

// TODO:
// - save 클릭 시 msg='Saved: '+nameEl.value
// - reset 클릭 시 nameEl.value='' 그리고 msg='-'
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const nameEl=document.querySelector('#name');
  const reset=document.querySelector('#reset');
  const msg=document.querySelector('#msg');
  if(!nameEl||!reset||!msg){ fail('요소 존재', {tab:'html', fix:'#name #reset #msg 필요'}); return results; }
  pass('요소 존재');

  nameEl.value='x';
  reset.click();
  await new Promise(r=>setTimeout(r,30));
  if(nameEl.value!=='') fail('리셋', {tab:'js', fix:'reset 클릭 시 input을 비워줘.'});
  else pass('리셋');

  return results;
};`
    },

    {
      id: 'mission-79',
      titleKo: '미션 79 — 클릭 카운터(더블클릭은 +2)',
      pitchKo: 'click과 dblclick 이벤트 차이를 경험한다.',
      minutes: 18,
      outcomesKo: ['click', 'dblclick', '상태'],
      checklistKo: ['클릭하면 +1', '더블클릭하면 +2', '화면 업데이트'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Click</h1>
  <button id="btn" class="primary">Click me</button>
  <p id="n" class="big">0</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.big{font-size:44px;margin:14px 0 0 0;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
`,
        js: `const btn=document.querySelector('#btn');
const nEl=document.querySelector('#n');
let n=0;

function render(){
  nEl.textContent=String(n);
}
render();

// TODO: btn click에서 n+=1, dblclick에서 n+=2 후 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn=document.querySelector('#btn');
  const nEl=document.querySelector('#n');
  if(!btn||!nEl){ fail('요소 존재', {tab:'html', fix:'#btn, #n 필요'}); return results; }
  pass('요소 존재');

  btn.dispatchEvent(new MouseEvent('dblclick',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(Number(nEl.textContent||'0')<2) fail('dblclick +2', {tab:'js', fix:'dblclick 이벤트에서 +2 처리'});
  else pass('dblclick +2');

  return results;
};`
    },

    {
      id: 'mission-80',
      titleKo: '미션 80 — 간단한 이미지 갤러리(썸네일 클릭)',
      pitchKo: '썸네일 클릭으로 메인 이미지를 바꾼다.',
      minutes: 22,
      outcomesKo: ['이벤트 위임', 'dataset', '렌더'],
      checklistKo: ['썸네일 클릭 시 메인 변경', '선택 표시', '초기 선택'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Gallery</h1>
  <div id="main" class="main">1</div>
  <div id="thumbs" class="thumbs">
    <button class="th on" data-v="1">1</button>
    <button class="th" data-v="2">2</button>
    <button class="th" data-v="3">3</button>
  </div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.main{height:180px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);display:grid;place-items:center;font-size:60px;}
.thumbs{display:flex;gap:8px;justify-content:center;margin-top:12px;}
.th{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;min-width:48px;}
.th.on{background: rgba(34,197,94,0.18); border-color: rgba(34,197,94,0.35)}
`,
        js: `const main=document.querySelector('#main');
const thumbs=document.querySelector('#thumbs');
const ths=[...document.querySelectorAll('.th')];
let v='1';

function render(){
  main.textContent=v;
  ths.forEach(b=>b.classList.toggle('on', b.dataset.v===v));
}
render();

// TODO: thumbs 클릭 이벤트에서 .th 버튼이면 v=dataset.v 후 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn2=document.querySelector('.th[data-v="2"]');
  const main=document.querySelector('#main');
  if(!btn2||!main){ fail('요소 존재', {tab:'html', fix:'data-v="2" 썸네일과 #main 필요'}); return results; }
  pass('요소 존재');

  btn2.click();
  await new Promise(r=>setTimeout(r,30));
  if((main.textContent||'').trim()!=='2') fail('메인 변경', {tab:'js', fix:'클릭 시 v 업데이트 후 render'});
  else pass('메인 변경');

  return results;
};`
    },

    {
      id: 'mission-81',
      titleKo: '미션 81 — 간단한 카드 필터(카테고리 버튼)',
      pitchKo: '버튼으로 category 필터링을 한다.',
      minutes: 22,
      outcomesKo: ['filter', 'dataset', '렌더'],
      checklistKo: ['All/A/B 필터', '활성 버튼 표시', '카운트 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Filter cards</h1>
  <div id="cats" class="cats">
    <button class="c on" data-c="all">All</button>
    <button class="c" data-c="A">A</button>
    <button class="c" data-c="B">B</button>
  </div>
  <p id="msg" class="msg">-</p>
  <div id="grid" class="grid"></div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.cats{display:flex;gap:8px;margin-bottom:10px;}
.c{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
.c.on{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.card{padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);text-align:center;}
.msg{opacity:0.9;margin:0 0 10px 0;}
`,
        js: `const cats=document.querySelector('#cats');
const btns=[...document.querySelectorAll('.c')];
const msg=document.querySelector('#msg');
const grid=document.querySelector('#grid');
const items=[{t:'1',c:'A'},{t:'2',c:'B'},{t:'3',c:'A'},{t:'4',c:'B'}];
let cur='all';

function render(){
  btns.forEach(b=>b.classList.toggle('on', b.dataset.c===cur));
  const shown = cur==='all' ? items : items.filter(x=>x.c===cur);
  grid.innerHTML = shown.map(x=>'<div class="card">'+x.t+' / '+x.c+'</div>').join('');
  msg.textContent = shown.length + ' items';
}
render();

// TODO: cats 클릭 이벤트에서 .c 버튼이면 cur=dataset.c 후 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btnA=document.querySelector('.c[data-c="A"]');
  const grid=document.querySelector('#grid');
  if(!btnA||!grid){ fail('요소 존재', {tab:'html', fix:'data-c="A" 버튼과 #grid 필요'}); return results; }
  pass('요소 존재');

  btnA.click();
  await new Promise(r=>setTimeout(r,30));
  const cards=[...grid.querySelectorAll('.card')].map(x=>x.textContent||'').join(' ');
  if(!cards.includes('/ A') || cards.includes('/ B')) fail('필터', {tab:'js', fix:'A 클릭 시 A만 보이게 필터'});
  else pass('필터');

  return results;
};`
    },

    {
      id: 'mission-82',
      titleKo: '미션 82 — 키보드로 상하 이동(하이라이트)',
      pitchKo: 'keydown으로 선택 인덱스를 이동시킨다.',
      minutes: 26,
      outcomesKo: ['keydown', 'ArrowUp/Down', '인덱스'],
      checklistKo: ['ArrowDown/Up로 선택 이동', '경계 처리', '선택 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Keyboard select</h1>
  <p class="msg">Use ↑ ↓</p>
  <ul id="list" class="list"></ul>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 8px 0;font-size:28px;}
.msg{opacity:0.85;margin:0 0 12px 0;}
.list{margin:0;padding:0;list-style:none;display:grid;gap:8px;}
.li{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06)}
.li.on{background: rgba(34,197,94,0.18); border-color: rgba(34,197,94,0.35)}
`,
        js: `const list=document.querySelector('#list');
const items=['A','B','C','D'];
let i=0;

function render(){
  list.innerHTML = items.map((t,idx)=>'<li class="li' + (idx===i?' on':'') + '">'+t+'</li>').join('');
}
render();

// TODO: window keydown에서
// - ArrowDown이면 i++ (최대 items.length-1)
// - ArrowUp이면 i-- (최소 0)
// - render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const list=document.querySelector('#list');
  if(!list){ fail('요소 존재', {tab:'html', fix:'#list 필요'}); return results; }
  pass('요소 존재');

  window.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  const on=[...list.querySelectorAll('.li.on')][0];
  if(!on || (on.textContent||'').trim()!=='B') fail('ArrowDown 이동', {tab:'js', fix:'keydown ArrowDown 처리'});
  else pass('ArrowDown 이동');

  return results;
};`
    },

    {
      id: 'mission-83',
      titleKo: '미션 83 — 간단한 이벤트 버블링 실험(로그)',
      pitchKo: '버블링을 보고 stopPropagation을 체감한다.',
      minutes: 18,
      outcomesKo: ['event bubbling', 'stopPropagation', '로그'],
      checklistKo: ['box 클릭 로그', 'button 클릭 로그', 'stopPropagation 옵션'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Bubbling</h1>
  <div id="box" class="box">
    <button id="btn" class="btn">Button</button>
  </div>
  <label class="row"><input id="stop" type="checkbox" /> stopPropagation</label>
  <pre id="log" class="log"></pre>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.box{padding:20px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);}
.btn{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
.row{display:flex;gap:10px;align-items:center;margin-top:10px;opacity:0.9;}
.log{margin-top:12px;min-height:80px;padding:10px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.04);white-space:pre-wrap;}
`,
        js: `const box=document.querySelector('#box');
const btn=document.querySelector('#btn');
const stop=document.querySelector('#stop');
const log=document.querySelector('#log');

function push(t){
  log.textContent = (log.textContent ? log.textContent + '\n' : '') + t;
}

// TODO:
// - box click: push('box')
// - btn click: push('btn'); stop.checked면 e.stopPropagation()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn=document.querySelector('#btn');
  const log=document.querySelector('#log');
  if(!btn||!log){ fail('요소 존재', {tab:'html', fix:'#btn, #log 필요'}); return results; }
  pass('요소 존재');

  btn.click();
  await new Promise(r=>setTimeout(r,30));
  if(!(log.textContent||'').includes('btn')) fail('btn 로그', {tab:'js', fix:'btn click에서 push("btn")'});
  else pass('btn 로그');

  return results;
};`
    },

    {
      id: 'mission-84',
      titleKo: '미션 84 — fetch로 포스트 1개 보기(로딩/에러)',
      pitchKo: 'id 입력을 받아 fetch로 상세를 가져온다.',
      minutes: 26,
      outcomesKo: ['fetch', 'async', '상태 처리'],
      checklistKo: ['Load 클릭 시 로딩', '성공 시 title/body 표시', '실패 시 에러'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Post</h1>
  <div class="row">
    <input id="id" placeholder="1~100" />
    <button id="load" class="primary">Load</button>
  </div>
  <p id="msg" class="msg">-</p>
  <h2 id="title" class="h2"></h2>
  <p id="body" class="p"></p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:8px;}
input{flex:1;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
.h2{margin:12px 0 6px 0;font-size:18px;}
.p{opacity:0.9;margin:0;}
`,
        js: `const idEl=document.querySelector('#id');
const load=document.querySelector('#load');
const msg=document.querySelector('#msg');
const title=document.querySelector('#title');
const body=document.querySelector('#body');

// TODO: load 클릭 시
// - msg='Loading...'
// - fetch('https://jsonplaceholder.typicode.com/posts/'+id)
// - 성공: title/body 표시, msg='OK'
// - 실패: msg='Error'
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const load=document.querySelector('#load');
  const msg=document.querySelector('#msg');
  if(!load||!msg){ fail('요소 존재', {tab:'html', fix:'#load, #msg 필요'}); return results; }
  pass('요소 존재');

  load.click();
  await new Promise(r=>setTimeout(r,50));
  if(!(msg.textContent||'').trim()) fail('로딩 표시', {tab:'js', fix:'클릭 직후 msg를 업데이트해줘.'});
  else pass('로딩 표시');

  return results;
};`
    },

    {
      id: 'mission-85',
      titleKo: '미션 85 — 간단한 별칭 맵(Map)으로 값 찾기',
      pitchKo: 'Map을 사용해 키-값 조회를 연습한다.',
      minutes: 18,
      outcomesKo: ['Map', 'get()', 'input'],
      checklistKo: ['키 입력하면 값 표시', '없는 키면 안내', '대소문자 무시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Map lookup</h1>
  <input id="q" placeholder="dog/cat" />
  <p id="out" class="msg">-</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
        js: `const q=document.querySelector('#q');
const out=document.querySelector('#out');
const m=new Map([
  ['dog','멍멍'],
  ['cat','야옹'],
  ['cow','음메']
]);

function render(){
  const key=(q.value||'').trim().toLowerCase();
  if(!key){ out.textContent='-'; return; }
  const v=m.get(key);
  out.textContent = v ? v : 'not found';
}

render();

// TODO: input 이벤트에서 render() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const q=document.querySelector('#q');
  const out=document.querySelector('#out');
  if(!q||!out){ fail('요소 존재', {tab:'html', fix:'#q, #out 필요'}); return results; }
  pass('요소 존재');

  q.value='DOG'; q.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!(out.textContent||'').includes('멍멍')) fail('Map 조회', {tab:'js', fix:'input에서 render() 호출 + toLowerCase 처리'});
  else pass('Map 조회');

  return results;
};`
    }
  ]
};

export default spec;
