'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Lunch Picker</h1>

  <div class="row">
    <input id="newItem" placeholder="Add menu (e.g. ramen)" />
    <button id="add">Add</button>
    <button id="pick" class="primary">Pick random</button>
  </div>

  <div class="row">
    <input id="dislike" placeholder="Dislike (comma separated)" />
    <button id="saveDislike">Save dislikes</button>
  </div>

  <div id="result" class="result">—</div>

  <div class="k">Menus</div>
  <div id="menus" class="cards"></div>

  <div class="k">This week</div>
  <div id="history" class="cards"></div>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;display:grid;place-items:center;min-height:100vh;}
.wrap{width:min(900px,92vw);}
.h1{font-size:28px;margin:0 0 12px 0;}
.row{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px;}
input{padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.04);color:white;}
button{border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;padding:10px 14px;border-radius:10px;cursor:pointer;}
button:hover{background:rgba(255,255,255,0.12);}
button.primary{background: rgba(124,255,107,0.18); border-color: rgba(124,255,107,0.25)}
.result{margin:12px 0;padding:14px;border-radius:16px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.25);font-size:20px;font-weight:800;}
.k{opacity:0.75;font-size:12px;margin-top:10px;margin-bottom:6px;}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;}
.card{border:1px solid rgba(255,255,255,0.15);border-radius:14px;padding:12px;background:rgba(255,255,255,0.06);}
.cardTitle{font-weight:800;}
.cardMeta{opacity:0.7;font-size:12px;margin-top:6px}
`,
  js: `let menus = ['ramen','sushi','kbbq','salad','tacos'];

const $ = (id) => document.getElementById(id);
const elMenus = $('menus');
const elHistory = $('history');
const elResult = $('result');

function renderCards(el, items){
  el.innerHTML = '';
  for (const x of items) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = '<div class="cardTitle">'+x+'</div>';
    el.appendChild(div);
  }
}

function render(){
  renderCards(elMenus, menus);
  const hist = JSON.parse(localStorage.getItem('lunch.week') || '[]');
  renderCards(elHistory, hist);
}

function randomPick(){
  // TODO: exclude disliked menus when picking
  const idx = Math.floor(Math.random()*menus.length);
  return menus[idx];
}

$('add').addEventListener('click', () => {
  const v = ($('newItem').value || '').trim();
  if (!v) return;
  menus.push(v);
  $('newItem').value = '';
  render();
});

$('pick').addEventListener('click', () => {
  const choice = randomPick();
  elResult.textContent = choice;

  // TODO: weekly history (store in localStorage lunch.week)
});

$('saveDislike').addEventListener('click', () => {
  const raw = ($('dislike').value || '').trim();
  localStorage.setItem('lunch.dislike', raw);
  // TODO: parse dislikes and use them in randomPick()
});

// Test hooks (implement to pass)
window.__lunch_pickFiltered = function(dislikesCsv) { /* TODO */ };
window.__lunch_addToWeekHistory = function(item) { /* TODO */ };

render();
`
};

export default function Mission3() {
  const testsJs = useMemo(() => {
    return `
      window.__learnRunTests = async function() {
        const results = [];
        const pass = (name, details) => results.push({name, pass:true, details: details || ''});
        const fail = (name, details) => results.push({name, pass:false, details: details || ''});

        // 1) Exclude disliked menus
        try {
          if (typeof window.__lunch_pickFiltered !== 'function') {
            fail('싫어하는 메뉴 제외', {tab:'js', fix:'싫어하는 메뉴(dislikesCsv)를 제외하고 랜덤 추천을 반환해.', snippet:'window.__lunch_pickFiltered = function(dislikesCsv) {\n  const dislikes = String(dislikesCsv||"")\n    .split(",")\n    .map(s => s.trim().toLowerCase())\n    .filter(Boolean);\n  const pool = menus.filter(m => !dislikes.includes(String(m).toLowerCase()));\n  if (!pool.length) return null;\n  return pool[Math.floor(Math.random()*pool.length)];\n};'});
          } else {
            const out = window.__lunch_pickFiltered('ramen,salad');
            if (!out) fail('싫어하는 메뉴 제외', {tab:'js', fix:'dislikes를 제외한 pool이 비어있지 않게 처리해(모두 싫어하면 null 반환).'});
            else if (out === 'ramen' || out === 'salad') fail('싫어하는 메뉴 제외', {tab:'js', fix:'dislikes 목록에 있는 메뉴는 반환하면 안 돼. 현재 선택됨: ' + out});
            else pass('싫어하는 메뉴 제외', 'picked=' + out);
          }
        } catch (e) {
          fail('싫어하는 메뉴 제외', String(e && (e.stack || e)));
        }

        // 2) Weekly history in localStorage
        try {
          localStorage.removeItem('lunch.week');
          if (typeof window.__lunch_addToWeekHistory !== 'function') {
            fail('주간 히스토리', {tab:'js', fix:'이번주 히스토리를 localStorage("lunch.week")에 배열로 누적 저장해.', snippet:'window.__lunch_addToWeekHistory = function(item) {\n  const raw = localStorage.getItem("lunch.week") || "[]";\n  const arr = JSON.parse(raw);\n  const next = Array.isArray(arr) ? arr : [];\n  next.unshift(String(item));\n  localStorage.setItem("lunch.week", JSON.stringify(next.slice(0, 7)));\n};'});
          } else {
            window.__lunch_addToWeekHistory('sushi');
            window.__lunch_addToWeekHistory('tacos');
            const arr = JSON.parse(localStorage.getItem('lunch.week') || '[]');
            if (!Array.isArray(arr)) fail('주간 히스토리', {tab:'js', fix:'localStorage lunch.week는 JSON 배열이어야 해.'});
            else if (arr.length < 2) fail('주간 히스토리', {tab:'js', fix:'2번 이상 추가하면 배열 길이가 2 이상이 되게 누적해.'});
            else pass('주간 히스토리', 'count=' + arr.length);
          }
        } catch (e) {
          fail('주간 히스토리', String(e && (e.stack || e)));
        }

        // 3) Card UI present
        try {
          const cards = document.querySelectorAll('.card');
          if (!cards || cards.length < 3) fail('UI 카드형 정리', '.card 요소가 충분하지 않음');
          else pass('UI 카드형 정리', 'cards=' + cards.length);
        } catch (e) {
          fail('UI 카드형 정리', String(e && (e.stack || e)));
        }

        return results;
      };
    `;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 3 — 랜덤 점심 추천기</h1>
        <p className="p">배열/랜덤/함수로 정리. <b>검사</b>를 통과하도록 기능을 추가해봐.</p>
      </section>

      <WebSandboxPanel missionId="mission-3" title="Mission 3" defaults={DEFAULT} testsJs={testsJs} minutes={18} nextMissionId="mission-4" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1) 싫어하는 메뉴 제외 기능">
            {`window.__lunch_pickFiltered(dislikesCsv)를 구현해.
- dislikesCsv 예: "ramen,salad"
- 결과는 dislikes에 포함되지 않은 메뉴여야 함`}
          </GuideBox>
          <GuideBox title="2) 주간 히스토리">
            {`window.__lunch_addToWeekHistory(item)에서 localStorage "lunch.week"를 배열로 저장해.
(중복 방지/최대 7개 같은 룰을 추가하면 더 좋다)`}
          </GuideBox>
          <GuideBox title="3) UI 카드형으로 정리">
            {`현재도 .card를 쓰고 있어. 메뉴/히스토리를 카드로 유지하고, 보기 좋게 다듬어봐.`}
          </GuideBox>
        </div>
      </section>
    </div>
  );
}
