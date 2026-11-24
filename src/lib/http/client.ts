/**
 * 统一请求层。
 *
 * 现状说明（诚实标注）：
 *   当前站点是纯静态输出，没有任何后端接口，本层暂时没有调用方。
 *   它被先建立起来是为了后续接入反馈、订阅等接口时只有一个出口，
 *   并且错误形态、超时、重试策略已经定型，不必等到有接口再返工。
 *
 * 使用约束：
 *   1. 页面/组件不得直接调用 fetch，必须走 requestJson；
 *   2. 抛出的错误一律是 AppError（见 ./errors），调用方按 kind 分支。
 */

import { SITE } from '@/config/site';
import { AppError, toAppError } from './errors';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  /** 会被 JSON.stringify 后作为请求体 */
  body?: unknown;
  headers?: Record<string, string>;
  /** 超时毫秒，默认 8000 */
  timeoutMs?: number;
  /** 失败重试次数（仅对网络错误、超时、5xx 生效），默认 0 */
  retries?: number;
  signal?: AbortSignal;
  /** 覆盖基础地址；默认取站点基础地址 */
  baseUrl?: string;
}

const DEFAULT_TIMEOUT_MS = 8000;

function resolveUrl(path: string, baseUrl: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const base = baseUrl.replace(/\/+$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

function isRetryable(error: AppError): boolean {
  if (error.kind === 'network' || error.kind === 'timeout') return true;
  if (error.kind === 'http' && error.status !== undefined) return error.status >= 500;
  return false;
}

async function once<T>(path: string, options: RequestOptions): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {},
    timeoutMs = DEFAULT_TIMEOUT_MS,
    signal,
    baseUrl = SITE.baseUrl,
  } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const abortFromOutside = () => controller.abort();
  signal?.addEventListener('abort', abortFromOutside, { once: true });

  try {
    const response = await fetch(resolveUrl(path, baseUrl), {
      method,
      headers: {
        Accept: 'application/json',
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new AppError({
        kind: 'http',
        status: response.status,
        message: `请求失败：${method} ${path} → ${response.status}`,
        code: `HTTP_${response.status}`,
      });
    }

    if (response.status === 204) return undefined as T;

    const text = await response.text();
    if (text.trim() === '') return undefined as T;

    try {
      return JSON.parse(text) as T;
    } catch (error) {
      throw new AppError({
        kind: 'parse',
        message: `响应不是合法 JSON：${method} ${path}`,
        code: 'PARSE_ERROR',
        cause: error,
      });
    }
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (controller.signal.aborted) {
      throw new AppError({
        kind: 'timeout',
        message: `请求超时：${method} ${path}（${timeoutMs}ms）`,
        code: 'TIMEOUT',
        cause: error,
      });
    }
    throw toAppError(error, `网络请求失败：${method} ${path}`);
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', abortFromOutside);
  }
}

/** 统一 JSON 请求；失败时抛 AppError */
export async function requestJson<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const retries = Math.max(0, options.retries ?? 0);

  let lastError: AppError | null = null;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await once<T>(path, options);
    } catch (error) {
      const normalized = toAppError(error, `请求失败：${path}`);
      lastError = normalized;
      if (attempt === retries || !isRetryable(normalized)) break;
    }
  }

  throw lastError ?? new AppError({ kind: 'network', message: `请求失败：${path}` });
}
