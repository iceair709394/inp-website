/**
 * robots.txt 预渲染端点。
 * Sitemap 地址从站点配置派生，不在这里写死域名。
 */
import type { APIRoute } from 'astro';
import { SITE } from '@/config/site';

export const prerender = true;

export const GET: APIRoute = () => {
  const base = SITE.baseUrl.replace(/\/+$/, '');
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${base}/sitemap-index.xml`, ''].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
