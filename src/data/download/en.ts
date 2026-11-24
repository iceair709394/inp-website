import type { DownloadContent } from '@/data/types';

/**
 * 英文站 Download。
 * 没有真实版本：releases 为空，Download 按钮 disabled，不生成任何下载地址。
 * 文案里的下载说明句为中文，英文站 note 为 null，由页面显示通用空状态提示。
 */
export const download: DownloadContent = {
  heading: 'Meet INP.',
  subheading: 'Explore the INP experience.',
  note: null,
  ctas: [
    { labelKey: 'action.download', disabled: true },
    { labelKey: 'action.releaseNotes', path: '/changelog' },
  ],
  releases: [],
  zhFallbackFields: [],
};
