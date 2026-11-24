import type { ProductContent } from '@/data/types';
import type { Locale } from '@/i18n/locales';
import { product as zh } from './zh';
import { product as en } from './en';

const registry: Record<Locale, ProductContent> = { zh, en };

export function getProduct(locale: Locale): ProductContent {
  return registry[locale];
}
