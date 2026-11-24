/**
 * 统一错误类型。
 *
 * 所有 lib 层抛出的错误都必须是 AppError 的子类，页面/服务层据 kind 分支，
 * 不允许向页面抛出裸 Error / 裸字符串。
 */

export type AppErrorKind =
  | 'network'
  | 'timeout'
  | 'http'
  | 'parse'
  | 'not_implemented';

export interface AppErrorOptions {
  kind: AppErrorKind;
  message: string;
  /** HTTP 状态码，仅 kind = 'http' 时有意义 */
  status?: number;
  /** 稳定的机器可读错误码，便于埋点与文案映射 */
  code?: string;
  cause?: unknown;
}

export class AppError extends Error {
  readonly kind: AppErrorKind;
  readonly status?: number;
  readonly code?: string;
  override readonly cause?: unknown;

  constructor(options: AppErrorOptions) {
    super(options.message);
    this.name = 'AppError';
    this.kind = options.kind;
    this.status = options.status;
    this.code = options.code;
    this.cause = options.cause;
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      kind: this.kind,
      message: this.message,
      status: this.status ?? null,
      code: this.code ?? null,
    };
  }
}

export function isAppError(value: unknown): value is AppError {
  return value instanceof AppError;
}

/**
 * 未接入的功能：调用必须显式失败，不返回假数据、不静默吞掉。
 * 用于反馈入口等「接口已预留、服务未确认」的场景。
 */
export class NotImplementedError extends AppError {
  constructor(code: string, message: string) {
    super({ kind: 'not_implemented', code, message });
    this.name = 'NotImplementedError';
  }
}

/** 把握手层的任意异常归一成 AppError */
export function toAppError(value: unknown, fallbackMessage: string): AppError {
  if (isAppError(value)) return value;
  if (value instanceof DOMException && value.name === 'AbortError') {
    return new AppError({ kind: 'timeout', message: fallbackMessage, code: 'ABORTED' });
  }
  return new AppError({
    kind: 'network',
    message: fallbackMessage,
    code: 'UNKNOWN',
    cause: value,
  });
}
