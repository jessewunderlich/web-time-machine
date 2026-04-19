'use client';

import { useRef } from 'react';
import Era1991 from '@/components/eras/Era1991';
import Era1996 from '@/components/eras/Era1996';
import Era2000 from '@/components/eras/Era2000';
import Era2005 from '@/components/eras/Era2005';
import Era2010 from '@/components/eras/Era2010';
import Era2015 from '@/components/eras/Era2015';
import Era2021 from '@/components/eras/Era2021';
import Era2026 from '@/components/eras/Era2026';
import styles from './embed.module.css';

type EraId = '1991' | '1996' | '2000' | '2005' | '2010' | '2015' | '2021' | '2026';

const ERA_MAP: Record<EraId, React.ComponentType> = {
  '1991': Era1991,
  '1996': Era1996,
  '2000': Era2000,
  '2005': Era2005,
  '2010': Era2010,
  '2015': Era2015,
  '2021': Era2021,
  '2026': Era2026,
};

interface Props {
  era: EraId;
  siteUrl: string;
}

export default function EmbedEraClient({ era, siteUrl }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const EraComponent = ERA_MAP[era];

  return (
    <div ref={containerRef} className={styles.embedWrap}>
      <div className={styles.eraContainer}>
        <EraComponent />
      </div>
      <a
        href={`${siteUrl}/#era-${era}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.watermark}
      >
        Web Time Machine →
      </a>
    </div>
  );
}
