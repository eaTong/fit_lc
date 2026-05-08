/**
 * 熔断器
 * 防止连续失败导致的服务雪崩
 * 三态：CLOSED（正常）、OPEN（熔断）、HALF_OPEN（试探）
 */

export enum CircuitState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN'
}

interface CircuitConfig {
  failureThreshold: number;  // 连续失败多少次后熔断
  recoveryTimeout: number;   // 熔断后多少毫秒尝试恢复
  halfOpenMaxAttempts: number;  // 半开状态下允许的尝试次数
}

const DEFAULT_CONFIG: CircuitConfig = {
  failureThreshold: 5,        // 5次连续失败
  recoveryTimeout: 30000,     // 30秒后尝试恢复
  halfOpenMaxAttempts: 1      // 半开状态只允许1次请求
};

interface CircuitEntry {
  state: CircuitState;
  failureCount: number;
  lastFailureTime: number;
  halfOpenAttempts: number;
}

type CircuitBreakerKey = string;  // e.g., "tool:save_workout" or "llm:minimax"

const circuits = new Map<CircuitBreakerKey, CircuitEntry>();

/**
 * 获取或创建熔断器条目
 */
function getOrCreate(key: CircuitBreakerKey): CircuitEntry {
  if (!circuits.has(key)) {
    circuits.set(key, {
      state: CircuitState.CLOSED,
      failureCount: 0,
      lastFailureTime: 0,
      halfOpenAttempts: 0
    });
  }
  return circuits.get(key)!;
}

/**
 * 检查熔断器是否允许请求
 */
export function isCircuitOpen(key: CircuitBreakerKey): boolean {
  const entry = getOrCreate(key);

  if (entry.state === CircuitState.CLOSED) {
    return false;
  }

  if (entry.state === CircuitState.OPEN) {
    const timeSinceLastFailure = Date.now() - entry.lastFailureTime;
    if (timeSinceLastFailure >= DEFAULT_CONFIG.recoveryTimeout) {
      // 超时，切换到半开状态
      entry.state = CircuitState.HALF_OPEN;
      entry.halfOpenAttempts = 0;
      return false;  // 允许一次试探请求
    }
    return true;  // 熔断中，拒绝请求
  }

  if (entry.state === CircuitState.HALF_OPEN) {
    // 半开状态下只允许一次请求
    return entry.halfOpenAttempts >= DEFAULT_CONFIG.halfOpenMaxAttempts;
  }

  return false;
}

/**
 * 记录请求成功
 */
export function recordSuccess(key: CircuitBreakerKey): void {
  const entry = getOrCreate(key);

  if (entry.state === CircuitState.HALF_OPEN) {
    // 半开状态下成功，关闭熔断器
    entry.state = CircuitState.CLOSED;
    entry.failureCount = 0;
    entry.halfOpenAttempts = 0;
  } else if (entry.state === CircuitState.CLOSED) {
    // 正常状态成功，重置失败计数
    entry.failureCount = 0;
  }
}

/**
 * 记录请求失败
 */
export function recordFailure(key: CircuitBreakerKey): void {
  const entry = getOrCreate(key);
  entry.failureCount++;
  entry.lastFailureTime = Date.now();

  if (entry.state === CircuitState.HALF_OPEN) {
    // 半开状态下失败，重新打开熔断器
    entry.state = CircuitState.OPEN;
    entry.halfOpenAttempts = 0;
  } else if (entry.state === CircuitState.CLOSED) {
    if (entry.failureCount >= DEFAULT_CONFIG.failureThreshold) {
      // 连续失败达到阈值，打开熔断器
      entry.state = CircuitState.OPEN;
    }
  }
}

/**
 * 获取熔断器状态
 */
export function getCircuitState(key: CircuitBreakerKey): CircuitState {
  return getOrCreate(key).state;
}

/**
 * 生成工具熔断器 key
 */
export function toolKey(toolName: string): CircuitBreakerKey {
  return `tool:${toolName}`;
}

/**
 * 生成 LLM 熔断器 key
 */
export function llmKey(provider: string): CircuitBreakerKey {
  return `llm:${provider}`;
}

/**
 * 重置所有熔断器（用于测试）
 */
export function resetAllCircuits(): void {
  circuits.clear();
}

/**
 * 获取所有熔断器状态摘要
 */
export function getCircuitSummary(): Record<CircuitBreakerKey, { state: CircuitState; failureCount: number }> {
  const summary: Record<string, { state: CircuitState; failureCount: number }> = {};
  for (const [key, entry] of circuits.entries()) {
    summary[key] = {
      state: entry.state,
      failureCount: entry.failureCount
    };
  }
  return summary;
}
