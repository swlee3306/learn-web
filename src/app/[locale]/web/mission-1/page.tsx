'use client';

import {useTranslations} from 'next-intl';
import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="stage">
  <div class="neon" id="sign">DUSAN</div>
  <button id="btn">색 바꾸기</button>
</div>\n`,
  css: `:root { --c: #00e5ff; }
body { margin: 0; font-family: system-ui; background: #0b1020; color: white; display: grid; place-items: center; height: 100vh; }
.stage { display: grid; gap: 16px; place-items: center; }
.neon {
  font-size: 64px;
  font-weight: 900;
  letter-spacing: 2px;
  color: var(--c);
  text-shadow:
    0 0 10px color-mix(in oklab, var(--c), white 10%),
    0 0 20px var(--c),
    0 0 40px var(--c),
    0 0 80px color-mix(in oklab, var(--c), black 10%);
}
button{
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.06);
  color: white;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
}
button:hover{ background: rgba(255,255,255,0.12); }
`,
  js: `const colors = ["#00e5ff", "#ff2ad4", "#7CFF6B", "#FFD43B"];\nlet i = 0;\n\nconst btn = document.getElementById("btn");\nbtn.addEventListener("click", () => {\n  i = (i + 1) % colors.length;\n  document.documentElement.style.setProperty("--c", colors[i]);\n});\n`
};

export default function Mission1() {
  const t = useTranslations('mission1');

  const testsJs = useMemo(() => {
    // Runs inside the iframe.
    // Avoid nested template literals to keep build tooling happy.
    return `
      window.__learnRunTests = async function() {
        const results = [];
        const pass = (name, details) => results.push({name, pass:true, details: details || ''});
        const fail = (name, details) => results.push({name, pass:false, details: details || ''});

        const sign = document.getElementById('sign');
        if (!sign) fail('Neon sign exists (#sign)', 'Missing element with id="sign"');
        else pass('Neon sign exists (#sign)');

        const btn = document.getElementById('btn');
        if (!btn) fail('Button exists (#btn)', 'Missing element with id="btn"');
        else pass('Button exists (#btn)');

        // HTML sanity: detect obvious broken tags (e.g. "</bu>")
        const badBu = document.getElementsByTagName('bu');
        if (badBu && badBu.length > 0) fail('No broken <bu> tags', 'Found <bu> tag(s). Your HTML might be broken.');
        else pass('No broken <bu> tags');

        // CSS variable changes on click
        try {
          const before = getComputedStyle(document.documentElement).getPropertyValue('--c').trim();
          if (!btn) {
            fail('Click changes CSS variable --c', 'No #btn to click');
          } else {
            btn.click();
            await new Promise(r => setTimeout(r, 30));
            const after = getComputedStyle(document.documentElement).getPropertyValue('--c').trim();
            if (!after) fail('Click changes CSS variable --c', 'After click --c is empty');
            else if (after === before) fail('Click changes CSS variable --c', 'Value did not change (still ' + (before || '(empty)') + ')');
            else pass('Click changes CSS variable --c', (before || '(empty)') + ' → ' + after);
          }
        } catch (e) {
          fail('Click changes CSS variable --c', String(e && (e.stack || e)));
        }

        // Neon visual check
        try {
          if (!sign) {
            fail('Neon has text-shadow', 'No #sign');
          } else {
            const ts = getComputedStyle(sign).textShadow;
            if (!ts || ts === 'none') fail('Neon has text-shadow', 'textShadow=' + ts);
            else pass('Neon has text-shadow');
          }
        } catch (e) {
          fail('Neon has text-shadow', String(e && (e.stack || e)));
        }

        return results;
      };
    `;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>{t('title')}</h1>
        <p className="p"><b>Goal</b>: {t('goal')}<br />{t('hint')}<br />
          <span style={{opacity: 0.9}}><b>검사</b>: 자동 채점(버튼 클릭/스타일/DOM)으로 통과 여부를 확인해.</span>
        </p>
      </section>

      <WebSandboxPanel
        missionId="mission-1"
        title="Mission 1"
        defaults={DEFAULT}
        testsJs={testsJs}
        minutes={12}
        nextMissionId="mission-2"
      />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>초보자용 체크 (How-to 포함)</h3>
        <p className="cardDesc" style={{color: 'var(--muted)'}}>
          아래는 “무엇을” 할지 뿐만 아니라, “어디를” 바꾸면 되는지까지 같이 적어뒀어.
        </p>

        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1) 네온 텍스트를 내 닉네임으로 바꾸기">
            {`HTML 탭에서 이 부분을 찾아서 바꿔:

<div class="neon" id="sign">DUSAN</div>

예)
<div class="neon" id="sign">FLANT</div>

바꾼 후 [실행] 누르면 화면 글자가 즉시 바뀐다.`}
          </GuideBox>

          <GuideBox title="2) colors 배열에 색 2개 추가하기">
            {`JS 탭에서 colors 배열을 찾아서 끝에 2개 더 추가해.

const colors = ["#00e5ff", "#ff2ad4", "#7CFF6B", "#FFD43B"];

예)
const colors = ["#00e5ff", "#ff2ad4", "#7CFF6B", "#FFD43B", "#ff6b6b", "#a78bfa"];

팁: #RRGGBB 형태(16진수)의 색상 코드를 쓴다.`}
          </GuideBox>

          <GuideBox title="3) 버튼 글자를 영어로 바꾸기">
            {`HTML 탭에서 버튼 텍스트만 바꿔.

<button id="btn">색 바꾸기</button>
→
<button id="btn">Change color</button>

주의: id="btn"은 JS가 버튼을 찾는 이름이라 지우면 안 돼.`}
          </GuideBox>
        </div>

        <div style={{marginTop: 14}}>
          <div className="kicker">초보자 치트시트</div>
          <div className="cardDesc" style={{color: 'var(--muted)'}}>
            HTML=뼈대, CSS=꾸미기, JS=동작. “어디를 바꾸는지”만 익숙해져도 1단계는 끝이야.
          </div>
        </div>
      </section>
    </div>
  );
}
