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
    if (hash && /^#era-\d{4}$/.test(hash)) {
      // Defer one tick so ScrollTrigger finishes its initial refresh and
      // pinned-spacer heights are applied. Without this the offsetTop is
      // computed against a shorter document and the jump undershoots.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const target = document.querySelector(hash);
          if (target) {
            target.scrollIntoView({ behavior: 'auto', block: 'start' });
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
