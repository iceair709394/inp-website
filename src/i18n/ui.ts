/**
 * UI 字符串字典（不含营销文案）。
 *
 * 结构约定：英文为基准（`en` 必填），其他语言可选。
 * 中文缺失时不代写，回退英文原文，并通过 isFallback / fallbackKeys 标记出来，
 * 便于后续按清单补齐。
 */

import { type Locale } from './locales';

export type UIEntry = { en: string } & Partial<Record<Locale, string>>;

export const UI = {
  'nav.product': { en: 'Product' },
  'nav.technology': { en: 'Technology' },
  'nav.documentation': { en: 'Documentation' },
  'nav.about': { en: 'About' },
  'nav.contact': { en: 'Contact' },

  'action.getStarted': { en: 'Explore INP', zh: '了解 INP' },

  'action.discover': { en: 'Discover INP' },
  'action.exploreTechnology': { en: 'Explore the Technology' },
  'action.download': { en: 'Download' },
  'action.downloadAndroid': { en: 'Download for Android', zh: '下载安卓版' },
  'download.hintAndroid': {
    en: 'Android 7.0+ · v0.1.3 test build · 9 MB',
    zh: 'Android 7.0+ · v0.1.3 测试版 · 9 MB',
  },
  'download.hintWindows': {
    en: 'Windows 10/11 x64 · v0.1.0 test build · 229 MB',
    zh: 'Windows 10/11 64 位 · v0.1.0 测试版 · 229 MB',
  },
  'action.playVoice': { en: 'Play voice', zh: '播放语音' },
  'action.pauseVoice': { en: 'Pause voice', zh: '暂停语音' },
  'action.releaseNotes': { en: 'Release Notes' },
  'action.skipToContent': { en: 'Skip to content' },
  'action.backToHome': { en: 'Back to home' },

  'label.language': { en: 'Language' },
  'label.currentPage': { en: 'Current page' },

  'notice.placeholder': { en: 'Placeholder — copy pending confirmation' },
  'notice.scaffoldPage': { en: 'Phase 2 scaffold page — replaced when the real pages land' },
  'notice.notFoundTitle': { en: 'Page not found' },
  'notice.notFoundBody': { en: 'The page you requested does not exist or has moved.' },
  'notice.docsEmpty': { en: 'No documentation entries have been published yet.' },
  'notice.changelogEmpty': { en: 'No release entries have been published yet.' },
  'notice.contactPending': { en: 'Contact details are not published yet.' },
} satisfies Record<string, UIEntry>;

export type UIKey = keyof typeof UI;

/** 取 UI 字符串：目标语言有就用，没有回退英文 */
export function t(locale: Locale, key: UIKey): string {
  // UA 字面量类型在 satisfies 下会被收窄成 { en: string }，这里还原成完整结构再取值
  const entry = UI[key] as UIEntry;
  return entry[locale] ?? entry.en;
}

/** 该语言该键是否处于英文回退状态（供构建期清单与检查使用） */
export function isFallback(locale: Locale, key: UIKey): boolean {
  if (locale === 'en') return false;
  const entry = UI[key] as UIEntry;
  return entry[locale] === undefined;
}

/** 某语言下所有回退英文的键，用于生成待补文案清单 */
export function fallbackKeys(locale: Locale): UIKey[] {
  return (Object.keys(UI) as UIKey[]).filter((key) => isFallback(locale, key));
}
