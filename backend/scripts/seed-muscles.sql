-- 肌肉层级数据 seed
-- 6个肌肉群（level 1） + 主肌肉（level 2）
USE fitlc;

-- 胸部 (chest)
INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('胸部', 'chest', NULL, 1, NOW(3), NOW(3));

SET @chest_id = LAST_INSERT_ID();

INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('上胸', 'chest', @chest_id, 1, NOW(3), NOW(3)),
  ('中胸', 'chest', @chest_id, 2, NOW(3), NOW(3)),
  ('下胸', 'chest', @chest_id, 3, NOW(3), NOW(3)),
  ('前锯肌', 'chest', @chest_id, 4, NOW(3), NOW(3));

-- 背部 (back)
INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('背部', 'back', NULL, 2, NOW(3), NOW(3));

SET @back_id = LAST_INSERT_ID();

INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('背阔肌', 'back', @back_id, 1, NOW(3), NOW(3)),
  ('中下斜方肌', 'back', @back_id, 2, NOW(3), NOW(3)),
  ('大圆肌', 'back', @back_id, 3, NOW(3), NOW(3)),
  ('小圆肌', 'back', @back_id, 4, NOW(3), NOW(3)),
  ('竖脊肌', 'back', @back_id, 5, NOW(3), NOW(3));

-- 腿部 (legs)
INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('腿部', 'legs', NULL, 3, NOW(3), NOW(3));

SET @legs_id = LAST_INSERT_ID();

INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('股四头肌', 'legs', @legs_id, 1, NOW(3), NOW(3)),
  ('腘绳肌', 'legs', @legs_id, 2, NOW(3), NOW(3)),
  ('臀大肌', 'legs', @legs_id, 3, NOW(3), NOW(3)),
  ('小腿肌群', 'legs', @legs_id, 4, NOW(3), NOW(3));

-- 肩部 (shoulders)
INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('肩部', 'shoulders', NULL, 4, NOW(3), NOW(3));

SET @shoulders_id = LAST_INSERT_ID();

INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('三角肌前束', 'shoulders', @shoulders_id, 1, NOW(3), NOW(3)),
  ('三角肌中束', 'shoulders', @shoulders_id, 2, NOW(3), NOW(3)),
  ('三角肌后束', 'shoulders', @shoulders_id, 3, NOW(3), NOW(3));

-- 手臂 (arms)
INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('手臂', 'arms', NULL, 5, NOW(3), NOW(3));

SET @arms_id = LAST_INSERT_ID();

INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('肱二头肌', 'arms', @arms_id, 1, NOW(3), NOW(3)),
  ('肱三头肌', 'arms', @arms_id, 2, NOW(3), NOW(3)),
  ('前臂肌群', 'arms', @arms_id, 3, NOW(3), NOW(3));

-- 核心 (core)
INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('核心', 'core', NULL, 6, NOW(3), NOW(3));

SET @core_id = LAST_INSERT_ID();

INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('上腹', 'core', @core_id, 1, NOW(3), NOW(3)),
  ('下腹', 'core', @core_id, 2, NOW(3), NOW(3)),
  ('腹斜肌', 'core', @core_id, 3, NOW(3), NOW(3)),
  ('腹横肌', 'core', @core_id, 4, NOW(3), NOW(3)),
  ('下背肌群', 'core', @core_id, 5, NOW(3), NOW(3));

SELECT 'Muscles seeded successfully!' as status;