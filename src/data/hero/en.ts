import type { HeroContent } from '@/data/types';

/** 英文站 Hero（基准语言） */
export const hero: HeroContent = {
  wordmark: 'INP',
  titlePre: 'Intelligence with',
  titleEm: 'Personality.',
  subtitle: 'An SGI Agent Platform',
  descLines: ['Different Avatars. Different Personalities.', 'One Intelligent Platform.'],
  ctas: [
    { labelKey: 'action.getStarted', path: '#story' },
    {
      labelKey: 'action.download',
      disabled: true,
    },
    {
      labelKey: 'action.downloadAndroid',
      href: '/download/inp-ce-android-0.1.9.apk',
      hintKey: 'download.hintAndroid',
    },
  ],
  comingSoon: 'Coming Soon',
  avatars: [
    { key: 'deeyo', name: 'Deeyo', line: 'Calm, cool, and a good listener. Want to talk it through?' },
    { key: 'inp', name: 'INP', line: "Hey, I'm INP! What should we get up to today?" },
    { key: 'yomiku', name: 'Yomiku', line: "Nya~ I'll keep you company. How was your day?" },
    { key: 'laysa', name: 'Laysa', line: 'Goggles on! Ready for a little adventure together?' },
  ],
  zhFallbackFields: [],
};
