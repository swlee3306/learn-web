const spec = {
  track: 'web',
  batch: '116-125',
  missions: [
    {
      id: 'mission-116',
      titleKo: '미션 116 — 간단한 포모도로 타이머(25/5)',
      pitchKo: '타이머 상태(work/break)를 전환한다.',
      minutes: 30,
      outcomesKo: ['setInterval', '상태', '렌더'],
      checklistKo: ['Start/Stop', '25분 후 break 전환', 'Reset'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Pomodoro</h1>
  <p id="mode" class="msg">work</p>
  <p id="t" class="big">25:00</p>
  <div class="row">
    <button id="start" class="primary">Start</button>
    <button id="reset">Reset</button>
  </div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 10px 0;font-size:28px;}
.big{font-size:54px;margin:10px 0 0 0;}
.row{display:flex;gap:8px;justify-content:center;margin-top:12px;flex-wrap:wrap}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:0;}
`,
        js: `const modeEl=document.querySelector('#mode');
const tEl=document.querySelector('#t');
const start=document.querySelector('#start');
const reset=document.querySelector('#reset');

const WORK=25*60;
const BREAK=5*60;
let mode='work';
let left=WORK;
let timer=null;

function fmt(sec){
  const m=Math.floor(sec/60);
  const s=sec%60;
  return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
}

function render(){
  modeEl.textContent=mode;
  tEl.textContent=fmt(left);
  start.textContent = timer ? 'Stop' : 'Start';
}

render();

// TODO:
// - start 클릭: timer 없으면 setInterval로 left--, 0이면 mode 전환(work<->break) + left 리셋
//             timer 있으면 clearInterval
// - reset 클릭: stop + mode/work 초기화 + left=WORK + render
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

  const before=t.textContent;
  start.click();
  await new Promise(r=>setTimeout(r,1100));
  const after=t.textContent;
  if(after===before) fail('타이머 감소', {tab:'js', fix:'setInterval로 left를 감소시키고 render()'});
  else pass('타이머 감소', before+'→'+after);

  return results;
};`
    },

    {
      id: 'mission-117',
      titleKo: '미션 117 — 간단한 아날로그 시계(텍스트로)',
      pitchKo: 'Date로 현재 시간을 읽어 표시한다.',
      minutes: 18,
      outcomesKo: ['Date', 'setInterval', 'padStart'],
      checklistKo: ['현재 HH:MM:SS 표시', '1초마다 업데이트', '초기 렌더'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Clock</h1>
  <p id="t" class="big">--:--:--</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.big{font-size:56px;margin:0;letter-spacing:0.05em;}
`,
        js: `const t=document.querySelector('#t');

function render(){
  const d=new Date();
  const hh=String(d.getHours()).padStart(2,'0');
  const mm=String(d.getMinutes()).padStart(2,'0');
  const ss=String(d.getSeconds()).padStart(2,'0');
  t.textContent = hh+':'+mm+':'+ss;
}

render();

// TODO: setInterval로 1초마다 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const t=document.querySelector('#t');
  if(!t){ fail('요소 존재', {tab:'html', fix:'#t 필요'}); return results; }
  pass('요소 존재');
  const before=t.textContent;
  await new Promise(r=>setTimeout(r,1100));
  const after=t.textContent;
  if(after===before) fail('1초 업데이트', {tab:'js', fix:'setInterval로 render()를 반복 호출'});
  else pass('1초 업데이트');
  return results;
};`
    },

    {
      id: 'mission-118',
      titleKo: '미션 118 — 간단한 URL 파라미터 읽기',
      pitchKo: 'URLSearchParams로 쿼리를 읽어 UI에 표시한다.',
      minutes: 18,
      outcomesKo: ['URLSearchParams', 'location.search', '렌더'],
      checklistKo: ['name 파라미터 표시', '없으면 -', 'decode 처리'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Query</h1>
  <p id="out" class="msg">name: -</p>
  <p class="hint">try ?name=kim</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.msg{opacity:0.9;margin:0;}
.hint{opacity:0.6;margin:10px 0 0 0;}
`,
        js: `const out=document.querySelector('#out');

function render(){
  const p=new URLSearchParams(location.search);
  const name=p.get('name');
  out.textContent = 'name: ' + (name || '-');
}

render();

// TODO(선택): popstate/replaceState 등과 연동해도 됨
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const out=document.querySelector('#out');
  if(!out){ fail('요소 존재', {tab:'html', fix:'#out 필요'}); return results; }
  pass('요소 존재');
  pass('쿼리 파라미터', 'manual');
  return results;
};`
    },

    {
      id: 'mission-119',
      titleKo: '미션 119 — 간단한 숫자 범위 슬라이더 2개(최소/최대)',
      pitchKo: '두 range input의 관계(min<=max)를 유지한다.',
      minutes: 26,
      outcomesKo: ['range', 'Math.min/max', '상태'],
      checklistKo: ['min/max 표시', 'min이 max 넘으면 보정', '실시간 업데이트'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Range min/max</h1>
  <label class="row">min <input id="min" type="range" min="0" max="100" value="20" /></label>
  <label class="row">max <input id="max" type="range" min="0" max="100" value="80" /></label>
  <p id="out" class="msg">20 ~ 80</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:12px;align-items:center;margin:10px 0;}
input{flex:1;}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const minEl=document.querySelector('#min');
const maxEl=document.querySelector('#max');
const out=document.querySelector('#out');

function render(){
  let a=Number(minEl.value);
  let b=Number(maxEl.value);
  if(a>b){
    // TODO: 관계 보정 (어느 쪽을 움직였는지에 따라 보정해도 됨)
  }
  out.textContent = a + ' ~ ' + b;
}

render();

// TODO: min/max input 이벤트에서 관계를 보정하고 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const minEl=document.querySelector('#min');
  const maxEl=document.querySelector('#max');
  const out=document.querySelector('#out');
  if(!minEl||!maxEl||!out){ fail('요소 존재', {tab:'html', fix:'#min #max #out 필요'}); return results; }
  pass('요소 존재');

  minEl.value='90'; minEl.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  // allow either auto-correct or just display; require output to change
  if(!(out.textContent||'').includes('90')) fail('업데이트', {tab:'js', fix:'input에서 render() 호출해줘.'});
  else pass('업데이트');

  return results;
};`
    },

    {
      id: 'mission-120',
      titleKo: '미션 120 — 간단한 정렬 가능한 테이블(클릭 헤더)',
      pitchKo: '헤더 클릭으로 정렬 키를 바꾼다.',
      minutes: 30,
      outcomesKo: ['sort', '상태', 'DOM 렌더'],
      checklistKo: ['name/score 정렬', '오름차순', '현재 정렬 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Table sort</h1>
  <p id="msg" class="msg">by: name</p>
  <table id="t" class="t"></table>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 8px 0;font-size:28px;}
.msg{opacity:0.85;margin:0 0 10px 0;}
.t{width:100%;border-collapse:collapse;}
th,td{border:1px solid rgba(255,255,255,0.18);padding:8px 10px;}
th{cursor:pointer;background:rgba(255,255,255,0.06)}
`,
        js: `const msg=document.querySelector('#msg');
const t=document.querySelector('#t');
const rows=[
  {name:'Kim', score:80},
  {name:'Lee', score:95},
  {name:'Park', score:70}
];
let by='name';

function render(){
  const a=[...rows].sort((x,y)=>{
    if(by==='score') return x.score-y.score;
    return String(x.name).localeCompare(String(y.name));
  });
  msg.textContent='by: '+by;
  t.innerHTML =
    '<thead><tr>'+
      '<th data-by="name">name</th>'+
      '<th data-by="score">score</th>'+
    '</tr></thead>'+
    '<tbody>'+
      a.map(r=>'<tr><td>'+r.name+'</td><td>'+r.score+'</td></tr>').join('')+
    '</tbody>';
}

render();

// TODO: table click에서 th면 by를 dataset.by로 바꾸고 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const t=document.querySelector('#t');
  if(!t){ fail('요소 존재', {tab:'html', fix:'#t 필요'}); return results; }
  pass('요소 존재');

  const scoreTh=t.querySelector('th[data-by="score"]');
  if(!scoreTh){ fail('헤더', {tab:'js', fix:'render에서 score 헤더 th 생성'}); return results; }
  scoreTh.click();
  await new Promise(r=>setTimeout(r,30));
  const firstScore=Number(t.querySelector('tbody tr td:nth-child(2)')?.textContent||'');
  if(firstScore!==70) fail('score 정렬', {tab:'js', fix:'score 클릭 시 by=score로 바꾸고 sort'});
  else pass('score 정렬');

  return results;
};`
    },

    {
      id: 'mission-121',
      titleKo: '미션 121 — 간단한 색상 대비(텍스트 색 자동)',
      pitchKo: '배경색에 따라 텍스트 색을 흰/검으로 바꾼다.',
      minutes: 26,
      outcomesKo: ['색상 파싱', '명도', '조건문'],
      checklistKo: ['랜덤 배경색', '명도 기준 텍스트색 변경', 'hex 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Contrast</h1>
  <button id="btn" class="primary">Random</button>
  <div id="box" class="box">#0b1020</div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.box{margin-top:12px;height:140px;border-radius:14px;border:1px solid rgba(255,255,255,0.18);display:grid;place-items:center;font-size:22px;background:#0b1020;}
`,
        js: `const btn=document.querySelector('#btn');
const box=document.querySelector('#box');

function randHex(){
  const n=Math.floor(Math.random()*0xffffff);
  return '#' + n.toString(16).padStart(6,'0');
}

function luminance(hex){
  // hex: #rrggbb
  const r=parseInt(hex.slice(1,3),16);
  const g=parseInt(hex.slice(3,5),16);
  const b=parseInt(hex.slice(5,7),16);
  return 0.2126*r + 0.7152*g + 0.0722*b;
}

function apply(hex){
  box.style.background=hex;
  box.textContent=hex;
  const l=luminance(hex);
  box.style.color = l > 140 ? '#0b1020' : '#ffffff';
}

apply('#0b1020');

// TODO: btn 클릭 시 randHex()로 색을 만들고 apply()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const btn=document.querySelector('#btn');
  const box=document.querySelector('#box');
  if(!btn||!box){ fail('요소 존재', {tab:'html', fix:'#btn #box 필요'}); return results; }
  pass('요소 존재');

  const before=box.textContent;
  btn.click();
  await new Promise(r=>setTimeout(r,30));
  const after=box.textContent;
  if(after===before) fail('랜덤 적용', {tab:'js', fix:'btn 클릭에서 apply(randHex()) 호출'});
  else pass('랜덤 적용');

  return results;
};`
    },

    {
      id: 'mission-122',
      titleKo: '미션 122 — 간단한 debounce + fetch (검색)',
      pitchKo: '입력 멈춘 뒤에만 네트워크 요청을 보낸다.',
      minutes: 30,
      outcomesKo: ['debounce', 'fetch', '상태'],
      checklistKo: ['300ms debounce', '로딩 표시', '결과 표시(제목)'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Search (debounce)</h1>
  <input id="q" placeholder="type..." />
  <p id="msg" class="msg">-</p>
  <ul id="list"></ul>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw)}
