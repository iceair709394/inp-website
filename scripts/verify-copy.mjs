/**
 * 文案逐字核对：把对外文案清单里的每一句正式文案
 * 与 dist 构建产物逐条比对，证明页面用的是约定原文而不是改写版本。
 *
 * 用法：node scripts/verify-copy.mjs
 * 失败退出码 1。字符串表是按对外文案人工誊录的，与 data 层相互独立，
 * 因此能发现「数据写错但页面照抄」这类问题。
 * 另外做全站禁用词扫描：内部代号与内部系统名一旦漏进页面即报错。
 */

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

/** 英文站：V1 英文原文必须逐字出现 */
const EXPECTED_EN = {
  'en/': [
    'INP',
    'An SGI Agent Platform',
    'Intelligence with',
    'Personality.',
    'Different Avatars. Different Personalities.',
    'One Intelligent Platform.',
    'Explore INP',
    'Beyond Conversations.',
    'A conversation doesn&#39;t have to begin and end with a question.',
    'INP explores a more continuous form of interaction — where memory, emotional states, perception, and autonomous behavior work together to create a richer experience.',
    'A Different Direction of Intelligence.',
    'Intelligence has traditionally been measured by what a system can solve.',
    'But understanding people involves more than logic. It involves context, emotion, memory, and social interaction.',
    'INP explores this other dimension of intelligence.',
    'A Desktop Assistant, Not a Chatbot.',
    'INP is a Windows application. A 3D character sits on your desktop, you speak to it or type to it, and it keeps your day in order: schedules, reminders, tasks, and quick lookups.',
    'Speech is synthesised on your machine, and conversations are not stored on our servers. You bring your own model — a cloud key, or a local model on your own GPU.',
    'With You in Mind.',
  ],
  'en/product/': [
    'A Desktop Assistant for Your Daily Work.',
    'INP is a Windows application that puts a 3D character on your desktop and helps you get through the day: voice and text conversation, schedules, reminders, tasks, and quick lookups. It runs on your own machine, with a model you provide.',
    'What it does',
    'Voice and Text',
    'Speech is synthesised on your device, so replies never leave your machine.',
    'Schedules and Reminders',
    'Keeps your calendar and reminders in order, and tells you what comes next.',
    'Tasks',
    'Collects what needs doing, orders it, and follows up on what is still open.',
    'Quick Lookups',
    'Desktop Avatar',
    'Local by Default',
    'Requirements',
    'The app contains no language model. Connect your own API key or a local model server; without one, INP installs and runs but cannot reply.',
  ],
  'en/technology/': [
    'Exploring Sentient General Intelligence.',
    'SGI stands for Sentient General Intelligence.',
    'It is an emerging concept explored by INP, describing a direction of intelligence that places emotional and social capabilities alongside general cognitive abilities.',
    'Rather than treating intelligence only as the ability to reason, calculate, or complete tasks, we are interested in how emotional representations, persistent internal states, and social interaction may shape intelligent behavior.',
    'SGI is a research direction, not a claim of machine consciousness or subjective experience.',
  ],
  'en/documentation/': [
    'Built to Explore. Designed to Evolve.',
    'Discover the architecture, concepts, and development behind INP.',
  ],
  'en/changelog/': ['Always Evolving.', 'Follow the development of INP.'],
  'en/about/': [
    'Why INP?',
    'I&#39;m Not Perfect.',
    'We believe imperfection, curiosity, emotion, and individuality are part of what makes human experience meaningful.',
    'INP is an exploration of what intelligence could become when understanding people matters as much as solving problems.',
    'With You in Mind.',
  ],
  'en/download/': [
    'Download INP for Windows',
    'Current build',
    'System requirements',
    'Unsigned build notice',
    'Windows protected your PC',
    'Technical preview · the current build is not code-signed, so Windows may show a publisher warning',
  ],
  'en/privacy/': [
    'Privacy Policy',
    'What stays on your device',
    'What our servers handle',
    'What we never do',
  ],
  'en/terms/': ['Terms of Service', 'What you are buying', 'Cancellation and renewal', 'Acceptable use'],
  'en/refund/': ['Refund Policy', 'Seven days, no questions, first purchase only'],
  'en/compliance/': [
    'Content Standards',
    'No adult content',
    'No real-person likeness or voice',
    'What the product is, and is not',
  ],
};

