'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">10이면 축하!</h1>
  <div class="card">
    <div class="count"><span id="count">0</span></div>
    <div class="row">
      <button id="inc" class="primary">+1</button>
      <button id="dec">-1</button>
    </div>
    <div id="congrats" class="congrats hidden">🎉 10 달성! 축하해!</div>
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
.congrats{margin-top:14px;text-align:center;padding:12px;border-radius:14px;border:1px solid rgba(124,255,107,0.35);background:rgba(124,255,107,0.10);font-weight:800;}
.hidden{display:none;}
`,
  js: `let n = 0;
const el = document.getElementById('count');
const box = document.getElementById('congrats');

function render(){
  el.textContent = String(n);

  // TODO: n이 10이면 축하 메시지(#congrats)를 보여주고,
  // 10이 아니면 숨겨.
  // 힌트: box.classList.add('hidden') / remove('hidden')
}

document.getElementById('inc').addEventListener('click', () => { n++; render(); });
document.getElementById('dec').addEventListener('click', () => { n--; render(); });

render();
`
};

export default function Mission9() {
  const testsJs = useMemo(() => {
    return `
      window.__learnRunTests = async function() {
        const results = [];
        const pass = (name, details) => results.push({name, pass:true, details: details || ''});
        const fail = (name, details) => results.push({name, pass:false, details: details || ''});

        const inc = document.getElementById('inc');
        const dec = document.getElementById('dec');
        const box = document.getElementById('congrats');
        const el = document.getElementById('count');
        if (!inc || !dec || !box || !el) {
          fail('필수 요소 존재', {tab:'html', fix:'#inc/#dec/#count/#congrats가 필요해.'});
          return results;
        }
        pass('필수 요소 존재');

        const isHidden = () => box.classList.contains('hidden') || getComputedStyle(box).display === 'none';

        try {
          // reach 10
          for (let i=0;i<10;i++) inc.click();
          await new Promise(r => setTimeout(r, 30));
          if (String(el.textContent).trim() !== '10') fail('카운트 10 도달', {tab:'js', fix:'inc가 n을 올리고 render()를 호출해야 해.'});
          else pass('카운트 10 도달');

          if (isHidden()) {
            fail('10이면 축하 메시지 표시', {tab:'js', fix:'n===10일 때 hidden 클래스를 제거해.', snippet:"function render(){\\n  el.textContent = String(n);\\n  if (n === 10) box.classList.remove(\"hidden\");\\n  else box.classList.add(\"hidden\");\\n}"});
          } else pass('10이면 축하 메시지 표시');

          // go back to 9
          dec.click();
          await new Promise(r => setTimeout(r, 30));
          if (!isHidden()) {
            fail('10이 아니면 다시 숨김', {tab:'js', fix:'n!==10이면 hidden을 다시 추가해.'});
          } else pass('10이 아니면 다시 숨김');
        } catch (e) {
          fail('조건문 UI', String(e && (e.stack || e)));
        }

        return results;
      };
    `;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 9 — 조건문(10이면 축하 메시지)</h1>
        <p className="p">if 하나로 UI를 바꿔보자. <b>검사</b> 통과하면 완료.</p>
      </section>

      <WebSandboxPanel missionId="mission-9" title="Mission 9" defaults={DEFAULT} testsJs={testsJs} minutes={15} nextMissionId="mission-10" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1) n===10이면 보여주기">{`box.classList.remove('hidden')`}</GuideBox>
          <GuideBox title="2) 그 외에는 숨기기">{`box.classList.add('hidden')`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
