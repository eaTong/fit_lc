/**
 * V3 Agent Graph - LangGraph StateGraph
 */
import { StateGraph, START, END } from '@langchain/langgraph';
import { AgentStateSchema } from './state';
import { visionNode } from './nodes/vision';
import { llmCallNode } from './nodes/llmCall';
import { toolDispatchNode } from './nodes/toolDispatch';
import { finalReplyNode } from './nodes/finalReply';
import { getCheckpointer } from './checkpointer';

function shouldCallTool(state: any): 'toolDispatch' | 'finalReply' {
  return state.toolCalls?.length > 0 ? 'toolDispatch' : 'finalReply';
}

function shouldContinue(state: any): 'finalReply' {
  return 'finalReply';
}

export function createAgentGraph() {
  const workflow = new StateGraph(AgentStateSchema)
    .addNode('vision', visionNode)
    .addNode('llmCall', llmCallNode)
    .addNode('toolDispatch', toolDispatchNode)
    .addNode('finalReply', finalReplyNode)
    .addEdge(START, 'vision')
    .addEdge('vision', 'llmCall')
    .addConditionalEdges('llmCall', shouldCallTool, {
      'toolDispatch': 'toolDispatch',
      'finalReply': 'finalReply'
    })
    .addConditionalEdges('toolDispatch', shouldContinue, {
      'finalReply': 'finalReply'
    })
    .addEdge('finalReply', END);

  return workflow.compile({ checkpointer: getCheckpointer() });
}

let graph: ReturnType<typeof createAgentGraph> | null = null;
export function getAgentGraph() {
  if (!graph) graph = createAgentGraph();
  return graph;
}