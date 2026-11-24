import type { DocumentationContent } from '@/data/types';

/**
 * 中文站 Documentation。
 * 文案只给了标题/副标题的英文与一句中文简介；英文标题与副标题此处回退英文原文。
 * groups 为空：文档条目尚未提供，导航由数据驱动，不在页面里手写列表。
 */
export const documentation: DocumentationContent = {
  heading: 'Built to Explore. Designed to Evolve.',
  subheading: 'Discover the architecture, concepts, and development behind INP.',
  intro: '文档将介绍 INP 的系统架构、核心模块、开发指南与扩展方式。',
  groups: [],
  zhFallbackFields: ['heading', 'subheading'],
};
