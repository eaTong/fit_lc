-- ============================================
-- 徽章初始化数据 (badges)
-- ============================================

SET NAMES utf8mb4;

-- 训练类徽章 (category: workout)
INSERT INTO badges (code, name, description, category, condition_type, condition_value, tier, points, created_at) VALUES
-- 首次训练
('first_workout', '初次发力', '完成第一次训练记录', 'workout', 'first', '{"type":"workout"}', 'bronze', 10, NOW()),
-- 训练次数徽章
('workout_10', '训练新秀', '完成10次训练', 'workout', 'count', '{"statType":"total_workouts","count":10}', 'bronze', 20, NOW()),
('workout_50', '训练达人', '完成50次训练', 'workout', 'count', '{"statType":"total_workouts","count":50}', 'silver', 50, NOW()),
('workout_100', '训练高手', '完成100次训练', 'workout', 'count', '{"statType":"total_workouts","count":100}', 'gold', 100, NOW()),
-- PR类徽章
('pr_1', '破茧成蝶', '获得第一个个人记录', 'workout', 'pr', '{}', 'bronze', 15, NOW()),
('pr_10', 'PR猎人', '获得10个个人记录', 'workout', 'count', '{"statType":"pr_count","count":10}', 'silver', 40, NOW());

-- 围度类徽章 (category: measurement)
INSERT INTO badges (code, name, description, category, condition_type, condition_value, tier, points, created_at) VALUES
('first_measurement', '开始测量', '完成第一次围度记录', 'measurement', 'first', '{"type":"measurement"}', 'bronze', 10, NOW()),
('measurement_10', '记录坚持', '完成10次围度记录', 'measurement', 'count', '{"statType":"total_measurements","count":10}', 'bronze', 20, NOW());

-- 连续打卡类徽章 (category: streak)
INSERT INTO badges (code, name, description, category, condition_type, condition_value, tier, points, created_at) VALUES
('streak_3', '连续3天', '连续打卡3天', 'streak', 'streak', '{"days":3}', 'bronze', 15, NOW()),
('streak_7', '一周坚持', '连续打卡7天', 'streak', 'streak', '{"days":7}', 'bronze', 30, NOW()),
('streak_14', '两周自律', '连续打卡14天', 'streak', 'streak', '{"days":14}', 'silver', 60, NOW()),
('streak_30', '一个月', '连续打卡30天', 'streak', 'streak', '{"days":30}', 'gold', 120, NOW()),
('streak_100', '百日蜕变', '连续打卡100天', 'streak', 'streak', '{"days":100}', 'platinum', 300, NOW());

-- 累计训练量类徽章 (category: volume)
INSERT INTO badges (code, name, description, category, condition_type, condition_value, tier, points, created_at) VALUES
('volume_1000', '初窥门径', '累计训练量达到1000kg', 'volume', 'count', '{"statType":"total_volume","count":1000}', 'bronze', 25, NOW()),
('volume_10000', '举重若轻', '累计训练量达到10000kg', 'volume', 'count', '{"statType":"total_volume","count":10000}', 'silver', 60, NOW()),
('volume_100000', '力拔山兮', '累计训练量达到100000kg', 'volume', 'count', '{"statType":"total_volume","count":100000}', 'gold', 150, NOW());

-- ============================================
-- 里程碑初始化数据 (milestones)
-- ============================================

INSERT INTO milestones (code, name, description, category, metric_type, threshold, tier, points, created_at) VALUES
-- 训练次数里程碑
('workout_milestone_10', '训练起步', '完成10次训练', 'consistency', 'total_workouts', 10, 1, 10, NOW()),
('workout_milestone_50', '训练习惯', '完成50次训练', 'consistency', 'total_workouts', 50, 2, 30, NOW()),
('workout_milestone_100', '训练坚持', '完成100次训练', 'consistency', 'total_workouts', 100, 3, 80, NOW()),
-- 连续天数里程碑
('streak_milestone_7', '习惯养成', '连续7天打卡', 'consistency', 'streak_days', 7, 1, 20, NOW()),
('streak_milestone_30', '坚持不懈', '连续30天打卡', 'consistency', 'streak_days', 30, 2, 60, NOW()),
-- 训练量里程碑
('volume_milestone_5000', '力量增长', '累计5000kg训练量', 'volume', 'total_volume', 5000, 1, 25, NOW()),
('volume_milestone_50000', '力量提升', '累计50000kg训练量', 'volume', 'total_volume', 50000, 2, 75, NOW());