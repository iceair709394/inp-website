/**
 * 品牌数据的统一取数口。
 *
 * 页面不直接 import zh.ts / en.ts，一律走这里，保证以后加语言时只改本文件。
 */

import type { BrandInfo } from '@/data/types';
import type { Locale } from '@/i18n/locales';
import { brand as zh } from './zh';
import { brand as en } from './en';

const registry: Record<Locale, BrandInfo> = { zh, en };

export function getBrand(locale: Locale): BrandInfo {
  return registry[locale];
}
