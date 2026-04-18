# Web Time Machine

An interactive scrolling history of web design — each era of the web (1991 → 2026)
rendered authentically in the visual language of its time. Scroll through the
Lynx terminal, GeoCities starfields, Flash intros, Web 2.0 glass buttons, flat
design, modern minimalism, and the current AI/glass-morphism era.

**Live:** https://web-time-machine-coral.vercel.app
**Spec:** [`SPEC.md`](./SPEC.md)

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, TypeScript)
- [React 19](https://react.dev/)
- [GSAP 3](https://gsap.com/) + [`@gsap/react`](https://gsap.com/resources/React)
  (`ScrollTrigger`, `useGSAP`) for scroll-driven transitions
- [Tailwind CSS 4](https://tailwindcss.com/) for utilities; CSS Modules for
  era-scoped styling
- Synthesized audio via the Web Audio API (no media files)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | What it does                                       |
| --------------- | -------------------------------------------------- |
| `npm run dev`   | Start the dev server                               |
| `npm run build` | Production build (`next build`)                    |
| `npm run start` | Serve the production build (`next start`)          |
| `npm run lint`  | Run `eslint` (repo is kept at `--max-warnings 0`)  |

Before every commit we also run `npx tsc --noEmit` (strict-mode clean).

## Project Layout

```
src/
  app/
    layout.tsx              root layout + <head> metadata
    page.tsx                entry point (renders <EraContainer />)
    opengraph-image.tsx     OG share card (Next.js ImageResponse)
    twitter-image.tsx       Twitter share card
    _og/shared.tsx          shared <ShareCard /> used by both
    globals.css             reset + era CSS variables + prefers-reduced-motion
  components/
    EraContainer.tsx        assembles the 7 eras + transitions
    ScrollProvider.tsx      GSAP registration + smooth scroll
    EraTransition.tsx       pinned year-counter crossfade between eras
    EraNav.tsx              floating era nav dots (right side)
    ProgressBar.tsx         scroll progress indicator (top)
    KeyboardNav.tsx         arrow / number-key navigation
    SoundEngine.tsx         era-aware synthesized audio
    SoundToggle.tsx         mute/unmute button
    HistoricalSites.tsx     period site cards within each era
    browser-chrome/
      BrowserChrome.tsx     era-specific browser window frames
    eras/
      Era1991.tsx           Lynx / terminal
      Era1996.tsx           GeoCities
      Era2000.tsx           Flash / IE6
      Era2005.tsx           Web 2.0 / glossy
      Era2010.tsx           flat design
      Era2015.tsx           modern minimal
      Era2021.tsx           AI & beyond
  hooks/
    useReducedMotion.ts     syncs with prefers-reduced-motion
  styles/
    era-*.module.css        per-era CSS modules
```

## Accessibility

- `prefers-reduced-motion: reduce` is respected at three layers:
  CSS (global guard in `globals.css`), GSAP (`gsap.matchMedia()` in every era),
  and JS effects (typewriters, auto-advancing chat, pinned scroll zones render
  in their end state instead of animating).
- Skip-to-content link at the top of the page.
- Single `<h1>` per document; era titles use `<h2>` and subsections `<h3>`.
- Every interactive element has a visible label or `aria-label`.
- Full keyboard navigation: `↑` / `↓` / `Home` / `End` / number keys `1`–`7`
  jump between eras.

## Deployment

Deployed to [Vercel](https://vercel.com) on push to `main`. Builds in ~25s.
`metadataBase` auto-resolves from `VERCEL_URL` for preview deploys and falls
back to the production domain for local dev.

## Notes for Future Agents

- Era components **must** be statically imported inside `EraContainer.tsx`.
  An earlier attempt to `dynamic(..., { ssr: false })` them produced
  `BAILOUT_TO_CLIENT_SIDE_RENDERING` placeholders that React 19 refused to
  reconcile (`NotFoundError: insertBefore`). Don't reintroduce `ssr: false`
  on these.
- Anything using `GSAP`, `ScrollTrigger`, `IntersectionObserver`, or the
  Web Audio API must be `'use client'`.
- Keep ESLint at `--max-warnings 0`. Fix warnings, don't disable rules.
