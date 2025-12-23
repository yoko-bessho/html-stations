# GitHub Copilot / AI Agent Instructions for html-stations

## 🧭 Project overview

- This repo is a static-site code exercise: each `src/station*.html` is a self-contained lesson page (HTML + optional JS/CSS). Tests emulate user-facing expectations (DOM contents, timing).
- No backend: pages are served from a simple static dev server (`lite-server`, `yarn serve`).
- Tests are implemented with Playwright (primary) and Cypress config exists (baseUrl). Utility helpers live under `utils/`.

## 🔧 Key commands / developer workflows

- Start dev server (required for Playwright/Cypress):
  - yarn serve # runs `lite-server` and serves site at http://127.0.0.1:3000/
  - Note: `yarn start` is not present — don't use it.
- Run Playwright tests:
  - npx playwright test # run all tests
  - npx playwright test playwright/station15.spec.ts # run a single spec file
  - Use `--project=chromium` or other Playwright flags as needed
- Playwright config highlights: `playwright.config.ts` sets baseURL to `http://127.0.0.1:3000`, uses `yarn serve` as `webServer`, and reports as `junit`.
- Cypress: cypress.json sets `baseUrl` to `http://localhost:3000/` (useful reference if Cypress is used).

## 📁 Important files & directories (reference)

- `package.json` — dev dependencies and `serve` script
- `playwright.config.ts` — test configuration and web server settings
- `playwright/*.spec.ts` — Playwright tests per station (see patterns used)
- `src/` — site source: `stationN.html`, `assets/` (css, images), `scripts/` (station-specific JS)
- `src/scripts/*-common.js` — shared helper modules for a given station
- `utils/` — TypeScript helpers used in tests (e.g., `compareColor.ts`)

## 🧩 Project-specific patterns & conventions (important for AI agents)

- Station pages are independent. Tests load a single page via `page.goto('/stationNN.html')`.
- Script organization
  - `src/scripts/stationNN.js` contains the exercise's JS. If helpers are shared inside the same solution, a `stationNN-common.js` file exists.
  - HTML files include scripts directly (no bundler). Make edits with that in mind.
- Tests commonly rely on timing-based behavior (setTimeout) and use Playwright `page.waitForTimeout(...)` to wait for effects. When implementing asynchronous behavior, match the timeouts used in tests (e.g., tests wait 3–5s for 3s timeouts in code).
- Tests use simple CSS/DOM selectors such as `#result > *`. Preserve IDs and structure expected by tests when changing markup.
- Naming: files are stationNN (HTML) and stationNN.spec.ts (Playwright). Some test filenames are zero-padded (e.g., `station01.spec.ts`) — follow existing naming to maintain consistency.

## ✅ Typical additions & examples

- Add a new station:

  1. Create `src/stationX.html` and add script tags pointing to `src/scripts/stationX.js` (and optionally `stationX-common.js`).
  2. Add CSS under `src/assets/css/` and reference it from the HTML.
  3. Add a Playwright test at `playwright/stationX.spec.ts` that mirrors the style in other specs (page.goto('/stationX.html'), assertions on `#result`, etc.).

- Example test assertion style (from `playwright/station15.spec.ts`):
  - Expect initial empty state: `expect(await page.locator('#result > *').count()).toBe(0)`
  - Wait for behavior: `await page.waitForTimeout(5000)` then assert content:
    `expect(await result[0].innerText()).toBe('大木 優')`

## ⚠️ Pitfalls & gotchas for agents

- Do not change the server port or base URL without also updating `playwright.config.ts` and `cypress.json`.
- Tests are timing-sensitive. If replacing setTimeout with a different mechanism, ensure tests still have deterministic behavior (or update tests accordingly).
- Because files are included directly (no bundler), changes to `src/scripts/*.js` are visible immediately on reload; remember to update corresponding tests that assert DOM shapes and strings.

## 💡 Useful heuristics for code suggestions

- Prefer minimal, localized changes for student-style pages (fix markup, small JS changes). Avoid large refactors unless requested.
- When tests fail due to timeouts, prefer increasing wait time minimally and investigating flakiness; follow the repository convention of using `waitForTimeout` in tests rather than complex network mocks.
- Preserve existing naming and DOM IDs to avoid breaking many tests.

---

If you'd like, I can (1) merge/add this document into `.github/copilot-instructions.md` (already staged), and (2) expand any section with more concrete examples or add a short checklist for reviewers. Which would you prefer?
