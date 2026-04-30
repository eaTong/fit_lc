-- FitLC 完整初始数据 Seed
-- 包含：角色、测试用户、肌肉群、动作库
-- 使用方式：mysql -u root -p fitlc < seed.sql

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================
-- 1. 角色表
-- ============================================
INSERT INTO roles (name, created_at) VALUES ('admin', NOW()), ('normal', NOW())
ON DUPLICATE KEY UPDATE name = name;

-- ============================================
-- 2. 测试用户 (密码: Test123456)
-- ============================================
INSERT INTO users (email, password_hash, created_at, updated_at) VALUES
  ('test@example.com', '$2b$10$T8GrC4jkU8fWHkLGTJbRD.oKt.SzUXUuCMZ4n0m0k5ADJc66ZheVK', NOW(), NOW())
ON DUPLICATE KEY UPDATE email = email;

SET @user_id = (SELECT id FROM users WHERE email = 'test@example.com');
SET @role_id = (SELECT id FROM roles WHERE name = 'normal');

INSERT INTO user_roles (user_id, role_id, created_at) VALUES
  (@user_id, @role_id, NOW())
ON DUPLICATE KEY UPDATE user_id = user_id;

-- ============================================
-- 3. 肌肉层级数据 (6个肌肉群 + 主肌肉)
-- ============================================

-- 胸部
INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('胸部', 'chest', NULL, 1, NOW(3), NOW(3));
SET @chest_id = LAST_INSERT_ID();
INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('上胸', 'chest', @chest_id, 1, NOW(3), NOW(3)),
  ('中胸', 'chest', @chest_id, 2, NOW(3), NOW(3)),
  ('下胸', 'chest', @chest_id, 3, NOW(3), NOW(3)),
  ('前锯肌', 'chest', @chest_id, 4, NOW(3), NOW(3));

-- 背部
INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('背部', 'back', NULL, 2, NOW(3), NOW(3));
SET @back_id = LAST_INSERT_ID();
INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('背阔肌', 'back', @back_id, 1, NOW(3), NOW(3)),
  ('中下斜方肌', 'back', @back_id, 2, NOW(3), NOW(3)),
  ('大圆肌', 'back', @back_id, 3, NOW(3), NOW(3)),
  ('小圆肌', 'back', @back_id, 4, NOW(3), NOW(3)),
  ('竖脊肌', 'back', @back_id, 5, NOW(3), NOW(3));

-- 腿部
INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('腿部', 'legs', NULL, 3, NOW(3), NOW(3));
SET @legs_id = LAST_INSERT_ID();
INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('股四头肌', 'legs', @legs_id, 1, NOW(3), NOW(3)),
  ('腘绳肌', 'legs', @legs_id, 2, NOW(3), NOW(3)),
  ('臀大肌', 'legs', @legs_id, 3, NOW(3), NOW(3)),
  ('小腿肌群', 'legs', @legs_id, 4, NOW(3), NOW(3));

-- 肩部
INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('肩部', 'shoulders', NULL, 4, NOW(3), NOW(3));
SET @shoulders_id = LAST_INSERT_ID();
INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('三角肌前束', 'shoulders', @shoulders_id, 1, NOW(3), NOW(3)),
  ('三角肌中束', 'shoulders', @shoulders_id, 2, NOW(3), NOW(3)),
  ('三角肌后束', 'shoulders', @shoulders_id, 3, NOW(3), NOW(3)),
  ('斜方肌', 'shoulders', @shoulders_id, 4, NOW(3), NOW(3));

-- 臂部
INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('臂部', 'arms', NULL, 5, NOW(3), NOW(3));
SET @arms_id = LAST_INSERT_ID();
INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('肱二头肌', 'arms', @arms_id, 1, NOW(3), NOW(3)),
  ('肱三头肌', 'arms', @arms_id, 2, NOW(3), NOW(3)),
  ('肱肌', 'arms', @arms_id, 3, NOW(3), NOW(3)),
  ('前臂肌群', 'arms', @arms_id, 4, NOW(3), NOW(3));

-- 核心
INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('核心', 'core', NULL, 6, NOW(3), NOW(3));
SET @core_id = LAST_INSERT_ID();
INSERT INTO muscles (name, `group`, parentId, sortOrder, created_at, updated_at) VALUES
  ('腹直肌', 'core', @core_id, 1, NOW(3), NOW(3)),
  ('腹斜肌', 'core', @core_id, 2, NOW(3), NOW(3)),
  ('下背肌群', 'core', @core_id, 3, NOW(3), NOW(3)),
  ('横腹肌', 'core', @core_id, 4, NOW(3), NOW(3));

-- ============================================
-- 4. 动作库 (按肌肉群分类)
-- ============================================