/** 中文站：V1 提供的中文参考必须逐字出现；未提供的句子走英文回退，不在此表 */
const EXPECTED_ZH = {
  'zh/': [
    '有性格的',
    '智能。',
    '一个 SGI Agent 平台',
    '不同的角色，不同的性格。',
    '同一个智能平台。',
    '了解 INP',
    '不止于对话。',
    '一次交流，不必总是从一个问题开始，也不必随着回答结束。',
    'INP 希望探索更持续的交互方式，让记忆、情绪状态、感知与自主行为共同构成更丰富的体验。',
    '智能的另一种方向。',
    '我们习惯用解决问题的能力衡量智能。',
    '但理解一个人，不仅需要逻辑，还涉及语境、情绪、记忆与社会交互。',
    'INP 正在探索智能的另一面。',
    '桌面助理，不是聊天机器人。',
    'INP 是一个 Windows 应用。桌面上坐着一位 3D 角色，你可以用语音或文字跟它说话，它帮你把日程、提醒、任务和快捷查询管起来。',
    '语音在本机合成，对话不存我们的服务器。模型由你自备：云端 key，或跑在自己显卡上的本地模型。',
  ],
  'zh/product/': [
    '帮你把一天过顺的桌面助理。',
    'INP 是一个 Windows 应用：桌面上放一个 3D 角色，帮你处理日常事务——语音与文字对话、日程、提醒、任务、快捷查询。它跑在你自己的机器上，模型也由你提供。',
    '它能做什么',
    '语音与文字',
    '日程与提醒',
    '把日程和提醒管住，告诉你接下来是什么。',
    '任务',
    '快捷查询',
    '桌面形象',
    '默认本地',
    '运行要求',
  ],
  'zh/technology/': [
    '探索 Sentient General Intelligence。',
    'SGI 是 INP 正在探索的智能概念。',
    '它关注通用认知能力之外的另一组能力：情绪相关表征、持续的内部状态，以及这些因素如何影响智能行为与社会交互。',
    '我们关注的不只是推理、计算和完成任务的能力，也包括智能如何理解语境、处理情绪相关信息，并与人自然地互动。',
    'SGI 是一种研究方向，并不意味着已经证明机器拥有意识或主观体验。',
  ],
  'zh/documentation/': ['文档将介绍 INP 的系统架构、核心模块、开发指南与扩展方式。'],
  'zh/changelog/': ['查看版本更新、功能改进与已知问题。'],
  'zh/about/': [
    '关于 INP',
    '我们相信，好奇心、情绪、个性与不完美，都是人类体验中值得珍视的部分。',
    'INP 希望探索一种不同的智能体验：让理解人，不再只是解决问题之后的附加能力。',
  ],
  'zh/download/': [
    '下载 INP（Windows）',
    '当前版本',
    '系统要求',
    '未签名版本说明',
    '技术预览版 · 当前版本未做代码签名，Windows 可能提示未知发布者',
  ],
  'zh/privacy/': ['隐私政策', '留在你设备上的数据', '我们的服务器会处理什么', '我们绝不做的事'],
  'zh/terms/': ['服务条款', '你买的是什么', '取消与续费', '可接受使用'],
  'zh/refund/': ['退款政策', '首次购买 7 天无理由'],
  'zh/compliance/': ['内容规范', '不生成成人内容', '不使用真人形象与真人声音'],
};

