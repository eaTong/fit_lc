/**
 * 通用 Promise 超时工具。
 * 用法：const result = await withTimeout(model.invoke(msgs), 30000, 'llm-call');
 */
export class TimeoutError extends Error {
  operationLabel: string;
  constructor(operationLabel: string, ms: number) {
    super(`Operation "${operationLabel}" timed out after ${ms}ms`);
    this.name = 'TimeoutError';
    this.operationLabel = operationLabel;
  }
}

export function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  operationLabel: string,
): Promise<T> {
  let timer: NodeJS.Timeout | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new TimeoutError(operationLabel, ms)), ms);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    if (timer) clearTimeout(timer);
  });
}
