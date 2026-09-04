# Contributing to KeyCheck

Thank you for your interest in contributing to KeyCheck! 

## Philosophy
KeyCheck is designed to be the most rigorous, client-side, hardware-agnostic physical keyboard tester on the web. It is built entirely as a static SPA without any backend data collection.

When contributing, please strictly observe the following:
1. **Zero Telemetry**: Never add any code that exports, transmits, or logs keyboard events (`event.key`, `event.code`) to an external server.
2. **Browser APIs Only**: We do not install OS-level hooks. We only report what the browser's `KeyboardEvent` API can observe. Do not claim diagnostic capabilities that require kernel/driver access.
3. **No Heavy Dependencies**: Keep the application fast. Avoid massive libraries (e.g., `moment.js`, heavy i18n runtimes) if native Web APIs (`Intl.Segmenter`, `Intl.DateTimeFormat`) suffice.

## Development Setup

The project uses React 19, Vite, and Tailwind CSS v4.

```bash
git clone https://github.com/Vedant-S-Tattimani/keyboard-tester.git
cd keyboard-tester/frontend
npm install
npm run dev
```

## Adding a New Language (Internationalization)

We use a custom, lightweight `LanguageContext` rather than `react-i18next`.

1. Create a new file in `frontend/src/i18n/locales/xx.js` (where `xx` is the ISO code).
2. Copy the structure from `en.js`.
3. If translating Right-to-Left (e.g., Arabic), the `dir="rtl"` mapping will be handled automatically by the `LanguageContext` configuration.
4. (Optional) If adding typing passages, create `frontend/src/utils/typingPassages/xx.js` and export an array of strings.
5. Add the language to the dropdown options in `LanguageSelector.jsx`.

## Adding a New Keyboard Layout

Layouts are defined statically.

1. Open `frontend/src/components/Keyboard/layouts.js`.
2. Add your new layout array (e.g., `DVORAK`).
3. Ensure every key specifies its physical `code` (e.g., `KeyQ`), the display `label`, and optional geometric `width` (default is 1).
4. Do NOT attempt to automatically detect the layout based on IP or User-Agent, as this is unreliable. Rely on the user to select their layout via `LayoutSelector.jsx`.

## Testing

Ensure all tests pass before submitting a PR. We enforce strict separation of Unit vs E2E.

- **Unit Tests**: `npm run test` (Vitest + React Testing Library)
- **E2E Tests**: `npm run test:e2e` (Playwright)

## Submitting Changes

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes.
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
