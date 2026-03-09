'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Typing Game</h1>

  <div class="bar">
    <button id="start">Start</button>
    <span class="pill">Time: <b id="time">30</b>s</span>
    <span class="pill">Score: <b id="score">0</b></span>
    <span class="pill">Best: <b id="best">-</b></span>
  </div>

  <div id="stage" class="stage">
    <div class="word" id="word">ready</div>
    <input id="input" placeholder="type here" autocomplete="off" />
    <div class="hint">Enter 키로 제출</div>
  </div>

  <div class="row">
    <label class="small">Mode:</label>
    <select id="mode">
      <option value="30" selected>30s</option>
      <!-- TODO: add 60s mode here -->
    </select>
  </div>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;display:grid;place-items:center;min-height:100vh;}
.wrap{width:min(900px,92vw);}
.h1{font-size:28px;margin:0 0 12px 0;}
.bar{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px;}
.pill{border:1px solid rgba(255,255,255,0.2);padding:6px 10px;border-radius:999px;background:rgba(255,255,255,0.06);}
button{border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;padding:10px 14px;border-radius:10px;cursor:pointer;}
button:hover{background:rgba(255,255,255,0.12);}
.stage{border:1px solid rgba(255,255,255,0.15);border-radius:16px;padding:16px;background:rgba(0,0,0,0.25);display:grid;gap:12px;}
.word{font-size:34px;font-weight:900;letter-spacing:1px;}
input{padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.04);color:white;}
.hint{opacity:0.75;font-size:12px;}
.row{margin-top:10px;display:flex;gap:10px;align-items:center;opacity:0.9}
.small{font-size:12px;opacity:0.8}

