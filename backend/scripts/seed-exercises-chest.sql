-- 胸部肌肉群 seed
-- 上胸、中胸、下胸、前锯肌
USE fitlc;

-- 预获取胸部肌肉ID
SET @chest_parent = (SELECT id FROM muscles WHERE name = '胸部' AND parentId IS NULL LIMIT 1);
SET @upper_chest_id = (SELECT id FROM muscles WHERE name = '上胸' AND parentId = @chest_parent LIMIT 1);
SET @middle_chest_id = (SELECT id FROM muscles WHERE name = '中胸' AND parentId = @chest_parent LIMIT 1);
SET @lower_chest_id = (SELECT id FROM muscles WHERE name = '下胸' AND parentId = @chest_parent LIMIT 1);
SET @serratus_id = (SELECT id FROM muscles WHERE name = '前锯肌' AND parentId = @chest_parent LIMIT 1);

-- 杠铃卧推 related (主要练中胸)
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('杠铃卧推', 'chest', 'barbell', 'beginner', '仰卧凳上，双手握杠铃推起', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @lower_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('上斜杠铃卧推', 'chest', 'barbell', 'intermediate', '仰卧30-45度斜凳，双手握杠铃推起', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('下斜杠铃卧推', 'chest', 'barbell', 'intermediate', '仰卧下斜凳，双手握杠铃推起', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('杠铃仰卧推举', 'chest', 'barbell', 'intermediate', '仰卧水平凳推杠铃', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @lower_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('借力推举', 'chest', 'barbell', 'advanced', '利用腿部驱动推起杠铃', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('窄握杠铃卧推', 'chest', 'barbell', 'intermediate', '双手窄距握杠铃卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('宽握杠铃卧推', 'chest', 'barbell', 'intermediate', '双手宽距握杠铃卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('半程杠铃卧推', 'chest', 'barbell', 'intermediate', '只做半程的杠铃卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('负重杠铃卧推', 'chest', 'barbell', 'advanced', '负重较大的杠铃卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @lower_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('停顿杠铃卧推', 'chest', 'barbell', 'advanced', '在底部停顿后推起的杠铃卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('上斜窄握杠铃卧推', 'chest', 'barbell', 'intermediate', '上斜凳窄握杠铃卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('下斜宽握杠铃卧推', 'chest', 'barbell', 'intermediate', '下斜凳宽握杠铃卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('架上杠铃卧推', 'chest', 'barbell', 'intermediate', '杠铃放在架子上从固定点推起', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('单臂杠铃卧推', 'chest', 'barbell', 'advanced', '单手握杠铃进行卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

-- 哑铃卧推 related
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('哑铃卧推', 'chest', 'dumbbell', 'beginner', '仰卧凳上，双手持哑铃推起', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @lower_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('上斜哑铃卧推', 'chest', 'dumbbell', 'intermediate', '仰卧30-45度斜凳，哑铃推起', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('下斜哑铃卧推', 'chest', 'dumbbell', 'intermediate', '仰卧下斜凳，哑铃推起', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('哑铃仰卧推举', 'chest', 'dumbbell', 'intermediate', '仰卧水平凳哑铃推举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @lower_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('哑铃飞鸟', 'chest', 'dumbbell', 'beginner', '仰卧哑铃飞鸟，锻炼胸外侧', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @lower_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('上斜哑铃飞鸟', 'chest', 'dumbbell', 'intermediate', '仰卧上斜凳哑铃飞鸟', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('下斜哑铃飞鸟', 'chest', 'dumbbell', 'intermediate', '仰卧下斜凳哑铃飞鸟', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('哑铃旋转飞鸟', 'chest', 'dumbbell', 'intermediate', '在飞鸟过程中旋转手腕', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('低位哑铃飞鸟', 'chest', 'dumbbell', 'intermediate', '从低位向上进行哑铃飞鸟', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('高位哑铃飞鸟', 'chest', 'dumbbell', 'intermediate', '从高位向下进行哑铃飞鸟', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('单臂哑铃飞鸟', 'chest', 'dumbbell', 'intermediate', '单手持哑铃进行飞鸟', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('递减组哑铃卧推', 'chest', 'dumbbell', 'advanced', '连续递减重量进行哑铃卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('哑铃轰炸式', 'chest', 'dumbbell', 'advanced', '从头顶向两侧做大的飞鸟动作', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('哑铃双向飞鸟', 'chest', 'dumbbell', 'intermediate', '结合上斜和下斜的复合飞鸟', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @lower_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('对握哑铃卧推', 'chest', 'dumbbell', 'intermediate', '双手对握哑铃进行卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('哑铃半程卧推', 'chest', 'dumbbell', 'intermediate', '只做半程的哑铃卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('上斜哑铃对握卧推', 'chest', 'dumbbell', 'intermediate', '上斜凳对握哑铃卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('哑铃侧屈伸', 'chest', 'dumbbell', 'intermediate', '侧卧哑铃进行胸肌拉伸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @serratus_id, 'secondary');

-- 绳索/龙门架 related
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('龙门架夹胸', 'chest', 'cable', 'beginner', '双手握绳索从两侧向中间夹胸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @lower_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('龙门架上斜夹胸', 'chest', 'cable', 'intermediate', '绳索设置在低位，向上夹胸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('龙门架下斜夹胸', 'chest', 'cable', 'intermediate', '绳索设置在高位，向下夹胸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('单臂龙门架夹胸', 'chest', 'cable', 'intermediate', '单手握绳索进行夹胸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('高位龙门架夹胸', 'chest', 'cable', 'beginner', '绳索在高位进行夹胸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('低位龙门架夹胸', 'chest', 'cable', 'beginner', '绳索在低位进行夹胸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('绳索飞鸟', 'chest', 'cable', 'intermediate', '双手握绳索做飞鸟动作', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('站姿龙门架夹胸', 'chest', 'cable', 'beginner', '站立姿势进行龙门架夹胸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('十字夹胸', 'chest', 'cable', 'intermediate', '双手交叉进行绳索夹胸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('多角度龙门架夹胸', 'chest', 'cable', 'intermediate', '在多个角度进行龙门架夹胸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @lower_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('绳索下斜夹胸', 'chest', 'cable', 'intermediate', '身体前倾向下进行绳索夹胸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('绳索上斜夹胸', 'chest', 'cable', 'intermediate', '身体后仰向上进行绳索夹胸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

-- 器械 related
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('器械卧推', 'chest', 'machine', 'beginner', '使用固定器械进行卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @lower_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('器械上斜卧推', 'chest', 'machine', 'intermediate', '器械上斜凳卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('器械下斜卧推', 'chest', 'machine', 'intermediate', '器械下斜凳卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('蝴蝶机夹胸', 'chest', 'machine', 'beginner', '使用蝴蝶机进行夹胸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('蝴蝶机反向夹胸', 'chest', 'machine', 'intermediate', '蝴蝶机反向锻炼后束', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('器械推胸', 'chest', 'machine', 'beginner', '坐姿器械推胸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @lower_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('悍马机卧推', 'chest', 'machine', 'intermediate', '使用悍马机进行卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('悍马机上斜卧推', 'chest', 'machine', 'intermediate', '悍马机上斜卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('坐姿器械夹胸', 'chest', 'machine', 'beginner', '坐姿使用器械进行夹胸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('史密斯机卧推', 'chest', 'machine', 'beginner', '使用史密斯机进行卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @lower_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('史密斯机上斜卧推', 'chest', 'machine', 'intermediate', '史密斯机上斜卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('史密斯机下斜卧推', 'chest', 'machine', 'intermediate', '史密斯机下斜卧推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('胸肌训练器夹胸', 'chest', 'machine', 'beginner', '使用专用夹胸器械', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

-- 自重 related
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('标准俯卧撑', 'chest', 'bodyweight', 'beginner', '双手撑地，屈臂俯卧撑', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('上斜俯卧撑', 'chest', 'bodyweight', 'beginner', '双手撑在高处进行俯卧撑', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @lower_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('下斜俯卧撑', 'chest', 'bodyweight', 'intermediate', '双脚撑在高处进行俯卧撑', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('宽距俯卧撑', 'chest', 'bodyweight', 'beginner', '双手宽距进行俯卧撑', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('窄距俯卧撑', 'chest', 'bodyweight', 'intermediate', '双手窄距进行俯卧撑', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('跪姿俯卧撑', 'chest', 'bodyweight', 'beginner', '膝盖着地进行俯卧撑', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('钻石俯卧撑', 'chest', 'bodyweight', 'intermediate', '双手拇指和食指接触成钻石形', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('偏重俯卧撑', 'chest', 'bodyweight', 'intermediate', '单手撑在高处进行俯卧撑', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('击掌俯卧撑', 'chest', 'bodyweight', 'advanced', '俯卧撑起身后双手击掌', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('背后击掌俯卧撑', 'chest', 'bodyweight', 'advanced', '俯卧撑起身后双手从背后击掌', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('蛙俯卧撑', 'chest', 'bodyweight', 'intermediate', '双臂张开放松进行俯卧撑', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('长凳俯卧撑', 'chest', 'bodyweight', 'beginner', '双脚放在长凳上进行俯卧撑', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('负重俯卧撑', 'chest', 'bodyweight', 'advanced', '背负重物进行俯卧撑', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('稳定球俯卧撑', 'chest', 'bodyweight', 'advanced', '双脚撑在稳定球上进行俯卧撑', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('TRX俯卧撑', 'chest', 'bodyweight', 'intermediate', '使用TRX带进行俯卧撑', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('爆发式俯卧撑', 'chest', 'bodyweight', 'advanced', '用爆发力推起身体', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('登山俯卧撑', 'chest', 'bodyweight', 'intermediate', '俯卧撑姿势下交替提膝', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('划船式俯卧撑', 'chest', 'bodyweight', 'intermediate', '俯卧撑同时单手划船', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

-- 前锯肌 exercises
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('吊环前锯肌训练', 'chest', 'bodyweight', 'intermediate', '使用吊环锻炼前锯肌', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @serratus_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('前锯肌俯卧撑', 'chest', 'bodyweight', 'intermediate', '专门针对前锯肌的俯卧撑变体', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @serratus_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('药球推举', 'chest', 'other', 'intermediate', '双手将药球向前推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @serratus_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('单臂哑铃推举', 'chest', 'dumbbell', 'intermediate', '单手持哑铃进行推举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @serratus_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('瑜伽球推举', 'chest', 'dumbbell', 'intermediate', '躺在瑜伽球上进行哑铃推举', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('前锯肌旋转', 'chest', 'bodyweight', 'intermediate', '肩胛骨前伸旋转训练', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @serratus_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

-- 综合训练
INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('超级组卧推', 'chest', 'barbell', 'advanced', '杠铃和哑铃卧推连续进行', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @lower_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('复合组飞鸟卧推', 'chest', 'dumbbell', 'advanced', '飞鸟和卧推结合的复合训练', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('胸肌完整训练', 'chest', 'barbell', 'advanced', '包含所有胸肌动作的完整训练', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_chest_id, 'primary'), (@eid, @middle_chest_id, 'primary'), (@eid, @lower_chest_id, 'primary'), (@eid, @serratus_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('上斜优先训练', 'chest', 'dumbbell', 'advanced', '先练上胸再过渡到中下胸', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @upper_chest_id, 'primary'), (@eid, @middle_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('递减组训练', 'chest', 'dumbbell', 'advanced', '每组递减重量不休息', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @lower_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('停息训练组', 'chest', 'barbell', 'advanced', '在力竭点停顿继续推', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary');

INSERT INTO exercises (name, category, equipment, difficulty, description, status, created_at, updated_at) VALUES
('渐进超负荷训练', 'chest', 'barbell', 'advanced', '逐渐增加重量的胸肌训练', 'draft', NOW(3), NOW(3));
SET @eid = LAST_INSERT_ID();
INSERT INTO exercise_muscles (exercise_id, muscle_id, role) VALUES (@eid, @middle_chest_id, 'primary'), (@eid, @upper_chest_id, 'secondary'), (@eid, @lower_chest_id, 'secondary');

SELECT 'Chest exercises seeded successfully!' as status;
