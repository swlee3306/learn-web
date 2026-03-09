'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">인사하기</h1>
  <div class="card">
    <form id="f" class="row">
      <input id="name" placeholder="이름" />
      <button class="primary" type="submit">인사</button>
    </form>
    <div id="out" class="out">(여기에 결과)</div>
  </div>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(860px,92vw);} .h1{margin:0 0 10px 0;font-size:28px;}
.card{border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.25);border-radius:16px;padding:16px;}
.row{display:flex;gap:10px;flex-wrap:wrap;}
input{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.04);color:white;}
button{border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button:hover{background:rgba(255,255,255,0.12);} button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.out{margin-top:14px;padding:12px;border-radius:14px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.06);}
`,
  js: `// 목표: form submit 시 input value를 읽어서 인사 문장을 #out에 출력
const form = document.getElementById('f');
const input = document.getElementById('name');
const out = document.getElementById('out');

form.addEventListener('submit', (e) => {
  // TODO: 새로고침 방지 (preventDefault)
  // TODO: input.value를 읽어서 out.textContent 갱신
  // (옵션) 빈 값이면 "이름을 입력해줘" 같은 문구
});
`
};

export default function Mission11() {
  const testsJs = useMemo(() => {
    return `
      window.__learnRunTests = async function() {
        const results = [];
        const pass = (name, details) => results.push({name, pass:true, details: details || ''});
        const fail = (name, details) => results.push({name, pass:false, details: details || ''});

        const form = document.getElementById('f');
        const input = document.getElementById('name');
        const out = document.getElementById('out');
        if (!form || !input || !out) {
          fail('필수 요소 존재', {tab:'html', fix:'#f/#name/#out이 필요해.'});
          return results;
        }
        pass('필수 요소 존재');

        try {
          input.value = 'Lee';
          form.dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
          await new Promise(r => setTimeout(r, 30));
          const t = (out.textContent || '').trim();
          if (!t || !t.includes('Lee')) {
            fail('이름을 포함한 인사 출력', {tab:'js', fix:'submit에서 preventDefault 후 out.textContent를 업데이트해.', snippet:"form.addEventListener(\"submit\", (e) => {\\n  e.preventDefault();\\n  const name = input.value.trim();\\n  out.textContent = \"안녕, \" + name + \"!\";\\n});"});
          } else pass('이름을 포함한 인사 출력', t);
        } catch (e) {
          fail('이름을 포함한 인사 출력', String(e && (e.stack || e)));
        }

        return results;
      };
    `;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 11 — 입력창 받아서 인사하기</h1>
        <p className="p">폼 submit과 input value를 다루는 기본기 미션.</p>
      </section>

      <WebSandboxPanel missionId="mission-11" title="Mission 11" defaults={DEFAULT} testsJs={testsJs} minutes={15} nextMissionId="mission-12" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1) preventDefault">{`submit하면 기본 동작(새로고침)을 막아야 해`}</GuideBox>
          <GuideBox title="2) input.value 읽기">{`trim() 해서 공백 제거하고 문장 만들기`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
