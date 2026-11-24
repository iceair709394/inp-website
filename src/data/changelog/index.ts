import type { ChangelogContent } from '@/data/types';
import type { Locale } from '@/i18n/locales';
import { changelog as zh } from './zh';
import { changelog as en } from './en';

const registry: Record<Locale, ChangelogContent> = { zh, en };

export function getChangelog(locale: Locale): ChangelogContent {
  return registry[locale];
}
