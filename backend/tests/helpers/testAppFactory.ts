/**
 * Test App Factory - Creates Express app with properly mocked dependencies
 *
 * Usage:
 * ```typescript
 * import { createTestApp } from '../helpers/testAppFactory';
 * import authRouter from '../../src/routes/auth';
 *
 * describe('auth routes', () => {
 *   const { app, mockAuth, cleanDb } = createTestApp();
 *
 *   beforeAll(async () => {
 *     // Create test user and set up auth mock
 *     const user = await createTestUser();
 *     mockAuth(user.id, user.email);
 *   });
 *
 *   afterAll(cleanDb);
 *
 *   it('should work', async () => {
 *     const res = await request(app)
 *       .post('/auth/login')
 *       .send({ email: 'test@example.com', password: 'password123' });
 *     expect(res.status).toBe(200);
 *   });
 * });
 * ```
 */

import request from 'supertest';
import express, { Express, RequestHandler } from 'express';

// Mock auth middleware that injects req.user
export function createMockAuthMiddleware(userId: number, email: string): RequestHandler {
  return (req: any, res: any, next: any) => {
    req.user = { id: userId, email };
    next();
  };
}

// Create test app with mocked dependencies
export function createTestApp() {
  const app = express();
  app.use(express.json());

  // Store mock auth for later modification
  let currentMockAuth: RequestHandler = (req: any, _res: any, next: any) => {
    req.user = { id: 1, email: 'test@test.com' };
    next();
  };

  // Wrapper to apply auth middleware
  const withAuth = (router: any) => {
    const wrapped = express.Router();
    wrapped.use(currentMockAuth);
    wrapped.use(router);
    return wrapped;
  };

  // Helper to set up mock auth
  const mockAuth = (userId: number, email: string) => {
    currentMockAuth = createMockAuthMiddleware(userId, email);
  };

  return {
    app,
    withAuth,
    mockAuth,
    request // supertest request helper
  };
}

// Import test database cleanup
export { cleanDatabase } from '../fixtures/factories';

// Re-export createTestUser for convenience
export { createTestUser } from '../fixtures/factories';
