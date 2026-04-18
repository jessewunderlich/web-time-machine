'use client';

import { useState, useEffect } from 'react';

type Era = '1991' | '1996' | '2000' | '2005' | '2010' | '2015' | '2021';

interface BrowserChromeProps {
  era: Era;
  children: React.ReactNode;
}

const ERA_CONFIG: Record<Era, {
  name: string;
  url: string;
  topBg: string;
  topColor: string;
  borderColor: string;
  dots?: boolean;
  tabs?: boolean;
  arcStyle?: boolean;
}> = {
  '1991': {
    name: 'Lynx 2.1',
    url: 'http://info.cern.ch/hypertext/WWW/TheProject.html',
    topBg: '#c0c0c0',
    topColor: '#000',
    borderColor: '#808080',
  },
  '1996': {
    name: 'Netscape Navigator 3.0',
    url: 'http://www.geocities.com/TimesSquare/7777/',
    topBg: '#c0c0c0',
    topColor: '#000',
    borderColor: '#808080',
  },
  '2000': {
    name: 'Internet Explorer 6',
    url: 'http://www.newgrounds.com',
    topBg: '#ece9d8',
    topColor: '#000',
    borderColor: '#848284',
  },
  '2005': {
    name: 'Mozilla Firefox 1.5',
    url: 'http://www.myspace.com/profile',
    topBg: '#e6e3da',
    topColor: '#000',
    borderColor: '#a0a0a0',
    tabs: true,
  },
  '2010': {
    name: 'Google Chrome 8',
    url: 'https://itunes.apple.com',
    topBg: '#dadada',
    topColor: '#333',
    borderColor: '#b0b0b0',
    dots: false,
    tabs: true,
  },
  '2015': {
    name: 'Safari',
    url: 'https://example.com',
    topBg: '#f5f5f5',
    topColor: '#333',
    borderColor: '#d8d8d8',
    dots: true,
  },
  '2021': {
    name: 'Arc',
    url: 'https://app.ai-beyond.dev',
    topBg: '#1a1a2e',
    topColor: '#ccc',
    borderColor: '#333',
    arcStyle: true,
    dots: true,
  },
};

// ── Shared Win9x/IE title-bar button style ───────────────────────────────────
const winBtnStyle: React.CSSProperties = {
  background: '#c0c0c0',
  border: '1px outset #fff',
  width: '16px',
  height: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '9px',
  color: '#000',
  cursor: 'pointer',
  userSelect: 'none',
};

