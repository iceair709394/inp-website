/**
 * 导航配置（导航只在这里定义，页面不得自己拼列表）。
 *
 * path 为语言无关的站内路径，渲染时统一经 localePath() 补语言前缀。
 * 页脚链接为 Product / Technology / Documentation / About / Contact；
 * Changelog 不进主导航（入口挂在 Documentation 页）。
 */

import type { UIKey } from '@/i18n/ui';

export interface NavItem {
  labelKey: UIKey;
  path: string;
  /** 目标可能尚未落地时的说明（不渲染成死链，只作开发期标记） */
  pending?: boolean;
}

export const PRIMARY_NAV: NavItem[] = [
  { labelKey: 'nav.product', path: '/product' },
  { labelKey: 'nav.technology', path: '/technology' },
  { labelKey: 'nav.documentation', path: '/documentation' },
  { labelKey: 'nav.about', path: '/about' },
];

/** 页脚比主导航多一个 Contact（页脚链接清单） */
export const FOOTER_NAV: NavItem[] = [
  ...PRIMARY_NAV,
  { labelKey: 'nav.contact', path: '/about#contact' },
];
