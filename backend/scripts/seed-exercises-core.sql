-- 核心肌肉群 seed
-- 上腹、下腹、腹斜肌、腹横肌、下背肌群
USE fitlc;

-- 预获取核心肌肉ID
SET @core_parent = (SELECT id FROM muscles WHERE name = '核心' AND parentId IS NULL LIMIT 1);
SET @upper_abs_id = (SELECT id FROM muscles WHERE name = '上腹' AND parentId = @core_parent LIMIT 1);
SET @lower_abs_id = (SELECT id FROM muscles WHERE name = '下腹' AND parentId = @core_parent LIMIT 1);
SET @obliques_id = (SELECT id FROM muscles WHERE name = '腹斜肌' AND parentId = @core_parent LIMIT 1);
SET @transverse_id = (SELECT id FROM muscles WHERE name = '腹横肌' AND parentId = @core_parent LIMIT 1);
SET @lower_back_id = (SELECT id FROM muscles WHERE name = '下背肌群' AND parentId = @core_parent LIMIT 1);

-- 上腹 exercises (primary: upper_abs, secondary: lower_abs, obliques)
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('卷腹', 'core', 'bodyweight', 'beginner', '平躺屈膝，卷腹至肩胛骨离地', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @lower_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('仰卧起坐', 'core', 'bodyweight', 'beginner', '经典腹肌训练，平躺卷腹起身', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @lower_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('上斜板卷腹', 'core', 'bodyweight', 'beginner', '躺在倾斜的训练板上卷腹', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @lower_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('负重卷腹', 'core', 'dumbbell', 'intermediate', '双手持哑铃进行卷腹', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @obliques_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('药球卷腹', 'core', 'other', 'intermediate', '双手持药球进行卷腹', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @lower_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('瑜伽球卷腹', 'core', 'other', 'intermediate', '在瑜伽球上进行卷腹', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @obliques_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('卷腹器械', 'core', 'machine', 'beginner', '使用卷腹器械进行训练', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @lower_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('拉力器卷腹', 'core', 'cable', 'intermediate', '使用拉力器进行卷腹', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @lower_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('交替卷腹', 'core', 'bodyweight', 'beginner', '左右交替进行卷腹', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @obliques_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('V字卷腹', 'core', 'bodyweight', 'intermediate', '卷腹同时抬起双腿形成V字', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @lower_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('罗马椅卷腹', 'core', 'other', 'intermediate', '在罗马椅上固定脚进行卷腹', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @lower_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('平板支撑侧转', 'core', 'bodyweight', 'intermediate', '平板支撑同时转体', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @obliques_id, 'primary'), (@eid, @transverse_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('上斜哑铃卷腹', 'core', 'dumbbell', 'intermediate', '在上斜凳上进行哑铃卷腹', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @lower_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('跪姿卷腹', 'core', 'bodyweight', 'beginner', '跪姿进行卷腹', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @lower_abs_id, 'secondary');

-- 下腹 exercises (primary: lower_abs, secondary: upper_abs)
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('仰卧举腿', 'core', 'bodyweight', 'beginner', '平躺双腿并拢抬起', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_abs_id, 'primary'), (@eid, @transverse_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('悬垂举腿', 'core', 'bodyweight', 'intermediate', '悬挂于单杠，双腿并拢抬起', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_abs_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @obliques_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('反向卷腹', 'core', 'bodyweight', 'beginner', '平躺屈膝，将臀部卷离地面', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_abs_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('仰卧蹬车', 'core', 'bodyweight', 'intermediate', '仰卧交替做蹬车动作', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_abs_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @obliques_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('下斜板举腿', 'core', 'bodyweight', 'intermediate', '头低脚高在斜板上举腿', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_abs_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('坐姿抬腿卷腹', 'core', 'bodyweight', 'intermediate', '坐姿抬腿同时进行卷腹', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_abs_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('仰卧直腿起身', 'core', 'bodyweight', 'intermediate', '平躺直腿抬起上半身', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_abs_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('垂悬单腿举', 'core', 'bodyweight', 'advanced', '悬挂单腿抬起', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_abs_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('仰卧交替抬腿', 'core', 'bodyweight', 'beginner', '平躺交替抬起双腿', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_abs_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('器械举腿', 'core', 'machine', 'beginner', '使用器械进行举腿训练', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_abs_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('绳索举腿', 'core', 'cable', 'intermediate', '双手握绳索进行举腿', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_abs_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('健身球举腿', 'core', 'other', 'intermediate', '仰卧在健身球上进行举腿', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_abs_id, 'primary'), (@eid, @transverse_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('平板交替抬腿', 'core', 'bodyweight', 'intermediate', '平板支撑姿势交替抬腿', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_abs_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

-- 腹斜肌 exercises (primary: obliques)
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('俄罗斯转体', 'core', 'bodyweight', 'beginner', '坐姿抬脚，身体后倾，左右转体', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('侧卧卷腹', 'core', 'bodyweight', 'beginner', '侧卧进行卷腹动作', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('侧平板支撑', 'core', 'bodyweight', 'intermediate', '单侧肘撑保持身体侧向直线', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @transverse_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('悬垂侧举腿', 'core', 'bodyweight', 'intermediate', '悬挂姿势向侧方举腿', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @lower_abs_id, 'secondary'), (@eid, @transverse_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('负重俄罗斯转体', 'core', 'dumbbell', 'intermediate', '手持哑铃进行俄罗斯转体', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('药球俄罗斯转体', 'core', 'other', 'intermediate', '手持药球进行俄罗斯转体', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('侧向伐木', 'core', 'cable', 'intermediate', '绳索机器进行侧向伐木动作', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @transverse_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('跪姿侧向卷腹', 'core', 'bodyweight', 'beginner', '跪姿进行侧向卷腹', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('站姿侧弯', 'core', 'bodyweight', 'beginner', '站立身体向侧弯曲', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('哑铃侧弯', 'core', 'dumbbell', 'beginner', '单手持哑铃进行侧弯', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('交叉卷腹', 'core', 'bodyweight', 'intermediate', '卷腹时肘部触碰对侧膝盖', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('仰卧侧卷腹', 'core', 'bodyweight', 'beginner', '仰卧单侧卷腹', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('绳索侧拉', 'core', 'cable', 'intermediate', '单手拉绳索向侧面', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @transverse_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('侧卧抬腿', 'core', 'bodyweight', 'beginner', '侧卧单侧腿抬起', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @lower_abs_id, 'secondary'), (@eid, @transverse_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('倾斜侧卧卷腹', 'core', 'bodyweight', 'intermediate', '侧卧在倾斜面上卷腹', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('壶铃侧向卷腹', 'core', 'dumbbell', 'intermediate', '手持壶铃进行侧卷腹', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

-- 腹横肌 exercises (primary: transverse)
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('平板支撑', 'core', 'bodyweight', 'beginner', '收紧腹横肌保持平板姿势', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @transverse_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('死虫式', 'core', 'bodyweight', 'intermediate', '仰卧交替伸展对侧手脚', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @transverse_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('鸟狗式', 'core', 'bodyweight', 'intermediate', '四点支撑交替伸展对侧手脚', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @transverse_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('真空腹', 'core', 'bodyweight', 'intermediate', '用力将腹部向内吸保持收缩', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @transverse_id, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('平板支撑侧抬腿', 'core', 'bodyweight', 'intermediate', '平板支撑向侧方抬腿', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @transverse_id, 'primary'), (@eid, @obliques_id, 'secondary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('侧桥', 'core', 'bodyweight', 'beginner', '侧卧用前臂和膝盖撑起身体', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @transverse_id, 'primary'), (@eid, @obliques_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('四点支撑', 'core', 'bodyweight', 'beginner', '双手双膝撑地收紧核心', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @transverse_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('农夫行走', 'core', 'dumbbell', 'beginner', '手持重物行走保持核心收紧', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @transverse_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('臀桥', 'core', 'bodyweight', 'beginner', '仰卧屈膝抬起臀部', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @transverse_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('仰卧收腹', 'core', 'bodyweight', 'beginner', '仰卧用力收紧腹部', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @transverse_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

-- 下背肌群 exercises (primary: lower_back)
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('山羊挺身', 'core', 'other', 'intermediate', '在罗马椅上固定脚进行后仰', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_back_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('俯卧背伸', 'core', 'bodyweight', 'beginner', '俯卧抬起上半身', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_back_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('超人式', 'core', 'bodyweight', 'intermediate', '俯卧同时抬起双臂和双腿', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_back_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @transverse_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('早安式', 'core', 'barbell', 'intermediate', '杠铃置于肩后，屈髋前倾', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_back_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @transverse_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('负重早安式', 'core', 'barbell', 'advanced', '杠铃置于肩后负重进行早安式', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_back_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @transverse_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('俯卧两头起', 'core', 'bodyweight', 'intermediate', '俯卧同时抬起双臂和双腿', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_back_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('罗马椅背伸', 'core', 'other', 'intermediate', '在罗马椅上固定脚进行背伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_back_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('哑铃背伸', 'core', 'dumbbell', 'intermediate', '手持哑铃进行背伸训练', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_back_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('背伸展器', 'core', 'machine', 'beginner', '使用背伸展器械进行训练', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_back_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('俯卧健身球背伸', 'core', 'other', 'intermediate', '俯卧在健身球上进行背伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_back_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @transverse_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('半跪姿背伸', 'core', 'dumbbell', 'intermediate', '半跪姿单手持哑铃进行背伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_back_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('俯卧腿臂伸展', 'core', 'bodyweight', 'intermediate', '俯卧交替伸展单侧腿和臂', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_back_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @transverse_id, 'secondary');

-- 综合核心训练
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('平板支撑保持', 'core', 'bodyweight', 'beginner', '保持平板支撑姿势', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @obliques_id, 'primary'), (@eid, @transverse_id, 'primary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('登山者', 'core', 'bodyweight', 'intermediate', '平板支撑姿势交替提膝', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @lower_abs_id, 'secondary'), (@eid, @obliques_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('腹肌轮训练', 'core', 'other', 'advanced', '使用腹肌轮进行滚动训练', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @obliques_id, 'secondary'), (@eid, @transverse_id, 'secondary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('战绳核心训练', 'core', 'other', 'advanced', '使用战绳进行核心训练', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @obliques_id, 'primary'), (@eid, @transverse_id, 'primary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('TRX核心训练', 'core', 'other', 'advanced', '使用TRX悬挂带进行核心训练', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @obliques_id, 'primary'), (@eid, @transverse_id, 'primary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('药球砸球', 'core', 'other', 'intermediate', '双手举起药球砸向地面', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @obliques_id, 'secondary'), (@eid, @transverse_id, 'secondary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('旋转药球传递', 'core', 'other', 'intermediate', '站姿旋转传递药球', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @transverse_id, 'secondary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('失衡训练', 'core', 'other', 'intermediate', '在不稳定表面上进行核心训练', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @transverse_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @obliques_id, 'secondary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('核心循环训练', 'core', 'bodyweight', 'intermediate', '多个核心动作连续进行', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @lower_abs_id, 'primary'), (@eid, @obliques_id, 'primary'), (@eid, @transverse_id, 'primary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('药球俄挺', 'core', 'other', 'advanced', '在药球上进行俄挺训练', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @transverse_id, 'primary'), (@eid, @obliques_id, 'secondary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('吊环核心', 'core', 'bodyweight', 'advanced', '使用吊环进行核心训练', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @transverse_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @obliques_id, 'secondary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('仰卧腹肌组合', 'core', 'bodyweight', 'intermediate', '仰卧连续完成多种腹肌动作', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @lower_abs_id, 'primary'), (@eid, @obliques_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('悬垂举腿转体', 'core', 'bodyweight', 'advanced', '悬挂举腿同时转体', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_abs_id, 'primary'), (@eid, @obliques_id, 'primary'), (@eid, @upper_abs_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('药球卷腹传递', 'core', 'other', 'intermediate', '仰卧传递药球进行卷腹', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_abs_id, 'primary'), (@eid, @lower_abs_id, 'secondary'), (@eid, @obliques_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('俯卧侧转', 'core', 'bodyweight', 'intermediate', '俯卧抬起上身向侧转', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('半圆球侧平衡', 'core', 'other', 'advanced', '在半圆球上进行侧向平衡训练', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @transverse_id, 'secondary'), (@eid, @lower_back_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('侧卧自行车', 'core', 'bodyweight', 'intermediate', '侧卧做蹬自行车动作', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @obliques_id, 'primary'), (@eid, @upper_abs_id, 'secondary'), (@eid, @lower_abs_id, 'secondary');

SELECT 'Core exercises seeded successfully!' as status;
