-- 将现有 biceps/thighs/calves 拆分为左右两侧（左右同值）

-- 1. biceps -> biceps_l (保留原记录)
UPDATE measurement_items
SET body_part = 'biceps_l'
WHERE body_part = 'biceps';

-- 2. biceps -> biceps_r (复制新记录)
INSERT INTO measurement_items (measurement_id, body_part, value)
SELECT measurement_id, 'biceps_r', value
FROM measurement_items
WHERE body_part = 'biceps_l';

-- 3. thighs -> thigh_l
UPDATE measurement_items
SET body_part = 'thigh_l'
WHERE body_part = 'thighs';

-- 4. thighs -> thigh_r (复制新记录)
INSERT INTO measurement_items (measurement_id, body_part, value)
SELECT measurement_id, 'thigh_r', value
FROM measurement_items
WHERE body_part = 'thigh_l';

-- 5. calves -> calf_l
UPDATE measurement_items
SET body_part = 'calf_l'
WHERE body_part = 'calves';

-- 6. calves -> calf_r (复制新记录)
INSERT INTO measurement_items (measurement_id, body_part, value)
SELECT measurement_id, 'calf_r', value
FROM measurement_items
WHERE body_part = 'calf_l';