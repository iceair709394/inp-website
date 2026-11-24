import type { AboutContent } from '@/data/types';
import type { Locale } from '@/i18n/locales';
import { about as zh } from './zh';
import { about as en } from './en';

const registry: Record<Locale, AboutContent> = { zh, en };

export function getAbout(locale: Locale): AboutContent {
  return registry[locale];
}
