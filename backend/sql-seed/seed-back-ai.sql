-- AI 生成的 back 动作详情
USE fitlc;

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('杠铃划船', 'back', 'barbell', 'beginner', NULL, '1. 双脚与肩同宽站立，双手握杠铃，握距略宽于肩，手掌向下。\n2. 俯身，保持背部挺直，膝盖微屈，躯干倾斜约45度，目光向下看地面。\n3. 将杠铃向身体拉起，手肘贴近身体两侧，用背部肌肉发力，杠铃触碰下胸或上腹。\n4. 在动作顶点稍微挤压肩胛骨，感受背部肌肉收缩。\n5. 缓慢控制杠铃下降，伸直手臂回到起始位置，保持背部挺直，避免晃动。', '确保背部全程保持挺直，避免弓背或塌背，以防止下背部受伤。,使用适当的重量，最好有教练或伙伴在旁监督，防止失去平衡或拉伤。,在拉起杠铃时避免使用惯性甩动，保持动作控制，尤其在下降阶段。', '在拉起时耸肩或用手臂力量过多，导致背部发力不足。,动作幅度不足，杠铃只拉到胸前而未充分收紧背阔肌。,背部过度弯曲或塌背，导致腰椎受压，增加受伤风险。', '如果感到下背部压力大，可适当降低俯身角度或采用坐姿划船；如果肩关节不适，可缩短握距或使用哑铃进行单臂划船以降低肩部负担。', 'compound', '{"哑铃划船":"保持相同的动作轨迹和背部收紧感，换用哑铃可更好专注单侧肌肉发展。","俯身单臂划船":"适合想要更孤立背阔肌或改善左右不对称的人群，动作更易保持脊柱中立。","坐姿划船":"通过滑轮或器械实现，对下背部的压力更小，适合腰椎有问题的练习者。"}', 'published', NOW(3), NOW(3));
SET @eid_163 = LAST_INSERT_ID();
-- Suggested muscle: 背阔肌 (agonist)
-- Suggested muscle: 斜方肌（中束） (synergist)
-- Suggested muscle: 菱形肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 二头肌 (synergist)
-- Suggested muscle: 后三角肌 (synergist)
-- Suggested muscle: 前臂屈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('TRX划船', 'back', 'other', 'beginner', NULL, '1. 调整TRX带子至适当长度，双手握住把手，手臂伸直，肩部放松，肩胛骨自然展开\n2. 脚尖着地支撑，身体向后倾斜约30-45度，保持身体从头到脚呈一条直线，核心收紧\n3. 肩胛骨发力后收，手肘弯曲，将身体向把手方向拉起，同时肘关节向身体两侧靠拢\n4. 在动作顶峰位置停顿1秒，感受背部肌肉（尤其是背阔肌）充分收缩\n5. 缓慢控制地伸展手臂，肩胛骨恢复自然位置，身体回到起始姿态\n6. 重复进行动作，保持稳定的节奏和呼吸节奏', '1. 使用前必须检查TRX锚点和带子完好无损，确保固定牢固可靠\n2. 动作过程中保持核心收紧，避免腰部下塌形成弓背姿势\n3. 始终保持肩胛骨稳定下沉，不要耸肩或让肩膀向耳朵方向移动', '1. 身体过度晃动或摇摆，利用惯性完成动作而非肌肉控制\n2. 动作主要由手臂发力完成，背部肌肉参与不足，导致二头肌过度疲劳\n3. 没有充分后收肩胛骨，动作幅度过小，背部收缩不充分\n4. 速度过快，缺乏对重量的控制，减弱训练效果并增加受伤风险', '降低难度：将TRX带子调短，脚靠近锚点位置，身体更直立；或屈膝降低体重负担
增加难度：将脚远离锚点，身体更加水平；或单手练习增加核心挑战
调节握法：窄握侧重下背部，宽握侧重背阔肌外侧；掌心向上握可增加二头肌参与', 'compound', '{"单臂划船":"转为单手握TRX把手，增加核心稳定挑战和不对称力量训练","高位划船":"站立更直立，更多锻炼斜方肌中下束和菱形肌","低位划船":"更大幅度倾斜身体，更多强调背阔肌的拉伸和收缩","宽握划船":"加宽双手间距，更针对背阔肌宽度发展","暂停划船":"在顶峰收缩位置暂停2-3秒，增强肌肉激活和力量输出"}', 'published', NOW(3), NOW(3));
SET @eid_171 = LAST_INSERT_ID();
-- Suggested muscle: 背阔肌 (agonist)
-- Suggested muscle: 斜方肌（中下束） (agonist)
-- Suggested muscle: 菱形肌 (agonist)
-- Suggested muscle: 肱二头肌 (synergist)
-- Suggested muscle: 三角肌后束 (synergist)
-- Suggested muscle: 胸大肌 (antagonist)
-- Suggested muscle: 三角肌前束 (antagonist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 臀大肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('TRX引体向上', 'back', 'other', 'intermediate', NULL, '1. 调整TRX带子长度，使其垂直且把手与胸部同高，握住把手，手掌朝前，双手间距与肩同宽或略宽；2. 身体悬挂于带子下方，双脚并拢或稍分开，核心收紧，身体呈一条直线，从头到脚保持对齐；3. 启动时先下沉肩胛骨，收缩背阔肌，感受肩部向下向后移动，避免耸肩；4. 拉动身体向上移动，主要依靠背部发力将下巴拉过把手高度，手肘向身体两侧收紧；5. 在动作顶部保持收缩1-2秒，充分挤压背部肌肉，感受背阔肌的收缩；6. 缓慢下放身体，控制速度直到手臂完全伸直，保持肩胛骨轻微后收状态，准备下一个重复动作。', '1. 训练前检查TRX锚点是否牢固可靠，确保带子无磨损或损坏；2. 动作全程保持核心紧绷，避免身体过度摇摆或旋转，下放时控制速度避免关节受伤；3. 如果无法完成完整动作，不要强行悬挂，建议选择难度较低的变体动作替代。', '1. 耸肩发力导致斜方肌过度参与，降低背阔肌刺激效果；2. 身体摆动过大，利用惯性而非背肌力量完成动作；3. 下放时速度过快或不完全，导致肌肉张力中断，无法充分刺激目标肌群。', '新手可以降低动作范围，只做半程引体向上或使用凳子辅助支撑双脚来减少难度；高级训练者可以单手引体向上、单腿悬垂引体向上或额外负重腰带挂配重片来增加挑战；调整TRX带子长度也可以改变动作角度，缩短带子降低难度，加长带子增加难度。', 'compound', '{"澳洲引体向上":"如果TRX引体向上太难，可以先将TRX把手调至与腰部同高，采用澳大利亚引体向上（水平引体）的姿势进行训练，逐步过渡到标准TRX引体向上；","辅助引体向上":"在TRX中下方放置一个稳定的箱子或凳子，将一只脚或膝盖放在上面获得辅助支撑，逐步减少辅助力量直到能独立完成；","离心引体向上":"从跳上或踏凳上到顶端位置开始，然后缓慢下放（3-5秒），这种离心训练可以增强肌腱和肌肉力量，为完整动作做准备。"}', 'published', NOW(3), NOW(3));
SET @eid_172 = LAST_INSERT_ID();
-- Suggested muscle: 背阔肌 (agonist)
-- Suggested muscle: 斜方肌（中下束） (synergist)
-- Suggested muscle: 大圆肌 (synergist)
-- Suggested muscle: 肱二头肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 胸大肌 (antagonist)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('侧平板支撑', 'back', 'bodyweight', 'beginner', NULL, '1. 起始姿势：侧卧在瑜伽垫上，用前臂支撑身体，肘部弯曲约90度，位于肩膀正下方。双腿伸直，脚尖着地叠放在一起，身体从头顶到脚跟形成一条直线。\n2. 收紧核心肌群：将腹部向内收，想象用力将肚脐拉向脊椎，以稳定躯干。\n3. 抬起髋部：将髋部向上推，使身体离开地面，仅以前臂和脚尖支撑。整个身体从头到脚应保持一条直线。\n4. 保持姿势：保持这个侧支撑姿势，保持自然呼吸，维持腹部收紧状态。\n5. 换侧练习：保持规定时间后，缓慢将髋部落回地面，休息片刻后换另一侧重复相同动作。', '1. 如果感到手腕或肩膀不适，可在肘部下方垫一条折叠的毛巾或垫子以减轻压力。\n2. 练习时保持均匀呼吸，不要憋气，以维持核心稳定。\n3. 如果在练习过程中出现下背部疼痛，应立即停止并降低难度或咨询专业人士。', '1. 髋部下降：许多练习者会让髋部向地面塌陷，使身体失去一条直线姿势，降低训练效果。\n2. 头部下垂或后仰：头部应保持与身体成一直线，不要向前垂或向后仰。\n3. 脚部位置错误：双脚重叠时上方脚应在前面，确保支撑稳定，避免脚踝扭伤。', '初学者可采用膝部支撑来降低难度，将下方膝盖放在地面上，仍保持身体平直。随着核心力量提升，逐渐过渡到全脚支撑的完整侧平板支撑。对于进阶者，可在保持侧支撑时将上方手臂向天花板方向伸直，或在髋部上下轻微移动以增加挑战。', 'compound', '{"降低难度":"从膝部侧平板支撑开始练习，屈膝90度支撑身体，逐步建立核心力量后再过渡到全脚支撑。","增加难度":"可尝试动态侧平板支撑，在保持侧撑姿势下将上方腿抬起，或在侧撑状态下进行手臂上举练习以增加平衡挑战。","替代动作":"如无法进行侧平板支撑，可使用侧卧髋外展动作代替，孤立锻炼髋外展肌群。","组合训练":"可与正面平板支撑结合，形成平板支撑系列训练，全面锻炼核心稳定性。"}', 'published', NOW(3), NOW(3));
SET @eid_169 = LAST_INSERT_ID();
-- Suggested muscle: 腹斜肌 (agonist)
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀中肌 (synergist)
-- Suggested muscle: 腰方肌 (synergist)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 三角肌前束 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('保加利亚分裂蹲', 'back', 'barbell', 'advanced', NULL, '1. 初始站姿：双脚与肩同宽，将杠铃置于上背部（斜方肌上），保持胸部抬起，背部挺直。\n2. 起始姿势：一只脚向前迈出约60-90厘米，另一只脚向后放置于稳固的凳子或平台上，脚尖自然着地。\n3. 下蹲：屈膝下蹲，保持前脚膝盖在脚尖正上方，后脚膝盖接近地面，躯干保持直立，目视前方。\n4. 保持：下蹲至前腿大腿与地面平行或略低于平行，保持核心收紧，背部挺直，避免前倾。\n5. 推起：使用前腿和臀部的力量向上推起身体，回到起始姿势，保持动作平稳，避免弹跳。\n6. 换腿：完成设定的重复次数后，换另一侧腿继续进行。', '• 确保杠铃稳固放置在上背部，避免压在颈椎上。\n• 使用稳固的凳子或平台，防止后脚滑动或失衡。\n• 在下蹲和起立过程中保持核心稳定，避免膝盖内翻或外翻导致受伤。', '• 前脚膝盖过度前伸，超出脚尖，导致膝关节压力过大。\n• 背部过度前倾或弓背，导致腰椎受压。\n• 后脚位置太低或太高，导致身体不平衡或下蹲幅度不足。', '• 对于肩部柔韧性不足的练习者，可使用垫子或把杠铃换成哑铃进行同样的动作。
• 若后腿平台不稳，可使用踏板或箱子来调节高度，确保安全。
• 初学者可以先从自重保加利亚分裂蹲开始，逐步过渡到负重。', 'compound', '{"无器械版本":"使用自身体重进行保加利亚分裂蹲，保持相同站距和下蹲深度。","哑铃版本":"双手各持一只哑铃，置于肩部两侧，执行相同的动作轨迹。","壶铃版本":"将壶铃置于胸前或两侧，保持胸部挺直，下蹲时保持平衡。","单腿版本":"在标准保加利亚分裂蹲的基础上，将后侧的凳子移除，单纯使用前腿完成动作，提高难度。"}', 'published', NOW(3), NOW(3));
SET @eid_104 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 斜方肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('健身球背伸展', 'back', 'other', 'beginner', NULL, '1. 准备姿势：坐在健身球上，双脚平放地面，肩胛骨靠在球上，身体呈直线。\n2. 调整球的位置：让球正好位于下背部和臀部之间的支撑点，背部略微后倾，确保球不会滑动。\n3. 起始动作：双手交叉放在胸前或置于耳侧，保持头部中立，目视地面。\n4. 下降动作：慢慢向后倾下上身，利用背部肌肉控制下降幅度，保持背部平直，避免过度弯曲腰椎，下降至胸部接近地面或感到背部轻微拉伸。\n5. 上升动作：收缩背部竖肌和臀部肌肉，将上半身抬回起始姿势，保持核心收紧，避免利用惯性。\n6. 呼吸配合：下降时吸气，上升时呼气，保持呼吸平稳。', '确保球放在防滑垫上，防止滑动导致受伤。,动作幅度不宜过大，避免腰椎过度伸展或压迫。,初学者应在有人监督或靠墙的情况下练习，以免失去平衡。', '过度弯曲腰部导致腰椎过度屈曲。,使用手臂力量或头部抬起过度，导致颈部受力。,动作速度过快，缺乏对背部肌肉的控制。', '脚距宽可以增加稳定性，窄则增加挑战；如背部柔韧性不足，可减小下降幅度，保持背部与地面接近的平行状态；如想增强核心参与，可在背伸展时收紧腹肌，保持背部平直。', 'compound', '{"半程背伸展":"如果想要更安全或针对初学者，可只做背部略微倾斜的半程动作，逐步提升至全程背伸展。","单腿背伸展":"将一条腿抬起，保持另一条腿固定，增加核心和背部发力需求，提高难度。"}', 'published', NOW(3), NOW(3));
SET @eid_175 = LAST_INSERT_ID();
-- Suggested muscle: 脊柱竖肌（竖脊肌） (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腹直肌 (antagonist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 多裂肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('单臂哑铃耸肩', 'back', 'dumbbell', 'beginner', NULL, '1. 站姿直立，双脚与肩同宽，保持背部挺直，核心收紧。右手握住一只哑铃，手臂自然垂于体侧，掌心朝向大腿，左手可放在腰上或扶住固定物体以保持平衡。\n2. 肩胛骨向上提，像是要把哑铃向上“耸肩”。在动作的最高点保持1‑2秒，感受上斜方肌的收缩。\n3. 控制速度，缓慢将肩胛骨下放回起始位置，避免弹跳或猛地放下。\n4. 完成预定次数后，换左手进行同样的动作，或按计划交替进行。\n5. 若想增加难度，可使用稍重的哑铃，或在动作最高点保持更长时间。\n6. 结束训练后，轻柔拉伸颈部及肩部，帮助肌肉放松。', '动作全程保持脊柱中立，避免过度后仰或前倾导致腰背受伤。,使用的哑铃重量应适中，避免耸肩时用力过猛导致肩部拉伤。,如果出现肩部或颈部不适，应立即停止并咨询专业人士。', '耸肩时主要使用手臂而不是肩胛骨，导致肱二头肌过度参与。,动作幅度过小，只做轻微的上下移动，未能充分拉伸或收缩上斜方肌。,使用过重的哑铃导致耸肩时耸肩过度，造成肩关节压力。', '初学者可以先使用轻重量或无负荷进行练习，感受肩胛骨的移动路径；如感到颈部紧张，可稍微转头或调低哑铃重量；肩部活动受限者应在耸肩前进行充分的热身和肩部活动范围练习。', 'isolation', '{"双臂哑铃耸肩":"双手各持一只哑铃，同时进行耸肩，可提升双侧上斜方肌的协调性。","杠铃耸肩":"使用杠铃进行耸肩，负荷更大，适合进阶训练者。","机器耸肩":"使用耸肩机或滑轮器械，提供稳定的负荷曲线，适合固定姿势练习。","侧向耸肩":"在耸肩时略微外展肩胛骨，可加强对中斜方肌的刺激。","站姿耸肩进阶":"在耸肩后加入肩胛骨后收或抬肩动作，形成复合动作，提高功能性力量。"}', 'published', NOW(3), NOW(3));
SET @eid_119 = LAST_INSERT_ID();
-- Suggested muscle: 上斜方肌（Upper trapezius） (agonist)
-- Suggested muscle: 提肩胛肌（Levator scapulae） (synergist)
-- Suggested muscle: 中斜方肌（Middle trapezius） (synergist)
-- Suggested muscle: 前锯肌（Serratus anterior） (stabilizer)
-- Suggested muscle: 菱形肌（Rhomboids） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('单臂绳索划船', 'back', 'cable', 'intermediate', NULL, '1. 站于Cable站前，调整滑轮高度至胸部水平或略低。\n2. 握住单臂绳索手柄，手掌向内（或采用中立握法），手臂略微弯曲，背部保持自然挺直。\n3. 站稳脚步，间距与肩同宽，核心收紧，胸部略抬，防止身体前倾或旋转。\n4. 用背阔肌发力，将手柄沿对侧胸部水平向后拉，动作全程保持肘部贴近身体侧面，至手臂基本与躯干平行，手柄贴近胸侧。\n5. 在顶峰位置稍作停顿，感受背阔肌的收缩，然后控制力量缓慢回到起始姿势，完成一次动作。\n6. 重复完成所需次数后换另一侧手臂进行相同训练。', '1. 在拉绳时保持背部挺直，避免弓背或塌腰，以减少下背受伤风险。\n2. 控制重量，避免使用过大负荷导致肩关节过度外展或旋转。\n3. 动作全程保持呼吸均匀，呼气发力、吸气回程，切忌憋气。', '1. 拉绳时使用手臂而非背部力量，导致二头肌过度参与，背阔肌刺激不足。\n2. 在拉动过程中身体前倾或扭转，使核心失去稳定，增加腰椎压力。\n3. 拉绳结束后未完全放回起始位置，导致动作幅度受限，背部肌肉刺激不完整。', '可以通过调整滑轮高度来改变背部肌肉的拉伸角度；低滑轮更适合强调背阔肌下部的拉伸，高滑轮则更侧重中上部；手柄可以换成宽握或窄握，以改变背阔肌的激活区域。', 'compound', '{"双侧绳索划船":"将单臂改为双臂握把，保持相同的动作轨迹与背部发力，重点在于控制对称性。","哑铃划船":"使用哑铃代替绳索，切换至单臂支撑姿势，注意保持核心稳定，避免躯干旋转。","杠铃划船":"使用杠铃进行水平划船，需要更大的核心控制，适合在训练后期进行负荷提升。"}', 'published', NOW(3), NOW(3));
SET @eid_137 = LAST_INSERT_ID();
-- Suggested muscle: 背阔肌 (agonist)
-- Suggested muscle: 菱形肌 (synergist)
-- Suggested muscle: 中斜方肌 (synergist)
-- Suggested muscle: 后三角肌 (synergist)
-- Suggested muscle: 二头肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹肌 (stabilizer)
-- Suggested muscle: 胸大肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('吊环划船', 'back', 'other', 'intermediate', NULL, '1. 双手握住吊环，手臂完全伸直，身体挺直呈一条直线，脚尖支撑地面，与地面约成30-45度角。\n2. 收紧核心和臀部，保持肩胛骨下沉收紧，准备开始动作。\n3. 肩胛骨内收带动手臂弯曲，将吊环向胸部两侧拉，同时肘关节向后收拢。\n4. 在动作顶峰位置，肘关节略超过身体平面，感受背部肌肉充分收缩。\n5. 保持控制力，缓慢将吊环放回起始位置，手臂再次完全伸直。\n6. 按照预定次数重复动作，保持身体姿态始终稳定。', '1. 确保吊环固定牢固，安装在能承受全身重量的稳定锚点上。\n2. 始终保持核心收紧，避免出现下背部塌陷或骨盆前倾的错误姿势。\n3. 建议在训练初期有教练或伙伴在旁监督，以便及时纠正动作问题。', '1. 身体过度摆动或利用惯性完成动作，降低训练效果且增加受伤风险。\n2.耸肩或肩胛骨过度上抬，导致斜方肌代偿，背阔肌发力不充分。\n3. 肘关节外展角度过大，使得动作更像是水平推而非划船。', '新手可以从较高的锚点开始，身体更接近垂直角度以降低难度；随着力量提升，逐步降低锚点高度增加强度。可以将双脚放在地面上开始支撑，待力量增强后再尝试悬空双脚。可通过改变握距调整训练重点，较宽的握距更针对背阔肌宽度。', 'compound', '{"降低难度":"提高吊环锚点高度，使身体更接近垂直角度，或双脚支撑地面进行练习。","增加难度":"降低吊环锚点高度，或将双脚放在高处使身体更接近水平；尝试单臂吊环划船增加不对称挑战。","变体动作":"可转换为吊环引体向上进一步强化背部，或采用不同握法（如对握、反握）改变肌肉刺激模式。","替代动作":"可用TRX划船、平板划船或杠铃划船作为替代练习。"}', 'published', NOW(3), NOW(3));
SET @eid_173 = LAST_INSERT_ID();
-- Suggested muscle: 背阔肌 (agonist)
-- Suggested muscle: 菱形肌 (agonist)
-- Suggested muscle: 斜方肌（中下部） (synergist)
-- Suggested muscle: 肱二头肌 (synergist)
-- Suggested muscle: 三角肌后束 (synergist)
-- Suggested muscle: 肩袖肌群 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 胸大肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('吊环引体向上', 'back', 'other', 'advanced', NULL, '1. 调整吊环高度，使其与肩同高或略高，双手握住吊环，手掌朝前，手臂伸直。\n2. 收紧核心和臀部，保持身体直立，肩胛骨微微下沉，准备向上拉。\n3. 用背部和二头肌的力量，向上拉至下巴略高于吊环，肘部贴近身体。\n4. 在最高点稍作停顿，感受背阔肌的收缩。\n5. 缓慢下放身体，回归起始姿势，手臂完全伸直，保持控制。\n6. 根据训练目标，完成设定的次数或时间，注意呼吸配合（向上拉时吸气，下放时呼气）。', '1. 确保吊环固定牢固，使用符合安全标准的吊环或专业训练设备。\n2. 练习前进行充分的热身，尤其是肩背和手腕，以防受伤。\n3. 如感到肩部或背部不适，应立即停止并检查动作或寻求专业指导。', '1. 过度摆动身体或使用冲力完成动作，降低背部肌肉的刺激。\n2. 拉起时肘部外展，导致肩膀受力过大。\n3. 下放时控制不稳，冲击过大，容易造成肩关节拉伤。', '1. 初学者可使用弹力带辅助，以减轻体重的负荷。
2. 如肩部活动度受限，可先将吊环调低，采用半程动作逐步提升。
3. 进阶者可尝试单臂吊环引体向上或负重背心来增加难度。', 'compound', '{"变体类型":"弹力带辅助引体向上","转换建议":"如果无法完成完整的吊环引体向上，可先用弹力带提供部分支撑，逐步过渡到无辅助的完整动作。"}', 'published', NOW(3), NOW(3));
SET @eid_174 = LAST_INSERT_ID();
-- Suggested muscle: 背阔肌 (agonist)
-- Suggested muscle: 二头肌 (synergist)
-- Suggested muscle: 后三角肌 (synergist)
-- Suggested muscle: 中下斜方肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('坐姿划船', 'back', 'cable', 'beginner', NULL, '1. 调整坐椅高度，使脚平放在地面，膝盖略低于臀部，保持背部挺直。\n2. 双手握住V型把手或横杆，手臂自然伸展，肩胛骨稍微后收，胸部略微前倾。\n3. 呼气时，主要用背阔肌发力，将把手沿身体拉向腹部位置，肘部贴近身体两侧，肩胛骨向脊柱中线收紧。\n4. 在动作的顶峰位置，保持收缩1-2秒，感受背部肌肉的紧绷。\n5. 吸气时，缓慢将把手放回起始位置，手臂伸展但不完全锁定，保持背部肌肉的持续张力。\n6. 完成预定次数后，保持正确坐姿，避免突然站起导致腰椎压力。', '始终保持脊柱自然弧度，避免在拉动时过度弓背或塌背，以防腰椎受伤。,使用适当的重量，保持动作控制，切勿使用惯性或弹力来完成动作。,在拉起把手时，确保肘部不向外展开，保持贴近身体，以减少肩部压力。', '在拉起时仅用手臂力量，导致背阔肌刺激不足。,背部过度弓起或塌陷，导致腰椎受压过大。,动作幅度不足，只拉至胸前而未充分收缩背阔肌。', '根据个人身高调节座椅高度，使手臂在伸展时略微弯曲；如感到肩部不适，可将手柄换成宽握或窄握V型把手，以改变肩部角度；若腰背压力过大，可在坐垫下方放置垫子或使用带靠背的划船机以提供更好支撑。', 'compound', '{"哑铃划船":"保持相同的背部收缩感，使用哑铃替代缆绳，调节重量并在坐姿或站姿下完成划船动作。","TRX划船":"将脚固定在锚点，调整身体倾斜角度以改变阻力，保持背阔肌发力轨迹与坐姿划船相似。","机器划船":"如果健身房有划船机器，可直接使用机器进行划船，动作轨迹和背部发力方式基本相同。"}', 'published', NOW(3), NOW(3));
SET @eid_129 = LAST_INSERT_ID();
-- Suggested muscle: 背阔肌 (agonist)
-- Suggested muscle: 中斜方肌 (synergist)
-- Suggested muscle: 菱形肌 (synergist)
-- Suggested muscle: 二头肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 后三角肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('垂悬举腿', 'back', 'bodyweight', 'intermediate', NULL, '1. 双手正握单杠，握距与肩同宽或略宽，身体自然悬垂，双臂完全伸直，肩部保持收紧状态。\n2. 核心肌群收紧，骨盆略微后倾，使下背部微微弯曲，躯干保持稳定直立。\n3. 保持身体不晃动，利用腹部的力量将双腿向前抬起，膝盖保持微屈或伸直状态。\n4. 继续抬起双腿直到与地面平行或略高于水平位置，感受腹部的强烈收缩。\n5. 在顶峰位置略微停顿1-2秒，充分感受腹部肌肉的收缩。\n6. 缓慢控制地将双腿放下回到起始位置，保持腹部持续发力，避免自由落体。', '1. 如果无法完成标准的垂悬举腿，可先练习屈膝版本或使用辅助器械。\n2. 避免借助惯性摆动身体，这不仅降低训练效果还容易造成腰部损伤。\n3. 若感到下背部或肩部不适，应立即停止并检查动作或降低难度。', '1. 借助惯性摆动双腿而非用腹部发力控制，导致训练效果大打折扣。\n2. 举腿时身体后仰或晃动，核心未能保持稳定，增加了腰椎的压力。\n3. 动作幅度不到位，只做半程而未能充分刺激腹部肌肉。', '初学者可先做屈膝举腿以降低难度，逐渐适应后再尝试直腿版本。可通过在脚踝处夹轻重量来增加难度，或在双杠上使用吊环进行练习以减少肩部压力。', 'isolation', '{"变体类型":"初级可改为屈膝举腿或托腮斜躺举腿；高级可尝试悬垂举腿并扭转身体（加入转体）以增加难度和刺激腹斜肌。"}', 'published', NOW(3), NOW(3));
SET @eid_162 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹斜肌 (synergist)
-- Suggested muscle: 髂腰肌 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('壶铃摆荡', 'back', 'other', 'intermediate', NULL, '1. 起始姿势：双脚与肩同宽站立，膝盖微弯，臀部略微后推，双手握住壶铃把手，壶铃置于身体前侧地面，背部保持平直，肩膀在壶铃正上方。\n2. 摆荡准备：臀部发力向前驱动，手臂保持伸直，通过髋关节爆发力将壶铃向前摆动，利用惯性将壶铃摆至与肩同高或稍高位置，动作主要由下肢驱动而非手臂。\n3. 顶点控制：壶铃摆至最高点时，肩膀略微伸展，臀部收紧，髋关节完全伸展，身体保持稳定，此时重心落在脚掌中后部。\n4. 下落回摆：壶铃借助重力下落，同时臀部快速收缩发力，将壶铃再次向后摆动，重复动作，整个过程保持流畅的摆动节奏。\n5. 结束动作：完成训练后，控制壶铃下落，在身体前侧将其轻轻放回地面，避免直接扔下造成伤害。', '确保训练区域无障碍物，壶铃摆荡路径清晰，避免碰撞受伤。\n保持背部平直，避免弓背或塌腰，防止腰背压力过大导致损伤。\n初学者应从轻重量开始，逐步掌握动作要领，避免使用过重重量导致动作变形。', '使用手臂力量抬起壶铃，未能有效利用臀部和腿部驱动，降低训练效果并增加手臂负担。\n动作过程中背部弓起或塌腰，导致脊柱压力过大，容易引发腰背疼痛。\n动作幅度不足，壶铃摆动高度不够，未能充分发挥髋关节伸展的爆发力。', '初学者可先进行徒手臀桥训练，感受臀部发力模式后再进行壶铃摆荡，降低学习难度。
如有腰部不适，可减少动作幅度，专注于臀部驱动，同时确保核心收紧，必要时降低重量或暂停训练。
进阶时可尝试单臂壶铃摆荡或高摆荡版本，增加动作难度和协调性挑战。', 'compound', '{"变体类型":"硬拉转换：从壶铃摆荡过渡到硬拉，增加对后链肌群的刺激，适用于强化髋部力量。\n抓举转换：从摆荡动作引入抓举技术，提升爆发力和协调性，适合进阶训练者。\n单臂摆荡：增加核心稳定性和抗旋转能力的挑战，适用于提升功能性力量。","转换建议":"熟练掌握基础壶铃摆荡后，可逐步引入硬拉、抓举等变体动作，以提升整体力量和爆发力，同时增强动作多样性和训练趣味性。"}', 'published', NOW(3), NOW(3));
SET @eid_179 = LAST_INSERT_ID();
-- Suggested muscle: 臀大肌 (agonist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 三角肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('平板支撑', 'back', 'bodyweight', 'beginner', NULL, '1. 起始姿势：俯卧在地上，双手撑地，肘部位于肩膀正下方，前臂平行放置于地面，手掌向下或握拳支撑。\n2. 收紧腹部：将肚脐向上拉向脊柱，收紧腹横肌和腹直肌，保持核心紧绷。\n3. 抬起身体：用力将身体从地面抬起，保持从头到脚形成一条直线，重量均匀分布在前臂和脚尖之间。\n4. 保持姿势：保持均匀呼吸，维持该姿势30秒至1分钟，避免臀部抬起或下沉。\n5. 结束动作：完成预定时间后，缓慢放下身体至地面，休息片刻后再进行下一组。', '如有肩部、肘部或腰部受伤，请在医生指导下进行或选择其他低风险动作。,保持颈部自然伸展，避免头部下沉或过度抬头，以免导致颈椎受压。,若出现手腕不适，可改用握拳或使用前臂垫子来减轻压力。', '臀部抬得过高导致背部塌陷，形成倒V形。,头部过度前倾或后仰，使颈椎受压。,呼吸不均匀、憋气，导致血压升高或核心失去稳定。', '初学者可先采用膝盖着地的‘膝盖平板支撑’，降低难度；进阶者可以尝试单臂平板支撑、侧向平板支撑或把脚放在稍高的平台上来增加负荷。根据个人柔韧性和力量水平逐步调整，以保持动作的正确姿势为前提。', 'compound', '{"膝盖平板支撑":"将膝盖着地，保持身体从膝盖到头部呈直线，适用于初学者或腕部不适者。","侧向平板支撑":"将身体侧向倾斜，用单侧前臂和脚支撑，专注于侧腹力量，增加动作难度。","单臂平板支撑":"抬起一只手，保持身体直线，提升核心不对称稳定性，适合进阶训练。"}', 'published', NOW(3), NOW(3));
SET @eid_168 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 外斜肌 (synergist)
-- Suggested muscle: 内斜肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 臀大肌 (stabilizer)
-- Suggested muscle: 股四头肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('弹力带引体向上', 'back', 'other', 'beginner', NULL, '1. 将弹力带固定在引体向上横杠上，确保带子牢固不滑动。\n2. 双手正握（或混合握）横杠，握距略宽于肩宽，身体自然悬垂。\n3. 将脚或膝盖套入弹力带的环扣中，确保受力均匀。\n4. 收紧核心，收肩胛骨，用背阔肌发力向上拉，下巴超过横杠。\n5. 在顶峰位置稍作停顿，感受背阔肌收缩，然后缓慢下降至起始姿势，保持控制。', '1. 使用前检查弹力带是否有裂纹或磨损，确保固定点牢固。\n2. 在进行动作前进行充分的热身，尤其是肩部和背部。\n3. 下降时不要猛然松开，以免弹力带弹回造成伤害。', '1. 过度依赖弹力带导致动作幅度不足，只做半程。\n2. 身体晃动或使用摆荡来完成动作，缺少核心稳定。\n3. 手肘外展过大或耸肩，导致肩部受力增加。', '1. 初学者可以选用较粗、阻力较大的弹力带；随着力量提升，逐步更换阻力更小的带子或去掉带子。
2. 如果感到肩部不适，可稍微收紧握距或调整手肘角度。
3. 可以通过改变脚部支撑点（如单脚、双脚或膝盖）来调节阻力。', 'compound', '{"无弹力带引体向上":"直接进行标准引体向上，增加负重或使用加重背心提升难度。","负重引体向上":"在背部或腰部挂载重物或使用加重背心，提高背阔肌和肱二头肌负荷。","俯身划船":"使用哑铃或杠铃进行俯身划船，作为背阔肌的替代训练。"}', 'published', NOW(3), NOW(3));
SET @eid_182 = LAST_INSERT_ID();
-- Suggested muscle: 背阔肌 (agonist)
-- Suggested muscle: 肱二头肌 (synergist)
-- Suggested muscle: 大圆肌 (synergist)
-- Suggested muscle: 斜方肌（中下部） (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 脊柱竖肌 (stabilizer)
-- Suggested muscle: 前臂屈肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('弹力带高位下拉', 'back', 'other', 'beginner', NULL, '1. 将弹力带固定在高处（如门把手、挂钩或高处横杆），双手握住弹力带两端，间距略宽于肩部。2. 站立或跪姿，保持核心收紧，背部挺直，肩膀放松下沉。3. 肩胛骨内收下沉，以背阔肌发力带动手臂向下拉，将弹力带拉至胸部两侧位置。4. 在动作底部略作停顿，感受背阔肌充分收缩。5. 控制性地慢慢释放张力，让手臂沿原路径回到起始位置，肩胛骨随之上提回到起始状态。', '在开始前确保弹力带完好无损，没有任何裂纹或老化痕迹；避免在拉至最低点时将弹力带完全放到底部，保持一定的张力以保护关节；如感到肩部不适或疼痛，应立即停止并检查动作姿势。', '使用过多手臂力量而忽视背部发力，导致二头肌过度参与；身体过度后仰或晃动，借助惯性完成动作；拉得太快而没有控制，失去了肌肉收缩的效果。', '初学者可以先从小阻力弹力带开始练习，逐步掌握正确的动作轨迹后再增加阻力；如果固定点位置较低，可以坐在地上进行坐姿版本的弹力带下拉；如感到肩部压力过大，可适当调宽双手握距。', 'compound', '{"高位器械下拉":"如果使用健身房的下拉器械，可将弹力带下拉的动作轨迹和握距直接转换，保持相同的手臂角度和发力方式","引体向上":"对于有基础的训练者，弹力带下拉可以帮助建立引体向上的肌肉记忆，待弹力带阻力不足以提供足够挑战时可进阶到标准引体向上","单臂弹力带下拉":"将双手握改为单手握，可增加核心稳定性的挑战，同时更好地纠正左右侧肌肉不平衡问题"}', 'published', NOW(3), NOW(3));
SET @eid_183 = LAST_INSERT_ID();
-- Suggested muscle: 背阔肌 (agonist)
-- Suggested muscle: 斜方肌中下束 (synergist)
-- Suggested muscle: 肱二头肌 (synergist)
-- Suggested muscle: 三角肌后束 (synergist)
-- Suggested muscle: 菱形肌 (stabilizer)
-- Suggested muscle: 核心肌群 (stabilizer)
-- Suggested muscle: 肱三头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('沙袋背伸展', 'back', 'other', 'intermediate', NULL, '1. 俯卧在长凳或地面上，双手在胸前握紧沙袋；2. 将沙袋放置在上背部（肩胛骨附近），用手臂压住固定沙袋；3. 保持双腿和髋部贴紧地面，核心收紧；4. 收缩下背部肌肉，将上半身向上抬起，躯干抬离地面；5. 在顶部位置停顿1-2秒，感受下背部肌肉充分收缩；6. 缓慢控制地将上半身放回初始位置，重复动作。', '1. 动作过程中保持脊柱自然弯曲，避免过度伸展导致腰椎压力过大；2. 使用重量适宜的沙袋，新手建议从较轻重量开始循序渐进增加负荷；3. 动作速度应缓慢控制，避免利用惯性快速抬起身体。', '1. 髋部离开地面：导致下背部过度弯曲，应始终保持髋部贴地；2. 双手推举沙袋发力：应为背部主动发力而非手臂代偿发力；3. 动作速度过快：缺乏对目标肌肉的充分刺激和控制。', '初学者可先徒手练习熟练动作要领；有腰椎问题者可减少动作幅度或降低沙袋重量；可调节长凳高度来改变动作难易程度；也可在罗马椅上使用沙袋进行此动作。', 'compound', '{"器械替代":"可使用杠铃、哑铃或专用背部伸展器械替代沙袋","徒手变体":"可进行无负重版本的背部伸展，适合初学者或康复训练"}', 'published', NOW(3), NOW(3));
SET @eid_180 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 多裂肌 (synergist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 髋关节伸肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('窄握引体向上', 'back', 'bodyweight', 'intermediate', NULL, '1. 站在单杠正下方，双手手掌向内（掌心相对）或向外（掌心向前）握杆，握距约与肩同宽或略窄。\n2. 身体悬空，肩胛骨向下收紧，核心收紧，双脚自然交叉或轻微屈膝。\n3. 吸气时，利用背阔肌和大圆肌的力量，向上拉起身体，直到下巴超过单杠。动作全程保持胸部挺起，避免耸肩。\n4. 在最高点稍作停顿，感受背阔肌的收缩。\n5. 呼气时，缓慢下降至手臂完全伸展，保持控制，不要猛然下落。\n6. 重复进行，根据训练目标完成设定的次数或时间。', '1. 确保单杠固定可靠，握杆时手部皮肤完整，防止滑脱。\n2. 若力量不足，切勿勉强完成全程，可使用弹力带或器械辅助，防止肩关节受伤。\n3. 动作过程中保持肩胛骨稳定，避免肩部过度前倾或后缩，以免导致肩袖损伤。', '1. 肩膀过度耸起或用力向前转，导致肩部受压和力量浪费。\n2. 下降时猛然放手，未控制速度，容易造成肩关节冲击。\n3. 动作幅度不足，只做半程引体，未能充分拉伸和收缩背阔肌。', '1. 如柔韧性不足，可先在较低高度的横杠或使用辅助器械练习。
2. 为增加难度，可在脚踝处挂上负重背心或使用加重腰带。
3. 若想更侧重背阔肌内侧，可保持窄握并强调胸部向单杠靠拢的感觉。', 'compound', '{"宽握引体向上":"将双手握距加宽至肩宽的1.5倍，可更好地激活背阔肌外侧和胸大肌上部，同时减轻二头肌的参与度。","弹力带辅助引体向上":"使用弹力带套在单杠上，脚或膝盖挂在带子上，以提供向上的助力，帮助逐步提升自身体重训练的负荷。"}', 'published', NOW(3), NOW(3));
SET @eid_157 = LAST_INSERT_ID();
-- Suggested muscle: 背阔肌 (agonist)
-- Suggested muscle: 大圆肌 (synergist)
-- Suggested muscle: 小圆肌 (synergist)
-- Suggested muscle: 斜方肌（下段） (stabilizer)
-- Suggested muscle: 菱形肌 (stabilizer)
-- Suggested muscle: 肱二头肌 (synergist)
-- Suggested muscle: 肱桡肌 (synergist)
-- Suggested muscle: 前臂屈肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('绳索耸肩', 'back', 'cable', 'intermediate', NULL, '1. 调整滑轮高度至略高于肩部，站在Cable机正前方，双脚与肩同宽，保持膝盖微屈、核心收紧。\n2. 双手握住绳索手柄，手掌朝向身体，手臂保持自然伸展，肩部放松。\n3. 在呼气的同时，将肩胛骨向上提拉，像是要把肩膀向上耸至最高点，保持1-2秒的顶峰收缩。\n4. 吸气并控制速度，缓缓放下肩胛骨回到起始位置，注意不要让肩膀向前倾或向下掉。\n5. 重复上述动作，完成设定的次数；整个过程保持背部挺直，避免借助身体摆动。', '1. 确保Cable绳索和滑轮无损坏、卡阻，使用合适的重量并固定好手柄。\n2. 动作全程保持脊柱中立，避免腰部过度伸展或拱背，以免造成腰椎压力。\n3. 若感到颈部或肩部不适，应立即停止并调整姿势或降低重量。', '1. 使用过大的重量导致耸肩时手臂弯曲，借助惯性完成动作。\n2. 将肩膀向前倾而非向上提拉，使斜方肌受力不足。\n3. 下降时速度过快、失控，导致肌肉伸展不充分，降低训练效果。', '1. 滑轮高度可上下调节，以找到最适合个人肩部活动范围的阻力曲线。
2. 替换不同类型的手柄（如V型把、双绳把）可以改变握感和刺激部位。
3. 如感到颈部压力，可使用护颈垫或在绳索手柄上加装软垫。
4. 通过改变站距（前倾或后仰）可以微调斜方肌的受力角度。', 'isolation', '{"哑铃耸肩":"使用哑铃代替绳索，保持相同的耸肩轨迹和发力感，注意控制重量避免手臂晃动。","杠铃耸肩":"将杠铃置于肩后或胸前进行耸肩，可调节站距和握距，以改变肌肉刺激。","机器耸肩":"使用专用的耸肩器械，调整坐垫高度和配重，适合固定轨迹训练。","弹力带耸肩":"将弹力带固定在低位或高位，模拟绳索的阻力曲线，便于在家中或旅行时练习。"}', 'published', NOW(3), NOW(3));
SET @eid_138 = LAST_INSERT_ID();
-- Suggested muscle: 上斜方肌 (agonist)
-- Suggested muscle: 肩胛提肌 (synergist)
-- Suggested muscle: 菱形肌 (synergist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 胸锁乳突肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('背伸展', 'back', 'bodyweight', 'beginner', NULL, '1. 俯卧在地板或训练垫上，双腿伸直并拢，双脚可以固定在训练凳下方或让同伴帮忙按住。2. 双手交叉放在胸前或置于头部两侧（初学者建议放在胸前以减少颈部压力）。3. 保持双腿固定，利用背部肌肉发力将上半身向上抬起，直到胸部离开地面约15-20厘米。4. 在顶峰位置稍作停顿，感受背部肌肉的收缩，保持1-2秒。5. 缓慢控制地将上半身放回初始位置，保持肌肉张力，避免突然下落。6. 重复完成10-15次，根据自身能力进行2-3组训练。', '1. 动作过程中保持颈部自然中立，避免过度抬头导致颈椎压力过大。2. 抬起和下放时控制速度，避免使用惯性或过快的速度造成下背部损伤。3. 如果感到腰部不适或疼痛，应立即停止训练并咨询专业人士。', '1. 动作幅度过大，过度伸展导致腰椎压力增加。2. 使用手臂力量带动身体抬起，无法有效锻炼背部肌肉。3. 训练时头部前倾或低头，增加颈椎受伤风险。', '初学者可以先从较轻的幅度开始，逐渐增加动作范围。如果标准动作有困难，可以尝试将双手放在身体两侧，减小上半身重量负担。高级训练者可双手持重物（如哑铃）增加训练强度。', 'isolation', '{"负重增加":"可双手握住杠铃片或哑铃放在胸前进行负重背伸展","单腿版本":"可抬起一只腿进行单腿背伸展，增加训练难度和核心参与","罗马椅版本":"在罗马椅上进行背伸展训练，可更好固定双脚并控制动作幅度"}', 'published', NOW(3), NOW(3));
SET @eid_164 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌 (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 半棘肌 (synergist)
-- Suggested muscle: 腹直肌 (antagonist)
-- Suggested muscle: 核心肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('背阔肌下拉机', 'back', 'machine', 'beginner', NULL, '1. 调整座椅高度，使双脚平放在踏板上，大腿紧贴护垫，背部自然挺直。\n2. 双手握住横杆，握距略宽于肩，手掌向下（掌心朝前），手臂伸直，肩部略微后收。\n3. 深吸气后，用背阔肌的力量将横杆垂直向下拉，肘部向身体两侧收拢，直至横杆接近胸部上缘或锁骨位置。\n4. 在最低点保持1秒的收缩，专注于将肩胛骨向中间靠拢，感受到背阔肌的收紧。\n5. 呼气，缓慢控制地将横杆向上放回起始位置，手臂完全伸展但不要锁死肘关节。\n6. 完成所需次数后，确认机器已复位，再离开器械。', '1. 拉动时不要将横杆拉至颈部后方，以免对颈椎和肩关节产生过大压力。\n2. 整个动作要保持背部挺直，避免弓背或过度前倾，防止下背部受伤。\n3. 使用合适的重量，确保能够完成全程控制，避免使用惯性甩动横杆。', '1. 把横杆拉向颈部后方，导致肩关节受压和颈椎不适。\n2. 用过多的惯性甩动横杆，动作不够控制，导致背部肌肉得不到有效刺激。\n3. 动作幅度不够，手臂未完全伸展或未将横杆拉至胸部位置，导致背阔肌全程收缩不足。', '1. 座椅高度调节：确保坐下后脚能自然平放，大腿与地面平行或略微高于地面。
2. 大腿护垫位置：护垫应紧贴大腿上部，防止在拉动时身体向上抬起。
3. 握距与握法：根据个人肩宽调整握距，宽握更针对背阔肌外侧，窄握或中立握可增加背阔肌内侧刺激。', 'compound', '{"变体类型":"使用龙门架或弹力带进行类似动作","转换建议":"若健身房无背阔肌下拉机，可将弹力带固定在高处或使用龙门架配合绳索附件，保持相同的握距和动作轨迹，重量可通过调节弹力带强度或挂钩位置来控制。"}', 'published', NOW(3), NOW(3));
SET @eid_151 = LAST_INSERT_ID();
-- Suggested muscle: 背阔肌 (agonist)
-- Suggested muscle: 大圆肌 (synergist)
-- Suggested muscle: 肱二头肌 (synergist)
-- Suggested muscle: 胸大肌 (antagonist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 中下斜方肌 (stabilizer)
-- Suggested muscle: 脊柱深层多裂肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('鸟狗式', 'back', 'bodyweight', 'intermediate', NULL, '1. 从四点支撑姿势开始，双手撑地位于肩膀正下方，膝盖位于髋关节正下方，膝盖与地面之间留有适当间距。\n2. 收紧腹部和臀部肌肉，保持脊柱处于自然中立位置，头部与脊椎保持一条直线。\n3. 吸气的同时，缓慢伸展右臂向前，直到与地面平行，同时伸展左腿向后，直到与地面平行。手臂和腿都应该保持伸直状态。\n4. 保持身体稳定，核心收紧，避免腰部下沉或髋部向一侧倾斜，维持此姿势2-3秒。\n5. 呼气，收回手臂和腿，回到起始位置，换另一侧重复动作。交替进行直到完成指定次数。', '1. 如果感到下背部疼痛或不适，应立即停止动作并降低动作幅度。\n2. 确保动作过程中保持核心稳定，避免过度伸展导致腰部下塌。\n3. 初期练习时可以在镜子前进行，以便观察身体姿态是否保持正确的中立位。', '1. 腰部下塌（骨盆前倾）：常见于核心力量不足时，会增加腰椎压力，需要先加强核心控制。\n2. 动作过快或失去平衡：急于完成动作导致控制力下降，应放慢速度专注于稳定性和平衡。\n3. 耸肩或颈部过度紧张：手臂伸展时容易耸肩，需要有意识地放松肩部并保持颈椎自然对齐。', '初学者可以先只练习单侧手臂或单侧腿的伸展，等平衡感和核心控制提升后再同时伸展四肢。如果手腕不适，可以握拳或使用垫子支撑。有腰椎问题的人群应减小动作幅度或咨询专业教练。', 'compound', '{"退阶变体":"从单侧手臂或单侧腿的伸展开始，逐步过渡到同时伸展四肢；或者减小伸展幅度以降低难度。","进阶变体":"在伸展姿势下保持更长时间（5-10秒）；加入轻微的肢体画圈动作；在不稳定的表面（如平衡垫）上进行练习以增强核心挑战。","动态变体":"在伸展位置进行轻微的肢体小幅度移动（如画小圈）；在手臂伸展时轻触对侧膝盖以增强核心激活。","针对特定肌群":"强调手臂伸展可以更多地激活背阔肌和三角肌；强调腿部伸展可以更多地激活臀大肌和腘绳肌。","功能训练变体":"结合呼吸训练，在每次伸展时配合深吸气和深呼气，增强核心-呼吸协同能力。"}', 'published', NOW(3), NOW(3));
SET @eid_166 = LAST_INSERT_ID();
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 多裂肌 (agonist)
-- Suggested muscle: 竖脊肌 (synergist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 背阔肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 三角肌 (synergist)
-- Suggested muscle: 肩袖肌群 (stabilizer)
-- Suggested muscle: 髋关节外旋肌群 (stabilizer)
-- Suggested muscle: 髋屈肌 (antagonist)
-- Suggested muscle: 股直肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃过顶推举', 'back', 'dumbbell', 'intermediate', NULL, '1. 预备姿势：站立，双脚与肩同宽，双手持哑铃，哑铃位于肩部两侧，手掌朝前，手肘微屈约90度。\n2. 收紧核心和臀部，保持胸部略微挺起，肩胛骨自然收紧，避免耸肩。\n3. 呼气时，用肩膀和手臂的力量将哑铃向上推举，手臂伸直，哑铃在头顶正上方相遇或略高于头顶，保持手掌相对或略向内。\n4. 在最高点稍作停顿，确保肩胛骨稳定并控制好哑铃的平衡。\n5. 吸气时，缓慢将哑铃下降回至起始位置，保持手臂微屈，控制动作速度。\n6. 完成所需重复次数，注意保持身体稳定，避免晃动或借助腰背力量。', '1. 选择适合自己水平的哑铃重量，初学者应从轻重量开始，以防肩关节受伤。\n2. 推举过程中保持肩胛骨固定，避免耸肩或过度前倾，以免压迫肩袖。\n3. 如出现肩部疼痛或不适，应立即停止动作并寻求专业指导。', '1. 耸肩或前倾导致肩袖受压，增加受伤风险。\n2. 下降时速度过快，利用惯性而非控制力，降低训练效果并易受伤。\n3. 手臂未完全伸直或过度锁死，使肘关节受力不均。', '1. 调整哑铃重量以适应不同力量水平；
2. 如肩部活动受限，可在坐姿或靠墙姿势下完成动作；
3. 想要增加难度，可在头顶完成停顿或使用稍重的哑铃；
4. 对于初学者，建议先在镜子前观察姿势，确保动作标准。', 'compound', '{"变体类型":"如果使用杠铃进行站姿推举，请保持肩宽握距，手臂伸直；如果想减轻肩部负担，可改为坐姿推举或使用斜凳；在缺乏哑铃时，可用壶铃或阻力带代替，同样保持动作轨迹和用力方式。"}', 'published', NOW(3), NOW(3));
SET @eid_113 = LAST_INSERT_ID();
-- Suggested muscle: 三角肌（前束） (agonist)
-- Suggested muscle: 三角肌（侧束） (agonist)
-- Suggested muscle: 肱三头肌（长头） (synergist)
-- Suggested muscle: 胸大肌（锁骨部） (synergist)
-- Suggested muscle: 上斜方肌 (synergist)
-- Suggested muscle: 肩胛提肌 (stabilizer)
-- Suggested muscle: 冈上肌 (stabilizer)
-- Suggested muscle: 小圆肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 背阔肌 (antagonist)
-- Suggested muscle: 脊柱竖肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('坐姿背伸展机', 'back', 'machine', 'beginner', NULL, '1. 调整机器座椅高度，使膝盖与垫子对齐，双脚平放在踏板上，背部紧贴靠背垫。\n2. 握住手柄或扶手，保持胸部微微抬起，核心收紧，脊柱保持自然中立位。\n3. 深吸一口气，收缩腹部，呼气时用力伸展背部，将上半身向后倾斜至舒适的最大角度，保持动作幅度不要超过身体的舒适范围。\n4. 在最高点稍作停顿，感受下背部（竖脊肌）的收缩，然后控制速度缓慢回到起始位置。\n5. 重复动作至完成规定次数，注意全程保持背部挺直，避免出现弓背或塌腰。', '1. 调整座椅和垫子位置，确保膝盖与机器对齐，避免膝盖受力不均。\n2. 使用合适的重量或阻力，切勿盲目追求大重量导致脊柱过度受压。\n3. 动作全程保持核心收紧，避免背部弓起或塌腰，以防止下背部受伤。', '1. 过度弓背或塌腰，导致脊柱受压和不适。\n2. 使用过重的重量，动作幅度受限，控制力不足。\n3. 动作速度过快，缺乏对背部肌肉的离心控制，容易造成肌肉拉伤。', '1. 座椅高度调节：确保膝盖自然弯曲，脚掌平放踏板，防止膝盖受压。
2. 靠背垫角度调节：根据个人柔韧性适度倾斜，一般保持在背部自然伸展的角度。
3. 阻力调节：初学者建议使用轻重量，逐步适应后再增加负荷，确保全程可控制。', 'isolation', '{"变体类型":"如果想转换为复合动作，可将坐姿背伸展改为罗马椅背伸展或俯身杠铃划船，这些动作在伸展背部的同时还会动员更多下肢和核心肌肉。","替代器材":"可使用弹力带或自重进行站姿背伸展，保留背部伸展的核心刺激，同时增加平衡要求。"}', 'published', NOW(3), NOW(3));
SET @eid_154 = LAST_INSERT_ID();
-- Suggested muscle: 竖脊肌（erector spinae） (agonist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 腹直肌 (antagonist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 多裂肌（multifidus） (stabilizer)
-- Suggested muscle: 腰方肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('弹力带划船', 'back', 'other', 'beginner', NULL, '1. 准备弹力带：站立，双脚与肩同宽，脚尖略外旋，将弹力带固定在脚底或固定点，双手握住把手，手臂自然伸展，肩胛骨略微后收。\n2. 起始姿势：保持背部挺直，核心收紧，胸部微微向前，视线平视。手臂伸直，弹力带略有张力。\n3. 拉动动作：用力收缩肩胛骨，向后拉手柄，使手柄向腰部方向移动，保持手肘贴近身体两侧，至手柄触及下腹部或胸部（视个人柔韧性而定），并在此位置稍作停顿。\n4. 归位：慢慢松开肩胛骨，缓慢将手臂伸直回到起始姿势，保持弹力带的张力控制，避免弹力带猛然弹回。\n5. 呼吸配合：拉时吸气，归位时呼气，保持呼吸节奏稳定。\n6. 重复：完成所需次数后，换脚或换方向继续练习。', '使用前检查弹力带是否完好，防止断裂弹伤。,保持脊柱中立，避免在拉动时过度弓背或塌腰。,全程保持肩胛骨收紧，避免耸肩或过度使用手臂力量。', '拉得太快或使用弹力带的弹力过猛，导致背部肌肉未得到充分刺激。,动作时手臂外展过多，肘部离身体太远，降低背部发力并增加肩部压力。,背部前倾或塌腰，导致腰椎受压，出现腰背不适。', '如感到背部发力不足，可将弹力带换成更高阻力的型号，或缩短站距以增加张力；初学者可将动作幅度控制在半程，待掌握后再逐步增加至全幅度；若肩关节有不适，可适当降低拉力或改为坐姿划船，以减轻肩部负担。', 'compound', '{"单臂划船":"可使用单手握住弹力带，另一只手扶住固定点，以更好地专注于单侧背部肌群。","双手划船":"双手同时拉，可增加整体背部负荷，适合想要提升背部整体力量的中级练习者。","坐姿划船":"将弹力带固定在脚底，坐在凳子上进行，可更好隔离背部并减轻腰椎压力。","高位划船":"将弹力带固定在门把手上方，手柄向上拉，适合针对上背部和中斜方肌的练习。"}', 'published', NOW(3), NOW(3));
SET @eid_181 = LAST_INSERT_ID();
-- Suggested muscle: 背阔肌 (agonist)
-- Suggested muscle: 斜方肌（中束） (agonist)
-- Suggested muscle: 菱形肌 (agonist)
-- Suggested muscle: 大圆肌 (synergist)
-- Suggested muscle: 二头肌（肱二头肌） (synergist)
-- Suggested muscle: 后三角肌 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 多裂肌（腰部深层） (stabilizer)
-- Suggested muscle: 胸大肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('死虫式', 'back', 'bodyweight', 'beginner', NULL, '1. 平躺在瑜伽垫上，双臂向天花板方向伸直，双膝弯曲约90度，使小腿与地面平行，大腿与小腿垂直。 2. 呼气的同时，将右臂向后伸向地面，同时将左腿向下降但脚不要触碰地面，保持下背部紧贴垫子。 3. 吸气，将右臂和左腿恢复到起始位置。 4. 呼气，换另一侧进行相同的动作，将左臂向后伸，右腿下降。 5. 吸气，回到起始位置。 6. 交替进行，保持核心持续收紧，呼吸平稳，重复完成规定的次数。', '动作过程中始终保持下背部紧贴地面，避免腰部过度拱起造成腰椎压力。如果下背部无法保持贴地，应减小动作幅度。', '做动作时过度拱起下背部，导致核心训练效果降低且增加腰部受伤风险。动作速度过快，没有控制感和稳定的呼吸节奏。手臂或腿部下降时距离过远，超出自身控制范围。', '初学者可以将手臂放在身体两侧或略微降低难度。如果感觉动作过难，可以在背部下方放一条卷起的毛巾作为提示，当背部离开毛巾时立即停止动作。进阶者可以手持轻量哑铃增加训练强度。', 'compound', '{"变体类型":"可以通过调整手臂和腿部的动作组合来改变难度，例如同时伸展对侧手脚，或只进行单侧手臂或腿部的动作。增加负重或使用弹力带可以增加阻力，提高训练强度。","转换建议":"从死虫式可以转换到平板支撑、鸟狗式等核心稳定性训练动作，这些动作都属于核心稳定性的基础训练，可以形成完整的核心训练体系。"}', 'published', NOW(3), NOW(3));
SET @eid_170 = LAST_INSERT_ID();
-- Suggested muscle: 腹直肌 (agonist)
-- Suggested muscle: 腹横肌 (agonist)
-- Suggested muscle: 多裂肌 (agonist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 三角肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('药球砸球', 'back', 'other', 'intermediate', NULL, '1. 双脚与肩同宽站立，双手握住药球置于胸前。\n2. 吸气，向上摆臂，将药球举至头顶，手臂伸直，核心收紧。\n3. 在最高点稍作停顿，感受背阔肌的拉伸，然后快速呼气。\n4. 利用背阔肌、肩部和胸部的爆发力，将药球狠狠向下砸向地面或目标。\n5. 药球触地后，利用手臂和背部控制球的弹起，避免过度弹起。\n6. 重新拾起药球，准备进行下一轮，或换手练习。', '1. 确保动作范围内无人员，防止药球弹起伤人。\n2. 选用合适重量的药球，避免因过重导致背部拉伤。\n3. 动作全程保持脊柱自然弧度，避免脊柱过度屈曲或后仰。', '1. 只用手臂力量硬砸，未充分利用背部肌肉发力。\n2. 动作时脊柱过度前倾或后仰，导致腰椎受压。\n3. 砸球幅度不足，力度过小，背部刺激不够。', '1. 初学者可先使用轻重量药球，逐步递增重量。
2. 如背部有伤病，可改为侧身或单手砸球，以减轻背部负担。
3. 可通过改变砸球高度（墙面、地面、斜坡）来调节难度和训练重点。', 'compound', '{"变体类型":"单手砸球、侧身砸球、跨步砸球、俯身砸球；可调节药球重量、砸球角度、动作速度来实现不同难度的转换。"}', 'published', NOW(3), NOW(3));
SET @eid_178 = LAST_INSERT_ID();
-- Suggested muscle: 背阔肌 (agonist)
-- Suggested muscle: 大圆肌 (synergist)
-- Suggested muscle: 斜方肌（上、中、下） (synergist)
-- Suggested muscle: 菱形肌 (synergist)
-- Suggested muscle: 肩胛提肌 (stabilizer)
-- Suggested muscle: 胸大肌 (antagonist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 肱二头肌 (synergist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('雪橇拉', 'back', 'other', 'advanced', NULL, '1. 调整雪橇的重量，确保使用适合高级水平的负荷。将绳索或把手牢固系在雪橇前方，检查绳子是否扭结或磨损。\n2. 站姿双脚与肩同宽，膝盖微屈，背部保持自然直立，肩胛骨轻微下沉。双手握住把手或绳索两端，手臂伸直。\n3. 通过后腿、臀部和背部肌群的协同发力，向后拉动雪橇，保持躯干略微前倾、胸部略抬起，步伐保持均匀，确保动作流畅不间断。\n4. 拉动至脚后跟稍后方或绳子完全收紧时，稍作停顿（1–2秒），感受背部肌群的收缩。\n5. 控制速度，缓慢将雪橇放回起始位置，保持背部肌肉的张力，避免骤然放松。\n6. 重复规定次数或距离，保持呼吸节奏（在拉动时呼气，放回时吸气），全程保持核心紧绷、脊柱中立。', '训练前务必进行全身热身，特别是背部和下肢，以预防拉伤。,确保使用的绳索、把手和雪橇无破损，防止在拉动过程中突然断裂导致失衡。,保持脊柱中立，避免在拉动时过度弓背或塌腰，以减少下背部受伤风险。', '在拉动过程中弓背或塌腰，导致下背部承受过大压力。,使用过重的负荷导致动作失去控制，出现快速甩绳或突然停下。,动作节奏过快，未能在拉动顶点做足够的收缩或放回时缺少控制。', '可以通过改变把手的高度来调整背阔肌的不同区域发力：把手越低，拉动角度更倾斜，主要刺激背阔肌下部；把手越高，角度更水平，重点强化背阔肌上部。此外，可采用不同的站距（前倾或后倾）来改变臀部和腿部的参与程度。', 'compound', '{"高位雪橇拉":"将把手升高至胸部高度，使拉动角度更水平，主要强化背阔肌上部与后三角肌。","低位雪橇拉":"降低把手或使用低位绳索，使拉动角度更倾斜，重点刺激背阔肌下部及中背部。","单臂雪橇拉":"用单手握住把手进行拉动，可增加核心抗旋要求，提高肩胛稳定性和背部单侧力量。","侧向雪橇拉":"将雪橇横向移动（侧向拉动），可加入斜方肌和菱形肌的协同发力。"}', 'published', NOW(3), NOW(3));
SET @eid_184 = LAST_INSERT_ID();
-- Suggested muscle: 背阔肌 (agonist)
-- Suggested muscle: 后三角肌 (synergist)
-- Suggested muscle: 斜方肌（中部） (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 腘绳肌 (synergist)
-- Suggested muscle: 肱二头肌 (stabilizer)
-- Suggested muscle: 核心肌群（腹横肌、腹直肌） (stabilizer)

