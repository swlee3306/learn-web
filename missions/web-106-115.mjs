const spec = {
  track: 'web',
  batch: '106-115',
  missions: [
    {
      id: 'mission-106',
      titleKo: '미션 106 — 간단한 BMI 계산기',
      pitchKo: '키/몸무게 입력으로 BMI를 계산하고 구간을 표시한다.',
      minutes: 22,
      outcomesKo: ['Number()', 'toFixed', '조건문'],
      checklistKo: ['Calc 클릭 시 BMI 계산', '정상/과체중 등 텍스트 표시', 'NaN 처리'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">BMI</h1>
  <input id="h" placeholder="height(cm)" />
  <input id="w" placeholder="weight(kg)" />
  <button id="go" class="primary">Calc</button>
  <p id="out" class="big">-</p>
  <p id="msg" class="msg">-</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;margin-bottom:10px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.big{font-size:40px;margin:14px 0 0 0;text-align:center;}
.msg{opacity:0.9;margin:8px 0 0 0;text-align:center;}
`,
        js: `const h=document.querySelector('#h');
const w=document.querySelector('#w');
const go=document.querySelector('#go');
const out=document.querySelector('#out');
const msg=document.querySelector('#msg');

function classify(bmi){
  if(bmi < 18.5) return 'under';
  if(bmi < 25) return 'normal';
  if(bmi < 30) return 'over';
  return 'obese';
}

// TODO: go 클릭 시
// - cm->m 변환 후 bmi = kg/(m*m)
// - 유효하면 out에 bmi.toFixed(1) 표시, msg에 classify 결과 표시
// - 아니면 out='-' msg='Error'
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const go=document.querySelector('#go');
  const h=document.querySelector('#h');
  const w=document.querySelector('#w');
  const out=document.querySelector('#out');
  if(!go||!h||!w||!out){ fail('요소 존재', {tab:'html', fix:'#go #h #w #out 필요'}); return results; }
  pass('요소 존재');

  h.value='180'; w.value='70';
  go.click();
  await new Promise(r=>setTimeout(r,30));
  if((out.textContent||'').trim()==='-') fail('계산', {tab:'js', fix:'클릭 시 BMI 계산해서 out 업데이트'});
  else pass('계산', out.textContent.trim());
  return results;
};`
    },

    {
      id: 'mission-107',
      titleKo: '미션 107 — 단어 빈도 세기',
      pitchKo: '문장을 단어로 나눠 빈도를 계산한다.',
      minutes: 24,
      outcomesKo: ['split', '객체/Map', '정렬'],
      checklistKo: ['Count 클릭 시 빈도 출력', '대소문자 무시', '빈 단어 무시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Word count</h1>
  <textarea id="t" rows="4">Hello hello world</textarea>
  <button id="go" class="primary">Count</button>
  <pre id="out" class="out">-</pre>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
textarea{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;resize:vertical;}
button{margin-top:10px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.out{margin-top:12px;min-height:90px;padding:10px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.04);white-space:pre-wrap;}
`,
        js: `const t=document.querySelector('#t');
const go=document.querySelector('#go');
const out=document.querySelector('#out');

function countWords(text){
  const words = (text||'')
    .toLowerCase()
    .split(/\s+/)
    .map(x=>x.trim())
    .filter(Boolean);

  const m=new Map();
  for(const w of words){ m.set(w, (m.get(w)||0)+1); }
  return [...m.entries()].sort((a,b)=>b[1]-a[1]);
}

// TODO: go 클릭 시 countWords(t.value) 결과를 out에 줄단위로 출력 (예: hello:2)
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
  if(!(out.textContent||'').includes(':')) fail('빈도 출력', {tab:'js', fix:'out에 "word:count" 형태로 출력해줘.'});
  else pass('빈도 출력');
  return results;
};`
    },

    {
      id: 'mission-108',
      titleKo: '미션 108 — 간단한 슬라이드 쇼(Prev/Next + 자동)',
      pitchKo: '인덱스를 돌리고 interval을 관리한다.',
      minutes: 28,
      outcomesKo: ['setInterval', 'clearInterval', '인덱스'],
      checklistKo: ['Prev/Next로 이동', 'Auto 토글', '끝에서 순환'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Slideshow</h1>
  <div id="view" class="view">1</div>
  <div class="row">
    <button id="prev">Prev</button>
    <button id="next" class="primary">Next</button>
    <button id="auto">Auto</button>
  </div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.view{height:180px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);display:grid;place-items:center;font-size:70px;}
.row{display:flex;gap:8px;justify-content:center;margin-top:12px;flex-wrap:wrap}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
`,
        js: `const view=document.querySelector('#view');
const prev=document.querySelector('#prev');
const next=document.querySelector('#next');
const autoBtn=document.querySelector('#auto');
const items=['1','2','3'];
let i=0;
let timer=null;

function render(){
  view.textContent = items[i];
  autoBtn.textContent = timer ? 'Stop' : 'Auto';
}
render();

function step(d){
  i = (i + d + items.length) % items.length;
  render();
}

// TODO:
// - prev 클릭: step(-1)
// - next 클릭: step(1)
// - auto 클릭: timer 없으면 setInterval(()=>step(1), 1000), 있으면 clearInterval
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const next=document.querySelector('#next');
  const view=document.querySelector('#view');
  if(!next||!view){ fail('요소 존재', {tab:'html', fix:'#next #view 필요'}); return results; }
  pass('요소 존재');

  const before=view.textContent;
  next.click();
  await new Promise(r=>setTimeout(r,30));
  const after=view.textContent;
  if(after===before) fail('Next 이동', {tab:'js', fix:'next 클릭에서 step(1) 호출'});
  else pass('Next 이동');

  return results;
};`
    },

    {
      id: 'mission-109',
      titleKo: '미션 109 — 간단한 Markdown 미리보기(#, **만)',
      pitchKo: '치환으로 아주 단순한 마크다운 렌더를 만든다.',
      minutes: 26,
      outcomesKo: ['문자열', 'replace', 'innerHTML'],
      checklistKo: ['# 헤더 변환', '**bold** 변환', '줄바꿈 처리'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Markdown</h1>
  <textarea id="md" rows="5"># Title\nHello **world**</textarea>
  <div id="out" class="out"></div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
textarea{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;resize:vertical;}
.out{margin-top:12px;padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.04);min-height:120px;}
.out h2{margin:0 0 10px 0;font-size:22px;}
`,
        js: `const md=document.querySelector('#md');
const out=document.querySelector('#out');

function render(){
  let s = md.value || '';
  // header: lines starting with "# "
  s = s.split('\n').map(line => {
    if(line.startsWith('# ')) return '<h2>' + line.slice(2) + '</h2>';
    return '<p>' + line + '</p>';
  }).join('');
  // bold **x**
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  out.innerHTML = s;
}

render();

// TODO: textarea input 이벤트에서 render() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const md=document.querySelector('#md');
  const out=document.querySelector('#out');
  if(!md||!out){ fail('요소 존재', {tab:'html', fix:'#md #out 필요'}); return results; }
  pass('요소 존재');

  md.value='# A\nHi **x**';
  md.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!out.innerHTML.includes('<strong>')) fail('bold 변환', {tab:'js', fix:'input에서 render 호출 + **를 <strong>으로'});
  else pass('bold 변환');
  return results;
};`
    },

    {
      id: 'mission-110',
      titleKo: '미션 110 — 간단한 숫자 정렬 게임(작은→큰)',
      pitchKo: '배열을 섞고 클릭 순서를 체크한다.',
      minutes: 28,
      outcomesKo: ['셔플', '상태', '검증'],
      checklistKo: ['1~5 버튼을 섞어 표시', '1부터 순서대로 클릭해야 OK', '실패 시 리셋'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Order game</h1>
  <div id="grid" class="grid"></div>
  <p id="msg" class="msg">click 1</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;}
.b{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:12px 0;border-radius:12px;cursor:pointer;}
.b.ok{background: rgba(34,197,94,0.18); border-color: rgba(34,197,94,0.35)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const grid=document.querySelector('#grid');
const msg=document.querySelector('#msg');
let nums=[1,2,3,4,5];
let need=1;

function shuffle(a){
  const b=[...a];
  for(let i=b.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [b[i],b[j]]=[b[j],b[i]];
  }
  return b;
}

function render(){
  const a=shuffle(nums);
  grid.innerHTML = a.map(n=>'<button class="b" data-n="'+n+'">'+n+'</button>').join('');
  msg.textContent='click '+need;
}

render();

// TODO: grid 클릭에서 .b면
// - 클릭한 숫자가 need면 버튼에 ok 클래스, need++
// - 아니면 need=1로 리셋하고 render()
// - need가 6이면 msg='Done'
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const grid=document.querySelector('#grid');
  if(!grid){ fail('요소 존재', {tab:'html', fix:'#grid 필요'}); return results; }
  pass('요소 존재');
  pass('게임 동작', 'manual');
  return results;
};`
    },

    {
      id: 'mission-111',
      titleKo: '미션 111 — 간단한 오프라인/온라인 감지',
      pitchKo: 'online/offline 이벤트로 상태를 표시한다.',
      minutes: 18,
      outcomesKo: ['navigator.onLine', 'events', '렌더'],
      checklistKo: ['초기 상태 표시', 'online/offline 변화 반영', '스타일 변경'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Network</h1>
  <p id="st" class="st">-</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.st{padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);}
.st.on{border-color:rgba(34,197,94,0.35);background:rgba(34,197,94,0.18)}
.st.off{border-color:rgba(251,113,133,0.35);background:rgba(251,113,133,0.12)}
`,
        js: `const st=document.querySelector('#st');

function render(){
  const on = navigator.onLine;
  st.textContent = on ? 'Online' : 'Offline';
  st.classList.toggle('on', on);
  st.classList.toggle('off', !on);
}

render();

// TODO: window online/offline 이벤트에서 render() 호출
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const st=document.querySelector('#st');
  if(!st){ fail('요소 존재', {tab:'html', fix:'#st 필요'}); return results; }
  pass('요소 존재');
  pass('online/offline', 'manual');
  return results;
};`
    },

    {
      id: 'mission-112',
      titleKo: '미션 112 — 간단한 스톱워치(랩 3개까지)',
      pitchKo: '시간을 측정하고 lap 리스트를 만든다.',
      minutes: 30,
      outcomesKo: ['setInterval', 'Date.now', '배열'],
      checklistKo: ['Start/Stop', 'Lap 저장(최대 3)', 'Reset'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Stopwatch</h1>
  <div id="t" class="big">0.0</div>
  <div class="row">
    <button id="start" class="primary">Start</button>
    <button id="lap">Lap</button>
    <button id="reset">Reset</button>
  </div>
  <ul id="laps"></ul>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.big{font-size:52px;margin:0 0 12px 0;}
.row{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
ul{margin:12px 0 0 18px;line-height:1.9;text-align:left;}
`,
        js: `const t=document.querySelector('#t');
const start=document.querySelector('#start');
const lap=document.querySelector('#lap');
const reset=document.querySelector('#reset');
const lapsEl=document.querySelector('#laps');

let timer=null;
let startAt=0;
let elapsed=0;
let laps=[];

function render(){
  t.textContent = (elapsed/1000).toFixed(1);
  start.textContent = timer ? 'Stop' : 'Start';
  lapsEl.innerHTML = laps.map(x=>'<li>'+x+'</li>').join('');
}
render();

// TODO:
// - start 클릭: timer 없으면 startAt=Date.now()-elapsed; setInterval로 elapsed 업데이트; 있으면 clearInterval
// - lap 클릭: 현재 time을 laps에 추가(최대 3개)
// - reset 클릭: stop + elapsed=0 + laps=[]
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const start=document.querySelector('#start');
  const t=document.querySelector('#t');
  if(!start||!t){ fail('요소 존재', {tab:'html', fix:'#start #t 필요'}); return results; }
  pass('요소 존재');

  start.click();
  await new Promise(r=>setTimeout(r,120));
  const v=Number(t.textContent||'0');
  if(!(v>0)) fail('시간 증가', {tab:'js', fix:'Start에서 setInterval로 elapsed 업데이트'});
  else pass('시간 증가', String(v));

  return results;
};`
    },

    {
      id: 'mission-113',
      titleKo: '미션 113 — 간단한 canvas 점 찍기',
      pitchKo: 'canvas 2D context로 클릭 위치에 점을 찍는다.',
      minutes: 26,
      outcomesKo: ['canvas', 'addEventListener', '좌표'],
      checklistKo: ['캔버스 클릭 시 점 그리기', '좌표 계산', '초기화 버튼'],
      defaults: {
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
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const c=document.querySelector('#c');
  if(!c){ fail('요소 존재', {tab:'html', fix:'#c 필요'}); return results; }
  pass('요소 존재');
  pass('canvas', 'manual');
  return results;
};`
    },

    {
      id: 'mission-114',
      titleKo: '미션 114 — 간단한 북마크 저장(제목+URL)',
      pitchKo: '폼으로 추가하고 localStorage에 저장한다.',
      minutes: 28,
      outcomesKo: ['localStorage', 'JSON', '배열'],
      checklistKo: ['Add로 북마크 추가', '리스트 렌더', '새로고침 후 유지'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Bookmarks</h1>
  <input id="title" placeholder="title" />
  <input id="url" placeholder="https://..." />
  <button id="add" class="primary">Add</button>
  <ul id="list"></ul>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;margin-bottom:10px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
ul{margin:12px 0 0 18px;line-height:1.9;}
a{color:#ffd43b;}
`,
        js: `const title=document.querySelector('#title');
const url=document.querySelector('#url');
const add=document.querySelector('#add');
const list=document.querySelector('#list');
const KEY='learn.bookmarks';
let items=[];

function save(){
  localStorage.setItem(KEY, JSON.stringify(items));
}

function load(){
  try{
    items = JSON.parse(localStorage.getItem(KEY) || '[]');
    if(!Array.isArray(items)) items=[];
  }catch(e){ items=[]; }
}

function render(){
  list.innerHTML = items.map(b=>'<li><a href="'+b.url+'" target="_blank" rel="noreferrer">'+b.title+'</a></li>').join('');
}

load();
render();

// TODO: add 클릭 시 title/url trim해서 둘 다 있으면 items.push({title,url}); save(); render(); 입력 비우기
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const add=document.querySelector('#add');
  const list=document.querySelector('#list');
  if(!add||!list){ fail('요소 존재', {tab:'html', fix:'#add #list 필요'}); return results; }
  pass('요소 존재');
  pass('북마크', 'manual');
  return results;
};`
    },

    {
      id: 'mission-115',
      titleKo: '미션 115 — 간단한 퀴즈(다음 버튼)',
      pitchKo: '문제 인덱스를 이동시키며 점수를 계산한다.',
      minutes: 28,
      outcomesKo: ['상태', '인덱스', '렌더'],
      checklistKo: ['선택 후 Next', '마지막에 점수 표시', '다시 시작'],
      defaults: {
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
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const next=document.querySelector('#next');
  const opts=document.querySelector('#opts');
  if(!next||!opts){ fail('요소 존재', {tab:'html', fix:'#next #opts 필요'}); return results; }
  pass('요소 존재');
  pass('퀴즈', 'manual');
  return results;
};`
    }
  ]
};

export default spec;
