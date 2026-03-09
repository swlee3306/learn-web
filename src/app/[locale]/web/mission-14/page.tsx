'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">병원 호출벨</h1>
  <div class="card">
    <div id="msg" class="msg">버튼을 3번 누르면 간호사가 호출돼.</div>
    <div class="row">
      <button id="bell" class="primary">🔔 호출</button>
      <button id="reset">Reset</button>
    </div>
    <div class="small">누른 횟수: <span id="n">0</span></div>
  </div>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(860px,92vw);} .h1{margin:0 0 10px 0;font-size:28px;}
.card{border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.25);border-radius:16px;padding:16px;display:grid;gap:12px;}
.msg{padding:12px;border-radius:14px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.06);font-weight:900}
.row{display:flex;gap:10px;flex-wrap:wrap}
button{border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button:hover{background:rgba(255,255,255,0.12);} button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.small{opacity:0.75;font-size:12px}
`,
  js: `// 목표: bell을 누른 횟수를 누적해서 3 이상이면 msg를 변경
let count = 0;
const elN = document.getElementById('n');
const msg = document.getElementById('msg');

function render(){
  elN.textContent = String(count);

  // TODO: if (count >= 3) msg.textContent = '간호사 호출됨!';
  // 아니면 기본 문구 유지
}

document.getElementById('bell').addEventListener('click', () => {
  count++;
  render();
});

document.getElementById('reset').addEventListener('click', () => {
  count = 0;
  render();
});

render();
`
};

export default function Mission14() {
  const testsJs = useMemo(() => {
    return `
      window.__learnRunTests = async function() {
        const results = [];
        const pass = (name, details) => results.push({name, pass:true, details: details || ''});
        const fail = (name, details) => results.push({name, pass:false, details: details || ''});

        const bell = document.getElementById('bell');
        const msg = document.getElementById('msg');
        const elN = document.getElementById('n');
        if (!bell || !msg || !elN) {
          fail('필수 요소 존재', {tab:'html', fix:'#bell/#msg/#n 필요'});
          return results;
        }
        pass('필수 요소 존재');

        try {
          // press 3 times
          bell.click(); bell.click(); bell.click();
          await new Promise(r => setTimeout(r, 30));
          const t = (msg.textContent || '').trim();
          if (!t.includes('호출')) {
            fail('3번 누르면 호출됨 표시', {tab:'js', fix:'render()에서 count>=3이면 msg.textContent를 바꿔.', snippet:"function render(){\\n  elN.textContent = String(count);\\n  if (count >= 3) msg.textContent = \"간호사 호출됨!\";\\n  else msg.textContent = \"버튼을 3번 누르면 간호사가 호출돼.\";\\n}"});
          } else pass('3번 누르면 호출됨 표시', t);
        } catch (e) {
          fail('호출벨 로직', String(e && (e.stack || e)));
        }

        return results;
      };
    `;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 14 — 병원 호출벨(3번 누르면 호출됨)</h1>
        <p className="p">누적 횟수(state) + 조건문. 아주 실전 패턴.</p>
      </section>

      <WebSandboxPanel missionId="mission-14" title="Mission 14" defaults={DEFAULT} testsJs={testsJs} minutes={15} nextMissionId="mission-15" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1) count 누적">{`클릭할 때마다 count++`}</GuideBox>
          <GuideBox title="2) if (count>=3)">{`메시지를 바꾼다`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
