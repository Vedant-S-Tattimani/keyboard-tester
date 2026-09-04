# KeyCheck - Production Deployment & Engineering Handoff Guide

KeyCheck is a robust, privacy-first, physical keyboard diagnostic suite designed to test hardware keyboard inputs directly in the browser. 

This document serves as the absolute source of truth for architecture, schemas, deployment, and future maintenance.

---

## 1. Product Overview & Feature Set
KeyCheck provides immediate visual and statistical feedback on hardware key events.

**Available Tools:**
- **Keyboard Test**: Test physical keys (QWERTY, AZERTY, QWERTZ) using hardware-level `event.code`.
- **Multi-Key Test (Ghosting)**: Test simultaneous key input and browser-level rollover limits.
- **Typing Test**: Measure WPM and accuracy using interpreted `event.key` input.
- **Event Inspector**: Deep dive into raw browser keyboard events (keydown, keyup, modifiers).
- **Compare Keyboards**: Evaluate differences in hardware behavior side-by-side.

**Guided Modes:**
- **Full**: Tests 100% of the selected layout's keys.
- **Main**: Tests only alphanumeric and primary modifiers.
- **Function**: Tests only the F1-F12 row.
- **Navigation**: Tests arrows and the home/end cluster.
- **Numpad**: Tests only the numeric pad.

---

## 2. Architecture & Data Flow
- **Frontend**: A fully static SPA (React 19, Vite, Tailwind CSS v4). It relies strictly on browser-local APIs.
- **Backend**: A minimal Node.js Express server providing a health check.

**Data Flow:**
`Physical Keyboard` → `Browser KeyboardEvent` → `React state/hooks` → `Test UI` → `Local aggregate state` → `Optional user-triggered export/share`.
*Keyboard data absolutely never leaves the browser environment.*

---

## 3. Keyboard Event Architecture
Future maintainers must respect the following distinction:

- **`event.code` (Physical Identity)**: Used in Keyboard Test and Ghosting Test. This represents the physical electrical switch that was pressed, regardless of the OS language mapping (e.g., `KeyQ` is always the key next to Tab).
- **`event.key` (Interpreted Character)**: Used in the Typing Test. This represents the actual character the OS generated (e.g., `q` or `a` depending on layout).

*Browser APIs do not expose electrical keyboard internals.* We measure browser observables only.

---

## 4. Privacy Architecture
- **Zero Telemetry**: Key presses, raw sequences, typed text, and Event Inspector logs are NEVER sent to a server. 
- **Local Storage**: `localStorage` and `sessionStorage` persist session data locally.
- **Network Silence**: Using the application tools generates NO backend API requests.

---

## 5. Storage Schemas
**Local Storage (`localStorage`):**
- **Key**: `keycheck_test_history`
- **Purpose**: Persists aggregate test sessions.
- **Shape**: `Array<{ id, timestamp, layout, mode, completion, duration, ... }>`
- **Size**: Capped at 10 items. Older items are silently purged.
- **Key**: `keycheck_layout`
- **Purpose**: Remembers the selected visual layout (`QWERTY`, `AZERTY`, `QWERTZ`).

**Session Storage (`sessionStorage`):**
- **Key**: `keycheck-compare-session`
- **Purpose**: Persists temporary report payloads for the side-by-side Comparison tool.

---

## 6. Report Schema
When generating a diagnostic report or JSON export, the schema strictly adheres to:
```json
{
  "reportVersion": "1.0",
  "generatedAt": "2024-01-01T12:00:00.000Z",
  "startedAt": "2024-01-01T11:59:00.000Z",
  "completedAt": "2024-01-01T12:00:00.000Z",
  "duration": "60.0s",
  "layout": "QWERTY",
  "mode": "Full",
  "testedKeys": 104,
  "totalTestableKeys": 104,
  "remainingKeys": 0,
  "completionPercentage": 100,
  "status": "completed"
}
```

---

## 7. Security & Error Policy
- **No telemetry logging**: Frontend console errors are intentionally trapped locally. We do not inject Sentry or third-party loggers that could inadvertently scrape raw keyboard events.
- **Backend Logging**: Startup, shutdown, and health checks are logged. No user payload logging exists.
- **XSS Mitigations**: We avoid `dangerouslySetInnerHTML`. The Event Inspector sanitizes all payload rendering via standard React DOM bindings.
- **CORS**: Strongly locked down via the `CLIENT_URL` environment variable.

---

## 8. Local Development
**Frontend**:
```bash
cd frontend
npm install
npm run dev
```
**Backend**:
```bash
cd backend
npm install
npm run dev
```

---

## 9. Environment Variables
No secrets are required. 
**Frontend (`frontend/.env`)**:
- `VITE_API_URL` (Optional): The fully qualified URL to the backend API.

**Backend (`backend/.env`)**:
- `PORT` (Required): The port the server listens on.
- `NODE_ENV` (Required): Set to `production` in production.
- `CLIENT_URL` (Required): The URL of the frontend (e.g., `https://www.yourdomain.com`). This stringently configures CORS.

---

## 10. Production Deployment
**Frontend (Static Host)**:
1. Run `npm run build`.
2. Host the `dist/` directory on a CDN (Vercel, Netlify, Cloudflare).
3. **CRITICAL**: The host MUST be configured to rewrite all unhandled routes to `/index.html` (SPA Fallback). `vercel.json` and `_redirects` are already provided.

**Backend (Node Service)**:
1. Run `NODE_ENV=production CLIENT_URL=https://www.yourdomain.com npm run start`.
2. Serves `GET /api/health` providing `{"status": "ok"}`.

---

## 11. Maintenance Guide
Future developers must observe the following constraints to preserve architecture integrity:
- **Event Limits**: `MAX_EVENTS` and `MAX_ANOMALIES` must remain hardcoded bounded limits (e.g. 100) to prevent memory exhaustion during keyboard mashing.
- **Storage Safety**: Always wrap `localStorage` and `sessionStorage` calls in `try/catch` and enforce strict type/array checking, as users can inject malformed JSON via browser DevTools.
- **Dependency Upgrades**: Do not blindly upgrade React, Vite, or Tailwind without verifying that global `keydown`/`keyup` hooks do not tear down and reattach during rapid re-renders (this will cause dropped keystrokes).

---

## 12. Troubleshooting
- **Physical keys not detected**: Ensure the browser has focus. Note that `Win`, `Alt+Tab`, and `Ctrl+Alt+Del` are intercepted by the OS.
- **Direct route returns 404**: Static host is missing the SPA fallback rewrite (`/index.html`).
- **Clipboard/Share fails**: The browser denied permissions (e.g., non-HTTPS contexts) or the Web Share API is unsupported. The app falls back gracefully.
- **Keyboard layout appears wrong**: The browser CANNOT reliably infer physical layout. The visual selector determines the presentation.

---

## 13. Release Checklist
**Pre-release:**
- [ ] Clean Git state, dependencies install, tests & lint pass
- [ ] Production build succeeds
- [ ] No secrets or network privacy leaks

**Functional:**
- [ ] Keyboard, Ghosting, Typing, Inspector, Comparison tools function
- [ ] Layouts and Guided Modes filter correctly
- [ ] History saves and Export/Print works

**Production:**
- [ ] Backend starts, `/api/health` functions
- [ ] SPA routing and CORS verified
