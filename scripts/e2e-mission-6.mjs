#!/usr/bin/env node
/**
 * E2E: mission-6 (FAIL->fix->PASS->auto-next to mission-7)
 *
 * Usage:
 *   node scripts/e2e-mission-6.mjs
 *   BASE=http://192.168.219.122:30080/learn node scripts/e2e-mission-6.mjs
 *
 * Notes:
 * - Uses OpenClaw managed browser via CLI (`openclaw browser ...`).
 * - Snap Chromium: expects gateway config browser.attachOnly=true and an external Chromium CDP on 127.0.0.1:18800.
 */

import {execFileSync} from 'node:child_process';

function sh(cmd, args, opts = {}) {
  const out = execFileSync(cmd, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: opts.timeout ?? 60000,
    ...opts
  });
  return out;
}

function oc(args, timeoutMs = 60000) {
  // Always JSON so we can parse reliably.
  // Important: `openclaw browser --timeout <ms> <cmd>` (timeout flag belongs to the browser group).
  const next = [...args];
  if (next[0] === 'browser') {
    next.splice(1, 0, '--timeout', String(timeoutMs));
  }
  const out = sh('openclaw', [...next, '--json'], {timeout: timeoutMs + 5000});
  return JSON.parse(out);
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  // Resolve BASE.
  let base = process.env.BASE;
  if (!base) {
    // Best-effort: use current learn-web pod IP.
    try {
      const ip = sh('kubectl', ['-n', 'personal', 'get', 'pod', '-l', 'app=learn-web', '-o', "jsonpath={.items[0].status.podIP}"]).trim();
      if (ip) base = `http://${ip}:3000/learn`;
    } catch {
      // ignore
    }
  }
  if (!base) {
    throw new Error('BASE is not set and pod IP resolution failed. Provide BASE=http://<host>/learn');
  }
  base = base.replace(/\/$/, '');

  const url6 = `${base}/ko/web/mission-6`;
  const url7 = `${base}/ko/web/mission-7`;

  console.log('[1/6] browser status (and resync if needed)');
  let st = oc(['browser', 'status']);
  if (!st?.running || !st?.cdpReady) {
    // Policy: before doing any screen verification, always attempt a browser resync.
    // Relay/CDP can be flaky; a restart recovers most cases.
    try { oc(['browser', 'stop'], 30000); } catch {}
    try { oc(['browser', 'start'], 60000); } catch {}
    // Wait a bit + re-check.
    await sleep(800);
    st = oc(['browser', 'status']);
  }
  if (!st?.running || !st?.cdpReady) throw new Error(`browser not ready (after resync): ${JSON.stringify(st)}`);

  console.log('[2/6] open mission-6', url6);
  const opened = oc(['browser', 'open', url6], 90000);
  const targetId = opened?.targetId;
  if (!targetId) throw new Error(`failed to open: ${JSON.stringify(opened)}`);

  // Helper to always focus by URL (avoid stale target IDs on reloads).
  function pickTabByUrl(urlPrefix) {
    const tabs = oc(['browser', 'tabs']).tabs || [];
    return tabs.find(t => String(t.url || '').startsWith(urlPrefix)) || null;
  }

  // Focus the tab.
  oc(['browser', 'focus', targetId]);

  console.log('[3/6] wait for monaco');
  let monacoReady = false;
  for (let i = 0; i < 60; i++) {
    const tab = pickTabByUrl(url6);
    const tid = tab?.targetId || targetId;
    try {
      const r = oc(['browser', 'evaluate', '--target-id', tid, '--fn', '() => ({ready: document.readyState, hasMonaco: !!window.monaco})'], 10000);
      const ready = r?.result?.ready;
      const hasMonaco = r?.result?.hasMonaco;
      if (i % 8 === 0) console.log(`  - probe[${i}] ready=${ready} monaco=${hasMonaco}`);
      if (ready === 'complete' && hasMonaco) {
        monacoReady = true;
        break;
      }
    } catch (e) {
      if (i % 8 === 0) console.log(`  - probe[${i}] evaluate failed: ${String(e?.message || e)}`);
    }
    await sleep(250);
  }
  if (!monacoReady) throw new Error('monaco did not become ready in time');

  console.log('[4/6] reset + run 검사');
  {
    const tab = pickTabByUrl(url6);
    const tid = tab?.targetId || targetId;
    oc(['browser', 'evaluate', '--target-id', tid, '--fn', "() => { [...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='Reset')?.click(); return true; }"]);
    await sleep(400);

    const code = `const btn=document.querySelector('#btn');\nconst msg=document.querySelector('#msg');\nlet n=0;\nbtn.addEventListener('click',()=>{n++; msg.textContent='클릭 '+n+'번!';});\n`;
    const fn = `() => {
      const jsBtn=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='JS');
      jsBtn?.click();
      const m=window.monaco?.editor?.getModels?.()[0];
      if (m) m.setValue(${JSON.stringify(code)});
      [...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='Run')?.click();
      return {set: !!m};
    }`;
    const r = oc(['browser', 'evaluate', '--target-id', tid, '--fn', fn]);
    if (!r?.result?.set) throw new Error('Monaco model not found; cannot set JS');

    // Give the iframe time to rebuild after Run.
    await sleep(1800);
    oc(['browser', 'evaluate', '--target-id', tid, '--fn', "() => { [...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='검사')?.click(); return true; }"]);
  }

  console.log('[5/6] wait for auto-next mission-7');
  for (let i = 0; i < 80; i++) { 
    const tab7 = pickTabByUrl(url7);
    if (tab7) {
      console.log('[6/6] PASS: auto-navigated to mission-7');
      process.exit(0);
    }
    await sleep(250);
  }

  // If not navigated, print current page excerpt.
  const any = pickTabByUrl(url6) || pickTabByUrl(url7);
  if (any?.targetId) {
    try {
      const t = oc(['browser', 'evaluate', '--target-id', any.targetId, '--fn', "() => (document.querySelector('main')||document.body).innerText.slice(0,800)"]); 
      console.error('FAIL: did not auto-navigate to mission-7. Excerpt:\n' + (t?.result || ''));
    } catch {
      console.error('FAIL: did not auto-navigate to mission-7. (and could not read excerpt)');
    }
  } else {
    console.error('FAIL: did not auto-navigate to mission-7. (tab not found)');
  }
  process.exit(1);
}

main().catch((e) => {
  console.error('E2E ERROR:', e?.stack || String(e));
  process.exit(2);
});
