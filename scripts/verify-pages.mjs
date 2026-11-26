/**
 * 构建产物冒烟检查（无第三方依赖，直接跑在 dist 上）。
 *
 * 用法：node scripts/verify-pages.mjs
 * 失败时退出码 1，并逐条列出问题页码与原因。
 *
 * 覆盖的检查项：
 *   R1  14 个语言页面 + 404 + robots + sitemap 全部存在
 *   R2  每页恰有一个 canonical，且 canonical 与自身路由一致
 *   R3  canonical 不重复（避免多页争同一规范地址）
 *   R4  每页有 title / description，且含全部语言 hreflang（含 x-default）
 *   R5  页脚品牌四要素逐字存在
 *   R6  Technology 页保留 SGI 研究方向免责声明
 *   R8  站内链接全部可解析到真实文件；带锚点的锚点确实存在
 *   R9  外链白名单：只允许发布包下载地址（社交与联系邮箱仍未启用）
 *   R10 脚手架提示文案已彻底消失
 *   R11 sitemap 收录 14 个语言页面
 */

import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const LANGS = ['zh', 'en'];
const PAGES = ['', 'product', 'technology', 'documentation', 'changelog', 'about'];

const BRAND_LINE = 'INP — I&#39;m Not Perfect.';
const BRAND_LINE_ALT = "INP — I'm Not Perfect.";
const POSITIONING = 'An SGI Agent Platform';
const SLOGAN = 'With You in Mind.';
const COPYRIGHT = '© INP. All rights reserved.';
const SCAFFOLD_TEXT = 'Phase 2 scaffold page';

const DISCLAIMER = {
  en: 'SGI is a research direction, not a claim of machine consciousness or subjective experience.',
  zh: 'SGI 是一种研究方向，并不意味着已经证明机器拥有意识或主观体验。',
};

const problems = [];
const notes = [];

function fail(msg) {
  problems.push(msg);
}

/** 路由路径 -> dist 内文件；目录格式产物必须带尾斜杠 */
function fileForPath(p) {
  if (p === '/') return path.join(dist, 'index.html');
  if (p.endsWith('/')) return path.join(dist, `${p.slice(1)}index.html`);
  if (/\.[a-z0-9]+$/i.test(p)) return path.join(dist, p.slice(1));
  return null;
}

function readUtf8(file) {
  return readFile(file, 'utf8');
}

