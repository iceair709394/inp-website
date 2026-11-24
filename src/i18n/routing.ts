/**
 * 路由小工具：把「按语言展开静态路径」和「校验 lang 参数」收敛成两行，
 * 避免 7 个页面各写一遍同样的 getStaticPaths。
 */

import { LOCALES, isLocale, type Locale } from './locales';

/** 供 getStaticPaths 使用：一种语言生成一条路径 */
export function localeStaticPaths(): Array<{ params: { lang: string } }> {
  return LOCALES.map((lang) => ({ params: { lang } }));
}

/** 校验 Astro.params.lang，非法时直接让构建失败，而不是渲染半个页面 */
export function requireLocale(param: string | undefined): Locale {
  if (!isLocale(param)) {
    throw new Error(`不支持的语言参数：${String(param)}`);
  }
  return param;
}
