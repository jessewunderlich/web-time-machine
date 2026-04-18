'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const ERA_IDS = [
  'era-1991',
  'era-1996',
  'era-2000',
  'era-2005',
  'era-2010',
  'era-2015',
  'era-2021',
] as const;

export default function KeyboardNav() {
  const [showHint, setShowHint] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

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

    const scrollTo = (i: number) => {
      const el = document.getElementById(ERA_IDS[i]);
      if (el) el.scrollIntoView({
        // Honor prefers-reduced-motion explicitly for deterministic behavior.
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    };

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        scrollTo(Math.min(getCurrentIndex() + 1, ERA_IDS.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        scrollTo(Math.max(getCurrentIndex() - 1, 0));
      } else if (e.key >= '1' && e.key <= '7') {
        scrollTo(parseInt(e.key, 10) - 1);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        bottom: '5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(4px)',
        color: '#fff',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontFamily: 'monospace',
        zIndex: 9000,
        pointerEvents: 'none',
        transition: 'opacity 0.8s ease',
        opacity: showHint ? 1 : 0,
        whiteSpace: 'nowrap',
      }}
    >
      ← → Navigate eras · 1–7 Jump to era
    </div>
  );
}
