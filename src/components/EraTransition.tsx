'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EraTransitionProps {
  fromYear: string;
  toYear: string;
  fromColor: string;
  toColor: string;
  label?: string;
}

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
  const [displayYear, setDisplayYear] = useState(fromYear);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    const fromBg = fromBgRef.current;
    const toBg = toBgRef.current;
    if (!container || !fromBg || !toBg) return;

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
        setDisplayYear(String(current));
        // Slight scale bump in the middle
        setScale(1 + Math.sin(self.progress * Math.PI) * 0.1);
      },
    });

    return () => {
      st.kill();
    };
  }, [fromYear, toYear]);

  return (
    <div
      ref={containerRef}
      style={{ height: '200vh', position: 'relative' }}
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

      {/* Centered content — sticky so it stays visible while pinned */}
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
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.3rem',
            opacity: 0.5,
            color: '#fff',
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
            color: '#fff',
            opacity: 0.9,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            textShadow: '0 4px 40px rgba(0,0,0,0.4)',
            transform: `scale(${scale})`,
            transition: 'transform 0.05s linear',
            willChange: 'transform',
          }}
        >
          {displayYear}
        </div>

        <div
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '2rem',
            marginTop: '1rem',
          }}
        >
          ↓
        </div>

        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
            letterSpacing: '0.2rem',
            fontFamily: 'monospace',
          }}
        >
          {toYear}
        </div>
      </div>
    </div>
  );
}
