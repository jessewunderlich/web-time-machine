# Web Time Machine — Project Spec

## Concept
A single-page scrolling site about the history of the web, where each era section is styled authentically in the visual language of that time period. As you scroll through time, the design transforms.

## Tech Stack
- **Next.js 15** (App Router, TypeScript, Tailwind CSS)
- **GSAP + ScrollTrigger** for scroll-driven era transitions
- **Framer Motion** for micro-animations within sections
- All components must be `'use client'` where GSAP/Framer is used

## Project Structure
```
src/
  app/
    layout.tsx        — root layout, font loading, metadata
    page.tsx          — main page, imports all era sections
    globals.css       — base styles + era-scoped CSS custom properties
  components/
    ScrollProvider.tsx — GSAP ScrollTrigger setup, smooth scroll
    EraTransition.tsx  — transition zone component between eras
    eras/
      Era1991.tsx     — 1991-1995: The Beginning
      Era1996.tsx     — 1996-1999: GeoCities Era
      Era2000.tsx     — 2000-2004: Flash Era
      Era2005.tsx     — 2005-2009: Web 2.0
      Era2010.tsx     — 2010-2014: Flat Design
      Era2015.tsx     — 2015-2020: Modern Minimal
      Era2021.tsx     — 2021-2026: AI & Beyond
    browser-chrome/
      BrowserChrome.tsx — wraps each era in period-accurate browser frame
  styles/
    era-1991.css
    era-1996.css
    era-2000.css
    era-2005.css
    era-2010.css
    era-2015.css
    era-2021.css
  assets/
    (placeholder — retro GIFs, textures, etc.)
```

## Era Design Specs

### Era 1: 1991-1995 — "The Beginning"
- **Background:** Black or dark grey
- **Text:** Green or white monospaced font (Courier New)
- **Layout:** Single column, no styling, raw hyperlinks (blue underlined)
- **Elements:** ASCII art header, `<hr>` dividers, bulleted lists
- **Content:** What the web was, Tim Berners-Lee, CERN, Mosaic browser
- **Vibe:** Terminal / Lynx browser

### Era 2: 1996-1999 — "The GeoCities Era"
- **Background:** Tiled starfield or construction GIF pattern
- **Text:** Comic Sans, bright colors (lime green, hot pink, yellow) on dark bg
- **Layout:** Centered table-based look with beveled grey borders
- **Elements:** Animated "Under Construction" GIF, fake visitor counter, marquee text, guestbook link, web ring navigation at bottom
- **Content:** GeoCities, table layouts, the personal homepage era, CSS introduction
- **Browser Chrome:** Netscape Navigator frame

### Era 3: 2000-2004 — "The Flash Era"
- **Background:** Dark gradient (navy to black)
- **Layout:** Centered 800px fixed-width container
- **Elements:** Fake Flash loading bar animation, glossy pill buttons, pixel art icons, embedded "music player" widget (visual only), skip intro link
- **Text:** Verdana, small (10-11px)
- **Content:** Flash, dot-com boom/bust, early CSS adoption, Miniclip, Newgrounds
- **Browser Chrome:** IE6 frame

### Era 4: 2005-2009 — "Web 2.0"
- **Background:** White/light with subtle linen texture
- **Layout:** 960px grid, two-column with sidebar
- **Elements:** Glossy buttons with reflections, "Web 2.0" badge/starburst, RSS icon, tag cloud, rounded corners everywhere, gradient headers
- **Text:** Lucida Grande / Trebuchet MS
- **Content:** MySpace, early social media, AJAX, jQuery, skeuomorphism origins
- **Browser Chrome:** Firefox 3 frame

### Era 5: 2010-2014 — "Flat Design"
- **Background:** Bold solid colors (iOS 7 palette)
- **Layout:** Full-width hero + card grid, responsive columns
- **Elements:** Flat icons (no shadows), hamburger menu, thin fonts, parallax scroll section, large hero image
- **Text:** Helvetica Neue / Open Sans, thin weight
- **Content:** iOS 7, Windows Metro, responsive design, Bootstrap era
- **Browser Chrome:** Chrome frame

### Era 6: 2015-2020 — "Modern Minimal"
- **Background:** White with massive whitespace, or dark mode toggle
- **Layout:** Full-bleed sections, asymmetric grids
- **Elements:** Scroll-triggered fade-ins, sticky nav, micro-interactions on hover, video hero (use a CSS gradient animation as placeholder), dark mode toggle
- **Text:** System font stack / Inter
- **Content:** Mobile-first, PWAs, design systems, accessibility movement
- **Browser Chrome:** Safari frame or no chrome

### Era 7: 2021-2026 — "AI & Beyond"
- **Background:** Animated mesh gradients, glassmorphism panels
- **Layout:** Bento grid
- **Elements:** AI chatbot widget (fake/decorative), variable fonts that animate, glassmorphic cards with backdrop-blur, 3D floating element (CSS only is fine), noise texture overlay
- **Text:** Variable font (e.g., Inter Variable), large display type
- **Content:** AI tools, LLMs, Web3 hype/decline, design tools revolution, the meta moment — site comments on itself
- **Browser Chrome:** Arc-style minimal or none

## Scroll Transitions
Between each era, include a brief "transition zone" (200vh tall) where:
- The background crossfades between eras
- A year counter animates (e.g., "1995 → 1996")
- Old era fades out, new era fades in

Use GSAP ScrollTrigger to pin and animate these transitions.

## Easter Eggs
- Era 2 (GeoCities): Hidden "view source" link that shows fake HTML
- Era 3 (Flash): Fake popup ad that can be "closed"
- Era 6 (Modern): Cookie consent banner slides up
- Era 7 (AI): The chatbot "types" a message about the site itself

## Performance
- Use next/font for system + Google fonts
- Lazy load era components with dynamic imports
- Keep bundle size reasonable — CSS-only effects preferred over JS when possible
- All images optimized, use next/image

## Deployment
- Vercel (connect to GitHub repo)
- SSG (static export) — no server-side features needed

## Build Order (Priority)
1. ScrollProvider + page layout with all 7 era placeholders
2. Era 1 (simplest) + Era 2 (most iconic) — prove the concept
3. Era transitions between 1→2
4. Remaining eras (3-7)
5. Browser chrome frames
6. Easter eggs
7. Polish, responsive, performance
