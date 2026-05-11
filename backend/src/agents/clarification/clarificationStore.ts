import { ClarificationSession } from './types';

const TTL_MS = 5 * 60 * 1000; // 5分钟

class ClarificationStore {
  private sessions: Map<number, ClarificationSession> = new Map();

  async save(session: ClarificationSession): Promise<void> {
    this.sessions.set(session.userId, session);
  }

  async get(userId: number): Promise<ClarificationSession | null> {
    const session = this.sessions.get(userId);
    if (!session) return null;

    // 检查是否过期
    if (Date.now() > session.expiresAt) {
      session.status = 'expired';
      this.sessions.delete(userId);
      return null;
    }

    return session;
  }

  async getActive(userId: number): Promise<ClarificationSession | null> {
    const session = await this.get(userId);
    if (!session) return null;
    if (session.status === 'completed' || session.status === 'expired') {
      this.sessions.delete(userId);
      return null;
    }
    return session;
  }

  async update(session: ClarificationSession): Promise<void> {
    this.sessions.set(session.userId, session);
  }

  async delete(userId: number): Promise<void> {
    this.sessions.delete(userId);
  }

  async cleanup(): Promise<void> {
    const now = Date.now();
    for (const [userId, session] of this.sessions.entries()) {
      if (now > session.expiresAt) {
        session.status = 'expired';
        this.sessions.delete(userId);
      }
    }
  }
}

export const clarificationStore = new ClarificationStore();

// 定期清理过期会话
setInterval(() => {
  clarificationStore.cleanup();
}, TTL_MS);