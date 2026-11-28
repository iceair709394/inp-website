import type { LegalDoc } from '@/data/types';
import type { Locale } from '@/i18n/locales';
import { legalEn } from './en';
import { legalZh } from './zh';

/** 政策页键名，与 /src/pages/[lang] 下的文件名一一对应 */
export type LegalDocKey = 'privacy' | 'terms' | 'refund' | 'compliance' | 'download';

const registry: Record<Locale, Record<LegalDocKey, LegalDoc>> = {
  zh: legalZh,
  en: legalEn,
};

export function getLegalDoc(locale: Locale, key: LegalDocKey): LegalDoc {
  return registry[locale][key];
}
