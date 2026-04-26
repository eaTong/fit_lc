-- 插入预置角色
INSERT INTO roles (name, created_at) VALUES ('admin', NOW()), ('normal', NOW())
ON DUPLICATE KEY UPDATE name = name;