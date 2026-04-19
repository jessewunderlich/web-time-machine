'use client';

import { useState } from 'react';
import { track } from '@vercel/analytics';
import SoundEngine from './SoundEngine';

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    setEnabled((v) => {
      const next = !v;
      // Tracks whether anyone ever turns sound on. Answers "is the ambient
      // synth worth the effort or should we cut it?".
      track('sound_toggle', { enabled: next ? 'on' : 'off' });
      return next;
    });
  };

  return (
    <>
      <SoundEngine enabled={enabled} />
      {/* Toggle button: aria-pressed communicates on/off state to screen
       * readers (the icon alone is decorative — 🔊 vs 🔇 isn't spoken consistently).
       * aria-label changes with state so SRs get a clear action phrasing. */}
      <button
        type="button"
        aria-label={enabled ? 'Mute ambient sound' : 'Enable ambient sound'}
        aria-pressed={enabled}
        onClick={handleToggle}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 9001,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          cursor: 'pointer',
          transition: 'background 0.2s ease',
          lineHeight: 1,
        }}
      >
        {enabled ? '🔊' : '🔇'}
      </button>
    </>
  );
}
