'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Todo</h1>

  <div class="row">
    <input id="text" placeholder="Add a task" />
    <button id="add" class="primary">Add</button>
    <button id="clear">Clear</button>
  </div>

  <div class="row">
    <button id="fAll" class="pill">All</button>
    <button id="fTodo" class="pill">Todo</button>
    <button id="fDone" class="pill">Done</button>
  </div>

  <div id="list" class="list"></div>

  <div class="hint">Tip: Ctrl/⌘ + Enter 로 추가 (TODO)</div>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;display:grid;place-items:center;min-height:100vh;}
.wrap{width:min(900px,92vw);}
.h1{font-size:28px;margin:0 0 12px 0;}
.row{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px;}
input{padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.04);color:white;}
button{border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;padding:10px 14px;border-radius:10px;cursor:pointer;}
button:hover{background:rgba(255,255,255,0.12);}
button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.pill{border-radius:999px;padding:8px 12px;}
.list{display:grid;gap:10px;margin-top:10px;}
.item{display:flex;justify-content:space-between;gap:10px;align-items:center;border:1px solid rgba(255,255,255,0.15);border-radius:14px;padding:12px;background:rgba(0,0,0,0.25)}
.item.done{opacity:0.7;text-decoration:line-through;}
.small{font-size:12px;opacity:0.75}
.hint{margin-top:10px;font-size:12px;opacity:0.7}
`,
  js: `let items = [];
let filter = 'all';

const $ = (id) => document.getElementById(id);
const elList = $('list');

function save(){
  // TODO: persist items to localStorage key 'todo.items'
}

function load(){
  // TODO: load items from localStorage
}

function render(){
  elList.innerHTML = '';
  const view = items.filter(it => {
    if (filter === 'todo') return !it.done;
    if (filter === 'done') return it.done;
    return true;
  });

  for (const it of view) {
    const row = document.createElement('div');
    row.className = 'item' + (it.done ? ' done' : '');
    row.innerHTML = '<div>'+it.text+'</div>';
    const right = document.createElement('div');
    const btn = document.createElement('button');
    btn.textContent = it.done ? 'Undo' : 'Done';
    btn.addEventListener('click', () => { it.done = !it.done; save(); render(); });
    right.appendChild(btn);
    row.appendChild(right);
    elList.appendChild(row);
  }
}

function addItem(){
  const v = ($('text').value || '').trim();
  if (!v) return;
  items.unshift({id: String(Date.now()), text: v, done: false});
  $('text').value = '';
  save();
  render();
}

$('add').addEventListener('click', addItem);
$('clear').addEventListener('click', () => { items = []; save(); render(); });

$('fAll').addEventListener('click', () => { filter='all'; render(); });
$('fTodo').addEventListener('click', () => { filter='todo'; render(); });
$('fDone').addEventListener('click', () => { filter='done'; render(); });

// TODO: keyboard shortcut Ctrl/⌘ + Enter to add

// Test hooks
window.__todo_setFilter = function(f) { /* TODO */ };
window.__todo_saveNow = function() { /* TODO */ };
window.__todo_onShortcut = function() { /* TODO */ };

load();
render();
`
};

export default function Mission5() {
  const testsJs = useMemo(() => {
    return `
      window.__learnRunTests = async function() {
        const results = [];
        const pass = (name, details) => results.push({name, pass:true, details: details || ''});
        const fail = (name, details) => results.push({name, pass:false, details: details || ''});

        // 1) Filters
        try {
          if (typeof window.__todo_setFilter !== 'function') {
            fail('완료/미완료 필터', {tab:'js', fix:'filter 상태를 변경/조회할 수 있게 window.__todo_setFilter를 구현해.', snippet:'window.__todo_setFilter = function(f) {\n  if (f === "__get") return filter;\n  filter = f;\n  render();\n  return filter;\n};'});
          } else {
            window.__todo_setFilter('done');
            const f = window.__todo_setFilter('__get');
            if (f !== 'done') fail('완료/미완료 필터', {tab:'js', fix:'"__get"으로 호출하면 현재 filter를 반환하게 해.'});
            else pass('완료/미완료 필터');
          }
        } catch (e) {
          fail('완료/미완료 필터', String(e && (e.stack || e)));
        }

        // 2) Local persistence
        try {
          localStorage.removeItem('todo.items');
          if (typeof window.__todo_saveNow !== 'function') {
            fail('로컬 저장', {tab:'js', fix:'items 배열을 localStorage("todo.items")에 JSON으로 저장/로드해.', snippet:'function save(){\n  localStorage.setItem("todo.items", JSON.stringify(items));\n}\nfunction load(){\n  const raw = localStorage.getItem("todo.items") || "[]";\n  const arr = JSON.parse(raw);\n  items = Array.isArray(arr) ? arr : [];\n}\nwindow.__todo_saveNow = function(){ save(); return true; };'});
          } else {
            window.__todo_saveNow();
            const raw = localStorage.getItem('todo.items');
            if (!raw) fail('로컬 저장', {tab:'js', fix:'localStorage "todo.items"가 비어있어. 저장 로직을 넣어.'});
            else {
              const arr = JSON.parse(raw);
              if (!Array.isArray(arr)) fail('로컬 저장', {tab:'js', fix:'todo.items는 JSON 배열이어야 해.'});
              else pass('로컬 저장');
            }
          }
        } catch (e) {
          fail('로컬 저장', String(e && (e.stack || e)));
        }

        // 3) Keyboard shortcut
        try {
          if (typeof window.__todo_onShortcut !== 'function') {
            fail('키보드 단축키', {tab:'js', fix:'Ctrl/⌘+Enter를 감지해서 addItem()을 호출해. 테스트용 함수도 true를 반환해.', snippet:'window.__todo_onShortcut = function(){\n  // 테스트에서 호출될 때 통과용\n  return true;\n};\ndocument.getElementById("text").addEventListener("keydown", (e) => {\n  const isEnter = e.key === "Enter";\n  const mod = e.ctrlKey || e.metaKey;\n  if (isEnter && mod) addItem();\n});'});
          } else {
            const ok = Boolean(window.__todo_onShortcut());
            if (!ok) fail('키보드 단축키', {tab:'js', fix:'단축키 처리 함수가 true를 반환하도록 하고, 실제 keydown에서 addItem() 호출도 연결해.'});
            else pass('키보드 단축키');
          }
        } catch (e) {
          fail('키보드 단축키', String(e && (e.stack || e)));
        }

        return results;
      };
    `;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 5 — 간단 TODO + 필터</h1>
        <p className="p">추가/완료/필터/저장. <b>검사</b>를 통과하도록 기능을 추가해봐.</p>
      </section>

      <WebSandboxPanel missionId="mission-5" title="Mission 5" defaults={DEFAULT} testsJs={testsJs} minutes={22} />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1) 완료/미완료 필터">
            {`filter 상태를 관리하고, window.__todo_setFilter로 변경/조회 가능하게 만들어.`}
          </GuideBox>
          <GuideBox title="2) 로컬 저장">
            {`items를 localStorage 'todo.items'에 저장/로드해.`}
          </GuideBox>
          <GuideBox title="3) 키보드 단축키">
            {`Ctrl(또는 ⌘)+Enter를 누르면 addItem()이 실행되게 만들어.`}
          </GuideBox>
        </div>
      </section>
    </div>
  );
}
