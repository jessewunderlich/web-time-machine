import { ImageResponse } from 'next/og';
import {
  ERA_CARDS,
  ERA_CARD_SIZE,
  EraCard,
  eraCardAlt,
  type EraId,
} from '../../_og/era-card';

// Node runtime (default) — edge runtime is incompatible with
// generateStaticParams on the parent route (share/[era]/page.tsx), which
// forces static pre-rendering of every era card at build time. Node
// runtime supports both paths; next/og's ImageResponse works outside edge.
//
// Cards are static: the content is derived entirely from a build-time
// constant (ERA_CARDS), so they're pre-rendered once per era at build.

export const contentType = 'image/png';
export const size = ERA_CARD_SIZE;

// Dynamic alt text per era. Next 16 calls this with the same params the
// image renderer receives and merges the returned metadata entries.
export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ era: string }>;
}) {
  const { era } = await params;
  const isValid = Object.prototype.hasOwnProperty.call(ERA_CARDS, era);
  return [
    {
      id: 'og',
      alt: isValid
        ? eraCardAlt(era as EraId)
        : 'Web Time Machine — scroll through 30+ years of web design history.',
      size: ERA_CARD_SIZE,
      contentType: 'image/png',
    },
  ];
}

export default async function EraOgImage({
  params,
}: {
  params: Promise<{ era: string }>;
}) {
  const { era } = await params;
  const eraId: EraId = Object.prototype.hasOwnProperty.call(ERA_CARDS, era)
    ? (era as EraId)
    : '1991';

  return new ImageResponse(<EraCard eraId={eraId} />, { ...ERA_CARD_SIZE });
}
