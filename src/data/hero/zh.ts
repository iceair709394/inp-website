import type { HeroContent } from '@/data/types';

/** 中文站 Hero。五张卡片名沿用品牌名词，描述用中文。 */
export const hero: HeroContent = {
  wordmark: 'INP',
  titlePre: '有性格的',
  titleEm: '智能。',
  subtitle: '一个 SGI Agent 平台',
  descLines: ['不同的角色，不同的性格。', '同一个智能平台。'],
  ctas: [
    { labelKey: 'action.getStarted', path: '#story' },
    {
      labelKey: 'action.download',
      href: 'https://github.com/iceair709394/inp-ce-releases/releases/download/v0.1.0/INP_CE_Win_v0.1.zip',
      hintKey: 'download.hintWindows',
    },
    {
      labelKey: 'action.downloadAndroid',
      href: '/download/inp-ce-android-0.1.5.apk',
      hintKey: 'download.hintAndroid',
    },
  ],
  comingSoon: 'Coming Soon',
  avatars: [
    { key: 'deeyo', name: 'Deeyo', line: '冷静，话不多，但很会听。想聊聊吗？' },
    { key: 'inp', name: 'INP', line: '嗨，我是 INP！今天想一起干点什么？' },
    { key: 'yomiku', name: 'Yomiku', line: '喵~ 我来陪你。今天过得怎么样？' },
    { key: 'laysa', name: 'Laysa', line: '护目镜戴好！一起去冒个小险？' },
  ],
  zhFallbackFields: [],
};
