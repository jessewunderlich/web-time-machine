'use client';

import { useEffect, useState } from 'react';

/**
 * React hook that reports the user's `prefers-reduced-motion` OS setting.
 *
 * Returns `true` when the user has requested reduced motion. Components should
 * skip or simplify JS-driven animations when this is true (typewriter effects,
 * auto-advancing content, parallax, pinned scroll-trigger transitions, etc.).
 *
 * CSS-level animations/transitions are already disabled globally via a
 * `@media (prefers-reduced-motion: reduce)` rule in `globals.css`.
 *
 * SSR-safe: returns `false` on the server and during the first render, then
 * updates after mount. Listens for changes so OS-level toggles propagate
 * without a reload.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mql.matches);
    update();
    // Modern + legacy listener signatures
    if (mql.addEventListener) {
      mql.addEventListener('change', update);
      return () => mql.removeEventListener('change', update);
    } else {
      mql.addListener(update);
      return () => mql.removeListener(update);
    }
  }, []);

  return reduced;
}
