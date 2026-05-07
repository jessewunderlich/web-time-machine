# Web Time Machine — Enhancement Roadmap

_Deep research pass. 2026-04-18._

This document is the output of an audit + external research session. It is organized by impact × effort so the next agent (or me) can pick the highest-leverage items first.

The baseline scores (Lighthouse desktop, current main at commit `842efaa`):

| Category | Score |
|---|---|
| Performance | 99 |
| Accessibility | 93 |
| Best Practices | 100 |
| SEO | 100 |

Translation: the site is in great shape. The remaining surface area is about **deepening the experience** (more content, more era authenticity, more shareability) rather than fixing broken things. Accessibility has two concrete gaps (contrast + target-size) that should land first.

---

## Tier 1 — Ship Next (1–3 hour items, each clearly worth doing)

### 1.1 Fix the 61 color-contrast failures _(a11y: 93 → 100)_
**Evidence:** Lighthouse flags 61 nodes below WCAG AA 4.5:1. Concentration:
- Splash screen: "A VISUAL HISTORY" (`#008000` on `#000` = 4.08), splashLede (`#666` on `#000` = 3.65), scroll hint (`#333` on `#000` = 1.66 — effectively invisible).
- HistoricalSites cards: year labels (`#595959` on `#000` = 2.99) across every era card on dark backgrounds.
- HistoricalSites urlBar (dark): `#666` on `#c0c0c0` (`3.15`).

**Fix:** Nudge foreground values up one step. Rules of thumb that clear AA:
- On `#000`: use `#00C000` (not `#008000`), `#a0a0a0` (not `#666`), `#b8b8b8` (not `#333`).
- On `#c0c0c0` (Lynx/Netscape chrome): use `#404040` (not `#666`).

**Risk:** Zero. Period-accuracy is preserved — nothing about the era aesthetics depends on sub-AA contrast.

### 1.2 Fix IE6 title-bar button target sizes _(a11y)_
**Evidence:** Lighthouse: `_`, `□`, `✕` buttons are 16×14px with 12px spacing. WCAG 2.5.5 wants ≥24×24 or equivalent spacing.

**Fix:** Add invisible padding (`padding: 8px`, `margin: -8px`) to each `.winBtn` so the visual element stays period-accurate but the **hit target** is 24×24+. A well-known retro-UI pattern.

**Risk:** Low. Must verify the three buttons don't start overlapping adjacent chrome elements.

### 1.3 View-transitions between eras (opt-in, progressive enhancement)
**What:** Use the native CSS `@view-transition` API (Chrome 126+, Safari 18+) to crossfade content when navigating via EraNav / keyboard / progress-bar clicks. Feature-detected; falls back to today's smooth-scroll on Firefox.

**Why:** Elevates the feel of programmatic jumps from "scroll-to" to "teleport-with-style" — and it's a ~30-line addition to `EraNav`/`ProgressBar`. Perfect thematic fit: the site is about the evolution of web tech, so using the newest-new on it is a wink.

**Cost:** ~1 hr.

### 1.4 Shareable anchor URLs for each era
**What:** When a user jumps to an era (via nav/keyboard/dot), push `#era-2005` into `history.replaceState` (not `pushState` — keeps back-button behavior clean) and on load, read the hash and scroll there after hydration.

**Why:** Today the URL stays `/` forever. With this you can DM someone `web-time-machine-coral.vercel.app/#era-1996` and they land on GeoCities era. Turns casual views into shareable artifacts. Almost free.

**Cost:** ~30 min.

### 1.5 OG image per era (dynamic)
**What:** Next.js 16 supports `opengraph-image.tsx` with dynamic params. Route `/share/[era]/opengraph-image.tsx` → renders an era-themed 1200×630 share card. Combined with (1.4), sharing `/#era-2000` generates a Flash-era themed thumbnail.

**Why:** Each era has a strong visual identity. Sharing just one generic OG wastes that. An era-specific OG makes link shares highly memorable.

**Cost:** ~2 hr (one generic template, parameterized by era).

---

## Tier 2 — High-leverage features (half-day to a day)

