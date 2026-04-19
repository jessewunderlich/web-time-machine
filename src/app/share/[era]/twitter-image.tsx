import { ImageResponse } from 'next/og';
import {
  ERA_CARDS,
  ERA_CARD_SIZE,
  EraCard,
  eraCardAlt,
  type EraId,
} from '../../_og/era-card';

// See opengraph-image.tsx for the runtime choice rationale.

export const contentType = 'image/png';
export const size = ERA_CARD_SIZE;

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ era: string }>;
}) {
  const { era } = await params;
  const isValid = Object.prototype.hasOwnProperty.call(ERA_CARDS, era);
  return [
    {
      id: 'twitter',
      alt: isValid
        ? eraCardAlt(era as EraId)
        : 'Web Time Machine — scroll through 35+ years of web design history.',
      size: ERA_CARD_SIZE,
      contentType: 'image/png',
    },
  ];
}

export default async function EraTwitterImage({
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
