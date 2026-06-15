/**
 * Feature Flags - 功能开关
 */

export interface FeatureFlags {
  useV3Agent: boolean;      // LangGraph V3 Agent
  enableHitl: boolean;       // HITL 人机协作
  enableCheckpoint: boolean;  // Checkpoint 持久化
}

/**
 * 默认配置
 */
const defaultFlags: FeatureFlags = {
  useV3Agent: false,
  enableHitl: false,
  enableCheckpoint: true,
};

/**
 * 从环境变量加载
 */
export function getFeatureFlags(): FeatureFlags {
  return {
    useV3Agent: process.env.FF_USE_V3 === 'true',
    enableHitl: process.env.FF_ENABLE_HITL === 'true',
    enableCheckpoint: process.env.FF_ENABLE_CHECKPOINT !== 'false',
  };
}

/**
 * 获取带默认的配置
 */
export function getFeatureFlagsWithDefaults(): FeatureFlags {
  const env = getFeatureFlags();
  return {
    ...defaultFlags,
    ...env,
  };
}

/**
 * 判断是否使用 V3
 */
export function shouldUseV3(userId?: number): boolean {
  const flags = getFeatureFlagsWithDefaults();

  // 环境变量强制启用
  if (flags.useV3Agent) return true;

  // 可选：按用户 ID 灰度
  if (userId && process.env.FF_V3_PERCENT) {
    const percent = parseInt(process.env.FF_V3_PERCENT, 10);
    return (userId % 100) < percent;
  }

  return false;
}