### 2.1 Add Era 0: 1989–1990 (Pre-web)
**What:** A "prehistory" era before the Lynx screen — a text-only CRT-green screen showing Tim Berners-Lee's March 1989 "Information Management: A Proposal" memo excerpts. Transitions into 1991.

**Why:** Gives the opening more narrative momentum, and "the web didn't start in 1991" is a genuine fact that most people get wrong. Content is already public-domain (CERN released the memo).

**Cost:** ~3 hr (content + styling + transition).

### 2.2 Era 8: 2026+ (The Agentic Era)
**What:** One more era after 2021–2026. Features:
- Simulated agent conversation ("I'd like to book a trip to Tokyo" → agent responds in real time using fake latency).
- Inline interactive components inside the chat (the agent produces a flight-search card, a calendar pick, etc.).
- Subtitle: "When the browser stopped being the web."

**Why:** The site currently ends on "AI chatbots exist." That was news in 2022. In 2026 the frontier is agents-in-tool-use, which is genuinely a different design surface. This keeps the site relevant for another ~18 months.

**Cost:** ~1 day. Worth it — the ending shapes the memorability of the whole experience.

### 2.3 Per-era deep-dive drawer ("Learn more")
**What:** Each era gets a `[+] Learn More` trigger that slides up a drawer/sheet with:
- 3–5 paragraph long-form history of the era
- Timeline of key events with dates
- External links (Wayback Machine links to real sites from that year, Wikipedia, webdesignmuseum.org gallery link)
- Tech-stack call-outs (what HTML/CSS/JS features debuted)

**Why:** Current site is a vibes-first tour. Adding an on-demand depth layer converts casual visitors to deep engagement — and respects the hallway-test ("hey come look at this") without forcing the deep content on everyone.

**Cost:** ~1 day (shell + content for all 7 eras).

