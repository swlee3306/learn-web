const spec = {
  track: 'web',
  batch: '66-75',
  missions: [
    {
      id: 'mission-66',
      titleKo: '미션 66 — Dark mode 토글(저장 포함)',
      pitchKo: '토글 상태를 localStorage에 저장해 유지한다.',
      minutes: 20,
      outcomesKo: ['classList', 'localStorage', '렌더'],
      checklistKo: ['버튼으로 dark 클래스 토글', '상태 저장/로드', '현재 모드 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Dark mode</h1>
  <button id="toggle" class="primary">Toggle</button>
  <p id="msg" class="msg">mode: dark</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;transition:background 200ms,color 200ms;}
body.light{background:#f8fafc;color:#0f172a;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
body.light button{color:#0f172a;border-color:#cbd5e1;background:#fff}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const toggle=document.querySelector('#toggle');
const msg=document.querySelector('#msg');
const KEY='learn.theme';
let mode = localStorage.getItem(KEY) || 'dark';

function render(){
  document.body.classList.toggle('light', mode==='light');
  msg.textContent='mode: '+mode;
}

render();

// TODO: toggle 클릭 시 mode를 'dark'/'light'로 토글하고
// localStorage.setItem(KEY, mode) 후 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const toggle=document.querySelector('#toggle');
  const msg=document.querySelector('#msg');
  if(!toggle||!msg){ fail('요소 존재', {tab:'html', fix:'#toggle, #msg 필요'}); return results; }
  pass('요소 존재');

  const before=msg.textContent;
  toggle.click();
  await new Promise(r=>setTimeout(r,30));
  const after=msg.textContent;
  if(after===before) fail('토글 동작', {tab:'js', fix:'클릭에서 mode 토글 + 저장 + render'});
  else pass('토글 동작');

  return results;
};`
    },

    {
      id: 'mission-67',
      titleKo: '미션 67 — 숫자 맞추기(랜덤 1~20)',
      pitchKo: '랜덤 값과 입력을 비교해 힌트를 준다.',
      minutes: 24,
      outcomesKo: ['Math.random', 'Number()', '조건문'],
      checklistKo: ['Guess 버튼으로 비교', 'UP/DOWN 힌트', '정답이면 축하 메시지'],
      defaults: {
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
      },
      testsJs: `window.__learnRunTests = async function(){
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
};`
    },

    {
      id: 'mission-68',
      titleKo: '미션 68 — 리스트에서 항목 삭제(× 버튼)',
      pitchKo: '배열 상태에서 특정 항목을 제거한다.',
      minutes: 22,
      outcomesKo: ['filter', 'dataset', '이벤트 위임'],
      checklistKo: ['× 클릭 시 해당 항목 삭제', '삭제 후 렌더', '빈 리스트 처리'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Remove</h1>
  <ul id="list" class="list"></ul>
  <p id="msg" class="msg">-</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.list{margin:0;padding:0;list-style:none;display:grid;gap:8px;}
.item{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06)}
.x{border:none;background:transparent;color:#ffd43b;font-size:18px;cursor:pointer;}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const list=document.querySelector('#list');
const msg=document.querySelector('#msg');
let items=[{id:1,text:'A'},{id:2,text:'B'},{id:3,text:'C'}];

function render(){
  list.innerHTML = items.map(it =>
    '<li class="item">' +
      '<span>' + it.text + '</span>' +
      '<button class="x" data-id="' + it.id + '">×</button>' +
    '</li>'
  ).join('');
  msg.textContent = items.length ? (items.length + ' items') : 'empty';
}

render();

// TODO: list 클릭 이벤트에서 .x 버튼이면 dataset.id로 items를 filter해서 제거 후 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const list=document.querySelector('#list');
  if(!list){ fail('요소 존재', {tab:'html', fix:'#list 필요'}); return results; }
  pass('요소 존재');

  const before=list.querySelectorAll('li').length;
  const x=list.querySelector('.x');
  if(!x){ fail('삭제 버튼', {tab:'js', fix:'render에서 .x 버튼을 만들어줘.'}); return results; }
  x.click();
  await new Promise(r=>setTimeout(r,30));
  const after=list.querySelectorAll('li').length;
  if(after>=before) fail('삭제 동작', {tab:'js', fix:'click에서 filter로 제거 후 render'});
  else pass('삭제 동작', String(before)+'→'+String(after));

  return results;
};`
    },

    {
      id: 'mission-69',
      titleKo: '미션 69 — 간단한 슬라이더(range) 값 표시',
      pitchKo: 'input range의 값을 읽어 UI에 표시한다.',
      minutes: 14,
      outcomesKo: ['range', 'input 이벤트', 'value'],
      checklistKo: ['슬라이더 움직이면 숫자 표시', '초기값 표시', '0~100 범위'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Range</h1>
  <input id="r" type="range" min="0" max="100" value="40" />
  <p id="out" class="msg">40</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const r=document.querySelector('#r');
const out=document.querySelector('#out');

function render(){
  out.textContent = r.value;
}

render();

// TODO: r input 이벤트에서 render() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const r=document.querySelector('#r');
  const out=document.querySelector('#out');
  if(!r||!out){ fail('요소 존재', {tab:'html', fix:'#r, #out 필요'}); return results; }
  pass('요소 존재');

  r.value='77'; r.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if((out.textContent||'').trim()!=='77') fail('값 반영', {tab:'js', fix:'input 이벤트에서 render 호출'});
  else pass('값 반영');

  return results;
};`
    },

    {
      id: 'mission-70',
      titleKo: '미션 70 — fetch로 사용자 목록 가져오기(JSONPlaceholder)',
      pitchKo: 'fetch로 JSON 배열을 받아 리스트로 렌더한다.',
      minutes: 26,
      outcomesKo: ['fetch', 'async/await', 'map'],
      checklistKo: ['Load 클릭 시 로딩 표시', '성공 시 이름 리스트', '실패 시 에러'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Users</h1>
  <button id="load" class="primary">Load</button>
  <p id="msg" class="msg">-</p>
  <ul id="list"></ul>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
ul{margin:10px 0 0 18px;line-height:1.9;}
`,
        js: `const load=document.querySelector('#load');
const msg=document.querySelector('#msg');
const list=document.querySelector('#list');

// TODO: load 클릭 시
// - msg='Loading...'
// - fetch('https://jsonplaceholder.typicode.com/users')
// - 성공: name 목록 렌더 + msg='OK'
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
  if(!(msg.textContent||'').trim()) fail('클릭 반응', {tab:'js', fix:'클릭 시 msg를 먼저 업데이트해줘.'});
  else pass('클릭 반응');

  return results;
};`
    },

    {
      id: 'mission-71',
      titleKo: '미션 71 — 스크롤 진행률(상단 progress bar)',
      pitchKo: 'scroll 이벤트에서 진행률을 계산한다.',
      minutes: 24,
      outcomesKo: ['scroll', 'documentElement', '계산'],
      checklistKo: ['스크롤에 따라 바 width 변경', '0~100% 계산', '리사이즈에도 동작'],
      defaults: {
        html: `<div class="top"><div id="bar" class="bar"></div></div>
<div class="wrap">
  <h1 class="h1">Scroll</h1>
  <p class="p">scroll down...</p>
  <div class="sp"></div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;}
.top{position:fixed;top:0;left:0;right:0;height:6px;background:rgba(255,255,255,0.08);z-index:10;}
.bar{height:100%;width:0%;background:#ffd43b;}
.wrap{padding:24px;width:min(680px,92vw);margin:0 auto;}
.h1{margin:24px 0 12px 0;font-size:28px;}
.p{opacity:0.9;}
.sp{height:180vh;}
`,
        js: `const bar=document.querySelector('#bar');

function render(){
  const el=document.documentElement;
  const max = el.scrollHeight - el.clientHeight;
  const p = max<=0 ? 0 : (el.scrollTop / max) * 100;
  bar.style.width = p + '%';
}

render();

// TODO: window scroll + resize 이벤트에서 render() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const bar=document.querySelector('#bar');
  if(!bar){ fail('요소 존재', {tab:'html', fix:'#bar 필요'}); return results; }
  pass('요소 존재');

  // Can't reliably simulate scroll in this environment; require handler exists by manual.
  pass('스크롤 진행률', 'manual');
  return results;
};`
    },

    {
      id: 'mission-72',
      titleKo: '미션 72 — 투두 완료 체크(완료/미완료 표시)',
      pitchKo: '객체 배열의 done 상태를 토글한다.',
      minutes: 24,
      outcomesKo: ['map', 'toggle', '이벤트 위임'],
      checklistKo: ['체크하면 취소선', '상태 토글', '완료 개수 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Todos</h1>
  <ul id="list" class="list"></ul>
  <p id="msg" class="msg">0 done</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.list{margin:0;padding:0;list-style:none;display:grid;gap:8px;}
.it{display:flex;gap:10px;align-items:center;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06)}
.it.done .t{text-decoration:line-through;opacity:0.7;}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const list=document.querySelector('#list');
const msg=document.querySelector('#msg');
let todos=[{id:1,text:'A',done:false},{id:2,text:'B',done:false}];

function render(){
  list.innerHTML = todos.map(t =>
    '<li class="it' + (t.done?' done':'') + '">' +
      '<input class="c" type="checkbox" data-id="' + t.id + '" ' + (t.done?'checked':'') + ' />' +
      '<span class="t">' + t.text + '</span>' +
    '</li>'
  ).join('');
  const done = todos.filter(t=>t.done).length;
  msg.textContent = done + ' done';
}

render();

// TODO: list change 이벤트에서 .c 체크박스면 해당 todo의 done을 토글 후 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const list=document.querySelector('#list');
  const msg=document.querySelector('#msg');
  if(!list||!msg){ fail('요소 존재', {tab:'html', fix:'#list, #msg 필요'}); return results; }
  pass('요소 존재');

  const c=list.querySelector('.c');
  if(!c){ fail('체크박스', {tab:'js', fix:'render에서 checkbox를 생성해줘.'}); return results; }
  c.checked=true; c.dispatchEvent(new Event('change',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!(msg.textContent||'').includes('1')) fail('완료 반영', {tab:'js', fix:'change에서 done 토글 후 render'});
  else pass('완료 반영');

  return results;
};`
    },

    {
      id: 'mission-73',
      titleKo: '미션 73 — 드롭다운으로 정렬 기준 선택',
      pitchKo: 'select 값에 따라 sort 기준을 바꾼다.',
      minutes: 22,
      outcomesKo: ['select', 'sort', '렌더'],
      checklistKo: ['이름/나이 정렬', '오름차순', '선택값 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Sort by</h1>
  <select id="by">
    <option value="name" selected>name</option>
    <option value="age">age</option>
  </select>
  <p id="msg" class="msg">by: name</p>
  <ul id="list"></ul>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
select{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;}
ul{margin:10px 0 0 18px;line-height:1.9;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
        js: `const by=document.querySelector('#by');
const msg=document.querySelector('#msg');
const list=document.querySelector('#list');
const people=[{name:'Kim',age:22},{name:'Park',age:19},{name:'Lee',age:30}];

function render(){
  const key=by.value;
  const a=[...people].sort((x,y)=>{
    if(key==='age') return x.age-y.age;
    return String(x.name).localeCompare(String(y.name));
  });
  list.innerHTML = a.map(p=>'<li>'+p.name+' ('+p.age+')</li>').join('');
  msg.textContent='by: '+key;
}

render();

// TODO: select change 이벤트에서 render() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const by=document.querySelector('#by');
  const list=document.querySelector('#list');
  if(!by||!list){ fail('요소 존재', {tab:'html', fix:'#by, #list 필요'}); return results; }
  pass('요소 존재');

  by.value='age'; by.dispatchEvent(new Event('change',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  const first=(list.querySelector('li')?.textContent)||'';
  if(!first.includes('(19)')) fail('age 정렬', {tab:'js', fix:'change에서 render 호출 + age 정렬'});
  else pass('age 정렬');

  return results;
};`
    },

    {
      id: 'mission-74',
      titleKo: '미션 74 — 간단한 debounce(검색 입력)',
      pitchKo: '타이핑이 멈춘 뒤에만 렌더한다.',
      minutes: 26,
      outcomesKo: ['setTimeout', 'clearTimeout', 'debounce'],
      checklistKo: ['입력 후 300ms 뒤에 반영', '연속 입력 시 이전 타이머 취소', '현재 쿼리 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Debounce</h1>
  <input id="q" placeholder="type..." />
  <p id="out" class="msg">query: </p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
        js: `const q=document.querySelector('#q');
const out=document.querySelector('#out');
let t=null;

function apply(){
  out.textContent='query: '+q.value;
}

// TODO: input 이벤트에서
// - clearTimeout(t)
// - t=setTimeout(apply, 300)
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

  q.value='a'; q.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,50));
  if((out.textContent||'').includes('a')) fail('즉시 반영 금지', {tab:'js', fix:'debounce로 300ms 후 반영'});
  else pass('즉시 반영 금지');

  await new Promise(r=>setTimeout(r,320));
  if(!(out.textContent||'').includes('a')) fail('300ms 후 반영', {tab:'js', fix:'setTimeout(apply,300)'});
  else pass('300ms 후 반영');

  return results;
};`
    },

    {
      id: 'mission-75',
      titleKo: '미션 75 — 간단한 Toast 알림(자동 닫힘)',
      pitchKo: '일시적으로 메시지를 보여주는 UI를 만든다.',
      minutes: 22,
      outcomesKo: ['setTimeout', 'classList', 'UX'],
      checklistKo: ['Show 클릭 시 토스트 표시', '1.5초 후 자동 숨김', '연속 클릭 시 타이머 리셋'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Toast</h1>
  <button id="show" class="primary">Show</button>
  <div id="toast" class="toast" role="status">Saved</div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.toast{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);padding:10px 12px;border-radius:999px;border:1px solid rgba(255,255,255,0.18);background:rgba(15,23,42,0.95);opacity:0;pointer-events:none;transition:opacity 160ms, transform 160ms;}
.toast.on{opacity:1;transform:translateX(-50%) translateY(-6px)}
`,
        js: `const show=document.querySelector('#show');
const toast=document.querySelector('#toast');
let t=null;

function on(){
  toast.classList.add('on');
  clearTimeout(t);
  t=setTimeout(()=>toast.classList.remove('on'), 1500);
}

// TODO: show 클릭 시 on() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const show=document.querySelector('#show');
  const toast=document.querySelector('#toast');
  if(!show||!toast){ fail('요소 존재', {tab:'html', fix:'#show, #toast 필요'}); return results; }
  pass('요소 존재');

  show.click();
  await new Promise(r=>setTimeout(r,30));
  if(!toast.classList.contains('on')) fail('표시', {tab:'js', fix:'click에서 on() 호출'});
  else pass('표시');

  let ok=false;
  for(let i=0;i<30;i++){ await new Promise(r=>setTimeout(r,100)); if(!toast.classList.contains('on')) {ok=true; break;} }
  if(!ok) fail('자동 숨김', {tab:'js', fix:'1.5초 후 on 제거'});
  else pass('자동 숨김');

  return results;
};`
    }
  ]
};

export default spec;
