import type { HomeContent } from '@/data/types';
import type { Locale } from '@/i18n/locales';
import { home as zh } from './zh';
import { home as en } from './en';

const registry: Record<Locale, HomeContent> = { zh, en };

export function getHome(locale: Locale): HomeContent {
  return registry[locale];
}
