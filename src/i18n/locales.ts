/**
 * 语言注册表 —— 全站唯一开关点。
 *
 * 新增一门语言只需要动这里：往 LOCALES 里加一项，再补该语言的 ui 字符串与 data 文件，
 * 路由、切换器、hreflang、sitemap 会自动跟着生效。
 */

export const LOCALES = ['zh', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

/** 默认语言：中文 */
export const DEFAULT_LOCALE: Locale = 'zh';

/** 语言切换器上显示的自称 */
export const LOCALE_NATIVE_LABEL: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
};

/** hreflang 与 <html lang> 使用的语言标签 */
export const LOCALE_HREFLANG: Record<Locale, string> = {
  zh: 'zh-CN',
  en: 'en',
};

/** Open Graph 使用的 locale 格式 */
export const LOCALE_OG_LOCALE: Record<Locale, string> = {
  zh: 'zh_CN',
  en: 'en_US',
};

export function isLocale(value: string | undefined): value is Locale {
  if (!value) return false;
  return (LOCALES as readonly string[]).includes(value);
}

export function isDefaultLocale(locale: Locale): boolean {
  return locale === DEFAULT_LOCALE;
}

/** 除默认语言之外的语言 */
export function otherLocales(locale: Locale): Locale[] {
  return LOCALES.filter((item) => item !== locale);
}
