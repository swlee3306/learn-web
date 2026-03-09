'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import JsSandbox, {buildHtml, type SandboxTestResult} from '@/components/JsSandbox';
import GuideBox from '@/components/GuideBox';
import {markCompleted} from '@/components/progress/progressStore';
import {useParams, useRouter} from 'next/navigation';
import {WEB_LESSON_TOPICS} from '@/content/webLessons';
import {getWebMission} from '@/content/webMissions';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {ssr: false});

type Tabs = 'html' | 'css' | 'js';

type Defaults = {html: string; css: string; js: string};

type Props = {
  missionId: string;
  title: string;
  defaults: Defaults;
  testsJs: string;
  autoCompleteOnPass?: boolean;
  minutes?: number;
  nextMissionId?: string;

  /**
   * Show the beginner-friendly checklist + how-to section (mission-1 style).
   * Defaults to true.
   */
  showBeginnerChecklist?: boolean;
};

export default function WebSandboxPanel({missionId, title, defaults, testsJs, autoCompleteOnPass = true, minutes, nextMissionId, showBeginnerChecklist = true}: Props) {
  // inline keyframes (kept local so we don't touch global CSS yet)
  const keyframes = `
@keyframes learnFall {
  0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(120vh) translateX(8vw) rotate(520deg); opacity: 0; }
}
@keyframes learnPop {
  0% { transform: scale(0.96); opacity: 0; filter: blur(1px); }
  20% { transform: scale(1.03); opacity: 1; filter: blur(0px); }
  100% { transform: scale(1); opacity: 1; }
}
`;

  const [tab, setTab] = useState<Tabs>('html');
  const [mounted, setMounted] = useState(false);
  const [html, setHtml] = useState(defaults.html);
  const [css, setCss] = useState(defaults.css);
  const [js, setJs] = useState(defaults.js);
  const [runKey, setRunKey] = useState(0);

  const [tests, setTests] = useState<SandboxTestResult[] | null>(null);
  const [testing, setTesting] = useState(false);
  const [runtimeErr, setRuntimeErr] = useState<string>('');
  const [sandboxMsgCount, setSandboxMsgCount] = useState<number>(0);
  const [sandboxReady, setSandboxReady] = useState<boolean>(false);
  const sandboxReadyRef = useRef<boolean>(false);
  const [sandboxReadyAt, setSandboxReadyAt] = useState<number | null>(null);
  const [msgLog, setMsgLog] = useState<Array<{t:number; dir:'in'|'out'; origin?:string; type?:string; kind?:string; requestId?:string; missionId?:string}>>([]);
  const [autoMsg, setAutoMsg] = useState<string>('');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [levelUpMsg, setLevelUpMsg] = useState<string>('');
  const [party, setParty] = useState<boolean>(false);
  const [bigParty, setBigParty] = useState<boolean>(false);
  const params = useParams<{locale: string}>();
  const router = useRouter();
  const locale = params?.locale || 'ko';
  // App uses Next.js basePath (/learn). Do NOT hardcode /learn here, or you'll get /learn/learn/... 404.
  const nextHref = nextMissionId ? `/${locale}/web/${nextMissionId}` : '';
  const xp = typeof minutes === 'number' ? Math.round(minutes * 10) : 0;
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const lastTestRequestIdRef = useRef<string | null>(null);
  const handledTestRequestIdsRef = useRef<Set<string>>(new Set());

  // Keep an always-fresh view of readiness for async flows (avoid stale state closure bugs).
  useEffect(() => {
    sandboxReadyRef.current = sandboxReady;
  }, [sandboxReady]);

  // Persist per-mission edits.
  const storageKey = `learn.websandbox.${missionId}.v1`;

  function resetSaved() {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
    setHtml(defaults.html);
    setCss(defaults.css);
    setJs(defaults.js);
    setRunKey(v => v + 1);
    setTests(null);
    setRuntimeErr('');
    setAutoMsg('');
    setCountdown(null);
    setLevelUpMsg('');
    setParty(false);
  }

  function exportSaved() {
    const payload = {
      kind: 'learn.websandbox.export.v1',
      missionId,
      savedAt: new Date().toISOString(),
      html,
      css,
      js
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learn-${missionId}-sandbox.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function importSaved(raw: string) {
    const j = JSON.parse(raw);
    if (!j || typeof j !== 'object') throw new Error('invalid json');
    if (j.kind !== 'learn.websandbox.export.v1') throw new Error('invalid kind');
    if (j.missionId !== missionId) throw new Error('mission mismatch');
    if (typeof j.html !== 'string' || typeof j.css !== 'string' || typeof j.js !== 'string') throw new Error('invalid content');
    setHtml(j.html);
    setCss(j.css);
    setJs(j.js);
    setRunKey(v => v + 1);
    setTests(null);
    setRuntimeErr('');
    setAutoMsg('');
    setCountdown(null);
    setLevelUpMsg('');
    setParty(false);
  }
  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const p = JSON.parse(raw);
      if (p && typeof p === 'object') {
        if (typeof p.html === 'string') setHtml(p.html);
        if (typeof p.css === 'string') setCss(p.css);
        if (typeof p.js === 'string') setJs(p.js);
      }
    } catch {
      // ignore
    }
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({html, css, js}));
    } catch {
      // ignore
    }
  }, [storageKey, html, css, js]);

  const protocolVersion = 1;
  const doc = useMemo(() => buildHtml({html, css, js, testsJs, missionId, protocolVersion}), [html, css, js, testsJs, missionId, protocolVersion]);

  const mission = useMemo(() => getWebMission(missionId), [missionId]);

  const lessonTopicIds = useMemo(() => {
    return mission?.lessonTopicIds?.length ? mission.lessonTopicIds : ['getting-started'];
  }, [mission]);

  const beginnerChecklist = useMemo(() => {
    if (!mission) return null;
    const lang = (locale === 'en' ? 'en' : 'ko') as 'ko' | 'en';
    const items = mission.checklist[lang] || [];
    const guide = mission.checklistGuide?.[lang];
    return {items, guide};
  }, [mission, locale]);

  const logMsg = useCallback((entry: {dir:'in'|'out'; origin?:string; type?:string; kind?:string; requestId?:string; missionId?:string}) => {
    setMsgLog(prev => {
      const next = [...prev, {t: Date.now(), ...entry}];
      return next.slice(-50);
    });
  }, []);

  const isAllowedOrigin = useCallback((_origin: string) => {
    void _origin;
    // For functional recovery, accept all origins for now.
    // (Can be tightened to a whitelist later.)
    return true;
  }, []);

  const sendHello = useCallback((reason: string) => {
    const w = iframeRef.current?.contentWindow;
    if (!w) return false;
    const requestId = `hello-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const msg = {type: 'HELLO', version: protocolVersion, missionId, requestId, payload: {reason}};
    logMsg({dir:'out', type: msg.type, requestId, missionId});
    w.postMessage(msg, '*');
    return true;
  }, [logMsg, missionId, protocolVersion]);

  // When iframe reloads (Run / reset / edits), re-handshake.
  useEffect(() => {
    sandboxReadyRef.current = false;
    setSandboxReady(false);
    setSandboxReadyAt(null);
    setSandboxMsgCount(0);
    // Try HELLO a few times to avoid listener-timing races.
    for (let i = 0; i < 5; i++) {
      window.setTimeout(() => sendHello(`boot#${i + 1}`), 50 + i * 250);
    }
  }, [runKey, missionId, locale, sendHello]);

  // Listen to sandbox harness messages (test results, runtime errors, etc.).
  useEffect(() => {
    async function onMsg(ev: MessageEvent) {
      // NOTE: In some environments, the iframe ref may not be set yet when early messages arrive
      // (e.g., srcDoc prelude posts immediately on load). Do not hard-reject based on ref.
      // We filter by learn protocol below instead.
      // NOTE: In some environments, srcDoc iframe can be reloaded/replaced while messages are in-flight,
      // and ev.source may not strictly equal iframeRef.current.contentWindow. For functional recovery,
      // do not hard-reject by source.
      if (!isAllowedOrigin(ev.origin)) return;

      const d = ev.data;
      if (!d || typeof d !== 'object') return;

      const kind = (d as {kind?: unknown}).kind;
      const type = (d as {type?: unknown}).type;
      const kindStr = typeof kind === 'string' ? kind : '';
      const typeStr = typeof type === 'string' ? type : '';

      const isLearnKind = kindStr.startsWith('learn.');
      const isLearnType = typeStr === 'READY' || typeStr === 'CHECK_RESULT' || typeStr === 'RUN_DONE' || typeStr === 'RUNTIME_ERROR' || typeStr === 'HELLO' || typeStr === 'CHECK_REQUEST';
      if (!isLearnKind && !isLearnType) return;

      logMsg({dir:'in', origin: ev.origin, type: typeStr || undefined, kind: kindStr || undefined, requestId: String((d as {requestId?:unknown}).requestId || ''), missionId: String((d as {missionId?:unknown}).missionId || '')});

      // Debug: count sandbox/harness signals
      if (isLearnKind) {
        setSandboxMsgCount(c => c + 1);
      }
      if (d.kind === 'learn.sandboxPreludeReady') {
        // Minimal signal that the srcDoc iframe executed *some* JS.
        setRuntimeErr(prev => (prev ? prev : 'Sandbox prelude ready'));
      }
      if ((d as {type?: unknown}).type === 'READY') {
        const m = (d as {missionId?: unknown}).missionId;
        // If missionId is present, ensure it matches.
        if (typeof m === 'string' && m && m !== missionId) return;
        sandboxReadyRef.current = true;
        setSandboxReady(true);
        setSandboxReadyAt(Date.now());
      }
      if (d.kind === 'learn.runtimeError' && typeof d.message === 'string') {
        setRuntimeErr(d.message);
      }
      if (d.kind === 'learn.testsScriptRan') {
        const ok = (d as {ok?: unknown}).ok;
        const error = (d as {error?: unknown}).error;
        const hasTests = (d as {hasTests?: unknown}).hasTests;

        if (ok === false) {
          const msg = `testsJs 로드 실패: ${typeof error === 'string' ? error : 'unknown error'}`;
          setRuntimeErr(msg);
          // If we are currently waiting for results, fail fast (avoid confusing timeout message).
          setTesting(false);
          lastTestRequestIdRef.current = null;
          setTests([{name: 'testsJs 로드 실패', pass: false, details: msg}]);
        }
        if (ok === true && hasTests === false) {
          setRuntimeErr('testsJs는 실행됐지만 __learnRunTests가 등록되지 않았어. (Tests not configured)');
        }
      }
      if (d.kind === 'learn.harnessReady') {
        // Helpful debug signal: confirm the sandbox is alive.
        const hasTests = (d as {hasTests?: unknown}).hasTests;
        setRuntimeErr(prev => {
          // Only show if nothing else is currently shown.
          if (prev) return prev;
          return `Sandbox ready${hasTests === true ? ' (tests: yes)' : hasTests === false ? ' (tests: no)' : ''}`;
        });
      }
      if ((d as {type?: unknown}).type === 'CHECK_RESULT' && typeof (d as {requestId?: unknown}).requestId === 'string') {
        const requestId = (d as {requestId: string}).requestId;
        const payload = (d as {payload?: unknown}).payload as {results?: unknown} | undefined;
        const results = payload && Array.isArray(payload.results) ? (payload.results as SandboxTestResult[]) : null;
        if (!results) return;
        if (handledTestRequestIdsRef.current.has(requestId)) return;
        if (lastTestRequestIdRef.current && requestId !== lastTestRequestIdRef.current) return;
        handledTestRequestIdsRef.current.add(requestId);
        setTests(results);
        setTesting(false);
        // Leave lastTestRequestIdRef as-is; legacy result may arrive too.
        // We'll ignore duplicates via handledTestRequestIdsRef.
        lastTestRequestIdRef.current = null;
      }

      if (d.kind === 'learn.testResults' && typeof d.requestId === 'string' && Array.isArray(d.results)) {
        // Ignore stale responses.
        if (handledTestRequestIdsRef.current.has(d.requestId)) return;
        if (lastTestRequestIdRef.current && d.requestId !== lastTestRequestIdRef.current) return;
        handledTestRequestIdsRef.current.add(d.requestId);
        setTests(d.results);
        setTesting(false);
        lastTestRequestIdRef.current = null;

        // Auto-complete mission when all tests pass.
        if (autoCompleteOnPass) {
          const allPass = d.results.length > 0 && d.results.every((r: {pass?: unknown}) => r && r.pass === true);
          if (allPass) {
            // Best-effort level-up detection: compare before/after progress.
            let oldLevel: number | null = null;
            try {
              const r0 = await fetch('/learn/api/progress/me', {cache: 'no-store'});
              if (r0.ok) {
                const j0 = await r0.json();
                if (j0?.stats && typeof j0.stats.level === 'number') oldLevel = j0.stats.level;
              }
            } catch {}

            markCompleted('web', locale, missionId);
            setAutoMsg(`검사 통과! +${xp} XP · 미션 완료로 기록했어.`);
            if (nextMissionId) setCountdown(3);

            fetch('/learn/api/progress/complete', {
              method: 'POST',
              headers: {'content-type': 'application/json'},
              body: JSON.stringify({missionId})
            })
              .then(async () => {
                try {
                  const r1 = await fetch('/learn/api/progress/me', {cache: 'no-store'});
                  if (!r1.ok) return;
                  const j1 = await r1.json();
                  const newLevel = (j1?.stats && typeof j1.stats.level === 'number') ? j1.stats.level : null;
                  if (oldLevel != null && newLevel != null && newLevel > oldLevel) {
                    setLevelUpMsg(`레벨업! Lv ${newLevel}`);
                    // Level-up only: bigger celebration.
                    setParty(true);
                    setBigParty(true);
                    window.setTimeout(() => setParty(false), 2200);
                    window.setTimeout(() => setBigParty(false), 2600);
                  } else {
                    setLevelUpMsg('');
                  }
                } catch {}
              })
              .catch(() => void 0);
          } else {
            setAutoMsg('');
            setCountdown(null);
            setLevelUpMsg('');
            setParty(false);
            setBigParty(false);
          }
        }
      }
    }
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [autoCompleteOnPass, isAllowedOrigin, locale, logMsg, missionId, nextMissionId, xp]);

  async function runTests() {
    setRuntimeErr('');
    setAutoMsg('');
    setCountdown(null);
    setTesting(true);
    setTests(null);

    const w = iframeRef.current?.contentWindow;
    if (!w) {
      setTesting(false);
      setTests([{name: 'Preview not ready', pass: false, details: 'No iframe window'}]);
      return;
    }

    if (!sandboxReadyRef.current) {
      // Handshake first; retry a few times.
      setRuntimeErr('Sandbox not ready (no READY). Retrying HELLO…');
      for (let i = 0; i < 3; i++) {
        sendHello(`check-before-ready#${i + 1}`);
        // wait a bit
        await new Promise(r => window.setTimeout(r, 200));
        if (sandboxReadyRef.current) break;
      }
      if (!sandboxReadyRef.current) {
        setTesting(false);
        setTests([{name: 'Sandbox not ready', pass: false, details: 'No READY from sandbox. Check message log / origin / syntax errors.'}]);
        return;
      }
    }

    const requestId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    lastTestRequestIdRef.current = requestId;

    const msgLegacy = {kind: 'learn.runTests', requestId};
    const msgNew = {type: 'CHECK_REQUEST', version: protocolVersion, missionId, requestId, payload: {}};

    logMsg({dir:'out', kind: msgLegacy.kind, requestId, missionId});
    logMsg({dir:'out', type: msgNew.type, requestId, missionId});

    // Send twice to reduce flakiness.
    w.postMessage(msgLegacy, '*');
    w.postMessage(msgNew, '*');
    window.setTimeout(() => {
      try {
        const ww = iframeRef.current?.contentWindow;
        if (!ww) return;
        ww.postMessage(msgLegacy, '*');
        ww.postMessage(msgNew, '*');
      } catch {}
    }, 200);

    // timeout
    window.setTimeout(() => {
      setTesting(prev => {
        if (!prev) return prev;
        lastTestRequestIdRef.current = null;
        setTests([{name: 'Timed out', pass: false, details: 'No response from sandbox (did it crash?)'}]);
        return false;
      });
    }, 12000);
  }

  function applySnippet(t: Tabs, name: string, snippet: string) {
    if (!snippet) return;

    // Idempotency marker
    const marker = t === 'html'
      ? `<!-- learn-hint:${name} -->`
      : `/* learn-hint:${name} */`;

    // Prefer replacing known TODO hooks (cleaner than appending)
    if (t === 'js') {
      const tryReplace = (src: string, re: RegExp, replacement: string) => {
        if (!re.test(src)) return null;
        return src.replace(re, replacement);
      };

      // If we've already applied this hint, stop.
      if (js.includes(marker)) return;

      let next: string | null = null;

      // Mission 2 hooks
      if (snippet.includes('window.__typing_onGameEnd')) {
        next = tryReplace(js, /window\.__typing_onGameEnd\s*=\s*function\s*\([^)]*\)\s*\{[\s\S]*?\};/m, `${marker}\n${snippet}`);
      }
      if (!next && snippet.includes('window.__typing_onCorrect')) {
        next = tryReplace(js, /window\.__typing_onCorrect\s*=\s*function\s*\([^)]*\)\s*\{[\s\S]*?\};/m, `${marker}\n${snippet}`);
      }

      // Mission 3 hooks
      if (!next && snippet.includes('window.__lunch_pickFiltered')) {
        next = tryReplace(js, /window\.__lunch_pickFiltered\s*=\s*function\s*\([^)]*\)\s*\{[\s\S]*?\};/m, `${marker}\n${snippet}`);
      }
      if (!next && snippet.includes('window.__lunch_addToWeekHistory')) {
        next = tryReplace(js, /window\.__lunch_addToWeekHistory\s*=\s*function\s*\([^)]*\)\s*\{[\s\S]*?\};/m, `${marker}\n${snippet}`);
      }

      // Mission 4 hooks
      if (!next && snippet.includes('window.__quiz_getShareText')) {
        next = tryReplace(js, /window\.__quiz_getShareText\s*=\s*function\s*\([^)]*\)\s*\{[\s\S]*?\};/m, `${marker}\n${snippet}`);
      }
      if (!next && snippet.includes('window.__quiz_applyComboBonus')) {
        next = tryReplace(js, /window\.__quiz_applyComboBonus\s*=\s*function\s*\([^)]*\)\s*\{[\s\S]*?\};/m, `${marker}\n${snippet}`);
      }

      // Mission 5 hooks
      if (!next && snippet.includes('window.__todo_setFilter')) {
        next = tryReplace(js, /window\.__todo_setFilter\s*=\s*function\s*\([^)]*\)\s*\{[\s\S]*?\};/m, `${marker}\n${snippet}`);
      }
      if (!next && snippet.includes('window.__todo_saveNow')) {
        next = tryReplace(js, /window\.__todo_saveNow\s*=\s*function\s*\([^)]*\)\s*\{[\s\S]*?\};/m, `${marker}\n${snippet}`);
      }
      if (!next && snippet.includes('window.__todo_onShortcut')) {
        next = tryReplace(js, /window\.__todo_onShortcut\s*=\s*function\s*\([^)]*\)\s*\{[\s\S]*?\};/m, `${marker}\n${snippet}`);
      }

      // Fallback: append at end
      if (!next) {
        next = `${js}\n\n${marker}\n${snippet}\n`;
      }

      setJs(next);
      return;
    }

    if (t === 'html') {
      if (html.includes(marker)) return;
      setHtml(prev => `${prev}\n\n${marker}\n${snippet}\n`);
    } else {
      if (css.includes(marker)) return;
      setCss(prev => `${prev}\n\n${marker}\n${snippet}\n`);
    }
  }

  useEffect(() => {
    if (countdown == null) return;
    if (!nextMissionId) return;
    if (countdown <= 0) {
      router.push(nextHref);
      return;
    }
    const t = window.setTimeout(() => setCountdown(c => (c == null ? null : c - 1)), 1000);
    return () => window.clearTimeout(t);
  }, [countdown, nextHref, nextMissionId, router]);

  const current = tab === 'html' ? html : tab === 'css' ? css : js;

  return (
    <>
      <section className="split" style={{position: 'relative'}}>
        <style>{keyframes}</style>
        {party ? (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              overflow: 'hidden',
              zIndex: 5
            }}
          >
          {(() => {
            const symbols = bigParty
              ? ['🎉', '✨', '⭐', '💛', '🟩', '🟦', '🟥']
              : ['✨'];
            const count = bigParty ? 64 : 24;
            return Array.from({length: count}).map((_, i) => {
              const sym = symbols[i % symbols.length];
              const left = (i * 29) % 100;
              const size = (bigParty ? 18 : 16) + (i % (bigParty ? 14 : 8));
              const dur = (bigParty ? 1400 : 900) + (i % 7) * (bigParty ? 120 : 140);
              const delay = (i % 10) * (bigParty ? 18 : 22);
              const drift = (i % 2 === 0 ? 1 : -1) * ((i % 6) + 2);
              return (
                <span
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${left}%`,
                    top: '-10%',
                    fontSize: size,
                    opacity: 0.95,
                    animation: `learnFall ${dur}ms cubic-bezier(.15,.8,.2,1) ${delay}ms forwards`,
                    transform: `translateX(${drift}vw) rotate(${(i * 23) % 360}deg)`
                  }}
                >
                  {sym}
                </span>
              );
            });
          })()}
        </div>
      ) : null}
      <div className="panel">
        <div className="panelHead">
          <div className="tabs">
            {(['html', 'css', 'js'] as Tabs[]).map(k => (
              <button key={k} onClick={() => setTab(k)} className={`tab ${tab === k ? 'tabActive' : ''}`}>{k.toUpperCase()}</button>
            ))}
          </div>
          <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end'}}>
            <button className="btn btnPrimary" onClick={() => setRunKey(v => v + 1)}>Run</button>
            <button className="btn" onClick={() => { setHtml(defaults.html); setCss(defaults.css); setJs(defaults.js); setRunKey(v => v + 1); setTests(null); setRuntimeErr(''); }}>Reset</button>
            <button className="btn" onClick={runTests} disabled={testing}>{testing ? 'Testing…' : '검사'}</button>

            <span style={{width: 1, opacity: 0.2, background: 'var(--border)'}} />

            <button className="btn" onClick={exportSaved}>내보내기</button>
            <label className="btn" style={{cursor: 'pointer'}}>
              가져오기
              <input
                type="file"
                accept="application/json"
                style={{display: 'none'}}
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  try {
                    const text = await f.text();
                    importSaved(text);
                  } catch {
                    alert('가져오기 실패: 파일이 올바른지 확인해줘.');
                  } finally {
                    // allow re-selecting same file
                    e.currentTarget.value = '';
                  }
                }}
              />
            </label>
            <button className="btn" onClick={() => {
              if (confirm('이 미션의 저장된 코드를 초기화할까?')) resetSaved();
            }}>초기화</button>
          </div>
        </div>

        <hr className="sep" />

        <MonacoEditor
          height={460}
          language={tab}
          theme="vs-dark"
          value={current}
          onChange={(v) => {
            const value = v ?? '';
            if (tab === 'html') setHtml(value);
            else if (tab === 'css') setCss(value);
            else setJs(value);
          }}
          options={{
            minimap: {enabled: false},
            fontSize: 13,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            roundedSelection: true,
            padding: {top: 10, bottom: 10}
          }}
        />
      </div>

      <div className="grid" style={{gap: 12}}>
        <div className="smallCard">
          <div className="smallTitle">Preview</div>
          <JsSandbox key={runKey} doc={doc} iframeRef={iframeRef} />
        </div>

        <div className="smallCard">
          <div className="smallTitle">추천 강좌(영상)</div>
          <div className="smallText" style={{color: 'var(--muted)'}}>
            이 미션에 연결된 토픽(lessonTopicIds) 기준으로 추천 강좌를 보여줘.
          </div>

          <div style={{marginTop: 10, display: 'grid', gap: 10}}>
            {lessonTopicIds.map(topicId => {
              const topic = WEB_LESSON_TOPICS.find(t => t.id === topicId);
              if (!topic) return null;
              const videos = topic.videos.slice(0, 2);
              return (
                <div key={topicId} style={{padding: 10, border: '1px solid var(--border)', borderRadius: 10}}>
                  <div style={{display: 'flex', gap: 8, alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                    <div style={{fontWeight: 800}}>{topic.titleKo}</div>
                    <Link className="btn" href={`/${locale}/web/lessons#${topicId}`}>전체 강좌 보기</Link>
                  </div>
                  {videos.length ? (
                    <ul style={{margin: '8px 0 0 18px', lineHeight: 1.7}}>
                      {videos.map((v, i) => (
                        <li key={i}>
                          <a href={v.url} target="_blank" rel="noreferrer" style={{color: '#ffd43b'}}>{v.titleKo}</a>
                          <span style={{opacity: 0.75}}>{v.channel ? ` · ${v.channel}` : ''}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="smallText" style={{marginTop: 8, color: 'var(--muted)'}}>
                      (이 토픽 영상은 아직 큐레이션 중)
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="smallCard">
          <div className="smallTitle">{title} · 검사 결과</div>
          <div className="smallText" style={{marginTop: 10, color: 'var(--muted)'}}>
            sandbox signals: {sandboxMsgCount}
            {' · '}ready: {sandboxReady ? 'yes' : 'no'}
            {sandboxReadyAt ? ` · readyAt: ${new Date(sandboxReadyAt).toLocaleTimeString()}` : ''}
          </div>

          {(() => {
            const isDev = process.env.NODE_ENV === 'development';
            const debugEnabled = (() => {
              try {
                if (!mounted) return false;
                return new URLSearchParams(window.location.search).get('debug') === '1';
              } catch {
                return false;
              }
            })();
            if (!isDev && !debugEnabled) return null;
            return (
              <details style={{marginTop: 8}} suppressHydrationWarning>
                <summary className="smallText" style={{cursor: 'pointer', color: 'var(--muted)'}}>message log (last {msgLog.length})</summary>
                <div style={{marginTop: 8, maxHeight: 180, overflow: 'auto', border: '1px solid var(--border)', borderRadius: 10, padding: 10}}>
                  {msgLog.length ? (
                    <ul className="smallText" style={{margin: 0, paddingLeft: 16, lineHeight: 1.5, color: 'var(--muted)'}}>
                      {msgLog.slice().reverse().map((m, i) => (
                        <li key={i} style={{marginBottom: 4}}>
                          <span style={{opacity: 0.9}}>{new Date(m.t).toLocaleTimeString()}</span>
                          {' '}<b>{m.dir === 'in' ? '←' : '→'}</b>
                          {' '}{m.type ? `type=${m.type}` : m.kind ? `kind=${m.kind}` : 'msg'}
                          {m.requestId ? ` · id=${m.requestId}` : ''}
                          {m.origin ? ` · origin=${m.origin}` : ''}
                          {m.missionId ? ` · mission=${m.missionId}` : ''}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="smallText" style={{color: 'var(--muted)'}}>no messages yet</div>
                  )}
                </div>
              </details>
            );
          })()}
          {runtimeErr ? (
            <pre className="smallText" style={{whiteSpace: 'pre-wrap', color: '#ffb4b4', marginTop: 10}}>{runtimeErr}</pre>
          ) : null}
          {autoMsg ? (
            <div className="smallText" style={{marginTop: 10, color: '#7CFF6B'}}>
              {autoMsg}
              {levelUpMsg ? (
                <span
                  style={{
                    marginLeft: 10,
                    color: '#FFD34E',
                    fontWeight: 900,
                    textShadow: '0 0 14px rgba(255, 211, 78, 0.45)',
                    animation: 'learnPop 240ms ease-out both'
                  }}
                >
                  {levelUpMsg}
                </span>
              ) : null}
              {nextMissionId ? (
                <span style={{marginLeft: 10, display: 'inline-flex', gap: 8, alignItems: 'center', flexWrap: 'wrap'}}>
                  <Link className="btn btnPrimary" href={nextHref} style={{padding: '6px 10px'}}>다음 미션 →</Link>
                  {countdown != null ? (
                    <span style={{opacity: 0.85}}>
                      {countdown}초 후 자동 이동 ·{' '}
                      <button className="btn" style={{padding: '6px 10px'}} onClick={() => setCountdown(null)}>취소</button>
                    </span>
                  ) : null}
                </span>
              ) : null}
            </div>
          ) : null}
          {tests ? (
            <ul style={{margin: '10px 0 0 18px', color: 'var(--muted)', lineHeight: 1.6}}>
              {tests.map((r, i) => (
                <li key={i}>
                  <div style={{display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap'}}>
                    <span style={{color: r.pass ? '#7CFF6B' : '#ffb4b4'}}>{r.pass ? 'PASS' : 'FAIL'}</span>
                    <span>— {r.name}</span>
                    {!r.pass && r.tab ? (
                      <>
                        <span className="pill" style={{fontSize: 11, opacity: 0.9}}>{r.tab.toUpperCase()} 탭</span>
                        <button className="btn" onClick={() => setTab(r.tab as Tabs)} style={{padding: '6px 10px'}}>이동</button>
                      </>
                    ) : null}
                  </div>

                  {r.details ? (
                    <div className="smallText" style={{opacity: 0.85, marginTop: 2}}>{r.details}</div>
                  ) : null}

                  {!r.pass && r.fix ? (
                    <div className="smallText" style={{opacity: 0.95, marginTop: 6}}>
                      <b>힌트:</b> {r.fix}
                    </div>
                  ) : null}

                  {!r.pass && r.snippet ? (
                    <div style={{marginTop: 6}}>
                      <pre className="smallText" style={{whiteSpace: 'pre-wrap', padding: 10, borderRadius: 12, border: '1px solid var(--border)', background: 'rgba(0,0,0,0.25)'}}>{r.snippet}</pre>
                      <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6}}>
                        <button
                          className="btn"
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(r.snippet || '');
                            } catch {
                              // ignore
                            }
                          }}
                        >
                          예시 코드 복사
                        </button>
                        {r.tab ? (
                          <button
                            className="btn btnPrimary"
                            onClick={() => {
                              const t = r.tab as Tabs;
                              setTab(t);
                              applySnippet(t, r.name, r.snippet || '');
                              // Auto-run and re-test for a tight feedback loop.
                              setRunKey(v => v + 1);
                              window.setTimeout(() => {
                                void runTests();
                              }, 400);
                            }}
                          >
                            예시 코드 붙여넣기
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="smallText" style={{marginTop: 10, opacity: 0.8}}>
              “검사”를 누르면 이 미션의 조건을 자동으로 채점해.
            </p>
          )}
        </div>
      </div>
    </section>

      {showBeginnerChecklist && mission ? (
        <section className="card" style={{marginTop: 14}}>
          <h3 className="cardTitle" style={{fontSize: 18}}>초보자용 체크 (How-to 포함)</h3>
          <p className="cardDesc" style={{color: 'var(--muted)'}}>
            아래는 “무엇을” 할지 뿐만 아니라, “어디를” 바꾸면 되는지까지 같이 적어뒀어.
          </p>

          <div className="cards" style={{marginTop: 12}}>
            {beginnerChecklist?.items.map((label, i) => {
              const body = beginnerChecklist.guide?.[i];
              return (
                <GuideBox key={i} title={`${i + 1}) ${label}`}>{
                  body || '가이드가 아직 없어. (곧 추가할게)\n\n팁: HTML/CSS/JS 탭에서 TODO 주석을 찾아서 채워봐.'
                }</GuideBox>
              );
            })}
          </div>
        </section>
      ) : null}
    </>
  );
}

