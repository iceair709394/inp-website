import type { HeroContent } from '@/data/types';
import type { Locale } from '@/i18n/locales';
import { hero as zh } from './zh';
import { hero as en } from './en';

const registry: Record<Locale, HeroContent> = { zh, en };

export function getHero(locale: Locale): HeroContent {
  return registry[locale];
}
