'use client';

import { useEffect } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { navigateWithTransition, willUseViewTransition } from '../lib/view-transition';

const ERA_IDS = [
  'era-1991',
  'era-1996',
  'era-2000',
  'era-2005',
  'era-2010',
  'era-2015',
  'era-2021',
  'era-2026',
] as const;

// KeyboardNav owns the keydown handlers for arrow / number-key era
// navigation. The visible "press ? for shortcuts" hint + full help modal
// live in HelpModal; this component renders no UI so it stays a pure
// behavior component.
export default function KeyboardNav() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const getCurrentIndex = (): number => {
      const mid = window.scrollY + window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      ERA_IDS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const dist = Math.abs(el.offsetTop + el.offsetHeight / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      return best;
    };

    const scrollToElement = (i: number, instant = false) => {
      const el = document.getElementById(ERA_IDS[i]);
      if (el) {
        let behavior: ScrollBehavior;
        if (reducedMotion) behavior = 'auto';
        else if (instant) behavior = 'instant' as ScrollBehavior;
        else behavior = 'smooth';
        el.scrollIntoView({ behavior, block: 'start' });
        // Keep the URL hash in sync so keyboard-navigated positions are
        // bookmarkable/shareable.
        window.history.replaceState(null, '', `#${ERA_IDS[i]}`);
      }
    };

    // Adjacent-era moves (arrow keys) stay as smooth scroll — short
    // distance, continuity is nice. Number-key jumps (1–7) are arbitrary
    // long-range teleports, where a crossfade View Transition reads better
    // than a chaotic multi-era smooth scroll.
    //
    // Inside a View Transition the scroll must be instant (VT snapshots
    // before/after mutate() runs synchronously, so a smooth scroll would
    // play over the crossfade). See lib/view-transition.ts.
    const scrollAdjacent = (i: number) => scrollToElement(i, false);
    const scrollJump = (i: number) => {
      const useVT = willUseViewTransition();
      navigateWithTransition(() => scrollToElement(i, useVT));
    };

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        scrollAdjacent(Math.min(getCurrentIndex() + 1, ERA_IDS.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        scrollAdjacent(Math.max(getCurrentIndex() - 1, 0));
      } else if (e.key >= '1' && e.key <= '8') {
        scrollJump(parseInt(e.key, 10) - 1);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [reducedMotion]);

  return null;
}
