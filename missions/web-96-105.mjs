const spec = {
  track: 'web',
  batch: '96-105',
  missions: [
    {
      id: 'mission-96',
      titleKo: '미션 96 — 랜덤 비밀번호 생성기',
      pitchKo: '랜덤으로 문자열을 생성하고 화면에 보여준다.',
      minutes: 22,
      outcomesKo: ['Math.random', '문자열', '배열'],
      checklistKo: ['Generate 클릭 시 12자 비밀번호 생성', '대문자/소문자/숫자 포함', '복사 버튼(선택)'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Password</h1>
  <button id="gen" class="primary">Generate</button>
  <code id="out" class="out">-</code>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.out{display:inline-block;margin-top:12px;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06)}
`,
        js: `const gen=document.querySelector('#gen');
const out=document.querySelector('#out');

const U='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const L='abcdefghijklmnopqrstuvwxyz';
const D='0123456789';
const ALL=U+L+D;

function pick(s){
  return s[Math.floor(Math.random()*s.length)];
}

function make(){
  // TODO: 12자 만들기. 최소 1개씩 U/L/D 포함.
  return '-';
}

// TODO: gen 클릭 시 out.textContent=make()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const gen=document.querySelector('#gen');
  const out=document.querySelector('#out');
  if(!gen||!out){ fail('요소 존재', {tab:'html', fix:'#gen #out 필요'}); return results; }
  pass('요소 존재');

  gen.click();
  await new Promise(r=>setTimeout(r,30));
  const t=(out.textContent||'').trim();
  if(!t || t==='-') fail('생성', {tab:'js', fix:'make() 구현하고 click에서 out 업데이트'});
  else pass('생성', t);

  return results;
};`
    },

    {
      id: 'mission-97',
      titleKo: '미션 97 — 간단한 환율 계산기(고정 환율)',
      pitchKo: '입력값에 환율을 곱해서 변환한다.',
      minutes: 18,
      outcomesKo: ['Number()', 'toFixed', 'input'],
      checklistKo: ['KRW 입력 시 USD 출력', '빈 값 처리', '소수점 2자리'],
      defaults: {
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
      },
      testsJs: `window.__learnRunTests = async function(){
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
};`
    },

    {
      id: 'mission-98',
      titleKo: '미션 98 — 간단한 팔로우 버튼(optimistic UI)',
      pitchKo: '상태를 즉시 바꾸고 500ms 후 “서버 응답”을 처리한다.',
      minutes: 24,
      outcomesKo: ['상태', 'setTimeout', 'disabled'],
      checklistKo: ['클릭 즉시 Follow/Following 토글', '로딩 중 disabled', '완료 메시지'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Follow</h1>
  <button id="btn" class="primary">Follow</button>
  <p id="msg" class="msg">-</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(34,197,94,0.18); border-color: rgba(34,197,94,0.35)}
button:disabled{opacity:0.45;cursor:not-allowed;}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const btn=document.querySelector('#btn');
const msg=document.querySelector('#msg');
let following=false;
let busy=false;

function render(){
  btn.textContent = following ? 'Following' : 'Follow';
  btn.disabled = busy;
  msg.textContent = busy ? 'Saving...' : '-';
}

render();

// TODO: btn 클릭 시 busy=true; following 토글; render();
// 500ms 후 busy=false; msg='Saved'로 표시(그리고 render)
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn=document.querySelector('#btn');
  const msg=document.querySelector('#msg');
  if(!btn||!msg){ fail('요소 존재', {tab:'html', fix:'#btn #msg 필요'}); return results; }
  pass('요소 존재');

  const before=btn.textContent;
  btn.click();
  await new Promise(r=>setTimeout(r,30));
  const after=btn.textContent;
  if(after===before) fail('즉시 토글', {tab:'js', fix:'클릭 즉시 following 토글 + render'});
  else pass('즉시 토글');

  return results;
};`
    },

    {
      id: 'mission-99',
      titleKo: '미션 99 — 간단한 수식 계산기(+ - * /)',
      pitchKo: '연산자를 선택해서 계산한다.',
      minutes: 22,
      outcomesKo: ['select', 'switch', 'Number'],
      checklistKo: ['a/b 입력 + op 선택', 'Calc 클릭 시 결과 표시', '0으로 나누기 처리'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Calc</h1>
  <div class="row">
    <input id="a" placeholder="a" />
    <select id="op">
      <option value="+">+</option>
      <option value="-">-</option>
      <option value="*">*</option>
      <option value="/">/</option>
    </select>
    <input id="b" placeholder="b" />
  </div>
  <button id="go" class="primary">Calc</button>
  <p id="out" class="big">0</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:grid;grid-template-columns:1fr 80px 1fr;gap:8px;}
input,select{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
button{margin-top:10px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.big{font-size:44px;margin:12px 0 0 0;text-align:center;}
`,
        js: `const a=document.querySelector('#a');
const b=document.querySelector('#b');
const op=document.querySelector('#op');
const go=document.querySelector('#go');
const out=document.querySelector('#out');

function calc(){
  const x=Number(a.value);
  const y=Number(b.value);
  if(!Number.isFinite(x) || !Number.isFinite(y)) return '0';
  switch(op.value){
    case '+': return String(x+y);
    case '-': return String(x-y);
    case '*': return String(x*y);
    case '/': return y===0 ? 'Error' : String(x/y);
  }
  return '0';
}

// TODO: go 클릭 시 out.textContent=calc()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const go=document.querySelector('#go');
  const a=document.querySelector('#a');
  const b=document.querySelector('#b');
  const out=document.querySelector('#out');
  if(!go||!a||!b||!out){ fail('요소 존재', {tab:'html', fix:'#go #a #b #out 필요'}); return results; }
  pass('요소 존재');

  a.value='2'; b.value='3';
  go.click();
  await new Promise(r=>setTimeout(r,30));
  if((out.textContent||'').trim()==='0') fail('계산', {tab:'js', fix:'go 클릭에서 out 갱신'});
  else pass('계산', out.textContent.trim());

  return results;
};`
    },

    {
      id: 'mission-100',
      titleKo: '미션 100 — 간단한 데이터 정렬/필터 조합',
      pitchKo: '필터 후 정렬 흐름을 만들고 렌더한다.',
      minutes: 26,
      outcomesKo: ['filter', 'sort', '상태'],
      checklistKo: ['검색어로 필터', '가격 오름차순 정렬', '결과 카운트'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Filter + Sort</h1>
  <input id="q" placeholder="search" />
  <p id="msg" class="msg">-</p>
  <ul id="list"></ul>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
ul{margin:10px 0 0 18px;line-height:1.9;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
        js: `const q=document.querySelector('#q');
const msg=document.querySelector('#msg');
const list=document.querySelector('#list');
const items=[
  {name:'Apple', price:3},
  {name:'Banana', price:1},
  {name:'Cherry', price:5},
  {name:'Grape', price:2}
];

function render(){
  const s=(q.value||'').trim().toLowerCase();
  const shown = items
    .filter(it => it.name.toLowerCase().includes(s))
    .sort((a,b)=>a.price-b.price);
  list.innerHTML = shown.map(it=>'<li>'+it.name+' $'+it.price+'</li>').join('');
  msg.textContent = shown.length + ' items';
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
  const list=document.querySelector('#list');
  if(!q||!list){ fail('요소 존재', {tab:'html', fix:'#q #list 필요'}); return results; }
  pass('요소 존재');

  q.value='a'; q.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(list.querySelectorAll('li').length<1) fail('렌더', {tab:'js', fix:'input에서 render 호출'});
  else pass('렌더');

  return results;
};`
    },

    {
      id: 'mission-101',
      titleKo: '미션 101 — 간단한 드롭다운 메뉴 열고 닫기',
      pitchKo: '버튼 클릭/바깥 클릭으로 메뉴를 제어한다.',
      minutes: 24,
      outcomesKo: ['classList', '이벤트', 'outside click'],
      checklistKo: ['버튼 클릭으로 열기/닫기', '바깥 클릭으로 닫기', '현재 선택 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Dropdown</h1>
  <button id="btn" class="primary">Menu</button>
  <div id="menu" class="menu">
    <button class="it" data-v="One">One</button>
    <button class="it" data-v="Two">Two</button>
  </div>
  <p id="msg" class="msg">selected: -</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center;position:relative}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.menu{position:absolute;left:50%;transform:translateX(-50%);top:90px;display:none;flex-direction:column;gap:6px;padding:10px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(15,23,42,0.95);}
.menu.on{display:flex;}
.it{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.18)}
.msg{opacity:0.9;margin:120px 0 0 0;}
`,
        js: `const btn=document.querySelector('#btn');
const menu=document.querySelector('#menu');
const msg=document.querySelector('#msg');
let open=false;

function render(){
  menu.classList.toggle('on', open);
}
render();

// TODO:
// - btn 클릭 시 open 토글 후 render
// - window click에서 menu/btn 밖 클릭이면 open=false 후 render
// - menu 클릭에서 .it이면 msg 업데이트 + open=false 후 render
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn=document.querySelector('#btn');
  const menu=document.querySelector('#menu');
  if(!btn||!menu){ fail('요소 존재', {tab:'html', fix:'#btn #menu 필요'}); return results; }
  pass('요소 존재');

  btn.click();
  await new Promise(r=>setTimeout(r,30));
  if(!menu.classList.contains('on')) fail('열기', {tab:'js', fix:'btn 클릭 시 open 토글'});
  else pass('열기');

  return results;
};`
    },

    {
      id: 'mission-102',
      titleKo: '미션 102 — 간단한 CSV 테이블 렌더',
      pitchKo: 'CSV 문자열을 파싱해 테이블로 보여준다.',
      minutes: 26,
      outcomesKo: ['split', 'map', 'DOM'],
      checklistKo: ['Parse 클릭 시 테이블 생성', '헤더/바디 분리', '빈 줄 무시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">CSV</h1>
  <textarea id="csv" rows="5">name,age\nKim,22\nLee,30</textarea>
  <button id="go" class="primary">Parse</button>
  <div id="out"></div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
textarea{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;resize:vertical;}
button{margin-top:10px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
table{width:100%;border-collapse:collapse;margin-top:12px;}
th,td{border:1px solid rgba(255,255,255,0.18);padding:8px 10px;}
`,
        js: `const csv=document.querySelector('#csv');
const go=document.querySelector('#go');
const out=document.querySelector('#out');

function parse(text){
  return text
    .split('\n')
    .map(l=>l.trim())
    .filter(Boolean)
    .map(l=>l.split(',').map(x=>x.trim()));
}

// TODO: go 클릭 시
// - rows=parse(csv.value)
// - 첫 줄을 헤더로 th 생성
// - 나머지 줄을 td로 생성해서 table을 out에 렌더
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const go=document.querySelector('#go');
  const out=document.querySelector('#out');
  if(!go||!out){ fail('요소 존재', {tab:'html', fix:'#go #out 필요'}); return results; }
  pass('요소 존재');

  go.click();
  await new Promise(r=>setTimeout(r,30));
  if(!out.querySelector('table')) fail('테이블 렌더', {tab:'js', fix:'go 클릭 시 table을 만들어 out에 넣어줘.'});
  else pass('테이블 렌더');

  return results;
};`
    },

    {
      id: 'mission-103',
      titleKo: '미션 103 — 간단한 복권 번호 생성기(1~45 중 6개)',
      pitchKo: '중복 없이 랜덤 숫자를 뽑아 정렬한다.',
      minutes: 22,
      outcomesKo: ['Set', 'Math.random', 'sort'],
      checklistKo: ['Generate 클릭 시 6개 생성', '중복 없음', '오름차순 정렬'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Lotto</h1>
  <button id="gen" class="primary">Generate</button>
  <p id="out" class="big">-</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.big{font-size:34px;margin:14px 0 0 0;}
`,
        js: `const gen=document.querySelector('#gen');
const out=document.querySelector('#out');

function make(){
  // TODO: Set으로 중복 없이 1~45 6개 생성 후 오름차순 정렬
  return [];
}

// TODO: gen 클릭 시 out.textContent = make().join(', ')
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const gen=document.querySelector('#gen');
  const out=document.querySelector('#out');
  if(!gen||!out){ fail('요소 존재', {tab:'html', fix:'#gen #out 필요'}); return results; }
  pass('요소 존재');

  gen.click();
  await new Promise(r=>setTimeout(r,30));
  const t=(out.textContent||'').trim();
  if(!t || t==='-') fail('생성', {tab:'js', fix:'make 구현 후 out 업데이트'});
  else pass('생성', t);

  return results;
};`
    },

    {
      id: 'mission-104',
      titleKo: '미션 104 — 간단한 fetch 재시도(최대 3번)',
      pitchKo: '실패 시 재시도하는 흐름을 만든다.',
      minutes: 28,
      outcomesKo: ['async/await', 'try/catch', '루프'],
      checklistKo: ['Load 클릭 시 시도 횟수 표시', '성공하면 OK', '3번 실패하면 Error'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Retry</h1>
  <button id="load" class="primary">Load</button>
  <p id="msg" class="msg">-</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const load=document.querySelector('#load');
const msg=document.querySelector('#msg');

async function run(){
  // TODO: 최대 3번 시도
  // 각 시도마다 msg='Try 1' 같은 표시
  // fetch('https://api.quotable.io/random') 성공하면 msg='OK'
  // 실패가 계속되면 msg='Error'
}

// TODO: load 클릭 시 run() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const load=document.querySelector('#load');
  const msg=document.querySelector('#msg');
  if(!load||!msg){ fail('요소 존재', {tab:'html', fix:'#load #msg 필요'}); return results; }
  pass('요소 존재');

  load.click();
  await new Promise(r=>setTimeout(r,50));
  if(!(msg.textContent||'').trim()) fail('시도 표시', {tab:'js', fix:'클릭 후 msg를 먼저 업데이트해줘.'});
  else pass('시도 표시', msg.textContent.trim());

  return results;
};`
    },

    {
      id: 'mission-105',
      titleKo: '미션 105 — 간단한 메모 앱(추가 + localStorage 저장)',
      pitchKo: '배열을 저장/로드하며 리스트를 유지한다.',
      minutes: 28,
      outcomesKo: ['localStorage', 'JSON', '배열'],
      checklistKo: ['Add로 메모 추가', '새로고침 후 유지', '삭제 버튼(선택)'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Memo</h1>
  <div class="row">
    <input id="in" placeholder="memo" />
    <button id="add" class="primary">Add</button>
  </div>
  <ul id="list"></ul>
  <p id="msg" class="msg">-</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:8px;}
input{flex:1;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
ul{margin:12px 0 0 18px;line-height:1.9;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
        js: `const input=document.querySelector('#in');
const add=document.querySelector('#add');
const list=document.querySelector('#list');
const msg=document.querySelector('#msg');
const KEY='learn.memos';
let memos=[];

function save(){
  localStorage.setItem(KEY, JSON.stringify(memos));
}

function load(){
  try{
    memos = JSON.parse(localStorage.getItem(KEY) || '[]');
    if(!Array.isArray(memos)) memos=[];
  }catch(e){
    memos=[];
  }
}

function render(){
  list.innerHTML = memos.map(t=>'<li>'+t+'</li>').join('');
  msg.textContent = memos.length + ' memos';
}

load();
render();

// TODO: add 클릭 시 v=input.value.trim()
// v 있으면 memos.push(v); save(); input.value=''; render();
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const input=document.querySelector('#in');
  const add=document.querySelector('#add');
  const list=document.querySelector('#list');
  if(!input||!add||!list){ fail('요소 존재', {tab:'html', fix:'#in #add #list 필요'}); return results; }
  pass('요소 존재');

  input.value='hi';
  add.click();
  await new Promise(r=>setTimeout(r,30));
  if(list.querySelectorAll('li').length<1) fail('추가', {tab:'js', fix:'add 클릭 시 memos push + save + render'});
  else pass('추가');

  return results;
};`
    }
  ]
};

export default spec;