/** 必须不出现的字符串：未确定的对外名称、竞品式措辞、脚手架页残留 */
const FORBIDDEN = {
  'en/product/': ['Agent Emotional System'],
  'zh/product/': ['Agent Emotional System'],
  'en/technology/': ['SGI is a proven', 'has confirmed'],
  'zh/technology/': ['已经证明机器拥有意识。'],
};

/** 全站禁用：内部代号与内部系统名不得出现在任何页面，大小写不敏感 */
const FORBIDDEN_ALL = ['Affective System', 'AES', 'ADA', 'CIP', 'APC', 'JEV', '氧化', '白金库'];

async function walkHtml(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walkHtml(full)));
    else if (entry.name.endsWith('.html')) found.push(full);
  }
  return found;
}

const problems = [];

function decode(html) {
  return html
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

async function checkTable(table, label) {
  let checked = 0;
  for (const [route, strings] of Object.entries(table)) {
    const html = await readFile(path.join(dist, route, 'index.html'), 'utf8');
    const text = decode(html);
    for (const raw of strings) {
      const expected = decode(raw);
      checked += 1;
      if (!text.includes(expected)) {
        problems.push(`${label} ${route} 缺失原文：${expected.slice(0, 60)}…`);
      }
    }
  }
  return checked;
}

async function main() {
  let checked = 0;
  checked += await checkTable(EXPECTED_EN, '[en]');
  checked += await checkTable(EXPECTED_ZH, '[zh]');

  for (const [route, strings] of Object.entries(FORBIDDEN)) {
    const text = decode(await readFile(path.join(dist, route, 'index.html'), 'utf8'));
    for (const s of strings) {
      if (text.includes(s)) problems.push(`[forbidden] ${route} 出现不该有的字符串：${s}`);
    }
  }

  // 全站扫描：dist 下每个 html 都不得出现内部代号或内部系统名
  const htmlFiles = await walkHtml(dist);
  let scannedPages = 0;
  for (const file of htmlFiles) {
    scannedPages += 1;
    const text = decode(await readFile(file, 'utf8')).toLowerCase();
    for (const s of FORBIDDEN_ALL) {
      if (text.includes(s.toLowerCase())) {
        problems.push(`[代号] ${path.relative(dist, file)} 出现不该有的字符串：${s}`);
      }
    }
  }

  // 首页下载：PC 版与安卓版当前都是 Coming Soon 占位，apk 直链与安装包文件均已撤下
  const RELEASE_HOST = 'https://github.com/iceair709394/inp-ce-releases/';
  for (const lang of ['zh', 'en']) {
    const html = await readFile(path.join(dist, lang, 'index.html'), 'utf8');
    const disabledCount = (html.match(/aria-disabled="true"/g) || []).length;
    if (disabledCount < 2) {
      problems.push(`[download] ${lang} 首页应有 2 个 Coming Soon 禁用占位（PC + 安卓），实际 ${disabledCount}`);
    }
    if (html.includes(RELEASE_HOST)) {
      problems.push(`[download] ${lang} 首页仍有 release 下载链接，应已撤下`);
    }
    if (/href="[^"]*\.apk"/.test(html)) {
      problems.push(`[download] ${lang} 首页仍有 apk 下载链接，应已撤下`);
    }
  }
  const distDownload = path.join(dist, 'download');
  if (existsSync(distDownload)) {
    const apks = (await readdir(distDownload)).filter((f) => f.endsWith('.apk'));
    if (apks.length) {
      problems.push(`[download] 构建产物里仍有安装包：${apks.join(', ')}`);
    }
  }

  console.log(`逐字核对字符串：${checked} 条`);
  console.log(`禁用词全站扫描：${scannedPages} 个页面，${FORBIDDEN_ALL.length} 个词`);
  if (problems.length === 0) {
    console.log('全部命中，未发现改写或缺失');
  } else {
    console.log(`发现 ${problems.length} 个问题：`);
    for (const p of problems) console.log(`  ✗ ${p}`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
