/**
 * 内容数据结构接口（单一真相源）。
 *
 * 约定：一份接口 + 各语言一份实现文件；漏字段、类型不符 → 构建期报错。
 *
 * 文案来源：src/data 下各语言实现文件（营销文案的唯一来源）。
 * 中文缺失处回退英文原文，并在该切片内用 zhFallbackFields 逐项标记。
 */

import type { UIKey } from '@/i18n/ui';

/** 中文缺失、当前用英文原文兜底的字段路径，例如 'hero.brandMark' */
export type ZhFallbackFields = string[];

/** 按钮/链接：标签取自 i18n 字典，避免在数据里重复文案 */
export interface CtaLink {
  labelKey: UIKey;
  /** 语言无关的站内路径；disabled 时忽略 */
  path?: string;
  /**
   * 站内静态文件的绝对地址（如 public/download 下的安装包）。
   * 与 path 的区别：path 会补语言前缀，href 原样使用。
   * 两者都给时优先 href。
   */
  href?: string;
  /** 按钮下方的小字说明键，例如平台与版本提示 */
  hintKey?: UIKey;
  /** 功能尚未可用（如无真实版本的下载），渲染为禁用态而非死链 */
  disabled?: boolean;
}

/** 标题 + 若干段落的通用区块 */
export interface TextBlock {
  heading: string;
  paragraphs: string[];
}

/**
 * 品牌基础信息。
 * 四要素必须逐字使用已确认内容，不得改写、不得翻译、不得补标点：
 *   name = 'INP' / fullName = "I'm Not Perfect."
 *   positioning = 'An SGI Agent Platform' / slogan = 'With You in Mind.'
 */
export interface BrandInfo {
  name: string;
  fullName: string;
  positioning: string;
  slogan: string;
  /** 页脚首行的品牌合并写法：'INP — I'm Not Perfect.' */
  footerBrandLine: string;
  copyright: string;
  /** 品牌四要素已确认，通常为 false；保留字段是为了全站占位标记统一 */
  isPlaceholder: boolean;
}

/** Home：主视觉已在 src/data/hero 独立定义，这里只留首页正文段落 */
export interface HomeContent {
  introduction: TextBlock;
  philosophy: TextBlock;
  zhFallbackFields: ZhFallbackFields;
}

/** Hero 轮播角色：key 必须与 stage 里的 data-avatar 一致 */
export interface HeroAvatarLine {
  /** deeyo / inp / yomiku / laysa */
  key: string;
  name: string;
  /** 轮到该角色时气泡里说的话 */
  line: string;
  /** 台词预录语音地址；缺省时气泡上不显示喇叭按钮 */
  audio?: string;
}

/** Hero：首页主视觉，一屏内交付「是什么 / 有什么」 */
export interface HeroContent {
  wordmark: string;
  /** 标题前半句（普通字色） */
  titlePre: string;
  /** 标题后半个强调词（渐变色） */
  titleEm: string;
  subtitle: string;
  /** 逐行描述 */
  descLines: string[];
  ctas: CtaLink[];
  /** 下载占位状态文案（无真实版本时展示） */
  comingSoon: string;
  /** 轮播顺序即此数组顺序，默认停在 key = inp 的那一位 */
  avatars: HeroAvatarLine[];
  zhFallbackFields: ZhFallbackFields;
}

/** Product：导语 + 核心系统清单 */
export interface SystemItem {
  id: string;
  /** 简称 */
  shortLabel: string;
  /** 全称；没有确认全称时为 null */
  fullName: string | null;
  description: string;
}

export interface ProductContent {
  heading: string;
  intro: string;
  /** '核心系统' 的分组标签 */
  systemsLabel: string;
  systems: SystemItem[];
  zhFallbackFields: ZhFallbackFields;
}

/** Technology：SGI 概念说明 + 研究方向免责声明 */
export interface TechnologyContent {
  heading: string;
  paragraphs: string[];
  /** 必须保留：SGI 是研究方向，不是机器意识的断言 */
  disclaimer: string;
  zhFallbackFields: ZhFallbackFields;
}

/** Documentation：文档分组目录，当前为空数组 */
export interface DocEntry {
  slug: string;
  title: string;
  summary?: string;
}

export interface DocGroup {
  id: string;
  title: string;
  entries: DocEntry[];
}

export interface DocumentationContent {
  heading: string;
  subheading: string;
  intro: string | null;
  groups: DocGroup[];
  zhFallbackFields: ZhFallbackFields;
}

/** Changelog：版本记录，当前为空数组 */
export interface ChangelogEntry {
  version: string;
  date: string;
  summary: string;
}

export interface ChangelogContent {
  heading: string;
  subheading: string;
  intro: string | null;
  entries: ChangelogEntry[];
  zhFallbackFields: ZhFallbackFields;
}

/** About：品牌理念 + 联系方式区块（联系方式待提供） */
export interface AboutContent {
  heading: string;
  brandLine: string;
  paragraphs: string[];
  closingSlogan: string;
  zhFallbackFields: ZhFallbackFields;
}
