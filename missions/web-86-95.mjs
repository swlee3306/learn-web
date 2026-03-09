const spec = {
  track: 'web',
  batch: '86-95',
  missions: [
    {
      id: 'mission-86',
      titleKo: '미션 86 — 숫자 배열 통계(최소/최대/평균)',
      pitchKo: 'split/map으로 입력을 배열로 만들고 통계를 계산한다.',
      minutes: 24,
      outcomesKo: ['split', 'map(Number)', 'Math.min/max'],
      checklistKo: ['쉼표 입력을 숫자 배열로 변환', 'min/max/avg 표시', '빈 값/NaN 처리'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Stats</h1>
  <input id="in" placeholder="e.g. 1,2,3" />
  <button id="calc" class="primary">Calc</button>
  <pre id="out" class="out">-</pre>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;margin-bottom:10px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.out{margin:12px 0 0 0;min-height:80px;padding:10px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.04);white-space:pre-wrap;}
`,
        js: `const input=document.querySelector('#in');
const calc=document.querySelector('#calc');
const out=document.querySelector('#out');

function parse(){
  return (input.value||'')
    .split(',')
    .map(s=>Number(s.trim()))
    .filter(n=>Number.isFinite(n));
}

// TODO: calc 클릭 시
// - nums=parse()
// - 비어있으면 out='-' 유지
// - 아니면 min/max/avg를 계산해서 out에 표시
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const input=document.querySelector('#in');
  const calc=document.querySelector('#calc');
  const out=document.querySelector('#out');
  if(!input||!calc||!out){ fail('요소 존재', {tab:'html', fix:'#in #calc #out 필요'}); return results; }
  pass('요소 존재');

  input.value='1,2,3';
  calc.click();
  await new Promise(r=>setTimeout(r,30));
  if(!(out.textContent||'').includes('min')) fail('통계 출력', {tab:'js', fix:'calc 클릭 시 out에 min/max/avg를 출력해줘.'});
  else pass('통계 출력');

  return results;
};`
    },

    {
      id: 'mission-87',
      titleKo: '미션 87 — 간단한 별도 상태(선택/비선택) 리스트',
      pitchKo: '선택된 id를 상태로 관리한다.',
      minutes: 20,
      outcomesKo: ['상태', 'dataset', 'classList'],
      checklistKo: ['아이템 클릭 시 선택', '다시 클릭 시 해제', '선택값 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Select one</h1>
  <ul id="list" class="list"></ul>
  <p id="msg" class="msg">selected: -</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.list{margin:0;padding:0;list-style:none;display:grid;gap:8px;}
.li{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);cursor:pointer;}
.li.on{background: rgba(34,197,94,0.18); border-color: rgba(34,197,94,0.35)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const list=document.querySelector('#list');
const msg=document.querySelector('#msg');
const items=[{id:'a',t:'Alpha'},{id:'b',t:'Beta'},{id:'c',t:'Gamma'}];
let selected=null;

function render(){
  list.innerHTML = items.map(it =>
    '<li class="li' + (it.id===selected?' on':'') + '" data-id="' + it.id + '">' + it.t + '</li>'
  ).join('');
  msg.textContent = 'selected: ' + (selected || '-');
}
render();

// TODO: list 클릭 이벤트에서 data-id를 읽고
// - 같은 id면 selected=null
// - 다르면 selected=id
// - render()
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

  const first=list.querySelector('.li');
  first.click();
  await new Promise(r=>setTimeout(r,30));
  if((msg.textContent||'').includes('-')) fail('선택 반영', {tab:'js', fix:'클릭 시 selected를 업데이트해줘.'});
  else pass('선택 반영');

  return results;
};`
    },

    {
      id: 'mission-88',
      titleKo: '미션 88 — 입력값을 태그로 추가/삭제',
      pitchKo: '배열로 태그를 관리하고 중복을 막는다.',
      minutes: 26,
      outcomesKo: ['배열', 'includes', 'render'],
      checklistKo: ['Add로 태그 추가', '중복은 무시', '태그 클릭 시 삭제'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Tags</h1>
  <div class="row">
    <input id="in" placeholder="tag" />
    <button id="add" class="primary">Add</button>
  </div>
  <div id="tags" class="tags"></div>
  <p id="msg" class="msg">0 tags</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:8px;}
input{flex:1;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.tags{margin-top:12px;display:flex;flex-wrap:wrap;gap:8px;}
.tag{padding:8px 10px;border-radius:999px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);cursor:pointer;}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const input=document.querySelector('#in');
const add=document.querySelector('#add');
const tagsEl=document.querySelector('#tags');
const msg=document.querySelector('#msg');
let tags=[];

function render(){
  tagsEl.innerHTML = tags.map(t=>'<span class="tag" data-t="'+t+'">'+t+'</span>').join('');
  msg.textContent = tags.length + ' tags';
}
render();

// TODO:
// - Add 클릭 시 input.value trim해서 비어있지 않고 tags에 없으면 push
// - input 비우고 render
// - tagsEl 클릭 시 .tag면 data-t로 tags에서 제거 후 render
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const input=document.querySelector('#in');
  const add=document.querySelector('#add');
  const tagsEl=document.querySelector('#tags');
  if(!input||!add||!tagsEl){ fail('요소 존재', {tab:'html', fix:'#in #add #tags 필요'}); return results; }
  pass('요소 존재');

  input.value='hi';
  add.click();
  await new Promise(r=>setTimeout(r,30));
  if(tagsEl.querySelectorAll('.tag').length<1) fail('태그 추가', {tab:'js', fix:'Add 클릭 시 태그를 추가해줘.'});
  else pass('태그 추가');

  return results;
};`
    },

    {
      id: 'mission-89',
      titleKo: '미션 89 — 간단한 툴팁(hover) 표시',
      pitchKo: 'mouseenter/leave로 툴팁을 제어한다.',
      minutes: 16,
      outcomesKo: ['mouseenter', 'mouseleave', 'classList'],
      checklistKo: ['hover 시 tooltip 표시', 'leave 시 숨김', '접근성 aria'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Tooltip</h1>
  <button id="btn" class="primary" aria-describedby="tip">Hover me</button>
  <div id="tip" class="tip" role="tooltip">Hello</div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center;position:relative}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.tip{margin-top:10px;display:inline-block;padding:8px 10px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(15,23,42,0.95);opacity:0;transform:translateY(4px);transition:opacity 160ms, transform 160ms;}
.tip.on{opacity:1;transform:translateY(0)}
`,
        js: `const btn=document.querySelector('#btn');
const tip=document.querySelector('#tip');

function set(on){
  tip.classList.toggle('on', on);
}

set(false);

// TODO: btn mouseenter에서 set(true), mouseleave에서 set(false)
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn=document.querySelector('#btn');
  const tip=document.querySelector('#tip');
  if(!btn||!tip){ fail('요소 존재', {tab:'html', fix:'#btn #tip 필요'}); return results; }
  pass('요소 존재');

  btn.dispatchEvent(new MouseEvent('mouseenter',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!tip.classList.contains('on')) fail('hover 표시', {tab:'js', fix:'mouseenter에서 set(true)'});
  else pass('hover 표시');

  return results;
};`
    },

    {
      id: 'mission-90',
      titleKo: '미션 90 — 간단한 클라이언트 라우팅 흉내(해시)',
      pitchKo: 'location.hash로 화면을 전환한다.',
      minutes: 24,
      outcomesKo: ['location.hash', 'hashchange', '렌더'],
      checklistKo: ['링크 클릭 시 해시 변경', 'hashchange에서 렌더', '현재 페이지 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Hash router</h1>
  <nav class="nav">
    <a href="#home" class="a">home</a>
    <a href="#about" class="a">about</a>
  </nav>
  <div id="page" class="page">home</div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.nav{display:flex;gap:10px;margin-bottom:12px;}
.a{color:#ffd43b;text-decoration:none;}
.page{padding:14px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);min-height:80px;display:grid;place-items:center;font-size:24px;}
`,
        js: `const page=document.querySelector('#page');

function get(){
  return (location.hash||'#home').slice(1);
}

function render(){
  const p=get();
  page.textContent=p;
}

render();

// TODO: window hashchange 이벤트에서 render() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const page=document.querySelector('#page');
  if(!page){ fail('요소 존재', {tab:'html', fix:'#page 필요'}); return results; }
  pass('요소 존재');

  location.hash='#about';
  window.dispatchEvent(new HashChangeEvent('hashchange'));
  await new Promise(r=>setTimeout(r,30));
  if((page.textContent||'').trim()!=='about') fail('hash 라우팅', {tab:'js', fix:'hashchange에서 render() 호출'});
  else pass('hash 라우팅');

  return results;
};`
    },

    {
      id: 'mission-91',
      titleKo: '미션 91 — 간단한 색상 피커(input color) 적용',
      pitchKo: 'color input 값으로 스타일을 바꾼다.',
      minutes: 14,
      outcomesKo: ['input type=color', 'style', 'input 이벤트'],
      checklistKo: ['색 변경 시 박스 색 변경', '현재 hex 표시', '초기값 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Color</h1>
  <input id="c" type="color" value="#ffd43b" />
  <div id="box" class="box"></div>
  <p id="hex" class="msg">#ffd43b</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.box{height:120px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:#ffd43b;margin-top:12px;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
        js: `const c=document.querySelector('#c');
const box=document.querySelector('#box');
const hex=document.querySelector('#hex');

function render(){
  box.style.background=c.value;
  hex.textContent=c.value;
}

render();

// TODO: color input 이벤트에서 render() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const c=document.querySelector('#c');
  const hex=document.querySelector('#hex');
  if(!c||!hex){ fail('요소 존재', {tab:'html', fix:'#c #hex 필요'}); return results; }
  pass('요소 존재');

  c.value='#00ff00'; c.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if((hex.textContent||'').trim()!=='#00ff00') fail('색 반영', {tab:'js', fix:'input 이벤트에서 render 호출'});
  else pass('색 반영');

  return results;
};`
    },

    {
      id: 'mission-92',
      titleKo: '미션 92 — 간단한 클립보드 붙여넣기(paste) 감지',
      pitchKo: 'paste 이벤트에서 clipboardData를 읽는다.',
      minutes: 22,
      outcomesKo: ['paste 이벤트', 'clipboardData', '보안/제약'],
      checklistKo: ['붙여넣기 시 텍스트 표시', '빈 값 처리', '상태 메시지'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Paste</h1>
  <textarea id="t" rows="4" placeholder="paste here"></textarea>
  <p id="out" class="msg">-</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
textarea{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;resize:vertical;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
        js: `const t=document.querySelector('#t');
