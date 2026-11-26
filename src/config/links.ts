/**
 * 外部链接统一管理。
 *
 * 规则：
 *   1. 页面不得出现内联外部 URL，只能按 id 取；
 *   2. enabled = false 的链接不得渲染（冒烟检查会扫描 HTML 验证）；
 *   3. href 为 null 表示「尚未有地址」，禁止填占位域名冒充可用链接。
 */

export interface ExternalLink {
  id: string;
  label: string;
  href: string | null;
  enabled: boolean;
  /** 开发者说明：为什么没启用 */
  note?: string;
}

export const EXTERNAL_LINKS: Record<string, ExternalLink> = {
  releaseDownload: {
    id: 'releaseDownload',
    label: 'Download',
    href: 'https://github.com/iceair709394/inp-ce-releases/releases/download/v0.1.0/INP_CE_Win_v0.1.zip',
    enabled: true,
    note: 'Windows 体验版 v0.1（228.9 MiB）。首页按钮用的是 src/data/hero/*.ts 里的同一地址，改版本时两处一起改',
  },
  releaseNotes: {
    id: 'releaseNotes',
    label: 'Release Notes',
    href: null,
    enabled: false,
    note: '内部指向 /changelog，由站点路由处理，不走外链表',
  },
  contactEmail: {
    id: 'contactEmail',
    label: 'Contact',
    href: null,
    enabled: false,
    note: '联系邮箱待提供',
  },
} as const;

export function getExternalLink(id: string): ExternalLink | null {
  return Object.prototype.hasOwnProperty.call(EXTERNAL_LINKS, id)
    ? (EXTERNAL_LINKS[id] ?? null)
    : null;
}
