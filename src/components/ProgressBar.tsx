'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { navigateWithTransition, willUseViewTransition } from '../lib/view-transition';
import styles from '../styles/progress-bar.module.css';

gsap.registerPlugin(ScrollTrigger);

/*
 * Scroll progress is driven by GSAP ScrollTrigger (universal fallback).
 * Where CSS `animation-timeline: scroll()` is supported, the static fill
 * in .barCssFill uses it for zero-JS width tracking (see module CSS).
 */

const ERAS = [
  { id: 'era-1991', label: '1991', color: '#00ff00' },
  { id: 'era-1996', label: '1996', color: '#ff00ff' },
  { id: 'era-2000', label: '2000', color: '#4488ff' },
  { id: 'era-2005', label: '2005', color: '#ff8c00' },
  { id: 'era-2010', label: '2010', color: '#1abc9c' },
  { id: 'era-2015', label: '2015', color: '#e0e0e0' },
  { id: 'era-2021', label: '2021', color: '#8b5cf6' },
] as const;

type EraId = (typeof ERAS)[number]['id'];

interface EraPosition {
  id: EraId;
  position: number;
}

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [currentEra, setCurrentEra] = useState<EraId | ''>('');
  const [eraPositions, setEraPositions] = useState<EraPosition[]>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const calculatePositions = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      setEraPositions(
        ERAS.map(({ id }) => {
          const el = document.getElementById(id);
          return { id, position: el ? el.offsetTop / totalHeight : 0 };
        })
      );
    };

    // GSAP ScrollTrigger drives progress for the JS fill and color
    triggerRef.current = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    // Recalculate era positions whenever page height changes (lazy-loaded eras)
    const ro = new ResizeObserver(calculatePositions);
    ro.observe(document.body);

    // Initial calculation after a tick (let eras lazy-load)
    const timer = setTimeout(calculatePositions, 500);

    return () => {
      triggerRef.current?.kill();
      ro.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // IntersectionObserver to track which era is currently visible
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ERAS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setCurrentEra(id);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToEra = (id: string) => {
    // Use View Transition crossfade on programmatic era jumps when supported.
    // Smooth-scrolling through 5 intermediate eras on a 1991→2021 jump is
    // visually chaotic; a crossfade is a more honest representation of
    // "teleporting" through the timeline.
    //
    // Scroll behavior depends on whether VT is active: 'instant' inside a
    // VT callback so the scroll completes synchronously and the crossfade
    // plays cleanly; 'smooth' otherwise. See lib/view-transition.ts.
    const useVT = willUseViewTransition();
    let behavior: ScrollBehavior;
    if (reducedMotion) behavior = 'auto';
    else if (useVT) behavior = 'instant' as ScrollBehavior;
    else behavior = 'smooth';

    navigateWithTransition(() => {
      document.getElementById(id)?.scrollIntoView({ behavior });
    });
    // Update active label immediately (optimistic) so color + underline match
    // the URL before IntersectionObserver fires at scroll-end.
    setCurrentEra(id as EraId);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  const currentColor =
    currentEra
      ? (ERAS.find((e) => e.id === currentEra)?.color ?? '#00ff00')
      : '#00ff00';

  return (
    <div
      className={styles.bar}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      {/* CSS scroll-timeline fill (zero-JS, where supported) */}
      <div className={styles.barCssFill} />

      {/* JS fill — adds era-specific color */}
      <div
        className={styles.fill}
        style={{ width: `${progress * 100}%`, background: currentColor }}
      />

      {/* Era label buttons */}
      {eraPositions.map(({ id, position }) => {
        const era = ERAS.find((e) => e.id === id);
        if (!era) return null;
        const isCurrent = id === currentEra;
        const leftPct = Math.min(Math.max(position * 100, 2), 96);
        return (
          <button
            key={id}
            type="button"
            className={`${styles.label} ${isCurrent ? styles.labelActive : ''}`}
            style={{ left: `${leftPct}%` }}
            onClick={() => scrollToEra(id)}
            title={`Jump to ${era.label}`}
            aria-label={`Jump to era ${era.label}`}
            aria-current={isCurrent ? 'true' : undefined}
          >
            {era.label}
          </button>
        );
      })}
    </div>
  );
}
