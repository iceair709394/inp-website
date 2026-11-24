// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_HREFLANG,
} from './src/i18n/locales.ts';

/**
 * 站点基础地址：域名未定，先用占位值。
 * 需要换域名时，只改环境变量 SITE_URL 或下方默认值，不要在页面里写死。
 */
const BASE_URL = process.env.SITE_URL ?? 'https://inpagent.com';

/** sitemap 的 i18n 映射从语言注册表派生，避免第二份语言清单 */
const hreflangMap = Object.fromEntries(
  LOCALES.map((locale) => [locale, LOCALE_HREFLANG[locale]]),
);

export default defineConfig({
  site: BASE_URL,

  // 静态输出，不引入服务端适配器
  output: 'static',

  // 语言策略 D-03：/zh/ 与 /en/ 双前缀，默认中文
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [...LOCALES],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },

  // 根路径跳到默认语言
  redirects: {
    '/': `/${DEFAULT_LOCALE}/`,
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: hreflangMap,
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
