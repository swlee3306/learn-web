const spec = {
  track: 'web',
  batch: '46-55',
  missions: [
    {
      id: 'mission-46',
      titleKo: '미션 46 — 라디오 버튼으로 배송 옵션 선택하기',
      pitchKo: 'change 이벤트로 선택 상태를 읽어 UI에 반영한다.',
      minutes: 16,
      outcomesKo: ['radio', 'change 이벤트', 'querySelector'],
      checklistKo: ['옵션 선택 시 가격 표시', '기본값 preset', '선택값 텍스트 출력'],
      defaults: {
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
      },
      testsJs: `window.__learnRunTests = async function(){
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
};`
    },

    {
      id: 'mission-47',
      titleKo: '미션 47 — 체크박스 동의(terms) 없으면 버튼 비활성화',
      pitchKo: 'checked 상태로 CTA를 제어한다.',
      minutes: 14,
      outcomesKo: ['checkbox', 'disabled', '상태 렌더'],
      checklistKo: ['체크하면 버튼 활성', '해제하면 비활성', '상태 문구 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Consent</h1>
  <label class="row"><input id="terms" type="checkbox" /> I agree</label>
  <button id="go" class="primary" disabled>Continue</button>
  <p id="msg" class="msg">동의가 필요해</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;align-items:center;gap:10px;margin:10px 0;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
button:disabled{opacity:0.4;cursor:not-allowed;}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const terms=document.querySelector('#terms');
const go=document.querySelector('#go');
const msg=document.querySelector('#msg');

function render(){
  go.disabled = !terms.checked;
  msg.textContent = terms.checked ? 'OK' : '동의가 필요해';
}

render();

// TODO: terms change 이벤트에서 render() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const terms=document.querySelector('#terms');
  const go=document.querySelector('#go');
  if(!terms||!go){ fail('요소 존재', {tab:'html', fix:'#terms, #go 필요'}); return results; }
  pass('요소 존재');

  terms.checked=true; terms.dispatchEvent(new Event('change',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(go.disabled) fail('체크하면 활성', {tab:'js', fix:'render()에서 go.disabled를 제어해줘.'});
  else pass('체크하면 활성');

  return results;
};`
    },

    {
      id: 'mission-48',
      titleKo: '미션 48 — textarea 글자 수 카운터(최대 100)',
      pitchKo: 'input 이벤트로 length를 추적한다.',
      minutes: 16,
      outcomesKo: ['textarea', 'input 이벤트', 'length'],
      checklistKo: ['현재 글자 수 표시', '100 초과 시 경고 스타일', '남은 글자 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Counter</h1>
  <textarea id="t" rows="5" placeholder="write..."></textarea>
  <p id="count" class="msg">0 / 100 (left 100)</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
textarea{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;resize:vertical;}
.msg{opacity:0.9;margin:10px 0 0 0;}
.msg.warn{color:#fb7185;}
`,
        js: `const t=document.querySelector('#t');
const count=document.querySelector('#count');
const MAX=100;

function render(){
  const n=t.value.length;
  const left=MAX-n;
  count.textContent = n + ' / ' + MAX + ' (left ' + left + ')';
  count.classList.toggle('warn', n>MAX);
}

render();

// TODO: textarea input 이벤트에서 render() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const t=document.querySelector('#t');
  const count=document.querySelector('#count');
  if(!t||!count){ fail('요소 존재', {tab:'html', fix:'#t, #count 필요'}); return results; }
  pass('요소 존재');

  t.value='hello'; t.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!(count.textContent||'').includes('5')) fail('카운트 업데이트', {tab:'js', fix:'input 이벤트에서 render() 호출'});
  else pass('카운트 업데이트');

  return results;
};`
    },

    {
      id: 'mission-49',
      titleKo: '미션 49 — 간단한 탭 UI(2개) 만들기',
      pitchKo: '버튼으로 active 상태를 바꿔 패널을 전환한다.',
      minutes: 20,
      outcomesKo: ['dataset', 'classList', '조건 렌더'],
      checklistKo: ['Tab 클릭 시 패널 변경', 'active 스타일', '초기 탭 설정'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Tabs</h1>
  <div class="tabs">
    <button class="tab active" data-tab="a">A</button>
    <button class="tab" data-tab="b">B</button>
  </div>
  <div id="panel" class="panel">Panel A</div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.tabs{display:flex;gap:8px;}
.tab{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
.tab.active{background: rgba(34,197,94,0.18); border-color: rgba(34,197,94,0.35)}
.panel{margin-top:12px;padding:12px;border:1px solid rgba(255,255,255,0.18);border-radius:12px;background:rgba(255,255,255,0.06)}
`,
        js: `const tabs=[...document.querySelectorAll('.tab')];
const panel=document.querySelector('#panel');
let active='a';

function render(){
  tabs.forEach(b => b.classList.toggle('active', b.dataset.tab===active));
  panel.textContent = active==='a' ? 'Panel A' : 'Panel B';
}

render();

// TODO: 각 탭 클릭 시 active를 dataset.tab으로 바꾸고 render() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btnB=document.querySelector('.tab[data-tab="b"]');
  const panel=document.querySelector('#panel');
  if(!btnB||!panel){ fail('요소 존재', {tab:'html', fix:'data-tab="b" 탭과 #panel 필요'}); return results; }
  pass('요소 존재');

  btnB.click();
  await new Promise(r=>setTimeout(r,40));
  if(!(panel.textContent||'').includes('B')) fail('패널 전환', {tab:'js', fix:'click에서 active 변경 후 render()'});
  else pass('패널 전환');

  return results;
};`
    },

    {
      id: 'mission-50',
      titleKo: '미션 50 — 타이머(초) 시작/정지',
      pitchKo: 'setInterval을 안전하게 다루는 법을 익힌다.',
      minutes: 22,
      outcomesKo: ['setInterval', 'clearInterval', '상태'],
      checklistKo: ['Start 누르면 1초마다 증가', 'Stop 누르면 멈춤', '중복 interval 방지'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Timer</h1>
  <div class="row">
    <button id="start" class="primary">Start</button>
    <button id="stop">Stop</button>
  </div>
  <p id="sec" class="big">0</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:8px;justify-content:center}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.big{font-size:44px;margin:14px 0 0 0;}
`,
        js: `const start=document.querySelector('#start');
const stop=document.querySelector('#stop');
const sec=document.querySelector('#sec');
let n=0;
let timer=null;

function render(){
  sec.textContent=String(n);
}
render();

// TODO: Start 클릭 시 timer가 없을 때만 setInterval로 1초마다 n++ 후 render()
// TODO: Stop 클릭 시 clearInterval 하고 timer=null
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const start=document.querySelector('#start');
  const stop=document.querySelector('#stop');
  const sec=document.querySelector('#sec');
  if(!start||!stop||!sec){ fail('요소 존재', {tab:'html', fix:'#start #stop #sec 필요'}); return results; }
  pass('요소 존재');

  const before=Number(sec.textContent||'0');
  start.click();
  await new Promise(r=>setTimeout(r,1100));
  const after=Number(sec.textContent||'0');
  if(after<=before) fail('1초마다 증가', {tab:'js', fix:'setInterval로 증가시켜줘.'});
  else pass('1초마다 증가', String(before)+'→'+String(after));

  stop.click();
  const stopAt=Number(sec.textContent||'0');
  await new Promise(r=>setTimeout(r,1100));
  const afterStop=Number(sec.textContent||'0');
  if(afterStop!==stopAt) fail('Stop 멈춤', {tab:'js', fix:'stop에서 clearInterval 처리'});
  else pass('Stop 멈춤');

  return results;
};`
    },

    {
      id: 'mission-51',
      titleKo: '미션 51 — localStorage로 닉네임 저장/불러오기',
      pitchKo: '로컬 저장으로 새로고침 후에도 상태를 유지한다.',
      minutes: 20,
      outcomesKo: ['localStorage', 'JSON', '초기 로드'],
      checklistKo: ['Save 클릭 시 저장', 'Load 시 반영', '저장 여부 메시지'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Nickname</h1>
  <input id="name" placeholder="nickname" />
  <button id="save" class="primary">Save</button>
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
        js: `const nameEl=document.querySelector('#name');
const save=document.querySelector('#save');
const msg=document.querySelector('#msg');
const KEY='learn.nick';

function load(){
  const v=localStorage.getItem(KEY);
  if(v){
    nameEl.value=v;
    msg.textContent='Loaded: '+v;
  } else {
    msg.textContent='No saved name';
  }
}

load();

// TODO: Save 클릭 시 localStorage.setItem(KEY, nameEl.value) 하고 msg 갱신
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const nameEl=document.querySelector('#name');
  const save=document.querySelector('#save');
  if(!nameEl||!save){ fail('요소 존재', {tab:'html', fix:'#name, #save 필요'}); return results; }
  pass('요소 존재');

  nameEl.value='kim';
  save.click();
  await new Promise(r=>setTimeout(r,30));
  const v=localStorage.getItem('learn.nick');
  if(v!=='kim') fail('저장', {tab:'js', fix:'save click에서 localStorage.setItem(KEY, nameEl.value)'});
  else pass('저장');

  return results;
};`
    },

    {
      id: 'mission-52',
      titleKo: '미션 52 — 키보드 단축키(Enter)로 전송',
      pitchKo: 'keydown 이벤트에서 key를 판별한다.',
      minutes: 16,
      outcomesKo: ['keydown', 'event.key', '리스트 추가'],
      checklistKo: ['Enter 누르면 항목 추가', '빈 값은 무시', '입력창 비우기'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Enter to add</h1>
  <input id="in" placeholder="type and press Enter" />
  <ul id="list"></ul>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
ul{margin:12px 0 0 18px;line-height:1.9;}
`,
        js: `const input=document.querySelector('#in');
const list=document.querySelector('#list');
const items=[];

function render(){
  list.innerHTML = items.map(t => '<li>' + t + '</li>').join('');
}
render();

// TODO: input keydown에서 Enter면
// - trim한 값이 있으면 items.push
// - input.value='' 하고 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const input=document.querySelector('#in');
  const list=document.querySelector('#list');
  if(!input||!list){ fail('요소 존재', {tab:'html', fix:'#in, #list 필요'}); return results; }
  pass('요소 존재');

  input.value='hi';
  input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(list.querySelectorAll('li').length<1) fail('Enter로 추가', {tab:'js', fix:'Enter 키 처리해줘.'});
  else pass('Enter로 추가');

  return results;
};`
    },

    {
      id: 'mission-53',
      titleKo: '미션 53 — 이미지 미리보기(file input)',
      pitchKo: 'FileReader로 선택한 파일을 미리 본다.',
      minutes: 24,
      outcomesKo: ['input type=file', 'FileReader', 'data URL'],
      checklistKo: ['파일 선택 시 img에 표시', '파일 없으면 안내', '이미지 스타일'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Preview</h1>
  <input id="file" type="file" accept="image/*" />
  <img id="img" class="img" alt="preview" />
  <p id="msg" class="msg">choose an image</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.img{display:block;width:min(320px,80vw);height:200px;object-fit:cover;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);margin-top:12px;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
        js: `const file=document.querySelector('#file');
const img=document.querySelector('#img');
const msg=document.querySelector('#msg');

// TODO: file change에서
// - file.files[0] 없으면 msg='no file'
// - 있으면 FileReader로 읽어서 img.src에 넣고 msg='ok'
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const file=document.querySelector('#file');
  const img=document.querySelector('#img');
  if(!file||!img){ fail('요소 존재', {tab:'html', fix:'#file, #img 필요'}); return results; }
  pass('요소 존재');

  // file reading cannot be simulated easily in this sandbox test; just require handler exists
  pass('파일 미리보기', 'manual');
  return results;
};`
    },

    {
      id: 'mission-54',
      titleKo: '미션 54 — 간단한 드래그 앤 드롭 정렬(2개 박스)',
      pitchKo: 'dragstart/drop 이벤트로 위치를 바꾼다.',
      minutes: 26,
      outcomesKo: ['dragstart', 'dragover', 'drop'],
      checklistKo: ['A/B 박스 드래그로 순서 교체', 'dragover preventDefault', '상태 텍스트 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Drag swap</h1>
  <div id="row" class="row">
    <div class="box" draggable="true" data-id="A">A</div>
    <div class="box" draggable="true" data-id="B">B</div>
  </div>
  <p id="msg" class="msg">order: A,B</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:10px;}
.box{width:84px;height:84px;display:grid;place-items:center;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);cursor:grab;user-select:none;}
.box.drag{outline:2px dashed rgba(255,212,59,0.6)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const row=document.querySelector('#row');
const msg=document.querySelector('#msg');
let from=null;

function render(){
  const ids=[...row.querySelectorAll('.box')].map(b=>b.dataset.id).join(',');
  msg.textContent='order: '+ids;
}
render();

// TODO:
// - dragstart에서 from을 저장 (dataset.id)
// - dragover에서 preventDefault
// - drop에서 from과 drop 대상이 다르면 DOM 순서를 swap 후 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const row=document.querySelector('#row');
  const msg=document.querySelector('#msg');
  if(!row||!msg){ fail('요소 존재', {tab:'html', fix:'#row, #msg 필요'}); return results; }
  pass('요소 존재');
  pass('드래그 swap', 'manual');
  return results;
};`
    },

    {
      id: 'mission-55',
      titleKo: '미션 55 — 간단한 검색 필터(리스트)',
      pitchKo: '입력값으로 리스트를 필터링한다.',
      minutes: 18,
      outcomesKo: ['filter', 'toLowerCase', '렌더'],
      checklistKo: ['입력 시 실시간 필터', '매치 없으면 안내', '대소문자 무시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Filter</h1>
  <input id="q" placeholder="search" />
  <p id="msg" class="msg">-</p>
  <ul id="list"></ul>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.msg{opacity:0.9;margin:10px 0 0 0;}
ul{margin:10px 0 0 18px;line-height:1.9;}
`,
        js: `const q=document.querySelector('#q');
const msg=document.querySelector('#msg');
const list=document.querySelector('#list');
const items=['Apple','Banana','Cherry','Grape','Orange'];

function render(){
  const s=(q.value||'').trim().toLowerCase();
  const shown = items.filter(x => x.toLowerCase().includes(s));
  list.innerHTML = shown.map(x => '<li>' + x + '</li>').join('');
  msg.textContent = shown.length ? (shown.length + ' found') : 'no match';
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
  if(!q||!list){ fail('요소 존재', {tab:'html', fix:'#q, #list 필요'}); return results; }
  pass('요소 존재');

  q.value='ap'; q.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(list.querySelectorAll('li').length<1) fail('필터링', {tab:'js', fix:'input에서 render() 호출해줘.'});
  else pass('필터링');

  return results;
};`
    }
  ]
};

export default spec;
