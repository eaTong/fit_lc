import { clarificationManager } from './ClarificationManager';
import { clarificationStore } from './clarificationStore';
import { generateClarificationReply, isClarificationEnded } from './clarificationPrompts';
import type { MissingField } from '../../tools/utils/validation';

// Re-export everything
export { clarificationManager } from './ClarificationManager';
export { clarificationStore } from './clarificationStore';
export { generateClarificationReply, isClarificationEnded } from './clarificationPrompts';

// Types - defined directly here to ensure they're emitted
export type ClarificationStatus = 'pending' | 'in_progress' | 'completed' | 'expired';

export interface ClarificationSession {
  id: string;
  toolName: string;
  userId: number;
  status: ClarificationStatus;
  createdAt: number;
  expiresAt: number;
  partialInput: Record<string, any>;
  missingFields: MissingField[];
  originalContext: {
    userMessage: string;
    llmInterpretation: string;
  };
  clarificationCount: number;
}

export interface ClarificationResult {
  success: boolean;
  completedInput?: Record<string, any>;
  reply: string;
  sessionId: string;
  clarificationEnded?: boolean;
}