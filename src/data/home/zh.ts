import type { HomeContent } from '@/data/types';

/** 中文站 Home。缺失处回退英文原文，逐项记在 zhFallbackFields。 */
export const home: HomeContent = {
  brief: {
    heading: '桌面助理，不是聊天机器人。',
    paragraphs: [
      'INP 是一个 Windows 应用。桌面上坐着一位 3D 角色，你可以用语音或文字跟它说话，它帮你把日程、提醒、任务和快捷查询管起来。',
      '语音在本机合成，对话不存我们的服务器。模型由你自备：云端 key，或跑在自己显卡上的本地模型。',
    ],
  },
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
