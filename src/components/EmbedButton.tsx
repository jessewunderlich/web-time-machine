'use client';

import { useState, useRef, useEffect } from 'react';
import styles from '../styles/embed-button.module.css';

const SITE_URL = 'https://web-time-machine-coral.vercel.app';

interface Props {
  era: string;
}

/**
 * "Embed this era" button — appears in the bottom-left of each era section.
 * Clicking reveals a copyable iframe snippet in a small popover.
 */
export default function EmbedButton({ era }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);

  const snippet = `<iframe src="${SITE_URL}/embed/era/${era}" width="600" height="900" style="border:0;border-radius:8px" title="Web Time Machine: Era ${era}" allow="clipboard-write" loading="lazy"></iframe>`;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for non-secure contexts
      const ta = document.createElement('textarea');
      ta.value = snippet;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styles.wrap} ref={popRef}>
      <button
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        aria-label={`Embed era ${era}`}
        title="Embed this era"
      >
        &lt;/&gt;
      </button>
      {open && (
        <div className={styles.popover} role="dialog" aria-label="Embed snippet">
          <div className={styles.popLabel}>Embed this era</div>
          <pre className={styles.snippet}>{snippet}</pre>
          <button className={styles.copyBtn} onClick={handleCopy}>
            {copied ? '✓ Copied' : 'Copy snippet'}
          </button>
        </div>
      )}
    </div>
  );
}
