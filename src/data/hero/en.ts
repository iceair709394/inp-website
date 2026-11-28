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
      href: '/download/inp-ce-android-0.2.0.apk',
      hintKey: 'download.hintAndroid',
    },
  ],
  comingSoon: 'Coming Soon',
  avatars: [
    { key: 'deeyo', name: 'Deeyo', line: "Calm and precise. Tell me what's on your agenda." },
    { key: 'inp', name: 'INP', line: "Hey, I'm INP. What's on your schedule today?" },
    { key: 'yomiku', name: 'Yomiku', line: "Give me your tasks — I'll sort them out in order." },
    { key: 'laysa', name: 'Laysa', line: 'Plans, reminders, quick lookups — let us knock them out.' },
  ],
  zhFallbackFields: [],
};
