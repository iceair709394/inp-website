import type { ProductContent } from '@/data/types';

/**
 * 中文站 Product。能力口径与英文站一致。
 */
export const product: ProductContent = {
  heading: '帮你把一天过顺的桌面助理。',
  intro:
    'INP 是一个 Windows 应用：桌面上放一个 3D 角色，帮你处理日常事务——语音与文字对话、日程、提醒、任务、快捷查询。它跑在你自己的机器上，模型也由你提供。',
  systemsLabel: '它能做什么',
  systems: [
    {
      id: 'conversation',
      shortLabel: '语音与文字',
      fullName: null,
      description: '可以直接说，也可以打字。语音在本机合成，回复不出你的机器。',
    },
    {
      id: 'schedule',
      shortLabel: '日程与提醒',
      fullName: null,
      description: '把日程和提醒管住，告诉你接下来是什么。',
    },
    {
      id: 'tasks',
      shortLabel: '任务',
      fullName: null,
      description: '把要做的事收在一起，排好顺序，跟进没完成的。',
    },
    {
      id: 'lookup',
      shortLabel: '快捷查询',
      fullName: null,
      description: '不离开桌面就能问一句：换算、名词解释、马上要用的一个事实。',
    },
    {
      id: 'avatar',
      shortLabel: '桌面形象',
      fullName: null,
      description: '桌面上渲染的原创 3D 角色。内置四个角色，首次向导里挑一个。',
    },
    {
      id: 'local-data',
      shortLabel: '默认本地',
      fullName: null,
      description: '对话按会话存在，不存我们的服务器。任务、偏好与语音数据都在应用目录里，删掉即清空。',
    },
  ],
  footnote: {
    heading: '运行要求',
    paragraphs: [
      'Windows 10 或 11，64 位。内存 8 GB 起步、推荐 16 GB。应用加内置语音模型约需 3.2 GB 磁盘。有 NVIDIA 显卡更好，语音合成更快。',
      '应用不含语言模型。你需要接入自己的 API key，或本机的模型服务；没有模型，INP 能装能开，但不会回复。',
      '当前版本是技术预览版，尚未做代码签名，Windows 可能提示未知发布者。',
    ],
  },
  zhFallbackFields: [],
};
