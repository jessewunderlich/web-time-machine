/**
 * JSON-LD structured data for the Web Time Machine.
 *
 * Marks the overall site as a WebPage + ItemList, and each era as a
 * CreativeWork with temporalCoverage. This gives search engines a
 * machine-readable timeline structure. Google may render timeline-style
 * rich results for queries like "history of web design."
 */

const ERAS = [
  {
    year: '1991',
    endYear: '1995',
    name: 'The Dawn of the Web',
    description:
      'Tim Berners-Lee publishes the first website at CERN. Lynx, Mosaic, and early hypertext systems define a text-first era.',
  },
  {
    year: '1996',
    endYear: '1999',
    name: 'GeoCities & the Personal Web',
    description:
      'Animated GIFs, hit counters, guestbooks, webrings, and Netscape Navigator. The web becomes personal and chaotic.',
  },
  {
    year: '2000',
    endYear: '2004',
    name: 'The Flash Era',
    description:
      'Macromedia Flash dominates. Splash pages, skip-intro buttons, and the dot-com bust reshape the landscape.',
  },
  {
    year: '2005',
    endYear: '2009',
    name: 'Web 2.0',
    description:
      'AJAX, rounded corners, glossy buttons, MySpace, Facebook, YouTube, and the rise of user-generated content.',
  },
  {
    year: '2010',
    endYear: '2014',
    name: 'Flat & Responsive Design',
    description:
      'iOS 7 kills skeuomorphism. Bootstrap makes responsive layouts accessible. Mobile overtakes desktop.',
  },
  {
    year: '2015',
    endYear: '2020',
    name: 'Material Design & Design Systems',
    description:
      'Google Material, design tokens, component libraries, SPAs, React, Vue, and the cookie-consent banner epidemic.',
  },
  {
    year: '2021',
    endYear: '2025',
    name: 'The AI Era',
    description:
      'ChatGPT, glassmorphism, bento grids, dark mode defaults, and AI-native interfaces redefine web interactions.',
  },
  {
    year: '2026',
    endYear: '2026',
    name: 'The Agentic Era',
    description:
      'Tool loops, MCP, Claude Code, and autonomous agents. The browser stops being the destination.',
  },
] as const;

const siteUrl = 'https://web-time-machine-coral.vercel.app';

function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Web Time Machine — A Visual History of the Web',
    description:
      'Scroll through 35+ years of web design history. Each era is styled authentically in the visual language of its time.',
    url: siteUrl,
    mainEntity: {
      '@type': 'ItemList',
      name: 'Eras of Web Design',
      numberOfItems: ERAS.length,
      itemListElement: ERAS.map((era, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: `${era.year}: ${era.name}`,
          description: era.description,
          temporalCoverage: `${era.year}/${era.endYear}`,
          url: `${siteUrl}/#era-${era.year}`,
        },
      })),
    },
  };
}

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
    />
  );
}
