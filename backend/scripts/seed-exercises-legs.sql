-- 腿部动作库 seed
-- 目标：110+ 个腿部相关动作
USE fitlc;

-- 获取肌肉 ID
SET @legs_group = (SELECT id FROM muscles WHERE `group` = 'legs' AND parentId IS NULL);
SET @quads = (SELECT id FROM muscles WHERE name = '股四头肌' AND `group` = 'legs');
SET @hamstrings = (SELECT id FROM muscles WHERE name = '腘绳肌' AND `group` = 'legs');
SET @glutes = (SELECT id FROM muscles WHERE name = '臀大肌' AND `group` = 'legs');
SET @calves = (SELECT id FROM muscles WHERE name = '小腿肌群' AND `group` = 'legs');

-- ============================================
-- 杠铃类 (Barbell) - 20 个动作
-- ============================================
INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('杠铃深蹲', 'legs', 'barbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e1 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e1, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e1, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('前深蹲', 'legs', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e2 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e2, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e2, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('后深蹲', 'legs', 'barbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e3 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e3, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e3, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('颈后深蹲', 'legs', 'barbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e4 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e4, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e4, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('高杠深蹲', 'legs', 'barbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e5 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e5, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('低杠深蹲', 'legs', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e6 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e6, @glutes, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e6, @quads, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('暂停深蹲', 'legs', 'barbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e7 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e7, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('箱式深蹲', 'legs', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e8 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e8, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e8, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('安全杠深蹲', 'legs', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e9 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e9, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e9, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('杠铃弓步蹲', 'legs', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e10 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e10, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e10, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('保加利亚深蹲', 'legs', 'barbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e11 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e11, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e11, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('杠铃硬拉', 'legs', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e12 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e12, @hamstrings, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e12, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('相扑硬拉', 'legs', 'barbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e13 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e13, @glutes, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e13, @hamstrings, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('罗马尼亚硬拉', 'legs', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e14 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e14, @hamstrings, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e14, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('直腿硬拉', 'legs', 'barbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e15 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e15, @hamstrings, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('屈腿硬拉', 'legs', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e16 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e16, @hamstrings, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e16, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('早安式', 'legs', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e17 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e17, @hamstrings, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e17, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('腿举', 'legs', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e18 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e18, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e18, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('泽奇深蹲', 'legs', 'barbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e19 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e19, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('手枪深蹲', 'legs', 'barbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e20 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e20, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e20, @glutes, 'secondary');

-- ============================================
-- 哑铃类 (Dumbbell) - 22 个动作
-- ============================================
INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃深蹲', 'legs', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e21 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e21, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e21, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃前深蹲', 'legs', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e22 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e22, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃弓步蹲', 'legs', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e23 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e23, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e23, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃交替弓步', 'legs', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e24 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e24, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e24, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃侧弓步', 'legs', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e25 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e25, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e25, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃保加利亚深蹲', 'legs', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e26 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e26, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e26, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃硬拉', 'legs', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e27 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e27, @hamstrings, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e27, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃直腿硬拉', 'legs', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e28 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e28, @hamstrings, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃腿弯举', 'legs', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e29 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e29, @hamstrings, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃腿伸展', 'legs', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e30 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e30, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃小腿提踵', 'legs', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e31 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e31, @calves, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃站姿小腿提踵', 'legs', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e32 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e32, @calves, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃坐姿小腿提踵', 'legs', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e33 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e33, @calves, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃农夫行走', 'legs', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e34 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e34, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃登阶', 'legs', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e35 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e35, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e35, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃后弓步', 'legs', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e36 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e36, @glutes, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e36, @hamstrings, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃前弓步', 'legs', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e37 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e37, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃行走弓步', 'legs', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e38 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e38, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e38, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃过头深蹲', 'legs', 'dumbbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e39 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e39, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃单腿深蹲', 'legs', 'dumbbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e40 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e40, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃臀推', 'legs', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e41 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e41, @glutes, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃俯卧腿弯举', 'legs', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e42 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e42, @hamstrings, 'primary');

-- ============================================
-- 绳索类 (Cable) - 14 个动作
-- ============================================
INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索腿弯举', 'legs', 'cable', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e43 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e43, @hamstrings, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('站姿绳索腿弯举', 'legs', 'cable', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e44 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e44, @hamstrings, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('俯卧绳索腿弯举', 'legs', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e45 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e45, @hamstrings, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('坐姿绳索腿弯举', 'legs', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e46 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e46, @hamstrings, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('单腿绳索腿弯举', 'legs', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e47 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e47, @hamstrings, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索腿推', 'legs', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e48 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e48, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索髋外展', 'legs', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e49 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e49, @glutes, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索髋内收', 'legs', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e50 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e50, @glutes, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索臀推', 'legs', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e51 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e51, @glutes, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索后踢腿', 'legs', 'cable', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e52 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e52, @glutes, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索侧踢腿', 'legs', 'cable', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e53 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e53, @glutes, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索小腿提踵', 'legs', 'cable', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e54 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e54, @calves, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索深蹲', 'legs', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e55 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e55, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索硬拉', 'legs', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e56 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e56, @hamstrings, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e56, @glutes, 'secondary');

-- ============================================
-- 器械类 (Machine) - 24 个动作
-- ============================================
INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('腿举机', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e57 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e57, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e57, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('腿伸展', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e58 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e58, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('腿弯举机', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e59 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e59, @hamstrings, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('髋外展机', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e60 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e60, @glutes, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('髋内收机', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e61 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e61, @glutes, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('臀推机', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e62 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e62, @glutes, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('倒蹬机', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e63 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e63, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e63, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哈克深蹲机', 'legs', 'machine', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e64 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e64, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e64, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('史密斯机深蹲', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e65 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e65, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e65, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('史密斯机弓步', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e66 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e66, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e66, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('史密斯机硬拉', 'legs', 'machine', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e67 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e67, @hamstrings, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e67, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('小腿提踵机', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e68 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e68, @calves, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('坐姿小腿提踵机', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e69 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e69, @calves, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('站姿小腿提踵机', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e70 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e70, @calves, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('腿伸展机单腿', 'legs', 'machine', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e71 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e71, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('腿弯举机单腿', 'legs', 'machine', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e72 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e72, @hamstrings, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('蝴蝶机髋外展', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e73 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e73, @glutes, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('蝴蝶机髋内收', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e74 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e74, @glutes, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('器械深蹲', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e75 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e75, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e75, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('器械弓步蹲', 'legs', 'machine', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e76 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e76, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e76, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('器械臀推', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e77 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e77, @glutes, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('器械腿弯举俯卧', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e78 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e78, @hamstrings, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('器械腿弯举站姿', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e79 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e79, @hamstrings, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('器械腿伸展坐姿', 'legs', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e80 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e80, @quads, 'primary');

-- ============================================
-- 自重类 (Bodyweight) - 18 个动作
-- ============================================
INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('徒手深蹲', 'legs', 'bodyweight', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e81 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e81, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e81, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('深蹲跳', 'legs', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e82 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e82, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e82, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('弓步蹲', 'legs', 'bodyweight', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e83 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e83, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e83, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('反向弓步', 'legs', 'bodyweight', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e84 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e84, @glutes, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('侧弓步', 'legs', 'bodyweight', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e85 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e85, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e85, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('交替弓步跳', 'legs', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e86 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e86, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e86, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('深蹲跳远', 'legs', 'bodyweight', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e87 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e87, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e87, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('单腿深蹲', 'legs', 'bodyweight', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e88 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e88, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('靠墙深蹲', 'legs', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e89 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e89, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('臀推', 'legs', 'bodyweight', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e90 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e90, @glutes, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('单腿臀推', 'legs', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e91 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e91, @glutes, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('驴式腿弯举', 'legs', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e92 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e92, @hamstrings, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('站姿腿弯举', 'legs', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e93 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e93, @hamstrings, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('小腿提踵', 'legs', 'bodyweight', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e94 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e94, @calves, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('单腿小腿提踵', 'legs', 'bodyweight', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e95 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e95, @calves, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('跳跃深蹲', 'legs', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e96 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e96, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('深蹲行走', 'legs', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e97 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e97, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('蹬阶', 'legs', 'bodyweight', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e98 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e98, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e98, @glutes, 'secondary');

-- ============================================
-- 其他类 (Other) - 16 个动作
-- ============================================
INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('TRX深蹲', 'legs', 'other', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e99 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e99, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('TRX弓步', 'legs', 'other', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e100 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e100, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e100, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('TRX单腿深蹲', 'legs', 'other', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e101 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e101, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('健身球腿弯举', 'legs', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e102 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e102, @hamstrings, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('健身球臀推', 'legs', 'other', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e103 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e103, @glutes, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('健身球靠墙深蹲', 'legs', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e104 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e104, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('壶铃深蹲', 'legs', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e105 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e105, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e105, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('壶铃摆荡', 'legs', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e106 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e106, @hamstrings, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e106, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('壶铃弓步', 'legs', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e107 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e107, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e107, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('药球深蹲跳', 'legs', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e108 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e108, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('弹力带深蹲', 'legs', 'other', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e109 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e109, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('弹力带腿弯举', 'legs', 'other', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e110 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e110, @hamstrings, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('弹力带腿伸展', 'legs', 'other', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e111 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e111, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('雪橇推', 'legs', 'other', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e112 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e112, @quads, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e112, @glutes, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('沙袋深蹲', 'legs', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e113 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e113, @quads, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('战绳深蹲跳', 'legs', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e114 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e114, @quads, 'primary');

SELECT 'Leg exercises seeded successfully! Total: 114' as status;