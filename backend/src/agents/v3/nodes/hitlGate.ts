/**
 * HITL Gate Node - Human in the Loop
 * 工具执行前暂停，等待用户确认
 */

import { interrupt, Command } from '@langchain/langgraph';
import type { AgentState } from '../state';

/**
 * 检查是否需要 HITL
 * 当前实现：所有 save_* 操作都需要确认
 */
export function checkHitlRequired(state: AgentState): boolean {
  if (!state.toolCalls?.length) return false;

  const saveTools = ['save_workout', 'save_measurement'];
  return state.toolCalls.some((tc: any) => saveTools.includes(tc.name));
}

/**
 * HITL 节点：中断执行，等待用户确认
 */
export function hitlGateNode(state: AgentState): Partial<AgentState> {
  // 中断执行，返回控制权给前端
  const shouldInterrupt = checkHitlRequired(state);

  if (shouldInterrupt) {
    // 返回 interrupt 信号，前端收到后显示确认弹窗
    return interrupt({
      type: 'tool_confirmation',
      tools: state.toolCalls.map((tc: any) => ({
        name: tc.name,
        input: tc.input,
      })),
      message: '确认执行以下操作？',
    });
  }

  return {};
}

/**
 * 处理用户确认后的恢复
 */
export function handleHitlResume(state: AgentState, command: Command): Partial<AgentState> {
  // 用户确认后继续执行
  if (command.resume === 'approve') {
    return {};
  }

  // 用户拒绝，取消工具调用
  return { toolCalls: [], toolResults: [] };
}