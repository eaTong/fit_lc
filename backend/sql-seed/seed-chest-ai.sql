-- AI 生成的 chest 动作详情
USE fitlc;

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('杠铃卧推', 'chest', 'barbell', 'beginner', NULL, '1. 平躺在卧推凳上，背部紧贴凳面，双脚平放地面保持稳定。双手握杠铃，握距略宽于肩，拇指环绕杠铃确保安全。2. 将杠铃从架上取下，移至胸部正上方，手臂伸直，肩胛骨收紧保持稳定。3. 吸气时控制速度将杠铃缓慢下放至胸部中段位置，保持小臂垂直于地面，杠铃位于乳头附近。4. 在底部位置短暂停留后，呼气时用胸肌发力将杠铃向上推起，回到起始位置，手臂不完全锁死。5. 重复完成预定次数，完成后先将杠铃放回架上。', '1. 确保杠铃重量适合自身能力，初学者建议在有保护杠的深蹲架或专用卧推架上练习。2. 推举时不要让杠铃左右摇晃或失去控制，避免手腕过度屈曲导致受伤。3. 卧推过程中始终保持头部、背部和臀部紧贴凳面，避免拱腰过度造成腰椎压力。', '1. 杠铃下放速度过快或弹胸，没有控制好动作幅度，导致肩关节受力过大。2. 推起时手臂不完全锁死就再次下放，减少了动作全程范围，降低训练效果。3. 肩胛骨没有后收下沉，导致肩部前伸过多，增加肩关节受伤风险。', '根据训练目标调整握距：较宽握距侧重胸肌内侧和整体厚度，较窄握距侧重胸肌外侧和三头肌。手腕应保持中立位置，避免过度向下弯曲以减少前臂压力。初学者建议从空杆或较轻重量的杠铃开始练习，逐步掌握动作要领后再增加重量。', 'compound', '{"变体":"上斜杠铃卧推可增加上胸肌刺激，下斜杠铃卧推侧重下胸肌发展。","替代动作":"可使用哑铃卧推替代，哑铃提供更大的运动范围和更好的关节活动度，有助于改善左右侧肌肉不平衡。","降级选项":"初学者可先从地板卧推或借助固定器械开始，减少核心稳定性和平衡的挑战。"}', 'published', NOW(3), NOW(3));
SET @eid_1 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 肱三头肌 (synergist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 肱二头肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('TRX俯卧撑', 'chest', 'bodyweight', 'intermediate', NULL, '1. 调整TRX绳的长度，使手柄离地约30-45厘米，脚尖着地，身体呈一条直线。\n2. 双手握住手柄，手掌朝下，手指微微外展，肩部略微向后收。\n3. 吸气时，屈肘将胸部向地面靠近，保持核心收紧，避免臀部抬起或下沉。\n4. 呼气时，用胸肌和手臂的力量将身体推回起始姿势，手臂不完全锁死。\n5. 重复进行，保持动作的平稳与控制，注意呼吸节奏。', '确保TRX锚点固定可靠，避免在练习过程中出现松动或脱落。,如果在执行过程中感到肩部或手腕不适，应立即停止并调整手柄高度或姿势。,保持核心稳定，避免出现腰部下沉或臀部翘起的现象，以防止腰椎受伤。', '臀部抬得过高，导致背部弓形，增加腰椎压力。,手臂伸展过度或锁死，导致肘关节受力过大。,动作过快，忽略了肌肉的离心收缩，降低训练效果。', '如需降低难度，可将手柄调高或改为跪姿俯卧撑；如要增加挑战，可缩短手柄绳长，使身体更接近水平，或进行单手TRX俯卧撑。', 'compound', '{"难度提升":"缩短TRX绳长，使身体更接近水平，可尝试单手俯卧撑或加入拍掌动作。","难度降低":"将手柄调高或采用跪姿姿势，减轻胸肌负担，专注于动作轨迹。"}', 'published', NOW(3), NOW(3));
SET @eid_72 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 肱三头肌 (synergist)
-- Suggested muscle: 腹横肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 前锯肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('上斜优先训练', 'chest', 'dumbbell', 'advanced', NULL, '1. 调节卧推凳角度至30°~45°上斜，确保凳子稳固且背部平贴凳面。\n2. 双手各持一只合适重量的哑铃，坐或躺在凳上，哑铃自然垂于身体两侧，手掌向前。\n3. 用胸肌和肩部力量将哑铃向上推至手臂几乎伸直，注意保持核心收紧，避免腰部过度弓起。\n4. 在最高点稍微停顿，感受到上胸部的收缩。\n5. 缓慢有控制地将哑铃下降至胸部两侧，保持手肘略低于肩膀，背部仍紧贴凳面。\n6. 重复动作至目标次数，保持呼吸节奏（向上推时呼气，向下放时吸气）。', '1. 使用足够的重量时最好有训练伙伴或使用哑铃架进行保护，避免哑铃失控掉落。\n2. 下降时不要让哑铃弹回胸上，保持肌肉张力，防止胸大肌被过度拉伸导致受伤。\n3. 确认凳子稳固且地面干燥，防止在动作过程中出现滑动或倾倒。', '1. 凳角设置过高（超过45°）导致肩部承受过多负荷，降低胸肌刺激。\n2. 下降时手肘外展过大，使得肩部前束参与过度，增加受伤风险。\n3. 使用过重的哑铃导致动作失去控制，出现拱背或弹胸的情况。', '1. 若感到肩部不适，可适当降低凳角至20°~30°，仍能聚焦上胸。
2. 通过更换不同重量的哑铃或调节手握宽度来改变难度。
3. 对于手腕不适，可使用哑铃握柄套或改为掌心相对的握法。', 'compound', '{"barbell":"将杠铃放在上斜凳上进行上斜杠铃卧推，保持相同的凳角和握距，可直接转换训练重点。","machine":"使用上斜哑铃推胸机或上斜推胸机代替，注意机器的轨道设计，确保动作轨迹与自由重量相似。","push-up":"将上斜俯卧撑（脚放在稍高的平台）视作哑铃上斜推的体重变体，适合在没有器械时保持胸部刺激。"}', 'published', NOW(3), NOW(3));
SET @eid_85 = LAST_INSERT_ID();
-- Suggested muscle: 上胸大肌（胸大肌上部） (agonist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 三头肌（肱三头肌） (synergist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 核心肌群（腹直肌、腹外斜肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('下斜杠铃卧推', 'chest', 'barbell', 'intermediate', NULL, '1. 调整下斜凳至约15-30度的下倾角度，双手握杠铃，握距略宽于肩宽，双手自然张开，手腕保持中立。\n2. 仰躺在凳上，背部紧贴凳面，肩胛骨略微收紧，脚平放在地面以提供稳固支撑。\n3. 深呼吸后，利用胸部力量将杠铃从支架上抬起，手臂伸直，杠铃位于胸部正上方。\n4. 吸气时控制杠铃缓慢下降，直至杠铃轻触下胸部或上腹部（位于胸大肌下缘），保持肘部略低于身体平面。\n5. 呼气时利用胸大肌、肩前束和三头发力，将杠铃推回起始位置，手臂伸直但不要完全锁死肘关节。\n6. 完成预定次数后，将杠铃平稳放回支架上，确保动作全程保持核心稳定，避免腰背过度弓起。', '1. 必须有合格的护杠或助手在旁，以防杠铃失控时能及时帮助。\n2. 确认杠铃的重量在个人承受范围内，避免使用过大重量导致技术变形。\n3. 在下降阶段要控制速度，避免杠铃弹胸或冲击，以免对胸骨和肩关节造成伤害。', '1. 握距过宽导致肩部外展角度过大，增加肩关节受伤风险。\n2. 下降时未控制好速度，出现弹胸或冲击力，导致动作不稳定且易受伤。\n3. 背部离开凳面或腰部过度弓起，造成腰椎受压，失去胸部主发力。', '1. 若感到肩部不适，可适当缩小握距或降低下降幅度，以减轻肩部负荷。
2. 初学者可以先使用较轻的杠铃或哑铃进行练习，待动作熟练后再逐步增加重量。
3. 可通过在凳子下方放置垫子或使用调节式下斜凳来微调倾斜角度，以更好地针对下胸部的发力。', 'compound', '{"上斜杠铃卧推":"将凳子调至向上倾斜15-30度，重点刺激上胸部和肩前束。","平板杠铃卧推":"使用水平凳进行，侧重胸大肌整体发展，适合作为下斜卧推的基础练习。","下斜哑铃卧推":"使用哑铃替代杠铃，提供更大的运动幅度和更好的肌肉控制，适合需要更多单侧平衡训练的进阶者。","俯卧撑（变体）":"通过手掌距离和倾斜角度的变化，实现类似下斜卧推的效果，适合在没有器材时进行。","绳索下斜推胸":"使用绳索设备进行推胸，保持张力在整个动作范围内，可用于改变负荷曲线并减轻关节压力。"}', 'published', NOW(3), NOW(3));
SET @eid_3 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌（下部） (agonist)
-- Suggested muscle: 胸大肌（整体） (agonist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 三头肌（长头） (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 核心肌群（腹直肌、腹外斜肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('低位哑铃飞鸟', 'chest', 'dumbbell', 'intermediate', NULL, '1. 平躺在平凳上，双脚踏实地面，臀部、肩部和头部紧贴凳面保持稳定。\n2. 双手各持一只哑铃，手掌相对，哑铃位于身体两侧较低的位置，手臂自然伸直微微弯曲。\n3. 吸气的同时，将哑铃向身体两侧缓慢展开，动作过程中保持肘关节角度固定（约120-150度），不要完全伸直手臂。\n4. 继续下放哑铃直到胸部有明显的拉伸感，但不要让哑铃下降过低，保持对重量的控制。\n5. 在最低点稍作停顿，然后呼气，运用胸肌发力将哑铃沿弧线轨迹向上夹起，回归起始位置。\n6. 重复动作至推荐次数，注意保持核心收紧，避免腰部过度拱起。', '1. 动作过程中保持手臂微弯，避免完全伸直锁死关节，以防肘关节损伤。\n2. 下放哑铃时要缓慢控制，切勿让哑铃自由下落，以免拉伤胸肌或损坏肩关节。\n3. 如果使用较大重量，建议有伙伴在旁保护或使用带保护杠的卧推凳。', '1. 手臂角度过大：许多人在动作过程中将手臂完全伸直，导致肘关节压力过大。\n2. 下放过深：哑铃下放位置过低会使肩部前束过多参与，降低胸肌刺激效果。\n3. 耸肩或头部抬起：肩部耸起会减少胸肌的拉伸范围，头部抬起会增加颈椎压力。', '初学者可先从小重量开始练习，待动作熟练后再逐步增加重量。如果肩关节活动度受限，可以适当减小动作幅度，但仍需确保胸肌得到充分收缩。训练时可选择不同角度的凳子调整，如上斜或下斜来侧重胸肌的不同部位。', 'isolation', '{"强度提升":"可改为单臂哑铃飞鸟，专注于单侧肌肉控制，增加核心稳定性要求。","设备转换":"可用绳索器械替代哑铃，提供更恒定的阻力和不同的发力感觉。","变化形式":"可转换为上斜或下斜哑铃飞鸟，分别加强胸肌上部或下部的刺激。"}', 'published', NOW(3), NOW(3));
SET @eid_23 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 背阔肌 (antagonist)
-- Suggested muscle: 前锯肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('低位龙门架夹胸', 'chest', 'cable', 'beginner', NULL, '1. 调整低位滑轮：将两侧滑轮高度调至低于肩部位置（约与胸部同高），确保绳索挂钩牢固。\n2. 站位准备：双脚与肩同宽，站在两根绳索之间的中央位置，背部自然挺直，核心收紧。\n3. 握把与起始姿势：双手分别握住两侧手柄，手臂略微弯曲，肘部保持微屈，手掌相对或略向内，手肘略微向外展开。\n4. 夹胸发力：在保持躯干稳定的前提下，双臂同时向胸前收拢，使两侧手柄在胸部前方相碰或接近相碰，同时用力收缩胸肌。\n5. 顶峰收缩与回放：在胸部收缩到极限位置时停顿约1‑2秒，感受胸肌的紧绷，然后缓慢而有控制地将手柄放回起始姿势，手臂保持微屈，避免弹回。\n6. 重复动作：根据训练计划完成规定次数，保持呼吸节奏——发力时呼气，回放时吸气。', '1. 确认滑轮和绳索已牢固安装，使用前先轻拉几次检查是否有松动或磨损。\n2. 动作全程保持背部挺直，避免在夹胸时过度前倾或拱背，以防止腰椎受伤。\n3. 选择的重量应适中，确保能够控制全程动作，尤其是回放阶段不要让重量猛然弹回。', '1. 使用过大的重量导致动作失控，身体前倾或耸肩，借力完成夹胸，降低胸肌的刺激。\n2. 手臂在回放时完全伸直，产生冲击，长期易导致肩关节不适。\n3. 动作幅度不足，仅做小幅度的摆动而没有真正让胸肌全程收缩。', '1. 滑轮高度：若感觉胸部刺激不足，可略微升高滑轮；若需要更侧重胸下部的收缩，可适当降低滑轮。
2. 站距与脚步：双脚站得稍宽可以提升核心稳定性；站得稍窄则更强调胸肌的收缩。
3. 握把宽度：手柄距离越宽，对胸大肌的外侧刺激越强；手柄距离越近，则更集中于内侧胸肌。', 'isolation', '{"变体类型":"若想换成自由重量，可将低位龙门架夹胸改为哑铃飞鸟；若想增加复合刺激，可改为杠铃卧推或俯卧撑；如果场地受限，可使用弹力带进行类似的胸前交叉动作。"}', 'published', NOW(3), NOW(3));
SET @eid_38 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 肱二头肌 (synergist)
-- Suggested muscle: 背阔肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('借力推举', 'chest', 'barbell', 'advanced', NULL, '1. 站立，双脚与肩同宽，将杠铃放置在锁骨和前肩位置，双手握距略宽于肩，手肘朝前。\n2. 收紧核心肌肉，稍微弯曲膝盖，采用半蹲姿势，为接下来的爆发积蓄力量。\n3. 快速向上伸展腿部和髋关节，利用这股向上的力量将杠铃向上推起。\n4. 当杠铃上升到面部高度时，完全伸展手臂，将杠铃推至头顶上方，手臂垂直于地面。\n5. 保持身体稳定，肩部发力收紧，然后屈臂将杠铃缓慢下放至起始位置，重复动作。', '1. 确保推举前进行充分的热身，特别是肩部和腿部肌肉，避免受伤。\n2. 选择合适的重量，从轻重量开始练习，动作熟练后再逐步增加负荷。\n3. 保持核心收紧，避免过度拱背或后仰，以防下背部受伤。', '1. 没有正确利用腿部力量，完全依赖肩部发力，导致动作僵硬且容易受伤。\n2. 推举时身体过度后仰，改变了发力轨迹，影响效果且增加腰部压力。\n3. 动作不连贯流畅，下放速度过快，没有控制好杠铃的稳定性。', '初学者可以先徒手练习掌握动作节奏，熟练后再使用空杠铃，逐步增加重量。建议在有经验的教练指导下进行，确保动作规范。', 'compound', '{"变体类型":"可以转换为哑铃借力推举以增加平衡性要求，或使用固定器械进行类似的推举动作。","退阶练习":"可以先练习单纯的站姿推举或前平举，熟练后再加入借力动作。","进阶练习":"可以尝试将推举与深蹲结合成复合动作，或增加爆发力的训练强度。"}', 'published', NOW(3), NOW(3));
SET @eid_5 = LAST_INSERT_ID();
-- Suggested muscle: 三角肌前束 (agonist)
-- Suggested muscle: 三角肌中束 (synergist)
-- Suggested muscle: 胸大肌 (synergist)
-- Suggested muscle: 肱三头肌 (synergist)
-- Suggested muscle: 股四头肌 (synergist)
-- Suggested muscle: 臀大肌 (synergist)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('前锯肌旋转', 'chest', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：双手撑地，身体呈直线，肩部位于手腕正上方，核心收紧。\n2. 保持手臂伸直且肘部略向外打开，胸部轻微下沉，准备进入动作。\n3. 用力向前推动肩胛骨，使肩胛骨向上旋转（上旋），此时上背会出现轻微的拱形，前锯肌被强烈拉伸并参与发力。\n4. 在肩胛骨完全上旋的最高点保持1-2秒，感受前锯肌的收缩。\n5. 缓慢收回肩胛骨，回到起始姿势，重复动作。', '动作全程保持核心收紧，避免出现腰部下沉或臀部抬起的现象，以防腰椎受伤。,若肩膀有不适或曾经受伤，请在无疼痛范围内进行，并可在专业教练指导下练习。,每个动作循环不超过10次，避免过度疲劳导致姿势失控。', '使用惯性或弹跳来完成肩胛骨的旋转，导致前锯肌的激活不足。,动作过程中出现腰部过度拱背（桥背），增加腰椎压力。,手臂过度弯曲或耸肩，使肩部承受不必要的负荷，影响前锯肌的专注发力。', '降低难度：可以采用跪姿俯卧撑或在较高的平台上（如凳子）进行，以减轻体重负担。,增加挑战：在背部放置轻量杠铃片或使用弹力带进行阻力训练，提高前锯肌的负荷。', 'compound', '{"简化版":"采用跪姿或把手抬高于肩部水平，减少体重负荷，适合初学者练习动作模式。","进阶版":"单臂俯卧撑或在不同高度的不稳定平面（如bosu球）上执行，以增强前锯肌的协同控制和稳定性。","负重变体":"在背部轻放杠铃片或使用弹力带提供额外阻力，增加前锯肌的负荷和力量训练效果。"}', 'published', NOW(3), NOW(3));
SET @eid_81 = LAST_INSERT_ID();
-- Suggested muscle: 前锯肌 (agonist)
-- Suggested muscle: 胸大肌 (synergist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 下斜方肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 竖脊肌 (stabilizer)
-- Suggested muscle: 菱形肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('单臂杠铃卧推', 'chest', 'barbell', 'advanced', NULL, '1. 躺在平板凳上，双脚平放在地面，保持背部自然弧度。将杠铃放在胸部正上方，单手握住杠铃（另一只手扶住凳子或身体侧面以保持平衡）。\n2. 吸气，收紧核心，慢慢将杠铃从胸部上方下降至胸部中段，手肘呈约45度角，保持肩胛骨收紧并贴在凳面上。\n3. 在最低点稍作停顿，确保胸部感受到拉伸，然后呼气，通过胸部和手臂的力量将杠铃向上推起至起始位置，手臂不完全锁死。\n4. 完成设定的次数后，换另一只手臂重复相同的动作，确保两侧训练量相等。\n5. 结束后将杠铃稳妥放回杠铃架或请同伴帮助取下，防止因单臂操作导致杠铃失衡。', '1. 必须使用可靠的杠铃固定装置或请有经验的伙伴在旁协助，以防杠铃倾斜导致受伤。\n2. 下降和推起时要控制速度，避免弹跳或失控，尤其是单臂操作时更要保持核心稳定。\n3. 若感到肩关节或胸部有明显疼痛，应立即停止并咨询专业教练或医生。', '1. 手肘张得太开（超过90度），导致肩部受力过大，增加受伤风险。\n2. 背部过度弓起或离凳，导致腰椎受压，产生腰背不适。\n3. 在最高点手臂完全锁死，使关节承受额外负荷并降低肌肉张力。', '1. 调整凳子倾斜角度：平板凳适合中等难度，若想增加上部胸肌负荷，可将凳子调至倾斜30-45度。
2. 握距宽度：略宽于肩宽可以帮助更好地激活胸大肌内侧，适度收窄则更多刺激外侧。
3. 脚位与核心：双脚踏实地面、收紧腹肌可以帮助稳定身体，必要时可在凳子下方放垫子以调节高度。', 'compound', '{"哑铃卧推":"使用相同的手部位置和动作轨迹，但以哑铃代替杠铃，能更好地平衡两侧力量差异。","双杠铃卧推":"将双手同时握住杠铃进行传统的双侧卧推，降低平衡难度，适合恢复期或初学者。","俯卧撑":"徒手进行俯卧撑，保持身体成一直线，是一种低负荷的替代训练，可用于热身或辅助练习。"}', 'published', NOW(3), NOW(3));
SET @eid_14 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 肩部前束 (synergist)
-- Suggested muscle: 三头肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 背阔肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('哑铃卧推', 'chest', 'dumbbell', 'beginner', NULL, '1. 坐在平板凳上，双手各持一只哑铃，将哑铃置于大腿上，然后利用大腿的弹力将哑铃顺势提起，转换为仰卧姿势。\n2. 仰卧后，将哑铃举至胸部两侧，掌心朝向脚的方向，手肘弯曲约90度，手臂与地面保持垂直。\n3. 保持核心收紧、挺胸收肩的姿势，将哑铃向上推起，直到手臂接近伸直（但肘关节不要完全锁死）。\n4. 在顶点略作停顿，感受胸肌的收缩，然后按照原路径缓慢将哑铃下放至起始位置。\n5. 重复以上动作，保持呼吸节奏，呼气时向上推举，吸气时下放哑铃。', '1. 确保哑铃握把牢固，避免在推举过程中哑铃滑落伤到自己。\n2. 推举时切勿将哑铃完全锁死肘关节，保持微屈以保护关节。\n3. 如果感到肩关节不适或疼痛，应立即停止动作，避免造成运动损伤。', '1. 将哑铃下放时速度过快，导致肩关节受力过大，容易引发肩袖损伤。\n2. 推举时肩胛骨离开凳面，形成肩胛前引的错误姿势，增加肩部受伤风险。\n3. 使用过重的哑铃导致动作变形，无法标准完成动作，训练效果降低且增加受伤几率。', '初学者应从较轻的哑铃重量开始练习，确保动作的规范性。可以先在平凳上练习，待动作熟练后再尝试调整凳子角度。初学者也可选择坐姿哑铃推举作为过渡动作，逐渐培养肩部和胸部的力量。', 'compound', '{"坐姿哑铃推举":"适合上肢力量较弱的初学者，从坐姿开始减少核心稳定的需求，逐步过渡到平板卧推。","上斜哑铃卧推":"增加凳子角度至30-45度，可以更加强化上胸肌的刺激。","下斜哑铃卧推":"下斜角度适合强化下胸肌，但需要更多核心稳定性，适合进阶练习者。"}', 'published', NOW(3), NOW(3));
SET @eid_15 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 肱三头肌 (synergist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 背阔肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('器械下斜卧推', 'chest', 'machine', 'intermediate', NULL, '1. 调整机器的座椅高度，使手柄位于胸部正上方并略低于肩部；\n2. 调节靠背的倾斜角度，使其略低于水平（约15‑20度），确保背部紧贴靠背且下背部保持自然弧度；\n3. 双手握住把手，间距与肩同宽或略宽，手臂自然下垂，手肘略微弯曲；\n4. 深呼吸，收腹，胸部向上推，同时手臂伸直，保持肘部微屈（不要完全锁死），感受到胸大肌下部的发力；\n5. 在顶峰位置稍作停顿后，缓慢放下手柄至胸部两侧，感受胸肌的伸展；\n6. 重复动作，保持动作的平稳与控制，避免弹震或急促的推拉。', '1. 确认机器的所有调节部件（座椅、靠背、把手）已锁紧，防止在使用过程中滑动或倒塌；\n2. 动作全程保持背部紧贴靠背，避免背部抬起或离开，以免造成腰椎过度负荷；\n3. 使用适当的重量，避免使用过大重量导致肩部前倾或肘关节过度伸展，降低受伤风险。', '1. 背部离开靠背或耸肩，导致肩部过度参与和腰椎受压；\n2. 手柄间距过窄或过宽，导致胸肌激活不足或肩关节不适；\n3. 动作速度过快，缺乏对重量的控制，容易在下降阶段出现弹震或失控。', '1. 调整座椅高度至手柄略低于胸部，确保推举时手臂与地面形成约30度的倾斜；
2. 靠背倾斜角度应保持在15‑20度的下斜状态，以更好刺激胸大肌下部；
3. 根据个人肩部柔韧性和胸部感受，适当调节把手的前后位置，使肘部在最低点时与身体呈约45度角。', 'compound', '{"杠铃下斜卧推":"将机器换成杠铃，保持相同的下斜角度，注意控制核心稳定性，重量需适当降低以防失衡。","哑铃下斜卧推":"使用哑铃替代，手臂自由度更大，能更好地刺激胸肌下部，需注意保持平衡和对侧的重量相等。","史密斯机下斜卧推":"在史密斯机上固定杠铃进行下斜卧推，轨道固定有助于新手掌握动作轨迹，重量可以逐步增加。"}', 'published', NOW(3), NOW(3));
SET @eid_47 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌（下部） (agonist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 三头肌（长头） (synergist)
-- Suggested muscle: 背阔肌 (antagonist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 肩胛稳定肌群（如斜方肌） (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('器械卧推', 'chest', 'machine', 'beginner', NULL, '1. 调整机器座椅高度，使手柄与胸部中部平齐，双脚平放在地上，保持背部自然贴紧靠背。\n2. 握住手柄，手掌向前，手肘略微弯曲，胸部略微挺起，肩胛骨微微收紧。\n3. 吸气，使用胸部力量将手柄向前推，同时保持核心收紧，避免用力过猛导致背部抬起。\n4. 到达伸展位置时，手臂不完全锁死，保持轻微弯曲以维持张力。\n5. 呼气，缓慢将手柄收回至胸部位置，保持控制，避免重量弹回。\n6. 重复动作，完成预定次数。', '确保机器锁定牢固，重量卡扣已锁好，避免在运动过程中重量滑落。,动作全程保持背部紧贴靠背，避免背部过度弓起或离开支撑。,使用适当负荷，若感到肩关节或胸部不适，应立即停止并降低重量。', '背部拱起或离开靠背，导致腰部承受额外压力。,肘部外展角度过大，增加肩部受伤风险。,在推举时使用冲力或耸肩，减弱胸部刺激并增加受伤可能。', '座椅高度调节至手柄与胸部平齐，确保手臂在推举时自然伸展。,背垫角度可微调，保持胸部略微前倾但不导致背部过度弓起。,如机器提供可调节的手柄宽度，选择略宽于肩部的握法，以更好刺激胸大肌。', 'compound', '{"自由杠铃卧推":"使用杠铃进行卧推时，保持相同的胸部定位和动作轨迹，但需要自行控制平衡。","哑铃卧推":"通过哑铃卧推可以获得更大的活动范围，注意保持肩胛收紧，防止肩部前伸。","俯卧撑":"以自身体重进行俯卧撑，练习胸部和核心的协同发力，适合作为机器卧推的辅助练习。"}', 'published', NOW(3), NOW(3));
SET @eid_45 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 三头肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 肩胛提肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('胸肌完整训练', 'chest', 'barbell', 'advanced', NULL, '1. 调整凳子角度（如平板、上斜或下斜），确保凳子稳固并靠在支架上。\n2. 仰卧在凳子上，双脚平放在地面，背部紧贴凳面，保持肩胛骨自然收紧并略微向下压。\n3. 双手握杠，握距略宽于肩，手腕保持中立，杠铃位于胸部正上方。\n4. 深吸气，缓慢将杠铃下降至胸部中段（前锯肌位置），肘部略低于肩线，保持核心紧绷。\n5. 发力推起杠铃，胸部收缩，手臂伸直但不要锁死，呼气。\n6. 在顶峰保持短暂收缩，然后重复进行。', '1. 使用适当的重量，最好有训练伙伴或安全杠，以防失控。\n2. 确保握杆稳固，避免杠铃滑动导致受伤。\n3. 动作全程保持肩胛骨收紧，避免肩部过度前伸造成肩袖损伤。', '1. 背部下沉或弓背，导致腰椎过度弯曲。\n2. 握距过宽或过窄，导致肩部外展角度过大，增加受伤风险。\n3. 下降速度过快，未完成全程幅度，减少胸肌刺激。', '1. 如需加强上胸，可将凳子倾斜15-30度；下胸则使用下斜凳。
2. 调整握距：宽握更侧重胸肌外侧，窄握则增加三头肌参与。
3. 如感到肩部不适，可改用哑铃卧推或调整手部角度，使肘部保持在45度左右。', 'compound', '{"变体类型":"哑铃卧推、俯卧撑、绳索飞鸟"}', 'published', NOW(3), NOW(3));
SET @eid_84 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 三头肌 (synergist)
-- Suggested muscle: 背阔肌 (stabilizer)
-- Suggested muscle: 腹肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('蛙俯卧撑', 'chest', 'bodyweight', 'intermediate', NULL, '1. 起始姿势：双手手掌贴近，掌心向下，手指自然张开，呈蛙形，手肘向外张开，与肩同宽或略宽。双脚并拢，脚尖着地，身体从头到脚呈一直线。\n2. 吸气并屈臂：屈肘下降，保持肘部向外张开，胸部向下靠近手掌，肩胛骨略微收紧，整个动作过程中保持核心紧绷。\n3. 下降到最低点：胸部尽量接近手掌，手臂约呈90度弯曲，背部保持平直，避免塌腰或拱背。\n4. 发力推起：呼气，用胸大肌、三角肌前束和肱三头肌协同发力，将身体推回起始姿势，手臂不完全锁死。\n5. 重复动作：按设定的次数或时间进行连续练习，保持节奏和呼吸配合。', '1. 确保地面平整、防滑，避免手腕受伤。\n2. 下降时不要让肘部过度外展导致肩关节受压，保持肩胛骨自然收紧。\n3. 若出现肩部或手腕疼痛，应立即停止并检查姿势，必要时降低动作幅度或改为较易的变体。', '1. 肘部过度外展或内收，导致肩部受力不均。\n2. 塌腰或拱背，使腰椎受压，降低胸部发力。\n3. 下降幅度不足，仅做半程动作，无法充分刺激胸部。', '如动作难度过高，可先采用跪姿蛙俯卧撑或把手放在稍高的平台上，以减轻体重；若想增加难度，可在推起时加入一次快速的手臂伸展（弹力式）或使用阻力带进行进阶练习。', 'compound', '{"标准俯卧撑":"将手距调宽至肩宽的1.5倍，保持肘部外展即可完成传统俯卧撑。","窄距俯卧撑":"将双手靠近至胸部正下方，保持手肘贴近身体两侧，以更强调三头肌和内侧胸大肌。","单臂俯卧撑":"将一侧手放在背后，使用单手支撑进行动作，可进一步提升核心和胸部力量。","弹力带蛙俯卧撑":"在背部套上弹力带，增加上升阻力，适合进阶训练。","跪姿蛙俯卧撑":"膝盖着地，降低体重，适合初学者或肩部不适者。"}', 'published', NOW(3), NOW(3));
SET @eid_68 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 肱三头肌 (synergist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 背阔肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('递减组哑铃卧推', 'chest', 'dumbbell', 'advanced', NULL, '1. 躺在平凳上，双手各持一只哑铃，手臂伸直，哑铃位于胸部正上方，掌心朝前。2. 缓慢弯曲手肘，降低哑铃至胸部两侧，保持肘部角度略低于肩部水平线。3. 推起哑铃至起始位置，重复完成一组预定的次数（8-10次），达到接近力竭状态。4. 立即将哑铃换为较轻重量（通常减轻20-30%），继续做至力竭。5. 如体力允许，可再换更轻哑铃进行第三组，确保每组都达到力竭。6. 完成所有递减组后，缓慢将哑铃放回地面或置于身体两侧。', '1. 递减组训练强度较高，确保有训练伙伴在旁保护或准备协助。2. 换哑铃时要握紧把柄，避免因疲劳导致哑铃滑落砸到身体。3. 始终保持核心收紧，避免在推举时过度拱腰造成下背损伤。', '1. 换重量时动作过慢，间隔时间过长，导致训练效果降低。2. 肘部外展过大接近90度，增加肩部受伤风险。3. 下降阶段控制不当，速度过快或深度过浅，无法充分刺激肌肉。', '初学者可先用固定重量完成2组再递减，避免连续递减导致技术变形。可将三组递减改为两组递减。进阶训练者可尝试从平板延伸至下斜或上斜凳进行递减组。', 'compound', '{"器械替换":"可使用杠铃进行递减组卧推，需调整握距和注意对称性","姿势变化":"可改为上斜或下斜哑铃卧推，针对胸肌不同区域进行递减组训练","强度调整":"可从三组递减减少为两组递减，或减少每组次数以适应训练水平"}', 'published', NOW(3), NOW(3));
SET @eid_26 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 三角肌前束 (synergist)
-- Suggested muscle: 肱三头肌 (synergist)
-- Suggested muscle: 前锯肌 (stabilizer)
-- Suggested muscle: 背阔肌 (antagonist)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('龙门架夹胸', 'chest', 'cable', 'beginner', NULL, '1. 调整龙门架滑轮高度至略高于肩部，选择合适的重量并确认滑轮固定。\n2. 站立于龙门架正中央，双脚与肩同宽，保持身体直立，胸部略微挺起。\n3. 双手握住两侧手柄，掌心向下，手肘微屈并略微向外展开，保持肩胛骨轻微后收，避免耸肩。\n4. 以胸大肌为主要发力点，将手柄向前下方拉拢至双手在胸前靠拢，保持动作幅度适中，胸肌全程保持张力。\n5. 在顶峰位置稍作停顿（约1秒），感受胸肌的收缩。\n6. 缓慢而有控制地回到起始位置，手臂仍保持微屈状态，避免完全伸直导致胸肌失去张力。', '使用前检查滑轮和手柄是否牢固，确保重量选择适中，避免因重量过大导致肩部受伤。,动作全程保持肩胛骨固定，避免耸肩或前倾，以减少肩关节不必要的压力。,若在练习过程中出现胸部、肩部或手臂的刺痛或不适，应立即停止并调整姿势或咨询专业教练。', '使用过大的重量导致肩部代偿，动作幅度受限，胸肌刺激减弱。,在拉动时手臂完全伸直，失去胸肌的张力，降低练习效果。,动作过程中耸肩或身体前倾，使胸肌发力被转移到肩部，降低胸部刺激。', '可根据个人肩部柔韧性调节滑轮高度，手柄可换成宽握或窄握以改变胸部刺激部位；若感到肩部不适，可略微降低重量或使用把手式绳索来减轻关节压力。', 'isolation', '{"哑铃飞鸟":"使用哑铃替代，保持肘部微屈，动作轨迹与龙门架相似，但需自行控制重量下落和上升。","机械夹胸":"将器械座椅调至适合高度，手臂展开角度与龙门架相似，利用机械支撑减轻平衡难度。","俯卧撑":"在没有器械的情况下进行俯卧撑，胸肌发力方式类似，但需更多核心参与以维持身体稳定。"}', 'published', NOW(3), NOW(3));
SET @eid_33 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 胸小肌 (synergist)
-- Suggested muscle: 肩袖肌群 (stabilizer)
-- Suggested muscle: 肱二头肌 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('胸肌训练器夹胸', 'chest', 'machine', 'beginner', NULL, '1. 调整机器座椅高度，使手柄与胸部平齐。\n2. 坐姿，背部紧贴靠背，双手握住手柄，手肘微屈，手臂张开呈约45度。\n3. 呼气时，用胸肌的力量将手柄向前内收，直至双手在胸前相遇，保持顶峰收缩1-2秒。\n4. 吸气时，缓慢回到起始位置，保持控制，不要让重量完全释放。\n5. 重复动作，完成设定的次数。', '1. 确保机器调节合适，手柄轨迹无阻碍。\n2. 保持背部紧贴靠背，避免用力过猛导致腰椎受伤。\n3. 使用适当的重量，避免使用过重导致动作变形或肩关节受伤。', '1. 手肘过度伸展或锁死，导致肩关节压力过大。\n2. 动作时耸肩或背部离开靠背，胸肌发力减弱。\n3. 使用过重导致动作幅度不足，不能完整收缩胸肌。', '1. 调整座椅高度和背垫位置，确保手臂自然张开。
2. 根据身高和臂长调节手柄宽度，使胸部感受最佳拉伸。
3. 如感到肩部不适，可稍微减小手柄外展角度。', 'isolation', '{"变体类型":"自由哑铃夹胸","转换建议":"将动作转为哑铃夹胸时，保持背部平躺，肘部微屈，使用合适的重量完成相同轨迹。"}', 'published', NOW(3), NOW(3));
SET @eid_57 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 喙肱肌 (synergist)
-- Suggested muscle: 背阔肌 (antagonist)
-- Suggested muscle: 肩袖肌群 (stabilizer)

INSERT INTO exercises (name, category, equipment, difficulty, description, steps, safetyNotes, commonMistakes, adjustmentNotes, exerciseType, conversionGuide, status, created_at, updated_at)
VALUES ('长凳俯卧撑', 'chest', 'bodyweight', 'beginner', NULL, '1. 站立于长凳前，双手张开约与肩同宽，手掌平放在长凳上，手指向前。\n2. 脚尖向后迈出，身体从头到脚呈一条直线，保持核心紧绷。\n3. 吸气，屈肘将胸部向长凳方向靠近，保持身体平直，不要塌腰或拱背。\n4. 在胸部接近长凳的瞬间用力推起，呼气，回到起始姿势。\n5. 重复进行，保持节奏平稳。', '确保长凳稳固，不会滑动或倾倒；\n若感到肩部或手腕不适，应立即停止；\n保持脊柱中立，避免过度弓背或塌腰。', '身体下沉时腰部塌陷，导致腰椎压力过大；\n手肘过度外展，增加肩关节负担；\n推起时速度过快，忽视控制。', '初学者可以先从较矮的长凳开始，降低难度；
进阶者可使用较高的凳子或单臂支撑提高难度；
可在长凳上放软垫或毛巾，防止手部滑动。', 'compound', '{"标准俯卧撑":"将双手放在地面，脚尖着地，保持身体直线，与长凳俯卧撑类似但更具挑战性。","跪姿俯卧撑":"膝盖跪地，双手仍放在长凳上，降低身体重心，适合极度初学者。","窄距长凳俯卧撑":"双手靠近甚至相触，强化三头肌刺激。","宽距长凳俯卧撑":"双手比肩宽，主要强化胸大肌外侧。","单臂长凳俯卧撑":"使用单手支撑，大幅提升核心稳定性和力量。","上斜俯卧撑（高位）":"将脚放在长凳上，手在地面，难度更大，侧重上胸。","下斜俯卧撑（低位）":"脚在地面，手在长凳（当前动作），主要强化胸上部。"}', 'published', NOW(3), NOW(3));
SET @eid_69 = LAST_INSERT_ID();
-- Suggested muscle: 胸大肌 (agonist)
-- Suggested muscle: 前三角肌 (synergist)
-- Suggested muscle: 三头肌 (synergist)
-- Suggested muscle: 腹直肌 (stabilizer)
-- Suggested muscle: 腹外斜肌 (stabilizer)
-- Suggested muscle: 背阔肌 (antagonist)

