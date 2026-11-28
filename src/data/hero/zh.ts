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
      disabled: true,
    },
    {
      labelKey: 'action.downloadAndroid',
      disabled: true,
    },
  ],
  comingSoon: 'Coming Soon',
  avatars: [
    { key: 'deeyo', name: 'Deeyo', line: '冷静、准确。今天先处理哪件事？' },
    { key: 'inp', name: 'INP', line: '我是 INP，今天要安排什么？' },
    { key: 'yomiku', name: 'Yomiku', line: '把待办告诉我，我替你理清顺序。' },
    { key: 'laysa', name: 'Laysa', line: '计划、提醒、查资料，一件件办掉。' },
  ],
  zhFallbackFields: [],
};
