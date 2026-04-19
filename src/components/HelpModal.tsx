'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Keyboard shortcut help modal. Opens on '?' keypress (or by the small
 * persistent hint chip in the corner). Press Esc or click outside to close.
 *
 * A11y contract:
 *   - role="dialog" + aria-modal="true" + aria-labelledby on the heading
 *   - focus moves into the close button on open; restores on close
 *   - Esc closes; click-on-backdrop closes; focusable content is tab-trapped
 *   - Content is static (no ARIA live regions needed)
 *   - Respects prefers-reduced-motion (no scale animation when reduced)
 */

const SHORTCUTS: { keys: string; desc: string }[] = [
  { keys: '\u2190 \u2191', desc: 'Previous era (smooth scroll)' },
  { keys: '\u2192 \u2193', desc: 'Next era (smooth scroll)' },
  { keys: '1 \u2013 8', desc: 'Jump to specific era (crossfade)' },
  { keys: '?', desc: 'Show this help' },
  { keys: 'Esc', desc: 'Close any overlay' },
];

export default function HelpModal() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Global hotkey: '?' opens, 'Esc' closes. Inputs are respected.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      const inField =
        tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
      if (e.key === '?' && !inField) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === 'Escape' && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Focus management: move focus in on open, restore on close.
  useEffect(() => {
    if (open) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement;
      // Defer one frame so the button is actually mounted + focusable.
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else if (previouslyFocusedRef.current) {
      previouslyFocusedRef.current.focus();
      previouslyFocusedRef.current = null;
    }
  }, [open]);

  // Tab trap: keep focus inside the dialog while open.
  useEffect(() => {
    if (!open) return;
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onTab);
    return () => window.removeEventListener('keydown', onTab);
  }, [open]);

  return (
    <>
      {/* Persistent hint chip \u2014 replaces the auto-hiding banner in
       * KeyboardNav. Click or keyboard-activate opens the modal.
       * aria-hidden is FALSE here because this chip IS interactive
       * (unlike the former banner which was a decorative auto-hide).
       */}
      <button
        type="button"
        className="help-hint"
        onClick={() => setOpen(true)}
        aria-label="Show keyboard shortcuts"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '1.5rem',
          zIndex: 9000,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '999px',
          padding: '0.4rem 0.85rem',
          fontSize: '0.7rem',
          fontFamily: 'monospace',
          letterSpacing: '0.04em',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        press <kbd style={kbdInlineStyle}>?</kbd> for shortcuts
      </button>

      {/* Modal overlay + dialog. Only rendered when open so there's no
       * dormant interactive element outside the flow. */}
      {open && (
        <div
          // Backdrop. Click-outside closes; clicks inside the panel
          // stopPropagation via the panel's onClick so it doesn't bubble.
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-modal-title"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#111',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '0.75rem',
              padding: '1.5rem 2rem',
              maxWidth: '28rem',
              width: '100%',
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <h2
                id="help-modal-title"
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  margin: 0,
                }}
              >
                Keyboard shortcuts
              </h2>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close keyboard shortcuts"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  borderRadius: '0.375rem',
                  width: '1.75rem',
                  height: '1.75rem',
                  fontSize: '1rem',
                  lineHeight: 1,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                }}
              >
                \u00d7
              </button>
            </div>

            <dl
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '0.6rem 1.25rem',
                alignItems: 'center',
                margin: 0,
                fontSize: '0.9rem',
              }}
            >
              {SHORTCUTS.map((s) => (
                <div
                  key={s.keys}
                  style={{ display: 'contents' }}
                >
                  <dt style={{ margin: 0 }}>
                    <kbd style={kbdDefStyle}>{s.keys}</kbd>
                  </dt>
                  <dd style={{ margin: 0, color: '#ccc' }}>{s.desc}</dd>
                </div>
              ))}
            </dl>

            <p
              style={{
                marginTop: '1.25rem',
                marginBottom: 0,
                fontSize: '0.75rem',
                color: '#888',
                lineHeight: 1.5,
              }}
            >
              Shortcuts ignore input/textarea focus. Clicking nav dots,
              year labels, or era labels also jumps between eras.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

const kbdInlineStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.12)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '4px',
  padding: '0.05em 0.4em',
  fontFamily: 'monospace',
  fontSize: '0.9em',
  marginLeft: '0.35em',
};

const kbdDefStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: '4px',
  padding: '0.2em 0.5em',
  fontFamily: 'monospace',
  fontSize: '0.85rem',
  minWidth: '3.5em',
  display: 'inline-block',
  textAlign: 'center',
  whiteSpace: 'nowrap',
};