// ── IE6 BSOD overlay ─────────────────────────────────────────────────────────
function Bsod({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const handler = () => onDismiss();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onDismiss]);

  return (
    <div
      onClick={onDismiss}
      style={{
        position: 'absolute',
        inset: 0,
        background: '#0000AA',
        color: '#fff',
        fontFamily: 'Courier New, monospace',
        padding: '2rem',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
    >
      <div>
        <p style={{ fontSize: '1rem', lineHeight: 1.6, maxWidth: '600px' }}>
          A problem has been detected and Windows has been shut down to prevent damage
          to your computer.
        </p>
        <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1.5rem' }}>
          INTERNET_EXPLORER_6_FAULT
        </p>
        <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
          Stop: 0x0000001E (0x00000000, 0x00000000)
        </p>
      </div>
      <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>
        Press any key to restart...
      </p>
    </div>
  );
}

export default function BrowserChrome({ era, children }: BrowserChromeProps) {
  const cfg = ERA_CONFIG[era];
  const [crashed, setCrashed] = useState(false);
  const [minimized, setMinimized] = useState(false);

  if (era === '1991') {
    return (
      <div
        style={{
          border: `2px solid ${cfg.borderColor}`,
          fontFamily: 'Courier New, monospace',
          background: '#000',
        }}
      >
        <div
          style={{
            background: cfg.topBg,
            borderBottom: `2px solid ${cfg.borderColor}`,
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '12px',
          }}
        >
          <span style={{ fontWeight: 'bold', color: cfg.topColor }}>{cfg.name}</span>
          <span style={{ color: '#666', fontSize: '11px', marginLeft: 'auto' }}>
            {cfg.url}
          </span>
        </div>
        {children}
      </div>
    );
  }

  if (era === '1996') {
    return (
      <div
        style={{
          border: `3px outset ${cfg.borderColor}`,
          background: '#000',
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: 'linear-gradient(90deg, #000080, #1084d0)',
            padding: '3px 6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#fff',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <span>{cfg.name} — [{cfg.url}]</span>
          <div style={{ display: 'flex', gap: '2px' }}>
            {['_', '□', '✕'].map((btn) => (
              <div key={btn} style={winBtnStyle}>{btn}</div>
            ))}
          </div>
        </div>
        {/* Toolbar */}
        <div
          style={{
            background: cfg.topBg,
            borderBottom: `2px solid ${cfg.borderColor}`,
            padding: '3px 6px',
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            fontSize: '11px',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          {['◀', '▶', '✕', '⟳', '🏠'].map((btn) => (
            <div
              key={btn}
              style={{
                background: '#c0c0c0',
                border: '1px outset #fff',
                padding: '2px 5px',
                cursor: 'pointer',
                fontSize: '10px',
              }}
            >
              {btn}
            </div>
          ))}
          <div
            style={{
              flex: 1,
              background: '#fff',
              border: '1px inset #808080',
              padding: '1px 4px',
              fontSize: '11px',
              color: '#000',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {cfg.url}
          </div>
          <div
            style={{
              background: '#c0c0c0',
              border: '1px outset #fff',
              padding: '2px 8px',
              cursor: 'pointer',
              fontSize: '10px',
            }}
          >
            Go
          </div>
        </div>
        {children}
      </div>
    );
  }

  if (era === '2000') {
    return (
      <div
        style={{
          border: `3px outset ${cfg.borderColor}`,
          background: '#000',
          position: 'relative',
        }}
      >
        {crashed && <Bsod onDismiss={() => setCrashed(false)} />}

        {/* Title bar */}
        <div
          style={{
            background: 'linear-gradient(90deg, #000080, #1084d0)',
            padding: '3px 6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#fff',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <span>{cfg.name} — [{cfg.url}]</span>
          <div style={{ display: 'flex', gap: '2px' }}>
            <div
              role="button"
              tabIndex={0}
              style={winBtnStyle}
              onClick={() => setMinimized(true)}
              onKeyDown={(e) => e.key === 'Enter' && setMinimized(true)}
              title="Minimize"
              aria-label="Minimize window"
            >
              _
            </div>
            <div
              role="button"
              tabIndex={0}
              style={winBtnStyle}
              onClick={() => setMinimized(false)}
              onKeyDown={(e) => e.key === 'Enter' && setMinimized(false)}
              title="Restore"
              aria-label="Restore window"
            >
              □
            </div>
            <div
              role="button"
              tabIndex={0}
              style={{ ...winBtnStyle, background: '#c0c0c0' }}
              onClick={() => setCrashed(true)}
              onKeyDown={(e) => e.key === 'Enter' && setCrashed(true)}
              title="Close"
            >
              ✕
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div
          style={{
            background: cfg.topBg,
            borderBottom: `2px solid ${cfg.borderColor}`,
            padding: '3px 6px',
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            fontSize: '11px',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          {['◀', '▶', '✕', '⟳', '🏠'].map((btn) => (
            <div
              key={btn}
              style={{
                background: '#c0c0c0',
                border: '1px outset #fff',
                padding: '2px 5px',
                cursor: 'pointer',
                fontSize: '10px',
              }}
            >
              {btn}
            </div>
          ))}
          <div
            style={{
              flex: 1,
              background: '#fff',
              border: '1px inset #808080',
              padding: '1px 4px',
              fontSize: '11px',
              color: '#000',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {cfg.url}
          </div>
          <div
            style={{
              background: '#c0c0c0',
              border: '1px outset #fff',
              padding: '2px 8px',
              cursor: 'pointer',
              fontSize: '10px',
            }}
          >
            Go
          </div>
        </div>

        {/* Content — with minimized overlay */}
        <div style={{ position: 'relative', opacity: minimized ? 0.3 : 1 }}>
          {minimized && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '0.85rem',
                fontFamily: 'Arial, sans-serif',
                background: 'rgba(0,0,0,0.4)',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            >
              — minimized —
            </div>
          )}
          {children}
        </div>
      </div>
    );
  }

  if (era === '2005') {
    return (
      <div
        style={{
          border: `1px solid ${cfg.borderColor}`,
          borderRadius: '8px 8px 0 0',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        }}
      >
        <div
          style={{
            background: cfg.topBg,
            padding: '6px 8px 0',
            display: 'flex',
            gap: '4px',
            alignItems: 'flex-end',
            fontFamily: 'Arial, sans-serif',
            fontSize: '11px',
          }}
        >
          {['MySpace ♥ music', 'Google', 'Del.icio.us'].map((tab, i) => (
            <div
              key={tab}
              style={{
                background: i === 0 ? '#fff' : '#d0cdc4',
                border: `1px solid ${cfg.borderColor}`,
                borderBottom: i === 0 ? '1px solid #fff' : 'none',
                borderRadius: '4px 4px 0 0',
                padding: '3px 10px',
                cursor: 'pointer',
                color: i === 0 ? '#000' : '#555',
                fontSize: '11px',
                whiteSpace: 'nowrap',
              }}
            >
              {tab}
            </div>
          ))}
        </div>
        <div
          style={{
            background: '#e6e3da',
            padding: '4px 8px',
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            borderTop: `1px solid ${cfg.borderColor}`,
            fontSize: '11px',
          }}
        >
          {['◀', '▶', '⟳'].map((btn) => (
            <button
              key={btn}
              style={{
                background: 'linear-gradient(180deg, #f5f5f5, #ddd)',
                border: `1px solid ${cfg.borderColor}`,
                borderRadius: '3px',
                padding: '2px 6px',
                cursor: 'pointer',
                fontSize: '10px',
              }}
            >
              {btn}
            </button>
          ))}
          <div
            style={{
              flex: 1,
              background: '#fff',
              border: `1px solid ${cfg.borderColor}`,
              borderRadius: '3px',
              padding: '2px 6px',
              fontSize: '11px',
            }}
          >
            🔒 {cfg.url}
          </div>
        </div>
        {children}
      </div>
    );
  }

  if (era === '2010') {
    return (
      <div
        style={{
          border: `1px solid ${cfg.borderColor}`,
          borderRadius: '8px 8px 0 0',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            background: cfg.topBg,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 10px',
            fontFamily: 'Arial, sans-serif',
            fontSize: '12px',
          }}
        >
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {['◀', '▶'].map((btn) => (
              <button
                key={btn}
                style={{
                  background: '#c8c8c8',
                  border: 'none',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  cursor: 'pointer',
                  fontSize: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {btn}
              </button>
            ))}
          </div>
          <div
            style={{
              flex: 1,
              background: '#fff',
              border: `1px solid ${cfg.borderColor}`,
              borderRadius: '12px',
              padding: '3px 10px',
              fontSize: '11px',
              textAlign: 'center',
              color: '#333',
            }}
          >
            {cfg.url}
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {'☆⋮'.split('').map((icon) => (
              <span key={icon} style={{ fontSize: '14px', color: '#888', cursor: 'pointer' }}>
                {icon}
              </span>
            ))}
          </div>
        </div>
        {children}
      </div>
    );
  }

  if (era === '2015') {
    return (
      <div
        style={{
          border: `1px solid ${cfg.borderColor}`,
          borderRadius: '12px 12px 0 0',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        }}
      >
        <div
          style={{
            background: cfg.topBg,
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: '-apple-system, sans-serif',
            fontSize: '12px',
          }}
        >
          <div style={{ display: 'flex', gap: '6px' }}>
            {['#ff5f57', '#ffbd2e', '#28c840'].map((color) => (
              <div
                key={color}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: color,
                }}
              />
            ))}
          </div>
          <div
            style={{
              flex: 1,
              background: '#e8e8e8',
              borderRadius: '6px',
              padding: '3px 10px',
              textAlign: 'center',
              fontSize: '11px',
              color: '#666',
            }}
          >
            🔒 {cfg.url}
          </div>
        </div>
        {children}
      </div>
    );
  }

  // 2021 — Arc-style
  return (
    <div
      style={{
        border: `1px solid ${cfg.borderColor}`,
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#0d0d1a',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}
    >
      <div
        style={{
          background: cfg.topBg,
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          fontFamily: '-apple-system, sans-serif',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          {['#ff5f57', '#ffbd2e', '#28c840'].map((color) => (
            <div
              key={color}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: color,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '8px',
            padding: '4px 10px',
            textAlign: 'center',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          {cfg.url}
        </div>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>⋯</span>
      </div>
      {children}
    </div>
  );
}
