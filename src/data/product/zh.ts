import type { ProductContent } from '@/data/types';

/**
 * 中文站 Product。
 */
export const product: ProductContent = {
  heading: '为 SGI Agent 提供基础能力。',
  intro:
    'INP 提供一套基础架构，用于构建具备持续记忆、由心弦承担情感建模、环境感知与自主行为能力的智能主体。',
  systemsLabel: '核心系统包括：',
  systems: [
    {
      id: 'agent-memory',
      shortLabel: 'Agent Memory',
      fullName: null,
      description: '长期信息与经历管理。',
    },
    {
      id: 'heartstrings',
      shortLabel: 'INP 心弦',
      fullName: null,
      description: '心弦负责情感状态的持续管理与演化。',
    },
    {
      id: 'autonomous-drive',
      shortLabel: '自主驱动',
      fullName: null,
      description: '事件追踪、信号识别与主动跟进。',
    },
    {
      id: 'avatar-interaction',
      shortLabel: 'Avatar & Interaction',
      fullName: null,
      description: '内部状态与外部表达、交互之间的连接。',
    },
  ],
  zhFallbackFields: ['systems[0].shortLabel', 'systems[3].shortLabel'],
};