.h1{margin:0 0 12px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
.msg{opacity:0.9;margin:10px 0 0 0;}
ul{margin:10px 0 0 18px;line-height:1.9;}
`,
        js: `const q=document.querySelector('#q');
const msg=document.querySelector('#msg');
const list=document.querySelector('#list');
let t=null;

async function run(){
  const s=(q.value||'').trim();
  if(!s){ list.innerHTML=''; msg.textContent='-'; return; }
  msg.textContent='Loading...';
  try{
    const res=await fetch('https://jsonplaceholder.typicode.com/posts?title_like='+encodeURIComponent(s));
    const data=await res.json();
    list.innerHTML = data.slice(0,5).map(p=>'<li>'+p.title+'</li>').join('');
    msg.textContent='OK';
  }catch(e){
    msg.textContent='Error';
  }
}

// TODO: input 이벤트에서 clearTimeout(t); t=setTimeout(run,300)
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const q=document.querySelector('#q');
  const msg=document.querySelector('#msg');
  if(!q||!msg){ fail('요소 존재', {tab:'html', fix:'#q #msg 필요'}); return results; }
  pass('요소 존재');

  q.value='a'; q.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,50));
  if((msg.textContent||'').includes('Loading')) fail('즉시 실행 금지', {tab:'js', fix:'debounce로 300ms 후 run 호출'});
  else pass('즉시 실행 금지');

  return results;
};`
    },

    {
      id: 'mission-123',
      titleKo: '미션 123 — 간단한 Undo(최근 1회)',
      pitchKo: '이전 상태를 저장해 되돌린다.',
      minutes: 24,
      outcomesKo: ['state', '스택', '렌더'],
      checklistKo: ['+1 버튼', 'Undo 버튼으로 되돌리기', 'Undo 불가 시 disabled'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Undo</h1>
  <div class="row">
    <button id="add" class="primary">+1</button>
    <button id="undo" disabled>Undo</button>
  </div>
  <p id="n" class="big">0</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:8px;justify-content:center;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button:disabled{opacity:0.45;cursor:not-allowed;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.big{font-size:50px;margin:12px 0 0 0;}
`,
        js: `const add=document.querySelector('#add');
const undo=document.querySelector('#undo');
const nEl=document.querySelector('#n');
let n=0;
let prev=null;

function render(){
  nEl.textContent=String(n);
  undo.disabled = prev===null;
}
render();

// TODO:
// - add 클릭: prev=n 저장 후 n=n+1, render
// - undo 클릭: n=prev; prev=null; render
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const add=document.querySelector('#add');
  const undo=document.querySelector('#undo');
  const nEl=document.querySelector('#n');
  if(!add||!undo||!nEl){ fail('요소 존재', {tab:'html', fix:'#add #undo #n 필요'}); return results; }
  pass('요소 존재');

  add.click();
  await new Promise(r=>setTimeout(r,30));
  const afterAdd=nEl.textContent;
  undo.click();
  await new Promise(r=>setTimeout(r,30));
  if(nEl.textContent===afterAdd) fail('Undo', {tab:'js', fix:'undo에서 이전 값으로 되돌려줘.'});
  else pass('Undo');

  return results;
};`
    },

    {
      id: 'mission-124',
      titleKo: '미션 124 — 간단한 키 입력 기록기(최근 10개)',
      pitchKo: 'keydown 이벤트로 최근 입력 키를 리스트로 관리한다.',
      minutes: 22,
      outcomesKo: ['keydown', '배열', 'slice'],
      checklistKo: ['키 누르면 기록 추가', '최근 10개만 유지', '렌더'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Key log</h1>
  <p class="msg">press keys...</p>
  <ul id="list"></ul>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw)}
