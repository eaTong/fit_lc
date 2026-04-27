-- AI 生成的 arms 动作详情
USE fitlc;

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('杠铃弯举', 'arms', 'barbell', 'beginner', NULL, '1. 站立，双脚与肩同宽，双手反握杠铃，握距略宽于肩，手臂自然下垂，杠铃位于大腿前方。\n2. 保持核心收紧，背部挺直，目视前方，肩胛骨微微后收下沉。\n3. 吸气，同时弯曲肘关节，将杠铃向肩部方向卷起，保持上臂垂直于地面，仅前臂移动。\n4. 当杠铃接近肩部时，肱二头肌完全收缩，在顶峰位置保持1-2秒，感受肌肉挤压。\n5. 呼气，缓慢将杠铃下放回起始位置，手臂完全伸展，控制重量不要借力摇晃。\n6. 重复进行规定次数，动作全程保持稳定控制，避免借助身体摆动发力。', '1. 使用适当的重量，初学者建议从较轻杠铃开始练习，确保能够控制动作轨迹。\n2. 保持核心稳定和背部挺直，避免弓背或过度前倾，下背部如有不适应立即停止。\n3. 避免在动作顶部锁死肘关节，完全锁死会增加关节压力，应保持轻微弯曲。', '1. 借助身体摆动发力：上半身前后摆动借助惯性抬起重量，降低锻炼效果且增加受伤风险。\n2. 上臂移动：弯举过程中上臂跟随前臂移动，改变了锻炼角度，应固定上臂仅前臂动作。\n3. 动作速度过快：快速完成动作无法充分刺激肌肉，应保持2-3秒的控制节奏。', '可以根据身高调整站距，较高的人可适当加宽站距。对于肩部灵活性较差的人群，可将握距收窄或使用EZ杆减少手腕压力。初学者建议先掌握正确姿势后再增加重量，动作质量优先于负重。', 'isolation', '{"变体类型":"可转换为哑铃弯举进行单侧孤立训练，或使用EZ杆减少手腕压力，也可采用牧师凳弯举固定上臂位置增强孤立效果。","升级建议":"增加难度可尝试锤式弯举、斜托弯举或集中弯举等变体动作。","降级建议":"简化可采用站姿或坐姿哑铃弯举，降低重量并专注于动作控制。"}', 'published', NOW(3), NOW(3));
SET @eid_86 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前三角肌 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 站立，双脚与肩同宽，双手各持一只哑铃，手臂自然下垂，掌心向内。\n2. 保持上臂固定，仅通过屈肘将哑铃向上举起至肩部高度，动作全程保持肘部靠近身体两侧。\n3. 在顶峰位置稍作停顿，感受二头肌的收缩。\n4. 缓慢放下哑铃，回到起始位置，保持控制不要让哑铃自由下落。\n5. 重复动作，保持呼吸：举起时吸气，下放时呼气。', '1. 确保使用合适的哑铃重量，避免因重量过大导致动作失控。\n2. 保持背部挺直，避免弓背或借助腰背力量来完成动作。\n3. 在动作全程保持肘部固定，防止肘关节过度移动造成伤害。', '1. 摆动身体或利用惯性举起哑铃，导致二头肌刺激不足。\n2. 肘部外展或向前移动，使前臂承担过多负荷。\n3. 动作过快或在下降阶段失去控制，增加受伤风险。', '如果肩部活动受限，可略微前倾上半身，保持肘部位置不变；若手腕不适，可使用中立握法（掌心相对）减轻手腕压力；初学者可先从轻重量练起，逐步增加负重。', 'isolation', '{"变体类型":"可转换为哑铃锤式弯举（锤式握法）以侧重肱肌和肱桡肌；可使用倾斜凳进行上斜弯举以增加伸展范围；可改为坐姿弯举以固定上臂，减少借力。"}', 'published', NOW(3), NOW(3));
SET @eid_87 = LAST_INSERT_ID();
-- Suggested muscle: 二头肌（肱二头肌） (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)
-- Suggested muscle: 三角肌前部 (stabilizer)
-- Suggested muscle: 三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('斜托杠铃弯举', 'arms', 'barbell', 'intermediate', NULL, '1. 调整斜托凳角度至约45-60度，将胸部靠在斜托垫上，双手握住杠铃，握距与肩同宽，双臂完全伸展垂于凳前。\n2. 确保上臂始终垂直于地面，与地面保持平行，这是动作的固定支点。\n3. 呼气，利用肱二头肌收缩的力量向上弯举杠铃，手腕保持中立位。\n4. 在动作顶端完全收缩肱二头肌，停留1-2秒，感受肌肉紧绷。\n5. 吸气，缓慢控制下放杠铃，直到手臂完全伸直，保持肌肉张力。\n6. 重复完成指定次数，整个过程中上臂位置始终保持不变。', '1. 确保斜托凳的垫子调整到合适高度，防止身体在动作过程中滑落。\n2. 选择合适的重量，避免借助身体摆动完成动作，控制是关键。\n3. 手腕保持自然位置，不要过度屈曲或后仰，以防手腕受伤。', '1. 上臂在动作过程中前后移动或抬起，失去了固定支点，变成了复合动作。\n2. 借助身体摆动或惯性举起重量，这会减少肱二头肌的刺激。\n3. 下放速度过快，没有控制，缺乏离心收缩，影响训练效果。', '1. 可调整斜托凳角度来改变动作难度和肌肉刺激点，较陡角度增加顶峰收缩。
2. 改变握距可调整肱二头肌不同头的刺激，窄握侧重长头，宽握侧重短头。
3. 训练中如感到下背不适，可在凳上放一个垫子减少压力。', 'isolation', '{"哑铃斜托弯举":"使用哑铃可更好观察动作轨迹，纠正左右力量不平衡问题","牧师凳杠铃弯举":"将斜托凳调整为垂直角度，增加动作难度和肌肉控制要求","EZ杆斜托弯举":"使用EZ杆减少手腕压力，对手腕柔韧性要求较低"}', 'published', NOW(3), NOW(3));
SET @eid_88 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('斜托哑铃弯举', 'arms', 'dumbbell', 'intermediate', NULL, '1. 调整斜托凳至约45-60度，坐在凳子上，双手各持一只哑铃，手臂自然下垂，手掌朝前。\n2. 收紧核心，背部靠在凳背上，保持胸部略微挺起，避免弓背。\n3. 吸气，同时弯曲肘部，将哑铃向上提拉至肩部两侧，保持上臂紧贴身体。\n4. 在顶峰位置（哑铃接近肩部）稍作停顿，用力收缩肱二头肌，感受肌肉紧绷。\n5. 呼气，缓慢将哑铃放回起始位置，手臂完全伸展但避免锁死关节。\n6. 重复进行所需次数，保持动作平稳，不要借助身体摆动。', '1. 确保斜托凳稳固，凳腿锁紧，防止在使用过程中滑动或倾倒。\n2. 选择合适的重量，避免因重量过大导致动作失控或肩部、腰部受伤。\n3. 开始前进行手臂、肩部和背部的热身活动，以降低肌腱拉伤的风险。', '1. 通过身体摆动或抬肩来提升哑铃，导致目标肌肉受力不足。\n2. 动作幅度不够，只做半程收缩，未能充分伸展或收缩肱二头肌。\n3. 使用过宽或过窄的握距，手腕过度屈曲，增加手腕和前臂的压力。', '1. 斜托角度可以根据个人柔韧性和目标肌肉进行调整，角度越大（更倾斜）对上背部的刺激越大，角度越小（更接近水平）更集中于二头肌。
2. 若感到肩部不适，可略微降低凳子倾斜角度，或在胸前放置软垫以减轻肩关节压力。
3. 对于手腕舒适度，可尝试使用中性握法（手掌相对）或稍微外旋的握法，以适应不同的解剖结构。', 'isolation', '{"变体类型":"可将该动作转换为单臂斜托哑铃弯举以加强单侧控制，或使用斜托杠铃弯举、斜托绳索弯举等变体，以改变负荷曲线和肌肉感受。"}', 'published', NOW(3), NOW(3));
SET @eid_89 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三头肌 (antagonist)
-- Suggested muscle: 前三角肌 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('集中弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 坐在凳子边缘，双脚平放地面，间距与肩同宽，保持背部挺直。\n2. 右手握住哑铃，手臂自然垂下，手肘靠近右腿内侧，手掌朝向身体。\n3. 保持上臂固定不动，仅通过弯曲手肘将哑铃向上举起，动作过程中呼气。\n4. 在顶峰位置稍作停顿（约1-2秒），充分挤压二头肌。\n5. 缓慢将哑铃放下回到起始位置，动作过程中吸气，控制速度不要借助惯性。\n6. 完成设定的次数后，换左手进行相同的动作。', '1. 保持核心收紧，避免背部过度弯曲或拱起，确保脊柱处于中立位置。\n2. 控制动作速度，尤其是放下阶段，避免哑铃快速下落造成肌肉拉伤。\n3. 选择适当重量，确保在规范动作范围内能够完成全程，避免因重量过大而借助身体摆动。', '1. 利用身体摆动借力，而不是通过二头肌发力完成动作，降低训练效果。\n2. 上臂位置不稳定，在动作过程中上下移动或向外侧移动，无法孤立刺激目标肌肉。\n3. 动作幅度不完整，肘关节未完全伸展或弯曲未达顶峰，影响肌肉收缩效果。', '新手建议从轻重量开始，重点建立正确的动作模式和肌肉感知。随着技术熟练度提高，可逐步增加负重或调整握法（掌心向上或中立握法）来改变刺激角度。背部有问题的练习者可选择靠背凳辅助支撑。', 'isolation', '{"哑铃品牌":"使用绳索机替代哑铃，保持手臂位置不变，可提供更稳定的阻力曲线。","重力方向":"将手臂搭在倾斜凳上，从下方单手拉起哑铃，改变发力角度刺激二头肌。","双侧训练":"转为站姿双手同时进行锤式弯举，可提高训练效率但减少孤立程度。"}', 'published', NOW(3), NOW(3));
SET @eid_90 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃锤式弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 站立或坐姿，双手各持一只哑铃，手掌相对（中立握法），手臂自然下垂于身体两侧，肘部贴近躯干。\n2. 保持上臂固定不动，仅通过弯曲肘部将哑铃向上举起，专注于肱肌的收缩。\n3. 继续向上弯举至哑铃接近肩部水平位置，在顶峰位置略作停顿，充分收缩目标肌肉。\n4. 缓慢有控制地将哑铃下放回至起始位置，保持肌肉的张力，避免完全伸直手臂。\n5. 重复完成规定的次数后换另一侧进行。', '1. 保持核心收紧，避免通过摇晃身体借力举起哑铃。\n2. 控制动作速度，尤其是下落阶段要缓慢有控，避免关节冲击。\n3. 确保肘部全程贴近身体两侧，避免外展导致肩部代偿。', '1. 使用惯性摆动或借助身体晃动举起哑铃，降低训练效果并增加受伤风险。\n2. 肘部随动作外展或向前移动，导致肩部三角肌前束参与发力。\n3. 动作范围不完整，在顶部未充分收缩或底部未完全放下。', '1. 可调整为坐姿进行，减少下背部的压力。
2. 可在斜板上进行偏向锤式的弯举，强化肱肌的伸展范围。
3. 可采用交替单臂进行，增加核心稳定性的参与。', 'isolation', '{"替代动作":"可用杠铃弯举（掌心向上握法）替代，侧重肱二头肌；可用EZ杆弯举减少腕部压力。","强度提升":"可采用递减组或暂停-休息训练法增加肌肉刺激。","降阶调整":"可减轻重量或减少每组次数，降低动作难度。","姿势变化":"可斜靠在上斜凳上进行，增加肌肉拉伸范围。"}', 'published', NOW(3), NOW(3));
SET @eid_91 = LAST_INSERT_ID();
-- Suggested muscle: 肱肌 (agonist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 肱二头肌 (synergist)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 三角肌前束 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('交替哑铃弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 站立，双脚与肩同宽，手握哑铃，手臂自然垂于体侧，掌心朝前。\n2. 保持上臂固定，只有前臂向上弯曲，将哑铃卷至肩部高度，二头肌顶峰收缩。\n3. 在顶峰稍作停顿，感受二头肌的收缩，然后缓慢放下哑铃至初始位置。\n4. 完成一侧后，换另一侧交替进行，或按计划交替进行。\n5. 重复所需次数，保持呼吸均匀（上升时呼气，下降时吸气）。', '• 确保背部挺直，避免利用背部或身体摆动提升哑铃。\n• 使用合适重量的哑铃，防止因重量过大导致肩关节或手腕受伤。\n• 动作全程保持手腕中立，避免手腕过度屈曲或扭转。', '• 上臂前后摆动，导致二头肌刺激减弱。\n• 使用过重的哑铃借助惯性完成动作。\n• 下降时未控制速度，冲击手臂关节。', '• 初学者可先练习单臂交替，以更好地感受二头肌发力。
• 如有肩部不适，可将手臂略微外展或改为斜板弯举减轻肩部压力。
• 通过调节哑铃重量和次数来适应不同的训练目标（力量、耐力）。', 'isolation', '{"变体类型":"单臂交替哑铃弯举 / 锤式弯举 / 斜板弯举","转换建议":"如果想增加前臂参与，可转为锤式弯举；如果需要减轻肩部负担，可改为斜板弯举或集中弯举。"}', 'published', NOW(3), NOW(3));
SET @eid_92 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('上斜哑铃弯举', 'arms', 'dumbbell', 'intermediate', NULL, '1. 调整凳子倾斜角度至约30-45度，双手各持一只哑铃，坐姿靠背，双手自然下垂，掌心朝上。\n2. 保持上背部紧贴凳面，收腹，肩胛骨微微后收，固定肩部，避免在弯举时出现耸肩。\n3. 吸气时，利用二头肌的力量向上弯举哑铃至肩膀高度，手肘保持贴近身体侧面，避免向外展开。\n4. 在顶峰位置稍作停顿，感受二头肌的收缩，然后呼气，缓慢放下哑铃至初始位置，保持控制。\n5. 完成所需次数后，换手或继续进行下一组，保持动作的连贯性和节奏。', '1. 运动前检查哑铃重量是否合适，避免超负荷导致受伤。\n2. 保持肘部贴近身体，防止肘部外展导致肩部过度受力。\n3. 在整个动作过程中保持背部贴靠凳面，避免弓背或扭腰。', '1. 将哑铃向外摆动，导致肩部参与过多。\n2. 动作过快，使用惯性完成弯举，降低肌肉刺激。\n3. 肘部在下降时提前伸展或过度伸展，导致关节压力。', '1. 调整凳子倾斜角度：角度越大，二头肌的拉伸范围更大，但重量需相应减小。
2. 握距可以稍宽或稍窄，以改变对二头肌长头和短头的刺激。
3. 若肩部不适，可在弯举时略微内收肘部，降低肩部参与。', 'isolation', '{"平凳哑铃弯举":"将凳子调至水平或略微倾斜，保持相同的握法和动作轨迹，可直接转换。","杠铃上斜弯举":"使用杠铃代替哑铃，握距稍宽，注意控制杠铃的平衡。","Cable机器上斜弯举":"将滑轮固定在低位，使用绳索手柄，提供恒定阻力有助于保持张力。"}', 'published', NOW(3), NOW(3));
SET @eid_93 = LAST_INSERT_ID();
-- Suggested muscle: 二头肌（Biceps brachii） (agonist)
-- Suggested muscle: 肱肌（Brachialis） (synergist)
-- Suggested muscle: 前三角肌（Anterior deltoid） (stabilizer)
-- Suggested muscle: 肱桡肌（Brachioradialis） (synergist)
-- Suggested muscle: 腕屈肌（Flexor carpi） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('器械弯举', 'arms', 'machine', 'beginner', NULL, '1. 调整器械座椅高度，使手臂自然垂下时，手柄与肩膀平齐或略低。\n2. 双手握住手柄，掌心向上，手肘贴紧身体两侧，肩部放松。\n3. 呼气时，利用二头肌的力量向上弯举手柄，直到手臂完全弯曲，二头肌达到顶峰收缩。\n4. 在顶峰保持1-2秒，感受二头肌的收缩，然后吸气，缓慢放下手柄至起始位置，手臂保持微屈，避免完全伸直。\n5. 重复完成设定的次数，保持动作的平稳与控制，避免使用惯性。', '1. 在开始前检查器械的锁定装置是否稳固，确保座椅与把手无松动。\n2. 动作全程保持背部挺直，避免借助背部力量或摆动身体。\n3. 若感到肩部、手腕或手肘有明显不适，应立即停止并请教教练或医护人员。', '1. 使用过大的重量导致动作变形，耸肩或借助身体摆动完成弯举。\n2. 在放下手柄时让手臂完全伸直，失去对二头肌的持续张力。\n3. 手肘外张或离开身体侧面，降低了对目标肌肉的刺激并增加肩部压力。', '1. 调整座椅高度使手柄在起始位置与肩膀平行或略低，确保手肘在全程保持贴近身体。
2. 如手腕有不适，可略微调节手柄的旋转角度或使用带垫的手柄。
3. 根据个人柔韧性，适当调节背垫的倾斜角度，以保持背部自然弧度。', 'isolation', '{"杠铃弯举":"使用杠铃进行站姿弯举时，需要保持核心稳定，重量可适当增加，适合进阶训练。","哑铃弯举":"哑铃提供更大的动作幅度，可进行交替弯举或锤式弯举，增加肌肉的协同刺激。","绳索下压":"在龙门架上使用绳索进行弯举，能够在整个动作范围内保持恒定阻力，提高肌肉张力。"}', 'published', NOW(3), NOW(3));
SET @eid_94 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前三角肌 (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索弯举', 'arms', 'cable', 'intermediate', NULL, '1. 调整器械滑轮至低位，选择合适的绳索把手并连接好。\n2. 站立于器械正前方，双脚与肩同宽，保持身体直立和稳定。\n3. 双手正握把手，上臂紧贴身体两侧，前臂自然下垂，肘关节朝向正前方。\n4. 呼气，通过肱二头肌发力，弯曲肘关节，将把手向肩部方向拉起。\n5. 在动作顶峰位置稍作停顿（1-2秒），确保肱二头肌充分收缩。\n6. 吸气，缓慢控制地将把手放回起始位置，保持肌肉张力，直到手臂完全伸直。', '1. 始终保持上臂贴近身体两侧，避免在动作过程中前后摆动导致肩部受伤。\n2. 控制动作速度，避免使用惯性或爆发力，尤其是下放阶段要缓慢有控制。\n3. 从较轻重量开始练习，确保动作模式正确后再逐步增加负荷。', '1. 上臂离开身体或向前移动，借用肩部力量完成动作。\n2. 使用过重重量导致身体前后晃动，借助惯性完成动作。\n3. 动作速度过快，尤其是向心收缩阶段缺乏控制，影响肌肉刺激效果。', '1. 滑轮高度调整：低位滑轮针对长头，高位滑轮针对短头。
2. 把手选择：直杆把手侧重整体，绳索把手加强离心收缩。
3. 站姿变化：可调整为单手交替训练，或调整双脚前后位置改变发力角度。', 'isolation', '{"哑铃弯举":"哑铃版本允许更大的运动幅度和更自由的握法，可单手交替训练，适合需要更多手腕旋转或寻求不同角度刺激时转换。","杠铃弯举":"杠铃版本适合使用更大重量进行复合训练，双手握距可调整改变刺激重点，适合作为力量训练的主要动作。","牧师凳弯举":"使用牧师凳可以固定上臂，进一步孤立肱二头肌，减少借助惯性，适合突破力量 plateau 时使用。"}', 'published', NOW(3), NOW(3));
SET @eid_95 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 前臂屈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('EZ杆杠铃弯举', 'arms', 'barbell', 'beginner', NULL, '1. 站立，双脚与肩同宽，双手握住 EZ 杠铃，手掌向上，握距略窄于肩宽。\n2. 保持上臂贴近身体，肘部稍微弯曲，收紧核心，保持背部自然直立。\n3. 吸气，仅使用二头肌的力量向上弯举杠铃，动作全程上臂保持固定，只让前臂运动。\n4. 当杠铃举至胸部高度，二头肌达到顶峰收缩时，保持1-2秒，感受二头肌的紧绷。\n5. 呼气，缓慢将杠铃放回起始位置，保持控制，避免快速下降。\n6. 重复8-12次，完成设定的训练组数。', '使用合适的重量，避免过重导致肩部或手腕受伤。,在举重前检查杠铃是否锁紧，防止杠铃滑落。,全程保持肘部贴近身体，避免肘部外展导致关节受力过大。', '摆动身体或使用惯性举起重量，导致目标肌肉受力减弱。,上臂在动作过程中向外移动或抬起，变成肩部发力。,动作全程未完全伸展或未达到顶峰收缩，训练效果下降。', '初学者可先采用较轻的 EZ 杠铃，确保动作规范后再逐渐增加重量；如果手腕不适，可尝试稍微调整握把角度或使用护腕；若想更孤立二头肌，可在斜托凳上进行斜托弯举，或改用哑铃进行单侧控制练习。', 'isolation', '{"哑铃弯举":"将 EZ 杠铃换成等重的哑铃，可增加单侧控制并提供更大的活动范围。","斜托弯举":"在倾斜的凳子上进行，可进一步减轻背部参与，更集中刺激二头肌。","宽握 vs 窄握":"宽握侧重二头肌短头，窄握更侧重长头，可根据想要的外观或弱点进行选择。"}', 'published', NOW(3), NOW(3));
SET @eid_96 = LAST_INSERT_ID();
-- Suggested muscle: 二头肌（Biceps brachii） (agonist)
-- Suggested muscle: 肱肌（Brachialis） (synergist)
-- Suggested muscle: 肱桡肌（Brachioradialis） (synergist)
-- Suggested muscle: 前臂屈肌群（Forearm flexors） (stabilizer)
-- Suggested muscle: 前束三角肌（Anterior deltoid） (stabilizer)
-- Suggested muscle: 三头肌（Triceps brachii） (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('俯卧撑（窄距）', 'arms', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：双手间距略窄于肩宽，手指指向前方，身体从头到脚呈一直线，核心收紧。\n2. 吸气，屈肘慢慢下降身体，保持肘部紧贴躯干，肩胛骨自然收拢。\n3. 下降到胸部接近地面或手掌高度，保持背部平直，避免塌腰或拱背。\n4. 呼气，用手推压地面，伸直手臂，将身体推回起始姿势，保持核心稳定。\n5. 重复动作，保持呼吸节奏和动作控制。', '1. 确保手掌稳固支撑，避免手腕过度内旋导致受伤。\n2. 下降过程中保持脊柱中立，避免出现塌腰或拱背的情况。\n3. 如出现肩部或手腕不适，应立即停止并调整姿势或降低难度。', '1. 手距过宽或肘部外张，导致肩部受力过大。\n2. 下降时腰部塌陷，形成不良的背部弧线。\n3. 动作速度过快，缺少对肌肉的控制，降低训练效果。', '1. 初学者可在膝盖处放置垫子，减轻核心负担。
2. 如手腕不适，可将手放在稍高的平台上或使用握拳姿势。
3. 通过调节手距（更窄或更宽）来改变三头肌或胸肌的参与程度。', 'compound', '{"宽距俯卧撑":"将双手间距扩大至肩宽的1.5倍以上，主要加强胸大肌的刺激。","跪姿俯卧撑":"膝盖着地，降低整体负荷，适合初学者或恢复期训练。","负重俯卧撑":"在背部放置杠铃或穿戴负重背心，提升阻力，增强力量。","单手俯卧撑":"单手支撑进行动作，提高核心稳定性和单侧力量。"}', 'published', NOW(3), NOW(3));
SET @eid_97 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌 (agonist)
-- Suggested muscle: 胸大肌 (synergist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 背阔肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('反握杠铃弯举', 'arms', 'barbell', 'intermediate', NULL, '1. 站立，双脚与肩同宽，双手反握杠铃（掌心向下），握距略宽于肩部。2. 保持上臂固定垂直于地面，肩膀放松下沉，避免耸肩。3. 呼气时，收缩肱二头肌和前臂肌肉，将杠铃向上弯举至肩膀高度。4. 在动作顶端稍微停顿，挤压前臂和二头肌以获得最大收缩。5. 吸气时，缓慢控制地下放杠铃至手臂完全伸展，但不要完全锁定肘关节。6. 保持核心收紧，背部挺直，整个过程中避免身体晃动借力。', '1. 切勿使用过重重量，以免导致前臂和手腕受伤，应选择可以控制的标准重量进行练习。2. 动作过程中保持肩胛骨稳定，避免耸肩和身体前后摆动，必要时可寻求教练指导纠正姿势。3. 如果感到手腕或前臂有刺痛或不适，应立即停止并检查握法和姿势是否正确。', '1. 身体前后摆动借力，导致二头肌和前臂的锻炼效果大大降低。2. 在动作过程中耸肩，使斜方肌过度参与，减少目标肌群的刺激。3. 使用过重的重量导致动作变形，无法完成标准动作范围。', '初学者建议从较轻的杠铃或EZ杆开始练习，以掌握正确姿势；如果手腕感到不适可将握距稍微收窄或改用EZ杆；想要增加难度可尝试在最高点保持2-3秒的离心收缩；固定手腕位置可帮助更好孤立前臂肌肉。', 'isolation', '{"变体类型":"可改用哑铃进行单臂反握弯举以增加动作灵活性和单侧训练；使用EZ杆可减轻手腕压力；做牧师凳反握弯举可更好固定上臂减少借力。","转换建议":"如果想增加难度可转换为锤式弯举或坐姿反握弯举；如果想针对前臂内侧可转换到正握杠铃弯举。","主训练方向":"反握弯举更强调前臂伸肌和肱桡肌，适合想要强化前臂力量和握力的训练者。","训练配对":"可与正握弯举或锤式弯举搭配进行综合手臂训练，平衡前后侧肌肉发展。"}', 'published', NOW(3), NOW(3));
SET @eid_98 = LAST_INSERT_ID();
-- Suggested muscle: 肱桡肌 (agonist)
-- Suggested muscle: 桡侧腕短伸肌 (agonist)
-- Suggested muscle: 肱二头肌（外侧头） (synergist)
-- Suggested muscle: 旋前圆肌 (synergist)
-- Suggested muscle: 掌长肌 (synergist)
-- Suggested muscle: 三角肌（前束） (stabilizer)
-- Suggested muscle: 斜方肌（下部） (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('低位绳索弯举', 'arms', 'cable', 'intermediate', NULL, '1. 面向低位滑轮机，双脚分开与肩同宽站立，核心收紧保持身体稳定。\n2. 双手握住绳索手柄，手肘弯曲约90度，上臂紧贴身体两侧，肩胛骨轻微后收下沉。\n3. 保持上臂位置固定，通过收缩肱二头肌发力，将绳索向上拉起，同时双手向外旋转至掌心朝上。\n4. 继续向上提拉直至前臂与地面基本平行，感受肱二头肌充分收缩。\n5. 在顶峰位置停留1-2秒，刻意挤压肱二头肌以加强泵感。\n6. 缓慢有控制地将绳索放回起始位置，手肘始终保持90度弯曲状态，重复完成规定次数。', '1. 保持核心收紧，避免在动作过程中过度后仰或摆动身体借力。\n2. 肘关节应始终保持贴紧身体两侧，防止肩部前伸导致肩关节压力过大。\n3. 动作全程保持平稳呼吸，下放阶段不要突然松力，以免重量拉伤肌肉。', '1. 肘关节外张或前移，使用肩部力量代偿发力，降低肱二头肌的锻炼效果。\n2. 身体晃动或借助惯性完成动作，无法有效刺激目标肌肉且增加受伤风险。\n3. 动作速度过快，尤其是在下放阶段缺乏控制，导致肌肉收缩时间不足且容易受伤。', '可以根据训练目标调整握法：采用正握（掌心向上）重点锻炼肱二头肌短头；采用反握或中立握可增加肱肌和肱桡肌的参与。调整滑轮高度可以改变动作的力学优势，较低位置对长头刺激更强。', 'isolation', '{"徒手训练":"可使用弹力带进行站姿弯举，固定弹力带一端于低位，模仿相同动作轨迹。","杠铃/哑铃训练":"可转换为站姿杠铃弯举或哑铃锤式弯举，保持相似的发力方式和肌肉激活模式。","器械训练":"可使用牧师凳弯举器械或龙门架进行单臂绳索弯举，调整肘部支撑点以改变训练强度。","自重训练":"较难完全替代，建议通过高位下拉或引体向上辅助强化肱二头肌。"}', 'published', NOW(3), NOW(3));
SET @eid_99 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 肱三头肌 (antagonist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('健身球弯举', 'arms', 'dumbbell', 'intermediate', NULL, '1. 准备姿势：俯卧在健身球上，双脚分开与肩同宽踩在地面稳定支撑，双手各握一只哑铃，手臂自然下垂于身体两侧，掌心向上。\n2. 起始位置：肩部向前微微送出，手臂伸直但肘关节不要完全锁死，保持轻微弯曲，躯干稳定在健身球上。\n3. 弯举动作：保持上臂固定不动，仅通过弯曲肘关节发力，将哑铃向肩部方向举起，同时呼气。在动作顶端时，肱二头肌应该充分收缩。\n4. 顶峰收缩：停顿1-2秒，充分感受肱二头肌的发力和挤压。\n5. 还原动作：吸气，保持上臂固定，缓慢将哑铃放回起始位置，控制速度不要让哑铃自由下落。\n6. 重复练习：按要求的次数重复动作，换边练习或交替进行。', '1. 选择适当的哑铃重量，避免因重量过重导致姿势变形或失去平衡从健身球上跌落。\n2. 确保健身球充气适当且稳定，在动作过程中保持核心收紧以维持身体平衡。\n3. 动作过程中保持肘部靠近身体，避免肘关节向两侧打开导致肩关节承受额外压力。', '1. 使用过重的哑铃，导致上半身在健身球上晃动或摆动身体借力完成动作。\n2. 动作速度过快，没有在顶峰位置做充分收缩，降低了对目标肌肉的刺激效果。\n3. 身体在健身球上位置不正确，如臀部过高或过低，导致肩部或腰部承受额外压力。', '初学者可以先双脚靠拢站得更宽以增加稳定性，或先在稳定平面上练习哑铃弯举再过渡到健身球；进阶者可以采用单手练习或进行交替弯举增加难度；如感到颈部不适可以在额头下垫一个软垫。', 'isolation', '{"难度降低变体":"在平板长凳或稳定支撑面上进行哑铃弯举，消除不稳定因素","难度提高变体":"在健身球上进行单臂弯举，或使用绳索器械增加阻力曲线变化","替代动作":"杠铃弯举、牧师凳弯举、EZ杆弯举等都可以作为替代练习","场地限制调整":"没有哑铃时可用弹力带绕过脚进行弯举；没有健身球时可用稳定平面替代"}', 'published', NOW(3), NOW(3));
SET @eid_100 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 核心肌群 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('坐姿哑铃弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 坐在哑铃凳上，双脚平放地面，背部挺直紧贴靠背，双手各持一个哑铃，手臂自然下垂于身体两侧，手掌朝前。\n2. 保持上臂固定不动，仅通过弯曲肘部发力，将哑铃向上举起，动作过程中呼气。\n3. 继续向上弯举，直至哑铃达到肩部高度，肱二头肌充分收缩，在顶峰位置停顿1-2秒。\n4. 慢慢将哑铃下放回起始位置，动作过程中吸气，保持对重量的控制，不要让哑铃自由下落。\n5. 重复完成指定次数后，换另一侧手臂进行训练。', '1. 保持背部始终紧贴靠背，避免在弯举过程中弓背或过度后仰，以防腰椎受伤。\n2. 选择适合自己能力的重量，避免使用过重哑铃导致动作变形或肩关节、肘关节损伤。\n3. 动作全程保持缓慢控制，切勿借助身体摆动或惯性完成动作，以减少受伤风险。', '1. 借助身体摆动借力：在弯举时前后摆动身体或使用惯性，这会大幅降低对肱二头肌的刺激效果。\n2. 上臂移动或肩膀前伸：在动作过程中肩膀参与发力，导致目标肌肉训练效果不佳，应保持上臂始终垂直地面。\n3. 动作速度过快：快速完成动作无法充分刺激肌肉，同时增加了肌腱受伤的风险，应保持2-3秒的起落节奏。', '初学者建议选择较轻重量的哑铃，先掌握正确的动作姿势。可通过调整凳子靠背角度（倾斜30-45度）来改变训练难度和肌肉刺激角度。如果感到手腕压力过大，可以使用曲杆或采用中立握法（掌心相对）来减轻前臂和手腕的负担。', 'isolation', '{"站姿变体":"转为站姿哑铃弯举，需要更强的核心稳定性和肩部固定能力，适合想要增加整体稳定性的训练者。","斜板变体":"使用斜板（30-45度倾斜）进行单臂或双臂弯举，可以更好地固定上臂，孤立刺激肱二头肌。","牧师凳变体":"使用牧师凳固定上臂，消除肩部代偿，适合针对肱二头肌顶峰进行精确定位训练。","锤式变体":"改变握法为掌心相对，采用锤式弯举，可以更多地刺激肱肌和肱桡肌，增加手臂围度。"}', 'published', NOW(3), NOW(3));
SET @eid_101 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('俯卧板凳弯举', 'arms', 'dumbbell', 'intermediate', NULL, '1. 调整斜凳角度（约30-45度），双手各持一只哑铃，俯卧在凳子上，胸部贴紧凳面，手臂自然垂向地面。\n2. 保持上臂固定，仅通过弯曲肘部将哑铃向上提起，确保前臂向胸部靠拢。\n3. 在顶峰位置（即哑铃接近肩部）时，稍作停顿，感受到二头肌完全收缩。\n4. 慢慢放下哑铃，保持控制，避免猛然下落导致关节冲击。\n5. 完成预定次数后，换另一侧手臂重复，或在同侧完成全部次数后再换边。\n6. 训练结束后将哑铃安全放回地面或架子上。', '1. 斜凳必须稳固固定，避免在动作过程中滑动或倾斜。\n2. 使用适当重量的哑铃，避免因负荷过大导致姿势失控或受伤。\n3. 动作全程保持核心收紧，避免腰部过度拱起，以减少背部压力。', '1. 将肘部向外展开或耸肩，导致肩部参与过度，减弱二头肌刺激。\n2. 在下降阶段让哑铃自由下落，缺乏控制，易导致肘关节冲击。\n3. 身体在斜凳上晃动或使用惯性抬起哑铃，使动作不再是纯粹的二头肌收缩。', '1. 初学者可将斜凳角度调低，以减轻肩部负担并更容易保持正确姿势。
2. 若感到肩部不适，可将凳面稍微放平或使用较轻的哑铃进行适应。
3. 对于高级训练者，可在顶峰位置进行短暂等长收缩，或在动作中加入偏心阶段的暂停，以提升训练强度。', 'isolation', '{"站姿哑铃弯举":"从俯卧板凳弯举转为站姿弯举时，需保持上臂固定，避免借助身体摆动；可适当调整重量以适应不同的发力方式。"}', 'published', NOW(3), NOW(3));
SET @eid_102 = LAST_INSERT_ID();
-- Suggested muscle: 二头肌（肱二头肌） (agonist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前臂屈肌群 (synergist)
-- Suggested muscle: 肩部前束 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 三角肌后束 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('拉力器单臂弯举', 'arms', 'cable', 'intermediate', NULL, '1. 将拉力器的滑轮调至低位，大约与肘部同高，确保滑轮固定不晃动。\n2. 站姿，双脚与肩同宽，核心收紧，保持背部挺直，避免弓背。\n3. 单手握住绳索手柄，手掌向上（前臂旋后）或保持中立握法，肘部紧贴身体侧。\n4. 通过屈肘将重量向上举起，至手臂完全弯曲、手腕靠近肩膀位置，保持前臂垂直于地面。\n5. 在最高点稍作停顿，感受二头肌的收缩，然后控制速度慢慢放下至起始位置，保持肌肉张力。\n6. 完成所需次数后换另一只手重复，注意保持动作的连贯性和平衡。', '确保滑轮和绳索无损坏、连接牢固，避免在训练过程中滑轮掉落。,始终保持背部挺直，避免使用背部摆动来举起重量，以防止腰椎受伤。,使用合适的重量，避免过重导致肘部外展或动作失控，从而增加肩关节和肘部的受伤风险。', '举起时躯干或肩部摆动，导致借力而非单臂孤立刺激二头肌。,肘部向外展开或向前移动，失去对上臂二头肌的完全孤立。,下降过程过快，缺乏控制，导致肌肉拉伸不充分并增加关节冲击。', '可以通过调节滑轮高度（低位/中位）改变阻力角度；更换不同手柄（绳索、杆或手环）来改变握法；如需增加难度，可在站立时略微倾斜身体或使用加重块。', 'isolation', '{"哑铃单臂弯举":"将绳索换成等长的哑铃，保持肘部固定并使用相同的运动范围，以哑铃重量替代拉力器的阻力。","阻力带单臂弯举":"使用弹性阻力带替代绳索，固定在低位或中位，保持中立或旋后握法，弹性阻力随拉伸程度变化。","坐姿拉力器弯举":"在坐姿凳上进行此动作，背部靠背保持挺直，减少躯干摆动，同时仍保持单臂孤立刺激二头肌。"}', 'published', NOW(3), NOW(3));
SET @eid_103 = LAST_INSERT_ID();
-- Suggested muscle: 上臂二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)
-- Suggested muscle: 腹肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃周期性弯举', 'arms', 'dumbbell', 'advanced', NULL, '1. 站立姿，双脚与肩同宽，双手各持一只哑铃，手臂自然下垂，掌心朝向前方，保持背部挺直，核心收紧。2. 将右侧哑铃向上弯举，同时将手腕向外旋转（Supination），在动作最高点时收紧二头肌，保持顶峰收缩1-2秒。3. 缓慢控制地将哑铃放下，同时将手腕转回中立位置（手臂伸直但不完全锁死）。4. 立即开始左侧手臂的同样动作，形成周期性交替。5. 保持躯干稳定，避免前后摇摆或借助身体惯性，专注于手臂肌肉的控制与发力。6. 交替完成设定的重复次数（如每侧8-12次），完成后将哑铃安全放回地面。', '1. 使用适当的重量，确保动作全程可控，避免因重量过大导致技术变形或肌肉拉伤。2. 保持核心持续收紧以支撑脊柱，避免在动作过程中出现下背部过度弯曲或骨盆前倾。3. 避免在动作顶端完全锁死肘关节，以减少关节压力并保持肌肉张力。', '1. 躯干前后摆动或借助惯性发力，这将减少目标肌群的刺激并增加下背部受伤风险。2. 动作幅度不足，只进行半程弯举，无法充分拉伸和收缩二头肌。3. 手腕位置不稳定，出现过度屈曲或伸展，导致前臂过早疲劳。', '对于初学者或灵活性受限的人群，可以先从较小的动作幅度开始，逐步增加活动范围；也可以先进行单侧练习以确保动作质量后再转为交替模式。此外，可以通过调整椅子高度来进行坐姿版本以减轻下背部的压力。', 'isolation', '{"侧重点改变":"可转换为锤式弯举（交替）以更多刺激肱桡肌，手腕保持中立位置。","双手同步":"可转换为双手同时弯举的常规版本，提高训练效率。","器材转换":"可将哑铃替换为杠铃进行双手同步弯举，或使用EZ杆减少手腕压力。","强度提升":"可采用预疲劳法则，先进行划船动作再进行弯举，或采用递减组训练。"}', 'published', NOW(3), NOW(3));
SET @eid_105 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 背阔肌 (antagonist)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('杠铃仰卧臂屈伸', 'arms', 'barbell', 'intermediate', NULL, '1. 躺在平板凳上，双脚踏实地面，双手握杠铃（手心向上或向内），将杠铃置于胸部正上方，手臂伸直。\n2. 吸气时，缓慢弯曲肘部，将杠铃向下放至额头或脑后，保持上臂垂直于地面，整个过程中上臂不向外张开。\n3. 在最低点稍作停顿，确保三头肌被充分拉伸，保持核心收紧，背部自然贴凳。\n4. 呼气时，利用三头肌的力量将杠铃向上推回起始位置，手臂再次伸直。\n5. 完成一次动作后，保持控制，避免使用惯性，重复进行指定次数。\n6. 训练结束后，缓慢将杠铃放回杠铃架，确保动作安全。', '1. 使用适当的重量并确保杠铃已稳固放置在杠铃架上，防止滑落或失衡。\n2. 动作全程保持上臂固定不动，避免肘部外翻导致肩关节受伤。\n3. 如使用大重量，建议有训练伙伴在旁协助或使用安全杠，以防止意外。', '1. 上臂在下降时向外张开，导致肩部参与过多，降低三头肌的孤立刺激。\n2. 动作过快，利用惯性而非肌肉控制，容易导致手腕或肘部受伤。\n3. 手腕过度屈曲或过度背屈，使得手腕承受不必要的压力。', '1. 可将杠铃换成EZ杆或哑铃，以减轻手腕压力并改变受力角度。
2. 在倾斜凳上进行练习（上斜或下斜），可以改变三头肌的拉伸程度和发力角度。
3. 调整握距：较窄握距更集中于三头肌外侧，较宽握距则对内侧更有刺激。', 'isolation', '{"哑铃仰卧臂屈伸":"将杠铃换成等重的哑铃，双手各持一只，可更好地控制动作轨迹并减轻手腕负担。","绳索仰卧臂屈伸":"使用绳索附件进行练习，可在全程提供恒定的张力，增强对三头肌的控制与刺激。","EZ杆仰卧臂屈伸":"使用EZ杆代替直杠，可降低手腕的旋转角度，适合手腕有不适的训练者。"}', 'published', NOW(3), NOW(3));
SET @eid_106 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌（肱三头肌） (agonist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 二头肌（上臂二头肌） (antagonist)
-- Suggested muscle: 手腕屈肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃俯身臂屈伸', 'arms', 'dumbbell', 'intermediate', NULL, '1. 双脚与肩同宽站立，双手各持一只哑铃，身体前倾约45度，保持背部平直，核心收紧。\n2. 手臂自然下垂，掌心相对，肘部靠近身体侧面，屈肘将哑铃提至胸部两侧。\n3. 吸气时，固定上臂，仅通过伸展肘关节将哑铃向后上方举起，直至手臂几乎伸直，保持1-2秒。\n4. 呼气时，缓慢将哑铃收回至起始位置，控制动作速度，避免肘部晃动。\n5. 重复进行规定的次数。', '确保背部挺直，避免弓背导致下背部受伤。,使用适当重量的哑铃，防止肩关节和肘关节过度负荷。,动作全程保持肘部固定，避免肘关节外翻或内收。', '肘部在抬起时向外展开或内收，使三头肌受力不均。,背部过度弓起或塌腰，导致腰部压力过大。,动作过快，利用惯性完成，降低了肌肉刺激效果。', '如果下背不适，可在倾斜的健身凳上俯身做此动作；可单臂进行以增加平衡难度；根据自身情况适当调节哑铃重量，确保动作全程在控制范围内。', 'isolation', '{"坐姿哑铃俯身臂屈伸":"改为站姿以提升核心参与，适合需要增强核心稳定的训练者。","单臂哑铃俯身臂屈伸":"双手交替进行，可改善左右力量不对称，同时加强对肩胛骨的稳定性。","杠铃俯身臂屈伸":"换成直杆或曲杆杠铃，增加负荷分布，适合力量提升阶段。"}', 'published', NOW(3), NOW(3));
SET @eid_107 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌（肱三头肌） (agonist)
-- Suggested muscle: 肘肌 (synergist)
-- Suggested muscle: 后三角肌 (synergist)
-- Suggested muscle: 胸大肌（下部） (synergist)
-- Suggested muscle: 脊柱竖肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索下压', 'arms', 'cable', 'beginner', NULL, '1. 站姿直立，双脚与肩同宽，保持核心收紧。\n2. 双手握住绳索手柄，手掌相对，手肘贴近身体两侧。\n3. 吸气后，利用三头肌的力量将手柄向大腿方向下压，同时保持肘部固定。\n4. 当手臂完全伸展时，稍作停顿，感受三头肌的收缩。\n5. 呼气，缓慢控制地将手柄回到起始位置，手肘保持微屈。\n6. 重复进行所需次数。', '1. 保持肘部靠近身体，避免在动作过程中出现肩膀过度前伸。\n2. 使用适当重量，确保能够完成全程动作而不失控。\n3. 如有肩部或肘部不适，立即停止并咨询专业教练或医师。', '1. 把手肘向外展开，导致肩膀参与过多。\n2. 使用过重负荷导致动作不完整或借助身体摆动。\n3. 在下压时锁定肘关节，导致肘部受力过大。', '可以更换不同手柄（V型把手、直杆、绳索）来改变握法并刺激三头肌不同头部；调整绳索高度和手柄位置以适应个人肩部柔韧性。', 'isolation', '{"变体类型":"使用直杆或V型把手进行下压，可改变手掌方向并侧重三头肌外侧或内侧头的刺激。"}', 'published', NOW(3), NOW(3));
SET @eid_108 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌（肱三头肌） (agonist)
-- Suggested muscle: 肘肌 (synergist)
-- Suggested muscle: 前臂屈肌（桡侧腕屈肌） (stabilizer)
-- Suggested muscle: 肩部前三角肌 (stabilizer)
-- Suggested muscle: 二头肌（肱二头肌） (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('直杆下压', 'arms', 'cable', 'beginner', NULL, '1. 面对拉力器站立，双脚与肩同宽，膝盖微屈保持稳定。2. 双手握住直杆，手心朝下，握距与肩同宽或略窄于肩宽。3. 上臂贴近身体两侧，肘关节弯曲约90度，这是动作的起始位置。4. 呼气时，通过收缩肱三头肌将直杆向下压，直到手臂完全伸展，注意肘关节不要锁死。5. 在底部位置保持1-2秒，充分收缩肱三头肌。6. 吸气时，缓慢将直杆放回起始位置，控制速度不要让重量自由下落。', '1. 使用合适的重量，从轻重量开始练习以掌握正确动作模式。2. 保持肘关节始终朝向下方，不要外展或内夹。3. 保持核心收紧，避免身体前后摆动借力。', '1. 身体前倾或弯腰借力，导致下背部压力过大。2. 肘关节外展（手臂向身体两侧打开），减少了肱三头肌的刺激。3. 使用过重重量，导致上半身前后摆动，动作变形。', '如果感到手腕压力过大，可以将握距稍微加宽或使用护腕带来分散压力。对于肩部不适的人群，可以在肘关节处稍微向外打开约15-20度，以减少肩部不适感。', 'isolation', '{"绳索下压":"使用绳索附件替代直杆，动作轨迹会稍有不同，侧重肱三头肌外侧头的刺激。","EZ杆下压":"使用EZ杆（曲杆）可以减少手腕压力，适合手腕有不适的人群。","过头伸展":"从下压动作转为站姿肱三头肌过头伸展，可以全面锻炼肱三头肌三个头。","窄距卧推":"转换为复合动作，增加胸肌参与，适合想要更多复合训练的进阶者。"}', 'published', NOW(3), NOW(3));
SET @eid_109 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 三角肌后束 (synergist)
-- Suggested muscle: 肱桡肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('V绳下压', 'arms', 'cable', 'intermediate', NULL, '1. 调整滑轮高度至略高于肩部，确保绳索自然下垂。\n2. 双手握住V形绳手柄，手掌相对，手肘贴近身体两侧，肩部略微后收。\n3. 吸气时保持上臂固定，核心收紧，身体可略微前倾以保持平衡。\n4. 呼气时，利用三头肌的力量将手柄向下压至手臂接近伸直，保持肘部位置不变，避免向外翻转。\n5. 在最低点停顿1-2秒，充分感受三头肌收缩，然后缓慢控制回放手柄至起始位置，保持肘部微屈。\n6. 完成设定的次数后，平稳放回重量，避免弹力冲击。', '1. 始终保持肘部贴近身体，防止肩膀参与发力导致肩部受伤。\n2. 使用合适的重量，避免使用过重导致动作失控或腰椎过度负荷。\n3. 在进行动作时保持背部挺直，避免弓背或过度前倾，以免造成下背部压力。', '1. 肘部外翻或耸肩，导致上臂前侧肌肉参与过多，减少三头肌刺激。\n2. 使用过重的负荷，导致动作失去控制，无法完成全程伸展。\n3. 在回放时快速释放重量，缺少离心控制，容易导致关节冲击或受伤。', '1. 若感到三头肌内侧头刺激不足，可略微收紧握距并将肘部稍稍向内收。
2. 需要加强对三头肌长头的拉伸时，可适当调高滑轮位置，使手臂在最低点略微向后伸展。
3. 如出现手腕不适，可调整手腕角度或使用护腕带来分担压力。', 'isolation', '{"V绳":"标准V形绳手柄下压，侧重三头肌内侧头；","直杆":"换成直杆手柄可加强对三头肌外侧头的刺激；","绳索":"使用绳索手柄可增加对三头肌长头的拉伸与激活。"}', 'published', NOW(3), NOW(3));
SET @eid_110 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌（长头、短头、内侧头） (agonist)
-- Suggested muscle: 上臂屈肌（前臂屈肌） (stabilizer)
-- Suggested muscle: 前臂伸肌 (stabilizer)
-- Suggested muscle: 肩袖肌群（冈上肌、冈下肌） (stabilizer)
-- Suggested muscle: 二头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('过头绳索臂屈伸', 'arms', 'cable', 'intermediate', NULL, '1. 站姿，双脚与肩同宽，双手握住绳索或直杆的手柄，手臂伸直举过头顶，手肘微屈，面向拉力器。\n2. 保持上臂固定，仅通过肘关节屈伸的动作，将重量慢慢下放至头后方，直至前臂略低于水平面，手肘保持贴近耳朵。\n3. 在最低点稍作停顿，然后利用三头肌的力量向上推回起始位置，手臂回到伸直状态，保持张力。\n4. 完成设定的重复次数后，平稳收回重量至起始位置，避免猛然松开导致绳索弹回。', '确保绳索或杆的固定端牢固，防止在动作过程中滑脱或脱落。,保持核心收紧、脊柱自然直立，避免过度后仰导致腰椎压力过大。,使用适当的重量，避免使用过大的负荷导致肘关节或肩关节受伤。', '肘部在动作过程中外展或向前移动，导致肩部参与过多，降低三头肌的孤立刺激。,下放时重量过重导致身体后仰，形成借力而非纯粹的三头肌收缩。,动作速度过快，尤其是向上推回时缺乏控制，影响肌肉的离心与向心收缩效果。', '可根据个人柔韧性和肩部活动范围调节手臂的高度和肘部角度；若肩关节受限，可略微降低手臂抬起的角度；若想加强长头的拉伸，可采用绳索手柄并在最低点时稍微外旋手腕。', 'isolation', '{"变体类型":"可使用直杆、V型把或单手绳索手柄进行不同握法的过头臂屈伸；将绳索换成弹力带或哑铃也可实现类似训练效果，适合在不同器械环境下进行转换。"}', 'published', NOW(3), NOW(3));
SET @eid_111 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌（长头、外侧头、内侧头） (agonist)
-- Suggested muscle: 二头肌 (antagonist)
-- Suggested muscle: 后三角肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 核心肌群（腹直肌、腹外斜肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('双杠臂屈伸', 'arms', 'bodyweight', 'intermediate', NULL, '1. 站立于双杠之间，双手握住杠子，手臂伸直，肩部略向后收，核心收紧，脚尖离地，身体呈轻微前倾姿势。\n2. 吸气，慢慢屈肘下降，保持肘部指向后方，躯干保持垂直或略向前倾，降至上臂与地面平行或略低。\n3. 在最低点稍作停顿，确保肩部不向前伸展，避免耸肩。\n4. 呼气，使用胸部和三头发力，将身体向上推起，回到起始的手臂伸直姿势。\n5. 完成指定次数后，缓慢下降至支撑姿势，站稳后再离开双杠。', '1. 确保双杠稳固且地面平整，避免滑倒或杠子晃动。\n2. 初学者建议有辅助带或请同伴帮助，以防失控导致肩部受伤。\n3. 下降时不要过度伸展肩关节，保持肘部与身体角度在安全范围（约45°~90°）。', '1. 下降幅度过大，导致肘部过度伸展或肩关节受压。\n2. 身体前倾过多，导致胸肌过度参与而忽视三头肌发力。\n3. 动作过程中耸肩或肘部外张，造成肩部不适和力量分散。', '1. 初学者可先在凳子上进行半程倾斜臂屈伸，降低难度。
2. 进阶者可使用负重腰带或在脚踝处挂壶铃增加负荷。
3. 如肩膀不适，可将手间距调宽或使用倾斜双杠来减轻肩部压力。', 'compound', '{"低位双杠臂屈伸":"将双杠调低至胸部高度，降低身体倾斜角度，更侧重三头肌发力。","倾斜双杠臂屈伸":"在双杠上放置倾斜垫或使用倾斜训练器，使动作更侧重胸肌。","辅助带双杠臂屈伸":"使用弹力带提供向上助力，帮助初学者完成全程动作，逐步过渡到无辅助。"}', 'published', NOW(3), NOW(3));
SET @eid_112 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌 (agonist)
-- Suggested muscle: 胸大肌 (synergist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 核心肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃颈后臂屈伸', 'arms', 'dumbbell', 'beginner', NULL, '1. 站立或坐在训练凳上，双脚与肩同宽，保持身体直立，核心收紧。2. 双手各持一个哑铃，掌心相对，将哑铃举至头顶上方，手臂完全伸直。3. 保持上臂固定不动，仅通过弯曲肘关节将哑铃缓慢下放至颈后，直到前臂与上臂约成90度角。4. 呼气并利用肱三头肌的力量将哑铃向上推起，直到手臂再次完全伸直。5. 在动作顶端保持1-2秒，充分收缩肱三头肌，然后缓慢下放重复动作。6. 完成规定次数后，将哑铃平稳放回地面。', '选择合适的重量，避免使用过重哑铃导致肘关节压力过大。动作过程中保持核心收紧，避免身体前后晃动造成腰部损伤。双手握紧哑铃，确保稳固抓握，防止哑铃滑落砸伤头部或肩部。', '上臂在动作过程中上下移动或外张，使肩关节参与发力，降低了对肱三头肌的刺激效果。动作速度过快，尤其是下落阶段，没有控制性地利用惯性完成动作，增加了受伤风险且减少了肌肉的离心收缩效果。肘关节朝向两侧打开而非朝前，导致肩部代偿发力，影响动作效果和肩关节安全。', '初学者可从坐姿开始以增加身体稳定性，减少核心控制的负担。肩部柔韧性较差者可以先将动作幅度减小，循序渐进增加运动范围。可使用较轻重量专注于动作质量，建立正确的肌肉记忆后再逐步增加负荷。', 'isolation', '{"变体类型":[{"变体名称":"杠铃颈后臂屈伸","转换建议":"双手握距与肩同宽，使用杠铃替代哑铃，可使用更大负荷但需注意平衡控制。"},{"变体名称":"单手哑铃臂屈伸","转换建议":"每次仅用一只手进行动作，可以更好地纠正左右力量不平衡问题。"},{"变体名称":"拉力器下压","转换建议":"将站姿改为跪姿或双手扶凳，身体略微前倾，肘关节固定，通过拉力器实现类似的三头肌收缩效果。"}]}', 'published', NOW(3), NOW(3));
SET @eid_114 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 肘肌 (synergist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 肱二头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('杠铃颈后臂屈伸', 'arms', 'barbell', 'intermediate', NULL, '1. 站姿，双脚与肩同宽，双手握住杠铃，手间距略宽于肩，手臂伸直，将杠铃举至颈后；\n2. 保持上臂固定不动（肘部指向天花板），屈肘将杠铃缓慢下降至头部后方，感受三头肌被拉伸；\n3. 在最低点稍作停顿，然后用力收缩三头肌，将杠铃推回起始位置，手臂重新伸直；\n4. 重复动作，保持呼吸配合——下降时吸气，推起时呼气；\n5. 完成预定次数后，缓慢将杠铃放回架上或地面，避免猛然甩下。', '1. 确保肩部活动范围正常，若有肩部伤痛应避免或先咨询专业教练；\n2. 使用合适的重量，避免过重导致失去控制或对肩关节产生过大压力；\n3. 保持核心收紧，避免背部过度弓起导致腰椎受伤。', '1. 肘部外翻或向前移动，使肩部受力增加，降低三头肌的孤立效果；\n2. 下降幅度过大或过小，未能充分伸展或收缩三头肌；\n3. 使用过重的重量导致上半身摆动，失去动作的孤立性。', '如肩部活动受限，可改为坐姿或使用哑铃减轻肩部负担；若进行大重量训练，可使用护腕带或护肩垫降低手腕压力；在力量训练机（如史密斯机）上进行可进一步提升安全性。', 'isolation', '{"哑铃颈后臂屈伸":"使用哑铃代替杠铃，可提供更自由的运动轨迹并减轻肩部压力。","绳索颈后臂屈伸":"使用绳索器械进行，可保持恒定的张力，适合高次数训练。","坐姿颈后臂屈伸":"在坐姿下进行，减少核心稳定性需求，适合初学者。"}', 'published', NOW(3), NOW(3));
SET @eid_115 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌 (agonist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 斜方肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('器械臂屈伸', 'arms', 'machine', 'beginner', NULL, '1. 调整机器座椅高度，使手柄与胸部平齐，双脚平稳踩在脚踏板上。\n2. 双手握住手柄，手掌向上，手臂自然下垂，肩胛骨轻微后收，保持背部挺直。\n3. 吸气，利用二头肌的力量屈肘，将手柄向上拉至胸部水平或略高于肩部，保持肘部固定在身体两侧。\n4. 在顶峰位置稍作停顿，感受二头肌的收缩，然后呼气，缓慢放下手柄至起始位置，手臂完全伸展。\n5. 重复进行所需的次数，保持动作平稳，避免借助身体摆动。', '• 调整座椅和手柄位置，确保关节在运动过程中不受过度压力。\n• 动作过程中保持背部挺直，避免弓背或耸肩，以免造成腰椎或肩部受伤。\n• 使用合适的重量，切勿盲目追求大重量，防止肌肉拉伤或关节损伤。', '• 手臂过度外展或内收，导致肘部移动，减弱二头肌的刺激。\n• 利用身体摆动或惯性抬起重量，这会转移负荷至背部或肩膀。\n• 在下降阶段过快，未能控制速度，导致关节受冲击。', '• 若手柄位置偏高，可将座椅降低，使肘部在运动全程保持在身体两侧。
• 对于肩部活动度较差的使用者，可适当放宽手柄的宽度，以减少肩部外展。
• 初学者建议先使用轻负荷，专注于动作轨迹和肌肉感受，再逐步增加重量。', 'isolation', '{"变体类型":"哑铃弯举 / 绳索弯举","转换建议":"可使用哑铃进行站姿或坐姿单臂弯举，或使用绳索/滑轮装置进行上斜弯举，保持相同的肘部固定和动作幅度，以增强二头肌的孤立刺激。"}', 'published', NOW(3), NOW(3));
SET @eid_116 = LAST_INSERT_ID();
-- Suggested muscle: 二头肌（肱二头肌） (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 三头肌（肱三头肌） (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('窄距俯卧撑', 'arms', 'bodyweight', 'beginner', NULL, '1. 采用俯卧姿势，双手间距与肩同宽或略窄，手掌平放在地面上，手指指向前方。\n2. 收紧核心肌群，保持身体呈直线（从头到脚），避免腰部下沉或拱背。\n3. 屈肘，将胸部向地面靠近，保持肩胛骨向中线收缩，避免肩膀过度外展。\n4. 在胸部几乎触及地面时，用胸肌和三头肌的力量将身体推起，伸直手臂回到起始姿势。\n5. 重复动作，保持呼吸节奏——下降时吸气，推起时呼气。\n6. 完成预定的次数或时间后，缓缓放松身体，站立或跪姿休息。', '1. 若手腕或肩部有不适感，请在手腕下放置垫子或改用拳头支撑，以减少腕部压力。\n2. 进行动作时避免憋气，保持正常呼吸，以防血压升高。\n3. 初学者应在镜子前或请教练观察姿势，确保身体保持整体对齐，防止下背塌陷导致腰椎受伤。', '1. 手肘过度外张，导致肩部负担过大、胸肌刺激减弱。\n2. 腰部或臀部下沉，形成拱背姿势，增加腰椎受压风险。\n3. 动作幅度不足，只做半程推起，未能充分激活胸肌和三头肌。', '1. 若手腕不适，可将手放在稍微抬起的斜坡上或使用握力球减轻角度。
2. 为了增加难度，可在背部放置杠铃片或使用负重背心；若难度过大，可先做跪姿窄距俯卧撑。
3. 手间距可根据个人柔韧性微调：越窄对三头肌刺激越大，但需确保肩关节不出现疼痛。', 'compound', '{"宽距俯卧撑":"将双手间距调至约1.5倍肩宽，可减少三头肌负担，更侧重胸大肌外侧刺激。","高脚俯卧撑":"将脚部抬高于手部（如放在台阶上），可降低胸肌负荷，适合初学者或肩部不适时练习。","跪姿俯卧撑":"如果无法完成完整的地面俯卧撑，可先采用跪姿进行，以减少体重负荷，逐步过渡到全幅动作。","单臂窄距俯卧撑":"在一侧手支撑的情况下进行，可进一步强化核心稳定性和单侧胸、三头肌力量。"}', 'published', NOW(3), NOW(3));
SET @eid_117 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 三头肌 (agonist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 背阔肌（下部） (stabilizer)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 肩胛提肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('自重臂屈伸', 'arms', 'bodyweight', 'intermediate', NULL, '1. 找到适合的支撑物（如椅子、台阶或双杠），双手间距与肩同宽或略宽于肩握住边缘。2. 将身体支撑离开地面，双腿向前伸直或微微弯曲，脚跟着地支撑。3. 吸气的同时，弯曲手肘，将身体向下降低，直至上臂与地面平行或上臂角度略低于90度。4. 在动作最低点稍作停顿，感受三头肌的拉伸。5. 呼气的同时，用手臂发力将身体向上推起，回到起始位置。6. 重复完成规定的重复次数，保持核心收紧，背部挺直。', '1. 确保支撑物稳固可靠，不会滑动或倾倒。2. 向下降低时不要过低，以免对肩关节造成过大压力或损伤。3. 保持肩胛骨稳定，避免耸肩或肩胛骨过度前移。', '1. 下降幅度不够，只做了半程动作，无法充分刺激目标肌群。2. 肘部外张过大，导致肩部承受过多压力，增加受伤风险。3. 身体过于直立，重心集中在上肢，导致动作变形和效果降低。', '新手可以先从高台或较矮的支撑物开始，降低动作难度；也可以弯曲膝盖增加稳定性。进阶者可以通过在腰部增加负重（如背包）来增加训练强度。如果肩部不适，可以减小下降深度或选择其他动作替代。', 'compound', '{"降阶变体":"使用较高的支撑物或弯曲膝盖进行练习，减少动作幅度","升阶变体":"将双脚抬高放在另一支撑物上，增加身体倾斜角度和动作难度；或进行单臂臂屈伸","肌肉侧重调整":"宽握距侧重胸部和内侧三头肌，窄握距侧重三头肌外侧头"}', 'published', NOW(3), NOW(3));
SET @eid_118 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌 (agonist)
-- Suggested muscle: 胸大肌 (synergist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 核心肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('器械下压', 'arms', 'machine', 'beginner', NULL, '1. 调整器械座椅高度，使手臂自然下垂时手柄位于胸部水平位置；\n2. 双手握持把手（可使用直杆、V形把手或绳索），掌心向下，握距与肩同宽或略宽；\n3. 站稳，双脚略微分开，膝盖微弯，保持背部挺直，核心收紧；\n4. 吸气时，固定上臂在身体两侧，仅通过三头肌发力将把手向下压至手臂几乎伸直，保持肘部微屈不要完全锁死；\n5. 在最低点稍作停顿，感受三头肌的收缩，然后呼气慢慢将把手回到起始位置，控制重量不要让手臂猛弹；\n6. 完成指定次数后，保持平稳呼吸，避免急促换气。', '使用器械前检查把手、钢索和配重是否牢固，防止滑脱或卡住。,选择合适的重量，避免使用过重导致身体摆动或背部过度前倾。,全程保持肘部固定在身体两侧，避免向外展开，以减少肩部不必要的压力。', '使用过大的重量导致上半身前后摆动，借力完成动作，降低三头肌的刺激。,肘部在下降过程中向外展开，使肩部参与过多，易引起肩部不适。,动作幅度不足，只做半程下压，未能充分伸展或收缩三头肌。', '根据个人身高和臂长调节座椅高度，使手柄起始位置略低于胸部；如感到肩部不适，可适当降低把手起始高度或换用把手宽度更大的配件；配重片的插销位置应确保稳固，避免在运动中出现卡顿。', 'isolation', '{"变体类型":"站姿绳索下压（使用V形把手）","转换建议":"将直杆换成V形把手或绳索，可增加手腕的自然旋转角度，侧重三头肌内侧头；若想加强外侧头，可改用直杆并保持握距略宽。"}', 'published', NOW(3), NOW(3));
SET @eid_120 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌（外侧头、内侧头、长头） (agonist)
-- Suggested muscle: 肘肌 (synergist)
-- Suggested muscle: 二头肌 (antagonist)
-- Suggested muscle: 前臂屈肌（前臂前侧肌群） (stabilizer)
-- Suggested muscle: 肩胛稳定肌群（肩胛提肌、菱形肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('低位滑轮下压', 'arms', 'cable', 'intermediate', NULL, '1. 调整滑轮至最低位置（约与胸部平齐或略低），挂上直杆或绳索手柄。\n2. 站立或单脚站立，双脚与肩同宽，核心收紧，胸部轻微挺起，背部保持自然直立。\n3. 双手握住手柄，手臂自然下垂，肘部靠近体侧，前臂与地面平行，确保肘关节在整个动作中保持固定。\n4. 呼气时，肱三头肌发力，将手柄向下压至手臂伸直或略低于水平位置，动作全程肘部不前移。\n5. 在最低点稍作停顿，感受肱三头肌的收缩，然后吸气，缓慢控制手柄回到起始位置，保持肘关节的稳定性。\n6. 完成所需次数后停止动作，确保滑轮重量归位，防止弹回伤人。', '使用前检查滑轮、绳索及手柄是否完好无损，防止脱落导致意外伤害。,保持肘部固定，避免使用肩部或背部力量，防止上背和肩关节过度负荷。,选择合适的训练重量，确保动作全程可控制，避免因重量过大导致姿势失控。', '肘部外展或向前移动，导致三角肌和肩部参与，降低对肱三头肌的刺激。,使用过重重量导致动作幅度不足、借力完成动作，增加受伤风险。,动作速度过快，忽视离心阶段，降低肌肉收缩效果和训练安全性。', '可依据个人身高和柔韧性微调滑轮高度，使肘部在起始位置时与把手齐平；握把宽度可改为窄握、宽握或绳索，以改变肱三头肌不同头的受力；保持肘部贴近身体且不随动作移动，可使用镜子或视频反馈纠正姿势。', 'isolation', '{"单手低位滑轮下压":"使用单手握住手柄进行下压，可更孤立单侧肱三头肌，改善左右不平衡。","绳索低位滑轮下压":"换用绳索配件进行下压，增加动作幅度并更好地刺激肱三头肌长头。","宽握低位滑轮下压":"采用宽握把或V型把，侧重刺激肱三头肌外侧头。","窄握低位滑轮下压":"使用窄握把，更集中刺激肱三头肌内侧头。"}', 'published', NOW(3), NOW(3));
SET @eid_121 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 三角肌后束 (stabilizer)
-- Suggested muscle: 肱二头肌 (antagonist)
-- Suggested muscle: 前臂伸肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('上斜哑铃臂屈伸', 'arms', 'dumbbell', 'intermediate', NULL, '1. 将平凳调整为30-45度倾斜角度，仰卧在凳上，双脚平放地面保持稳定。双手各持一只哑铃，掌心相对握住哑铃，将哑铃举至胸部上方位置，手臂伸直与地面垂直。\n2. 保持上臂固定不动，仅通过屈肘将哑铃缓慢下放至头部两侧，此时前臂与地面接近平行。动作过程中保持核心收紧，避免腰部过度拱起。\n3. 在最低点稍作停顿，感受肱三头肌被充分拉伸，然后依靠肱三头肌发力，将哑铃向上举起恢复至手臂伸直的起始位置。\n4. 动作过程中保持肘关节指向前方，避免向外打开，呼气时完成向上推举动作。重复完成规定的重复次数。', '动作全程保持核心收紧以支撑下背部，避免下背部悬空导致腰椎压力过大。下放哑铃时控制速度，避免重力导致肘关节过度伸展受伤。整个动作过程中保持肩胛骨稳定贴靠凳面，不要出现肩胛骨前倾或离开凳面。', '肘关节在动作过程中向两侧外展，导致上臂不稳定，应始终保持肘关节指向前方。部分练习者会利用惯性快速甩动哑铃，无法有效刺激目标肌肉，应全程保持肌肉张力。腰部过度弓起以协助发力，表明负荷过重或核心力量不足，需要减轻哑铃重量或加强核心训练。', '初学者可先从轻重量开始练习，待动作熟练后逐步增加重量。如果感觉下背部不适，可在髋部下方垫一个垫子或毛巾卷以提供额外支撑。若想加强三头肌外侧头刺激，可在动作顶端将哑铃向外旋转变换手掌方向。', 'isolation', '{"升级变体":"可采用EZ杆或直杆进行绳索下压增加负荷，或采用俯卧臂屈伸改变刺激角度","降级变体":"可改用坐姿哑铃臂屈伸减少核心压力，或使用较轻哑铃配合绳索辅助"}', 'published', NOW(3), NOW(3));
SET @eid_122 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 肘肌 (synergist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 肱二头肌 (antagonist)
-- Suggested muscle: 肩袖肌群 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('站姿哑铃臂屈伸', 'arms', 'dumbbell', 'beginner', NULL, '1. 双脚站立与肩同宽，膝盖微屈，保持身体稳定，双手各持一只哑铃置于身体两侧。 2. 将哑铃高举过头顶，手臂伸直，手掌相对，双手间距与肩同宽。 3. 屈肘下降哑铃，将哑铃缓缓下放至头后方，保持上臂固定不动，仅前臂活动。 4. 感受肱三头肌被充分拉伸，保持1-2秒。 5. 发力将哑铃向上推举，回到起始位置，手臂完全伸直。 6. 重复完成指定次数，注意控制动作节奏，避免借助惯性。', '1. 选择适当重量的哑铃，避免因重量过大导致动作变形或肌肉拉伤。 2. 双手持哑铃时确保握把稳固，防止哑铃滑落砸伤。 3. 动作过程中保持核心收紧，避免腰部过度前倾导致腰椎压力过大。', '1. 上臂在动作过程中左右晃动或向前移动，降低了对肱三头肌的刺激效果。 2. 使用过重哑铃导致耸肩或借助身体摆动代偿，无法孤立锻炼目标肌肉。 3. 下降动作过快或未充分拉伸肱三头肌，减少了肌肉收缩的有效行程。', '对于肩部灵活性较差的人群，可以减小动作幅度，在感到舒适的情况下逐步增加活动范围。初学者建议先从小重量开始练习，正确掌握动作轨迹后再逐步增加负荷。', 'isolation', '{"单臂变体":"改为单手持哑铃进行臂屈伸，可加强单侧肌肉控制和平衡能力","仰卧变体":"改为仰卧在平板凳上进行，可减少核心肌群的参与，更孤立刺激肱三头肌","绳索变体":"使用绳索器材替代哑铃，可提供恒定的张力变化，增加肌肉激活度"}', 'published', NOW(3), NOW(3));
SET @eid_123 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 肘肌 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 肱二头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧哑铃臂屈伸', 'arms', 'dumbbell', 'beginner', NULL, '1. 仰面躺在平板凳上，双脚踏实地面，臀部略微收紧保持身体稳定。\n2. 双手握持哑铃（可采用两手合并握铃或将哑铃对握），将哑铃举至胸前，双臂伸直，手肘略微外展。\n3. 保持上臂（即肘部以上）固定不动，仅通过屈肘将哑铃缓缓下降至额头前方或略低于额头，保持肘部指向天花板。\n4. 在最低点稍作停顿（约1秒），感受三头肌的拉伸。\n5. 通过呼气，用三头肌的力量将哑铃向上推回起始位置，肘部仍保持伸展姿态。\n6. 完成指定次数后，控制重量缓慢放回，避免弹起。', '1. 始终保持上臂固定，防止肩膀参与抬起导致肩部受伤。\n2. 使用重量应在控制范围内，避免在下降阶段失控导致肘关节扭伤。\n3. 开始前做好充分热身，尤其是肩部和肘关节，以防拉伤。', '1. 将肩膀抬起或移动上臂，使动作变为肩部推举。\n2. 使用过重的哑铃，导致动作失控，出现肘部外翻或疼痛。\n3. 在下降和上升过程中缺少控制，频繁弹起或摆动，降低三头肌的刺激效果。', '初学者可先选用轻重量（1–3 kg）并保持肘部略弯，待动作熟练后再逐渐增加重量并追求全程伸展。若感到肘部不适，可在动作最低点稍微抬高上臂角度，减轻关节压力；进阶者可改为斜板仰卧或使用绳索、杠铃等不同器材，以改变刺激角度。', 'isolation', '{"坐姿臂屈伸":"保持坐姿，双手握住哑铃进行臂屈伸，椅背可提供额外支撑，适合作为场地限制的替代。","杠铃臂屈伸":"将哑铃换成直杠或EZ杆，双手握距略宽于肩，动作轨迹相同，但需注意杠铃重量分布更集中。","绳索下压":"使用滑轮器械，下压动作保持肘部固定，可提供持续的张力，适合作为变化训练。","斜板仰卧臂屈伸":"将平板凳调至倾斜角度（上斜），此变体更强调三头肌长头的伸展，适合进阶者增加拉伸范围。"}', 'published', NOW(3), NOW(3));
SET @eid_124 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌（肱三头肌） (agonist)
-- Suggested muscle: 肘肌（Anconeus） (synergist)
-- Suggested muscle: 前三角肌 (stabilizer)
-- Suggested muscle: 手腕屈肌/伸肌 (stabilizer)
-- Suggested muscle: 二头肌（肱二头肌） (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('跪姿杠铃臂屈伸', 'arms', 'barbell', 'intermediate', NULL, '1. 跪姿准备：双膝跪地，膝盖与肩同宽，脚尖触地，上半身直立；2. 握杠姿势：双手握距略宽于肩，双手紧握杠铃，将杠铃举至头顶正上方，手臂完全伸直；3. 固定上臂：保持上臂垂直于地面，避免在动作过程中向后倾斜或移动；4. 缓慢下落：肱三头肌控制阻力，弯曲肘关节，将杠铃缓慢下放至头部后方，手肘始终朝向正前方；5. 底部停留：到达最低点时稍作停顿，感受肱三头肌的伸展；6. 向上推起：肱三头肌发力，将杠铃向上推起至手臂完全伸直，回到起始位置。', '确保核心肌群收紧，保持脊柱中立位，避免下背部过度弯曲造成损伤,动作过程中控制杠铃重量，避免因重量过大导致上臂前移或身体不稳,如果手腕灵活性不足，建议使用护腕或换成EZ杆以减少手腕压力', '上臂在下落过程中不自觉地向后移动，导致肩膀前侧过度拉伸,核心力量不足导致上半身晃动或下背部过度弓起,肘关节外张过大，使手臂偏离中立位置，增加肘部压力,动作速度过快，特别是在下落阶段没有控制，降低训练效果并增加受伤风险', '初学者建议从较轻重量开始，逐步掌握动作轨迹后再增加负荷,如果膝盖不适，可以在膝盖下方放置软垫或改用站姿进行,手腕有不适感时，可将握距收窄或换成EZ杆以调整手腕角度,如果无法稳定完成全程动作，可以先做半程动作逐步增加活动范围', 'isolation', '{"坐姿/站姿版本":"将跪姿改为坐姿或站姿，手臂位置和动作轨迹保持不变，适合需要更好稳定性的训练者","哑铃单臂版本":"改为单手哑铃过头臂屈伸，可以更好地纠正左右力量不平衡问题","绳索版本":"使用绳索设备进行过头臂屈伸，提供更平滑的阻力曲线，适合肩部不适的训练者","EZ杆版本":"换成EZ杆进行臂屈伸，减少手腕压力，适合手腕灵活性较差的人群"}', 'published', NOW(3), NOW(3));
SET @eid_125 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 肱二头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('杠铃腕弯举', 'arms', 'barbell', 'beginner', NULL, '1. 站立，双脚与肩同宽，双手正握（掌心向上）握住杠铃，握距略宽于肩，手臂自然伸直，肘部微屈。\n2. 保持上臂固定不动，只有前臂参与动作。肩部稍微收紧，以防止借力。\n3. 通过手腕屈曲，将杠铃向上卷起，至手腕达到最大屈曲位置，感受到前臂屈肌的强烈收缩。\n4. 在最高点稍作停顿（约1秒），确保动作全程控制，避免使用弹力或摆动。\n5. 缓慢将杠铃放回起始位置，手腕保持微屈状态，避免完全伸展导致腕关节受压。\n6. 重复完成设定的次数，注意保持呼吸节奏，卷起时吸气，放下时呼气。', '1. 使用适当重量的杠铃，避免过重导致腕关节或前臂肌腱受伤。\n2. 整个动作过程中保持上臂固定不动，防止肘部随动作上下移动造成肌肉借力。\n3. 若在练习中出现手腕疼痛、刺痛或不适，应立即停止并咨询专业教练或医生。', '1. 使用过大的重量导致动作失控、出现弹力或摆动。\n2. 在卷起或放下时手腕外翻或过度伸展，增加腕关节受伤风险。\n3. 肘部随动作上下移动，借用上臂力量完成动作，使前臂肌群得不到充分刺激。', '1. 初学者可以将手靠在凳子或倾斜的靠背上进行坐姿练习，以减少肩部参与。
2. 通过调节握距（稍宽或稍窄）可以改变前臂屈肌的受刺激程度。
3. 若感到上臂或肩部参与过多，可尝试使用哑铃代替杠铃，专注于手腕动作。', 'isolation', '{"变体类型":"哑铃腕弯举","转换建议":"将杠铃换成等重的哑铃，保持相同的动作轨迹和手腕屈伸幅度，哑铃可以提供更灵活的手腕角度控制，适合作为杠铃腕弯举的入门或辅助练习。"}', 'published', NOW(3), NOW(3));
SET @eid_126 = LAST_INSERT_ID();
-- Suggested muscle: 前臂屈腕肌群（桡侧腕屈肌、尺侧腕屈肌） (agonist)
-- Suggested muscle: 掌长肌 (agonist)
-- Suggested muscle: 前臂伸腕肌群（桡侧腕伸肌、尺侧腕伸肌） (antagonist)
-- Suggested muscle: 二头肌 (stabilizer)
-- Suggested muscle: 三角肌前束 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃腕弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 坐在凳子上，双腿自然分开，将前臂放在大腿上，手腕悬空，手掌朝上握住哑铃；2. 保持身体直立或微微前倾，确保前臂稳定地放在大腿上，肘关节弯曲约90度；3. 吸气放松，手腕自然下垂，哑铃垂直向下，这是起始位置；4. 呼气，收缩前臂屈肌，将哑铃向上弯举至最大幅度，手腕向上弯曲；5. 在顶峰位置保持1-2秒，充分感受前臂肌肉的收缩；6. 吸气，缓慢控制地将哑铃下放回起始位置，确保手腕不要完全锁死，保持轻微张力；7. 重复完成规定的次数和组数。', '1. 选择适当重量的哑铃，避免使用过重导致手腕关节承受过大压力；2. 动作全程控制速度，尤其在下放阶段，避免借力或快速甩动造成肌肉拉伤；3. 如有手腕或前臂伤痛，训练前应咨询医生或物理治疗师，必要时减少训练强度。', '1. 弯举时肘关节离开支撑点，导致前臂参与过多，降低了对腕部的孤立刺激；2. 使用过重的哑铃，身体不自觉地借助晃动或甩动来完成动作，无法有效锻炼目标肌肉；3. 动作幅度不足，只做半程弯举，无法充分拉伸和收缩前臂屈肌，影响训练效果。', '1. 力量较弱时可采用坐姿并将前臂完全放在大腿上支撑，稳定性更好；2. 如想增加难度可采用站姿或单手训练，增加核心稳定需求；3. 手掌朝下握住哑铃可变成腕伸动作，形成拮抗训练组合。', 'isolation', '{"单手变双手":"可以先用单手熟练掌握动作要领，再换成双手同时进行，提高训练效率。","绳索变体":"可以用绳索/缆绳机器替代哑铃，提供更恒定的阻力和不同的训练体验。","增加难度":"增加训练时间（TUT），在动作顶端和底端各停留2-3秒，增强肌肉募集。","超级组组合":"与哑铃腕伸组成超级组，分别训练腕屈肌和腕伸肌，达到拮抗肌平衡训练。","俯卧变体":"俯卧在斜凳上进行训练，让重力辅助增加阻力变化范围。"}', 'published', NOW(3), NOW(3));
SET @eid_127 = LAST_INSERT_ID();
-- Suggested muscle: 桡侧腕屈肌 (agonist)
-- Suggested muscle: 尺侧腕屈肌 (agonist)
-- Suggested muscle: 掌长肌 (synergist)
-- Suggested muscle: 指浅屈肌 (synergist)
-- Suggested muscle: 桡侧腕伸肌 (antagonist)
-- Suggested muscle: 指伸肌 (antagonist)
-- Suggested muscle: 肘肌 (stabilizer)
-- Suggested muscle: 旋前圆肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('反握腕弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 坐在凳子上，双手各持一只哑铃，掌心向下（反握），将前臂放在大腿上，手腕悬空。\n2. 保持前臂稳定，仅通过手腕向下弯曲，使哑铃朝向地面方向下落。\n3. 在动作底部稍作停留，充分拉伸前臂伸肌。\n4. 收缩前臂肌肉，慢慢向上弯曲手腕，将哑铃向上抬起。\n5. 在顶端位置保持1-2秒，感受前臂收缩。\n6. 缓慢下放哑铃回到起始位置，重复进行。', '1. 选择适当的重量，初学者建议从较轻的哑铃开始，以避免手腕关节受伤。\n2. 动作过程中保持前臂稳定支撑在腿上，避免前臂离开支撑面导致失去控制。\n3. 如感到手腕或前臂不适，应立即停止训练并休息。', '1. 使用过重的重量，导致动作无法控制，借用惯性完成动作。\n2. 动作速度过快，没有在顶端和底部停顿，无法充分刺激肌肉。\n3. 前臂离开大腿或凳子支撑面，导致姿势不稳且容易受伤。', '如果感到手腕压力过大，可以将手掌更贴近大腿，或使用较薄的垫子垫在手腕下方来减少不适感。对于手腕灵活性较差的人，可以先从较小的动作幅度开始，逐渐增加活动范围。', 'isolation', '{"正握腕弯举":"将哑铃翻转为掌心向上，锻炼前臂屈肌，可形成拮抗肌群训练组合。","锤式腕弯举":"保持手掌相对（中立握法），可同时锻炼前臂屈伸肌群。","绳索腕弯举":"使用龙门架绳索装置，提供恒定的阻力，增加训练变化。","机器腕弯举":"使用专门的前臂训练机器，提供更稳定的支撑和运动轨迹。"}', 'published', NOW(3), NOW(3));
SET @eid_128 = LAST_INSERT_ID();
-- Suggested muscle: 指伸肌 (agonist)
-- Suggested muscle: 腕伸肌 (agonist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 肱二头肌 (antagonist)
-- Suggested muscle: 腕屈肌 (antagonist)
-- Suggested muscle: 前臂屈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('握力器练习', 'arms', 'other', 'beginner', NULL, '1. 坐姿或站姿保持背部挺直，双脚平放在地面，双手握住握力器的两端，确保手指自然弯曲且握力器在手心贴合。\n2. 调整握力器的阻力至适合初学者的等级（通常为轻阻力），确保在挤压时能够完整闭合握柄。\n3. 在吸气时缓慢用力收紧手指，将握力器完全压合至手心感受到明显的阻力，保持收缩状态约2-3秒。\n4. 呼气时缓慢放松手指，让握力器回到起始位置，注意控制回弹的速度，避免猛然松开导致手部冲击。\n5. 完成设定的次数（如每组10-12次），每组之间可稍作休息30秒，注意手部是否出现疼痛或不适。\n6. 训练结束后进行轻柔的手腕和前臂伸展动作，以帮助肌肉放松并防止僵硬。', '1. 握力器的阻力要适中，切勿使用超出个人承受范围的重量，以免导致手部肌腱拉伤。\n2. 在练习过程中保持手腕自然伸直，避免出现过度屈曲或伸展，这样可以降低腕关节的压力。\n3. 若感到手部刺痛、麻木或持续疼痛，应立即停止训练并咨询专业的运动康复师或医生。', '1. 使用过大的阻力导致动作不完整、出现代偿（比如用手臂力量帮助挤压），从而影响训练效果。\n2. 手腕在挤压时过度屈曲或伸展，违背了中立位原则，容易引起腕关节不适。\n3. 练习时屏住呼吸或忘记控制回弹速度，导致手部冲击过大，增加受伤风险。', '1. 如感到当前阻力过轻，可逐步更换阻力更大的握力器或增加重复次数；若出现疲劳过早，可降低阻力或减少每组次数。
2. 调整握柄宽度和手柄形状，选择适合自己手型的握力器，以保持舒适且能完整闭合。
3. 若手腕或手部有旧伤，可在专业指导下使用软垫或改为握力球、弹力带等低冲击变体进行练习。', 'isolation', '{"变体类型":"握力球、弹力带、阻力环","转换建议":"如果手头没有握力器，可以使用握力球或弹力带进行类似的手指挤压训练；若想增加难度，可使用阻力环并调节其张力；若想训练前臂伸肌，可在保持抓握的同时进行手指伸展动作，形成拮抗训练。"}', 'published', NOW(3), NOW(3));
SET @eid_130 = LAST_INSERT_ID();
-- Suggested muscle: 前臂屈肌（指屈腕屈指肌） (agonist)
-- Suggested muscle: 前臂伸肌（前臂伸腕伸指肌） (antagonist)
-- Suggested muscle: 肱二头肌 (stabilizer)
-- Suggested muscle: 肱三头肌 (stabilizer)
-- Suggested muscle: 手腕屈肌（桡侧腕屈肌） (synergist)
-- Suggested muscle: 手腕伸肌（桡侧腕伸肌） (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('悬垂重物', 'arms', 'barbell', 'intermediate', NULL, '1. 站立，双脚与肩同宽，双手正握杠铃，握距略宽于肩。\n2. 将杠铃从地面拉起至膝盖高度位置，然后继续向上拉至手臂完全伸展，杠铃悬垂在头顶上方。\n3. 在头顶位置保持1-2秒，确保肩关节稳定，肘关节微屈。\n4. 控制杠铃缓慢下放至胸前或膝盖高度位置，保持手臂伸直。\n5. 重复此悬挂-下放动作，或将杠铃平稳放回地面。', '1. 确保肩关节周围肌肉已充分热身，避免肩部损伤。\n2. 在悬挂位置时保持核心紧绷，避免腰椎过度前凸或后凸。\n3. 始终控制杠铃的移动路径，避免杠铃前后或左右晃动造成伤害。', '1. 在悬挂位置时耸肩或肘关节过度弯曲，导致肩部压力过大。\n2. 核心不稳定导致身体前后晃动，影响动作安全性。\n3. 下放速度过快，缺乏控制，容易造成肩关节损伤。', '初学者可从较轻的杠铃重量开始练习，逐渐增加负重。建议在镜子前练习或请教练指导，以确保动作姿势正确。可根据个人柔韧性调整悬挂高度，肩部活动受限者可适当调整握距。', 'compound', '{"变体类型":"可转换为哑铃悬垂重物，降低重量提高控制能力；或转换为单臂悬挂动作，增加核心稳定性挑战；也可结合深蹲成为悬挂深蹲变体。","器械转换":"可使用壶铃或trx悬挂训练带替代杠铃进行类似训练。"}', 'published', NOW(3), NOW(3));
SET @eid_131 = LAST_INSERT_ID();
-- Suggested muscle: 三角肌 (agonist)
-- Suggested muscle: 斜方肌 (agonist)
-- Suggested muscle: 肱二头肌 (synergist)
-- Suggested muscle: 前锯肌 (synergist)
-- Suggested muscle: 菱形肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 胸大肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('杠铃背后腕弯举', 'arms', 'barbell', 'intermediate', NULL, '1. 站立，双脚与肩同宽，膝盖微屈，身体保持正直，核心收紧。2. 将杠铃从身后或从地面拉起，双手反握杠铃，握距与肩同宽，手臂在身体后方完全伸展。3. 保持大臂固定不动，仅通过手腕向上弯举杠铃，使手腕达到最高位置。4. 在顶端位置略作停顿，充分感受前臂肌肉的收缩。5. 缓慢控制地将杠铃放下，回到起始位置，手腕处于最低点。6. 重复进行规定的次数，动作过程中保持匀速节奏。', '选择适当的重量，避免使用过大重量导致手腕受伤或动作变形,动作过程中保持核心稳定，避免身体前后摆动借力,如果握力不足，可以使用助力带或护腕带来辅助完成动作', '使用过重重量导致动作变形，手臂参与发力过多,肘关节弯曲，将动作变成了臂弯举而非腕弯举,动作速度过快，缺乏对前臂肌肉的充分刺激和收缩感', '初学者建议从较轻重量开始练习，逐步掌握动作要领；可以将杠铃靠在身后的凳子或架子上起始，减少体力消耗；如果手腕活动受限，可以在动作前进行适当的热身和拉伸；根据训练目标调整握距，较窄握距重点刺激桡侧腕屈肌，较宽握距刺激范围更广。', 'isolation', '{"哑铃变体":"可将杠铃换成哑铃，采用坐姿进行哑铃腕弯举，灵活性更好","机器变体":"使用前臂训练机进行腕弯举训练，固定轨迹更安全","绳索变体":"使用绳索器械进行腕弯举，可以更好地控制阻力曲线","进阶变体":"可尝试单手背后腕弯举，增加动作难度和对肌肉的孤立刺激"}', 'published', NOW(3), NOW(3));
SET @eid_132 = LAST_INSERT_ID();
-- Suggested muscle: 桡侧腕屈肌 (agonist)
-- Suggested muscle: 尺侧腕屈肌 (agonist)
-- Suggested muscle: 掌长肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 二头肌 (stabilizer)
-- Suggested muscle: 前臂屈肌群 (agonist)
-- Suggested muscle: 腕伸肌群 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃反向腕弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 站姿或坐姿，双手各持一只适当重量的哑铃，手掌向下（俯卧握法），手臂自然下垂，肘部略微弯曲，保持上臂与地面基本平行。\n2. 将哑铃放在大腿上或身体两侧，确保手腕位于膝部或椅子边缘的支撑点上方，保持前臂固定不动。\n3. 通过伸展腕部向上抬哑铃（即手腕向背部方向伸展），尽量让手腕抬至最高点，感受前臂背侧的拉伸与收缩。\n4. 在最高点稍作停顿（约1秒），确认动作仅由腕部完成，避免使用肘部或肩膀的力量。\n5. 缓慢放低哑铃，回到起始位置，手腕回到中立或稍微屈曲的状态，完成一次完整的动作。\n6. 按计划的次数重复，保持呼吸均匀——上抬时吸气，下放时呼气。', '动作前进行手腕和前臂的热身，例如轻轻转动手腕或用手指做轻柔的伸展，以防止肌腱受伤。,选择适当的重量，避免使用过重的哑铃导致手腕屈伸时产生过度负荷或突然的弹力。,在整个动作过程中保持肘部贴近身体且不晃动，确保力量主要作用在腕部，防止肩部或背部代偿引发伤害。', '使用过重的哑铃导致肘部或肩部参与动作，出现“大臂摆动”而不是纯粹的腕部伸展。,在动作的最高点没有充分伸展手腕，或者在下降时速度过快，导致动作失去控制。,动作过程中手腕外翻（偏离中立位），增加了腕关节的压力，容易引起不适或受伤。', '如果感到前臂背侧力量不足，可先将哑铃换成轻重量或使用阻力带进行练习；若想增加难度，可在平板凳上支撑前臂进行坐姿练习，或在哑铃上加装加重片；手掌可以尝试中立握法（锤子握法）以略微改变刺激部位。', 'isolation', '{"变体类型":"器材或姿势变体","转换建议":"可将哑铃换成杠铃进行站姿或坐姿的杠铃反向腕弯举，或使用绳索/阻力带实现相同的腕部伸展；如果想更强调前臂背侧的离心收缩，可尝试在动作的下降阶段加入慢速控制（3-4秒）进行离心训练。"}', 'published', NOW(3), NOW(3));
SET @eid_133 = LAST_INSERT_ID();
-- Suggested muscle: 桡侧腕伸肌 (agonist)
-- Suggested muscle: 尺侧腕伸肌 (agonist)
-- Suggested muscle: 指伸肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 腕屈肌（桡侧腕屈肌、尺侧腕屈肌） (antagonist)
-- Suggested muscle: 前臂深层屈肌（如屈指深肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('弹力带手腕练习', 'arms', 'other', 'beginner', NULL, '1. 站立或坐姿，双脚与肩同宽，保持背部挺直。\n2. 将弹力带固定在手掌下方或环绕手腕，确保弹力带有适当张力。\n3. 选择手掌向上（掌心朝上）进行手腕屈曲，或手掌向下（掌心朝下）进行手腕伸展。\n4. 保持前臂固定，仅通过手腕屈伸动作将弹力带向上或向下拉。\n5. 在达到最大伸展或屈曲位置时，稍作停顿1‑2秒，以增强肌肉收缩感。\n6. 缓慢回到起始位置，保持弹力带张力，重复动作至目标次数。', '1. 运动前检查弹力带是否有裂纹或磨损，防止断裂导致受伤。\n2. 保持肩部和上臂放松，避免使用肩部力量代偿手腕动作。\n3. 若感到手腕或前臂出现疼痛或不适，应立即停止并降低弹力强度或停止练习。', '1. 使用阻力过大的弹力带，导致动作幅度不足或姿势不稳。\n2. 在动作过程中让前臂旋转或移动，失去孤立手腕的效果。\n3. 没有固定肘部，使肩膀参与动作，降低手腕的刺激强度。', '初学者可以先选用轻阻力的弹力带，逐步增加阻力；如果手腕活动受限，可在坐姿下使用支撑垫保持前臂舒适；通过改变手掌方向（掌心向上/向下）可针对不同的手腕屈伸角度进行微调。', 'isolation', '{"哑铃变体":"使用哑铃替代弹力带进行手腕屈伸，保持肘部固定，只通过手腕动作完成练习。","杠铃变体":"使用杠铃进行手腕卷曲，双手握杠，固定前臂，仅通过手腕屈伸动作提升阻力。","绳索变体":"在绳索训练器上使用低重量滑轮，握住手柄进行手腕屈伸，模拟弹力带的阻力感受。"}', 'published', NOW(3), NOW(3));
SET @eid_134 = LAST_INSERT_ID();
-- Suggested muscle: 腕屈肌群（桡侧腕屈肌、尺侧腕屈肌） (agonist)
-- Suggested muscle: 掌长肌 (synergist)
-- Suggested muscle: 腕伸肌群（桡侧腕伸肌、尺侧腕伸肌） (antagonist)
-- Suggested muscle: 肱桡肌 (stabilizer)
-- Suggested muscle: 前臂屈肌（指浅屈肌、指深屈肌） (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('手掌朝上握杆', 'arms', 'barbell', 'intermediate', NULL, '1. 双脚与肩同宽站立，双手采用反握（掌心向上）握距与肩同宽握住杠铃，杠铃位于大腿前方，手臂自然下垂。2. 保持上臂固定不动，仅通过弯曲肘关节发力，将杠铃向上弯举至肩膀高度。3. 在动作顶端稍微停顿，充分收缩肱二头肌。4. 缓慢控制地将杠铃放回起始位置，手臂完全伸展但不要完全锁死。5. 重复上述动作，完成预定次数。', '确保使用适当的重量，避免使用过重的负荷导致借力或姿势变形；整个动作过程中保持核心收紧，避免身体前后摆动借力；下降阶段要控制速度，避免杠铃突然下落造成手腕或肘关节损伤。', '上臂随着动作前后移动，导致肩膀参与发力而不是孤立刺激肱二头肌；使用过重重量导致身体摆动借力，降低训练效果并增加受伤风险；动作速度过快，缺乏对肌肉的持续张力，尤其是下降阶段控制不足。', '如果手腕疲劳或感到不适，可以佩戴护腕或调整握距；如果肱桡肌过于酸痛，可以减小握距或将杠铃换成EZ杆或哑铃以减少手腕压力；初学者建议从轻重量开始，重点掌握动作技术后再逐渐增加负荷。', 'isolation', '{"变体类型":"可转换为哑铃交替弯举以增加单边训练和平衡发展；可换成EZ杆减少手腕压力并改变刺激角度；可采用俯身或斜板角度针对肱二头肌不同头来改变肌肉刺激。"}', 'published', NOW(3), NOW(3));
SET @eid_135 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前三角肌 (stabilizer)
-- Suggested muscle: 斜方肌 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃手指练习', 'arms', 'dumbbell', 'beginner', NULL, '1. 坐在凳子上，双脚平放地面，背部保持自然挺直。 2. 手掌向上握住哑铃，手腕保持中立位置（即手腕与前臂呈一直线）。 3. 将哑铃放置在手掌上，用手指的力量向上屈曲，将哑铃提起约5-10厘米，保持1-2秒，感受手指和前臂的收缩。 4. 慢慢放松手指，让哑铃缓慢下降回到起始位置，保持对重量的控制，避免猛摔。 5. 重复进行12-15次，完成2-3组，组间休息30-60秒。', '使用适当重量的哑铃，避免过重导致手指或前臂拉伤。,保持手腕自然姿势，避免过度屈曲或背屈，以防止腕关节受伤。,训练前进行手指和前臂的热身，如轻柔的手指伸展和手腕转动。', '使用过重的哑铃导致动作失控，增加受伤风险。,手腕过度屈曲或背屈，容易造成腕部不适。,动作过快，缺少对重量的控制，降低训练效果并易受伤。', '初学者可先使用轻重量哑铃或徒手练习，待力量提升后逐步增加重量。,如感到手腕不适，可改为坐姿并将前臂放置在软垫上，以减轻压力。,可通过调节哑铃倾斜角度或使用不同形状的握把来改变难度和刺激部位。', 'isolation', '{"变体类型":"可使用壶铃、握力球或弹力带进行相同的手指训练，亦可改用更轻重量的哑铃或进行单手练习，以满足不同力量水平的需求。"}', 'published', NOW(3), NOW(3));
SET @eid_136 = LAST_INSERT_ID();
-- Suggested muscle: 手指屈肌（深层） (agonist)
-- Suggested muscle: 手指屈肌（浅层） (agonist)
-- Suggested muscle: 前臂屈肌群 (synergist)
-- Suggested muscle: 手腕屈肌 (stabilizer)
-- Suggested muscle: 手指伸肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索腕弯举', 'arms', 'cable', 'intermediate', NULL, '1. 调整滑轮高度至胸前或略低于肩部，保持站姿，双脚与肩同宽，膝盖微屈，背部挺直。\n2. 双手握住绳索或握把，手掌向上（掌心朝上），手臂自然下垂，肘部略微弯曲并贴近身体两侧。\n3. 在保持上臂固定的前提下，缓慢用前臂的力量将绳索向上卷起，直至手腕完全屈曲（手腕向手掌方向弯曲）。\n4. 在最高点稍作停顿，感受前臂屈肌的收缩，然后控制着力量慢慢放下绳索，回归起始姿势。\n5. 重复动作至所需的次数，整个过程中保持呼吸均匀，发力时呼气，下放时吸气。', '1. 使用重量不宜过大，确保能够完整控制动作的全程范围，避免借力导致伤害。\n2. 保持肘部贴近身体且上臂固定，切勿在动作过程中出现肘部外摆或耸肩的情况。\n3. 若感到手腕、肘部或肩部出现不适，应立即停止并检查姿势或请教教练。', '1. 使用过大的重量导致动作失控，出现用手臂摆动或弯腰借力的情况。\n2. 动作过程中肘部向外展开或耸肩，使上臂参与力量，降低对前臂的刺激效果。\n3. 在下降阶段没有控制速度，快速放回起点，这样容易导致肌肉受伤并降低训练效果。', '1. 根据个人身高和柔韧性调节滑轮高度，使手臂在起始位置自然下垂且不感到紧绷。
2. 如手腕活动受限，可适当缩小握把宽度或使用垫子垫高手腕，保持舒适度。
3. 若需要增加难度，可在保持正确姿势的前提下，延长卷起时间或加入等距收缩（顶峰保持 2-3 秒）。', 'isolation', '{"杠铃腕弯举":"使用杠铃替代绳索，保持相同的握法（掌心向上）和上臂固定，重量要适中，注意控制动作幅度。","哑铃腕弯举":"单手或双手握住哑铃，同样采用掌心向上姿势，进行卷腕动作，可在坐姿或站姿下进行。","腕力球":"使用腕力球进行类似的屈腕动作，注意保持肘部固定，动作速度要缓慢控制，以加强对前臂的控制。","阻力带腕弯举":"将阻力带固定在手腕处，做卷腕动作，同样适用于家庭或旅行时的替代训练。"}', 'published', NOW(3), NOW(3));
SET @eid_139 = LAST_INSERT_ID();
-- Suggested muscle: 尺侧腕屈肌 (agonist)
-- Suggested muscle: 桡侧腕屈肌 (agonist)
-- Suggested muscle: 掌长肌 (agonist)
-- Suggested muscle: 指屈肌群 (synergist)
-- Suggested muscle: 尺侧腕伸肌 (antagonist)
-- Suggested muscle: 桡侧腕伸肌 (antagonist)
-- Suggested muscle: 上臂二头肌 (stabilizer)
-- Suggested muscle: 肩胛带肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃静态握力', 'arms', 'dumbbell', 'beginner', NULL, '1. 选取合适的哑铃重量，站在双脚与肩同宽的位置，保持身体自然直立。\n2. 单手或双手握住哑铃，手指自然包住哑铃柄，拇指与其他四指形成稳定的握把。\n3. 肘部保持微屈状态，肩部放松，收紧核心肌群以维持身体稳定。\n4. 保持静态握持，控制呼吸，尽量保持哑铃不动，维持20-30秒（或根据训练目标设定时间）。\n5. 完成后轻轻放下哑铃，休息30秒至1分钟，重复进行设定次数。', '1. 确保哑铃把手无裂纹或松动，使用前检查哑铃的锁紧装置。\n2. 避免使用过重的哑铃，以免在握持过程中因力量不足导致手腕或前臂受伤。\n3. 若出现手腕、前臂或肩部疼痛，应立即停止练习并咨询专业教练或医生。', '1. 使用过重的哑铃导致姿势不稳、手腕过度屈曲或过度伸展。\n2. 锁紧肘部或耸肩，导致肩部不必要的紧张。\n3. 握持时出现手臂或手腕的微动，失去真正的静态训练效果。', '可以通过改变握把宽度、采用双手或单手握持、或使用加厚握柄来调节难度。若想增加负荷，可在保持时间不变的前提下逐步提升哑铃重量；若想降低难度，可缩短握持时间或使用较轻的哑铃。', 'isolation', '{"单手握哑铃":"可通过换成较重的单手哑铃或改变握距来提升前臂和握力负荷。","双手握哑铃":"可尝试双手交叉握持或使用不同宽度的哑铃，以增加手部协同发力和握持难度。"}', 'published', NOW(3), NOW(3));
SET @eid_140 = LAST_INSERT_ID();
-- Suggested muscle: 前臂屈肌群 (agonist)
-- Suggested muscle: 前臂伸肌群 (stabilizer)
-- Suggested muscle: 肱二头肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 肩部（三角肌前束） (stabilizer)
-- Suggested muscle: 核心肌群（腹直肌、腹外斜肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('链条握力练习', 'arms', 'other', 'intermediate', NULL, '1. 准备链条：选择长度适中、表面光滑无锋利边缘的链条，确保末端有安全扣或把手。\n2. 起始姿势：双脚与肩同宽站立或坐在训练凳上，背部挺直，肩膀放松，双臂自然下垂。\n3. 握持链条：将链条折叠成双股或单股，用手掌和全部手指紧紧抓住链条的中间或末端，感受链条重量分布在手心。\n4. 保持收缩：保持手腕自然伸展或略微屈曲（根据个人舒适度），用力握紧链条并维持 2‑3 秒，感受前臂和手部的紧绷感。\n5. 放松回归：缓慢松开手指，让链条自然垂回起始位置，重复动作。\n6. 训练安排：每次练习 8‑12 次为 1 组，完成 3‑4 组，组间休息 60‑90 秒。', '1. 检查链条是否完好，避免出现裂纹、锋利边缘或松动的环节，以防割伤或勒伤。\n2. 练习时保持手腕在舒适范围内活动，切勿猛然甩动链条，防止手腕扭伤或软组织拉伤。\n3. 如出现手部疼痛、刺痛或麻木感，应立即停止训练并咨询专业教练或医生。', '1. 手腕过度屈曲或背屈，使手腕受力不均，增加受伤风险。\n2. 仅用指尖抓握链条，未使用全掌包裹，导致握力分布不均，训练效果降低。\n3. 使用冲力或快速甩动链条来完成动作，削弱对前臂肌肉的刺激，并容易导致意外拉伤。', '• 链条长度：若链条太长导致手腕过度伸展，可将链条对折或使用更短的链条。
• 握持宽度：可根据手掌大小调节链条的折叠宽度，确保手指能够完整包裹链条。
• 难度调节：初期可使用轻链条，随后逐步增加链条重量或延长握持时间来提升难度。
• 手腕角度：若感到手腕不适，可尝试轻微屈腕或保持中立位，以减轻压力。', 'isolation', '{"变体类型":"哑铃握力练习","转换建议":"将链条替换为适当重量的哑铃或握力球，保持相同的握持姿势（手掌包裹、手指紧扣），按照相同的次数和组数进行训练，可通过增减哑铃重量来调节难度。"}', 'published', NOW(3), NOW(3));
SET @eid_141 = LAST_INSERT_ID();
-- Suggested muscle: 前臂屈肌群 (agonist)
-- Suggested muscle: 手指屈肌 (agonist)
-- Suggested muscle: 腕屈肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 腕伸肌群 (antagonist)
-- Suggested muscle: 手内部小肌肉 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('吊环悬垂', 'arms', 'bodyweight', 'intermediate', NULL, '1. 调整吊环高度，使双手握住吊环时手臂伸直，脚尖离地，身体呈垂直线。\n2. 双手握住吊环，间距略比肩宽，手指紧握，手掌朝向身体前方。\n3. 收紧腹部和臀部肌肉，保持肩胛骨自然下沉，胸部轻微向前挺，形成稳固的悬垂姿势。\n4. 保持自然呼吸，维持悬垂姿势10–30秒或根据训练计划设定时间。\n5. 如需进阶，可在悬垂时做轻微的肩胛收拢（向下压）或手臂轻微伸展，以增加肌肉刺激。\n6. 完成后，缓慢放松手臂，慢慢下降至地面或借助梯子、垫子帮助恢复。', '在练习前务必检查吊环、支架及挂钩是否稳固，无松动或锈蚀，避免意外坠落。,如果肩部或手腕力量不足，切勿强行保持过长时间，防止肩袖或前臂受伤。,初学者或力量不足者应在有经验的教练或同伴的监督下进行，必要时使用辅助工具或降低悬垂时间。', '耸肩或肩胛骨上提，导致肩部压力过大，应始终保持肩胛骨自然下沉。,身体出现明显摆动或摇晃，核心稳定性不足，建议收紧腹部和臀部以固定躯干。,握环过紧或握法不正确，使前臂过度疲劳，正确握法应为手掌向前、手指均匀受力。', '若肩关节活动度受限，可适当将吊环向外倾斜约15°，降低肩部外展角度；如果想增加难度，可在悬垂时加入轻微的肩胛收拢或手臂伸展动作；若力量不足，可先进行双脚支撑的半悬垂，逐步延长无支撑时间。', 'compound', '{"单臂吊环悬垂":"先进行双脚辅助的标准悬垂，逐步减少辅助力量（如只使用单脚轻触），最终过渡到单臂悬垂，注意保持肩胛骨下沉和核心收紧。","侧向吊环悬垂":"将身体向一侧倾斜约30°，对侧背阔肌和肩胛提肌负荷增大，可用于提升侧向力量和核心稳定性。","站姿吊环悬垂":"降低吊环高度至站立即可触及的高度，进行站姿悬垂，适合肩部或腕部受限的练习者。"}', 'published', NOW(3), NOW(3));
SET @eid_142 = LAST_INSERT_ID();
-- Suggested muscle: 背阔肌 (agonist)
-- Suggested muscle: 大圆肌 (synergist)
-- Suggested muscle: 肩胛提肌 (synergist)
-- Suggested muscle: 斜方肌中部/下部 (synergist)
-- Suggested muscle: 三角肌后束 (synergist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)
-- Suggested muscle: 核心肌群（腹横肌、腹内斜肌） (stabilizer)
-- Suggested muscle: 胸大肌 (antagonist)
-- Suggested muscle: 三角肌前束 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('手指俯卧撑', 'arms', 'bodyweight', 'advanced', NULL, '1. 准备姿势：四肢着地，双手的手指张开放在地面上，手指指向脚方向，保持手指与肩同宽或略宽，手掌离地，仅用手指支撑体重。双脚并拢，脚尖撑地，身体呈直线。\n2. 身体对齐：从头到脚保持自然直线，收腹收紧臀部，确保脊柱中立，不要塌腰或拱背。\n3. 下降过程：屈肘，慢慢将胸部向下靠近地面，保持手肘略向外展开，肘部角度保持在约45-90度之间，保持手指用力撑住地面。\n4. 推起过程：在底部稍作停顿后，利用胸部、肩部和三头肌的力量，将身体向上推回起始姿势，手指继续提供支撑，确保全程保持身体稳定。\n5. 呼吸配合：下降时吸气，推起时呼气，保持呼吸与动作的同步，避免憋气。\n6. 完成次数：根据个人能力，完成设定的重复次数，保持动作全程控制，不要弹震。', '1. 在进行手指俯卧撑前，确保手指和手腕已经热身，防止肌腱受伤。\n2. 出现手腕或手指疼痛时应立即停止，避免过度负荷导致扭伤或骨折。\n3. 初学者应在稳固的平面上练习，或先在软垫上进行，以减少冲击。', '1. 手腕塌陷：下降时手腕过度向内或向外倾斜，增加受伤风险。\n2. 手指未均匀承重：只用拇指或小指支撑，导致手指受力不均。\n3. 动作不完整：只做半程俯卧撑或肩部提前离开地面，降低训练效果。', '1. 如果手指力量不足，可先从四指支撑或使用俯卧撑支架降低难度。
2. 随着能力提升，可尝试单手手指俯卧撑或使用指尖进行变体。
3. 对于手腕柔韧性差的人群，可使用手腕护具或在俯卧撑前进行手腕伸展。', 'compound', '{"单手手指俯卧撑":"从双手手指俯卧撑升级，将一只手抬起，仅用另一只手的全部手指支撑，难度更高。","四指俯卧撑":"将手指数量减少至四指，降低手指承重，适合力量提升初期。","指尖俯卧撑":"在完成标准手指俯卧撑后，可尝试仅用指尖进行，进一步强化手指力量。"}', 'published', NOW(3), NOW(3));
SET @eid_143 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 三头肌 (synergist)
-- Suggested muscle: 腕屈伸肌群 (stabilizer)
-- Suggested muscle: 核心肌群 (stabilizer)
-- Suggested muscle: 背阔肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('负重手指俯卧撑', 'arms', 'bodyweight', 'advanced', NULL, '1. 起始姿势：四肢着地，手指自然张开并均匀压在地面上，背部放置负重背心或哑铃，核心收紧，身体从头部到脚踝保持一条直线。\n2. 调整手指：将手指略微内收，使指根部的压力更集中，手腕保持自然微屈，避免过度屈曲或背屈。\n3. 下降阶段：屈肘，缓慢将身体向下落至胸部接近地面，保持臀部与身体平齐，手指持续均匀承担负重，避免手臂外翻或肩部前倾。\n4. 推起阶段：胸大肌、肱三头肌和前三角肌协同发力，将身体推回起始姿势，手指继续支撑重量，保持动作平稳，避免弹跳或突然发力。\n5. 呼吸配合：下降时吸气，推起时呼气，保持呼吸与动作节奏同步，防止憋气导致血压升高。', '1. 必须在完全热身手指、前臂和肩部后再进行负重手指俯卧撑，以防止肌腱拉伤。\n2. 使用的负重应由轻到重逐步增加，避免一次性负重过大导致手腕或手指受伤。\n3. 若出现手指刺痛、手腕不适或肩部疼痛，应立即停止并检查姿势或减轻负重。', '1. 手指受力不均，导致单侧指根过度负荷，容易引起腱鞘炎。\n2. 臀部抬起或下沉，使核心失去支撑，增加了腰椎压力。\n3. 手肘过度外翻或过度靠外，导致肩关节受力过大，增加受伤风险。', '1. 降低难度：将手指改为拳头或使用俯卧撑把手，减小指根的负荷。
2. 增加难度：在背部加重背心或使用哑铃绑在背部，逐步提升负重。
3. 调整手位：手距离略窄于肩宽可更好地刺激手指屈肌，手距略宽则更侧重胸大肌。
4. 使用辅助工具：在手指下方放置软垫或瑜伽砖，可减轻直接压地的冲击。', 'compound', '{"传统俯卧撑":"将手指平放转为标准手掌俯卧撑，降低手指负荷，侧重胸大肌和肱三头肌。","拳头俯卧撑":"将手指卷成拳头进行俯卧撑，适合作为手指俯卧撑的过渡动作，减小指根压力。","负重手指俯卧撑":"在背部放置负重背心或挂载哑铃带，循序增加负重，提升手指抗压能力和前臂力量。","俯卧撑板手指版":"使用带有凸起的手指支撑板，让手指在更稳固的表面上进行俯卧撑，适合进阶训练。","倒立手指俯卧撑":"将身体倒立后在墙壁或支撑物上进行手指俯卧撑，大幅提升上肢力量和技术难度。"}', 'published', NOW(3), NOW(3));
SET @eid_144 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 手指屈肌群（前臂深层） (agonist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 腕屈肌（前臂） (synergist)
-- Suggested muscle: 手指伸肌群（前臂） (antagonist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('速握练习', 'arms', 'other', 'intermediate', NULL, '1. 准备姿势：双脚与肩同宽站立或坐姿，保持背部挺直，双手自然垂于身体两侧。\n2. 握住训练工具（如握力球、握力棒或毛巾），手掌朝上，手指自然弯曲，掌心紧贴工具表面。\n3. 快速收紧手指，用最大力量在1秒内完成全力握紧，保持握力1-2秒后立即放松。\n4. 在握紧的最高点，保持肌肉紧绷，感受前臂屈肌的收缩；随后快速放开，手指恢复到自然伸展状态。\n5. 重复进行10-15次为一组，组间休息30秒至1分钟，完成3-4组。\n6. 进阶可使用更硬的握力工具或在握紧时加入手腕屈伸动作，以增加难度。', '1. 训练前确保手部、肩部和背部无疼痛或受伤。\n2. 握力工具的表面应光滑、无尖锐边角，防止皮肤受伤。\n3. 训练时保持呼吸顺畅，避免在握紧时屏气，以防止血压升高。', '1. 使用过大的重量或过硬的工具导致手指、腕部或前臂过度负荷。\n2. 动作过快、缺乏控制，仅靠弹力而不是主动收缩肌肉。\n3. 训练时肩部耸起或背部弓背，导致上半身不必要的紧张。', '1. 初学者可以先用柔软的海绵球或毛巾练习，逐步过渡到更硬的握力工具。
2. 如出现手腕疼痛，可将手腕保持中立位或略微背屈，以减轻屈肌的张力。
3. 训练强度可根据个人握力水平调节，建议在每组动作能够完成15次以上且不出现疲劳过度的情况下逐渐增加负荷。', 'isolation', '{"单手速握":"将工具放在一只手中进行练习，可专注单侧力量与姿势的矫正。","双手速握":"双手同时握住工具，训练对称性和整体握力，适合作为热身或恢复训练。","负重速握":"在使用握力工具时，可通过悬挂小哑铃或负重带来增加阻力，提高力量耐力。"}', 'published', NOW(3), NOW(3));
SET @eid_145 = LAST_INSERT_ID();
-- Suggested muscle: 前臂屈肌（指深屈肌、指浅屈肌） (agonist)
-- Suggested muscle: 腕屈肌（尺侧腕屈肌、桡侧腕屈肌） (agonist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 二头肌（上臂二头肌） (stabilizer)
-- Suggested muscle: 前臂伸肌（指伸肌、腕伸肌） (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃二头三头组合', 'arms', 'dumbbell', 'intermediate', NULL, '1. 站立，双脚与肩同宽，双手各持一只哑铃，手臂自然垂于身体两侧，掌心朝前。2. 保持上臂固定不动，仅通过弯曲肘关节将哑铃向上举起，同时呼气，感受二头肌的收缩，当哑铃接近肩部时暂停。3. 在顶峰位置保持1-2秒，充分收缩二头肌。4. 缓慢下放哑铃回到起始位置，同时吸气，控制动作速度不要让哑铃自由下落。5. 完成一组二头肌动作后，保持上臂固定，将哑铃翻转为掌心朝上。6. 弯曲肘关节将哑铃向上推起，专注于三头肌发力，在顶峰位置保持1-2秒后缓慢放下。', '确保使用适当重量的哑铃，避免因重量过大导致动作变形或受伤；保持核心收紧，背部挺直，避免弓背或驼背；动作过程中保持肩部放松，不要耸肩或借助肩部力量完成动作。', '身体摇晃借力，用身体摆动代替手臂发力；动作速度过快，没有在收缩和伸展阶段保持控制；肘关节位置不固定，向前或向后移动。', '初学者可以先分开练习二头和三头动作，熟练后再组合；可将双手动作改为单手交替进行，以便更好地感受肌肉收缩；如果肩部不适，可以在肘部夹紧身体两侧的基础上略微向前倾斜；可以根据自身情况调整每组次数和组数。', 'compound', '{"单臂版本":"改为单手交替进行，可更好地专注于动作细节和肌肉感受","坐姿版本":"坐在有靠背的凳子上进行，减少身体晃动，增加核心稳定性","锤式变体":"将掌心相对改为锤式握法，重点锻炼肱肌和二头肌外侧头"}', 'published', NOW(3), NOW(3));
SET @eid_146 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 三角肌后束 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('器械臂部组合', 'arms', 'machine', 'intermediate', NULL, '1. 调整器械座椅高度，使手臂自然下垂时手柄与肩部平齐；2. 握住手柄，保持掌心向上（用于弯举）或向下（用于伸展），背部和臀部紧贴靠背，保持核心收紧；3. 吸气，使用手臂力量缓慢将手柄向胸部方向拉起，肘关节保持固定在身体两侧，完成弯举动作；4. 在顶峰位置略微停顿，感受到二头肌的收缩；5. 呼气，缓慢将手柄放回起始位置，肘关节保持微屈；6. 如需进行三头肌训练，将手掌翻转，伸直手臂将手柄向下压，同样保持背部稳定，完成伸展动作。', '1. 在使用器械前，确认所有调节螺栓已锁紧，避免座椅或手柄意外滑动；2. 选择合适的重量，避免使用过重导致摆动或失控；3. 动作过程中保持背部紧贴靠背，防止脊柱受力过大。', '1. 使用过大幅度的摆动或借力，导致动作失去针对性；2. 肘关节在弯举时向外展开，增加肩部参与；3. 没有在动作全程保持肘部微屈，导致关节过度伸展或锁定。', '1. 调整座椅高度，使手柄在起始位置时手臂伸直但不过度伸展；2. 根据个人臂长调节手柄的前后位置，使肘关节位于机器轴心的正上方；3. 如感到肩部不适，可适当降低手柄高度或使用垫子减轻肩部压力。', 'compound', '{"变体类型":"单臂哑铃弯举 + 单臂三头肌下压","转换建议":"若想更专注于单侧肌肉发展，可改为使用哑铃分别进行弯举和伸展；若需增加核心参与，可在不稳定的平衡板上进行相同动作。"}', 'published', NOW(3), NOW(3));
SET @eid_147 = LAST_INSERT_ID();
-- Suggested muscle: 二头肌（肱二头肌） (agonist)
-- Suggested muscle: 三头肌（肱三头肌） (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前三角肌 (stabilizer)
-- Suggested muscle: 肩胛稳定肌群（斜方肌、前锯肌） (stabilizer)
-- Suggested muscle: 胸大肌 (antagonist)
-- Suggested muscle: 背阔肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('站姿杠铃弯举+臂屈伸', 'arms', 'barbell', 'advanced', NULL, '1. 站立于杠铃前，双脚与肩同宽，保持核心收紧，握住杠铃采用反握（掌心向上），握距略比肩宽。 2. 手臂自然下垂于身体两侧，肘关节靠近躯干，上臂保持固定垂直于地面，这是起始姿势。 3. 收缩二头肌发力，将杠铃向上弯举，保持上臂不动，直到杠铃接近肩部高度，二头肌充分收缩。 4. 在弯举最高点停顿后，保持上臂固定，将杠铃向前上方推举或直接下压，实现臂屈伸动作。 5. 缓慢控制地将杠铃返回到起始位置，保持对重量的完全控制，避免惯性摆动。 6. 重复完成规定的次数，整个过程保持肘关节稳定，避免肩膀前移或耸肩。', '1. 确保肘关节全程保持靠近身体两侧，避免肘部过度前移导致肩部代偿。 2. 控制动作速度，避免使用惯性或甩动来完成动作，始终保持对重量的控制。 3. 如感到肘关节或肩部不适，应立即停止动作并降低重量或改用较简单的变体。', '1. 肘关节在动作过程中向前大幅移动，使上臂不再垂直，借用肩部力量完成动作。 2. 身体摆动或利用惯性甩动杠铃，这不仅降低训练效果，还增加受伤风险。 3. 在臂屈伸阶段过度伸展肘关节或耸肩，导致动作变形和关节压力增加。', '1. 如感到手腕不适，可使用EZ杆或曲杆杠铃替代直杠铃，减轻手腕压力。 2. 初学者建议先分开练习两个动作，待熟练后再尝试组合动作。 3. 如无法完成全程动作范围，可采用半程动作，随着力量提升逐步增加活动范围。 4. 可使用哑铃替代杠铃，以获得更大的动作灵活性和更好的肌肉刺激。', 'compound', '{"简化变体":"先单独练习杠铃弯举，待动作熟练后再加入臂屈伸动作，可减轻重量专注于动作质量","难度提升":"增加重量同时保持完美动作形式，或在弯举顶端加入2秒顶峰收缩","器材变换":"可使用EZ杆减轻手腕压力，或使用哑铃提供更自由的运动轨迹"}', 'published', NOW(3), NOW(3));
SET @eid_148 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 前臂屈肌 (synergist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('超级组（弯举+下压）', 'arms', 'cable', 'intermediate', NULL, '1. 调整龙门架滑轮高度至略高于肩部，站在器械正前方，双脚与肩同宽，膝盖微屈保持稳定。\n2. 双手握住绳索把手，手臂自然下垂，手肘贴近身体两侧，肩部保持放松。\n3. 超级组前半部分-弯举：保持上臂固定不动，弯曲手肘将把手拉向肩部方向，同时呼气，在顶峰位置挤压肱二头肌。\n4. 慢慢放下绳索至手臂接近伸直，但在完全伸直前停止，保持肌肉张力。\n5. 超级组后半部分-下压：保持上臂固定，肱三头肌发力向下压绳索，直到手臂接近完全伸直，同时呼气，在底部位置停顿挤压肱三头肌。\n6. 缓慢回到起始位置（手臂微屈），重复完成设定的次数后换边训练。', '训练过程中始终保持核心收紧，避免借助身体晃动发力；动作全程上臂应保持贴近身体两侧，防止肩关节过度前伸造成压力；选择适当重量，从轻负荷开始确保动作规范后再逐步增加。', '上臂在动作过程中前后摆动，借用身体惯性完成动作，导致目标肌肉刺激不足；重量过大导致动作变形，手腕过度外翻或内扣，造成关节压力；下压时手腕参与发力而非手臂发力，降低了训练效果。', '初学者可以先将两个动作分开练习，待动作熟练后再组合成超级组；如果关节活动受限，可适当调整握把角度；进阶训练可尝试单侧交替进行或延长顶峰收缩时间。', 'compound', '{"器材转换":"可替换为弹力带、哑铃或杠铃完成类似动作","动作转换":"可拆分为单独的绳索弯举和下压进行分组训练","难度调整":"新手可采用轻重量的固定组，中级可做超级组，高级可加入暂停-保持技术"}', 'published', NOW(3), NOW(3));
SET @eid_149 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱三头肌 (antagonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 腕屈肌群 (stabilizer)
-- Suggested muscle: 肩袖肌群 (stabilizer)
-- Suggested muscle: 核心肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('递减组弯举', 'arms', 'dumbbell', 'advanced', NULL, '1. 双手各持一只适当重量的哑铃，双脚与肩同宽站立，掌心朝前，手臂自然下垂于身体两侧。2. 保持上臂固定不动，仅通过弯曲肘关节将哑铃向肩部方向抬起，同时呼气，感受二头肌的收缩。3. 在动作顶峰位置停顿一秒钟，充分挤压二头肌。4. 缓慢地将哑铃放回起始位置，同时吸气，保持对上臂的控制。5. 完成预定的次数后，立即换到更轻的哑铃继续完成下一组，或者立即减少重量继续做下一组，重复直到无法继续完成标准动作。', '确保使用合适的重量，避免因重量过重导致动作变形而受伤；整个动作过程中保持核心收紧，避免借助身体摆动发力；若有肩部或肘部不适，应立即停止并咨询专业人士。', '使用过重的重量导致摆动身体借力完成动作；动作过程中上臂前后摆动而非保持固定；在下降阶段控制不当，速度过快。', '初学者可以先从单臂练习开始，待动作熟练后再进行双手递减组；手腕力量不足时可考虑使用护腕提供支撑；如果肩部活动受限，可适当调整握距或手臂角度。', 'isolation', '{"单臂变体":"可以先从单手递减组弯举开始练习，逐步掌握动作要领后再转为双手同时进行","替代器材":"可用杠铃弯举或EZ杆弯举替代哑铃进行递减组训练","调整角度":"将上斜凳角度调至45度左右进行上斜哑铃弯举的递减组，可进一步强化二头肌不同区域"}', 'published', NOW(3), NOW(3));
SET @eid_150 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前三角肌 (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)
-- Suggested muscle: 斜方肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('三头肌完整训练', 'arms', 'cable', 'advanced', NULL, '1. 调整滑轮至高位，选择绳索或直杆，双手握住把手，站姿或坐姿保持背部挺直，肘部靠近身体并屈约90度。\n2. 保持上臂固定，通过伸展肘关节将把手向下推，直至手臂几乎伸直。\n3. 在最低点用力收缩三头肌，保持1-2秒，感受肌肉紧绷。\n4. 缓慢控制地将把手回到起始位置，避免弹力让肘部完全屈回。\n5. 呼吸配合：推时呼气，返回时吸气，保持呼吸节奏一致。\n6. 完成规定的次数后，进行适度的三头肌伸展放松，以促进血液循环和柔韧性。', '1. 使用前检查滑轮、绳索或把手是否牢固，避免设备突然脱落在训练过程中造成伤害。\n2. 保持核心收紧、胸部微挺，避免在推压时弓背或耸肩，以免对腰椎和肩关节产生过大压力。\n3. 避免在动作最低点完全锁死肘关节，这会增加关节冲击，建议保持轻微的屈肘角度。', '1. 使用过重负荷导致肩部或背部代偿，使得三头肌的刺激减弱。\n2. 动作幅度不足，未将肘关节完全伸展或未在最低点充分收缩，导致训练效果下降。\n3. 肘部外展或向外打开，使上臂失去固定，导致前臂过度参与，降低三头肌的孤立效果。', '1. 把手类型：可使用绳索、直杆或V型把手，不同把手会改变手腕角度和刺激部位。
2. 滑轮高度：高位滑轮适合下压动作，低位滑轮可进行仰卧臂屈伸或俯身伸展，提供不同的拉伸角度。
3. 单臂/双臂：单臂练习可加强单侧力量和平衡感，双臂练习则更适合提升整体负荷。', 'isolation', '{"把手类型":"可使用绳索、直杆或V型把手，不同把手会改变手腕角度和刺激部位。","滑轮高度":"高位滑轮适合下压动作，低位滑轮可进行仰卧臂屈伸或俯身伸展，提供不同的拉伸角度。","单臂/双臂":"单臂练习可加强单侧力量和平衡感，双臂练习则更适合提升整体负荷。"}', 'published', NOW(3), NOW(3));
SET @eid_152 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌 (agonist)
-- Suggested muscle: 肘肌 (synergist)
-- Suggested muscle: 肩后束 (synergist)
-- Suggested muscle: 前臂屈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('二头肌完整训练', 'arms', 'barbell', 'advanced', NULL, '1. 站立，双脚与肩同宽，双手握住杠铃，手掌向上，握距略宽于肩宽。\n2. 保持背部挺直，核心收紧，肩胛骨自然后收，避免耸肩。\n3. 以肱二头肌收缩为主，将杠铃向上弯举至肩部高度，手肘全程保持贴近身体两侧。\n4. 在最高点稍作停顿，充分收缩二头肌，然后缓慢控制下放杠铃回到起始位置。\n5. 完成预定次数后，保持杠铃不落地，放松手臂，准备进行下一组。\n6. 训练过程中保持呼吸均匀：发力时吸气，下放时呼气。', '始终使用合适的杠铃重量，避免使用过重导致姿势失控或伤害。,保持脊柱自然曲度，避免在弯举时弓背或过度前倾，以减少下背压力。,使用固定支架或训练伙伴时，确保杠铃在失控情况下能够安全放置。', '在弯举过程中摆动身体或使用冲力，导致主要负荷转移至背部或腿部。,肘部外张或前移，使得二头肌的刺激减弱且增加肩部压力。,下放时速度过快，未能控制负荷，容易导致肌肉拉伤或关节冲击。', '如果感到手腕不适，可尝试使用EZ杆或调节握距；若想增加二头肌的顶峰收缩，可在动作顶端做轻微的外旋；若需要更专注于短头，可稍微放宽握距并采用倾斜站姿。', 'isolation', '{"哑铃弯举":"使用相同的技术要点，换用哑铃可以增加手腕活动范围并更好地纠正左右不对称。","绳索弯举":"将杠铃换成低位滑轮绳索，可在全程保持恒定张力，特别适合强化顶峰收缩。","EZ杆弯举":"使用EZ杆能够减轻手腕压力，适合手腕有不适或希望降低前臂参与度的练习者。"}', 'published', NOW(3), NOW(3));
SET @eid_153 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌（短头） (agonist)
-- Suggested muscle: 肱二头肌（长头） (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)
-- Suggested muscle: 三角肌前束 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('站姿臂部循环', 'arms', 'dumbbell', 'intermediate', NULL, '1. 站立，双脚与肩同宽，膝盖微屈，保持核心收紧。\n2. 双手各持一只哑铃，手臂自然下垂，手掌朝向身体两侧。\n3. 起始姿势保持肩胛骨微微后收，挺胸收腹，目视前方。\n4. 开始做圆形轨迹：先向前方抬起双臂，使其在肩部高度形成约30度的角度，随后以肩关节为轴，向前做小幅的圆形循环。\n5. 完成一次完整的前向圆形后，继续向侧面（外展）和后侧（后伸）画圈，保持动作连贯、速度均匀，循环次数或时间可自行设定（如每侧10-15次）。\n6. 循环结束后，缓慢将哑铃放下，回到起始姿势，短暂休息后换方向或重复。', '使用适当重量的哑铃，避免过重导致肩关节过度负荷。,保持肩胛骨自然收紧，避免耸肩或过度前倾。,如感到肩部疼痛或不适，应立即停止并降低重量或改为徒手练习。', '手臂伸得太直或锁死，导致肩关节受压。,动作速度过快，利用惯性而非肌肉控制，容易造成伤害。,肩胛骨未保持稳定，导致肩带上抬耸肩，降低锻炼效果。', '如果肩部活动度受限，可先使用徒手或极轻的哑铃进行小幅圆形练习；可将动作改为单臂交替进行，以更好地专注于每侧肌肉；对于核心不稳的人群，可靠在墙边或使用支撑杆帮助保持平衡。', 'isolation', '{"坐姿臂部循环":"在坐姿下进行，减少核心参与，专注于肩部活动范围。","单臂循环":"每次只用一只手臂进行，可加强单侧控制与肌肉平衡。","负重臂部循环":"将哑铃换成杠铃或加重壶铃，提高阻力，适用于力量提升阶段。"}', 'published', NOW(3), NOW(3));
SET @eid_155 = LAST_INSERT_ID();
-- Suggested muscle: 三角肌前束 (agonist)
-- Suggested muscle: 三角肌侧束 (agonist)
-- Suggested muscle: 三角肌后束 (agonist)
-- Suggested muscle: 斜方肌 (stabilizer)
-- Suggested muscle: 肩袖肌群（冈上肌、冈下肌、小圆肌、肩胛下肌） (stabilizer)
-- Suggested muscle: 肱二头肌 (synergist)
-- Suggested muscle: 肱三头肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('单臂哑铃弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 站立，双脚与肩同宽，保持背部挺直，核心收紧。\n2. 单手握住哑铃，掌心向上，手臂自然垂于体侧，肘部贴近腰部。\n3. 吸气时，以肘部为支点，仅用前臂将哑铃向上卷起，确保上臂保持固定，不要外展。\n4. 在顶峰位置稍作停顿（约1秒），感受肱二头肌的收缩。\n5. 呼气，缓慢控制地将哑铃放回起始位置，手腕保持中立，避免猛然下落。', '选择适当的重量，避免在动作过程中出现明显的摆动或耸肩。,保持肘部紧贴体侧，防止肘关节过度外展导致关节压力增大。,全程保持核心收紧、脊柱自然曲度，避免背部过度弓起或前倾。', '在弯举时肘部向外展开，导致上臂参与过多，减少二头肌的刺激。,动作过快或使用摆动力量完成弯举，降低肌肉收缩效果并增加受伤风险。,在顶峰位置没有充分停顿或未完全伸展，使动作范围不完整。', '若感到手腕压力过大，可稍微向内转动手腕，使掌心略微向身体方向倾斜；若肩部容易耸肩，可尝试在胸前放置一块垫子或使用倾斜的训练凳来固定上臂；在力量提升后，可通过调整哑铃重量或采用斜板/斜凳弯举来增加挑战。', 'isolation', '{"变体类型":"双侧哑铃弯举","转换建议":"将单臂弯举改为双手同时进行，可使用相同或略增的重量，以保持平衡并提升整体训练强度。若想进一步改变负荷分配，可考虑使用杠铃弯举或斜板弯举等变体。"}', 'published', NOW(3), NOW(3));
SET @eid_156 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('偏重哑铃弯举', 'arms', 'dumbbell', 'intermediate', NULL, '1. 站立，双脚与肩同宽，保持背部挺直，双手各持一只哑铃，手臂自然下垂，掌心朝向大腿前侧。\n2. 收紧核心，收缩肩胛骨，然后以肘部为支点，将哑铃向上弯举，同时外旋手腕，使掌心向上。\n3. 在弯举的最高点，稍作停顿，确保肱二头肌完全收缩。\n4. 缓慢控制地下放哑铃，回到起始位置，保持肌肉张力，避免完全伸直手臂。\n5（可选）. 完成指定次数后，换另一只手或交替进行。', '1. 保持背部挺直，避免在弯举时弓背或摆动身体，以防止腰椎受伤。\n2. 使用适当重量的哑铃，避免使用过大重量导致动作失控或肩部过度负荷。\n3. 在进行动作时，确保肘部贴近身体侧面，防止肘部外展导致肩部受伤。', '1. 借助身体摆动或耸肩来完成弯举，导致二头肌的刺激减弱。\n2. 在上举过程中手腕外旋不足，导致前臂参与过多。\n3. 下放时速度过快，未能充分控制负荷，容易导致肘关节受伤。', '1. 若感到肩部不适，可将肘部略微向前移动，减小肩部前倾的角度。
2. 握距可以根据个人前臂长度稍作调整，确保手腕保持自然直线。
3. 初学者建议先使用较轻重量的哑铃，专注于动作的完整性和肌肉感受，再逐步增加负荷。', 'isolation', '{"单臂弯举":"将哑铃放在身体一侧，单独使用一只手进行弯举，可更好地专注单侧肌肉并纠正左右力量不平衡。","交替弯举":"左右手交替进行，每完成一次动作即换手，有助于保持核心稳定并延长训练时间。","坐姿弯举":"坐在凳子上进行，可降低身体摆动，专注于二头肌的孤立收缩。","斜板弯举":"在倾斜的哑铃凳上进行，利用上斜角度增加下半程的负荷，提升二头肌的顶峰收缩感。"}', 'published', NOW(3), NOW(3));
SET @eid_158 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('支撑哑铃弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 准备姿势：坐在稳固的长凳或站直，双脚自然分开与肩同宽。一只手握住哑铃，另一只手的手掌或前臂放在同侧大腿或凳面上提供支撑，确保上臂自然下垂，肘部靠近身体侧面。\n2. 起始动作：保持上臂固定，手掌可向前（掌心朝前）或向内（掌心相对），通过屈肘将哑铃向上提起，注意肘部不要向前或向外移动。\n3. 动作进行：当哑铃提升至大约肩膀高度时，顶峰收缩1‑2秒，感受二头肌的紧绷，保持肩部稳定，避免耸肩。\n4. 放下动作：缓慢控制地将哑铃放回起始位置，手臂完全伸展但不完全锁定，以保持肌肉张力。\n5. 完成次数后换另一侧手臂，或根据训练计划交替进行。', '- 选用合适重量的哑铃，避免使用过重导致动作失控或产生肩部、腰部代偿。\n- 保持背部挺直，不要弓背或借助身体摆动提起哑铃，以防止腰椎受伤。\n- 确保支撑手臂稳固，肘部紧贴身体侧面，防止在提升时出现肩部不必要的移动。', '- 使用大幅摆动或借助身体惯性提升哑铃，降低二头肌的实际负荷。\n- 动作幅度过浅，只做半程弯举，未能充分伸展或收缩二头肌。\n- 肘部外张或向前移动，导致肩部参与过多，失去对二头肌的孤立刺激。', '- 如出现手腕不适，可将哑铃稍微向内转握，或使用护腕带提供支撑。
- 初学者建议先用轻重量练习，确保动作轨迹正确后再逐步增加负荷。
- 若想提升难度，可改为站立姿势并去掉支撑手，或采用交替弯举方式。', 'isolation', '{"无支撑弯举":"去掉支撑手，改为站立单臂弯举，让肩部与核心更参与，提高整体复合性。","斜板弯举":"使用倾斜的训练凳，手肘靠在凳面上进行弯举，可增加二头肌的伸展范围并改变刺激角度。","锤式弯举":"手掌相对握哑铃，主要刺激肱肌与二头肌的不同部位，适合增加前臂力量。","坐姿交替弯举":"在坐姿支撑的基础上交替举起两只哑铃，可提高动作的连贯性和心肺负荷。"}', 'published', NOW(3), NOW(3));
SET @eid_159 = LAST_INSERT_ID();
-- Suggested muscle: 二头肌（长头与短头） (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三头肌 (antagonist)
-- Suggested muscle: 前臂屈肌群（桡侧腕屈肌、尺侧腕屈肌等） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧杠铃臂屈伸', 'arms', 'barbell', 'intermediate', NULL, '1. 仰卧在平凳上，双手握杠铃，握距略窄于肩宽，掌心朝向脚的方向。 2. 将杠铃举至胸部上方，手臂伸直，这是动作的起始位置。 3. 保持上臂垂直于地面，屈肘缓慢将杠铃下降至额头前方。 4. 在动作底部稍作停顿，然后收缩肱三头肌将杠铃推回起始位置。 5. 重复完成指定次数，保持动作节奏平稳。', '确保凳子稳固且放置平稳，避免滑动造成伤害。 下降过程中控制速度，不要让杠铃自由下落。 选择适当重量，初学者建议从空杆或较轻重量开始练习。', '肘关节过度外展，导致肩部代偿发力。 动作过程中身体过度晃动，使用腰腹力量抬升杠铃。 下降幅度不够，仅做了半程动作，影响锻炼效果。', '初学者可先徒手或使用较轻重量练习动作轨迹。 可调整凳子角度为上斜或下斜改变刺激部位。 握距变窄可增加对肱三头肌内侧头的刺激。', 'compound', '{"变体类型":"可转换为哑铃仰卧臂屈伸，杠铃换成EZ杆（曲杆），或使用绳索进行下压动作。换成哑铃可以更好地孤立单侧肱三头肌，换成绳索则能提供持续的阻力曲线。"}', 'published', NOW(3), NOW(3));
SET @eid_160 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 胸大肌 (synergist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 肱二头肌 (antagonist)
-- Suggested muscle: 核心肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('屈臂板臂屈伸', 'arms', 'bodyweight', 'intermediate', NULL, '1. 准备姿势：坐在训练凳或稳固的椅子边缘，双手放在身体两侧，指尖朝前，手指握住凳子边缘，肘关节略微弯曲。2. 起始位置：将双脚向前伸直放置，脚跟着地，臀部向前移动离开凳子，身体保持在凳子上方，双手支撑身体重量。3. 下降阶段：保持上半身挺直，核心收紧，缓慢弯曲肘关节，将身体向下移动，直到上臂与前臂呈约90度角，肘关节指向后方。4. 发力推起：通过三头肌发力，伸展肘关节，将身体向上推起，直到手臂接近伸直，但不要完全锁死肘关节。5. 动作控制：在顶端略作停顿后，缓慢控制下降过程，保持核心稳定，避免身体晃动。6. 重复进行：根据训练目标，重复完成8-12次为一组。', '1. 确保使用的凳子或椅子稳固无晃动，表面干净防滑，承重能力足以支撑全身重量。2. 下降时控制速度，避免猛然下坠导致肩关节或肘关节受伤，肘关节弯曲角度不宜过深。3. 如有肩关节、肘关节或腕关节问题，应谨慎进行或选择其他替代动作，训练前建议咨询专业教练或物理治疗师。', '1. 肩关节过度前伸：许多人在下降时让肩膀耸起或向前移动，导致肩部压力过大，应保持肩胛骨微微后收下沉。2. 动作幅度不足：只做小幅度的屈伸，没有充分伸展或收缩肌肉，降低了训练效果，应尽量达到标准角度。3. 腰部过度弓背：核心力量不足导致下背部过度弯曲，对腰椎造成压力，应在动作全程保持核心收紧和脊柱中立。', '初学者可以将双脚弯曲，膝盖呈90度放置以降低难度，或者减少动作幅度；进阶者可以在膝关节处绑上沙袋增加负重，或者采用单腿支撑来增加挑战；如手腕不适，可以选择把手掌向内旋转或使用把手辅助。', 'compound', '{"退阶变体":"双脚靠近身体放置，膝盖弯曲，减少力臂和负荷","进阶变体":"在膝关节处绑沙袋负重或抬起单腿，增加三头肌负荷","器材替代":"可使用双杠或专门的臂屈伸器械来进行相同动作模式的训练"}', 'published', NOW(3), NOW(3));
SET @eid_161 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 胸大肌 (synergist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 肱二头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('EZ杆杠铃弯举', 'arms', 'barbell', 'beginner', NULL, '1. 站立，双脚与肩同宽，双手握住EZ杆，手掌向上（掌心朝前），手臂自然垂于体侧。\n2. 收紧核心，背部保持正直，肩胛骨略微后收，避免耸肩。\n3. 吸气时，肘部固定在身体两侧，利用肱二头肌的力量将杠铃向上卷起至肩部高度，手腕保持中立，不旋转。\n4. 在顶峰位置保持1-2秒，感受到二头肌的最大收缩。\n5. 呼气时，缓慢将杠铃放下回到起始姿势，手臂不完全伸直，以保持肌肉张力。\n6. 重复指定次数，注意全程控制动作，避免借助身体摆动。', '必须在稳固的地面上站立，避免滑倒；若感到下背部不适，可站在垫子上或使用靠墙姿势。,使用适当重量的杠铃，避免使用过重导致肘关节或肩关节超负荷。,保持肘部固定在体侧，避免在举重过程中出现肘部前伸或外展，以免造成肘关节受伤。', '借助身体摆动或利用背部力量将杠铃举起，导致动作失去对肱二头肌的孤立刺激。,在动作顶部过度伸展肘关节，或在下放时手臂完全伸直，导致肘部承受过大压力。,手腕过度外翻或内翻，导致手腕疼痛或桡神经受压。', '如有肩部不适，可将肘部略微向前移动，减小肩部负担；初学者可先使用较轻的杠铃或采用中立握法（手掌相对）来降低手腕压力；若想增加难度，可在顶峰位置做短暂的等长收缩，或使用负重背心增加负荷。', 'isolation', '{"直杠铃弯举":"将EZ杆替换为直杠铃，注意手腕姿势略有不同，需保持手腕中立。","哑铃弯举":"使用哑铃可以实现单臂训练，便于纠正左右力量不对称。","绳索弯举":"使用滑轮装置可提供恒定的张力，适合在训练后期加入。","锤式弯举":"改用锤式握法（手掌相对）可重点锻炼肱肌和肱桡肌。"}', 'published', NOW(3), NOW(3));
SET @eid_403 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)
-- Suggested muscle: 三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('V绳下压', 'arms', 'cable', 'intermediate', NULL, '1. 调整滑轮高度至约与肩同高，站在器械正前方，双脚与肩同宽站立，保持核心收紧、背部挺直。2. 双手握住V形把手，掌心向下，握距与肩同宽或略宽于肩，手臂自然下垂。3. 肘关节紧贴身体两侧，前臂与地面垂直，这是动作的起始位置。4. 呼气的同时，集中使用三头肌的力量将把手向下压，肘关节保持固定，只有前臂活动。5. 继续下压直至手臂完全伸直，感觉三头肌充分收缩，在底部位置停顿1-2秒进行顶峰收缩。6. 吸气时，缓慢控制地将把手回到起始位置，手臂回到约90度角，保持肘关节始终贴近身体。', '动作过程中始终保持肘关节固定不要外展，避免肩部前束过度参与导致肩关节压力过大,选择合适的重量以确保动作控制，不要借用身体前倾的力量完成动作,保持核心收紧、背部挺直，避免弓背或过度后仰以保护腰椎', '肘关节在动作过程中向外打开或上下移动，导致目标肌肉刺激减少,身体过度后仰或前倾，借用惯性完成动作，降低了三头肌的锻炼效果,动作速度过快且不到达完全伸直的位置，无法充分刺激三头肌,重量选择过重导致动作变形，这是常见的安全隐患', '对于初学者建议使用较轻重量专注于动作规范，可先将滑轮调低减少运动范围逐步适应；手腕力量较弱时可使用护腕带辅助；如感到肩部不适可减小握距使肘部更贴近身体；女性或初学者可从单手绳索下压开始练习以建立正确的肌肉记忆。', 'isolation', '{"单手绳索下压":"将双手V绳替换为单手绳索把手，改为单手进行动作，可更好地孤立训练单侧三头肌，同时纠正左右力量不平衡问题","直杆下压":"将V形把手替换为直杆进行下压，肩部外旋角度改变会对三头肌不同头产生不同刺激","仰卧臂屈伸":"改为仰卧在平凳上进行绳索臂屈伸，重力方向改变使三头肌在更多角度得到锻炼","过顶臂屈伸":"将动作方向改为向上推举，可在绳索高位进行，主要强化三头肌长头"}', 'published', NOW(3), NOW(3));
SET @eid_417 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 肘肌 (synergist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('三头肌完整训练', 'arms', 'cable', 'advanced', NULL, '1. 调整滑轮高度至约上胸部位置，双手握住绳索或V形手柄，手臂自然伸展，手肘微屈并靠近身体两侧。\n2. 站稳双脚与肩同宽，核心收紧，胸部微挺，肩胛骨略微后收，确保肩部固定。\n3. 在吸气的同时，利用三头肌的力量将手柄向下降，直至手臂完全伸展，手肘保持略微弯曲以避免锁死。\n4. 在顶峰位置保持约1秒的收缩，感受三头肌的紧绷。\n5. 呼气时，以受控的速度将手柄向上收回至起始位置，手肘仍保持靠近身体，保持张力。\n6. 完成设定的次数后，缓慢放回重量，避免弹力冲击。', '确保滑轮固定稳妥，钢索无明显磨损或卡滞，防止在运动过程中出现突发断裂。,保持手肘在运动全程略微弯曲，避免完全锁死导致关节受压。,在动作进行时保持核心和肩部稳定，避免借助身体摆动或耸肩完成动作。', '使用过重的负荷导致身体晃动，借力完成动作，削弱三头肌的刺激。,手肘外张或向两侧展开，使得力矩转移到肩部，增加肩关节受伤风险。,动作幅度不足，只做半程伸展，无法充分收缩三头肌的所有纤维。', '如感到肩部不适，可将滑轮高度略微降低或改用单臂绳索进行练习；若力量充足，可在全程保持手肘微屈的前提下适度增加重量；若对三头肌内侧头刺激不足，可在收手柄时加入手腕外旋的动作。', 'isolation', '{"变体类型":"哑铃俯身臂屈伸","转换建议":"将滑轮换为哑铃，站立弯腰俯身，手臂自然下垂后举哑铃向上伸展至手臂伸直，保持相同的肘部位置和收缩时间，可实现相同的三头肌刺激。"}', 'published', NOW(3), NOW(3));
SET @eid_459 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌 (agonist)
-- Suggested muscle: 肩后束（三头肌外侧头） (synergist)
-- Suggested muscle: 肩袖肌群（冈上肌、冈下肌） (stabilizer)
-- Suggested muscle: 前臂屈伸肌群 (stabilizer)
-- Suggested muscle: 核心肌群（腹横肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('上斜哑铃弯举', 'arms', 'dumbbell', 'intermediate', NULL, '1. 调整斜凳至约45-60度角，坐在凳上，双脚平放于地面，保持背部挺直靠在凳背上。\n2. 每手握一只哑铃，手臂自然下垂，手掌朝上（正握），手肘贴近身体两侧。\n3. 吸气，利用肱二头肌的力量向上弯举哑铃，保持上臂固定，仅以前臂向上抬起，至哑铃接近肩部高度。\n4. 在顶峰位置略微停顿，感受到肱二头肌的收缩。\n5. 呼气，缓慢有控制地下放哑铃，回到起始位置，手臂不完全伸直，以保持肌肉张力。\n6. 按所需次数重复，可交替手臂或连续完成一侧后再换另一侧。', '选择适当重量，避免使用过重的哑铃导致肘关节过度负担。,动作全程保持肘部贴近身体，防止肩部前倾或摆动。,确保斜凳稳固，防止在训练过程中滑倒或失去平衡。', '肘部外张或向前移动，导致肩部参与过多，分散二头肌刺激。,动作过快，利用惯性或冲力完成弯举，降低肌肉收缩效果。,下降时手臂完全伸直，使二头肌失去张力，影响全程肌肉刺激。', '可以通过调节斜凳角度（30°‑60°）来改变二头肌的拉伸程度；使用不同重量的哑铃或采用正握/中立握法来微调发力感受；确保手肘位置固定，若感到肩膀不适可略微降低凳背倾斜角度。', 'isolation', '{"站姿哑铃弯举":"保持相同的正握手型，但手臂自然下垂而非靠在凳上，适合需要更大幅度运动的练习者。","杠铃弯举":"使用杠铃时双手握距略宽，注意双臂同步发力，避免单侧力量不平衡。","牧师凳弯举":"将手肘固定在倾斜的垫子上，可进一步孤立二头肌，减少其他肌肉的参与。"}', 'published', NOW(3), NOW(3));
SET @eid_400 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('上斜哑铃臂屈伸', 'arms', 'dumbbell', 'intermediate', NULL, '1. 调节上斜凳角度至30-45度，仰卧在凳上，双脚平稳踩在地面，肩胛骨紧贴凳面保持稳定。\n2. 双手各持一只哑铃，掌心相对，手臂伸直垂直于地面，哑铃位于胸部正上方，这是起始位置。\n3. 保持上臂固定不动，仅通过屈肘将哑铃向头部两侧缓缓下放，直到哑铃下降至耳朵两侧或稍低于头部位置，此时前臂与上臂夹角约呈90度。\n4. 在动作底部稍作停顿1-2秒，确保肱三头肌充分收缩，然后通过肱三头肌发力将哑铃向上推回起始位置。\n5. 重复完成规定次数，注意全程保持核心收紧、躯干稳定，避免借助身体摆动发力。', '1. 握紧哑铃防止滑落，必要时可使用助力带增强握力。\n2. 下放重量时控制速度，避免关节过度伸展造成损伤。\n3. 头枕靠在凳面上确保颈椎安全，不要悬空头部。', '1. 上臂跟随摆动：导致目标肌肉刺激减弱，应始终保持大臂垂直或略向后倾。\n2. 使用过大重量导致借力：身体出现明显晃动代偿，无法孤立刺激肱三头肌。\n3. 动作速度过快：尤其是向上推起阶段，应控制离心阶段并短暂顶峰收缩。', '新手可先用较轻哑铃熟悉动作轨迹；进阶者可增加凳子倾斜角度以增加动作行程；可选择EZ杆替代哑铃减少手腕压力；如感手腕不适可改为中立握法（掌心朝向身体）。', 'isolation', '{"变体类型":{"绳索下压":"可使用龙门架绳索替代，完成相同的肱三头肌孤立训练，手腕保持中立位。","过顶臂屈伸":"可改为站姿双手过顶臂屈伸，行程更长但稳定性要求更高。","窄距卧推":"转换为复合动作，双手窄距卧推可同时强化肱三头肌和胸肌。","仰卧臂屈伸":"改用直杆或EZ杆进行仰卧臂屈伸，减少手腕压力且行程更标准。","俯身臂屈伸":"改为单臂俯身哑铃臂屈伸，可更精确地孤立单侧肱三头肌。"}}', 'published', NOW(3), NOW(3));
SET @eid_429 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 肘肌 (synergist)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('二头肌完整训练', 'arms', 'barbell', 'advanced', NULL, '1. 站姿双脚与肩同宽，膝盖微弯，保持核心收紧，背部挺直，双手握住杠铃，握距略宽于肩，手掌向上。\n2. 将杠铃自然垂于大腿前侧，手肘贴近躯干，目视前方，保持肩部稳定不耸肩。\n3. 吸气时，通过二头肌发力，屈肘将杠铃向上提拉至肩部高度，手肘保持固定，仅上臂做屈曲动作。\n4. 在顶峰位置停留约1秒，收缩二头肌，感受明显的紧绷感。\n5. 呼气时，缓慢控制杠铃下放，回到起始位置，保持手臂不完全伸展，以维持肌肉张力。\n6. 按设定的次数和组数重复，保持动作的平稳与连贯，避免利用惯性完成动作。', '1. 动作全程保持肘部紧贴身体两侧，避免肘部外展导致肩部代偿。\n2. 使用合适的重量，切勿在动作末端猛拉或猛放，以防止肘关节受伤。\n3. 练习前做好热身，尤其是肩部和前臂，以免出现肌肉拉伤。', '1. 借助身体摆动或利用惯性提升杠铃，导致二头肌刺激减弱并增加腰部受伤风险。\n2. 肘部在提升过程中向外展开，使负荷转移至肩部，降低二头肌的参与度。\n3. 下放时未控制速度，手臂完全伸直后快速弹回，容易导致关节冲击和肌肉拉伤。', '如果手腕感觉不适，可将杠铃换成EZ杆或哑铃，以改变手腕角度；若想增加难度，可在斜板或倾斜凳上进行杠铃弯举；若需要针对短头或长头进行更精准刺激，可通过调节握距（宽握/窄握）实现。', 'isolation', '{"变体类型":"杠铃弯举的多种变体","转换建议":"使用EZ杆可减轻手腕压力；若想增加肱二头肌短头刺激，可采用宽握杠铃弯举；若想提升负荷，可使用绳索龙门架进行弯举；若想针对长头，可尝试斜板弯举或坐姿杠铃弯举。"}', 'published', NOW(3), NOW(3));
SET @eid_460 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前三角肌 (stabilizer)
-- Suggested muscle: 三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('交替哑铃弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 站立，双脚与肩同宽，保持背部挺直，双手各持一只哑铃，手臂自然下垂，掌心朝前。\n2. 收紧核心，保持肩胛骨微微后收，确保肘部贴近身体两侧。\n3. 右臂屈肘，将哑铃向肩部方向卷起，保持上臂不动，只使用前臂和上臂的屈肘动作；在最高点顶峰收缩二头肌，保持约1-2秒。\n4. 缓慢放下哑铃至手臂完全伸展但不完全锁死，保持张力；完成右臂一次后，换左臂重复相同动作。\n5. 交替进行，达到设定的次数（如每侧8-12次），注意呼吸：向上卷起时吸气，向下放回时呼气。\n6. 训练结束后，轻柔伸展二头肌，帮助放松肌肉。', '训练前进行5-10分钟的热身，尤其是手腕和肩部，以防止拉伤。,使用适当重量，保持动作全程可控，避免利用惯性或身体摆动来完成动作。,保持手腕自然中立，若出现手腕疼痛或不适，应立即停止并检查握法和重量。', '利用身体摆动或抬起肩膀来完成弯举，导致目标肌肉受力不足。,肘部外展或向前移动，削弱二头肌的收缩并增加肩部压力。,动作幅度不完整，弯举时未将哑铃完全卷至肩部，或放下时未控制好下降速度。', '可以根据个人柔韧性和目标调整以下细节：
- 握法：掌心向上（标准弯举）或中立握法（锤式弯举）可改变二头肌和肱桡肌的参与程度。
- 肘部位置：将肘部轻微向前或向后移动，可增加或减少对上臂前侧的拉伸感。
- 动作范围：在最高点进行顶峰收缩时，可稍微向内旋转前臂，以更强化二头肌的峰值。
- 训练节奏：采用慢速下降（3-4秒）可增加肌肉张力，提高训练效果。', 'isolation', '{"锤式弯举":"将手掌相对，使用中立握法，可更好激活肱桡肌和前臂肌群。","斜板弯举":"在倾斜的平板上进行，限制身体摆动，更专注二头肌顶峰收缩。","坐姿弯举":"坐在凳子上进行，减少核心参与，提升对二头的孤立刺激。"}', 'published', NOW(3), NOW(3));
SET @eid_399 = LAST_INSERT_ID();
-- Suggested muscle: 二头肌（肱二头肌） (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)
-- Suggested muscle: 三头肌（肱三头肌） (antagonist)
-- Suggested muscle: 前三角肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧哑铃臂屈伸', 'arms', 'dumbbell', 'beginner', NULL, '1. 仰面平躺在训练凳上，双脚踏实地面，核心收紧保持身体稳定，双手各持一只哑铃，掌心向上握持。2. 将哑铃举至胸部正上方位置，手臂伸直但肘关节微屈，确保哑铃稳定。3. 吸气时，缓慢弯曲肘关节，将哑铃下降至头部两侧，保持上臂固定不动，仅以前臂为杠杆向下放。4. 在动作底部稍作停顿，感受肱三头肌被充分拉伸。5. 呼气时，肱三头肌发力，将哑铃向上推起至手臂重新伸直。6. 在顶端挤压肱三头肌一秒，然后按照相同的轨迹重复进行。', '1. 动作过程中务必保持核心收紧，避免下背部过度弓起造成腰椎压力，可在下背部与凳面之间留出一掌宽度。2. 选择合适的重量，新手建议从较轻的哑铃开始，确保能够控制动作全程的稳定性和规范性。3. 避免在动作底部将哑铃完全下放至接触头部，应留有安全距离防止意外发生。', '1. 肘关节在动作过程中外展偏移，使上臂离开初始位置，降低了对肱三头肌的刺激效果。2. 动作速度过快，借助惯性完成动作，无法充分感受目标肌群的发力。3. 动作幅度不足，只进行半程训练，未能完整拉伸和收缩肱三头肌。', '新手可将双脚放于训练凳两侧支撑身体以增强稳定性，同时选择较轻重量的哑铃专注于动作质量而非负荷。有经验的训练者可将双脚平放地面，通过增强核心控制来提高动作难度，也可在动作顶部进行短暂顶峰收缩以增强肌肉刺激。', 'isolation', '{"器材转换":"可使用EZ杆或直杆连接滑轮替代哑铃，进行绳索臂屈伸。","姿势变体":"可坐在斜凳上进行，减少下背部的参与，更专注于肱三头肌的孤立收缩。","难度调整":"可将双哑铃改为单手进行，便于纠正左右力量不平衡问题。"}', 'published', NOW(3), NOW(3));
SET @eid_431 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 肱二头肌 (antagonist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 胸大肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧杠铃臂屈伸', 'arms', 'barbell', 'intermediate', NULL, '1. 躺在水平卧推凳或训练凳上，双脚踏实地面，臀部、腰背紧贴凳面。双手握住杠铃，手间距约与肩同宽或略窄，手臂伸直，杠铃位于胸部正上方。\n2. 收紧核心，保持背部平直，以肘部为支点，缓慢将杠铃向头后方向下降，保持上臂（即上臂骨）贴近身体，肘部弯曲约90度。\n3. 在下降过程中控制速度，避免肘部向外展开或肩膀过度前倾。杠铃下降至头后约与耳朵平齐或略低于此位置。\n4. 吸气后，用三头肌的力量将杠铃向上推回起始位置，手臂再次伸直，保持全程控制，避免弹起或晃动。\n5. 完成预定次数后，缓慢将杠铃放回支架或请训练伙伴帮助稳定。', '1. 必须在稳固的凳子上进行，确保凳子不滑动，背部全程贴近凳面，防止下背弓起造成腰椎压力。\n2. 使用合适的重量，避免使用过重的杠铃导致控制不住，使肘部外翻或肩部前倾。\n3. 在下降过程中保持上臂固定，避免肩膀过度前伸，以减少肩关节受伤风险。', '1. 背部下凹或抬起臀部，导致腰椎过度弯曲，产生背部不适。\n2. 肘部外展或前倾，使上臂失去贴紧身体的状态，降低三头肌的刺激并增加肩部压力。\n3. 动作过快或利用弹力将杠铃推起，导致三头肌收缩不充分并增加受伤风险。', '1. 若感到手腕不适，可将握把略向内收，或使用护腕套减轻压力。
2. 对于肩部柔韧性较差的人，可在下降时将杠铃略微抬高，保持上臂更贴近身体，以减轻肩关节活动范围。
3. 若想增加三头肌的长头刺激，可在保持上臂固定的前提下，将杠铃稍微向外倾斜，使肘部略微向外展开。', 'isolation', '{"杠铃窄距卧推":"将卧推改为窄距握法，手间距约肩宽，保持上臂贴近身体，能够更好地激活三头肌。","EZ杆臂屈伸":"使用EZ杆可以减轻手腕压力，同时保持对三头肌的充分拉伸与收缩。","哑铃臂屈伸":"将杠铃换成两只哑铃，可分别控制两侧的肘部运动，适合单侧训练或肩部活动受限者。","绳索臂屈伸":"在绳索机上进行可提供恒定的张力，适合进行高次数、低负荷的耐力训练。"}', 'published', NOW(3), NOW(3));
SET @eid_467 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌（长头、外侧头、内侧头） (agonist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 肘肌 (synergist)
-- Suggested muscle: 二头肌 (antagonist)
-- Suggested muscle: 核心肌群（腹直肌、腹外斜肌） (stabilizer)
-- Suggested muscle: 肩胛稳定肌群（菱形肌、斜方肌中部） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('低位滑轮下压', 'arms', 'cable', 'intermediate', NULL, '1. 调整滑轮至最低位置，固定绳索或直杆，双手握距略窄于肩宽，手掌相对或向下握住手柄。\n2. 站在器械正前方，双脚与肩同宽，膝盖微屈，保持核心收紧，背部自然挺直。\n3. 吸气时，固定上臂在身体两侧，仅通过肘部伸展将手柄向下压至手臂完全伸展或接近伸展的位置，动作全程保持上臂不动。\n4. 在最低点稍作停顿，用力收缩三头肌，然后呼气，缓慢将手柄回到起始位置，保持控制的回程速度。\n5. 完成预定的次数后，重新调节重量或更换手柄进行下一组训练。', '确保滑轮固定牢固，重量挂钩稳妥，防止在动作过程中滑轮脱落或重量片掉落。,上臂在全程保持固定，不要借助身体的摆动或后倾来拉动重量，以免对肩关节造成额外负荷。,如果出现手腕或肘部不适，应立即停止并检查握距及重量是否适合，必要时使用护腕或降低重量。', '上臂在动作中抬起或前后摆动，导致肩部参与力量，降低三头肌的刺激。,使用过大的重量导致动作不完整，只能做半程动作，无法充分收缩三头肌。,回程时放松过快或直接抛回重量，失去对三头肌的控制和伸展阶段的力量训练效果。', '可以根据个人柔韧性和训练目标调整握距：窄握更强调三头肌外侧头，宽握更侧重内侧头；若肩部活动受限，可使用绳索手柄并将手掌向内旋转，以减轻肩部压力。', 'isolation', '{"窄握（直杆）":"将直杆换成窄握，可增加三头肌外侧的刺激，适用于想要塑造手臂外侧线条的训练者。","宽握（直杆）":"采用宽握（略宽于肩），更侧重三头肌内侧头和胸大肌的协同发力，适合想要提升整体推力的运动员。","绳索手柄":"使用绳索手柄并进行旋转（手掌相对），可加强对三头肌的全程收缩，适合需要增加肌肉顶峰收缩感的训练者。","单臂滑轮":"将双手分开使用单臂滑轮，能够纠正左右力量不平衡，并对核心稳定提出更高要求。"}', 'published', NOW(3), NOW(3));
SET @eid_428 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌（肱三头肌） (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 前三角肌 (stabilizer)
-- Suggested muscle: 手腕伸肌（前臂） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('偏重哑铃弯举', 'arms', 'dumbbell', 'intermediate', NULL, '1. 站姿，双脚与肩同宽，膝盖微屈，保持核心紧绷，背部挺直。\n2. 双手各持适当重量的哑铃，手臂自然下垂，掌心朝向大腿。\n3. 缓慢将哑铃向肩膀方向弯举，保持上臂固定，仅用前臂和二头肌发力。\n4. 在最高点稍微停顿，感受二头肌的收缩，然后控制性地放下哑铃回到起始位置。\n5. 可交替进行或连续完成指定次数，保持呼吸均匀（上升时呼气，下降时吸气）。\n6. 完成训练后，轻柔地放松手臂并进行适当伸展。', '1. 动作全程保持肘部贴近身体，避免肘部外展导致肩部过度受力。\n2. 选用适当的重量，避免使用过重导致摆动或弓背。\n3. 锻炼前进行肩部、手臂和背部的热身，防止肌肉拉伤。', '1. 用身体摆动或借助惯性抬起哑铃，使二头肌受力降低。\n2. 肘部在弯举过程中向前或向外移动，增加肩部压力。\n3. 没有控制下降阶段，快速放下哑铃，容易导致关节冲击。', '1. 若感到二头肌发力不足，可改用斜板弯举或斜托弯举增加伸展范围。
2. 对于腕部不适，可在握把时使用中立握（掌心相对）或使用护腕带。
3. 初学者可先用轻重量单臂练习，逐步过渡到双臂交替或同步完成。', 'isolation', '{"杠铃弯举":"用杠铃替代哑铃，可使用相同的动作轨迹，注意握距略宽或略窄，以改变刺激部位。","锤式弯举":"变换握法为手掌相对，针对肱肌和肱桡肌提供不同的刺激。","斜托弯举":"在倾斜的训练凳上进行，增强对二头肌长头的刺激，同时减轻背部负担。"}', 'published', NOW(3), NOW(3));
SET @eid_465 = LAST_INSERT_ID();
-- Suggested muscle: 二头肌（Biceps brachii） (agonist)
-- Suggested muscle: 肱肌（Brachialis） (synergist)
-- Suggested muscle: 肱桡肌（Brachioradialis） (synergist)
-- Suggested muscle: 前臂屈肌群（Forearm flexors） (stabilizer)
-- Suggested muscle: 肩前束（Anterior deltoid） (stabilizer)
-- Suggested muscle: 背阔肌（Latissimus dorsi） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('健身球弯举', 'arms', 'dumbbell', 'intermediate', NULL, '1. 将健身球放置在身体前方，俯卧在健身球上，使腹部和大腿支撑在球面上，双脚分开与肩同宽支撑在地面上保持身体稳定。2. 双手各持一只哑铃，双臂自然下垂，让哑铃垂直于地面，保持头部与脊柱成一条直线。3. 保持上臂固定不动，仅通过弯曲肘部将哑铃向上举起，动作过程中上臂不要前后移动或外展。4. 继续弯曲肘关节，直到哑铃接近肩部位置，此时肱二头肌达到顶峰收缩，保持1-2秒。5. 缓慢伸展肘关节，有控制地将哑铃放下回到起始位置，保持肌肉持续张力，避免突然放松。6. 完成一组动作后，换到另一侧手臂继续训练，或按设定次数交替进行。', '训练前检查健身球充气是否充足，确保其稳定性足以支撑身体重量；动作过程中保持核心肌群收紧，避免腰部过度塌陷导致下背压力过大；如果感到肩部或肘关节不适，应立即停止训练并降低重量或改变姿势。', '上臂在动作过程中前后移动或向外展开，导致锻炼效果降低并增加肩部压力；使用过重的哑铃导致身体晃动、姿势变形，无法完成标准动作；动作速度过快，利用惯性完成弯举，减少了对肌肉的刺激并增加了受伤风险。', '初学者可以先从较轻的哑铃开始练习，待动作熟练后再逐渐增加重量；如果手腕感到不适，可以调整握法或使用护腕带；可以根据训练目标调整握距，宽握距主要锻炼肱二头肌短头，窄握距主要锻炼肱二头肌长头。', 'isolation', '{"变体类型":"可以转换为站姿哑铃弯举或斜板弯举，若想增加难度可采用单臂哑铃弯举或绳索弯举替代。","器材转换":"可用杠铃、阻力带或EZ杆代替哑铃进行类似训练。","难度调整":"初学者可采用较稳定的姿势如坐姿弯举，熟练后可尝试健身球上俯卧姿势增加核心参与。","强度增强":"可以通过放慢动作节奏、顶峰收缩时间延长或增加训练组数来提高训练强度。"}', 'published', NOW(3), NOW(3));
SET @eid_407 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 肱三头肌 (antagonist)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('农夫行走', 'arms', 'dumbbell', 'beginner', NULL, '1. 准备姿势：双脚与肩同宽站立，保持身体平衡，目视前方。\n2. 握持哑铃：双手紧握哑铃，手臂自然垂于身体两侧，手掌朝内。\n3. 挺胸收腹：收紧核心肌群，胸部微微挺起，肩胛骨向后下方收紧。\n4. 开始行走：交替向前迈步，保持步伐稳定，每步距离约30-45厘米。\n5. 保持姿态：行走过程中保持头部正直，背部挺直，哑铃始终贴近身体。\n6. 到达终点：完成指定距离后，缓慢放下哑铃至地面，休息后重复。', '行走时保持视线平视前方，注意脚下情况，避免绊倒或滑倒,如果感到腰部疼痛或不适，应立即停止并降低哑铃重量,使用适当的哑铃重量，新手建议从较轻重量开始逐渐增加', '行走时弓腰驼背，导致下背部压力过大,哑铃握力不足，行走过程中出现手臂外展或耸肩现象,步伐过大或过小，导致身体摇摆不稳', '初学者可以先从较轻的哑铃开始，熟悉动作模式后再逐步增加重量。如果握力不足，可使用助力带辅助。行走距离可以从10-20米开始，随着能力提升逐渐增加到30-50米。也可采用间歇行走或绕圈行走的方式进行练习。', 'compound', '{"变体类型":"可转换为单侧农夫行走（只握持一侧哑铃），增加核心抗旋转能力；也可改为农夫行走配合其他动作如绕桩行走或侧向行走，增加动作难度和功能性。"}', 'published', NOW(3), NOW(3));
SET @eid_436 = LAST_INSERT_ID();
-- Suggested muscle: 前臂屈肌 (agonist)
-- Suggested muscle: 三角肌 (synergist)
-- Suggested muscle: 斜方肌 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (antagonist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 臀大肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('凳上臂屈伸', 'arms', 'bodyweight', 'beginner', NULL, '1. 起始姿势：坐在稳固的凳子或椅子边缘，双手平放在身体两侧，手指朝前，手掌向下。\n2. 调整脚位：脚向前伸展，脚跟着地，膝盖略微弯曲，使身体重心在手掌和脚之间。\n3. 吸气下降：屈肘，慢慢将身体向下降低，保持肘部指向后方，直至上臂与前臂呈约90度角，肩部不要过度前倾。\n4. 呼气推起：利用三头肌发力，将身体向上推回起始姿势，手臂不完全伸直，保持微屈，避免锁死关节。\n5. 控制节奏：全程保持核心收紧，防止臀部上下晃动，动作应平稳、可控。\n6. 完成次数后，双手撑住凳子，缓慢站起，避免猛然起身。', '1. 确保凳子稳固不滑动，必要时靠墙或请人扶住，以防跌倒。\n2. 下降时不要过低，保持肘部角度在90度左右，避免肩关节和肘关节受到过度压力。\n3. 如有肩部或肘部不适，立即停止练习，并在专业指导下评估是否适合继续。', '1. 手臂外展，肘部向外张开，导致肩部受压和动作不稳。\n2. 下降时臀部向下沉，使腰椎过度弯曲，增加腰背受伤风险。\n3. 动作速度过快，缺乏对下降和推起阶段的控制，影响肌肉刺激效果。', '1. 降低难度：将双脚放在地面上，膝盖保持90度，减少身体自重对上肢的需求。
2. 增加难度：将双脚放在稍高的平台上，或在膝上放置哑铃，以提升负荷。
3. 调整手距：宽手距可多刺激胸大肌，窄手距则更针对三头肌，可根据训练目标灵活变换。', 'compound', '{"变体类型":"难度递进","转换建议":"若想进一步提升上肢力量，可将凳上臂屈伸改为跪姿臂屈伸或倾斜俯卧撑；若想更孤立三头肌，可尝试绳索下压或哑铃臂屈伸等动作。"}', 'published', NOW(3), NOW(3));
SET @eid_420 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌（肱三头肌） (agonist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 胸大肌（锁骨部） (synergist)
-- Suggested muscle: 二头肌（肱二头肌） (antagonist)
-- Suggested muscle: 核心肌群（腹直肌、竖脊肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('单臂哑铃弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 站姿，双脚与肩同宽，背部挺直，核心收紧。握住哑铃，手臂自然下垂，掌心朝前，肘部靠近身体侧面。\n2. 保持上臂固定，仅用前臂的力量将哑铃向上弯举至肩膀高度，动作过程保持肘部不移动。\n3. 在顶峰位置稍作停顿，感受肱二头肌的收缩，然后控制性地慢慢放下哑铃至手臂完全伸展。\n4. 完成指定次数后，换另一只手臂重复相同的动作，确保每侧的训练次数和重量相同。\n5. 如需增加难度，可在倾斜的牧师凳上进行单臂弯举，以改变上臂角度，提供不同的刺激。\n6. 全程避免身体摆动或借助惯性，保持动作的平稳与控制。', '1. 始终保持背部挺直，避免弓背或过度后仰，以减少下背压力。\n2. 使用合适的哑铃重量，避免因重量过大导致动作失控或受伤。\n3. 在举起和放下哑铃时保持肘部固定，防止肘部外展或内收导致关节扭伤。', '1. 借助身体摆动或惯性完成弯举，使目标肌肉得不到充分刺激。\n2. 肘部在动作过程中抬起或向外展开，导致肩部参与过多。\n3. 下降时控制不稳，快速放下哑铃，容易造成肌肉拉伤或关节冲击。', '1. 如感到下背压力大，可坐在有靠背的凳子上进行单臂弯举，减轻背部负担。
2. 调整哑铃重量时，建议先从轻重量开始，逐步增加，以确保动作姿势正确。
3. 如使用倾斜的牧师凳，可调节凳面角度，使上臂更贴近身体或略微前倾，以改变刺激部位。', 'isolation', '{"双手哑铃弯举":"将单臂动作改为双手同时进行时，需要适当降低哑铃重量，保持肘部固定，动作幅度与单臂相同，以维持肌肉刺激的效果。"}', 'published', NOW(3), NOW(3));
SET @eid_463 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 背阔肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('单臂绳索下压', 'arms', 'cable', 'beginner', NULL, '1. 将滑轮调至略高于头部的高度，握住绳索手柄，保持站立姿势，双脚与肩同宽；2. 调整手臂位置，使肘部紧贴身体侧面，前臂自然下垂，手掌朝向地面；3. 深吸一口气，收紧核心，保持肩部稳定，然后用力将手柄向下压至手臂完全伸直；4. 在最低点保持1–2秒，充分收缩三头肌；5. 呼气，缓慢放松手臂，让手柄回到起始位置，保持肘部角度不变；6. 完成所需的次数后，换另一侧手臂重复。', '保持肩部自然放松，避免耸肩或过度前倾；,使用适当的重量，避免在动作过程中出现弹跳或代偿；,保持核心收紧，防止下背部过度伸展或扭转。', '手肘外张或向身体前方移动，导致目标肌群受力减弱；,使用肩部或背部力量代偿，降低三头肌的刺激；,动作幅度不完整，未能完全伸展或收缩手臂。', '可根据个人柔韧性微调滑轮高度，确保手柄下压时前臂与地面平行；如肩部不适，可将肘部略微向外展开，但仍需保持贴近身体；使用不同形状的手柄（如V形或绳索球）可以改变手腕角度，增加刺激点。', 'isolation', '{"双臂绳索下压":"双手同时握住绳索手柄，保持相同的动作轨迹，可提高整体训练强度；","站姿绳索下压":"采用双脚平行站姿，适用于想要更强调核心稳定性的训练者；","单臂哑铃下压":"用哑铃代替绳索，变换力量曲线，适合在没有绳索设备的场所练习。"}', 'published', NOW(3), NOW(3));
SET @eid_464 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌（肱三头肌） (agonist)
-- Suggested muscle: 三角肌后束 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 肱二头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('双杠臂屈伸', 'arms', 'bodyweight', 'intermediate', NULL, '1. 初始姿势：站在双杠之间，双手握住杠子，掌心相对，手臂伸直，肩部略微收紧。\n2. 起始下降：收紧核心，收腹，缓慢弯曲肘部，身体垂直下降，保持胸部略微前倾，肘部呈约90度角。\n3. 动作底部：感受胸部和上臂的伸展，保持肩胛骨自然收拢，避免耸肩。\n4. 向上推起：脚尖向下用力，推动身体向上，直至手臂重新伸直，胸部略高于杠面。\n5. 重复：按相同节奏完成设定的次数。', '在进行双杠臂屈伸前进行充分的上肢和肩部热身，防止肩袖受伤。,如果力量不足或初次练习，建议使用弹力带或请同伴帮助，避免自行超深导致肩关节受压。,保持动作全程控制，避免快速弹起或锁定肘关节，以免造成肘部冲击伤害。', '肘部外翻过大，导致肩部压力增加和姿势不稳。,下降深度过深，使肩关节超出安全范围。,身体前倾过多，导致胸部刺激减弱并增加腰椎负担。', '如肩部柔韧性不足，可将双杠间距调宽或在脚下方放置垫块以减轻下降幅度；若力量不足，可使用弹力带或机械辅助装置降低负荷。', 'compound', '{"宽握变体":"将双手间距调宽，重点刺激胸大肌外侧，手臂角度更接近45度。","窄握变体":"双手间距收紧至与肩同宽或更窄，强化三头肌的参与。","弹力带辅助":"在杠子上系弹力带，脚踩或挂住带子提供向上的辅助，降低自重负荷。","器械辅助双杠机":"使用专用的双杠训练机，可调节倾斜角度或支撑点，适合初学者安全练习。"}', 'published', NOW(3), NOW(3));
SET @eid_419 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 三头肌 (agonist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 核心肌群（腹横肌、腹直肌） (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 肩胛提肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('反握杠铃弯举', 'arms', 'barbell', 'intermediate', NULL, '1. 站立，双脚与肩同宽，反握杠铃（掌心向下），握距与肩同宽或略窄于肩宽\n2. 手臂自然下垂，肘关节位于身体两侧，肩部放松，核心收紧，保持背部挺直\n3. 保持上臂固定不动，仅通过弯曲肘关节将杠铃向上弯举，前臂向肩部方向靠拢\n4. 继续弯举直到前臂与上臂接近垂直或二头肌完全收缩\n5. 在顶峰位置停留1-2秒，充分感受肱桡肌和二头肌的收缩\n6. 缓慢控制地将杠铃下放回起始位置，保持肌肉张力，避免完全放松', '选择合适重量，避免使用惯性或身体摆动来举起杠铃,保持上臂固定不动，不要借助肩部或身体力量,如感到手腕或肘关节不适，应立即停止并调整握法或减轻重量', '上臂前后移动或借助身体摆动借力,动作速度过快，使用惯性而非肌肉控制,握距过宽导致手腕承受额外压力，动作不标准', '初学者建议使用较轻重量，专注于动作控制和肌肉感受；进阶训练者可采用EZ杆或曲杆代替直杠，减少手腕压力；如手腕不适，可略微内转手腕或使用助力带', 'isolation', '{"哑铃反握弯举":"可使用哑铃进行单臂或双臂练习，增加动作活动范围，适合调整手腕角度","绳索反握弯举":"固定阻力变化提供更稳定的张力，适合做递减组或控制训练","EZ杆反握弯举":"曲杆设计减轻手腕压力，更符合人体工程学，适合手腕敏感者"}', 'published', NOW(3), NOW(3));
SET @eid_405 = LAST_INSERT_ID();
-- Suggested muscle: 肱桡肌 (agonist)
-- Suggested muscle: 肱二头肌（短头） (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱三头肌 (antagonist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 核心肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('反握腕弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 坐在凳子边缘，双手各持一只哑铃，采用反握姿势（掌心向下），前臂放在大腿上，手腕位于膝盖前方自然悬空。\n2. 保持前臂固定不动，仅通过手腕向上弯曲，将哑铃向上卷起，确保动作幅度完整。\n3. 在顶峰位置收紧前臂肌肉，保持收缩约1秒钟，充分感受前臂屈肌的紧绷。\n4. 缓慢控制地将哑铃放下，手腕逐渐向下弯曲回到起始位置，动作全程保持肌肉张力。\n5. 完成一组次数后换手进行，或双手交替进行，注意每只手都要完成相同次数以保持肌肉平衡。', '1. 选择合适的重量，避免使用过重哑铃导致手腕关节压力过大或动作变形。\n2. 动作过程中保持躯干直立，避免通过身体摆动借力，确保前臂始终稳定地放在大腿上。\n3. 如有手腕或前臂伤病，请在专业教练指导下进行，或咨询医生后再练习。', '1. 使用过重重量导致动作变形，利用惯性甩动哑铃，降低训练效果且增加受伤风险。\n2. 下降阶段速度过快，没有控制性地放低哑铃，无法充分锻炼肌肉且容易拉伤。\n3. 动作过程中上半身前倾或耸肩，将压力转移到肩部和背部，无法有效孤立训练前臂。', '1. 入门者可先从较轻哑铃开始练习，逐步适应后再增加重量。
2. 可改为双手同时握住一只哑铃进行反握腕弯举，适合单手力量较弱时使用。
3. 调整凳子高度或改变坐姿角度，找到最舒适且能有效孤立前臂的位置。
4. 熟练后可尝试俯卧姿势或利用斜凳进行不同角度的反握腕弯举。', 'isolation', '{"动作变体":"可转换为正握腕弯举（掌心向上），侧重于前臂屈肌的肱肌部分；或转换为锤式腕弯举，使用中立握法。","设备替代":"可用杠铃、EZ杆或手腕训练器替代哑铃，效果相似。","难度调整":"初学者可采用坐姿单手练习，熟练后可尝试双手同时动作或站立姿势增加难度。"}', 'published', NOW(3), NOW(3));
SET @eid_435 = LAST_INSERT_ID();
-- Suggested muscle: 桡侧腕屈肌 (agonist)
-- Suggested muscle: 尺侧腕屈肌 (agonist)
-- Suggested muscle: 掌长肌 (synergist)
-- Suggested muscle: 指浅屈肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 肱三头肌 (antagonist)
-- Suggested muscle: 前臂伸肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('变距杠铃弯举', 'arms', 'barbell', 'intermediate', NULL, '1. 站立直立，双脚与肩同宽，膝盖微屈，保持背部挺直，目视前方。\n2. 双手握住杠铃，掌心向上，握距可根据训练目标略宽于肩（或调节至适合的宽度），手臂自然下垂于身体两侧。\n3. 吸气时，专注于二头肌发力，弯曲肘部将杠铃向上提，保持上臂紧贴身体两侧，避免肩部前后摆动。\n4. 在动作的顶点稍作停顿，感受二头肌的强烈收缩，然后呼气时缓慢控制下放杠铃回到起始位置。\n5. 重复进行指定次数，始终保持核心稳定，避免弓背或耸肩。', '1. 选择适当的重量，确保能够全程控制杠铃，防止因重量过大导致动作失控或受伤。\n2. 握把必须稳固，防止杠铃滑脱，最好使用防滑粉末或护手带。\n3. 在整个动作中保持背部挺直，避免过度弓腰或前倾，以保护腰椎。', '1. 利用身体摆动或动量抬起杠铃，导致二头肌受力减弱。\n2. 上臂在抬起时外展或向前移动，使肩部参与过多，削弱二头肌的孤立刺激。\n3. 动作幅度不完整，肘关节未完全伸展或未达到二头肌的顶峰收缩。', '1. 握距调节：变距杠铃弯举的核心在于改变握距，窄握更集中刺激二头肌短头，宽握则更强调长头。可根据训练目标随时调节。
2. 器械替代：若手握杠铃不适，可换成EZ杆或哑铃，以减轻手腕压力并保持相同的动作模式。
3. 姿势变化：可在斜板或俯身姿势下进行，以改变重力角度，提高二头肌的拉伸和收缩范围。', 'isolation', '{"哑铃弯举":"将杠铃换成等重的哑铃，可增强单侧控制，改善左右力量差异，同时保持相同的肘部屈曲轨迹。","EZ杆弯举":"使用EZ杆可降低手腕和前臂的压力，使二头肌更集中在运动中，适合对腕部敏感的训练者。","绳索弯举":"利用绳索提供恒定的张力，尤其在离心阶段提供持续负荷，有助于提升二头肌的力量和耐力。","俯身弯举":"将身体前倾或使用斜凳，可在更大幅度的伸展状态下训练二头肌，增加肌肉的拉伸刺激。"}', 'published', NOW(3), NOW(3));
SET @eid_411 = LAST_INSERT_ID();
-- Suggested muscle: 二头肌（上臂二头肌） (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三头肌（前臂伸肌） (antagonist)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 前锯肌（肩部前束） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('吊环悬垂', 'arms', 'bodyweight', 'intermediate', NULL, '1. 调整吊环高度，使手臂伸直时环略高于肩部，便于抓握和悬挂。\n2. 双手正握（掌心朝前）或使用反握（掌心朝后），手指均匀包裹环扣，确保握力均衡。\n3. 通过跳箱或踩踏板将身体向上拉起，使胸部靠近吊环，肩部略微后收，核心收紧。\n4. 在最高点保持悬垂姿势，肩胛骨向下压，保持胸部略微抬起，避免耸肩。\n5. 缓慢下降，控制速度至手臂完全伸直，回到起始悬挂位置。\n6. 重复动作，若需要可使用弹力带或辅助器进行逐步过渡。', '1. 每次使用前检查吊环和挂点的牢固性，确保能够承受体重及可能的冲击。\n2. 在进行高位悬垂前务必热身肩部、核心和前臂，避免肌肉拉伤。\n3. 若出现肩部不适或疼痛，应立即停止并咨询专业教练或医师。', '1. 耸肩或肩部向前倾斜，导致肩关节过度受压。\n2. 下降时快速失控，身体出现摆动或冲击力。\n3. 握环时手指位置不均，导致前臂疲劳或手腕不适。', '1. 若柔韧性不足，可先将环调低至手臂略弯的高度，逐步提升高度。
2. 使用弹力带置于环下，提供支撑帮助完成动作，适合初学者。
3. 调整握法（如正握、反握或假握）可改变对前臂和背阔肌的刺激程度。', 'compound', '{"高位吊环悬垂":"降低环的高度或使用弹力带辅助，以减少难度。","单臂吊环悬垂":"先熟练双手吊环悬垂，逐步过渡到单手，保持身体不转动。","负重吊环悬垂":"在腰带或负重背心上增加重量块，提高挑战强度。","假握吊环悬垂":"将手腕放在环上方，模拟体操吊环的假握姿势，增强前臂和肩部力量。"}', 'published', NOW(3), NOW(3));
SET @eid_449 = LAST_INSERT_ID();
-- Suggested muscle: 背阔肌 (agonist)
-- Suggested muscle: 大圆肌 (synergist)
-- Suggested muscle: 小圆肌 (synergist)
-- Suggested muscle: 肱二头肌 (synergist)
-- Suggested muscle: 三角肌后束 (synergist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)
-- Suggested muscle: 前臂伸肌群 (stabilizer)
-- Suggested muscle: 核心肌群（腹直肌、腹外斜肌） (stabilizer)
-- Suggested muscle: 肩袖肌群（冈上肌、冈下肌、肩胛下肌、小圆肌） (stabilizer)
-- Suggested muscle: 胸大肌 (antagonist)
-- Suggested muscle: 三角肌前束 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃俯身臂屈伸', 'arms', 'dumbbell', 'intermediate', NULL, '1. 预备姿势：双脚与肩同宽站立，双手各持一只哑铃，躯干前倾约45度，背部保持平直，核心收紧，膝盖微屈。\n2. 起始位置：上臂紧贴身体两侧，前臂自然下垂，掌心相对（手心朝后），肘部弯曲约90度。\n3. 动作执行：保持上臂固定，利用三头肌力量将哑铃向后上方伸展，直至手臂接近完全伸展，肘部略微弯曲以避免锁死。\n4. 顶峰收缩：在最高点停顿1-2秒，感受三头肌的收紧。\n5. 复位：缓慢控制哑铃回到起始位置，避免利用重力摆动，保持张力在整个动作中。', '1. 保持背部平直，避免过度弓背导致腰椎受伤。\n2. 选用合适重量，避免在动作中使用身体摆动。\n3. 动作过程中始终保持肘部贴近身体，防止肩膀代偿。', '1. 使用过重哑铃导致身体摆动，借力完成动作。\n2. 动作时背部拱起或塌腰，增加腰背压力。\n3. 肘部向外张开，导致三头肌受力分散并增加肩部压力。', '1. 初学者可以先在不背负重量的状态下练习姿势，确保背部稳定后再加哑铃。
2. 如感到背部不适，可改为在倾斜凳上俯身，减少脊柱负荷。
3. 可使用绳索或坐姿俯身臂屈伸变体，以便更好控制动作轨迹。', 'isolation', '{"站姿俯身臂屈伸":"在坐姿斜凳上进行，降低背部压力。","单臂俯身臂屈伸":"单独训练每侧手臂，提升平衡与单侧力量。","绳索俯身臂屈伸":"用绳索替代哑铃，保持恒定张力。"}', 'published', NOW(3), NOW(3));
SET @eid_414 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌 (agonist)
-- Suggested muscle: 三角肌后束 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 核心肌群 (stabilizer)
-- Suggested muscle: 二头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃反向腕弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 准备姿势：坐在训练凳或站立，双手各持一只哑铃，手掌向下（俯卧姿势），前臂放在大腿或凳面上，手腕悬空。\n2. 固定前臂：在整个动作过程中保持上臂和肘部固定，仅以手腕为支点进行运动。\n3. 举起哑铃：用力向上抬起哑铃，使手背向上伸展，至手腕达到最高点，感受前臂伸肌的收缩。\n4. 顶峰收缩：在最高点稍作停顿（约1秒），确保肌肉充分收缩。\n5. 缓慢放回：控制哑铃慢慢下降至起始位置，手腕回到自然下垂状态，避免猛然下落。\n6. 呼吸节奏：发力时呼气，下放时吸气，保持呼吸与动作的协调。', '使用合适重量的哑铃，避免因重量过大导致手腕或前臂受伤。,在整个动作中保持前臂固定在支撑面上，防止肘关节参与发力。,如果在动作过程中出现手腕疼痛或不适，应立即停止并咨询专业人士。', '使用过重的哑铃导致动作失控，削弱对目标肌肉的刺激。,前臂离开支撑面或肘部晃动，使动作变成复合动作，失去孤立效果。,动作过快、下降阶段缺乏控制，降低肌肉收缩的有效性。', '初学者可以先用轻重量或徒手练习，待动作熟练后再逐步增加负荷。,如果手腕活动受限，可在手腕下方放置小垫子或调节凳面高度，以找到舒适的起始角度。,在训练凳上固定前臂时，确保凳面稳固，防止在举起哑铃时凳子滑动。', 'isolation', '{"器材变化":"如使用杠铃或绳索进行反向腕弯举，保持与哑铃相同的握距和手腕角度，适当调整重量并注意控制动作幅度。","姿势变化":"在站姿或坐姿下进行时，确保前臂稳固支撑在凳面或大腿上，避免手肘晃动导致额外发力。","单手变体":"单手练习有助于发现两侧力量差异，完成后可进行不平衡训练或使用补偿重量以平衡左右发展。","双手同步":"双手同时进行可以提升训练效率，适合在时间有限的情况下使用，但仍需保持动作的完整控制和适当重量。"}', 'published', NOW(3), NOW(3));
SET @eid_440 = LAST_INSERT_ID();
-- Suggested muscle: 桡侧伸腕长肌 (agonist)
-- Suggested muscle: 桡侧伸腕短肌 (agonist)
-- Suggested muscle: 尺侧伸腕肌 (agonist)
-- Suggested muscle: 伸指肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 桡侧屈腕肌 (antagonist)
-- Suggested muscle: 尺侧屈腕肌 (antagonist)
-- Suggested muscle: 掌长肌 (antagonist)
-- Suggested muscle: 腕关节 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃周期性弯举', 'arms', 'dumbbell', 'advanced', NULL, '1. 身体直立，双脚与肩同宽，双手各持一只哑铃，手臂自然下垂，掌心朝向身体两侧，保持背部挺直，核心收紧。\n2. 将哑铃向胸前方向弯举，同时旋转手腕使掌心向上，在动作顶部顶峰收缩肱二头肌，保持1-2秒。\n3. 缓慢下放哑铃至起始位置，手腕稍微旋回原位。\n4. 立即用另一只手完成同样的弯举动作。\n5. 交替进行双手弯举，保持动作节奏平稳，确保每次弯举都充分控制。\n6. 重复进行8-12次，完成3-4组训练。', '1. 保持脊柱中立，避免弓背或过度前倾，以减少下背部压力。\n2. 弯举时肘部应保持贴近身体两侧，不要向外打开或借助肩部力量。\n3. 动作全程控制好哑铃重量，避免快速甩动导致肩关节或肘关节损伤。', '1. 借助身体摆动或惯性完成弯举，减少了对目标肌肉的刺激。\n2. 肘部位置过高或外展，将训练重心转移到肩部三角肌。\n3. 动作速度过快，在下降阶段缺乏控制，容易造成肌肉拉伤。', '初学者可先从较小重量的哑铃开始练习，专注于动作规范性；熟练后可增加重量或提高动作速度；可选择在平板凳或斜凳上进行变体训练以调整难度。', 'isolation', '{"双手弯举":"可改为双手同时弯举，简化协调性要求","锤式弯举":"改变握法（掌心相对），增加肱肌和肱桡肌的参与","斜板弯举":"使用倾斜凳固定手臂角度，增加动作范围和肌肉拉伸","集中弯举":"单手支撑训练，强化单侧肌肉控制和泵感"}', 'published', NOW(3), NOW(3));
SET @eid_412 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 三角肌后束 (antagonist)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 双脚与肩同宽站立，双手各持一只哑铃，手臂自然垂于体侧，掌心朝前。\n2. 保持上臂固定不动，仅通过弯曲肘部将哑铃向上举起至肩膀高度。\n3. 在顶峰位置略作停顿，感受二头肌的收缩。\n4. 缓慢下放哑铃，回归起始姿势，保持控制不要猛然放下。\n5. 完成预定次数后换臂或交替进行。', '1. 保持背部挺直，避免使用腰背力量抬起哑铃。\n2. 选取适当的重量，防止在举起或放下时失控导致拉伤。\n3. 确保动作全程肘部紧贴身体侧面，避免肩部前倾。', '1. 身体摇摆或借助惯性抬起重量，导致目标肌肉刺激不足。\n2. 肘部在动作过程中向外展开，降低二头肌的收缩效果。\n3. 动作速度过快，尤其是下降阶段，容易造成肌肉拉伤。', '可以根据个人柔韧性将手腕稍微向内或向外旋转，以改变二头肌的刺激部位；若想增加难度，可在斜凳上进行上斜弯举；若想降低难度，可使用轻重量并坐在凳子上进行坐姿弯举。', 'isolation', '{"变体类型":"哑铃锤式弯举","转换建议":"手掌向下握哑铃，主要锻炼肱桡肌，适合作为二头肌弯举的补充变体"}', 'published', NOW(3), NOW(3));
SET @eid_394 = LAST_INSERT_ID();
-- Suggested muscle: 二头肌（肱二头肌） (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三头肌（肱三头肌） (antagonist)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 核心肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃手指练习', 'arms', 'dumbbell', 'beginner', NULL, '1. 坐在稳固的凳子或椅子上，双脚平放在地面，背部保持自然挺直。\n2. 取适当重量的哑铃，用双手的食指和中指轻轻夹住哑铃的侧面，确保哑铃不易滑落。\n3. 将手腕放在大腿或凳子上，使手掌向下，手指自然弯曲，哑铃悬于手指之间。\n4. 缓慢地用手指向上卷曲，将哑铃抬起至指尖完全屈曲的最高点，保持约1-2秒。\n5. 控制好力度，缓慢地将哑铃放回起始位置，保持手指的张力不要让哑铃猛然掉落。\n6. 完成一组后换手或适当休息，重复8-12次，循环2-3组。', '选择合适重量的哑铃，避免因重量过大导致手指或手腕受伤。,练习时保持背部挺直，避免使用肩部或上臂的力量抬起哑铃。,确保哑铃抓握稳固，若感觉手指疲劳或疼痛应立即停止训练。', '使用肩部或上臂的力量来帮助抬起哑铃，导致动作失去孤立手指和前臂的效果。,动作速度过快，未能充分控制哑铃的上升和下降，容易造成肌肉拉伤。,手指抓握不够稳固，哑铃在抬起或放下时出现晃动或滑落。', '初学者可以先用空杆或极轻的哑铃练习，以感受手指和前臂的发力；中级练习者可逐步增加哑铃重量并尝试单手训练；高级练习者可使用可调节阻力的手指训练器或弹力绳进行变体练习，以提升抓握力和耐力。', 'isolation', '{"使用握力球":"将哑铃换成握力球进行相同的手指卷曲动作，可在不增加重量的情况下强化手指抓握力量。","使用弹力绳":"把弹力绳固定在手指上，做手指张开与收缩的对抗训练，适合需要增强手指伸展能力的练习者。"}', 'published', NOW(3), NOW(3));
SET @eid_443 = LAST_INSERT_ID();
-- Suggested muscle: 指屈肌 (agonist)
-- Suggested muscle: 前臂屈肌 (agonist)
-- Suggested muscle: 腕屈肌 (synergist)
-- Suggested muscle: 前臂伸肌 (antagonist)
-- Suggested muscle: 手部小肌群（如拇指外展肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃腕弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 坐在凳子或椅子上，双手各持一只哑铃，掌心向上，手臂自然垂放于身体两侧，膝盖约呈90度角支撑前臂；2. 将前臂放置在大腿上或凳子上，使手腕位于膝盖或凳边沿之外，确保手部可以自由活动；3. 保持手臂固定，仅通过手腕向上弯举哑铃，将哑铃尽可能高地抬起；4. 在动作顶峰位置停顿1-2秒，充分感受前臂肌肉的收缩；5. 缓慢控制地下放哑铃，回到起始位置，手腕略微下垂；6. 重复完成规定的重复次数，保持呼吸节奏均匀，避免借助惯性完成动作。', '1. 使用适当的重量，从轻负荷开始逐步增加，避免因重量过重导致手腕或前臂损伤；2. 保持动作控制，避免使用惯性或甩动方式举起哑铃，这会增加受伤风险；3. 如果感到手腕或前臂有明显疼痛，应立即停止练习并咨询专业人员。', '1. 使用过重重量导致借助身体摆动完成动作，无法有效锻炼目标肌群；2. 在动作过程中手臂或身体晃动，减弱了对前臂的刺激效果；3. 下放哑铃时速度过快，未能充分控制动作，降低训练效果并增加受伤风险。', '可坐在平板凳上进行练习以获得更稳定的支撑；初学者建议使用较轻重量专注掌握动作技术；可调整凳子高度或前臂支撑位置以改变训练角度和强度；进阶者可尝试单臂练习以更针对性地强化弱侧。', 'isolation', '{"变体类型":"可转换为杠铃腕弯举增加负荷，或采用俯卧腕弯举改变肌肉拉伸角度；双手变单手练习可提高对弱侧的控制；使用EZ杆或曲杆可减少手腕压力。","替代动作":"使用弹力带进行腕屈伸练习，或使用手腕训练器进行固定轨迹的练习。"}', 'published', NOW(3), NOW(3));
SET @eid_434 = LAST_INSERT_ID();
-- Suggested muscle: 桡侧腕屈肌 (agonist)
-- Suggested muscle: 掌长肌 (agonist)
-- Suggested muscle: 尺侧腕屈肌 (synergist)
-- Suggested muscle: 指深屈肌 (synergist)
-- Suggested muscle: 桡侧腕伸肌 (antagonist)
-- Suggested muscle: 旋前圆肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃锤式弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 站立，双脚与肩同宽，膝盖微屈，保持核心收紧，背部挺直，目视前方。\n2. 双手各持一只哑铃，掌心朝向身体（中立握法），手臂自然下垂于身体两侧，肘部靠近身体。\n3. 保持上臂固定不动，仅通过弯曲肘部将哑铃向上弯举至肩膀高度，动作过程中掌心始终朝向身体内侧。\n4. 在顶峰位置停顿1-2秒，感受肱肌和肱桡肌的充分收缩。\n5. 缓慢控制地将哑铃放下，恢复到起始位置，肘部不要完全伸直以保持肌肉张力。\n6. 交替或同侧完成目标次数后换边训练。', '1. 选择合适的重量，避免使用过重导致身体借力晃动或弓背代偿。\n2. 动作过程中保持肩胛骨微微后收下沉，避免耸肩导致上斜方肌过度参与。\n3. 若感到手腕或肘部不适，应立即停止并检查握姿或减轻重量。', '1. 身体前后摆动借助惯性发力，而非纯粹依靠肱肌收缩完成动作。\n2. 上臂外展或肩关节参与过多，导致目标肌群刺激不足。\n3. 动作范围不完整，下放时肘部完全伸直或上举时未达到肩膀高度。', '1. 坐姿锤式弯举：坐在有靠背的凳子上进行，可更好固定身体减少借力。
2. 斜板锤式弯举：将凳子调至30-45度倾斜，单臂或双臂在斜板上进行，侧重顶峰收缩感。
3. 交互弯举：左右手交替进行，一手举至顶端时另一手下放，可增加肌肉控制要求。', 'isolation', '{"站姿/坐姿互换":"坐姿更适合初学者消除身体晃动，坐姿也可作为进阶训练的变体选择。","单臂/双臂转换":"单臂训练可更好地纠正左右肌力不平衡，双臂同时进行则效率更高。","绳索/杠铃变体":"可使用EZ杆或绳索器械进行锤式弯举，增加力量曲线变化。"}', 'published', NOW(3), NOW(3));
SET @eid_398 = LAST_INSERT_ID();
-- Suggested muscle: 肱肌 (agonist)
-- Suggested muscle: 肱桡肌 (agonist)
-- Suggested muscle: 肱二头肌长头 (synergist)
-- Suggested muscle: 肱二头肌短头 (synergist)
-- Suggested muscle: 旋前圆肌 (synergist)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 核心肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃静态握力', 'arms', 'dumbbell', 'beginner', NULL, '1. 站立或坐姿，双手各持一只适当重量的哑铃，手臂自然下垂，掌心朝上。\n2. 用手指包住哑铃握把，保持手腕中立，避免过度屈曲或伸展。\n3. 用力收紧手指和手掌，模拟抓住哑铃的动作，保持最大握力。\n4. 维持该姿势10-30秒，感受前臂和手部的紧绷感。\n5. 放松手指，缓慢放下哑铃，重复进行2-3组。', '1. 选择适当重量，避免因重量过大导致握力失控而掉落哑铃。\n2. 确保练习环境干燥，地面平稳，防止滑倒。\n3. 若感到手腕或前臂疼痛，立即停止并检查姿势。', '1. 手腕过度屈曲或伸展，导致手腕受伤。\n2. 过度依赖拇指而忽视其他手指的握力。\n3. 保持时间过短，未能有效刺激肌群。', '如果握力不足，可先使用较轻的哑铃或握力球辅助；也可以采用坐姿靠墙支撑手臂，减轻身体不稳定带来的负担。', 'isolation', '{"单手哑铃静态握力":"将双手哑铃改为单手持哑铃进行相同姿势，可增加对手部力量的要求。","哑铃负重握力球":"使用握力球或弹力带替代哑铃，实现相同的静态握力训练，适合无哑铃环境。"}', 'published', NOW(3), NOW(3));
SET @eid_447 = LAST_INSERT_ID();
-- Suggested muscle: 前臂屈肌 (agonist)
-- Suggested muscle: 前臂伸肌 (stabilizer)
-- Suggested muscle: 二头肌 (synergist)
-- Suggested muscle: 三头肌 (antagonist)
-- Suggested muscle: 手部小肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃颈后臂屈伸', 'arms', 'dumbbell', 'beginner', NULL, '1. 站立或坐在有靠背的凳子上，双脚平放地面，保持背部挺直。双手握住一只哑铃，双手拇指环扣哑铃铃面，举至头顶上方，手臂伸直。2. 保持上臂固定不动，仅通过弯曲肘关节，将哑铃缓缓下降至头后方，哑铃大约与耳朵平齐或略低于此位置。3. 在最低点稍作停顿，确保前臂仅在肩部正下方位置，保持上臂始终垂直于地面。4. 通过收缩三头肌发力，将哑铃向上举起，回到起始的手臂伸直位置。5. 重复上述动作，达到所需的重复次数后，平稳放下哑铃。', '1. 确保握把稳固，双手拇指应环绕铃面以防滑落，起始前检查哑铃是否安装牢固。2. 动作过程中始终保持核心收紧、背部挺直，避免弓背导致腰部压力过大。3. 下降时要缓慢控制，切忌让哑铃自由下落或快速弹起，以免造成肘关节或肩关节损伤。', '1. 上臂在动作过程中前后摆动，应始终保持上臂垂直或略向后倾的位置。2. 动作幅度过大，将哑铃降得过低，导致肘关节过度伸展或肩部代偿。3. 身体晃动或借助惯性完成动作，应在稳定状态下独立完成，以更好地孤立刺激三头肌。', '1. 如感到肩部不适，可减小动作幅度或尝试单手版本以更好地控制姿势。2. 初学者可先使用较轻重量，重点掌握正确动作轨迹后再逐步增加负荷。3. 可根据个人柔韧性调整下降深度，以不产生疼痛和不适为标准。4. 坐姿练习可增加稳定性，降低平衡要求，适合初学者建立动作信心。', 'isolation', '{"单手变体":"可改为单手颈后臂屈伸，能更好地孤立每侧三头肌，并纠正左右力量不平衡的问题。","仰卧变体":"可转换为仰卧哑铃臂屈伸，动作模式相似但施力方向改变，可作为进阶或变化动作。","拉力器变体":"可使用直杆或绳索附件进行颈后臂屈伸，提供恒定的阻力曲线，增加训练变化。","站姿变体":"站立姿势可增加核心参与度，但对平衡和控制要求更高，适合进阶训练者。"}', 'published', NOW(3), NOW(3));
SET @eid_421 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 肘肌 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 肱二头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('器械弯举', 'arms', 'machine', 'beginner', NULL, '1. 调整器械座位高度，使手柄与胸部平齐，握住手柄，手掌向上。\n2. 坐在背垫上，背部紧贴垫子，双脚平放在地面。\n3. 吸气，收紧核心，慢慢向上弯曲肘部，将手柄向肩部提起，保持上臂固定不动。\n4. 在顶峰位置稍作停顿，感受二头肌充分收缩。\n5. 呼气，缓慢放低手柄，回到起始位置，手臂不完全伸直，以保持肌肉张力。\n6. 完成所需次数后，停止并确保器械归位。', '确保座椅和背垫调节合适，背部始终靠在垫子上，避免背部弓背或后仰。,使用的重量要在自己的承受范围内，避免使用过重的重量导致摆动或失控。,动作全程保持肘部固定，防止肘部向外伸展或内收，减少受伤风险。', '使用过大的重量导致身体摆动，利用惯性完成动作，二头肌刺激减弱。,动作过程中肩膀抬起或前倾，使肩部参与发力，降低二头肌的孤立效果。,在下降阶段快速放手下放，未控制好速度，导致肘关节受力过大。', '根据身高调节座椅高度，使手柄与胸部平齐，手臂自然伸展。,调整背垫的前后位置，使背部的支撑面积最大，避免背部离开垫子。,选择合适的手柄宽度和重量，确保在全程运动中手柄不产生晃动。', 'isolation', '{"杠铃弯举":"使用直杠铃或曲杠铃进行站姿弯举，保持肩部固定，手臂自然下垂，握距略宽于肩。","哑铃弯举":"双手各持哑铃，交替或同时进行弯举，可采用坐姿或站姿，增加动作的多样性。","绳索弯举":"使用低位滑轮绳索进行弯举，保持肘部靠近身体，提供持续的阻力曲线。"}', 'published', NOW(3), NOW(3));
SET @eid_401 = LAST_INSERT_ID();
-- Suggested muscle: 二头肌（肱二头肌） (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三头肌（肱三头肌） (antagonist)
-- Suggested muscle: 前臂屈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('器械臂屈伸', 'arms', 'machine', 'beginner', NULL, '1. 调整器械：先根据身高调节座椅高度，使手柄与肩部同高，确保背部和腰部靠紧靠背。\n2. 握住手柄：双手掌心向上（或向下，视具体机器而定），自然握把，保持手腕中立，不要过度屈曲或伸展。\n3. 起始姿势：手臂完全伸展，肘部略微弯曲但不锁死，肩部放松，胸部挺起。\n4. 吸气并弯曲手臂：在呼气的同时，用二头肌的力量将手柄向上拉向肩部，保持上臂贴近身体，肘部不要向前移动。\n5. 顶峰收缩：在最高点稍作停顿，感受二头肌的收缩，确保动作完整。\n6. 缓慢放下：吸气时控制重量，缓慢将手柄放回起始位置，保持手臂不完全锁死，以保持肌肉张力。', '1. 在使用器械前务必检查座椅、手柄和配重是否锁紧，防止使用过程中出现滑动或卡阻。\n2. 保持背部紧贴靠背，避免在发力时弓背或扭动身体，以防止下背受伤。\n3. 选用适当的重量，避免使用过重导致借力或摆荡，切勿在动作全程锁死肘关节。', '1. 身体摇摆或借助惯性抬起重量，使二头肌的刺激减弱并增加受伤风险。\n2. 肘部在发力过程中向前移动或抬起，导致肩部参与过多，减弱对二头肌的孤立刺激。\n3. 动作幅度不足，只做半程屈伸，未能充分利用全程收缩和伸展，导致训练效果受限。', '1. 座椅高度调节：确保手臂自然下垂时手柄略低于肩部，以获得最佳发力角度。
2. 背垫位置：如机器配有背垫，需调整至能支撑脊柱自然弧度，防止弓背。
3. 手柄宽度：根据个人前臂长度选择合适的握距，握把过宽或过窄都会影响肌肉发力。', 'isolation', '{"变体类型":"自由重量杠铃弯举 / 哑铃弯举","转换建议":"若想换成杠铃弯举，保持站姿，双手握距与肩同宽，肘部贴紧身体，同样执行全程弯曲和缓慢放下；若使用哑铃，可单手或双手交替进行，注意保持核心稳定，避免借助摆动。两种变体均可在保持动作控制的前提下提升负荷或改变肌肉感受。"}', 'published', NOW(3), NOW(3));
SET @eid_423 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 前臂屈肌群 (synergist)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('坐姿哑铃弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 坐在哑铃凳上，背部挺直，双脚平放在地面上，保持身体稳定。2. 双手各持一只哑铃，掌心向上，手臂自然下垂，肘关节位于身体两侧。3. 保持上臂固定不动，仅通过弯曲肘关节将哑铃向肩部方向举起。4. 在顶峰位置时收紧肱二头肌，停留1-2秒充分收缩。5. 缓慢控制地下放哑铃，回到起始位置，手臂完全伸直。6. 重复完成指定的次数。', '1. 保持背部挺直靠在凳背上，避免弓背或过度前倾。2. 控制动作速度，不要借助惯性快速举起，以免造成肌肉拉伤。3. 确保上臂全程保持垂直，不要前后摆动上臂。', '1. 借助惯性快速举起哑铃，而不是依靠肱二头肌主动发力。2. 肩部前引或移动上臂，将本应由肱二头肌完成的工作转移到肩部。3. 动作幅度不完整，肘关节未充分伸展或弯曲不到位。', '初学者可以先从较轻重量开始，逐步增加；如果肩部有不适可将上臂稍微前倾减少压力；体力较弱者可使用倾斜凳来获得靠背支撑。', 'isolation', '{"变体类型":"可转换为站姿哑铃弯举增加核心参与，或采用牧师凳弯举固定上臂更孤立刺激肱二头肌。","难度调整":"新手可先进行单臂练习，逐步过渡到双臂同时进行。","器材替代":"可用杠铃弯举或弹力带弯举替代相同肌群的训练。"}', 'published', NOW(3), NOW(3));
SET @eid_408 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('屈臂板臂屈伸', 'arms', 'bodyweight', 'intermediate', NULL, '1. 双手撑在双杠或稳固的凳子上，手臂伸直，肩关节略高于手肘，身体悬空，双脚交叉或向后弯曲；2. 吸气同时屈肘，身体平稳下降，保持核心收紧，肩部保持稳定，肩胛骨微微后缩；3. 继续下降直到上臂与地面平行或略低于平行位置，手肘弯曲约90度；4. 呼气同时肱三头肌发力，将身体向上推起，直到手臂完全伸直；5. 在顶部位置略作停顿，感受肱三头肌收缩，然后开始下一次重复动作；6. 完成规定次数后，双手轻放支撑面，缓慢下降至地面。', '确保使用的双杠或凳子稳固安全，能够承受你的体重；下降时要控制速度，避免快速下落导致肩关节损伤；如果肩膀感到不适或疼痛，应立即停止动作；初学者建议有人在旁边保护或使用辅助器械。', '下降幅度过浅，没有达到标准深度，削弱训练效果；耸肩和肩膀过度前伸，增加肩部压力并减少三头肌参与；身体前后摆动，利用惯性而非肌肉力量完成动作，降低训练质量。', '初学者可缩小动作幅度或双脚轻触地面减少负荷；进阶者可在腰部悬挂负重腰带增加训练强度；可将脚放在矮凳上以调整身体角度，增加胸部参与度；无法完成标准动作时可从跪姿或半程动作开始练习。', 'compound', '{"退阶变体":"双脚触地或使用弹力带辅助，减少身体负荷","进阶变体":"在腰部悬挂负重腰带，或在动作顶部做短暂停顿增加张力"}', 'published', NOW(3), NOW(3));
SET @eid_468 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 胸大肌 (synergist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 核心肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('手掌朝上握杆', 'arms', 'barbell', 'intermediate', NULL, '1. 站立，双脚与肩同宽，双手正握杠铃杆，握距略宽于肩，手掌朝向身体前方（反握/仰掌心向上）。\n2. 手臂自然下垂于身体两侧，肘部贴近躯干，核心收紧，保持背部挺直。\n3. 保持上臂固定，仅通过屈肘将杠铃向上举起，肱二头肌发力将杆拉向肩部方向。\n4. 在动作顶端略作停顿，充分收缩肱二头肌，感受肌肉顶峰收缩。\n5. 缓慢控制地将杠铃放下回到起始位置，手臂完全伸直但避免锁死关节。\n6. 重复进行指定次数的训练。', '1. 训练重量适中，避免使用过大重量导致身体晃动或借力代偿。\n2. 动作全程保持肘部固定，不要前移或后撤，以免增加肘关节压力。\n3. 若有肘部或前臂不适，应立即停止并降低重量或寻求专业指导。', '1. 借助身体前后摆动发力，如利用惯性甩动杠铃，降低训练效果。\n2. 肘部在动作过程中向前移动，改变了发力角度并增加关节负担。\n3. 放下重量时速度过快，缺乏离心控制，容易导致肌肉拉伤。', '初学者可先使用较轻重量的杠铃或EZ杆进行练习，以减少手腕压力；若手腕有不适感，可将握距收窄或将杠铃换成EZ杆；训练时可在肘部贴靠训练凳或墙体以限制借力。', 'isolation', '{"增加难度":"可使用较宽握距或较慢的离心阶段来增加训练强度","切换器材":"可替换为哑铃进行单侧训练，或使用EZ杆减少手腕压力","增加变化":"可结合锤式弯举姿势交替进行，兼顾不同握法的训练效果"}', 'published', NOW(3), NOW(3));
SET @eid_442 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前臂屈肌 (synergist)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('拉力器单臂弯举', 'arms', 'cable', 'intermediate', NULL, '1. 面向拉力器站立，单手握住手柄，手臂自然下垂，掌心朝上。2. 保持上臂贴近身体且固定不动，仅通过弯曲肘部发力。3. 呼气并将手柄向肩部方向拉起，同时肱二头肌发力收缩。4. 在顶峰位置停留1-2秒，感受肱二头肌的充分收缩。5. 吸气并缓慢控制地放下手臂，回到起始位置。6. 完成一组后换另一侧手臂进行练习。', '1. 选择合适的重量，避免使用过大重量导致动作变形或借力。2. 保持核心收紧，背部挺直，避免弓背或过度前倾。3. 动作过程中保持肩膀放松，避免耸肩或肩膀上抬。', '1. 上臂随动作摆动，利用肩部力量带动手臂发力。2. 身体前后摆动，借用身体惯性完成动作。3. 动作速度过快，没有充分控制离心阶段。', '可以根据训练目标调整站距和身体角度：双脚平行站立适合初学者；略微将脚指向外侧可以更好地孤立肱二头肌；可以通过调整滑轮高度来改变对肌肉的刺激角度。', 'isolation', '{"变体类型":"可以转换为双手拉力器弯举以增加负荷，或使用哑铃/杠铃进行类似训练，使用龙门架低位可以增加离心负荷训练效果。","升级":"可以尝试锤式弯举变体或斜板弯举来改变刺激角度。","降级":"可以减少重量并放慢动作节奏，或改用较轻的固定器械进行练习。"}', 'published', NOW(3), NOW(3));
SET @eid_410 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('握力器练习', 'arms', 'other', 'beginner', NULL, '1. 选取合适握力的握力器，调至舒适阻力。\n2. 坐姿或站姿，背部挺直，肩膀放松，手臂自然下垂。\n3. 握住握力器手柄，使用手指和手掌的合力，缓慢压缩手柄至感到前臂肌肉紧绷。\n4. 在最大压缩位置保持1-2秒，确保不锁死关节。\n5. 缓慢松开手柄，回到起始位置，保持控制，不要让手柄弹回。\n6. 完成预设次数后休息，换手继续。', '使用握力器前检查是否有裂纹或损坏，防止受伤。,保持手腕自然角度，避免过度弯曲导致腕关节受压。,初学者应从低阻力开始，逐步适应，避免肌肉拉伤。', '过度用力导致前臂肌肉抽筋或手腕疼痛。,在动作过程中耸肩或抬肘，使上臂参与发力，降低对前臂的孤立刺激。,动作速度过快，缺少控制，导致关节冲击。', '若感到手腕不适，可调整握力器的阻力或使用带有手腕支撑的款式；对于力量较强的练习者，可尝试双手交替或使用更大阻力的握力器进行进阶训练；也可在坐姿或站姿下进行，亦可在站立时配合轻微的肩部活动增加血液流动。', 'isolation', '{"不同阻力握力器":"根据当前阻力等级选择更轻或更重的握力器，以调节训练强度。","单手 vs 双手":"单手练习可更专注于单侧前臂，双手练习则能兼顾双侧并提升整体耐力。","使用弹性绳":"将弹性绳套在手掌上进行拉绳式练习，可改变发力角度并提供不同的负荷模式。"}', 'published', NOW(3), NOW(3));
SET @eid_437 = LAST_INSERT_ID();
-- Suggested muscle: 前臂屈肌 (agonist)
-- Suggested muscle: 前臂伸肌 (antagonist)
-- Suggested muscle: 手部小肌肉（如拇指外展肌） (stabilizer)
-- Suggested muscle: 肱二头肌 (synergist)
-- Suggested muscle: 肩胛提肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('斜托哑铃弯举', 'arms', 'dumbbell', 'intermediate', NULL, '1. 调整斜托凳的靠背角度至30°-45°，确保凳面稳固且脚能平放在地面。\n2. 坐在斜托凳上，背部紧贴靠背，双手各持一只哑铃，掌心向上，手臂自然垂于身体两侧。\n3. 保持上臂贴近身体或略微外展，肘部固定在身体两侧，目视前方。\n4. 呼气时，利用二头肌的力量将哑铃向上弯举，动作全程保持肘部位置不变，直至哑铃接近肩部高度。\n5. 在顶峰收缩位置停顿约1秒，感受到二头肌的紧绷。\n6. 吸气，缓慢将哑铃放回起始位置，手臂不完全伸直，以保持肌肉张力，然后重复动作。', '1. 确保斜托凳稳固不晃动，使用防滑脚垫防止椅子在动作过程中移动。\n2. 选用合适的重量，避免在弯举时借助身体摆动或耸肩来提升重量。\n3. 动作全程保持背部贴靠背，避免背部弓起或过度前倾，以防止下背部受伤。', '1. 使用过大的重量导致上半身摆动、借力完成动作，削弱二头肌的刺激。\n2. 肘部在弯举过程中向前或向外移动，使得前臂参与过多，降低二头肌的孤立效果。\n3. 在下降阶段手臂完全伸直或速度过快，失去了对二头肌的控制和张力。', '1. 如感到肩部不适，可略微降低斜托角度或减少上臂外展角度，使肘部更靠近身体。
2. 若二头肌顶端收缩不明显，可尝试在顶峰时做轻微的外旋（手掌向外）以增强收缩感。
3. 对于手腕力量较弱的使用者，可在握哑铃时稍微向内转手腕，减轻前臂负担。', 'isolation', '{"斜托换成直立凳":"将斜托凳换成普通凳子或站立姿势，可将动作转为站姿哑铃弯举，增加核心参与度。","换用EZ杆或杠铃":"将哑铃换成EZ杆或直杠，可改变握法宽度，提供不同的二头肌刺激角度。","双手交替弯举":"改为单手交替进行，可加强单侧控制及核心稳定性。","加入锤式弯举":"将手掌相对（锤式握法）进行斜托弯举，主要刺激肱肌和肱桡肌。","加入预疲劳法":"先做一组站姿哑铃弯举，再做斜托弯举，以增加二头肌的泵感。"}', 'published', NOW(3), NOW(3));
SET @eid_396 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌（短头） (agonist)
-- Suggested muscle: 肱二头肌（长头） (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)
-- Suggested muscle: 三角肌前部 (stabilizer)
-- Suggested muscle: 背阔肌（下部） (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('杠铃仰卧臂屈伸', 'arms', 'barbell', 'intermediate', NULL, '1. 调整训练凳至水平或略微倾斜，仰卧在凳上，背部紧贴凳面，双手略宽于肩握住杠铃，手臂伸展于胸部上方。\n2. 缓慢弯曲肘部，将杠铃向下放至额头或头顶位置，保持上臂垂直于地面，避免肘部外翻。\n3. 在底部稍作停顿，确保核心收紧，避免弓背或抬起臀部。\n4. 通过收缩三头肌将杠铃推回起始位置，手臂完全伸展，但不要锁死肘关节。\n5. 完成指定次数后，平稳放下杠铃或请伙伴协助取下，以防失衡。', '- 确保杠铃重量适合自己的力量水平，避免使用过重导致失控。\n- 在动作全程保持肘部固定在上臂两侧，避免肘部外翻导致关节受伤。\n- 使用有支撑的训练凳或请伙伴在旁帮助，以防杠铃意外脱落。', '- 将杠铃下降幅度过大，导致肘部过度伸展或超出安全范围。\n- 身体出现弓背或臀部抬起，降低了对三头肌的刺激并增加腰部压力。\n- 动作过快，缺少对肌肉的离心控制，易导致肌肉拉伤。', '- 如感到肩部不适，可将凳子稍微倾斜或改为使用哑铃进行单臂练习，以减轻肩部压力。
- 初学者可以使用较轻的杠铃或EZ杆，以减少手腕和肘部的压力。
- 若想增加难度，可在动作顶部加入短暂停顿或使用弹力带辅助。', 'isolation', '{"变体类型":"哑铃仰卧臂屈伸","转换建议":"使用哑铃替代杠铃进行相同的仰卧臂屈伸动作，或使用绳索/拉力器进行站姿/跪姿臂屈伸，以提供不同的角度和阻力变化。"}', 'published', NOW(3), NOW(3));
SET @eid_413 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌（肱三头肌） (agonist)
-- Suggested muscle: 前三角肌 (stabilizer)
-- Suggested muscle: 胸大肌（上束） (stabilizer)
-- Suggested muscle: 二头肌（肱二头肌） (antagonist)
-- Suggested muscle: 核心肌群（腹直肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('杠铃弯举', 'arms', 'barbell', 'beginner', NULL, '1. 站立于杠铃前，双脚与肩同宽，膝盖微屈，保持核心收紧，背部挺直。\n2. 采用正握姿势，双手握距略比肩宽，握住杠铃，手臂自然下垂。\n3. 保持上臂固定不动，仅通过弯曲肘部将杠铃向上举起，同时呼气。\n4. 在动作顶峰位置时，肱二头肌完全收缩，停留约1秒，可稍微外旋手腕增强刺激。\n5. 缓慢控制地放下杠铃回到起始位置，同时吸气，保持肌肉持续张力。\n6. 重复完成目标次数，避免借助身体摆动完成动作。', '1. 确保脊柱保持中立位置，避免在下背部过度弓起或驼背。\n2. 不要使用过重的重量导致借助身体晃动发力，这会增加下背部受伤风险。\n3. 动作全程保持上臂贴近身体两侧，避免肩部前引导致肩部不适。', '1. 上臂跟随移动：上臂应该在整个动作中保持固定，弯曲只发生在肘关节。\n2. 借助惯性发力：身体前后摆动借力会减少肱二头肌的刺激并增加受伤风险。\n3. 动作速度过快：没有控制的快速动作会降低训练效果且容易导致肌肉拉伤。', '1. 握距调整：窄握会增加肱二头肌短头的刺激，宽握则更多锻炼长头。
2. 站姿调整：双脚站距可稍宽增加稳定性，或在膝微屈状态下进行。
3. 器材选择：可使用EZ杆或曲杆减少手腕压力，适合手腕有不适的训练者。
4. 难度调整：初学者可从较轻重量开始，逐步掌握动作后再增加负荷。', 'isolation', '{"哑铃弯举":"可完全替代杠铃弯举，增加动作轨迹的自由度，便于纠正两侧力量不平衡问题。","牧师凳弯举":"通过固定上臂位置更孤立刺激肱二头肌，适合作为进阶变体。","锤式弯举":"侧重于肱肌和肱桡肌的训练，可与标准弯举交替使用增加全面刺激。","复合动作转换":"如需增加复合性质，可转换至负重双杠臂屈伸或引体向上等动作。"}', 'published', NOW(3), NOW(3));
SET @eid_393 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 核心肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('杠铃背后腕弯举', 'arms', 'barbell', 'intermediate', NULL, '1. 站立姿势：双脚与肩同宽站立，膝盖微屈，保持身体稳定，核心收紧。\n2. 握杆准备：将杠铃置于身后，手掌朝向后方的位置，双手从身体两侧握住杠铃，握距与肩同宽或略窄。\n3. 手臂位置：将手臂自然下垂，肘关节略微弯曲，杠铃位于臀大肌后方位置。\n4. 屈腕发力：保持上臂固定，以腕关节为支点，屈曲手腕将杠铃向上抬起，使手背朝向臀部方向。\n5. 顶峰收缩：在最高点停顿1-2秒，充分收缩前臂屈肌群，感受肌肉紧张。\n6. 缓慢控制：控制动作速度，缓慢将杠铃下放回起始位置，手腕回到初始姿势。', '1. 握力不足时容易导致杠铃滑落，必须确保握杆牢固，可考虑使用助力带辅助。\n2. 不要使用过大的重量训练，应选择能够轻松控制且动作标准的负荷。\n3. 若出现手腕疼痛或不适，应立即停止训练，避免造成腕关节损伤。', '1. 身体摆动借力：训练时通过晃动身体或肩膀来抬起重量，应保持上臂固定不动。\n2. 重量过大导致动作变形：使用超出能力范围的重量会导致无法完成标准动作，建议降低重量。\n3. 动作速度过快：没有控制地快速完成动作，减少了训练效果且增加受伤风险。', '初学者可以先用较轻重量的杠铃或哑铃进行练习，掌握动作要领后再逐步增加重量。如果肩部柔韧性不足导致无法舒适地握住身后杠铃，可以适当缩短握距或采用略宽的站距来调整姿势。对于腕关节有伤病史的训练者，建议在训练前做好充分热身，必要时可改用较轻的负荷或减少训练量。', 'isolation', '{"变体类型":"可转换为哑铃背后腕弯举，哑铃放在身后进行相同动作；也可改用正握腕弯举或反握腕弯举在身体前侧完成，以不同角度刺激前臂肌群。增加变体时可使用曲杆杠铃改善握感，或在凳上进行俯卧腕弯举改变角度。","器材转换":"可将杠铃替换为哑铃 EZ杆 EZ杆或曲杆杠铃，训练效果类似但握感更舒适。"}', 'published', NOW(3), NOW(3));
SET @eid_439 = LAST_INSERT_ID();
-- Suggested muscle: 桡侧腕屈肌 (agonist)
-- Suggested muscle: 尺侧腕屈肌 (agonist)
-- Suggested muscle: 掌长肌 (synergist)
-- Suggested muscle: 指浅屈肌 (synergist)
-- Suggested muscle: 腕伸肌群 (antagonist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三角肌 (stabilizer)
-- Suggested muscle: 前臂伸肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('直杆下压', 'arms', 'cable', 'beginner', NULL, '1. 面向缆绳器械站立，双脚与肩同宽，膝盖微屈保持稳定\n2. 双手握住直杆，手间距与肩同宽，手掌向下（ pronated grip）\n3. 上臂贴紧身体两侧，肘关节弯曲约90度，保持大臂固定不动\n4. 呼气时，通过肱三头肌发力将直杆向下压，直至手臂完全伸直\n5. 在底部位置保持顶峰收缩1-2秒，感受肱三头肌的充分收缩\n6. 吸气时，缓慢控制地将直杆向上放回起始位置，肘关节角度保持不变', '确保缆绳器械的固定装置已正确安装，防止意外脱落造成伤害,保持核心收紧，避免通过身体前后摆动来借力完成动作,控制动作速度，尤其是离心阶段，避免肘关节过度伸展导致损伤', '肘关节向外打开，导致大臂远离身体，减少了对肱三头肌的有效刺激,身体过度前倾或后仰，借助惯性完成动作，降低了锻炼效果,在动作过程中手腕弯曲（屈腕），导致前臂代偿过多', '可根据个人手臂长度调整站位距离；手间距变窄可增加肱三头肌内侧头的刺激；手间距变宽则更多锻炼外侧头；如果下背部不适，可在器械底部放置踏板降低高度；使用绳索附件可改变握法，对肱三头肌不同头部产生不同刺激', 'isolation', '{"绳索下压":"更换为绳索附件，采用正握或反握，可增加对肱三头肌不同头部的针对性刺激","颈后下压":"将直杆移至头后进行下压，增加了对肱三头肌长头的拉伸和刺激，但需要更大的肩部柔韧性","单手下压":"使用单头把手，进行单侧孤立训练，可以纠正左右力量不平衡问题","俯身下压":"身体前倾约45度进行下压，减少了肩部的参与，更孤立刺激肱三头肌"}', 'published', NOW(3), NOW(3));
SET @eid_416 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 胸大肌（上部纤维） (synergist)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 核心肌群 (stabilizer)
-- Suggested muscle: 肱二头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('窄距俯卧撑', 'arms', 'bodyweight', 'beginner', NULL, '1. 采用俯卧撑起始姿势，双手间距约与肩同宽或略窄，手掌平放在地面上，指尖略微外展。\n2. 身体从头到脚呈一条直线，腹部收紧，臀部不要下沉或抬得过高。\n3. 吸气，屈肘将身体向下降低，保持肘部贴近身体两侧，至胸部接近地面或接近手臂呈90度角。\n4. 呼气，主要通过胸部和肱三头肌发力将身体推起，恢复到起始姿势。\n5. 完成一次后，保持动作连贯，避免在顶部停留过久，然后重复。\n6. 如需计数，可在每次推起时计数一次，训练量根据个人能力设定。', '运动前进行充分的上肢和胸部热身，避免肌肉拉伤。,保持核心稳定，避免腰部塌陷或臀部抬起，以免增加腰椎压力。,如有肩部或手腕不适，应立即停止并在专业指导下调整动作或使用替代姿势。', '肘部外翻，导致肩膀承受过大压力。,臀部抬高形成拱背，身体线条不直，增加腰椎受伤风险。,下降幅度不足，未达到胸部靠近地面的标准，导致训练效果减弱。', '初学者可将膝盖着地做跪姿俯卧撑，以减轻负荷。,如果手腕不适，可将双手放在拳头或使用俯卧撑把手以改变手腕角度。,使用倾斜的平面（如上斜凳）进行俯卧撑，可降低难度，逐步过渡到平地窄距俯卧撑。', 'compound', '{"宽距俯卧撑":"如果觉得窄距俯卧撑强度过大，可先尝试宽距俯卧撑来加强胸部发力，再逐步收窄手距。","跪姿俯卧撑":"将膝盖置于地面进行跪姿俯卧撑，降低身体负重，适合上肢力量不足者。","上斜俯卧撑":"将双手放在稍高的平台（如凳子）进行上斜俯卧撑，可减轻胸部负担，便于进阶。","负重俯卧撑":"在背部放置轻量杠铃或负重背心，增加负荷，适用于力量提升阶段。","哑铃俯卧撑":"双手握住哑铃进行俯卧撑，增加不稳定因素，提升核心和胸肌的协同发力。"}', 'published', NOW(3), NOW(3));
SET @eid_424 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 肩部前束 (synergist)
-- Suggested muscle: 背阔肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('站姿哑铃臂屈伸', 'arms', 'dumbbell', 'beginner', NULL, '1. 站立，双脚与肩同宽，核心收紧，保持背部挺直，双手各握一个哑铃垂于身体两侧。\n2. 将哑铃举至头顶，双臂伸直，手掌相对，上臂贴近头部两侧。\n3. 保持上臂固定不动，仅通过前臂的弯曲将哑铃向下放至头后，肘关节弯曲约90度或更低。\n4. 在最低点停顿1秒，然后通过收缩肱三头肌发力，将哑铃向上推回起始位置。\n5. 动作过程中保持核心稳定，避免腰部过度弯曲借力。\n6. 重复动作至规定次数，注意全程保持对上臂的控制。', '1. 保持核心收紧，避免在动作过程中腰部过度弯曲或拱背。\n2. 上臂应保持相对固定，不要在动作时过度摆动或外展。\n3. 控制动作速度，避免突然用力导致肘关节受伤，全程保持对重量的控制。', '1. 上臂在动作过程中外展或前后摆动，导致目标肌肉刺激减少。\n2. 动作速度过快，没有在最低点和顶端充分收缩肱三头肌。\n3. 借助腰部摆动借力完成动作，降低训练效果并增加受伤风险。', '初学者可先采用坐姿进行此动作，以减少核心稳定性的要求；也可双手握一个哑铃进行练习，降低技术难度；对于柔韧性较差的人群，可以在斜凳上进行以获得更好的支撑。', 'isolation', '{"单手交替":"可改为单手交替进行，增加核心稳定性和动作控制要求","斜凳臂屈伸":"可改为在斜凳上进行，靠在斜凳上做可以更好地固定上臂","绳索下压":"可使用绳索器械替代，提供的恒定张力更有利于肌肉收缩感受"}', 'published', NOW(3), NOW(3));
SET @eid_430 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 肱二头肌 (antagonist)
-- Suggested muscle: 前三角肌 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('站姿杠铃弯举+臂屈伸', 'arms', 'barbell', 'advanced', NULL, '1. 站立，双脚与肩同宽，握住杠铃，掌心朝上，握距略宽于肩，手臂自然下垂；\n2. 收紧肩胛骨，保持上臂固定不动，仅通过弯曲肘关节将杠铃向上弯举至肩部高度，感受二头肌收缩；\n3. 在顶峰位置停顿挤压二头肌，然后控制重量缓慢下放杠铃回到起始位置；\n4. 保持上臂固定，将杠铃从肩部位置继续向上举起至手臂完全伸直并位于头部上方，同时保持肘关节固定；\n5. 在动作顶端稍作停留，然后控制杠铃缓慢下放至胸部或肩部位置，保持上臂稳定；\n6. 重复完成规定次数的弯举-伸展循环。', '1. 动作全程保持核心收紧，避免身体晃动借力；\n2. 肘关节在弯举阶段应保持固定，仅进行屈伸运动；\n3. 若感到肩关节不适或疼痛，应立即停止动作。', '1. 上臂跟随动作前后移动，导致目标肌群刺激减弱；\n2. 身体前后晃动借助惯性抬起重量；\n3. 耸肩或肘关节外翻，影响肩部活动范围和动作稳定性。', '初学者可以先用较轻重量的哑铃或杠铃单独练习弯举和臂屈伸动作，待掌握动作要领后再组合练习；更换器材时注意调整握法和身体姿势。', 'compound', '{"变体类型":"可以使用EZ杆或哑铃替代杠铃进行单臂或双臂练习，降低腕关节压力；也可以将动作拆分为单独的杠铃弯举和三头肌屈伸进行练习。","器材变化":"将杠铃替换为EZ杆可减少手腕压力，替换为哑铃可增加动作灵活性。"}', 'published', NOW(3), NOW(3));
SET @eid_455 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 肱三头肌 (antagonist)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('站姿臂部循环', 'arms', 'dumbbell', 'intermediate', NULL, '1. 站立姿势准备：双脚与肩同宽，膝盖微屈保持弹性，核心收紧，背部挺直，双手各持一只哑铃自然垂于身体两侧。 2. 执行哑铃弯举：保持上臂固定，仅弯曲肘部，将哑铃向上弯举至肩部高度，感受肱二头肌收缩，然后缓慢下放回到起始位置。 3. 进行肩上推举：从起始位置开始，将哑铃从肩部向上推举至手臂完全伸直，但肘关节不要锁死，推举过程中保持核心稳定。 4. 侧平举动作：双臂向身体两侧展开，保持肘部微屈，将哑铃抬起至与肩部平齐的高度，然后缓慢下放。 5. 俯身划船：屈髋屈膝俯身约45度，双手垂直向下，将哑铃向上拉至腹部位置，收缩背部肌肉，然后控制下放。 6. 循环完成后：缓慢站直，短暂休息后重复上述循环动作，完成预设次数。', '1. 整个动作过程中保持核心收紧，避免腰部过度弯曲导致椎间盘压力过大。 2. 选择的哑铃重量应适中，确保能够控制动作全程，避免借力摆动造成肌肉拉伤。 3. 保持肩胛骨稳定，避免耸肩造成肩部压力，动作过程中保持呼吸顺畅不要憋气。', '1. 身体摇摆借力：在弯举或推举时晃动身体，借助惯性完成动作，降低了训练效果并增加受伤风险。 2. 动作速度过快：没有控制地快速完成动作，肌肉得不到充分刺激，应保持2-3秒的离心和向心控制。 3. 耸肩和肩胛骨前引：忽视了肩胛骨的稳定性，导致上斜方肌过度参与，降低了目标肌群的刺激效果。', '新手可以先专注于单个动作如标准弯举或推举，掌握技术后再组合成循环；肩部有伤的人群可将俯身划船替换为坐姿划船，减少腰部压力；初学者可先采用较轻重量的哑铃进行练习，逐渐增加重量。', 'compound', '{"减轻难度":"减少动作种类，仅练习弯举和推举两个动作，使用较轻哑铃","增加难度":"增加俯卧撑或引体向上等动作作为循环补充，或增加哑铃重量","替换动作":"可将俯身划船替换为面拉动作，适合肩部不适的人群"}', 'published', NOW(3), NOW(3));
SET @eid_462 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 三角肌 (synergist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 背阔肌 (synergist)
-- Suggested muscle: 前臂肌群 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索下压', 'arms', 'cable', 'beginner', NULL, '1. 调整绳索高度至胸部上方，双手握住绳索手柄，掌心相对，手臂自然下垂。\n2. 站立或坐在拉力器前，双脚与肩同宽，膝盖微屈，核心收紧，保持胸部挺直，肩胛骨略微后收。\n3. 保持上臂紧贴身体两侧，仅通过肘部的屈伸向下压绳索，直到手臂接近完全伸展（肘部略微弯曲但不要锁死）。\n4. 在最低点停顿约1秒，充分感受三头肌的收缩。\n5. 缓慢控制地将绳索回到起始位置，肘部保持微屈，重复动作。', '1. 检查绳索和手柄是否固定可靠，防止使用时脱落。\n2. 动作全程保持背部挺直，避免过度前倾或后仰导致腰背受伤。\n3. 使用合适重量，避免借力或摆动身体，以防止关节受力过大。', '1. 手臂外展或耸肩，导致肩部参与而非三头肌。\n2. 肘部在动作过程中向外张开，未固定上臂，降低三头肌的刺激。\n3. 使用过重重量导致身体摆动或借助惯性完成动作，影响训练效果。', '可更换不同手柄（如直杆、V形手柄）改变握法；可改为单手绳索下压以强化单侧三头肌；若肩部不适，可在坐姿或斜靠的姿势下进行，以减少肩部负荷。', 'isolation', '{"站姿绳索下压":"可改为坐姿绳索下压，使上臂固定更稳，减少身体摆动。","单手绳索下压":"将双手握柄改为单手握柄，专注于单侧三头肌的孤立训练。","换手柄":"使用直杆或V形手柄可改变手腕角度，提供不同的刺激感受。"}', 'published', NOW(3), NOW(3));
SET @eid_415 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌（肱三头肌） (agonist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 胸大肌（锁骨部） (synergist)
-- Suggested muscle: 二头肌（肱二头肌） (antagonist)
-- Suggested muscle: 核心肌群（腹直肌） (stabilizer)
-- Suggested muscle: 前臂屈肌（握力） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索弯举', 'arms', 'cable', 'intermediate', NULL, '1. 调整滑轮至低位，选择合适的把手（直杆或EZ杆），并将重量调至适当。\n2. 站直，双脚与肩同宽，背部保持自然挺直，双手握住把手，手臂自然下垂，手肘靠近身体两侧。\n3. 在呼气的同时，利用肱二头肌的力量将把手向上弯举至肩膀高度，保持肘部固定不动，仅在前臂处做屈伸。\n4. 在最高点稍作停顿，充分收缩肱二头肌，感受肌肉紧绷。\n5. 吸气，缓慢控制下降，将把手放回起始位置，保持肌肉张力不要完全放松。\n6. 完成预定的次数后停止，若感到疲劳或疼痛立即停止并检查姿势。', '确保滑轮和把手安装牢固，重量堆块已锁定，防止在运动过程中滑落。,保持背部挺直，避免通过摆动身体或后仰来帮助提升重量，这样可以防止腰背受伤。,使用适当的重量，控制动作速度，尤其在下放阶段不要让重量自由落体，以免拉伤肌肉。', '使用过大的重量导致身体摆动，借力完成动作，使二头肌受力不均。,肘部在弯举过程中向外展开或向前移动，削弱了二头肌的收缩效果。,没有完成全程的动作范围，只做半程弯举，限制了肌肉的伸展与收缩。', '如果手腕力量不足，可以换成EZ杆以减轻手腕扭力；若想更好地刺激二头肌内侧，可使用窄握把手；若感到肩部不适，适当调低滑轮高度，使肘部自然位于身体前方。', 'isolation', '{"哑铃弯举":"将绳索换成等重的哑铃，保持相同的手肘位置和运动轨迹，注意在下降时同样控制重量。","杠铃弯举":"使用杠铃代替绳索，握距可调至与肩同宽，杠铃弯举对背阔肌的协同要求略高。","机器弯举":"若健身房提供专用二头肌机器，可将绳索换成机器坐姿弯举，注意调节座椅高度以保证肘部固定。"}', 'published', NOW(3), NOW(3));
SET @eid_402 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)
-- Suggested muscle: 肩袖肌群 (stabilizer)
-- Suggested muscle: 背阔肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索腕弯举', 'arms', 'cable', 'intermediate', NULL, '1. 面向绳索机站立，双脚与肩同宽，膝盖微屈。2. 双手握住绳索把手，手臂自然下垂，手掌向上（仰卧握法）。3. 保持上臂固定不动，仅通过手腕弯曲将重量向上卷起，直到手腕完全屈曲。4. 在顶峰位置稍作停顿，感受前臂肌肉的收缩。5. 缓慢控制地放下重量，回到起始位置，手腕向下弯曲。6. 重复完成指定次数。', '使用合适的重量，从轻重量开始逐渐增加，避免使用过重导致手腕损伤。动作过程中保持核心收紧，避免身体晃动借力。', '上臂和前臂在动作过程中上下移动，借用身体力量而非孤立的腕部力量。动作速度过快，没有控制地完成动作，降低训练效果。', '可调整绳索高度，高位绳索适合坐姿训练，低位适合站姿。可改变握法（仰卧或俯卧）来侧重不同部位。', 'isolation', '{"变体类型":"可转换为哑铃腕弯举、杠铃腕弯举或机器腕弯举，同样针对前臂腕屈肌进行孤立训练。","器材转换":"哑铃腕弯举：动作模式相同但固定手腕，可坐姿在训练凳上完成；杠铃腕弯举：使用较大重量，适合大力量训练者。"}', 'published', NOW(3), NOW(3));
SET @eid_446 = LAST_INSERT_ID();
-- Suggested muscle: 桡侧腕屈肌 (agonist)
-- Suggested muscle: 尺侧腕屈肌 (agonist)
-- Suggested muscle: 掌长肌 (synergist)
-- Suggested muscle: 指浅屈肌 (synergist)
-- Suggested muscle: 肱二头肌 (stabilizer)
-- Suggested muscle: 三角肌前束 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('背后臂屈伸', 'arms', 'bodyweight', 'intermediate', NULL, '1. 背对稳固的椅子或台阶，双手撑在身后边缘，手指朝前或略微朝外，手臂伸直支撑身体；2. 双腿前伸，脚跟着地，脚尖向上勾起，身体呈直线姿态，核心收紧；3. 保持身体平直，屈肘下降身体，使上臂与地面平行或略低于平行位置，肩关节同时屈曲；4. 在最低点保持1-2秒，感受肱三头肌被充分拉伸；5. 肱三头肌发力，同时伸肘和伸肩，将身体推起回到起始位置；6. 重复动作，根据自身能力完成8-12次', '确保支撑面稳固且足够高，起始位置手部与身体保持适当距离以保持平衡；下降时控制速度，避免突然下坠造成肩关节损伤；初学者建议在身体两侧放置软垫以防意外跌落', '肩关节过度前伸导致耸肩和上斜方肌代偿；身体过于直立导致动作幅度不足，肱三头肌刺激不够；双手距离过窄导致手腕压力过大和发力困难', '初学者可将双脚放于更高位置（如另一把椅子）以减少难度；进阶者可在双脚下垫高物或单腿支撑增加难度；膝盖弯曲可降低难度，伸直双腿则增加挑战', 'compound', '{"降阶变体":"双腿放在稍高的位置，减少身体需要支撑的重量","进阶变体":"在脚踝处负重或进行单臂背后臂屈伸以增加挑战"}', 'published', NOW(3), NOW(3));
SET @eid_426 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 胸大肌 (synergist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 背阔肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('负重手指俯卧撑', 'arms', 'bodyweight', 'advanced', NULL, '1. 将负重（背心、背包或杠铃片）放在背部，四肢着地呈俯卧撑起始姿势，双手手指完全朝前撑于地面。\n2. 收紧核心肌群，保持身体从头部到脚跟呈一条直线，肩胛骨微微后收下沉。\n3. 屈肘降低身体，同时将部分重量转移到手指上，确保胸部逐渐接近地面，保持手腕中立。\n4. 在最低点停顿片刻，感受前臂和手指的收缩。\n5. 通过手掌和手指共同发力，将身体向上推起回到起始位置，手指全程保持抓地状态。\n6. 完成指定次数后，卸下负重，休息片刻再进行下一组。', '确保手腕和手指无伤病史，如有手腕或手指疼痛应避免此动作；负重应控制在合理范围内，建议从轻重量开始逐步增加；选择柔软的地面进行练习，避免手指直接撑在硬质地面上造成损伤。', '手指外旋或内扣导致手腕压力过大，应始终保持手指朝前；负重过大导致身体塌腰或动作变形，降低了训练效果且增加受伤风险；下降速度过快无法充分刺激肌肉，且容易导致手指滑脱。', '初学者可先在不背负重的情况下练习标准手指俯卧撑，待手指和前臂力量增强后再逐步增加负重；如果手指力量不足，可以先从握拳俯卧撑开始过渡；进阶者可尝试单手手指俯卧撑或增加更多负重。', 'compound', '{"降级变体":"去除负重，改为标准手指俯卧撑或跪姿手指俯卧撑","升级变体":"增加负重至极限或尝试单手手指俯卧撑","替代动作":"负重俯卧撑、窄距俯卧撑、俄挺俯卧撑均可替代此动作"}', 'published', NOW(3), NOW(3));
SET @eid_451 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 胸大肌 (synergist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 指伸肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 背阔肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('超级组（弯举+下压）', 'arms', 'cable', 'intermediate', NULL, '1. 站立在缆绳器械正前方，双脚与肩同宽，保持核心收紧，身体略微前倾但背部挺直；2. 双手握住低位滑轮把手，手臂自然下垂，掌心向上，采用反握方式；3. 进行弯举动作：保持上臂固定，仅通过弯曲肘部将把手向上举起，直到肱二头肌完全收缩，然后缓慢下放回到起始位置；4. 弯举完成后，保持握把不离手，迅速将双手转换到高位滑轮把手，采用正握方式准备进行下压动作；5. 进行下压动作：保持上臂贴近身体两侧，通过伸展肘部将把手向下压，直到手臂完全伸直，肱三头肌充分收缩，然后缓慢控制回到起始位置；6. 完成下压后，双手再次迅速转换到低位把手，开始下一组超级组，整个过程保持动作连贯流畅。', '确保训练区域周围无障碍物，避免在动作过程中意外撞到器械或其他物体；重量选择应适中，避免因体力下降而导致动作变形或失控造成伤害；训练过程中保持肩膀稳定下沉，避免耸肩导致肩部压力过大或拉伤。', '身体过度前后摆动借力，导致目标肌肉刺激不足，甚至引发腰部损伤；弯举和下压之间转换过慢，无法有效维持超级组的训练强度和心肺刺激；动作速度过快，尤其是下降阶段缺乏控制，显著降低训练效果并增加受伤风险。', '可根据训练目标调整握把类型，宽握或窄握会影响肌肉参与程度；如果力量不够平衡，可先进行单臂训练再过渡到双臂同时训练；超级组中的两个动作顺序可根据个人薄弱环节调整，通常将较弱部位放在前面；训练重量和重复次数应根据个人体能水平做适当调整，初学者建议使用较轻重量的缆绳。', 'compound', '{"替代器材":"可使用哑铃或杠铃进行类似组合，将哑铃弯举配合哑铃颈后臂屈伸组成超级组","动作简化":"可拆分为单独的弯举和下压动作分别训练，或减少超级组中的动作数量","动作组合":"可尝试将弯举+侧平举、下压+俯身划船等不同动作组合创造超级组效果"}', 'published', NOW(3), NOW(3));
SET @eid_456 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 前臂肌群 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('跪姿杠铃臂屈伸', 'arms', 'barbell', 'intermediate', NULL, '1. 跪姿准备：双膝跪在训练垫上，膝盖与髋部同宽，双手正握杠铃，握距与肩同宽，将杠铃举至头顶上方，手臂完全伸直。\n2. 身体稳定：收紧核心肌群，肩膀微微后收下沉，肩胛骨保持稳定，整体躯干保持正直，视线平视前方。\n3. 屈臂下放：控制速度，缓慢弯曲肘关节，将杠铃向头后方下降，保持上臂贴近耳朵两侧不动，肘关节指向正下方。\n4. 下降幅度：继续下降直到前臂与地面平行或略低于平行位置，感受肱三头肌被充分拉伸，保持此姿势1秒。\n5. 发力上推：肱三头肌发力，将杠铃向上推起至手臂完全伸直，回到起始位置，在顶端顶峰收缩1秒。\n6. 重复动作：按照上述步骤重复进行，建议进行3-4组，每组8-12次。', '1. 使用适当重量：从较轻重量开始练习，确保能够控制动作全程的稳定性，避免杠铃失控造成头部或颈部受伤。\n2. 控制运动幅度：不要将杠铃降得过低，建议前臂不低于平行位置，以保护肘关节并防止肩部过度压力。\n3. 保持上臂稳定：在整个动作过程中，上臂必须保持垂直或略微前倾，避免前后摆动导致肩关节损伤。', '1. 上臂移动：动作过程中上臂不自觉地向外张开或前后移动，降低了对肱三头肌的刺激效果，应始终保持上臂贴近头部两侧。\n2. 借力摆动：身体上下摆动或利用惯性抬起重量，这不仅减少了目标肌肉的参与，还增加了下背部受伤风险，应使用可控重量。\n3. 肘关节外翻：下降时肘关节向两侧张开而不是指向前方，这会增加肘部压力，建议保持肘关节微微内收。', '1. 初学者建议：可以从较轻的杠铃或EZ杆开始练习，感受动作轨迹后再逐渐增加重量，也可在跪姿下使用较短的杠铃或哑铃替代。
2. 姿势调整：如果跪姿感到不适，可以改为坐姿在平凳上或采用站姿进行练习，站姿需要更好的核心控制能力。
3. 器材替代：如果手腕不适，可以选择EZ杆或V型把手来减少手腕压力，或者使用直杆配合护套来改变握把角度。', 'isolation', '{"姿势变化":"改为站姿或坐姿进行练习，站姿需要更强的核心稳定性，坐姿则更容易孤立肱三头肌。","器材变化":"可使用EZ杆、哑铃或绳索器械替代杠铃，EZ杆和哑铃能更好地适应手腕角度，减少关节压力。","难度调整":"降低难度可使用较轻重量或单臂练习，增加难度可尝试负重背心或暂停式训练方法。"}', 'published', NOW(3), NOW(3));
SET @eid_432 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 三角肌后束 (synergist)
-- Suggested muscle: 肱二头肌 (antagonist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 肩袖肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('过头绳索臂屈伸', 'arms', 'cable', 'intermediate', NULL, '1. 将绳索调整到最高位置，连接绳索把手或双把。背对器械站立，双脚与肩同宽。\n2. 双手握住把手，手肘弯曲90度，上臂紧贴身体两侧，肘尖朝向正前方。\n3. 吸气时，保持上臂固定不动，仅通过三头肌发力将绳索向下拉。\n4. 继续下拉直到手臂完全伸直，肱三头肌充分收缩，在顶点保持1-2秒。\n5. 呼气时，缓慢有控制地将绳索放回起始位置，手肘保持90度弯曲。\n6. 重复完成规定次数。', '1. 始终保持核心收紧、腹部绷紧，避免腰椎过度伸展或前倾。\n2. 肘关节在动作全程保持微曲，不要完全锁死，以免造成关节压力过大。\n3. 选择适当重量，确保动作全程可控，避免借助身体摆动来完成任务。', '1. 肘关节向外打开过多，导致肩部代偿发力，降低三头肌的刺激效果。\n2. 使用过重重量导致身体前后摆动或倾斜，无法孤立刺激三头肌。\n3. 动作幅度不足，只做半程训练，降低训练效果。', '1. 初学者建议从轻重量开始练习，先掌握正确动作模式再逐步增加负荷。
2. 可将绳索换成直杆或V型把，根据舒适度选择不同握法。
3. 调整绳索高度可改变刺激角度，高位更适合三头肌长头，低位更针对外侧头。', 'isolation', '{"自身体重变体":"可改为跪姿或坐姿过头臂屈伸，使用弹力带或哑铃替代绳索。","负重变体":"可使用哑铃或壶铃进行单臂或双臂过头屈伸，增加稳定性挑战。"}', 'published', NOW(3), NOW(3));
SET @eid_418 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('递减组弯举', 'arms', 'dumbbell', 'advanced', NULL, '1. 站立直立，双脚与肩同宽，双手各持一只哑铃，手臂自然下垂，掌心朝前。\n2. 保持上臂固定不动，仅通过弯曲肘关节将哑铃向上抬起，同时呼气，感受二头肌收缩。\n3. 在动作顶峰时停顿约1秒，充分挤压二头肌。\n4. 缓慢下落哑铃至手臂完全伸展，吸气，控制在2-3秒内完成下降。\n5. 完成一组后（通常8-12次），立即换用较轻的哑铃继续进行下一组，不休息。\n6. 继续递减重量进行3-4组，直到无法完成标准动作为止。', '1. 选择合适的起始重量，最后几组仍需保持正确姿势，避免因重量过重导致肌肉拉伤。\n2. 整个动作过程中保持核心收紧，避免借用身体晃动借力。\n3. 下降阶段必须控制速度，避免哑铃突然掉落造成手腕或肘关节损伤。', '1. 上臂跟随动作摆动，借用肩膀力量抬起哑铃，降低二头肌的孤立刺激效果。\n2. 身体前后摆动或利用惯性甩动哑铃，这是非常危险的错误动作模式。\n3. 下降速度过快，没有充分控制，形成惯性后影响肌肉收缩效果。', '初学者建议先掌握标准哑铃弯举，递减组可从2组开始，重量递减幅度为每组减少2-3公斤；如腕关节有不适，可在动作过程中保持手腕中立位或使用护腕带；如有肘关节问题，建议减少动作幅度或使用较轻重量。', 'isolation', '{"变体类型":"可转换为：1)坐姿递减组弯举（减少背部和核心参与）；2)斜板弯举（增加动作行程和肌肉拉伸）；3)单臂递减组弯举（可单独纠正左右力量不平衡）"}', 'published', NOW(3), NOW(3));
SET @eid_457 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('递减组臂屈伸', 'arms', 'dumbbell', 'advanced', NULL, '1. 站姿或坐姿，双手各握一只哑铃，将哑铃举至头顶，手臂伸直，掌心相对，保持核心收紧。\n2. 屈肘将哑铃缓慢下降至头部后方，保持上臂紧贴头部两侧，动作全程保持肘部指向正前方，避免向外展开。\n3. 在最低点稍作停顿，然后利用肱三头肌的力量将哑铃推回起始位置，动作全程保持控制，不要弹起或借助惯性。\n4. 完成预定的次数后，换至较轻的哑铃继续进行下一组（即递减组），保持相同的动作轨迹和速度。\n5. 重复上述过程直至完成所有递减组，期间注意呼吸配合——下降时吸气，推起时呼气。', '1. 选择合适的重量，确保在动作全程能够保持控制，避免因重量过大导致肩关节或肘部受伤。\n2. 动作过程中保持上臂固定，避免肩部前倾或耸肩，以减少肩袖肌群的压力。\n3. 在进行递减组时，快速更换哑铃后仍要检查握法是否稳固，防止哑铃滑落。', '1. 肘部外展或耸肩，导致肩部承受额外压力并降低肱三头肌的刺激效果。\n2. 使用过重的哑铃导致在下降阶段失控，出现弹跳或摆动，削弱肌肉的离心收缩。\n3. 动作幅度不足，仅在半程范围内运动，未能充分利用肌肉全程收缩。', '如果肩部有不适，可改为坐姿并将背部靠在靠背上，以降低肩部负担；若手腕灵活性受限，可使用曲柄手柄或改为绳索训练；初学者可以先从较轻的哑铃或单臂动作开始，逐步适应后再进行递减组。', 'isolation', '{"单臂递减组":"将双手分别持不同重量的哑铃，每组只用单臂完成动作，另一只手臂可辅助支撑，组间交替进行。","坐姿递减组":"坐在有靠背的凳子上执行动作，背部贴靠椅背，以更好地固定躯干并减少腰背压力。","倾斜姿势递减组":"倾斜凳子约30-45度，背部靠在倾斜面上进行动作，可增加对上臂后方肌群的拉伸幅度。","绳索递减组":"使用滑轮装置替代哑铃，调节重量进行递减组，能够提供更平稳的阻力和不同的张力曲线。"}', 'published', NOW(3), NOW(3));
SET @eid_458 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 肘后肌（Anconeus） (synergist)
-- Suggested muscle: 前三角肌 (stabilizer)
-- Suggested muscle: 肩袖肌群（旋转袖） (stabilizer)
-- Suggested muscle: 胸大肌上部 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('速握练习', 'arms', 'other', 'intermediate', NULL, '1. 站立或坐姿，保持背部挺直，肩部放松，双脚与肩同宽平放于地面。2. 选择合适的握力器材（如握力球、握力器或软球），用单手握住，确保手掌完全包裹器材。3. 快速用力握紧器材，感受前臂和手部肌肉收缩，保持握紧状态1-2秒。4. 缓慢释放力量，让手部肌肉充分放松，回到起始位置。5. 完成一组次数后换另一只手进行相同的训练，保持呼吸节奏均匀。6. 根据训练目标完成规定的组数，注意控制动作速度。', '1. 握力训练时避免使用过大阻力，应从轻阻力开始逐步增加，防止前臂肌肉和肌腱过度负荷受伤。2. 如感到手腕、手指或前臂出现刺痛或麻木，应立即停止训练并休息，避免神经受压导致损伤。3. 训练前做好热身准备，如进行手腕旋转和手指伸展练习，提高关节灵活性和血液循环。', '1. 握紧和放松速度过快，动作缺乏控制，容易导致肌肉拉伤或关节压力过大。2. 训练时手腕过度弯曲或伸展，改变了发力角度，降低训练效果且增加受伤风险。3. 忽视对侧手训练或只训练惯用手侧，造成左右手臂力量和肌群发展不平衡。', '初学者可从较软的球体或阻力较小的握力器开始训练，随着力量提升逐步更换高阻力器材；资深训练者可增加训练组数或缩短组间休息时间来提高训练强度；如手腕有伤，可调整为坐姿并将前臂置于软垫上训练以获得额外支撑。', 'isolation', '{"增加难度":"使用更高阻力的握力器材，或在每次握紧后保持更长时间再释放，增加离心收缩训练","降低难度":"使用更软的球体或减少训练组数，确保动作质量优先于数量","变化形式":"可采用双手同时训练提高效率，或进行交替握放练习增强协调性"}', 'published', NOW(3), NOW(3));
SET @eid_452 = LAST_INSERT_ID();
-- Suggested muscle: 指深屈肌 (agonist)
-- Suggested muscle: 指浅屈肌 (agonist)
-- Suggested muscle: 拇收肌 (synergist)
-- Suggested muscle: 蚓状肌 (synergist)
-- Suggested muscle: 前臂伸肌 (antagonist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('集中弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 坐在平凳边缘，双腿分开与肩同宽，保持背部挺直。\n2. 单手握住哑铃，将肘部内侧贴在大腿内侧，哑铃垂直于地面。\n3. 另一只手可以放在另一侧大腿上支撑身体，帮助保持平衡。\n4. 保持上臂固定，仅通过二头肌发力将哑铃向上弯举至肩部高度。\n5. 在顶峰位置停顿1-2秒，充分收缩二头肌。\n6. 缓慢控制地放下哑铃回到起始位置，重复完成规定次数后换另一侧手臂。', '1. 选择适当重量的哑铃，避免因重量过大导致身体晃动或借力。\n2. 保持背部挺直，避免弓背弯腰，减少下背部受伤风险。\n3. 动作过程中保持核心收紧，避免晃动借力。', '1. 借助身体晃动抬起哑铃，而非仅靠二头肌发力。\n2. 动作幅度不足，没有充分伸展或收缩。\n3. 上臂跟随移动，没有固定在起始位置。', '初学者可以先从较轻重量开始练习，熟悉动作轨迹后再逐步增加重量；如果肩部不适，可以将手肘稍微向前移动，减小肩部压力；进阶者可以在顶峰位置做额外的收缩挤压，增强肌肉刺激。', 'isolation', '{"变体类型":"双手哑铃弯举、杠铃弯举、斜板弯举","转换建议":"集中弯举是孤立动作的经典练习，如果想要增加动作多样性，可以转换为斜板弯举来增加拉伸幅度，或者通过锤式弯举改变手腕角度来刺激二头肌的不同部位；初学者可先掌握集中弯举打下的基础后，再逐步过渡到复合动作如杠铃弯举。","相关变体":["单臂哑铃弯举","斜板哑铃弯举","托臂弯举"]}', 'published', NOW(3), NOW(3));
SET @eid_397 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 前臂肌群 (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('低位绳索弯举', 'arms', 'cable', 'intermediate', NULL, '1. 调整滑轮至低位（脚踝高度或略低），挂上绳索或直杆，双手握住手柄，站距与肩同宽，核心收紧。\n2. 站姿保持直立，肘部贴近身体两侧，掌心向上（或相对），准备姿势固定。\n3. 吸气时，通过二头肌的收缩，弯举手柄至肩膀高度，动作全程保持上臂不动，只有前臂运动。\n4. 在顶峰位置稍微停顿，感受到二头肌的紧绷。\n5. 呼气时，缓慢放下手柄至初始位置，保持控制，避免重量突然掉落。\n6. 重复所需次数。', '• 确保滑轮固定且绳索无磨损，防止使用时滑脱或断裂。\n• 动作全程保持背部挺直，避免借助背部力量或耸肩。\n• 使用适当的重量，避免使用过大重量导致动作失控或肘关节受伤。', '• 上臂在弯举时抬起或前倾，导致肩部参与过多。\n• 动作速度过快，尤其是放下阶段，缺乏肌肉控制。\n• 手握位置过宽或过窄，使得前臂肌肉受力不均。', '• 如需更强刺激，可将滑轮调得更低，以改变拉力角度。
• 手柄可换成曲杆或绳索，刺激二头肌的不同头部。
• 通过调节站距（前倾或后仰）来改变背阔肌的参与程度。', 'isolation', '{"高位绳索弯举":"将滑轮调至高处，保持相同的握法和动作轨迹，适用于改变拉力角度。","哑铃弯举":"使用自由重量，模仿绳索弯举的动作，保持肘部固定和全程控制。","杠铃弯举":"使用杠铃进行同样的肘部屈曲，注意保持上臂不动，动作幅度与绳索弯举相似。"}', 'published', NOW(3), NOW(3));
SET @eid_406 = LAST_INSERT_ID();
-- Suggested muscle: 二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)
-- Suggested muscle: 三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('俯卧撑（窄距）', 'arms', 'bodyweight', 'intermediate', NULL, '1. 从高位平板支撑姿势开始，双手撑地，间距比肩窄（建议约与肩同宽），手指朝前，手腕位于肩膀正下方。\n2. 身体从头到脚跟保持一条直线，核心收紧，臀部不要塌陷或拱起，避免腰部过度弯曲。\n3. 屈肘降低身体，保持肘部紧贴身体两侧（角度控制在30-45度以内），下降至胸部接近地面，感觉三头肌被拉伸。\n4. 通过收缩三头肌将身体推起，回到起始位置，全程保持身体平直。\n5. 在动作顶端可以稍微停顿，然后再次下降重复，保持稳定的呼吸节奏。', '1. 手腕必须与肩膀对齐，避免手腕过度内旋导致腕关节压力过大。\n2. 全程保持核心紧绷，防止腰部塌陷造成下背部损伤。\n3. 控制下降速度，避免快速下落导致肩关节受伤。', '1. 双手间距过窄，导致手腕疼痛或不适，手腕承受过度压力。\n2. 下降时肘部过度外展张开，远离身体，增加肩部压力。\n3. 动作过程中身体呈现拱形（臀部过高）或塌腰，削弱核心参与度。\n4. 下降深度不够，只做半程动作，无法充分刺激目标肌肉。', '如果无法完成标准窄距俯卧撑，可以先从宽距俯卧撑开始建立力量；降低难度可采用跪姿窄距俯卧撑或在上斜位置（如扶桌子、台阶）进行练习；进阶可尝试钻石俯卧撑（双手食指和拇指接触成钻石形状）进一步强化三头肌。', 'compound', '{"降阶变体":"从标准窄距俯卧撑转为跪姿窄距俯卧撑或上斜窄距俯卧撑","进阶变体":"完成标准动作后可尝试钻石俯卧撑或单臂窄距俯卧撑","转换为孤立动作":"想要更孤立训练三头肌，可替换为哑铃颈后臂屈伸或绳索下压"}', 'published', NOW(3), NOW(3));
SET @eid_404 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 胸大肌 (synergist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('俯卧板凳弯举', 'arms', 'dumbbell', 'intermediate', NULL, '1. 调整凳子倾斜角度至约45度，仰卧其上，双手各持哑铃，手臂自然下垂，掌心向上。\n2. 保持上臂固定，使用肘部屈曲的力量，将哑铃向上卷起至肩部高度，感受二头肌的收缩。\n3. 在顶峰位置稍作停顿，确保二头肌充分收缩，然后缓慢放下哑铃回到起始位置，肘部保持微屈。\n4. 完成一组次数后，换另一侧手臂继续，或按计划交替进行。\n5. 重复完成预设的组数，保持动作平稳、呼吸均匀。', '在上斜凳上确保背部、头部得到良好支撑，避免滑落或失去平衡。,使用适当重量的哑铃，避免因重量过大导致姿势失控或肘部受伤。,动作全程保持肘部固定，避免肘部向外展开或晃动，以减少肩部不必要的负荷。', '将肘部抬起或外展，使肩部参与动作，导致二头肌刺激减弱。,动作过快或使用惯性，导致动作不稳并增加受伤风险。,在顶峰位置未停顿或未完全收缩二头肌，降低训练效果。', '如果感到肩部不适，可适当降低凳子倾斜角度或使用靠背支撑；如需更多二头肌上部刺激，可将倾斜角度调高；若要增加难度，可使用更重的哑铃或在动作顶部加入等长收缩。', 'isolation', '{"单臂变体":"将另一只手扶在凳子或膝盖上，以保持身体稳定，确保只使用一只手臂完成全程动作。","加重变体":"使用更重的哑铃或增加负重背带，以提升二头肌的负荷。","斜板变体":"改变凳子倾斜角度，倾斜角度越大，对二头肌的上部纤维刺激越明显。"}', 'published', NOW(3), NOW(3));
SET @eid_409 = LAST_INSERT_ID();
-- Suggested muscle: 二头肌（肱二头肌） (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前臂屈肌群 (synergist)
-- Suggested muscle: 前三角肌 (stabilizer)
-- Suggested muscle: 斜方肌上部 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃二头三头组合', 'arms', 'dumbbell', 'intermediate', NULL, '1. 站姿准备：双脚与肩同宽站立，膝盖微屈，保持核心收紧，双手各持一只哑铃垂于身体两侧，掌心朝前。2. 二头弯举阶段：保持上臂固定，仅通过弯曲肘关节将哑铃向肩部方向卷起，在顶峰位置收紧二头肌并保持1秒。3. 缓慢下放阶段：控制性地将哑铃缓慢下放回起始位置，手臂不完全伸直以保持肌肉张力。4. 三头屈伸阶段：从起始位置开始，将哑铃移至头顶后方，手臂弯曲呈90度角。5. 三头推举阶段：依靠三头肌发力将哑铃向上推起，直到手臂完全伸展，在顶峰位置收紧三头肌并保持1秒。6. 循环操作：缓慢下放至三头屈伸位置，然后将哑铃带回初始位置，完成一次完整的组合动作。', '1. 选择合适重量的哑铃，避免因重量过大导致动作变形或肌肉拉伤。2. 整个动作过程中保持核心收紧，避免腰部过度前倾或后仰造成腰椎压力。3. 动作速度保持平稳可控，避免利用惯性快速甩动哑铃。', '1. 上臂随动作摆动：在二头弯举时未固定上臂位置，导致用惯性带动而非肌肉发力。2. 耸肩或身体晃动：未保持肩部放松和核心稳定，导致斜方肌代偿发力。3. 动作速度过快：未在动作两端充分停顿和收缩肌肉，降低训练效果。', '初学者可先将动作拆分为单纯的二头弯举和三头屈伸分别练习，待动作熟练后再进行组合；对于肩部不适者，可改为坐姿进行该动作以减少下背部压力；如想增加难度，可在顶峰位置增加等长收缩时间。', 'compound', '{"降阶变体":"可拆分为二头弯举和三头屈伸两个独立动作分别进行，待动作熟练后再组合","升阶变体":"可采用交替式组合，即先完成多次二头弯举后再进行三头屈伸，增加训练强度和肌肉耐力挑战"}', 'published', NOW(3), NOW(3));
SET @eid_453 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 腕屈肌群 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃全身臂部', 'arms', 'dumbbell', 'intermediate', NULL, '1. 双脚站立与肩同宽，双手握哑铃置于肩部两侧，手掌朝前。\n2. 屈膝下蹲，胸部略微前倾，保持背部挺直，然后用力伸展髋、膝、踝三关节，同时将哑铃向上推举至头顶，手臂完全伸展。\n3. 在最高点保持一秒钟，肩胛骨轻微后收，确保哑铃保持在身体中心线上。\n4. 慢慢屈肘，将哑铃平稳下降回到肩部位置，同时控制身体回到起始的半蹲姿势。\n5. 重复进行8-12次，完成规定的组数。', '1. 使用合适重量的哑铃，避免因重量过大导致姿势失控；2. 保持背部挺直，避免脊柱过度弯曲导致受伤；3. 动作全程配合呼吸，发力时吸气，下降时呼气。', '1. 膝盖内扣或过度前倾，使膝关节受力过大；2. 哑铃下落速度过快，缺乏控制，容易伤及肩关节；3. 动作幅度不足，手臂未完全伸展或未完全收缩，降低训练效果。', '初学者可以先用轻重量或徒手进行深蹲练习，逐步加入哑铃；高级者可增加哑铃重量，或在最高点进行短暂的停顿式收缩以提升刺激。', 'compound', '{"无器械":"可使用自身体重进行徒手深蹲+俯卧撑替代，保持相同的全身发力模式。","壶铃":"将哑铃换成相同重量的壶铃，注意握法略宽，保持动作轨迹一致。","杠铃":"用杠铃进行前蹲+推举，将杠铃放置在锁骨上方，重量相对更大时需特别关注背部稳定。"}', 'published', NOW(3), NOW(3));
SET @eid_461 = LAST_INSERT_ID();
-- Suggested muscle: 三角肌（前束） (agonist)
-- Suggested muscle: 胸大肌 (synergist)
-- Suggested muscle: 三头肌 (agonist)
-- Suggested muscle: 二头肌 (synergist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 核心肌群（腹横肌） (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('器械下压', 'arms', 'machine', 'beginner', NULL, '1. 面对器械站立，双脚与肩同宽，膝盖微屈保持稳定\n2. 双手握住下压杆或绳索手柄，握距与肩同宽或略宽，手掌向下\n3. 肘关节固定在身体两侧，前臂与地面平行，身体略微前倾\n4. 呼气时，肱三头肌发力，将器械向下压至手臂伸直（但肘关节不要完全锁死）\n5. 在最低位停留1-2秒，充分收缩肱三头肌\n6. 吸气时，缓慢控制重量回到起始位置，保持肘关节角度不变', '1. 肘关节不要过度向后或外展，应始终固定在身体两侧以减少肩部压力\n2. 动作全程控制速度，避免使用惯性甩动器械造成关节损伤\n3. 选择的重量应适中，避免在力竭时无法控制导致前臂猛然落下', '1. 身体过度前倾或后仰，利用体重借力而非肱三头肌发力\n2. 肘关节在动作过程中向上抬起或外展，增加肩部代偿\n3. 动作速度过快，在下降阶段完全失去控制，影响训练效果并增加受伤风险', '可根据训练目标调整握把类型（直杆/绳索/V型把手），绳索能更好地刺激肱三头肌外侧头。若感到手腕压力大，可使用护腕或调整手柄位置使手腕保持中立位。', 'isolation', '{"徒手变体":"可替换为俯卧撑或钻石俯卧撑，同样锻炼肱三头肌","自由重量变体":"可使用曲杆或直杠铃进行仰卧臂屈伸训练","TRX变体":"使用TRX悬挂训练带进行类似的下压动作"}', 'published', NOW(3), NOW(3));
SET @eid_427 = LAST_INSERT_ID();
-- Suggested muscle: 肱三头肌 (agonist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 肱二头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('器械臂部组合', 'arms', 'machine', 'intermediate', NULL, '1. 调整器械座椅高度，确保手臂自然下垂时手柄与肩部平齐；2. 坐在器械上，背部紧贴靠垫，双脚平放于地面，双手握住手柄，采用正握（掌心向上）姿势；3. 吸气，控制动作速度，缓慢弯曲肘关节，将手柄向肩部方向拉起；4. 在顶峰位置停顿约1秒，充分收缩二头肌；5. 呼气，缓慢放下手柄至起始位置，手臂保持微曲不要完全伸直；6. 重复完成指定次数后，换成掌心向下握法进行肱三头肌下压训练。', '1. 动作过程中始终保持核心收紧，避免借助身体摆动发力；2. 肘关节位置应保持固定，不要在动作中前后移动；3. 使用合适的重量，建议在有人保护的情况下进行大重量训练。', '1. 借助身体前后摆动来抬起重量，应保持躯干稳定；2. 动作速度过快，尤其是下落阶段，容易造成肌肉拉伤；3. 肘关节在动作中向前或向外移动，增加关节压力。', '可以通过调整座椅高度改变动作角度；改变握距（窄握/宽握）来重点刺激不同部位；使用绳索手柄可以增加手腕活动范围；正握主要锻炼二头肌，反握则可锻炼肱桡肌。', 'compound', '{"徒手变体":"可改用哑铃弯举和仰卧臂屈伸替代","自由器械变体":"可使用杠铃或曲杆进行杠铃弯举和仰卧推举","自重变体":"俯卧撑和引体向上（辅助）可作为替代","场地限制":"无器械时可使用弹力带或装满水的矿泉水瓶进行训练"}', 'published', NOW(3), NOW(3));
SET @eid_454 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 肱三头肌 (antagonist)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('弹力带手腕练习', 'arms', 'other', 'beginner', NULL, '1. 将弹力带固定在稳定的支撑点上（如桌子腿或门把手），保持弹力带有一定张力。\n2. 站姿或坐姿，双手握住弹力带的两端，手臂自然垂于身体两侧，掌心朝下。\n3. 保持前臂固定，仅利用手腕的力量将弹力带向上拉起，使手腕向手背方向屈曲（伸展），感受到前臂背侧的拉伸。\n4. 在动作的最高点稍作停顿，确保肌肉充分收缩，然后缓慢放回起始位置，手腕回到中立或略微屈曲状态。\n5. 重复动作，完成设定的次数后换手或换边练习。', '确保弹力带固定牢靠，避免弹力带突然弹回造成伤害。,练习时动作要平稳，避免用力过猛导致手腕或前臂扭伤。,若感到手腕或前臂疼痛，应立即停止练习并咨询专业教练或医生。', '使用过重的弹力带导致手腕过度负荷，动作变形。,练习时手臂参与过多，违背孤立手腕的原则。,动作速度过快，缺少在最高点的控制和张力保持。', '初学者可以选用阻力较小的弹力带或缩短弹力带的长度，以降低难度；若想增加挑战，可通过加大弹力带阻力或采用单手练习来提高强度。', 'isolation', '{"单手练习":"改为单手握住弹力带进行同样的动作，可帮助发现并纠正左右手力量不对称。","坐姿练习":"将弹力带固定在脚踝或椅子底部，坐在椅子上进行，可减少站立时的身体晃动。","交替握法":"从掌心朝下（背屈）切换到掌心朝上（屈腕）进行练习，可全面刺激前臂前后两侧肌肉。"}', 'published', NOW(3), NOW(3));
SET @eid_441 = LAST_INSERT_ID();
-- Suggested muscle: 桡侧腕屈肌 (agonist)
-- Suggested muscle: 尺侧腕屈肌 (agonist)
-- Suggested muscle: 桡侧腕伸肌 (synergist)
-- Suggested muscle: 尺侧腕伸肌 (synergist)
-- Suggested muscle: 前臂屈肌群（掌长肌） (stabilizer)
-- Suggested muscle: 肱桡肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('悬垂重物', 'arms', 'barbell', 'intermediate', NULL, '1. 准备姿势：站立，双脚与肩同宽，双手握住杠铃，掌心向上，手臂伸直，杠铃悬垂在大腿前方。膝盖微屈，保持背部挺直，肩胛骨微微后收。\n2. 起始动作：保持上臂固定不动，仅通过弯曲肘部将杠铃向肩部方向卷起。此时肩部应保持稳定，不要前后摆动。\n3. 顶峰收缩：在杠铃接近肩部时，确保肱二头肌完全收缩，保持1-2秒，感受肌肉紧绷。\n4. 缓慢放下：控制力量，缓慢将杠铃放回起始位置，保持张力，避免重力快速下落导致关节冲击。\n5. 呼吸配合：上升时吸气，顶峰收缩时可短暂屏气；下降时呼气。\n6. 重复进行：根据训练计划完成设定的次数和组数。', '1. 必须在前进行充分的热身，尤其是肩、肘和前臂，以防止肌肉拉伤。\n2. 使用合适的重量，避免使用过重的杠铃导致身体摆动或失去控制。\n3. 动作全程保持背部挺直，避免弓背或过度前倾，以保护腰椎。', '1. 借助肩部或身体的摆动来完成动作，导致主要发力转移至三角肌。\n2. 肘部在卷举过程中向外展开，使前臂参与过多，降低肱二头肌的刺激。\n3. 动作幅度不足，只做半程卷举，限制了肌肉的全程收缩。', '1. 可通过调节握距（窄握、宽握）来改变对肱二头肌不同部位的重点；窄握更侧重内侧头，宽握更侧重外侧头。
2. 在动作顶部可以稍微向前倾身，使杠铃更靠近肩部，增加顶峰收缩感。
3. 若出现手腕不适，可使用护腕或改用EZ杆（曲杠）来减轻手腕角度。', 'isolation', '{"哑铃变体":"将杠铃换成等重的哑铃，可进行单臂交替或双手同步卷举，灵活调整左右力量平衡。","绳索变体":"使用高位滑轮装置连接直杆或曲杆，可在全程保持恒定张力，特别适合强化顶峰收缩。","单臂变体":"单手握住哑铃或滑轮手柄进行卷举，有助于发现并纠正左右力量不对称。","EZ杆变体":"使用EZ杆（曲杠）可以减轻手腕的扭转角度，降低手腕和肘部的压力。"}', 'published', NOW(3), NOW(3));
SET @eid_438 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)
-- Suggested muscle: 三头肌 (antagonist)
-- Suggested muscle: 三角肌前束 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('手指俯卧撑', 'arms', 'bodyweight', 'advanced', NULL, '1. 热身手腕：轻轻转动双手，做手腕环绕和手指伸展 2~3 分钟。\n2. 采用四点支撑的起始姿势，双手放在地面上，手指张开，指尖朝前，肩宽略宽，手肘略微外展但不超出身体侧线。身体从头到脚呈一直线，核心收紧。\n3. 深吸一口气，在呼气时屈肘将上半身向下降低，保持躯干正直，胸部尽量靠近地面但不触碰。保持手指紧贴地面，手腕保持中立位置。\n4. 当胸部接近地面时，利用胸部、三头肌和肩部力量向上推，恢复到起始姿势，呼气发力。\n5. 完成预定次数后，缓慢放松手臂，伸展胸部和手腕。', '确保手腕已充分热身，避免在软组织未准备好时进行高强度手指俯卧撑。,使用柔软的垫子或瑜伽垫，防止手指和手掌受压受伤。,如果在动作过程中感到手腕、手指或肩部疼痛，应立即停止并咨询专业人士。', '肘部外翻过度，导致肩部受力过大。,臀部抬起或下沉，使身体呈弧形，降低了核心和胸部的参与。,手指支撑不均，导致单侧手指过度负担，引发受伤风险。', '初学者可以先从膝盖俯卧撑或使用俯卧撑支架练习，逐步过渡到手指俯卧撑；如果手指力量不足，可先用两根手指支撑，再逐步增加手指数量；也可以借助哑铃或俯卧撑把手降低手腕负担。', 'compound', '{"膝盖俯卧撑→手指俯卧撑":"先将膝盖抬离地面，保持核心稳定，逐步将手掌换成手指，并逐渐增加下降幅度。","掌上俯卧撑→手指俯卧撑":"在保持标准俯卧撑姿势的基础上，将手掌逐渐换成手指，重点强化手指的支撑力量和腕关节稳定性。","单臂俯卧撑→双手手指俯卧撑":"先掌握单臂俯卧撑的平衡技巧，再在双手手指俯卧撑中保持相同的核心收紧程度和动作幅度。"}', 'published', NOW(3), NOW(3));
SET @eid_450 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 三头肌 (agonist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 手腕屈伸肌群 (stabilizer)
-- Suggested muscle: 手指屈伸肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('支撑哑铃弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 准备姿势：坐在训练凳或站立，双手握住哑铃，手掌向身体前方，手臂自然下垂。\n2. 支撑上臂：将上臂轻轻靠在凳面、膝盖或大腿上，确保肘部固定，背部保持挺直。\n3. 开始收缩：吸气，通过弯曲肘部将哑铃向上提，保持上臂不动，仅让前臂向上移动。\n4. 到达顶峰：当哑铃接近肩部时，停顿1‑2秒，确保二头肌完全收缩，手掌仍朝向身体。\n5. 缓慢下放：呼气，缓慢控制哑铃下降，保持肌肉张力，直至手臂几乎伸直但不完全锁死。\n6. 重复：按训练计划进行所需的次数。', '1. 保持背部挺直，避免弓背或扭转，以防止腰椎受伤。\n2. 使用适当重量的哑铃，切勿借助摆动或冲力，动作全程保持控制。\n3. 举起和放下哑铃时，确保肘部始终固定在支撑面上，防止肘关节过度外展或内收。', '1. 身体摆动或使用惯性举起重量，导致动作不孤立，削弱二头肌刺激。\n2. 肘部在动作过程中前移或抬起，失去对上臂的支撑，导致肩部参与过多。\n3. 只做半程弯举，幅度不足，降低了肌肉的伸展和收缩效果。', '1. 调整支撑高度：手臂放在较高的支撑面上可减少肩部参与，放在较低的支撑面上则增加肩部稳定性需求。
2. 更改握法：锤式握（掌心相对）或反握（掌心向上）可以针对二头肌的不同部位。
3. 重量调节：若动作不稳或出现抖动，适当降低哑铃重量，逐步建立力量后再增加。', 'isolation', '{"站姿哑铃弯举":"去掉手臂支撑，改为站立姿势进行弯举，增加核心参与和整体稳定性需求。","斜托哑铃弯举":"使用倾斜的训练凳支撑上臂，改变上臂角度，以针对二头肌的不同纤维并增加伸展范围。"}', 'published', NOW(3), NOW(3));
SET @eid_466 = LAST_INSERT_ID();
-- Suggested muscle: 二头肌 (Biceps brachii) (agonist)
-- Suggested muscle: 肱肌 (Brachialis) (synergist)
-- Suggested muscle: 肱桡肌 (Brachioradialis) (synergist)
-- Suggested muscle: 三头肌 (Triceps brachii) (antagonist)
-- Suggested muscle: 前三角肌 (Anterior deltoid) (stabilizer)
-- Suggested muscle: 腕屈肌 (Wrist flexors) (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('斜托杠铃弯举', 'arms', 'barbell', 'intermediate', NULL, '1. 调整斜凳角度至约45-60度，仰卧其上，肩胛骨紧贴凳面，保持背部稳定贴紧。\n2. 双手反握杠铃，握距与肩同宽，手臂自然下垂伸直，肘关节位于身体两侧。\n3. 深吸一口气，保持上臂垂直于地面，仅通过肱二头肌发力将杠铃弯举向上。\n4. 弯举至杠铃接近肩部位置时，在顶峰用力收缩肱二头肌，保持1-2秒。\n5. 缓慢下放杠铃至手臂完全伸直，保持肌肉张力，不要让杠铃完全掉落。\n6. 重复完成预设次数，注意保持动作节奏和呼吸配合。', '1. 确保斜凳稳固且靠背角度适宜，避免在动作过程中身体滑动或失去平衡。\n2. 选择适当重量，避免借助身体摆动或惯性完成动作，以减少肩关节和肘关节的受伤风险。\n3. 动作全程保持核心收紧，避免腰部过度拱起导致下背部压力过大。', '1. 上臂随着弯举上下移动或前倾，借用惯性发力，无法有效刺激目标肌肉。\n2. 重量选择过大，导致身体晃动或姿势变形，影响动作质量和关节安全。\n3. 下放速度过快，缺乏对肌肉的离心控制，降低训练效果且增加受伤风险。', '初学者可从较小重量和较缓的角度开始，逐步掌握动作要领后再增加难度；若感到肩部不适，可略微调整斜凳角度或减小握距以改变发力角度；高级训练者可尝试哑铃变体以更好地孤立单侧肌肉。', 'isolation', '{"哑铃斜托弯举":"改用哑铃可增加单边训练效果，便于纠正左右力量不平衡，适合需要更精细肌肉控制的训练者。","EZ杆斜托弯举":"使用EZ杆可减少手腕压力，对手腕力量较弱者更友好，同时略微改变前臂参与程度。","牧师凳杠铃弯举":"转换至竖直的牧师凳可进一步消除肩部参与，更强调肱二头肌的孤立收缩。"}', 'published', NOW(3), NOW(3));
SET @eid_395 = LAST_INSERT_ID();
-- Suggested muscle: 肱二头肌 (agonist)
-- Suggested muscle: 肱肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('杠铃腕弯举', 'arms', 'barbell', 'beginner', NULL, '1. 站立，双脚与肩同宽，双手握住杠铃，手掌向上，杠铃放在大腿前方。\n2. 调整手腕位置，使手腕略微屈曲，保持中立姿势，肘部紧贴身体两侧。\n3. 吸气，利用前臂屈肌将杠铃向上卷起至手腕最大屈曲位置，动作全程肘部保持固定。\n4. 在顶部稍作停顿，然后呼气，缓慢将杠铃放回起始位置，保持控制。\n5. 完成所需次数后，平稳放下杠铃，避免猛然甩落。', '1. 保持肘部固定，避免在举起时耸肩或摆动上臂。\n2. 使用适当重量，避免使用过大负荷导致手腕受伤。\n3. 在训练前进行手腕热身，如转动手腕和轻度拉伸，防止软组织拉伤。', '1. 使用过重的杠铃导致肘部移动或借助上半身力量。\n2. 在动作过程中屏住呼吸，导致血压升高。\n3. 只做部分幅度，未达到完整的手腕屈伸范围，降低训练效果。', '1. 如手腕不适，可将杠铃换成哑铃或使用护腕带减轻负荷。
2. 调整握距，宽握侧重内侧前臂肌群，窄握侧重外侧。
3. 将手臂靠在斜凳或膝盖上，以限制上半身借力，提高动作孤立性。', 'isolation', '{"哑铃腕弯举":"使用单手或双手哑铃进行，可更好控制手腕角度和单侧训练。","绳索腕弯举":"使用绳索设备提供持续的恒定阻力，适合改变负荷曲线。","反向腕弯举":"将手掌向下，锻炼腕伸肌群，提供拮抗刺激。","手腕滚轴":"使用手腕滚轴进行等长收缩训练，帮助提升前臂力量和耐力。"}', 'published', NOW(3), NOW(3));
SET @eid_433 = LAST_INSERT_ID();
-- Suggested muscle: 前臂腕屈肌群（尺侧腕屈肌、桡侧腕屈肌、掌长肌等） (agonist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 腕伸肌群（腕伸肌、腕伸指伸肌等） (antagonist)
-- Suggested muscle: 肩部及核心肌群（稳定上半身） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('杠铃颈后臂屈伸', 'arms', 'barbell', 'intermediate', NULL, '1. 起始姿势：站立或坐在凳子上，双脚与肩同宽，躯干保持直立，双手握杠铃，握距略宽于肩，手臂向上伸展，将杠铃举至头顶上方，手臂垂直于地面，手掌向前。\n2. 稳定核心，收紧肩胛骨，确保肩部固定不前倾，肘部微微内收，指向身体正后方。\n3. 缓慢屈肘，将杠铃向颈后下方降低，直至前臂略低于水平面或略低于耳侧，保持上臂静止，仅前臂移动。\n4. 在最低点稍作停顿，然后通过收缩三头肌向上伸展手臂，将杠铃推回起始位置，手臂完全伸直但不要锁死肘关节。\n5. 重复进行所需次数，保持动作控制，避免弹震或使用惯性。\n6. 呼吸节奏：向下时吸气，向上时呼气。', '1. 在进行此动作前，确保肩部活动范围足够，避免肩关节受伤。\n2. 使用合适的重量，建议使用护腕或护肘带以支撑肘部。\n3. 动作过程中保持核心收紧，避免腰椎过度伸展导致背部受伤。', '1. 手肘外展过多，导致肩部参与过多。\n2. 使用过大的重量导致弹震或耸肩。\n3. 动作幅度不足，仅做半程，降低训练效果。', '1. 如肩部柔韧性不足，可先在坐姿或斜凳上进行，以减小肩部负担。
2. 调整握距：宽握更侧重外侧三头肌，窄握更针对长头。
3. 可以使用哑铃或绳索替代杠铃，以获得不同的握把角度和更自由的运动轨迹。', 'isolation', '{"坐姿颈后臂屈伸":"将杠铃放置在肩上，双手握距稍宽，保持肘部指向天花板，躯干保持直立，执行相同的屈伸动作。","哑铃颈后臂屈伸":"使用两只哑铃，双手握住哑铃，手臂垂直向上，屈肘将哑铃下放至颈后，然后伸展回到起始位置。","绳索颈后臂屈伸":"将绳索连接到高位滑轮，双手握住绳索两端，执行相同的屈伸动作，可更好地控制张力曲线。"}', 'published', NOW(3), NOW(3));
SET @eid_422 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌 (agonist)
-- Suggested muscle: 肘肌 (synergist)
-- Suggested muscle: 后三角肌 (synergist)
-- Suggested muscle: 二头肌 (antagonist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 肩胛稳定肌群（中下斜方肌、菱形肌） (stabilizer)
-- Suggested muscle: 肩袖肌群（冈上肌、冈下肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('自重臂屈伸', 'arms', 'bodyweight', 'intermediate', NULL, '1. 准备姿势：站在平行的双杠、椅子或稳固的平台上，双手握住把手或边缘，手臂伸直，肩胛骨微微收紧，保持身体直立。\n2. 起始动作：收紧核心和臀部，保持躯干正直或略微前倾，准备下降。\n3. 下降阶段：慢慢弯曲肘部，向下降低身体，直至上臂与地面平行或略低于平行位置，保持肘部靠近身体，避免向外张开。\n4. 推起阶段：在底部稍作停顿后，通过手掌向下推，伸展手臂回到起始位置，保持动作控制，不要猛然弹起。\n5. 完成一次后，手臂在最高点完全伸直，重复进行所需次数。', '1. 进行前充分热身，尤其是肩部和手臂，防止拉伤。\n2. 下降时控制幅度，避免肩膀过度前倾或出现疼痛。\n3. 若感到肩关节或手肘不适，应立即停止并咨询专业教练或医生。', '1. 肘部外展，导致肩部受力过大。\n2. 动作过快或使用惯性，减弱肌肉刺激。\n3. 下降幅度不足或锁定肘部，未充分伸展肌肉。', '1. 初学者可使用凳子或箱子支撑脚部，降低难度。
2. 高级训练者可穿戴负重背心或使用单臂支撑，增加挑战。
3. 如肩膀不适，可改为坐姿或使用弹力带辅助，以减轻肩部压力。', 'compound', '{"辅助降低":"使用凳子或弹力带提供支撑，减轻体重负荷，降低难度。","窄距俯卧撑":"将双手间距缩小在地面上完成，专注于三头肌的收缩，可作为替代动作。","负重变体":"穿戴负重背心或背部负重，提高自重负荷，增强力量训练强度。"}', 'published', NOW(3), NOW(3));
SET @eid_425 = LAST_INSERT_ID();
-- Suggested muscle: 三头肌（肱三头肌） (agonist)
-- Suggested muscle: 胸大肌 (synergist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 肩袖肌群（旋转袖） (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 肱二头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('负重悬垂', 'arms', 'other', 'advanced', NULL, '1. 站在高杠下方，双手握住杠铃（可使用握力带），手掌朝前，握距略比肩宽。\n2. 轻轻跳起或使用辅助平台，将身体悬挂至完全伸直的姿势，双臂自然伸展，肩部略微后收。\n3. 收紧核心，保持身体直立，避免前后摆动。保持下巴微收，眼睛向前看。\n4. 在保持姿势的同时，尽可能让肩膀向上提并保持5-10秒，感受到背部与前臂的持续张力。\n5. 完成后，缓慢放松或使用辅助装置回到起始位置，重复设定的次数或时间。', '1. 必须确保使用的杠铃或悬吊装置稳固可靠，承重能力足够。\n2. 在进行负重悬垂前，最好有人协助或使用安全带，以防滑落受伤。\n3. 如有肩部、手腕或前臂受伤，应避免此动作或先咨询专业医师。', '1. 身体摇摆或使用过多动量，导致肩膀和脊柱受力不均。\n2. 抓握力度不足，导致负重滑脱或失去控制。\n3. 肩膀过度前倾或耸肩，使肩关节承受不必要的压力。', '初学者可以先进行徒手悬垂或使用弹力带减轻负荷；当力量提升后，逐步增加负重（如哑铃或铁链）并延长保持时间；如有肩部不适，可将握距稍微收窄或采用反握以改变受力角度。', 'compound', '{"单臂负重悬垂":"将负重集中在一只手臂，可提升核心稳定性和单侧力量，注意控制身体倾斜。","使用握力带":"在负重较大的情况下使用握力带，可延长保持时间并减少前臂疲劳。","斜板负重悬垂":"在倾斜的横杠上进行，改变角度可激活不同背部肌群。","配合负重背心":"穿戴负重背心进行悬垂，可均匀增加全身负荷，提升整体耐力。"}', 'published', NOW(3), NOW(3));
SET @eid_444 = LAST_INSERT_ID();
-- Suggested muscle: 背阔肌 (agonist)
-- Suggested muscle: 大圆肌 (agonist)
-- Suggested muscle: 斜方肌（上、中、下部） (synergist)
-- Suggested muscle: 三角肌后束 (synergist)
-- Suggested muscle: 前臂屈肌（握力肌） (agonist)
-- Suggested muscle: 二头肌 (synergist)
-- Suggested muscle: 核心肌群（腹直肌、腹斜肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('铁锤腕弯举', 'arms', 'dumbbell', 'beginner', NULL, '1. 站立或坐姿，双脚与肩同宽，保持背部挺直，双手各持一只哑铃，手掌向内（锤式握法），哑铃垂直于地面，手腕自然下垂。\n2. 吸气，利用手腕的力量将哑铃向上卷起，确保只移动手腕，保持前臂紧贴大腿或椅子，避免手臂参与发力。\n3. 在最高点（手腕完全屈曲）停顿约一秒钟，感受前臂屈肌的收缩。\n4. 呼气，缓慢放低哑铃回到起始位置，保持控制的下降过程，避免猛然放松。\n5. 完成一组次数后换手或继续交替进行，注意保持肩膀放松，避免耸肩。\n6. 如需进阶，可将前臂置于倾斜的凳子上，以增加运动范围。', '1. 使用适当重量的哑铃，避免因重量过大导致手腕受伤。\n2. 动作全程保持手腕中立或轻微屈曲，避免过度背屈产生冲击。\n3. 保持动作控制，避免弹震或甩动，以防止关节扭伤。', '1. 使用手臂或肩膀的力量抬起哑铃，而不是仅用手腕发力。\n2. 在动作顶部或底部锁定手腕，产生冲击力。\n3. 动作速度过快，忽视离心的控制阶段。', '1. 如手腕有伤，可先用轻重量或弹力带替代哑铃进行练习。
2. 调整坐姿/站姿，将前臂靠在倾斜凳子上可改变角度并降低负荷。
3. 若想更强调桡侧腕屈肌，可将手掌稍微向内倾斜；若想强调尺侧腕屈肌，则可将手掌稍微向外倾斜。', 'isolation', '{"变体类型":"站姿锤式腕弯举","转换建议":"可换成坐姿哑铃腕弯举、使用绳索或EZ杆进行同样的动作，或改为反握腕弯举以锻炼腕伸肌，提供不同刺激角度。"}', 'published', NOW(3), NOW(3));
SET @eid_445 = LAST_INSERT_ID();
-- Suggested muscle: 腕屈肌（桡侧腕屈肌、尺侧腕屈肌） (agonist)
-- Suggested muscle: 掌长肌 (agonist)
-- Suggested muscle: 指屈肌（浅屈肌、深屈肌） (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 旋前方肌 (stabilizer)
-- Suggested muscle: 腕伸肌（桡侧伸腕肌、尺侧伸腕肌） (antagonist)
-- Suggested muscle: 肱二头肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('链条握力练习', 'arms', 'other', 'intermediate', NULL, '1. 准备姿势：站立或坐姿，双脚与肩同宽，双手握住链条两端，手臂自然下垂，手腕保持中立。\n2. 调整重量：选择合适重量的链条，确保能够完成完整的握合动作，但不至于失控。\n3. 收紧手指：从指尖逐步向掌心收紧，感受前臂屈肌的收缩，保持肘部略弯，避免完全锁定。\n4. 维持顶峰收缩：握紧后保持约1-2秒，感受前臂肌肉的紧张。\n5. 缓慢放松：慢慢松开手指，让链条平稳下落，保持控制，避免链条弹回。\n6. 重复次数：每组8-12次，进行2-3组，组间休息30-60秒。', '确保链条完好无损，避免链条断裂导致受伤。,练习时保持手腕自然姿势，避免过度屈曲或背屈，以减少腕关节压力。,选取适当的重量，避免使用过重导致肌肉抽筋或失控；必要时使用护具或手套。', '使用过重导致动作不完整，手指提前疲劳。,手腕过度屈曲或背屈，增加腕关节负荷。,没有控制链条回落，链条快速弹回容易拉伤前臂或手指。', '可以通过改变链条的长度或厚度来调节难度；尝试单手或双手进行不同的变体，以增加训练的多样性；在保持手腕中立的前提下，可使用不同的握法（指尖握、全掌握）来针对不同的握力。', 'isolation', '{"单手链条握力":"可换成哑铃或握力球进行单手训练，保持相同的握紧与放松节奏，注意控制重量和动作幅度。"}', 'published', NOW(3), NOW(3));
SET @eid_448 = LAST_INSERT_ID();
-- Suggested muscle: 前臂屈肌（屈指浅肌、屈指深肌） (agonist)
-- Suggested muscle: 腕屈肌（桡侧腕屈肌、尺侧腕屈肌） (synergist)
-- Suggested muscle: 腕伸肌（桡侧腕伸肌、尺侧腕伸肌） (antagonist)
-- Suggested muscle: 肱二头肌 (stabilizer)
-- Suggested muscle: 肱桡肌 (synergist)

