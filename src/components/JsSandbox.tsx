'use client';

import {useRef} from 'react';

export type SandboxTestResult = {
  name: string;
  pass: boolean;
  details?: string;
  // Hint metadata (optional)
  tab?: 'html' | 'css' | 'js';
  fix?: string;
  snippet?: string;
};

export function buildHtml({
  html,
  css,
  js,
  testsJs,
  missionId,
  protocolVersion
}: {
  html: string;
  css: string;
  js: string;
  testsJs?: string;
  missionId: string;
  protocolVersion: number;
}) {
  // Encode user-provided HTML/CSS/JS so it can't break srcDoc parsing (e.g., stray </script>, </style>, or quotes).
  const toB64 = (s: string) => {
    try {
      const enc = new TextEncoder();
      const bytes = enc.encode(String(s));
      let bin = '';
      for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
      return btoa(bin);
    } catch (e) {
      return '';
    }
  };
  // A minimal sandbox: no network restrictions here.
  // For public launch, consider stronger isolation.
  //
  // IMPORTANT: Some environments may fail to execute a separate <script> tag
  // embedded in srcDoc reliably (or errors may get swallowed). To make test
  // registration deterministic, we eval the tests source on-demand inside the harness.
  // Encode testsJs to base64 to avoid any issues with special unicode line separators
  // or escaping when embedding into srcDoc.
  const testsSourceB64 = testsJs ? toB64(testsJs) : '';

  const htmlB64 = toB64(html);
  const cssB64 = toB64(css);

  const harnessSrc = `
    (function(){
      const PROTOCOL_VERSION = ${JSON.stringify(protocolVersion)};
      const MISSION_ID = ${JSON.stringify(missionId)};
      const PARENT_ORIGIN = (function(){
        try {
          const o = new URL(document.referrer).origin;
          return (o && o !== 'null') ? o : '*';
        } catch (e) {
          return '*';
        }
      })();
      function postToParent(msg){
        try {
          if (window.parent && window.parent !== window) {
            // @ts-ignore
            window.parent.postMessage(msg, PARENT_ORIGIN || '*');
          }
        } catch (e) {}
      }

      // Mark harness alive (debug)
      try {
        // @ts-ignore
        window.__learnHarnessAlive = true;
      } catch (e) {}

      // Standard handshake: respond READY when parent says HELLO.
      // Also emit a one-shot READY proactively to eliminate HELLO/READY timing races.
      try {
        window.addEventListener('message', (ev) => {
          const d = ev && ev.data;
          if (!d || typeof d !== 'object') return;
          if (d.type === 'HELLO') {
            postToParent({type:'READY', version: PROTOCOL_VERSION, missionId: MISSION_ID, requestId: d.requestId || null, payload: {hasTests: typeof window.__learnRunTests === 'function'}});
          }
        });
      } catch (e) {}

      // Proactive READY (best-effort). Parent may ignore duplicates.
      try {
        postToParent({type:'READY', version: PROTOCOL_VERSION, missionId: MISSION_ID, requestId: null, payload: {auto: true, hasTests: typeof window.__learnRunTests === 'function'}});
        setTimeout(function(){
          try { postToParent({type:'READY', version: PROTOCOL_VERSION, missionId: MISSION_ID, requestId: null, payload: {auto: true, hasTests: typeof window.__learnRunTests === 'function'}}); } catch (e) {}
        }, 200);
      } catch (e) {}

      const TESTS_B64 = ${JSON.stringify(testsSourceB64)};

      function decodeB64Utf8(b64){
        if (!b64) return '';
        const bin = atob(b64);
        const bytes = new Uint8Array(bin.length);
        for (let i=0;i<bin.length;i++) bytes[i] = bin.charCodeAt(i);
        try {
          return new TextDecoder('utf-8').decode(bytes);
        } catch (e) {
          let s = '';
          for (let i=0;i<bytes.length;i++) s += String.fromCharCode(bytes[i]);
          return decodeURIComponent(escape(s));
        }
      }

      const TESTS_SRC_RAW = decodeB64Utf8(TESTS_B64);

      function sanitizeTestsSrc(src){
        var changed = false;
        var beforeLen = 0;
        var afterLen = 0;
        try {
          src = String(src || '');
          beforeLen = src.length;

          // 1) BOM (avoid embedding U+FEFF directly inside this harness source; it can break Function(...) parsing)
          var next = src;
          try {
            if (next && next.charCodeAt(0) === 0xFEFF) next = next.slice(1);
          } catch (e) {}
          if (next !== src) changed = true;
          src = next;

          // 2) U+2028/U+2029 (JS line separators) - avoid regex literal w/ these chars.
          next = src.split(String.fromCharCode(0x2028)).join('\\u2028');
          if (next !== src) changed = true;
          src = next;
          next = src.split(String.fromCharCode(0x2029)).join('\\u2029');
          if (next !== src) changed = true;
          src = next;

          // 3) NUL bytes
          next = src.split(String.fromCharCode(0)).join('');
          if (next !== src) changed = true;
          src = next;

          // 4) Smart quotes -> ASCII
          next = src
            .replace(/[\\u201C\\u201D]/g, '"')
            .replace(/[\\u2018\\u2019]/g, "'");
          if (next !== src) changed = true;
          src = next;

          afterLen = src.length;
        } catch (e) {}

        try {
          postToParent({
            kind: 'learn.testsSanitize',
            beforeLen: beforeLen,
            afterLen: afterLen,
            changed: changed
          });
        } catch (e) {}

        return String(src || '');
      }

      const TESTS_SRC = sanitizeTestsSrc(TESTS_SRC_RAW);

      // Debug helpers (safe to leave): inspect in sandbox DevTools.
      try {
        // @ts-ignore
        window.__learnDebugTestsB64 = TESTS_B64;
        // @ts-ignore
        window.__learnDebugTestsSrc = TESTS_SRC;
        // @ts-ignore
        window.__learnDebugTestsSrcRawHead = String(TESTS_SRC_RAW || '').slice(0, 160);
      } catch (e) {}

      function ensureTests(){
        if (typeof window.__learnRunTests === 'function') return true;
        if (!TESTS_SRC) return false;

        // Quick detection: did we accidentally receive HTML?
        try {
          var trimmed = String(TESTS_SRC).trimStart();
          var head20 = trimmed.slice(0, 20).toLowerCase();
          var hasHtml = head20.startsWith('<!doctype') || head20.startsWith('<html') || head20.startsWith('<head') || head20.startsWith('<body') || trimmed.toLowerCase().indexOf('<html') !== -1;
          if (hasHtml) {
            postToParent({kind:'learn.testsScriptRan', ok:false, error:'testsJs appears to be HTML, not JS', hasTests:false});
            postToParent({kind:'learn.runtimeError', message:'[testsJs] Load failed: received HTML instead of JS. head=' + JSON.stringify(String(TESTS_SRC).slice(0, 220))});
            return false;
          }
        } catch (e) {}

        // Emit meta before compile
        try {
          postToParent({kind:'learn.testsMeta', testsUrl:'inline', status:'n/a', contentType:'n/a', contentLength: String(TESTS_SRC).length, head: String(TESTS_SRC).slice(0, 120), tail: String(TESTS_SRC).slice(Math.max(0, String(TESTS_SRC).length - 120))});
        } catch (e) {}

        try {
          // Attach sourceURL to improve error stacks/locations.
          // NOTE: use \\n so the harness source doesn't contain a literal newline inside a JS string.
          var srcForEval = String(TESTS_SRC) + "\\n//# sourceURL=tests.mission-" + String(MISSION_ID) + ".js";
          // eslint-disable-next-line no-new-func
          (new Function(srcForEval))();
          try {
            postToParent({kind:'learn.testsScriptRan', ok:true, hasTests: typeof window.__learnRunTests === 'function'});
            postToParent({type:'RUN_DONE', version: PROTOCOL_VERSION, missionId: MISSION_ID, requestId: null, payload:{phase:'testsJs', ok:true, hasTests: typeof window.__learnRunTests === 'function'}});
          } catch (e) {}
        } catch (e) {
          try {
            const srcStr = String(TESTS_SRC || '');
            const head = srcStr.slice(0, 220);
            const tail = srcStr.slice(Math.max(0, srcStr.length - 220));
            const codes = head.split('').map(ch => ch.charCodeAt(0)).slice(0, 80);
            postToParent({kind:'learn.runtimeError', message: '[testsJs] ' + String((e && e.stack) || e) + '\\nlen=' + String(srcStr.length) + '\\nhead=' + JSON.stringify(head) + '\\ntail=' + JSON.stringify(tail) + '\\ncodes=' + JSON.stringify(codes)});
            postToParent({type:'RUN_DONE', version: PROTOCOL_VERSION, missionId: MISSION_ID, requestId: null, payload:{phase:'testsJs', ok:false, error:String((e && e.stack) || e)}});
          } catch (e) {}
          try {
            postToParent({kind:'learn.testsScriptRan', ok:false, error: String((e && e.stack) || e), hasTests: typeof window.__learnRunTests === 'function'});
          } catch (e) {}
        }
        return typeof window.__learnRunTests === 'function';
      }

      async function runTests(){
        if (!ensureTests()) {
          return [{name:'Tests not configured', pass:false, details:'No __learnRunTests() in this mission.'}];
        }
        try {
          const out = await window.__learnRunTests();
          if (!Array.isArray(out)) return [{name:'Invalid test output', pass:false, details: 'Expected array'}];
          return out.map(r => ({
            name: String(r.name || ''),
            pass: Boolean(r.pass),
            details: r.details ? String(r.details) : '',
            tab: r.tab === 'html' || r.tab === 'css' || r.tab === 'js' ? r.tab : undefined,
            fix: r.fix ? String(r.fix) : '',
            snippet: r.snippet ? String(r.snippet) : ''
          }));
        } catch (e) {
          var stack = null;
          try {
            if (e && typeof e === 'object' && 'stack' in e) stack = e.stack;
          } catch (e) {}
          return [{name:'Test runner crashed', pass:false, details: String(stack || e)}];
        }
      }

      let _hasTests = false;
      try {
        _hasTests = ensureTests();
      } catch (e) {}

      try {
        if (window.parent && window.parent !== window) {
          // @ts-ignore
          postToParent({kind: 'learn.harnessReady', hasTests: _hasTests});
          postToParent({type:'READY', version: PROTOCOL_VERSION, missionId: MISSION_ID, requestId: null, payload:{hasTests:_hasTests}});
        }
      } catch (e) {}

      window.addEventListener('message', async (ev) => {
        const d = ev.data;
        if (!d || typeof d !== 'object') return;

        const isLegacy = d.kind === 'learn.runTests' && d.requestId;
        const isNew = d.type === 'CHECK_REQUEST' && d.requestId;
        if (!isLegacy && !isNew) return;

        const requestId = String(d.requestId);

        try {
          postToParent({kind:'learn.checkReceived', requestId, mode: isNew ? 'new' : 'legacy'});
        } catch (e) {}

        // Guard against hangs in user/test code.
        let results: any = null;
        try {
          results = await Promise.race([
            runTests(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timed out inside sandbox while running tests')), 12000))
          ]);
        } catch (e) {
          try {
            postToParent({kind:'learn.runtimeError', message: '[check] ' + String((e && e.stack) || e)});
          } catch (e2) {}
          results = [{name:'Sandbox timeout', pass:false, details: String((e && e.stack) || e)}];
        }

        const msgLegacy = {kind:'learn.testResults', requestId, results, hasTests: typeof window.__learnRunTests === 'function'};
        const msgNew = {type:'CHECK_RESULT', version: PROTOCOL_VERSION, missionId: MISSION_ID, requestId, payload:{results, hasTests: typeof window.__learnRunTests === 'function'}};

        // Reply to the sender if possible, but also post to window.parent as a fallback.
        try {
          if (ev && ev.source && typeof ev.source.postMessage === 'function') {
            // @ts-ignore
            ev.source.postMessage(msgLegacy, PARENT_ORIGIN || '*');
            // @ts-ignore
            ev.source.postMessage(msgNew, PARENT_ORIGIN || '*');
          }
        } catch (e) {}

        try {
          postToParent(msgLegacy);
          postToParent(msgNew);
          postToParent({kind:'learn.checkResponded', requestId, ok:true, resultsCount: Array.isArray(results) ? results.length : null});
        } catch (e) {}
      });
    })();
  `;

  // Finally, base64-encode the whole harness to avoid any chance of inline <script> parsing issues.
  const harnessB64 = (() => {
    try {
      const enc = new TextEncoder();
      const bytes = enc.encode(String(harnessSrc));
      let bin = '';
      for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
      return btoa(bin);
    } catch (e) {
      return '';
    }
  })();

  const harness = `
    (function(){
      const H_B64 = ${JSON.stringify(harnessB64)};
      function decodeB64Utf8(b64){
        if (!b64) return '';
        const bin = atob(b64);
        const bytes = new Uint8Array(bin.length);
        for (let i=0;i<bin.length;i++) bytes[i] = bin.charCodeAt(i);
        try {
          return new TextDecoder('utf-8').decode(bytes);
        } catch (e) {
          let s = '';
          for (let i=0;i<bytes.length;i++) s += String.fromCharCode(bytes[i]);
          return decodeURIComponent(escape(s));
        }
      }
      const src = decodeB64Utf8(H_B64);
      try {
        // @ts-ignore
        window.__learnHarnessB64Len = (H_B64 || '').length;
        // @ts-ignore
        window.__learnHarnessSrcLen = (src || '').length;
        // @ts-ignore
        window.__learnHarnessSrcHead = String(src || '').slice(0, 220);
      } catch (e) {}
      try {
        // eslint-disable-next-line no-new-func
        (new Function(src))();
      } catch (e) {
        try {
          const head = String(src || '').slice(0, 220);
          const codes = head.split('').map(ch => ch.charCodeAt(0)).slice(0, 120);
          if (window.parent && window.parent !== window) {
            // @ts-ignore
            try {
              const PARENT_ORIGIN = (function(){
                try {
                  const o = new URL(document.referrer).origin;
                  return (o && o !== 'null') ? o : '*';
                } catch (e) {
                  return '*';
                }
              })();
              // @ts-ignore
              window.parent.postMessage({kind:'learn.runtimeError', message: '[harness] ' + String((e && e.stack) || e) + '\\nH_B64.len=' + String((H_B64||'').length) + '\\nsrc.len=' + String((src||'').length) + '\\nhead=' + JSON.stringify(head) + '\\ncodes=' + JSON.stringify(codes)}, PARENT_ORIGIN || '*');
            } catch (e) {}
          }
        } catch (e) {}
      }
    })();
  `;

  // Base64-encode mission JS too, so srcDoc parsing never breaks due to raw JS text.
  const jsB64 = toB64(js);

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style id="__learnStyle"></style>
  </head>
  <body>
    <div id="__learnRoot"></div>

    <!-- Prelude FIRST: report that srcDoc loaded + capture syntax errors from any later scripts -->
    <script>
      (function(){
        function decodeB64Utf8(b64){
          if (!b64) return '';
          var bin = atob(b64);
          var bytes = new Uint8Array(bin.length);
          for (var i=0;i<bin.length;i++) bytes[i] = bin.charCodeAt(i);
          try {
            return new TextDecoder('utf-8').decode(bytes);
          } catch (e) {
            var s = '';
            for (var j=0;j<bytes.length;j++) s += String.fromCharCode(bytes[j]);
            return decodeURIComponent(escape(s));
          }
        }

        try { window.__learnPreludeRan = true; } catch (e) {}

        // Hydrate user HTML/CSS safely from base64.
        try {
          var root = document.getElementById('__learnRoot');
          if (root) root.innerHTML = decodeB64Utf8(${JSON.stringify(htmlB64)});
          var styleEl = document.getElementById('__learnStyle');
          if (styleEl) styleEl.textContent = decodeB64Utf8(${JSON.stringify(cssB64)});
        } catch (e) {
          try {
            var pre = document.createElement('pre');
            pre.textContent = '[hydrate] ' + String((e && e.stack) || e);
            pre.style.whiteSpace = 'pre-wrap';
            pre.style.color = '#b00020';
            document.body.appendChild(pre);
          } catch (e) {}
        }

        try {
          if (window.parent && window.parent !== window) {
            var PARENT_ORIGIN = (function(){
              try {
                var o = new URL(document.referrer).origin;
                return (o && o !== 'null') ? o : '*';
              } catch (e) {
                return '*';
              }
            })();
            window.parent.postMessage({kind:'learn.sandboxPreludeReady'}, PARENT_ORIGIN || '*');
            // Also send a minimal READY early (even if harness fails to load).
            window.parent.postMessage({type:'READY', version: 1, missionId: ${JSON.stringify(missionId)}, requestId: null, payload: {auto: true, prelude: true}}, PARENT_ORIGIN || '*');
            setTimeout(function(){
              try {
                if (window.parent && window.parent !== window) {
                  window.parent.postMessage({kind:'learn.sandboxPreludeReady'}, PARENT_ORIGIN || '*');
                  window.parent.postMessage({type:'READY', version: 1, missionId: ${JSON.stringify(missionId)}, requestId: null, payload: {auto: true, prelude: true}}, PARENT_ORIGIN || '*');
                }
              } catch (e) {}
            }, 100);
          }
        } catch (e) {}

        try {
          window.addEventListener('error', function(e){
            try {
              if (window.parent && window.parent !== window) {
                var PARENT_ORIGIN = (function(){
                  try {
                    var o = new URL(document.referrer).origin;
                    return (o && o !== 'null') ? o : '*';
                  } catch (e) {
                    return '*';
                  }
                })();
                window.parent.postMessage(
                  {kind:'learn.runtimeError', message: String((e && (e.error && e.error.stack)) || (e && e.message) || e)},
                  PARENT_ORIGIN || '*'
                );
              }
            } catch (e) {}
          });
        } catch (e) {}
      })();
    </script>

    <!-- Harness FIRST: so tests runner & message listener are alive even if mission JS hangs/crashes -->
    <script>\n${harness}\n</script>

    <script>
      (function(){
        function decodeB64Utf8(b64){
          if (!b64) return '';
          const bin = atob(b64);
          const bytes = new Uint8Array(bin.length);
          for (let i=0;i<bin.length;i++) bytes[i] = bin.charCodeAt(i);
          try {
            return new TextDecoder('utf-8').decode(bytes);
          } catch (e) {
            let s = '';
            for (let i=0;i<bytes.length;i++) s += String.fromCharCode(bytes[i]);
            return decodeURIComponent(escape(s));
          }
        }

        const JS_B64 = ${JSON.stringify(jsB64)};
        const src = decodeB64Utf8(JS_B64);

        try {
          // eslint-disable-next-line no-new-func
          (new Function(src))();
        } catch (e) {
          const pre = document.createElement('pre');
          var stack = null;
          try {
            if (e && typeof e === 'object' && 'stack' in e) stack = e.stack;
          } catch (e) {}
          pre.textContent = String(stack || e);
          pre.style.whiteSpace = 'pre-wrap';
          pre.style.color = '#b00020';
          document.body.appendChild(pre);
          try {
            if (window.parent && window.parent !== window) {
              // @ts-ignore
              const PARENT_ORIGIN = (function(){
                try {
                  const o = new URL(document.referrer).origin;
                  return (o && o !== 'null') ? o : '*';
                } catch (e) {
                  return '*';
                }
              })();
              window.parent.postMessage({kind:'learn.runtimeError', message: '[missionJs] ' + String((e && e.stack) || e)}, PARENT_ORIGIN || '*');
            }
          } catch (e) {}
        }
      })();
    </script>
  </body>
</html>`;
}

export default function JsSandbox({doc, iframeRef}: {doc: string; iframeRef?: React.RefObject<HTMLIFrameElement | null>}) {
  const internal = useRef<HTMLIFrameElement | null>(null);
  const ref = iframeRef ?? internal;

  return (
    <iframe
      ref={ref as unknown as React.RefObject<HTMLIFrameElement>}
      title="preview"
      sandbox="allow-scripts allow-forms allow-modals allow-same-origin"
      style={{width: '100%', height: 420, border: '1px solid #eaeaea', borderRadius: 12, background: 'white'}}
      srcDoc={doc}
    />
  );
}
