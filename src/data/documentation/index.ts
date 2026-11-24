import type { DocumentationContent } from '@/data/types';
import type { Locale } from '@/i18n/locales';
import { documentation as zh } from './zh';
import { documentation as en } from './en';

const registry: Record<Locale, DocumentationContent> = { zh, en };

export function getDocumentation(locale: Locale): DocumentationContent {
  return registry[locale];
}
