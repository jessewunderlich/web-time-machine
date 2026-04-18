'use client';

import { useRef, useEffect } from 'react';
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
  const yearRef = useRef<HTMLDivElement>(null);
  const fromBgRef = useRef<HTMLDivElement>(null);
  const toBgRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const yearEl = yearRef.current;
    const fromBg = fromBgRef.current;
    const toBg = toBgRef.current;
    if (!container || !yearEl || !fromBg || !toBg) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.fromTo(fromBg, { opacity: 1 }, { opacity: 0, duration: 0.5 })
      .fromTo(toBg, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '<')
      .fromTo(
        yearEl,
        { innerHTML: fromYear, scale: 1 },
        {
          innerHTML: toYear,
          scale: 1.1,
          duration: 0.4,
          snap: { innerHTML: 1 },
        },
        0.2
      );

    return () => {
      tl.scrollTrigger?.kill();
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

      {/* Centered content */}
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
          ref={yearRef}
          style={{
            fontFamily: 'monospace',
            fontSize: 'clamp(4rem, 15vw, 10rem)',
            fontWeight: 700,
            color: '#fff',
            opacity: 0.9,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            textShadow: '0 4px 40px rgba(0,0,0,0.4)',
            transition: 'color 0.5s',
          }}
        >
          {fromYear}
        </div>

        <div
          ref={arrowRef}
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
