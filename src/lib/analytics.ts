/**
 * 统计接口预留。
 *
 * 现状：没有任何第三方统计服务接入，开关默认关闭，activeProvider 为 No-op。
 * 调用 track() 是安全的：开关关着就直接返回，不会发请求、不会产生假数据。
 *
 * 接入时只需：实现一个 AnalyticsProvider，在应用入口调用 setAnalyticsProvider()，
 * 并把 SITE.features.analytics 置为 true。
 */

import { SITE } from '@/config/site';

export interface AnalyticsEvent {
  name: string;
  props?: Record<string, unknown>;
}

export interface AnalyticsProvider {
  readonly id: string;
  track(event: AnalyticsEvent): void;
}

/** No-op：什么都不做，用于「预留但未接入」状态 */
export const noopProvider: AnalyticsProvider = {
  id: 'noop',
  track() {
    /* 预留位 */
  },
};

let activeProvider: AnalyticsProvider = noopProvider;

export function setAnalyticsProvider(provider: AnalyticsProvider): void {
  activeProvider = provider;
}

export function activeAnalyticsProviderId(): string {
  return activeProvider.id;
}

/** 记录事件：开关未开启时直接返回 */
export function track(name: string, props?: Record<string, unknown>): void {
  if (!SITE.features.analytics) return;
  activeProvider.track({ name, props });
}
