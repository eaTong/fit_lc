-- 手臂肌肉群 seed
-- 肱二头肌、肱三头肌、前臂肌群
USE fitlc;

-- 预获取手臂肌肉ID
SET @arms_parent = (SELECT id FROM muscles WHERE name = '手臂' AND parentId IS NULL LIMIT 1);
SET @biceps_id = (SELECT id FROM muscles WHERE name = '肱二头肌' AND parentId = @arms_parent LIMIT 1);
SET @triceps_id = (SELECT id FROM muscles WHERE name = '肱三头肌' AND parentId = @arms_parent LIMIT 1);
SET @forearms_id = (SELECT id FROM muscles WHERE name = '前臂肌群' AND parentId = @arms_parent LIMIT 1);

-- 肱二头肌 exercises (primary: 21, secondary: 22, 23)
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 杠铃弯举
('杠铃弯举', 'arms', 'barbell', 'beginner', '双脚与肩同宽站立，双手握杠铃，弯举至肩部', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 哑铃弯举
('哑铃弯举', 'arms', 'dumbbell', 'beginner', '双手持哑铃，弯举至肩部，可交替或同时进行', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 斜托杠铃弯举
('斜托杠铃弯举', 'arms', 'barbell', 'intermediate', '身体靠在斜托凳上，杠铃弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 斜托哑铃弯举
('斜托哑铃弯举', 'arms', 'dumbbell', 'intermediate', '单臂或双臂在斜托上弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 集中弯举
('集中弯举', 'arms', 'dumbbell', 'beginner', '单手支撑于大腿，弯举哑铃', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 哑铃锤式弯举
('哑铃锤式弯举', 'arms', 'dumbbell', 'beginner', '双手握哑铃，掌心相对，弯举至肩部', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 23, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 交替哑铃弯举
('交替哑铃弯举', 'arms', 'dumbbell', 'beginner', '双手交替弯举哑铃至肩部', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 上斜哑铃弯举
('上斜哑铃弯举', 'arms', 'dumbbell', 'intermediate', '躺在上斜凳上进行哑铃弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 器械弯举
('器械弯举', 'arms', 'machine', 'beginner', '使用弯举机器进行练习', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 绳索弯举
('绳索弯举', 'arms', 'cable', 'intermediate', '使用绳索龙门架进行弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- EZ杆杠铃弯举
('EZ杆杠铃弯举', 'arms', 'barbell', 'beginner', '使用EZ杆进行弯举，减少手腕压力', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 俯卧撑（窄距）
('俯卧撑（窄距）', 'arms', 'bodyweight', 'intermediate', '双手间距窄于肩宽的俯卧撑', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 反握杠铃弯举
('反握杠铃弯举', 'arms', 'barbell', 'intermediate', '手掌向下握杠铃进行弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 23, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 低位绳索弯举
('低位绳索弯举', 'arms', 'cable', 'intermediate', '绳索从低位向上进行弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 健身球弯举
('健身球弯举', 'arms', 'dumbbell', 'intermediate', '躺在健身球上进行哑铃弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 坐姿哑铃弯举
('坐姿哑铃弯举', 'arms', 'dumbbell', 'beginner', '坐在凳子上进行哑铃弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 俯卧板凳弯举
('俯卧板凳弯举', 'arms', 'dumbbell', 'intermediate', '趴在斜板凳上进行单臂弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 拉力器单臂弯举
('拉力器单臂弯举', 'arms', 'cable', 'intermediate', '单手使用拉力器进行弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 变距杠铃弯举
('变距杠铃弯举', 'arms', 'barbell', 'intermediate', '双手间距变化进行杠铃弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 哑铃周期性弯举
('哑铃周期性弯举', 'arms', 'dumbbell', 'advanced', '连续周期性完成弯举动作', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

-- 肱三头肌 exercises (primary: 22, secondary: 21, 23)
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 杠铃仰卧臂屈伸
('杠铃仰卧臂屈伸', 'arms', 'barbell', 'intermediate', '仰卧在凳上，杠铃向下臂屈伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 哑铃俯身臂屈伸
('哑铃俯身臂屈伸', 'arms', 'dumbbell', 'intermediate', '单手支撑身体，另一手哑铃臂屈伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 绳索下压
('绳索下压', 'arms', 'cable', 'beginner', '双手握绳索，从上往下压', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 直杆下压
('直杆下压', 'arms', 'cable', 'beginner', '使用直杆进行下压练习', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- V绳下压
('V绳下压', 'arms', 'cable', 'intermediate', '使用V绳进行下压练习', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 过头绳索臂屈伸
('过头绳索臂屈伸', 'arms', 'cable', 'intermediate', '单臂从头顶向后进行臂屈伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 双杠臂屈伸
('双杠臂屈伸', 'arms', 'bodyweight', 'intermediate', '支撑在双杠上进行臂屈伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 凳上臂屈伸
('凳上臂屈伸', 'arms', 'bodyweight', 'beginner', '双手支撑在凳子上进行臂屈伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 哑铃颈后臂屈伸
('哑铃颈后臂屈伸', 'arms', 'dumbbell', 'beginner', '双手或单手将哑铃从颈后放下再举起', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 杠铃颈后臂屈伸
('杠铃颈后臂屈伸', 'arms', 'barbell', 'intermediate', '双手将杠铃从颈后放下再举起', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 器械臂屈伸
('器械臂屈伸', 'arms', 'machine', 'beginner', '使用器械进行臂屈伸练习', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 窄距俯卧撑
('窄距俯卧撑', 'arms', 'bodyweight', 'beginner', '双手间距很窄的俯卧撑', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 自重臂屈伸
('自重臂屈伸', 'arms', 'bodyweight', 'intermediate', '利用身体重量进行臂屈伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 背后臂屈伸
('背后臂屈伸', 'arms', 'bodyweight', 'intermediate', '身体后仰，双手撑在身后进行臂屈伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 器械下压
('器械下压', 'arms', 'machine', 'beginner', '使用下压器械进行练习', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 低位滑轮下压
('低位滑轮下压', 'arms', 'cable', 'intermediate', '从低位置进行滑轮下压', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 上斜哑铃臂屈伸
('上斜哑铃臂屈伸', 'arms', 'dumbbell', 'intermediate', '躺在上斜凳上进行哑铃臂屈伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 站姿哑铃臂屈伸
('站姿哑铃臂屈伸', 'arms', 'dumbbell', 'beginner', '站立，双手持哑铃进行臂屈伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 仰卧哑铃臂屈伸
('仰卧哑铃臂屈伸', 'arms', 'dumbbell', 'beginner', '仰卧持哑铃进行臂屈伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 跪姿杠铃臂屈伸
('跪姿杠铃臂屈伸', 'arms', 'barbell', 'intermediate', '跪姿进行杠铃颈后臂屈伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

-- 前臂肌群 exercises (primary: 23, secondary: 21, 22)
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 杠铃腕弯举
('杠铃腕弯举', 'arms', 'barbell', 'beginner', '坐在凳上，双手持杠铃进行腕弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 哑铃腕弯举
('哑铃腕弯举', 'arms', 'dumbbell', 'beginner', '单手持哑铃进行腕弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 反握腕弯举
('反握腕弯举', 'arms', 'dumbbell', 'beginner', '手掌向下进行腕弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 农夫行走
('农夫行走', 'arms', 'dumbbell', 'beginner', '双手持重物行走', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 握力器练习
('握力器练习', 'arms', 'other', 'beginner', '使用握力器进行练习', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 悬垂重物
('悬垂重物', 'arms', 'barbell', 'intermediate', '用手指悬挂杠铃或重物', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 杠铃背后腕弯举
('杠铃背后腕弯举', 'arms', 'barbell', 'intermediate', '杠铃置于身后进行腕弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 哑铃反向腕弯举
('哑铃反向腕弯举', 'arms', 'dumbbell', 'beginner', '手掌向下握住哑铃进行反向弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 弹力带手腕练习
('弹力带手腕练习', 'arms', 'other', 'beginner', '使用弹力带进行手腕练习', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 手掌朝上握杆
('手掌朝上握杆', 'arms', 'barbell', 'intermediate', '手掌朝上握住杠铃进行练习', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 哑铃手指练习
('哑铃手指练习', 'arms', 'dumbbell', 'beginner', '用手指单独控制哑铃', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 负重悬垂
('负重悬垂', 'arms', 'other', 'advanced', '悬挂重物保持姿势', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 铁锤腕弯举
('铁锤腕弯举', 'arms', 'dumbbell', 'beginner', '握拳姿势进行腕弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 绳索腕弯举
('绳索腕弯举', 'arms', 'cable', 'intermediate', '使用绳索机器进行腕弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 哑铃静态握力
('哑铃静态握力', 'arms', 'dumbbell', 'beginner', '握住哑铃保持不动', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 链条握力练习
('链条握力练习', 'arms', 'other', 'intermediate', '使用链条进行握力练习', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 吊环悬垂
('吊环悬垂', 'arms', 'bodyweight', 'intermediate', '握住吊环保持悬垂', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 手指俯卧撑
('手指俯卧撑', 'arms', 'bodyweight', 'advanced', '用手指代替手掌进行俯卧撑', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 负重手指俯卧撑
('负重手指俯卧撑', 'arms', 'bodyweight', 'advanced', '手指俯卧撑加负重', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 速握练习
('速握练习', 'arms', 'other', 'intermediate', '快速开合手指进行练习', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 23, 'primary');

-- 组合动作 exercises (涉及多块肌肉)
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 哑铃二头三头组合
('哑铃二头三头组合', 'arms', 'dumbbell', 'intermediate', '连续进行弯举和臂屈伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'primary'), (@eid, 23, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 器械臂部组合
('器械臂部组合', 'arms', 'machine', 'intermediate', '使用组合器械同时锻炼二头三头', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'primary'), (@eid, 23, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 站姿杠铃弯举+臂屈伸
('站姿杠铃弯举+臂屈伸', 'arms', 'barbell', 'advanced', '连续进行弯举和颈后臂屈伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 超级组（弯举+下压）
('超级组（弯举+下压）', 'arms', 'cable', 'intermediate', '弯举和下压连续进行无休息', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'primary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 递减组弯举
('递减组弯举', 'arms', 'dumbbell', 'advanced', '每组减少重量不休息继续弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 递减组臂屈伸
('递减组臂屈伸', 'arms', 'dumbbell', 'advanced', '每组减少重量不休息继续臂屈伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 三头肌完整训练
('三头肌完整训练', 'arms', 'cable', 'advanced', '包含所有三头肌动作的完整训练', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary'), (@eid, 23, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 二头肌完整训练
('二头肌完整训练', 'arms', 'barbell', 'advanced', '包含所有二头肌动作的完整训练', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary'), (@eid, 23, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 哑铃全身臂部
('哑铃全身臂部', 'arms', 'dumbbell', 'intermediate', '用哑铃完成所有臂部动作', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'primary'), (@eid, 23, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 站姿臂部循环
('站姿臂部循环', 'arms', 'dumbbell', 'intermediate', '连续完成多个臂部动作', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'primary'), (@eid, 23, 'primary');

-- 变体动作
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 单臂哑铃弯举
('单臂哑铃弯举', 'arms', 'dumbbell', 'beginner', '单独用一只手进行哑铃弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 单臂绳索下压
('单臂绳索下压', 'arms', 'cable', 'beginner', '单独用一只手进行绳索下压', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 偏重哑铃弯举
('偏重哑铃弯举', 'arms', 'dumbbell', 'intermediate', '使用不同重量进行弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 支撑哑铃弯举
('支撑哑铃弯举', 'arms', 'dumbbell', 'beginner', '手臂支撑在斜面进行弯举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 21, 'primary'), (@eid, 22, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 仰卧杠铃臂屈伸
('仰卧杠铃臂屈伸', 'arms', 'barbell', 'intermediate', '仰卧进行杠铃臂屈伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
-- 屈臂板臂屈伸
('屈臂板臂屈伸', 'arms', 'bodyweight', 'intermediate', '在屈臂板上进行臂屈伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, 22, 'primary'), (@eid, 21, 'secondary');

SELECT 'Arms exercises seeded successfully!' as status;
