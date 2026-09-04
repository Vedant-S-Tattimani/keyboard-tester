# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-09-04

### Added
- **Keyboard Diagnostics**: Comprehensive layout testing (QWERTY, AZERTY, QWERTZ) strictly leveraging `KeyboardEvent.code` to identify physical keys regardless of OS language settings.
- **Ghosting Test (Multi-Key)**: Browser-based key rollover tracking to measure simultaneous input handling constraints.
- **Typing Engine**: Accurately measures WPM and accuracy using `KeyboardEvent.key`, with full Unicode & grapheme segmentation (via `Intl.Segmenter`) for complex character mapping (Devanagari, Arabic, Emoji).
- **Global Internationalization**: Architecture dynamically supporting 16+ locales (including RTL layout inversion for Arabic and Hebrew) using CSS logical properties and robust English fallbacks.
- **Event Inspector**: Low-level diagnostic view of raw browser key events, modifier states, and timing anomalies.
- **Keyboard Comparison tool**: Compare two separate physical keyboards side-by-side.
- **Zero-Telemetry Architecture**: Strictly client-side execution with `localStorage` and `sessionStorage` session persistence. No keyboard events are ever sent to a server.
- **Theming**: Integrated Light, Dark, and System (prefers-color-scheme) modes using Tailwind CSS v4 design tokens.
- **Responsive Layout**: Dynamically scales the keyboard layout fluidly to fit mobile and tablet screens using CSS Container Queries (`@container`, `cqw`).

### Security
- Locked down CORS via environment variable `CLIENT_URL`.
- Exclusively uses secure React DOM bindings (no `dangerouslySetInnerHTML`) to mitigate XSS vulnerabilities against malicious event payloads.