### 2.4 Real historical site screenshots (replace CSS-art placeholders)
**What:** Today `HistoricalSites` uses CSS art for each site card's "screenshot." It's charming but it's fake. Alternative: use [webdesignmuseum.org](https://webdesignmuseum.org) screenshots (Creative Commons) or [Wayback Machine's `web.archive.org/web/YYYYMMDD/…`](https://web.archive.org/) rendered thumbnails.

**Why:** "Real thing" beats "stylized representation" for educational value. Makes the site citable.

**Risk:** Need to confirm licensing for each image source. Webdesignmuseum.org's terms should be checked before bulk use.

**Cost:** ~4 hr (attribution line per card, download/optimize pipeline, maybe a `next/image` migration).

### 2.5 Accessible keyboard shortcut help dialog
**What:** Press `?` → opens a modal listing all shortcuts (arrows, 1–7, Home, End). Current `KeyboardNav` hint auto-hides after 3s and is `aria-hidden`, so SR/late-to-notice users miss it.

**Why:** Two-minute conversion from an invisible discoverability gap to a real affordance.

**Cost:** ~1 hr.

---

## Tier 3 — Experiments (requires design thought before building)

### 3.1 "Build your own era" sandbox
User picks year + style attributes (color palette, font, layout) → live-previews a fake homepage in that style → shareable URL. This is a Shopify-hero-grade engagement mechanic. Probably 2 days to do right. The scope risk is high because it turns a finite, curated experience into an open-ended one — think carefully before building.

### 3.2 Audio-reactive eras (opt-in)
Currently `SoundEngine` plays a synth drone per era. Make it narrate: era 1991 types in the typewriter's rhythm, era 1996 plays a MIDI snippet (Comic Sans-appropriate), era 2005 plays a 64kbps MP3 sting when a card enters view, era 2021 plays nothing (AI era = silence?). Strong opinion: gate behind the existing sound toggle (off by default).

### 3.3 Mini-game easter eggs per era
- Era 1991: text adventure embedded in the "lynx> " prompt (3 rooms).
- Era 1996: clickable dancing-baby gif.
- Era 2000: Flash-style "skip intro" appears for 3s.
- Era 2005: "Poke" button (Facebook era).
- Era 2010: flat-design parallax star field.
- Era 2015: Konami code unlocks dark-mode everywhere.
- Era 2021: prompt input that "generates" fake AI outputs.

These increase dwell time dramatically but require careful scope control — easy for 7 mini-games to become 7 half-finished mini-games.

### 3.4 Mobile experience pass
Current site is likely mobile-broken at era transitions (pinned 200vh zones don't always behave on iOS Safari). Needs a dedicated pass with real-device testing. Non-trivial because GSAP ScrollTrigger + mobile Safari has a documented history of issues.

---

## Tier 4 — Technical debt / hygiene

### 4.1 Legacy JavaScript polyfills shipping (~14KB wasted)
Lighthouse reports polyfills for `Array.prototype.at`, `.flat`, `.flatMap` being shipped. These are in Next's default polyfill bundle for older browsers. Fix: tighten `browserslist` in `package.json` to modern-only — the site's aesthetic doesn't work below Chrome 90 anyway.

**Savings:** ~14KB gzip off main bundle.

### 4.2 Unused JavaScript (31KB + 27KB in two chunks)
Two chunks report >50% unused code. Likely GSAP tree-shaking opportunities. Audit with Next's bundle analyzer (`@next/bundle-analyzer`).

### 4.3 Replace inline styles with module CSS
`SoundToggle` and `KeyboardNav` still render inline styles. Not a functional issue but creates per-component tiny style islands that complicate focus/hover states. ~1 hr of cleanup.

### 4.4 Automated a11y checks in CI
GitHub Action: `pa11y-ci` or `@axe-core/playwright` on every PR. Catches regressions without a human running Lighthouse by hand every round.

**Cost:** ~2 hr (one-time).

### 4.5 Visual regression testing
Each round of a11y + style refactoring risks subtle visual drift in the retro eras (where the whole point is pixel-accurate period-correctness). Add Playwright screenshot tests per era. Could gate PR merges.

**Cost:** ~3 hr initial setup, then maintenance.

---

## Tier 5 — Big swings (think before committing)

### 5.1 Reframe as "The Museum of the Web"
Current site is a scrolling tour. Reframe as a museum — each era is an "exhibit" with curator notes, interactive displays, and a gift shop (merch? nah). The tour mode stays; the museum-layout mode is an alternative entry. This is a significant product repositioning, not a feature add. Probably 1+ week of work including content.

### 5.2 Contribution mode (the web archives itself)
Add a "suggest an era event" form that writes to a moderation queue. If moderated-in, contributors get credited. Turns the site into a living archive rather than a static artifact. Requires backend (current site is fully static).

### 5.3 Multi-language
The web's history is global — Japan's 2000s web was radically different from the West's. Non-English eras would be a distinctive differentiator vs. other web history sites, all of which are English-only. Non-trivial (proper i18n routing, era content in multiple languages). But *very* distinctive.

### 5.4 Podcast / narrated tour
Record a 15-minute audio tour — one episode per era, 2 minutes each. Plays alongside the scroll. Turns a 5-minute browse into a commute-length podcast companion.

---

## External references that informed this roadmap

- **webdesignmuseum.org** — canonical archive of period screenshots. Licensing TBD but almost certainly negotiable for attribution.
- **cybercultural.com** — in-depth written history; source material for deep-dive drawer content.
- **GSAP ScrollTrigger performance notes** — the library already debounces + rAFs scroll, and throttles resize to 200ms. Current usage is near-optimal. Don't add layers of abstraction.
- **Core Web Vitals (2026)** — LCP, CLS, INP. Current site is at 0.99 performance; LCP is the only category below 1.0 (0.98). Don't chase the last 2% — the money is on accessibility and content.
- **Research on typewriter a11y** — `aria-label`-on-parent or sr-only sibling beats `aria-live` for streaming animations (addressed in round 5).

---

## Recommended next PR bundle

If I had to pick three things to ship **tomorrow** with one PR:

1. **Contrast pass** (1.1) — moves a11y 93 → 100.
2. **IE6 target-size pass** (1.2) — last a11y gap.
3. **Shareable anchor URLs** (1.4) — free viral-coefficient boost.

These compose cleanly, can be reviewed in one sitting, and measurably improve two different axes (a11y + shareability). After that, my vote is Era 2026+ (2.2) — it's the single feature that keeps this site relevant as we move into mid-2026.

---

_End of roadmap._
