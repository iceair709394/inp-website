import type { TechnologyContent } from '@/data/types';

/** 中文站 Technology。必需保留研究方向免责声明。 */
export const technology: TechnologyContent = {
  heading: '探索 Sentient General Intelligence。',
  paragraphs: [
    'SGI 是 INP 正在探索的智能概念。',
    '它关注通用认知能力之外的另一组能力：情绪相关表征、持续的内部状态，以及这些因素如何影响智能行为与社会交互。',
    '我们关注的不只是推理、计算和完成任务的能力，也包括智能如何理解语境、处理情绪相关信息，并与人自然地互动。',
  ],
  disclaimer: 'SGI 是一种研究方向，并不意味着已经证明机器拥有意识或主观体验。',
  // 英文首段「SGI stands for Sentient General Intelligence.」在中文参考里没有独立对应句，
  // 中文标题已含该全称，这里不代写定义句，仅记录结构差异。
  zhFallbackFields: [],
};