/* TODO: add success animation class. Example:
.stage.win { animation: pop 180ms ease-out; }
@keyframes pop { from { transform: scale(0.98); } to { transform: scale(1); } }
*/
`,
  js: `const WORDS = ["code", "neon", "state", "timer", "dom", "learn", "build", "ship", "focus", "debug"];\n\nlet time = 30;\nlet score = 0;\nlet best = null;\nlet tick = null;\n\nconst elTime = document.getElementById('time');\nconst elScore = document.getElementById('score');\nconst elBest = document.getElementById('best');\nconst elWord = document.getElementById('word');\nconst elInput = document.getElementById('input');\nconst elStart = document.getElementById('start');\nconst elMode = document.getElementById('mode');\nconst elStage = document.getElementById('stage');\n\nfunction pick(){\n  const w = WORDS[Math.floor(Math.random()*WORDS.length)];\n  elWord.textContent = w;\n}\n\nfunction render(){\n  elTime.textContent = String(time);\n  elScore.textContent = String(score);\n  elBest.textContent = best == null ? '-' : String(best);\n}\n\nfunction stop(){\n  if (tick) clearInterval(tick);\n  tick = null;\n}\n\nfunction start(){\n  stop();\n  score = 0;\n  time = Number(elMode.value || 30);\n  pick();\n  render();\n  elInput.value = '';\n  elInput.focus();\n  tick = setInterval(() => {\n    time -= 1;\n    if (time <= 0) {\n      time = 0;\n      stop();\n      // TODO: update best score in localStorage here\n      // TODO: call window.__typing_onGameEnd(score)\n    }\n    render();\n  }, 1000);\n}\n\nfunction submit(){\n  const ans = (elInput.value || '').trim();\n  const target = (elWord.textContent || '').trim();\n  if (!ans) return;\n  if (ans === target) {\n    score += 1;\n    pick();\n    // TODO: success animation (add/remove class on stage)\n    // TODO: call window.__typing_onCorrect()\n  }\n  elInput.value = '';\n  render();\n}\n\nelStart.addEventListener('click', start);\nelInput.addEventListener('keydown', (e) => {\n  if (e.key === 'Enter') submit();\n});\n\n// Hooks for tests (do not remove)
window.__typing_onGameEnd = function(s) { /* TODO */ };
window.__typing_onCorrect = function() { /* TODO */ };
\nrender();\n`
};

export default function Mission2() {
  const testsJs = useMemo(() => {
    return String.raw`
      window.__learnRunTests = async function() {
        const results = [];
        const pass = (name, details) => results.push({name, pass:true, details: details || ''});
        const fail = (name, details) => results.push({name, pass:false, details: details || ''});

        // 1) 60s mode exists
        try {
          const mode = document.getElementById('mode');
          let ok = false;
          if (mode && mode.tagName === 'SELECT') {
            const opt = Array.from(mode.querySelectorAll('option')).find(o => String(o.value) === '60');
            ok = Boolean(opt);
          }
          if (!ok) fail('60초 모드 존재', {tab:'html', fix:'<select id="mode"> 안에 60초 옵션을 추가해.', snippet:'<option value="60">60s</option>'});
          else pass('60초 모드 존재');
        } catch (e) {
          fail('60초 모드 존재', String(e && (e.stack || e)));
        }

        // 2) Best score saved in localStorage
        try {
          localStorage.removeItem('typing.best');
          if (typeof window.__typing_onGameEnd !== 'function') {
            fail('최고 기록 저장', {tab:'js', fix:'window.__typing_onGameEnd(score)에서 localStorage에 최고기록을 저장해.', snippet:'window.__typing_onGameEnd = function(score) {\n  const prev = Number(localStorage.getItem("typing.best") || 0);\n  const next = Math.max(prev, Number(score||0));\n  localStorage.setItem("typing.best", String(next));\n};'});
          } else {
            window.__typing_onGameEnd(7);
            const v = localStorage.getItem('typing.best');
            if (v === '7' || Number(v) === 7) pass('최고 기록 저장');
            else fail('최고 기록 저장', {tab:'js', fix:'localStorage 키 "typing.best"에 점수를 저장해. (문자열로 저장)', snippet:'localStorage.setItem("typing.best", String(score));'});
          }
        } catch (e) {
          fail('최고 기록 저장', String(e && (e.stack || e)));
        }

        // 3) Success animation on correct
        try {
          const stage = document.getElementById('stage');
          if (!stage) {
            fail('정답 애니메이션', {tab:'html', fix:'#stage 요소가 있어야 해. HTML에서 id="stage"를 유지해.'});
          } else if (typeof window.__typing_onCorrect !== 'function') {
            fail('정답 애니메이션', {tab:'js', fix:'정답일 때 #stage에 win 클래스를 잠깐 붙이도록 구현해.', snippet:'window.__typing_onCorrect = function() {\n  const el = document.getElementById("stage");\n  if (!el) return;\n  el.classList.add("win");\n  setTimeout(() => el.classList.remove("win"), 180);\n};'});
          } else {
            stage.classList.remove('win');
            window.__typing_onCorrect();
            await new Promise(r => setTimeout(r, 30));
            const has = stage.classList.contains('win');
            if (!has) fail('정답 애니메이션', {tab:'js', fix:'정답 시 #stage.classList.add("win")이 실행되게 해.'});
            else pass('정답 애니메이션');
          }
        } catch (e) {
          fail('정답 애니메이션', String(e && (e.stack || e)));
        }

        return results;
      };
    `;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 2 — 타이핑 속도 미니게임</h1>
        <p className="p">
          타이머(setInterval) + 상태(state) + DOM 업데이트를 게임으로 익힌다. <b>검사</b>를 통과하도록 기능을 추가해봐.
        </p>
      </section>

      <WebSandboxPanel missionId="mission-2" title="Mission 2" defaults={DEFAULT} testsJs={testsJs} minutes={15} nextMissionId="mission-3" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1) 60초 모드 추가">
            {`HTML: <select id="mode"> 안에 <option value="60">60s</option> 를 추가해.
JS: start()에서 time을 mode 값으로 설정하고 있어.`}
          </GuideBox>
          <GuideBox title="2) 최고 기록(localStorage) 저장">
            {`JS: window.__typing_onGameEnd(score) 안에서 localStorage.setItem("typing.best", String(score)) 처럼 저장해.
그리고 score가 best보다 클 때만 갱신하도록 하면 더 좋다.`}
          </GuideBox>
          <GuideBox title="3) 정답 애니메이션">
            {`CSS: .stage.win 애니메이션을 만들고,
JS: window.__typing_onCorrect()에서 stage.classList.add("win") 후, setTimeout으로 제거해.`}
          </GuideBox>
        </div>
      </section>
    </div>
  );
}
