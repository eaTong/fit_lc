-- AI 生成的 core 动作详情
USE fitlc;

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('卷腹', 'core', 'bodyweight', 'beginner', NULL, '1. 躺在垫子上，膝盖弯曲，双脚平放地面，脚跟与髋同宽。\n2. 双手轻放在胸部或交叉放在胸前，避免用手抓住头部。\n3. 收紧腹部，吸气后用力收缩腹肌，使肩膀离开地面，向上卷起。\n4. 在动作顶点稍微停顿，感受腹肌的收缩。\n5. 呼气，缓慢控制腹肌回到起始位置，肩膀轻触垫子但不完全放松。\n6. 重复进行，保持呼吸与动作的节奏一致。', '1. 运动时避免用手拉动颈部，以免造成颈椎受伤。\n2. 如有腰背疼痛或椎间盘问题，请在专业指导下进行或选择其他低风险动作。\n3. 保持动作控制，避免使用惯性或弹力，以防止腹肌过度负荷。', '1. 用手拉动头部或颈部，导致颈部过度用力。\n2. 动作幅度过大，背部离开垫子过多，增加腰椎压力。\n3. 呼吸不协调，吸气时下降、呼气时上升，导致核心不稳定。', '如果需要降低难度，可将双脚抬离地面，靠在墙上或使用瑞士球支撑；如果想增加挑战，可在胸前持哑铃或使用阻力带。', 'isolation', '{"标准卷腹":"可在垫子或地板上进行，动作要点保持腹部收缩。","瑞士球卷腹":"将背部靠在瑞士球上，双脚固定在地面，进行卷腹，可增加核心不稳定训练的难度。","阻力带卷腹":"将阻力带固定在胸部或手上，提供额外阻力，增强腹肌力量。","交叉卷腹":"在标准卷腹基础上，上半身略微向一侧转动，针对斜腹肌进行训练。"}', 'published', NOW(3), NOW(3));
SET @eid_2 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 横腹肌 (stabilizer)
-- Suggested muscle: 胸腰椎伸肌（竖脊肌） (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('上斜板卷腹', 'core', 'bodyweight', 'beginner', NULL, '1. 调整上斜板的角度（约30-45度），双脚稳固踏在地面或踏板上，双手交叉置于胸前或轻触耳后。\n2. 起始姿势为上半身略微后倾，腹部收紧，背部自然靠在板上。\n3. 通过收缩腹直肌，将上背部卷向膝盖方向，注意只使用腹部力量，避免用手臂拉动。\n4. 在顶峰位置（约为肩胛骨离板），保持1-2秒的收缩感，感受到腹部的紧绷。\n5. 缓慢控制地回到起始姿势，保持核心的张力，避免猛然下落。\n6. 完成设定的重复次数后，平稳站起或坐下休息。', '1. 确保斜板的固定装置已锁紧，防止在动作过程中滑动或倒塌。\n2. 动作全程保持脊柱自然对齐，避免过度弓背或过度前倾，以减少腰椎压力。\n3. 若感到下背部或颈部不适，应立即停止并调整姿势或降低难度。', '1. 用手的力量拉动头部和颈部，导致颈椎受压。\n2. 在上升时用力过猛、幅度过大，导致身体失去控制，产生弹振。\n3. 下降时放松核心，导致动作全程缺乏张力，降低训练效果并增加受伤风险。', '新手可以从较低倾斜角度（如20度）开始，逐步适应后再提升倾斜度；若力量不足，可将手放在胸前以减轻颈部压力；进阶时可将手置于耳后或在胸前放置轻量杠铃片以增加阻力。', 'isolation', '{"下斜板卷腹":"将斜板倾斜向下（约15-30度），保持相同的动作模式，重点强化腹直肌下部的收缩感。","跪姿卷腹":"将上斜板换成跪姿垫，双膝跪地，保持核心收紧，同样将上半身卷向膝盖，适合需要避免腿部参与的训练者。","平板卷腹":"在平整地面上进行，略微抬高上背部，保持腹部的收缩幅度不变，适合没有斜板设备的场合。"}', 'published', NOW(3), NOW(3));
SET @eid_4 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜腹 (synergist)
-- Suggested muscle: 内斜腹 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (antagonist)
-- Suggested muscle: 横腹肌（腹横肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('药球卷腹', 'core', 'other', 'intermediate', NULL, '1. 仰卧在平坦的地面上，膝盖弯曲约90度，双脚平放踩实地面，可让同伴帮助固定双脚或使用固定器材。\n2. 将适当重量的药球抱在胸前，双手稳定握住药球。\n3. 收紧腹部，腹肌发力带动上背部离开地面，肩胛骨抬离地面，视线看向膝盖方向。\n4. 在动作顶端（卷腹最高点）稍作停顿，充分感受腹肌的收缩挤压。\n5. 缓慢控制地将上半身放回起始位置，保持腹肌持续张力，下背部始终贴近地面。\n6. 重复进行规定的次数或时间，注意保持呼吸节奏与动作的协调一致。', '1. 始终保持下背部与地面的接触，避免过度弓腰导致腰椎压力过大。\n2. 使用适当重量的药球，新手建议从较轻重量开始逐步适应。\n3. 颈椎应保持自然中立位置，避免用手臂力量强行拉拽头部。', '1. 动作速度过快，依赖惯性而非腹肌发力，降低训练效果。\n2. 卷腹时下背部明显离开地面，形成骨盆前倾，增加腰椎负担。\n3. 用手拉动头部或药球来协助起身，导致颈椎不适和核心参与不足。', '初学者可以先徒手进行卷腹练习，待动作熟练后再开始使用药球；进阶者可以手持药球在头顶上方进行卷腹，增加动作难度和上腹部刺激；也可以在卷腹顶端加入左右转体动作，同时锻炼腹斜肌。', 'compound', '{"退阶":"去除药球，使用徒手卷腹，降低负荷","进阶级":"双手持药球过头顶进行卷腹，或增加药球重量","变体":"药球俄罗斯转体：卷腹的同时将药球向左右转动，增强腹斜肌参与"}', 'published', NOW(3), NOW(3));
SET @eid_6 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (antagonist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 多裂肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('瑜伽球卷腹', 'core', 'other', 'intermediate', NULL, '1. 坐在瑜伽球上，双脚平放于地面，肩胛骨靠在球的上部。\n2. 调整身体位置，使下背部紧贴球，保持平衡，膝盖弯曲约90度。\n3. 双手交叉放在胸前或轻轻扶住耳朵，收紧核心肌群，保持脊柱自然弧度。\n4. 吸气时，收腹并慢慢将上背部抬离球面，动作幅度以感觉到腹肌收缩为准，避免用力拉扯颈部。\n5. 在最高点稍作停顿（约1-2秒），感受腹肌的紧绷。\n6. 呼气时缓慢放下上半身回到起始姿势，保持球的稳定，重复进行。', '1. 确保瑜伽球充气适中、表面防滑，防止在动作过程中滑动导致失衡。\n2. 进行卷腹时保持颈部自然位置，避免用力牵拉头部或颈椎。\n3. 如出现下背部或腰部疼痛，应立即停止动作并检查姿势，必要时请教专业教练。', '1. 把球放得太靠近上背部，导致腰椎过度弯曲，增加腰背压力。\n2. 动作幅度过大，使用惯性而不是腹肌主动收缩，削弱训练效果。\n3. 脚距过宽或过窄，站立不稳，容易导致身体晃动或失去平衡。', '1. 初学者可以将脚靠墙或靠近固定物体以增加稳定性，待熟练后再尝试独立完成。
2. 根据个人身高选择合适尺寸的瑜伽球，使大腿与地面保持平行，减轻腰部负担。
3. 若想增加难度，可在胸前握住哑铃或将双手伸直举过头进行负重卷腹。', 'isolation', '{"变体类型":"球上卷腹的常见变体包括单腿球上卷腹、球上卷腹转体、负重（哑铃）卷腹以及球上抬腿等。\n可转换为其他核心训练动作，如瑜伽球平板支撑、登山者或瑜伽球滚轮，以丰富训练方式并提升核心综合力量。"}', 'published', NOW(3), NOW(3));
SET @eid_7 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 横腹肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('卷腹器械', 'core', 'machine', 'beginner', NULL, '1. 调整器械座椅高度，使肩部靠垫与肩部齐平，腿部垫块位于脚踝处。2. 坐到器械上，背部紧贴靠背，双手握住两侧手柄保持稳定。3. 将双腿抬起，使膝盖略微弯曲，脚踝勾住腿部垫块，保持舒适姿势。4. 呼气的同时收缩腹部，将上半身向前卷起，肩膀远离靠背。5. 在顶峰位置保持收缩1-2秒，感受腹直肌的充分挤压。6. 吸气，缓慢控制地将身体还原至起始位置，保持核心持续发力。', '1. 动作过程中始终保持下背部紧贴靠垫，避免过度弓背导致腰椎压力过大。2. 选择的重量不宜过重，以能够标准完成动作的重量为准，防止肌肉代偿。3. 如感到腰部不适或疼痛，应立即停止并检查姿势或减轻重量。', '1. 使用惯性甩动身体，而不是依靠腹肌力量控制动作，这会降低训练效果并增加受伤风险。2. 卷腹幅度过大，将整个背部抬起离开靠背，导致腰椎过度弯曲。3. 呼吸节奏错误，憋气或吸气呼气时机不对，影响核心稳定性和动作流畅性。', '根据个人体型调整座椅前后位置，确保运动轨迹舒适且符合人体工学。初学者可先从较轻重量或无配重开始，待动作熟练后再逐步增加负荷。把手位置可根据个人舒适度进行微调。', 'isolation', '{"徒手卷腹":"可转换为地面卷腹或仰卧起坐，无需器械即可完成类似训练效果。","悬挂卷腹":"可使用TRX或单杠进行悬挂式卷腹，增加核心稳定性和抗伸展能力。","器械对比":"本器械适合初学者建立正确的卷腹动作模式，熟练后可尝试更复杂的核心训练动作。"}', 'published', NOW(3), NOW(3));
SET @eid_8 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('拉力器卷腹', 'core', 'cable', 'intermediate', NULL, '1. 调整龙门架滑轮高度至头部上方位置，将绳索或把手连接好，跪在地面上，双膝与肩同宽，双手握住手柄。\n2. 身体略微向前倾，让绳索的重量将你向前拉，头部向下，保持核心紧绷。\n3. 通过腹肌发力，将身体向下卷起，让头部向地面方向靠近，肘部向膝盖方向移动。\n4. 在动作最低点（顶峰收缩位置），用力挤压腹肌，保持1-2秒，感受腹肌的收缩。\n5. 缓慢控制地松开绳索的拉力，匀速回到起始位置，但不要完全放松腹肌，保持张力。\n6. 重复完成规定次数的动作。', '1. 整个动作过程中保持核心持续紧绷，避免腰部过度弓背或塌腰，以保护腰椎。\n2. 使用适当的重量，不要利用绳索的惯性快速拉动，动作全程保持控制，避免颈椎过度承压。\n3. 如果有颈椎问题或不适，可以用双手交叉放在头后支撑头部，减轻颈部压力。', '1. 腰部过度弓起或塌腰，导致腰椎承受过大压力，应该在动作全程保持核心稳定和自然曲度。\n2. 动作速度过快，只追求次数而不注重肌肉收缩的离心和向心控制，降低训练效果。\n3. 过度依赖手臂力量拉动绳索，而没有充分激活腹肌发力做功。', '1. 跪姿距离：跪得离锚点越近，难度越低；跪得越远，难度越高，可根据能力调整。
2. 绳索高度：滑轮位置越高，动作行程越长、难度越大；位置越低，动作越容易但训练效果减弱。
3. 把手类型：可以使用直杆、V型把手或绳索手柄，不同把手会改变刺激角度。
4. 身体角度：身体倾斜角度越大难度越高，但需要更好的核心控制能力。', 'isolation', '{"增加难度":"使用双头绳代替直杆，跪姿远离锚点，增加倾斜角度","降低难度":"将滑轮高度降低，缩短跪姿距离，减小倾斜角度","变体":"可转换为站姿绳索卷腹（需要更大的核心稳定性），或使用卷腹机器进行替代"}', 'published', NOW(3), NOW(3));
SET @eid_9 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 股直肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('交替卷腹', 'core', 'bodyweight', 'beginner', NULL, '仰卧在平坦的地面上，双腿弯曲，双脚平放踩实地面，膝盖角度约90度,双手轻轻放在头两侧，手指自然弯曲，不要用力拉扯头部，保持颈部放松,收紧腹部核心肌肉，呼气的同时卷起上背部，使肩胛骨逐渐离开地面,卷腹至最高点时，腹肌充分收缩，保持约1秒，感受腹部肌肉的紧绷感,吸气时缓慢放下上背部，回到起始位置，然后切换到另一侧进行卷腹,两侧交替进行，保持稳定的节奏，确保每一下动作都控制得当', '颈部保持自然中立位置，不要用手过度拉拽头部，避免颈椎受伤,动作过程中臀部始终贴在地面上，如果臀部抬起说明动作幅度过大,如果感到下背部疼痛或不适，应立即停止并咨询专业教练', '用力拉扯头部和颈部来帮助起身，这会给颈椎带来不必要的压力,动作过快，依靠惯性完成动作而不是肌肉控制，降低训练效果,卷腹幅度过大，导致骨盆前倾和下背部离开地面，增加腰椎负担', '[object Object]', 'isolation', '{"器械变体":"使用卷腹机或倾斜板卷腹来增加阻力","难度提升":"改为双手抱重物或交叉触碰对侧膝关节的卷腹变体","变化形式":"悬垂卷腹、仰卧起坐、空中蹬车等可替代相同肌群训练"}', 'published', NOW(3), NOW(3));
SET @eid_10 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('V字卷腹', 'core', 'bodyweight', 'intermediate', NULL, '1. 准备姿势：平躺在垫子上，双腿伸直，双手举过头顶，手掌相对，保持头部自然放松。\n2. 收紧核心：深吸一口气，收紧腹肌，确保下背部紧贴地面，避免弓背。\n3. 同时发力：呼气时，腹肌和髂腰肌协同收缩，上半身与双腿同时向上抬起，躯干与双腿在最高点形成V字形。\n4. 顶峰收缩：在V形最高点稍作停顿（约1秒），感受腹肌的强烈挤压，双手尽量触碰脚尖或小腿。\n5. 缓慢回落：吸气，缓慢而有控制地将上半身和双腿放回起始姿势，保持肌肉张力，避免猛然落下。\n6. 重复动作：根据训练计划重复规定的次数，保持呼吸节奏一致。', '1. 动作全程保持颈椎自然对齐，切勿用手臂或头部力量强行拉起，以免造成颈椎受伤。\n2. 若出现下背或髋部不适，应立即停止并咨询专业人士，可先改做简化版或寻求替代训练。\n3. 在柔软的垫子或瑜伽垫上进行，避免在硬地面上直接练习，以减轻脊柱冲击。', '1. 过度依赖手臂力量把身体拉起，导致肩膀和颈部紧张，真正的发力应来自腹肌。\n2. 抬腿和上半身时弓背或耸肩，导致腰椎压力过大，姿势不稳。\n3. 动作过快、缺乏控制，容易导致肌肉拉伤或失去平衡，建议保持平稳的节奏。', '初学者可将膝盖略微弯曲，或采用屈膝V字卷腹来降低难度；有经验的训练者可手持哑铃、药球或负重背心增加负荷；如出现腰部不适，可先改用平板支撑或仰卧起坐进行核心强化。', 'compound', '{"简化版":"屈膝V字卷腹：将膝盖弯曲，减小髋屈角度，降低对髂腰肌的需求，适合初学者。","负重版":"手持哑铃或药球进行V字卷腹：在保持V形姿势的同时增加外部负荷，提高腹肌和髂腰肌的负荷能力。"}', 'published', NOW(3), NOW(3));
SET @eid_11 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 股四头肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('罗马椅卷腹', 'core', 'other', 'intermediate', NULL, '1. 调整罗马椅高度，使垫子恰好支撑在大腿前侧接近髋部位置，双脚踩在凳子的支撑点上；2. 身体直立，双手交叉放在胸前或手指轻触耳侧，肘部张开；3. 保持双腿伸直或轻微弯曲，核心收紧，从髋关节处开始向前屈曲，躯干逐渐向下移动；4. 在下放过程中吸气，保持背部挺直，感受腹肌被拉长；5. 当躯干接近与地面平行或达到个人极限位置时，腹肌发力向上卷起身体；6. 在动作顶端略作停顿，感受腹肌充分收缩，然后缓慢控制地回到起始位置，同时呼气。', '1. 确保双脚稳固踩在支撑点上，避免滑落，整个动作过程中保持身体平衡；2. 动作幅度应根据个人柔韧性和核心力量控制，不宜过度伸展导致下背部压力过大；3. 如有腰椎问题或腰部不适，应谨慎练习或咨询专业健身教练后再进行。', '1. 使用惯性或甩动身体来完成动作，而非依靠腹肌发力控制；2. 动作过程中拱背或过度依赖下背部力量，增加腰椎受伤风险；3. 动作幅度过小，仅做小幅度的起伏，未能充分刺激腹肌。', '初学者可将动作幅度减小，先感受腹肌发力；可将双手放在头后方增加难度但需注意不要用手拉动头部；当核心力量提升后，可双手持重物（如哑铃）于胸前增加阻力；调整罗马椅靠背角度可改变动作难度，较垂直的角度难度较低。', 'isolation', '{"变体类型":"增加难度可做罗马椅侧向卷腹（加入躯干旋转侧重腹斜肌），或手持重物增加阻力；简化动作可减小动作幅度或在平板上做传统卷腹；器械替换可用下斜板卷腹或悬垂举腿达到类似训练效果。"}', 'published', NOW(3), NOW(3));
SET @eid_12 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('平板支撑侧转', 'core', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：呈高位平板支撑姿势，双手撑地，手臂伸直，肩部垂直于手腕，身体呈一条直线，核心收紧。\n2. 保持身体平直的同时，将重心略微向右侧转移，使右肩略微下降，左手轻微离地准备转动。\n3. 在保持平板支撑的前提下，利用核心力量将左手向右转动，胸部和肩部随之转向右侧，同时右脚保持贴地。\n4. 旋转至最大舒适角度后，保持1-2秒，确保核心和肩胛稳定，然后缓慢回到起始平板姿势。\n5. 完成一次后，换左侧进行相同的侧转动作，交替进行直至完成设定的次数。', '• 始终保持核心收紧，避免腰部下沉或臀部抬起；\n• 动作过程中保持呼吸顺畅，不要憋气；\n• 如出现手腕、肩部或腰部疼痛，应立即停止并寻求专业指导。', '• 臀部抬得过高，导致下背部过度弓起；\n• 转动幅度过大或过快，造成脊柱过度扭转，失去核心控制；\n• 肩膀未保持对齐，导致肩关节受压。', '• 手腕不适者可使用拳头支撑或垫高手掌；
• 膝盖疼痛者可采用跪姿平板支撑进行侧转，降低负荷；
• 初学者可以先练习单纯的平板支撑，再逐步加入侧转动作。', 'compound', '{"简化版":"在膝盖着地的姿势下进行侧转，减少对手腕和核心的压力。","进阶版":"在不稳定表面上（如平衡球或bosu球）进行侧转，或加入侧向跳箱动作提升难度。","器械辅助版":"手持哑铃或壶铃进行负重侧转，增强核心抗旋转力量。"}', 'published', NOW(3), NOW(3));
SET @eid_13 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (agonist)
-- Suggested muscle: 横腹肌 (stabilizer)
-- Suggested muscle: 胸腰筋膜（背阔肌/菱形肌） (stabilizer)
-- Suggested muscle: 竖脊肌 (synergist)
-- Suggested muscle: 髂腰肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧举腿', 'core', 'bodyweight', 'beginner', NULL, '1. 平躺在垫子或地面上，双手放在身体两侧或置于臀部下方，以提供支撑。\n2. 双腿伸直并拢，脚尖稍微向上勾起，保持核心收紧。\n3. 吸气后，利用腹部的力量将双腿抬起，离开地面约30-45度，保持动作控制。\n4. 抬至最高点时稍作停顿，感受腹部和髋屈肌的收缩。\n5. 呼气，缓慢而有控制地将双腿放回起始位置，注意不要让背部拱起或猛然触地。\n6. 完成目标次数后，保持呼吸平稳，适当放松。', '1. 动作过程中保持下背部紧贴地面，避免过度拱背导致腰部压力。\n2. 初学者应在平稳的垫子或软质地面上练习，防止滑倒或受伤。\n3. 如出现腰部或髋部不适，应立即停止并咨询专业教练或医生。', '1. 举腿时用力过猛导致背部抬起，形成拱背现象。\n2. 只靠腿部力量抬起，忽视核心的参与，导致效果不佳。\n3. 动作速度过快，缺乏控制，容易造成肌肉拉伤。', '1. 降低难度：可以将膝盖稍微弯曲，采用屈膝举腿的方式。
2. 增加难度：可以保持双腿伸直，慢慢举起至90度或更高，或在脚踝处加上轻量哑铃。
3. 如果手腕不适，可将手臂放在身体两侧而非臀部下方，以减少肩部压力。', 'isolation', '{"变体类型":"屈膝举腿 / 悬垂举腿","转换建议":"想要降低难度时，改为屈膝举腿，膝盖保持微屈；如果想提升挑战，可改为悬垂举腿或负重举腿（如踝部夹轻哑铃）。"}', 'published', NOW(3), NOW(3));
SET @eid_16 = LAST_INSERT_ID();
-- Suggested muscle: 髂腰肌 (agonist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 股直肌 (synergist)
-- Suggested muscle: 竖脊肌 (antagonist)
-- Suggested muscle: 腹横肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('悬垂举腿', 'core', 'bodyweight', 'intermediate', NULL, '1. 双手正握单杠，握距略宽于肩，身体自然悬垂，双臂伸直，肩膀放松下沉，收缩肩胛骨固定肩部；\n2. 收紧核心和臀部，保持躯干稳定，避免身体前后摆动，这是准备阶段；\n3. 呼气的同时，通过下腹部的收缩力量将膝盖向胸部方向抬起，髋关节屈曲，动作过程中保持手臂伸直且肩膀位置不变；\n4. 继续将膝盖抬高至大腿与地面平行或略高于平行位置，感受下腹部强烈的挤压感，在顶峰位置稍微停顿1-2秒；\n5. 吸气，缓慢控制地将双腿放下还原，保持腹肌的持续张力，避免自由落体造成腰椎压力；\n6. 重复动作，完成规定次数，整个过程中保持呼吸节奏和身体稳定。', '1. 进行动作前务必充分热身肩关节和核心，可先做几组简单的悬吊练习建立肩部稳定性；\n2. 如果肩膀有伤或不适，应避免执行此动作或改为其他替代动作，如平躺举腿；\n3. 动作下落时应控制速度，避免惯性冲击造成腰椎损伤，出现腰部不适时应立即停止。', '1. 借助惯性摆动身体而非主动使用腹肌发力，导致训练效果降低且增加肩部压力；\n2. 动作过程中耸肩或肩膀向上移动，使肩关节承担额外负荷，容易引发肩部不适；\n3. 腿下落时过于放松太快，核心失去张力，导致腰椎被迫过度伸展产生伤害。', '初学者可从屈膝举腿开始，逐步过渡到直腿举腿；可借助弹力带或TRX提供部分支撑减轻难度；也可在罗马椅举腿器械上练习以获得背部支撑；降低动作幅度，只举至大腿与地面平行即可有效锻炼腹肌同时降低难度。', 'isolation', '{"降低难度":"使用辅助器械（如举腿机）或弹力带辅助，从屈膝举腿开始，逐步建立核心力量","增加难度":"采用直腿举腿、悬挂单腿举腿，或在动作顶端保持更长时间（3-5秒），也可负重增加挑战","变体动作":"可转换为悬垂侧举腿（锻炼腹斜肌）、悬垂收腹（双腿向胸部收起）、剪刀腿等变体以增加训练多样性"}', 'published', NOW(3), NOW(3));
SET @eid_17 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('反向卷腹', 'core', 'bodyweight', 'beginner', NULL, '1. 躺在垫子上，双手平放在身体两侧，掌心向下，保持身体放松；2. 屈膝，双脚平放在地面上，膝盖弯曲约90度，脚尖略微指向天花板；3. 收紧腹肌，尤其是下腹部发力，抬起臀部并向胸部方向卷起，同时将膝盖拉向胸部；4. 到达动作顶峰时，臀部稍微离开垫子，保持1-2秒，感受到腹直肌的强烈收缩；5. 缓慢放低双腿回到起始姿势，保持下背部始终贴在垫子上，重复进行。', '1. 动作全程保持下背部紧贴地面，避免过度弓背导致腰椎受压；2. 不要使用腿部或臀部的力量猛拉，保持动作由腹肌主导；3. 初学者应在平稳的垫子或软地面上练习，若感到腰部不适立即停止。', '1. 用腿部抬起臀部，导致腹肌参与不足，减弱训练效果；2. 动作最高点时抬头或用力扭动颈部，增加颈椎负担；3. 动作速度过快，缺少对肌肉的控制，容易受伤。', '1. 如出现腰部不适，可在腰部下方放一条卷起的毛巾或小枕头提供支撑；2. 可将双手交叉放在胸前，减轻手臂支撑的负担；3. 若想增加难度，可将双腿伸直或在踝部加轻度负重。', 'isolation', '{"单腿反向卷腹":"抬起一条腿保持伸直或微屈，另一条腿正常卷起，以单侧腹肌为主发力，提高核心不均衡控制。","侧向反向卷腹":"在卷腹的同时将膝盖向侧面转动，侧重腹外斜肌的收缩，增加斜向核心训练。","悬垂反向卷腹":"使用吊环或单杠进行，手握支撑后进行反向卷腹，增加动作难度并强化整体核心力量。","负重反向卷腹":"在踝部系上轻量哑铃或沙袋，以提升阻力，帮助更有效地刺激腹直肌下部。","慢速反向卷腹":"在下降阶段故意放慢速度，保持2-3秒的离心控制，增强肌肉耐力和控制力。"}', 'published', NOW(3), NOW(3));
SET @eid_18 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌（下部） (agonist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 腹外斜肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧蹬车', 'core', 'bodyweight', 'intermediate', NULL, '1. 仰卧在瑜伽垫上，双手轻轻放在耳侧或太阳穴位置，掌心向下，双腿伸直放松\n2. 抬起双腿和上背部，膝盖弯曲约90度，小腿与地面平行，保持下背部贴紧地面\n3. 右膝盖向胸部靠近，同时左手肘向左膝盖方向移动，旋转躯干\n4. 当右肘接近右膝盖时，保持腹部收紧，然后切换到对侧动作\n5. 左膝向胸部靠近，右手肘向右膝盖方向移动，旋转躯干\n6. 交替进行这个蹬车动作，保持稳定的节奏', '双手不要用力拉扯头部，只用腹肌发力抬起上半身,保持下背部紧贴地面，避免腰部过度弓起造成压力,动作节奏适中，不宜过快，以免造成肌肉拉伤', '用力拉扯头部导致颈椎压力过大,下背部离开地面，形成拱背姿势,动作过快，只追求数量而忽略动作质量', '初学者可以放慢动作速度，确保动作标准；可将双腿略微抬高降低难度；也可以只进行单侧动作来加强控制；双手可以放在胸前减少颈部压力', 'isolation', '{"降低难度":"双腿抬至较高位置减少扭矩，或只做单腿动作","增加难度":"在动作顶端保持2-3秒，或在蹬腿时让腿伸直接近地面","变化形式":"将双手放在耳侧变为双手伸直扣在头后，增加旋转幅度"}', 'published', NOW(3), NOW(3));
SET @eid_19 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀大肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('下斜板举腿', 'core', 'bodyweight', 'intermediate', NULL, '1. 调整下斜板的倾斜角度（约30°-45°），躺在板上，双手抓住板边缘或放在胸前，以保持身体稳定。\n2. 保持背部紧贴板面，尤其是下背部不要出现明显弓起，收紧核心肌群做好准备姿势。\n3. 双腿伸直并拢，脚尖稍微向上，利用腹部的力量抬起双腿，使其向胸部或垂直方向靠拢，过程保持平稳、不要摆动。\n4. 在最高点稍作停顿（约1-2秒），感受下腹部的收缩与紧绷。\n5. 缓慢而有控制地放下双腿，回到起始姿势，避免突然下落或让下背部离开板面。\n6. 重复动作至设定的次数，保持呼吸节奏（上升时呼气，下降时吸气）。', '1. 保持下背部始终贴在下斜板上，防止过度弓腰导致腰椎受压。\n2. 动作全程使用核心力量控制，避免借助惯性或摆动，以免拉伤髋屈肌。\n3. 如出现腰背疼痛或不适，应立即停止并咨询专业教练或医生。', '1. 下背部弓起或离开板面，导致腰椎过度屈曲。\n2. 使用摆动或冲力抬起双腿，削弱腹肌刺激并增加受伤风险。\n3. 下降时控制不当，膝盖完全放松导致冲击力度集中在腰部。', '1. 调整下斜板倾斜角度：角度越大难度越高，初学者可先使用较小角度或平躺姿势。
2. 改变腿部姿势：屈膝抬腿或膝盖抬至胸部可减轻髂腰肌负担，专注于腹部收缩。
3. 使用辅助器械：如握把、吊环或斜凳扶手提供额外支撑，降低平衡难度。', 'isolation', '{"变体类型":"1. 坐姿举腿（坐姿平板）：适合初学者，减少下背部压力。\n2. 悬垂举腿（挂于横杠或吊环）：增加动作幅度和核心稳定性要求。\n3. 斜坡举腿（倾斜角度更大）：提升难度，强化下腹部。\n4. 膝举（膝盖弯曲）：降低髋屈肌参与，更集中锻炼腹直肌。\n5. 加负重（踝部负重或配重带）：在熟练后增加负荷，进一步提升肌肉耐力与力量。"}', 'published', NOW(3), NOW(3));
SET @eid_20 = LAST_INSERT_ID();
-- Suggested muscle: 下腹直肌（Rectus Abdominis 下部） (agonist)
-- Suggested muscle: 髂腰肌（Iliopsoas） (synergist)
-- Suggested muscle: 腹外斜肌（External Oblique） (synergist)
-- Suggested muscle: 腹内斜肌（Internal Oblique） (synergist)
-- Suggested muscle: 横腹肌（Transversus Abdominis） (stabilizer)
-- Suggested muscle: 竖脊肌（Erector Spinae） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('坐姿抬腿卷腹', 'core', 'bodyweight', 'intermediate', NULL, '1. 坐在椅子或稳固的凳子上，双脚平放于地面，膝盖约呈90度弯曲，背部保持挺直。\n2. 双手轻轻放在身体两侧，或握住椅子边缘以提供支撑。\n3. 吸气并收紧腹部，然后慢慢抬起双腿，使大腿向胸部靠近；腿部可保持微弯或伸直（视个人能力而定）。\n4. 在动作的顶点稍作停顿，确保腹肌充分收缩，然后呼气，缓慢将双腿放回起始位置。\n5. 重复进行，保持动作的平稳与控制，避免利用惯性。\n6. 如需提升难度，可在抬腿时将双手抬离椅子，或在脚踝处绑上轻量哑铃。', '1. 确认椅子或凳子稳固，防止滑动或倾倒。\n2. 动作全程保持背部挺直，避免弓背或塌腰，以减轻腰椎压力。\n3. 如出现腰部或颈部不适，应立即停止并咨询专业人士。', '1. 使用惯性或摆动抬起双腿，导致腹肌刺激减弱。\n2. 动作过程中弓背或塌腰，使腰椎受到不必要的压力。\n3. 动作速度过快，缺乏对肌肉的控制，增加受伤风险并降低训练效果。', '初学者可将膝盖保持弯曲，减小抬腿幅度，并双手扶住椅子以获得支撑；进阶者可以伸直双腿、在最高点保持2-3秒停顿，或在脚踝加轻重量以提升挑战。', 'isolation', '{"坐姿抬腿卷腹（标准）":"保持坐姿，使用自身体重完成动作。","仰卧抬腿卷腹":"改为仰卧姿势，双腿抬起并卷腹，适合作为变体以强化腹肌。","侧坐抬腿卷腹":"在侧坐姿势下进行单侧抬腿，可更好地激活斜腹肌。","使用哑铃或踝负重":"在脚踝处加轻重量，增加阻力，提升核心力量。","靠墙坐姿抬腿":"背靠墙进行，可更好地保持背部中立，减轻腰椎压力。"}', 'published', NOW(3), NOW(3));
SET @eid_21 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 横腹肌 (stabilizer)
-- Suggested muscle: 髂腰肌（髂肌、腰大肌） (synergist)
-- Suggested muscle: 股直肌 (synergist)
-- Suggested muscle: 竖脊肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧直腿起身', 'core', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：仰卧在平坦的垫子上，双腿伸直并拢，脚尖向上。双手可放在身体两侧或压在臀部下方，以防止手臂摆动。\n2. 收紧核心，深吸一口气，保持颈部自然放松，避免用手臂力量抬起身体。\n3. 同时收紧腹肌和髋屈肌，将上半身和双腿同时抬离地面，手臂伸直指向脚尖，形成类似“V”形的姿势。\n4. 在最高点稍作停顿（约1秒），感受腹肌的完全收缩，呼气。\n5. 缓慢而受控地将上半身和双腿放回起始姿势，避免猛然下落，确保下背部始终贴在垫子上。\n6. 根据训练计划重复该动作，组间适当休息。', '练习前务必进行充分的热身，特别是髋屈肌和核心部位，以防止拉伤。,如果在抬起过程中出现下背部疼痛，应立即停止并改为屈膝或降低动作幅度。,避免使用惯性或摆动手臂来完成动作，这会增加颈椎和腰椎的受伤风险。', '使用惯性冲力抬起身体，导致动作失去对核心的控制。,在最高点时出现明显的下背部弓起（弓背），这会使腰椎承受过大压力。,只抬起双腿而不同步抬起上半身，或只抬上半身而不抬腿，降低对腹肌的整体刺激。', '如果动作难度过高，可先将膝盖稍微弯曲（屈膝仰卧起身），减轻髋屈肌的负担。,可以使用毛巾或瑜伽垫在下背部提供轻微支撑，帮助保持脊柱自然弧度。,想要增加难度时，可将双手放在胸前或交叉抱肩，或尝试单腿版本的仰卧直腿起身。', 'compound', '{"仰卧单腿起身":"保持双腿伸直，只抬起一条腿和上半身，可更好地激活侧腹和髋屈肌。","屈膝仰卧起身":"将膝盖略微弯曲，降低髋屈肌负担，适合初学者或腰部有不适的人群。","坐姿卷腹":"在坐姿下完成类似动作，主要刺激上腹部，适合在办公室或受限空间练习。","使用瑞士球":"将脚放在瑞士球上完成动作，增加不稳定因素，提升核心深层稳定肌的协同工作。"}', 'published', NOW(3), NOW(3));
SET @eid_22 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌（髂肌、腰大肌） (synergist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 竖脊肌（胸椎/腰椎伸展肌） (antagonist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 股四头肌（用于保持腿部伸展） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧交替抬腿', 'core', 'bodyweight', 'beginner', NULL, '1. 仰卧在瑜伽垫上，双腿伸直并拢，双臂自然放在身体两侧，掌心向下贴地\n2. 保持下背部紧贴地面，收紧腹部核心肌肉，肩胛骨微微下沉\n3. 呼气时，将一条腿向上抬起约45-60度角，腿部保持伸直，脚尖朝上\n4. 在最高点停顿1-2秒，充分感受下腹部肌肉的收缩发力\n5. 吸气时，缓慢有控制地将腿放下回到起始位置\n6. 换另一条腿重复上述动作，继续交替进行，完成规定的次数或时间', '1. 确保下背部在整个动作过程中始终紧贴地面，避免出现弓背现象导致腰椎压力过大\n2. 动作速度要缓慢控制，避免借助惯性快速摆动双腿，这样不仅效果降低还容易受伤\n3. 如有腰椎问题或下背部不适，应在专业教练指导下进行或选择其他更适合的动作', '1. 抬腿时腿部抬得过高（超过90度），导致髋屈肌过度参与而背部离开地面\n2. 利用惯性或腿部甩动的力量抬腿，而非通过核心主动发力控制\n3. 动作过程中憋气，应保持均匀的呼吸节奏配合动作\n4. 双腿同时离开地面或交替时动作不连贯', '初学者可将腿抬高角度降低至30-45度以减轻难度；可将上方腿的膝盖微微弯曲来降低强度；也可以在骶骨下方垫一个薄垫或卷起的毛巾来减小下背部的压力；若想增加难度可在小腿之间夹一个小哑铃或在抬腿时保持双腿同时离开地面但交替上下。', 'isolation', '{"降阶":"将腿抬高角度降低至30度以下，或双膝弯曲呈90度做屈膝交替抬腿","升阶":"双腿同时抬起形成V字形保持，或在脚踝处绑沙袋增加阻力","变体":"可尝试悬垂举腿（双手抓住横杆悬挂做举腿动作）或坐姿交替抬腿"}', 'published', NOW(3), NOW(3));
SET @eid_24 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌（下部） (agonist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 腹外斜肌 (stabilizer)
-- Suggested muscle: 腹内斜肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (antagonist)
-- Suggested muscle: 股直肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('器械举腿', 'core', 'machine', 'beginner', NULL, '1. 首先调整器械座椅高度，确保臀部靠垫与您的髋关节平齐，以便在动作中获得最佳支撑。2. 坐上器械，将大腿后侧紧贴靠垫，双手握住侧边的手柄以保持身体稳定，背部自然靠在靠垫上。3. 收紧腹部核心肌群，缓慢将双腿向胸前方向抬起，保持膝盖微屈或伸直（根据个人舒适度选择）。4. 抬至最高点时稍作停顿，充分感受腹部肌肉的收缩。5. 控制速度，缓慢将双腿放下回到起始位置，避免自由下落。6. 重复完成设定的次数，保持稳定的呼吸节奏。', '1. 使用器械前务必检查所有调整装置是否已锁定固定，防止训练过程中座椅突然滑动造成伤害。2. 动作全程应保持对重量的控制，避免使用惯性或快速摆动双腿，以免对脊柱造成不良压力。3. 如果在动作过程中感到下背部疼痛或不适，应立即停止并咨询专业教练。', '1. 利用惯性快速摆动双腿，这样不仅削弱训练效果，还会显著增加腰椎受伤的风险。2. 动作过程中下背部离开靠垫，导致脊柱承受额外压力，应始终保持背部紧贴器械靠垫。3. 呼吸节奏混乱，在发力时憋气，应在举起时呼气、放下时吸气。', '1. 座椅高度调整：如果想增加难度可将座椅调低，想降低难度可将座椅调高。2. 靠垫位置调整：根据个人髋关节位置调整靠垫，确保髋关节在动作过程中保持自然角度。3. 运动幅度调整：初学者可以先从小幅度开始，逐渐增加动作范围。4. 如果器械有配重调节，可以从较轻的重量开始练习。', 'isolation', '{"变体类型":"进阶可尝试悬垂举腿或高难度仰卧起坐；退阶可使用弹力带辅助或降低配重；徒手替代可做平板支撑或仰卧蹬腿练习","转换建议":"如果想增加挑战，可转换到悬垂举腿；如果想降低难度，可使用健身球进行仰卧举腿练习"}', 'published', NOW(3), NOW(3));
SET @eid_25 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 股直肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹外斜肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('健身球举腿', 'core', 'other', 'intermediate', NULL, '1. 坐在健身球上，双脚平放地面，膝盖弯曲约90度，身体保持直立姿势。\n2. 慢慢向后滚动身体，直到下背部稳定支撑在球上，肩部和头部悬空，颈部保持自然中立位。\n3. 双手放在头侧支撑头部和肩部重量，双腿并拢伸直，脚尖绷直，膝盖不要弯曲。\n4. 收紧腹部核心肌群，保持下背部稳定贴在球上，双腿向上举起至与地面接近垂直位置。\n5. 在动作顶端保持1-2秒，感受腹部肌肉的收缩，然后缓慢有控制地将双腿下放回到起始位置。\n6. 重复进行指定次数的练习，始终保持核心收紧，避免下背部离开球面。', '1. 确保健身球充气适当且状态良好，使用前检查是否有破损或过度磨损，防止训练过程中球突然爆裂导致受伤。\n2. 选择一个可以依靠的墙面或让同伴在侧面保护，防止身体失去平衡时从球上滚落造成腰背部撞击伤害。\n3. 动作过程保持缓慢控制，避免利用惯性快速摆动双腿，这会增加腰椎压力并导致肌肉拉伤。', '1. 下背部弓起离开球面：在举腿过程中腰椎过度前凸，导致腰椎间盘压力过大，应始终保持下背部稳定贴球。\n2. 双腿未能完全伸直：膝盖弯曲会减少腹肌的激活程度，降低训练效果且无法充分拉伸腹肌。\n3. 使用颈部和头部发力：双手过度用力拉动头部，增加颈椎压力，容易造成颈部不适，应让头部保持自然放松状态。', '初学者调整：从双腿微屈状态开始练习，膝盖保持90度左右弯曲，逐步建立核心稳定性和力量后再尝试完全伸直双腿。可以先从较小的动作幅度开始，逐渐增加举腿高度。降低难度时，可以使用双手撑在地面或墙壁上增加稳定性。进阶级调整：当动作熟练后，可以增加单腿举腿或双腿在空中画圈等变体增加挑战性。选择合适大小的健身球，确保坐姿时膝盖呈90度角。', 'isolation', '{"难度降低变体":"从双腿微屈膝的半程动作开始，或者双手撑地稳定身体后再进行举腿，逐步适应后再增加难度。","难度提升变体":"尝试单腿举腿增加核心控制难度，或在双腿举至顶端时加入左右画圈动作，激活更多深层核心肌群。","器材变化":"可以使用平板凳或仰卧在长凳上做相同的举腿动作，或者在TRX悬挂训练带上完成类似动作。"}', 'published', NOW(3), NOW(3));
SET @eid_27 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 股直肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 多裂肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('平板交替抬腿', 'core', 'bodyweight', 'intermediate', NULL, '1. 首先以俯卧撑姿势撑地，双手撑地与肩同宽，手指向前，手肘微屈，双脚脚尖着地，身体从头到脚保持一条直线。\n2. 收紧腹部和臀部，使身体保持平板姿势，避免塌腰或拱背，肩部位于手腕正上方。\n3. 保持上半身稳定不动，将右腿抬起至与地面平行或略高于水平面的位置，膝盖保持伸直。\n4. 在最高点保持1-2秒，感受核心肌群的收缩，然后慢慢放下右腿回到起始位置。\n5. 接着将左腿抬起，保持相同的动作幅度和控制，同样在最高点停留片刻。\n6. 交替进行左右腿的抬腿动作，保持均匀的呼吸节奏，完成预定次数或时间。', '1. 确保动作过程中下背部始终保持自然平直，避免过度塌腰导致腰椎压力过大，如感到腰部不适应立即停止。\n2. 初学者或腕关节有伤的人群可以使用前臂支撑替代手掌撑地的方式进行练习。\n3. 动作过程中头部应保持自然位置，目视地面，不要抬头或低头，以免造成颈椎不适。', '1. 塌腰或拱背：许多人在抬腿时忽略了核心收紧，导致下背部过度下塌，增加腰椎受伤风险。\n2. 抬腿过高：为了追求动作幅度而将腿抬得过高，导致髋关节过度旋转和骨盆前倾，削弱核心训练效果。\n3. 动作过快：急于完成动作而忽视控制质量，无法有效激活目标肌群，同时也增加受伤风险。', '初学者可以将动作简化为抬腿幅度较小或不要求腿完全伸直的状态，熟练后再增加难度；膝关节有问题的练习者可以将双腿微屈进行练习；高级练习者可以在抬腿时加入小幅度的髋外展或在空中画圈以增加挑战。', 'compound', '{"简化":"可以改为跪姿交替抬腿，减少对核心稳定性的要求；或者将抬腿幅度减小，只做小幅度的提腿动作。","强化":"可以在踝关节处负重增加阻力；或者在抬腿时保持另一侧腿略微抬起增加不稳定性；还可以加入手臂动作，如在抬右腿时抬起左臂。","变体":"可以改为平板单腿支撑（另一腿抬起保持稳定）；或者改为交叉爬行式交替抬腿，在保持平板的同时交替伸手和抬腿。","场地替代":"在没有垫子的情况下可以在草地或较软的地面进行；如果地面太硬，可以在手掌下垫上软垫减少压力。"}', 'published', NOW(3), NOW(3));
SET @eid_28 = LAST_INSERT_ID();
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 股直肌 (synergist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 股四头肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('俄罗斯转体', 'core', 'bodyweight', 'beginner', NULL, '1. 坐在地上或软垫上，双脚平放地面，膝盖弯曲约90度，保持背部挺直、核心收紧。\n2. 抬起双脚，使小腿与地面平行，或在进阶变体中将双脚抬离地面。双手交叉放在胸前，或握住哑铃/药球等负重。\n3. 吸气后，利用核心力量将上半身向一侧转动，转动时保持髋部固定，仅转动胸椎，手臂随身体自然摆动，视线跟随手的移动。\n4. 在转动到最大幅度后稍作停顿，然后呼气，缓慢将身体转回中心，再向另一侧重复相同动作。\n5. 完成设定的次数或时间，注意保持呼吸平稳、动作流畅，避免借助惯性摆动。', '1. 动作前务必进行充分的核心热身，防止腰椎受伤。\n2. 保持脊柱中立，避免过度弓背或前倾，以免背部压力过大。\n3. 如出现腰背疼痛或不适，应立即停止并咨询专业教练或医师。', '1. 转动时使用腿部或臀部发力，导致核心参与不足。\n2. 动作幅度过大，脊柱过度扭转，易引起腰背不适。\n3. 呼吸不当，屏气或动作不连贯，导致血压升高或核心失去稳定。', '初学者可将双脚放在地面或膝下垫坐垫，降低难度；进阶者可手持哑铃或药球，或将脚抬离地面进行单腿变体；若肩部不适，可将手臂放在身体两侧而非交叉胸前。', 'isolation', '{"变体类型":"单腿俄挺转体或负重俄挺转体","转换建议":"想增加难度可尝试单腿抬起进行俄挺转体或手持哑铃/药球增加负重；想降低难度可在膝下垫坐垫或固定双脚，甚至将脚放在地面进行练习。随时根据自身感觉调整幅度和负重，确保核心持续受刺激且无疼痛感。"}', 'published', NOW(3), NOW(3));
SET @eid_29 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 胸椎伸展肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('侧卧卷腹', 'core', 'bodyweight', 'beginner', NULL, '1. 侧躺在瑜伽垫上，保持身体从头部到臀部呈一条直线，下侧腿弯曲贴地支撑\n2. 上侧腿可以放在下侧腿前面，或稍向后放置以保持平衡\n3. 将上侧的手放在脑后，手肘向外打开；下侧手臂自然放在地面上\n4. 呼气时，腹斜肌发力，将上侧肩膀和肘部向臀部方向卷起\n5. 在动作顶端稍作停顿，感受腹斜肌的顶峰收缩，保持1-2秒\n6. 吸气时，缓慢控制地将上半身放回起始位置，重复完成一组', '1. 始终保持核心收紧，避免在动作过程中出现腰部塌陷或旋转\n2. 颈部应保持自然中立位置，不要过度前倾或用手部力量拉拽头部\n3. 如有腰椎或颈椎问题，建议在专业人士指导下进行或选择其他动作替代', '1. 使用惯性甩动身体而非腹肌发力，动作幅度过大且失去控制\n2. 身体向后方旋转或倾斜，破坏了身体的稳定性\n3. 颈部过度前倾，借用颈部肌肉发力，容易造成颈椎不适\n4. 动作速度过快，没有充分感受目标肌肉的收缩与伸展', '初学者可以先将动作幅度减小，专注于感受腹斜肌的收缩；进阶者可手持哑铃或负重沙包增加训练强度；如果手腕不适，可用前臂支撑地面；无法侧卧时，也可改为坐姿侧屈动作替代', 'isolation', '{"难度降低":"减小动作幅度，在膝盖下方放置软垫支撑，减少肩部抬起高度","难度提升":"双手握住哑铃或杠铃片置于头侧，增加负重；或在空中保持手臂伸直进行动作","器材替代":"可使用弹力带绑在身体侧面增加阻力，或在侧卧位使用倾斜板增加难度"}', 'published', NOW(3), NOW(3));
SET @eid_30 = LAST_INSERT_ID();
-- Suggested muscle: 腹外斜肌 (agonist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 髂腰肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (antagonist)
-- Suggested muscle: 梨状肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('侧平板支撑', 'core', 'bodyweight', 'intermediate', NULL, '1. 侧卧于地面，用前臂和膝盖支撑身体，将肘部弯曲约90度，位于肩膀正下方。\n2. 将下腿弯曲，膝盖着地以提供支撑，上腿保持伸直。\n3. 收紧核心肌群，将髋部抬离地面，使身体从头到脚形成一条直线。\n4. 保持这个姿势，确保身体不向前或向后倾斜。\n5. 保持呼吸均匀，维持30-60秒，然后换另一侧重复。\n6. 完成指定组数后，缓慢放下身体回到起始位置休息。', '1. 若感到手腕或肘部不适，可在前臂下放置软垫或改为手部支撑。\n2. 保持脊柱中立位置，避免过度塌腰或拱背。\n3. 肩部出现疼痛时应立即停止，避免肩袖肌群过度负荷。', '1. 髋部下沉或塌腰，导致腰部压力过大。\n2. 身体前倾或后仰，未能保持整体稳定性。\n3. 头部和颈部未保持中立位置，眼睛看向地面。', '初级可采用跪姿侧平板支撑降低难度，中级保持标准侧平板支撑，进阶可采用单腿抬起或上方腿做踢腿动作增加挑战。肩部不适者可缩短支撑时间或使用瑜伽球辅助。', 'isolation', '{"降阶":"改用跪姿侧平板支撑，减少支撑重量","进阶":"加入腿部动作如侧抬腿或结合旋转动作","变体":"可转化为动态版本如侧平板支撑抬腿或侧桥转体"}', 'published', NOW(3), NOW(3));
SET @eid_31 = LAST_INSERT_ID();
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 腹内斜肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 臀中肌 (synergist)
-- Suggested muscle: 臀小肌 (synergist)
-- Suggested muscle: 竖脊肌 (synergist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 三角肌 (stabilizer)
-- Suggested muscle: 髋屈肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('悬垂侧举腿', 'core', 'bodyweight', 'intermediate', NULL, '1. 准备姿势：双手握住横杠，手臂伸直，身体自然悬垂，肩部放松，收紧核心。\n2. 起始动作：保持身体稳定，双腿并拢，膝盖微屈，准备抬起。\n3. 举腿动作：吸气时，腹肌发力，将双腿向身体侧面抬起，尽量保持腿伸直或微屈，直到双腿与地面约呈45度角或更高。\n4. 顶峰保持：在最高点稍作停顿，感受侧腹和腹直肌的收缩，控制动作不晃动。\n5. 还原动作：呼气时，缓慢放下双腿回到起始悬垂姿势，注意控制速度，避免突然下落。', '- 进行前先热身肩部和髋关节，防止拉伤。\n- 动作过程中避免摆动或借助惯性，保持核心紧绷。\n- 如有肩部或腰部不适，立即停止并咨询专业人士。', '- 过度使用摆动力量，而不是主动收缩腹肌。\n- 举腿时膝盖过度弯曲，导致髋屈肌参与过多，降低侧腹刺激。\n- 身体在举起时出现倾斜或旋转，导致姿势不稳。', '- 初学者可以先做坐姿侧举腿或使用弹力带辅助，以降低难度。
- 进阶者可在脚踝处绑上哑铃或负重带，提升负荷。
- 如肩部受限，可使用握力带或降低握杠高度，减少肩部负担。', 'compound', '{"低难度变体":"坐姿侧举腿或使用弹力带辅助","高难度变体":"负重侧举腿或加入转体动作"}', 'published', NOW(3), NOW(3));
SET @eid_32 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜腹肌 (agonist)
-- Suggested muscle: 内斜腹肌 (synergist)
-- Suggested muscle: 髂腰肌（髂肌与腰大肌） (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('药球俄罗斯转体', 'core', 'other', 'intermediate', NULL, '1. 坐在地面上，双腿屈膝，双脚平放在地面，身体微微后倾，保持背部挺直。2. 将药球抱在胸前，双手握球，身体向一侧旋转，同时将药球向身体侧方摆动。3. 旋转到最大幅度时，腹斜肌发力将身体拉回中线，继续向另一侧旋转。4. 保持核心收紧，身体不要完全倒在地面上，利用腹部的力量控制动作。5. 在整个动作过程中，双脚始终保持固定在地面，以增加核心的参与度。6. 交替完成规定的重复次数，注意保持呼吸的节奏和动作的流畅性。', '1. 确保下背部有足够的支撑，避免过度弓背导致腰椎压力过大。2. 如果肩膀或背部有伤，应在专业指导下进行或选择其他替代动作。3. 使用适当重量的药球，不要为了追求重量而牺牲动作的正确性。', '1. 动作过程中双脚离地或移动，导致核心刺激减弱。2. 旋转时只用肩膀带动，忽略了核心肌群的参与。3. 动作速度过快，无法有效控制动作轨迹，降低训练效果。', '初学者可以先不持球进行练习，待动作熟练后再使用较轻的药球；如果腰背有不适，可以垫高双腿或坐在椅子上完成动作以减轻难度；进阶者可以将双脚抬离地面，增加动作难度和核心参与度。', 'compound', '{"徒手版本":"不持药球进行俄罗斯转体，重点学习旋转轨迹和控制","负重升级":"使用更重的药球或双手持哑铃增加阻力","难度提升":"双脚抬离地面进行悬空俄罗斯转体，增强核心稳定性要求"}', 'published', NOW(3), NOW(3));
SET @eid_34 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 腹斜肌 (agonist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 胸大肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('侧向伐木', 'core', 'cable', 'intermediate', NULL, '1. 将滑轮高度调至略高于肩部，站立于器械侧面，双脚与肩同宽，脚尖略微外展，保持身体自然挺直。\n2. 用双手（或单手）握住手柄，手臂自然伸展，保持肩部放松，胸背挺直，目光注视前方。\n3. 在保持核心紧绷的同时，以髋部和肩部为轴心，向另一侧转动上半身，将手柄沿对角线向下砍向对侧髋部，动作要流畅且受控。\n4. 在最低点稍作停顿，感受核心肌群的收缩，然后缓慢回放至起始位置，保持手臂略微伸展，避免弹力过大。\n5. 完成设定的次数后换另一侧继续训练，确保两侧动作幅度和时间保持一致。', '① 运动前充分热身，特别是核心与背部，以防拉伤；② 使用合适的重量，避免使用过大的负荷导致姿势失控；③ 动作全程保持脊柱中立，避免出现弯腰或过度后仰。', '① 用手臂力量过多拉动绳索，忽视核心驱动；② 在转动时弯腰或拱背，导致腰椎受压；③ 动作速度过快，缺乏离心控制，容易产生冲击负荷。', '可以通过调节滑轮的高度来改变动作的难度和角度；双脚站距可适当加大或缩小以增强平衡；如感到核心负荷不足，可在动作顶部加入轻微的停顿或使用稍大的阻力。', 'compound', '{"变体类型":"单臂侧向伐木或使用哑铃/壶铃进行类似动作","转换建议":"将双手握住改为单手握住手柄，或换成自由重量（如哑铃）执行相同的对角线砍木轨迹，以进一步强化核心稳定性和力量控制。"}', 'published', NOW(3), NOW(3));
SET @eid_35 = LAST_INSERT_ID();
-- Suggested muscle: 内斜肌 (agonist)
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀中肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('跪姿侧向卷腹', 'core', 'bodyweight', 'beginner', NULL, '1. 起始姿势：跪在垫子上，双膝与髋同宽，脚尖轻轻触地支撑，双手交叉放在胸前或轻扶耳侧，保持躯干挺直。\n2. 收紧核心，背部保持自然弧度，身体略微向左侧倾斜，重心放在左膝上。\n3. 呼气时，左侧侧腹发力，将左肘向左侧膝盖方向卷曲，同时右手轻轻扶住左侧大腿以辅助发力。\n4. 在卷腹的最高点稍作停顿，感受侧腹的强烈收缩，然后吸气，缓慢将上半身放回起始姿势。\n5. 完成设定的次数后，换右侧进行相同的动作，确保两侧的次数和强度相等。\n6. 整个动作过程中保持呼吸节奏平稳，避免利用惯性或摆动身体。', '1. 练习前进行5-10分钟的核心热身，以防止腰部受伤。\n2. 保持脊柱自然弧度，避免过度弓背或塌腰，以免对腰椎产生压力。\n3. 若出现腰部或膝盖不适，应立即停止并咨询专业教练或医生。', '1. 使用惯性快速完成动作，导致核心肌肉得不到有效刺激。\n2. 动作时背部下沉或弓背，导致腰椎过度伸展，增加受伤风险。\n3. 只做单侧练习，忽视另一侧的均衡发展。', '1. 初学者可以先降低动作幅度，专注于感受侧腹的收缩。
2. 如膝盖感到不适，可在膝下放软垫或改为站姿进行侧向卷腹。
3. 进阶时可手持哑铃或使用弹力带增加阻力，提高训练强度。', 'isolation', '{"站姿侧向卷腹":"双脚站立，保持躯干直立，可扶墙或使用支撑杆帮助平衡，然后进行侧向卷腹动作。","侧卧卷腹":"侧卧在垫子上，下侧手臂伸直支撑身体，进行侧向卷腹，可更好地孤立侧腹肌肉。","侧向平板支撑":"采用侧向平板姿势，保持身体平直，利用侧向支撑力强化核心，适合进阶训练。"}', 'published', NOW(3), NOW(3));
SET @eid_36 = LAST_INSERT_ID();
-- Suggested muscle: 腹外斜肌 (agonist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('站姿侧弯', 'core', 'bodyweight', 'beginner', NULL, '1. 双脚与肩同宽站立，膝盖微屈，核心收紧，保持脊柱自然中立。\n2. 双手可以放在体侧、交叉放在胸前，或双手举过头顶以增加挑战。\n3. 吸气时，慢慢向右侧弯腰，确保胸部向侧面移动而不是向前倾，保持腹部用力。\n4. 下降到右侧腹斜肌感到轻微拉伸但舒适的范围，保持约2秒，控制动作不要弹回。\n5. 呼气时，用右侧腹斜肌发力将身体拉回起始姿势，动作全程保持平稳控制。\n6. 完成规定次数后换左侧重复相同的动作。', '保持脊柱中立，避免过度前倾或后仰，以减少下背部压力。,动作过程中不要使用惯性或快速弹跳，保持控制并在舒适范围内进行。,如有腰部或脊柱疾病，请在专业人士指导下进行或避免此动作。', '使用惯性甩动身体，导致核心失去控制，容易受伤。,弯腰时身体前倾或后仰，使下背承担过大负荷。,下降幅度过大，超出个人柔韧性，导致腰椎过度弯曲。', '初学者可将双手放在体侧或交叉胸前，以降低难度。,如需要增加难度，可双手举过头顶或在手中握住哑铃。,平衡感不佳时可靠近墙壁或使用稳固的支撑物进行练习。', 'isolation', '{"哑铃站姿侧弯":"握住哑铃置于体侧，增加阻力，重点强化腹斜肌的抗阻力收缩。","弹力带站姿侧弯":"将弹力带固定在身体侧方的一端，单手握住另一端进行侧弯，增强侧向力量。","侧卧侧弯":"侧卧于垫子，进行侧向卷腹，更好地孤立腹斜肌并减轻脊柱压力。"}', 'published', NOW(3), NOW(3));
SET @eid_37 = LAST_INSERT_ID();
-- Suggested muscle: 外斜肌（右侧） (agonist)
-- Suggested muscle: 内斜肌（右侧） (synergist)
-- Suggested muscle: 腰方肌（右侧） (synergist)
-- Suggested muscle: 外斜肌（左侧） (antagonist)
-- Suggested muscle: 竖脊肌（右侧） (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('交叉卷腹', 'core', 'bodyweight', 'intermediate', NULL, '1. 仰卧在瑜伽垫上，双腿弯曲，双脚平放在地面上，双手自然放在耳侧或轻轻触碰头部两侧。\n2. 收紧核心肌群，将右肩和右肘向左侧膝盖方向卷起，同时左腿向胸部方向弯曲抬起。\n3. 同时将左肘向右侧膝盖方向移动，使右肘与左膝相互靠近，形成交叉动作。\n4. 在动作顶峰位置稍作停留，确保腹肌有明显的收缩感。\n5. 缓慢控制地回到起始姿势，确保下背部始终贴紧地面。\n6. 然后换另一侧进行相同的动作，两侧交替完成规定的次数。', '避免用手过度拉扯头部或颈部发力，这可能导致颈椎受伤，应用腹肌力量带动身体卷起。\n确保动作过程中下背部始终贴紧地面，不要让腰部拱起离开垫子，以免造成腰椎压力过大。\n初学者应放慢动作节奏，确保动作的完整性和正确性，不要为了追求速度而牺牲动作质量。', '动作过快且没有控制，依赖惯性完成动作，这样会大大降低训练效果并增加受伤风险。\n双手用力拉扯头部导致颈部过度前屈，长期这样做可能引起颈部不适甚至损伤。\n腰部拱起离开垫子形成骨盆前倾的姿势，这会使下背部承受过大压力，应始终保持腰椎的中立位置。', '如果感到下背部不适，可以在臀部下方垫一个枕头或卷起的毛巾来减少腰椎的压力。
对于初学者，可以先练习单独的卷腹动作，待核心力量提升后再进行交叉卷腹。
如果无法完成完整的动作幅度，可以减小卷腹的幅度，随着力量提升逐渐增加动作范围。
可以将双腿伸直平放在地面上进行简化版本的交叉卷腹，降低难度。', 'isolation', '{"简化变体":"将双腿伸直放在地面上，只进行单侧的卷腹动作，减少对核心的要求。","强化变体":"在卷腹时保持双腿悬空（膝盖弯曲90度），或者伸直双腿与地面成45度角，增加动作难度。","节奏变化":"在卷起的顶端保持2-3秒的等长收缩，可以增强肌肉的参与度。","器材辅助":"可以使用阻力带增加阻力，或者在脚踝处夹一个哑铃片来增加挑战。"}', 'published', NOW(3), NOW(3));
SET @eid_39 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (agonist)
-- Suggested muscle: 腹内斜肌 (agonist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 股直肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧侧卷腹', 'core', 'bodyweight', 'beginner', NULL, '1. 躺在垫子上，双脚弯曲，脚掌平放在地面上，双手交叉放在胸前或轻扶耳侧。\n2. 将身体向一侧转动，使上背部轻轻离地，同时将同侧的肩膀向臀部方向收紧。\n3. 在最高点稍作停顿，感受侧腹部的收缩。\n4. 缓慢放下上背部回到起始姿势，完成一次动作。\n5. 完成指定次数后，换另一侧重复。', '1. 动作过程中保持颈部自然放松，避免用力拉扯颈部。\n2. 只做可控的幅度，避免用力过猛导致腰部受伤。\n3. 如有腰部或髋部不适，请立即停止并咨询专业教练。', '1. 用力拉动头部或颈部，导致颈椎受压。\n2. 动作幅度过大，背部完全离地，增加腰椎负担。\n3. 呼吸不规律，吸气与呼气配合不当。', '1. 如感觉颈部不适，可将手放在头后轻轻支撑，保持头部自然对齐。
2. 初学者可以先做小幅度的侧卷，逐渐增加幅度。
3. 如想增加难度，可在动作最高点保持更长时间或使用哑铃增加负重。', 'isolation', '{"变体类型":"可以通过把脚抬离地面（双脚交叉）或在侧卷时加入旋转的复合动作来提升难度；如果想要更针对腹部的动作，可改为平板支撑或俄罗斯转体。"}', 'published', NOW(3), NOW(3));
SET @eid_40 = LAST_INSERT_ID();
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 横腹肌 (stabilizer)
-- Suggested muscle: 腰方肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索侧拉', 'core', 'cable', 'intermediate', NULL, '1. 调整滑轮高度至略高于肩部，确保绳索自然下垂。\n2. 站立，脚与肩同宽，膝盖微屈，保持核心收紧，背部挺直。\n3. 侧身面对滑轮，用远离滑轮的手握住绳索手柄，手臂伸直，手肘略微弯曲。\n4. 呼气时，通过侧向收缩腹部和腰部肌肉，将绳索向侧面拉至胸部水平，身体略向同侧倾斜，保持动作范围在舒适范围内，避免过度旋转。\n5. 吸气时，控制力量缓慢回到起始姿势，保持核心始终紧绷，完成所需次数后换另一侧。', '1. 在拉动时保持背部挺直，避免弓背或过度前倾导致腰椎受伤。\n2. 使用合适的重量，避免使用过重导致动作失控或拉伤肩关节。\n3. 确保滑轮固定良好，绳索无磨损，防止意外断裂。', '1. 动作幅度过大，导致肩部或腰部过度伸展。\n2. 使用手臂力量而非核心力量，使侧拉变成肩部运动。\n3. 在动作过程中身体扭转或前倾，降低核心刺激效果。', '1. 根据个人柔韧性和身高微调滑轮高度，使绳索在起始位置时略低于手部。
2. 若感到腰部压力过大，可适当减小动作幅度或降低重量。
3. 使用单手或双手变体以改变负荷分布，增强核心单侧或双侧控制。', 'isolation', '{"单手侧拉":"改用单手哑铃侧弯，保持相同的手臂角度和动作范围，以提升核心单侧控制。","双手侧拉":"双手同时握住绳索进行侧拉，可增加负荷并提高整体核心协同工作。","无绳侧拉（哑铃）":"在没有Cable设备时，可使用哑铃侧弯或侧倾动作，保持相同的侧向收缩模式。"}', 'published', NOW(3), NOW(3));
SET @eid_41 = LAST_INSERT_ID();
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 腰方肌 (agonist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('侧卧抬腿', 'core', 'bodyweight', 'beginner', NULL, '1. 侧卧在平坦的垫子或地面上，保持头部、肩膀、髋部与脚踝在一条直线上。下方手臂自然放在胸前或支撑在地面，上方手臂轻触髋部或放在胸前。\n2. 收紧核心（腹横肌和腹斜肌），保持脊柱自然曲度，避免塌腰或前倾。\n3. 上方腿保持伸直（膝可微屈），脚尖略向天花板或略微向前。\n4. 缓慢抬起上方腿至约30-45度的高度，在最高点停顿1-2秒，感受臀中肌的收缩。\n5. 控制力量，缓慢放下腿回到起始位置，避免让腿自由下落或使用惯性。\n6. 完成设定次数后，换另一侧重复。进阶可在踝部套上弹力带或加轻度踝负重以增加阻力。', '保持髋部始终对齐，避免在抬腿时出现髋部向前或向后的旋转，以防腰椎产生不必要的侧屈。,动作全程避免使用惯性或甩腿，抬起和放下都要控制速度，以防膝盖或髋关节受伤。,若出现腰部、髋部或大腿外侧的锐痛，应立即停止并咨询专业教练或医生。', '抬腿时脚尖外翻导致髋外旋，使臀中肌失去张力，动作变成髋屈肌的练习。,抬腿幅度过大，使腰椎出现过度侧屈或塌腰，增加下背部受伤风险。,核心未激活或耸肩，导致脊柱不稳，使动作主要依赖腿部力量而核心参与不足。', '初学者可先做膝部微屈的侧卧抬腿，降低难度；如果感到髋关节不适，可在膝盖下方垫一个小垫子或改为坐姿侧抬腿；进阶时可在踝部套上弹力带或使用轻量踝负重，亦可将动作改为双腿同时抬起以提升核心挑战。', 'isolation', '{"单腿侧卧抬腿":"保持双腿伸直，逐侧完成规定次数，可通过增加抬腿高度或停顿时间来提升难度。","双腿侧卧抬腿":"同时抬起双腿，提高核心稳定性需求，适用于想要增强核心参与的训练者。","弹力带侧卧抬腿":"在踝部套上弹力带提供额外阻力，适合进阶训练者增强臀中肌力量。","站姿侧抬腿":"将动作转化为站姿，手持哑铃或徒手进行侧向抬腿，兼顾下肢外展与平衡训练。"}', 'published', NOW(3), NOW(3));
SET @eid_42 = LAST_INSERT_ID();
-- Suggested muscle: 臀中肌 (agonist)
-- Suggested muscle: 阔筋膜张肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 腰方肌 (stabilizer)
-- Suggested muscle: 腹外斜肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 大腿内收肌群 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('倾斜侧卧卷腹', 'core', 'bodyweight', 'intermediate', NULL, '1. 侧卧在倾斜的侧卧板上，确保身体侧面紧贴板面，双脚固定在板的高处，头部自然枕在下方手臂上或放在垫子上。\n2. 上侧手臂可以放在体侧或轻触地面以保持平衡。保持身体从头到脚呈一条直线。\n3. 呼气时，收缩腹斜肌，将上侧肩膀向髋部方向卷起，试图让肘部接近髋关节。\n4. 在动作顶点保持1-2秒，充分感受腹斜肌的收缩，但不要完全离开板面。\n5. 吸气时，缓慢控制地将身体有控制地放回起始位置，保持腹肌的张力。\n6. 完成目标次数后，换另一侧重复进行。', '1. 确保倾斜侧卧板稳固固定，不会滑动或移动，训练前检查设备安全性。\n2. 动作过程中保持脊柱自然对齐，不要过度扭转或向前弯折，以免造成腰椎压力过大。\n3. 如果有腰椎或髋部问题，训练前应咨询专业教练或物理治疗师的建议。', '1. 利用惯性甩动身体而不是主动收缩腹斜肌发力，降低训练效果并增加受伤风险。\n2. 卷起幅度过大导致身体完全离开板面，使腰椎过度屈曲产生剪切力。\n3. 头部和颈部过度前倾借力，导致颈椎压力增加，应始终保持头部中立位置。', '新手可以先降低倾斜角度或选择平躺位置进行侧卧卷腹，待核心力量提升后再逐步增加倾斜难度。上方手臂可以放在体侧减少平衡难度，随着能力提升可将手臂放在头后增加动作范围。呼吸应与动作配合，卷起时呼气，下放时吸气。', 'isolation', '{"降阶变体":"在平面上进行标准侧卧卷腹，双手扶地辅助稳定","升级变体":"在倾斜板上进行时，可双手持哑铃或杠铃片增加负重，进一步增强腹斜肌刺激","替代动作":"可使用跪姿侧身卷腹、悬垂侧举腿等动作替代，训练效果相似"}', 'published', NOW(3), NOW(3));
SET @eid_43 = LAST_INSERT_ID();
-- Suggested muscle: 腹外斜肌 (agonist)
-- Suggested muscle: 腹内斜肌 (agonist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀中肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('壶铃侧向卷腹', 'core', 'dumbbell', 'intermediate', NULL, '1. 起始姿势：仰卧在平坦的训练垫上，双膝弯曲，双脚平放于地面，双手握住壶铃的把手，将壶铃置于胸上方或上举于胸前，保持肩部放松。\n2. 侧向卷腹准备：将身体向右侧倾斜，使右肩略微离开地面，左侧臀部仍紧贴垫子，保持核心紧绷。\n3. 动作执行：呼气时，用右侧腹肌发力，将右侧肩膀向右侧髋部卷起，同时左臂保持伸直支撑壶铃，动作幅度控制在肩胛骨离开地面约30-45度。\n4. 顶点保持：在最高点稍作停顿，感受右侧腹肌的收缩。\n5. 复位：吸气时，有控制地慢慢放低右侧肩膀回到起始位置，保持壶铃的稳定性，避免猛然掉落。\n6. 完成重复：按预定次数完成右侧练习后，换到左侧进行相同的动作，确保两侧训练量均衡。', '使用的壶铃重量应适中，避免因重量过大导致腰部或肩部受伤。,动作过程中始终保持脊柱自然弧度，避免用力过猛导致背部过度屈曲。,若感到颈部或背部不适，应立即停止并调整姿势或减轻重量。', '用力过猛导致动作幅度过大，使脊柱出现过度屈曲或扭转。,在卷腹时用手臂力量抬起壶铃，削弱了腹肌的锻炼效果。,呼吸不正确，呼气时没有配合动作，导致腹压升高，增加受伤风险。', '如果初次练习或核心力量较弱，可以先徒手或使用轻重量哑铃进行侧向卷腹，逐步适应后再加入壶铃；在训练过程中，保持肩膀放松，避免耸肩；若感到腰部不适，可在臀部下方放置小垫子以减轻腰椎压力。', 'isolation', '{"变体类型":"哑铃侧向卷腹","转换建议":"将壶铃替换为等重的哑铃，握住哑铃的一端仍保持与壶铃相同的握法，其他动作细节不变，能够更好地专注于腹肌发力。"}', 'published', NOW(3), NOW(3));
SET @eid_44 = LAST_INSERT_ID();
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (agonist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 腰方肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 胸大肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('死虫式', 'core', 'bodyweight', 'intermediate', NULL, '1. 仰卧姿势，双手伸直指向天花板，膝盖弯曲抬起约90度，小腿平行于地面，大腿与地面垂直。\n2. 将下背部平稳压向地面，收紧腹部深层肌肉（想象肚脐向脊椎靠拢），保持脊柱中立位。\n3. 在保持核心稳定的前提下，缓慢将左臂向头部方向伸展，同时将右腿向脚跟方向伸展伸直。\n4. 手臂和腿伸展时保持贴地或接近地面，维持下背部始终紧贴地面，感受核心的持续收缩。\n5. 在最低点保持1-2秒，然后缓慢回到起始姿势，换另一侧手臂和腿进行。\n6. 交替进行，根据个人能力完成8-12次为一组。', '1. 始终保持下背部紧贴地面，若无法维持说明动作范围过大，需减小伸展幅度。\n2. 动作过程保持缓慢控制，避免使用惯性或弹力来完成动作。\n3. 如有腰椎问题或腰部疼痛，请在专业教练指导下进行或选择其他更合适的动作。', '1. 下背部翘起离开地面，导致腰椎过度伸展，增加腰椎压力。\n2. 动作速度过快，利用惯性完成，未能有效激活核心稳定肌群。\n3. 耸肩或颈部紧张，导致颈椎压力增大，应始终目视天花板或天花板上方。', '降低难度：可将腿抬高使膝盖更靠近胸部，或只伸展手臂不伸展腿。
增加难度：可双手握住重物（如哑铃）进行，或同时伸展对侧手臂和腿时，将另一侧膝盖靠向胸部增加挑战。
进阶变体：在保持核心稳定的同时，让手臂和腿在空中画圈或进行更复杂的对侧移动。', 'isolation', '{"降低难度":"减少手臂或腿部伸展范围，或仅做单侧动作专注于核心控制","增加难度":"手持重物进行，或在动作中加入旋转元素增强核心抗旋转能力"}', 'published', NOW(3), NOW(3));
SET @eid_46 = LAST_INSERT_ID();
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 多裂肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 股直肌 (synergist)
-- Suggested muscle: 胸大肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('真空腹', 'core', 'bodyweight', 'intermediate', NULL, '1. 起始姿势，可采用仰卧、坐姿或四点支撑位，保持脊柱自然中立，双手轻放于胸前或身体两侧。\n2. 深吸气至腹部完全鼓起，胸廓扩张，膈肌向下压迫，感觉整个腹部充满空气。\n3. 在呼气时用力将肚脐向脊柱后方收缩，像要把肚脐贴在背后，保持腹部向内收紧约2‑3秒，专注于腹横肌的收缩。\n4. 保持收缩时避免肋骨上抬或下沉，胸廓保持固定位置，只有腹部深层肌肉在工作。\n5. 吸气慢慢放松腹部回到初始状态，感受腹部的自然回弹，完成一次动作。\n6. 重复动作至设定次数（如10‑15次）或保持一定时间（如30秒），注意全程呼吸平稳。', '1. 收缩时不要用力过猛，以免对腰椎产生过大压力，若感到腰背疼痛应立即停止。\n2. 若有腰部疾病、怀孕或其他健康问题，请在专业教练或医生指导下进行。\n3. 保持呼吸顺畅，避免长时间屏气，以防止血压升高或头晕。', '1. 在收缩时抬起肋骨或过度使用腹直肌，导致腹横肌未得到有效激活。\n2. 吸气时让腹部过度鼓起或放松，失去了对腹横肌的控制感。\n3. 动作时盆底肌未能放松或配合不当，出现代偿现象。', '如果无法清晰感受到腹横肌收缩，可在腹部绑一条弹性束带或使用小毛巾辅助，以提供轻微的外部反馈；也可改为坐姿或站姿进行，逐步增加动作难度。', 'isolation', '{"变体类型":"侧卧真空腹","转换建议":"在侧卧姿势下进行相同动作，可增加内斜肌和外斜肌的协同参与，增强核心侧向稳定性；若想进一步强化，可在膝盖间夹一个软球提升难度。"}', 'published', NOW(3), NOW(3));
SET @eid_48 = LAST_INSERT_ID();
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 膈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('平板支撑侧抬腿', 'core', 'bodyweight', 'intermediate', NULL, '1. 从高位平板支撑姿势开始，双手撑地于肩膀正下方，双脚并拢，身体从头到脚呈一条直线。\n2. 保持核心收紧，脊柱保持中立位置，肩胛骨稳定，不要耸肩。\n3. 保持身体其他部位稳定不动，将右侧腿向侧面抬起，腿保持伸直，脚尖朝前。\n4. 抬腿高度根据个人能力，抬至舒适的位置即可，注意控制动作不要让髋部下降或旋转。\n5. 在顶部位置略作停顿，感受侧腹和髋部的收缩。\n6. 缓慢有控制地将腿放下回到起始位置，完成右侧动作后，换左侧腿重复同样的步骤。', '1. 如果感到下背部或肩部疼痛，应立即停止动作并降低难度或寻求专业指导。\n2. 避免在疲劳状态下进行此动作，以免因核心力量不足导致姿势走样而受伤。\n3. 动作过程中保持均匀呼吸，不要憋气，以维持核心稳定性和血液循环。', '1. 髋部在抬腿时下降或向一侧倾斜，导致脊柱失去中立位置，增加下背部压力。\n2. 动作速度过快，缺乏对动作的控制，特别是在下降阶段没有进行离心收缩。\n3. 抬腿时脚尖外旋或内扣，应保持脚尖自然朝前或微微向内，以正确激活目标肌肉。', '1. 初学者可以将抬腿幅度减小，或在膝盖弯曲的状态下进行，以降低难度。
2. 如果标准动作太难，可以先练习静态平板支撑和单腿平衡来建立核心稳定性。
3. 进阶者可以尝试在抬起腿时加入轻微的髋部外旋，或延长顶部停顿时间来增加挑战。', 'compound', '{"降阶变体":"从膝盖弯曲的侧抬腿开始，降低身体重心和核心稳定性要求","升阶变体":"尝试在抬起腿时保持髋部略微抬高，或加入髋部外旋动作增加难度","替代变体":"侧卧位进行侧抬腿，减小核心稳定需求，专注于髋外展肌群"}', 'published', NOW(3), NOW(3));
SET @eid_49 = LAST_INSERT_ID();
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 腹内外斜肌 (agonist)
-- Suggested muscle: 臀中肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 股四头肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('侧桥', 'core', 'bodyweight', 'beginner', NULL, '1. 起始姿势：侧卧于垫子上，用前臂和膝盖支撑身体，上侧手臂自然放在体侧或叉腰。\n2. 支撑准备：将支撑侧的肘部弯曲，肘关节屈曲90度，肘尖朝正前方，将小臂稳稳地放在垫子上。\n3. 核心发力：收紧腹部和臀部，向上抬起髋部，使身体从头到脚呈一条直线。\n4. 姿势保持：保持核心稳定，不要让髋部下沉或向上拱起，维持此姿势10-30秒。\n5. 换侧完成：完成一侧后，慢慢放下髋部回到起始姿势，然后翻身换另一侧重复相同步骤。', '1. 保持脊柱中立位，避免塌腰或过度挺髋，以免造成腰椎压力过大。\n2. 如果肩部有伤病或不适，应避免此动作或减轻强度。\n3. 动作过程中保持均匀呼吸，不要憋气。', '1. 髋部下沉：许多人会不自觉地将下侧髋部降低，失去身体平直的姿势，降低训练效果。\n2. 头部与脊柱不对齐：头部过度前倾或后仰会增加颈部压力，应保持头部与脊柱成一直线。\n3. 过度依赖肩部力量：有些人会用肩部发力抬起身体，应更多依靠核心力量来维持姿势。', '1. 入门者可以先从跪姿侧桥开始，降低难度后再过渡到标准侧桥。
2. 如果维持时间不足，可以缩短保持时间，增加重复次数。
3. 如果想增加难度，可以在保持侧桥姿势时，将上侧腿抬起或进行腿部动作。
4. 对于手腕不适的人群，可以使用瑜伽砖或垫子边缘支撑前臂。', 'isolation', '{"退阶变体":"从跪姿侧桥开始，减少需要支撑的体重，降低核心负担","进阶变体":"在侧桥姿势下进行腿部侧向抬升，或将上侧腿抬离地面增加难度","动态变体":"可以进行侧桥来回弹跳或侧桥行走，增加动态挑战"}', 'published', NOW(3), NOW(3));
SET @eid_50 = LAST_INSERT_ID();
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 腹内斜肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 臀中肌 (synergist)
-- Suggested muscle: 臀小肌 (synergist)
-- Suggested muscle: 三角肌 (stabilizer)
-- Suggested muscle: 多裂肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('四点支撑', 'core', 'bodyweight', 'beginner', NULL, '1. 四肢着地呈跪撑姿势，双手在肩部正下方，双膝在髋部正下方，双手间距与肩同宽。\n2. 收紧腹部肌肉，保持脊柱自然中立位置，避免塌腰或拱背。\n3. 收紧肩胛骨并稳定肩部，双手用力压向地面，避免耸肩现象。\n4. 头部保持中立，目光自然向下看，保持颈部与脊柱呈一条直线。\n5. 确保身体从头到膝盖呈一条水平直线，臀部不要过高或过低。\n6. 正常呼吸，保持此姿势30-60秒或根据个人能力调整，结束时缓慢放松。', '1. 保持脊柱中立位置，避免腰椎过度屈曲或伸展导致腰部压力过大。\n2. 肩膀位置不要超过手腕垂直线，以免造成肩关节不必要的压力和损伤。\n3. 如有膝关节不适，可在膝盖下方垫软垫或毛巾进行保护。', '1. 塌腰导致腰椎过度弯曲，降低核心训练效果且增加下背受伤风险。\n2. 耸肩使肩部离开中立位置，影响肩关节稳定性并减少核心参与。\n3. 臀部抬得过高导致身体呈倒V形，无法有效训练核心稳定性。', '初学者可将保持时间缩短至15-20秒，逐步增加时长；膝盖敏感者可使用软垫；核心力量提升后可增加变体动作如单臂单腿支撑。', 'compound', '{"退阶变体":"双膝着地降低难度，减少核心负荷","进阶变体":"抬起对侧手臂和腿部增加核心挑战和协调性","动态变体":"在四点支撑位进行鸟狗式（Bird Dog）增加动态稳定性训练"}', 'published', NOW(3), NOW(3));
SET @eid_51 = LAST_INSERT_ID();
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (synergist)
-- Suggested muscle: 多裂肌 (stabilizer)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 肩袖肌群 (stabilizer)
-- Suggested muscle: 背阔肌 (synergist)
-- Suggested muscle: 股直肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('农夫行走', 'core', 'dumbbell', 'beginner', NULL, '1. 站直，双手各握一只哑铃，手臂自然下垂，脚距离与肩同宽。\n2. 收紧腹部，保持背部挺直，眼睛平视前方，准备开始行走。\n3. 迈出一步，脚尖指向正前方，步幅保持在30‑45厘米左右，保持步伐平稳。\n4. 行走时保持哑铃在身体两侧，手肘略微弯曲，避免手臂大幅摆动。\n5. 持续行走指定的距离或时间，注意呼吸自然，呼气时进一步收紧核心。\n6. 行走结束后，缓慢停下，轻轻放下哑铃，站立放松片刻。', '确保行走地面平整、防滑，防止绊倒或滑倒受伤。,选择合适的哑铃重量，避免过重导致肩、腰部过度负荷。,保持背部挺直，避免驼背或前倾，以保护脊柱。', '驼背或前倾导致脊柱受压，增加下背受伤风险。,手臂摆动过大或耸肩，使肩部额外受力，影响核心稳定性。,步伐过小或过大，导致身体不稳定，削弱核心训练效果。', '如果感到腰部不适，可缩短步幅或降低哑铃重量；可改为单手持哑铃以增加核心不对称负荷；若想提升难度，可在不平坦的路面或进行转身、侧向行走。', 'compound', '{"变体类型":"单手持哑铃行走","转换建议":"将哑铃改为单手握持，可增加核心不对称负荷，提高平衡与控制；也可使用更重的哑铃或背负重物以提升难度。"}', 'published', NOW(3), NOW(3));
SET @eid_52 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 前臂屈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('臀桥', 'core', 'bodyweight', 'beginner', NULL, '1. 平躺在瑜伽垫上，膝盖弯曲，双脚平放在地面上，与肩同宽，脚尖微微朝前，双手放在身体两侧掌心向下。\n2. 收紧腹部和臀部肌肉，确保下背部紧贴地面，准备开始动作。\n3. 通过脚后跟发力，将臀部向上推起，直到身体从肩膀到膝盖形成一条直线，臀部肌肉全程保持收紧状态。\n4. 在顶峰位置暂停1-2秒，感受臀部肌肉的最大收缩，确保腹部持续收紧避免腰部下塌。\n5. 缓慢地将臀部下落回起始位置，控制速度不要直接掉落，下落时呼气。\n6. 重复完成规定的次数，保持稳定的呼吸节奏。', '1. 动作过程中保持下背部中立，不要过度弓腰或下塌，以免对腰椎造成压力。\n2. 脚跟应全程紧贴地面，避免前脚掌或脚尖发力，以确保臀部肌肉充分参与。\n3. 如果感到腰部不适或疼痛，应立即停止动作并降低强度或咨询专业教练。', '1. 腰椎过度屈曲（骨盆前倾），导致下背部离开地面，应始终保持核心收紧控制骨盆位置。\n2. 髋部没有推至足够高度，没有形成完整的髋伸展，降低了对臀大肌的刺激效果。\n3. 动作速度过快，特别是在下落阶段没有控制力，无法有效激活目标肌肉。\n4. 膝盖过度内收（膝内扣），应保持膝盖与脚尖方向一致。', '1. 初学者可以先将双脚靠近臀部，减小动作范围，随着力量提升逐渐增加幅度。
2. 如需增加难度，可尝试单腿臀桥，将一条腿伸直保持在空中。
3. 可在大腿之间放置弹力带增加阻力，或在腹部放置重物增加负荷。
4. 如果无法正确完成，可先进行俯卧髋伸展或跪姿髋伸展等辅助练习。', 'compound', '{"变体类型":"可转换为单腿臀桥提升核心稳定性要求；可转换为杠铃臀桥增加负荷；可加入弹力带增加外展阻力针对臀中肌；可结合阻力带进行热身激活练习。"}', 'published', NOW(3), NOW(3));
SET @eid_53 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 竖脊肌 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 多裂肌 (stabilizer)
-- Suggested muscle: 髋屈肌 (antagonist)
-- Suggested muscle: 股四头肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧收腹', 'core', 'bodyweight', 'beginner', NULL, '1. 仰面平躺在瑜伽垫或平整的地面上，双腿伸直，双臂自然放在身体两侧，掌心朝下。\n2. 收紧腹部肌肉，呼气的同时将双腿缓缓抬起，与地面约成30-45度角。\n3. 保持双腿角度不变，继续呼气，将双腿向胸部方向收拢，直到大腿与地面接近垂直。\n4. 在顶峰位置稍作停顿，感受腹部肌肉的充分收缩。\n5. 吸气，缓慢下放双腿，回到起始位置，但双脚不要触碰地面。\n6. 重复进行规定的次数，保持呼吸节奏平稳，腹部全程保持紧绷状态。', '1. 动作过程中保持下背部始终贴紧地面，避免腰部过度拱起导致腰椎压力过大。\n2. 颈部和肩部应保持放松，不要用手力量拉拽头部，双手轻触地面起稳定作用即可。\n3. 如果感到颈部不适或腰背疼痛，应立即停止动作并降低训练强度。', '1. 腿部下落时冲击力过大，导致下背部抬起离开地面。\n2. 使用颈部和双手的力量来拉动身体，而非依靠腹肌发力。\n3. 动作节奏过快，没有在顶峰位置充分收缩腹肌。', '新手可以先将双腿抬高至90度再开始收拢，逐步增加幅度；进阶者可在动作顶部让臀部轻微离地，增强腹肌收缩感；腰部有不适者可屈膝进行，以减轻下背部压力。', 'isolation', '{"进阶变体":"可将双手置于头后增加难度，或在动作顶端加入转体动作同时训练腹斜肌","退阶变体":"减少双腿抬起角度，或在膝盖弯曲状态下进行仰卧收腹，降低动作难度"}', 'published', NOW(3), NOW(3));
SET @eid_54 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('山羊挺身', 'core', 'other', 'intermediate', NULL, '1. 准备姿势：趴在罗马椅或山羊挺身架上，髋部对齐垫子边缘，双手交叉抱于胸前或放在耳后，身体从髋部开始向前倾，使上半身与地面平行。\n2. 稳定身体：收紧核心和臀部肌肉，确保身体在器械上保持稳定，膝盖略微弯曲。\n3. 下降动作：保持背部平直，身体缓慢向前下方俯身，直到感觉下背部有轻微拉伸感。\n4. 向上发力：下背部和臀部协同发力，将上半身向上抬起回到起始位置，动作过程中始终保持背部挺直。\n5. 呼吸控制：下降时吸气，向上抬起时呼气，动作全程控制节奏，避免使用惯性。', '1. 确保器械调节合适，髋部位置正确，避免在动作过程中身体滑动。\n2. 整个动作过程保持核心收紧和背部平直，不要过度弓背或塌腰，以免造成腰椎压力过大。\n3. 动作速度要缓慢控制，避免利用惯性甩动身体，初学者建议从自重开始练习。', '1. 过度弓背：在动作下降或上升时，背部过度弯曲成一个弧形，这会增加腰椎受伤风险。\n2. 动作范围过大：盲目追求身体下降的幅度，导致腰部超伸，应该在舒适范围内控制动作。\n3. 使用过大重量：为了追求次数而使用过重负荷，导致动作变形，无法保持正确姿势。', '1. 初学者可以从双手放在身体两侧或轻触地面开始，以更好地保持平衡和控制。
2. 如果下背部感觉不适，可以减小动作幅度或改用跪姿进行练习。
3. 可以在背部上方放置一个轻重量杠铃片增加负荷，但需确保能够维持正确姿势。', 'compound', '{"变体类型":"可调整为负重山羊挺身（手持杠铃片或哑铃）、跪姿山羊挺身、单腿山羊挺身增加难度，或使用弹力带增加阻力。","简化版本":"可以从徒手俯卧挺身开始，双手撑地抬起上半身，重点感受下背部发力。","场地变换":"在没有器械的情况下，可以趴在长凳边缘或使用瑜伽垫进行类似训练。"}', 'published', NOW(3), NOW(3));
SET @eid_55 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌（Erector Spinae） (agonist)
-- Suggested muscle: 臀大肌（Gluteus Maximus） (synergist)
-- Suggested muscle: 腘绳肌（Hamstrings） (synergist)
-- Suggested muscle: 腹直肌（Rectus Abdominis） (stabilizer)
-- Suggested muscle: 多裂肌（Multifidus） (stabilizer)
-- Suggested muscle: 髂腰肌（Iliopsoas） (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('俯卧背伸', 'core', 'bodyweight', 'beginner', NULL, '1. 俯卧在垫子上，双脚并拢，脚尖轻轻触地，双手交叉放在胸前或放在耳旁。\n2. 保持核心收紧，缓慢抬起上半身至胸部离开地面，仅使用背部力量，避免用手臂推地。\n3. 在最高点稍作停顿，感受背部伸肌的收缩。\n4. 缓慢控制下降，将上半身放回垫子，保持背部平直，避免猛然塌背。\n5. 重复动作，确保全程呼吸平稳，吸气时抬起，呼气时下降。', '1. 动作全程保持脊柱中立，避免过度伸展导致腰部压力。\n2. 若有背部疼痛或腰椎问题，应先咨询医生或专业教练再进行练习。\n3. 使用垫子或软垫保护胸部和腹部，避免硬地直接压迫。', '1. 使用手臂力量推地，导致背部肌肉未得到充分锻炼。\n2. 动作幅度过大，臀部抬起过高，使腰椎承受额外负荷。\n3. 动作过程中屏住呼吸，导致血压升高。', '如果想降低难度，可在胸前放置枕头或使用双手撑地稍微支撑身体；如果想增加难度，可在背部上方放置小杠铃片或使用瑞士球进行背伸。', 'compound', '{"健身球背伸":"将身体置于健身球上，腹部贴在球面，双手扶耳，类似俯卧姿势进行背伸，可增强核心稳定性。","单侧背伸":"侧卧身体，一侧手臂伸直支撑，另一侧进行背伸动作，可针对性强化单侧背部肌群。"}', 'published', NOW(3), NOW(3));
SET @eid_56 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 胸锁乳突肌 (synergist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腹直肌 (antagonist)
-- Suggested muscle: 腰方肌 (stabilizer)
-- Suggested muscle: 多裂肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('早安式', 'core', 'barbell', 'intermediate', NULL, '1. 站姿准备：双脚与肩同宽，脚尖略微外展，将杠铃横放在上背部（斜方肌上），双手握杠，握距略宽于肩，收紧肩胛骨，保持胸部略微抬高。\n2. 预备姿势：收紧核心和臀部肌肉，保持脊柱自然弯曲，头部与背部保持一直线，目视前方。\n3. 动作下降：臀部向后推，屈髋弯腰，上半身向前倾，膝盖保持微屈且不超过脚尖，整个下降过程中保持背部平直，避免圆背。\n4. 下降至适当深度：通常下降到躯干几乎与地面平行，或略低于此，保持1‑2秒，感受背部、臀部和腿后侧的拉伸。\n5. 上升回到起始位置：通过臀部和大腿后侧的力量将髋部向前推，伸直躯干回到站立姿势，保持动作连贯，避免猛拉或过度伸展。\n6. 重复练习：根据训练计划完成所需的重复次数。', '1. 必须在充分热身后再进行练习，使用适当重量的杠铃，必要时请伙伴或使用安全杠/保护装置防止杠铃跌落。\n2. 动作全程保持背部平直，避免脊柱过度弯曲或过度伸展，以防背部受伤。\n3. 若感到腰部或背部不适，应立即停止并调整姿势或降低重量。', '1. 弯腰驼背：在下降过程中脊柱过度弯曲，导致腰部压力过大。\n2. 膝盖过度前移：膝盖前倾过多，改变了髋关节的发力模式，增加膝关节负担。\n3. 重量过大导致姿势失控：使用超出自己控制范围的重量，使得动作变形并增加受伤风险。', '1. 初学者可以先徒手或使用轻重量哑铃练习，逐步掌握正确的髋铰链动作模式。
2. 如肩部柔韧性不足，可将杠铃放在斜方肌后部或使用高杆位，以减轻肩部压力。
3. 若想降低背部负荷，可改为使用弹力带或进行“半程好早晨”动作，只下降到约45度角。', 'compound', '{"哑铃版":"使用哑铃替代杠铃，双手握住哑铃置于肩部侧面，保持相同的髋铰链动作。","弹力带版":"将弹力带固定在脚部或低位拉环，进行同样的髋屈伸练习，以减轻脊柱压力。","徒手版":"无需器材，双手交叉胸前，保持核心紧绷进行动作，适合热身或恢复期。","单腿版":"将一条腿抬起做单腿好早晨，增加核心稳定性和平衡挑战，适合进阶训练者。"}', 'published', NOW(3), NOW(3));
SET @eid_58 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 腰方肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 外斜肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('负重早安式', 'core', 'barbell', 'advanced', NULL, '1. 将杠铃放置在上背部斜方肌位置，双手宽握杠铃，双脚与肩同宽站立，膝盖微屈，保持脊柱自然中立。\n\n2. 深吸一口气收紧核心，胸部挺起，目光保持平视前方，维持肩胛骨稳定后倾状态。\n\n3. 以髋关节为主导进行铰链屈曲，保持杠铃在背部位置不变，躯干向前倾斜，臀部向后推。\n\n4. 继续下降至躯干接近水平位置或略低于水平，确保背部全程保持平直，不出现圆背现象。\n\n5. 在最低点稍作停顿后，通过臀部用力收缩和腘绳肌发力，将髋部向前推，躯干回到起始直立位置。\n\n6. 完成一次动作后，重复进行规定的训练次数，注意保持动作节奏和控制。', '1. 始终保持脊柱中立位置，避免在下行过程中出现圆背或过度弓腰，以免造成腰椎损伤。\n\n2. 负荷重量应从轻到重逐步增加，初学者建议在有经验的教练指导下进行，避免单独训练。\n\n3. 如果出现下背部疼痛或不适，应立即停止训练并检查动作技术，必要时降低训练重量。', '1. 在下行过程中膝盖过度屈曲或向前移动，变成了深蹲模式而非髋关节铰链，降低了对臀腿肌群的刺激效果。\n\n2. 杠铃位置过低放在肩胛冈上，导致肩部压力过大和稳定性不足。\n\n3. 下降深度过深使背部过度弯曲，或在最低点时失去核心支撑，出现骨盆前倾现象。', '1. 初学者可先从较轻重量或空杠开始练习，待掌握动作模式后再逐步增加负荷。

2. 若下背部柔韧性不足，可适当减小动作幅度，以不出现背部弯曲为前提。

3. 可使用弹力带或木棍辅助练习，帮助建立正确的动作轨迹和发力模式。', 'compound', '{"哑铃变体":"可使用哑铃以相同动作模式进行，降低技术难度同时加强单侧训练效果","TRX/悬挂训练变体":"将杠铃替换为TRX悬挂系统，做为肩部稳定和核心参与的变体练习","箱式变体":"在身后放置箱子，下降时臀部触碰箱子再推起，可帮助掌握下降深度"}', 'published', NOW(3), NOW(3));
SET @eid_59 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 股二头肌 (agonist)
-- Suggested muscle: 半膜肌 (agonist)
-- Suggested muscle: 半腱肌 (agonist)
-- Suggested muscle: 竖脊肌 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 多裂肌 (stabilizer)
-- Suggested muscle: 股四头肌 (antagonist)
-- Suggested muscle: 髂腰肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('俯卧两头起', 'core', 'bodyweight', 'intermediate', NULL, '1. 准备姿势：俯卧在垫子上，双臂伸直放在身体两侧，手掌向下或交叉放在胸前，保持头部自然中立。\n2. 激活核心：深吸气，收紧腹肌和下背肌肉，保持脊柱中立，准备开始动作。\n3. 同时抬起上下两端：呼气时，用背部（竖脊肌）和臀部肌肉的力量，同时将上半身（肩部至胸部）和下半身（双腿）抬离地面，动作类似“超人”。四肢保持自然伸展，避免过度弯曲手肘或膝盖。\n4. 达到最高点：在上半身和双腿抬至最高点时，保持1-2秒，感受下背部和臀部的收缩。肩膀不要耸肩，保持肩胛骨轻微后收。\n5. 缓慢放下：吸气时，缓慢而有控制地把上半身和双腿放回垫子，避免骤然下落，以防止腰椎受伤。\n6. 重复动作：完成设定的次数或时间，如8-12次/组，保持呼吸节奏一致。', '1. 若在动作过程中出现腰部疼痛或不适，应立即停止并休息。\n2. 抬起时不要过度伸展下背，以免对腰椎产生过大压力。\n3. 初学者可将双手放在胸前或使用垫子支撑上身，降低动作难度。', '1. 只抬起双腿而忽略上半身，导致下背部过度负荷。\n2. 动作时耸肩或用力过猛，使颈部紧张。\n3. 速度过快，缺少控制，容易导致腰肌拉伤。', '1. 如感腰部不适，可改为单侧抬起（单手+单腿）以降低负荷。
2. 高级者可手持哑铃或脚踝加重，增加力量挑战。
3. 初学者可在胸部下方放置卷起的毛巾或使用健身球辅助，提高动作稳定性。', 'compound', '{"单侧俯卧两头起":"转换为单手单腿抬起，以提升单侧核心控制和平衡感。","瑞士球俯卧两头起":"在瑞士球上进行动作，增加不稳定性，深层核心肌群参与度更高。","负重俯卧两头起":"手持哑铃或脚踝加重，提升背部与臀部力量负荷，适合力量训练阶段。","俯卧两头起+交叉臂":"双臂交叉于胸前抬起，限制手臂助力，更强调背部与臀部发力。"}', 'published', NOW(3), NOW(3));
SET @eid_60 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌（Erector Spinae） (agonist)
-- Suggested muscle: 臀大肌（Gluteus Maximus） (agonist)
-- Suggested muscle: 腘绳肌（Hamstrings） (synergist)
-- Suggested muscle: 背阔肌（Latissimus Dorsi） (synergist)
-- Suggested muscle: 腹直肌（Rectus Abdominis） (stabilizer)
-- Suggested muscle: 外斜肌（External Obliques） (stabilizer)
-- Suggested muscle: 腰方肌（Quadratus Lumborum） (stabilizer)
-- Suggested muscle: 斜方肌（Trapezius） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('罗马椅背伸', 'core', 'other', 'intermediate', NULL, '1. 调整罗马椅凳垫高度，使其位于髋关节位置。双脚稳固地踩在地面上或踏板上，间距与肩同宽。\n2. 将身体正面朝下趴在罗马椅上，确保髋关节正好位于凳子边缘。双腿伸直，膝盖可微弯。双手可以交叉放在胸前或置于耳后。\n3. 保持身体挺直成一条直线，核心收紧，然后缓慢地向下弯曲上半身，直到上半身与地面接近平行。\n4. 在底部位置稍作停顿，感受下背部和腿后侧的拉伸。\n5. 通过收缩背部肌肉和臀部发力，将上半身向上抬起回到起始位置。\n6. 在动作顶端时用力收紧竖脊肌和臀大肌，然后重复动作。', '1. 动作过程中保持缓慢可控的速度，避免利用惯性快速弹起，以防下背部受伤。\n2. 如果在练习过程中感到下背部疼痛，应立即停止动作并检查姿势是否正确。\n3. 确保髋关节始终固定在凳子边缘，避免在动作过程中发生身体滑动。', '1. 过度弯曲脊柱：下弯幅度过大导致腰椎过度弯曲，造成腰椎间盘压力过大。\n2. 动作速度过快：没有控制地快速上下移动，容易产生惯性并失去对脊柱的控制。\n3. 颈部前伸：在动作过程中头部过度抬起或前伸，增加颈椎压力。', '1. 可以通过调整脚的位置来改变动作难度，脚向前站难度增加，向后站难度减小。
2. 手臂位置也会影响难度：放在耳后难度最大，交叉胸前中等，放在身体两侧难度最小。
3. 初学者建议先从徒手练习开始，待动作熟练后再考虑负重。', 'isolation', '{"变体类型":"可以通过以下方式变体：\n- 负重背伸：在胸前或背后持有哑铃或杠铃片增加阻力\n- 单腿背伸：单脚支撑进行练习，增加核心稳定挑战\n- 巴西背伸：臀部更大幅度地向上抬起，强调臀大肌收缩\n- 器械辅助背伸：使用专门的背伸器械进行更稳定的训练"}', 'published', NOW(3), NOW(3));
SET @eid_61 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 腹内外斜肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃背伸', 'core', 'dumbbell', 'intermediate', NULL, '1. 起始姿势：站立，双脚与肩同宽，双手各持一只哑铃，哑铃自然垂于身体两侧，膝盖微屈，保持背部挺直。\n2. 身体前倾：臀部向后推，躯干向前倾斜约45度，保持核心收紧，背部平直，眼睛看向地面，避免弯腰。\n3. 动作执行：保持手臂伸直或微屈，将哑铃向身体后方抬起，直至手臂与躯干呈一条直线或略高于背部，感受背部及臀部的收缩。\n4. 顶峰收缩：在最高点稍作停顿，感受到竖脊肌和臀大肌的强烈收缩，然后控制力量缓慢返回起始姿势。\n5. 重复：按设定的次数重复动作，保持呼吸配合——下降时吸气，上升时呼气。\n6. 完成：训练结束后将哑铃平稳放回地面或置于架上，进行适当的伸展放松。', '确保脊柱保持自然弧度，避免过度弓背导致腰椎受伤。,选用适当的哑铃重量，避免使用过重导致动作失控。,若感到背部或腰部疼痛，应立即停止并咨询专业人士。', '弯腰驼背，导致腰椎压力增大。,使用过大的重量导致动作幅度不足，变成甩哑铃。,呼吸不规律或憋气，导致血压升高。', '初学者可先徒手或使用较轻哑铃练习，逐步增加负荷；如背部柔韧性不足，可适度降低前倾角度，保持背部平直即可；通过调节脚距、膝盖弯曲角度或使用固定把手来改变受力部位。', 'compound', '{"徒手背伸":"将哑铃换成徒手，保持躯干伸展角度不变，注意核心收紧。","杠铃背伸":"将哑铃换成杠铃，重量分配在背部中间，保持脊柱中立。","机器背伸":"使用背伸机时，调低座椅高度，使背部在运动范围内完全伸展。","单臂哑铃背伸":"单手持哑铃进行背伸，可加强核心抗旋，适合高级训练者。"}', 'published', NOW(3), NOW(3));
SET @eid_62 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腿后肌群（腘绳肌） (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('背伸展器', 'core', 'machine', 'beginner', NULL, '1. 首先调整背伸展器机器的垫板高度，使其与您的髋关节齐平，仰面躺在俯卧垫上，确保身体从肩膀到脚踝都能得到支撑。\n2. 调整垫块位置，使其正好位于您下背部的位置，然后将双脚固定在后面的滚轮下方，保持双腿伸直或略微弯曲。\n3. 双手可以握住机器两侧的把手以保持稳定，深吸一口气后准备开始动作。\n4. 保持核心收紧，以髋关节为轴心，缓慢地将上半身向下弯曲，确保下背部保持中立位置，直到感觉到下背部有轻微拉伸感。\n5. 在最低点停顿一秒钟，然后利用下背部肌肉的力量将上半身缓缓抬起，回到初始位置，避免使用惯性或快速弹起。\n6. 完成所有重复次数后，缓慢地将身体放回起始位置，再从机器上起身。', '1. 确保垫块位置正确且牢固固定，避免在训练过程中滑落或移位导致受伤。\n2. 整个动作过程中保持核心稳定，避免过度弓背或塌腰，始终维持脊柱的中立位置。\n3. 如果感到下背部疼痛或不适，应立即停止动作并咨询专业教练或医疗人员。', '1. 动作幅度过大，导致下背部过度弯曲产生压力；应控制在下背部保持中立的位置即可。\n2. 使用过大的负重或过快的速度，依赖惯性完成动作，这样会降低训练效果并增加受伤风险。\n3. 忽略热身直接进行训练，或者在动作过程中屏住呼吸，这些都可能导致肌肉拉伤。', '1. 身体位置调整：将垫板高度调整至髋关节水平位置，确保在动作过程中舒适且能有效发力。
2. 负重调整：初学者应从轻重量或无负重开始，逐步增加负荷以找到适合自己的训练强度。
3. 动作幅度调整：如果下背部活动度受限，可以适当减小动作幅度，避免强行拉伸造成损伤。
4. 握持方式调整：如果感到手臂疲劳，可以将手放在胸前方或使用机器的手柄来分担压力。
5. 脚部支撑调整：如果脚踝有伤，可以将脚尖轻轻着地而不是用力踩住滚轮。', 'isolation', '{"徒手训练":"可以转换为罗马椅俯卧背伸展或地面俯卧抬上半身动作，同样能有效锻炼下背部肌肉，无需器材即可完成。","绳索训练":"可以将背伸展器替换为面朝下跪姿绳索拉背动作，通过绳索的张力提供抗阻力进行训练。","杠铃训练":"可以替换为硬拉或超伸展动作，但需要更强的核心控制能力和技术，建议在掌握机器动作后尝试。"}', 'published', NOW(3), NOW(3));
SET @eid_63 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 多裂肌 (synergist)
-- Suggested muscle: 腹直肌 (antagonist)
-- Suggested muscle: 腹斜肌 (antagonist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 腘绳肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('俯卧健身球背伸', 'core', 'other', 'intermediate', NULL, '1. 跪在健身球旁边，将球滚到身体下方，使球位于腹部位置，然后趴在球上，让球支撑你的腹部，双脚分开与肩同宽，脚尖撑地，双手交叉放在胸前或轻触耳侧。\n2. 收紧核心、臀部和背部肌肉，双脚用力蹬地，同时将身体从球上抬起，使身体从头到脚呈一条直线。\n3. 在最高点位置收紧臀部，感受下背部肌肉的收缩，保持这个姿势1-2秒。\n4. 缓慢控制身体下降，让腹部重新贴回健身球上，回到起始位置。\n5. 重复进行动作，建议进行8-12次，2-3组。', '1. 确保脚尖支撑稳固，如果感觉不稳定，可以靠墙或由伙伴辅助保护。\n2. 动作过程中保持呼吸顺畅，避免憋气，下降时吸气，抬起时呼气。\n3. 如果感到腰部不适或疼痛，应立即停止动作并降低难度。', '1. 臀部抬得过高导致下背部过度伸展（拱背），应始终保持身体从头到脚呈一条直线。\n2. 依靠惯性快速完成动作，而不是控制性地收缩肌肉，降低了训练效果。\n3. 手部用力拉扯头部或颈部，增加了颈椎压力，应该让颈部保持自然中立的放松状态。', '初学者可以先从较小的动作幅度开始，逐步掌握平衡后再增加抬起高度；如果想增加难度，可以在最高点保持更长时间（3-5秒），或单腿抬起进行训练；也可以双手持重物（如哑铃）放在胸前增加阻力。', 'compound', '{"退阶":"可以在平板支撑姿势下练习核心稳定性，或在地面上进行俯卧撑起上身的背伸动作","进阶":"可以在最高点做轻微的左右旋转，或在胸前负重进行训练","替代动作":"趴在长凳上进行背伸训练，或使用罗马椅进行背伸训练"}', 'published', NOW(3), NOW(3));
SET @eid_64 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 半腱肌 (synergist)
-- Suggested muscle: 半膜肌 (synergist)
-- Suggested muscle: 多裂肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 腹直肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('半跪姿背伸', 'core', 'dumbbell', 'intermediate', NULL, '1. 起始姿势：单膝跪地呈半跪姿，同侧手撑地，另一侧腿支撑站立，双手握住哑铃置于胸前，核心收紧保持躯干稳定。2. 身体前倾：吸气同时通过髋关节铰链向前俯身，保持背部平直，哑铃随身体自然下移，保持手臂伸直。3. 动作控制：继续前倾至躯干接近与地面平行，或个人舒适的最大幅度，保持背部挺直，避免弯腰。4. 顶峰收缩：在最低点稍作停顿，感受下背部肌肉的拉伸和收缩。5. 返回起始：呼气通过髋部发力将身体拉回起始位置，保持背部平直，控制速度不要利用惯性。6. 重复动作：按计划次数完成一侧后，换另一侧腿跪地进行相同练习。', '1. 始终保持脊柱中立位，避免在动作过程中出现圆背或过度弓腰，以免造成下背部损伤。2. 选择合适重量的哑铃，确保能够控制动作全程，避免因重量过大导致代偿或失去平衡。3. 保持核心全程收紧以保护脊柱，动作过程中保持稳定支撑，避免膝盖晃动或扭转。', '1. 弯腰驼背：未能保持背部平直，在俯身过程中脊柱过度弯曲，增加下背部受伤风险。2. 使用惯性：动作速度过快，依赖惯性完成动作而非肌肉主动发力，降低训练效果。3. 重心不稳：膝盖跪地位置不当或核心未收紧导致身体左右摇晃，影响动作质量和安全性。', '1. 初学者可先徒手练习掌握动作模式，再逐步增加哑铃重量。2. 如膝盖不适，可在膝盖下方放置软垫或瑜伽垫提高舒适度。3. 可通过降低动作幅度来保持良好姿势，随着核心力量提升逐渐增加幅度。4. 平衡感较弱者可以背靠墙进行练习以获得额外支撑。', 'compound', '{"难度降低":"可改为站姿俯身背伸，减少平衡难度","难度提升":"可采用负重背包或增加哑铃重量，或在高位单膝跪地进行练习","动作变化":"可转变为单臂背伸，增加核心抗旋转训练"}', 'published', NOW(3), NOW(3));
SET @eid_65 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腹直肌 (antagonist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (stabilizer)
-- Suggested muscle: 股四头肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('俯卧腿臂伸展', 'core', 'bodyweight', 'intermediate', NULL, '1. 从高位俯卧撑姿势开始，双手撑地，肩关节在手腕正上方，双脚与肩同宽，身体从头到脚跟呈一条直线，收紧腹部和臀部。\n2. 保持身体稳定，核心紧绷，避免臀部塌陷或拱起。\n3. 吸气的同时，将右腿向后抬起伸展，同时将对侧的左臂向前伸展，手臂与地面保持平行。\n4. 保持身体稳定，感受核心肌群的持续发力，维持2-3秒。\n5. 呼气，有控制地将伸展的腿和手臂慢慢收回，回到初始俯卧撑姿势。\n6. 换另一侧（左腿+右臂）重复，过程中保持核心稳定和身体平直，两侧交替进行。', '始终保持核心收紧，避免下背部塌陷（骨盆前倾）或过度拱腰，保持脊柱中立位置。,颈部保持自然中立体位，眼睛看向地面约30厘米处，避免抬头或低头造成颈椎压力。,如果感到腰部不适或无法保持身体稳定，应降低难度或先加强基础核心力量。,每个伸展动作控制在舒适范围内，不要过度追求伸展幅度而牺牲姿势稳定性。', '髋部向抬起腿的一侧下沉或旋转，导致身体失去水平对齐，增加下背部压力。,动作速度过快，缺乏核心控制，导致身体晃动不稳，无法有效锻炼核心稳定性。,下背部过度塌陷或拱起（骨盆后倾），失去核心激活，增加腰椎受伤风险。,耸肩或过度张开肩胛骨，导致肩部不稳定，无法有效传递力量。', '[object Object]', 'compound', '{"降低难度":"改为四点跪姿（双手双膝着地）进行交替腿臂伸展，减少核心稳定需求；或只做单侧伸展，如只伸展手臂，腿保持撑地。","增加难度":"尝试同时伸展对侧的手和腿，并保持身体稳定；或每侧重复3-5次后再换边，增加肌肉耐力需求；也可尝试在伸展位置进行小幅度画圈动作。","变体方向":"可转换为登山者动作（保持高位俯卧撑同时交替提膝靠近胸部），或俯卧T/Y/I字形伸展（在俯卧位抬起手臂和腿形成字母形状），增强核心和肩部协同控制。","器材辅助":"使用瑜伽垫提供更舒适的手部支撑；可借助TRX悬挂训练系统，将双脚挂在TRX绳索中进行训练。","功能性提升":"在俯卧位稳定状态下进行四肢交替伸展，模拟日常活动中需要核心稳定的身体控制，为运动表现和日常生活动作打下基础。"}', 'published', NOW(3), NOW(3));
SET @eid_66 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 多裂肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (synergist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 三角肌（前束） (synergist)
-- Suggested muscle: 背阔肌 (synergist)
-- Suggested muscle: 胸大肌 (antagonist)
-- Suggested muscle: 腘绳肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('平板支撑保持', 'core', 'bodyweight', 'beginner', NULL, '1. 俯卧姿势，双手张开约与肩同宽，手指向前，手肘微弯，手掌撑地。\n2. 将脚尖抵地，脚跟向上抬起，收紧腹肌、臀部和大腿，使身体从头到脚呈一条直线。\n3. 目光自然向下看，保持颈部自然位置，避免抬头或低头。\n4. 维持姿势，呼吸保持均匀，胸部轻微上提，避免塌腰或拱背。\n5. 保持30秒至1分钟（根据个人能力），随后缓慢放下身体回到地面。\n6. 若需要进阶，可在保持平板支撑的基础上，交替抬起单臂或单腿，保持躯干不转动。', '1. 支撑时保持脊柱中立，避免腰部下沉或过度弓背，以防止下背压力过大。\n2. 若有肩部或手腕不适，可改为肘撑或使用软垫支撑。\n3. 在进行高强度持续时，建议有人在旁监督，防止因体力不支导致失衡跌倒。', '1. 腰部塌陷（臀部过低）导致腰椎过度伸展，产生下背疼痛。\n2. 头部过度抬起或低垂，使颈部承受额外压力。\n3. 手肘外翻或内收，导致肩部不适或力量分散。', '初学者可将平板支撑时间设为15-20秒，逐步延长。老年人或孕妇可改用膝撑平板支撑，降低负荷。肩部不适者可使用前臂支撑（肘撑）来减轻手腕压力。', 'compound', '{"肘撑平板支撑":"如果标准平板支撑对肩部压力过大，可改为肘撑姿势，减小上肢参与，集中激活核心。","侧平板支撑":"想更多激活腹斜肌，可转换为侧平板支撑，保持身体侧向直线。","单臂/单腿平板支撑":"提升核心抗旋转能力，可在保持平板支撑的基础上交替抬臂或抬腿，确保躯干不扭转。","膝撑平板支撑":"对腰部或手腕有疼痛时，可先采用膝撑姿势，减轻负荷后再逐步过渡到全平板支撑。"}', 'published', NOW(3), NOW(3));
SET @eid_67 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 胸大肌（前锯肌） (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 腘绳肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('战绳核心训练', 'core', 'other', 'advanced', NULL, '1. 准备姿势：双脚与肩同宽，膝盖微屈，保持核心紧绷，双手握住战绳的末端，手臂伸直置于身体两侧。\n2. 起势：用力向下甩动战绳，使绳在胸前产生大幅波动。此时主要依靠腹部收缩提供动力，而不是单纯的手臂力量。\n3. 维持节律：在绳波的高峰时快速收回手臂，同时继续利用核心力量控制身体的上下起伏，保持动作连贯。\n4. 持续训练：保持30‑45秒的高强度输出，注意呼吸节奏，吸气在低位，呼气在甩绳的高峰。\n5. 结束动作：完成目标时间后，慢慢减速，双手将战绳平稳放回地面，防止突然拉伤。', '• 保持脊柱中立，避免过度弯腰或拱背，以免造成下背伤害。\n• 握绳时手腕保持自然角度，避免过度用力导致腕部扭伤。\n• 初学者或肩关节不适者应在教练指导下进行，防止肩袖肌群过度负荷。', '• 只用手臂甩绳，忽视核心驱动，导致效果不佳且易伤肩。\n• 动作幅度过小或节奏不稳，波动不够大，核心刺激不足。\n• 呼吸不当，屏气或呼吸紊乱，影响力量输出和血液循环。', '初学者可以先从低强度、短时间（15‑20秒）开始，逐步增加持续时间；中高级练习者可加入交替波浪、侧身摆动或单手冲击等变体，以提升核心负荷；如果肩关节受限，可将绳索固定在稍高的支架上，减少肩部负担。', 'compound', '{"变体类型":"可转换为战绳交替波浪、战绳双侧冲击、战绳侧身摆动等，以针对不同方向的核心发力或提升动作难度。"}', 'published', NOW(3), NOW(3));
SET @eid_70 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 背阔肌 (synergist)
-- Suggested muscle: 胸大肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (stabilizer)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 股四头肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('TRX核心训练', 'core', 'other', 'advanced', NULL, '1. 调整TRX悬挂带至适当长度，双手握住把手，手臂完全伸直，身体向后倾斜形成一条直线，脚尖着地支撑。\n2. 收紧腹部和臀部肌肉，使身体保持刚性平板姿势，头部、肩膀、臀部和脚跟成一直线。\n3. 保持上半身稳定，将双腿同时抬起，膝盖向胸部方向卷起，尽量让膝盖靠近胸部。\n4. 在动作顶端收紧腹肌，感受核心肌肉的充分收缩，保持短暂停顿。\n5. 缓慢而有控制地将双腿放回起始位置，回到初始的支撑姿势。\n6. 重复进行指定的次数，保持呼吸节奏和身体稳定。', '1. 确保TRX悬挂带安装牢固且能够承受体重，使用前检查设备安全性。\n2. 整个动作过程中保持核心收紧，避免腰部下塌形成弓背姿势。\n3. 如有腰部或肩部不适，应立即停止并咨询专业人士。', '1. 臀部下降过多或塌腰，这会增加腰椎压力。\n2. 耸肩或头部前倾，导致上斜方肌过度参与。\n3. 动作速度过快，缺乏对核心的控制，无法有效锻炼目标肌群。', '初学者可以先从简单的TRX平板支撑开始练习，待核心稳定性提高后再尝试完整的卷腹动作。可通过调整身体倾斜角度来改变难度，倾斜角度越大难度越高。也可以通过改变腿部动作幅度或弯曲膝盖来调整难度。', 'compound', '{"降低难度":"弯曲膝盖进行膝卷腹，或减小身体倾斜角度","增加难度":"在动作顶端保持更长时间，或进行交替膝盖卷腹","变化形式":"侧向卷腹（转体）、双腿伸直卷腹"}', 'published', NOW(3), NOW(3));
SET @eid_71 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹斜肌 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 胸大肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('旋转药球传递', 'core', 'other', 'intermediate', NULL, '1. 站立于地面，双脚与肩同宽，双手持药球于胸前，保持核心紧绷；2. 重心略微下移，将身体重心转移至右腿，同时向右转体约90度；3. 继续旋转惯性，将药球由胸前向右侧斜下方甩动，利用躯干旋转力量将球传出；4. 药球离手后，迅速将身体重心转移至左腿，向左转体；5. 顺势接住弹回的药球或使用另一药球；6. 保持动作连贯流畅，重复进行规定次数后换方向。', '确保训练区域周围有足够空间，药球飞行路线上无障碍物；进行动作前应充分热身，特别是核心和肩部区域，避免扭伤；初学者应从较轻的药球开始练习，待动作熟练后再逐步增加重量。', '只用手臂力量投掷药球，忽略了躯干旋转的力矩传递；动作过程中背部保持挺直或过度前倾，导致脊柱承受不当压力；动作速度过快导致失去核心稳定性和动作控制力。', '初学者可将药球放于胸前进行胸前传递，减小动作难度；如场地受限，可靠墙进行药球对墙传递练习；可调整药球重量来控制训练强度，重球侧重力量，轻球侧重速度和爆发力。', 'compound', '{"单侧旋转":"可分解为左右两侧单独练习，每侧完成规定次数后再换边","对称式传递":"改为双手同时向两侧传出药球，增强核心两侧均衡发展","站姿到跪姿":"降低难度可采用单膝或双膝跪地姿势进行，减弱惯性影响"}', 'published', NOW(3), NOW(3));
SET @eid_73 = LAST_INSERT_ID();
-- Suggested muscle: 腹外斜肌 (agonist)
-- Suggested muscle: 腹内斜肌 (agonist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('失衡训练', 'core', 'other', 'intermediate', NULL, '1. 站在平衡垫、BOSU球或平衡板上，双脚与肩同宽，保持身体平衡\n2. 收紧核心肌群，收腹并保持脊柱处于中立位置\n3. 屈髋屈膝下蹲，保持膝盖与脚尖方向一致，膝盖不超过脚尖\n4. 双手可向前平举或交叉置于胸前，帮助维持平衡\n5. 在最低点保持1-2秒，感受核心肌群的持续收缩\n6. 通过脚掌发力站起回到起始姿势，重复进行', '确保训练区域周围有足够的保护空间，避免在窄小或有障碍物的区域进行训练,选择与自身平衡能力相匹配的不稳定平面，初学者建议使用较宽的支撑面,如果感到头晕或失去平衡，应立即停止训练，避免摔倒受伤', '身体过度晃动或摇摆，未能保持核心稳定控制,过度依赖手臂支撑来维持平衡，而忽视了核心肌群的主动参与,下蹲时腰部过度前倾或拱背，导致脊柱位置不正确,动作速度过快，在不稳定平面上失去对身体的控制', '初学者可从使用较大较稳定的平衡垫开始，采用宽站距降低难度；中级者可尝试在BOSU球上完成动作，增加不稳定程度；进阶者可在平衡板上进行单腿深蹲或闭眼训练，进一步挑战平衡能力。可根据需要调整支撑面的硬度和大小来调节难度。', 'compound', '{"初级变体":"使用平面平衡垫进行双脚站立平衡训练，逐渐适应不稳定平面","中级变体":"在BOSU球或充气平衡板上进行深蹲、弓步等复合动作","高级变体":"在不稳定平面上进行单腿深蹲、单腿硬拉或动态俯卧撑等更具挑战性的动作"}', 'published', NOW(3), NOW(3));
SET @eid_74 = LAST_INSERT_ID();
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 腹内外斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀中肌 (synergist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 腘绳肌 (stabilizer)
-- Suggested muscle: 小腿肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('核心循环训练', 'core', 'bodyweight', 'intermediate', NULL, '1. 从高位平板支撑姿势开始，双手撑地与肩同宽，双脚并拢，脚尖着地，身体从头到脚呈一条直线。2. 保持核心紧绷，将右膝提向胸部，同时左手肘向右膝方向靠近，动作过程中保持身体稳定。3. 回到平板支撑姿势，然后换侧进行，左膝提向胸部，右手肘向左膝方向靠近。4. 恢复到平板支撑后，臀部向上推起呈倒V字形（下降plank），感受核心和腿后侧的拉伸。5. 回到平板支撑姿势，进行另一侧的膝碰肘动作，然后再次进入下降plank。6. 如此交替进行，完成8-12次完整的循环动作。', '保持脊柱中立位，避免腰部塌陷或过度弓起；核心训练应在能力范围内进行，出现腰部疼痛应立即停止；训练前确保热身充足，特别是肩部和髋部的灵活性。', '动作速度过快导致姿势变形，无法有效激活核心肌群；臀部起伏过大或塌腰，使腰椎承受不必要的压力；呼吸不规律，常在发力时屏气。', '初学者可将动作分解为单一动作练习，逐步建立核心稳定性后再进行循环；进阶者可在动作底部加入短暂的等长收缩或增加动态变体；如有手腕不适可改为前臂支撑。', 'compound', '{"降低难度":"改为四足跪姿，简化膝碰肘动作，减少循环次数","增加难度":"加入登山者或Burpee元素，缩短休息时间或增加循环轮次","变体动作":"可替换为平板支撑侧转体、俄罗斯转体或船式等不同核心动作组合"}', 'published', NOW(3), NOW(3));
SET @eid_75 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (synergist)
-- Suggested muscle: 多裂肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('药球俄挺', 'core', 'other', 'advanced', NULL, '1. 准备阶段：选择适当重量的药球（建议2-4公斤），将其放在地面中央，确保训练区域周围无障碍物。\n2. 起始姿势：双手撑地，手指朝前，位于药球两侧，身体呈高位平板支撑姿势，双脚并拢，脚尖着地，核心收紧，身体从头到脚呈一条直线。\n3. 向前滚动：保持身体稳定的前提下，通过移动双手和滚动药球，逐渐将身体重心向前移动，使双手承受更多体重，尝试进入类似俄挺的支撑姿态。\n4. 保持姿势：在前移的最高点保持2-3秒，保持身体平直，肩部、核心和髋部保持紧绷，感受核心肌群的持续发力。\n5. 回滚控制：缓慢将药球滚回起始位置，双手跟随药球移动，保持控制不要让药球突然滚回。\n6. 重复练习：重复上述动作，根据个人能力进行8-12次或指定的重复次数。', '训练前确保地面干燥防滑，避免在光滑地面上进行导致摔倒受伤；\n建议在专业教练指导下尝试该动作，新手应从基础核心训练逐步进阶；\n如果出现肩部或手腕不适，应立即停止并咨询专业人士。', '核心松懈导致臀部塌陷或抬起，无法保持身体平直的稳定姿态；\n药球滚动幅度过大超出能力范围，导致失去控制或姿势崩溃；\n肩部过度外展或前倾，增加肩关节压力而引发损伤。', '初学者可以先在不滚药球的情况下练习高位平板支撑和前倾支撑；
降低难度可使用较大直径的药球减少滚动距离，或减少前倾幅度；
进阶者可以增加药球重量、加大前倾角度或延长保持时间来增加挑战；
如肩部有伤可降低前倾角度或改为静态支撑练习。', 'compound', '{"降阶变体":"使用较大药球或减少滚动距离，重点建立核心稳定性和肩部承受能力","进阶变体":"使用更重药球、增加滚动幅度或单手支撑药球俄挺","替代动作":"标准俄挺训练、平板支撑、前倾俯卧撑、药球推滚"}', 'published', NOW(3), NOW(3));
SET @eid_76 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 前锯肌 (synergist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 胸大肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (stabilizer)
-- Suggested muscle: 背阔肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('吊环核心', 'core', 'bodyweight', 'advanced', NULL, '1. 双手握住吊环，双臂伸直，身体保持笔直，从头到脚呈一条直线，采用俯卧撑的起始姿势。\n2. 核心肌群收紧，保持身体稳定，然后慢慢将吊环向身体两侧滚动。\n3. 继续将吊环向身体中线方向滚动，同时保持手臂伸直，让身体逐渐靠近地面。\n4. 在动作最低点稍作停顿，感受核心肌群的强烈收缩。\n5. 通过收缩核心肌群和控制吊环，慢慢将身体推回起始姿势，重复动作。', '1. 确保吊环安装牢固，承重能力足够，使用前检查吊环和悬挂装置的安全性。\n2. 初学者建议在专业教练指导下练习，避免动作失控导致手腕或肩部受伤。\n3. 如果肩部或核心有伤，请咨询医生或物理治疗师后再进行训练。', '1. 臀部抬得过高或过低，导致身体无法保持笔直，增加下背部压力。\n2. 肩部前倾或后缩，导致肩部不适或降低动作效果。\n3. 动作速度过快，缺乏控制，影响训练效果并增加受伤风险。', '初学者可以从较短的动作幅度开始，逐渐增加滚动距离。也可以先通过固定杆或墙边练习基础动作，待力量和控制能力提升后再进行完整的吊环核心训练。降低难度还可以通过缩短滚动距离或使用弹力带辅助。', 'compound', '{"降低难度":"使用弹力带辅助或减少滚动距离，从半程动作开始练习","增加难度":"增加滚动幅度，尝试单臂完成动作或增加停顿时间"}', 'published', NOW(3), NOW(3));
SET @eid_77 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 胸大肌 (synergist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 肱三头肌 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧腹肌组合', 'core', 'bodyweight', 'intermediate', NULL, '1. 平躺在瑜伽垫上，双腿伸直，双手置于身体两侧或轻放在耳后，保持下背部贴紧地面。\n2. 吸气准备，收紧核心肌肉群，将双腿抬高至约45度角，同时将头部和肩部轻微抬离地面。\n3. 保持双腿姿势，利用核心力量将双腿向上半身方向移动，同时卷腹使肩胛骨离开地面。\n4. 达到最高点时，短暂收紧腹部，然后反向控制着将上半身和双腿缓慢回落。\n5. 在双腿下放的同时，上半身保持悬空或继续贴地，然后再次抬起进行下一次动作。\n6. 完成一组次数后，缓慢将双腿和上半身放回起始位置，保持均匀呼吸。', '1. 确保下背部始终贴合地面，避免腰部过度拱起造成腰椎压力。\n2. 动作过程中保持颈部自然位置，不要用手过度拉扯头部。\n3. 初学者应控制动作幅度和速度，避免快速弹震式运动造成肌肉拉伤。', '1. 使用惯性甩动双腿，而非通过核心力量控制动作，导致训练效果降低且增加受伤风险。\n2. 下背部离地形成拱背姿势，使腰椎承受过大压力，长期可能导致腰背疼痛。\n3. 呼吸节奏紊乱，憋气发力会增加腹内压，正确做法应在发力时呼气，还原时吸气。', '初学者可将双腿放低至约30度角进行练习，或仅进行上半身的卷腹动作；进阶者可在动作最高点时保持1-2秒加强收缩，或在双脚即将触地时停下进行快速反向卷腹。高难度变体包括在动作过程中保持双腿始终悬空不触地。', 'compound', '{"退阶变体":"可简化为仅做上半身卷腹配合双腿固定，或降低双腿抬起角度。","进阶变体":"可加入双手持轻量哑铃增加负重，或在动作顶端进行左右转体加强斜腹肌训练。","替代动作":"如需替代，可选择悬垂举腿、平板支撑变体或仰卧蹬车等核心训练动作。"}', 'published', NOW(3), NOW(3));
SET @eid_78 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 股直肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 髋屈肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('悬垂举腿转体', 'core', 'bodyweight', 'advanced', NULL, '1. 站于单杠或吊环下方，双手握住横杠（掌心朝前），握距略宽于肩宽，身体自然悬垂，双臂伸直，肩胛骨轻微下沉收紧，准备好启动核心。\n2. 深吸一口气，收紧腹肌与髂腰肌，屈膝或直腿（依据个人能力）将双腿向上抬起，同时保持上半身挺直。\n3. 当双腿抬至约与地面平行的位置时，开始向一侧转动躯干，将膝盖向相反方向的对侧肘部靠拢，完成转体动作。\n4. 在最高点稍作停顿，感受腹部和斜肌的持续张力，然后控制速度把双腿放回起始位置，同时躯干回到中立位。\n5. 如采用交替方式，重复第3、4步的转体方向，换到另一侧完成一次完整的动作。', '动作全程保持肩部、背部和核心的收紧，避免出现大幅摆荡或利用惯性完成动作，以防肩关节或腰椎受伤。,如果有肩部或腰椎既往伤病，建议在专业教练指导下进行，或先使用弹力带、辅助器械减轻负荷。,每次训练前进行5-10分钟的热身，特别是肩部、背部及髋屈肌的动态拉伸，以提升血液循环并降低受伤风险。', '使用惯性或大幅摆荡抬腿，导致动作质量下降并增加受伤风险。,转体时只转动下肢而忽视躯干的旋转，使得腹斜肌未能充分参与发力。,在抬腿过程中出现腰部过度弓背或塌腰，使腰椎承受不必要的压力。', '如力量不足，可先采用屈膝版本或使用弹力带辅助，以降低难度；如想进一步提升挑战，可在踝部夹持哑铃或穿戴负重背心进行直腿悬垂举腿转体。', 'compound', '{"屈膝版本":"适合初学者，使用较短的摆动幅度，逐步建立核心稳定性后再过渡到直腿版本。","直腿版本":"在具备一定腹肌力量后，可直接采用直腿进行，增加髋屈肌和腹直肌的负荷。","负重变体":"通过踝部夹持哑铃或穿戴负重背心，提升力量训练强度，适合进阶训练者。","使用弹力带辅助":"在单杠上挂弹力带，将脚套入带中，帮助完成抬腿，适用于康复或新手。"}', 'published', NOW(3), NOW(3));
SET @eid_79 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 胸大肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('药球卷腹传递', 'core', 'other', 'intermediate', NULL, '1. 起始姿势：平躺在垫子上，双膝弯曲约90度，脚掌全贴地面，双手握住药球置于胸前。\n2. 收紧核心：吸气时收紧腹横肌和腹直肌，保持脊柱自然中立，不要拱背。\n3. 卷腹推出：呼气时利用腹肌力量将上半身卷起，肩胛骨离地约30‑45度，同时将药球向前推出，保持动作连贯、力量来源于腹部而非手臂。\n4. 传递药球：在卷腹最高点将药球交给站在脚侧的伙伴，或自行放回地面，整个过程保持核心紧绷，避免猛拉。\n5. 缓慢回落：吸气时控制速度，慢慢将上半身放回垫子，手臂随身体回到胸前位置，整个过程保持腹部持续发力。\n6. 重复次数：完成设定的次数（建议每组8‑12次）后休息30‑60秒，进行2‑3组。', '1. 保持脊柱自然弧度，避免过度拱背或塌腰，以防止下背部受伤。\n2. 使用适合自身力量的药球重量，防止在推出时因重量过大导致肩关节或手腕扭伤。\n3. 进行练习前确保周围有足够空间，且伙伴在接球时保持稳定，避免碰撞。', '1. 依赖手臂力量推球，导致腹部激活不足，动作变成手臂推举而非核心卷腹。\n2. 动作过快、使用惯性完成卷腹，削弱核心训练效果并增加受伤风险。\n3. 在卷腹时过度弓背或塌腰，导致腰椎压力过大，引起下背部不适。', '1. 初学者可使用较轻的药球或空拳姿势，以专注于腹肌发力；双脚可轻轻抬起以降低难度。
2. 进阶者可双手握住更重的药球，或在卷腹最高点加入左右旋转，将药球斜向传递，以增加斜腹肌参与。
3. 对于腰椎有问题的人群，可改为双脚全脚掌固定在墙面或训练伙伴脚上，降低下背压力。', 'compound', '{"侧向药球卷腹传递":"在卷腹最高点将药球向左或向右递给伙伴，可加强内外斜腹肌的刺激。","双脚固定卷腹":"双脚固定在墙壁或训练伙伴的脚上，提高核心稳定性并减轻下背部压力。","站姿药球卷腹":"站立姿势双手持药球进行扭转卷腹，可作为热身或低强度的核心激活动作。"}', 'published', NOW(3), NOW(3));
SET @eid_80 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜腹肌 (synergist)
-- Suggested muscle: 内斜腹肌 (synergist)
-- Suggested muscle: 髂腰肌（髂肌、腰大肌） (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 横腹肌（腹横肌） (stabilizer)
-- Suggested muscle: 背阔肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('半圆球侧平衡', 'core', 'other', 'advanced', NULL, '1. 将半球球面朝下放置在平稳地面上，确认其稳固不滑动。\n2. 靠近墙壁或准备一把椅子作为辅助支撑，站立在半球旁。\n3. 支撑腿轻轻踏上半球顶部，保持身体直立，目视前方。\n4. 抬起另一条腿至与髋同高的位置，膝盖略微弯曲，保持髋关节中立。\n5. 将双臂向两侧展开或叉腰，集中注意力通过核心收紧来维持身体平衡。\n6. 保持平衡姿势5-10秒，然后缓慢将抬起腿放下，恢复初始站立姿势，换另一侧重复。', '1. 首次练习时必须在墙壁或椅子旁边进行，以便在失去平衡时能够及时扶住。\n2. 脚下半球必须放置在防滑地面上，防止在训练过程中半球滑动导致跌倒。\n3. 如果感到膝盖或下背部不适，应立即停止训练，避免造成运动损伤。', '1. 核心未收紧导致骨盆倾斜或下背部过度弓起。\n2. 支撑腿膝盖过度弯曲，超过脚尖前方，增加膝关节压力。\n3. 视线不稳定或头部转动过快，影响平衡感和身体协调性。\n4. 髋关节不够稳定，导致骨盆向站立腿一侧下降或倾斜。', '初学者可以双手轻扶墙壁或椅子来辅助平衡，逐渐减少辅助力度；熟练后可尝试闭眼进行训练以增强本体感受；进阶可加入上肢动作（如侧平举、画圈等）增加难度，或手持哑铃增加负重。', 'compound', '{"难度降低":"使用较宽的平衡板或 BOSU 球平面朝上练习，降低平衡难度。","难度提高":"尝试半球尖顶朝上（更具挑战性的平衡面），或加入上肢负重和单臂支撑动作。"}', 'published', NOW(3), NOW(3));
SET @eid_82 = LAST_INSERT_ID();
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 腹内斜肌 (agonist)
-- Suggested muscle: 臀中肌 (agonist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 竖脊肌 (synergist)
-- Suggested muscle: 髋外展肌群 (stabilizer)
-- Suggested muscle: 踝关节稳定肌群 (stabilizer)
-- Suggested muscle: 腓肠肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('侧卧自行车', 'core', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：侧卧在垫子上，双腿伸直，上侧手臂伸直放在地面或轻扶头部以支撑，保持身体呈一条直线。\n2. 收紧核心，将上侧膝盖向胸部抬起，同时让同侧脚向臀部方向做类似自行车踩踏的动作。\n3. 同时转动躯干，用手肘轻触对侧膝盖，形成交叉的“自行车”动作，感受腹部和侧腰的收缩。\n4. 完成一次后，换另一侧继续动作，保持均匀的呼吸节奏；吸气时准备，呼气时用力收缩。\n5. 交替进行，确保动作流畅且速度适中，避免使用惯性。\n6. 完成所需次数后，缓慢放下双腿，恢复侧卧姿势，放松核心。', '1. 确保在软硬适中的垫子上进行，防止背部或臀部受压。\n2. 保持脊柱中立，避免塌腰或过度扭转导致下背疼痛。\n3. 如有肩部或髋部不适，请先咨询专业教练或适当调整姿势。', '1. 过多依赖腿部力量而非核心发力，导致动作变成单纯的腿部蹬踏，减弱腹部刺激。\n2. 动作速度过快，利用惯性完成动作，降低肌肉收缩效果。\n3. 头部过度前倾或用手支撑下巴，造成颈椎受压。', '1. 初学者可将动作幅度减小，只做膝盖轻微抬起，避免过度扭转。
2. 若想增加难度，可在动作顶部保持几秒收缩，或在膝盖处套上阻力带。
3. 若肩部不适，可将上侧手臂放在胸前或扶在地面上，减轻肩部负担。', 'compound', '{"变体类型":"侧卧自行车 → 仰卧自行车","转换建议":"将动作改为仰卧姿势，保持相同的踏车动作，可更集中刺激腹直肌；若想进一步挑战，可在仰卧时将双腿抬高或加入交叉踏步。"}', 'published', NOW(3), NOW(3));
SET @eid_83 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 髂腰肌（髂肌+腰大肌） (synergist)
-- Suggested muscle: 股直肌 (synergist)
-- Suggested muscle: 腰方肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (antagonist)
-- Suggested muscle: 臀中肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧起坐', 'core', 'bodyweight', 'beginner', NULL, '1. 仰卧平躺在垫子上，双膝弯曲，脚掌平放于地面，双手交叉放在胸前或轻触耳侧，保持颈部自然伸展。\n2. 收紧腹部，深吸一口气后在呼气时用力收缩腹直肌，将上背部抬离地面，使肩胛骨离开垫子。\n3. 在动作顶峰（约离地面30-45度）时停顿1-2秒，充分感受腹肌的收缩。\n4. 吸气并缓慢放下上半身回到起始姿势，脊柱逐节接触垫子，避免猛然落下。\n5. 重复动作至目标次数，保持动作节奏平稳，切勿使用惯性。', '1. 始终保持颈部自然伸展，避免用手拉扯颈部，以减轻颈椎压力。\n2. 下背部在动作全程应紧贴垫子，防止过度弓背导致腰部受伤。\n3. 若感到腰部或颈部不适，应立即停止并调整姿势或降低动作幅度。', '1. 使用腿部或髋部的力量抬起上半身，导致髂腰肌过度代偿而腹肌参与不足。\n2. 动作幅度过大或过小，未能全程控制，导致脊柱伸展或压缩不当。\n3. 用手用力按压头部或颈部，导致颈椎受压，产生颈部疼痛。', '如需降低难度，可在双脚下方垫上垫子或把手放在大腿上；如果想增加挑战，可在胸前握持哑铃或将双手放在脑后（注意不拉扯颈部），也可在瑞士球上进行以提升核心不稳性。', 'isolation', '{"侧卧卷腹":"在侧卧姿势下进行，专门刺激侧向腹肌，适合想要加强斜向腹部的练习者。","交叉卷腹":"在完成基本仰卧起坐的同时，将对侧手肘向膝盖方向靠拢，增加斜腹肌的参与。","负重仰卧起坐":"在胸前或背后增加哑铃或杠铃片，以提升腹肌负荷，适用于中级以上训练者。","使用瑞士球":"在健身球上完成仰卧起坐，增加核心不稳性，强化深层腹横肌的稳定功能。"}', 'published', NOW(3), NOW(3));
SET @eid_165 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 脊柱竖肌（竖脊肌） (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('负重卷腹', 'core', 'dumbbell', 'intermediate', NULL, '1. 起始姿势：平躺在训练垫上，膝盖弯曲，双脚平放地面，双手握住哑铃置于胸前或锁骨前方。\n2. 收紧核心（腹肌）并保持颈部自然对齐，避免用力拉扯头部。\n3. 通过腹肌发力，将上背部抬离垫子，仅让肩胛骨离开地面，保持下背部仍贴在垫子上。\n4. 在最高点收紧腹肌，感受腹直肌的收缩，停顿约1-2秒。\n5. 缓慢控制下降，吸气并逐步放松腹肌，重复动作至规定次数。', '使用合适重量的哑铃，避免在动作过程中用力拉颈部；保持动作平稳，切勿使用惯性摆动；如感到腰部不适，应立即停止并降低重量。', '使用过重的哑铃导致背部拱起或颈部过度前倾；动作过快，依赖惯性而不是腹肌发力；在下降时未控制速度，导致背部过度伸展。', '如出现腰部不适，可将双脚抬起放在凳子上或使用健身球来降低下背部的张力；可将哑铃放在胸前改为双手轻握哑铃两侧，以减轻肩部压力。', 'isolation', '{"无负重卷腹":"去掉哑铃，保持原有动作轨迹，适用于初学者或康复阶段。","斜板卷腹":"在倾斜的健身椅上完成，可增加腹肌的负荷并改变角度。","球上卷腹":"在健身球上进行，增强平衡感和核心稳定性。","阻力带卷腹":"使用阻力带替代哑铃，提供可调阻力并减少手部疲劳。"}', 'published', NOW(3), NOW(3));
SET @eid_167 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腰方肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('上斜哑铃卷腹', 'core', 'dumbbell', 'intermediate', NULL, '1. 将上斜凳调至约30-45度，靠背稳固，双脚踩实地面或使用脚垫固定。\n2. 双手握住哑铃（可根据需要选择合适重量），将哑铃靠于胸前或双手交叉置于胸前，保持核心收紧。\n3. 躺在上斜凳上，背部紧贴凳面，膝盖自然弯曲，呼气时用力收缩腹肌，将肩胛骨抬离凳面，胸部向大腿方向卷起。\n4. 在动作最高点保持1-2秒，充分感受腹直肌的挤压，然后吸气，有控制地缓慢放下躯干，回到起始位置。\n5. 重复动作，保持呼吸节奏，避免用力过猛或用颈部落地的力量。\n6. 完成所需次数后，平稳将哑铃放回地面，起身时先坐起再站起，以防头晕。', '1. 确保凳子稳固，地面防滑，避免在动作过程中凳子滑动或倾倒。\n2. 使用适中重量，避免因负重过大导致颈部、腰部受力不当；出现疼痛或不适立即停止。\n3. 整个动作保持核心紧绷，避免用颈部落地的力量抬起上半身，以防止颈椎受伤。', '1. 通过大幅度的摆动或借助惯性抬起上半身，导致动作失去对腹肌的有效刺激。\n2. 抬起时让下背部离开凳面，形成拱背，这会增加腰椎压力并降低核心激活。\n3. 动作进行过快或呼吸不协调，导致腹肌收缩不充分，易出现腹肌痉挛或拉伤。', '1. 若感到下背部过度压迫，可略微降低凳子的倾斜角度或在下背部放置软垫。
2. 对于颈部不适者，可将哑铃改为胸前持握，或使用轻重量甚至仅用手支撑头部。
3. 想增加难度，可在卷腹最高点加入轻微的旋转或抬膝动作；若想降低难度，可改为无负荷的徒手卷腹或使用健身球。', 'isolation', '{"徒手卷腹":"去掉哑铃，保持相同的上斜姿势即可，适合初学者或作为恢复训练。","绳索卷腹":"将绳索固定于低处，双手握把在胸前进行卷腹，提供恒定的阻力并更易控制。","健身球卷腹":"将上斜凳换成健身球，身体姿势类似，但需要更大的核心稳定性，可提升协调性。","站姿哑铃卷腹":"改为站姿，双手握哑铃在胸前，弯腰向下卷腹，适合想要改变姿势增加挑战的情况。"}', 'published', NOW(3), NOW(3));
SET @eid_176 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('跪姿卷腹', 'core', 'bodyweight', 'beginner', NULL, '1. 双膝跪在垫子上，膝盖与肩同宽，脚尖轻触地面，保持身体直立；\n2. 双手交叉放在胸前，或轻触耳侧，保持颈部自然对齐，眼睛看向前方；\n3. 吸气时收紧腹肌，利用腹部的力量将上半身向大腿方向卷起，确保髋部保持不动，只使用腹部发力；\n4. 在卷起的最高点（约离地面30-45度）停顿约1秒，充分感受腹直肌的收缩；\n5. 呼气时慢慢将上半身放回起始姿势，动作控制平稳，避免猛然下落或使用惯性。', '确保地面或垫子稳固，防止膝盖滑倒受伤。,动作过程中保持颈部自然，不要用力牵拉颈部，以免颈椎受伤。,若出现腰部不适或疼痛，应立即停止并咨询专业教练或医生。', '使用惯性或猛拉动作，导致腹肌受力不均。,在卷腹时将髋部抬起，使腰椎过度屈曲，增加下背压力。,动作幅度过大或速度过快，导致肩膀和颈部过度紧张。', '如感下背不适，可在膝盖下方放置软垫或减小卷腹幅度；如果想增加难度，可将手臂交叉胸前、手持哑铃或改做站姿卷腹。', 'isolation', '{"变体类型":"站姿卷腹","转换建议":"保持核心收紧和相同的卷腹轨迹，将膝盖跪姿改为站姿，通过调节身体前倾角度来控制难度，适合进阶或需要更大活动范围的训练者。"}', 'published', NOW(3), NOW(3));
SET @eid_177 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('垂悬单腿举', 'core', 'bodyweight', 'advanced', NULL, '1. 找一个高横杠或悬挂训练架，双手握杠，握距与肩同宽，身体自然悬挂，双脚离开地面，保持核心收紧，肩胛骨下沉。\n2. 将一只腿微微屈膝，膝盖朝向胸部方向抬起，同时保持另一只腿伸直并微微收紧臀部，以维持身体平衡。\n3. 在抬腿的过程中，保持躯干稳定，避免过度前倾或后仰，利用腹肌发力将膝盖继续抬高至接近胸部或略高于的水平。\n4. 到达顶峰位置时，稍作停顿，感受腹部和髂腰肌的收缩，然后缓慢放下腿回到起始位置，控制下降速度避免惯性。\n5. 完成预定的重复次数后换另一只腿重复上述动作，或根据训练计划进行双腿交替训练。\n6. 完成训练后，轻轻松开握杠，让身体自然下降，必要时进行肩部和核心的伸展放松。', '确保悬挂点牢固，握杠前检查横杠是否能够承受体重。,练习时保持核心收紧，避免腰部过度拱起或塌陷，以防止腰椎受伤。,如果在练习中感到肩部、背部或手腕不适，应立即停止并调整姿势或降低难度。', '使用摆动或惯性提升腿部，导致失去核心刺激并增加受伤风险。,膝盖抬得过高导致腰部前倾，增加腰椎压力。,肩膀上抬耸起，导致肩关节受压，产生肩部不适。', '初学者可先做膝盖弯曲的半程举腿，逐渐增加抬腿幅度。,如果肩部柔韧性不足，可使用护肘带或弹性绷带减轻肩部负担。,可在踝部挂轻量哑铃或负重带来提升训练强度，但需确保重量适合自己的承受能力。', 'compound', '{"双腿举":"将单腿换成双腿，降低难度，适合初学者或恢复期。","侧向举腿":"在保持悬挂姿势的同时，将腿向侧面抬起，加强对腹斜肌的刺激。","膝盖卷曲":"先做膝盖卷曲再抬腿，减轻髂腰肌负荷，同时保持核心参与。","负重举腿":"在踝部挂轻量哑铃或负重带，增加阻力以提升挑战强度。"}', 'published', NOW(3), NOW(3));
SET @eid_185 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌 (agonist)
-- Suggested muscle: 外斜腹肌 (synergist)
-- Suggested muscle: 内斜腹肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腰方肌 (stabilizer)
-- Suggested muscle: 阔筋膜张肌 (synergist)
-- Suggested muscle: 臀大肌 (antagonist)
-- Suggested muscle: 背阔肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索举腿', 'core', 'cable', 'intermediate', NULL, '1. 调整滑轮高度至胸部位置，安装绳索手柄或脚环。\n2. 站直或跪在器械前，双手握住手柄或抓住脚环，双脚并拢或单脚踩在脚环上，保持身体直立。\n3. 深吸气，收紧腹肌，将腿向前抬起至与地面平行或略高位置，保持膝盖略弯或伸直，视个人舒适度而定。\n4. 在最高点稍作停顿，感受腹部的收缩，然后控制速度慢慢放下双腿回到起始位置。\n5. 重复完成设定的次数，注意全程保持核心紧绷，避免用力摆动身体。', '保持背部挺直，避免弓背或过度前倾，以防止下背部受伤。,使用合适的重量，避免使用过重的负荷导致动作失控。,如有腰椎或髋关节问题，事先咨询医生或专业教练。', '腿部摆动幅度过大，利用惯性抬起而不是主动收缩腹肌。,在动作过程中弯腰或弓背，导致腰椎过度受压。,没有充分控制下降阶段，快速放下腿会降低训练效果并增加受伤风险。', '1. 滑轮高度可根据个人身高和舒适度微调，较高位置更适合站姿，较低位置适合跪姿。
2. 如感核心力量不足，可在膝盖略弯的情况下完成动作，以降低难度。
3. 使用脚环时，可通过调节扣环位置来改变腿部的抬起角度，从而调节对腹部的刺激。', 'isolation', '{"跪姿举腿":"保持背部挺直，膝盖略弯，降低腿部摆动幅度，以更好地孤立腹肌。","单腿举腿":"将脚固定在绳索上，仅使用一条腿举起，提高对核心单侧的挑战并改善左右平衡。"}', 'published', NOW(3), NOW(3));
SET @eid_188 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 外斜肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 股四头肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('负重俄罗斯转体', 'core', 'dumbbell', 'intermediate', NULL, '1. 双脚平放在地面，膝盖微屈，保持身体坐姿，双手握住哑铃置于胸前。\n2. 收紧核心，保持脊柱自然直立，稍微向后倾，使重心略在臀部上方。\n3. 呼气时，通过腹斜肌的收缩，将哑铃向一侧转动至手臂几乎与地面平行，保持臀部固定。\n4. 在最高点稍作停顿，感受到侧腹的拉伸与收缩。\n5. 吸气，缓慢回到起始位置，保持动作控制。\n6. 完成一次后，换另一侧重复，或按设定次数交替进行。', '确保背部挺直，避免弓背或塌腰，以减少腰椎压力。,使用适当的重量，避免过重导致动作失控或扭伤肩部。,在转动时保持臀部稳定，避免使用腿部或臀部的力量推动身体。', '转动幅度过大，导致背部过度旋转或失去平衡。,动作时臀部上下起伏，未保持核心紧绷。,使用过重的哑铃导致姿势变形，肩膀和颈部代偿。', '对于初学者可以先徒手练习或使用轻重量哑铃，待动作熟练后再逐步增加负荷。坐姿版本可通过将双脚抬起或使用凳子来降低难度；侧向转体可以通过倾斜身体角度来增加难度。若肩部不适，可改为双手握住哑铃的两端或使用哑铃的两侧来减轻手腕压力。', 'isolation', '{"徒手俄罗斯转体":"去掉哑铃，保持相同动作轨迹，适用于初级或作为热身动作。","坐姿俄罗斯转体":"将双脚抬起或放在凳子上，增加对核心的挑战。","侧向俄罗斯转体（单侧负重）":"只用一侧手握哑铃，另一侧保持平衡，侧重单侧腹斜肌。","交叉俄罗斯转体":"在转体后将哑铃递到另一只手，增加动作连贯性和协调性。"}', 'published', NOW(3), NOW(3));
SET @eid_195 = LAST_INSERT_ID();
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (agonist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 胸大肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('平板支撑', 'core', 'bodyweight', 'beginner', NULL, '1. 俯卧在地面，双手握拳放在胸部下方，手肘弯曲成90度，前臂紧贴地面。\n2. 将身体从头到脚保持一条直线，核心（腹肌）收紧，臀部略微收紧，避免腰部塌陷或拱背。\n3. 肩胛骨向后并向下收，肩部保持稳定，不要让肩膀向前塌陷。\n4. 保持自然呼吸，维持姿势30-60秒（初学者可先从20秒开始），随后放松回到地面。\n5. 如感到手腕不适，可将前臂稍微外旋或在手腕下放置软垫。\n6. 逐步延长时间并尝试单臂或抬腿等变体以提升难度。', '1. 保持脊柱中立，避免腰部下沉或拱起。\n2. 若出现手腕、肩部或颈部疼痛，应立即停止并调整姿势或使用辅助工具。\n3. 呼吸保持平稳，切勿憋气，以免导致血压升高。', '1. 臀部抬得过高形成倒V字型，导致下背过度伸展。\n2. 腰部过度下沉形成凹背，增加腰椎压力。\n3. 头部抬起或下巴上扬，导致颈椎受压。', '如果标准平板支撑难度过高，可将膝盖着地形成膝盖平板支撑，以减轻核心负荷。若想增加挑战，可改为手掌撑地的俯卧撑起始姿势，或在瑞士球上进行平板支撑以提升不稳定性。', 'compound', '{"膝盖平板支撑":"保持核心收紧的同时，将膝盖放在地面，降低身体重量，适合初学者逐步过渡到标准平板支撑。","侧平板支撑":"身体转向侧面，用单侧前臂和脚支撑，侧重锻炼侧腹肌（内外斜肌）和髋部外展肌群。","单臂平板支撑":"抬起一只手臂，保持身体水平稳定，可增强核心抗旋转能力，对肩部稳定性要求更高。"}', 'published', NOW(3), NOW(3));
SET @eid_207 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 横腹肌（腹横肌） (stabilizer)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (synergist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 股四头肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('超人式', 'core', 'bodyweight', 'intermediate', NULL, '1. 俯卧在地面或瑜伽垫上，双臂向前伸直，双腿伸直并拢，保持头部与脊柱自然对齐。\n2. 吸气的同时，同时抬起双臂、胸部和双腿，使身体呈现一个弧形的姿势，只有腹部着地支撑。\n3. 保持这个姿势2-3秒，感受下背部肌肉的收缩和挤压。\n4. 呼气时，有控制地将双臂、双腿和胸部缓慢放回起始位置，回到俯卧姿势。\n5. 短暂停顿后，重复动作进行下一组。\n6. 完成指定次数后，保持俯卧姿势放松。', '1. 动作过程中保持颈部自然位置，避免过度仰头导致颈椎压力过大。\n2. 抬起和下落时要有控制地完成，避免利用惯性快速摆动身体。\n3. 如果有下背部疼痛或腰椎问题，应谨慎练习或咨询专业教练指导。', '1. 动作幅度过大导致腰部过度弯曲或塌陷，形成弓背姿势。\n2. 抬起时仅依靠手臂力量，而没有充分调动背部肌肉发力。\n3. 头部抬起过高导致颈椎过度伸展，造成颈部不适。', '初学者可以先练习单侧超人式，交替抬起一侧手臂和对侧腿，降低难度。进阶者可以在抬起后加入轻微的夹背动作，强化背部肌肉收缩。如果腰背力量不足，可以在腹部下方垫一个枕头或垫子提供支撑。', 'compound', '{"退阶变体":"从单侧超人式开始，逐步建立核心和背部力量","进阶变体":"尝试超人式保持和静态支撑，增加肌肉耐力训练效果","变体方向":"可转换到游泳式或蝗虫式，增加动作的变化性和挑战性"}', 'published', NOW(3), NOW(3));
SET @eid_219 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 中下斜方肌 (synergist)
-- Suggested muscle: 菱形肌 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 多裂肌 (stabilizer)
-- Suggested muscle: 肩袖肌群 (stabilizer)
-- Suggested muscle: 腹直肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('登山者', 'core', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：四肢着地，双手撑在肩部正下方，双膝在髋部正下方，身体呈直线（平板支撑姿势）。\n2. 收紧核心：腹肌、背部、臀部同时用力，确保脊柱保持自然中立位置，避免塌腰或拱背。\n3. 启动动作：右膝向胸部抬起，膝盖尽量靠近胸部，同时左腿保持伸直支撑地面。\n4. 快速切换：在膝部抬至最高点后，迅速将右腿伸直回到起始位置，同时左膝向胸部抬起，形成交替踢腿的动作。\n5. 保持节奏：根据个人节奏保持一定的速度，通常每侧30-60秒为一个循环，保持呼吸均匀，避免憋气。\n6. 结束姿势：完成规定时间后，缓慢放下双腿，恢复到起始的平板支撑姿势，放松核心。', '运动前进行全身热身，尤其是肩部、髋部和核心肌群，以防受伤。,保持脊柱中立，避免出现塌腰或弓背的现象，以免对腰椎产生过大压力。,若出现肩部或手腕不适，可将手掌放在稍微抬起的平台上或使用哑铃支撑，以减轻负担。', '臀部抬得过高，导致身体呈倒V形，使核心受力减弱并增加肩部压力。,动作过程中头部前倾或颈部过度伸展，导致颈椎不适。,呼吸不规律，憋气导致血压升高和核心力量下降。', '可根据个人能力调整动作速度——慢速版可以增强核心控制；如需降低难度，可在倾斜的台阶或踏板上进行登山者；如需提升强度，可尝试抬膝至对侧手肘的交叉登山者，或在双手下放置瑜伽砖增加难度。', 'compound', '{"慢速登山者":"将抬膝与伸腿的节奏放慢至每侧2-3秒，以更强调核心的等长收缩和平衡控制。","倾斜登山者":"将双手置于略高的平台（如台阶、箱子），使身体倾斜，从而降低手腕压力并增加髋屈肌的参与。","交叉登山者":"抬膝时将膝盖向对侧的肩膀方向靠近，形成对角线动作，激活更多的腹斜肌和旋转核心。","登山者+平板支撑组合":"在完成一次完整的登山者后，切换为平板支撑保持10-15秒，交替进行，提升耐力和核心稳定性。"}', 'published', NOW(3), NOW(3));
SET @eid_230 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 横腹肌（腹横肌） (stabilizer)
-- Suggested muscle: 多裂肌 (stabilizer)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 肩部前三角肌 (stabilizer)
-- Suggested muscle: 胸大肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('腹肌轮训练', 'core', 'other', 'advanced', NULL, '1. 跪在垫子上，双膝与肩同宽，双手握住腹肌轮的两侧手柄，保持核心收紧。\n2. 慢慢向前推动腹肌轮，身体随之向前伸展，保持脊柱中立，避免下背部塌陷或拱起。\n3. 继续滚动至感到腹肌有适度拉伸的位置，胸腔轻微触地（不要让胸部完全贴地），保持动作控制。\n4. 稍作停顿后，收紧腹肌，用手拉回腹肌轮至起始位置，保持动作平稳。\n5. 完成一次后回到跪姿准备姿势，保持背部平直，避免在回程时出现弹力。\n6. 根据个人能力重复进行8-12次，注意全程保持核心紧绷、呼吸平稳。', '1. 训练前务必进行全身热身，尤其是核心与肩部，以防拉伤。\n2. 若出现下背部疼痛或不适，应立即停止并减小滚动幅度或改用辅助器械。\n3. 使用厚实的防滑垫或软垫，避免手腕和膝盖受到过度冲击。', '1. 在向前滚动时让腰部过度塌陷或拱起，导致腰椎受压过大。\n2. 利用惯性快速摆动而非受控的肌肉收缩，容易失去核心刺激并增加受伤风险。\n3. 滚动距离过大，超出个人控制范围，导致姿势失控或摔倒。', '若核心力量不足，可先采用跪姿短幅滚动，或使用带有固定绳索的腹肌轮进行辅助；待动作熟练后可逐步增加滚动距离，或尝试站姿变体以提升难度。', 'compound', '{"跪姿腹肌轮":"降低难度，适合初学者或核心力量薄弱者。","站姿腹肌轮":"提升核心挑战，适用于进阶训练者。","侧向腹肌轮":"在侧向滚动时加强斜向腹肌的刺激，提供不同的核心训练角度。"}', 'published', NOW(3), NOW(3));
SET @eid_231 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 背阔肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 臀大肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('药球砸球', 'core', 'other', 'intermediate', NULL, '1. 站姿，双脚与肩同宽，双手握住药球并将其举至胸前上方，保持核心收紧。\n2. 稍微屈膝，降低身体重心，同时将药球稍微后摆，准备产生爆发力。\n3. 通过快速的髋部旋转和腹背肌肉收缩，将上半身向前下压，同时将药球垂直向下砸向地面或指定的“砸球”。\n4. 在药球触地（或砸球）瞬间，让球自然弹起或顺势释放，保持动作的连贯性。\n5. 立即用腹背力量控制身体回到起始姿势，准备进行下一次动作。\n6. 完成设定的次数或时间后，缓慢放松并做适当伸展。', '1. 确保练习区域周围没有易碎或易受伤的物品，以防药球弹起时造成伤害。\n2. 在下砸过程中避免过度拱背，保持脊柱自然对齐，防止下背部受伤。\n3. 如有肩部或腰椎不适，建议先咨询专业教练或使用较轻的重量。', '1. 仅使用手臂力量下砸药球，而忽视核心肌群的参与，导致动作力量不足且容易受伤。\n2. 在下砸时未屈膝、髋部未转动，导致腰部过度承受冲击。\n3. 动作幅度过小或未完成完整的发力路径，导致训练效果不明显。', '对于初学者，可先使用轻量药球或用双手托住药球进行下砸，逐步增加重量和下砸速度；如需要降低难度，可将药球轻放在地面目标球上，而不是用力砸击；如想提高难度，可在药球上加重环或使用更重的药球，并加入跳跃动作。', 'compound', '{"变体类型":"可将该动作转换为药球侧向砸球、旋转砸球或与跳跃结合的高强度版本，以增加核心旋转力量和下肢爆发力。","转换建议":"将药球从正面下砸改为侧面斜向下砸，激活斜腹肌和背阔肌；或在进行砸球前加入一次快速的下蹲跳跃，提升全身协同发力。"}', 'published', NOW(3), NOW(3));
SET @eid_234 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('俯卧侧转', 'core', 'bodyweight', 'intermediate', NULL, '1. 俯卧在地面或垫子上，双肘撑地，身体呈直线姿势。\n2. 收紧核心肌群，保持脊柱自然中立位置，肩部位于肘部正上方。\n3. 保持髋部稳定不动，通过腹斜肌发力将胸廓向一侧旋转。\n4. 旋转时保持肩膀和手臂作为一个整体移动，目光跟随手部移动方向。\n5. 达到最大旋转幅度后，控制性地回到起始位置。\n6. 重复完成指定次数后，换另一侧进行练习。', '1. 旋转幅度应控制在舒适范围内，避免过度扭转导致腰椎压力过大。\n2. 整个动作过程中髋部必须保持稳定贴地，避免因髋部抬起导致腰椎旋转。\n3. 若感到腰部不适或疼痛，应立即停止并咨询专业教练或医疗人员。', '1. 髋部抬起或偏离原位，使腰椎过度旋转替代了胸椎旋转。\n2. 旋转时耸肩或头部过度前倾，增加颈椎压力。\n3. 动作速度过快，缺乏对核心的有效控制，降低训练效果并增加受伤风险。', '初学者可从小幅度的旋转开始，逐步增加范围。退阶版本可以缩短旋转幅度或双手撑地增加稳定性。进阶版本可尝试在侧卧位置进行旋转练习以增加难度。', 'compound', '{"退阶":"减小旋转幅度，双手撑地以增加支撑面积和稳定性","进阶":"从侧卧位进行旋转，或在高位支撑（如手撑地）下进行更大范围的旋转练习"}', 'published', NOW(3), NOW(3));
SET @eid_243 = LAST_INSERT_ID();
-- Suggested muscle: 腹外斜肌 (agonist)
-- Suggested muscle: 腹内斜肌 (agonist)
-- Suggested muscle: 腹横肌 (synergist)
-- Suggested muscle: 竖脊肌 (synergist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 菱形肌 (stabilizer)
-- Suggested muscle: 臀大肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('TRX核心训练', 'core', 'other', 'advanced', NULL, '1. 调整TRX悬吊带长度，使手柄离地面约30-45厘米，双脚站稳。\n2. 双手握住把手，身体前倾，呈俯卧撑姿势，保持核心紧绷。\n3. 收紧腹肌，使身体从头部到脚跟保持一条直线，避免臀部下沉。\n4. 通过腹肌力量将膝盖向胸部靠拢，或将脚向胸部收拢，保持动作受控。\n5. 在最高点收缩核心，然后缓慢将身体放回起始位置。\n6. 按要求的次数或时间重复，保持呼吸均匀。', '• 开始前确保TRX挂点稳固，带子无磨损。\n• 保持颈部自然位置，避免用力扭转或抬头。\n• 若感到腰背不适，立即停止并调整姿势。', '• 臀部抬起导致腰背过度伸展。\n• 使用腿部或手臂力量代替核心发力。\n• 动作过快，缺乏控制。', '• 增加难度：将脚抬高或站在不稳定的平台上。
• 降低难度：缩短把手与身体的距离，或使用膝盖支撑。
• 通过调节手握位置（宽握或窄握）来改变发力点。', 'compound', '{"高位TRX卷腹":"将手柄调至胸部高度，增加上斜角度，提高核心挑战。","低位TRX卷腹":"降低手柄至腰部高度，减小倾斜角度，适合初学者。"}', 'published', NOW(3), NOW(3));
SET @eid_538 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 横腹肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (antagonist)
-- Suggested muscle: 臀大肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('V字卷腹', 'core', 'bodyweight', 'intermediate', NULL, '1. 平躺在瑜伽垫上，双手放于身体两侧或头部两侧（但不要用力拉拽），双腿伸直并拢，吸气准备。\n2. 保持双腿伸直，腹肌发力，同时抬起上半身和双腿，使身体形成V字形。\n3. 双手向脚的方向伸展，尽量让手指触碰到脚尖或脚踝。\n4. 在顶峰位置收紧腹肌，保持1-2秒，感受腹部的强烈收缩。\n5. 呼气，缓慢控制地将上半身和双腿放回起始位置，但双脚不要完全触地。\n6. 重复动作，保持稳定的节奏和呼吸配合。', '1. 整个动作过程中，双手仅作为辅助引导，不要用手拉扯颈部，以免造成颈椎损伤。\n2. 如果感到下背部不适或疼痛，应立即停止动作并降低难度。\n3. 初学者或腰部有伤病者，应在有人监督的情况下进行，或先选择难度较低的变体。', '1. 借助惯性快速完成动作，没有控制地摆动身体，导致训练效果降低且容易受伤。\n2. 双手用力拉扯头部或颈部，造成颈椎压力过大，引发颈部酸痛。\n3. 动作幅度不足，身体没有形成明显的V字形，腹部没有充分收缩。', '1. 初学者可将双腿弯曲呈90度，减少动作难度。
2. 随着力量提升，可手握哑铃增加负重。
3. 如果无法完成完整的V字形，可先做半程动作，逐步增加幅度。
4. 可将脚尖勾住固定物体或让同伴按住双脚来稳定身体。', 'isolation', '{"降阶":"弯曲膝盖做V字卷腹，或只抬起上半身，双腿保持固定在地面。","升阶":"手持哑铃或杠铃片进行负重训练，或在V字顶端保持更长时间。","替代动作":"悬垂举腿、平板支撑、仰卧蹬车式卷腹。"}', 'published', NOW(3), NOW(3));
SET @eid_478 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 股四头肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (antagonist)
-- Suggested muscle: 腹外斜肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('上斜哑铃卷腹', 'core', 'dumbbell', 'intermediate', NULL, '1. 调整斜凳角度（约30-45度），双手各握一只适当重量的哑铃，站立于斜凳后方，双手自然垂于体侧；2. 吸气，收紧核心，将哑铃抬至胸前，保持手臂略微弯曲；3. 通过腹部的收缩，上半身向前卷曲，使胸部向膝盖方向靠近，动作全程保持背部自然弯曲，避免过度弓背；4. 在最高点稍作停顿，感受腹直肌的收缩；5. 呼气，缓慢放回起始姿势，控制重量不要猛然下落；6. 重复进行设定的次数或时间。', '1. 确认斜凳稳固无晃动，防止滑倒；2. 哑铃重量不宜过大，以免在卷腹过程中失去控制导致下背部受伤；3. 若感到腰部不适，应立即停止并调整姿势或降低重量。', '1. 使用过大的重量导致肩膀和手臂参与过多，失去腹部的孤立刺激；2. 卷腹时头部和颈部过度前倾，导致颈椎受压；3. 在动作顶端没有充分收缩腹部，或下降时速度过快，未能保持控制。', '1. 斜凳角度可以根据个人柔韧性和训练目标调节，角度越大难度越高；2. 哑铃重量可逐步增加，建议每组10-15次为合适范围；3. 若想要更侧重上腹，可把哑铃放在胸前；若想刺激整体腹部，可将哑铃置于头顶。', 'isolation', '{"无器材卷腹":"将哑铃放下，直接用手扶住头部或交叉胸前进行卷腹，适合初学者或需要降低负荷时使用。","平板卷腹":"将斜凳调至水平，使用哑铃进行标准卷腹，可增加对腹直肌的控制。","双哑铃交替卷腹":"在卷腹时交替将左、右哑铃向同侧胸部提起，可增强斜腹肌的参与。","负重侧卷腹":"将哑铃置于体侧进行侧向卷腹，主要刺激腹外斜肌和内斜肌。"}', 'published', NOW(3), NOW(3));
SET @eid_481 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('上斜板卷腹', 'core', 'bodyweight', 'beginner', NULL, '1. 将上斜板调整至约30-45度的倾斜角度，双脚稳固踩在地面或固定在板上，膝盖可微屈。\n2. 仰卧在板上，双手交叉放在胸前或轻轻置于耳侧，保持颈部自然放松。\n3. 收紧腹肌，呼气的同时用腹部的力量将上背部卷离板面，注意下巴微收，避免用力拉颈部。\n4. 在动作顶峰位置保持1-2秒，感受到腹直肌的紧绷收缩。\n5. 吸气，缓慢控制下放回起始姿势，避免猛然下落，保持核心稳定。\n6. 按照设定的次数重复动作，确保在整个运动过程中臀部始终接触板面。', '1. 确保上斜板稳固放置，防止滑动或倾倒。\n2. 使用腹肌发力，切勿用手臂或颈部力量拉动上半身，以避免颈椎受伤。\n3. 如在动作中出现腰部不适或疼痛，应立即停止并咨询专业教练或医生。', '1. 用手拉动颈部或头部，导致颈椎过度压力。\n2. 上斜角度设置不当（过大或过小），使腰椎过度弯曲或腹肌刺激不足。\n3. 动作幅度不够，仅做浅层收缩，未能充分收缩腹直肌。', '1. 初学者可将上斜板倾斜角度调低，或在板面下方垫上软垫，以减轻腰部负担。
2. 将双手放在胸前而非耳侧，可进一步减少颈部的借力。
3. 如感到腰部不适，可改为平板卷腹或使用瑞士球进行替代，保持核心稳定的同时降低腰椎压力。', 'isolation', '{"变体类型":"下斜板卷腹","转换建议":"将上斜板放在地面上，使用平地或瑜伽垫进行卷腹，减少倾斜角度带来的难度，适合恢复期或初学者进行练习。","另一种变体":"平板卷腹"}', 'published', NOW(3), NOW(3));
SET @eid_471 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 胸锁乳突肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('下斜板举腿', 'core', 'bodyweight', 'intermediate', NULL, '1. 调整下斜板的倾斜角度（约30‑45度），脚部固定在靠垫或脚托上，双手握住手柄或抓住凳子两侧，保持身体稳定。\n2. 躺在板上，背部平贴板面，膝盖略微弯曲或保持伸直，视个人柔韧性而定。\n3. 吸气，收紧核心尤其是下腹肌，双腿保持微弯或伸直，慢慢抬起双腿至与上半身约90度或略高于水平面。\n4. 在最高点稍作停顿，感受腹部尤其是下腹的收缩，然后呼气，缓慢放下双腿回到起始位置，控制速度避免猛冲。\n5. 完成一组次数后，重复动作。若想增加难度，可在最高点保持几秒，或在下降时加入轻微的扭动。\n6. 结束时，双手放松，身体缓慢放回起始姿势，避免突然起身导致头晕。', '进行前确保下斜板固定稳固，防止滑动或倾斜导致受伤。,举起和放下时保持核心紧绷，避免用力过猛导致腰椎过度屈曲或受伤。,若出现腰部或髋部不适，应降低倾斜角度或改为平躺举腿，必要时请教专业教练。', '抬腿时使用腰背力量而非腹肌，使腰椎过度屈曲，增加背部受伤风险。,动作过快或利用惯性摆动，导致腹肌失去有效负荷，训练效果降低。,脚部固定不稳或手握不牢，使身体晃动，增加摔倒或拉伤的可能。', '初学者可降低倾斜角度或弯曲膝盖以减轻难度；若想增强腹肌刺激，可将腿伸直并在最高点保持1‑2秒；若肩部不适，可改为手握凳子把手或使用护腕减轻手腕压力；如感到下背不适，可使用垫子支撑腰部或改做平躺举腿。', 'compound', '{"上斜板举腿":"将板倾斜向上，难度降低，适合初学者或柔韧性较差者。","悬垂举腿":"在单杠或吊环上进行，增加重力负荷，提升核心力量。","侧向举腿":"在侧卧姿势下进行，侧重腹斜肌锻炼。","负重举腿":"在脚踝加轻量哑铃或踝套，提高负荷，适合进阶训练。","器械辅助举腿":"使用腿举机或滑轮系统，提供支撑，帮助学习正确姿势。"}', 'published', NOW(3), NOW(3));
SET @eid_487 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌 (agonist)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 横腹肌 (stabilizer)
-- Suggested muscle: 脊柱竖肌 (stabilizer)
-- Suggested muscle: 股四头肌 (stabilizer)
-- Suggested muscle: 臀大肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('交叉卷腹', 'core', 'bodyweight', 'intermediate', NULL, '1. 仰卧在垫子上，双脚平放，膝盖弯曲，双手交叉放在胸前或轻触耳侧。\n2. 收紧核心，抬起上背部，使对侧的肘部向对侧的膝盖靠拢，动作过程中保持颈部自然，避免用力拉扯。\n3. 在最高点稍作停顿，感受腹部肌肉的收缩，然后缓慢放回上背部至起始位置。\n4. 交替进行另一侧，即另一只肘部向另一侧膝盖靠拢，完成一次完整的交叉卷腹。\n5. 保持呼吸节奏：在卷腹时呼气，下降时吸气，确保动作平稳不急促。', '1. 始终保持颈部自然位置，避免用力向前拉头部或颈部，以防止颈椎受伤。\n2. 动作过程应控制速度，避免使用惯性或弹力完成卷腹，以免对腰椎产生过大压力。\n3. 若出现下背部不适或疼痛，应立即停止并咨询专业教练或医生。', '1. 使用惯性甩动身体完成动作，导致核心肌肉未能充分发力。\n2. 卷腹时头部过度前倾或用力拉颈，导致颈部酸痛。\n3. 动作幅度过大导致腰部抬起过多，增加腰椎负担。', '初学者可将双手放在身体两侧以减轻难度，或使用弹力带辅助；进阶者可在胸前持哑铃或使用阻力带增加负荷；如需减轻下背压力，可在臀部下方垫高或使用健身球进行变体练习。', 'isolation', '{"跪姿交叉卷腹":"将动作改为跪姿进行，可减轻地面摩擦力并更好地控制幅度。","坐姿交叉卷腹":"坐在椅子上完成，同样强调对侧肘部与膝盖的靠拢，可加入哑铃提升难度。","负重交叉卷腹":"双手握住哑铃或壶铃进行交叉卷腹，转换为负重核心训练。","侧卧交叉卷腹":"在侧卧姿势下进行上下交叉卷腹，可针对侧腹肌提供更集中的刺激。"}', 'published', NOW(3), NOW(3));
SET @eid_506 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 横腹肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('交替卷腹', 'core', 'bodyweight', 'beginner', NULL, '1. 平躺在瑜伽垫上，双腿弯曲，双脚平放在地面上，双手轻轻放在耳侧或交叉置于胸前。\n2. 收紧腹部肌肉，将头和肩部向上卷起，同时将右手肘向左侧膝盖方向移动。\n3. 在卷腹的最高点停顿片刻，感受腹部的收缩。\n4. 缓慢放下上半身，恢复到初始位置。\n5. 再次卷起，这次将左手肘向右侧膝盖方向移动。\n6. 完成一侧后交替进行，完成指定的重复次数。', '1. 保持颈部放松，避免用力拉扯头部，以减少颈椎压力。\n2. 动作过程中保持呼吸顺畅，不要憋气。\n3. 若感到腰部不适，应立即停止并调整动作或寻求专业指导。', '1. 过度用力拉扯头部和颈部，试图借助手臂力量抬起上半身。\n2. 下背部过度离开地面，导致腰椎压力过大。\n3. 动作速度过快，缺乏对肌肉的控制和收缩感的建立。', '新手可以将双手放在身体两侧以获得更好的支撑；对于需要增加难度的人群，可以将双手放在头后方或在双脚离地的情况下进行练习。进阶变体包括在卷腹时将膝盖抬至胸部位置，或在身体侧边进行斜向卷腹。', 'isolation', '{"进阶":"可以升级为交叉卷腹，在卷腹的同时将膝盖向对侧手肘方向靠拢；或转换为悬垂举腿，增加核心参与度。","退阶":"可以简化为传统卷腹，同时收紧双腿以增加稳定性；或放慢动作速度，专注于肌肉的控制和收缩。","变体":"斜向交替卷腹（在身体侧边45度方向卷起）、负重卷腹（双手握住哑铃或杠铃片）、以及药球卷腹等。","替代动作":"如果需要替代交替卷腹，可以选择仰卧起坐、平板支撑或卷腹摸膝等动作来锻炼核心力量。"}', 'published', NOW(3), NOW(3));
SET @eid_477 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧举腿', 'core', 'bodyweight', 'beginner', NULL, '1. 平躺在瑜伽垫或平坦地面上，双脚并拢，双手放在身体两侧或轻轻压在臀部下方以提供支撑，保持自然呼吸。\n2. 吸气，收紧核心（尤其是腹横肌），确保脊柱保持自然弧度，避免背部拱起或下沉。\n3. 呼气，利用腹部的力量缓慢抬起双腿，保持膝关节微微弯曲或完全伸直（根据个人难度），双腿向上举至约90度角，臀部轻微离开地面。\n4. 在最高点稍作停顿（约1秒），感受下腹部的收缩，尤其是腹直肌的下部。\n5. 吸气，缓慢放下双腿，回到起始姿势，过程保持核心紧绷，避免快速下落或用力弹跳。\n6. 重复动作至设定的次数或时间，完成后进行适度的放松与伸展。', '1. 动作全程保持脊柱自然对齐，避免腰部过度拱起；如出现腰背疼痛应立即停止。\n2. 不要使用腿部冲力或摆动抬起双腿，以免对髋关节和腰椎产生冲击。\n3. 初学者可将双手放在臀部下方或在大腿后侧垫上软垫，以降低难度并提供支撑。', '1. 背部拱起（腰部离垫）导致腰椎受压，长期可能引发腰背不适。\n2. 使用腿部冲力抬起双腿，忽视腹部的主动收缩，使训练效果下降。\n3. 呼吸不配合，屏住呼吸或呼吸节奏紊乱，影响核心稳定性和血液流通。', '退阶：双手放在身体两侧，手掌向下提供支撑，或只抬起单腿以降低难度；在大腿后侧放置软垫也有助于减轻腹部负担。
进阶：在空中保持双腿伸直，或将双手放在胸前交叉加大动作幅度；进一步可尝试悬垂举腿（双手抓住横杠）或在踝部挂轻量哑铃提升负荷。', 'isolation', '{"退阶":"使用手部支撑、只举单腿或将软垫置于大腿后侧以减轻腹部负担","进阶":"尝试悬垂举腿、在踝部加重或在空中保持双腿伸直以提升难度"}', 'published', NOW(3), NOW(3));
SET @eid_483 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 股直肌 (synergist)
-- Suggested muscle: 竖脊肌 (antagonist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 腹外斜肌 (stabilizer)
-- Suggested muscle: 臀大肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧侧卷腹', 'core', 'bodyweight', 'beginner', NULL, '1. 躺在垫子上，双脚弯曲，脚掌平放，膝盖略高于髋部，保持髋部稳定。双手可以放在胸前或轻触头部两侧，避免用力拉颈。\n2. 吸气时收紧腹部，准备动作。呼气时，将肩膀抬离地面，同时将左侧肘部向右侧膝盖方向靠拢，旋转躯干并向侧面卷起上半身。\n3. 在最高点稍作停顿（1-2秒），感受侧腹（外斜肌）的收缩。\n4. 吸气并缓慢放松，将肩膀放回地面，回到起始姿势。\n5. 完成设定次数后，换另一侧重复相同的动作（每侧10-12次为常见起始量）。\n6. 整个过程中保持下背部贴近垫子，动作平稳流畅，避免弹跳或用力过猛。', '1. 保持动作平稳、幅度适中，避免突然用力导致腰背扭伤。\n2. 若有颈部、腰椎或髋部不适，立即停止并咨询专业医生或理疗师。\n3. 使用足够厚度的垫子，防止背部受凉或压痛，并确保地面平整防滑。', '1. 用手强力拉头部或颈部，导致颈椎受压。\n2. 卷腹幅度不足，只做肩膀抬起而未真正收缩侧腹肌肉。\n3. 动作过程中下背部抬离垫子，出现弓背或腰部落空现象。', '初学者可以先减小卷腹幅度，双手放在胸前以减轻颈部负担；若想增加难度，可在胸前放置轻量哑铃或使用阻力带进行侧向卷腹。进阶者也可尝试在侧桥姿势下进行侧卷腹，以进一步激活核心深层肌群。', 'isolation', '{"侧桥卷腹":"在侧桥姿势下进行侧卷腹，可进一步提升核心稳定性和侧腹力量。","负重侧卷腹":"在胸前持轻哑铃或壶铃，增加侧腹肌群的负荷。","侧卧抬腿":"结合侧卷腹的动作，可提升髋屈肌和侧腹的协同工作能力。"}', 'published', NOW(3), NOW(3));
SET @eid_507 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 腰方肌 (stabilizer)
-- Suggested muscle: 竖脊肌（下背部） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧腹肌组合', 'core', 'bodyweight', 'intermediate', NULL, '1. 预备姿势：仰卧在垫子上，双膝弯曲，脚掌平放地面，双手交叉置于胸前或轻放在头侧，保持颈部自然放松，肩胛骨稍微收紧。\n2. 吸气并收紧腹肌，将上背部抬离地面，同时双手向前伸展，保持胸部向上、腹部用力，避免用手拉动头部。\n3. 在保持上背部抬起的同时，抬起双腿，膝盖保持微屈，利用腹肌力量将双腿向胸部靠拢，臀部轻微离地，形成仰卧卷腹与腿部提起的组合动作。\n4. 动作到达最高点时稍作停顿（大约1秒），感受腹肌的强烈收缩，然后缓慢放下双腿和上半身，回到起始姿势，呼气。\n5. 重复进行8-12次，完成一组后休息30秒至1分钟，根据个人体能逐步增加次数或组数。', '1. 动作全程保持颈部自然放松，避免用手拉拽头部或颈部，以防颈椎受伤。\n2. 保持下背部紧贴垫子，若出现腰部不适，应立即降低动作幅度或停止练习。\n3. 如有腰椎疾病或严重腹肌劳损，请在专业教练指导下进行或选择其他低风险动作。', '1. 用颈部力量抬起上半身，导致颈部紧张和不适。\n2. 动作过快、利用惯性完成，导致腹肌刺激不足。\n3. 腿抬起时膝盖过度伸展或脚尖绷紧，使髋屈肌过度参与，降低腹肌的激活程度。', '1. 初学者可将腿部抬起的幅度减小，或在背部下方垫上卷起的毛巾以减轻腰部压力。
2. 中级练习者可保持当前的抬起幅度，专注于控制动作速度，确保腹肌全程收缩。
3. 高级练习者可双手握轻量哑铃或使用阻力带，以增加负荷；或在倾斜的健身椅上完成，以提升难度和腹肌挑战。', 'compound', '{"变体类型":"对于初级练习者，可降低腿部和上身的抬升幅度，或在背部下方垫上卷起的毛巾以减轻腰部压力；对于中级/高级练习者，可双手握哑铃或使用阻力带进行负重训练，或在倾斜的健身椅上完成以增加难度。"}', 'published', NOW(3), NOW(3));
SET @eid_545 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧起坐', 'core', 'bodyweight', 'beginner', NULL, '1. 平躺在瑜伽垫上，双膝弯曲，脚掌平放在地面，膝盖约与肩同宽。\n2. 双手可交叉置于胸前，或轻触耳侧，手肘略微张开，保持颈部自然中立。\n3. 吸气时收紧核心，腹部发力，依次将上背部、肩胛骨抬离地面，向大腿方向卷起上半身。\n4. 在动作的最高点（约与地面呈45度角），呼气并稍作停顿，感受腹肌的收缩。\n5. 吸气时控制速度，缓慢将上半身放回起始位置，保持核心持续紧张，避免猛然弹回。\n6. 重复上述动作，完成设定的次数或时间。', '1. 确保下背部始终贴合地面，避免过度弓背导致腰椎压力过大。\n2. 颈部应保持自然位置，避免用力拉头，以免造成颈椎受伤。\n3. 如感到下背疼痛或不适，应立即停止并改用更温和的变体（如卷腹）。', '1. 动作过快，利用惯性完成仰卧起坐，导致核心肌群受力不足。\n2. 用手的力量拉动头部或颈部，产生颈部压力。\n3. 下背离开地面，形成拱背姿势，增加腰椎受伤风险。', '如果下背不适，可以将脚部抬高放在椅子上，或改做膝盖弯曲的半仰卧起坐，以减轻髋屈肌的负担。对于初学者，建议使用阻力带或仰卧起坐辅助器械来帮助掌握动作轨迹。', 'compound', '{"半仰卧起坐（膝盖弯曲）":"通过弯曲膝盖降低髋屈肌参与，减轻下背压力，适合腰部有不适的人群。","交叉仰卧起坐":"在起身时将肘部交替触碰对侧膝盖，可增加斜腹肌的刺激，提升核心旋转稳定性。","器械辅助仰卧起坐":"使用弹力带或仰卧起坐板提供助力，帮助新手建立正确的动作模式。","卷腹":"仅抬起上背部至肩胛骨离地，减小髋屈肌参与，专注于腹直肌的收缩。","悬垂举腿":"在垂直姿势下抬起双腿，改为对下腹部的强化训练，可作为仰卧起坐的替代或进阶动作。"}', 'published', NOW(3), NOW(3));
SET @eid_470 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌（髂肌+腰大肌） (synergist)
-- Suggested muscle: 股直肌 (synergist)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (antagonist)
-- Suggested muscle: 横腹肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('侧卧卷腹', 'core', 'bodyweight', 'beginner', NULL, '1. 身体左侧卧，双手交叉放在胸前或轻扶地面保持平衡。\n2. 双膝弯曲约90度，脚踝叠放，保持脊柱自然中立位。\n3. 吸气时准备，呼气时收紧核心，上半身向腿侧卷起，肩膀离开地面，注意不要用手臂力量推起。\n4. 在最高点稍作停顿，感受侧腰部（外斜肌）的收缩。\n5. 吸气时缓慢放下上半身回到起始姿势，保持动作控制，避免猛然砸回。\n6. 完成一组后换右侧重复。', '1. 确保练习的垫子或地面平整，防止滑倒。\n2. 动作过程中保持脊柱自然弯曲，避免用力过猛导致腰部受伤。\n3. 如有腰部或颈部不适，应立即停止并咨询专业教练。', '1. 用手臂力量推起上半身，导致侧腰发力减弱。\n2. 动作幅度过大或快速弹回，容易造成腰椎压力过大。\n3. 盆骨在卷腹时出现倾斜或旋转，失去侧腰的孤立刺激。', '初学者可以先不抬肩，仅做轻度的卷腹感受收缩；熟练后可双手抱头或在前胸放置轻哑铃提升难度；膝盖夹枕或使用阻力带可以帮助稳定骨盆。', 'isolation', '{"无负重侧卧卷腹":"可在手掌下方放小哑铃或使用阻力带提升阻力。","负重侧卧卷腹":"在胸前或侧腰处握哑铃或杠铃片，注意重量不宜过大，以免失去动作控制。","弹力带侧卧卷腹":"将弹力带固定在脚踝或膝盖处，提供额外阻力，适合进阶训练。"}', 'published', NOW(3), NOW(3));
SET @eid_497 = LAST_INSERT_ID();
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀中肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('侧卧自行车', 'core', 'bodyweight', 'intermediate', NULL, '1. 侧卧在瑜伽垫上，头部枕在下侧手臂上，上侧手臂弯曲支撑在胸前以保持平衡。确保身体侧面完全接触垫子，保持一条直线。\n2. 弯曲膝盖，使双腿离开地面约15-20厘米，大腿与躯干保持约45度角。脚尖勾起，腹部收紧。\n3. 上侧腿（位于上方的腿）向胸部方向屈膝，将膝盖拉近肩膀，同时保持小腿平行于地面。\n4. 当上侧腿屈膝向前时，下侧腿（位于下方的腿）同时向后伸展，脚尖朝下，类似于踩自行车的踏板动作。\n5. 然后快速切换：上侧腿向后伸展，下侧腿向前屈膝，保持交替循环。\n6. 保持均匀的呼吸节奏，持续进行10-15次后换另一侧进行相同的次数。', '1. 始终保持核心收紧，避免腰部过度下沉或弓背，保持身体侧面平直。\n2. 动作过程中不要过快，保持控制，以防止腰部和髋部受伤。\n3. 如果感到腰部不适或疼痛，应立即停止并咨询专业教练。', '1. 腰部下沉或塌陷：许多人在动作过程中会让下腰部离开垫子，这会增加下背部的压力。应该始终保持核心紧绷，躯干稳定。\n2. 动作过于快速：为了追求数量而忽略动作质量，导致姿势变形。应该保持稳定的节奏，充分感受核心的收缩。\n3. 髋部位置不正确：腿部动作时髋部前后摆动过大。应保持髋部稳定，只进行腿部的屈伸动作。', '初学者可以放慢动作速度，专注于保持身体稳定后再进行腿部动作；如果难度过高，可以将动作幅度减小，先从小幅度的踩踏开始练习；进阶者可以绑上弹力带增加阻力，或增加每组重复次数来提升训练强度。', 'compound', '{"降阶变体":"减小腿部动作幅度，只做小幅度的膝盖屈伸，或在膝盖下方放一个枕头支撑上侧腿。","进阶变体":"在动作过程中将上侧手臂伸直指向天花板，或在双脚之间夹一个小哑铃增加难度。","变化形式":"可以尝试侧卧抬腿训练来强化核心侧向稳定性，或结合登山者动作增加动态强度。"}', 'published', NOW(3), NOW(3));
SET @eid_550 = LAST_INSERT_ID();
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 腹内斜肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 股直肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腰方肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('俄罗斯转体', 'core', 'bodyweight', 'beginner', NULL, '1. 坐在地面上，双膝弯曲，双脚平放在地面（若想增加难度，可将双脚抬起，膝盖略微屈曲）。\n2. 收紧腹部，背部保持自然弧度，稍微后倾，使核心肌群紧绷。\n3. 双手交叉放在胸前或合十，保持肩部放松，目视前方。\n4. 深吸气后，在呼气时通过转动躯干将上半身向一侧旋转，保持双腿和臀部固定不动。\n5. 旋转至最大幅度（约45度）时，保持1-2秒，感受侧腹的拉伸与收缩。\n6. 吸气并控制速度回到起始姿势，然后重复向另一侧旋转，完成一次完整的俄罗斯转体。', '确保下背部保持自然弧度，避免过度弓背或塌背，以免造成腰椎压力。,动作全程保持核心收紧，避免利用腿部或臀部的力量来推动身体。,如果感到颈部不适，可在头部后方轻轻扶住头部或使用柔软垫子支撑。', '使用过大的动量甩动身体，导致动作失去对核心的控制。,双脚抬得过高或膝盖过度屈曲，使核心负担转移到下背部。,旋转时只转肩部而没有转动胸椎，导致侧腹刺激不足。', '初学者可将双脚放在地面上，保持脚跟着地，以降低难度。,中级练习者可以抬起双脚，使身体呈V字形，增加核心挑战。,进阶者可手持哑铃、药球或壶铃进行负重，或在倾斜的凳子上完成，以进一步提升强度。', 'isolation', '{"变体类型":"负重变体","转换建议":"使用轻重量的哑铃或药球进行负重时，先从1-2 公斤开始，确保动作控制良好后再逐步增加重量；若想降低难度，可不使用负重并保持双脚着地。"}', 'published', NOW(3), NOW(3));
SET @eid_496 = LAST_INSERT_ID();
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (agonist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 腰方肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('俯卧两头起', 'core', 'bodyweight', 'intermediate', NULL, '1. 俯卧在地面或训练垫上，双臂向前伸直，双手掌心朝下，双腿并拢伸直，脚尖绷直。\n2. 保持双臂和双腿伸直，同时将双臂和双腿向上抬起，离开地面约15-20厘米。\n3. 在抬起的最高点，躯干应略微离开地面，呈现微微弯曲的弧形，身体类似香蕉形状。\n4. 收紧腹部核心肌群，保持这个姿势几秒钟，感受核心肌肉的持续发力。\n5. 缓慢而有控制地将双臂和双腿放回起始位置，回到俯卧姿势。\n6. 重复上述动作，完成设定的次数或时间。', '1. 动作过程中保持颈部自然放松，不要过度仰头或低头，以免造成颈椎压力。\n2. 如果感到下背部疼痛，应立即停止动作，并检查动作姿势是否正确。\n3. 建议在柔软的训练垫上进行，避免地面过硬导致不适。', '1. 抬起过高导致腰部过度弯曲，可能会引起下背部不适，应保持适度的小幅度抬起。\n2. 动作速度过快，缺乏对核心的控制，应该保持缓慢而有节奏的运动。\n3. 头部过度抬起或用力过大，可能导致颈部疲劳和损伤。', '初学者可以先从较小的抬起幅度开始，专注于感受核心肌群的收缩。随着力量提升，可以逐渐增加抬起高度和保持时间。如果觉得动作太难，可以尝试简化版本：单侧交替抬起双臂或双腿来降低难度。进阶训练可以手持轻量哑铃或在最高点保持更长时间来增加挑战。', 'compound', '{"初级变体":"可以只做单侧版本，交替抬起单臂或单腿，降低动作难度","进阶变体":"可以在最高点保持10-15秒，增加核心的等长收缩训练效果","挑战变体":"可以双手持哑铃进行，或者在空中进行小幅度的击掌动作"}', 'published', NOW(3), NOW(3));
SET @eid_527 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 臀大肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('俯卧侧转', 'core', 'bodyweight', 'intermediate', NULL, '1. 准备姿势：俯卧在瑜伽垫上，双腿伸直并拢，双臂向上伸展，与肩同宽，保持身体呈直线。\n2. 收紧核心：深吸一口气，收紧腹部和背部的肌肉，确保下背部保持自然弧度，避免塌腰。\n3. 旋转动作：在保持臀部稳定不动的前提下，利用核心力量将上半身向右侧旋转约45度，左肩向左后方移动，右手仍保持向上伸展。\n4. 保持姿势：旋转到最大舒适幅度后，保持约1-2秒，感受侧腹肌的拉伸与收缩。\n5. 回到中心：缓慢放松核心，将上半身平稳恢复到俯卧起始姿势。\n6. 交替进行：按相同步骤向左旋转，完成规定的次数或时间后交替进行。', '1. 旋转幅度不宜过大，以不感到腰部疼痛或刺痛为准。\n2. 确保臀部始终贴地，避免使用腿部的力量来完成旋转。\n3. 如有腰椎间盘突出或下背疼痛，请在专业教练指导下进行，或改做幅度更小的变体。', '1. 旋转时臀部抬起或扭转，导致腰部受压。\n2. 使用手臂摆动或冲力完成动作，失去了核心主动发力的目的。\n3. 头部过度转动，导致颈椎不适。', '如果动作幅度受限，可以将双臂收至胸前或交叉放在肩部，减小旋转范围；如想增加难度，可在手中握住轻量哑铃或使用弹力带进行阻力训练。', 'compound', '{"侧卧侧转":"将身体改为侧卧姿势，单侧旋转上身，可在胸前握哑铃以提升负荷。","站姿侧转":"站立，双手抱胸或握哑铃进行侧向扭转，适合作为热身动作。"}', 'published', NOW(3), NOW(3));
SET @eid_548 = LAST_INSERT_ID();
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 多裂肌 (stabilizer)
-- Suggested muscle: 腰方肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('俯卧背伸', 'core', 'bodyweight', 'beginner', NULL, '1. 俯卧在地面或瑜伽垫上，双手放在身体两侧或轻握拳置于下巴下方，双腿伸直并拢，脚尖触地。\n2. 保持身体平直，从头部到脚尖呈一条直线，腹部和臀部收紧，避免塌腰。\n3. 吸气的同时，通过背部伸肌发力，缓慢抬起上半身，胸部离开地面，视线看向前方。\n4. 在顶峰位置略微停顿（1-2秒），感受下背部肌肉充分收缩。\n5. 呼气，缓慢控制下降速度，将上半身有控制地放回起始位置。\n6. 重复动作，建议进行8-12次，完成2-3组。', '1. 动作过程中保持核心收紧，避免过度伸展导致腰部压力过大。\n2. 下降时控制速度，不要突然放松落下，以免造成腰部扭伤。\n3. 如有腰椎间盘突出或腰部不适症状，应在专业人士指导下进行或选择其他动作替代。', '1. 抬起过高或使用惯性发力，导致腰部过度弯曲（腰椎过度前凸）。\n2. 动作速度过快，缺乏对肌肉的控制，降低训练效果并增加受伤风险。\n3. 臀部过度用力抬起，导致髋屈肌参与过多，减少背部肌肉的刺激。', '初学者可以先将抬起幅度减小至30-45度，专注于控制而非幅度；进阶者可尝试手臂伸直置于头部两侧，增加动作难度；如感腰部不适，可在腹部下方垫一个枕头或卷起的毛巾以减轻压力。', 'isolation', '{"简化":"减少抬起幅度至30度以内，或双手撑在地面减轻重量","进阶":"双手举过头顶或抱住哑铃增加阻力，或采用瑞士球俯卧背伸增强不稳定平面挑战","变体":"可转换为俯卧挺身（双臂支撑）或使用弹力带提供额外阻力"}', 'published', NOW(3), NOW(3));
SET @eid_523 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 多裂肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 半腱肌 (synergist)
-- Suggested muscle: 半膜肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 横腹肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('倾斜侧卧卷腹', 'core', 'bodyweight', 'intermediate', NULL, '1. 预备姿势：侧卧在倾斜的垫子或斜面上，保持身体从头到脚呈一直线，双腿自然伸直，双手可交叉放在胸前或轻触耳朵。\n2. 收紧核心：呼气时用力收紧腹部（尤其是侧腹），将上半身向斜上方卷起。\n3. 上卷动作：保持下背部稳定，仅让上侧肩胛骨离开地面，胸部向臀部方向卷动，感受侧腹的收缩。\n4. 顶峰收缩：在最高点停顿约1‑2秒，充分感受侧腹的收缩感。\n5. 缓慢下放：吸气，缓慢将上半身放回起始位置，保持控制，不要让身体弹回。\n6. 完成一组后换侧练习。', '1. 确保倾斜垫或斜面稳固，防止滑倒或失去平衡。\n2. 动作全程保持脊柱中立，避免过度扭转或弯腰驼背。\n3. 如有腰部、髋部或颈部不适，立即停止并咨询专业人士。', '1. 用力过猛导致身体抬起幅度过大，失去了侧腹的专注。\n2. 动作过程中出现弹跳或使用惯性，未能保持核心控制。\n3. 头部前倾或颈部过度用力，导致颈椎压力增加。', '- 初学者可以先在平面上练习侧卧卷腹，待动作熟练后再使用倾斜垫。
- 如肩部或颈部不适，可将双手放在胸前减轻颈部负担。
- 进阶者可手握轻哑铃或在胸前放置阻力带，以增加侧腹负荷。', 'isolation', '{"平躺侧卧卷腹":"将倾斜垫调至水平，改为平躺姿势，同样强调侧腹收缩。","跪姿侧卧卷腹":"改用跪姿进行侧卧卷腹，可减轻下背压力并提高核心稳定性。","交叉侧卧卷腹":"上侧手臂交叉触碰对侧膝盖，增加斜向收缩范围。"}', 'published', NOW(3), NOW(3));
SET @eid_510 = LAST_INSERT_ID();
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (agonist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 横腹肌 (stabilizer)
-- Suggested muscle: 腰方肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('农夫行走', 'core', 'dumbbell', 'beginner', NULL, '1. 起始姿势：双脚与肩同宽站立，双手各握一个哑铃，自然垂于身体两侧，保持背部挺直，核心收紧；2. 准备姿势：肩膀向后下方收紧，避免耸肩，目光平视前方，保持中性脊柱位置；3. 启动动作：先用一脚向前迈出，步伐适中（约30-40厘米），脚跟先着地；4. 继续行走：保持躯干稳定，持续交替迈步，保持哑铃紧贴身体两侧，避免左右摇晃；5. 保持呼吸：行走过程中保持均匀呼吸，不要憋气，核心保持持续紧绷状态；6. 结束动作：到达目标距离后，缓缓停下，将哑铃放回地面或休息位置。', '行走时始终保持背部挺直，避免出现弯腰驼背的情况；行走路线应保持平坦、干燥、无障碍物，防止绊倒或滑倒；如感到腰部或肩部不适，应立即停止训练并降低重量或改为徒手练习。', '耸肩或肩膀向上抬起，导致肩颈部紧张和不适；步伐过大或过小，影响身体平衡和核心稳定性的发挥；行走时头部前倾或低头看路，造成颈椎压力和身体姿态失衡。', '初学者可以从较轻的哑铃重量开始（如2-5公斤），逐步适应后再增加重量；建议在平坦地面上进行，赤脚或穿平底鞋可以增强脚部感知和平衡感；可根据体能从较短距离（如10-20米）开始，逐渐增加到30-50米或更远；如感觉难度过大，可先尝试徒手行走建立动作模式。', 'compound', '{"负重变体":"增加哑铃重量或尝试使用壶铃，以增加训练强度和挑战核心稳定性","单边变体":"只使用单侧哑铃行走，增加对核心抗旋转能力的锻炼和平衡挑战","头顶变体":"将哑铃举至肩膀高度或头顶位置，增加肩部稳定性和上肢力量要求","行进间变体":"在行走过程中加入侧向移动或绕障碍物行走，增加动作难度和功能性"}', 'published', NOW(3), NOW(3));
SET @eid_519 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 竖脊肌 (synergist)
-- Suggested muscle: 多裂肌 (synergist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 三角肌前中束 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('卷腹', 'core', 'bodyweight', 'beginner', NULL, '1. 仰卧在垫子上，双膝弯曲约90度，脚掌平放，双手轻放在胸部或交叉置于胸前；2. 收紧腹部，呼气时利用腹肌力量将上背部抬离地面，肩胛骨离开垫子，保持头部和颈部自然放松，不要用手拉头部；3. 在最高点稍微停顿（约1秒），感受腹直肌的收缩；4. 吸气，缓慢将上半身放回起始位置，保持下背部始终贴在垫子上；5. 重复动作10-15次为一套，依据个人能力调整次数和组数。', '始终保持下背部紧贴垫子，避免拱背导致腰椎压力过大；,不要用手或颈部力量抬起上半身，以免颈椎受伤；,若出现背部或颈部不适，应立即停止动作并咨询专业教练或医生。', '使用颈部或手臂的力量抬起上半身，导致颈椎受压；,动作过快，利用惯性完成次数，减弱腹肌刺激效果；,下背部抬得过高或离开垫子，使腰椎过度弯曲，增加受伤风险。', '对下背疼痛者，可在膝盖下方放一个枕头或垫子，降低动作难度；,如需增加挑战，可将双手放在耳后、交叉置于胸前或使用健身球、阻力带进行卷腹；,对于初学者，建议先从轻度卷腹（只抬起上背部几厘米）开始，逐步增加幅度和次数。', 'isolation', '{"标准卷腹":"保持胸部向膝盖方向收缩，动作幅度不宜过大，以感受腹直肌主动发力为主；","交叉卷腹":"在卷腹的同时转动躯干，使对侧肘部靠近对侧膝盖，可增强腹外斜肌的刺激；","反向卷腹":"仰卧后将臀部抬离地面，利用下腹部力量将膝盖向胸部靠拢，主要锻炼腹下部的腹直肌。"}', 'published', NOW(3), NOW(3));
SET @eid_469 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 胸锁乳突肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('卷腹器械', 'core', 'machine', 'beginner', NULL, '1. 首先调整器械的座椅高度，使垫板位置大约在胸部位置，然后调整腿部固定垫至舒适位置；2. 坐上器械，背部紧贴靠垫，双脚踩在踏板上，握住器械两侧的手柄；3. 调整好姿势后，收紧核心肌群，肩胛骨微微后收；4. 呼气时，利用腹肌力量将上半身向前卷曲，让胸部靠近大腿方向，动作过程中保持手臂微弯，不要用力拉；5. 在顶峰位置稍作停顿（约1秒），感受腹肌的充分收缩；6. 吸气时，缓慢控制地将上半身恢复至起始位置，保持腹肌的张力，避免完全放松。', '1. 运动前确保座椅和固定垫已调整到合适位置，防止运动过程中滑落；2. 选择合适的重量，从较轻负荷开始逐步增加，避免因重量过大导致动作变形或受伤；3. 保持动作控制，避免使用惯性或冲击力，特别是回放阶段要缓慢控制。', '1. 使用过大的负重，导致身体前后摆动用惯性完成动作，失去了对腹肌的刺激效果；2. 动作过程中颈部前倾或用力过猛，容易造成颈椎压力过大；3. 没有充分收缩腹肌，只是在做上半身的前后摆动，没有真正的卷腹感觉。', '1. 座椅高度调整：根据个人身高调整，确保运动轨迹舒适且能完整刺激腹肌；2. 背部靠垫角度：部分器械可调节靠背角度，可根据训练重点（前侧腹直肌或下侧腹肌）调整；3. 阻力调节：初次使用时建议从最小阻力开始，熟悉动作后逐步增加重量；4. 脚垫位置：调整到舒适位置，既要固定稳定又不能限制血液循环。', 'isolation', '{"无器械变体":"可转换为基础仰卧卷腹或悬垂卷腹，同样可以有效锻炼腹肌","其他器械变体":"可转换到倾斜板卷腹、绳索卷腹或坐姿腹肌训练机","阻力变化":"如果想增加难度，可转换为负重卷腹或腹肌轮训练"}', 'published', NOW(3), NOW(3));
SET @eid_475 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (antagonist)
-- Suggested muscle: 胸大肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃侧弯', 'core', 'dumbbell', 'beginner', NULL, '1. 双脚自然分开，与肩同宽，双手握住哑铃置于身体侧面，右手握哑铃，左手放在髋部或伸直放于体侧。\n2. 保持核心收紧，脊柱保持自然中立位，目视前方，避免前倾或后仰。\n3. 慢慢向右侧（握哑铃侧）倾斜，主要由右侧腰部的外斜肌和腰方肌发力，将哑铃沿大腿向下滑动，保持动作幅度在舒适范围内，避免过度扭转。\n4. 在最低点稍作停顿，确保肌肉保持张力，然后通过右侧腰部力量控制性回到起始姿势。\n5. 完成设定的次数后，换另一侧进行相同的动作。', '1. 确保使用合适的哑铃重量，避免因重量过大导致腰侧拉伤。\n2. 动作全程保持脊柱中立，避免出现过度前屈或后仰。\n3. 若感到腰部或背部疼痛，应立即停止并调整姿势或降低重量。', '1. 使用过大的哑铃导致身体摆动，无法保持核心稳定。\n2. 动作时弯腰驼背或向前倾，使腰椎承受额外压力。\n3. 侧弯幅度过大，超出舒适范围，容易导致肌肉拉伤。', '1. 初学者可以先使用轻重量或水瓶练习，以掌握动作轨迹。
2. 如有腰部不适，可改为坐姿侧弯或使用弹力带进行侧向拉伸。
3. 进阶时可双手各握哑铃进行交替侧弯，提高核心抗旋转需求。', 'isolation', '{"站姿哑铃侧弯":"若没有哑铃，可用矿泉水瓶、哑铃套装中的轻重量或壶铃代替；若想增加难度，可改为侧向卷腹或侧向俄罗斯转体。"}', 'published', NOW(3), NOW(3));
SET @eid_505 = LAST_INSERT_ID();
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 腰方肌 (agonist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 脊柱伸肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃背伸', 'core', 'dumbbell', 'intermediate', NULL, '1. 俯卧在罗马椅或训练凳上，髋部支撑在凳缘，腹部贴紧凳面，双脚固定在支撑垫下方，双手各持哑铃于胸前。2. 保持身体平直，从髋关节处开始屈曲，让上半身缓慢向下移动，直至躯干与地面接近平行。3. 在最低点停顿1-2秒，感受下背部的牵拉。4. 通过下背部和臀大肌发力，将身体向上抬起，恢复到起始位置。5. 在动作顶端收紧臀部，短暂挤压后继续下一次重复。', '1. 动作全程保持核心紧绷，避免腰部过度弓起导致椎间盘压力过大。2. 选择适当重量的哑铃，避免因重量过大而在起身时弓背。3. 若感到腰部不适或疼痛，应立即停止动作并检查姿势。', '1. 动作速度过快，利用惯性完成动作，降低训练效果且增加受伤风险。2. 腰部过度弯曲或弓背，导致下背部压力过大。3. 使用过重哑铃，身体无法保持正确姿势，影响动作质量。', '新手可先徒手练习，待动作熟练后再逐步增加哑铃重量。初学者建议从2-3公斤开始，适应后每周增加0.5-1公斤。进阶者可双手持哑铃增加难度，也可改用单手持哑铃进行不对称训练。若场地限制没有罗马椅，可用长凳代替但需确保身体稳定。', 'compound', '{"无器材变体":"可徒手进行背伸练习，难度相对较低","杠铃变体":"可使用杠铃片置于胸前增加负荷，负荷更大","固定器械":"可使用专门的背伸器械，提供稳定支撑","单侧变体":"单手持哑铃进行，可增强核心抗旋转能力"}', 'published', NOW(3), NOW(3));
SET @eid_529 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腹直肌 (antagonist)
-- Suggested muscle: 多裂肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('器械举腿', 'core', 'machine', 'beginner', NULL, '1. 先调整器械的座位高度，使垫子紧贴大腿后侧，膝盖保持轻微弯曲，背部自然靠在靠背上。\n2. 双手握住把手或扶手，确保上半身稳定，肩部放松。\n3. 吸气的同时收紧核心，缓慢抬起双腿至与地面平行或略高于水平位置，保持膝盖微屈。\n4. 在最高点稍作停顿，感受腹部和髂腰肌的收缩，确保动作受控。\n5. 呼气，缓慢放下双腿，回到起始姿势，避免猛然下落，保持动作的全程控制。\n6. 完成预定次数后，回到起始姿势，松手并适当放松。', '确保器械稳固、重量合适，并在使用前检查所有调节装置是否锁紧。,动作全程保持背部紧贴靠背，避免用力过猛导致腰椎受伤。,如出现下背部或髋部不适，应立即停止并调整姿势或降低抬起幅度。', '动作幅度过大，膝盖过度伸展或抬腿过高，导致腰椎过度弯曲。,使用惯性快速摆动双腿，而不是在控制速度下完成动作。,上半身（肩膀、手臂）过度用力，导致核心稳定性下降。', '若下背部疼痛，可将抬腿幅度降低至约30‑45度，减轻腰椎负担。,调整垫子位置，使髋部能够自然屈曲，从而更好地孤立髂腰肌。,初学者可先使用机器的助力模式或减小配重，以熟悉动作轨迹。', 'isolation', '{"站姿举腿":"可在站立姿势下使用哑铃或徒手进行类似动作，增加对核心稳定性的需求。","坐姿举腿":"在坐姿器械上完成，主要侧重髂腰肌的孤立训练，适合想要更精准刺激腹部的练习者。"}', 'published', NOW(3), NOW(3));
SET @eid_492 = LAST_INSERT_ID();
-- Suggested muscle: 髂腰肌 (agonist)
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜肌 (stabilizer)
-- Suggested muscle: 阔筋膜张肌 (synergist)
-- Suggested muscle: 竖脊肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('坐姿抬腿卷腹', 'core', 'bodyweight', 'intermediate', NULL, '1. 坐在平地或垫子上，双脚平放，膝盖弯曲约90度，双手放在身体两侧或交叉置于胸前，以提供支撑。\n2. 收紧核心（腹横肌），保持背部挺直，避免弓背或塌腰。\n3. 吸气后，在呼气的同时，将双腿抬起，膝部保持微屈，髋关节屈曲，使大腿向胸部靠近，同时利用腹部力量将上半身微微向前倾。\n4. 在动作最高点，稍微停顿并收紧腹肌，感受腹部的挤压感。\n5. 吸气，缓慢放低双腿回到起始位置，保持动作的受控性，避免猛然弹回。\n6. 重复完成设定的次数或时间，保持呼吸与动作的同步。', '确保下背部始终贴紧地面或垫子，以防止腰椎过度弯曲导致受伤。,动作全程保持缓慢、受控，避免使用冲力摆动双腿。,若感到颈部或背部不适，可将双手放在脑后或置于胸前以减轻颈部压力。', '在抬腿时用力猛拉或利用惯性弹回，导致腹肌受力减弱且增加腰背压力。,上半身过度前倾或后仰，失去核心的稳定支撑，出现弓背或塌腰现象。,膝盖完全伸直，导致髋屈肌过度紧张，影响动作的安全性。', '如需降低难度，可将双脚放在地上，仅做上半身的卷腹；如想增加挑战，可在抬腿的同时保持双腿伸直，或在手握哑铃置于胸前进行负重练习。', 'compound', '{"站姿抬腿卷腹":"在站立姿势下，双手扶墙或扶把，将膝盖抬至胸部，可增强髋屈肌的参与度。","仰卧抬腿卷腹":"在仰卧姿势下进行，可更好控制背部贴地，适合初学者或腰椎有问题的人群。","负重坐姿抬腿卷腹":"手握哑铃或杠铃片置于胸前，增加腹部负荷，提高强度。"}', 'published', NOW(3), NOW(3));
SET @eid_488 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 髂腰肌（髂肌、腰大肌） (synergist)
-- Suggested muscle: 竖脊肌 (antagonist)
-- Suggested muscle: 胸锁乳突肌 (stabilizer)
-- Suggested muscle: 臀大肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('垂悬单腿举', 'core', 'bodyweight', 'advanced', NULL, '1. 双手正握单杠，握距与肩同宽或略宽，双臂完全伸直，身体自然悬垂，肩膀放松下沉。\n2. 核心收紧，肩胛骨轻微下沉固定，避免耸肩。双腿并拢伸直，脚尖朝前。\n3. 保持身体稳定，通过腹肌发力带动一侧腿向前上方抬起，避免利用惯性或摇摆。\n4. 继续抬起直到双腿与地面平行或略高于水平位置，骨盆保持中立不要后倾。\n5. 在最高点略微停顿1-2秒，感受核心肌群的顶峰收缩。\n6. 缓慢控制地将腿放下回到起始位置，保持躯干稳定，避免摇晃或自由落体。完成目标次数后换另一侧腿进行。', '1. 进行动作前确保单杠稳固可靠，能够承受体重和动态负荷。\n2. 避免在动作过程中大幅摇摆身体或利用惯性，这会增加下背部和肩部受伤风险。\n3. 若出现肩部不适或下背部疼痛，应立即停止并改为更简单的变体动作。', '1. 身体过度前后摆动，借助惯性抬腿，降低训练效果且增加受伤风险。\n2. 抬腿时骨盆明显后倾（骨盆翻转），导致下背部过度弯曲，应保持骨盆稳定中立。\n3. 动作速度过快，缺乏对肌肉的控制，应在离心阶段也保持良好控制。', '初学者可先从悬垂屈膝抬腿开始练习，逐步过渡到直腿版本；如果此动作过难，可借助TRX悬挂训练带或辅助器械降低难度；进阶者可尝试单腿画圈或保持最高位置更长时间以增加挑战。', 'compound', '{"降阶变体":"悬垂屈膝抬腿（膝盖弯曲90度）、辅助单杠抬腿（对侧脚踏辅助带）","进阶变体":"悬垂单腿画圈、悬垂举腿保持、悬垂双腿举（增加难度）","替代动作":"仰卧举腿、TRX悬挂单腿提膝、平板支撑变体"}', 'published', NOW(3), NOW(3));
SET @eid_490 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)
-- Suggested muscle: 股四头肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('壶铃侧向卷腹', 'core', 'dumbbell', 'intermediate', NULL, '1. 起始姿势：站立，双脚与肩同宽，双手握住壶铃的把手一侧，将壶铃举至胸前位置，保持核心收紧；2. 身体倾斜：向右侧倾斜身体，同时将壶铃向右侧下方移动，右腿略微弯曲，重心移至右腿；3. 卷腹发力：收紧右侧腹斜肌，将右肘向右侧膝盖方向卷起，壶铃随之向下移动，感受到腹斜肌的收缩；4. 顶峰收缩：在动作底部位置停留1-2秒，充分感受腹斜肌的顶峰收缩，然后控制速度缓慢还原；5. 换边完成：完成右侧指定的次数后，换到左侧重复相同的动作。', '在整个动作过程中保持脊柱中立，避免过度扭转或前倾导致下背部压力过大；选择适当的壶铃重量，初期以轻重量开始确保动作质量；保持呼吸节奏，发力时呼气，还原时吸气，避免憋气导致头晕。', '动作幅度过大导致身体过度前倾或后仰，无法有效锻炼腹斜肌；使用过重重量导致借力，动作变形，核心肌群无法充分参与；动作速度过快，缺乏对目标肌肉的控制，降低训练效果并增加受伤风险。', '初学者可将壶铃置于胸前进行徒手侧向卷腹，熟练后再逐渐增加负重；可将双脚改为前后站立姿势增加稳定性；降低难度可使用较轻的哑铃替代壶铃进行练习。', 'isolation', '{"降阶变体":"徒手侧向卷腹，双手交叉放于胸前或置于耳侧，不使用器材","升阶变体":"双手持壶铃进行交替侧向卷腹，增加动作幅度和训练强度","器材替换":"可使用哑铃或药球替代壶铃进行相同动作，注意调整握法"}', 'published', NOW(3), NOW(3));
SET @eid_511 = LAST_INSERT_ID();
-- Suggested muscle: 腹外斜肌 (agonist)
-- Suggested muscle: 腹内斜肌 (agonist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 臀中肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('失衡训练', 'core', 'other', 'intermediate', NULL, '1. 站在平衡训练设备（如平衡板、BOSU球或平衡垫）上，双脚与肩同宽，保持平稳呼吸。\n2. 收紧核心肌群（腹部、背部），保持脊柱中立位，目视前方一点以维持平衡感。\n3. 慢慢屈膝下蹲至约90度，同时保持身体重心稳定，避免过度前倾或后仰。\n4. 在最低点保持2-3秒，感受核心肌群的持续收缩和身体的平衡控制。\n5. 通过脚掌发力，缓慢伸直双腿回到起始站立姿势，保持核心持续紧张。\n6. 重复动作至规定次数或保持平衡一定时间（如30-60秒），整个过程中保持呼吸平稳。', '1. 在训练区域周围预留足够安全空间，靠近墙壁或扶手以便失去平衡时可以及时抓住。\n2. 穿着防滑运动鞋或赤脚训练，确保脚底有良好的抓地力，避免在不稳定表面上滑倒。\n3. 如果感到头晕或失去平衡，立即降低难度或停止训练，避免强行坚持导致受伤。', '1. 膝盖内扣（膝外翻）：下蹲时膝盖向内倾斜，增加膝关节压力，应保持膝盖与脚尖方向一致。\n2. 腰部过度前倾：为了降低身体重心而过度弯腰，导致下背部压力增大，应始终保持脊柱中立位。\n3. 核心未激活：训练时核心松散，身体晃动明显，应在动作全程始终保持腹部收紧的感觉。', '降低难度：双脚站在稳定平面上训练，双手扶墙或栏杆辅助平衡；进阶难度：单脚站立在平衡设备上，或闭眼训练以增强本体感受；替代方案：可用平衡垫或折叠的瑜伽垫放在稳定地面上进行类似训练。', 'compound', '{"单脚变体":"将双脚站立改为单脚站立，可增强髋关节稳定性和踝关节力量，同时提高平衡挑战难度。","闭眼变体":"在保持正确姿势的基础上闭眼训练，利用本体感觉替代视觉来维持平衡。","动态变体":"在保持平衡的同时加入上肢动作（如手臂上举、侧平举）或下肢动作（如抬腿），增强动作协调性。","负重变体":"双手持哑铃或杠铃片进行训练，增加核心抗旋转和抗屈曲的难度。"}', 'published', NOW(3), NOW(3));
SET @eid_541 = LAST_INSERT_ID();
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 多裂肌 (agonist)
-- Suggested muscle: 竖脊肌 (synergist)
-- Suggested muscle: 臀中肌 (synergist)
-- Suggested muscle: 臀小肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 腓肠肌 (stabilizer)
-- Suggested muscle: 胫骨前肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('平板交替抬腿', 'core', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：采用高位平板支撑，双手撑地或前臂支撑，身体从头到脚呈一条直线，核心收紧。\n2. 保持核心紧绷，收腹、收紧臀部，避免腰部下沉或臀部抬起。\n3. 交替抬起左腿至与地面大致平行，腿保持伸直，抬腿时呼气。\n4. 抬腿过程中保持髋部稳定，避免髋部旋转或侧倾，保持身体一直线。\n5. 抬至最高点后稍作停顿，然后缓慢放下回到起始姿势，吸气。\n6. 完成指定次数或时间后，缓慢放松回到平板支撑姿势，休息。', '保持核心收紧，避免腰部下沉导致腰椎过度压力。,若手腕或肩部不适，可改用前臂支撑，减轻关节负担。,确保训练地面平整稳固，防止滑倒或受伤。', '臀部抬得过高形成V形，使下背过度伸展，增加腰伤风险。,抬腿时髋部旋转或侧倾，导致核心不稳定。,动作速度过快，忽视呼吸和肌肉控制，导致效果降低。', '初学者可先做单侧抬腿或降低抬腿幅度，逐步适应。,如需增加难度，可在抬腿的同时抬起对侧手臂，形成交叉平板。,对肩部不适者可使用前臂支撑，降低肩关节压力。', 'compound', '{"变体类型":"单侧平板抬腿","转换建议":"若想增加核心挑战，可改为单侧平板抬腿，即每次只抬起一条腿，保持另一侧支撑；若想降低难度，可改为跪姿抬腿或使用弹力带辅助。"}', 'published', NOW(3), NOW(3));
SET @eid_495 = LAST_INSERT_ID();
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 竖脊肌 (antagonist)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 臀中肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('平板支撑', 'core', 'bodyweight', 'beginner', NULL, '1. 俯卧在地上，双手撑地，手肘弯曲约90度，位于肩膀正下方，双脚脚尖着地支撑身体。\n2. 收紧腹部肌肉，将身体从头部到脚跟保持在一条直线上。\n3. 头部保持自然位置，目光向下看，手臂和肩膀保持稳定。\n4. 保持均匀呼吸，腹部持续收紧，不要憋气。\n5. 保持这个姿势，根据个人能力维持30秒至2分钟不等。\n6. 完成后弯曲膝盖着地，逐步放松身体。', '1. 保持脊柱中立位，避免腰部塌陷或过度拱起，以免造成下背部压力过大。\n2. 肩部、肘部和手腕有伤痛者，建议在手肘下方垫上软垫或改为跪姿平板支撑。\n3. 如感到腰部或肩部疼痛，应立即停止练习，不要强行坚持。', '1. 塌腰：臀部下降导致下背部过度弯曲，增加腰椎压力。\n2. 头部位置错误：抬头或低头导致颈椎压力增加。\n3. 臀部过高或过低：身体无法保持直线，影响核心锻炼效果。', '初学者可以缩短支撑时间至20-30秒，或采用膝盖着地的简化版；进阶者可以尝试单手平板支撑、单腿抬起或配合动态动作增加难度。', 'compound', '{"简化版":"改为膝盖支撑的平板支撑，减少身体负荷","进阶版":"单手单腿平板支撑或侧平板支撑增加难度","动态变体":"加入移动或转体动作，如平板支撑交替抬腿"}', 'published', NOW(3), NOW(3));
SET @eid_512 = LAST_INSERT_ID();
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (antagonist)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('平板支撑侧抬腿', 'core', 'bodyweight', 'intermediate', NULL, '1. 从高位平板支撑姿势开始，双手撑地，身体保持直线，肩膀在手腕正上方。\n2. 收紧核心，保持身体稳定，左腿保持伸直并紧贴地面。\n3. 吸气的同时，左侧臀部外侧用力，将左腿向侧面抬起至约45度，保持膝关节不弯曲。\n4. 在最高点保持1-2秒，感受核心和臀部外侧的收缩。\n5. 呼气，缓慢将左腿放回起始位置，保持身体不摇晃。\n6. 完成预定次数后换右侧重复。', '1. 进行侧抬腿时要保持核心收紧，避免腰部下沉或拱背。\n2. 若感到肩部或手腕不适，可改用前臂支撑或使用垫子。\n3. 避免在软组织受伤或肩部、腰部有明显疼痛时进行此动作。', '1. 侧抬腿时膝盖弯曲或脚尖外翻，导致髋外展肌不够激活。\n2. 在抬腿过程中身体左右晃动，失去平板支撑的稳定性。\n3. 抬腿幅度过大或过小，无法有效刺激目标肌群。', '如果侧抬腿难度过高，可先在跪姿侧抬腿或使用弹力带辅助；若想增加挑战，可在抬腿时在踝部夹一个轻哑铃或在支撑手下放置不稳定的垫子。', 'compound', '{"跪姿侧抬腿":"从高位平板改为跪姿侧抬腿可降低核心稳定要求，适合初学者。","弹力带侧抬腿":"在踝部套上弹力带增加阻力，强化臀中肌和髋外展肌。","负重侧抬腿":"在脚踝处挂轻哑铃提升难度，适合高级训练者。"}', 'published', NOW(3), NOW(3));
SET @eid_516 = LAST_INSERT_ID();
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 内斜肌 (agonist)
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 臀中肌 (synergist)
-- Suggested muscle: 臀小肌 (synergist)
-- Suggested muscle: 股外侧肌 (synergist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 肩袖肌群 (stabilizer)
-- Suggested muscle: 菱形肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('平板支撑保持', 'core', 'bodyweight', 'beginner', NULL, '1. 采用俯卧姿势，双脚并拢，脚尖抵地，双手撑在肩膀正下方的地面上，手指向前，手臂伸直。\n2. 收紧腹部、臀部和大腿，使身体从头到脚保持一条直线，避免塌腰或拱背。\n3. 保持呼吸平稳，目视地面或稍向前，保持颈部自然延伸，不要抬头或低头。\n4. 保持此姿势，建议初学者持续20-30秒，随着力量提升可逐渐延长时间至1分钟或更久。\n5. 完成支撑后，缓慢放松，回到俯卧姿势，进行适当的伸展放松。', '1. 若手腕或肩膀有不适感，可改用前臂支撑（肘板）来降低腕关节负担。\n2. 在支撑过程中，避免出现腰部塌陷或臀部抬高的现象，这会导致腰椎过度受压。\n3. 初期练习时应在平稳、不滑的地面上进行，以免滑倒或姿势不稳。', '1. 腰部下沉（塌腰），导致腰椎压力增大。\n2. 臀部抬得过高，形成拱形，背部未能保持平直。\n3. 头部过度抬起或低头，使颈部肌肉紧张，失去核心稳定的效果。', '针对不同水平可进行以下调整：
- 初学者：采用膝部支撑的“膝板”，或在镜子前观察身体姿态，确保直线。
- 进阶者：在保持平板支撑的基础上，进行单臂或单腿抬起，增加核心负荷。
- 高级者：尝试动态平板支撑（如侧向移动、手臂交叉抬起），提升稳定性和协调性。', 'compound', '{"肘板支撑":"将双手撑地改为双肘撑地，保持身体平直，适合手腕不适者。","膝板支撑":"膝盖触地，双脚抬起，减轻核心负荷，适合初学者或产后恢复。","侧板支撑":"身体侧向支撑，单臂或单侧脚支撑，针对腹斜肌和腰部侧向稳定。","动态平板支撑":"在保持平板姿势的同时，进行手臂或腿部抬起，提升核心力量和协调性。"}', 'published', NOW(3), NOW(3));
SET @eid_534 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 横腹肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (synergist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 股四头肌 (stabilizer)
-- Suggested muscle: 肩部三角肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('悬垂举腿转体', 'core', 'bodyweight', 'advanced', NULL, '1. 抓住单杠，双手与肩同宽，身体自然悬垂，肩部略微收紧。\n2. 保持躯干稳定，收腹，然后屈膝抬起双腿，使膝盖靠近胸部，约90度角。\n3. 在抬腿到最高点时，利用腹肌和斜方肌的力量将双腿向一侧旋转，同时保持髋部不左右摆动。\n4. 完成一次完整的旋转后，缓慢回到双腿伸直的悬挂姿势，重复动作至另一侧。\n5. 整个动作保持控制，避免借助摆动或惯性。\n6. 完成后，轻放双腿回到自然悬垂，稍稍放松肩部。', '在开始前确保单杠牢固固定，避免坠落受伤。,动作全程保持肩部收紧，防止肩关节受压或脱臼。,如出现腰部或髋部疼痛，应立即停止并请教专业人士。', '使用摆动带动双腿，导致动作失去核心刺激并增加受伤风险。,在旋转时让髋部大幅摆动，使得旋转力量来自臀部而非核心。,膝盖未完全伸展或在抬腿时弓背，导致腰椎过度屈曲。', '初学者可以先练习不旋转的悬垂举腿，待力量提升后再加入转体。,如果肩部不适，可在肘部套上护具或使用阻力带辅助。,可将动作拆分为两步：先举腿至90度，再进行转体，以便更好地控制动作。', 'compound', '{"变体类型":"可把转体改为侧面举腿（侧向悬垂举腿）或在地面上做仰卧抬腿转体，以适应不同训练环境。"}', 'published', NOW(3), NOW(3));
SET @eid_546 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('悬垂侧举腿', 'core', 'bodyweight', 'intermediate', NULL, '1. 抓住高挂的横杆，双手与肩同宽，手掌朝前或相对，保持肩部放松。\n2. 起始姿势：身体悬空，双腿自然下垂，核心收紧，背部挺直。\n3. 吸气准备，呼气时用力收缩腹斜肌和髂腰肌，同时将双腿向侧面抬起至与地面平行或略高位置，保持膝盖伸直或微屈。\n4. 在最高点稍作停顿，感受侧腹的收缩。\n5. 吸气时缓慢控制下降，回到起始位置，保持核心始终紧绷，避免摇晃。\n6. 重复完成设定的次数。', '练习前确保横杆或悬挂装置足够坚固，能够承受全身重量。,动作全程保持肩胛骨稳定，避免耸肩导致肩关节受伤。,若出现腰部不适或下背部疼痛，应立即停止并降低动作幅度或改用辅助器械。', '使用惯性摆动而不是主动收缩腹斜肌，导致效果减弱并增加受伤风险。,在抬腿时膝盖过度弯曲或利用股四头肌，使目标肌肉刺激不足。,下降过程过快或失去核心控制，导致腰椎过度前屈或摆荡。', '初学者可将膝盖稍微弯曲以降低难度，或使用阻力带辅助；进阶者可在最高点加入小幅转体或保持单侧悬停以提升挑战。若肩部不适，可在肘部放置护垫或改用吊环。', 'compound', '{"使用侧举带":"将侧举带固定在横杆上，双手握住带子进行侧举腿，可减少肩部负担并改变发力角度。","侧举转体":"在侧举腿的最高点加入小幅转体动作，增强腹斜肌的收缩力度。","侧举膝举":"如果直腿侧举难度过大，可改为膝盖弯曲的侧举，保持核心激活的同时降低难度。"}', 'published', NOW(3), NOW(3));
SET @eid_499 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (agonist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 股直肌 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 肩部前束 (stabilizer)
-- Suggested muscle: 胸大肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('战绳核心训练', 'core', 'other', 'advanced', NULL, '1. 站姿准备：双脚与肩同宽，膝盖微屈，保持核心紧绷，双手握住战绳的末端，手臂自然下垂。\n2. 起始动作：肩膀发力，将战绳向上挥起，同时利用腹部的收缩将身体微微后仰，形成波浪形的起始点。\n3. 产生波浪：快速而有节奏地将战绳向下甩，利用腹肌和背部的协同收缩产生强烈的上下波动，确保波浪幅度大且连贯。\n4. 维持核心稳定：在整个动作过程中，保持胸腔略微收紧，避免过度弓背或塌腰，以防止腰椎受伤。\n5. 完成循环：完成一次完整的上下波动后，立即重复，保持呼吸与动作同步（吸气上升，呼气下落）。\n6. 结束动作：在预定的训练时间或次数后，缓慢降低力度，收回战绳至静止状态，防止因突然停止导致的肌肉抽筋。', '1. 训练前务必进行5-10分钟的热身，尤其是核心和肩部的动态拉伸，以降低受伤风险。\n2. 若出现腰部或肩部不适，应立即停止动作并调整姿势或减少波动幅度。\n3. 避免在地面不平或滑动的环境中使用战绳，以防跌倒。', '1. 只用手臂发力而忽视核心的收缩，导致肩部过度负担。\n2. 动作幅度过小、节奏不连贯，无法产生有效的波浪阻力。\n3. 在训练时弓背或塌腰，增加腰椎压力，易导致腰背部疼痛。', '对于初学者，建议先从站姿波动、短时间（约20秒）开始，逐步延长至30-45秒；若想增加难度，可在波动的同时加入横向交叉或单臂交替动作，以进一步激活核心深层肌群。', 'compound', '{"站姿波动":"保持核心紧绷，手臂以肩为轴做大幅度上下波动，可提升心肺耐力并强化整体核心力量。","双手交叉波":"在站姿波动基础上加入双手交叉动作，使核心在横向旋转时受到更大挑战，适合高级训练者提升核心稳定性。","单臂交替波":"单手握绳交替进行上下波动，可增强核心不对称抗旋力量，适用于需要侧向控制的专项训练。"}', 'published', NOW(3), NOW(3));
SET @eid_537 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 髂腰肌 (stabilizer)
-- Suggested muscle: 肩部三角肌（前束） (synergist)
-- Suggested muscle: 胸大肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('拉力器卷腹', 'core', 'cable', 'intermediate', NULL, '1. 调整拉力器高度至胸部正上方，装上绳索或V形把手，双手握住手柄，手臂自然伸展，肩胛骨轻微后收。\n2. 双脚与肩同宽站立，膝盖微屈，保持身体稳定，目视前方。\n3. 吸气时，通过腹部的收缩将上半身向下卷曲，使胸骨向骨盆靠近，保持手臂角度不变，仅用腹部发力。\n4. 在卷腹的顶点（大约胸部靠近大腿），保持收缩1-2秒，感受腹直肌的紧绷。\n5. 呼气时，缓慢控制地将身体恢复到起始姿势，保持背部自然伸展，避免猛拉或利用惯性。\n6. 完成指定次数后，缓慢放松手柄，防止绳子弹回造成伤害。', '调整合适的配重，避免使用过重导致腰部过度屈曲或背部下沉。,确保拉力器的绳索完好、把手稳固，防止意外弹回。,动作全程保持背部自然曲线，避免过度弓背或前倾，以免椎间盘受压。', '使用过大配重导致通过摆动而非腹肌发力。,在卷腹时手臂伸展过度或肘部过度弯曲，导致前臂参与过多。,动作全程头部前倾或颈部过度紧张，导致颈椎不适。', '可根据个人身高调节绳索长度，使手柄在胸部正上方；膝盖弯曲角度可根据下背部舒适度适度调整；若感觉下背压力过大，可改为跪姿或双脚略宽站姿，以减轻腰椎负担。', 'isolation', '{"跪姿拉力器卷腹":"将膝盖放在软垫上，躯干保持直立，适用于下背不适者，可减轻腰椎负担。","站姿拉力器卷腹":"双脚并拢站立，增加核心稳定性需求，适用于想要更高难度的训练者。","单臂拉力器卷腹":"只使用单侧手握住把手，可强化斜向腹肌并提升核心不平衡的感知。"}', 'published', NOW(3), NOW(3));
SET @eid_476 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 脊柱竖肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('核心循环训练', 'core', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：仰卧于地面，双腿屈膝，双脚平放地面，与肩同宽，双手轻触耳侧或交叉放于胸前。\n2. 第一个动作-卷腹：呼气时收紧腹肌，将上背部抬离地面，注意下背部保持贴地，抬至肩胛骨离开地面即可。\n3. 第二个动作-自行车卷腹：上半身微微抬起，双腿交替进行类似蹬自行车的动作，同时对侧肘部尽量靠近对侧膝盖。\n4. 第三个动作-平板支撑：回到俯卧姿势，前臂撑地，身体保持一条直线，腹部收紧，臀部不要塌陷或拱起，保持30-60秒。\n5. 第四个动作-登山者：保持平板支撑姿势，交替将膝盖快速向胸部方向提送，保持核心稳定，臀部不要过度上下晃动。\n6. 完成所有动作后短暂休息30秒，然后重复整个循环2-3组。', '1. 进行核心训练时保持正常呼吸，不要憋气，以免血压升高。\n2. 如有腰椎间盘突出或腰部不适，应在专业教练指导下进行或选择低强度变体。\n3. 确保训练地面平整且有适当缓冲，避免在坚硬地面长时间训练造成腰背压力。', '1. 颈部过度用力：头部前倾或用力过猛会导致颈椎压力过大，应保持下巴微收，目光看向腹部方向。\n2. 下背部离地：卷腹时过度抬起上半身会导致下背部离开地面，增加腰椎负担，应控制动作幅度。\n3. 动作过快：核心训练应以控制为主，过快会导致代偿和减少肌肉激活，建议每个动作2-3秒完成。', '初学者可以减少每个动作的持续时间或减少循环次数，专注于动作质量而非数量；进阶者可以增加每个动作的持续时间、减少休息时间或加入负重；对于腰椎有问题的练习者可以将平板支撑改为跪姿平板支撑，将登山者改为缓慢的腿部伸展。', 'compound', '{"增加难度":"可以增加每个动作的持续时间、减少组间休息时间、加入负重背心或增加循环次数。","降低难度":"可以减少动作数量、延长休息时间、每个动作分开练习，待基础稳定后再进行循环训练。","器械转换":"可尝试在平板支撑时在背部放置杠铃片增加负重，或在卷腹时使用阻力带增加腹部挑战。"}', 'published', NOW(3), NOW(3));
SET @eid_542 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 多裂肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('瑜伽球卷腹', 'core', 'other', 'intermediate', NULL, '1. 起始姿势：坐在瑜伽球上，双脚平放于地面，肩胛骨靠在球的上部。\n2. 慢慢向后倾斜身体，使背部贴在球上，保持膝盖略微弯曲，脚尖轻轻着地以维持平衡。\n3. 双手交叉放在胸前，或轻扶头部两侧，保持颈部自然放松。\n4. 收紧腹肌，向上卷起上半身，使肩胛骨离开球面，胸部向膝盖方向靠拢，感受腹直肌的主动收缩。\n5. 在顶峰位置保持1-2秒的收缩，然后慢慢放低身体回到起始姿势，保持动作的平稳控制。\n6. 重复进行8-12次为一次训练组，根据个人能力可适当调整次数。', '1. 确保瑜伽球充气适当且放在防滑垫上，防止在动作过程中球滑动导致失衡。\n2. 动作全程保持核心收紧，避免用颈部或手臂力量猛拉头部，以防止颈椎受伤。\n3. 若感到腰部不适或出现刺痛，应立即停止动作并调整姿势或降低动作幅度。', '1. 使用过度的颈部力量拉动头部，导致颈椎受压。\n2. 在卷腹时背部离开球面的幅度过大，使腰椎过度弯曲，增加下背部受伤风险。\n3. 动作速度过快，缺乏对腹肌的离心控制，导致训练效果下降。', '如感到颈部不适，可将双手放在胸部或轻轻扶住头部两侧而不施加力量；若核心力量不足，可先采用膝盖支撑的球上卷腹或降低后倾角度；想要增加难度，可在卷腹时加入转体动作或抬起单腿。', 'isolation', '{"变体类型":"难度降低时，可在平地上进行标准卷腹；难度提升时，可在球上进行单臂单腿卷腹或在卷腹顶部加入旋转动作"}', 'published', NOW(3), NOW(3));
SET @eid_474 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 横腹肌（腹横肌） (stabilizer)
-- Suggested muscle: 胸锁乳突肌 (stabilizer)
-- Suggested muscle: 竖脊肌（下背部） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('登山者', 'core', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：双手撑地，肩膀正对手腕，身体呈一条直线，腹部收紧，保持核心稳定。\n2. 抬起右膝：吸气的同时将右膝向胸部靠近，尽量让膝盖靠近但不要碰到地面，保持髋部水平。\n3. 快速切换：呼气并将右腿伸直回到起始位置，同时将左膝抬起向胸部靠拢。\n4. 交替进行：保持交替抬膝的节奏，保持核心持续发力，身体保持平板姿势，避免臀部下沉或抬高。\n5. 完成目标次数或时间：可设定时间（如30秒）或次数（如每侧12‑15次），完成后轻柔落地休息。', '1. 保持肩膀、肘部略微弯曲，避免锁死关节导致受伤。\n2. 进行前先进行适当热身，特别是核心和髋屈肌，以防止拉伤。\n3. 若出现背部或腰部不适，应立即停止并调整姿势或降低强度。', '1. 臀部抬得过高或下沉，导致核心失去有效刺激并增加腰部压力。\n2. 动作过快或使用冲力，导致姿势不稳和潜在伤害。\n3. 肩膀向前倾斜或塌背，使肩部过度承担负荷。', '初学者可先在高位支撑（如把手放在台阶上）进行，以减轻核心负担；进阶者可在保持平板支撑的同时进行交叉步或加入侧向登山者以提升难度。', 'compound', '{"慢速登山者":"将动作放慢至每侧4秒完成，以加强核心控制和肌肉耐力。","交叉登山者":"在抬膝的同时让对侧手肘轻触膝盖，提升协调性和斜腹肌参与。","侧向登山者":"在保持侧向支撑的同时交替抬膝，针对腹斜肌进行额外刺激。"}', 'published', NOW(3), NOW(3));
SET @eid_535 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 胸大肌 (stabilizer)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 臀大肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('真空腹', 'core', 'bodyweight', 'intermediate', NULL, '1. 预备姿势：站立或坐姿，保持背部挺直，双脚与肩同宽，膝盖微屈。\n2. 吸气准备：深吸一口气，感受胸腔扩张，肩膀放松。\n3. 呼气收缩：慢慢呼气，想象把肚脐向脊椎方向拉，形成“真空”状态，保持腹部收紧。\n4. 保持位置：在保持呼吸的同时，尽量保持胸部不下沉，保持核心紧绷 5‑10 秒。\n5. 放松恢复：慢慢吸气，让腹部恢复原位，重复进行。', '- 避免用力过度导致头晕或血压升高。\n- 若有背部或腰部不适，动作幅度应适当减小。\n- 练习时保持呼吸顺畅，切勿憋气。', '- 吸气时腹部鼓起而非收紧，导致无法形成真空。\n- 动作时胸部和肩膀上抬，导致姿势不稳。\n- 练习时忽视盆底肌的协同收缩，导致核心激活不足。', '初学者可先在仰卧姿势下练习，双手放在腹部两侧感受收缩；进阶后可尝试站立、坐姿或靠墙完成，以增强对姿势的控制。', 'isolation', '{"坐姿真空腹":"在椅子上坐直，双手放在大腿上，按相同步骤进行，有助于减轻腰部压力。","俯卧真空腹":"面朝下趴在地上，用手肘支撑上半身，进行真空腹动作，适合初学者练习核心控制。","站立真空腹":"站立保持自然姿势，背部贴墙，进行腹式吸入，可增强姿势感知。"}', 'published', NOW(3), NOW(3));
SET @eid_515 = LAST_INSERT_ID();
-- Suggested muscle: 横腹肌（腹横肌） (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 盆底肌群 (synergist)
-- Suggested muscle: 膈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('站姿侧弯', 'core', 'bodyweight', 'beginner', NULL, '1. 站直，双脚与肩同宽，双手自然垂放在身体两侧或轻触髋部。\n2. 吸气时，将右手向上举起，手掌靠近耳朵，或将手臂伸向头部上方，以增加侧向拉伸感。保持左脚稳固踩地。\n3. 慢慢向左侧倾斜身体，目光保持正前方，髋部不要向前或向后移动，确保脊柱保持自然曲线。\n4. 在侧弯的顶点稍作停顿（约1-2秒），感受右侧腹斜肌的收紧与左侧腰方的拉伸，然后呼气，缓慢将身体恢复到直立姿势。\n5. 完成设定的次数后，换另一侧（左侧举起右手，向右侧倾斜）进行相同动作，保持呼吸和动作的连贯性。', '确保双脚均匀踏实地面，避免因脚部滑动导致扭伤。,侧弯时不要让腰部过度前倾或后仰，保持脊柱自然弯曲，以免压迫椎间盘。,若感到腰部不适或出现刺痛，应立即停止动作并咨询专业医生或教练。', '在侧弯时把髋部向前倾，导致脊柱出现扭转而非单纯的侧向屈曲。,仅用手臂力量推动身体，未真正激活核心的腹斜肌和腰方肌。,侧弯幅度过大，超出个人柔韧范围，容易引起肌肉或韧带拉伤。', '初学者可以先不抬手，仅将手掌放在臀部或扶住墙面保持平衡，待熟悉动作后再举臂增加难度。,中级练习者可在手中握持哑铃、壶铃或使用弹力带，以提供额外的阻力提升肌肉刺激。,若踝关节或膝盖有不适，可改为坐姿侧弯或使用垫子支撑，减少下肢负担。', 'isolation', '{"变体类型":"若想增加难度，可在站姿侧弯时手持哑铃或壶铃；若想降低难度，可改为坐姿侧弯或在扶墙的帮助下进行。"}', 'published', NOW(3), NOW(3));
SET @eid_504 = LAST_INSERT_ID();
-- Suggested muscle: 外腹斜肌 (agonist)
-- Suggested muscle: 内腹斜肌 (synergist)
-- Suggested muscle: 腰方肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索举腿', 'core', 'cable', 'intermediate', NULL, '1. 调整绳索机滑轮至高位，站在器械前，背对机器，双脚与肩同宽站立。\n2. 双手握住绳索把手，身体略微后倾，保持手臂微微弯曲，核心肌群收紧。\n3. 吸气时，使用下腹部力量将膝盖向胸部方向抬起，尽量将膝盖抬至与髋关节同高或略高。\n4. 在顶峰位置保持1秒，感受下腹肌的收缩。\n5. 呼气时，缓慢有控制地将双腿放下回到起始位置。\n6. 重复动作，注意全程保持核心稳定，不要借助惯性。', '1. 确保绳索机已固定牢固，操作前检查设备是否正常。\n2. 保持脊柱中立位置，避免过度弓背或前倾。\n3. 动作过程中保持呼吸节奏，不要憋气憋力。', '1. 借助惯性甩动双腿，导致核心锻炼效果降低。\n2. 膝盖抬得过高，身体后仰幅度过大。\n3. 动作速度过快，缺乏对肌肉的控制。', '初学者可从较小的动作幅度开始，逐步增加难度。如果下腹部力量不足，可先尝试抬腿至90度角，待力量提升后再增加幅度。对于下背部不适的人群，可适当减轻负荷或选择其他核心训练动作替代。', 'isolation', '{"地板版本":"可以在瑜伽垫上进行仰卧举腿，双手放于身侧，双腿伸直或微屈向上抬起。","器械版本":"可换用悬垂举腿或仰卧起坐器械进行类似训练，刺激角度略有不同。","难度提升":"可尝试屈膝举腿或单腿举腿，增加动作难度和核心参与度。"}', 'published', NOW(3), NOW(3));
SET @eid_493 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('罗马椅背伸', 'core', 'other', 'intermediate', NULL, '1. 调整罗马椅的垫子高度，使垫子刚好位于髋部上方，双脚平放在踏板上，保持身体直立。\n2. 双手交叉置于胸前，或将双手轻放在头后（不要用力抓住头部），保持胸部微微抬起，目视前方。\n3. 保持核心收紧，背部挺直，缓慢向前弯腰，上半身向前倾直至与地面接近平行，此时感受下背部（竖脊肌）的拉伸。\n4. 在最低点稍作停顿（约1-2秒），然后通过臀部和大腿后侧肌肉的收缩，将身体推回起始的直立姿势。\n5. 完成预定次数后，保持背部中立，避免突然站直或向前冲。', '1. 动作全程必须保持背部平直，避免出现圆背或弓背，以防止腰椎受伤。\n2. 起始姿势要确认垫子位置合适，双脚稳固踏在踏板上，防止滑倒或失衡。\n3. 避免使用过大的重量或冲力，专注于控制动作的全程幅度，尤其是下降阶段。', '1. 弯腰时让下背部下凹（圆背），导致腰椎过度屈曲。\n2. 在下降过程中使用惯性或摆动，未能保持肌肉的持续张力。\n3. 上半身回到起始位置时用力过猛，导致背部受冲击。', '1. 如感到下背部压力过大，可适当降低垫子高度或缩短动作幅度。
2. 对初学者可以将双手放在胸前，以降低负荷；进阶者可手持哑铃或杠铃片提升难度。
3. 如需增加单侧刺激，可尝试单腿罗马椅背伸，将一只脚抬离踏板，保持平衡。', 'compound', '{"单腿变体":"抬起一只脚进行罗马椅背伸，可加强核心稳定性并更集中刺激单侧竖脊肌，建议在熟练基本动作后再尝试。","负重变体":"双手持哑铃或背负杠铃片进行背伸，增加背部负荷，适合力量训练的中后期进阶使用。","侧向变体":"在罗马椅上做侧向背伸（侧身弯曲），可以额外激活斜方肌和背阔肌，提升侧向核心力量。"}', 'published', NOW(3), NOW(3));
SET @eid_528 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌（Erector Spinae） (agonist)
-- Suggested muscle: 臀大肌（Gluteus Maximus） (synergist)
-- Suggested muscle: 腘绳肌（Hamstrings） (synergist)
-- Suggested muscle: 腹直肌（Rectus Abdominis） (stabilizer)
-- Suggested muscle: 多裂肌（Multifidus） (stabilizer)
-- Suggested muscle: 腹横肌（Transverse Abdominis） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('背伸展器', 'core', 'machine', 'beginner', NULL, '1. 调整器械：将座椅和靠垫高度调至髋部稍下方，使垫子正好压在臀部上方，脚踏板调至舒适位置，确保身体在起始姿势时呈直线。\n2. 站立姿势：双脚分开与肩同宽，踩在脚踏板上，双手握住器械的手柄或把手，保持胸部微微挺起，肩部放松。\n3. 起始动作：保持核心紧绷（收紧腹部），以髋关节为铰链点，缓慢向前倾身，同时保持背部自然伸展，直到上半身与地面接近平行或略低于水平线。\n4. 动作控制：在最低点稍作停顿，感受下背部的拉伸，然后通过竖脊肌收缩，缓慢将上半身抬回起始位置，注意不要完全锁住背部。\n5. 重复次数：建议完成8‑12次，视个人力量水平选择合适的重量或阻力。', '动作前务必进行全身热身，尤其是下背部和髋屈伸肌，以防受伤。,在整个动作过程中保持背部自然伸展，切忌过度弓背或猛然弹起，以免造成腰椎压力过大。,使用适中阻力，切勿一次性使用过大重量；如感到下背部疼痛应立即停止并检查姿势。', '在下降时弯腰或圆背，导致下背部受压过大。,利用身体摆动或快速弹起完成动作，失去对竖脊肌的控制。,上半身抬回时过度伸展（过度拱背），增加腰椎受伤风险。', '根据个人身高调节座椅高度，使垫子位于髋部上方；脚踏板位置应让双脚自然放置且膝盖略屈；若器械有阻力调节，初始使用最轻阻力，待动作熟练后再逐渐增加；保持手柄握距舒适，避免肩部参与过多。', 'isolation', '{"徒手背伸展":"在没有机器的情况下，可使用瑜伽垫或罗马椅进行徒手背伸展，注意保持核心紧绷，避免弯腰。","罗马椅背伸展":"使用罗马椅时，调整靠背角度和垫子高度，使其在髋部略上方，靠背倾斜约30‑45度，以获得类似训练效果。","杠铃背伸展":"进阶者可将杠铃置于上背部进行负荷练习，杠铃重量应适中，保持背部自然伸展并控制动作幅度。"}', 'published', NOW(3), NOW(3));
SET @eid_530 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌（Erector spinae） (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腿后肌群（Hamstrings） (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 腰方肌（Quadratus lumborum） (stabilizer)
-- Suggested muscle: 外斜肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('腹肌轮训练', 'core', 'other', 'advanced', NULL, '1. 双膝跪地，双手握住腹肌轮的把手，手臂伸直，肩宽，脚尖轻轻触地。\n2. 收紧腹部和臀部肌肉，保持背部平直，避免塌腰或弓背。\n3. 吸气的同时，慢慢向前滚动腹肌轮，保持核心紧绷，延展身体至手臂伸展或身体接近水平位置。\n4. 在最大伸展位置稍作停顿，感受核心的拉伸，然后呼气，用腹部力量将身体滚回起始姿势。\n5. 完成一次后，保持背部平直，避免一次性过度伸展导致腰椎受压。', '1. 初学者或腰椎有问题的人应在软垫或墙边进行，以防摔倒。\n2. 滚动时避免让臀部抬高或塌背，这会增加腰椎负担。\n3. 如出现下背部疼痛或肩部不适，应立即停止并咨询专业教练。', '1. 臀部抬起导致弓背，核心失去张力。\n2. 手臂过度伸展时手肘锁死，缺少弹性，容易受伤。\n3. 滚动过快，缺少对核心的控制，导致腰部下沉。', '如果直腿滚动太难，可先采用跪姿；若想增加难度，可尝试站姿单轮或单手滚动。', 'compound', '{"变体类型":"跪姿腹肌轮 → 站姿腹肌轮：保持核心收紧，逐步提升难度；单手腹肌轮 → 双手腹肌轮：平衡训练后再进阶。"}', 'published', NOW(3), NOW(3));
SET @eid_536 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 胸大肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('臀桥', 'core', 'bodyweight', 'beginner', NULL, '1. 仰卧在地面或瑜伽垫上，膝盖弯曲，双脚平放在地面上，与肩同宽，脚距约与髋关节同宽\n2. 手臂自然放在身体两侧，掌心朝下，保持身体稳定\n3. 收紧腹部和臀部肌肉，确保核心激活\n4. 通过臀部发力，将臀部抬离地面，直到身体从肩部到膝盖呈一条直线\n5. 在顶部位置保持1-2秒，充分感受臀部肌肉的收缩\n6. 缓慢放下臀部回到起始位置，重复完成规定次数', '避免腰部过度拱起或下塌，保持脊柱中立位置,始终保持对动作的控制，不要借助惯性快速完成,如感到腰部或膝盖不适，应立即停止并降低强度', '动作过程中腰部过度下塌或拱起,膝盖向内夹或向外撇，保持膝盖与脚尖方向一致,动作速度过快，缺少顶峰收缩和下降控制', '降低难度可减小动作幅度或减少保持时间；增加难度可采用单腿臀桥、将脚放在椅子上增加动作范围，或在髋关节处放置杠铃片增加负重。建议初学者先掌握基础双侧臀桥，再逐步尝试进阶变体。', 'compound', '{"变体类型":{"单腿臀桥":"将一条腿伸直抬起，增大核心稳定性和臀部单侧发力要求","负重臀桥":"在髋部放置杠铃片或沙袋，增加阻力","抬脚臀桥":"双脚放在较高位置（如椅子），增加动作范围和难度","臀推":"使用凳子进行更高位置的髋部推起，侧重臀部顶端收缩"}}', 'published', NOW(3), NOW(3));
SET @eid_520 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('药球俄罗斯转体', 'core', 'other', 'intermediate', NULL, '1. 坐在垫子上，双脚平放在地面，膝盖弯曲约90度，保持背部挺直，核心收紧。\n2. 手持药球，放在胸前，手臂自然伸展，手肘微屈。\n3. 收紧腹肌，身体略微向后倾（约45度），保持背部自然弧度，避免塌腰或弓背。\n4. 呼气时以胸椎为轴心，将上半身向左侧旋转，同时将药球带到左侧地面或左膝外侧；保持臀部稳定，膝盖位置不变。\n5. 旋转至左侧最大幅度后，吸气回到中心，然后继续向右侧旋转，完成一次完整的动作。\n6. 重复进行规定的次数，或在两侧交替进行。', '选择合适重量的药球，避免过重导致失去控制或对脊柱产生过大压力。,保持背部自然弧度，不要过度弓背或塌腰，以减少腰椎受伤风险。,如出现腰部或背部不适，应立即停止动作并咨询专业医生或理疗师。', '利用腿部或臀部摆动产生力量，导致核心肌肉失去有效的刺激。,旋转时背部过度弓起或塌腰，增加腰椎压力，容易引起腰背疼痛。,脚抬离地面或脚跟不稳，使身体晃动，破坏动作的稳定性。', '降低药球重量或使用空手拳代替，以降低难度并确保动作规范。,将脚抬离地面改为脚尖轻轻点地，或完全固定脚在地面，以调节核心稳定性需求。,单手握住药球进行旋转，另一只手放在侧面辅助平衡，可改变负荷分配并提高挑战。,在训练后期加入计时器控制旋转速度或使用慢速下降，增强肌肉控制能力。', 'compound', '{"侧向转体":"在保持背部自然弧度的前提下，仅向一侧进行大幅度旋转，或在旋转时加入轻微的侧向倾斜，以强化单侧oblique。","单手转体":"只用一只手握住药球，另一只手轻触地面或放在体侧，增加核心不平衡的挑战，提升平衡和协调性。","站姿俄罗斯转体":"站立姿势，双脚与肩同宽，保持核心收紧，旋转时髋部保持固定，可增加下肢参与度并提高整体稳定性。","交叉脚转体":"双脚交叉放在地面，限制脚部支撑面积，迫使核心更积极参与平衡与旋转。"}', 'published', NOW(3), NOW(3));
SET @eid_501 = LAST_INSERT_ID();
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('药球砸球', 'core', 'other', 'intermediate', NULL, '1. 站姿，双脚与肩同宽，双手握住药球置于胸前；\n2. 吸气，将药球举至头顶上方，手臂伸直，臀部略微后坐，膝盖微屈，保持核心紧绷；\n3. 呼气时，快速收缩臀部和腹肌，将药球用力向地面砸下，动作保持爆发力，手臂顺势向下甩；\n4. 药球接触地面的瞬间，利用弹性或立刻用手抓住药球，稳住身体；\n5. 回到起始姿势（药球位于胸前），准备进行下一次动作，重复规定的次数或时间。', '1. 确保练习区域地面平整、无障碍物，防止药球弹起伤人；\n2. 保持脊柱自然中立，避免在砸球时过度弯腰或扭背，以免背部受伤；\n3. 选择合适重量的药球，避免因重量过大导致肩部或背部拉伤。', '1. 只用手臂力量砸球，未充分利用核心和臀部发力，导致肩部受力过大；\n2. 膝盖锁死或过度伸展，增加膝关节压力；\n3. 药球弹起后直接用手抓取时未控制好力度，容易造成手腕扭伤。', '初学者可先使用较轻的药球，或坐在椅子上进行坐姿药球砸球，以减少对核心的冲击；进阶者可以增加药球重量、采用单手砸球或斜向砸球，提高核心旋转力量和协调性。', 'compound', '{"变体类型":"单手砸球 / 斜向砸球","转换建议":"将双手握住药球改为单手抓握，可增强单侧核心和肩部稳定性；将垂直砸球改为斜向（向左或向右）砸球，可加强腹斜肌和旋转力量的训练。注意在变体时适当降低药球重量，以确保技术正确和动作安全。"}', 'published', NOW(3), NOW(3));
SET @eid_539 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹斜肌 (synergist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 背阔肌 (synergist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 股四头肌 (stabilizer)
-- Suggested muscle: 小腿肌群 (stabilizer)
-- Suggested muscle: 脊柱竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('负重俄罗斯转体', 'core', 'dumbbell', 'intermediate', NULL, '1. 坐于地面，双腿弯曲约90度，双脚平放于地面或略微抬起以增加难度。握住一个哑铃于胸前，手臂伸直。2. 收紧核心肌群，身体向后倾斜约45度，背部保持挺直，这是起始位置。3. 保持双腿稳定，通过核心力量将躯干向一侧旋转，同时将哑铃向该侧摆动。4. 旋转时保持呼吸顺畅，动作应平滑有控制，感受腹斜肌的收缩。5. 旋转至最大幅度后，稍作停顿，然后反向旋转回到另一侧。6. 继续交替进行，完成设定的重复次数。', '确保下背部始终保持自然曲度，不要过度弓背或塌腰，以免造成腰椎压力过大,旋转动作应通过核心力量控制，避免利用惯性快速甩动哑铃,如果感到下背部不适或疼痛，应立即停止并降低难度', '双腿位置不固定，双脚在地面上移动或滑动,旋转时腰部弯曲驼背，没有保持核心收紧和背部挺直,动作速度过快，利用惯性而非肌肉控制完成动作', '初学者可以先从无负重或较轻重量的哑铃开始；双脚可以完全抬离地面以增加挑战；熟练后可以双手各持一个哑铃进行练习；也可以在动作顶端加入停顿强化刺激。', 'compound', '{"徒手版本":"移除哑铃，保持相同动作模式，可通过增加动作幅度或加入腿部抬起增加难度","负重增加":"可双手各持一个哑铃，或增加哑铃重量，同时降低动作速度以保持控制","变化形式":"可进行交替式的俄罗斯转体，在两侧之间不间断地连续旋转"}', 'published', NOW(3), NOW(3));
SET @eid_500 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (antagonist)
-- Suggested muscle: 横腹肌 (stabilizer)
-- Suggested muscle: 髋屈肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('负重卷腹', 'core', 'dumbbell', 'intermediate', NULL, '1. 起始姿势：平躺在垫子上，膝盖弯曲，双脚平放地面，双手握住哑铃置于胸前或锁骨上方，保持肩胛骨轻微抬起。2. 收紧腹部，想象把肋骨向骨盆方向靠拢，确保腰椎贴地，避免拱背。3. 呼气时用力收缩腹直肌，使上背部略微离开地面，保持颈部自然伸展，避免用手臂力量抬起。4. 在最高点停留约1-2秒，感受腹部的紧绷，然后吸气慢慢回到起始姿势，控制动作速度，避免弹回。5. 重复进行10-12次为一组，完成后适当休息再进行下一组。', '1. 使用适当重量的哑铃，避免负荷过大导致腰椎受压。2. 动作全程保持颈部自然伸展，不要用手拉哑铃来帮助抬起上半身。3. 如感到腰部或颈部不适，应立即停止并调整姿势或减轻重量。', '1. 使用过重的哑铃导致腰部抬起或出现弹背现象。2. 在卷腹时让臀部离开地面，失去了腹部的主动收缩。3. 动作过程中头部向前倾或用手臂力量抬起，导致颈部受伤。', '如果核心力量不足，可先采用徒手卷腹或使用轻量哑铃（如2-3公斤）进行练习；如想增加难度，可在卷腹最高点保持更长时间，或换成站姿负重卷腹。', 'isolation', '{"变体类型":"无负重卷腹","转换建议":"在不使用哑铃的情况下，保持相同的脊柱屈曲轨迹和腹肌收缩感，可通过增加次数或延长顶峰收缩时间来补偿负荷不足。"}', 'published', NOW(3), NOW(3));
SET @eid_472 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (antagonist)
-- Suggested muscle: 腰方肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('负重早安式', 'core', 'barbell', 'advanced', NULL, '1. 起始姿势：将杠铃置于上背部斜方肌位置，双手宽握杠铃，双脚与肩同宽站立，膝盖微屈，保持身体挺直。\n2. 准备动作：收紧核心肌群，挺胸收肩，目视前方，为动作做好准备。\n3. 下降阶段：保持背部平直，屈髋向前倾，重心略微后移，继续俯身直到身体接近与地面平行或达到个人最大活动范围。\n4. 底部停顿：在最低点稍作停顿，确保背部挺直，感受腿后肌群的拉伸。\n5. 上升阶段：通过臀大肌和腿后肌群的收缩发力，将身体拉回起始姿势，整个过程保持核心稳定。\n6. 重复：按需重复进行规定的次数。', '1. 始终保持脊柱自然弧度，避免在动作过程中出现圆背或过度弓背现象。\n2. 重量选择应循序渐进，过重会导致技术变形和下背损伤风险增加。\n3. 如果存在腰椎问题或疼痛，应暂停此动作并咨询专业人士。', '1. 膝盖过度弯曲，使动作变成深蹲而非髋关节铰链。\n2. 背部弯曲圆背，导致腰椎承受不当压力。\n3. 动作幅度过小，仅做半程训练，降低训练效果。', '初学者建议先徒手练习猫式伸展和臀桥建立基础；可以使用较轻杠铃或哑铃逐步过渡；如平衡困难，可在脚跟垫杠铃片提高稳定性；背部不适时可改为坐姿早安式动作。', 'compound', '{"退阶变体":"使用弹力带或TRX进行徒手早安式练习，逐步建立动作模式","进阶变体":"可尝试暂停式早安式（底部停顿2-3秒）或超级慢速离心训练"}', 'published', NOW(3), NOW(3));
SET @eid_526 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 股二头肌（腿后肌） (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 股四头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('超人式', 'core', 'bodyweight', 'intermediate', NULL, '1. 俯卧在垫子上，双腿伸直，双臂放在身体两侧，手掌向下贴地。\n2. 收紧核心与臀部肌肉，保持脊柱自然中立位置。\n3. 同时抬起双臂、胸部以及双腿，离开地面约5-10厘米，背部呈轻微弧形。\n4. 在最高点保持2-3秒，感受背部竖脊肌和臀部收紧的感觉。\n5. 缓慢而有控制地将四肢放回起始位置，重复进行。', '1. 动作过程中保持颈部自然位置，不要过度抬头，以免颈椎受伤。\n2. 若感到腰部疼痛，应立即停止并降低抬起幅度或改用其他练习。\n3. 在柔软的垫子上进行，避免在硬地面上直接做，以防胸部或膝盖受压。', '1. 抬起时用力过猛导致背部弓背，增加腰椎压力。\n2. 同时抬起的幅度过大，导致身体摇晃，失去核心稳定。\n3. 动作速度过快，未能充分感受目标肌肉的收缩。', '如果想要降低难度，可以只抬起单侧手臂和对侧腿部；如果想提升难度，可在手中握住哑铃或穿上负重背心。', 'compound', '{"降低难度":"只抬起单侧手臂和对侧腿部，或仅抬起上半身而不抬腿。","提升难度":"双手握哑铃、踝部负重或使用弹力带在脚踝提供额外阻力。","变体动作":"在最高点进行小幅度的肩胛收缩（轻微的飞鸟动作），可加入中下斜方的训练。"}', 'published', NOW(3), NOW(3));
SET @eid_524 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 多裂肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 腰方肌 (stabilizer)
-- Suggested muscle: 中斜方肌 (stabilizer)
-- Suggested muscle: 下斜方肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('跪姿侧向卷腹', 'core', 'bodyweight', 'beginner', NULL, '1. 跪在地上，双膝并拢，脚尖轻触地面，双手交叉放在胸前或置于脑后，以保持平衡。\n2. 收紧核心，右侧臀部略向外倾斜，确保背部保持自然弧度。\n3. 将上半身向右侧倾斜，同时将右手肘向膝盖方向靠近，完成一次侧向卷腹。\n4. 在最高点稍作停顿，感受右侧腹部的收缩。\n5. 缓慢回放至上半身恢复中立位，保持腹部收紧，避免塌背。\n6. 完成设定的次数后，换另一侧重复相同动作。', '确保膝盖垫上软垫或使用瑜伽垫，以防膝盖受压受伤。,动作过程中保持背部自然弧度，避免过度弓背或塌背。,若感到腰部或膝盖不适，应立即停止并降低强度或咨询专业人士。', '利用头部或手臂的力量拉动上半身，导致颈部压力过大。,动作幅度过小，只做轻微倾斜，未真正收缩侧腹肌。,膝盖位置不正，脚尖未支撑，导致身体不稳定。', '如感侧腹力量不足，可先做坐姿侧向卷腹以降低难度；若想增加挑战，可在手中握住哑铃或使用阻力带进行负重。', 'isolation', '{"站姿侧向卷腹":"从跪姿转为站姿，双手放在脑后或胸前，身体向侧面倾斜即可。","使用阻力带":"将阻力带固定在腰部或脚踝，提供额外的阻力，提高侧腹训练强度。","坐姿侧向卷腹":"在椅子上坐姿进行，膝盖略微弯曲，动作幅度更大，适合作为降级变体。"}', 'published', NOW(3), NOW(3));
SET @eid_503 = LAST_INSERT_ID();
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腰方肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (stabilizer)
-- Suggested muscle: 背阔肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('跪姿卷腹', 'core', 'bodyweight', 'beginner', NULL, '1. 起始姿势：双膝跪地，膝盖与脚尖保持垂直，臀部坐在脚跟上，保持背部挺直，双手可以交叉放在胸前或轻轻扶住后脑。\n2. 准备动作：收紧核心（腹横肌和腹直肌），保持胸腔微抬，肩胛骨略微后收，确保上半身自然伸直但不僵硬。\n3. 卷腹动作：呼气时，以腹部的力量将上半身向前向上卷起，胸部向膝盖方向靠拢，注意只用腹肌发力，避免用手臂拉头。\n4. 顶部收缩：在卷腹的最高点，保持腹肌收缩1-2秒，感受到腹直肌的紧绷。\n5. 缓慢回落：吸气时，控制速度让上半身缓慢回到起始姿势，保持背部仍保持自然弧度，避免猛然塌背。\n6. 重复次数：完成10-15次为一组，初学者可根据自身情况调整次数和组数。', '运动前进行充分的热身，尤其是腰背和髋屈肌，以防拉伤。,始终保持颈部自然放松，避免用手拉动头部，以免颈椎受伤。,如果在练习中感到腰部或下背部疼痛，应立即停止并检查姿势，必要时请教专业教练。', '使用惯性或摆动身体完成卷腹，导致腹肌受力不足。,在卷腹时过度弓背或塌背，增加腰椎压力。,将手臂力量用于抬起上半身，造成颈部不适和错误的动作轨迹。', '可通过调整手部位置（放在胸前、轻扶后脑或双手握拳）来改变难度；如需增加挑战，可在胸前放置轻量哑铃或使用弹力带；若想降低难度，可在膝盖下方垫一个软垫或把脚放在平板上以减小髋屈肌的参与。', 'isolation', '{"站姿卷腹":"在站立姿势下进行类似的上半身卷曲，适合作为跪姿卷腹的过渡或进阶。","仰卧卷腹":"躺在地面上进行卷腹，可进一步孤立腹直肌。","侧卷腹":"侧卧或侧站姿势下进行卷腹，重点锻炼侧腹肌（外斜肌、内斜肌）。","滑轨卷腹":"使用滑轨或滑盘在跪姿基础上进行滑动卷腹，提高动作幅度和核心稳定性。"}', 'published', NOW(3), NOW(3));
SET @eid_482 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 内斜肌/腹横肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧交替抬腿', 'core', 'bodyweight', 'beginner', NULL, '1. 准备姿势：平躺在垫子上，双臂自然放在身体两侧，掌心向下，双腿伸直，脚尖微微向内收。确保背部平贴地面，避免拱背。\n2. 收紧核心：在抬起腿之前，先收紧腹部肌肉，保持腹部的紧绷感，这有助于保护腰椎。\n3. 抬起右腿：呼气时，缓慢抬起右腿至约45度角，保持膝盖微微伸直（或略微弯曲），脚尖指向天花板。避免用力过猛导致腰椎抬起。\n4. 放下右腿：吸气时，缓慢放下右腿回到起始位置，动作保持受控，避免猛然坠落。\n5. 交替抬起左腿：重复上述动作，抬起左腿至相同高度，保持核心紧绷。\n6. 完成设定次数或时间：交替进行，完成设定的次数（如每侧10-15次）或保持一定时间（如30秒），确保呼吸平稳，不要憋气。', '确保背部始终平贴在垫子上，避免在抬腿时拱背或抬起腰部。,若有腰部或髋部不适，应降低抬腿高度或改为膝盖弯曲的版本。,避免在硬地面上直接做此动作，使用柔软的垫子以减轻腰椎压力。', '在抬腿时用力过猛导致腰部抬起（拱背），增加腰椎负担。,动作速度过快，没有控制，导致腰椎受到冲击。,只用腿部力量而忽视核心收紧，导致效果降低并增加受伤风险。', '初学者可将膝盖略微弯曲，以减轻髂腰肌负担，同时保持核心收紧。若想增加难度，可在脚踝处夹持小哑铃或在双脚之间套上弹力带。对于背部疼痛者，可改为“仰卧单膝收回”动作，将膝盖靠近胸部，减小髋屈角度。', 'isolation', '{"无负重":"保持原动作，增加动作幅度或放慢速度来提升难度。","负重":"在踝部夹持哑铃或沙袋，以增加阻力。","弹力带":"在双脚间套上弹力带，提供回程阻力。","倾斜凳":"在倾斜的健身凳上进行，利用重力提升难度。"}', 'published', NOW(3), NOW(3));
SET @eid_491 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 股直肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀大肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧收腹', 'core', 'bodyweight', 'beginner', NULL, '1. 平躺在瑜伽垫上，双膝弯曲约90度，双脚平放在地面上，与肩同宽，双手放在身体两侧或轻轻抱头。\n2. 深吸一口气，收紧腹部核心，保持下背部贴紧地面。\n3. 呼气时收紧腹部，肩胛骨离开地面，上背部卷起，同时腹肌发力将肩膀向骨盆方向卷动。\n4. 在动作顶端保持1-2秒，专注于腹肌的顶峰收缩。\n5. 吸气时缓慢控制身体下降，肩胛骨轻轻触地，但下背部始终保持贴地状态。\n6. 重复动作，保持稳定的呼吸节奏和持续的腹部张力。', '1. 始终保持下背部紧贴地面，避免过度弓背造成腰椎压力。\n2. 不要用手拉扯头部，而是通过腹部力量带动上半身卷起。\n3. 如果感到颈部或腰部不适，应立即停止并降低动作幅度或改用简化版本。', '1. 下背部离开地面，导致腰椎过度弯曲，可能引发腰部疼痛。\n2. 动作幅度过大，用惯性而非腹肌力量完成动作，降低训练效果。\n3. 头部过度前倾或用手过度施力，增加颈椎压力。\n4. 下降时速度过快，未能有效控制身体，失去对目标肌肉的持续刺激。', '初学者可以双脚平放地面以获得更好支撑；进阶者可将脚抬至空中或双手抱重物增加难度；降低难度时可将双手放在身体两侧轻触地面作为引导；避免颈部不适时可将下巴微收，目光看向天花板方向。', 'isolation', '{"变体类型":"进阶变体：将双脚抬至空中或放在椅子上；侧向卷腹：身体微微转向一侧进行单侧收缩；负重卷腹：双手握住哑铃或杠铃片置于胸前；降低难度：双手放在身体两侧作为引导。","转换建议":"可转换为仰卧卷腹（加入髋关节屈曲），或标准卷腹（完全卷起），也可结合侧向旋转变成斜向收腹以同时训练腹斜肌。"}', 'published', NOW(3), NOW(3));
SET @eid_521 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧直腿起身', 'core', 'bodyweight', 'intermediate', NULL, '1. 平躺在瑜伽垫上，双腿伸直并拢，双臂放在身体两侧，掌心朝下贴紧地面\n2. 深吸一口气，将双臂向前伸展并举过头顶，同时收紧双腿，保持膝关节锁死状态\n3. 呼气的同时，通过腹部发力将双腿和上半身同时向上抬起\n4. 继续抬起直到双腿与地面接近垂直，上半身抬起约45-60度角\n5. 在最高点保持1-2秒，充分感受核心肌群的收缩\n6. 吸气，缓慢控制地将身体放下回起始位置，重复动作', '1. 始终保持颈部放松，不要用手抓握颈部发力，以免造成颈椎损伤\n2. 下放时要匀速控制，避免突然放松导致腰部撞击地面而受伤\n3. 如有腰椎间盘突出或腰部不适，应在专业教练指导下进行或选择其他替代动作', '1. 动作过程中颈部过度用力前屈，导致颈椎酸痛\n2. 只做半程动作，下背部未能抬离地面，未能充分刺激核心\n3. 双腿未能保持伸直状态，膝盖出现弯曲\n4. 下降时速度过快，缺乏对动作的控制', '初学者可以将双腿略微屈膝来降低难度；进阶者可以双手持哑铃或杠铃片来增加负重；腰背力量较弱者可以只做单侧腿的练习来逐步建立核心力量', 'compound', '{"入门变体":"屈膝版本：保持双腿屈膝约90度进行练习，降低动作难度","进阶变体":"负重版本：双手握住哑铃片或杠铃片于胸前，增加核心负荷","单腿变体":"单腿版本：交替抬起单腿，增加核心稳定性和难度"}', 'published', NOW(3), NOW(3));
SET @eid_489 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('仰卧蹬车', 'core', 'bodyweight', 'intermediate', NULL, '1. 平躺在垫子上，双手放在身体两侧或轻放在髋部以提供支撑，确保下背部紧贴地面，保持自然腰曲。\n2. 抬起双腿，使髋部和膝盖均屈约90度，双脚离地，形成仰卧姿势。\n3. 模仿骑自行车的动作，右腿向前伸直同时左腿保持弯曲，然后交替将左腿向前伸直，右腿收回，形成连续的蹬车循环。\n4. 在整个动作过程中，用腹部的力量保持核心收紧，避免下背抬起或出现明显晃动；呼吸保持自然，呼气时用力推蹬，吸气时准备换腿。\n5. 完成设定的次数或时间后，慢慢将双腿放回地面，恢复起始姿势，休息片刻后继续。', '保持下背部始终贴合地面，避免腰部过度拱起导致腰椎受压。,动作应在控制范围内完成，避免利用惯性大幅摆动双腿，以免拉伤髋屈肌或腹肌。,若感到颈部或背部不适，可将双手放在头部两侧，轻轻支撑头部，但不要用力拉颈部。', '使用过多的惯性摆动，导致核心参与不足，训练效果下降。,在抬腿时让腰部离开地面，形成弓背，这会增加腰椎压力。,呼吸不规律，常在发力时憋气，容易导致血压升高或眩晕。', '初学者可将双手放在臀部下方以减小难度；若想增加挑战，可将双手伸直举过头顶，或在脚踝处加轻重量；老年人或腰部不适者可把膝盖稍微弯曲，减小髋屈角度。', 'compound', '{"仰卧抬腿":"保持双腿伸直，仅做抬腿动作，可增强腹直肌的收缩力度。","侧卧蹬车":"在侧卧姿势下进行，可增加斜腹肌和肋间肌的参与。","负重蹬车":"在脚踝处加轻重量或使用弹力带，提高髋屈肌和核心的负荷。"}', 'published', NOW(3), NOW(3));
SET @eid_486 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀大肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('侧卧抬腿', 'core', 'bodyweight', 'beginner', NULL, '1. 预备姿势：侧卧在垫子上，头部靠在枕头或手臂上，保持身体从头到脚呈一条直线，双腿伸直叠放，上方的腿轻轻放在下方腿前方。\n2. 收紧核心：将下侧的手臂弯曲支撑在胸前或垫子上，确保腰部不塌陷，保持脊柱中立位。\n3. 抬起上腿：在保持髋部稳定的前提下，用上腿的髋外展力量将腿向上抬起，抬至约30-45度，膝盖保持伸直或微屈。\n4. 保持顶峰位置1-2秒，感受侧腰和臀中肌的收缩。\n5. 缓慢放下回到起始位置，保持控制，避免腿掉得太快。\n6. 完成所需重复次数后换另一侧进行。', '1. 保持核心收紧，防止腰椎过度弯曲导致受伤。\n2. 抬腿幅度不宜过高，避免髋屈肌过度代偿。\n3. 如出现腰部或髋部疼痛，应立即停止并降低强度或咨询专业人士。', '1. 使用惯性甩腿，导致核心失去参与。\n2. 抬腿过高，使髋屈肌主导而非侧腰。\n3. 身体扭转或塌腰，增加受伤风险并降低训练效果。', '1. 初学者可将膝盖微屈，降低难度。
2. 进阶者可使用脚踝负重或弹力带提升阻力。
3. 如有腰部不适，可在下方腿下垫软垫或在膝盖间夹小枕头提供支撑。', 'isolation', '{"膝盖伸直侧卧抬腿":"保持膝盖伸直可加强对侧腰的刺激，适合中级以上训练者。","膝盖微屈侧卧抬腿":"微屈膝盖可以降低髋屈肌的参与，减轻腰部压力，适合初学者或腰部不适者。","负重侧卧抬腿":"在脚踝处加轻重量或使用阻力带，可提升臀中肌和侧腰负荷，适合进阶训练。","侧卧交叉抬腿":"在抬腿时略微向前倾，使动作略带斜向，增加功能性挑战。","单腿侧卧抬腿":"仅使用上侧腿抬起，下侧腿保持支撑，进一步强化核心稳定性。"}', 'published', NOW(3), NOW(3));
SET @eid_509 = LAST_INSERT_ID();
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('侧向伐木', 'core', 'cable', 'intermediate', NULL, '1. 初始姿势：站立，双脚与肩同宽，脚尖略微外展，站在Cable装置的侧面，将把手固定在高位（头顶上方），双手握住把手。\n2. 预备动作：身体略微倾斜向Cable的对面侧，保持核心紧绷，膝盖微屈，重心放在后脚上，手臂伸直。\n3. 爆发发力：利用核心（尤其是外斜肌和内斜肌）和下肢的旋转力量，将把手从高位沿对角线快速拉向身体对侧的髋部，动作路径类似“伐木”。在拉动时呼气。\n4. 收紧：在动作的最低点（手到达对侧髋部附近）时用力收紧侧腹肌肉，确保躯干已充分旋转，胸部朝向新的方向。\n5. 控制复位：缓慢而有控制地让Cable把把手带回起始位置，保持核心持续紧绷，避免靠重力自由回弹，吸气复位。\n6. 呼吸配合：发力拉动时呼气，复位时吸气，保持呼吸节奏与动作同步。', '1. 使用适当的重量，确保动作全程可控制，避免因重量过大导致姿势失控或下背部受伤。\n2. 动作开始前检查Cable把手和固定点是否牢固，防止滑脱或意外弹回。\n3. 若出现腰部、肩部不适或疼痛，应立即停止并降低重量或请教专业教练。', '1. 动作幅度不足，仅用手臂拉动而缺乏核心旋转，导致目标肌肉刺激减弱。\n2. 使用过重的重量导致耸肩、塌腰或身体前倾，增加受伤风险并降低效果。\n3. 复位阶段过度依赖Cable的弹性，未主动控制返回，使训练强度下降。', '1. 可通过调节Cable的高度改变力量曲线：高位置更侧重侧腹和上部腹直肌，低位置更强调髋部旋转和整体核心力量。
2. 初学者或肩部不适者可先使用单手动作或降低Cable高度，逐步适应后再增加重量。
3. 如需更轻松的变体，可改用弹力带或自身体重（如侧向踢腿）完成类似动作，保持核心参与。', 'compound', '{"单手变体":"将双手握住改为单手操作，以更好地孤立侧腹并提升旋转控制。","高低位调节":"通过调节Cable高度改变力量曲线，低位侧重髋部旋转，高位侧重侧腹收缩。","无器材变体":"使用弹力带或自身体重（如侧向踢腿）完成类似动作，保持核心参与。"}', 'published', NOW(3), NOW(3));
SET @eid_502 = LAST_INSERT_ID();
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 背阔肌 (synergist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀中肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('侧平板支撑', 'core', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：左侧卧位，左侧前臂贴地，肘部位于肩膀正下方，手掌平放或握拳支撑。右侧手臂自然放在体侧或轻轻放在右髋上。\n2. 收紧核心：将腹部向脊柱方向收紧，确保骨盆处于中立位，避免下塌或上抬。双腿伸直，右脚叠放在左脚上方或两脚轻轻分开与肩同宽。\n3. 抬起身体：用力压迫左前臂和左脚，将身体整体向上推起，形成从肩膀到脚踝的直线。保持头部与脊柱自然对齐，眼睛看向前下方。\n4. 保持姿势：呼吸保持平稳且深长，保持30‑60秒（或根据个人能力适当增减），感受左侧腰方肌、腹外斜肌以及臀中肌的持续发力。\n5. 放下身体：慢慢将身体放回地面，休息10‑15秒后换右侧重复相同动作，完成设定的组数。', '若出现肩、肘或手腕疼痛，应立即停止并改为跪姿或使用支撑垫。,保持脊柱自然对齐，避免出现腰部下塌或臀部过度抬高，以防止下背压力过大。,初学者应在专业教练指导下进行，尤其是进行高强度或长时间保持时。', '身体出现下沉或臀部翘起，导致腰椎过度弯曲。,肘部位置偏离肩膀正下方，产生不必要的肩部旋转或压力。,呼吸浅短或屏气，导致核心不稳，增加受伤风险。', '降低难度可采用膝盖支撑的侧平板，保持上身姿势不变，膝盖放在地面。,若想提升挑战，可在保持侧平板时将上侧腿抬起，或在上方手臂握哑铃进行负重。,使用瑜伽垫或软垫可以减轻手腕压力，尤其对新手更友好。', 'compound', '{"膝盖支撑变体":"如果全侧平板支撑难度过大，先采用膝盖支撑的侧平板，逐步过渡到全侧平板。","抬腿变体":"在保持侧平板姿势的同时，将上侧腿慢慢抬起至与地面平行，可增强臀中肌和腰方肌的激活。","负重变体":"在上方手持哑铃或壶铃进行侧平板，增加上肢负荷并提升核心稳定性。"}', 'published', NOW(3), NOW(3));
SET @eid_498 = LAST_INSERT_ID();
-- Suggested muscle: 腹外斜肌 (agonist)
-- Suggested muscle: 腰方肌 (agonist)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 竖脊肌（多裂肌、长伸肌） (stabilizer)
-- Suggested muscle: 前三角肌 (stabilizer)
-- Suggested muscle: 肩胛稳定肌群（前锯肌、斜方肌下部） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('侧桥', 'core', 'bodyweight', 'beginner', NULL, '1. 起始姿势：侧卧在垫子上，左手肘部弯曲90度撑地，左肩与左肘垂直对齐，右手可放在髋部或胸前，双脚叠放或右脚支撑。\n2. 收紧核心：吸气时收紧腹部，感觉肚脐向脊柱靠拢，保持核心紧绷。\n3. 抬升髋部：呼气时用力将髋部向上推，使身体从肩膀到脚踝呈一条直线，保持10‑30秒（或根据自己的耐受时间）。\n4. 保持姿势：在整个保持期间，保持腹部收紧、呼吸自然，避免憋气或过度弓背。\n5. 放下髋部：呼气时缓慢放下髋部回到起始姿势，换另一侧重复相同步骤。', '1. 确保肘部不直接压在硬地面上，可在肘下放置软垫以减轻压力。\n2. 保持头部与颈部自然对齐，避免向前倾或向后仰。\n3. 如出现肩部、腰部或腕部疼痛，应立即停止并咨询专业人士。', '1. 髋部下降导致身体不在一条直线，降低锻炼效果。\n2. 肩膀向前移动或耸肩，增加肩部受力。\n3. 呼吸不自然，憋气导致血压升高。', '1. 初学者可先做膝盖侧桥，以降低难度。
2. 若肘部不适，可使用前臂垫或把手放在柔软的垫子上。
3. 根据个人耐受时间，可从5秒开始逐渐延长至30秒或更长。', 'isolation', '{"膝盖侧桥":"从膝盖侧桥过渡到全脚侧桥，逐步提升核心力量和平衡感。","侧桥抬腿":"在保持侧桥姿势的基础上，抬起上侧腿并保持几秒，以加强髋外展肌和侧腹肌。","侧桥旋转":"在侧桥保持期间，轻微转动上侧肩部，使侧腹肌在等长收缩的同时进行轻度旋转。","侧桥球支撑":"使用瑜伽球代替地面支撑，增加核心不稳定刺激，提高平衡与深层肌肉激活。","侧桥配合手臂伸展":"在侧桥姿势下，将上侧手臂向上伸展并轻触地面，增强肩部稳定性和上身力量。"}', 'published', NOW(3), NOW(3));
SET @eid_517 = LAST_INSERT_ID();
-- Suggested muscle: 外斜腹肌 (agonist)
-- Suggested muscle: 内斜腹肌 (synergist)
-- Suggested muscle: 腰方肌 (agonist)
-- Suggested muscle: 臀中肌 (synergist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 横腹肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('俯卧健身球背伸', 'core', 'other', 'intermediate', NULL, '1. 准备阶段：站立，双脚与肩同宽，膝盖伸直。将健身球放在身前，双手轻扶球的两侧，然后俯身将胸部压在球上，保持腹部微收，背部挺直。\n2. 调整姿势：让球的中心位于胸骨下方，身体从头到脚呈一条直线。头部与脊柱保持自然对齐，眼睛看向地面。双手可以放在头后、交叉于胸前或轻触地面以提供支撑。\n3. 起始动作：吸气时放松，呼气时利用背部竖脊肌发力，将上半身向上抬起，伸展胸椎，手臂保持轻微伸展，不要用手臂力量抬起。\n4. 顶峰收缩：在最高点略作停顿，感受背部肌肉的收缩，确保下背部没有过度拱起或塌腰。\n5. 还原动作：吸气，缓慢控制下放上半身回到起始位置，保持核心持续收紧，避免突然弹回。\n6. 重复练习：根据训练计划完成指定次数或时间，注意保持动作的流畅与控制。', '1. 使用稳固的地面，若地面光滑可铺防滑垫或将球靠在墙角，以防球滚动导致失衡。\n2. 保持脊柱自然弧度，避免过度伸展造成下背部压力，如有背部不适或椎间盘问题请先咨询医生或专业教练。\n3. 动作全程保持呼吸配合，避免憋气导致血压升高，尤其在抬起时呼气，下放时吸气。', '1. 依赖手臂力量或头部抬起，导致背部肌肉未得到充分刺激。\n2. 在抬起过程中出现腰部过度弓背（拱背）或塌腰（腰椎过度屈曲），增加腰椎受伤风险。\n3. 动作幅度过大或过小，且下放时控制不稳，导致弹振或失去核心激活。', '初学者可将双脚靠墙或使用固定支架来固定球，降低平衡难度；若想增加难度，可进行单侧背伸，即把球稍微倾斜，单手支撑；或手持哑铃、杠铃片增加负荷；动作范围可以根据个人柔韧性适度调整，避免强行追求大幅度导致姿势失控。', 'compound', '{"单侧背伸":"将球稍微倾斜，单手支撑进行练习，可增强核心抗侧倾的稳定性。","负重背伸":"双手握持哑铃或杠铃片，增加背部负荷，提高力量训练强度。","简易版":"减小伸展幅度，双脚靠墙固定球，或使用较小的健身球降低难度。"}', 'published', NOW(3), NOW(3));
SET @eid_531 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腿后肌群 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 腰方肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('俯卧腿臂伸展', 'core', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：俯卧在垫子上，双手伸直向前，手掌向下，腿部伸直并拢，脚尖轻轻触地。保持头部自然位置，眼睛看向地面。\n2. 收紧腹部和臀部肌肉，保持核心稳定。\n3. 同时抬起双臂和双腿，使手臂与肩同高或略高，腿部抬起至大腿离开地面，保持膝盖伸直。\n4. 在最高点稍作停顿，感受背部（竖脊肌）和臀部（臀大肌）的收缩。\n5. 缓慢而有控制地放下双臂和双腿，恢复到起始姿势，避免猛然坠落。\n6. 重复完成所需次数，注意保持呼吸均匀，抬起时吸气，放下时呼气。', '• 确保脊椎保持自然弧度，避免过度拱背导致下背压力。\n• 动作过程保持肩胛骨轻微后收，防止肩部过度伸展。\n• 如有腰椎间盘突出、腰部疼痛或肩部不适，应立即停止并咨询专业人士。', '• 使用惯性或摆动抬起四肢，导致动作失去控制。\n• 过度抬高手臂或腿，使背部过度伸展，产生腰背疼痛。\n• 呼吸不正确，屏气或在整个动作中呼气，导致核心不稳。', '• 初学者可先只抬臂或只抬腿，逐步过渡到同时抬起双臂双腿。
• 如腰部不适，可将双腿略微弯曲或使用支撑垫降低难度。
• 对于柔韧性较差的人，可将双手放在胸前或使用弹力带辅助。', 'compound', '{"半程动作":"先只做手臂或腿部抬起，逐步加入另一侧，直至完成全程。","负重版本":"在上背部放置轻量杠铃或哑铃，增加背部与臀部负荷。","单侧交替":"每次只抬起一侧手臂和对侧腿，增强核心旋转抗扭转能力。"}', 'published', NOW(3), NOW(3));
SET @eid_533 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 背阔肌 (synergist)
-- Suggested muscle: 中斜方肌/菱形肌 (synergist)
-- Suggested muscle: 后三角肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 外斜肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('健身球举腿', 'core', 'other', 'intermediate', NULL, '1. 起始姿势：坐在健身球上，双脚平放在地面，躯干稍微后倾，保持背部挺直，双手放在身体两侧或交叉置于胸前。\n2. 稳定核心：收紧腹部和臀部，使身体形成类似平板支撑的姿态，确保肩部、臀部和脚在同一直线上。\n3. 举起双腿：吸气时，缓慢抬起双腿，膝盖保持微屈或伸直（视个人能力而定），将双腿抬至约与地面平行或稍高位置，保持髋部不抬起。\n4. 保持顶峰：可在最高点稍微停顿1-2秒，感受核心肌群的收缩，避免借助惯性。\n5. 慢慢放下：呼气时，缓慢放下双腿至起始位置，保持控制，避免猛然下落导致背部受压。\n6. 重复练习：根据计划完成指定次数，如8-12次为一组，休息30秒后继续。', '确保背部全程贴紧球体或保持自然弧度，避免出现塌背或过度弓背。,动作要在控制范围内进行，避免使用惯性快速举起或放下双腿。,如有腰背疼痛或腰椎问题，应在专业教练指导下进行，或先选择更低难度的变体。', '髋部抬起：在抬腿时让髋部离开球面，使下背过度伸展，增加腰椎压力。,动作过快：没有控制速度，导致冲击力量集中在腹部和背部。,膝盖过度弯曲或伸直：膝盖完全伸直可能导致膝关节受压，过度弯曲则减弱对腹部的刺激。', '如核心力量不足，可先将膝盖稍微弯曲或仅抬起小腿，降低难度；如想增加难度，可在举起双腿时让双手离开身体两侧，保持核心额外承担体重，或在空中保持更长的停顿时间；也可使用更小的健身球或在球下垫上垫子，以提供更稳定的支撑。', 'compound', '{"入门变体":"如果核心力量不足，可在膝盖稍微弯曲或只抬小腿，并在肩膀下方放置垫子以获得更好支撑。","进阶变体":"想要更大挑战，可在举起双腿后保持伸直并在空中停顿2-3秒，或在举起双腿时让双手离开地面，仅靠核心支撑。","单侧变体":"单腿举腿可进一步增强核心侧向稳定性，并帮助发现和纠正左右不平衡。"}', 'published', NOW(3), NOW(3));
SET @eid_494 = LAST_INSERT_ID();
-- Suggested muscle: 髂腰肌 (agonist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 内斜肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('半圆球侧平衡', 'core', 'other', 'advanced', NULL, '1. 准备半圆球（半球形平衡球），将球平放在平稳地面上，确保弧面向下，平滑面朝上。\n2. 站在球旁，双脚与肩同宽，膝盖微屈，核心收紧，保持胸部略抬高。\n3. 将右脚轻轻踏上球的平滑面，重心逐渐转移至右脚，左脚略微抬起以保持平衡。\n4. 在球上保持侧向平衡，保持髋部、膝盖与脚踝垂直于地面，避免向前或向后倾斜。\n5. 维持此姿势3-5秒，然后缓慢将右脚收回，恢复起始姿势。换左脚重复，完成规定次数。', '1. 使用前检查半圆球是否有裂纹或漏气，确保地面干燥防滑。\n2. 初始练习时最好在墙面或稳固的扶手旁进行，以防失衡跌倒。\n3. 保持动作平稳、缓慢，避免猛然跳跃或快速转移重心导致扭伤。', '1. 身体过度前倾或后仰，导致核心失去激活，平衡不稳。\n2. 膝盖向内扣或外翻，使膝关节承受不均匀压力。\n3. 在踏上球时未将重心充分转移，导致单脚失衡后迅速失去控制。', '初学者可以先用双手扶墙或使用弹力带提供轻度支撑；熟练后可尝试闭眼或增加负重（如手持哑铃）提升难度；若感到膝关节不适，可将球置于软垫上以减轻冲击。', 'compound', '{"单腿侧平衡":"将球放低一级，或换成平衡板进行单腿站立，以降低难度。","负重侧平衡":"手持哑铃或在背部加负重背心，提高核心和下肢的协同发力。","坐姿侧平衡":"坐在半圆球上，通过横向倾斜身体练习侧向核心控制，适合康复人群。"}', 'published', NOW(3), NOW(3));
SET @eid_549 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜腹肌 (agonist)
-- Suggested muscle: 内斜腹肌 (synergist)
-- Suggested muscle: 臀中肌 (synergist)
-- Suggested muscle: 腰方肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 髋外展肌群 (stabilizer)
-- Suggested muscle: 背阔肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('半跪姿背伸', 'core', 'dumbbell', 'intermediate', NULL, '1. 起始姿势：在软垫上以单膝跪姿准备，另一只脚置于身体侧边呈半跪姿势，双手正握哑铃，胸部挺直，目视地面。\n2. 准备动作：收紧核心肌群（腹横肌、腹直肌），保持脊柱自然中立，肩胛骨微收，胸部略微前倾。\n3. 背部伸展：保持髋部向前推移，缓慢将上半身向前向下倾斜，脊柱保持平直，直至身体接近水平或感到背部有轻微拉伸。\n4. 收缩保持：在最低点用力收紧竖脊肌和臀大肌，保持1-2秒，感受背部肌肉的收缩。\n5. 恢复起始：利用核心力量平稳地将上半身抬回起始姿势，避免猛然弹起，整个过程保持动作控制。\n6. 完成一组后换另一侧重复，或根据训练计划进行多次重复。', '1. 确保脊柱在整个动作过程中保持自然弧度，避免过度弓背或圆背，以免对腰椎产生过大压力。\n2. 动作全程保持核心紧绷，防止腰部因缺乏支撑而受伤。\n3. 选用合适的哑铃重量，若出现腰部疼痛或不适应立即停止并减轻重量或改用徒手练习。', '1. 背部下沉或拱起导致腰椎过度屈曲，增加受伤风险。\n2. 使用过大的重量导致动作失控，出现弹震式或快速上下摆动。\n3. 在背伸时未充分收紧臀部，腿部力量过度代偿，降低对背部肌肉的刺激。', '1. 如感到腰部不适，可先将哑铃换成轻重量或徒手完成，以降低难度。
2. 调整前膝与后脚的位置：前膝离脚踝的距离越近，髋部屈曲角度越大，背部拉伸感更强；距离越远，髋部更接近中立位，难度降低。
3. 初级练习者可先在站立姿势或俯卧姿势下进行背伸，以减少平衡需求，再逐步过渡到半跪姿。', 'compound', '{"徒手版":"不使用哑铃，保持相同的动作轨迹和幅度，适用于热身或初学者。","壶铃版":"将哑铃换成壶铃，握法更自然，能够提供不同的重量分布。","站姿背伸":"改为站立姿势，双手持铃或徒手进行，难度提升，对平衡和核心控制要求更高。","绳索版":"使用低位滑轮进行背伸，阻力曲线随动作变化，可提供更平滑的负荷。","单臂版":"单手握铃进行半跪姿背伸，可强化不对称的核心力量和肩部稳定性。"}', 'published', NOW(3), NOW(3));
SET @eid_532 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 多裂肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('反向卷腹', 'core', 'bodyweight', 'beginner', NULL, '1. 起始姿势：仰卧在垫子上，双脚平放，膝盖弯曲约90度，双手放在身体两侧或轻压臀部以提供支撑。\n2. 准备动作：收紧核心，腹部发力，将双脚抬起至大腿垂直地面，小腿平行地面，保持膝盖角度不变。\n3. 卷腹发力：在保持下背部贴近地面的前提下，使用下腹部力量将膝盖向胸部方向卷起，使臀部轻微抬离垫子，形成小幅度的卷腹。\n4. 顶峰收缩：到达最高点时，保持1-2秒，充分感受下腹部的收缩，确保动作达到最大范围。\n5. 缓慢回位：控制力量，缓慢将双腿放回起始位置，保持腹部始终紧绷，避免利用惯性弹回。\n6. 重复进行：根据个人训练计划重复完成所需次数。', '保持颈部自然放松，避免用手拉头部或耸肩，以防止颈椎受伤。,在柔软的垫子或瑜伽垫上进行，确保背部与地面有适当缓冲，防止摩擦伤害。,如果出现腰部不适或疼痛，应立即停止并降低动作幅度，必要时咨询专业教练或医生。', '使用惯性摆动双腿，导致动作失去控制并增加腰椎压力。,臀部抬得过高或背部过度弓起，使腰椎承担不必要的力量。,呼吸不规律或屏住呼吸，导致血压升高和核心力量下降。', '初学者可先做单侧反向卷腹或双手支撑臀部以降低难度；进阶者可在脚踝处绑沙袋或使用阻力带提升负荷；如果感到下背部疼痛，可改在斜板上进行或在训练中使用卷腹机辅助，以更好地控制动作轨迹。', 'isolation', '{"单腿反向卷腹":"将一只腿抬起并保持另一只腿固定在地面，以单侧负荷加强核心控制。","斜向反向卷腹":"在卷腹的同时加入侧向转体，使膝盖向对侧肩膀移动，增强腹外斜肌的参与。","负重反向卷腹":"在脚踝处绑上哑铃片或使用阻力带，提高下腹负荷并提升难度。","器械辅助":"使用卷腹机或悬挂腿举器械进行反向卷腹，可更好控制轨迹并减少腰椎压力。"}', 'published', NOW(3), NOW(3));
SET @eid_485 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 腹外斜肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('吊环核心', 'core', 'bodyweight', 'advanced', NULL, '1. 调整吊环高度，使手握环时手臂伸直，身体呈俯卧撑起始姿势。\n2. 双手紧握吊环，手指自然分开，手臂稍微弯曲以吸收冲击。\n3. 收紧腹肌、臀部和大腿，使身体从头到脚保持一条直线，核心保持紧绷。\n4. 保持肩胛骨向下压，避免肩部向前移动，目光自然向下看。\n5. 维持该姿势 20-60 秒，保持平稳呼吸，避免憋气。\n6. 完成预定时间后，慢慢放松手臂，收回吊环，缓慢恢复站立姿势。', '确保吊环的固定装置牢固，挂点无松动，环扣已锁紧。,在进行练习前充分热身肩部、胸部和核心，防止肩袖受伤。,如果感到肩关节不适或出现剧痛，应立即停止并寻求专业指导。', '臀部下沉或抬高，导致脊柱过度弯曲或过度伸展。,肘部外展或过度弯曲，使肩部承受不必要的扭转力。,呼吸不规律或憋气，导致核心张力下降、身体失衡。', '降低吊环高度可使动作更易掌握，适合初学者；提高吊环高度则增加肩部和核心的稳定需求，适合进阶训练。可使用弹力带辅助或在膝下放置垫子减轻难度；进阶时可尝试单臂吊环平板或侧向支撑变体。', 'compound', '{"单臂吊环平板":"将双手支撑改为单手支撑，增加核心斜向稳定性，同时提升肩部力量和本体感觉。","吊环侧向支撑":"在平板基础上侧身转向侧面，加大外侧腹斜肌的参与，提高平衡和侧向核心控制。"}', 'published', NOW(3), NOW(3));
SET @eid_544 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 胸大肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('四点支撑', 'core', 'bodyweight', 'beginner', NULL, '1. 四肢着地，双手与双膝支撑在地面上，手臂伸直，膝盖弯曲约90度，身体呈直线姿势。\n2. 收紧腹横肌和腹直肌，使腰部不出现塌陷或拱起。\n3. 保持头部自然位置，眼睛看向地面约30厘米前方，避免抬头或低头。\n4. 维持此姿势30-60秒，呼吸保持平稳，腹部随呼吸轻微起伏。\n5. 结束时，缓慢放松四肢，站立或坐姿休息。', '确保地面平整、稳固，避免在软垫或不平的地面上进行，以防滑倒或扭伤。,如有手腕、肩部或腰部不适，可在手掌下方放置软垫或改为跪姿支撑，以减轻压力。,练习过程中若出现疼痛，应立即停止并咨询专业教练或医生。', '臀部抬起或下沉导致腰部过度拱起或塌陷，增加腰椎压力。,头部过度抬起或后仰，使颈部受力不均。,肩膀过度外展或内收，导致肩关节不稳定或肩袖肌群过度负荷。', '如手腕疼痛，可将手掌稍微外旋或使用握拳姿势减轻压力。,对于初学者，可先保持30秒，逐渐延长时间至1分钟或更久。,如需增加难度，可在保持四点支撑的同时，抬起对侧手臂或腿部，形成三点支撑变体。', 'compound', '{"三点支撑（左臂抬起）":"在四点支撑的基础上，将左臂抬离地面，伸直向前，保持核心稳定，抬起时间可从5秒逐步增加。","三点支撑（右腿抬起）":"在四点支撑的基础上，将右腿抬离地面，伸直向后，保持躯干不动，注意髋部不向侧面倾斜。","二点支撑（交叉抬臂抬腿）":"同时抬起左臂和右腿，形成对角线姿势，增强核心抗旋转能力，完成后换另一侧交替进行。","侧卧四点支撑":"将身体侧向支撑，使用下方的手臂和膝盖支撑，上方的手臂可放在胸部或头部侧面，针对侧腹肌进行强化。"}', 'published', NOW(3), NOW(3));
SET @eid_518 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (synergist)
-- Suggested muscle: 多裂肌 (stabilizer)
-- Suggested muscle: 前锯肌 (synergist)
-- Suggested muscle: 肩袖肌群（冈上肌、冈下肌、小圆肌、肩胛下肌） (stabilizer)
-- Suggested muscle: 臀中肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('山羊挺身', 'core', 'other', 'intermediate', NULL, '1. 调整GHD（山羊机）垫子高度，使臀部刚好放在垫子上，双脚通过脚踝绑带固定在滚轮上，双手可交叉放在胸前或伸直放在体侧。\n2. 起始姿势为俯卧，躯干与地面平行，保持核心紧绷，脊柱自然伸展。\n3. 缓慢下降躯干，屈髋、屈脊柱，使身体向下倾斜至躯干约与地面平行或略低于平行，保持背部平直，避免塌腰或过度弓背。\n4. 在下降的最高点稍作停顿后，利用臀大肌、腿后肌群和竖脊肌的力量发力，将躯干推回起始位置，保持动作平稳且受控。\n5. 完成一次完整的动作后，可根据训练目标重复进行，保持呼吸节奏——下降时吸气，返回时呼气。\n6. 如需进阶，可在双手握哑铃、杠铃片或将手臂伸直过头，以增加核心负荷。', '1. 确保GHD机器稳固，脚踝绑带已紧固，防止在动作过程中滑脱。\n2. 动作全程保持脊柱中立，避免出现圆背或过度伸展，以免造成腰椎压力过大。\n3. 初学者应在有人监督或使用轻负荷的情况下练习，逐步提高难度。', '1. 背部塌腰或拱背（脊柱失去中立）导致腰椎受压，容易引发下背疼痛。\n2. 动作过快，利用惯性完成下降和上升，失去对核心的控制。\n3. 脚踝固定位置不当或垫子高度不合适，使动作幅度受限或产生不舒适的姿势。', '1. 如大腿后侧柔韧性不足，可适当升高垫子，以减小髋屈角度。
2. 对于腰背力量较弱的人群，可先练习半程动作，待核心力量提升后再完成全程。
3. 如想降低难度，可将手臂放在胸前或体侧；若想提升挑战，则可将手臂伸直过头或手持哑铃/杠铃片。', 'compound', '{"无负荷":"使用自身体重进行练习，适合初学者熟悉动作轨迹。","负重":"双手握住哑铃、杠铃片或杠铃，置于胸前或头部上方，以增加核心负荷。","单侧":"仅使用单侧腿固定，另一侧腿抬起做单腿练习，提高核心不平衡抗力。","慢速控制":"在下降和上升阶段分别用3–4秒完成，以增加肌肉持续张力并提升控制能力。","半程":"只下降到躯干约与地面成45°角即返回，避免全幅伸展带来的腰椎压力。"}', 'published', NOW(3), NOW(3));
SET @eid_522 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腿后肌群 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 腰方肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('平板支撑侧转', 'core', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：俯卧在垫子上，双手屈肘支撑，前臂贴地，身体保持从头顶到脚踝的直线，核心收紧。\n2. 准备阶段：吸气，胸部稍微上抬，保持肩胛骨收紧，避免耸肩。\n3. 侧转动作：呼气时，将左侧臀部向上提并向右侧旋转，同时右肩向左转，右臂向天花板伸展，左手保持在前臂上支撑。旋转幅度以保持身体侧向伸展为准，避免腰椎过度扭转。\n4. 动作顶端保持：在此姿势保持1-2秒，感受侧腹（腹外斜肌、腹内斜肌）和肩部的紧绷。\n5. 恢复姿势：吸气，缓慢将身体放回平板支撑姿势，控制臀部不要塌陷或过度上升。\n6. 交替进行：在另一侧重复相同动作，交替完成设定的次数或时间。', '• 保持核心持续收紧，避免腰部塌陷导致腰椎压力过大。\n• 旋转时肩部保持中立位置，手腕不要过度扭转，防止肩关节受伤。\n• 若有肩部、背部或髋部不适，建议在专业教练指导下进行或先做改良版。', '• 臀部抬得过高或塌陷，使腰椎承受不必要的力量。\n• 旋转幅度过大，导致腰椎过度扭转，产生腰部不适。\n• 动作过程中屏住呼吸，导致血压升高，应保持自然的呼吸节奏。', '• 初学者可先做小幅度的侧转，逐步增加旋转角度和保持时间。
• 若肩部不适，可改为手肘支撑的平板侧转，降低肩部负荷。
• 可使用瑜伽垫或软垫提供更好的支撑，减少手腕压力。', 'compound', '{"跪姿平板侧转":"将双手支撑改为膝盖支撑，降低核心负荷，适合初学者。","单手支撑侧转":"在侧转时抬起一只手，增加对核心稳定性的挑战，提高难度。","侧平板支撑":"保持侧卧姿势并抬起单臂，进一步强化侧腹和肩部力量。"}', 'published', NOW(3), NOW(3));
SET @eid_480 = LAST_INSERT_ID();
-- Suggested muscle: 腹外斜肌 (agonist)
-- Suggested muscle: 腹内斜肌 (agonist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 脊柱竖脊肌 (stabilizer)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 肩部三角肌（前束） (synergist)
-- Suggested muscle: 胸大肌 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('悬垂举腿', 'core', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：握住横杆，双手与肩同宽或略宽，身体悬挂，脚踝自然垂下，保持核心紧绷。\n2. 预备动作：吸气，收紧腹肌，微微向后倾，使身体呈轻微后仰姿势，避免使用惯性。\n3. 抬腿：呼气，屈髋并将双腿向上举起，尽量将膝盖抬至胸部或更高，保持双腿伸直或略弯，避免摆动。\n4. 高点保持：在最高点稍作停顿，感受腹肌的收缩，保持背部自然伸展，避免过度弓背。\n5. 缓慢下降：吸气，控制下降速度，慢慢将腿放回起始位置，避免自由落体，以保持核心持续发力。', '1. 确保横杆稳固，使用握力带或手套防止滑手。\n2. 初学者或肩部不适者应在教练指导下进行，避免过度肩部受力。\n3. 动作过程中避免使用摆动或甩腿，以免造成腰椎压力过大。', '1. 使用摆动带动腿上举，导致动作失去对核心的锻炼效果。\n2. 举腿时膝盖过度弯曲或腰部过度弓背，导致腰椎压力。\n3. 下降时失控快速下落，失去对核心的控制。', '1. 初学者可以先做膝盖抬举或悬垂收膝，降低难度。
2. 中级可在举腿最高点保持2-3秒，增强持续收缩。
3. 进阶者可尝试负重腰带或在举腿时做侧向举腿，增加挑战。', 'compound', '{"悬垂抬膝":"将膝盖抬至胸部以下即可，减小髋屈范围，适合初学者。","悬垂侧举腿":"在举腿的同时向侧面倾斜，可加强腹斜肌。","负重悬垂举腿":"使用踝负重或腰带增加阻力，提升强度。","单腿悬垂举腿":"单腿进行，提高核心不平衡控制。","器械辅助举腿":"使用举腿器械或吊环，可降低肩部负担。"}', 'published', NOW(3), NOW(3));
SET @eid_484 = LAST_INSERT_ID();
-- Suggested muscle: 髂腰肌 (agonist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 横腹肌 (stabilizer)
-- Suggested muscle: 脊柱伸肌 (antagonist)
-- Suggested muscle: 前臂屈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('旋转药球传递', 'core', 'other', 'intermediate', NULL, '1. 起始姿势：双脚与肩同宽站立，膝盖微屈，保持核心紧绷，双手握住药球置于胸前。\n2. 预备旋转：在保持核心收紧的同时，向右侧旋转上半身，右手将药球向下转动并准备向外传递。\n3. 传递动作：利用腹斜肌和胸肩的力量，将药球快速向左侧甩出，动作结束时双臂伸直，身体转向左侧。\n4. 接收与换手：在药球即将到达左侧时，用左手在胸前或略低于胸部的位置接住药球，然后立即准备进行下一次相反方向的旋转。\n5. 连续进行：保持呼吸与动作的连贯性，交替向左右两侧旋转并传递药球，完成设定的次数或时间。', '1. 事先进行全身热身，尤其是核心和肩部，以防拉伤。\n2. 使用合适重量的药球，避免因重量过大导致姿势失控或扭伤。\n3. 保持核心持续收紧，避免单独使用手臂力量，以减少下背部压力。', '1. 只用手臂力量传递药球，忽视核心的旋转驱动。\n2. 动作时膝盖内扣或背部过度前倾，导致腰椎负担增加。\n3. 旋转幅度不足，导致药球传递路径短，训练效果减弱。', '如需降低难度，可双脚稍宽站立或使用更轻的药球；如想增加挑战，可在每次旋转后加入交叉步或使用较重的药球。', 'compound', '{"单手版":"将药球只用一只手握住，旋转时保持另一只手臂自然伸展，增强单侧核心控制。","双脚宽站姿版":"将双脚分得更宽以提升稳定性，适合初学者或需要更好支撑的练习者。","轻重量药球版":"使用比平时轻30%~50%的药球，以专注于动作技术和核心发力，避免因重量导致姿势失控。","墙面对传版":"面对墙壁站立，将药球直接投向墙面并弹回接住，替代合作伙伴的传递，适合自行训练。","交叉步版":"在每次旋转时加入轻微的交叉步或跨步，增加下肢参与度和全身协调性。"}', 'published', NOW(3), NOW(3));
SET @eid_540 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (agonist)
-- Suggested muscle: 横腹肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (synergist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 臀中肌 (stabilizer)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 胸大肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('早安式', 'core', 'barbell', 'intermediate', NULL, '1. 初始姿势：站立，双脚与肩同宽，杠铃横置于上背部（斜方肌上方），保持背部挺直，眼睛平视前方。\n2. 准备动作：收紧核心、臀部，略微屈膝，臀部向后推，上半身向前倾，保持杠铃水平移动，胸部接近与地面平行。\n3. 下降过程：缓慢向前倾斜，臀部继续后坐，背部保持平直或轻微自然弧度，避免弓背或过度圆形背部；动作幅度约至躯干与地面呈45度左右或感到臀部与腿后侧有适度拉伸。\n4. 上升过程：用力通过臀部与腿后侧发力，将躯干推回起始姿势，保持背部挺直，胸部向上抬起，返回站立位置。\n5. 完成动作后，轻轻抖动双臂放松，或进行适量的伸展动作以舒缓背部肌肉。', '确保背部始终挺直，避免在下降时出现圆形背部。,使用适当重量，保持杠铃稳固，防止滑落或失控。,在动作全程保持膝盖微屈，避免膝盖锁定导致关节压力过大。', '弯腰过度，使脊柱承担过大负荷。,膝盖过度弯曲或伸直，导致力量转移不正确。,使用过大的重量导致动作失控，背部出现前倾。', '如柔韧性不足，可适度弯曲膝盖，以减轻下背部的拉伸感。,脚站宽度可适当调整，窄站距更侧重腿后侧，宽站距更强调臀部。,如肩部不适，可将杠铃位置调至更低的上背部或使用护肩垫。', 'compound', '{"哑铃版":"使用两只哑铃置于肩部两侧，替代杠铃，保持相同的动作轨迹和重心。","无器材版":"双手交叉置于胸前或背后进行徒手早安式，注意控制背部角度和动作幅度。"}', 'published', NOW(3), NOW(3));
SET @eid_525 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 股四头肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 腰方肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('死虫式', 'core', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：仰卧，双膝弯曲，双脚平放在地面，双手伸直向上指向天花板。\n2. 抬起双臂和双腿，使髋关节和膝关节均呈90度角，膝盖在髋关节正上方。\n3. 保持背部紧贴地面，尤其是下背部，用腹肌的力量将腰部压向地面。\n4. 吸气时，将左臂向后伸展至几乎触碰地面，同时右腿向下滑动，保持膝盖90度。\n5. 呼气时，收回左臂和右腿回到起始姿势，换右侧做同样动作。\n6. 交替进行，确保动作平稳、呼吸均匀，避免腰部抬起或摆动。', '1. 确保下背部始终贴地，避免过度拱背导致腰椎压力。\n2. 若有颈部不适，可在头部下方放置轻薄的垫子支撑。\n3. 进行动作时保持呼吸顺畅，切勿憋气，以免血压升高。', '1. 抬起下背部或使用惯性导致动作幅度过大。\n2. 膝盖未保持在髋部正上方，导致髋屈肌过度拉伸。\n3. 动作速度过快，失去核心控制，增加受伤风险。', '如感难度过高，可先进行“半死虫式”，即膝盖弯曲角度更大，手臂仅轻触地面；如想增加挑战，可尝试“负重死虫式”，在胸前放置轻量哑铃或使用弹力带加大阻力。', 'isolation', '{"半死虫式":"保持膝盖弯曲角度更大，手臂轻触地面即可，降低核心负荷，适合初学者。","全死虫式":"双臂、双腿均伸直，保持背部贴地，提升动作幅度和核心控制难度。","负重死虫式":"胸前放置轻量哑铃或使用弹力带，提升上肢抗阻，增强核心稳定性。","侧死虫式":"侧卧进行单侧手臂和腿部伸展，侧重点在侧面核心与髋部外侧肌群。","交叉死虫式":"左臂伸展时右腿下降，随后右臂伸展时左腿下降，交替进行，增强对侧协同控制。"}', 'published', NOW(3), NOW(3));
SET @eid_513 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 横腹肌（腹横肌） (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 髂腰肌（髂肌、腰大肌） (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 多裂肌 (stabilizer)
-- Suggested muscle: 臀大肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索侧拉', 'core', 'cable', 'intermediate', NULL, '1. 调整滑轮至与肩同高或稍高，握住把手，双脚与肩同宽站立，膝盖微屈，保持核心紧绷。\n2. 起始姿势：手臂伸直靠身体侧，胸部略微前倾，背部保持自然直立。\n3. 呼气时，利用侧腹（外斜肌）和腹直肌发力，将把手向对侧斜下方拉动，手臂保持微屈，跟随躯干转动。\n4. 动作到达最低点时，手臂约在胸前或略低于胸部，感受侧腹的强烈收缩，保持1‑2秒。\n5. 吸气，缓慢放回把手，沿原轨迹回到起始位置，动作受控，避免利用惯性。\n6. 完成一组后换另一侧重复，循环进行。', '1. 选择适当的重量，确保滑轮固定，防止因重量过大导致动作失控。\n2. 保持背部自然直立，避免过度扭转或弓背，以减少脊柱受伤风险。\n3. 全程收紧核心，防止腰部塌陷或下背部过度伸展。', '1. 使用过大的重量导致动作甩摆，侧腹未被充分激活。\n2. 动作幅度过小，仅用肩臂拉动，未真正调动侧腹肌肉。\n3. 呼吸节奏错误，在吸气时仍用力拉，容易升高血压并降低动作效果。', '• 滑轮高度可根据目标肌肉调节：高位滑轮更强调背阔肌和肩部，低位滑轮更侧重侧腹收缩。
• 握把可换成绳索或V型把手，以改变手腕角度和肌肉参与度。
• 站距可略宽或窄，宽站姿提升稳定性，窄站姿增加核心挑战。', 'compound', '{"高位侧拉":"将滑轮调至头顶高度，使用绳索把手，进行向下的侧拉动作，可更好刺激背阔肌和肩部。","低位侧拉":"将滑轮调至膝盖以下，使用V型把手，进行向上拉起的侧拉，可强化外斜肌和腹直肌的协同收缩。","单臂侧拉":"仅用一只手握住把手，另一只手扶住固定物体，专注于单侧侧腹发力，提高侧腹不平衡的矫正效果。"}', 'published', NOW(3), NOW(3));
SET @eid_508 = LAST_INSERT_ID();
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 背阔肌 (synergist)
-- Suggested muscle: 脊柱竖肌 (stabilizer)
-- Suggested muscle: 肩部后束 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('罗马椅卷腹', 'core', 'other', 'intermediate', NULL, '1. 调整罗马椅高度，使髋部靠在靠垫上，脚踏在脚垫上，双手交叉放在胸前或置于耳后。\n2. 收紧核心（腹肌），在保持躯干稳定的前提下，慢慢将上半身向上卷起，让胸骨向骨盆方向移动。\n3. 在动作的顶部（约卷至胸部离靠垫约10‑15 厘米）停顿约一秒钟，确保腹肌完全收缩。\n4. 缓慢控制地将上半身放回起始位置，避免猛地放下，保持肌肉的离心控制。\n5. 重复进行10‑15次，视个人训练水平而定，完成2‑3组。', '1. 使用前检查罗马椅稳固，确保座椅、脚垫无松动。\n2. 动作时保持脊柱自然弧度，避免过度弓背或用力过猛导致腰椎受伤。\n3. 初学者或腰部不适者应在有人陪伴或使用辅助工具的情况下进行。', '1. 用腿部力量抬起上半身，导致腹肌参与不足。\n2. 卷腹时幅度过大，出现腰部过度弯曲或耸肩。\n3. 动作速度过快，缺少对腹肌的收缩感受，使用冲力完成次数。', '1. 调整座椅高度，使髋部正好位于靠垫边缘，保持舒适。
2. 脚垫位置可根据个人柔韧性微调，确保下背不离开靠垫。
3. 如需增加难度，可手持哑铃或负重背心；如感困难，可减小卷腹幅度或使用弹力带辅助。', 'isolation', '{"变体类型":"地板卷腹","转换建议":"在没有罗马椅的情况下，可躺在平面或垫子上进行相同的卷腹动作，保持核心收紧并控制动作幅度。"}', 'published', NOW(3), NOW(3));
SET @eid_479 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外部腹斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 竖脊肌 (antagonist)
-- Suggested muscle: 股四头肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('药球俄挺', 'core', 'other', 'advanced', NULL, '1. 准备姿势：坐在地面或训练垫上，双膝弯曲，双脚平放在地上，若想增加难度可将双脚抬离地面。\n2. 持球：双手握住合适重量的药球，放在胸前，手肘微屈，肩部保持放松。\n3. 起始姿势：收紧腹部、背部和臀部，使躯干保持直立，胸部略微向上抬起。\n4. 旋转动作：利用核心力量，将上半身向右侧旋转，同时将药球向右侧挥动，动作保持平稳，避免借助惯性。\n5. 返回中心：控制动作，慢慢回到起始的正面姿势，确保背部始终挺直。\n6. 换向旋转：重复同样的动作向左旋转，完成一次完整的循环。根据训练目标进行 10–15 次或设定时间。', '1. 保持背部挺直，避免弓背或塌腰，以免下背受伤。\n2. 使用适当重量的药球，初学者应从轻量开始，防止肩部或手腕过度负荷。\n3. 若感到腰背疼痛或肩部不适，应立即停止并咨询专业教练或医生。', '1. 双脚抬得过高或完全离开地面，导致核心失稳和背部过度弯曲。\n2. 使用过多的手臂力量而非核心力量完成旋转，产生动量转移。\n3. 在旋转时肩部过度前倾或耸肩，使肩颈部位紧张。', '1. 若核心力量不足，可先将双脚放在地面上进行练习。
2. 增加难度可以抬起双脚或使用更重的药球，亦可加入脚踝固定带来限制腿部晃动。
3. 动作熟练后，可在旋转的最高点暂停 1–2 秒，提高肌肉激活程度。', 'compound', '{"变体类型":"单手药球俄挺、站姿药球俄挺、无药球徒手俄挺等，可根据训练目标选择不同的变体进行转换。"}', 'published', NOW(3), NOW(3));
SET @eid_543 = LAST_INSERT_ID();
-- Suggested muscle: 腹外斜肌 (agonist)
-- Suggested muscle: 腹内斜肌 (agonist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 胸大肌 (synergist)
-- Suggested muscle: 肩前束 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('药球卷腹', 'core', 'other', 'intermediate', NULL, '1. 起始姿势：仰卧在垫子上，双膝弯曲，双脚平放地面，双手握住药球，手臂向上伸展，掌心相对。\n2. 收紧核心，深呼气，利用腹部力量抬起上背部，同时将药球向前摆动至胸前或小腿附近。\n3. 继续向上卷腹，使躯干接近垂直位置，保持手臂伸展或稍微弯曲以支撑药球。\n4. 在最高点稍作停顿，感受腹部肌肉的收缩。\n5. 吸气，缓慢将躯干放回起始位置，药球随之上举，保持背部平贴垫子，避免背部过度弓起。\n6. 重复规定次数。', '确保训练区域无障碍，使用垫子防止滑倒。,保持颈部自然，避免用力拉绳或用手臂带动头部。,运动过程中不要憋气，保持呼吸节奏，尤其是用力时呼气。', '下背抬起导致腰椎过度弓背，增加受伤风险。,使用冲力摆动身体而不是主动收缩核心力量。,药球握持位置过远或后仰，使肩部产生不必要的压力。', '初学者可将膝盖抬高或使用较轻的药球，减小动作幅度；进阶者可手持药球在头顶进行全程卷腹，或采用单臂卷腹以增加斜向负荷。', 'compound', '{"变体类型":"单臂药球卷腹","转换建议":"将药球握在一只手中进行卷腹，另一只手臂自然放在体侧或伸直，以增加腹斜肌的协同工作，适用于提升核心旋转控制与侧向稳定性。"}', 'published', NOW(3), NOW(3));
SET @eid_473 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹外斜肌 (synergist)
-- Suggested muscle: 腹内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 股直肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腰方肌 (stabilizer)
-- Suggested muscle: 胸大肌（上部） (synergist)
-- Suggested muscle: 前三角肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('药球卷腹传递', 'core', 'other', 'intermediate', NULL, '1. 起始姿势：仰卧在垫子上，膝盖弯曲，双脚平放在地面，双手握住药球置于胸前。\n2. 核心收紧，呼气的同时用力收缩腹直肌和髂腰肌，将上半身向上卷起，保持背部微微离开地面，呈半坐姿。\n3. 当上半身抬至约45°~60°的坐姿顶点时，将药球用力向前推出，传递给对面的伙伴或目标位置，动作要爆发且平稳。\n4. 完成传递后，吸气并控制核心慢慢将上半身放回起始位置，保持背部不直接撞击地面，整个过程保持腹肌持续发力。\n5. 接收药球（如有伙伴）后，重复上述动作，完成设定的次数或时间。', '1. 在进行前务必进行充分的热身，尤其是核心、髋屈肌和肩部，以防受伤。\n2. 选择合适重量的药球，避免使用过重导致脊柱过度负荷或姿势失控。\n3. 传递药球时确保周围有足够空间，防止球撞击他人或硬物，且要注视球的轨迹，避免面部受伤。', '1. 仅用上肢力量抛球，而未真正激活核心，使动作失去对腹肌的锻炼效果。\n2. 起身时出现过度弓背（腰椎过度伸展），增加下背部受伤风险。\n3. 动作节奏不稳，快速下落导致冲击力集中在背部，容易引起腰背不适。', '1. 初学者可先使用轻重量药球，幅度控制在半坐姿，逐步增加卷腹深度。
2. 如感到平衡困难，可在背后放置稳固的靠背或靠墙进行练习。
3. 若肩部不适，可将球置于胸前进行胸前交接，而不必向前推出，以减轻肩关节负担。', 'compound', '{"同伴传递":"与伙伴面对面站立，保持相同的卷腹节奏，伙伴在接球后立即回传，可增加协作与节奏感。","单臂传递":"只用单手握住药球进行卷腹和传递，增加核心的不对称负荷，提高核心抗旋转稳定性。","站姿传递":"站立时进行躯干转动并向前传递药球，模拟投掷动作，可增强髋部旋转力量与核心的协同工作。"}', 'published', NOW(3), NOW(3));
SET @eid_547 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 外斜肌 (agonist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 横腹肌 (stabilizer)
-- Suggested muscle: 臀大肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('鸟狗式', 'core', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：四肢着地，双手位于肩正下方，双膝位于髋正下方，保持背部平直，目视地面。\n2. 收紧核心，确保腹部和背部肌肉同时激活，保持脊柱自然中立位。\n3. 同时抬起左臂和右腿，使左臂向前伸展（与地面平行），右腿向后伸展（与地面平行），保持手臂和腿部伸直。\n4. 在最高点保持姿势约2秒，感受核心、臀部以及背部肌肉的紧绷。\n5. 缓慢回到起始姿势，控制动作速度，避免猛然下落。\n6. 换另一侧（右臂+左腿）重复相同步骤，完成设定的次数或时间。', '保持背部平直，避免弓背或塌腰，以免对腰椎产生过大压力。,在抬起四肢时动作要平稳，避免使用惯性或弹力，确保核心持续紧绷。,如出现下背疼痛或肩部不适，应立即停止并请教专业教练或医疗人员。', '在抬腿或抬臂时出现显著的旋转或摆动，导致身体不稳。,动作过程中腰部过度下沉（塌腰），使腰椎受压。,使用过大的幅度或速度，导致动作失去控制，削弱核心锻炼效果。', '如果核心力量不足，可先只抬单臂或单腿，熟练后再同时抬起对侧手脚；如果想增加难度，可在抬起手脚的同时让对侧的肘与膝轻触，或使用平衡板、瑜伽球等不稳定支撑面进行训练。', 'compound', '{"简化变体":"先只做单臂伸展或单腿伸展，待核心稳定后再尝试对侧同时抬起；也可在四足跪姿下用手轻触膝盖以降低难度。","高难度变体":"在空中同时伸展四肢并保持数秒，或在平衡垫、健身球上执行，以增加平衡挑战；还可尝试在最高点轻触对侧肘部与膝盖，提升核心控制。"}', 'published', NOW(3), NOW(3));
SET @eid_514 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腹直肌 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 肩部三角肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)

