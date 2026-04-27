-- 插入测试用户 (密码: Test123456)
-- Hash generated with bcrypt, 10 salt rounds
INSERT INTO users (email, password_hash, created_at, updated_at) VALUES
  ('test@example.com', '$2b$10$T8GrC4jkU8fWHkLGTJbRD.oKt.SzUXUuCMZ4n0m0k5ADJc66ZheVK', NOW(), NOW())
ON DUPLICATE KEY UPDATE email = email;

-- 获取用户ID和normal角色ID
SET @user_id = (SELECT id FROM users WHERE email = 'test@example.com');
SET @role_id = (SELECT id FROM roles WHERE name = 'normal');

-- 分配角色
INSERT INTO user_roles (user_id, role_id, created_at) VALUES
  (@user_id, @role_id, NOW())
ON DUPLICATE KEY UPDATE user_id = user_id;