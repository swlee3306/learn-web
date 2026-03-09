# Learn (/learn) Roadmap

Goal: A bootcamp-like, game-ish coding learning site that supports learning paths (web/python/etc), missions, feedback loops, progress tracking, and career exploration.

## Product pillars
- **Fast dopamine**: small missions, instant results, visible progress.
- **Guided practice**: clear steps, hints, checks, and solutions.
- **Accountability**: progress tracking, streaks, achievements.
- **Career clarity**: paths + role map + “what to learn next” based on goals.

## Milestones

### M1 — Solid MVP (stability + UX)
- Navigation/auth polish (no stale state, clear logged-in status)
- Progress tracking per mission (complete/uncomplete, timestamps)
- Mission listing with completion indicators
- Basic profile page (/me) with stats
- Admin improvements (create invite codes, audit log, user management UX)
- Internal-only HTTP mode vs External HTTPS mode (cookie/tls switches documented)

### M2 — Course engine (content + progression)
- Course/track model: Track → Module → Mission
- Mission types: reading, coding sandbox, quiz
- Prerequisites & gating
- Localization pipeline for content
- Authoring format (MDX/JSON) with validation

### M3 — Interactive coding (game feel)
- In-browser editor for HTML/CSS/JS missions with preview
- Test runner (assertions) + lint feedback
- "Hint" system + checkpoints
- Rewards: XP, levels, badges, streaks

### M4 — Python track (safe execution)
- Phase 1: local-run guide + copy-paste snippets
- Phase 2: server-side sandbox execution (container/wasm) with rate limits

### M5 — Career layer
- Role map: Frontend/Backend/DevOps/Data/etc
- Skill trees & recommended missions
- Portfolio prompts + project templates

## QA process (every change)
- Local build + typecheck
- Smoke test routes (public + authenticated + admin)
- Auth flow test (login/logout, /me)
- Regression: LAN(http) and domain(https) cookie behavior
- Ingress routing checks (/learn, /blog, /)

## Known “repeat mistakes” to avoid
- **Secure cookie + LAN http** mismatch causing login to appear broken.
- Root routing relying only on middleware; add server-side redirects as fallback.
- Locale param handling in client components (avoid `params` prop for client pages; prefer `useParams`).
- k3s uses containerd: docker-built images require `k3s ctr images import`.
