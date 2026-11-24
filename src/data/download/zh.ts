import type { DownloadContent } from '@/data/types';

/**
 * 中文站 Download。
 * 没有真实版本：releases 为空，Download 按钮 disabled，不生成任何下载地址。
 */
export const download: DownloadContent = {
  heading: 'Meet INP.',
  subheading: 'Explore the INP experience.',
  note: '下载信息、系统要求和版本说明将在正式发布后提供。',
  ctas: [
    { labelKey: 'action.download', disabled: true },
    { labelKey: 'action.releaseNotes', path: '/changelog' },
  ],
  releases: [],
  zhFallbackFields: ['heading', 'subheading', 'ctas[].labelKey'],
};
