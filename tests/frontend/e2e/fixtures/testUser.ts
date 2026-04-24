let userCounter = 0;

export interface TestUser {
  email: string;
  password: string;
}

export function generateTestUser(): TestUser {
  userCounter++;
  const timestamp = Date.now();
  return {
    email: `test${timestamp}${userCounter}@example.com`,
    password: 'Test123456',
  };
}