<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Web Time Machine — project invariants

Read `README.md` and `SPEC.md` first. Key things to not break:

### Rendering

- **Never use `dynamic(..., { ssr: false })` on Era components.** React 19 emitted
  `BAILOUT_TO_CLIENT_SIDE_RENDERING` placeholders that failed to reconcile and threw
  `NotFoundError: insertBefore`. Static imports in `EraContainer.tsx` only.
- Anything using `GSAP`, `ScrollTrigger`, `IntersectionObserver`, or the Web Audio
  API must be `'use client'`.
- `metadataBase` in `src/app/layout.tsx` auto-resolves from `VERCEL_URL` for previews
  and falls back to the production domain for local dev. Do not hardcode.

### Structure

- Era components live in `src/components/eras/Era{year}.tsx` and MUST export default.
- Era IDs are `era-YYYY` (e.g. `era-1991`, `era-2021`). The skip link, `EraNav`,
  `ScrollProvider`, and `KeyboardNav` all depend on this naming.
- Per-era styling lives in `src/styles/era-{year}.module.css`. Shared patterns
  (browser chrome, historical sites, era nav, progress bar) have their own modules.
- CSS custom properties are era-scoped in `globals.css` (`--era-YYYY-bg` etc.) —
  era components import their own module but can reference the globals for colors.

### Accessibility — non-negotiable

- Exactly **one `<h1>`** per page. Era titles use `<h2>`, subsections `<h3>`.
- `prefers-reduced-motion: reduce` must be respected at three layers:
  CSS (`@media` guard in `globals.css`), GSAP (`gsap.matchMedia()` inside every
  era's animations), and JS effects (typewriters, auto-advancing chat, pinned
  scroll zones should render in their end state instead of animating).
- Every interactive element needs an accessible name (visible label, inner text,
  or `aria-label`). Decorative demo inputs (e.g. Era2021 chatbot) need an
  `aria-label` that explains they are read-only.
- The `.skip-link` at the top of `EraContainer` targets `#era-1991`. If you ever
  change the first era's id, update the skip link.

### Quality gates (run before claiming done)

```bash
npx tsc --noEmit               # must be clean
npx eslint --max-warnings 0    # must be clean
npm run build                  # must complete without error
```

Verify runtime too — a build pass does not prove the page loads. Spin up
`npm run start` and confirm zero console exceptions before shipping.

### Performance budget (soft)

Cold production load should stay under:

- **300 KB** total transfer
- **250 KB** JS
- **200 ms** FCP on a decent connection
- **500 ms** load event
- **0** horizontal overflow at 375px viewport

Current (April 2026): ~288 KB total / 231 KB JS / FCP ~150 ms / load ~260 ms.
