const spec = {
  track: 'web',
  batch: '36-45',
  missions: [
    {
      id: 'mission-36',
      titleKo: '미션 36 — 드롭다운(select)으로 색 테마 바꾸기',
      pitchKo: 'select change 이벤트로 테마를 바꿔본다.',
      minutes: 16,
      outcomesKo: ['change 이벤트', 'select.value', 'classList'],
      checklistKo: ['테마 선택 시 body 클래스 변경', '선택값을 화면에 표시', '기본값은 dark'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Theme</h1>
  <select id="theme">
    <option value="dark" selected>dark</option>
    <option value="light">light</option>
    <option value="mint">mint</option>
  </select>
  <p id="now" class="msg">현재: dark</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;transition:background 200ms,color 200ms;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
select{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;}
.msg{opacity:0.9;margin:12px 0 0 0;}
body.light{background:#f8fafc;color:#0f172a;}
body.light select{background:#fff;color:#0f172a;border-color:#cbd5e1;}
body.mint{background:#062b2a;color:#d1fae5;}
`,
        js: `const theme=document.querySelector('#theme');
const now=document.querySelector('#now');

// TODO: theme change 시 document.body.className을 선택값으로 바꾸고
// now.textContent도 업데이트
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const theme=document.querySelector('#theme');
  const now=document.querySelector('#now');
  if(!theme||!now){ fail('요소 존재', {tab:'html', fix:'#theme select와 #now 필요'}); return results; }
  pass('요소 존재');

  theme.value='light'; theme.dispatchEvent(new Event('change',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!document.body.classList.contains('light')) fail('테마 클래스 변경', {tab:'js', fix:'change에서 body.classList를 업데이트해줘.'});
  else pass('테마 클래스 변경', 'light');

  if(!(now.textContent||'').includes('light')) fail('현재 테마 표시', {tab:'js', fix:'now.textContent에 선택값을 넣어줘.'});
  else pass('현재 테마 표시');

  return results;
};`
    },

    {
      id: 'mission-37',
      titleKo: '미션 37 — 더보기 버튼으로 리스트 3개씩 추가 로드',
      pitchKo: 'slice로 pagination 느낌을 만든다.',
      minutes: 20,
      outcomesKo: ['배열', 'slice', '버튼 상태'],
      checklistKo: ['More 클릭 시 3개씩 추가', '끝까지 가면 버튼 disabled', '현재 개수 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Load more</h1>
  <p id="count" class="msg">0 / 0</p>
  <ul id="list"></ul>
  <button id="more" class="primary">More</button>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 10px 0;font-size:28px;}
.msg{opacity:0.9;margin:0 0 12px 0;}
ul{margin:0 0 12px 18px;line-height:1.9;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
button:disabled{opacity:0.4;cursor:not-allowed;}
`,
        js: `const items = Array.from({length: 10}, (_,i)=>'Item '+(i+1));
const list=document.querySelector('#list');
const more=document.querySelector('#more');
const count=document.querySelector('#count');
let n=0;

function render(){
  const shown = items.slice(0, n);
  list.innerHTML = shown.map(x => '<li>' + x + '</li>').join('');
  count.textContent = shown.length + ' / ' + items.length;
  more.disabled = shown.length >= items.length;
}

render();

// TODO: More 클릭 시 n을 3 증가시키고 render() 호출 (최대 items.length)
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const more=document.querySelector('#more');
  const list=document.querySelector('#list');
  if(!more||!list){ fail('요소 존재', {tab:'html', fix:'#more, #list 필요'}); return results; }
  pass('요소 존재');

  const before=list.querySelectorAll('li').length;
  more.click();
  await new Promise(r=>setTimeout(r,40));
  const after=list.querySelectorAll('li').length;
  if(after <= before) fail('3개씩 추가 로드', {tab:'js', fix:'More 클릭 시 3개씩 늘려줘.'});
  else pass('3개씩 추가 로드', String(before)+'→'+String(after));

  // click until disabled
  for(let i=0;i<10;i++){ more.click(); await new Promise(r=>setTimeout(r,10)); }
  await new Promise(r=>setTimeout(r,40));
  if(!more.disabled) fail('끝나면 disabled', {tab:'js', fix:'전부 표시되면 more.disabled=true'});
  else pass('끝나면 disabled');

  return results;
};`
    },

    {
      id: 'mission-38',
      titleKo: '미션 38 — 토글 스위치 만들기(ON/OFF)',
      pitchKo: 'boolean 상태 하나로 UI를 토글한다.',
      minutes: 14,
      outcomesKo: ['boolean', 'classList.toggle', '상태 표시'],
      checklistKo: ['클릭 시 ON/OFF 토글', '상태 문구 변경', '스위치 스타일 변경'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Toggle</h1>
  <button id="sw" class="sw">OFF</button>
  <p id="state" class="msg">현재: OFF</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center;}
.h1{margin:0 0 14px 0;font-size:28px;}
.sw{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:12px 18px;border-radius:999px;cursor:pointer;min-width:110px;}
.sw.on{background:rgba(34,197,94,0.18);border-color:rgba(34,197,94,0.35);}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const sw=document.querySelector('#sw');
const state=document.querySelector('#state');
let on=false;

function render(){
  sw.textContent = on ? 'ON' : 'OFF';
  state.textContent = '현재: ' + (on ? 'ON' : 'OFF');
  sw.classList.toggle('on', on);
}

render();

// TODO: sw 클릭 시 on을 토글하고 render() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const sw=document.querySelector('#sw');
  const state=document.querySelector('#state');
  if(!sw||!state){ fail('요소 존재', {tab:'html', fix:'#sw와 #state 필요'}); return results; }
  pass('요소 존재');
  const before=sw.textContent.trim();
  sw.click();
  await new Promise(r=>setTimeout(r,30));
  const after=sw.textContent.trim();
  if(after===before) fail('클릭 시 토글', {tab:'js', fix:'클릭에서 on=!on; render();'});
  else pass('클릭 시 토글', String(before)+'→'+String(after));
  return results;
};`
    },

    {
      id: 'mission-39',
      titleKo: '미션 39 — 숫자 입력 검증(1~10) + 에러 표시',
      pitchKo: '조건문으로 입력을 검증하고 메시지를 보여준다.',
      minutes: 18,
      outcomesKo: ['Number()', '조건문', '에러 UI'],
      checklistKo: ['1~10이면 OK', '범위 밖이면 에러', '빈 값이면 안내'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Validate</h1>
  <input id="n" placeholder="1~10" />
  <p id="msg" class="msg">값을 입력해줘</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.msg{opacity:0.9;margin:12px 0 0 0;}
.msg.err{color:#fb7185;}
.msg.ok{color:#86efac;}
`,
        js: `const n=document.querySelector('#n');
const msg=document.querySelector('#msg');

function set(text, kind){
  msg.textContent=text;
  msg.classList.toggle('err', kind==='err');
  msg.classList.toggle('ok', kind==='ok');
}

set('값을 입력해줘');

// TODO: input 이벤트에서
// - 빈 값이면 안내
// - 1~10이면 OK
// - 아니면 에러
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const nEl=document.querySelector('#n');
  const msg=document.querySelector('#msg');
  if(!nEl||!msg){ fail('요소 존재', {tab:'html', fix:'#n, #msg 필요'}); return results; }
  pass('요소 존재');

  nEl.value='5'; nEl.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!msg.classList.contains('ok')) fail('범위 OK', {tab:'js', fix:'1~10이면 ok 클래스를 붙여줘.'});
  else pass('범위 OK');

  nEl.value='99'; nEl.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!msg.classList.contains('err')) fail('범위 밖 에러', {tab:'js', fix:'범위 밖이면 err 클래스를 붙여줘.'});
  else pass('범위 밖 에러');

  return results;
};`
    },

    {
      id: 'mission-40',
      titleKo: '미션 40 — 간단한 정렬 버튼(오름/내림)',
      pitchKo: 'sort로 정렬을 바꾼다.',
      minutes: 20,
      outcomesKo: ['Array.sort', '렌더', '상태 유지'],
      checklistKo: ['오름차순 정렬', '내림차순 정렬', '현재 정렬 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Sort</h1>
  <div class="row">
    <button id="asc" class="primary">ASC</button>
    <button id="desc">DESC</button>
  </div>
  <p id="mode" class="msg">mode: asc</p>
  <ul id="list"></ul>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);}
.h1{margin:0 0 10px 0;font-size:28px;}
.row{display:flex;gap:8px;margin-bottom:10px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:0 0 10px 0;}
ul{margin:0 0 0 18px;line-height:1.9;}
`,
        js: `const nums=[7,1,9,3,5];
const list=document.querySelector('#list');
const mode=document.querySelector('#mode');
const asc=document.querySelector('#asc');
const desc=document.querySelector('#desc');
let dir='asc';

function render(){
  const a=[...nums].sort((x,y)=>dir==='asc'? x-y : y-x);
  list.innerHTML = a.map(n => '<li>' + n + '</li>').join('');
  mode.textContent='mode: '+dir;
}

render();

// TODO: 버튼 클릭 시 dir 바꾸고 render() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const asc=document.querySelector('#asc');
  const desc=document.querySelector('#desc');
  const list=document.querySelector('#list');
  if(!asc||!desc||!list){ fail('요소 존재', {tab:'html', fix:'#asc #desc #list 필요'}); return results; }
  pass('요소 존재');
  desc.click();
  await new Promise(r=>setTimeout(r,40));
  const vals=[...list.querySelectorAll('li')].map(x=>Number(x.textContent.trim()));
  if(vals.length<3) fail('리스트 렌더', {tab:'js', fix:'render()에서 li를 만들어줘.'});
  else if(!(vals[0] >= vals[1])) fail('DESC 정렬', {tab:'js', fix:'desc 클릭 시 내림차순'});
  else pass('DESC 정렬', vals.join(','));
  return results;
};`
    },

    {
      id: 'mission-41',
      titleKo: '미션 41 — fetch로 랜덤 명언 가져오기(실패 처리)',
      pitchKo: 'fetch/async 흐름과 에러 처리를 익힌다.',
      minutes: 24,
      outcomesKo: ['fetch', 'async/await', '에러 처리'],
      checklistKo: ['버튼 클릭 시 로딩 표시', '성공 시 문구 표시', '실패 시 에러 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Quote</h1>
  <button id="btn" class="primary">Get</button>
  <p id="out" class="msg">-</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const btn=document.querySelector('#btn');
const out=document.querySelector('#out');

// TODO: 클릭하면 out에 'Loading...'을 먼저 보여주고,
// https://api.quotable.io/random 에서 content를 받아 표시해.
// 실패하면 out에 'Error' 표시.
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn=document.querySelector('#btn');
  const out=document.querySelector('#out');
  if(!btn||!out){ fail('요소 존재', {tab:'html', fix:'#btn, #out 필요'}); return results; }
  pass('요소 존재');

  btn.click();
  await new Promise(r=>setTimeout(r,50));
  const t=(out.textContent||'').trim();
  if(!t) fail('클릭 시 출력', {tab:'js', fix:'클릭 후 out.textContent가 바뀌어야 해.'});
  else pass('클릭 시 출력', t.slice(0,30));

  return results;
};`
    },

    {
      id: 'mission-42',
      titleKo: '미션 42 — 로딩 스피너 표시/숨김',
      pitchKo: '비동기 작업 중 상태 표시를 만든다.',
      minutes: 16,
      outcomesKo: ['classList', '상태', 'setTimeout'],
      checklistKo: ['Start 누르면 spinner 표시', '2초 후 숨김', '중복 시작 방지'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Spinner</h1>
  <button id="start" class="primary">Start</button>
  <div id="spin" class="spin" aria-label="spinner"></div>
  <p id="msg" class="msg">-</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center;}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.spin{width:46px;height:46px;border-radius:50%;border:6px solid rgba(255,255,255,0.15);border-top-color:#ffd43b;margin:14px auto;display:none;animation:rot 0.9s linear infinite;}
.spin.on{display:block;}
@keyframes rot{to{transform:rotate(360deg)}}
.msg{opacity:0.9;margin:0;}
`,
        js: `const start=document.querySelector('#start');
const spin=document.querySelector('#spin');
const msg=document.querySelector('#msg');
let busy=false;

// TODO: Start 클릭 시 busy면 무시.
// 아니면 spin.on을 켜고 msg='Loading...'
// 2초 후 spin.on 끄고 msg='Done'\n`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const start=document.querySelector('#start');
  const spin=document.querySelector('#spin');
  if(!start||!spin){ fail('요소 존재', {tab:'html', fix:'#start, #spin 필요'}); return results; }
  pass('요소 존재');

  start.click();
  await new Promise(r=>setTimeout(r,50));
  if(!spin.classList.contains('on')) fail('스피너 표시', {tab:'js', fix:'Start 클릭 시 spin.classList.add("on")'});
  else pass('스피너 표시');

  // wait for hide
  let ok=false;
  for(let i=0;i<30;i++){ await new Promise(r=>setTimeout(r,100)); if(!spin.classList.contains('on')) {ok=true; break;} }
  if(!ok) fail('2초 후 숨김', {tab:'js', fix:'2초 후 spin.classList.remove("on")'});
  else pass('2초 후 숨김');

  return results;
};`
    },

    {
      id: 'mission-43',
      titleKo: '미션 43 — 복사 버튼(클립보드) + 성공 메시지',
      pitchKo: 'clipboard API를 경험한다.',
      minutes: 18,
      outcomesKo: ['navigator.clipboard', 'async', 'UX 메시지'],
      checklistKo: ['Copy 클릭 시 복사 시도', '성공 메시지 표시', '실패 메시지 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Copy</h1>
  <code id="code" class="code">HELLO-123</code>
  <button id="copy" class="primary">Copy</button>
  <p id="msg" class="msg">-</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
.code{display:inline-block;padding:8px 10px;border:1px solid rgba(255,255,255,0.18);border-radius:12px;background:rgba(255,255,255,0.06);}
button{margin-left:10px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const copy=document.querySelector('#copy');
const code=document.querySelector('#code');
const msg=document.querySelector('#msg');

// TODO: 클릭 시 navigator.clipboard.writeText(code.textContent)
// 성공하면 msg='Copied!', 실패하면 msg='Error'
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const copy=document.querySelector('#copy');
  const msg=document.querySelector('#msg');
  if(!copy||!msg){ fail('요소 존재', {tab:'html', fix:'#copy, #msg 필요'}); return results; }
  pass('요소 존재');
  copy.click();
  await new Promise(r=>setTimeout(r,50));
  if(!(msg.textContent||'').trim()) fail('클릭 시 메시지', {tab:'js', fix:'성공/실패 메시지를 표시해줘.'});
  else pass('클릭 시 메시지', (msg.textContent||'').trim());
  return results;
};`
    },

    {
      id: 'mission-44',
      titleKo: '미션 44 — 간단한 마우스 좌표 트래커',
      pitchKo: 'mousemove 이벤트를 써본다.',
      minutes: 16,
      outcomesKo: ['mousemove', 'event.clientX/Y', '렌더'],
      checklistKo: ['마우스 움직이면 좌표 표시', '좌표 박스 스타일', '초기 문구 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Mouse</h1>
  <div id="box" class="box">move mouse</div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
.box{border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);padding:14px;border-radius:14px;min-height:44px;}
`,
        js: `const box=document.querySelector('#box');

// TODO: window mousemove에서 좌표를 읽어 box.textContent를 업데이트
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const box=document.querySelector('#box');
  if(!box){ fail('요소 존재', {tab:'html', fix:'#box 필요'}); return results; }
  pass('요소 존재');

  window.dispatchEvent(new MouseEvent('mousemove',{clientX:12, clientY:34, bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!(box.textContent||'').includes('12') && !(box.textContent||'').includes('34')) fail('좌표 표시', {tab:'js', fix:'mousemove에서 box.textContent를 업데이트해줘.'});
  else pass('좌표 표시', (box.textContent||'').slice(0,30));

  return results;
};`
    },

    {
      id: 'mission-45',
      titleKo: '미션 45 — 미니 폼 검증(이름/이메일) + submit 막기',
      pitchKo: 'submit 이벤트와 preventDefault를 익힌다.',
      minutes: 24,
      outcomesKo: ['form submit', 'preventDefault', '검증'],
      checklistKo: ['이름/이메일 유효하면 OK', '유효하지 않으면 에러', 'submit 시 새로고침 방지'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Form</h1>
  <form id="f">
    <input id="name" placeholder="name" />
    <input id="email" placeholder="email" />
    <button id="send" class="primary" type="submit">Send</button>
  </form>
  <p id="msg" class="msg">-</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
form{display:grid;gap:10px;}
input{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
.msg.err{color:#fb7185;}
.msg.ok{color:#86efac;}
`,
        js: `const f=document.querySelector('#f');
const nameEl=document.querySelector('#name');
const email=document.querySelector('#email');
const msg=document.querySelector('#msg');

function set(text, kind){
  msg.textContent=text;
  msg.classList.toggle('err', kind==='err');
  msg.classList.toggle('ok', kind==='ok');
}

// TODO: submit 이벤트에서 preventDefault
// - 이름 2글자 이상, 이메일에 @ 포함이면 OK
// - 아니면 에러
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const f=document.querySelector('#f');
  const nameEl=document.querySelector('#name');
  const email=document.querySelector('#email');
  const msg=document.querySelector('#msg');
  if(!f||!nameEl||!email||!msg){ fail('요소 존재', {tab:'html', fix:'#f #name #email #msg 필요'}); return results; }
  pass('요소 존재');

  nameEl.value='ab'; email.value='a@b.com';
  f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!msg.classList.contains('ok')) fail('유효하면 OK', {tab:'js', fix:'유효성 통과 시 ok 클래스를 붙여줘.'});
  else pass('유효하면 OK');

  nameEl.value='a'; email.value='nope';
  f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!msg.classList.contains('err')) fail('유효하지 않으면 에러', {tab:'js', fix:'유효성 실패 시 err 클래스를 붙여줘.'});
  else pass('유효하지 않으면 에러');

  return results;
};`
    }
  ]
};

export default spec;
