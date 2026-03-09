# Sandbox protocol (parent ↔ iframe)

This doc describes the srcDoc-iframe sandbox message protocol used by the web missions.

## Components
- Parent UI: `src/components/WebSandboxPanel.tsx`
- Iframe harness builder: `src/components/JsSandbox.tsx` (generates srcDoc HTML)

## Goals
- Parent can reliably determine “iframe is alive” (READY)
- Parent can request checks/tests and receive results
- Avoid flaky/stale responses across iframe reloads

## Message types

### Handshake
Parent → iframe:
- `type: "HELLO"`
  - `{ type, version, missionId, requestId, payload: { reason } }`

Iframe → parent:
- `type: "READY"`
  - `{ type, version, missionId, requestId? }`

Notes:
- Parent sends HELLO multiple times after iframe reload to avoid listener timing races.
- Parent tracks readiness using a ref (`sandboxReadyRef`) to avoid stale closure state.

### Checks
Parent → iframe (new protocol):
- `type: "CHECK_REQUEST"`
  - `{ type, version, missionId, requestId, payload: {} }`

Iframe → parent:
- `type: "CHECK_RESULT"`
  - `{ type, version, missionId, requestId, payload: { results: SandboxTestResult[] } }`

Legacy (still supported for backwards compatibility):
- Parent → iframe: `{ kind: "learn.runTests", requestId }`
- Iframe → parent: `{ kind: "learn.testResults", requestId, results: SandboxTestResult[] }`

## Reliability guards implemented
- **HELLO retries** on boot (`boot#1..#5`)
- Before running tests, if not READY:
  - send HELLO up to a few times and wait briefly
- **requestId-based filtering**
  - ignore duplicates
  - ignore stale responses from previous iframe instance
- A timeout fails fast with a clear error

## Debugging checklist: “HELLO sent but no READY received”
1) Open the mission URL with `?debug=1` and check:
   - `sandbox signals: N` should increase
   - `ready: yes/no`
   - message log should show inbound/outbound messages
2) Check browser console for errors (syntax errors in prelude/tests/user JS can stop the harness).
3) Ensure the iframe is created and has a `contentWindow`.
4) Confirm the iframe harness posts READY (search in `JsSandbox.tsx` prelude/harness code).
5) If READY is posted but not received:
   - verify event listener exists (parent adds `window.addEventListener('message', ...)`)
   - verify origin filtering (currently permissive)
   - verify the message shape matches (type/kind)
6) If checks time out:
   - verify `__learnRunTests` is registered and callable
   - verify `testsJs` loads successfully (there is a `learn.testsScriptRan` diagnostic)

## Future improvements
- Tighten allowed origins (currently `*` for functional recovery)
- Add an explicit “RESYNC / Re-handshake” button in the UI
- Add a harness self-check endpoint to emit richer diagnostics