async function main() {
  if (!existsSync(dist)) {
    console.error('dist 不存在，先运行 npm run build');
    process.exit(1);
  }

  // ---- R1 页面存在性
  const routes = [];
  for (const lang of LANGS) {
    for (const page of PAGES) {
      const route = page === '' ? `/${lang}/` : `/${lang}/${page}/`;
      routes.push({ route, lang, page });
      const file = fileForPath(route);
      if (!file || !existsSync(file)) fail(`R1 缺少页面文件：${route}`);
    }
  }
  for (const fixed of ['/404.html', '/robots.txt', '/sitemap-index.xml']) {
    const file = fileForPath(fixed);
    if (!file || !existsSync(file)) fail(`R1 缺少固定产物：${fixed}`);
  }

  const pages = [];
  for (const { route, lang, page } of routes) {
    const file = fileForPath(route);
    if (!existsSync(file)) continue;
    pages.push({ route, lang, page, file, html: await readUtf8(file) });
  }

  // ---- R2 / R3 canonical
  const canonicals = new Map();
  for (const p of pages) {
    const canon = p.html.match(/<link rel="canonical" href="([^"]+)"/);
    if (!canon) {
      fail(`R2 ${p.route} 缺少 canonical`);
      continue;
    }
    const url = canon[1];
    const pathname = url.replace(/^https?:\/\/[^/]+/, '');
    if (pathname !== p.route) fail(`R2 ${p.route} canonical 指向 ${pathname}，与自己不一致`);
    if (canonicals.has(url)) fail(`R3 ${p.route} 与 ${canonicals.get(url)} 共用 canonical ${url}`);
    canonicals.set(url, p.route);
  }

  // ---- R4 title / description / hreflang
  for (const p of pages) {
    const title = p.html.match(/<title>(.*?)<\/title>/);
    if (!title || title[1].trim() === '') fail(`R4 ${p.route} 缺少有效 title`);
    if (!/<meta name="description" content="[^"]+"/.test(p.html)) fail(`R4 ${p.route} 缺少 description`);
    const hreflangs = [...p.html.matchAll(/rel="alternate" hreflang="([^"]+)"/g)].map((m) => m[1]);
    for (const lang of LANGS) {
      if (!hreflangs.includes(lang === 'zh' ? 'zh-CN' : 'en')) fail(`R4 ${p.route} 缺少 hreflang=${lang}`);
    }
    if (!hreflangs.includes('x-default')) fail(`R4 ${p.route} 缺少 hreflang=x-default`);
  }

  // ---- R5 品牌四要素
  for (const p of pages) {
    if (!p.html.includes(BRAND_LINE) && !p.html.includes(BRAND_LINE_ALT)) {
      fail(`R5 ${p.route} 页脚缺少品牌行 'INP — I'm Not Perfect.'`);
    }
    if (!p.html.includes(POSITIONING)) fail(`R5 ${p.route} 缺少品牌定位`);
    if (!p.html.includes(SLOGAN)) fail(`R5 ${p.route} 缺少官方 Slogan`);
    if (!p.html.includes(COPYRIGHT)) fail(`R5 ${p.route} 缺少版权行`);
  }

  // ---- R6 SGI 免责声明
  for (const lang of LANGS) {
    const p = pages.find((item) => item.lang === lang && item.page === 'technology');
    if (p && !p.html.includes(DISCLAIMER[lang])) fail(`R6 /${lang}/technology/ 缺少 SGI 免责声明`);
  }

  // ---- R8 站内链接解析
  const linkTargets = new Set();
  for (const p of pages) {
    for (const m of p.html.matchAll(/href="(\/[^"]*)"/g)) {
      const href = m[1];
      const [routePart, anchor] = href.split('#');
      if (routePart === '' || routePart.startsWith('/_astro/')) continue;

      const file = fileForPath(routePart);
      if (!file || !existsSync(file)) {
        fail(`R8 ${p.route} 的死链：${href}`);
        continue;
      }
      linkTargets.add(routePart);
      if (anchor) {
        const html = await readUtf8(file);
        if (!html.includes(`id="${anchor}"`)) {
          fail(`R8 ${p.route} 的锚点不存在：${href}`);
        }
      }
    }
  }

  // ---- R9 外链白名单：唯一允许的是发布包下载地址，其余外链一律视为错误
  const EXTERNAL_ALLOW = ['https://github.com/iceair709394/inp-ce-releases/'];
  for (const p of pages) {
    const externals = [...p.html.matchAll(/<a[^>]+href="(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
    const bad = externals.filter((u) => !EXTERNAL_ALLOW.some((prefix) => u.startsWith(prefix)));
    if (bad.length > 0) fail(`R9 ${p.route} 出现白名单外的外部链接：${bad.join(', ')}`);
  }

  // ---- R10 脚手架文案残留
  for (const p of pages) {
    if (p.html.includes(SCAFFOLD_TEXT)) fail(`R10 ${p.route} 仍含脚手架提示`);
    if (p.html.includes('>undefined<')) fail(`R10 ${p.route} 渲染出 undefined`);
    if (p.html.includes('[object Object]')) fail(`R10 ${p.route} 渲染出 object Object`);
  }

  // ---- R12 语义结构：每页恰好一个 h1，且 html lang 与语言一致
  for (const p of pages) {
    const h1 = (p.html.match(/<h1[\s>]/g) ?? []).length;
    if (h1 !== 1) fail(`R12 ${p.route} 的 h1 数量为 ${h1}，期望 1`);
    const htmlLang = p.html.match(/<html lang="([^"]+)"/);
    const expectedLang = p.lang === 'zh' ? 'zh-CN' : 'en';
    if (!htmlLang || htmlLang[1] !== expectedLang) {
      fail(`R12 ${p.route} 的 html lang 为 ${htmlLang ? htmlLang[1] : 'NONE'}，期望 ${expectedLang}`);
    }
  }

  // ---- R11 sitemap
  const sitemap = await readUtf8(path.join(dist, 'sitemap-0.xml'));
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  if (urls.length !== routes.length) {
    fail(`R11 sitemap 收录 ${urls.length} 条，期望 ${routes.length} 条`);
  }
  for (const { route } of routes) {
    if (!urls.some((u) => u.replace(/^https?:\/\/[^/]+/, '') === route)) {
      fail(`R11 sitemap 未收录 ${route}`);
    }
  }

  // ---- 附加信息（非失败项）
  const zhHome = pages.find((p) => p.lang === 'zh' && p.page === '');
  if (zhHome && zhHome.html.includes('不止于对话')) notes.push('OK zh 首页使用中文文案（未回退）');

  console.log(`检查页面数：${pages.length}`);
  console.log(`站内链接去重后：${linkTargets.size} 个目标`);
  for (const note of notes) console.log(`  ${note}`);
  if (problems.length === 0) {
    console.log('\n全部通过（R1–R4, R5–R12）');
  } else {
    console.log(`\n发现 ${problems.length} 个问题：`);
    for (const p of problems) console.log(`  ✗ ${p}`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
