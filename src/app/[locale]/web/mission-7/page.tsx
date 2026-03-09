'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">Counter</h1>
  <div class="card">
    <div class="count"><span id="count">0</span></div>
    <div class="row">
      <button id="inc" class="primary">+1</button>
      <button id="dec">-1</button>
    </div>
    <div class="hint">(옵션) 0 아래로 안 내려가게 만들면 더 좋음</div>
  </div>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(860px,92vw);} .h1{margin:0 0 10px 0;font-size:28px;}
.card{border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.25);border-radius:16px;padding:16px;}
.count{font-size:56px;font-weight:900;letter-spacing:1px;text-align:center;margin:8px 0 12px 0;}
.row{display:flex;gap:10px;justify-content:center;}
button{border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button:hover{background:rgba(255,255,255,0.12);} button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.hint{margin-top:10px;font-size:12px;opacity:0.7;text-align:center}
`,
  js: `// 목표: +1/-1 버튼으로 숫자를 바꿔서 #count에 표시하기

let n = 0;
const el = document.getElementById('count');

function render(){
  el.textContent = String(n);
}

// TODO: #inc 클릭 시 n = n + 1; render()
// TODO: #dec 클릭 시 n = n - 1; render()
// (옵션) n이 0 아래로 내려가지 않게 clamp 해봐.

render();
`
};

export default function Mission7() {
  const testsJs = useMemo(() => {
    return `
      window.__learnRunTests = async function() {
        const results = [];
        const pass = (name, details) => results.push({name, pass:true, details: details || ''});
        const fail = (name, details) => results.push({name, pass:false, details: details || ''});

        const inc = document.getElementById('inc');
        const el = document.getElementById('count');
        if (!inc) fail('+1 버튼 존재 (#inc)', {tab:'html', fix:'id="inc" 버튼을 만들어줘.'});
        else pass('+1 버튼 존재 (#inc)');
        if (!el) fail('카운트 표시 (#count)', {tab:'html', fix:'id="count" 요소를 만들어줘.'});
        else pass('카운트 표시 (#count)');

        try {
          if (!inc || !el) return results;
          el.textContent = '0';
          inc.click();
          inc.click();
          await new Promise(r => setTimeout(r, 30));
          const v = (el.textContent || '').trim();
          if (v !== '2') fail('클릭 2번이면 2', {tab:'js', fix:'click 이벤트에서 n을 증가시키고 render()를 호출해.', snippet:"document.getElementById(\"inc\").addEventListener(\"click\", () => {\\n  n = n + 1;\\n  render();\\n});"});
          else pass('클릭 2번이면 2');
        } catch (e) {
          fail('클릭 2번이면 2', String(e && (e.stack || e)));
        }

        return results;
      };
    `;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 7 — 카운터 +1 만들기</h1>
        <p className="p">숫자 상태를 바꾸고 화면에 반영해봐. <b>검사</b> 통과!</p>
      </section>

      <WebSandboxPanel missionId="mission-7" title="Mission 7" defaults={DEFAULT} testsJs={testsJs} minutes={12} nextMissionId="mission-8" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1) +1 구현">{`#inc 클릭 시 n을 1 증가시키고 render() 호출`}</GuideBox>
          <GuideBox title="2) -1 구현(옵션)">{`#dec 클릭 시 n을 1 감소시키고 render() 호출`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
