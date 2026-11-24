/**
 * 社交媒体配置。
 *
 * 文案未提供任何社交平台账号，因此这里保持空数组：
 * 页脚不渲染社交区块，也不生成死链。等账号确认后按下面的结构补一项即可。
 *
 * 示例（未启用，勿直接照搬）：
 *   { id: 'x', label: 'X', href: 'https://x.com/<handle>', enabled: true }
 */

export interface SocialLink {
  id: string;
  label: string;
  href: string | null;
  enabled: boolean;
  note?: string;
}

export const SOCIAL_LINKS: SocialLink[] = [];

/** 只渲染已启用的社交项 */
export function activeSocialLinks(): SocialLink[] {
  return SOCIAL_LINKS.filter((item) => item.enabled && item.href);
}
