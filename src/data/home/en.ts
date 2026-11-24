import type { HomeContent } from '@/data/types';

/** 英文站 Home，取文案原文。 */
export const home: HomeContent = {
  hero: {
    brandMark: 'INP',
    positioningLine: 'An SGI Agent Platform.',
    lead: 'Intelligence is more than solving problems.',
    body: "We're exploring a different direction of intelligence — one that places emotion, understanding, and human connection at its heart.",
    tagline: 'With You in Mind.',
    ctas: [
      { labelKey: 'action.discover', path: '/product' },
      { labelKey: 'action.exploreTechnology', path: '/technology' },
    ],
  },
  introduction: {
    heading: 'Beyond Conversations.',
    paragraphs: [
      "A conversation doesn't have to begin and end with a question.",
      'INP explores a more continuous form of interaction — where memory, emotional states, perception, and autonomous behavior work together to create a richer experience.',
    ],
  },
  philosophy: {
    heading: 'A Different Direction of Intelligence.',
    paragraphs: [
      'Intelligence has traditionally been measured by what a system can solve.',
      'But understanding people involves more than logic. It involves context, emotion, memory, and social interaction.',
      'INP explores this other dimension of intelligence.',
    ],
  },
  zhFallbackFields: [],
};
