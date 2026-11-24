/**
 * 占位内容标记工具。
 *
 * 规则（没有实际服务支持的功能不要伪装成已完成）：
 *   页面里出现的非最终内容必须能被标识出来，开发期在控制台提示一次，
 *   避免把占位内容当成定稿带上线。
 */

import type { Locale } from '@/i18n/locales';
import { t } from '@/i18n/ui';

/** 占位内容的默认可见标签 */
export function placeholderLabel(locale: Locale): string {
  return t(locale, 'notice.placeholder');
}

const warned = new Set<string>();

/** 开发期提示：同一处只提示一次；生产构建不输出 */
export function warnPlaceholder(where: string, locale: Locale): void {
  if (!import.meta.env.DEV) return;
  const key = `${locale}:${where}`;
  if (warned.has(key)) return;
  warned.add(key);
  console.warn(`[placeholder] ${where} (${locale}) 仍是占位内容`);
}
