'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Reset Counter</h1>
  <div class="card">
    <div class="count"><span id="count">0</span></div>
    <div class="row">
      <button id="inc" class="primary">+1</button>
      <button id="reset">Reset</button>
    </div>
    <div class="hint">목표: render()로 화면 업데이트를 한 곳에서 처리</div>
  </div>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(860px,92vw);} .h1{margin:0 0 10px 0;font-size:28px;}
.card{border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.25);border-radius:16px;padding:16px;}
.count{font-size:56px;font-weight:900;text-align:center;margin:8px 0 12px 0;}
.row{display:flex;gap:10px;justify-content:center;}
button{border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button:hover{background:rgba(255,255,255,0.12);} button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.hint{margin-top:10px;font-size:12px;opacity:0.7;text-align:center}
`,
  js: `let n = 0;
const el = document.getElementById('count');

function render(){
  el.textContent = String(n);
}

function inc(){
  // TODO: n을 증가시키고 render() 호출
}

function reset(){
  // TODO: n을 0으로 만들고 render() 호출
}

document.getElementById('inc').addEventListener('click', inc);
document.getElementById('reset').addEventListener('click', reset);

// (옵션) 키보드 R을 누르면 reset() 실행

render();
`
};

export default function Mission8() {
  const testsJs = useMemo(() => {
    return `
      window.__learnRunTests = async function() {
        const results = [];
        const pass = (name, details) => results.push({name, pass:true, details: details || ''});
        const fail = (name, details) => results.push({name, pass:false, details: details || ''});

        const inc = document.getElementById('inc');
        const reset = document.getElementById('reset');
        const el = document.getElementById('count');

        if (!inc) fail('+1 버튼 (#inc)', {tab:'html', fix:'id="inc" 버튼이 필요해.'});
        else pass('+1 버튼 (#inc)');
        if (!reset) fail('Reset 버튼 (#reset)', {tab:'html', fix:'id="reset" 버튼이 필요해.'});
        else pass('Reset 버튼 (#reset)');
        if (!el) fail('카운트 표시 (#count)', {tab:'html', fix:'id="count" 요소가 필요해.'});
        else pass('카운트 표시 (#count)');

        try {
          if (!inc || !reset || !el) return results;
          el.textContent = '0';
          inc.click(); inc.click(); inc.click();
          await new Promise(r => setTimeout(r, 30));
          if ((el.textContent || '').trim() !== '3') {
            fail('증가 동작', {tab:'js', fix:'inc()에서 n을 올리고 render() 호출해.', snippet:"function inc(){\\n  n = n + 1;\\n  render();\\n}"});
          } else pass('증가 동작');

          reset.click();
          await new Promise(r => setTimeout(r, 30));
          if ((el.textContent || '').trim() !== '0') {
            fail('리셋 동작', {tab:'js', fix:'reset()에서 n=0 후 render() 호출해.', snippet:"function reset(){\\n  n = 0;\\n  render();\\n}"});
          } else pass('리셋 동작');
        } catch (e) {
          fail('동작 테스트', String(e && (e.stack || e)));
        }

        return results;
      };
    `;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 8 — 0으로 리셋 버튼 추가</h1>
        <p className="p">중복을 줄이려면 <b>render()</b>가 핵심. 검사 통과해봐.</p>
      </section>

      <WebSandboxPanel missionId="mission-8" title="Mission 8" defaults={DEFAULT} testsJs={testsJs} minutes={12} nextMissionId="mission-9" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1) inc() 구현">{`n = n + 1; render();`}</GuideBox>
          <GuideBox title="2) reset() 구현">{`n = 0; render();`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
