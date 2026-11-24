import type { HeroContent } from '@/data/types';

/** 英文站 Hero（基准语言） */
export const hero: HeroContent = {
  wordmark: 'INP',
  titlePre: 'Intelligence with',
  titleEm: 'Personality.',
  subtitle: 'An SGI Agent Platform',
  descLines: ['Different Avatars. Different Personalities.', 'One Intelligent Platform.'],
  ctas: [
    { labelKey: 'action.getStarted', path: '#features' },
    { labelKey: 'action.exploreInp', path: '#stage' },
  ],
  features: [
    { name: 'Avatar', desc: 'Many characters, switch freely' },
    { name: 'Companion', desc: 'Everyday company, emotional connection' },
    { name: 'Play', desc: 'Light games, playful interaction' },
    { name: 'Assistant', desc: 'Study and work, an efficient helper' },
    { name: 'Personalize', desc: 'Custom personality, a personal experience' },
  ],
  avatars: [
    { key: 'deeyo', name: 'Deeyo', line: 'Calm, cool, and a good listener. Want to talk it through?' },
    { key: 'inp', name: 'INP', line: "Hey, I'm INP! What should we get up to today?" },
    { key: 'yomiku', name: 'Yomiku', line: "Nya~ I'll keep you company. How was your day?" },
    { key: 'laysa', name: 'Laysa', line: 'Goggles on! Ready for a little adventure together?' },
  ],
  zhFallbackFields: [],
};
