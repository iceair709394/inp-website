import { DEFAULT_LOCALE, isLocale, type Locale } from './locales';

/**
 * 把站内路径补上语言前缀：localePath('zh', '/product') => '/zh/product/'
 *
 * 为什么必须带尾斜杠：Astro 静态输出是目录格式（dist/zh/product/index.html），
 * 部署到普通静态服务器时 '/zh/product' 会 404，只有 '/zh/product/' 能命中。
 * 片段（#contact）与查询串会被保留在尾斜杠之后。
 */
export function localePath(locale: Locale, path: string = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const match = clean.match(/^([^?#]*)(.*)$/);
  const pathPart = match?.[1] ?? clean;
  const suffix = match?.[2] ?? '';
  const base = `/${locale}`;

  if (pathPart === '' || pathPart === '/') return `${base}/${suffix}`;

  return `${base}${pathPart.replace(/\/+$/, '')}/${suffix}`;
}

/** 从路径里取语言：'/zh/product' => 'zh'；取不到时返回默认语言 */
export function localeFromPath(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0];
  return isLocale(first) ? first : DEFAULT_LOCALE;
}

/** 从路径里去掉语言前缀，得到与语言无关的站内路径 */
export function pathWithoutLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const rest = isLocale(segments[0]) ? segments.slice(1) : segments;
  return rest.length === 0 ? '/' : `/${rest.join('/')}`;
}

/** 计算「同一页面的另一种语言地址」，用于语言切换器 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const hasTrailingSlash = pathname.length > 1 && pathname.endsWith('/');
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = target;
  } else {
    segments.unshift(target);
  }

  const joined = `/${segments.join('/')}`;
  return hasTrailingSlash ? `${joined}/` : joined;
}
