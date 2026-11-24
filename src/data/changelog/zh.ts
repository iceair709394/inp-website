import type { ChangelogContent } from '@/data/types';

/**
 * 中文站 Changelog。
 * entries 为空：尚无任何版本记录，页面显示空状态，不编造版本号。
 */
export const changelog: ChangelogContent = {
  heading: 'Always Evolving.',
  subheading: 'Follow the development of INP.',
  intro: '查看版本更新、功能改进与已知问题。',
  entries: [],
  zhFallbackFields: ['heading', 'subheading'],
};
