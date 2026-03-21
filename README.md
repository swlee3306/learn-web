# learn-web (/learn)

## 한 줄 소개
짧은 미션으로 웹 개발을 연습하는 학습 사이트입니다.

## 저장소 성격
- 분류: 웹 / 학습 서비스
- 목적: 웹 코딩 학습과 미션 기반 연습
- 핵심 기술: Next.js, TypeScript, 웹 학습 UI

A small, game-ish **web coding learning site** built with **Next.js**.

It’s designed for “fast dopamine” practice: short missions, an in-browser sandbox, automatic checks, and progress tracking.

## What’s implemented so far

### Learning / missions
- Web track routing under `/[locale]/web/...`
- Mission content (templates, defaults, test scripts) lives in repo files (see `missions/` + `src/content/*`)
- Mission UI includes:
  - Monaco editor tabs (HTML/CSS/JS)
  - Preview iframe (srcDoc)
  - “검사” (check) button that runs mission tests and returns structured results
  - Beginner-friendly checklist + guides per mission

### In-browser sandbox + test runner
- Preview is rendered in an iframe via **srcDoc**.
- Parent ↔ iframe message protocol (handshake + check requests/results).
- Reliability hardening:
  - HELLO retries (boot sequence)
  - requestId-based de-duplication for CHECK results
  - debug message log panel (enabled in dev, or `?debug=1` in prod)

Key code:
- `src/components/WebSandboxPanel.tsx` (editor + preview + protocol + UX)
- `src/components/JsSandbox.tsx` (iframe srcDoc generation)

### Progress tracking
- Local progress store + server API calls for completion tracking
- XP/level-up “celebration” UX on successful check completion

### Ops / deployment (current environment)
- Dockerfile included (k3s deploy in the author’s environment)
- Ingress expects **basePath `/learn`** (see notes in code: avoid hardcoding `/learn/learn/...`)

## Development

### Prerequisites
- Node.js + npm

### Install & run
```bash
npm install
npm run dev
```
Open: http://localhost:3000

### Build
```bash
npm run build
npm run start
```

## Docs
- `docs/` contains design notes and mission outlines.
- For the sandbox message protocol and troubleshooting, see:
  - `docs/sandbox-protocol.md`

## Known issues / TODO
- Mission 6 sandbox handshake can get stuck when the parent sends **HELLO** but does not receive **READY**.
  - Suspects: iframe prelude errors, event listener timing, target window mismatch.
  - See `docs/sandbox-protocol.md` for a debugging checklist.

## License
TBD
