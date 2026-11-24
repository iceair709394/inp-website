/**
 * 站点全局配置（唯一出口，页面不得直接读取环境变量或硬编码域名）。
 *
 * 基础地址来自 astro.config.mjs 的 site，可用环境变量 SITE_URL 覆盖。
 */

import { DEFAULT_LOCALE, LOCALES } from '@/i18n/locales';

export const SITE = {
  /** 站点基础地址，末尾无斜杠。域名未定前为占位值。 */
  baseUrl: (import.meta.env.SITE ?? 'https://inpagent.com').replace(/\/+$/, ''),

  defaultLocale: DEFAULT_LOCALE,
  locales: LOCALES,

  /** 品牌四要素由 src/data/brand 提供，这里不重复存放 */
  organization: {
    legalName: 'INP',
    foundingDate: null as string | null,
  },

  /**
   * 功能开关：默认全部关闭。
   * 打开前必须确有对应服务（没有服务支持的不要伪装成已完成）。
   */
  features: {
    analytics: false,
    userFeedback: false,
    documentationSearch: false,
  },
} as const;

/** 拼接绝对地址：absoluteUrl('/zh/') => 'https://…/zh/' */
export function absoluteUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.baseUrl}${clean}`;
}
