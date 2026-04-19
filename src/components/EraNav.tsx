'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { navigateWithTransition, willUseViewTransition } from '../lib/view-transition';
import styles from '../styles/era-nav.module.css';

const ERAS = [
  { id: 'era-1991', label: '1991–1995', year: '1991', eraStyle: 'terminal' as const },
  { id: 'era-1996', label: '1996–1999', year: '1996', eraStyle: 'neon'     as const },
  { id: 'era-2000', label: '2000–2004', year: '2000', eraStyle: 'glossy'   as const },
  { id: 'era-2005', label: '2005–2009', year: '2005', eraStyle: 'gradient' as const },
  { id: 'era-2010', label: '2010–2014', year: '2010', eraStyle: 'flat'     as const },
  { id: 'era-2015', label: '2015–2020', year: '2015', eraStyle: 'ring'     as const },
  { id: 'era-2021', label: '2021–2025', year: '2021', eraStyle: 'glass'    as const },
  { id: 'era-2026', label: '2026–Now',  year: '2026', eraStyle: 'agentic' as const },
] as const;

type EraStyleKey = (typeof ERAS)[number]['eraStyle'];

// Maps eraStyle → CSS module class for the dot's visual treatment.
// All dots adopt the style of the *current* era section (not their own).
const DOT_STYLE_CLASS: Record<EraStyleKey, string> = {
  terminal: styles.dotTerminal,
  neon:     styles.dotNeon,
  glossy:   styles.dotGlossy,
  gradient: styles.dotGradient,
  flat:     styles.dotFlat,
  ring:     styles.dotRing,
  glass:    styles.dotGlass,
  // Era 2026 terminal/agent aesthetic — reuse the glass style for now.
  // Could get a dedicated .dotAgentic treatment later.
  agentic:  styles.dotGlass,
};

export default function EraNav() {
  const [currentEraId, setCurrentEraId] = useState('');
  const [hovered, setHovered] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ERAS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setCurrentEraId(id);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const currentEraStyle: EraStyleKey =
    ERAS.find((e) => e.id === currentEraId)?.eraStyle ?? 'terminal';

  const scrollToEra = (id: string) => {
    // View Transition crossfade on programmatic era jumps (see ProgressBar
    // for rationale). Scroll behavior depends on whether VT is active:
    // 'instant' inside VT so the scroll completes synchronously and the
    // crossfade plays cleanly; 'smooth' otherwise.
    const useVT = willUseViewTransition();
    let behavior: ScrollBehavior;
    if (reducedMotion) behavior = 'auto';
    else if (useVT) behavior = 'instant' as ScrollBehavior;
    else behavior = 'smooth';

    navigateWithTransition(() => {
      document.getElementById(id)?.scrollIntoView({ behavior });
    });
    // Update active dot immediately (optimistic) so it matches the URL update
    // below. IntersectionObserver will confirm the same value once the scroll
    // animation lands — no flash or conflict.
    setCurrentEraId(id);
    // Keep the URL hash in sync so users can share /#era-2005 and land
    // directly on that era. replaceState (not pushState) avoids cluttering
    // the back button with every dot click.
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <nav className={styles.nav} aria-label="Era navigation">
      {ERAS.map((era) => {
        const isCurrent = era.id === currentEraId;
        return (
          <div
            key={era.id}
            className={styles.dotWrapper}
            onMouseEnter={() => setHovered(era.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <button
              className={[
                styles.dot,
                DOT_STYLE_CLASS[currentEraStyle],
                isCurrent ? styles.dotActive : '',
              ].join(' ')}
              onClick={() => scrollToEra(era.id)}
              aria-label={`Navigate to ${era.label}`}
              aria-current={isCurrent ? 'true' : undefined}
            />
            {hovered === era.id && (
              <div className={styles.tooltip}>
                <span className={styles.tooltipYear}>{era.year}</span>
                <span className={styles.tooltipRange}>{era.label}</span>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