const out=document.querySelector('#out');

// TODO: t paste 이벤트에서
// const text=e.clipboardData.getData('text');
// out.textContent='pasted: '+(text||'-');
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const t=document.querySelector('#t');
  const out=document.querySelector('#out');
  if(!t||!out){ fail('요소 존재', {tab:'html', fix:'#t #out 필요'}); return results; }
  pass('요소 존재');
  pass('paste 이벤트', 'manual');
  return results;
};`
    },

    {
      id: 'mission-93',
      titleKo: '미션 93 — 간단한 숫자 포맷(천 단위 콤마)',
      pitchKo: '정규식 또는 Intl로 표시용 포맷을 만든다.',
      minutes: 20,
      outcomesKo: ['Intl.NumberFormat', '문자열', '렌더'],
      checklistKo: ['입력하면 포맷 출력', 'NaN 처리', '초기 상태 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Format</h1>
  <input id="n" placeholder="number" />
  <p id="out" class="msg">-</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.msg{opacity:0.9;margin:10px 0 0 0;}
`,
        js: `const n=document.querySelector('#n');
const out=document.querySelector('#out');
const fmt=new Intl.NumberFormat('en-US');

function render(){
  const v=Number((n.value||'').trim());
  out.textContent = Number.isFinite(v) ? fmt.format(v) : '-';
}

render();

// TODO: input 이벤트에서 render() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const nEl=document.querySelector('#n');
  const out=document.querySelector('#out');
  if(!nEl||!out){ fail('요소 존재', {tab:'html', fix:'#n #out 필요'}); return results; }
  pass('요소 존재');

  nEl.value='1000'; nEl.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if((out.textContent||'').trim()!=='1,000') fail('천 단위 콤마', {tab:'js', fix:'input에서 Intl로 포맷 render'});
  else pass('천 단위 콤마');

  return results;
};`
    },

    {
      id: 'mission-94',
      titleKo: '미션 94 — 간단한 키워드 하이라이트(검색)',
      pitchKo: '검색어를 포함한 부분을 mark로 감싼다.',
      minutes: 26,
      outcomesKo: ['문자열', 'replace', 'RegExp escape'],
      checklistKo: ['검색어 입력 시 하이라이트', '대소문자 무시', '빈 검색어면 원문'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Highlight</h1>
  <input id="q" placeholder="search" />
  <p id="t" class="t"></p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.t{opacity:0.95;margin:12px 0 0 0;line-height:1.7;}
mark{background:rgba(255,212,59,0.35);color:#fff;padding:0 2px;border-radius:4px;}
`,
        js: `const q=document.querySelector('#q');
const t=document.querySelector('#t');
const text='The quick brown fox jumps over the lazy dog.';

t.textContent=text;

function esc(s){
  // 템플릿 리터럴과 충돌하는 패턴을 피하기 위해 간단 escape 사용
  return s.replace(/[.*+?^$()|[\\]\\]/g,'\\$&');
}

function render(){
  const s=(q.value||'').trim();
  if(!s){ t.textContent=text; return; }
  const re=new RegExp(esc(s), 'gi');
  t.innerHTML = text.replace(re, m => '<mark>' + m + '</mark>');
}

// TODO: input 이벤트에서 render() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const q=document.querySelector('#q');
  const t=document.querySelector('#t');
  if(!q||!t){ fail('요소 존재', {tab:'html', fix:'#q #t 필요'}); return results; }
  pass('요소 존재');

  q.value='fox'; q.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!t.innerHTML.includes('<mark>')) fail('하이라이트', {tab:'js', fix:'input에서 render 호출 + mark로 감싸기'});
  else pass('하이라이트');

  return results;
};`
    },

    {
      id: 'mission-95',
      titleKo: '미션 95 — 간단한 폼 제출 후 리스트에 추가',
      pitchKo: 'submit + preventDefault로 입력을 리스트에 추가한다.',
      minutes: 22,
      outcomesKo: ['form submit', 'preventDefault', '배열'],
      checklistKo: ['submit 시 새로고침 방지', 'trim 후 리스트 추가', '빈 값은 무시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Submit add</h1>
  <form id="f" class="row">
    <input id="in" placeholder="item" />
    <button class="primary" type="submit">Add</button>
  </form>
  <ul id="list"></ul>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:8px;}
input{flex:1;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
ul{margin:12px 0 0 18px;line-height:1.9;}
`,
        js: `const f=document.querySelector('#f');
const input=document.querySelector('#in');
const list=document.querySelector('#list');
let items=[];

function render(){
  list.innerHTML = items.map(t=>'<li>'+t+'</li>').join('');
}
render();

// TODO: f submit 이벤트에서 preventDefault 후
// - v=input.value.trim()
// - v 있으면 items.push(v), input.value='' 그리고 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const f=document.querySelector('#f');
  const input=document.querySelector('#in');
  const list=document.querySelector('#list');
  if(!f||!input||!list){ fail('요소 존재', {tab:'html', fix:'#f #in #list 필요'}); return results; }
  pass('요소 존재');

  input.value='x';
  f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
  await new Promise(r=>setTimeout(r,30));
  if(list.querySelectorAll('li').length<1) fail('submit 추가', {tab:'js', fix:'submit에서 preventDefault + items.push + render'});
  else pass('submit 추가');

  return results;
};`
    }
  ]
};

export default spec;
