import type { HeroContent } from '@/data/types';

/** 中文站 Hero。五张卡片名沿用品牌名词，描述用中文。 */
export const hero: HeroContent = {
  wordmark: 'INP',
  titlePre: '有性格的',
  titleEm: '智能。',
  subtitle: '一个 SGI Agent 平台',
  descLines: ['不同的角色，不同的性格。', '同一个智能平台。'],
  ctas: [
    { labelKey: 'action.getStarted', path: '#features' },
    { labelKey: 'action.exploreInp', path: '#stage' },
  ],
  features: [
    { name: 'Avatar', desc: '多元角色 · 自由切换' },
    { name: 'Companion', desc: '日常陪伴 · 情感连接' },
    { name: 'Play', desc: '轻量游戏 · 互动娱乐' },
    { name: 'Assistant', desc: '学习工作 · 高效助手' },
    { name: 'Personalize', desc: '性格定制 · 专属体验' },
  ],
  zhFallbackFields: [],
};
