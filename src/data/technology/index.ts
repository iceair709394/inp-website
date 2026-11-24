import type { TechnologyContent } from '@/data/types';
import type { Locale } from '@/i18n/locales';
import { technology as zh } from './zh';
import { technology as en } from './en';

const registry: Record<Locale, TechnologyContent> = { zh, en };

export function getTechnology(locale: Locale): TechnologyContent {
  return registry[locale];
}
