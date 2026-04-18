'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface EraTransitionProps {
  fromYear: string;
  toYear: string;
  fromColor: string;
  toColor: string;
  label?: string;
}

// Era colors span from pure black (#000000) to cream (#f0ece4), which means
// neither pure white nor pure black text maintains ≥3:1 contrast across every
// transition's crossfade. A panel behind the text fixes this deterministically
// for any pair of era backgrounds.
//
// Math checked: rgba(0,0,0,0.6) panel behind white text gives ≥5.74:1 minimum
// contrast at every sampled scroll position across all six era transitions,
// passing WCAG AA (4.5:1) for normal text. See commit message for sweep data.
const PANEL_BG = 'rgba(0,0,0,0.6)';
const TEXT_COLOR_STRONG = '#ffffff';
const TEXT_COLOR_SOFT = 'rgba(255,255,255,0.9)';
const TEXT_SHADOW = '0 2px 20px rgba(0,0,0,0.6)';

export default function EraTransition({
  fromYear,
  toYear,
  fromColor,
  toColor,
  label,
}: EraTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fromBgRef = useRef<HTMLDivElement>(null);
  const toBgRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  // Year text and scale are updated from inside ScrollTrigger.onUpdate during
  // normal scroll. When reduced motion is on we skip the effect entirely and
  // derive the "destination" state in render so no setState is needed on mount.
  const [scrubYear, setScrubYear] = useState(fromYear);
  const [scrubScale, setScrubScale] = useState(1);
  const displayYear = reducedMotion ? toYear : scrubYear;
  const scale = reducedMotion ? 1 : scrubScale;

  useEffect(() => {
    const container = containerRef.current;
    const fromBg = fromBgRef.current;
    const toBg = toBgRef.current;
    if (!container || !fromBg || !toBg) return;

    // Reduced motion: no pinning, no scrub animation. Paint the destination
    // background directly; display values are derived in render.
    if (reducedMotion) {
      gsap.set(fromBg, { opacity: 0 });
      gsap.set(toBg, { opacity: 1 });
      return;
    }

    // Numeric year counter driven by scroll progress
    const from = parseInt(fromYear, 10);
    const to = parseInt(toYear, 10);

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Background crossfade
        gsap.set(fromBg, { opacity: 1 - self.progress });
        gsap.set(toBg, { opacity: self.progress });
        // Year counter: interpolate and update via React state
        const current = Math.round(from + (to - from) * self.progress);
        setScrubYear(String(current));
        // Slight scale bump in the middle
        setScrubScale(1 + Math.sin(self.progress * Math.PI) * 0.1);
      },
    });

    return () => {
      st.kill();
    };
  }, [fromYear, toYear, reducedMotion]);

  return (
    <div
      ref={containerRef}
      style={{
        // Collapse the 200vh pinned zone when motion is reduced —
        // the transition becomes a short static bumper instead.
        height: reducedMotion ? '50vh' : '200vh',
        position: 'relative',
      }}
    >
      {/* From background */}
      <div
        ref={fromBgRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: fromColor,
          height: '100vh',
          top: 0,
        }}
      />
      {/* To background */}
      <div
        ref={toBgRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: toColor,
          height: '100vh',
          top: 0,
          opacity: 0,
        }}
      />

      {/* Centered content — sticky so it stays visible while pinned. The
          inner panel guarantees ≥4.5:1 contrast against any era background
          mid-crossfade, so the label + year are always readable. */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            // Semi-opaque dark panel sits behind the text. Backdrop-filter
            // adds a subtle softening without hurting contrast.
            background: PANEL_BG,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: 'clamp(1.5rem, 4vw, 3rem) clamp(2rem, 6vw, 4rem)',
            borderRadius: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.3rem',
              color: TEXT_COLOR_SOFT,
              marginBottom: '1rem',
              fontFamily: 'monospace',
            }}
          >
            {label ?? 'The web is changing'}
          </div>

          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 'clamp(4rem, 15vw, 10rem)',
              fontWeight: 700,
              color: TEXT_COLOR_STRONG,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              textShadow: TEXT_SHADOW,
              transform: `scale(${scale})`,
              transition: 'transform 0.05s linear',
              willChange: 'transform',
            }}
          >
            {displayYear}
          </div>

          <div
            style={{
              color: TEXT_COLOR_SOFT,
              fontSize: '2rem',
              marginTop: '1rem',
            }}
            aria-hidden="true"
          >
            ↓
          </div>

          <div
            style={{
              marginTop: '0.5rem',
              fontSize: '0.7rem',
              color: TEXT_COLOR_SOFT,
              textTransform: 'uppercase',
              letterSpacing: '0.2rem',
              fontFamily: 'monospace',
            }}
          >
            {toYear}
          </div>
        </div>
      </div>
    </div>
  );
}
