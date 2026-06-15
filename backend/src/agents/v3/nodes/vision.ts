/**
 * Vision Node
 */
import { preprocessVision } from '../../plugins/visionPreprocessor';
import type { AgentState } from '../state';

export async function visionNode(state: AgentState): Promise<Partial<AgentState>> {
  if (!state.imageUrls?.length) return {};

  const result = await preprocessVision(state.message, state.imageUrls);
  return {
    visionResult: result.error
      ? { message: state.message, error: result.error }
      : { message: result.message, imageAnalysis: result.imageAnalysis }
  };
}