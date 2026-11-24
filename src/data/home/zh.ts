import type { HomeContent } from '@/data/types';

/** 中文站 Home。缺失处回退英文原文，逐项记在 zhFallbackFields。 */
export const home: HomeContent = {
  introduction: {
    heading: '不止于对话。',
    paragraphs: [
      '一次交流，不必总是从一个问题开始，也不必随着回答结束。',
      'INP 希望探索更持续的交互方式，让记忆、情绪状态、感知与自主行为共同构成更丰富的体验。',
    ],
  },
  philosophy: {
    heading: '智能的另一种方向。',
    paragraphs: [
      '我们习惯用解决问题的能力衡量智能。',
      '但理解一个人，不仅需要逻辑，还涉及语境、情绪、记忆与社会交互。',
      'INP 正在探索智能的另一面。',
    ],
  },
  zhFallbackFields: [],
};
