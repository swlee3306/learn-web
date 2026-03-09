'use client';

import {useMemo} from 'react';
import GuideBox from '@/components/GuideBox';
import WebSandboxPanel from '@/components/WebSandboxPanel';

const DEFAULT = {
  html: `<div class="wrap">
  <h1 class="h1">오늘의 노래</h1>
  <div class="card">
    <p class="desc">버튼을 누르면 랜덤으로 1곡을 뽑아줘.</p>
    <button id="pick" class="primary">뽑기</button>
    <div class="song" id="song">(아직 안 뽑음)</div>
  </div>
</div>
`,
  css: `body{margin:0;font-family:system-ui;background:#0b1020;color:white;min-height:100vh;display:grid;place-items:center;}
.wrap{width:min(860px,92vw);} .h1{margin:0 0 10px 0;font-size:28px;}
.card{border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.25);border-radius:16px;padding:16px;}
.desc{margin:0 0 12px 0;opacity:0.85}
button{border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.06);color:white;padding:10px 14px;border-radius:12px;cursor:pointer;}
button:hover{background:rgba(255,255,255,0.12);} button.primary{background: rgba(255,212,59,0.18); border-color: rgba(255,212,59,0.25)}
.song{margin-top:14px;font-size:20px;font-weight:800;padding:12px;border-radius:14px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.06)}
`,
  js: `// 목표: songs 배열에서 랜덤 1곡을 뽑아서 #song에 표시
const songs = [
  'Nujabes - Feather',
  'Kendrick Lamar - LOVE.',
  'IU - 밤편지',
  'Bruno Mars - 24K Magic',
  'Daft Punk - One More Time'
];

const el = document.getElementById('song');

function pickOne(){
  // TODO: Math.random/Math.floor로 0..songs.length-1 인덱스 선택
  // TODO: el.textContent = 선택한 곡
}

document.getElementById('pick').addEventListener('click', pickOne);
`
};

export default function Mission10() {
  const testsJs = useMemo(() => {
    return `
      window.__learnRunTests = async function() {
        const results = [];
        const pass = (name, details) => results.push({name, pass:true, details: details || ''});
        const fail = (name, details) => results.push({name, pass:false, details: details || ''});

        const btn = document.getElementById('pick');
        const el = document.getElementById('song');
        if (!btn || !el) {
          fail('필수 요소 존재', {tab:'html', fix:'#pick 버튼과 #song 영역이 필요해.'});
          return results;
        }
        pass('필수 요소 존재');

        try {
          const before = (el.textContent || '').trim();
          btn.click();
          await new Promise(r => setTimeout(r, 30));
          const after = (el.textContent || '').trim();
          if (!after || after === before || after === '(아직 안 뽑음)') {
            fail('랜덤 1곡 출력', {tab:'js', fix:'pickOne()에서 songs 중 하나를 골라 el.textContent에 넣어.', snippet:"function pickOne(){\\n  const i = Math.floor(Math.random() * songs.length);\\n  el.textContent = songs[i];\\n}"});
          } else {
            pass('랜덤 1곡 출력', after);
          }
        } catch (e) {
          fail('랜덤 1곡 출력', String(e && (e.stack || e)));
        }

        return results;
      };
    `;
  }, []);

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB STARTER</div>
        <h1 className="h1" style={{fontSize: 28}}>미션 10 — 랜덤 “오늘의 노래” 뽑기</h1>
        <p className="p">배열 + 랜덤. 추천기 만들기 시작!</p>
      </section>

      <WebSandboxPanel missionId="mission-10" title="Mission 10" defaults={DEFAULT} testsJs={testsJs} minutes={15} nextMissionId="mission-11" />

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트</h3>
        <div className="cards" style={{marginTop: 12}}>
          <GuideBox title="1) Math.random">{`0~1 사이 난수를 만든다`}</GuideBox>
          <GuideBox title="2) Math.floor">{`인덱스로 쓰기 위해 정수로 내린다`}</GuideBox>
        </div>
      </section>
    </div>
  );
}
