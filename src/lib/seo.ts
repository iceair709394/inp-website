/**
 * SEO / 社交分享元数据组装。
 *
 * 一处生成：title、description、canonical、全语言 hreflang（含 x-default）、
 * Open Graph、Twitter Card、可选 JSON-LD。布局层只负责注入，不再自己拼字段。
 */

import { SITE, absoluteUrl } from '@/config/site';
import {
  DEFAULT_LOCALE,
  LOCALE_HREFLANG,
  LOCALE_OG_LOCALE,
  LOCALES,
  type Locale,
} from '@/i18n/locales';

export interface SeoInput {
  locale: Locale;
  /** 语言无关的站内路径，如 '/product'；根为 '/' */
  path: string;
  title: string;
  description: string;
  noIndex?: boolean;
  /** 404 等页面不输出 canonical；默认 true */
  withCanonical?: boolean;
  /** 社交分享图，暂无素材时保持 null（不伪造图片地址） */
  imagePath?: string | null;
  type?: 'website' | 'article';
}

export interface SeoAlternate {
  hreflang: string;
  href: string;
}

export interface SeoOutput {
  title: string;
  description: string;
  /** 不输出 canonical 的页面为 null */
  canonical: string | null;
  alternates: SeoAlternate[];
  og: {
    title: string;
    description: string;
    url: string;
    type: 'website' | 'article';
    siteName: string;
    locale: string;
    image: string | null;
  };
  twitter: {
    card: 'summary' | 'summary_large_image';
    title: string;
    description: string;
  };
  noIndex: boolean;
  jsonLd: Record<string, unknown> | null;
}

/** 站内路径规范化：保证以单个尾斜杠结尾，根路径为 '/' */
export function normalizePath(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (clean === '/') return '/';
  return `${clean.replace(/\/+$/, '')}/`;
}

function localizedUrl(locale: Locale, path: string): string {
  return absoluteUrl(`/${locale}${normalizePath(path)}`);
}

export function buildSeo(input: SeoInput): SeoOutput {
  const {
    locale,
    path,
    title,
    description,
    noIndex = false,
    withCanonical = true,
    imagePath = null,
    type = 'website',
  } = input;

  const pageUrl = localizedUrl(locale, path);
  const canonical = withCanonical ? pageUrl : null;

  const alternates: SeoAlternate[] = LOCALES.map((item) => ({
    hreflang: LOCALE_HREFLANG[item],
    href: localizedUrl(item, path),
  }));

  alternates.push({
    hreflang: 'x-default',
    href: localizedUrl(DEFAULT_LOCALE, path),
  });

  const image = imagePath ? absoluteUrl(imagePath) : null;

  return {
    title,
    description,
    canonical,
    alternates,
    og: {
      title,
      description,
      url: pageUrl,
      type,
      siteName: SITE.organization.legalName,
      locale: LOCALE_OG_LOCALE[locale],
      image,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
    },
    noIndex,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.organization.legalName,
      url: SITE.baseUrl,
      slogan: 'With You in Mind.',
    },
  };
}
