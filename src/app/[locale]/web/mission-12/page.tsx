'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">준비 완료 체크</h1>
  <div class="card">
    <label class="chk"><input id="c1" type="checkbox" /> 노트북 켜기</label>
    <label class="chk"><input id="c2" type="checkbox" /> 물 한 잔</label>
    <label class="chk"><input id="c3" type="checkbox" /> 이어폰</label>

    <div id="status" class="status">아직 준비 중…</div>
    <button id="go" class="primary" disabled>시작</button>
  </div>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(860px,92vw);} .h1{margin:0 0 10px 0;font-size:28px;}
.card{border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.25);border-radius:16px;padding:16px;display:grid;gap:10px;}
.chk{display:flex;gap:10px;align-items:center;opacity:0.9}
.status{margin-top:6px;padding:12px;border-radius:14px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.06);font-weight:800}
button{justify-self:start;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button:hover{background:rgba(255,255,255,0.12);} button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
button:disabled{opacity:0.45;cursor:not-allowed}
`,
  js: `// 목표: 체크박스 3개가 모두 체크되면 "준비 완료" + 버튼 활성화
const c1 = document.getElementById('c1');
const c2 = document.getElementById('c2');
const c3 = document.getElementById('c3');
const status = document.getElementById('status');
const go = document.getElementById('go');

function update(){
  // TODO: c1.checked && c2.checked && c3.checked
  // 모두 true면 status.textContent='준비 완료!' + go.disabled=false
  // 아니면 '아직 준비 중…' + go.disabled=true
}

[c1,c2,c3].forEach(el => el.addEventListener('change', update));
update();
`
};

export default function Mission12() {
  const testsJs = useMemo(() => {
    return `
      window.__learnRunTests = async function() {
        const results = [];
        const pass = (name, details) => results.push({name, pass:true, details: details || ''});
        const fail = (name, details) => results.push({name, pass:false, details: details || ''});

        const c1 = document.getElementById('c1');
        const c2 = document.getElementById('c2');
        const c3 = document.getElementById('c3');
        const status = document.getElementById('status');
        const go = document.getElementById('go');
        if (!c1 || !c2 || !c3 || !status || !go) {
          fail('필수 요소 존재', {tab:'html', fix:'#c1/#c2/#c3/#status/#go 필요'});
          return results;
        }
        pass('필수 요소 존재');

        try {
          c1.checked = true; c2.checked = true; c3.checked = true;
          c1.dispatchEvent(new Event('change', {bubbles:true}));
          await new Promise(r => setTimeout(r, 30));
          const t = (status.textContent || '').trim();
          if (!t.includes('준비') || go.disabled) {
            fail('3개 모두 체크면 준비 완료 + 버튼 활성화', {tab:'js', fix:'AND 조건으로 판정해서 status/go를 업데이트해.', snippet:"function update(){\\n  const ok = c1.checked && c2.checked && c3.checked;\\n  status.textContent = ok ? \"준비 완료!\" : \"아직 준비 중…\";\\n  go.disabled = !ok;\\n}"});
          } else pass('3개 모두 체크면 준비 완료 + 버튼 활성화', t);

          c2.checked = false;
          c2.dispatchEvent(new Event('change', {bubbles:true}));
          await new Promise(r => setTimeout(r, 30));
          if (!go.disabled) fail('하나라도 해제되면 비활성화', {tab:'js', fix:'ok=false일 때 go.disabled=true'});
          else pass('하나라도 해제되면 비활성화');
        } catch (e) {
          fail('준비 완료 판정', String(e && (e.stack || e)));
        }

        return results;
      };
    `;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 12 — 체크박스 3개로 “준비완료” 판정</h1>
        <p className="p">여러 입력을 AND로 묶는 순간, UI가 “상태”가 된다.</p>
      </section>

      <WebSandboxPanel missionId="mission-12" title="Mission 12" defaults={DEFAULT} testsJs={testsJs} minutes={15} nextMissionId="mission-13" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1) checked 3개">{`c1.checked && c2.checked && c3.checked`}</GuideBox>
          <GuideBox title="2) status/go 업데이트">{`ok이면 텍스트/disabled 변경`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
