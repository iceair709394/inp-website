import type { ProductContent } from '@/data/types';

/**
 * 英文站 Product。
 *
 * 口径（与支付审核、/download、/compliance 一致）：
 * 卖的是 Windows 桌面助理 —— 日程、提醒、任务、快捷查询、语音交互、桌面 3D 角色；
 * 模型由用户自备；数据本地；不是关系/陪伴产品。
 */
export const product: ProductContent = {
  heading: 'A Desktop Assistant for Your Daily Work.',
  intro:
    'INP is a Windows application that puts a 3D character on your desktop and helps you get through the day: voice and text conversation, schedules, reminders, tasks, and quick lookups. It runs on your own machine, with a model you provide.',
  systemsLabel: 'What it does',
  systems: [
    {
      id: 'conversation',
      shortLabel: 'Voice and Text',
      fullName: null,
      description:
        'Talk to it, or type to it. Speech is synthesised on your device, so replies never leave your machine.',
    },
    {
      id: 'schedule',
      shortLabel: 'Schedules and Reminders',
      fullName: null,
      description: 'Keeps your calendar and reminders in order, and tells you what comes next.',
    },
    {
      id: 'tasks',
      shortLabel: 'Tasks',
      fullName: null,
      description: 'Collects what needs doing, orders it, and follows up on what is still open.',
    },
    {
      id: 'lookup',
      shortLabel: 'Quick Lookups',
      fullName: null,
      description:
        'Short questions answered without leaving the desktop: conversions, definitions, a fact you need now.',
    },
    {
      id: 'avatar',
      shortLabel: 'Desktop Avatar',
      fullName: null,
      description:
        'An original 3D character rendered on the desktop. Four characters ship with the app; the first-run wizard asks you to pick one.',
    },
    {
      id: 'local-data',
      shortLabel: 'Local by Default',
      fullName: null,
      description:
        'Conversations are session-based and are not stored on our servers. Task, preference, and voice data live in the app folder; delete it and they are gone.',
    },
  ],
  footnote: {
    heading: 'Requirements',
    paragraphs: [
      'Windows 10 or 11, 64-bit. 8 GB RAM minimum, 16 GB recommended. About 3.2 GB of disk for the app and the bundled speech model. An NVIDIA GPU is optional and speeds up speech synthesis.',
      'The app contains no language model. Connect your own API key or a local model server; without one, INP installs and runs but cannot reply.',
      'The current build is a technical preview and is not code-signed yet. Windows may show an unknown publisher warning.',
    ],
  },
  zhFallbackFields: [],
};
