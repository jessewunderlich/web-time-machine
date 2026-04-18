'use client';

import { useState } from 'react';
import SoundEngine from './SoundEngine';

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <SoundEngine enabled={enabled} />
      <button
        aria-label={enabled ? 'Mute sound' : 'Enable sound'}
        onClick={() => setEnabled((v) => !v)}
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