-- 获取肌肉ID变量
SET @chest_parent = (SELECT id FROM muscles WHERE name = '胸部' AND parentId IS NULL LIMIT 1);
SET @upper_chest_id = (SELECT id FROM muscles WHERE name = '上胸' AND parentId = @chest_parent LIMIT 1);
SET @middle_chest_id = (SELECT id FROM muscles WHERE name = '中胸' AND parentId = @chest_parent LIMIT 1);
SET @lower_chest_id = (SELECT id FROM muscles WHERE name = '下胸' AND parentId = @chest_parent LIMIT 1);
SET @serratus_id = (SELECT id FROM muscles WHERE name = '前锯肌' AND parentId = @chest_parent LIMIT 1);

SET @back_parent = (SELECT id FROM muscles WHERE name = '背部' AND parentId IS NULL LIMIT 1);
SET @lat_id = (SELECT id FROM muscles WHERE name = '背阔肌' AND parentId = @back_parent LIMIT 1);
SET @trapezius_id = (SELECT id FROM muscles WHERE name = '中下斜方肌' AND parentId = @back_parent LIMIT 1);

SET @legs_parent = (SELECT id FROM muscles WHERE name = '腿部' AND parentId IS NULL LIMIT 1);
SET @quads_id = (SELECT id FROM muscles WHERE name = '股四头肌' AND parentId = @legs_parent LIMIT 1);
SET @hamstrings_id = (SELECT id FROM muscles WHERE name = '腘绳肌' AND parentId = @legs_parent LIMIT 1);
SET @glutes_id = (SELECT id FROM muscles WHERE name = '臀大肌' AND parentId = @legs_parent LIMIT 1);
SET @calves_id = (SELECT id FROM muscles WHERE name = '小腿肌群' AND parentId = @legs_parent LIMIT 1);

SET @shoulders_parent = (SELECT id FROM muscles WHERE name = '肩部' AND parentId IS NULL LIMIT 1);
SET @front_delt_id = (SELECT id FROM muscles WHERE name = '三角肌前束' AND parentId = @shoulders_parent LIMIT 1);
SET @mid_delt_id = (SELECT id FROM muscles WHERE name = '三角肌中束' AND parentId = @shoulders_parent LIMIT 1);
SET @rear_delt_id = (SELECT id FROM muscles WHERE name = '三角肌后束' AND parentId = @shoulders_parent LIMIT 1);
SET @traps_id = (SELECT id FROM muscles WHERE name = '斜方肌' AND parentId = @shoulders_parent LIMIT 1);

SET @arms_parent = (SELECT id FROM muscles WHERE name = '臂部' AND parentId IS NULL LIMIT 1);
SET @biceps_id = (SELECT id FROM muscles WHERE name = '肱二头肌' AND parentId = @arms_parent LIMIT 1);
SET @triceps_id = (SELECT id FROM muscles WHERE name = '肱三头肌' AND parentId = @arms_parent LIMIT 1);
SET @forearms_id = (SELECT id FROM muscles WHERE name = '前臂肌群' AND parentId = @arms_parent LIMIT 1);

SET @core_parent = (SELECT id FROM muscles WHERE name = '核心' AND parentId IS NULL LIMIT 1);
SET @abs_id = (SELECT id FROM muscles WHERE name = '腹直肌' AND parentId = @core_parent LIMIT 1);
SET @obliques_id = (SELECT id FROM muscles WHERE name = '腹斜肌' AND parentId = @core_parent LIMIT 1);
SET @lower_back_id = (SELECT id FROM muscles WHERE name = '下背肌群' AND parentId = @core_parent LIMIT 1);

