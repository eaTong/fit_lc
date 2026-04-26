-- 背部动作库 seed
-- 目标：92 个背部相关动作
USE fitlc;

-- 获取肌肉 ID
SET @back_group = (SELECT id FROM muscles WHERE `group` = 'back' AND parentId IS NULL);
SET @lat = (SELECT id FROM muscles WHERE name = '背阔肌' AND `group` = 'back');
SET @trap = (SELECT id FROM muscles WHERE name = '中下斜方肌' AND `group` = 'back');
SET @teres_major = (SELECT id FROM muscles WHERE name = '大圆肌' AND `group` = 'back');
SET @teres_minor = (SELECT id FROM muscles WHERE name = '小圆肌' AND `group` = 'back');
SET @erector = (SELECT id FROM muscles WHERE name = '竖脊肌' AND `group` = 'back');

-- ============================================
-- 杠铃类 (Barbell) - 16 个动作
-- ============================================
INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('杠铃划船', 'back', 'barbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e1 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e1, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e1, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('俯身杠铃划船', 'back', 'barbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e2 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e2, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e2, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('T杆划船', 'back', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e3 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e3, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e3, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('单臂T杆划船', 'back', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e4 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e4, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('宽握划船', 'back', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e5 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e5, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e5, @teres_major, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('窄握划船', 'back', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e6 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e6, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e6, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('罗马尼亚硬拉', 'back', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e7 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e7, @erector, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e7, @lat, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('直腿硬拉', 'back', 'barbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e8 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e8, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('屈腿硬拉', 'back', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e9 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e9, @erector, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e9, @lat, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('早安式', 'back', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e10 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e10, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('杠铃耸肩', 'back', 'barbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e11 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e11, @trap, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('背后耸肩', 'back', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e12 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e12, @trap, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('悬垂高翻', 'back', 'barbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e13 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e13, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e13, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('架上拉', 'back', 'barbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e14 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e14, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('六角杠硬拉', 'back', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e15 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e15, @erector, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e15, @lat, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('保加利亚分裂蹲', 'back', 'barbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e16 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e16, @erector, 'primary');

-- ============================================
-- 哑铃类 (Dumbbell) - 18 个动作
-- ============================================
INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃划船', 'back', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e17 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e17, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e17, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('单臂哑铃划船', 'back', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e18 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e18, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e18, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('俯身哑铃划船', 'back', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e19 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e19, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e19, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃耸肩', 'back', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e20 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e20, @trap, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃直臂下压', 'back', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e21 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e21, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃俯卧飞鸟', 'back', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e22 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e22, @teres_major, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e22, @teres_minor, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃硬拉', 'back', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e23 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e23, @erector, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e23, @lat, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃农夫行走', 'back', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e24 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e24, @trap, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃过顶推举', 'back', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e25 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e25, @trap, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃仰卧起坐', 'back', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e26 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e26, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('俯卧哑铃反向飞鸟', 'back', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e27 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e27, @trap, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e27, @teres_minor, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃背屈伸', 'back', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e28 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e28, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('坐姿哑铃划船', 'back', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e29 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e29, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e29, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃风车', 'back', 'dumbbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e30 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e30, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('单臂哑铃耸肩', 'back', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e31 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e31, @trap, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃超人式', 'back', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e32 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e32, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('俯卧哑铃耸肩', 'back', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e33 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e33, @trap, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃侧屈', 'back', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e34 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e34, @erector, 'primary');

-- ============================================
-- 绳索类 (Cable) - 16 个动作
-- ============================================
INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('高位下拉', 'back', 'cable', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e35 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e35, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e35, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('宽握下拉', 'back', 'cable', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e36 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e36, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('窄握下拉', 'back', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e37 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e37, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e37, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('反握下拉', 'back', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e38 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e38, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e38, @teres_major, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('单臂下拉', 'back', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e39 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e39, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('直臂下压', 'back', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e40 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e40, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('坐姿划船', 'back', 'cable', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e41 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e41, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e41, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('V把划船', 'back', 'cable', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e42 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e42, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('宽握划船', 'back', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e43 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e43, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e43, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索面拉', 'back', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e44 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e44, @trap, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e44, @teres_minor, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索反向飞鸟', 'back', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e45 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e45, @trap, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e45, @teres_minor, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('低位绳索划船', 'back', 'cable', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e46 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e46, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('颈后下拉', 'back', 'cable', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e47 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e47, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('过顶绳索伸展', 'back', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e48 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e48, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('单臂绳索划船', 'back', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e49 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e49, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e49, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索耸肩', 'back', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e50 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e50, @trap, 'primary');

-- ============================================
-- 器械类 (Machine) - 16 个动作
-- ============================================
INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('器械划船', 'back', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e51 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e51, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e51, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('器械下拉', 'back', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e52 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e52, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('史密斯机划船', 'back', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e53 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e53, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e53, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('器械耸肩', 'back', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e54 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e54, @trap, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('蝴蝶机反向飞鸟', 'back', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e55 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e55, @trap, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e55, @teres_minor, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('T杆机划船', 'back', 'machine', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e56 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e56, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e56, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('坐姿器械划船', 'back', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e57 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e57, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e57, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('器械背伸展', 'back', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e58 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e58, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('倒蹬机', 'back', 'machine', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e59 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e59, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哈克深蹲机倒蹬', 'back', 'machine', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e60 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e60, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('器械直臂下压', 'back', 'machine', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e61 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e61, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索机械下拉', 'back', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e62 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e62, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('背阔肌下拉机', 'back', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e63 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e63, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('倾斜长凳划船', 'back', 'machine', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e64 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e64, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('俯卧背伸展机', 'back', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e65 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e65, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('坐姿背伸展机', 'back', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e66 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e66, @erector, 'primary');

-- ============================================
-- 自重类 (Bodyweight) - 16 个动作
-- ============================================
INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('引体向上', 'back', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e67 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e67, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e67, @teres_major, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('宽握引体向上', 'back', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e68 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e68, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('窄握引体向上', 'back', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e69 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e69, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e69, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('反握引体向上', 'back', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e70 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e70, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e70, @teres_major, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('辅助引体向上', 'back', 'bodyweight', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e71 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e71, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('负重引体向上', 'back', 'bodyweight', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e72 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e72, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('单臂引体向上', 'back', 'bodyweight', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e73 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e73, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('垂悬举腿', 'back', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e74 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e74, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('俯卧撑', 'back', 'bodyweight', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e75 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e75, @lat, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('背伸展', 'back', 'bodyweight', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e76 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e76, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('超人式', 'back', 'bodyweight', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e77 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e77, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('鸟狗式', 'back', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e78 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e78, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('猫牛式', 'back', 'bodyweight', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e79 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e79, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('平板支撑', 'back', 'bodyweight', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e80 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e80, @erector, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('侧平板支撑', 'back', 'bodyweight', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e81 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e81, @erector, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('死虫式', 'back', 'bodyweight', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e82 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e82, @erector, 'primary');

-- ============================================
-- 其他类 (Other) - 14 个动作
-- ============================================
INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('TRX划船', 'back', 'other', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e83 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e83, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e83, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('TRX引体向上', 'back', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e84 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e84, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('吊环划船', 'back', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e85 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e85, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e85, @trap, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('吊环引体向上', 'back', 'other', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e86 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e86, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('健身球背伸展', 'back', 'other', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e87 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e87, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('健身球超人式', 'back', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e88 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e88, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('战绳甩动', 'back', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e89 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e89, @trap, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('药球砸球', 'back', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e90 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e90, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('壶铃摆荡', 'back', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e91 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e91, @trap, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e91, @lat, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('沙袋背伸展', 'back', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e92 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e92, @erector, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('弹力带划船', 'back', 'other', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e93 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e93, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('弹力带引体向上', 'back', 'other', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e94 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e94, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('弹力带高位下拉', 'back', 'other', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e95 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e95, @lat, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('雪橇拉', 'back', 'other', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e96 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e96, @lat, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e96, @erector, 'secondary');

SELECT 'Back exercises seeded successfully! Total: 96' as status;