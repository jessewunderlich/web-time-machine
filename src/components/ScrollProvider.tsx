'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Smooth scroll via native CSS scroll-behavior + GSAP ScrollTrigger config
    // (Lenis removed — ESM-only package causes Next.js hydration crash)
    //
    // `ignoreMobileResize: true` prevents pinned ScrollTrigger spacers from
    // jumping when the iOS Safari address bar collapses/expands during
    // scroll (documented GSAP issue — address bar change fires a resize
    // that ScrollTrigger would otherwise treat as a layout change). Safe on
    // desktop because the resize event only fires meaningfully on mobile.
    ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
    gsap.ticker.lagSmoothing(0);

    // Deep-link support: if the page loaded with e.g. /#era-2005, the native
    // anchor jump fires before our eras finish hydrating, so the browser
    // often lands in the wrong spot or at the top. Re-scroll to the hashed
    // element once after mount + ScrollTrigger has measured the page.
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    // Support both simple (#era-2000) and compound (#era-2000/flash) hashes.
    // Compound hashes deep-link to a named sub-section within an era.
    const compoundMatch = hash.match(/^#(era-\d{4})\/(.+)$/);
    const simpleMatch = hash.match(/^#(era-\d{4})$/);
    const targetSelector = compoundMatch
      ? `#${compoundMatch[1]}-${compoundMatch[2]}`
      : simpleMatch
        ? `#${simpleMatch[1]}`
        : null;
    if (targetSelector) {
      // Defer one tick so ScrollTrigger finishes its initial refresh and
      // pinned-spacer heights are applied. Without this the offsetTop is
      // computed against a shorter document and the jump undershoots.
      //
      // For compound hashes (#era-YYYY/section), the sub-section element
      // may not exist in the DOM yet (e.g. Era1991's typewriter renders
      // content progressively). Strategy: scroll to the era first, then
      // retry the sub-section target a few times with increasing delays.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          let target = document.querySelector(targetSelector);
          if (target) {
            target.scrollIntoView({ behavior: 'auto', block: 'start' });
            return;
          }
          // If compound hash, scroll to the era first to trigger rendering,
          // then retry the sub-section.
          if (compoundMatch) {
            const eraEl = document.getElementById(compoundMatch[1]);
            if (eraEl) eraEl.scrollIntoView({ behavior: 'auto', block: 'start' });
            // Retry sub-section with exponential backoff (200, 600, 1400ms)
            let attempt = 0;
            const retry = () => {
              target = document.querySelector(targetSelector);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else if (attempt < 3) {
                attempt++;
                setTimeout(retry, 200 * Math.pow(2, attempt));
              }
            };
            setTimeout(retry, 200);
          }
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
