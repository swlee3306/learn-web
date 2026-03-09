const spec = {
  track: 'web',
  batch: '26-35',
  missions: [
    {
      id: 'mission-26',
      titleKo: '미션 26 — 버튼 3개로 탭 전환(Show/Hide)',
      pitchKo: '세 버튼으로 섹션을 바꿔보며 classList/show-hide 패턴을 고정한다.',
      minutes: 16,
      outcomesKo: ['classList', 'data-*', '간단한 탭 UI'],
      checklistKo: ['탭 버튼 클릭 시 패널 전환', '활성 탭에 on 클래스', '초기 탭은 첫 번째'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Tabs</h1>
  <div class="tabs">
    <button class="tab on" data-tab="a">A</button>
    <button class="tab" data-tab="b">B</button>
    <button class="tab" data-tab="c">C</button>
  </div>

  <div class="panel on" data-panel="a">Panel A</div>
  <div class="panel" data-panel="b">Panel B</div>
  <div class="panel" data-panel="c">Panel C</div>
</div>
`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(860px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
.tabs{display:flex;gap:8px;margin-bottom:12px;}
.tab{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;padding:8px 12px;border-radius:12px;cursor:pointer;}
.tab.on{background:rgba(255,212,59,0.18);border-color:rgba(255,212,59,0.25);}
.panel{display:none;border:1px solid rgba(255,255,255,0.18);padding:14px;border-radius:14px;}
.panel.on{display:block;}
`,
        js: `// 목표: 탭 버튼 클릭 시 패널을 전환해.
// 힌트: dataset / querySelectorAll / classList

const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

// TODO: 클릭된 버튼의 data-tab 값을 읽고,
// panels에서 같은 data-panel을 가진 것만 .on을 켜고 나머지는 끄기
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(name,details)=>results.push({name,pass:true,details:details||''});
  const fail=(name,details)=>results.push({name,pass:false,details:details||''});

  const tabs=[...document.querySelectorAll('.tab')];
  const panels=[...document.querySelectorAll('.panel')];
  if(tabs.length!==3) fail('탭 버튼 3개', {tab:'html', fix:'class="tab" 버튼 3개를 만들어줘.'}); else pass('탭 버튼 3개');
  if(panels.length!==3) fail('패널 3개', {tab:'html', fix:'class="panel" 패널 3개를 만들어줘.'}); else pass('패널 3개');
  if(tabs.length<3||panels.length<3) return results;

  const clickB=tabs.find(t=>t.dataset.tab==='b')||tabs[1];
  clickB.click();
  await new Promise(r=>setTimeout(r,50));

  const onPanel=[...panels].find(p=>p.classList.contains('on'));
  if(!onPanel) fail('패널 전환', {tab:'js', fix:'클릭하면 해당 패널만 보이게(.on) 만들어줘.'});
  else if(onPanel.dataset.panel!=='b') fail('패널 전환', {tab:'js', fix:'B를 클릭하면 data-panel="b" 패널만 .on이어야 해.'});
  else pass('패널 전환', 'B');

  const onTab=[...tabs].find(t=>t.classList.contains('on'));
  if(!onTab) fail('활성 탭 표시(.on)', {tab:'js', fix:'클릭된 탭 버튼에 on 클래스를 붙여줘.'});
  else if(onTab.dataset.tab!=='b') fail('활성 탭 표시(.on)', {tab:'js', fix:'B를 클릭하면 B 탭만 .on이어야 해.'});
  else pass('활성 탭 표시(.on)', 'B');

  return results;
};`
    },

    {
      id: 'mission-27',
      titleKo: '미션 27 — 체크박스 모두 체크되면 버튼 활성화',
      pitchKo: '여러 입력 상태를 AND로 묶어 UI를 제어한다.',
      minutes: 14,
      outcomesKo: ['checked', 'change 이벤트', '버튼 disabled'],
      checklistKo: ['3개 모두 체크되면 버튼 enabled', '하나라도 해제되면 disabled', '상태 문구 업데이트'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Ready?</h1>
  <label><input class="ck" type="checkbox"/> 약관 동의</label><br/>
  <label><input class="ck" type="checkbox"/> 개인정보 동의</label><br/>
  <label><input class="ck" type="checkbox"/> 만 14세 이상</label>
  <p id="status" class="msg">아직 준비 안 됨</p>
  <button id="go" disabled>시작</button>
</div>
`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 10px 0;font-size:28px;}
.msg{opacity:0.9;margin:10px 0;}
button{margin-top:8px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;}
button:disabled{opacity:0.4;cursor:not-allowed;}
`,
        js: `// 목표: 체크박스 3개가 모두 체크되면 버튼(#go)을 활성화하고 status 문구를 바꿔.

const cks = document.querySelectorAll('.ck');
const go = document.querySelector('#go');
const status = document.querySelector('#status');

// TODO: change 이벤트를 걸고, 3개 모두 checked인지 확인해서
// go.disabled, status.textContent를 업데이트
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});

  const cks=[...document.querySelectorAll('.ck')];
  const go=document.querySelector('#go');
  const status=document.querySelector('#status');
  if(cks.length!==3) fail('체크박스 3개', {tab:'html', fix:'class="ck" 체크박스를 3개 만들어줘.'}); else pass('체크박스 3개');
  if(!go) fail('버튼 존재 (#go)'); else pass('버튼 존재 (#go)');
  if(!status) fail('상태 문구 (#status)'); else pass('상태 문구 (#status)');
  if(cks.length!==3||!go||!status) return results;

  cks.forEach(x=>{x.checked=true; x.dispatchEvent(new Event('change',{bubbles:true}));});
  await new Promise(r=>setTimeout(r,30));
  if(go.disabled) fail('모두 체크 → enabled', {tab:'js', fix:'3개 모두 체크면 go.disabled=false로 만들어줘.'}); else pass('모두 체크 → enabled');

  cks[0].checked=false; cks[0].dispatchEvent(new Event('change',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!go.disabled) fail('하나 해제 → disabled', {tab:'js', fix:'하나라도 해제면 go.disabled=true로 만들어줘.'}); else pass('하나 해제 → disabled');

  return results;
};`
    },

    {
      id: 'mission-28',
      titleKo: '미션 28 — 입력창 필터로 리스트 검색',
      pitchKo: 'input 이벤트로 리스트를 필터링한다.',
      minutes: 18,
      outcomesKo: ['input 이벤트', 'includes', '리스트 렌더'],
      checklistKo: ['검색어 입력 시 포함 항목만 표시', '빈 값이면 전체 표시', '대소문자 무시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Search</h1>
  <input id="q" placeholder="검색..." />
  <ul id="list"></ul>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 10px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
ul{margin:12px 0 0 18px;line-height:1.8;}
`,
        js: `const items = ['Apple','Banana','Cherry','Durian','Grape','Mango'];
const q = document.querySelector('#q');
const list = document.querySelector('#list');

function render(filtered){
  list.innerHTML = filtered.map(x => \`<li>\${x}</li>\`).join('');
}

render(items);

// TODO: q 입력이 바뀔 때마다 items를 필터링해서 render()
// - 대소문자 무시
// - 빈 문자열이면 전체
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});

  const q=document.querySelector('#q');
  const list=document.querySelector('#list');
  if(!q) fail('입력창 존재 (#q)'); else pass('입력창 존재 (#q)');
  if(!list) fail('리스트 존재 (#list)'); else pass('리스트 존재 (#list)');
  if(!q||!list) return results;

  q.value='an'; q.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  const li=[...list.querySelectorAll('li')].map(x=>x.textContent.trim().toLowerCase());
  if(li.length===0) fail('필터 결과 출력', {tab:'js', fix:'input 이벤트에서 render(items.filter(...))를 호출해줘.'});
  else if(!li.every(x=>x.includes('an'))) fail('필터 정확도', {tab:'js', fix:'includes로 검색어 포함 항목만 보여줘.'});
  else pass('필터 정확도', li.join(', '));

  q.value=''; q.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  const all=[...list.querySelectorAll('li')].length;
  if(all < 5) fail('빈값 → 전체', {tab:'js', fix:'q.value가 빈 값이면 전체 items를 render 해줘.'});
  else pass('빈값 → 전체');

  return results;
};`
    },

    {
      id: 'mission-29',
      titleKo: '미션 29 — Enter로 항목 추가(키보드)',
      pitchKo: 'keydown + Enter 처리로 입력 UX를 만든다.',
      minutes: 18,
      outcomesKo: ['keydown', 'Enter 처리', '배열 상태'],
      checklistKo: ['Enter로 리스트에 추가', '빈 값이면 추가 안 함', '추가 후 input 비움'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Quick Add</h1>
  <input id="inp" placeholder="Enter로 추가" />
  <ul id="out"></ul>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 10px 0;font-size:28px;}
input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
ul{margin:12px 0 0 18px;line-height:1.8;}
`,
        js: `const inp = document.querySelector('#inp');
const out = document.querySelector('#out');
const items = [];

function render(){
  out.innerHTML = items.map(x => \`<li>\${x}</li>\`).join('');
}

render();

// TODO: inp에서 keydown 이벤트로 Enter를 처리해서
// items에 추가하고 render() 호출.
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});

  const inp=document.querySelector('#inp');
  const out=document.querySelector('#out');
  if(!inp) fail('입력창 (#inp)'); else pass('입력창 (#inp)');
  if(!out) fail('리스트 (#out)'); else pass('리스트 (#out)');
  if(!inp||!out) return results;

  inp.value='hi';
  inp.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  const li=[...out.querySelectorAll('li')].map(x=>x.textContent.trim());
  if(!li.includes('hi')) fail('Enter로 추가', {tab:'js', fix:'keydown에서 key=="Enter"면 items.push(inp.value) 후 render() 해줘.'});
  else pass('Enter로 추가');

  if(inp.value.trim()!=='') fail('추가 후 input 비움', {tab:'js', fix:'추가 후 inp.value=""로 비워줘.'});
  else pass('추가 후 input 비움');

  return results;
};`
    },

    {
      id: 'mission-30',
      titleKo: '미션 30 — 모달 열기/닫기(배경/ESC)',
      pitchKo: '오버레이 UI 기본 패턴을 만든다.',
      minutes: 20,
      outcomesKo: ['classList', 'ESC 키', '이벤트 전파'],
      checklistKo: ['Open 클릭 시 모달 표시', '배경 클릭/Close 클릭 시 닫힘', 'ESC로 닫힘'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Modal</h1>
  <button id="open">Open</button>
  <div id="overlay" class="overlay">
    <div class="modal">
      <p id="text">Hello modal</p>
      <button id="close">Close</button>
    </div>
  </div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
.overlay{position:fixed;inset:0;display:none;place-items:center;background:rgba(0,0,0,0.55);}
.overlay.on{display:grid;}
.modal{background:#101a35;border:1px solid rgba(255,255,255,0.18);padding:16px;border-radius:14px;min-width:260px;}
`,
        js: `const openBtn=document.querySelector('#open');
const closeBtn=document.querySelector('#close');
const overlay=document.querySelector('#overlay');

function open(){ overlay.classList.add('on'); }
function close(){ overlay.classList.remove('on'); }

// TODO: openBtn 클릭 → open()
// closeBtn 클릭 → close()
// overlay(배경) 클릭 → close() (단, modal 클릭은 닫히면 안 됨)
// ESC 키 → close()
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});

  const openBtn=document.querySelector('#open');
  const closeBtn=document.querySelector('#close');
  const overlay=document.querySelector('#overlay');
  const modal=document.querySelector('.modal');
  if(!openBtn||!closeBtn||!overlay||!modal){ fail('요소 존재', {tab:'html', fix:'open/close/overlay/modal 요소가 필요해.'}); return results; }
  pass('요소 존재');

  openBtn.click();
  await new Promise(r=>setTimeout(r,30));
  if(!overlay.classList.contains('on')) fail('Open → 표시', {tab:'js', fix:'openBtn 클릭 시 overlay.classList.add("on")'}); else pass('Open → 표시');

  closeBtn.click();
  await new Promise(r=>setTimeout(r,30));
  if(overlay.classList.contains('on')) fail('Close → 숨김', {tab:'js', fix:'closeBtn 클릭 시 overlay.classList.remove("on")'}); else pass('Close → 숨김');

  openBtn.click();
  await new Promise(r=>setTimeout(r,30));
  overlay.click();
  await new Promise(r=>setTimeout(r,30));
  if(overlay.classList.contains('on')) fail('배경 클릭 → 닫힘', {tab:'js', fix:'overlay 배경 클릭 시 닫혀야 해.'}); else pass('배경 클릭 → 닫힘');

  openBtn.click();
  await new Promise(r=>setTimeout(r,30));
  document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(overlay.classList.contains('on')) fail('ESC → 닫힘', {tab:'js', fix:'keydown에서 Escape면 close()'}); else pass('ESC → 닫힘');

  return results;
};`
    },

    {
      id: 'mission-31',
      titleKo: '미션 31 — 랜덤 배경색 뽑기(배열)',
      pitchKo: '배열 + 랜덤으로 UI를 바꿔본다.',
      minutes: 14,
      outcomesKo: ['배열', 'Math.random', 'style 변경'],
      checklistKo: ['버튼 클릭 시 배경색 변경', '같은 색 연속 방지(옵션)', '현재 색 텍스트 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Random Color</h1>
  <p id="now" class="msg">현재 색: (none)</p>
  <button id="pick" class="primary">Pick</button>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 10px 0;font-size:28px;}
.msg{opacity:0.9;margin:0 0 14px 0;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
`,
        js: `const colors = ['#1e3a8a','#0f766e','#7c3aed','#be123c'];
const pick = document.querySelector('#pick');
const now = document.querySelector('#now');

// TODO: 클릭하면 랜덤 색을 뽑아서 document.body.style.background 에 넣고
// now.textContent에도 표시
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});

  const pick=document.querySelector('#pick');
  const now=document.querySelector('#now');
  if(!pick||!now){ fail('요소 존재', {tab:'html', fix:'#pick 버튼과 #now 문구가 필요해.'}); return results; }
  pass('요소 존재');

  const before = getComputedStyle(document.body).backgroundColor;
  pick.click();
  await new Promise(r=>setTimeout(r,50));
  const after = getComputedStyle(document.body).backgroundColor;
  if(after===before) fail('클릭 → 배경 변경', {tab:'js', fix:'pick 클릭에서 body 배경을 바꿔줘.'}); else pass('클릭 → 배경 변경', before+' → '+after);

  if(!(now.textContent||'').includes(':')) fail('현재 색 표시', {tab:'js', fix:'now.textContent에 현재 색을 표시해줘.'}); else pass('현재 색 표시');

  return results;
};`
    },

    {
      id: 'mission-32',
      titleKo: '미션 32 — 5초 카운트다운 후 GO',
      pitchKo: 'setInterval / clearInterval로 타이머 상태를 만든다.',
      minutes: 20,
      outcomesKo: ['setInterval', 'clearInterval', '상태 업데이트'],
      checklistKo: ['Start 누르면 5→0 카운트다운', '끝나면 GO 표시', '중복 시작 방지'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Countdown</h1>
  <p id="out" class="msg">Ready</p>
  <button id="start" class="primary">Start</button>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 10px 0;font-size:28px;}
.msg{opacity:0.9;margin:0 0 14px 0;font-size:22px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
`,
        js: `const out=document.querySelector('#out');
const start=document.querySelector('#start');

// TODO: Start를 누르면 out에 5,4,3,2,1,0을 표시하고
// 끝나면 GO! 로 바꿔.
// (옵션) 이미 진행 중이면 두 번 시작되지 않게 막아.
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});

  const out=document.querySelector('#out');
  const start=document.querySelector('#start');
  if(!out||!start){ fail('요소 존재', {tab:'html', fix:'#out, #start가 필요해.'}); return results; }
  pass('요소 존재');

  start.click();
  await new Promise(r=>setTimeout(r,120));
  const t=(out.textContent||'').trim();
  if(!t) fail('카운트다운 시작', {tab:'js', fix:'Start 클릭 시 out.textContent를 숫자로 바꿔줘.'}); else pass('카운트다운 시작', t);

  let ok=false;
  for(let i=0;i<70;i++){
    if(/GO/i.test((out.textContent||''))) { ok=true; break; }
    await new Promise(r=>setTimeout(r,100));
  }
  if(!ok) fail('끝나면 GO!', {tab:'js', fix:'카운트다운이 끝나면 out.textContent를 GO! 로 바꿔줘.'}); else pass('끝나면 GO!');

  return results;
};`
    },

    {
      id: 'mission-33',
      titleKo: '미션 33 — 별점 선택(라디오 UI)',
      pitchKo: '여러 버튼 중 하나를 선택하는 UI를 만든다.',
      minutes: 18,
      outcomesKo: ['이벤트 위임', 'dataset', '선택 상태'],
      checklistKo: ['별 1~5 중 클릭한 값 표시', '선택된 별을 강조', '다시 클릭하면 값이 바뀜'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Rating</h1>
  <div id="stars" class="stars">
    <button class="star" data-v="1">★</button>
    <button class="star" data-v="2">★</button>
    <button class="star" data-v="3">★</button>
    <button class="star" data-v="4">★</button>
    <button class="star" data-v="5">★</button>
  </div>
  <p id="val" class="msg">선택: 0</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
.stars{display:flex;gap:6px;}
.star{font-size:26px;line-height:1;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);color:#64748b;padding:10px 12px;border-radius:14px;cursor:pointer;}
.star.on{color:#ffd43b;border-color:rgba(255,212,59,0.35);background:rgba(255,212,59,0.12);}
.msg{opacity:0.9;margin:12px 0 0 0;}
`,
        js: `const stars=document.querySelector('#stars');
const val=document.querySelector('#val');

// TODO: 별을 클릭하면 data-v 값을 읽어서 val.textContent를 업데이트하고
// 선택된 값 이하의 별에 .on 클래스를 붙여줘 (예: 3이면 1~3 on)
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});

  const stars=[...document.querySelectorAll('.star')];
  const val=document.querySelector('#val');
  if(stars.length!==5||!val){ fail('요소 존재', {tab:'html', fix:'.star 5개와 #val 필요'}); return results; }
  pass('요소 존재');

  stars[3].click();
  await new Promise(r=>setTimeout(r,40));
  if(!(val.textContent||'').includes('4')) fail('값 표시', {tab:'js', fix:'#val에 선택 값을 표시해줘.'}); else pass('값 표시');

  const on=[...stars].filter(s=>s.classList.contains('on')).length;
  if(on<4) fail('강조(on) 적용', {tab:'js', fix:'선택 값 이하 별에 on 클래스를 붙여줘.'});
  else pass('강조(on) 적용', 'on='+on);

  return results;
};`
    },

    {
      id: 'mission-34',
      titleKo: '미션 34 — 로컬스토리지에 텍스트 저장/복원',
      pitchKo: '저장/복원으로 ‘새로고침해도 유지’ 경험을 만든다.',
      minutes: 16,
      outcomesKo: ['localStorage', '초기 로드', 'input 이벤트'],
      checklistKo: ['입력하면 localStorage에 저장', '새로고침 시 복원', 'Clear 버튼으로 삭제'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Memo</h1>
  <textarea id="memo" rows="5" placeholder="여기에 메모..."></textarea>
  <div class="row"><button id="clear">Clear</button><span id="hint" class="msg"></span></div>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
textarea{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;resize:vertical;}
.row{display:flex;gap:10px;align-items:center;margin-top:10px;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
.msg{opacity:0.8;}
`,
        js: `const KEY='learn.memo.v1';
const memo=document.querySelector('#memo');
const clear=document.querySelector('#clear');
const hint=document.querySelector('#hint');

// TODO: 페이지 로드시 localStorage에서 KEY를 읽어 textarea에 넣기
// TODO: 입력할 때마다 KEY로 저장
// TODO: Clear 클릭 시 저장 삭제 + textarea 비우기
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});

  const memo=document.querySelector('#memo');
  const clear=document.querySelector('#clear');
  if(!memo||!clear){ fail('요소 존재', {tab:'html', fix:'#memo textarea와 #clear 버튼 필요'}); return results; }
  pass('요소 존재');

  memo.value='abc'; memo.dispatchEvent(new Event('input',{bubbles:true}));
  await new Promise(r=>setTimeout(r,30));
  if(!localStorage.getItem('learn.memo.v1')) fail('저장', {tab:'js', fix:'input에서 localStorage.setItem(KEY, memo.value)'}); else pass('저장');

  clear.click();
  await new Promise(r=>setTimeout(r,30));
  if(localStorage.getItem('learn.memo.v1')) fail('Clear 삭제', {tab:'js', fix:'clear 클릭 시 localStorage.removeItem(KEY)'}); else pass('Clear 삭제');
  if(memo.value.trim()!=='') fail('Clear 비우기', {tab:'js', fix:'clear 클릭 시 memo.value=""'}); else pass('Clear 비우기');

  return results;
};`
    },

    {
      id: 'mission-35',
      titleKo: '미션 35 — 간단 계산기(+, -, ×, ÷)',
      pitchKo: '입력 2개와 연산 버튼 4개로 계산 결과를 만든다.',
      minutes: 22,
      outcomesKo: ['Number 변환', '이벤트 핸들러', '조건 처리'],
      checklistKo: ['사칙연산 버튼 동작', 'NaN 처리(빈값/문자)', '결과를 화면에 표시'],
      defaults: {
        html: `<div class="wrap">
  <h1 class="h1">Calc</h1>
  <div class="row">
    <input id="a" placeholder="A"/>
    <input id="b" placeholder="B"/>
  </div>
  <div class="row">
    <button class="op" data-op="+">+</button>
    <button class="op" data-op="-">-</button>
    <button class="op" data-op="*">×</button>
    <button class="op" data-op="/">÷</button>
  </div>
  <p id="res" class="msg">결과: -</p>
</div>`,
        css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(680px,92vw);}
.h1{margin:0 0 12px 0;font-size:28px;}
.row{display:flex;gap:10px;margin:10px 0;}
input{flex:1;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.06);color:white;outline:none;}
button{border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.08);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
.msg{opacity:0.9;margin:0;}
`,
        js: `const a=document.querySelector('#a');
const b=document.querySelector('#b');
const res=document.querySelector('#res');

// TODO: .op 버튼 클릭 시 data-op에 맞게 계산해서 res.textContent 업데이트
// 힌트: Number(a.value)
`
      },
      testsJs: `window.__learnRunTests = async function(){
  const results=[];
  const pass=(n,d)=>results.push({name:n,pass:true,details:d||''});
  const fail=(n,d)=>results.push({name:n,pass:false,details:d||''});

  const a=document.querySelector('#a');
  const b=document.querySelector('#b');
  const res=document.querySelector('#res');
  const ops=[...document.querySelectorAll('.op')];
  if(!a||!b||!res||ops.length!==4){ fail('요소 존재', {tab:'html', fix:'#a #b #res와 .op 4개 필요'}); return results; }
  pass('요소 존재');

  a.value='8'; b.value='2';
  const plus=ops.find(x=>x.dataset.op==='+');
  plus?.click();
  await new Promise(r=>setTimeout(r,30));
  if(!(res.textContent||'').includes('10')) fail('+ 계산', {tab:'js', fix:'plus 클릭 시 결과가 10'}); else pass('+ 계산');

  const div=ops.find(x=>x.dataset.op==='/');
  div?.click();
  await new Promise(r=>setTimeout(r,30));
  if(!(res.textContent||'').includes('4')) fail('/ 계산', {tab:'js', fix:'나누기 결과 4'}); else pass('/ 계산');

  return results;
};`
    }
  ]
};

export default spec;
