import { ImageResponse } from 'next/og';
import { ShareCard, SHARE_CARD_ALT, SHARE_CARD_SIZE } from './_og/shared';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = SHARE_CARD_ALT;
export const size = SHARE_CARD_SIZE;
export const contentType = 'image/png';

// Image generation — static, no params
export default function OpengraphImage() {
  return new ImageResponse(<ShareCard />, { ...size });
}
