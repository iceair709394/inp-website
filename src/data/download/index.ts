import type { DownloadContent } from '@/data/types';
import type { Locale } from '@/i18n/locales';
import { download as zh } from './zh';
import { download as en } from './en';

const registry: Record<Locale, DownloadContent> = { zh, en };

export function getDownload(locale: Locale): DownloadContent {
  return registry[locale];
}