.h1{margin:0 0 8px 0;font-size:28px;}
.msg{opacity:0.85;margin:0 0 12px 0;}
ul{margin:0 0 0 18px;line-height:1.9;}
`,
        js: `const list=document.querySelector('#list');
let keys=[];

function render(){
  list.innerHTML = keys.map(k=>'<li>'+k+'</li>').join('');
}
render();

// TODO: window keydown에서 keys.unshift(e.key) 하고
// keys=keys.slice(0,10) 후 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const list=document.querySelector('#list');
  if(!list){ fail('요소 존재', {tab:'html', fix:'#list 필요'}); return results; }
  pass('요소 존재');

  window.dispatchEvent(new KeyboardEvent('keydown',{key:'x',bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(list.querySelectorAll('li').length<1) fail('키 기록', {tab:'js', fix:'keydown에서 keys 업데이트 후 render'});
  else pass('키 기록');

  return results;
};`
    },

    {
      id: 'mission-125',
      titleKo: '미션 125 — 간단한 단계 진행(stepper) UI',
      pitchKo: '현재 단계 인덱스를 관리하고 UI를 갱신한다.',
      minutes: 24,
      outcomesKo: ['인덱스', 'disabled', '렌더'],
      checklistKo: ['Next/Prev로 단계 이동', '경계에서 disabled', '현재 단계 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Stepper</h1>
  <div id="steps" class="steps"></div>
  <div class="row">
    <button id="prev">Prev</button>
    <button id="next" class="primary">Next</button>
  </div>
  <p id="msg" class="msg">step 1 / 3</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:#fff;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(520px,92vw);text-align:center}
.h1{margin:0 0 12px 0;font-size:28px;}
.steps{display:flex;gap:10px;justify-content:center;margin-bottom:12px;}
.step{width:34px;height:34px;border-radius:999px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);display:grid;place-items:center;opacity:0.6;}
.step.on{opacity:1;background: rgba(34,197,94,0.18); border-color: rgba(34,197,94,0.35)}
.row{display:flex;gap:8px;justify-content:center;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button:disabled{opacity:0.45;cursor:not-allowed;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const stepsEl=document.querySelector('#steps');
const prev=document.querySelector('#prev');
const next=document.querySelector('#next');
const msg=document.querySelector('#msg');
const total=3;
let i=1;

function render(){
  stepsEl.innerHTML = Array.from({length: total}, (_,idx)=>{
    const n=idx+1;
    return '<div class="step'+(n===i?' on':'')+'">'+n+'</div>';
  }).join('');
  msg.textContent='step '+i+' / '+total;
  prev.disabled = i<=1;
  next.disabled = i>=total;
}
render();

// TODO: prev/next 클릭 시 i를 -/+1 (범위 제한) 후 render()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});
  const next=document.querySelector('#next');
  const msg=document.querySelector('#msg');
  if(!next||!msg){ fail('요소 존재', {tab:'html', fix:'#next #msg 필요'}); return results; }
  pass('요소 존재');

  const before=msg.textContent;
  next.click();
  await new Promise(r=>setTimeout(r,30));
  if(msg.textContent===before) fail('Next 이동', {tab:'js', fix:'next 클릭에서 i 증가 후 render()'});
  else pass('Next 이동');

  return results;
};`
    }
  ]
};

export default spec;
