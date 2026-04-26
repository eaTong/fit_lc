-- 肩部动作库 seed
-- 目标：90+ 个肩部相关动作
USE fitlc;

-- 获取肌肉 ID
SET @shoulders_group = (SELECT id FROM muscles WHERE `group` = 'shoulders' AND parentId IS NULL);
SET @ant_delt = (SELECT id FROM muscles WHERE name = '三角肌前束' AND `group` = 'shoulders');
SET @lat_delt = (SELECT id FROM muscles WHERE name = '三角肌中束' AND `group` = 'shoulders');
SET @post_delt = (SELECT id FROM muscles WHERE name = '三角肌后束' AND `group` = 'shoulders');

-- ============================================
-- 杠铃类 (Barbell) - 16 个动作
-- ============================================
INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('杠铃推举', 'shoulders', 'barbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e1 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e1, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e1, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('颈后杠铃推举', 'shoulders', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e2 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e2, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e2, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('阿诺德推举', 'shoulders', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e3 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e3, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e3, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('借力推举', 'shoulders', 'barbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e4 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e4, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e4, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('暂停推举', 'shoulders', 'barbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e5 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e5, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('前平举', 'shoulders', 'barbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e6 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e6, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('站姿杠铃前平举', 'shoulders', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e7 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e7, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('坐姿杠铃推举', 'shoulders', 'barbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e8 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e8, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e8, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('窄握推举', 'shoulders', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e9 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e9, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e9, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('宽握推举', 'shoulders', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e10 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e10, @lat_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e10, @ant_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('杠铃片前平举', 'shoulders', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e11 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e11, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('负重阿诺德推举', 'shoulders', 'barbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e12 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e12, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e12, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('杠铃耸肩', 'shoulders', 'barbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e13 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e13, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('背后耸肩', 'shoulders', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e14 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e14, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('杠铃直立划船', 'shoulders', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e15 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e15, @lat_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e15, @ant_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('宽握直立划船', 'shoulders', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e16 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e16, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('窄握直立划船', 'shoulders', 'barbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e17 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e17, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e17, @lat_delt, 'secondary');

-- ============================================
-- 哑铃类 (Dumbbell) - 22 个动作
-- ============================================
INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃推举', 'shoulders', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e18 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e18, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e18, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('坐姿哑铃推举', 'shoulders', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e19 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e19, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e19, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('阿诺德推举', 'shoulders', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e20 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e20, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e20, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃前平举', 'shoulders', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e21 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e21, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃侧平举', 'shoulders', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e22 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e22, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃俯身侧平举', 'shoulders', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e23 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e23, @post_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃俯身飞鸟', 'shoulders', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e24 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e24, @post_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('单臂哑铃侧平举', 'shoulders', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e25 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e25, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('交替哑铃推举', 'shoulders', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e26 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e26, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e26, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('锤式哑铃推举', 'shoulders', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e27 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e27, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('俯身哑铃划船', 'shoulders', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e28 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e28, @post_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('单臂哑铃推举', 'shoulders', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e29 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e29, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃耸肩', 'shoulders', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e30 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e30, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('单臂哑铃耸肩', 'shoulders', 'dumbbell', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e31 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e31, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('俯卧哑铃推举', 'shoulders', 'dumbbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e32 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e32, @post_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('坐姿俯身哑铃飞鸟', 'shoulders', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e33 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e33, @post_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('站姿哑铃俯身飞鸟', 'shoulders', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e34 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e34, @post_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃直臂侧平举', 'shoulders', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e35 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e35, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('俯身交替哑铃飞鸟', 'shoulders', 'dumbbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e36 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e36, @post_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('上斜哑铃推举', 'shoulders', 'dumbbell', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e37 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e37, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e37, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('下斜哑铃推举', 'shoulders', 'dumbbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e38 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e38, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('哑铃复合推举', 'shoulders', 'dumbbell', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e39 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e39, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e39, @lat_delt, 'secondary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e39, @post_delt, 'secondary');

-- ============================================
-- 绳索类 (Cable) - 16 个动作
-- ============================================
INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索推举', 'shoulders', 'cable', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e40 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e40, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e40, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索前平举', 'shoulders', 'cable', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e41 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e41, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索侧平举', 'shoulders', 'cable', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e42 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e42, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索俯身飞鸟', 'shoulders', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e43 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e43, @post_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('单臂绳索侧平举', 'shoulders', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e44 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e44, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('单臂绳索前平举', 'shoulders', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e45 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e45, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索面拉', 'shoulders', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e46 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e46, @post_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e46, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索反向飞鸟', 'shoulders', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e47 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e47, @post_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索交叉侧平举', 'shoulders', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e48 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e48, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索耸肩', 'shoulders', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e49 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e49, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('高位绳索侧平举', 'shoulders', 'cable', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e50 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e50, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('低位绳索前平举', 'shoulders', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e51 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e51, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('站姿绳索反向飞鸟', 'shoulders', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e52 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e52, @post_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索直立划船', 'shoulders', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e53 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e53, @lat_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e53, @ant_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索锤式侧平举', 'shoulders', 'cable', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e54 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e54, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e54, @lat_delt, 'secondary');

-- ============================================
-- 器械类 (Machine) - 14 个动作
-- ============================================
INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('器械推举', 'shoulders', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e55 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e55, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e55, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('蝴蝶机反向飞鸟', 'shoulders', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e56 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e56, @post_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('蝴蝶机侧平举', 'shoulders', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e57 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e57, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('蝴蝶机前平举', 'shoulders', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e58 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e58, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('史密斯机推举', 'shoulders', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e59 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e59, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e59, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('史密斯机前平举', 'shoulders', 'machine', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e60 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e60, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('器械侧平举', 'shoulders', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e61 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e61, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('器械耸肩', 'shoulders', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e62 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e62, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('器械俯身飞鸟', 'shoulders', 'machine', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e63 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e63, @post_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('坐姿器械推举', 'shoulders', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e64 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e64, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e64, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('反向蝴蝶机', 'shoulders', 'machine', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e65 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e65, @post_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('组合器械肩部推举', 'shoulders', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e66 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e66, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e66, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('器械直臂侧平举', 'shoulders', 'machine', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e67 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e67, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('绳索机械侧平举', 'shoulders', 'machine', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e68 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e68, @lat_delt, 'primary');

-- ============================================
-- 自重类 (Bodyweight) - 12 个动作
-- ============================================
INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('倒立撑', 'shoulders', 'bodyweight', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e69 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e69, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e69, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('墙壁倒立撑', 'shoulders', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e70 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e70, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e70, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('俯卧撑', 'shoulders', 'bodyweight', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e71 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e71, @ant_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('窄距俯卧撑', 'shoulders', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e72 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e72, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e72, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('钻石俯卧撑', 'shoulders', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e73 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e73, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('侧撑肩部外展', 'shoulders', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e74 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e74, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('侧撑转体', 'shoulders', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e75 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e75, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('俯卧肩部收缩', 'shoulders', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e76 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e76, @post_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('超人式肩部', 'shoulders', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e77 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e77, @post_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('臂屈伸肩部外展', 'shoulders', 'bodyweight', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e78 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e78, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('爬行肩部伸展', 'shoulders', 'bodyweight', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e79 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e79, @post_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('熊爬肩部推举', 'shoulders', 'bodyweight', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e80 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e80, @ant_delt, 'primary');

-- ============================================
-- 其他类 (Other) - 14 个动作
-- ============================================
INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('TRX推举', 'shoulders', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e81 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e81, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e81, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('TRX侧平举', 'shoulders', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e82 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e82, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('TRX反向飞鸟', 'shoulders', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e83 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e83, @post_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('健身球俯卧撑', 'shoulders', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e84 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e84, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('壶铃推举', 'shoulders', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e85 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e85, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e85, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('药球推举', 'shoulders', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e86 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e86, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('战绳甩肩', 'shoulders', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e87 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e87, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('弹力带推举', 'shoulders', 'other', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e88 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e88, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('弹力带侧平举', 'shoulders', 'other', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e89 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e89, @lat_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('弹力带前平举', 'shoulders', 'other', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e90 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e90, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('弹力带反向飞鸟', 'shoulders', 'other', 'beginner', false, 'draft', NOW(3), NOW(3));
SET @e91 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e91, @post_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('沙袋推举', 'shoulders', 'other', 'intermediate', false, 'draft', NOW(3), NOW(3));
SET @e92 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e92, @ant_delt, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('吊环推举', 'shoulders', 'other', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e93 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e93, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e93, @lat_delt, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, isVariant, status, created_at, updated_at) VALUES
  ('负重倒立撑', 'shoulders', 'other', 'advanced', false, 'draft', NOW(3), NOW(3));
SET @e94 = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e94, @ant_delt, 'primary');
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@e94, @lat_delt, 'secondary');

SELECT 'Shoulder exercises seeded successfully! Total: 94' as status;