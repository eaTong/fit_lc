import { MissingField } from '../../tools/utils/validation';

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
  clarificationCount: number;  // 澄清轮次计数
}

export interface ClarificationResult {
  success: boolean;
  completedInput?: Record<string, any>;
  reply: string;
  sessionId: string;
  clarificationEnded?: boolean;
}