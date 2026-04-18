'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/era-nav.module.css';

const ERAS = [
  { id: 'era-1991', label: '1991–1995', year: '1991', eraStyle: 'terminal' as const },
  { id: 'era-1996', label: '1996–1999', year: '1996', eraStyle: 'neon'     as const },
  { id: 'era-2000', label: '2000–2004', year: '2000', eraStyle: 'glossy'   as const },
  { id: 'era-2005', label: '2005–2009', year: '2005', eraStyle: 'gradient' as const },
  { id: 'era-2010', label: '2010–2014', year: '2010', eraStyle: 'flat'     as const },
  { id: 'era-2015', label: '2015–2020', year: '2015', eraStyle: 'ring'     as const },
  { id: 'era-2021', label: '2021–Now',  year: '2021', eraStyle: 'glass'    as const },
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
};

export default function EraNav() {
  const [currentEraId, setCurrentEraId] = useState('');
  const [hovered, setHovered] = useState<string | null>(null);

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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
