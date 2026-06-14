export interface TraceMetadata {
  userId: number;
  sessionId?: string;
  messageId?: number;
  imageCount?: number;
  hasClarificationContext?: boolean;
  agentVersion: 'v2' | 'v3';
}

export interface SpanMetadata {
  step: string;
  retries?: number;
  errorLabel?: string;
}
