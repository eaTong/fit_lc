-- AI 生成的 legs 动作详情
USE fitlc;

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('TRX单腿深蹲', 'legs', 'other', 'advanced', NULL, '1. 调整TRX绳索至中等长度，确保锚点牢固，双手握住把手，保持身体直立。\n2. 将左脚抬离地面，仅靠右脚支撑体重，保持核心收紧。\n3. 双手拉住TRX，帮助保持平衡，慢慢屈膝下蹲，臀部向后推，膝盖不超过脚尖。\n4. 下降至大腿约与地面平行，或根据自己的柔韧度尽可能低，保持胸部挺起，目视前方。\n5. 在最低点稍作停顿后，用右腿的力量向上推起，回到起始站立姿势。\n6. 完成设定次数后，换另一侧腿重复相同的动作。', '1. 开始前务必检查TRX锚点和绳索是否牢固，防止脱落。\n2. 仅在能够保持平衡的情况下进行单腿深蹲，必要时可先扶墙或让伙伴在旁协助。\n3. 下降和上升时保持动作控制，避免突然的冲击或快速弹起，以防膝关节受伤。', '1. 膝盖向内塌陷（膝盖外翻），导致膝关节压力增大。\n2. 上半身过度前倾或弯腰驼背，使核心失去支撑，容易失去平衡。\n3. 下蹲深度不足，只做浅蹲，未能充分激活臀大肌和股四头肌。', '如果平衡困难，可先将TRX绳索调长，以获得更大的支撑力；或者在动作起始时先做半蹲，逐步加深。随着平衡和力量提升，可缩短绳索或尝试不扶TRX的完整单腿深蹲（手枪深蹲）。', 'compound', '{"变体类型":"TRX辅助单腿深蹲 → 完全单腿深蹲（手枪深蹲）或换为保加利亚分腿蹲、侧向单腿蹲等","转换建议":"在熟练掌握TRX单腿深蹲后，可逐步减少对TRX的依赖，采用哑铃单腿深蹲或徒手手枪深蹲，以提升平衡和力量要求。"}', 'published', NOW(3), NOW(3));
SET @eid_285 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 小腿肌群（腓肠肌、比目鱼肌） (stabilizer)
-- Suggested muscle: 核心肌群（腹横肌、腹内外斜肌） (stabilizer)
-- Suggested muscle: 髋外展肌群（臀中肌、臀小肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('TRX深蹲', 'legs', 'other', 'beginner', NULL, '1. 调整TRX悬吊带至适当高度，双手握住把手，脚尖稍微外展站立。\n2. 将身体重心稍微后倾，保持背部挺直，慢慢屈膝下蹲，膝盖指向脚尖方向。\n3. 下蹲至大腿与地面接近平行或略低于平行，臀部向后坐，保持胸部抬起。\n4. 在最低点稍作停顿，然后通过脚跟用力推地，伸展膝盖和髋部，回到起始站立姿势。\n5. 重复进行，保持呼吸节奏——下蹲时吸气，起身时呼气。', '1. 确保TRX悬吊带固定可靠，手柄无松动。\n2. 下蹲时膝盖不要超过脚尖，以免膝关节过度压力。\n3. 如有膝关节或髋部不适，适当减小下蹲幅度或停止练习。', '1. 膝盖内扣（内翻），导致膝关节受力不均。\n2. 上身前倾过度或弯腰驼背，使核心失去稳定性。\n3. 动作幅度不足，仅做浅蹲，未能充分激活臀部和股四头肌。', 'TRX手柄的高度可以调节：高度越高，提供支撑越多，动作越轻松；高度越低，支撑越少，难度增大。双脚站距可以调整——站距越宽，稳定性越好，适合初学者；站距越窄，难度提升。', 'compound', '{"TRX单腿深蹲":"将一只脚抬离地面，保持身体平衡，专注于髋部和股四头肌的发力。","分腿蹲":"将一只脚放在前方，另一只脚在后方，形成前后站姿，以增加髋部活动范围和单侧力量。"}', 'published', NOW(3), NOW(3));
SET @eid_283 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (stabilizer)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 核心肌群（腹横肌、腹直肌） (stabilizer)
-- Suggested muscle: 腓肠肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('交替弓步跳', 'legs', 'bodyweight', 'intermediate', NULL, '1. 站直，双脚与肩同宽，双手自然放在身体两侧或交叉置于胸前以保持平衡。\n2. 向前迈出左腿，屈膝下蹲，使左大腿与地面基本平行，膝盖不超过脚尖，右腿在后侧略微弯曲。\n3. 脚尖轻轻点地后，快速向上跳起，利用前脚掌的力量将身体推离地面。\n4. 在空中快速换腿，落地时右脚在前、左脚在后，呈现交替弓步的姿势。\n5. 立即屈膝下蹲，重复上述动作，保持连贯的跳跃节奏。\n6. 完成设定的次数或时间后，以轻松的步伐慢走或原地站立放松。', '1. 确保跳跃落地时膝盖与脚尖方向一致，避免膝盖内扣导致关节损伤。\n2. 如有膝关节或踝关节不适，应降低跳跃高度或改为普通弓步。\n3. 选择平整、防滑的地面进行练习，防止滑倒或扭伤。', '1. 落地时膝盖过度前伸，超出脚尖，增加膝关节压力。\n2. 身体前倾过度，导致重心不稳，易摔倒。\n3. 动作速度过快而忽视技术要点，导致姿势变形和肌肉发力不均。', '初学者可先练习不带跳跃的标准交替弓步，待动作熟练后再加入轻跳；对于膝关节有轻度不适者，可改为低幅度的软着陆或使用踏板减轻冲击；高级练习者可尝试加入侧向弓步或在空中完成一次完整的腿部伸展。', 'compound', '{"变体类型":"可将交替弓步跳改为单腿弓步跳（提升单侧力量）或侧向弓步跳（强化髋外展肌群），转换时保持相同的基本姿态和跳跃节奏，仅改变方向或支撑脚数。"}', 'published', NOW(3), NOW(3));
SET @eid_270 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 髂腰肌 (antagonist)
-- Suggested muscle: 核心肌群（腹直肌、竖脊肌） (stabilizer)
-- Suggested muscle: 臀中肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('低杠深蹲', 'legs', 'barbell', 'intermediate', NULL, '1. 站在深蹲架前，调整杠铃至略低于肩胛骨的高度，双手握杠，宽度略宽于肩，肩胛骨收紧。\n2. 将杠铃从架上抬起，稳步后退一步，脚距与肩同宽或略宽，脚尖略微外展。\n3. 深吸一口气，收紧核心，保持胸部向上，背部挺直，屈膝下蹲，臀部向后推移，直至大腿上部与地面平行或略低。\n4. 在下蹲最低点保持1-2秒，确保膝盖与脚尖方向一致，避免膝盖内翻。\n5. 通过脚掌用力向上蹬起，伸展膝髋，回到起始姿势，呼气，完成一次动作。', '确保杠铃稳固放在上背部，避免压在颈椎或肩胛上。,使用安全杠或有人在旁保护，尤其在尝试最大重量时。,下蹲时保持胸部向上，避免过度前倾导致腰椎受压。', '膝盖内翻或外翻，导致膝关节受力不均。,深蹲深度不足，仅做半蹲，削弱对臀部和腿后肌的刺激。,起身时先抬起脚跟或臀部，导致重心前移，增加腰椎负担。', '低杠深蹲的关键是把杠铃放在肩胛骨下方靠背部的位置，手臂略微外展以固定杠铃。脚距可根据个人舒适度调整，一般与肩同宽或略宽。保持胸部向上，背部自然前倾约15-30度，有助于将负荷转移到臀部。若出现下背疼痛，可适当减小下蹲深度或加强核心训练。', 'compound', '{"高杠深蹲":"低杠深蹲相比高杠需要将杠铃下移至肩胛骨下方，身体前倾角度稍大，以更强调臀部和腿后肌群。转换时要练习背阔肌的收紧和胸部向上的姿势。","前蹲":"从低杠深蹲转到前蹲时，需要把杠铃移到胸前锁骨位置，保持上体直立，对股四头肌的需求增加，需要加强前倾时的平衡和手腕柔韧性。","安全深蹲":"使用安全杠进行低杠深蹲时，可先在不加载杠铃的情况下练习动作轨迹，确保膝盖与脚尖方向一致，再逐步加重量。"}', 'published', NOW(3), NOW(3));
SET @eid_190 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腿后腱 (synergist)
-- Suggested muscle: 髋内收肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 小腿肌群（腓肠肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('TRX弓步', 'legs', 'other', 'beginner', NULL, '1. 调整TRX绳的长度，使脚环略低于膝盖高度，面向锚点站立，双手自然垂放或握住绳把手保持平衡。\n2. 将一只脚的前脚掌放入脚环，脚尖向前，保持另一只脚稳稳踩在地面上，呈起始站姿。\n3. 收紧核心、挺胸，保持上半身直立，然后向前迈出一步，屈膝下蹲，前侧大腿尽量与地面平行，膝盖指向脚尖方向。\n4. 在最低点稍作停顿，确保后侧膝盖轻微触碰地面或接近地面，然后通过前脚后跟发力，将身体向上推回起始姿势。\n5. 完成一次后，换另一侧重复动作，交替进行规定的次数。', '1. 确保TRX锚点稳固可靠，吊环没有明显磨损或裂纹。使用前检查绳索和脚环的完整性。\n2. 开始练习前先在稳固的支撑点或墙面扶手进行平衡训练，避免因失去平衡导致摔倒。\n3. 在下蹲过程中，保持膝盖与脚尖方向一致，避免膝盖内翻造成关节压力；若感到膝关节不适，应立即停止并调整姿势或降低难度。', '1. 前侧膝盖过度前伸，超过脚尖，导致膝关节受力过大。\n2. 上半身前倾或驼背，导致核心参与不足，增加腰椎压力。\n3. 没有收紧核心或臀部，导致姿势不稳，影响动作效果。', '调整TRX绳的长度可改变动作难度：绳索越长（脚环越低）难度越低；绳索越短（脚环越高）难度越高。初学者可先扶墙或握住把手保持平衡，待动作熟练后再逐渐放手。可通过放慢下蹲速度、在底部保持2-3秒或采用交替前进的踏步式弓步来增加挑战。如需进阶，可在最低点进行单腿起身或尝试侧向弓步等变体。', 'compound', '{"侧弓步":"将身体侧向面对锚点，单脚放入脚环，另一脚向侧面迈出，形成侧向弓步，可更好地激活髋外展肌群并提升髋关节稳定性。"}', 'published', NOW(3), NOW(3));
SET @eid_284 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 小腿三头肌 (stabilizer)
-- Suggested muscle: 核心肌群（腹横肌、背部深层肌肉） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('侧弓步', 'legs', 'bodyweight', 'beginner', NULL, '1. 站立，双脚与肩同宽，双手自然下垂或叉腰。\n2. 向右侧大步迈出，保持左脚在原地，重心转移到右脚。\n3. 屈右膝，降低髋部至大腿接近平行于地面，胸部保持直立，核心收紧。\n4. 左腿保持伸直且略向内收，感受右臀大肌和股四头的发力。\n5. 用右脚用力向上推，恢复起始姿势，随后换左侧重复。\n6. 交替进行，完成设定的次数或时间。', '运动前进行充分热身，尤其是髋关节与下肢的动态拉伸。,保持膝盖始终指向第二脚趾，避免向内塌陷导致膝关节扭伤。,如感到膝关节或下背部不适，应立即停止并调整幅度或请教专业教练。', '膝盖向内塌陷（内翻），会给膝关节带来过大压力。,上半身过度前倾或弓背，导致腰椎负荷增加。,动作幅度不足，未能蹲至大腿接近水平，削弱训练效果。', '初学者可以先靠墙站立，扶墙做侧弓步以增加稳定性。,如果平衡困难，可在脚旁放一个稳固的垫子或使用扶手。,可以手持哑铃或弹力带增加负荷，但需适当降低蹲幅以防技术变形。', 'compound', '{"侧弓步+哑铃":"握住哑铃置于身体两侧，保持动作不变，以增加腿部力量。","侧弓步+弹力带":"在膝盖上方绑上弹力带，提供外展阻力，强化臀中肌。","侧弓步转前弓步":"在完成侧弓步后，直接向前跨步做前弓步，形成连贯的弓步组合。","侧弓步深蹲":"在侧弓步后回到起始姿势，再做一次普通深蹲，提升下肢整体负荷。"}', 'published', NOW(3), NOW(3));
SET @eid_269 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 臀中肌 (synergist)
-- Suggested muscle: 大腿内收肌群 (stabilizer)
-- Suggested muscle: 腘绳肌 (antagonist)
-- Suggested muscle: 核心肌群（腹直肌、腹横肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('俯卧绳索腿弯举', 'legs', 'cable', 'intermediate', NULL, '1. 调整滑轮高度，使其与脚踝齐平，连接踝带或绳索把手，确保固定牢固。\n2. 采用俯卧姿势，双手撑在地面或抓住凳子边缘，保持躯干平直，腹部收紧，防止弓背。\n3. 初始位置时双腿自然伸直，脚尖略向内，保持膝盖与髋部在同一直线上。\n4. 吸气时，屈膝向上拉绳索，使脚跟向臀部靠近，感受腘绳肌的收缩；动作全程保持髋部贴地，避免抬起。\n5. 在最高点稍作停顿，体会肌肉紧张，然后呼气，缓慢放下腿至起始位置，保持控制的张力。\n6. 重复完成所需次数，若要增加难度，可在踝部加重或使用更大的重量。', '1. 确认踝带或绳索连接牢固，防止滑脱造成伤害。\n2. 保持背部平直，避免弓背或过度伸展，以免下背受压。\n3. 动作过程中控制重量，避免使用过大负荷导致肌肉拉伤或关节扭伤。', '1. 动作时抬起臀部或使用惯性甩动，使负荷转移到下背，降低对腘绳肌的刺激。\n2. 膝关节外翻或内扣，导致膝部不适和错误的发力轨迹。\n3. 只做半程动作，屈膝幅度不足，未能充分拉伸和收缩腘绳肌。', '1. 如感到踝部不适，可调换至较厚的踝垫或使用护踝带。
2. 调整滑轮高度至脚踝位置后，若想增加伸展幅度，可适度降低滑轮，使踝部在起始时更低。
3. 对于柔韧性较差的人，可在膝下放置小垫子或使用弹力带辅助，以减轻膝关节压力。', 'isolation', '{"哑铃变体":"使用哑铃或壶铃进行俯卧腿弯举，保持相同姿势，将哑铃夹在脚踝处进行练习。","器械变体":"使用坐姿或卧式腿弯举机器，调至合适的重量和垫子高度。","自重变体":"利用健身球或毛巾进行仰卧腿弯举，屈膝将脚跟拉向臀部，保持核心稳定。","TRX/悬挂训练":"使用TRX或悬挂训练带，将脚固定在把手，俯身进行腿弯举，注意控制幅度。"}', 'published', NOW(3), NOW(3));
SET @eid_229 = LAST_INSERT_ID();
-- Suggested muscle: 腘绳肌（股二头肌、半腱肌、半膜肌） (agonist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 股四头肌 (antagonist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('倒蹬机', 'legs', 'machine', 'beginner', NULL, '1. 调整机器：根据自己的身高调节座椅高度，使踏板在膝盖水平位置，手握把手，背部紧贴靠背。\n2. 确定脚位：将双脚平放在踏板上，脚距与肩同宽或略宽，脚尖略微外展。\n3. 解除锁定：将安全锁或刹车松开，确保机器在准备状态下可以自由移动。\n4. 下降阶段：吸气，缓慢屈膝，将膝盖向胸部方向移动，直到大腿与地面接近平行或略低于踏板，保持背部紧贴靠背。\n5. 推起阶段：呼气，用脚掌向上推踏板，主要由股四头肌、臀大肌发力，伸展膝关节和髋关节，直至双腿几乎伸直但不完全锁死。\n6. 重复：保持平稳的节奏，避免弹震或快速冲撞，重复所需次数。', '1. 调整座椅和踏板后务必确认所有锁定装置已固定，防止在运动过程中机器意外滑动。\n2. 下降时保持背部紧贴靠背，避免腰部过度拱起导致脊柱受伤。\n3. 不要在膝关节完全伸直或锁死时用力推举，以减少对关节的冲击。', '1. 将脚放在踏板太高的位置或脚尖向内转，导致膝关节受力不均。\n2. 在下降过程中出现弹跳或快速冲撞，未能控制动作幅度。\n3. 动作结束时抬起臀部离开靠背，导致腰椎过度伸展。', '1. 座椅高度调节：确保膝盖在最低点时仍能保持微弯，踏板位于脚掌中心。
2. 背靠垫角度：如果感到下背部压力过大，可适当倾斜背靠垫或使用腰垫。
3. 脚位宽度：宽站位侧重臀大肌，窄站位侧重股四头肌，可根据训练目标自行调节。
4. 安全锁使用：在每次训练前检查安全锁是否完好，避免重量意外脱落。', 'compound', '{"单腿倒蹬":"可改用哑铃单腿深蹲或单腿腿举机，以维持单侧力量平衡。","宽站位倒蹬":"可换成哑铃宽距深蹲或臀桥，重点刺激臀大肌和大腿内侧。","窄站位倒蹬":"可改用腿举机或腿弯举动作，侧重股四头肌的孤立刺激。"}', 'published', NOW(3), NOW(3));
SET @eid_247 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腓肠肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('健身球腿弯举', 'legs', 'other', 'intermediate', NULL, '1. 起始姿势：仰卧在地板上，双脚跟放在健身球上，双手平放在体侧，掌心向下。\n2. 提升臀部：收紧腹肌和臀部，使身体从肩部到脚踝形成一条直线，保持核心稳定。\n3. 弯曲膝盖：慢慢将脚向臀部方向滚动球，膝盖逐渐弯曲至约90度，保持臀部抬高的姿态。\n4. 顶峰收缩：在膝盖弯曲到最高点时，用力收紧腘绳肌（半腱肌、半膜肌），保持1-2秒以感受肌肉收缩。\n5. 还原动作：缓慢将球滚回起始位置，保持身体平直，避免臀部下落或塌背。\n6. 呼吸配合：在弯曲膝盖时吸气，在伸直膝盖时呼气，保持呼吸平稳。', '1. 动作全程保持核心收紧，防止下背部塌陷或拱起，以免造成腰椎压力过大。\n2. 确保健身球稳固无滑动，必要时在球下放置防滑垫或靠在墙边进行练习。\n3. 如出现膝盖疼痛或下背部不适，应立即停止动作并寻求专业指导。', '1. 臀部下降或塌背导致下背部过度受力和姿势不稳。\n2. 膝盖弯曲过快、缺乏控制，降低了对腘绳肌的刺激效果。\n3. 脚位置不当，球未完全贴合脚跟，使得动作幅度受限或产生滑动风险。', '降低难度可将球换成更小或更硬的气球，或双脚靠墙辅助；增加难度可尝试单腿变体，或在顶峰收缩时保持更长时间的停顿。', 'isolation', '{"单腿变体":"将双脚改为单脚支撑，保持身体平衡，专注于单侧腘绳肌的强化。","站姿腿弯举":"使用阻力带或机械腿弯举器械在站立姿势下完成动作，适合不同的训练环境。","哑铃坐姿腿弯举":"坐在凳子上，手握哑铃进行腿弯举，改变力量曲线并减轻核心负担。"}', 'published', NOW(3), NOW(3));
SET @eid_286 = LAST_INSERT_ID();
-- Suggested muscle: 半腱肌 (agonist)
-- Suggested muscle: 半膜肌 (agonist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 股四头肌 (antagonist)
-- Suggested muscle: 腹横肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('健身球臀推', 'legs', 'other', 'beginner', NULL, '1. 准备姿势：坐在健身球上，双脚平放在地面，宽度约与肩同宽，膝盖弯曲约90度；上背部靠在稳固的支撑（如墙壁或固定的长凳），保持肩膀、头部自然放松。\n2. 手臂位置：双手可放在身体两侧或胸前，以帮助保持平衡。\n3. 预备动作：收紧核心和臀部，保持背部挺直，肩胛骨轻微后收。\n4. 发动力量：脚掌踩地，同时臀部用力向上推起，使身体从肩膀到膝盖形成一条直线；在最高点时，确保臀大肌强烈收缩，背部保持平直，避免过度弓背。\n5. 顶峰收缩：保持臀部收缩1-2秒，感受臀肌的紧绷。\n6. 控制下落：缓慢放松臀部，慢慢下降回到起始位置，保持对动作的控制，重复进行。', '1. 确保上背部有稳固的支撑，防止在推动过程中失去平衡。\n2. 动作全程保持脊柱中立，避免过度伸展导致下背部受伤。\n3. 初学者应在轻负荷或不加额外重量的情况下练习，确保动作控制正确后再逐渐增加难度。', '1. 臀部抬得过高导致腰部过度弓背，形成腰椎超伸。\n2. 只用腿部发力而忽视臀部收缩，导致动作效率低并增加膝盖压力。\n3. 动作过程中没有保持核心收紧，导致身体晃动或失去平衡。', '若要降低难度，可将健身球放在墙壁或固定物体旁，以提供额外支撑；若想增加挑战，可在胸部或髋部放置杠铃或使用弹力带增加阻力。', 'compound', '{"变体类型":"单腿臀推","转换建议":"在熟练掌握双脚臀推后，可抬起一只脚只用单侧腿完成动作，以强化单侧臀大肌并提升髋关节稳定性。"}', 'published', NOW(3), NOW(3));
SET @eid_287 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 髋内收肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('健身球靠墙深蹲', 'legs', 'other', 'intermediate', NULL, '1. 起始姿势：将健身球靠墙放置，背部紧贴球面，双脚与肩同宽，脚尖略微外展。\n2. 身体准备：收紧核心，挺胸抬头，眼睛平视前方，确保背部始终靠在球上。\n3. 下蹲动作：屈膝屈髋，臀部向后推，像坐椅子一样下蹲，膝盖保持在脚尖上方，避免膝盖过度前倾。\n4. 下降深度：下蹲至大腿与地面平行或略低于平行线，保持1-2秒，感受腿部和臀部的拉伸。\n5. 上升回位：脚后跟和前脚掌共同发力，将身体推回起始站姿，保持背部紧贴球，过程中保持核心稳定。\n6. 呼吸配合：下蹲时吸气，起身时呼气，保持呼吸节奏与动作同步。', '1. 确保健身球稳固靠墙，最好在光滑地面上使用防滑垫，防止球滑动导致失衡。\n2. 下蹲时膝盖不要超过脚尖，避免膝关节过度负荷。\n3. 如感到背部或腰部不适，应立即停止并检查姿势，必要时降低下蹲幅度或使用支撑。', '1. 脚距过宽或过窄导致膝盖内翻或外翻，影响膝关节受力。\n2. 下蹲深度不足，未达到大腿平行地面，降低了对臀部和大腿的刺激。\n3. 背部离开球面，导致腰椎过度弯曲，增加背部受伤风险。', '1. 球的位置可上下调节：放在上背部可强化上背和核心，放在下背部则更侧重臀部和腿后肌群。
2. 脚的站距可以略微调整，窄站距更强调股四头肌，宽站距更刺激臀部和内收肌。
3. 如需要增加难度，可在手中握住哑铃或壶铃进行负重深蹲。', 'compound', '{"单腿变体":"在熟练后可尝试单腿靠墙深蹲，提高平衡感和单侧力量。","负重变体":"手持哑铃或壶铃进行靠墙深蹲，以增加负荷并提升力量训练强度。","球位置调节":"将球放在背部上方针对上背部，放在背部下方则更针对臀部和腿后肌群。","节奏调节":"在下降阶段加入2-3秒的慢速离心，以增强肌肉耐力和控制力。"}', 'published', NOW(3), NOW(3));
SET @eid_288 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腿后肌群 (synergist)
-- Suggested muscle: 髂腰肌 (antagonist)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 核心肌群（腹直肌、腹横肌） (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腓肠肌 (stabilizer)
-- Suggested muscle: 大腿内收肌群 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('前深蹲', 'legs', 'barbell', 'intermediate', NULL, '1. 站姿，双脚与肩同宽，脚尖微微外展，将杠铃置于肩部前方（前交叉位），双手握杠略比肩宽，手肘抬起使杠铃稳固在锁骨上。\n2. 收紧核心，保持胸部向上，背部挺直，屈髋屈膝开始下蹲，动作全程保持膝盖与脚尖方向一致。\n3. 继续下蹲至大腿与地面平行或略低，确保下背部保持中立，膝盖未出现内翻，胸部保持抬起。\n4. 在最低点保持1-2秒，感受股四头肌和臀大肌的拉伸，然后通过脚跟和前脚掌发力，伸展髋膝，将身体推回起始姿势。\n5. 完成上升时呼气，重复进行预设次数，动作全程保持杠铃稳定不晃动。\n6. 训练结束后，平稳将杠铃放回架子上，避免突然脱手。', '1. 确保杠铃稳固支撑在锁骨前侧，切勿压在颈部或喉咙上，以防受伤。\n2. 下蹲时保持背部中立，避免过度前倾导致腰椎受力过大。\n3. 如出现膝关节疼痛或不适，应立即停止动作并咨询专业教练。', '1. 脚尖过度外展或内收，导致膝盖轨迹偏离，增加膝关节受伤风险。\n2. 重心后移，使杠铃晃动，背部前倾，容易导致腰背受伤。\n3. 下蹲深度不足，仅做半蹲，降低对股四头肌和臀部的刺激效果。', '1. 肩部活动受限时，可使用高杆位（前高位）并将杠铃放在肩部前侧，以减轻肩部压力。
2. 踝关节活动受限者可在脚跟垫上小垫子或穿举重鞋，帮助保持平衡。
3. 初学者建议先用轻杠铃或哑铃练习，逐步适应前深蹲的技术要点。', 'compound', '{"后深蹲":"将杠铃移至背部进行后深蹲，可降低对核心的需求，同时更强调臀部和腿后侧肌群。","高脚杯深蹲":"使用哑铃或壶铃进行高脚杯深蹲，有助于改善前深蹲时的前倾问题并加强核心稳定。"}', 'published', NOW(3), NOW(3));
SET @eid_186 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 大收肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 腓肠肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('单腿小腿提踵', 'legs', 'bodyweight', 'beginner', NULL, '1. 起始姿势：单脚站立，脚尖向前，膝盖略微弯曲，另一只脚轻轻抬起或脚尖轻触地面以保持平衡。\n2. 呼吸准备：深吸一口气，在提起脚跟时呼气，在下降时吸气，帮助控制动作节奏。\n3. 支撑准备（可选）：如平衡不足，可轻轻扶墙、扶椅子或使用扶手，以防止摔倒。\n4. 提踵动作：收紧小腿后侧肌肉，向上提起脚跟，尽量将重心放在前脚的拇指球部，脚尖保持贴地或略离地，保持约1-2秒。\n5. 顶峰收缩：在最高点稍作停顿，感受腓肠肌和比目鱼肌的收缩，确保膝盖仍保持微屈，避免锁死。\n6. 下降控制：慢慢放下脚跟，保持肌肉张力，控制速度，避免猛然落地，完成一次动作。', '确保地面平整、防滑，穿着合适的运动鞋或赤脚在防滑垫上进行。,平衡不稳时，先扶墙或使用扶手，避免因失去平衡导致摔倒受伤。,动作全程保持膝盖略微弯曲，避免膝盖锁死或过度伸展，以减轻膝关节压力。', '动作过快、缺乏控制，只做半程提踵，导致小腿肌肉收缩不充分。,脚跟抬起不够高，未达到全幅度，降低训练效果。,站立时膝盖锁死或过度伸展，增加膝关节负担，可能导致不适。', '初学者可以先双手扶墙或使用椅子帮助平衡，熟练后再尝试单腿提踵；若感到难度过大，可先进行双腿提踵，逐步过渡到单腿；若想增加负荷，可在手中握哑铃或使用负重背心。', 'isolation', '{"扶墙提踵":"双手轻扶墙壁或扶手，降低平衡难度，适合初学者。","坐姿提踵":"坐在椅子上，双手握住座椅边缘抬起脚跟，适用于康复或降低负荷。","踏板提踵":"站在踏板或台阶上，脚跟悬空向下，增加动作幅度，提高难度。","负重提踵":"手持哑铃、杠铃或背部负重，增加踝关节负荷，适合进阶训练。"}', 'published', NOW(3), NOW(3));
SET @eid_279 = LAST_INSERT_ID();
-- Suggested muscle: 腓肠肌 (agonist)
-- Suggested muscle: 比目鱼肌 (agonist)
-- Suggested muscle: 蹠肌 (synergist)
-- Suggested muscle: 胫骨前肌 (antagonist)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 核心肌群（腹横肌、背阔肌等） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('单腿深蹲', 'legs', 'bodyweight', 'advanced', NULL, '1. 起始姿势：站立，双脚与肩同宽，双手自然垂放或放在胸前以帮助平衡。将一只脚的脚尖抬起，使整只脚悬空，保持膝盖微屈。\n2. 重心准备：轻轻将体重转移至支撑腿（站立腿），保持胸部略微前倾但背部挺直，眼睛注视前方固定点。\n3. 下降过程：屈膝屈髋，控制下降速度，膝盖指向与脚尖同方向，避免膝盖内扣。下蹲至支撑腿大腿接近与地面平行，或根据个人柔韧度达到舒适的最低点，保持核心收紧。\n4. 最低点保持：稍作停顿（约1秒），感受支撑腿的股四头肌和臀大肌的收缩，同时保持骨盆水平，避免骨盆倾斜或旋转。\n5. 起身返回：使用支撑腿的力量，同时收紧臀部和核心，平稳向上推起身体，回到起始姿势。完成预定次数后换另一侧重复。', '1. 在开始前进行充分的热身，尤其是下肢和核心，以防受伤。\n2. 如果平衡性不足，可先扶墙、扶椅或使用弹力带进行辅助，确保动作全程控制。\n3. 下蹲时注意膝盖与脚尖方向一致，避免膝盖向内塌陷导致膝关节压力过大。', '1. 膝盖内扣（膝盖向内塌陷）是最常见的错误，容易导致膝关节受伤。\n2. 身体过度前倾或弯腰驼背，导致重心不稳，下背部压力增加。\n3. 下蹲深度不足或只做半程动作，未能充分利用单腿的负荷，训练效果降低。', '1. 初学者可以先借助扶手、墙壁或弹力带进行辅助，保持动作轨迹的稳定。
2. 使用凳子或箱子限制下蹲深度，以降低平衡难度。
3. 进阶者可尝试无辅助的自重单腿深蹲（即手枪深蹲），或手持哑铃、背背包增加负荷，提高力量。', 'compound', '{"辅助单腿深蹲":"初学者可使用扶手、弹力带或靠墙进行辅助，逐步降低辅助力度，最终过渡到无辅助的自重单腿深蹲。","保加利亚分腿蹲":"将后脚抬高放在椅子或台阶上，增加髋屈伸负荷，适合在单腿深蹲掌握后进阶。","侧深蹲（侧向单腿深蹲）":"在单腿深蹲基础上加入侧向移动，可加强髋外展肌群和侧向稳定性。","负重单腿深蹲":"在熟练无负重后，手持哑铃或背背包增加负荷，进一步提升下肢力量和核心稳定性。"}', 'published', NOW(3), NOW(3));
SET @eid_272 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 核心肌群（腹直肌、腹外斜肌等） (stabilizer)
-- Suggested muscle: 腓肠肌 (stabilizer)
-- Suggested muscle: 比目鱼肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('单腿臀推', 'legs', 'bodyweight', 'intermediate', NULL, '1. 坐在地面上，上背部靠在稳固的凳子或台阶上，双手放在身体两侧支撑。\n2. 单脚脚掌平放于地面，另一条腿伸直抬起，保持膝盖微屈。\n3. 收紧核心和臀大肌，通过脚跟发力向上推起髋部，直至身体从肩膀到膝盖呈一直线。\n4. 在最高点时用力收紧臀部，保持1-2秒，确保髋部不向侧面倾斜。\n5. 缓慢控制下降，臀部轻触地面但不完全放松，然后立即再次向上推起。\n6. 完成设定的次数后，换另一条腿重复相同的动作。', '1. 确保凳子或台阶稳固不滑动，背部靠靠部位要平坦且有足够支撑面积。\n2. 动作全程保持核心收紧，避免腰部过度拱起或塌陷，以防止下背部受伤。\n3. 若出现髋部或膝盖疼痛，应立即停止并咨询专业教练或医生。', '1. 髋部在上升或下降时出现明显倾斜或下降过多，导致力量转移到腰椎。\n2. 膝盖向内塌（内扣），使膝关节承受不必要的剪切力。\n3. 没有充分收紧臀部，缺少在顶端的最大收缩，导致训练效果下降。', '1. 如凳子高度不合适，可使用稍低或稍高的平台进行调节，保持上背部舒适支撑。
2. 为增加难度，可在髋部放置一个哑铃或杠铃片，或使用弹力带套在大腿上提供额外阻力。
3. 若肩部不适，可在背部下方垫上软垫或使用带靠背的健身椅代替硬凳。', 'compound', '{"变体类型":"双腿臀推","转换建议":"从单腿切换到双腿时，保持相同的髋部推起轨迹和顶部收紧动作，只是双脚同时支撑地面。若想进一步增加负荷，可在髋部放置杠铃或使用负重背心。"}', 'published', NOW(3), NOW(3));
SET @eid_275 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 股二头肌 (synergist)
-- Suggested muscle: 半腱肌 (synergist)
-- Suggested muscle: 半膜肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 髋内收肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('反向弓步', 'legs', 'bodyweight', 'beginner', NULL, '1. 站立，双脚与肩同宽，双手自然垂放或放在臀部。\n2. 吸气，收紧核心，右脚向后迈出约两脚长的距离，脚尖轻轻着地。\n3. 保持上半身直立，臀部向后推，屈膝下蹲，使左大腿与地面平行，右膝接近但不触碰地面。\n4. 在底部位置稍作停顿，感受左腿股四头肌和臀大肌的发力。\n5. 呼气，用左脚的力量将身体推回起始站立姿势，右脚顺势回到原位。\n6. 交替进行，完成设定的次数或时间。', '1. 进行前做好热身，尤其是腿部和髋部，以提升关节活动度和血液循环。\n2. 保持膝盖与脚尖方向一致，避免膝盖内扣导致膝关节受伤。\n3. 动作全程保持核心收紧，避免过度前倾或后仰导致跌倒。', '1. 膝盖过度前倾，超出脚尖，增加膝关节压力。\n2. 后脚落地时脚尖外翻或向内收，导致髋部不稳。\n3. 动作幅度不足，未能充分下蹲至大腿与地面平行。', '初学者可以先在平坦地面上进行小幅度练习，待动作熟练后再逐步加深下蹲深度；如感到平衡困难，可手扶固定物体或靠近墙壁练习；如要增加难度，可在胸前持哑铃或背负背包增加负重。', 'compound', '{"侧向反向弓步":"将后脚向侧面迈出，保持躯干直立，可加强髋外展肌的参与。","负重反向弓步":"双手握住哑铃或杠铃进行反向弓步，以提升下肢力量负荷。","高台反向弓步":"站在稳固的高台上进行，以增加下蹲深度和平衡挑战。"}', 'published', NOW(3), NOW(3));
SET @eid_268 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 内收肌群 (stabilizer)
-- Suggested muscle: 核心肌群（腹肌与竖脊肌） (stabilizer)
-- Suggested muscle: 腓肠肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('史密斯机弓步', 'legs', 'machine', 'beginner', NULL, '1. 调整史密斯机的把手至合适高度，站在机器前，双脚与肩同宽，脚尖略微外展。\n2. 将杠铃或把手置于肩部后侧，双手握紧，保持背部挺直，目视前方。\n3. 向前迈出一只脚，屈膝下蹲至前腿膝盖约成90度，后腿膝盖轻触地面，整个躯干保持直立。\n4. 靠前脚的发力将身体推回起始姿势，双脚再次并拢站稳。\n5. 交替进行左右弓步，重复完成设定的次数。', '1. 确保双脚稳固站在机器滑轨上，防止滑脱或失衡。\n2. 前膝不要过度前倾超出脚尖，以免对膝关节产生过大压力。\n3. 初学者应使用轻负荷或无负荷，循序渐进增加重量。', '1. 膝盖内扣或外翻，导致膝关节受力不均。\n2. 上半身前倾或驼背，增加腰部压力。\n3. 步幅过大或过小，使动作不稳或过度伸展。', '1. 根据个人身高调节脚的前后位置，确保后腿膝盖在最低点时轻触地面。
2. 如肩部不适，可在肩上放置软垫或使用护肩带。
3. 若腰背有不适，可适度收紧核心或降低下蹲深度。', 'compound', '{"反向弓步":"先向后迈步，可减轻前膝压力，适合膝关节不适或初学者。","步行弓步":"每一步后不回到起始位置，继续向前迈步，提升平衡和核心参与。","侧弓步":"将步子迈向侧面，主要针对大腿内侧和臀中肌，增加髋外展力量。"}', 'published', NOW(3), NOW(3));
SET @eid_250 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 比目鱼肌 (stabilizer)
-- Suggested muscle: 腓肠肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('史密斯机深蹲', 'legs', 'machine', 'beginner', NULL, '1. 调整史密斯机的杠铃高度，使其与肩部持平；2. 将双脚与肩同宽或略宽站立，脚尖略微外展；3. 站在杠铃下方，双手握住杠铃，掌心向上，杠铃放置在肩胛骨后侧的托架上；4. 收紧核心，保持胸部抬起，背部挺直，慢慢屈膝下蹲至大腿与地面平行或略低；5. 在最低点保持片刻，然后通过脚跟发力，伸展膝关节和髋关节回到起始姿势；6. 重复动作至预定次数。', '确保杠铃已锁定在安全卡扣上，防止意外滑落；下蹲时膝盖不要内扣，保持与脚尖同向；使用合适的重量，避免超负荷导致腰背受伤。', '膝盖过度前倾，超过脚尖太多，导致膝关节压力过大；背部弓起或圆肩，导致腰椎受压；脚距过窄或脚尖外展角度不当，影响稳定性。', '根据身高调节杠铃高度，使杠铃舒适放在肩后；脚距可根据个人柔韧性和目标肌肉调整，宽站距更侧重臀大肌，窄站距更侧重股四头肌；若下蹲深度受限，可适当提高站姿或使用踏板。', 'compound', '{"自由重量深蹲":"将杠铃换成哑铃或杠铃，保持相同的站距和下蹲深度，逐步适应自由重量带来的平衡挑战。","单腿深蹲":"将双脚分别放在机器两侧的平台上，单腿完成动作，以提升核心稳定性和髋部力量。"}', 'published', NOW(3), NOW(3));
SET @eid_249 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 内收肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 腓肠肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('史密斯机硬拉', 'legs', 'machine', 'intermediate', NULL, '1. 调整器械：将杠铃固定在史密斯机的导轨上，确保卡子牢固。双脚站在机器底部两侧，宽度略宽于肩宽，脚尖略微外展。\n2. 站姿准备：面向杠铃，保持背部挺直，胸部略微抬起，膝盖轻微弯曲，手握杠铃（可用双手或交叉握），手臂自然垂下。\n3. 起始动作：收紧腹肌和臀部，屈髋屈膝，缓慢下放杠铃，保持杠铃贴近小腿，始终保持视线向前，避免背部前倾。\n4. 发力抬起：脚掌踩地，通过脚跟发力，驱动臀部和腿后侧向上伸展，同时伸直膝盖和髋关节，使身体回到起始站姿。\n5. 完成动作：在站直的顶部稍微收紧臀部，保持1-2秒的顶峰收缩，然后控制重量缓慢下放回到起始姿势，完成一次动作。\n6. 呼吸配合：发力向上时呼气，下放时吸气，保持呼吸节奏。', '1. 确保脚稳固地踩在机器底部的防滑垫上，防止滑倒。\n2. 在进行动作前检查杠铃和卡子是否锁紧，避免杠铃滑落。\n3. 背部保持自然弧度，避免过度弯腰或过度挺胸，以减少下背部受伤风险。', '1. 使用过多的背部力量导致弯腰过度，形成圆背。\n2. 把杠铃抬得太快，缺少控制，导致膝关节受力不均。\n3. 站距过窄或脚尖过度内收，导致髋部外展受限，影响发力。', '1. 根据个人柔韧性调整站距，若髋关节受限可适当放宽站距。
2. 如肩部柔韧性不足，可使用交叉握或使用助力带减轻手腕压力。
3. 调整杠铃起始高度，使杠铃位于小腿中段位置，方便保持正确的运动轨迹。', 'compound', '{"罗马尼亚硬拉":"在自由杠铃或哑铃上进行，保持膝盖微屈，侧重后链（臀大肌、腘绳肌）","哑铃硬拉":"双手持哑铃，模仿史密斯机的轨迹，适合需要更自由运动轨迹的训练者","单腿硬拉":"使用哑铃或体重，训练单侧平衡和核心控制"}', 'published', NOW(3), NOW(3));
SET @eid_251 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 脊柱竖肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 腓肠肌 (stabilizer)
-- Suggested muscle: 内收肌群 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('后深蹲', 'legs', 'barbell', 'beginner', NULL, '1. 站立，双脚与肩同宽，脚尖略微外展，保持脚跟着地。\n2. 将杠铃放置在上背部（斜方肌上部），双手握杠，握距略宽于肩，手肘微微向下压，收紧肩胛骨。\n3. 深吸一口气，收紧核心，保持胸部向上，背部挺直，开始下蹲。\n4. 屈膝屈髋，臀部向后下方移动，膝盖随脚尖方向自然伸展，确保膝盖不超过脚尖太多，下蹲至大腿与地面平行或略低于平行。\n5. 在最低点停顿约一秒钟，然后通过脚后跟和脚掌中心向上推，伸展髋膝，返回起始姿势。\n6. 完成所需次数后，平稳放下杠铃，避免在卸下杠铃时扭伤背部。', '1. 使用合适的重量并确保有可靠的支撑（护具或教练），尤其在初学阶段。\n2. 保持胸部向上、背部挺直，避免圆背，以减少腰椎压力。\n3. 在进行动作前进行充分热身，重点活动髋关节、踝关节和膝关节。', '1. 膝盖内扣（膝盖向内塌），导致膝关节受伤。\n2. 背部过度前倾（圆背），增加腰椎受力。\n3. 站位过宽或过窄，影响平衡和下蹲深度。', '1. 脚距可根据个人髋关节活动范围适度调节，略宽或略窄均可。
2. 若肩部活动受限，可使用高位或低位杠铃位置，或使用吊带减轻压力。
3. 初学者建议先在不加载杠铃的情况下练习自重深蹲，确保动作轨迹和深度正确后再逐步增加重量。', 'compound', '{"前深蹲":"将杠铃移至胸前，保持上半身直立，减少背部负荷，同时强化股四头肌的参与。","腿举":"在腿部推蹬机上进行类似深蹲的动作，轨迹固定，适合初学者在受控环境下练习，但需注意不要完全依赖机器而忽视核心稳定。","哑铃深蹲":"双手持哑铃置于身体两侧，保持自然站姿，可帮助提升平衡感并减少背部压力。"}', 'published', NOW(3), NOW(3));
SET @eid_187 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 大内收肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 腓肠肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哈克深蹲机', 'legs', 'machine', 'intermediate', NULL, '1. 站在哈克深蹲机的踏板上，双脚略宽于肩宽，脚尖稍微外展，膝盖对准脚尖方向。\n2. 双手握住机器两侧的手柄，确保握把舒适且不压迫手腕。\n3. 背部紧贴机器背垫，收紧核心，胸部微微抬起，保持自然背弓。\n4. 吸气时，缓慢屈膝下蹲，臀部向后坐，膝盖保持不超过脚尖的水平线，直至大腿与地面接近平行或略低于90度。\n5. 呼气时，通过脚跟和前脚掌的合力推动，将身体向上撑起，恢复到起始的站立姿势。\n6. 完成预定的重复次数后，控制好下降速度，避免猛然弹起。', '1. 使用前检查机器的所有调节装置和锁定螺栓是否牢固，防止在运动过程中出现滑脱。\n2. 切勿在膝盖完全伸展或锁死的情况下进行弹起，以免对膝关节产生冲击。\n3. 若出现腰部或膝部不适，应立即停止练习，并根据个人情况调整下蹲深度或减轻负荷。', '1. 下蹲时膝盖向内收或外翻，导致膝关节受力不均。\n2. 背部离开背垫或弯腰驼背，增加腰椎压力。\n3. 使用过大的重量导致动作失控，快速弹起或摇晃机器，影响安全性。', '1. 根据身高调节踏板高度，使脚尖能够自然放在踏板前缘。
2. 如有需要，调整背垫的前后位置，以保持背部全程贴合并获得足够的支撑。
3. 手柄的高度应保持在肩部略微向前的位置，确保手臂在运动时自然伸展不过度拉伸。', 'compound', '{"杠铃深蹲":"如果想用杠铃代替哈克深蹲机，保持相同的站距和下蹲深度，注意背部的自然弧度，避免过度前倾。","无器械自重深蹲":"在地面上进行自重深蹲时，保持脚尖外展、膝盖对准脚尖，胸部略微抬起，核心收紧，模拟机器的背部支撑感。","倒蹬机":"使用倒蹬机时，姿势与哈克深蹲相反，背部需紧贴倒蹬机的背垫，腿部推力方向相反，可作为交叉训练变体。"}', 'published', NOW(3), NOW(3));
SET @eid_248 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腓肠肌 (stabilizer)
-- Suggested muscle: 脊柱竖肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃交替弓步', 'legs', 'dumbbell', 'beginner', NULL, '1. 站立，双脚与肩同宽，双手各持一只哑铃，手臂自然下垂，保持背部挺直；\n2. 右脚向前迈出一步，屈膝下蹲，使前膝约成90度，后膝轻轻触地，保持核心收紧，躯干直立；\n3. 在此姿势停顿约1-2秒，然后用前脚的力量推地，将身体推回起始站立姿势；\n4. 随即左脚向前迈出一步，重复同样的下蹲和站起动作，完成一次交替；\n5. 继续交替进行规定的次数或时间，注意保持呼吸均匀，下蹲时吸气，起身时呼气。', '下蹲时确保前膝不超过脚尖，避免膝盖内翻造成压力；,保持背部挺直，避免前倾或弯腰，以防腰部受伤；,使用适当重量的哑铃，若感到关节不适或失去平衡应立即停止并降低重量。', '前膝过度前伸导致膝盖受力过大；,后脚落地不稳或踢地，导致身体晃动；,躯干前倾、驼背或使用哑铃时手臂过度用力，影响动作的稳定性和效果。', '初学者可先徒手练习或使用轻重量哑铃，专注于动作轨迹和身体对齐；膝关节有不适时可缩短步幅、减小下蹲深度；进阶者可尝试后脚抬高的变体或加大哑铃重量，以提升难度和肌肉刺激。', 'compound', '{"单侧变体":"保持躯干直立，步幅适中，先以自身体重练习熟练后再握哑铃；","后脚抬高变体":"将后脚放在稍高的平台，可增加臀部激活，转换时注意保持平衡；","无重量变体":"先徒手练习，确保姿势正确后再逐步加入哑铃重量。"}', 'published', NOW(3), NOW(3));
SET @eid_208 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 核心肌群（腹横肌、腹直肌） (stabilizer)
-- Suggested muscle: 小腿（腓肠肌、比目鱼肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃侧弓步', 'legs', 'dumbbell', 'intermediate', NULL, '1. 站立，双脚与肩同宽，双手各持一只哑铃，手臂自然下垂，掌心朝内。\n2. 保持核心收紧，胸部微挺，目光平视前方。\n3. 向右侧方迈出一步，脚尖指向正前方，重量主要放在左脚的脚后跟上。\n4. 同时屈左膝和右髋，臀部向后坐，下蹲至左大腿与地面基本平行，右腿在侧面伸直。\n5. 在最低点保持姿势约1‑2秒，确保膝盖不超过脚尖太多，膝盖方向与脚尖一致。\n6. 通过左脚脚后跟发力，将身体推回起始站立姿势，完成一次右侧动作；随后换左侧重复相同步骤。', '进行前进行充分热身，特别是下肢和臀部，以防止肌肉拉伤。\n选择合适的哑铃重量，避免因重量过大导致姿势失衡或关节压力过大。\n在侧弓步过程中，确保膝盖始终与脚尖方向一致，避免膝盖内翻导致韧带受伤。', '身体前倾，导致背部弯曲，增加腰椎压力。\n膝盖向内塌陷（膝盖内翻），增加膝关节受伤风险。\n下蹲深度不足，未能达到大腿与地面平行的要求，影响锻炼效果。', '初学者可先使用较轻的哑铃或徒手进行，逐步增加重量。
如膝盖有不适，可限制下蹲深度或改为半蹲，以减轻关节负担。
高级练习者可在侧弓步底部加入哑铃推举或侧平板支撑，提升难度和全身协同训练。', 'compound', '{"单手哑铃侧弓步":"将双手握哑铃改为单手握哑铃，可在对侧手叉腰或向前伸展以保持平衡；如果想降低难度，可完全去掉哑铃进行徒手侧弓步。"}', 'published', NOW(3), NOW(3));
SET @eid_209 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 臀中肌 (synergist)
-- Suggested muscle: 大腿内收肌群 (synergist)
-- Suggested muscle: 核心肌群（腹直肌、腹横肌） (stabilizer)
-- Suggested muscle: 小腿腓肠肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃保加利亚深蹲', 'legs', 'dumbbell', 'intermediate', NULL, '1. 起始姿势：双手各持适当重量的哑铃，站直，双脚与肩同宽，一只脚向前迈出约0.6‑0.8米，脚尖轻轻放在稳固的凳子或台阶上，后脚脚尖触地，保持躯干直立。\n2. 调整站距：确保前脚与后脚的间距约为一脚长，使前脚膝盖与脚踝对齐，后膝略微弯曲，避免锁死。\n3. 下蹲动作：吸气，屈前膝缓慢下降，保持膝盖不超过脚尖，背部挺直，核心收紧，后膝几乎触地但不要猛然碰撞地面。\n4. 起身发力：呼气，通过前腿的股四头肌和臀大肌向上推，返回起始姿势，保持身体平衡。\n5. 计数与换边：完成设定的次数后，换另一侧腿重复上述动作，确保两侧训练量均衡。', '1. 使用稳固的凳子或平台，防止滑动或倒塌。\n2. 保持背部挺直，避免前倾导致腰椎受伤。\n3. 如有膝盖不适或疼痛，降低下蹲深度或减轻哑铃重量。', '1. 膝盖过度前移，超过脚尖，增加膝关节压力。\n2. 站距过窄或过宽，导致平衡不稳和姿势变形。\n3. 动作过快，缺乏控制，削弱肌肉刺激并增加受伤风险。', '初学者可先徒手或使用轻哑铃进行练习；如凳子高度不足，可使用稳固的椅子或箱子代替；高级训练者可双手各持更重的哑铃或单手持哑铃增加难度。', 'compound', '{"徒手版":"直接使用体重进行保加利亚深蹲，省去哑铃，适合初学者或热身。","杠铃版":"将杠铃置于肩部，替代哑铃，增加背部负荷。","单腿版":"在完成一次后直接换腿，不停顿，提高训练强度和心肺挑战。"}', 'published', NOW(3), NOW(3));
SET @eid_210 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腿后腱 (antagonist)
-- Suggested muscle: 髋屈肌 (synergist)
-- Suggested muscle: 核心肌群 (stabilizer)
-- Suggested muscle: 小腿肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃俯卧腿弯举', 'legs', 'dumbbell', 'intermediate', NULL, '1. 准备姿势：躺在平板凳或训练垫上，双手各握一只哑铃，屈膝将脚跟靠向臀部，保持腿部与地面垂直。\n2. 稳定核心：收紧腹部和背部肌肉，确保躯干紧贴垫子，防止在动作过程中拱背或摆动。\n3. 动作执行：保持大腿固定，仅通过屈膝将脚跟向上拉哑铃至大腿后侧最大收缩点，感受腘绳肌的紧绷。\n4. 顶峰收缩：在最高点稍作停顿，确保膝盖约成90度角或略小，充分收缩腘绳肌。\n5. 缓慢下放：控制哑铃重量，缓慢将脚跟放回起始位置，膝盖逐渐伸展，避免快速下落导致肌肉拉伤。\n6. 重复次数：按计划重复8-12次，进行3-4组，注意在每组间适当休息。', '1. 保持背部平贴垫子，防止腰椎过度弯曲或受压。\n2. 选用适当重量，避免使用过重哑铃导致膝关节或踝关节受伤。\n3. 在动作全程保持肘部微屈且稳定，防止手腕受伤。', '1. 动作时把大腿抬起或摆动身体，导致腰部参与过多。\n2. 下放时速度过快，缺少离心控制。\n3. 膝关节过度伸展或脚踝过度外翻，影响腘绳肌的刺激。', '1. 初学者可先使用单手哑铃或减轻重量，专注于动作轨迹。
2. 如感到手腕不适，可将哑铃握在手掌中部或使用手柄式哑铃。
3. 可在倾斜的长凳上进行，以改变阻力的角度并适应不同柔韧性。', 'isolation', '{"变体类型":"机器腿弯举","转换建议":"如无法使用哑铃，可换用坐姿腿弯举机或阻力带进行类似训练，保持膝关节屈伸轨迹一致，并相应调整重量。"}', 'published', NOW(3), NOW(3));
SET @eid_226 = LAST_INSERT_ID();
-- Suggested muscle: 股二头肌（腘绳肌） (agonist)
-- Suggested muscle: 半腱肌 (synergist)
-- Suggested muscle: 半膜肌 (synergist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 股四头肌 (antagonist)
-- Suggested muscle: 核心稳定肌群（如竖脊肌、腹横肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃农夫行走', 'legs', 'dumbbell', 'intermediate', NULL, '1. 选取适当重量的哑铃，双手握紧哑铃，手臂自然下垂，肩膀放松，保持胸部略微挺起。\n2. 站直，双脚与肩同宽，脚尖略向前，保持膝盖微屈，核心收紧，背部保持自然弧度。\n3. 开始行走时，先迈出左脚，随后右脚跟进，保持步伐均匀、步幅约与肩同宽，避免跨步过大或过小。\n4. 行走过程中，保持哑铃靠近身体两侧，避免耸肩或过度外展手臂，保持视线向前，颈部自然伸展。\n5. 完成预设距离（如20‑30米）或时间（30‑60秒）后，缓慢停下，将哑铃放回地面或架子上。\n6. 保持自然呼吸，不要屏气，确保全程姿势稳定。', '- 确保地面干燥防滑，穿着稳固的运动鞋，以防滑倒。\n- 使用合适重量的哑铃，避免因重量过大导致姿势失控或肌肉拉伤。\n- 行走时保持核心紧绷、脊柱中立，避免弯腰或前倾，以防止下背受伤。', '- 耸肩或手臂过度外展导致肩部不适。\n- 步幅不一致或跨步过大，使膝关节受到额外冲击。\n- 背部过度弓起或塌腰，增加腰椎负担。', '- 初学者可先从轻重量、短距离开始，逐步增加重量和行走距离。
- 如感肩部疲劳，可改为握把更宽或使用护腕带，以减轻前臂负担。
- 可以在平地上练习，也可以在不平的地面上进行，以增加平衡挑战。', 'compound', '{"单臂农夫行走":"改为单手握哑铃，另一只手可放在身侧或放在头部后方，以增加核心稳定性挑战。","肩上农夫行走":"将哑铃抬至肩部位置，进行行走，提升肩部力量和核心控制。","高脚杯行走":"双手握住哑铃置于胸前，行走时保持胸部挺起，侧重于上半身和核心的稳定。","空手行走":"不持哑铃进行行走，专注于步态、姿势和核心控制，可用于恢复或热身。"}', 'published', NOW(3), NOW(3));
SET @eid_218 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 小腿腓肠肌 (stabilizer)
-- Suggested muscle: 核心肌群（腹横肌、腹直肌） (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 胸大肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃前弓步', 'legs', 'dumbbell', 'beginner', NULL, '1. 双脚站立，双手各握一只哑铃，手臂自然垂于身体两侧，目视前方。\n2. 右脚向前迈出一步，步幅约与肩同宽，脚尖略微外展，左脚保持原位，脚跟抬起。\n3. 保持躯干直立，核心收紧，屈膝下蹲至前侧大腿接近水平，膝盖不应超过脚尖，后侧膝盖轻触地面或接近地面。\n4. 稍作停顿后，前脚的脚掌用力向上推，恢复起始姿势，右脚回到原位。\n5. 换左脚重复上述动作，两腿交替进行至规定的次数。\n6. 若要增加挑战，可在每一步完成后保持下蹲姿势两秒，再站起。', '确保练习区域地面平整、防滑，穿着合适的运动鞋以防止滑倒。,下蹲时膝盖方向应与脚尖一致，避免膝盖向内塌导致膝关节受伤。,如出现膝关节、背部或髋部不适，应立即停止动作并咨询专业教练或医生。', '步伐过大或过小，导致重心不稳或膝盖受力不均。,下蹲时膝盖超过脚尖，增加膝关节压力。,躯干前倾或弓背，导致背部压力过大且降低动作效果。', '初学者可先徒手练习或使用极轻哑铃，以熟悉动作轨迹和平衡感。,若膝关节不适，可减小步幅或改为侧弓步，降低膝关节负担。,在软垫或平衡板上练习，可增强核心稳定性和踝关节力量。', 'compound', '{"徒手前弓步":"可改用哑铃或壶铃进行，以增加负荷并提升上肢力量参与。","单腿前弓步":"改为单手持哑铃进行单腿前弓步，以加强平衡感和核心控制。"}', 'published', NOW(3), NOW(3));
SET @eid_221 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腓肠肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 髋内收肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃前深蹲', 'legs', 'dumbbell', 'intermediate', NULL, '1. 站立，双脚与肩同宽，双手各握一只哑铃，哑铃置于肩部两侧，手肘向上，保持胸部挺直。\n2. 收紧核心，微微屈膝，将臀部向后推，重心下降，膝盖不超过脚尖过多，保持膝盖与脚尖方向一致。\n3. 继续下蹲至大腿与地面平行或略低于平行位置，确保背部挺直，眼睛向前看。\n4. 在最低点稍作停顿，然后通过脚跟和前脚掌向上推压，伸展膝盖和臀部，回到起始姿势。\n5. 重复进行设定的次数，呼吸节奏为下蹲时吸气，起身时呼气。', '1. 使用合适重量的哑铃，避免因重量过大导致姿势失控。\n2. 下蹲时保持膝盖与脚尖同向，防止膝内扣导致损伤。\n3. 若感到背部或膝部不适，应立即停止并咨询专业教练。', '1. 膝盖过度前移或内扣，使膝关节负担过大。\n2. 背部弓背或前倾，导致腰椎受压。\n3. 下蹲深度不足，未能充分刺激股四头肌和臀大肌。', '初学者可以先采用轻重量或徒手练习，确保动作轨迹正确；进阶者可使用较重的哑铃或加入单腿深蹲以提高难度；若肩部不适，可改为双手握哑铃放在胸前的高脚杯姿势。', 'compound', '{"变体类型":"哑铃高脚杯深蹲","转换建议":"将哑铃置于胸前，握把向上，改为高脚杯深蹲，可减轻肩部压力，同时保持前蹲的核心刺激。"}', 'published', NOW(3), NOW(3));
SET @eid_206 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腓肠肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃单腿深蹲', 'legs', 'dumbbell', 'advanced', NULL, '1. 站立，双脚与肩同宽，双手各持一只合适重量的哑铃，手臂自然下垂。\n2. 将重心移至右腿，左腿稍微向前抬起，保持躯干直立，目视前方。\n3. 吸气时，弯曲右膝和右髋，缓慢下蹲至右大腿接近水平或略低于膝关节，左脚在空中保持伸直。\n4. 保持核心紧绷，避免身体前倾或后仰，保持胸部挺起。\n5. 脚尖指向正前方，确保右膝在脚尖上方，避免膝内翻。\n6. 呼气时，用右腿的力量向上推回起始姿势，回到单腿站立。完成后换另一条腿重复相同的动作。', '确保训练区域地面平稳、无滑倒危险，并使用防滑垫。,使用适当的哑铃重量，避免负荷过重导致失去平衡。,如果出现膝盖疼痛或不适，应立即停止动作并咨询专业教练或医生。', '下蹲时膝盖向内或向外翻转，导致膝关节压力过大。,身体前倾或后仰，使重心偏离支撑腿，增加跌倒风险。,动作过快、没有控制，导致关节冲击或失去平衡。', '如果平衡不稳，可先用双手扶住稳固的支撑物（如墙或椅背），或先练习无哑铃的单腿深蹲。熟练后逐步加入哑铃重量，或在踏板上进行，以降低下蹲深度。', 'compound', '{"无器械版":"取消哑铃，改为徒手单腿深蹲，适合初学者练习平衡。","杠铃版":"将哑铃换成杠铃放在肩膀后方，增加负荷并改变发力模式。","踏板版":"在踏板或阶梯上进行，可降低下蹲深度，减轻膝关节负担。"}', 'published', NOW(3), NOW(3));
SET @eid_224 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 髋屈肌（如髂肌） (synergist)
-- Suggested muscle: 核心肌群（腹横肌、腹直肌） (stabilizer)
-- Suggested muscle: 小腿肌群（腓肠肌、比目鱼肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃后弓步', 'legs', 'dumbbell', 'beginner', NULL, '1. 站立，双脚与肩同宽，双手各持一只哑铃，手臂自然垂于身体两侧，目视前方。\n2. 保持上半身挺直，核心收紧，右脚向后迈出一大步，脚尖轻轻着地，脚跟抬起。\n3. 同时屈左膝，使左大腿平行于地面，左膝位于脚尖正上方，避免膝盖过度前伸。\n4. 继续下降至两膝约成90度角，后腿的膝盖几乎触地但保持悬空状态。\n5. 通过左脚后跟发力，向上推回起始姿势，右脚回到原位，换另一侧重复。', '1. 确保地面平整，穿合适的运动鞋，防止滑倒。\n2. 在下蹲时保持膝盖与脚尖同向，避免内扣导致膝关节受伤。\n3. 若感到腰部或膝盖不适，应立即停止并调整重量或动作幅度。', '1. 前侧膝盖过度前移，超出脚尖，增加膝关节压力。\n2. 上半身前倾或弯腰驼背，导致腰背负担增加。\n3. 步幅过大或过小，导致动作不稳或髋部旋转。', '1. 可根据个人柔韧性和力量调整后撤步的幅度，步幅越大对臀大肌的刺激越大，步幅越小则股四头肌参与更多。
2. 哑铃重量可从轻重量开始，逐步增加，以避免技术失误。
3. 如肩部不适，可将哑铃放在肩上或换成手握壶铃的姿势。', 'compound', '{"前弓步":"将后撤步改为向前迈步，可更好激活股四头肌。","侧弓步":"改变步向至侧面，可加强臀中肌和髋外展肌。","无器械后弓步":"去掉哑铃，使用自身体重，适合初学者或作为热身动作。","踏板后弓步":"在踏板上进行，可增加动作幅度和平衡难度。","哑铃前推后弓步":"在下蹲时将哑铃向前推，可提升核心协同参与。"}', 'published', NOW(3), NOW(3));
SET @eid_220 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (antagonist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃坐姿小腿提踵', 'legs', 'dumbbell', 'beginner', NULL, '1. 坐在哑铃凳或平凳上，双脚平放在地面上，踝关节自然悬空，保持身体直立。\n2. 将一对适当重量的哑铃放在大腿上方靠近膝盖的位置，双手握住哑铃，保持背部挺直，肩胛骨微微收紧。\n3. 慢慢抬起脚尖，使小腿肌肉收缩，直到脚尖指向最高点，保持1-2秒，感受腓肠肌的顶峰收缩。\n4. 在最高点稍作停顿后，缓慢放下脚尖回到起始位置，控制重量，避免弹跳或快速下落。\n5. 重复进行所需次数，注意呼吸：上升时吸气，下降时呼气。\n6. 如感到疼痛或不适，应立即停止动作并检查姿势，必要时降低哑铃重量或咨询专业人士。', '1. 选取合适的哑铃重量，避免过重导致失去平衡或对膝关节产生过大压力。\n2. 保持背部挺直，避免向前倾斜或弓背，以免对腰椎造成不良负荷。\n3. 如有膝关节或踝关节不适，务必在动作前咨询医生或物理治疗师，必要时改用更轻的负荷或停止练习。', '1. 动作速度过快，导致小腿肌肉没有得到充分的收缩与伸展，降低训练效果。\n2. 膝盖过度弯曲或伸展，使本应由小腿承担的负荷转移到膝关节或大腿，增加受伤风险。\n3. 动作幅度不足，仅做小幅度的抬脚，未能充分刺激腓肠肌和比目鱼肌。', '1. 初学者可先使用徒手或极轻的哑铃练习，待掌握动作轨迹后再逐步增加负荷。
2. 如凳子高度不合适，可通过垫高或降低凳子，使脚尖自然悬空，确保踝关节有足够的活动范围。
3. 若手腕疲劳，可将哑铃放在大腿上部的凹槽或使用哑铃托架，减轻手腕负担。', 'isolation', '{"站姿小腿提踵":"保持相同的踝关节屈伸运动，改为站立姿势，双手扶墙或双手各持哑铃放在身体两侧，以增加负荷并强化腓肠肌和比目鱼肌；也可尝试单腿站姿提踵以提高平衡与单侧力量。"}', 'published', NOW(3), NOW(3));
SET @eid_217 = LAST_INSERT_ID();
-- Suggested muscle: 腓肠肌（内侧头） (agonist)
-- Suggested muscle: 腓肠肌（外侧头） (agonist)
-- Suggested muscle: 比目鱼肌 (agonist)
-- Suggested muscle: 胫骨前肌 (antagonist)
-- Suggested muscle: 股四头肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀大肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃小腿提踵', 'legs', 'dumbbell', 'beginner', NULL, '1. 站立在稳固的踏板或阶梯上，双手各持一只哑铃，手臂自然垂于身体两侧，目视前方。\n2. 脚尖略微外展，脚掌前部踏在踏板边缘，脚跟悬空，保持身体平衡。\n3. 慢慢抬起脚跟，尽量用前脚的跖屈动作将身体向上推，直到小腿肌肉达到最大收缩，膝盖保持伸直或轻微弯曲。\n4. 在最高点停顿约1-2秒，感受腓肠肌和比目鱼肌的收紧。\n5. 缓慢控制下放脚跟，回到起始姿势，保持脚跟不低于踏板表面，以免拉伤。\n6. 完成预定次数后，换腿或继续训练，注意保持核心稳定，避免身体前倾或后仰。', '1. 使用稳固的踏板或阶梯，避免踏板滑动导致失衡。\n2. 初学者应从轻重量哑铃开始，逐步增加负荷，防止踝关节过度负荷。\n3. 若感到踝部或小腿有疼痛，应立即停止练习并检查姿势或降低重量。', '1. 在动作过程中膝盖过度屈曲，将力量转移到膝关节而非小腿。\n2. 脚跟下放不够深或下放过快，未能完成全程的运动范围。\n3. 身体前倾或后仰，导致核心不稳，增加跌倒风险。', '1. 如需增加难度，可将哑铃换成杠铃，或使用双手握持更重的哑铃。
2. 若想更好地稳定身体，可在站立时使用固定扶手或靠墙进行练习。
3. 调整脚尖的外展角度可侧重内侧或外侧腓肠肌的不同部位。', 'isolation', '{"杠铃小腿提踵":"将哑铃换成杠铃，双手握住杠铃置于肩部上方进行提踵，可增加负荷并提升稳定性。","机器小腿提踵":"使用小腿推举机器或坐姿小腿器械进行练习，适合在健身房固定姿势下进行。","单腿提踵":"将一只脚抬起，仅用单腿进行提踵，提高平衡感和单侧力量。","体重提踵":"不使用任何外部负荷，仅靠自身体重进行提踵，适合初学者或作为热身动作。"}', 'published', NOW(3), NOW(3));
SET @eid_215 = LAST_INSERT_ID();
-- Suggested muscle: 腓肠肌 (agonist)
-- Suggested muscle: 比目鱼肌 (synergist)
-- Suggested muscle: 胫前肌 (antagonist)
-- Suggested muscle: 足底短肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃深蹲', 'legs', 'dumbbell', 'beginner', NULL, '1. 站姿，双脚与肩同宽，脚尖略微外展，双手各握一只哑铃，手臂自然垂于体侧。\n2. 保持胸部挺直，背部微弓，目视前方，收紧核心。\n3. 吸气后，屈膝屈髋，像坐椅子一样向下蹲，膝盖不要超过脚尖太多，臀部向后坐。\n4. 继续下蹲至大腿与地面平行或略低，确保膝盖与脚尖方向保持一致。\n5. 在最低点稍作停顿，然后呼气，用脚跟发力，将身体向上推回起始姿势。\n6. 重复进行规定的次数，始终保持动作平稳、控制。', '1. 使用适当重量的哑铃，避免因重量过大导致姿势失控。\n2. 蹲下和站起时保持背部挺直，避免弓背或塌腰，以防腰椎受伤。\n3. 若出现膝盖疼痛或不适，应立即停止并检查姿势或降低重量。', '1. 膝盖内扣（向内塌），导致膝关节受力不均。\n2. 下蹲深度不足，仅做半蹲，未能充分刺激股四头肌和臀大肌。\n3. 上身前倾或弯腰驼背，使重心前移，增加腰背压力。', '如果平衡性较差，可以在双脚之间放置稳固的支撑物（如凳子）作为辅助；如果肩部活动受限，可将哑铃置于身体两侧的手掌握把位置，或改用哑铃高脚杯深蹲。', 'compound', '{"变体类型":"可改为杠铃深蹲、腿部推蹬机、单腿哑铃深蹲等，以调节负荷或侧重点；如需降低难度可使用更轻的哑铃或仅做体重深蹲，若想提升难度可在深蹲顶部加入哑铃挺举或进行哑铃深蹲跳。"}', 'published', NOW(3), NOW(3));
SET @eid_205 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腿后腱群 (synergist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 核心肌群（腹直肌、腹外斜肌） (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃直腿硬拉', 'legs', 'dumbbell', 'intermediate', NULL, '1. 站姿双脚与髋同宽，双手各持一只哑铃，手臂自然垂于体侧，手掌朝向大腿。胸部保持挺起，肩胛骨轻微后收。\n2. 保持双腿几乎伸直（膝盖可略弯），重心放在脚后跟，臀部向后推，形成髋关节铰链。\n3. 在保持背部平直的情况下，缓慢将哑铃沿小腿前侧下降，直至感到大腿后侧（腘绳肌）有适度拉伸。\n4. 暂停1-2秒，确保核心收紧，背部未出现圆形。\n5. 通过脚后跟发力，将臀部向前推，返回起始站立姿势，同时收紧臀部。\n6. 动作全程保持平稳，避免使用惯性，每遍重复进行。', '1. 始终保持脊柱中立，避免弯腰或拱背，以防止下背部受伤。\n2. 使用合适的重量，初学者应先从轻哑铃或空杆练习，确保动作规范。\n3. 站稳脚跟，确保地面干燥防滑，防止滑倒或扭伤。', '1. 背部过度弯曲（圆背）导致腰椎受压，是最常见且危险的错误。\n2. 膝盖锁死或完全伸直，使膝关节受力过大。\n3. 动作过快、使用惯性完成提起，减弱了对目标肌群的刺激并增加受伤风险。', '1. 初学者可将膝盖略微弯曲（微屈）来减轻对腿后链的拉伸需求，待柔韧性提升后逐步伸直。
2. 如感下背压力过大，可在脚前放置垫块或使用垫高平台，以调整站姿高度。
3. 为增加挑战，可尝试单腿变体或使用更重的哑铃，但需确保核心保持稳定。', 'compound', '{"杠铃直腿硬拉":"将哑铃换成杠铃，保持相同的臀部后坐与背部直线，注意站距与抓握宽度，确保重量均匀分布。","单腿哑铃直腿硬拉":"在保持平衡的前提下，将双脚合并为单腿支撑，增加核心与臀部的参与度，适用于提升平衡与单侧力量。"}', 'published', NOW(3), NOW(3));
SET @eid_212 = LAST_INSERT_ID();
-- Suggested muscle: 腘绳肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 下背竖脊肌 (agonist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 腹斜肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃硬拉', 'legs', 'dumbbell', 'beginner', NULL, '1. 站姿，双脚与肩同宽，脚尖略微外展，双手各持一只哑铃，掌心朝向身体两侧。\n2. 收紧核心，背部保持平直或自然弧度，略微屈膝，臀部向后推，形成类似坐姿的姿势，保持胸部抬起。\n3. 在保持背部中立的前提下，慢慢将上身前倾，哑铃沿大腿前侧下降，直到上体接近与地面约45度角，注意不要弯腰或圆背。\n4. 通过脚跟和臀部发力，伸展膝盖和髋关节，将身体抬回起始站姿，整个过程中哑铃要紧贴身体，避免前后摆动。\n5. 重复动作，保持呼吸节奏——在下蹲时吸气，在上升时呼气。\n6. 如感到背部不适或出现疼痛，立即停止并检查姿势，必要时降低重量或请教专业教练。', '整个动作中保持背部平直或自然弧度，避免出现圆背或过度弓背，以减少下背部受伤风险。,使用适当重量，哑铃不宜过重，以免在下降时失控导致腰背受压。,在开始前检查周围环境，确保有足够的空间完成完整动作，避免碰到障碍物。', '弯腰或圆背：导致下背部受压，增加受伤风险。,膝盖过度前移或锁死：应让膝盖自然跟随髋部后移，保持与脚尖方向一致。,只用手臂抬起哑铃：背部、髋部和腿部的力量是主要驱动，手臂只起支撑作用。', '如果柔韧性不足，可先将哑铃放在凳子或箱子上进行半程硬拉，逐步增加下探深度。也可以通过调节脚距、站姿宽度或使用较轻的哑铃来适应个人的髋关节活动范围。', 'compound', '{"哑铃罗马尼亚硬拉":"侧重腿后侧（腘绳肌）和臀大肌，保持膝盖微屈，臀部向后坐，动作幅度更大，适合想要加强髋部伸展的人群。","哑铃单腿硬拉":"提升平衡和核心稳定，要求在单腿上完成整个动作，适合中高级训练者。","哑铃硬拉（宽站距）":"增加髋关节外展角度，更多激活臀中肌和臀小肌，适合想要塑形臀部外侧的人。"}', 'published', NOW(3), NOW(3));
SET @eid_211 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 前臂屈肌 (synergist)
-- Suggested muscle: 腓肠肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃站姿小腿提踵', 'legs', 'dumbbell', 'beginner', NULL, '1. 站立准备：双脚与肩同宽，脚尖朝前，双手各持一只哑铃垂于身体两侧，保持身体直立，目视前方。\n2. 稳定重心：确保双脚站稳在平坦地面上，感受身体的平衡点，为提踵动作做好准备。\n3. 提踵发力：慢慢抬起脚跟，将身体重心向上推送，尽量高地踮起脚尖，使小腿肌肉充分收缩。\n4. 顶峰收缩：在最高点保持1-2秒，充分感受小腿肌群（腓肠肌和比目鱼肌）的收缩和张力。\n5. 缓慢还原：控制性地慢慢放下脚跟，回到起始位置，在最低点稍作停顿后进行下一次重复。', '1. 保持身体平衡，避免晃动或向前倾倒，必要时可靠近墙壁或固定物体站立以获得支撑。\n2. 动作过程要缓慢控制，避免快速弹跳式动作，以免造成踝关节扭伤或跟腱损伤。\n3. 选择合适的哑铃重量，初学者应从较轻重量开始，逐步增加，避免踝关节和跟腱承受过大压力。', '1. 脚跟抬起幅度不够高，未能充分拉伸和收缩小腿肌群，降低训练效果。\n2. 动作速度过快，利用惯性完成动作，无法有效刺激目标肌群。\n3. 身体重心不稳，左右晃动或前倾后仰，容易导致失去平衡甚至受伤。', '1. 初学者可先徒手练习，待动作熟练后再逐步增加哑铃重量。
2. 如感到平衡困难，可在身体侧面放置固定物体（如椅背）作为轻微支撑。
3. 可通过调整脚尖方向（内八或外八）来侧重刺激小腿的不同部位。', 'isolation', '{"进阶变体":"可采用单腿站姿提踵来增加难度和挑战平衡能力","器械变体":"可使用器械小腿提踵机或提踵机器进行训练","坐姿变体":"可改为坐姿哑铃提踵，更侧重比目鱼肌的锻炼"}', 'published', NOW(3), NOW(3));
SET @eid_216 = LAST_INSERT_ID();
-- Suggested muscle: 腓肠肌 (agonist)
-- Suggested muscle: 比目鱼肌 (agonist)
-- Suggested muscle: 胫骨前肌 (stabilizer)
-- Suggested muscle: 腓骨长肌 (stabilizer)
-- Suggested muscle: 腓骨短肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃腿伸展', 'legs', 'dumbbell', 'beginner', NULL, '1. 站姿或坐姿，双手各握一只哑铃，保持背部挺直，肩胛骨微收；2. 抬起一条腿，使大腿与地面平行，膝盖弯曲约90度，哑铃靠近小腿前侧；3. 在保持上体稳定的同时，伸直抬起腿的膝关节，使小腿向前伸展，同时将哑铃向上提；4. 在最高点稍作停顿，感受股四头肌的收缩，然后缓慢屈膝将腿放下，哑铃随之下降；5. 完成规定次数后换另一条腿继续练习。', '1. 选用合适的哑铃重量，避免因重量过大导致失去平衡或姿势变形；2. 动作全程保持核心收紧、脊柱中立，避免背部过度拱起或塌腰；3. 进行腿部伸展时不要锁死膝关节，以免对关节造成冲击。', '1. 动作速度过快，利用惯性完成伸展，降低肌肉刺激效果；2. 膝盖伸展时出现过度伸展（超伸）或腿部外翻，影响膝关节安全；3. 背部未能保持平直，导致腰部承受额外压力。', '1. 初学者可以先不持哑铃，仅用自身体重练习；2. 若感到腰部不适，可在长凳或倾斜的垫子上俯卧进行，以减轻腰部负担；3. 可通过调节哑铃重量或使用弹力带进行不同的阻力变化。', 'isolation', '{"单腿变体":"将动作改为单腿进行，可增强平衡感和单侧股四头肌力量","负重变化":"使用更轻的哑铃或弹力带进行热身，逐步增加负重","坐姿变体":"坐在训练凳上进行腿伸展，同样使用哑铃增加负荷"}', 'published', NOW(3), NOW(3));
SET @eid_214 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌（股直肌） (agonist)
-- Suggested muscle: 股外侧肌 (agonist)
-- Suggested muscle: 股内侧肌 (agonist)
-- Suggested muscle: 腘绳肌 (antagonist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 腓肠肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃腿弯举', 'legs', 'dumbbell', 'intermediate', NULL, '1. 准备姿势：站立，双脚与肩同宽，双手握住哑铃并将其固定在脚踝处（可使用哑铃夹或脚套），确保哑铃稳固不滑落。\n2. 起始动作：保持躯干直立，核心收紧，目光向前。\n3. 屈膝发力：慢慢屈膝，将哑铃向臀部方向举起，尽量让脚跟靠近臀部，感受大腿后侧（腘绳肌）的收缩。\n4. 顶峰收缩：在动作最高点保持1-2秒，充分挤压腘绳肌。\n5. 缓慢放回：控制速度，缓慢将哑铃放回起始位置，膝盖逐渐伸展回到起始姿势。\n6. 重复：按设定的次数和组数重复上述动作。', '• 确认哑铃已牢固固定，避免在运动过程中滑落伤脚。\n• 保持背部挺直，避免弓背或过度前倾，以减少腰椎压力。\n• 使用适当的重量，避免因负荷过大导致肌肉拉伤或关节不适。', '• 动作过快，利用惯性完成动作而失去肌肉控制。\n• 膝盖屈伸幅度不足，只做半程动作，降低训练效果。\n• 背部过度弓背或前倾，导致腰椎受力过大。', '• 初学者可先用轻重量或借助腿弯举机器感受动作轨迹。
• 进阶者可以尝试单腿哑铃腿弯举，提高核心稳定性和不平衡负荷。
• 若没有哑铃，可使用脚踝负重袋或绳索腿弯举设备进行替代。', 'isolation', '{"站姿哑铃腿弯举":"改为坐姿或俯卧腿弯举机器，可减轻对核心的依赖，提高对腘绳肌的孤立刺激。","单腿哑铃腿弯举":"如果想增加平衡挑战，可在不平衡板或垫子上进行；若想更专注于负荷，可改为双腿同时进行。","机器腿弯举":"若想增加自由重量感觉，可用哑铃或杠铃替代机器负荷，以提升肌肉参与度。"}', 'published', NOW(3), NOW(3));
SET @eid_213 = LAST_INSERT_ID();
-- Suggested muscle: 腘绳肌（股二头肌长头、半腱肌、半膜肌） (agonist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 股四头肌 (antagonist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃臀推', 'legs', 'dumbbell', 'intermediate', NULL, '1. 坐在地上，上背部靠在与膝盖同高的凳子边缘，双手握住哑铃两端，将哑铃放在髋部位置，双手辅助固定。\n2. 弯曲膝盖，双脚平放在地面，脚距与肩同宽，脚尖可略微外展。\n3. 收紧核心，臀部发力向上推，直到身体从肩膀到膝盖呈一条直线，哑铃位于髋部上方。\n4. 在顶峰位置保持1-2秒，充分收缩臀大肌。\n5. 有控制地缓慢下放髋部，直到几乎接触地面但不完全放下。\n6. 在底部位置稍作停顿后，再次发力向上推起，重复完成规定次数。', '1. 确保凳子或长椅稳固，不会滑动或倾倒，背部始终贴靠支撑物。\n2. 动作过程中保持核心收紧，避免腰部过度反弓导致腰椎压力过大。\n3. 控制动作节奏，避免使用惯性或弹震力，哑铃掉落可能造成伤害。', '1. 腰部过度下塌：髋部抬起高度不够或核心力量不足导致腰椎过度弯曲。\n2. 膝盖内扣：脚距过窄或发力时膝盖向内塌陷，增加膝关节压力。\n3. 肩部抬起：上背部离开支撑面，导致肩部承受额外压力且降低髋部发力效果。', '初学者可从徒手臀推开始建立动作模式，熟练后再逐步增加哑铃重量；如凳子高度不适，可选择不同高度的支撑面或使用瑜伽球靠墙进行练习；如感觉下背部压力过大，可适当降低动作幅度。', 'compound', '{"器械变体":"可使用杠铃替代哑铃，放在髋部位置，杠铃稳定性更好但对核心要求更高","难度降低变体":"可改为臀桥（双脚抬高放在凳子上），减少髋部活动范围","难度增加变体":"可在最高点进行单腿臀推或加入暂停技术增强肌肉刺激"}', 'published', NOW(3), NOW(3));
SET @eid_225 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 股二头肌 (synergist)
-- Suggested muscle: 半腱肌 (synergist)
-- Suggested muscle: 半膜肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 股四头肌 (antagonist)
-- Suggested muscle: 髂腰肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃行走弓步', 'legs', 'dumbbell', 'intermediate', NULL, '1. 站立，双脚与肩同宽，双手各持一只合适重量的哑铃，手臂自然下垂，掌心朝向身体两侧。\n2. 右脚向前迈出一步，屈膝下蹲至前腿大腿约与地面平行，后腿膝盖略微弯曲，脚尖轻轻触地，保持躯干直立，收紧核心。\n3. 保持上半身稳定，利用前脚掌推动地面，将重心向前转移，左脚顺势向前迈出，形成连续的步行弓步。\n4. 持续交替向前迈步，确保每一步都保持膝盖不超过脚尖，背部挺直，胸部微微前倾以保持平衡。\n5. 完成预定步数或距离后，回到起始姿势，双脚并拢，站立休息片刻，然后可重复或结束训练。', '确保地面平整、防滑，穿合适的运动鞋；哑铃重量适中，避免使用过重导致姿势失衡或关节受伤；保持核心收紧，避免腰部过度前倾或后仰。', '前腿膝盖内扣，形成膝盖内翻的姿势；上身前倾过度，导致背部压力增大；步幅过小或过大，导致髋部或膝部受力不均。', '初学者可先不持哑铃，徒手练习，待动作熟练后再逐步加入哑铃重量；如感到膝关节不适，可缩短步幅或改为原地弓步来降低冲击；高阶者可以手握更重哑铃，或在进行弓步时加入跳跃提升心肺刺激。', 'compound', '{"无哑铃行走弓步":"去掉哑铃，保持原有动作轨迹和步伐，可通过增加步数或步幅提升难度。","单腿行走弓步":"只用一条腿完成弓步，切换支撑腿，提高平衡和核心力量。","侧向行走弓步":"改为向侧面迈步，加入侧向髋部发力，刺激臀中肌。"}', 'published', NOW(3), NOW(3));
SET @eid_222 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腿后肌群 (antagonist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 核心肌群 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃过头深蹲', 'legs', 'dumbbell', 'advanced', NULL, '1. 起始姿势：双脚与肩同宽或略宽，脚尖略微外展，双手握住哑铃，双臂伸直举过头顶，手掌相对或稍向内，保持肩部稳定。\n2. 预备动作：收紧核心，背部挺直，肩胛骨轻微下沉，确保哑铃在头顶上方呈一直线。\n3. 下蹲：屈髋屈膝，重心下降，膝盖沿脚尖方向移动，保持胸部向上，背部挺直；尽量蹲至大腿与地面平行或更低，臀部向后坐。\n4. 呼吸控制：下蹲时吸气，保持腹压；在最低点保持1‑2秒。\n5. 上升：脚掌发力，伸展髋膝，将身体推回起始姿势，同时呼气；全程保持哑铃在头顶位置，不要前倾或后仰。\n6. 完成：重复规定次数后，缓慢将哑铃放回地面或换手休息。', '• 确保肩关节活动范围足够，若出现肩部不适或疼痛应立即停止。\n• 收紧核心并保持背部挺直，避免背部弓背导致腰椎受伤。\n• 使用合适的哑铃重量，防止因重量过大导致姿势失控或跌倒。', '• 膝盖内扣（膝盖向内移动），增加膝关节受伤风险。\n• 背部弓背或前倾，导致腰椎受压。\n• 哑铃位置不稳，出现耸肩或前倾，影响动作效果。', '• 初学者可先练习徒手过头深蹲或使用极轻的哑铃，逐步增加重量。
• 肩部活动受限者可在头顶使用宽握或借助弹力带辅助，以减轻肩部压力。
• 膝关节疼痛者可采用高脚跟站姿或使用垫子，减轻膝盖负荷。', 'compound', '{"徒手过头深蹲":"直接去掉哑铃，保持相同的动作轨迹和深度，重点强化核心与下肢协调。","单手持哑铃过头深蹲":"将双手握哑铃改为单手，保持肩部稳定，同时提高核心抗旋转难度。","哑铃胸前深蹲":"将哑铃置于胸前进行深蹲，降低肩部负荷，适合肩部受限或初学者。","哑铃侧举过头深蹲":"在保持过头姿势的同时进行轻量侧举，可增加肩部稳定性与上肢协同。","借助弹力带的过头深蹲":"使用弹力带固定哑铃位置，帮助保持手臂伸直并减轻肩部压力。","箱式过头深蹲":"在身后放置箱子或平台，控制下蹲深度，帮助新手建立正确的深度感。","高脚跟过头深蹲":"将脚跟抬高（使用垫子），有助于改善踝关节活动度，降低膝盖前压力。","双腿与单腿交替过头深蹲":"在保持过头姿势的前提下，交替进行单腿深蹲，提升平衡与核心控制。","哑铃过头深蹲加肩部外旋":"在保持过头的同时加入肩部外旋动作，增强肩袖肌群稳定性。","哑铃过头深蹲配合推肩":"在上升至站立后立即进行轻量推肩，形成复合动作，提高全身协同工作能力。"}', 'published', NOW(3), NOW(3));
SET @eid_223 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 三角肌（前束/中束） (stabilizer)
-- Suggested muscle: 小腿肌群（腓肠肌、比目鱼肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('器械弓步蹲', 'legs', 'machine', 'intermediate', NULL, '1. 调整器械座椅高度，使肩部把手与肩膀平齐；2. 站在器械平台上，双脚与肩同宽，膝盖微屈；3. 双手握住肩部把手，身体略微前倾保持平衡；4. 一只脚向前迈出一步，保持身体直立；5. 缓慢下蹲至前腿大腿与地面平行，后腿膝盖几乎触及地面；6. 通过前脚发力将身体推回起始位置，完成一次动作。', '确保器械轨道润滑顺畅，移动时保持平稳；动作过程中保持核心收紧，避免腰背过度前倾；出现关节疼痛时应立即停止练习。', '前跨步距离过小导致膝盖超过脚尖过大；下蹲时身体前倾过度造成腰部压力过大；动作速度过快，没有充分控制下降阶段。', '初学者可从较小的步幅开始练习，逐步增加跨步距离；可根据身高调整器械平台高度，确保舒适的运动范围；手握把手的位置可根据个人舒适度微调。', 'compound', '{"徒手变体":"可用哑铃或杠铃进行自由弓步蹲替代器械训练","难度降低":"可减少跨步距离或减小下蹲深度","难度提高":"可手持哑铃增加负重或进行保加利亚分腿蹲"}', 'published', NOW(3), NOW(3));
SET @eid_260 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('器械深蹲', 'legs', 'machine', 'beginner', NULL, '1. 调整机器座位和肩垫高度，使肩垫略高于肩膀，背部紧贴靠背。\n2. 站在机器踏板上，双脚与肩同宽或略宽，脚尖略微向外打开。\n3. 握住手柄，深吸一口气，收紧核心，缓慢屈膝下蹲，保持背部挺直，直至大腿与地面平行或略低于平行。\n4. 在最低点暂停1-2秒，确保膝盖不超过脚尖且膝盖方向与脚尖一致。\n5. 用腿部力量（主要是股四头肌和臀大肌）向上推回起始姿势，呼气。\n6. 完成预定次数后，缓慢将重量放回支撑位，取下安全锁。', '1. 确认机器各部件固定良好，轨道顺畅，重量在安全范围内。\n2. 始终保持膝盖与脚尖方向一致，避免膝盖内扣导致膝关节受伤。\n3. 下蹲深度应根据个人柔韧性和关节健康度自行调节，避免过度深蹲造成腰椎压力过大。', '1. 膝盖内扣或外翻，导致膝关节受力不均。\n2. 背部过度前倾或后仰，利用背部力量而非腿部发力。\n3. 下蹲幅度不够（仅做半蹲）或过深（超过个人舒适范围），影响训练效果和安全。', '1. 调整座椅高度，使大腿在起始位置时与地面基本平行。
2. 根据身高和腿部长度调节脚踏位置，确保双脚稳固支撑。
3. 选择合适的重量，初学者建议使用轻负荷，逐步适应后再增加重量。
4. 若感到腰部不适，可适当收紧核心或略微调高背垫角度。', 'compound', '{"自由深蹲":"在自由深蹲时，器械深蹲提供了固定轨迹，适合作为学习动作模式的入门练习，随后可逐步转为自由深蹲以增加核心参与。","哑铃深蹲":"哑铃深蹲要求更高的平衡感和核心控制，器械深蹲可帮助掌握下蹲技术，再过渡到哑铃负重以提升负荷。","自重深蹲":"自重深蹲是基础动作，器械深蹲在此基础上加入外部负荷，适合想要进阶训练强度但尚未掌握自由深蹲的练习者。"}', 'published', NOW(3), NOW(3));
SET @eid_259 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 腓肠肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('器械腿伸展坐姿', 'legs', 'machine', 'beginner', NULL, '1. 调整机器座椅高度，使膝盖与机器转轴平齐，双脚平放在脚垫上，背部紧贴靠背。\n2. 握住座位两侧的手柄，保持躯干稳定，避免用力前倾。\n3. 吸气时，缓慢伸展双腿至膝关节接近完全伸直，注意不要将膝盖锁死。\n4. 在最高点略微停顿1-2秒，感受股四头肌的收缩。\n5. 呼气时，缓慢屈膝回到起始位置，保持动作平稳，避免猛然下落。', '1. 使用前检查座椅和脚垫的锁定情况，确保设备稳固。\n2. 重量选择应从轻到重，逐步适应，避免一次性使用过重负荷。\n3. 若感到膝关节疼痛或不适，应立即停止练习并咨询专业教练或医生。', '1. 将脚跟抬起或用脚尖发力，导致股四头肌受力不均。\n2. 动作时使用冲力或快速伸展，导致关节冲击和肌肉控制不足。\n3. 完全锁死膝关节（过度伸展），增加膝关节压力。', '1. 座椅高度可调，确保膝盖转轴与机器轴线对齐，避免不必要的剪切力。
2. 靠背角度应提供足够支撑，保持背部自然弧度，防止腰椎过度屈曲。
3. 脚垫的倾斜角度可根据个人踝关节柔韧性微调，以舒适伸展为准。', 'isolation', '{"变体类型":"单腿腿伸展","转换建议":"在掌握双腿坐姿腿伸展后，可改为单腿进行，以增强平衡感和单侧股四头肌力量；也可将练习改为负重腿伸展或结合腿弯举的组合训练，以提升整体下肢力量和肌肉均衡。"}', 'published', NOW(3), NOW(3));
SET @eid_264 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 腘绳肌 (antagonist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 小腿三头肌（腓肠肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('器械腿弯举俯卧', 'legs', 'machine', 'beginner', NULL, '1. 调整机器坐垫高度，使膝盖正对垫子中心，脚踝垫紧贴小腿后侧。\n2. 俯卧在机器上，胸部贴在靠垫上，双手握住手柄保持平衡。\n3. 调整脚踝垫，使其紧贴踝关节，确保在动作全程不滑脱。\n4. 在吸气的同时，缓慢屈膝，将脚踝向臀部方向拉起，感受腘绳肌收缩。\n5. 在最高点（膝盖约呈90度）稍作停顿，然后呼气，缓慢放下重量回到起始位置。\n6. 完成设定的次数后，停止动作并安全取下脚踝垫。', '1. 确保机器的锁定装置已正确固定，防止在动作过程中意外滑脱。\n2. 动作全程保持背部平直，避免弓背或过度抬起臀部，以减少腰椎压力。\n3. 使用合适的重量，避免使用过重导致动作失控或姿势变形。', '1. 把脚踝垫放置过前或过后，导致膝关节受力不均或运动轨迹偏移。\n2. 在动作时抬起臀部或拱背，导致腰椎过度伸展并增加受伤风险。\n3. 动作速度过快，未能充分控制重量，失去对腘绳肌的有效刺激。', '根据个人身高调节坐垫高度，使膝盖对齐垫子中心；脚踝垫应紧贴踝关节且不压迫跟腱；若感觉膝关节压力过大，可适当向前移动脚踝垫或调低配重。', 'isolation', '{"坐姿腿弯举":"将身体改为坐姿，同样使用机器进行腿弯举，可更强调腘绳肌的上部纤维。","单腿腿弯举":"使用单腿进行俯卧腿弯举，可增加平衡要求和单侧肌群刺激。","绳索腿弯举":"用高位绳索代替机器，通过手握绳索进行跪姿或站姿腿弯举，增加核心参与。","哑铃腿弯举":"在地面或卧推凳上使用哑铃进行单腿弯举，适合在没有机器的情况下练习。"}', 'published', NOW(3), NOW(3));
SET @eid_262 = LAST_INSERT_ID();
-- Suggested muscle: 腘绳肌（股二头肌、半腱肌、半膜肌） (agonist)
-- Suggested muscle: 小腿三头肌（腓肠肌、比目鱼肌） (synergist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 竖脊肌（脊柱伸肌） (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 股四头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('器械腿弯举站姿', 'legs', 'machine', 'beginner', NULL, '1. 调整器械座椅高度，使脚踝垫对准小腿中部，膝盖略微弯曲；2. 站直身体，双手握住把手或抓住固定杆保持平衡；3. 吸气，收紧核心，缓慢屈膝将脚踝垫向臀部方向提升；4. 在最高点保持1-2秒，感受腘绳肌的收缩；5. 呼气，缓慢控制放回起始位置，膝盖不完全伸直以保持张力；6. 重复进行所需的次数。', '1. 使用前务必检查器械的调节和固定装置，确保垫子稳固不滑动；2. 保持背部挺直，避免过度前倾或后仰，以防腰背受伤；3. 选择合适的重量，避免因负荷过大而导致身体摆动或借力。', '1. 使用过重的负荷导致身体摆动、借力完成动作；2. 在动作过程中让髋部向前移动或后仰，失去对腘绳肌的专注；3. 膝盖完全伸直导致张力消失，或在下降时不控制速度。', '1. 根据个人身高调节座椅高度，使脚踝垫位于小腿上部；2. 调整背垫角度，使背部自然直立并贴合支撑；3. 如肩部或手臂不适，可使用手柄或扶手提供额外支撑。', 'isolation', '{"变体类型":"坐姿腿弯举","转换建议":"将机器调至坐姿模式，保持相似的动作轨迹，坐姿能更好地固定躯干，适合想要减轻背部负荷或改变发力角度的训练者。"}', 'published', NOW(3), NOW(3));
SET @eid_263 = LAST_INSERT_ID();
-- Suggested muscle: 腘绳肌（股二头肌） (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 股四头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('器械臀推', 'legs', 'machine', 'beginner', NULL, '1. 调整器械座椅高度，使垫子正好位于大腿上方靠近髋关节的位置，双脚平放在踏板上，膝盖约呈90度角。\n2. 身体紧贴靠背，双手握住机器两侧的手柄以保持稳定。\n3. 通过收缩臀部肌肉发力，将垫子向上推，直至髋关节完全伸展（身体从头部到膝盖呈一条直线），保持1-2秒的顶峰收缩。\n4. 缓慢而有控制地将臀部下降，回到起始姿势，确保下背部不出现过度拱起或塌陷。\n5. 完成预定的重复次数后，松开手柄并离开器械。', '1. 在使用器械前检查垫子和手柄是否锁定牢固，避免在动作过程中意外滑落。\n2. 动作全程保持核心收紧，避免使用腰部过度伸展来代偿，以防止下背受伤。\n3. 若感到髋关节或膝盖不适，应立即停止并咨询专业教练或医生。', '1. 臀部下沉幅度过大导致腰部过度屈曲，形成弓背。\n2. 在推起时使用腿部力量过多，导致臀部发力不足。\n3. 脚位过宽或过窄，导致髋关节外展或内收，影响动作的自然轨迹。', '1. 调整座椅高度使垫子位于大腿根部最舒适的部位，避免压迫会阴部。
2. 根据个人柔韧性调节踏板角度，使脚尖略向外展开，帮助更好地激活臀大肌。
3. 如需更深的伸展，可在起始位置稍微抬起臀部，保持轻微的伸展张力后再进行推起。', 'compound', '{"杠铃臀推":"使用杠铃进行臀推时，将杠铃置于髋部上方，双手握住杠铃两端，重量可逐步增加，适合想要提升负荷的进阶者。","哑铃单腿臀推":"双手各持一只哑铃，单腿置于踏板上进行臀推，可增强平衡性和单侧力量。","自重臀桥":"在地面或垫子上进行臀桥，虽负荷较低，但可作为热身或恢复阶段的替代动作。","绳索臀推":"使用高位绳索站姿进行臀推，能够提供恒定的张力，适合在健身房进行多样化的训练。"}', 'published', NOW(3), NOW(3));
SET @eid_261 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 股二头肌（腘绳肌） (synergist)
-- Suggested muscle: 股四头肌（股直肌） (synergist)
-- Suggested muscle: 髂腰肌 (antagonist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('坐姿小腿提踵机', 'legs', 'machine', 'beginner', NULL, '1. 调整坐姿小腿提踵机的座位高度，使大腿与地面基本平行，背部自然靠在靠背上，双脚平放在踏板上，膝盖略微弯曲。\n2. 将脚尖放在踏板的边缘，脚跟悬空，脚踝保持放松。双手握住手柄或扶手，以保持身体稳定。\n3. 呼气时，用脚尖向上推踏板，使脚跟向上抬起，尽量将脚踝伸展到最大范围，保持1-2秒的收缩。\n4. 吸气时，缓慢放下脚跟，回到起始位置，确保控制速度，不要让重量猛地砸下。\n5. 完成设定的次数后，轻轻放回踏板，松开手柄，离开机器。', '使用前检查机器的调节装置是否锁紧，防止座位或踏板在运动中滑动。,选择合适的负荷，初期以轻重量或无负荷练习，确保动作完整且受控。,保持背部紧贴靠背，避免在抬起脚跟时拱背或使用腰背力量，以防止脊柱受压。', '使用过大的重量导致动作幅度受限，只做半程提踵，降低训练效果。,动作过程中脚跟下降过快或失控，缺少离心的控制，易造成跟腱拉伤。,膝盖过度伸展或锁死，导致膝关节受力增加，出现不适或受伤风险。', '在坐好后，先将脚尖放在踏板前沿，调整座位高度使大腿与地面平行且膝盖略微弯曲；若感到背部支撑不足，可适当调节靠背倾斜角度；踏板的挡块位置应让脚跟自然悬空，避免脚踝过度背屈或跖屈。', 'isolation', '{"站姿小腿提踵机":"将机器换成站姿版本或使用哑铃、杠铃进行站姿提踵，增加负荷并调动更多腓肠肌纤维。","单腿提踵":"在坐姿机器上改为单腿站立进行提踵，可提升平衡感与单侧小腿力量。"}', 'published', NOW(3), NOW(3));
SET @eid_253 = LAST_INSERT_ID();
-- Suggested muscle: 腓肠肌 (agonist)
-- Suggested muscle: 比目鱼肌 (agonist)
-- Suggested muscle: 胫骨前肌 (antagonist)
-- Suggested muscle: 臀大肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('壶铃弓步', 'legs', 'other', 'intermediate', NULL, '1. 起始姿势：站立，双手握住壶铃手柄，壶铃靠在胸前，保持背部挺直，腹部收紧，双脚与肩同宽。\n2. 迈步：保持核心稳定，左脚向前迈出一大步，前脚的全脚掌着地，后脚抬起脚跟，仅脚尖着地，形成弓步姿势。\n3. 下蹲：屈膝下蹲，前膝在脚尖正上方且不超过脚尖，后膝向下接近地面但不完全着地，保持胸部抬起，壶铃保持靠近身体。\n4. 推回：前脚发力向上推回地面，恢复起始站立姿势，同时保持壶铃在胸前位置。\n5. 交替：完成后换另一侧腿重复动作，或在同一侧完成指定次数后换腿。', '1. 确保地面平整、防滑，穿合适的运动鞋，防止滑倒受伤。\n2. 壶铃要紧握并保持靠近胸部，避免因壶铃摆动导致肩部或背部受伤。\n3. 如出现膝关节疼痛或不适，应立即停止动作并寻求专业指导。', '1. 前膝过度前倾，超过脚尖，导致膝关节负荷过大。\n2. 身体前倾、胸部下降，使背部弯曲，增加腰椎压力。\n3. 步伐过大或过小，破坏平衡或导致姿势不稳。', '初学者可先使用轻量壶铃或徒手进行弓步，逐步适应后再负重；若膝关节有既往伤病，可缩短步伐宽度或将后膝轻触地面以减轻压力；进阶者可在弓步底部加入短暂的停顿，提高力量耐力。', 'compound', '{"哑铃弓步":"将哑铃换成壶铃，双手握住壶铃把手，壶铃保持在胸前位置，其他动作要点保持不变，即可完成壶铃弓步。"}', 'published', NOW(3), NOW(3));
SET @eid_291 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腿后肌群（腘绳肌） (synergist)
-- Suggested muscle: 小腿肌群 (stabilizer)
-- Suggested muscle: 核心肌群（腹横肌、腹直肌） (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('壶铃摆荡', 'legs', 'other', 'intermediate', NULL, '1. 双脚与肩同宽或略宽，脚尖略微外展，膝盖与脚尖同向，双手握住壶铃手柄，壶铃自然垂于双腿之间。\n2. 进入髋铰链预备姿势：臀部向后推，膝盖轻微弯曲，背部保持平直，眼睛注视前方。\n3. 爆发用力：臀部快速向前推，同时膝盖伸直，利用髋部伸展产生的力量将壶铃向前摆荡，手臂在壶铃上升时略微弯曲，保持肩部放松。\n4. 最高点：壶铃升至胸部或肩部高度，手臂基本伸直，身体保持直立，胸部略向前倾，核心紧绷。\n5. 下降控制：在壶铃下落时，臀部再次向后坐，膝盖微屈，缓冲冲击，让壶铃自然回到起始位置，准备下一次摆荡。\n6. 重复进行：保持呼气上升、吸气下降的节奏，动作连贯且无停顿。', '1. 保持背部自然弧度，避免过度弯腰导致腰椎受伤。\n2. 使用适当重量的壶铃，防止因负荷过大导致姿势失控。\n3. 在空旷且地面平整的场所练习，避免碰到障碍物。', '1. 依赖手臂力量抬起壶铃，导致肩部过度负荷。\n2. 膝盖过度前移，形成‘蹲’而非‘髋铰链’，增加膝关节压力。\n3. 在最高点时背部后仰或拱背，导致腰椎受压。', '1. 初学者可先练习徒手髋铰链，感受臀部发力模式，再加入壶铃。
2. 背部不适者可减小摆荡幅度，保持壶铃在膝部以下，避免过度伸展。
3. 站距可调：宽站距提供更稳支撑，窄站距则更强调股四头肌参与。', 'compound', '{"变体类型":"单手壶铃摆荡","转换建议":"在掌握双手壶铃摆荡后，可尝试单手交替进行，以增强核心稳定性和肩部力量；如想进一步强化臀部，可将壶铃摆荡转换为硬拉或臀冲动作。"}', 'published', NOW(3), NOW(3));
SET @eid_290 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 股二头肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 三角肌前束 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('壶铃深蹲', 'legs', 'other', 'intermediate', NULL, '1. 站立，双脚与肩同宽，脚尖略微外展，双手握住壶铃，壶铃可放在胸前或两侧，保持自然呼吸。\n2. 收紧核心，背部保持直立或轻微自然弓背，胸部向上挺起，肩胛骨微微收紧。\n3. 臀部向后推，屈膝屈髋，缓慢下蹲；下蹲至大腿上缘与地面平行或略低，膝盖始终指向脚尖方向，避免内翻。\n4. 在最低点保持1-2秒，感受臀部和股四头肌的拉伸与张力。\n5. 通过脚后跟和前脚掌用力蹬地，推动身体回到起始姿势，同时收紧臀部。\n6. 在动作顶端略微收紧臀部并保持姿势，然后进行下一轮重复。', '1. 确保膝盖方向始终与脚尖一致，避免膝盖内翻导致关节损伤。\n2. 保持背部挺直，避免弓背或塌腰，以保护脊柱。\n3. 使用合适重量的壶铃，避免因负荷过大导致失去平衡或姿势失控。', '1. 膝盖向内移动（内翻），容易导致膝关节压力过大。\n2. 脚后跟抬起或站立不稳，导致重心前移，增加踝关节和腰椎负担。\n3. 下蹲深度不足或只做半蹲，削弱对臀大肌和股四头肌的刺激。', '1. 若肩部活动受限，可将壶铃握在胸前或使用较短的把手，保持上肢放松。
2. 对于下背疼痛，可尝试在高脚位（如站在垫子上）进行深蹲，以减轻腰椎压力。
3. 如想增加难度，可在深蹲最低点暂停2-3秒，或使用更重的壶铃进行递增训练。', 'compound', '{"哑铃深蹲":"将壶铃替换为哑铃，双手持哑铃置于身体两侧，保持相同的站距和下蹲深度，注意手臂自然下垂。","杠铃背蹲":"将壶铃换成杠铃，杠铃置于斜方肌后侧，握距略宽于肩，保持背部中立并进行深蹲。","单腿壶铃深蹲":"将双腿站距调整为单腿支撑，保持躯干直立，手握壶铃置于胸前或单手握住，以提高核心稳定性和平衡挑战。"}', 'published', NOW(3), NOW(3));
SET @eid_289 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 大收肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 腓肠肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('安全杠深蹲', 'legs', 'barbell', 'intermediate', NULL, '1. 站在安全杠下方，双脚与肩同宽，脚尖略微外展。\n2. 将安全杠放置在上背部的安全托上，握距略宽于肩，手掌向上。\n3. 吸气时收紧核心，臀部向后推，屈膝下蹲，保持胸部向上，背部挺直。\n4. 下降到臀部略低于膝盖的高度，或根据个人柔韧性达到舒适的下蹲深度。\n5. 在底部稍作停顿，然后呼气，使用臀大肌和股四头肌的力量向上推起，回到起始姿势。\n6. 重复进行规定的次数。', '1. 确保安全杠的支架稳固，杠铃与肩部保持合适的高度，避免压迫颈部。\n2. 始终保持胸部向上、脊柱中立，避免在下降过程中出现圆背。\n3. 如感到膝关节或下背部不适，应立即停止并咨询专业人士。', '1. 膝盖过度前倾（膝盖超过脚尖），导致膝关节负担过大。\n2. 下蹲时背部弓起或圆背，增加腰椎受伤风险。\n3. 站起时只用腿部力量，忽视臀部和核心的协同发力。', '可根据个人柔韧性调节脚尖外展角度；若肩部活动受限，可稍微收窄握距或使用更宽的杠铃托架。', 'compound', '{"传统杠铃深蹲":"将安全杠替换为普通杠铃，保持相同的站距和深度，注意肩部舒适度。","前蹲":"将杠铃放置在胸前，保持核心紧绷，适合想要更多股四头肌刺激的练习者。"}', 'published', NOW(3), NOW(3));
SET @eid_193 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 内收肌群 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 腓肠肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('小腿提踵', 'legs', 'bodyweight', 'beginner', NULL, '1. 站直，双脚与肩同宽，脚尖稍向外展开，保持身体平衡，可扶墙或椅子以防失衡。\n2. 缓慢抬起脚跟，尽量向上用前脚掌支撑，感受小腿后侧肌肉收紧，在最高点保持约1‑2秒。\n3. 缓慢放下脚跟，回到起始位置，确保控制速度，不猛然下落。\n4. 重复上述动作，完成设定的次数后，休息30秒再进行下一组。\n5. 如需进阶，可在抬起时尝试单腿提踵，以增加难度和平衡要求。', '1. 运动前先做踝关节热身，如踝关节旋转和轻幅度的踮脚动作，防止拉伤。\n2. 抓握固定物体（如墙、椅背）保持平衡，防止摔倒。\n3. 动作全程保持肌肉张力，避免使用冲力或猛然下放，以保护跟腱和膝关节。', '1. 只做半程动作，抬升幅度不足，导致小腿肌群刺激不充分。\n2. 身体过度前倾或后仰，导致重心不稳并增加下背部压力。\n3. 过度依赖手臂支撑，削弱了对小腿的独立锻炼效果。', '可通过以下方式调整动作难度：单腿提踵增加平衡和力量需求；双手握哑铃或杠铃进行负重提踵；使用踏板或台阶进行站姿提踵以加深下降幅度；坐姿提踵则侧重比目鱼肌的锻炼。', 'isolation', '{"单腿提踵":"将一只脚抬起，仅用另一只脚完成提踵动作，可增强单腿力量和踝关节稳定性。","坐姿提踵":"坐在椅子或凳子上，双手扶住凳子，进行提踵，主要刺激比目鱼肌。","负重提踵":"双手握哑铃、杠铃或壶铃，增加踝关节负荷，提升小腿肌肉力量。","台阶提踵":"站在稳固的台阶或踏板上，脚步部分悬空，下放时让脚跟低于平台平面，增加动作幅度。"}', 'published', NOW(3), NOW(3));
SET @eid_278 = LAST_INSERT_ID();
-- Suggested muscle: 腓肠肌 (agonist)
-- Suggested muscle: 比目鱼肌 (synergist)
-- Suggested muscle: 胫前肌 (antagonist)
-- Suggested muscle: 腓骨长肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('小腿提踵机', 'legs', 'machine', 'beginner', NULL, '1. 调整机器的脚踏位置，使脚尖位于平台的前缘，脚跟悬空。\n2. 双手握住机器的手柄，保持背部挺直，肩膀放松。\n3. 通过脚尖向上推起脚跟，直到小腿完全收缩，感受腓肠肌的紧绷，保持顶峰收缩1-2秒。\n4. 缓慢放下脚跟，回到起始位置，保持控制，避免快速下落。\n5. 重复进行设定的次数，如感到疲劳可适当减重或暂停休息。', '确保机器的调节螺栓和支撑部件已固定，避免使用过程中出现滑脱。,保持脊柱自然直立，避免过度弓背或前倾，以防止下背部受伤。,在上升和下降阶段都要控制动作速度，切勿使用弹力或突然的冲击力。', '脚跟下降不够低，导致腓肠肌未充分伸展。,身体过度前倾或利用背部、膝盖的力量来完成动作，失去对小腿的孤立刺激。,使用过重的负荷，导致动作幅度不足或姿势失控。', '根据个人身高和脚长调节脚踏的前后位置，使脚尖与平台边缘对齐；调节靠背或手柄高度，确保在起始姿势时背部挺直且手臂舒适；若机器配有重量堆，可先从轻重量开始，逐步增加至适合自己的负荷。', 'isolation', '{"站姿提踵":"可使用自由杠铃或哑铃进行站姿提踵，以增加平衡和核心参与。","单腿提踵":"在机器上改用单腿模式或转到单腿提踵机，提升单侧肌肉力量的均衡性。","坐姿提踵":"使用坐姿提踵机或在家坐在椅子上进行坐姿提踵，重点刺激比目鱼肌。"}', 'published', NOW(3), NOW(3));
SET @eid_252 = LAST_INSERT_ID();
-- Suggested muscle: 腓肠肌 (agonist)
-- Suggested muscle: 比目鱼肌 (synergist)
-- Suggested muscle: 前胫肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('屈腿硬拉', 'legs', 'barbell', 'intermediate', NULL, '1. 站姿准备：双脚与肩同宽，脚尖稍微外展，双手握杠铃（握距略宽于肩），手臂自然垂直于身体两侧，杠铃置于大腿前侧。\n2. 屈腿起始姿势：保持背部平直或自然弧度，膝盖微微弯曲（约15-20度），臀部向后推，重心略后移，像做半深蹲的起始动作。\n3. 髋铰链下放：主要通过髋关节的伸展（臀部主导）将杠铃沿大腿前侧向下移动，手臂保持伸直，杠铃尽量贴近身体，避免大幅度的膝盖屈曲。\n4. 下降到合适位置：杠铃降至小腿中部或略低于膝盖位置时，感受大腿后侧的拉伸，暂停约1秒。\n5. 向上发力：利用臀部和大腿后侧的力量驱动髋部向前推，回到起始姿势；在整个动作中保持胸部抬起、肩胛收紧，呼吸要配合（下放时吸气，起身时呼气）。\n6. 完成动作后，平稳放下杠铃或将杠铃放回杠铃架，防止猛摔。', '1. 动作全程保持背部平直或自然弧度，避免圆背，以防腰椎受伤。\n2. 使用适当的重量并最好有训练伙伴或教练在旁监督，防止失去平衡导致摔杠。\n3. 下放杠铃时要保持控制，避免弹起或猛然下落；若出现腰部或膝关节不适，应立即停止并调整姿势或降低重量。', '1. 膝盖过度弯曲或把杠铃拉得太低，使膝关节承受过多剪切力。\n2. 圆背或肩胛不稳定，导致背部受力过大，增加受伤风险。\n3. 在动作中使用手臂力量拉动杠铃，忽略了髋关节的主导作用。', '1. 初学者建议先用空杠或轻重量练习髋铰链，重点关注背部姿态和动作轨迹。
2. 如有膝关节不适，可将膝盖稍微多弯一点，以减少膝关节的压力。
3. 想提升难度，可在杠铃上加配重块，或尝试单腿屈腿硬拉，以增强核心和单侧臀部力量。', 'compound', '{"标准硬拉":"将膝盖完全伸直改为轻微弯曲，保持髋关节主导，动作范围略有不同，可作为过渡练习。","单腿屈腿硬拉":"单脚支撑进行，可提升平衡感、核心稳定性以及单侧臀部力量。","哑铃屈腿硬拉":"使用哑铃代替杠铃，增加手臂自由度，适合肩部或腕部有特殊需求的训练者。"}', 'published', NOW(3), NOW(3));
SET @eid_200 = LAST_INSERT_ID();
-- Suggested muscle: 大臀肌 (agonist)
-- Suggested muscle: 腿二头肌（腘绳肌） (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 腓肠肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('弓步蹲', 'legs', 'bodyweight', 'beginner', NULL, '1. 起始姿势：双脚与肩同宽站立，双手可放在腰部或胸前，保持身体正直，目视前方。\n2. 右脚向前迈出一大步，距离约为身高的一半，脚尖朝前，膝盖微微弯曲。\n3. 保持核心收紧，躯干直立，缓缓屈膝下蹲，直到前腿的大腿与地面接近平行，后腿的膝盖几乎触及地面。\n4. 注意前膝不超过脚尖，且膝盖与脚尖方向一致，后脚跟可抬起以脚尖支撑。\n5. 通过前脚的脚后跟和前脚掌发力，将身体向上推起，回到起始姿势。\n6. 换另一侧腿重复相同动作，完成指定次数或交替进行。', '1. 下蹲时始终保持膝盖与脚尖方向一致，避免膝盖内扣导致膝关节损伤。\n2. 确保前膝不超过脚尖过多，以减少对膝关节的压力和负担。\n3. 保持背部挺直，避免驼背或过度前倾，保持核心稳定以保护腰椎。', '1. 前膝过度前伸，超过脚尖过多，增加膝关节压力。\n2. 后腿落地时膝盖直接撞击地面且位置不稳，容易造成膝盖不适。\n3. 身体前倾过多，重心偏向脚尖，影响动作稳定性和锻炼效果。', '初学者可将步幅适当缩短以降低难度，或采用较小的下蹲深度；进阶者可增加步幅和下蹲深度提升挑战；如需降低难度，可在身后放一把椅子辅助保持平衡或将后膝轻轻点地；手腕或肩部有问题的练习者，可将双手自然垂放于身体两侧。', 'compound', '{"静态弓步蹲":"保持弓步姿势不动，增加腿部耐力和核心稳定性训练","步行弓步蹲":"向前迈步后继续前进而非回原位，增加动作动态性和协调性","跳跃弓步蹲":"完成下蹲后爆发性跳起并交换双腿，提升爆发力和心肺挑战","侧向弓步蹲":"侧向迈步而非向前，增加髋部内收肌群和侧向稳定性训练","负重弓步蹲":"双手持哑铃或杠铃增加负荷，强化力量训练效果"}', 'published', NOW(3), NOW(3));
SET @eid_267 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 小腿肌群 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 臀中肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('弹力带深蹲', 'legs', 'other', 'beginner', NULL, '1. 站立，双脚与肩同宽，脚尖稍微外展，将弹力带环绕大腿上部并固定好位置。\n2. 收紧核心，保持背部挺直，肩胛骨微微后收，目光平视前方。\n3. 屈髋屈膝，像坐椅子一样向后坐，保持膝盖对齐脚尖，避免膝盖向内扣。\n4. 下降至大腿与地面平行或略低，臀部略微后移，膝盖不超过脚尖。\n5. 脚掌用力蹬地，恢复站姿，同时呼气。\n6. 重复以上动作，保持动作连贯，核心始终保持紧张。', '1. 检查弹力带是否完好无损，避免弹力失效导致受伤。\n2. 保持膝盖对齐脚尖，防止膝关节过度扭伤。\n3. 在平稳且有一定摩擦力的地面上进行，避免滑倒或失去平衡。', '1. 膝盖向内扣（膝盖内收），增加膝关节压力。\n2. 下蹲深度不足，未达到大腿与地面平行，削弱锻炼效果。\n3. 背部过度前倾或塌腰，导致腰椎受压。', '1. 平衡感不足时，可先扶墙或使用椅子辅助，保持身体稳定。
2. 可以在脚后放置小凳子限制下蹲深度，防止过度深蹲。
3. 调整站距（稍宽或稍窄）或弹力带阻力，以适应个人的柔韧性和力量水平。', 'compound', '{"单腿弹力带深蹲":"将弹力带固定在脚踝处，另一侧扶墙或使用固定点保持平衡，可提升单侧力量和平衡感。","高脚杯弹力带深蹲":"将弹力带套在胸前，双手握住弹力带两端以增加胸前阻力，有助于强化核心并保持上半身直立。","深蹲+侧向踢":"在深蹲最低点时加入侧向踢腿动作，可同时锻炼髋外展肌群。"}', 'published', NOW(3), NOW(3));
SET @eid_293 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 髋内收肌 (synergist)
-- Suggested muscle: 腓肠肌 (stabilizer)
-- Suggested muscle: 核心肌群 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('弹力带腿伸展', 'legs', 'other', 'beginner', NULL, '1. 站姿，双脚与肩同宽，将弹力带固定在脚踝处，另一端用手握住或固定在稳固的物体上。\n2. 保持核心收紧，背部挺直，微微屈膝支撑身体重量，确保上半身不前倾。\n3. 吸气时，利用脚尖勾住弹力带，缓慢向前伸展膝关节，直到腿部接近伸直（但不锁死），感受股四头肌的收缩。\n4. 在最高点保持约1-2秒，感受肌肉紧张。\n5. 呼气时，缓慢将腿放回起始位置，保持弹力带的张力不要完全放松。\n6. 完成指定次数后换另一条腿重复动作。', '1. 使用前检查弹力带是否有裂纹或磨损，防止弹力带断裂弹回伤到身体。\n2. 动作全程保持膝盖微屈，避免完全锁死，以减轻膝关节压力。\n3. 保持上半身直立，避免弯腰驼背导致背部受伤。', '1. 使用弹力带过重导致动作失控或姿势塌陷。\n2. 动作过快，没有控制好张力，导致肌肉刺激不足并增加受伤风险。\n3. 伸展时膝盖完全锁死或过度伸展，使膝关节承受过大压力。', '1. 如力量不足，可选择弹性更大的轻带或改为坐姿进行腿伸展。
2. 如想增加难度，可将弹力带固定在更高位置或同时使用双腿进行伸展。
3. 若感到膝盖不适，可减小伸展角度或改用侧向腿伸展来减轻压力。', 'isolation', '{"变体类型":"单腿/双腿、站姿/坐姿、正向/侧向"}', 'published', NOW(3), NOW(3));
SET @eid_295 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (antagonist)
-- Suggested muscle: 髂腰肌 (stabilizer)
-- Suggested muscle: 核心肌群（腹肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('弹力带腿弯举', 'legs', 'other', 'beginner', NULL, '1. 站姿，双脚与肩同宽，脚尖朝前，保持核心收紧，上半身直立。\n2. 将弹力带的一端固定在稳固的支撑点（如门把手或固定柱），另一端套在需要训练的脚踝上。\n3. 保持支撑腿（不训练腿）微微弯曲，脚尖着地，确保身体平衡。\n4. 以训练腿为核心，慢慢屈膝，将脚踝向臀部方向拉起，感受到大腿后侧（腘绳肌）用力收缩。\n5. 在最高点稍作停顿，确保收缩感最强，然后缓慢放回初始位置，保持对肌肉的控制。\n6. 完成预定次数后，换另一条腿重复训练。', '1. 确保弹力带完好无损，无裂纹或磨损，避免弹力带断裂导致伤害。\n2. 训练时保持背部挺直，避免弯腰或拱背，以防止下背部受伤。\n3. 动作全程要控制速度，避免使用惯性或猛然拉动，以减少关节压力。', '1. 在卷腿时弯腰或拱背，导致腰椎过度负荷。\n2. 使用过重的弹力带导致腿部晃动或失去平衡，影响训练效果。\n3. 动作过程过快，缺少对腘绳肌的收缩感受，降低训练强度。', '1. 若感到腰部不适，可在脚下垫上垫子或使用矮凳来降低动作幅度。
2. 弹力带张力不足时，可通过更换阻力更大的带子或调节脚踝套环的松紧度来增加负荷。
3. 为提高稳定性，可在训练腿的对侧放置固定扶手或靠墙站立。', 'isolation', '{"站姿弹力带腿弯举":"如果想要更大的负荷，可改用哑铃或机械腿弯举器械，只需在脚踝处挂载哑铃或调节器械阻力即可。","坐姿弹力带腿弯举":"将弹力带固定在稳固的支撑点后，坐在椅子上进行腿弯举，注意保持背部直立，可在椅背加垫子以提供支撑。","双侧同步腿弯举":"在双脚同时套上弹力带进行同步弯曲，提升训练强度，需要确保弹力带有足够的弹性并保持平衡。"}', 'published', NOW(3), NOW(3));
SET @eid_294 = LAST_INSERT_ID();
-- Suggested muscle: 股二头肌（腘绳肌） (agonist)
-- Suggested muscle: 腓肠肌（小腿三头肌） (synergist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 股四头肌 (antagonist)
-- Suggested muscle: 核心肌群（腹肌、背阔肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('徒手深蹲', 'legs', 'bodyweight', 'beginner', NULL, '1. 站立姿势，双脚与肩同宽或略宽，脚尖略微外展，保持身体直立，目视前方，双手可放在身体两侧或交叉置于胸前。\n2. 深吸一口气，收紧核心肌群，保持胸部挺起，缓慢屈膝并向后坐。\n3. 继续下蹲，确保膝盖与脚尖方向一致，避免膝盖内扣，蹲至大腿与地面平行或略低的位置。\n4. 在下蹲最低点时，保持背部挺直，重心均匀分布在双脚中间。\n5. 呼气，通过脚后跟和前脚掌发力，蹬地起身，恢复到起始站立姿势。\n6. 重复完成指定次数，注意保持呼吸节奏和动作连贯性。', '确保训练场地平坦，地面干燥防滑，防止滑倒受伤。', '腰部弓背：起身或下蹲时腰部弯曲，导致腰椎压力过大，应始终收紧核心保持背部平直。', '初学者可以先进行半蹲，逐步增加下蹲深度，提高柔韧性和力量后再进行完整深蹲。膝盖有不适者可减少下蹲幅度，或将双脚放置稍宽以减轻膝盖压力。如果踝关节灵活性不足，可以在脚跟下垫一个垫片或小杠铃片，帮助保持身体平衡。', 'compound', '{"变体类型":"可转换为单腿深蹲（提高平衡性和单侧力量），分腿蹲（增强核心稳定性和髋关节灵活性），深蹲跳（增加爆发力训练），或借助哑铃、杠铃增加负重进行负重深蹲。","降低难度":"可以借助椅子辅助，在下蹲时轻触椅子边缘帮助定位深度，或者减少下蹲幅度至大腿与地面平行即可。","提高难度":"可以放慢动作节奏，增加下蹲后的静蹲时间，或者进行深蹲跳、快速深蹲等变体来增强训练强度。"}', 'published', NOW(3), NOW(3));
SET @eid_265 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 髋内收肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 小腿肌群 (stabilizer)
-- Suggested muscle: 髂腰肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('战绳深蹲跳', 'legs', 'other', 'intermediate', NULL, '1. 准备姿势：双脚与肩同宽站立，双手握住战绳两端，绳子自然垂于身体两侧；2. 预备动作：略微弯曲膝盖，收紧核心，将战绳抬至胸前，准备发力；3. 下蹲：臀部向后坐，膝盖弯曲至大腿约与地面平行或略低于平行，保持胸部挺直，重心放在脚跟；4. 爆发起跳：在下蹲底部快速伸展髋、膝、踝三关节，同时用力向上摆动战绳，产生向上的冲力，使身体离地；5. 空中姿态：保持膝盖微屈，脚尖指向地面，控制身体平衡，继续将战绳向下摆动以保持张力；6. 落地缓冲：双脚平稳着地，膝盖微弯，吸收冲击力，立即进入下一个深蹲准备阶段。', '1. 充分热身，特别是下肢和核心，避免肌肉拉伤；2. 保持膝盖与脚尖方向一致，防止膝盖内翻导致扭伤；3. 落地时控制冲击，避免硬着陆，可使用软垫或地面草坪减轻关节压力。', '1. 只做半蹲而未达到足够的深度，导致力量输出不足；2. 起跳时过度依赖手臂力量，忽视下肢的爆发力，使动作不稳定；3. 落地时脚跟抬起或膝盖过度伸展，增加膝盖压力。', '1. 初学者可先进行无绳深蹲跳，熟练后再加入战绳以提升难度；2. 关节不适时降低跳跃高度，采用原地深蹲或踏步跳；3. 调整战绳长度或张力，使用较短的绳子或减小张力以降低难度。', 'compound', '{"无绳深蹲跳":"先不握绳完成相同的深蹲跳动作，重点放在下肢力量和跳跃技术；熟练后再加入战绳，以提升核心参与和整体强度。","单腿深蹲跳":"抬起一条腿，仅用另一条腿完成深蹲跳，可增强单侧力量和平衡感，适合作为进阶变体。"}', 'published', NOW(3), NOW(3));
SET @eid_298 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 小腿肌群 (synergist)
-- Suggested muscle: 髋屈肌 (synergist)
-- Suggested muscle: 核心肌群 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('手枪深蹲', 'legs', 'barbell', 'advanced', NULL, '1. 初始姿势：双手握住杠铃，杠铃放在上背部（斜方肌上），双脚分开与肩同宽，脚尖略微外展。\n2. 抬起左腿，将左脚抬离地面，保持右腿伸直，整个身体重心放在右腿上。保持胸部抬起、核心收紧。\n3. 缓慢屈右膝和髋部，降低身体，保持右膝不超过脚尖太多，背部保持平直，目视前方。\n4. 继续下降至右大腿与地面平行或更低，同时左腿保持伸直并稍微向上抬起以保持平衡。\n5. 在最低点稍作停顿，然后通过右腿发力，伸展膝和髋部，将身体推回起始站立姿势。\n6. 完成所需次数后，换腿重复动作，或根据训练计划交替进行。', '1. 确保使用适当重量的杠铃，避免负荷过重导致失去平衡。\n2. 练习前务必进行充分的下肢热身和髋、踝关节活动度训练，防止扭伤。\n3. 若出现膝盖内扣或背部过度前倾，应立即停止并纠正姿势，必要时降低重量或使用辅助装置。', '1. 膝盖过度内收（内扣），导致膝关节压力增大。\n2. 上身前倾过度或背部下凹，使核心失去支撑，增加腰椎受伤风险。\n3. 下降速度过快，未能控制动作幅度，导致失去平衡或摔倒。', '1. 若踝关节活动度不足，可在脚跟下垫小垫块或使用举重鞋帮助保持平衡。
2. 灵活性或力量不足时，可先在箱子或椅子旁进行辅助手枪深蹲，逐步降低支撑高度。
3. 使用腰带或护膝可以提供额外的核心支撑和膝部保护，尤其在负重较大时。', 'compound', '{"辅助手枪深蹲":"在箱子或椅子旁放置支撑物，先用支撑帮助完成动作，随后逐渐降低支撑高度，直至无支撑。","负重手枪深蹲":"在完成基本手枪深蹲后，可在肩上扛杠铃或哑铃进行负重练习，注意保持核心紧绷，避免重量导致姿势失控。","单腿深蹲变体":"如果无法完成完整的手枪深蹲，可尝试半程深蹲或使用弹力带辅助，逐步提升深度和力量。"}', 'published', NOW(3), NOW(3));
SET @eid_204 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 臀中肌/臀小肌 (stabilizer)
-- Suggested muscle: 核心肌群（腹直肌、腹横肌） (stabilizer)
-- Suggested muscle: 小腿肌群（腓肠肌、比目鱼肌） (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 背部竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('早安式', 'legs', 'barbell', 'intermediate', NULL, '1. 站姿准备，双脚与肩同宽，脚尖稍微外展，保持膝盖微屈。\n2. 将杠铃横置于上背部（斜方肌上部），双手握杠，握距略宽于肩，手肘稍微向前。\n3. 收紧核心和臀部，保持胸部抬起，以臀部为铰链，缓慢向前倾上体，保持背部平直，避免弓背。\n4. 当躯干接近与地面平行或感受到大腿后侧的适度拉伸时，暂停1-2秒。\n5. 通过臀部和大腿后侧的力量，驱动身体回到起始站立姿势，保持动作连贯，避免猛然弹起。\n6. 完成预定次数后，平稳放下杠铃，或请同伴帮助安全卸杠。', '保持脊柱中立，避免在向前倾时出现圆背或过度弓背，以免造成腰部受伤。\n使用合适的重量，建议在有经验的伙伴或教练的监督下进行，以防失衡导致跌倒。\n热身要充分，尤其是针对腿后侧、臀部和下背的活动度热身，以降低肌肉拉伤风险。', '臀部过度后推导致膝盖过度屈曲，使前膝压力过大。\n动作过程中背部弓起或塌腰，导致腰椎受到不良剪切力。\n使用过大的重量导致动作失控，出现弹起或甩杠的现象。', '若下背柔韧性不足，可先使用哑铃或轻杠铃练习，并适当减小前倾角度。
初学者可在无负荷的情况下先练习动作模式，确保姿势正确后再逐步加重。
进阶者可以进行单腿早安式或使用加重背心的方式提升难度。', 'compound', '{"徒手变体":"在不持杠铃的情况下进行早安式，双手可交叉置于胸前或轻扶支撑物，以维持身体平衡。","哑铃变体":"双手各持一个哑铃，位置放在肩膀两侧，保持上背部的支撑点，执行相同的臀部铰链动作。","单腿变体":"单腿站立进行早安式，需要更强的核心和髋部稳定性，可先在扶手下进行，逐步独立完成。","器械辅助变体":"在臀部训练机或腿弯举机上使用固定轨迹进行早安式，帮助控制运动范围并减少平衡难度。"}', 'published', NOW(3), NOW(3));
SET @eid_201 = LAST_INSERT_ID();
-- Suggested muscle: 股二头肌（腘绳肌） (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 内收肌群 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('暂停深蹲', 'legs', 'barbell', 'advanced', NULL, '1. 起始姿势：站立，双脚与肩同宽或略宽，脚尖轻微外展。将杠铃置于上背部（斜方肌上），双手握杠，握距略宽于肩，收紧肩胛骨，保持胸部向上。\n2. 深吸气并收紧腹部，保持核心稳定，屈膝屈髋，开始下蹲。\n3. 继续下降至大腿面至少低于水平面（或根据个人柔韧度），在底部位置暂停2–3秒，确保胸部抬起、背部挺直、膝盖与脚尖方向一致。\n4. 暂停结束后，通过脚跟和脚掌同时发力，将身体推起，恢复起始站立姿势，同时呼气。\n5. 完成预定次数后，将杠铃安全放回支架。每次动作保持相同的下蹲深度和暂停时间。', '1. 确保杠铃稳固放在上背部，避免滑落；使用安全锁扣和支架。\n2. 下蹲过程中始终保持脊柱自然弧度，避免出现驼背或过度前倾。\n3. 底部暂停时不要完全锁住膝关节，保持轻微弯曲，以防膝关节受伤。', '1. 膝盖内翻或外翻，导致膝关节受力不均。\n2. 暂停时间不足或不稳，失去对核心的控制，增加受伤风险。\n3. 上背部未收紧导致杠铃滑动或肩部受压，影响动作稳定性。', '1. 肩部活动受限时，可将杠铃置于前三角肌（前蹲位置）或使用高位深蹲架。
2. 踝关节灵活性不足时，可在脚后跟垫上垫板或穿举重鞋以提升踝背屈。
3. 暂停时间可根据训练目标调节，1–3秒不等；初期建议2秒，逐步延长时间。', 'compound', '{"无器械深蹲":"使用自身体重进行深蹲，保持相同的下蹲深度和暂停时间，重点强化动作控制和核心稳定。","哑铃深蹲":"双手握哑铃置于肩侧，执行相同的暂停深蹲，注意哑铃重量均匀分布，保持上背部挺直。","前蹲":"将杠铃移至胸前，进行前蹲式暂停深蹲，强调上背部挺直和股四头肌的参与。","腿举机深蹲":"在腿举机上进行暂停深蹲，可调节负重，适合初学者或康复训练，仍需保持底部暂停和控制。","高脚杯深蹲":"双手握住哑铃或壶铃置于胸前，执行暂停深蹲，帮助改善上身前倾和核心参与。","箱式深蹲":"在箱子或凳子上进行深蹲后坐到底部并暂停，提升底部起点的力量和稳定性。"}', 'published', NOW(3), NOW(3));
SET @eid_191 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 大收肌 (synergist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 脊柱竖肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 斜方肌（上背部） (stabilizer)
-- Suggested muscle: 髂腰肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('杠铃弓步蹲', 'legs', 'barbell', 'intermediate', NULL, '1. 站姿准备，将杠铃平稳置于上背部（斜方肌），双脚与肩同宽，双手握杠略宽于肩，保持背部挺直，核心收紧。\n2. 先向前迈出一步（前脚），脚尖指向前方，后脚脚尖稍微外展，保持身体自然平衡。\n3. 缓慢屈膝下蹲，臀部向后下方移动，躯干保持直立，前侧膝盖保持在脚尖正上方，避免膝盖过度前移。下降到前侧大腿与地面接近平行或略低于90°，后侧膝盖接近但不触碰地面。\n4. 在最低点稍作停顿后，主要通过前脚脚跟向上蹬地，伸展髋关节和膝关节，将身体推回起始站立姿势，注意后脚随即回到原位。\n5. 完成一次后换另一侧腿进行，或者在完成一组设定次数后交替进行。保持全程动作流畅、呼吸均匀（下降吸气、上升呼气），避免弹跳或猛然发力。', '1. 正式开始前务必进行充分的热身，尤其是下肢和核心，以防拉伤。\n2. 使用的杠铃重量应在自己能够安全控制范围内，若感觉不稳定可先使用较轻重量或借助教练指导。\n3. 确保训练环境无障碍，地面平整防滑，必要时使用护膝或软垫保护膝盖。', '1. 前膝过度前伸导致膝盖超出脚尖，增加膝关节压力。\n2. 躯干前倾过度，使背部成为主要负荷来源，增加腰椎受伤风险。\n3. 步幅过宽或过窄，导致重心不稳或髋部伸展不充分，影响肌肉激活效果。', '1. 若肩部柔韧性不足，可将杠铃置于胸前使用前蹲姿势（高脚杯杠铃），减轻背部压力。
2. 步幅可依据个人髋部活动度适当调整：步幅略宽有助于激活臀大肌，步幅略窄则更侧重股四头肌。
3. 对于膝盖有不适的人群，可采用半程弓步蹲或把手放在墙壁/固定物体上以提供额外支撑。', 'compound', '{"徒手版":"去掉杠铃，保持相同的步幅和姿势，适合初学者进行动作熟悉。","哑铃版":"双手各持一只哑铃，置于身体两侧，保持背部直立，可降低上背部压力。","单腿版":"仅用一条腿向前迈步，另一条腿悬空或轻触地面，提高平衡和单侧力量要求。","高脚杯杠铃版":"将杠铃置于胸前，手臂交叉握住杠铃前端，类似前蹲动作，主要强化股四头肌。","踏板弓步蹲":"后脚放在稳固的踏板或小凳上，增加后侧臀大肌和腿后侧肌群的激活。","半程弓步蹲":"下降至约45度深蹲即可，适用于膝关节不适或力量尚未达到完整幅度的训练者。"}', 'published', NOW(3), NOW(3));
SET @eid_194 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌（股直肌） (agonist)
-- Suggested muscle: 股外侧肌 (agonist)
-- Suggested muscle: 股内侧肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 大收肌 (synergist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('杠铃硬拉', 'legs', 'barbell', 'intermediate', NULL, '1. 站位准备：双脚与肩同宽，脚尖略微外旋，站在杠铃正下方，确保杠铃中点对准脚中部。\n2. 握杠姿势：双手正握（掌心朝下）握杠，握距略宽于肩，手臂自然伸展，肘部略微弯曲，保持杠铃贴近小腿。\n3. 身体起始姿态：收腹、挺胸、肩胛收紧，使胸部略微向上；保持背部自然弧度，避免驼背或过度弓背。\n4. 启动动作：深吸一口气，臀部向后坐，膝盖微屈，视线保持水平；随后通过臀部和大腿后侧的发力开始上拉。\n5. 上升阶段：在保持胸部向前、杠铃贴近身体的前提下，臀部向前推进，膝盖同步伸展，直到身体完全直立，肩部略向后收；此时可短暂停顿，感受臀部与大腿的收缩。\n6. 下降阶段：控制速度，先臀部后坐，膝盖随之屈曲，缓慢将杠铃放回地面，保持背部自然弧度，避免猛然下落。', '1. 必须在硬拉前进行充分的热身，尤其是下背和髋部，以防止受伤。\n2. 使用合适的举重鞋或赤脚站立，确保脚掌稳固；若使用杠铃架，建议使用安全杠或请训练伙伴在旁协助。\n3. 举起或放下杠铃时，保持背部挺直，避免在动作全程出现“圆背”或“过度弓背”，这会对脊柱产生过大压力。', '1. 在拉起时出现背部弓背（圆背），导致下背承受不必要的剪切力。\n2. 膝盖过度前移或锁定，导致膝关节受力不均，未能充分发挥臀部和大腿后侧的发力。\n3. 动作全程未保持核心收紧，出现躯干晃动或杠铃偏离身体中心，影响稳定性与力量传递。', '1. 对于背部力量不足或刚接触硬拉的练习者，可先用轻重量练习起始位置的感觉，必要时使用罗马尼亚硬拉或Trap Bar硬拉减轻下背负担。
2. 若腿部柔韧性受限，可在杠铃下方放置小块平台或使用较短的杠铃片，以减少下蹲幅度。
3. 为提升难度，可在完成标准硬拉后加入暂停式硬拉（Paused Deadlift）或单腿硬拉，增强肌肉激活和控制能力。', 'compound', '{"Romanian硬拉":"保持膝盖微屈，专注于臀部和大腿后侧的拉伸与收缩，适合想加强腘绳肌柔韧性和臀部力量的练习者。","Trap Bar硬拉":"使用菱形杠铃将负荷更集中在身体中心，显著降低下背部的压力，是初学者或背部有不适感人群的理想选择。","Sumo硬拉":"站距比肩宽，脚尖外展，主要靠臀部和大腿内侧发力，可提升髋关节活动范围并分散对脊柱的负荷。"}', 'published', NOW(3), NOW(3));
SET @eid_196 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 核心肌群（腹直肌、腹横肌） (stabilizer)
-- Suggested muscle: 小腿肌群（腓肠肌、比目鱼肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('沙袋深蹲', 'legs', 'other', 'intermediate', NULL, '1. 将沙袋放置在胸部或背部，双手握住袋子的两侧或使用肩带固定，确保沙袋稳固不易滑落。\n2. 站姿，双脚与肩同宽或略宽，脚尖略微外展，膝盖指向脚尖方向，核心收紧，胸部保持抬起。\n3. 吸气时，屈膝屈髋，重心下降，臀部向后坐，膝盖随之下沉，保持背部平直，避免弓背。\n4. 继续下降至臀部略低于膝盖的深度，或根据个人柔韧性下降到舒适位置，保持胸部略微向前倾以维持平衡。\n5. 呼气时，脚后跟用力踩地，腿部发力向上推动身体，恢复到起始站立姿势。\n6. 完成指定次数后，缓慢放下沙袋，或将其放置于地面后再进行下一组，注意控制重量避免砸伤。', '1. 确认沙袋重量适合自己的力量水平，避免超负荷导致受伤。\n2. 动作全程保持背部平直，避免在下降或上升时出现圆背或弓背，以保护脊柱。\n3. 使用沙袋时确保抓握牢固，必要时可使用肩带或护具防止滑落。', '1. 膝盖向内收（膝盖外翻），导致膝关节受力不均。\n2. 下降深度不足，仅做半蹲，未能充分激活臀部和大腿肌肉。\n3. 上背部和肩部过度前倾，导致重心不稳，容易失去平衡。', '1. 如感到胸部压力过大，可将沙袋移至背部进行背深蹲，减轻上半身负担。
2. 若想增加股四头肌的参与，可将沙袋置于胸前并采用较窄的站距。
3. 初学者可先使用较轻的沙袋或练习不加负重的深蹲，逐步适应后再提升重量。', 'compound', '{"背深蹲":"将沙袋放置在背部进行背深蹲，可更好地激活臀大肌和腿后侧肌群。","前深蹲":"将沙袋放在胸前进行前深蹲，增加核心稳定性并强化股四头肌。","单腿沙袋深蹲":"将沙袋置于胸前或背部，单腿支撑完成深蹲，提升平衡和单侧力量。"}', 'published', NOW(3), NOW(3));
SET @eid_297 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('泽奇深蹲', 'legs', 'barbell', 'advanced', NULL, '1. 站立，双脚与肩同宽，脚尖略微外展；2. 将杠铃置于肘部内侧的凹槽中，双手交叉握住杠铃，手肘向前，胸部挺起；3. 保持胸部抬起、核心收紧，慢慢屈膝下蹲，臀部向后推，膝盖与脚尖方向保持一致；4. 继续下降至大腿与地面平行或略低于平行，保持背部中立；5. 通过脚掌中心发力，将身体推起回到起始姿势，完成一次动作。', '1. 必须使用深蹲架或有人扶护，防止失去平衡时受伤；2. 确保肘部能够稳固支撑杠铃，若出现疼痛应立即停止并检查姿势；3. 下蹲时保持膝盖与脚尖方向一致，避免膝盖内翻导致关节受伤。', '1. 将杠铃放置位置过低或过高，导致肘部不适或背部过度弯曲；2. 在下降过程中背部呈圆形或过度前倾，增加腰椎压力；3. 使用过重的重量导致动作失控，忽视动作质量。', '如果肘部不适，可在杠铃下方放置软垫或改用前蹲；若踝关节活动受限，可在脚跟垫高或使用深蹲鞋；初学者可先用哑铃或壶铃进行类似动作，逐步过渡到杠铃泽奇深蹲。', 'compound', '{"前蹲":"将杠铃从肘部转移至胸前，改为前蹲可减轻肘部压力并更加强调股四头肌。","背蹲":"若想集中锻炼臀部和大腿后侧，可改为传统背蹲，使用高杆位置。","哑铃深蹲":"使用哑铃置于身体两侧进行深蹲，可作为过渡动作帮助掌握平衡和核心控制。"}', 'published', NOW(3), NOW(3));
SET @eid_203 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 大腿内收肌群 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 小腿肌群（腓肠肌、比目鱼肌） (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('深蹲行走', 'legs', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：站立，双脚与肩同宽或略宽，脚尖稍微外展，目视前方。\n2. 屈膝下蹲：保持胸部抬起，背部挺直，臀部向后推，膝盖随脚尖方向弯曲，下蹲至大腿约与地面平行或更低（根据个人柔韧度）。\n3. 行走：在下蹲姿势下，向前迈出一只脚，保持膝盖微屈，重心均匀分布在两腿之间；随后另一只脚跟上，保持深蹲的高度不变。\n4. 持续移动：交替迈步，保持深蹲幅度不变，动作平稳，避免站起或站得太高；可以设定一定的距离或步数。\n5. 结束方式：在完成预定步数后，慢慢站起，收回姿势，恢复直立站姿。', '1. 确保膝盖方向与脚尖一致，避免膝盖内翻导致伤害。\n2. 在进行深蹲行走前先热身腿部肌肉，尤其是髋关节和踝关节，以防拉伤。\n3. 若出现膝关节疼痛或下背不适，应立即停止并咨询专业人士。', '1. 站起过高或站直，失去深蹲的持续张力。\n2. 膝盖过度前倾超出脚尖，导致膝关节负荷过大。\n3. 身体前倾或弯腰驼背，增加背部压力。', '初学者可先在墙边或扶手下练习，降低深度，保持姿势稳定后再逐步加深；进阶者可以尝试负重背心或手持哑铃，增加阻力；若踝关节活动受限，可在脚后跟垫上垫子或穿举重鞋帮助保持平衡。', 'compound', '{"单腿深蹲行走":"在保持平衡的前提下，将双腿深蹲行走改为单腿版，以提升单侧力量和稳定性。","宽距深蹲行走":"将双脚间距调宽，可增加内收肌群的参与，提高髋部活动范围。","侧向深蹲行走":"在深蹲姿势下向左或向右横移，侧重臀部外展肌和股外侧肌的训练。"}', 'published', NOW(3), NOW(3));
SET @eid_281 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腿后肌群 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 髋内收肌群 (stabilizer)
-- Suggested muscle: 小腿肌群 (stabilizer)
-- Suggested muscle: 脊柱竖肌 (stabilizer)
-- Suggested muscle: 核心肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('深蹲跳', 'legs', 'bodyweight', 'intermediate', NULL, '1. 站姿双脚与肩同宽或略宽，脚尖略微外展，双手自然垂于体侧或交叉放在胸前，保持胸部挺直，目视前方。,2. 屈膝屈髋，降低身体重心，臀部向后坐，膝盖沿脚尖方向移动，确保膝盖不超过脚尖，背部保持自然弧线。,3. 当下蹲至大腿与地面平行或稍低于水平位置时，利用腿部和臀部的爆发力，向上快速伸展膝盖和髋关节，完成跳跃。,4. 在空中尽量收紧核心，保持身体正直，双腿略微收拢，以准备落地。,5. 用前脚掌先着地，随后全脚掌落地，膝盖微屈缓冲冲击力，恢复至起始姿势并立即进行下一次动作。', '运动前进行充分的热身，尤其是下肢和核心，以提升关节活动度并预防拉伤。,跳跃落地时务必用前脚掌缓冲，避免膝盖直接撞击地面，以减少膝关节冲击。,若出现膝盖或下背部不适，应立即停止并咨询专业教练或医生，切勿硬撑。', '膝盖内扣（膝盖向内塌），导致膝关节受力不均，增加受伤风险。,下蹲深度不足，仅做浅蹲，减弱对股四头肌和臀大肌的刺激。,落地时僵硬不屈膝，直接冲击膝关节，易导致膝部疼痛或软组织损伤。', '初学者可将跳的高度降低，甚至只做原地弹跳，专注于动作规范后再提升高度。,如需增加难度，可在背部放置杠铃或双手持哑铃进行负重深蹲跳。,膝盖有旧伤者可以在膝盖处佩戴护膝，或改为无跳跃的深蹲练习。', 'compound', '{"标准深蹲跳":"保持标准姿势，专注于爆发力，在平地上进行即可。","单腿深蹲跳":"在保持平衡的前提下，将体重转移至单腿进行跳跃，适合进阶训练。","负重深蹲跳":"双手握哑铃或背杠铃，增加负荷，提升力量与爆发力。"}', 'published', NOW(3), NOW(3));
SET @eid_266 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('深蹲跳远', 'legs', 'bodyweight', 'advanced', NULL, '1. 站立，双脚与肩同宽，双手自然下垂或放在身体两侧。\n2. 吸气，屈髋屈膝，像标准深蹲一样下蹲，保持胸部略微前倾，背部挺直。\n3. 继续下降至大腿与地面至少平行，膝盖指向脚尖方向，保持核心收紧。\n4. 在最低点快速伸展髋、膝、踝三关节，同时用力摆臂向上和向前，产生爆发性推动力。\n5. 跳起并向前伸展，双脚在空中稍微收拢，以获得更大的前冲距离。\n6. 落地时用前脚掌先着地，屈膝缓冲，恢复到深蹲姿势后站立，完成一次完整的深蹲跳远。', '1. 充分热身，特别是下肢和核心，以防肌肉拉伤。\n2. 跳远时确保前方有足够的安全空间，避免碰撞障碍物。\n3. 落地时要屈膝缓冲，避免膝盖锁死导致膝关节受伤。', '1. 蹲得不够深，导致腿部发力不足，跳远距离受限。\n2. 落地时膝盖锁死或身体前倾过度，增加膝关节冲击。\n3. 没有利用手臂摆动或摆动方向错误，导致力量利用不充分。', '如果空间不足，可改为在原地做深蹲跳或使用软垫限制跳跃距离；如感力量不足，可先练习深蹲起立或借助低箱进行箱跳练习，逐步进阶到完整深蹲跳远。', 'compound', '{"深蹲跳箱":"将跳跃改为跳上稳固的箱子，可降低落地冲击并保持动作的爆发性。","徒手深蹲跳":"去掉前向跳跃，仅做垂直跳起，适合初学者或空间受限时使用。","侧向深蹲跳远":"向侧面跳跃，可增加髋外展肌群的参与，提供不同的训练刺激。"}', 'published', NOW(3), NOW(3));
SET @eid_271 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('直腿硬拉', 'legs', 'barbell', 'advanced', NULL, '1. 起始姿势：双脚与肩同宽，脚尖略微外展，杠铃置于脚背正上方，站距略宽于髋，双手正握或交替握，握距略宽于肩，膝盖微屈，保持背部挺直，胸部向前。\n2. 准备收紧：收紧腹横肌，胸廓略微抬起，肩胛骨向后并向下收紧，形成“挺胸”姿态，保持颈部自然延伸，目视前方。\n3. 髋铰链下降：臀部向后推，上半身以髋关节为轴心向前倾，膝盖保持微屈或几乎伸直，杠铃沿大腿前侧向下滑动，保持背部平直，避免弓背或圆背。\n4. 下落至舒适深度：通常下至大腿几乎与地面平行，或身体略低于此位置，感觉到股二头肌的拉伸；此时保持核心紧张，胸部仍向上，保持视线水平。\n5. 上升返回：脚掌压地，臀部向前推，驱动髋部向前并向上，同时收紧臀大肌和腿后侧肌肉，恢复至起始站立姿势；在整个上升过程中保持背部挺直，避免先抬起臀部。', '1. 保持脊柱中立，避免在下放或上升时出现背部圆曲。\n2. 使用合适的重量，必要时请教练或同伴帮助观察动作。\n3. 热身充足，尤其是髋关节、腿后侧和下背，防止拉伤。', '1. 膝盖过度弯曲或下蹲，把动作变成了深蹲。\n2. 背部弓起或圆起，导致下背受压。\n3. 杠铃离腿太远，增加腰背负担。', '若腘绳肌柔韧性不足，可在膝盖处略微弯曲或使用较轻的杠铃；可通过在脚下垫高斜坡、使用哑铃或壶铃替代杠铃减轻难度；如有背部不适，可在支撑凳上进行半程硬拉或使用拉力带辅助。', 'compound', '{"哑铃直腿硬拉":"使用哑铃替代杠铃，握距可调，适合初学者或需要更大自由度。","壶铃硬拉":"壶铃负荷更集中手腕，可提升抓握力并改变重心，适合想要增加挑战的训练者。","单腿直腿硬拉":"单侧进行，提高平衡和核心稳定，适合进阶训练。","脚抬高直腿硬拉":"在踏板或箱子上进行，增大髋屈角度，更好地刺激臀大肌。","史密斯机直腿硬拉":"固定轨道帮助保持正确姿势，降低协调难度，适合康复训练或新手。","杠铃罗马尼亚硬拉":"与传统直腿硬拉相似，但膝盖弯曲略多，适合腘绳肌柔韧性稍差的训练者。"}', 'published', NOW(3), NOW(3));
SET @eid_199 = LAST_INSERT_ID();
-- Suggested muscle: 股二头肌（hamstrings） (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 股四头肌 (antagonist)
-- Suggested muscle: 腓肠肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('相扑硬拉', 'legs', 'barbell', 'advanced', NULL, '1. 站位准备：双脚比肩宽，脚尖外展约30‑45度，膝盖略微弯曲，杠铃置于脚中心正上方，双手握杠，握距略比肩宽，手臂自然垂在双腿外侧。\n2. 调整身体姿势：收紧背阔肌，收腹挺胸，保持脊柱自然中立位，头部抬起，目视前方，肩胛骨略微后收。\n3. 预拉收紧：深吸气并保持腹压，收紧臀部和大腿内收肌，使全身形成紧绷的整体，准备向上发力。\n4. 启动提起：在保持背部挺直的同时，主要通过髋关节伸展（臀部向前推）并配合膝盖伸展，将杠铃从地面向上提起，杠铃要紧贴大腿并沿垂直路径上升。\n5. 完成站姿：当杠铃提升至髋部以上时，完全伸展髋部和膝盖，胸部挺起，肩部向后收紧，保持1‑2秒，然后控制杠铃缓慢下降回到起始位置，保持背部挺直，膝盖微弯。\n6. 重复或结束：完成所需次数后，平稳放回杠铃，确保不冲击背部。', '1. 保持脊柱中立，避免在提起时弯腰或圆背，以免造成腰椎受伤。\n2. 使用合适的举重鞋或赤脚，确保脚底稳固，防止滑倒。\n3. 进行大重量训练时建议佩戴举重腰带和护腕，并在有经验的伙伴或教练监督下进行。', '1. 站距过宽或过窄导致膝盖内塌或外翻，增加膝关节和髋关节的压力。\n2. 背部过度弓起或圆背，使背部承担过大负荷，易导致下背受伤。\n3. 拉起时过度依赖手臂力量，忽视髋部伸展，导致前臂和肘部过度紧张。', '1. 根据个人髋部柔韧性和身高，适当调节站距与脚尖外展角度，使膝盖方向与脚尖保持一致。
2. 若感到腰部压力过大，可收紧腹压或使用举重腰带；若前臂疲劳，可使用助力带或调整握距。
3. 初学者可先使用较高的起始位置（如垫块或杠铃架）进行练习，逐步向地面硬拉过渡。', 'compound', '{"变体类型":"传统硬拉","转换建议":"收窄站距至约肩宽，双手握距略宽于肩部，保持背部挺直，重点通过臀部与腿后侧的伸展来完成提拉，以适应传统硬拉的技术要点。"}', 'published', NOW(3), NOW(3));
SET @eid_197 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (agonist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 大腿内收肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('站姿小腿提踵机', 'legs', 'machine', 'beginner', NULL, '1. 站直，双手握住机器把手，肩宽略宽站立，脚尖向前或略向外。\n2. 调整垫子高度，使其舒适地压在肩部，避免压迫颈椎。\n3. 将脚跟抬起，尽量向上提起小腿，感受小腿后侧的收缩，保持顶峰收缩1-2秒。\n4. 缓慢放下脚跟，回归起始位置，保持控制，避免猛然下放。\n5. 完成设定的次数后，停止动作，平稳离开机器。', '确保机器稳固，双脚站稳，防止滑倒。,调整垫子高度时，避免压在颈部或肩部过重。,使用适当的重量，避免过度负荷导致跟腱受伤。', '脚尖过于内收或外展，导致小腿发力不均。,在动作过程中膝盖过度弯曲或伸展，改变目标肌肉的刺激。,动作速度过快，未能控制下降阶段，导致肌肉拉伤风险。', '1. 根据个人身高调节垫子位置，使肩膀自然放松。2. 脚尖方向可以略向外约10-15度，以更好刺激腓肠肌外侧。3. 动作幅度可根据柔韧性适度调节，确保全程动作在舒适范围内。', 'isolation', '{"站姿自由重量提踵":"将机器换成哑铃或杠铃，改为站姿提踵，可增加平衡需求和核心参与。"}', 'published', NOW(3), NOW(3));
SET @eid_254 = LAST_INSERT_ID();
-- Suggested muscle: 腓肠肌 (agonist)
-- Suggested muscle: 比目鱼肌 (agonist)
-- Suggested muscle: 胫前肌 (antagonist)
-- Suggested muscle: 大腿后侧肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('站姿绳索腿弯举', 'legs', 'cable', 'beginner', NULL, '1. 面向绳索机站立，将绳索调整至最低位置（或使用低位滑轮）。\n2. 单腿支撑，另一侧腿向后抬起，用脚踝勾住绳索把手。双手可扶住机器的固定把手以保持平衡。\n3. 保持躯干直立，核心收紧，目光平视前方。\n4. 呼气，大腿后侧（股二头肌）发力，屈膝将小腿向上弯举至接近臀部。\n5. 在最高点停留1-2秒，充分感受股二头肌的收缩。\n6. 吸气，缓慢控制下放，保持张力直到回到起始位置。完成后换另一条腿重复。', '保持躯干稳定直立，避免借助身体摆动来完成动作，始终控制重量而非被重量控制。,确保脚踝固定带牢固地套在脚踝上，选择合适的配重以避免脚踝受伤。,如果平衡困难，可以先双手更牢固地支撑，或者靠近墙壁/器械进行练习。', '使用过重重量导致髋关节屈曲（上身前倾），使动作从股二头肌转移到臀大肌代偿。,动作过程中躯干扭转或侧倾，降低了对目标肌肉的刺激并增加下背部压力。,下放速度过快，没有控制地让重量拉着腿伸展，降低训练效果并可能造成肌腱拉伤。', '对于平衡能力较弱的初学者，可以使用双手更牢固地支撑器械或靠近墙壁站立；也可以先使用较轻重量并放慢动作节奏，重点感受目标肌肉的收缩；如感到下背部不适，可适当减小屈膝幅度。', 'isolation', '{"无绳索器械":"可使用哑铃裤腿弯举或杠铃腿弯举设备替代","双脚同时训练":"可改为俯卧腿弯举椅进行双腿同时练习","单腿升级":"熟练后可尝试在健身球上进行单腿腿弯举，增加核心稳定挑战"}', 'published', NOW(3), NOW(3));
SET @eid_228 = LAST_INSERT_ID();
-- Suggested muscle: 股二头肌（股二头肌长头和短头） (agonist)
-- Suggested muscle: 半腱肌 (synergist)
-- Suggested muscle: 半膜肌 (synergist)
-- Suggested muscle: 股四头肌 (antagonist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('站姿腿弯举', 'legs', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：直立，双脚与肩同宽，双手自然下垂或轻扶固定物体以保持平衡。\n2. 抬起右脚（或左脚），用同侧手握住脚踝，保持膝盖稍微弯曲，脚尖自然下垂。\n3. 吸气，收紧核心（腹肌、背部），屈膝将小腿向上抬向臀部，感受腘绳肌的收缩。保持大腿上部固定不动，动作范围以小腿接近臀部为宜。\n4. 在最高点（约屈膝90°）保持1-2秒，充分收缩腘绳肌。\n5. 呼气，缓慢放下小腿回到起始位置，保持控制，避免猛拉或自由落体。\n6. 完成预定次数后换另一条腿，重复相同的动作。', '1. 确保站立腿稳固，可靠墙、扶手或使用单脚支撑，以防失衡跌倒。\n2. 动作全程保持核心紧绷，避免背部过度弓起或塌陷，以保护腰椎。\n3. 使用适当的阻力（弹力带、哑铃等），切勿超负荷，以免膝关节或腘绳肌受伤。', '1. 使用摆动或惯性完成动作，导致腘绳肌刺激不足。\n2. 膝盖在弯曲时向内或向外倾斜，产生不必要的关节压力。\n3. 放下小腿时速度过快，失去对腘绳肌的离心控制。', '1. 初学者可先靠墙或扶手进行，逐步掌握平衡后再独立完成。
2. 可先减小动作幅度（只弯曲约45°），再逐步增至完整90°。
3. 使用弹力带或轻哑铃调节阻力，便于渐进负荷。
4. 进阶者可在脚踝处挂沙袋或增加负重，提高强度。', 'isolation', '{"单腿站姿腿弯举":"可改为双腿站姿腿弯举，降低平衡难度，适合初学者。","弹力带站姿腿弯举":"在脚踝处套上弹力带，增加阻力，适用于想提升负荷的训练者。","哑铃/沙袋站姿腿弯举":"在脚踝挂轻哑铃或沙袋，提升难度，适合进阶者。","坐姿腿弯举":"将动作改为坐姿腿弯举，使用器械或哑铃，减少平衡需求，同时强化腘绳肌。"}', 'published', NOW(3), NOW(3));
SET @eid_277 = LAST_INSERT_ID();
-- Suggested muscle: 腘绳肌（股二头肌、半腱肌、半膜肌） (agonist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 股四头肌 (antagonist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 腹直肌/腹横肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('箱式深蹲', 'legs', 'barbell', 'intermediate', NULL, '1. 站立姿势，双脚与肩同宽或略宽，脚尖稍微外展，双手握住杠铃，杠铃置于上背部（斜方肌）位置。\n2. 将稳固的箱（高度约为膝盖以下10-15厘米）放在身后，确保箱子不滑动或倾斜。\n3. 收紧核心、挺胸、保持胸部向上，收腹，然后臀部向后推，膝盖屈曲，开始下蹲。\n4. 在下蹲过程中，保持膝盖与脚尖方向一致，避免膝盖内扣，臀部继续向后移动，直至臀部轻触箱子表面。\n5. 轻触箱子后，稍作停顿（约1-2秒），保持胸部抬起并控制姿势，然后通过脚掌发力，伸展髋部和膝部，向上站起，恢复到起始姿势。\n6. 完成预定次数后，平稳将杠铃放回支架，避免一次性卸下导致背部受伤。', '1. 使用稳固的箱子或平台，确保箱子不滑动，必要时可在箱子下放置防滑垫。\n2. 保持背部挺直，避免在下降或起身时出现圆背，以减少腰椎压力。\n3. 若重量较大，建议有训练伙伴或使用深蹲架的安全支撑杠，以防失衡时受伤。', '1. 膝盖向内扣（内翻）导致膝关节受力不均；应在整个动作中保持膝盖与脚尖同向。\n2. 上身前倾过度，导致重心前移，增加腰椎负担；应保持胸部向上，臀部向后推的感觉。\n3. 没有充分收紧核心，导致腰部过度伸展或塌背，影响稳定性；全程保持腹肌紧绷。', '1. 箱子高度可调：初学者可以选用稍高的箱子，降低下蹲深度；进阶者可以使用更低的箱子，以增加活动范围。
2. 站距可以调整：宽站距有助于激活臀大肌，窄站距则更侧重股四头肌。
3. 握法可改为窄握或宽握，以改变肩部受力感和上背部的稳定性。', 'compound', '{"变体类型":"单腿箱式深蹲","转换建议":"将双脚分开改为单腿支撑，其他要点保持不变，注意先在稳固的箱子旁放置支撑杆或墙壁，以防失衡，此变体可进一步提升平衡、髋部稳定性和单侧力量。"}', 'published', NOW(3), NOW(3));
SET @eid_192 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 内收肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 小腿肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索侧踢腿', 'legs', 'cable', 'beginner', NULL, '1. 站姿准备：面向Cable机，双脚与肩同宽，脚尖略微外展，站稳，保持核心收紧。\n2. 调节手柄：将Cable的手柄或绳索固定在同侧脚踝或踝部，确保拉绳略微紧绷且能自由移动。\n3. 起始姿势：保持站立腿微屈，支撑腿稍微向外旋转，使身体保持平衡；踢腿侧稍微抬起脚踝，准备发力。\n4. 执行踢腿：利用髋部外展的力量，将腿向侧面踢出，直至大腿与地面平行或略高，保持膝关节自然伸直或轻微弯曲。\n5. 控制返回：在动作的最高点稍作停顿，然后缓慢控制Cable的阻力，将腿慢慢回到起始位置，避免猛然放下导致冲击。\n6. 呼吸配合：踢腿时呼气，返回时吸气，保持呼吸顺畅。', '1. 确认Cable稳固，吊环和绳索无损坏，防止意外脱落。\n2. 保持站立腿的稳定性，避免在踢腿时身体前倾或摆动，导致腰椎受伤。\n3. 动作过程中避免使用过大的重量，以免导致髋关节或膝关节过度负荷。', '1. 踢腿时使用膝关节而非髋关节发力，导致股四头肌参与过多。\n2. 动作幅度不足，只做小幅度的摆动，未能充分激活臀中肌。\n3. 身体侧倾或摆动，使重心不稳，增加受伤风险。', '1. 若肩部或腰部不适，可将Cable手柄调至略低位置或使用弹性带代替，以减轻负荷。
2. 脚踝固定点可调高或调低，以改变阻力曲线；若想增加难度，可将手柄固定在踝部更高的位置。
3. 初学者建议先使用轻重量，逐步适应后再增加负荷。', 'isolation', '{"使用弹力带侧踢":"将Cable换成弹力带，保持相同的动作轨迹，适合在家中或旅行时练习。","使用哑铃侧踢":"手持哑铃进行侧向踢腿，增加上半身参与的稳定性，适合健身房设备受限的情况。"}', 'published', NOW(3), NOW(3));
SET @eid_237 = LAST_INSERT_ID();
-- Suggested muscle: 臀中肌 (agonist)
-- Suggested muscle: 臀小肌 (synergist)
-- Suggested muscle: 阔筋膜张肌 (synergist)
-- Suggested muscle: 髋内收肌群 (antagonist)
-- Suggested muscle: 腹部核心 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索后踢腿', 'legs', 'cable', 'beginner', NULL, '1. 将绳索器械调至低位，站在器械前约一步距离，双手扶住固定物以保持平衡。\n2. 重心放在支撑腿上，另一只腿的脚踝处套上绳索把手，保持站立姿势稳定，脊柱保持中立位。\n3. 呼气的同时，保持支撑腿微弯，向后方抬起套有绳索的腿，髋关节伸展，直到大腿与地面接近平行或稍高于水平面。\n4. 在顶峰位置稍作停顿，感受臀大肌的收缩，注意不要过度拱背或旋转骨盆。\n5. 吸气，缓慢控制地将腿放回起始位置，保持绳索的张力不要完全卸掉。\n6. 完成指定次数后，换另一条腿重复动作。', '1. 确保绳索把手牢固套在脚踝处，运动前检查连接部位是否有松动。\n2. 保持核心收紧，避免在踢腿过程中过度弯腰或拱背导致下背部压力过大。\n3. 选择合适的重量，以能够控制动作完成全程为宜，避免借助惯性快速甩腿。', '1. 踢腿时身体前倾过度，利用弯腰来代偿髋关节伸展，减少了目标肌肉的刺激。\n2. 使用过重重量导致动作失控，无法完成完整的动作幅度，或者在回落时突然放松。\n3. 骨盆旋转或侧倾，导致下背部代偿，应保持骨盆水平且稳定。', '如果感到下背部压力过大，可以适当减小踢腿幅度或降低重量；对于平衡感较差的练习者，可以靠近墙壁或扶手站立以增加稳定性；如想加强臀大肌上部，可以将踢腿方向略微向上调整。', 'isolation', '{"徒手版本":"可以俯卧在长凳或地板上做俯卧后踢腿，无需器材即可锻炼相同肌群","TRX悬挂带版本":"将脚放入TRX把手中进行相同动作，提供更自由的运动轨迹","阻力带版本":"将绳索替换为阻力带，固定在低位进行练习，阻力带弹性更大需控制回放速度"}', 'published', NOW(3), NOW(3));
SET @eid_236 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 股四头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索小腿提踵', 'legs', 'cable', 'beginner', NULL, '1. 站在绳索前，双脚与肩同宽，脚尖略微指向外侧，手握住绳索手柄，保持身体直立。\n2. 缓慢向上提起脚跟，感受小腿后侧（腓肠肌和比目鱼肌）收缩，至脚尖踮起的最高点。\n3. 在最高点稍微停顿1-2秒，保持肌肉张力，避免完全锁死膝关节。\n4. 缓慢控制下放脚跟，回到起始姿势，注意下放时不要让脚跟触碰地面，以保持张力。\n5. 重复进行规定的次数，保持呼吸节奏——提起时吸气，下放时呼气。\n6. 训练结束后，缓慢松开绳索，放回原位，避免突然弹回。', '1. 确保站立地面干燥平整，避免滑倒。\n2. 使用合适的重量，切勿使用过重导致身体摆动或失去平衡。\n3. 在动作全程保持核心收紧，避免弓背或过度后仰。', '1. 只做半程动作，未能完整提升脚跟或下放脚跟，导致训练效果减弱。\n2. 使用过重的负荷导致借助身体摆动或弹力完成动作，削弱对小腿的孤立刺激。\n3. 脚尖指向过于向内或向外，导致踝关节不稳定或受力不均。', '1. 调整绳索高度：低绳索适合站姿提踵，高绳索可做单腿提踵或增加运动幅度。
2. 站距与脚尖角度：宽站距和脚尖稍外展可更好刺激腓肠肌外侧，窄站距和脚尖向前则更针对内侧。
3. 手握方式：双手握把可帮助保持平衡，单手握把则可加入核心的额外稳定性需求。', 'isolation', '{"单腿变体":"将一只脚抬离地面，仅用另一只脚完成提踵，可增强单侧力量和平衡。","站姿变体":"在常规站姿基础上，加入短暂停顿或慢速下降，提高肌肉张力持续时间。","哑铃替代":"如果绳索不可用，可手握哑铃进行站姿提踵，效果相似但需注意重量分配。"}', 'published', NOW(3), NOW(3));
SET @eid_238 = LAST_INSERT_ID();
-- Suggested muscle: 腓肠肌（内侧头） (agonist)
-- Suggested muscle: 腓肠肌（外侧头） (agonist)
-- Suggested muscle: 比目鱼肌 (agonist)
-- Suggested muscle: 胫骨前肌 (stabilizer)
-- Suggested muscle: 核心肌群（腹横肌、腹直肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索深蹲', 'legs', 'cable', 'intermediate', NULL, '1. 将绳索滑轮调至最低位，安装绳索手柄（或直杠），双手握稳手柄，站在器械前方约一脚宽的站距。\n2. 保持胸部略微前倾、背部挺直，核心收紧，将绳索的阻力向上拉至胸部位置，准备起始姿势。\n3. 屈髋屈膝，像传统深蹲一样向下蹲，重心放在脚后跟，确保膝盖沿脚尖方向略微外展，避免膝盖向内塌。\n4. 继续下蹲至大腿与地面平行或略低于平行位，保持胸部抬起，目视前方。\n5. 在底部稍作停顿后，用脚后跟发力，将身体向上推回至起始姿势，呼气时用力。\n6. 完成预定次数后，将绳索缓缓放回至最低位，防止绳子突然弹回造成伤害。', '1. 确保绳索固定装置牢固，手柄无松动后方可进行练习。\n2. 保持背部挺直、核心收紧，避免在深蹲过程中出现弓背或塌腰。\n3. 重量选择要适中，避免在深蹲底部时出现无法控制的弹起或失衡。', '1. 膝盖内塌（膝盖向内）导致膝关节受压过大。\n2. 上身前倾过多，失去核心支撑，增加腰椎负担。\n3. 蹲得不够深或仅用前脚掌支撑，未能充分激活臀部和股四头肌。', '1. 若感到绳索阻力过大，可适当降低配重或换用更细的绳索手柄。
2. 调整站距（宽站距或窄站距）和脚尖指向，以改变股四头肌与臀大肌的参与比例。
3. 根据个人柔韧性和身高，适当调节滑轮高度或使用不同类型的手柄（绳索环、直杠）以获得最佳动作轨迹。', 'compound', '{"杠铃深蹲":"保持相同的深蹲动作模式，将绳索阻力换成杠铃，保持背部挺直、胸部抬起，使用相同的站距和下蹲深度。","单腿绳索深蹲":"在一侧使用绳索进行深蹲，另一侧保持自由，可增强核心稳定性和单侧力量。","高位绳索深蹲":"将绳索挂点调高，使绳索在胸部上方提供阻力，增加上胸和肩部的参与度。","低位绳索深蹲":"将绳索挂点调至更低，增加对股四头肌的刺激，适合作为杠铃深蹲前的热身动作。"}', 'published', NOW(3), NOW(3));
SET @eid_239 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 小腿肌群（腓肠肌、比目鱼肌） (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索硬拉', 'legs', 'cable', 'intermediate', NULL, '1. 调整绳索高度至略低于膝盖，双手握住绳索手柄，站距与肩同宽，脚尖略微外展。\n2. 保持背部挺直，膝盖微屈，收紧核心，轻微屈髋，使绳索受力。\n3. 深呼吸后，主要通过臀部和大腿后侧发力，伸展髋关节并同时伸展膝盖，将身体向上提起，直至站直，臀部收紧。\n4. 在顶点稍作停顿，确保髋、膝完全伸展，臀部达到最大收缩。\n5. 缓慢控制重量，屈髋屈膝，循序渐进地将绳索放回起始位置，保持背部平直。\n6. 完成预定的次数后，松开手柄，确保绳索安全收回。', '1. 动作全程保持背部挺直，避免弯腰驼背，以防止下背部受伤。\n2. 使用适当的重量，确保绳索固定牢固，防止在提起或放下时出现弹跳。\n3. 若感到腰部或膝盖不适，应立即停止并调整姿势或降低重量。', '1. 在提起时先屈膝后屈髋，导致背部过度负荷。\n2. 上提时臀部未充分收紧，出现胸部前倾的错误姿势。\n3. 下降时速度过快，缺乏控制，导致腰部受冲击。', '1. 调整绳索高度：高度过低会增加膝盖压力，过高则使背部负担增大。
2. 站距与脚尖角度可根据个人柔韧性和舒适度微调，确保髋关节活动范围最大。
3. 若手腕有不适，可使用绳索手柄的把手或换成宽握把手。', 'compound', '{"单腿绳索硬拉":"将一只脚的支撑点改为单脚，可增强臀部单侧力量与平衡感，适用于进阶训练。","宽站绳索硬拉":"将站距放宽至约1.5倍肩宽，重点刺激臀大肌外侧和内收肌。","窄站绳索硬拉":"将站距缩小至约肩宽的70%，更强调股四头肌的参与。"}', 'published', NOW(3), NOW(3));
SET @eid_240 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 股外侧肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索腿弯举', 'legs', 'cable', 'beginner', NULL, '1. 调整滑轮至低位（约与脚踝同高），将脚踝环或绳索附件固定在脚踝上。\n2. 站立在器械前，保持双脚与肩同宽，背部挺直，核心收紧。\n3. 缓慢屈膝，将脚踝向上拉向臀部，保持大腿上部固定在原地，只用小腿进行弯曲。\n4. 在最高点稍作停顿，感受大腿后侧（腘绳肌）的收缩。\n5. 缓慢放下脚踝，回到起始位置，控制重量不要让重量猛拉。\n6. 重复动作，完成指定次数。', '1. 开始前务必检查脚踝环是否牢固，防止滑脱导致扭伤。\n2. 保持背部挺直，避免弯腰或拱背，以防止下背部受伤。\n3. 初学者建议使用轻负荷，逐步增加重量，以防肌肉拉伤。', '1. 使用过大的重量导致动作失控，姿势走形。\n2. 在动作过程中抬起大腿或臀部，失去对腿后侧的孤立刺激。\n3. 没有在最高点充分收紧，导致收缩效果不佳。', '1. 若对膝关节压力过大，可略微调整站距或使用垫子减轻压迫。
2. 初学者可利用固定把手的器械或借助镜子检查姿势，确保动作轨迹正确。
3. 想增加难度时，可改为单腿完成或在脚踝环上加配重。', 'isolation', '{"单腿绳索腿弯举":"将单脚固定在绳索上，另一只脚轻轻点地保持平衡，可增强单侧肌肉控制。","站姿绳索腿弯举":"将滑轮调到地面高度，使用绳索把手进行，可改变发力角度并增加动作多样性。","使用哑铃/杠铃":"在训练场地有限时，可用哑铃或杠铃做腿部弯举，转换时注意保持相同的动作轨迹和收缩感受。"}', 'published', NOW(3), NOW(3));
SET @eid_227 = LAST_INSERT_ID();
-- Suggested muscle: 腘绳肌 (agonist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 小腿三头肌（腓肠肌） (synergist)
-- Suggested muscle: 胫骨前肌 (antagonist)
-- Suggested muscle: 核心肌群（腹横肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索腿推', 'legs', 'cable', 'intermediate', NULL, '1. 调整器械：将滑轮调至最低位置，安装绳索或脚环并确认已锁紧。\n2. 起始姿势：站立或躺在垫子上，双手握住固定把手，脚踩在绳索/脚环上，脚距与肩同宽，脚尖略微外展，膝盖微屈。\n3. 准备推：收紧核心，背部保持自然弧度或紧贴垫子，身体略微后倾，确保整个动作过程保持平衡。\n4. 发力推：同时伸展髋关节和膝关节，将脚向前/向上推，使绳索/脚环向身体后方移动，保持动作流畅且不要锁死膝关节。\n5. 还原：在最高点稍微停顿后，缓慢屈膝、屈髋，回到起始姿势，整个过程保持对负荷的控制。', '1. 使用前检查绳索/脚环是否完好，防止滑脱导致受伤。\n2. 推起时避免使用过大的重量，以减轻腰椎和膝关节的压力。\n3. 如感到腰部或膝部不适，应立即停止并调整姿势或减轻负荷。', '1. 膝关节在推起时过度伸展（锁死），增加受伤风险。\n2. 动作速度过快，缺乏对负荷的控制，影响肌肉发力并可能导致姿势不稳。\n3. 站立时上半身前倾或后仰，导致核心不稳，降低腿部发力效率。', '1. 滑轮高度：仰卧式时滑轮应与脚踝平齐，站立式时可略低于脚踝以保持张力。
2. 脚位：脚尖略微外展更激活臀大肌，脚尖朝前更偏股四头肌，可根据训练目标微调。
3. 背部与核心：确保背部紧贴垫子或扶好把手，防止腰背弓起，保持脊柱中立位。', 'compound', '{"变体类型":"单腿绳索腿推","转换建议":"将双脚改为单脚进行练习，需要更强的核心稳定性和单侧腿部力量，可用于纠正左右力量不平衡并提升平衡感。"}', 'published', NOW(3), NOW(3));
SET @eid_232 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索臀推', 'legs', 'cable', 'intermediate', NULL, '1. 准备姿势：将滑轮调至低位，站在器械前，双脚与肩同宽，脚尖稍微外展，背对滑轮。\n2. 固定绳索：将绳索或专用腰带系在髋部（耻骨上方），确保绳索紧贴且不滑动。\n3. 起始动作：保持躯干直立，膝盖微屈，重心放在脚后跟，收紧核心和臀部，背部保持自然弧度。\n4. 发动动作：用力收缩臀部，将髋部向前推，直至身体从膝盖到肩部呈一条直线（类似臀桥顶部），在最高点保持1-2秒，感受臀大肌的强烈收缩。\n5. 回归起始：缓慢控制臀部回到起始位置，保持肌肉张力，避免猛然下降。\n6. 重复练习：按计划次数完成动作，注意全程保持正确姿势与呼吸节奏。', '1. 确保滑轮固定、绳索完好无损，防止在动作过程中出现绳索断裂或脱落。\n2. 保持背部自然挺直，避免过度弓背或塌背，以免对腰椎产生过大压力。\n3. 选用适当重量，避免使用过重导致髋关节压迫或动作失控。', '1. 使用过重导致上半身前倾，利用腿部力量而非臀部发力。\n2. 在推髋时膝盖向内收，形成膝外翻，增加膝关节压力。\n3. 动作顶端未充分收紧臀部，导致运动范围不足，臀大肌激活不完整。', '1. 根据个人身高和腿长微调滑轮高度，使绳索在髋部自然贴合，避免过度拉伸或压迫。
2. 若感到腰部不适，可略微降低重量或加宽双脚间距，提高稳定性。
3. 初学者可先使用把手或固定绳索在腰部，以帮助感受正确的动作轨迹。', 'compound', '{"单腿绳索臀推":"将一只脚抬起，保持另一只脚支撑，重量需相应降低，可更好激活臀中肌和核心稳定。","低位滑轮臀推":"把滑轮调至低位，增加对臀大肌的拉伸和激活，适合作为热身或强化动作。","高位滑轮臀推":"把滑轮调至高位，减少绳索的拉伸力，适合初学者学习动作轨迹。","站姿绳索臀推":"将脚固定在地面，背对滑轮，利用反向阻力完成臀推，可提高核心参与度。","哑铃辅助臀推":"在双脚之间夹住哑铃或杠铃，增加负重，适合在没有滑轮的情况下进行类似训练。"}', 'published', NOW(3), NOW(3));
SET @eid_235 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 股二头肌（腘绳肌） (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹部肌群 (stabilizer)
-- Suggested muscle: 髂腰肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索髋外展', 'legs', 'cable', 'intermediate', NULL, '1. 调整滑轮高度至脚踝上方或相同高度，将钢索固定在低位滑轮上。\n2. 站姿保持直立，稍微向支撑腿侧倾斜，抓住固定物或墙壁以保持平衡。\n3. 保持腿部微微弯曲，将外侧腿从支撑腿侧向外抬离，保持脚尖略微向前或向上。\n4. 在动作的顶端略微停顿，感受臀部外侧的收缩。\n5. 缓慢控制地让外侧腿回到起始位置，保持张力不要完全释放。\n6. 完成设定的重复次数后，换另一侧腿重复动作。', '确保滑轮与脚踝的连接稳固，避免钢索脱落导致意外受伤。,保持核心收紧，避免在抬起腿部时出现腰部下沉或过度扭转。,在动作全程保持膝关节微屈，避免锁定或过度伸展，以减少膝部压力。', '动作幅度不足，仅做小幅度抬腿，未能充分刺激臀部外侧肌肉。,在抬腿时将躯干向抬起腿侧倾斜，导致重心偏移，降低目标肌群的负荷。,使用过大的重量导致身体摆动或使用惯性完成动作，影响动作质量并增加受伤风险。', '如果感觉腰部压力过大，可适当降低站姿的倾斜角度；如果平衡不足，可先用一只手扶住固定杆或墙壁，待熟练后再逐步放开；重量选择应以能够完成标准动作范围为宜，避免使用过重的负荷。', 'isolation', '{"变体类型":"侧卧髋外展或使用弹力带进行站姿髋外展","转换建议":"若没有 cable 器械，可在侧卧姿势下使用弹力带或哑铃进行髋外展，以保持相同的肌肉刺激效果。"}', 'published', NOW(3), NOW(3));
SET @eid_233 = LAST_INSERT_ID();
-- Suggested muscle: 臀中肌 (agonist)
-- Suggested muscle: 臀小肌 (agonist)
-- Suggested muscle: 阔筋膜张肌 (synergist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 股二头肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('罗马尼亚硬拉', 'legs', 'barbell', 'intermediate', NULL, '1. 站姿准备：双脚与肩同宽，脚尖略外，膝盖微屈，双手握杠铃，握距略宽于肩。\n2. 起始姿势：背部保持自然弧度，胸部略微抬起，臀部略微向后推出，形成类似“铰链”姿势，眼睛平视前方。\n3. 下降动作：臀部向后推，膝盖保持微屈，杠铃沿大腿前侧缓慢下降至小腿中部或略低于膝盖位置，感受腿后链的拉伸，保持背部平直且核心收紧。\n4. 推起返回：靠臀部和大腿后侧发力，驱动臀部向前，将杠铃沿原路径拉回至站立姿势，整个过程保持背部挺直、核心紧绷。\n5. 呼吸配合：下降时吸气，推起时呼气，保持呼吸与动作同步，避免憋气。', '在整个动作中保持背部自然弧度，避免出现圆背或过度拱背，以免对腰椎产生过大压力。,使用适当负荷，初学者或腰部有不适时建议在教练或有经验的伙伴监督下进行，并可先用哑铃或壶玲练习。,下降时若出现腰部或膝关节疼痛，应立即停止并调整姿势或减轻重量，避免受伤。', '背部弓背或圆背，导致腰椎受压，增加受伤风险。,膝盖过度前移，破坏了髋铰链模式，使腿部成为主要驱动，降低对臀部和大腿后侧的刺激。,仅用手臂或上背部力量抬起杠铃，未充分利用臀部和大腿后侧的发力，削弱动作效果。', '初学者可先用哑铃或壶玲进行练习，以掌握髋铰链的动作轨迹；柔韧性不足者可把杠铃放在垫块或使用矮凳限制下降深度；若想更强调腘绳肌，可尝试单腿罗马尼亚硬拉或使用TRX悬吊训练；使用trap bar或EZ杆可以改变握法，减轻手腕和前臂的负担。', 'compound', '{"哑铃罗马尼亚硬拉":"使用哑铃代替杠铃，保持相同的髋铰链模式，重量相对轻一些，适合单手练习或肩部不适者。","单腿罗马尼亚硬拉":"在单腿支撑下进行，提高核心稳定性和髋部单侧力量，可借助墙壁或固定物辅助平衡。","壶玲罗马尼亚硬拉":"壶玲中心更低，有助于更好地感受髋铰链，并能在一定程度上加强前臂力量。","EZ杆罗马尼亚硬拉":"EZ杆的斜向握把可以减轻手腕和前臂的负担，适合手腕有伤的训练者。","绳索罗马尼亚硬拉":"在绳索机上进行，保持同样的铰链模式，重量可通过滑轮调节，适合康复训练。"}', 'published', NOW(3), NOW(3));
SET @eid_198 = LAST_INSERT_ID();
-- Suggested muscle: 腘绳肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 竖脊肌 (synergist)
-- Suggested muscle: 股四头肌 (antagonist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 腓肠肌 (stabilizer)
-- Suggested muscle: 比目鱼肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('腿举', 'legs', 'barbell', 'intermediate', NULL, '1. 准备姿势：将上背部靠在稳固的训练凳上，双脚平放在地面上，宽度约与肩同宽，膝盖弯曲约90度。2. 调整杠铃：将杠铃置于髋部前方的垫子上（可以使用专用的杠铃垫），确保杠铃正好在髋骨上方，不会滑动。3. 起始姿势：双手握住杠铃，手臂自然下垂，保持肩部收紧，核心收紧，背部保持自然弧线。4. 发力向上：利用臀部和大腿后侧的力量，平稳向上推起髋部，直到身体呈一直线（从肩膀到膝盖），臀部收紧用力。5. 顶峰保持：在最高点停顿约1-2秒，确保臀部充分收缩，避免过度伸展下背。6. 下降控制：缓慢而有控制地放下髋部，回到起始姿势，膝盖保持微屈，避免猛然下落。', '1. 确保杠铃稳固放置在下背部或使用垫子，以防压伤。2. 动作全程保持脊柱自然弧线，避免拱背或塌腰。3. 选用合适的重量，并在有经验伙伴或教练的监督下进行。', '1. 在向上推举时过度弓背或抬起肩膀，导致下背过度伸展。2. 动作未完全伸展臀部顶峰，只做半程动作。3. 使用冲力或弹跳的方式下降，导致控制不稳。', '1. 调整脚距和角度以更好激活臀部或大腿后侧。2. 改变凳子高度或使用垫块来改变动作幅度。3. 如感到腰部不适，可使用护腰带或改为单腿变体。', 'compound', '{"单腿变体":"将双脚改为单腿进行，以提升平衡和单侧力量","哑铃变体":"使用哑铃代替杠铃，保持相同的运动轨迹","机器变体":"在腿举机上完成相同的动作，适合初学者"}', 'published', NOW(3), NOW(3));
SET @eid_202 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 核心肌群（腹直肌、腹外斜肌） (stabilizer)
-- Suggested muscle: 髋内收肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('腿举机', 'legs', 'machine', 'beginner', NULL, '1. 调整座椅，使脚踩在脚踏板上的位置与肩同宽，膝盖与脚尖方向一致。\n2. 背部紧贴靠背，双手握住手柄，保持核心收紧。\n3. 解除安全锁，慢慢屈膝、屈髋，将重量下降至大腿与小腿约成90度角，注意下背部不要离开靠背。\n4. 呼气时通过脚后跟发力，伸膝伸髋，将重量推回起始位置，避免完全锁死膝盖。\n5. 完成指定次数后，将重量安全放回支撑架，锁定安全装置。', '1. 始终确保重量已完全放在支撑架上再离开机器，防止意外滑落。\n2. 动作全程保持脊柱自然弧度，避免过度弓背或塌背。\n3. 不要在膝关节完全伸直后继续用力，以防膝关节受到冲击。', '1. 脚踩位置过宽或过窄导致膝盖内翻，增加膝关节压力。\n2. 下降时腰部离开靠背，形成弓背姿势，容易导致腰椎受伤。\n3. 推举时只用前脚掌发力，使小腿后侧肌肉过度紧张。', '1. 座椅高度：让膝盖在最低点仍保持约90度，避免过度深蹲。
2. 脚踏板角度：脚尖略微向外可以更好刺激臀大肌，保持膝盖与脚尖方向一致。
3. 起始重量：先使用较轻重量的空杆或最低配重，熟练后再逐步增加。', 'compound', '{"无器械变体":"可以做深蹲、弓步蹲或单腿深蹲，侧重同样的髋膝联动。","单腿变体":"在机器上采用单腿腿举，可提高核心稳定性和髋部力量。","负重变体":"使用哑铃或杠铃进行负重深蹲或前蹲，增加负荷并改变发力模式。"}', 'published', NOW(3), NOW(3));
SET @eid_241 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腓肠肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('腿伸展', 'legs', 'machine', 'beginner', NULL, '1. 调整座椅高度，使膝盖中心与机器转动轴对齐；2. 调整脚垫位置，使其紧贴脚踝上部；3. 坐直，背部紧贴靠背，双手握住把手；4. 呼气时缓慢伸展双腿至几乎伸直，注意膝关节不要完全锁定；5. 在最高点稍作停顿，收紧股四头肌；6. 吸气时缓慢弯曲膝盖回到起始位置，保持控制。', '使用前检查机器锁定装置是否牢固，防止意外滑落。,避免在膝关节完全伸直时锁死，以防止关节受过大的冲击。,初始重量选择轻负荷，逐步增加，避免因负荷过大导致姿势变形。', '使用过重的重量导致动作不规范，出现拱背或抬起脚后跟的情况。,在伸展过程中抬起臀部或脚后跟，使髋部参与，减少股四头肌的孤立刺激。,动作过快，缺乏控制，容易导致肌肉拉伤或关节冲击。', '调节座椅高度使膝盖中心对齐机器转动轴；根据个人身高调节脚垫位置，确保踝关节舒适；背部靠垫要紧贴背部，如有必要可使用垫子提升舒适度和支撑。', 'isolation', '{"单腿伸展":"将脚垫改为单侧使用，保持平衡，逐步增加单腿负荷，以增强股四头肌的单独训练效果。","站姿腿伸展":"如果想要结合髋部伸展，可改用站姿腿伸展或使用深蹲机进行复合训练，以提升整体下肢力量。"}', 'published', NOW(3), NOW(3));
SET @eid_242 = LAST_INSERT_ID();
-- Suggested muscle: 股直肌 (agonist)
-- Suggested muscle: 股外侧肌 (agonist)
-- Suggested muscle: 股内侧肌 (agonist)
-- Suggested muscle: 腘绳肌 (antagonist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('腿伸展机单腿', 'legs', 'machine', 'intermediate', NULL, '1. 调整机器：把座椅高度调至使膝盖与机器转轴平齐，背部紧贴靠背，双手握住扶手。\n2. 设定单腿：将左脚放在垫子上，右脚抬起放在固定台上，确保膝盖略微弯曲。\n3. 启动动作：深吸一口气，收紧核心，慢慢伸展右腿至膝关节完全伸展，保持大腿上部不离开垫子。\n4. 顶峰收缩：在膝关节完全伸展的瞬间，停顿1-2秒，感受股四头肌的收缩。\n5. 复原动作：缓慢屈膝回到起始位置，保持控制，避免猛然放下，以免对膝关节产生冲击。\n6. 重复次数：完成设定的次数后，换另一条腿进行相同的训练。', '1. 调整座椅和垫子高度，使膝盖与器械轴心对齐，防止膝关节承受不必要的扭力。\n2. 使用适当的重量，避免在动作顶端猛然锁死膝盖，以免造成关节损伤。\n3. 保持核心收紧、脊柱自然直立，避免背部拱起或过度前倾。', '1. 重量过大导致上背离开靠背，出现拱背借力现象。\n2. 在伸展过程中膝盖未完全对齐器械轴心，导致侧向剪切力。\n3. 在下降时快速弹回，利用惯性而非肌肉控制，容易引起膝关节冲击。', '根据个人身高和腿长微调座椅高度，使膝盖与机器转动轴心在同一水平线上；调节垫子位置，使脚踝舒适放置；确保靠背角度适合背部支撑，避免腰部悬空。', 'isolation', '{"双腿模式":"如果想要同时锻炼双腿或增加总负荷，可切换到双腿模式进行练习。","坐姿腿弯举":"想加强腿后侧（腘绳肌），可将训练转向坐姿腿弯举或俯卧腿弯举。","哑铃弓步":"若想加入功能性力量和平衡训练，可使用哑铃进行单腿弓步或保加利亚深蹲。","自由重量单腿深蹲":"在具备一定稳定性后，可尝试使用杠铃或哑铃进行单腿深蹲，以提升整体下肢力量和核心协同。","阻力带腿伸展":"在没有机器的情况下，可使用阻力带进行单腿伸展练习，同样能够激活股四头肌。"}', 'published', NOW(3), NOW(3));
SET @eid_255 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 腘绳肌 (antagonist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (stabilizer)
-- Suggested muscle: 小腿前肌群（胫骨前肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('腿弯举机单腿', 'legs', 'machine', 'intermediate', NULL, '1. 调整机器座椅高度，使脚垫位于小腿远端，膝盖正对机器铰链中心。\n2. 站立在机器侧面，单脚踩在脚垫上，另一只脚轻轻放在地面或支撑上保持平衡。\n3. 收紧核心，背部保持自然直立，避免弓背或前倾。\n4. 缓慢屈膝，将脚垫向臀部方向卷起，直到大腿后侧感到充分收缩，保持约1-2秒。\n5. 缓慢释放力量，匀速将脚垫放回起始位置，膝盖不完全伸展，以保持肌肉张力。\n6. 完成设定次数后，换另一侧腿重复，或根据训练计划交替进行。', '1. 在使用前确认机器的固定装置已锁紧，防止脚垫意外脱落。\n2. 保持动作全程控制，避免使用冲力或弹力，以防肌肉拉伤。\n3. 如出现膝盖或下背部不适，应立即停止并咨询专业教练或医生。', '1. 抬起臀部或使用下背部的力量帮助完成动作，导致训练效果减弱并增加腰背压力。\n2. 动作幅度过浅，仅做小幅度屈膝，未能充分刺激腘绳肌。\n3. 选用过重的负荷，导致技术失控或出现不正确的姿势。', '1. 根据个人身高调节座椅高度，使膝盖与机器铰链对齐，保证自然运动轨迹。
2. 脚垫位置应紧贴小腿远端，避免压迫脚踝。
3. 如肩部或背部有不适，可适当降低配重或使用手柄帮助保持平衡。', 'isolation', '{"双腿变体":"将单腿练习改为双腿同步进行，保持相同的动作幅度和重量，适合初学者或作为热身。","站姿腿弯举":"改用自由重量（如哑铃或杠铃）进行站姿腿弯举，增加核心稳定要求，兼顾平衡训练。"}', 'published', NOW(3), NOW(3));
SET @eid_256 = LAST_INSERT_ID();
-- Suggested muscle: 腘绳肌（半腱肌、半膜肌） (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 股四头肌 (antagonist)
-- Suggested muscle: 核心肌群（腹横肌、背部深层） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('臀推', 'legs', 'bodyweight', 'beginner', NULL, '1. 预备姿势：仰卧在平坦的地面上，双膝弯曲，双脚平放在地面上，与肩同宽，双手自然放在身体两侧。\n2. 收紧核心与臀部，确保下背部平贴地面，避免拱背。\n3. 通过脚掌向下踩地，同时用力将髋部向上推起，直至身体从肩膀到膝盖呈一条直线，臀部达到最高点时用力夹紧。\n4. 在最高点保持1-2秒，感受臀大肌的收缩。\n5. 缓慢控制下放髋部，回到起始姿势，重复动作。\n6. 整个过程中保持呼吸均匀，上升时吸气，下降时呼气。', '1. 确保下背部始终贴地，防止腰椎过度伸展造成伤害。\n2. 避免使用颈部或肩膀抬起身体，保持头部自然放松。\n3. 如感到腰部不适或疼痛，应立即停止并调整姿势或降低动作幅度。', '1. 臀推时只靠腰部抬起，导致下背压力过大。\n2. 没有在最高点充分收紧臀部，失去对臀大肌的刺激。\n3. 动作过快或失去控制，未能做到全程平稳。', '1. 初学者可以把双脚放在稍微离身体更远的位置，以降低难度。
2. 如需要增加难度，可在膝盖上方放置阻力带或使用单腿进行单腿臀推。
3. 使用垫子或软垫可以减轻对尾椎的压力。', 'compound', '{"单腿臀推":"将一条腿抬起伸直，保持身体平衡后进行臀推，可加强核心稳定性和单侧臀大肌力量。","负重臀推":"在髋部放置哑铃、杠铃片或壶铃进行负重训练，以提升阻力并进一步刺激臀大肌。","靠墙臀推":"背靠墙壁进行动作，可帮助保持正确的身体线条，适合作为热身或康复练习。","桥式深蹲":"在完成一次臀推后，缓慢下放至半蹲姿势，再回到桥式，形成复合动作，兼顾臀腿力量。"}', 'published', NOW(3), NOW(3));
SET @eid_274 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 股二头肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('臀推机', 'legs', 'machine', 'beginner', NULL, '1. 调整器械：先将座椅高度调整到合适位置，使垫子正好位于髋关节处，背部靠垫应支撑住上背部，肩部略微低于髋部位置。\n2. 准备姿势：坐上器械，将双脚平放在脚踏平台上，间距与肩同宽，膝盖弯曲约90度，双手握住侧边手柄。\n3. 预热启动：深吸一口气，收紧核心肌群，为接下来的动作做好准备。\n4. 髋部发力：用臀部肌肉发力，将垫子向上推，同时伸髋，直到大腿与上身呈一条直线，身体完全伸展。\n5. 顶峰收缩：在动作最高点暂停1-2秒，充分感受臀部肌肉的收缩，但不要让腰椎过度伸展。\n6. 缓慢下放：呼气，缓慢控制重量下放，臀部保持张力，直到回到起始位置。重复动作。', '确保器械各部件已锁紧且运动轨道顺畅后再开始训练；整个动作过程中保持核心收紧以维持脊柱中立位置，避免下背部过度弯曲；使用适当的重量，从轻重量开始逐渐增加，避免因重量过大导致动作变形或受伤。', '动作范围不完整，仅做半程推举，未能充分伸展和收缩臀部肌肉；过度依赖腿部发力而非臀部发力，导致腿后侧和下背部代偿；快速推起和下落，缺少对动作的控制，应保持稳定的速度以确保肌肉持续张力。', '座椅高度可根据身高和腿长微调，确保垫子位置舒适且能有效刺激目标肌群；脚的位置可以稍作调整，靠前放置可增加股四头肌参与，靠后放置则更加强调臀部激活；背部靠垫位置应根据个人身形调整，保证运动过程中身体稳定。', 'compound', '{"徒手变体":"可以先进行徒手臀桥练习来建立动作模式和肌肉控制，然后再过渡到器械训练","自由重量变体":"杠铃臀推或哑铃臀推可作为替代，但需要更多平衡和稳定性控制","机器到自重":"熟练掌握器械后，可尝试无器材的臀推或单腿臀推变体以增加挑战性"}', 'published', NOW(3), NOW(3));
SET @eid_246 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 股二头肌（腘绳肌） (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 髋内收肌 (synergist)
-- Suggested muscle: 股薄肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('药球深蹲跳', 'legs', 'other', 'intermediate', NULL, '1. 站立，双脚与肩同宽，双手握住药球置于胸前，保持背部挺直。\n2. 屈髋屈膝，缓慢下蹲至大腿至少与地面平行，膝盖对齐脚尖，胸部保持向前。\n3. 在下蹲底部稍作停顿，准备向上爆发。\n4. 通过脚尖和臀部发力，猛然向上跳起，同时将药球向上挥动，以增加上冲力。\n5. 落地时先以脚尖轻轻着地，屈膝缓冲，恢复至半蹲姿势，准备下一次动作。\n6. 重复进行设定的次数或时间。', '确保地面干燥防滑，避免跳跃时滑倒受伤。,保持核心收紧，避免在起跳或落地时出现腰部过度弯曲或塌背。,如果出现膝关节不适，应立即停止并降低跳跃高度或改用无跳版本。', '落地时膝盖锁死，导致膝关节冲击过大。,下蹲时臀部后移不足，导致重心过度前倾。,跳跃时未充分利用臀部与大腿力量，单纯靠小腿蹬地，导致高度不足。', '初学者可以先用轻重量药球或只做无跳的深蹲来掌握动作。,若关节压力较大，可在软垫或瑜伽垫上进行跳跃，减轻冲击。,对平衡有困难的练习者，可先在稳固的支撑物旁进行，以防失衡。', 'compound', '{"无跳版本":"保持药球胸前，只做深蹲不下跳，重点放在股四头肌和臀大肌的等长收缩。","单腿药球深蹲跳":"单脚支撑完成深蹲跳，增加髋部和踝关节的稳定性需求。","高脚杯药球深蹲跳":"将药球举起过头或置于胸前上方，增加上肢和核心的参与度，提高整体复合性。"}', 'published', NOW(3), NOW(3));
SET @eid_292 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀中肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('蝴蝶机髋内收', 'legs', 'machine', 'beginner', NULL, '1. 调整机器坐垫高度，使腿部外侧垫与大腿外侧对齐。\n2. 坐下，背部紧贴靠背，双手握住手柄。\n3. 将双腿放置在两侧垫上，保持膝盖略微弯曲，脚尖向前。\n4. 用力将双腿向中间靠拢，收紧大腿内侧肌肉，保持动作顶峰收缩约1-2秒。\n5. 缓慢放松双腿回到起始位置，保持控制不要让重量突然掉落。\n6. 完成所需次数后，停止机器并将垫子放回原位。', '1. 运动前进行5-10分钟的热身，特别是髋关节和大腿内侧。\n2. 使用合适的重量，避免使用过重导致动作失控。\n3. 保持背部始终紧贴靠背，避免背部弓起或前倾。', '1. 使用过大的重量导致借力，身体前后摆动。\n2. 动作幅度不完整，仅做部分收缩就返回。\n3. 膝盖过伸或过度弯曲，导致膝关节受力不均。', '1. 根据个人身高调节座椅高度，使腿部垫位于大腿外侧的中部。
2. 调整腿部垫的宽度，使双腿自然张开而不感到压迫。
3. 确认靠背的角度合适，保持脊柱自然弧度。', 'isolation', '{"站姿拉力带髋内收":"使用弹力带固定在脚踝处，站立时向内收腿，可作为机器动作的替代。","侧卧哑铃髋内收":"侧卧时手持哑铃或沙袋，放在上侧腿上进行内收动作，适用于无机器环境。","坐姿弹力绳髋内收":"坐在椅子上，将弹力绳固定在脚踝内侧，向内拉绳进行收缩，适合家庭练习。"}', 'published', NOW(3), NOW(3));
SET @eid_258 = LAST_INSERT_ID();
-- Suggested muscle: 长收肌 (agonist)
-- Suggested muscle: 短收肌 (agonist)
-- Suggested muscle: 大收肌 (agonist)
-- Suggested muscle: 耻骨肌 (synergist)
-- Suggested muscle: 股薄肌 (synergist)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 腰方肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('蝴蝶机髋外展', 'legs', 'machine', 'beginner', NULL, '1. 调整坐垫高度，使膝盖与器械的腿垫对齐，确保双腿自然下垂。\n2. 根据个人体型调节腿垫宽度，使其贴合大腿外侧，但不影响血液循环。\n3. 坐下，背部紧贴靠背，双手握住侧面手柄，收紧核心保持脊柱中立。\n4. 脚尖稍微向外旋（约10-15度），在呼气时缓慢将双腿向外展开，感受臀中肌的收缩。\n5. 当双腿展开至最大舒适角度（约45-60度）时，保持顶峰收缩1-2秒，确保肌肉张力。\n6. 在吸气时缓慢将双腿收回至起始位置，避免弹力或惯性，全程保持动作平稳。', '使用器械前务必确认所有调节部位已锁紧，防止在运动过程中出现滑动或卡阻。,重量选择应适中，避免使用过大的负荷导致动作失控或产生腰部代偿。,保持背部始终靠在靠背上，避免在动作过程中弓背或前倾，以减少腰椎压力。', '动作过快、借助惯性完成外展，导致目标肌肉刺激不足。,腿部外展时脚尖过度外旋或内收，改变了髋关节力的方向，增加膝关节负担。,上半身在使用时抬起肩膀或耸肩，导致肩部参与力量，分散了对臀中肌的专注。', '坐垫高度：调节至大腿与地面平行或略微低于髋关节，以确保髋关节自然外展角度。,腿垫宽度：根据大腿外侧宽度调整，使垫子贴合但不至于压迫，防止血液循环受阻。,阻力范围：如果感到外展幅度受限，可适当降低阻力或调整起始角度，以实现全程运动范围。', 'isolation', '{"站姿侧卧侧抬腿":"将机器髋外展转换为自由动作时，可使用弹力带或侧卧侧抬腿；在站姿时，可将弹力带固定在脚踝处，侧向抬腿模仿机器的运动轨迹，保持核心稳定并控制速度。","侧卧侧抬腿":"在侧卧姿势下抬起上侧腿，专注于臀中肌的收缩；此变体可帮助练习者在没有机器的情况下保持相同的肌肉激活模式。"}', 'published', NOW(3), NOW(3));
SET @eid_257 = LAST_INSERT_ID();
-- Suggested muscle: 臀中肌 (agonist)
-- Suggested muscle: 臀小肌 (synergist)
-- Suggested muscle: 阔筋膜张肌 (synergist)
-- Suggested muscle: 髂胫束（外侧髂胫束） (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 大腿内收肌群 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('跳跃深蹲', 'legs', 'bodyweight', 'intermediate', NULL, '1. 站立，双脚与肩同宽，脚尖略微外展，双手自然下垂或放在胸前。\n2. 吸气，屈膝屈髋，将重心下降，保持胸部挺直，膝盖不超过脚尖太多，臀部向后移动，下蹲至大腿约与地面平行。\n3. 在最低点用力蹬地，同时向上爆发性伸展髋、膝、踝三关节，使身体腾空，双手向上摆动以增加动力。\n4. 在空中保持身体直立，双脚收紧，脚尖指向正前方。\n5. 落地时前脚掌先触地，随即屈膝缓冲，保持膝盖对齐，避免膝盖内扣，保持核心收紧，防止身体前倾。重复进行。', '1. 充分热身，尤其是下肢和踝关节。\n2. 落地时膝盖要微微弯曲，避免锁死，以减轻膝关节冲击。\n3. 确保训练空间上方没有障碍物，地面平整防滑，穿着合适的运动鞋。', '1. 下蹲深度不足，膝盖未超过脚尖或臀部未下降至大腿与地面平行。\n2. 落地时膝盖过度内扣或锁死，导致膝关节受伤。\n3. 身体前倾过多，重心不稳，导致背部压力增加。', '1. 初学者可先练习普通深蹲，逐步加入小幅跳跃；熟练后可尝试箱跳或单腿跳跃。
2. 若感到膝部不适，可改用无跳跃的深蹲或降低跳跃高度，增加落地缓冲。
3. 可通过调节脚距（宽站距或窄站距）来改变髋部与大腿内侧的参与程度。', 'compound', '{"变体类型":"普通深蹲","转换建议":"去掉跳跃环节，仅进行标准深蹲，以降低冲击并强化力量"}', 'published', NOW(3), NOW(3));
SET @eid_280 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 比目鱼肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 髋内收肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('蹬阶', 'legs', 'bodyweight', 'beginner', NULL, '1. 站在稳固的踏板或台阶前，双脚与肩同宽，保持身体直立，目光平视。\n2. 将左脚（或右脚）稳稳踏上平台，脚掌全脚掌着地，膝盖略微弯曲，核心收紧。\n3. 通过左腿的脚后跟和前脚掌发力，将身体向上推起，直到左腿完全伸直，右腿自然抬起至约90度屈膝位置。\n4. 到达平台最高点后，稍微停顿，确保姿势稳定，然后控制性地向下放右脚，回到起始位置。\n5. 完成设定的次数后，换另一条腿进行相同的动作，交替完成整个训练组。', '1. 确保踏板稳固、表面防滑，避免踏空或滑倒。\n2. 上踏时避免膝盖过度前伸超出脚尖，以保护膝关节。\n3. 下降过程要控制速度，避免猛然下踏导致关节冲击。', '1. 上踏时未将脚掌全部放在平台上，导致不稳定。\n2. 在上踏或下踏时躯干过度前倾，重心前移增加腰背压力。\n3. 使用非主力腿的推力来完成上踏，降低了目标肌群的刺激。', '如果难度过高，可降低踏板高度或双手扶墙以保持平衡；如果想增加挑战，可手握哑铃、选择更高的踏板或进行单腿蹬阶。', 'compound', '{"侧向蹬阶":"改变上踏方向，侧向踏步能够加强髋外展肌和核心侧向稳定性，适用于进阶训练或针对单侧肌群强化。"}', 'published', NOW(3), NOW(3));
SET @eid_282 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 腘绳肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('雪橇推', 'legs', 'other', 'advanced', NULL, '1. 调整雪橇的负荷，确保重量适合自己的高级水平。\n2. 站姿站立，脚距略宽于肩，脚尖略外旋，双手握住雪橇的手柄或横杆。\n3. 屈髋屈膝，保持背部平直，胸部挺起，目视前方。\n4. 通过脚掌向下用力，推动雪橇向前移动，保持膝盖与脚尖同向。\n5. 当雪橇向前推出约1-2米后，用腿部的力量将雪橇停下来，或按训练需求继续前进。\n6. 完成指定次数后，缓慢将雪橇拉回起始位置，注意控制动作的平稳。', '1. 确保雪橇的轮子或滑轨无损坏，防止失控。\n2. 保持背部挺直，避免在推举时出现腰背过度弯曲。\n3. 使用合适的鞋子和地面，防止滑倒或受伤。', '1. 上身前倾过多，导致背部压力增大。\n2. 膝盖向内扣（内翻），增加膝关节负担。\n3. 推雪橇时只用前脚掌，脚后跟离地，导致力量不均衡。', '1. 如感肩部或背部不适，可稍微放宽握距或降低负荷。
2. 若要增加难度，可在斜坡上进行或在雪橇上加链条进行冲刺式推。
3. 对于膝盖不适者，可适当缩短步幅或改为半蹲姿势推雪橇。', 'compound', '{"单手雪橇推":"将雪橇换成单手握把，进行单侧推，以增强核心和单侧腿部力量。","高脚雪橇推":"在雪橇前部加高脚架，使身体倾斜角度更大，主要强化臀部和大腿后侧。","阻力带辅助雪橇推":"在雪橇后部拴上阻力带，提供反向阻力，增加启动阶段的力量需求。"}', 'published', NOW(3), NOW(3));
SET @eid_296 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (stabilizer)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 核心肌群（腹直肌、腹外斜肌） (stabilizer)
-- Suggested muscle: 小腿前侧（胫前肌） (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('靠墙深蹲', 'legs', 'bodyweight', 'intermediate', NULL, '1. 背靠墙壁站立，双脚与肩同宽，脚尖略微朝外，背部紧贴墙面。\n2. 保持背部贴墙，缓慢向下滑动身体，直到大腿与地面平行，小腿与大腿呈90度角。\n3. 双手可以自然垂放于身体两侧，或放在膝盖上方以帮助稳定。\n4. 确保膝盖对齐脚尖方向，不要让膝盖内扣或超过脚尖过多。\n5. 保持此靠墙蹲姿势，根据个人能力维持30-60秒或按训练计划设定的时间。\n6. 收紧核心肌肉，保持呼吸平稳，然后缓慢向上滑动回到起始站立位置。', '1. 确保墙壁干净平整，地面无滑倒风险，避免在湿滑地面上进行训练。\n2. 如果感到膝盖疼痛或不适，应立即停止动作，避免造成关节损伤。\n3. 初学者建议有人在旁边看护，或从较短时间开始逐步增加难度。', '1. 膝盖内扣或膝盖超过脚尖过多，增加膝关节压力。\n2. 腰部离开墙壁拱背，导致腰椎压力过大。\n3. 动作速度过快，缺乏对姿势的控制，无法达到有效锻炼效果。', '1. 初学者可以先从较高位置开始（大腿与地面角度大于90度），逐步增加下蹲深度。
2. 可将一把椅子放在身后作为深度参考，帮助控制下蹲范围。
3. 如需增加难度，可以抬起双臂向前伸展或将双手举过头顶。', 'compound', '{"变体类型":"可通过单腿靠墙深蹲增加难度，或将脚跟抬离地面进行踮脚版本以加强小腿参与。","退阶版本":"可以减少保持时间或减小下蹲深度，扶着椅背辅助完成动作。"}', 'published', NOW(3), NOW(3));
SET @eid_273 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 小腿肌群 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('驴式腿弯举', 'legs', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：跪地或俯卧在平整的地面上，双手撑地或扶住固定物体，保持身体平直，膝盖轻微弯曲，脚尖着地。\n2. 稳定核心：收紧腹部和臀部，保持脊柱中立，避免弓背或塌腰。\n3. 执行弯举：慢慢将脚向臀部方向屈膝，像驴子抬腿一样，注意只用腿后侧的肌肉发力，上半身保持固定。\n4. 高峰收缩：到达最高点时，停顿1‑2秒，充分感受腘绳肌的收缩。\n5. 缓慢回归：控制性地慢慢放低腿部至起始位置，避免快速弹回。\n6. 重复动作：按目标次数完成动作，保持呼吸节奏（屈膝时吸气，伸膝时呼气）。', '动作前务必进行下肢和腘绳肌的充分热身，以防拉伤。,保持核心收紧，防止腰椎过度屈曲或过度伸展，避免下背部受伤。,使用垫子或毛巾保护膝盖和脚踝，地面过硬的场所可加软垫减轻压迫感。', '使用冲力或摆动身体完成弯举，导致肌肉参与度下降且增加受伤风险。,膝盖外展或内收幅度过大，使膝关节受力不均，引起不适。,动作幅度不足，未能完整屈膝或伸膝，降低训练效果。', '初学者可以在膝盖下放一个垫子或使用凳子支撑上半身，减小动作范围；熟练后可尝试单腿版或使用弹力带增加阻力，以提升挑战度。若场地限制，可改为站姿单手扶墙进行类似的腿后侧弯举。', 'isolation', '{"站姿腿弯举":"保持站立，单手扶墙或固定物体，屈膝抬起小腿至臀部，动作与驴式相同，适合没有地面空间的场合。","坐姿腿弯举":"坐在椅子或凳子上，双脚平放在地面，膝盖弯曲向上抬小腿，难度略低，适合膝关节不适者。","弹力带腿弯举":"将弹力带套在脚踝，另一端固定在地面或家具上，施加额外阻力，提高肌肉刺激。","单腿版":"仅用一条腿完成全部弯举动作，增强平衡感和单侧肌肉力量，有助于纠正左右不均衡。"}', 'published', NOW(3), NOW(3));
SET @eid_276 = LAST_INSERT_ID();
-- Suggested muscle: 腘绳肌（股二头肌、半腱肌、半膜肌） (agonist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 股四头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('髋内收机', 'legs', 'machine', 'beginner', NULL, '1. 调整座椅高度，使大腿上方靠垫与大腿根部对齐；2. 将腿部内收垫调节到舒适的位置，确保垫子能够贴合大腿内侧；3. 坐在机器上，背部紧贴靠背，双手握住两侧手柄，保持自然坐姿；4. 慢慢用力将双腿向中间靠拢，感受大腿内侧肌肉的收缩，保持约2秒的顶峰收缩；5. 缓缓放回起始位置，控制重量不要猛然弹回，完成所需次数。', '使用前检查机器是否稳固，座椅与靠背无松动；避免使用过重负荷导致动作失控；在动作过程中保持背部紧贴靠背，防止腰背受伤。', '使用过大的重量导致动作不完整或利用惯性完成动作；身体前倾或倾斜导致姿势不稳；动作速度过快，未能充分控制内收时的顶峰收缩。', '根据个人腿长调整坐垫高度，使腿部自然伸直；内收垫角度可根据个人舒适度微调，确保贴合大腿内侧；背垫的倾斜角度可以略微后仰以提供更好的背部支撑。', 'isolation', '{"变体类型":"可改用站姿绳索内收、侧卧腿举起或使用哑铃进行单腿内收练习，以增加功能性训练。"}', 'published', NOW(3), NOW(3));
SET @eid_245 = LAST_INSERT_ID();
-- Suggested muscle: 大腿内收肌（内收长肌） (agonist)
-- Suggested muscle: 大腿内收肌（内收短肌） (agonist)
-- Suggested muscle: 股薄肌 (synergist)
-- Suggested muscle: 耻骨肌 (synergist)
-- Suggested muscle: 臀中肌（前部纤维） (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('髋外展机', 'legs', 'machine', 'beginner', NULL, '1. 调整座椅高度，使大腿外侧垫对准髋关节中心，双脚平放于踏板或垫子上。\n2. 坐稳，背部紧贴靠背，双手握住把手保持平衡。\n3. 缓慢向外抬起腿部，保持膝关节略屈，踝关节保持中立位置，感受臀中肌的收缩。\n4. 达到最大外展角度后，稍微停顿1‑2秒，确保肌肉充分受力。\n5. 缓慢将腿放回起始位置，控制动作速度，避免猛然放下。\n6. 完成预定次数后，重复或换腿练习。', '1. 动作全程保持背部紧贴靠背，避免弓背或前倾导致腰背压力。\n2. 使用适当重量，避免超出自身承受范围，以防止关节扭伤。\n3. 在机器上确认垫子已固定，防止在运动过程中滑动或卡住。', '1. 将腿抬得过高或过快，导致肌肉失去张力。\n2. 背部和骨盆未保持稳定，出现侧倾或旋转。\n3. 使用过大的重量导致姿势走形，无法完成完整动作范围。', '1. 根据个人身高调节座椅高度，使腿部外侧垫位于髋关节正上方。
2. 调整垫子深度，使大腿外侧接触垫子而非膝盖或小腿。
3. 若机器提供可调节的阻力范围，选用轻重量开始，逐步增加。', 'isolation', '{"侧卧髋外展":"在没有机器的情况下，可侧卧在垫子上，使用弹力带或哑铃进行髋外展，同样能有效激活臀中肌。"}', 'published', NOW(3), NOW(3));
SET @eid_244 = LAST_INSERT_ID();
-- Suggested muscle: 臀中肌 (agonist)
-- Suggested muscle: 臀小肌 (synergist)
-- Suggested muscle: 内收肌群 (antagonist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('高杠深蹲', 'legs', 'barbell', 'beginner', NULL, '1. 准备阶段：双脚与肩同宽或略宽，脚尖适度外展，站在杠铃下方。双手握杠，握距略宽于肩，手掌向上，手指均匀包裹杠铃。\n2. 上杠：深吸气，收紧核心，利用腿部力量将杠铃从支架上抬起，后退一步至站立姿势，保持背部挺直，杠铃位于高杠位（即斜方肌上部）。\n3. 起始姿势：收紧臀部、腹部，保持胸部抬起，视线向前或略向上。肩胛骨轻微后收，杠铃保持在斜方肌上方的自然凹陷处。\n4. 下蹲：屈髋、屈膝同步进行，保持膝盖沿脚尖方向移动，臀部向后下方坐，控制下降速度直至大腿上部与地面平行或略低于平行线，保持背部中立。\n5. 上升：脚掌用力蹬地，伸展膝盖和髋关节，将身体向上推起至起始姿势，期间保持胸部抬起、核心收紧，避免膝盖过度内收或外翻。\n6. 归位：完成目标次数后，缓慢将杠铃抬回支架，退出位置。', '1. 训练前进行5-10分钟的有氧热身和动态拉伸，尤其是腿部和核心，以防止肌肉拉伤。\n2. 使用安全支架或请训练伙伴在侧协助，尤其是进行大重量深蹲时，防止意外跌落。\n3. 保持脊柱自然弧度，避免在下降过程中出现背部圆背；下蹲深度应在自己可控范围内，避免超出舒适区导致伤害。', '1. 膝盖向内扣（膝盖内收）导致膝关节受力不均，增加受伤风险。\n2. 背部过度前倾或圆背，使腰椎受到过大压力。\n3. 站距过窄或脚尖外展角度不当，导致平衡不稳或髋部活动受限。', '1. 站距可根据个人髋部结构调整为比肩宽更宽或更窄，以找到最舒适的姿势。
2. 脚尖角度一般保持在15~30度之间，可根据髋部柔韧性进行微调。
3. 握距略宽于肩，手臂略微外旋，有助于肩胛骨的稳固支撑。
4. 若柔韧性不足，可先在半蹲或略低于平行的深度练习，逐步提升下蹲幅度。
5. 大重量训练时可考虑使用护腰带或护膝，提升核心支撑和膝关节保护。', 'compound', '{"低杠深蹲":"将杠铃放置在背部较低的斜方肌位置，重心略微后移，更多调动臀部和大腿后侧发力，适合想要加强臀部收缩的训练者。","前蹲":"将杠铃放在胸前锁骨位置，保持上体直立，主要强化股四头肌和核心力量，对下背部的压力较小。","箱式深蹲":"在身后放置稳固的箱子或平台，下蹲至箱子后站起，可帮助掌握下蹲深度并提高安全性，适合初学者练习动作模式。","单腿深蹲":"将一条腿抬起或放在凳子上进行深蹲，提升单侧腿部力量和平衡感，同时增加髋部灵活性。"}', 'published', NOW(3), NOW(3));
SET @eid_189 = LAST_INSERT_ID();
-- Suggested muscle: 股四头肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腿后腱 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 腓肠肌 (synergist)
-- Suggested muscle: 脊柱竖肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)

