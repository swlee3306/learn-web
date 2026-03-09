#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const inputPath = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : path.join(ROOT, 'missions', 'web-16-25.json');

async function mustReadSpec(p) {
  const ext = path.extname(p).toLowerCase();
  if (ext === '.mjs' || ext === '.js') {
    const mod = await import(pathToFileURL(p).toString());
    return mod.default || mod.spec || mod;
  }
  const raw = fs.readFileSync(p, 'utf8');
  return JSON.parse(raw);
}

function escTemplate(s) {
  // For embedding inside backticks in TSX.
  // - Escape backticks
  // - Escape ${...} so it doesn't interpolate at build time
  return String(s)
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

function outFileForMission(id) {
  return path.join(ROOT, 'src', 'app', '[locale]', 'web', id, 'page.tsx');
}

function ensureDir(p) {
  fs.mkdirSync(p, {recursive: true});
}

function genMissionPage(m) {
  const title = m.titleKo;
  const missionNum = m.id.split('-')[1];
  const next = m.nextMissionId || (() => {
    const n = Number(missionNum);
    return Number.isFinite(n) ? `mission-${n + 1}` : undefined;
  })();

  const checklist = (m.checklistKo || []).map((t, i) => `          <GuideBox title="${i + 1})">{\`${escTemplate(t)}\`}</GuideBox>`).join('\n');

  const testsJs = m.testsJs || '';

  return `/* eslint-disable */\n'use client';\n\nimport {useMemo} from 'react';\nimport GuideBox from '@/components/GuideBox';\nimport WebSandboxPanel from '@/components/WebSandboxPanel';\n\nconst DEFAULT = {\n  html: \`${escTemplate(m.defaults.html)}\`,\n  css: \`${escTemplate(m.defaults.css)}\`,\n  js: \`${escTemplate(m.defaults.js)}\`\n};\n\nexport default function ${m.id.replace(/-/g, '')}() {\n  const testsJs = useMemo(() => {\n    return \`${escTemplate(testsJs)}\`;\n  }, []);\n\n  return (\n    <div className="grid">\n      <section className="hero">\n        <div className="kicker">WEB STARTER</div>\n        <h1 className="h1" style={{fontSize: 28}}>${escTemplate(title)}</h1>\n        <p className="p">검사(Tests)를 통과하면 완료!</p>\n      </section>\n\n      <WebSandboxPanel missionId="${m.id}" title="Mission ${missionNum}" defaults={DEFAULT} testsJs={testsJs} minutes={${m.minutes}} nextMissionId="${next || ''}" />\n\n      <section className="card">\n        <h3 className="cardTitle" style={{fontSize: 18}}>체크리스트(검사 기준)</h3>\n        <div className="cards" style={{marginTop: 12}}>${checklist ? `\n${checklist}\n        ` : ''}</div>\n      </section>\n    </div>\n  );\n}\n`;
}

function updateWebMissionsTs(missions) {
  const f = path.join(ROOT, 'src', 'content', 'webMissions.ts');
  let text = fs.readFileSync(f, 'utf8');

  // Extend MissionId union (append new ids if missing)
  const ids = missions.map(m => m.id);
  for (const id of ids) {
    if (text.includes(`| '${id}'`)) continue;

    // Insert before the closing semicolon of the MissionId union.
    // (The last mission number changes as we extend, so don't anchor to mission-15.)
    const m = text.match(/export type MissionId =[\s\S]*?;\n/);
    if (!m) throw new Error('MissionId union block not found');
    const block = m[0];
    const updated = block.replace(/;\n$/, `\n  | '${id}';\n`);
    text = text.replace(block, updated);
  }

  // Append mission objects at end of WEB_MISSIONS array (before closing ];)
  const insertAt = text.lastIndexOf('\n];');
  if (insertAt === -1) throw new Error('WEB_MISSIONS array end not found');

  const objs = missions.map((m, idx) => {
    const n = Number(m.id.split('-')[1]);
    const next = (idx < missions.length - 1) ? missions[idx + 1].id : undefined;
    return `  ,\n  {\n    id: '${m.id}',\n    track: 'web',\n    level: 'beginner',\n    minutes: ${m.minutes},\n    title: {ko: '${m.titleKo.replace(/'/g, "\\'")}', en: 'Mission ${n}'} ,\n    pitch: {ko: '${m.pitchKo.replace(/'/g, "\\'")}', en: 'Mission ${n}'} ,\n    outcomes: {ko: ${JSON.stringify(m.outcomesKo || [])}, en: []},\n    checklist: {ko: ${JSON.stringify(m.checklistKo || [])}, en: []}${next ? `,\n    next: '${next}'` : ''}\n  }`;
  }).join('');

  text = text.slice(0, insertAt) + objs + text.slice(insertAt);
  fs.writeFileSync(f, text, 'utf8');
}

async function main() {
  const spec = await mustReadSpec(inputPath);
  const missions = spec.missions;
  if (!Array.isArray(missions) || missions.length === 0) {
    throw new Error('No missions found in spec');
  }

  // Generate pages
  for (const m of missions) {
    const out = outFileForMission(m.id);
    ensureDir(path.dirname(out));
    fs.writeFileSync(out, genMissionPage(m), 'utf8');
  }

  updateWebMissionsTs(missions);

  console.log(`Generated ${missions.length} missions: ${missions[0].id}..${missions[missions.length - 1].id}`);
}

main();