-- 胸部动作
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('杠铃卧推', 'chest', 'barbell', 'beginner', '仰卧凳上，双手握杠铃推起', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @lower_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('哑铃卧推', 'chest', 'dumbbell', 'beginner', '仰卧凳上，双手持哑铃推起', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('上斜哑铃推举', 'chest', 'dumbbell', 'intermediate', '30-45度斜凳持哑铃推举', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @upper_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('双杠臂屈伸', 'chest', 'bodyweight', 'intermediate', '双杠支撑做臂屈伸', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @lower_chest_id, 'primary'), (@eid, @triceps_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('龙门架夹胸', 'chest', 'cable', 'beginner', '站立龙门架前做夹胸动作', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @middle_chest_id, 'primary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('俯卧撑', 'chest', 'bodyweight', 'beginner', '地面俯卧撑', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @triceps_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('蝴蝶机夹胸', 'chest', 'machine', 'beginner', '坐姿蝴蝶机夹胸', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @middle_chest_id, 'primary');

-- 背部动作
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('引体向上', 'back', 'bodyweight', 'intermediate', '单杠悬垂引体向上', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @lat_id, 'primary'), (@eid, @biceps_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('杠铃划船', 'back', 'barbell', 'intermediate', '俯身杠铃划船', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @lat_id, 'primary'), (@eid, @traps_id, 'secondary'), (@eid, @biceps_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('高位下拉', 'back', 'cable', 'beginner', '器械高位下拉', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @lat_id, 'primary'), (@eid, @biceps_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('坐姿划船', 'back', 'cable', 'beginner', '坐姿器械划船', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @lat_id, 'primary'), (@eid, @traps_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('哑铃划船', 'back', 'dumbbell', 'intermediate', '单手哑铃划船', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @lat_id, 'primary'), (@eid, @traps_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('直臂下压', 'back', 'cable', 'beginner', '龙门架直臂下压', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @lat_id, 'primary');

-- 腿部动作
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('杠铃深蹲', 'legs', 'barbell', 'beginner', '颈后杠铃深蹲', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @quads_id, 'primary'), (@eid, @glutes_id, 'secondary'), (@eid, @hamstrings_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('哑铃深蹲', 'legs', 'dumbbell', 'beginner', '手持哑铃深蹲', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @quads_id, 'primary'), (@eid, @glutes_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('腿举', 'legs', 'machine', 'beginner', '器械腿举', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @quads_id, 'primary'), (@eid, @glutes_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('腿弯举', 'legs', 'machine', 'beginner', '器械腿弯举', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @hamstrings_id, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('腿伸展', 'legs', 'machine', 'beginner', '器械腿伸展', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @quads_id, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('罗马尼亚硬拉', 'legs', 'barbell', 'intermediate', '杠铃罗马尼亚硬拉', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @hamstrings_id, 'primary'), (@eid, @glutes_id, 'secondary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('臀推', 'legs', 'bodyweight', 'beginner', '仰卧臀推', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @glutes_id, 'primary'), (@eid, @hamstrings_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('提踵', 'legs', 'machine', 'beginner', '器械提踵', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @calves_id, 'primary');

-- 肩部动作
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('哑铃推肩', 'shoulders', 'dumbbell', 'beginner', '坐姿哑铃推肩', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @front_delt_id, 'primary'), (@eid, @mid_delt_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('侧平举', 'shoulders', 'dumbbell', 'beginner', '站姿哑铃侧平举', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @mid_delt_id, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('俯身侧平举', 'shoulders', 'dumbbell', 'intermediate', '俯身哑铃侧平举', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @rear_delt_id, 'primary'), (@eid, @traps_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('面拉', 'shoulders', 'cable', 'intermediate', '龙门架面拉', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @rear_delt_id, 'primary'), (@eid, @traps_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('前平举', 'shoulders', 'dumbbell', 'beginner', '站姿哑铃前平举', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @front_delt_id, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('阿诺德推举', 'shoulders', 'dumbbell', 'intermediate', '哑铃阿诺德推举', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @front_delt_id, 'primary'), (@eid, @mid_delt_id, 'secondary');

-- 臂部动作
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('杠铃弯举', 'arms', 'barbell', 'beginner', '站姿杠铃弯举', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @biceps_id, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('哑铃弯举', 'arms', 'dumbbell', 'beginner', '站姿哑铃弯举', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @biceps_id, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('锤式弯举', 'arms', 'dumbbell', 'beginner', '哑铃锤式弯举', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @biceps_id, 'primary'), (@eid, @forearms_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('龙门架绳索下压', 'arms', 'cable', 'beginner', '龙门架绳索下压', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @triceps_id, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('哑铃臂屈伸', 'arms', 'dumbbell', 'intermediate', '仰卧哑铃臂屈伸', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @triceps_id, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('窄距俯卧撑', 'arms', 'bodyweight', 'intermediate', '窄距俯卧撑', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @triceps_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('集中弯举', 'arms', 'dumbbell', 'beginner', '单手集中弯举', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @biceps_id, 'primary');

-- 核心动作
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('卷腹', 'core', 'bodyweight', 'beginner', '地面仰卧卷腹', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @abs_id, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('平板支撑', 'core', 'bodyweight', 'beginner', '俯卧平板支撑', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @abs_id, 'primary'), (@eid, @obliques_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('俄罗斯转体', 'core', 'bodyweight', 'beginner', '坐姿俄罗斯转体', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @obliques_id, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('山地攀登', 'core', 'bodyweight', 'intermediate', '俯卧山地攀登', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @abs_id, 'primary'), (@eid, @obliques_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('死虫式', 'core', 'bodyweight', 'beginner', '仰卧死虫式', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @abs_id, 'primary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('悬垂举腿', 'core', 'bodyweight', 'advanced', '单杠悬垂举腿', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @abs_id, 'primary'), (@eid, @obliques_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('反向卷腹', 'core', 'bodyweight', 'beginner', '仰卧反向卷腹', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @abs_id, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('平板支撑侧转', 'core', 'bodyweight', 'intermediate', '侧卧平板支撑转体', 'active', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES
  (@eid, @obliques_id, 'primary'), (@eid, @abs_id, 'secondary');

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- 完成提示
-- ============================================
-- SELECT 'Seed completed successfully!' AS status;
-- SELECT COUNT(*) AS roles_count FROM roles;
-- SELECT COUNT(*) AS users_count FROM users;
-- SELECT COUNT(*) AS muscles_count FROM muscles;
-- SELECT COUNT(*) AS exercises_count FROM exercises;
