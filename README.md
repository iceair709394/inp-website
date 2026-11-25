# INP Website

INP 官方网站。

- 品牌名称：`INP`
- 品牌全称：`I'm Not Perfect.`
- 产品定位：`An SGI Agent Platform`
- 官方 Slogan：`With You in Mind.`

## 技术栈

| 项 | 选择 |
|---|---|
| 框架 | Astro 7（静态输出，纯 SSG） |
| 语言 | TypeScript（strict） |
| 样式 | Tailwind CSS 4（仅中性 token，视觉层留空） |
| 依赖 | 6 个 devDependencies，0 个运行时依赖 |
| 客户端 JS | 无（页面为纯静态 HTML） |

## 环境要求

- Node.js `>= 22.23.4`（建议 24.x LTS）
- npm（随 Node 自带，不使用 pnpm / yarn）

仓库根目录的 `.node-version` 记录了约定版本。若本机存在多个 Node 版本，建议用 `scripts/run.ps1` 包裹命令，保证本次运行使用所需版本——该脚本只调整当前进程的 PATH，不修改系统环境变量。

## 常用命令

| 用途 | 命令 |
|---|---|
| 安装依赖 | `npm install` |
| 启动开发服务器 | `npm run dev` → `http://localhost:4321/zh/` |
| 构建 | `npm run build` → 产物在 `dist/` |
| 预览构建产物 | `npm run preview` |
| 类型检查 | `npm run check` |
| 产物与文案校验 | `npm run verify` |

Windows 下可用 `scripts/run.ps1 install` / `scripts/run.ps1 run dev` 等写法替代。

## 站点结构

| 路由 | 页面 |
|---|---|
| `/` → 301 → `/zh/` | 站点入口 |
| `/zh/`、`/en/` | Home：Hero + Introduction + Philosophy |
| `/[lang]/product/` | Product：导语 + 5 个核心系统 |
| `/[lang]/technology/` | Technology：SGI 概念 + 研究方向免责声明 |
| `/[lang]/documentation/` | Documentation：文档导航 |
| `/[lang]/changelog/` | Changelog：版本记录 |
| `/[lang]/about/` | About：品牌理念与联系区块 |
| `/404.html`、`/robots.txt`、`/sitemap-index.xml` | 系统页与 SEO 产物 |

默认语言为中文，URL 采用 `/zh/`、`/en/` 双前缀，根路径 301 至 `/zh/`。

## 目录

```
src/
├─ config/      站点常量、导航、外部链接、社交账号
├─ data/        结构化内容，按语言分文件；types.ts 是唯一接口来源
├─ i18n/        语言注册表、UI 字符串、路径工具、静态路由
├─ lib/         请求层与错误归一、SEO、统计预留、占位标记
├─ layouts/     HTML 骨架与页面布局
├─ components/  Header / Footer / LocaleSwitcher / Container / Section / Placeholder / CtaLinks
├─ pages/       路由
└─ styles/      Tailwind 入口
scripts/        运行环境包装 + 产物与文案校验
public/         静态直出资源
```

## 内容维护

- 页面文案集中在 `src/data/<页面>/{zh,en}.ts`，中英文结构由 `src/data/types.ts` 的一份接口强制对齐，漏字段、类型不符在构建期直接报错。
- 中文缺失处回退英文原文，并在该数据切片内逐项标记，不代写。
- 新增语言只需在 `src/i18n/locales.ts` 注册并补对应数据文件，路由、SEO、Sitemap 均无需改动。

## 约定

1. **视觉层留空**：`src/styles/global.css` 只引入 Tailwind 并定义中性 token，不含品牌色、字体、圆角、阴影。
2. **品牌四要素逐字使用**，不翻译、不改标点、不加语气词。
3. **SGI 表述**：SGI 是 INP 正在探索的概念方向，尚未得到学术界确认；不得表述为已确立的智能分类。
4. **外部链接与导航集中配置**，未启用的链接不渲染，不用占位域名冒充可用地址。
5. **没有服务支持的功能不伪装**：反馈入口与统计当前为空实现，开关默认关闭。
6. 文件名小写短横线，组件用 PascalCase，URL slug 全 ASCII，文件 UTF-8（无 BOM）、LF 换行。

## 站点地址

`SITE_URL` 环境变量可覆盖默认 `https://inpagent.com`。
