-- AI 生成的肌肉详情
USE fitlc;

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('肱二头肌', NULL, NULL, '主要功能是屈肘、前臂旋后（旋外）和协助肩关节屈曲（在长头的帮助下）。此外，它在提拉和搬运动作中提供力量和稳定性。', '进行多样化的弯举训练，如杠铃弯举、哑铃弯举、锤式弯举和斜板弯举，以全面刺激不同头部纤维。,注重全程运动范围，下放时控制离心收缩，避免弹震或只用惯性完成动作，以提高肌肉张力。,结合复合动作（如引体向上、划船）提供足够的负荷，同时加入高次数的孤立练习（如集中弯举）来强化泵感和代谢刺激。', NOW(3), NOW(3));
SET @mid_22 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('肱三头肌', NULL, NULL, '主要功能是伸展肘关节；长头还参与肩关节的后伸和内收。', '进行窄距杠铃卧推或哑铃卧推，重点刺激肱三头肌内侧头和外侧头。,使用头顶伸展（如站姿或坐姿的绳索下压、哑铃俯身伸展）强化长头的收缩。,进行绳索下压、俯身臂屈伸或三头肌下压等孤立练习，提升肘关节伸展力量。', NOW(3), NOW(3));
SET @mid_23 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('前臂肌群', NULL, NULL, '前臂肌群主要控制手腕和手指的屈伸运动，包括屈腕、伸腕、屈指、伸指；部分肌肉负责前臂的旋前和旋后；此外还参与握力和抓握力量的产生', '杠铃/哑铃卷腕：坐姿手持哑铃，手腕悬挂于台面边缘，向上卷动手腕收缩前臂屈肌，每组12-15次,反向卷腕：俯卧于平板凳上，手腕向下弯曲对抗阻力，锻炼前臂伸肌群,握力训练：使用握力器或悬挂重物进行长时间握持训练，有助于增强前臂整体力量和耐力', NOW(3), NOW(3));
SET @mid_24 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('手臂', NULL, NULL, '手臂的主要功能包括：屈伸肘关节（肱二头肌负责屈肘，肱三头肌负责伸肘），前臂的旋前和旋后（肱二头肌和肱桡肌参与），以及手腕和手指的屈曲和伸展（前臂屈肌与伸肌）。', '进行杠铃或哑铃的弯举和颈后臂屈伸，以全面刺激肱二头肌和肱三头肌。,使用绳索或阻力带进行前臂旋前/旋后训练，提升前臂力量和握力。,结合俯卧撑、倒立撑等复合动作，确保上臂、肩部和核心肌群协同参与，提高整体手臂功能与稳定性。', NOW(3), NOW(3));
SET @mid_21 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('背阔肌', NULL, NULL, '主要功能为肩关节的内收、伸展和内旋，并参与胸廓的提升和深吸气时的辅助呼吸', '引体向上是锻炼背阔肌的经典动作，建议保持肩胛骨下沉、胸部向前上方挺起，以最大化背阔肌的激活,哑铃划船或单臂划船能够针对背阔肌进行单侧训练，注意保持背部挺直、肘部贴近身体进行拉动,使用高位滑轮下拉或坐姿划船机进行训练时，可通过调节握距（略宽或略窄）来改变背阔肌的拉伸与收缩幅度', NOW(3), NOW(3));
SET @mid_7 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('背部', NULL, NULL, '背部的主要功能包括：使脊柱伸展、侧屈和旋转；控制肩胛骨的内收、下抑和上旋；维持躯干和脊柱的稳定；辅助呼吸功能', '训练时注意复合动作优先，如引体向上、杠铃划船和俯身划船等，这些动作能全面刺激背部肌群,进行背部训练前要充分热身肩关节和脊柱，建议做猫式伸展和臀部激活动作以预防损伤,注重背部各区域的平衡发展，包括背阔肌、斜方肌中下束和竖脊肌，避免只训练自己擅长的动作', NOW(3), NOW(3));
SET @mid_6 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('中下斜方肌', NULL, NULL, '中斜方肌负责肩胛骨的内收（收缩）和水平后倾；下斜方肌负责肩胛骨的下压、向上旋转并协助肩胛骨的稳定。两者共同参与肩胛骨的向后收缩、整体背部伸展及脊柱的轻微伸展动作。', '面拉（Face Pull）：使用绳索器械将绳索拉向面部，保持肩胛骨向后收缩，可有效锻炼中斜方肌。,俯身反向飞鸟（Bent‑over Reverse Fly）或弹力带外展：身体前倾，手臂向两侧打开时专注于肩胛骨内收，重点刺激中斜方肌。,俯卧Y‑T‑W举起（Prone Y‑T‑W Raise）：在俯卧位举起双臂形成Y、T、W字母形，利用重力强化中下斜方肌的收缩与离心控制。', NOW(3), NOW(3));
SET @mid_8 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('大圆肌', NULL, NULL, '上臂的内收、伸展和内旋，辅助肩胛骨的固定和肩关节的稳定，在拉拽、划船等动作中发挥重要作用', '使用宽握或窄握的引体向上，专注于下拉过程中将肘部向下后方拉，以充分刺激大圆肌,进行哑铃单臂划船或杠铃划船时，保持肩胛骨收缩并向下压，帮助大圆肌发力,在滑轮高位下拉或面拉等练习中，采用适度的重量并控制动作幅度，以激活大圆肌的伸展与内收功能', NOW(3), NOW(3));
SET @mid_9 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('小圆肌', NULL, NULL, '主要负责上臂的外旋（即向后旋转），并协助肩关节的稳定；在肩部伸展和外展时也提供一定的支持', '侧卧或俯身哑铃外旋：手持轻重量哑铃，侧卧姿势进行手臂外旋，以强化小圆肌的外旋功能,绳索面拉（Face Pull）：使用绳索装置进行向后的拉力训练，帮助激活肩袖肌群包括小圆肌,弹力带外旋：将弹力带固定在一侧，手握另一端进行外旋动作，保持肩胛骨稳定，注意控制动作幅度', NOW(3), NOW(3));
SET @mid_10 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('竖脊肌', NULL, NULL, '竖脊肌主要负责脊柱的伸展、侧屈和轻微的旋转，并在维持姿势、支撑躯干以及在弯腰、抬举等动作中发挥重要作用。', '进行背部伸展练习，如俯卧背伸（超伸展）或使用背伸机，帮助强化竖脊肌的伸展功能。,在复合动作中加入硬拉和罗马椅挺身，这些动作能够激活整个竖脊肌群。,使用高位下拉或负重体前屈时保持脊柱中立，避免过度弯腰导致竖脊肌受伤。', NOW(3), NOW(3));
SET @mid_11 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('胸部', NULL, NULL, '主要功能是进行肩关节的水平内收、屈曲和内旋；在用力推举时提供强大的推力；并辅助呼吸时提升胸廓', '采用杠铃卧推、哑铃卧推等复合大重量动作进行全面胸部刺激，注意保持肩胛骨稳定，避免肩部过度前伸,通过上斜卧推和下斜卧推等角度变化，分别强化上部与下部胸肌，防止发展不均衡,使用绳索飞鸟、俯卧撑等动作进行胸部伸展与收缩的全程张力训练，强调离心阶段的控制，以提升肌肉肥大与线条感', NOW(3), NOW(3));
SET @mid_1 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('上胸', NULL, NULL, '负责肩关节的屈曲、水平内收以及上臂的内旋；在推举、俯卧撑等动作中提供主要力量。', '1. 倾斜杠铃卧推或倾斜哑铃卧推（上斜板角度30°~45°），重点刺激上胸。
2. 倾斜哑铃飞鸟或低-高滑轮飞鸟，保持张力在全程动作中，以强化上胸纤维。
3. 手高脚低的俯卧撑或负重俯卧撑，增加肩部屈曲角度，有效激活上胸。', NOW(3), NOW(3));
SET @mid_2 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('中胸', NULL, NULL, '负责上臂的内收、内旋和水平屈曲，并辅助呼吸时的胸廓扩张', '进行杠铃卧推或哑铃卧推时，注意胸中部发力，保持肩胛骨收紧，避免肩部前伸过度。,使用绳索飞鸟或蝴蝶机进行中胸孤立训练，注意动作全程控制，感受胸中部的拉伸与收缩。,加入变式俯卧撑（如窄距俯卧撑或负重俯卧撑），强化中胸部力量并提升肌肉对称性。', NOW(3), NOW(3));
SET @mid_3 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('下胸', NULL, NULL, '使上臂在肩关节处屈、内收和内旋；当上臂上举时，可帮助将上臂向下拉', '下斜卧推：使用下斜凳，将哑铃或杠铃向下推，侧重下胸发力,双杠臂屈伸：身体略前倾，利用自重下压，重点锻炼下胸和肱三头肌,下斜俯卧撑：在双手垫高的俯卧撑基础上，提升双脚高度，使身体呈下斜角度', NOW(3), NOW(3));
SET @mid_4 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('前锯肌', NULL, NULL, '前锯肌的主要功能是使肩胛骨前伸和上旋，帮助肩胛骨紧贴胸壁，提升上肢的推举和举臂动作的稳定性，同时在深呼吸时协助提升肋骨。', '俯身哑铃推举或站姿推举时，保持肩胛骨收紧，感受前锯肌的发力。,进行俯卧撑或推墙练习时，注意胸部向前、肩膀向下，以激活前锯肌。,使用绳索前锯肌推拉训练器或侧平板支撑等动作，重点控制动作全程，避免耸肩。', NOW(3), NOW(3));
SET @mid_5 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('上腹', NULL, NULL, '使躯干前屈（脊柱屈曲），压缩腹腔，协助呼气，提升腹内压，维持核心稳定，帮助骨盆和脊柱的对位', '1. 仰卧卷腹（Crunches）：平躺屈膝，双手置于胸前或耳侧，用腹部力量将肩胛部抬离地面，避免用手拉动颈部；2. 俯卧支撑（Plank）：保持身体呈直线，肘部支撑在前臂上，收紧腹肌，保持30-60秒；3. 悬垂举腿（Hanging Leg Raises）：双手挂在单杠上，保持腿部伸直或微屈，缓慢抬起双腿至与地面平行，然后放下，训练上腹部力量。', NOW(3), NOW(3));
SET @mid_26 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('下腹', NULL, NULL, '主要功能是使躯干屈曲，尤其是将胸部向骨盆方向靠近；收缩时可压迫腹腔，帮助产生腹内压，提升核心稳定性；在骨盆前倾与后倾的调节中起重要作用。', '在训练下腹时多做仰卧抬腿、倒立卷腹或悬垂膝抬等动作，确保动作控制、避免腰椎过度伸展。,练习时配合腹式呼吸，在收缩时吸气并在放松时呼气，以增强腹内压的调节能力。,逐步增加负荷或重复次数，同时注意整体核心的协同训练，防止因单独强化下腹导致腰背不平衡。', NOW(3), NOW(3));
SET @mid_27 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('腹斜肌', NULL, NULL, '主要功能包括躯干屈曲、侧屈和旋转，压缩腹腔以帮助用力呼气，协助稳定脊柱和骨盆，并参与腹压调节。', '侧向平板支撑：保持身体侧向姿势，利用腹部斜肌维持稳定，可每次坚持30‑60秒。,俄罗斯转体：坐姿手握重物或徒手，上半身向后倾斜并左右转动，锻炼斜肌的旋转力量。,斜向卷腹：在斜面上进行卷腹动作，重点感受腹部斜肌的收缩。', NOW(3), NOW(3));
SET @mid_28 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('腹横肌', NULL, NULL, '压缩腹腔内容物，增加腹内压，支持脊柱和骨盆的稳定性，协助用力呼气并在躯干旋转、侧屈时提供深层支撑', '1. 腹式呼吸与腹部真空练习（如收紧腹部保持30秒），激活腹横肌；2. 平板支撑、侧平板支撑或死虫（Dead Bug）等核心深层稳定动作；3. 绳索横向拉（Woodchop）或负重转体等功能性训练，提高腹横肌在动态运动中的协同作用。', NOW(3), NOW(3));
SET @mid_29 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('下背肌群', NULL, NULL, '主要功能是伸展脊柱、侧屈脊柱、参与脊柱旋转和维持躯干直立姿势，同时在举重和搬运重物时发挥重要的脊柱稳定作用', '山羊挺身是下背肌群的最佳训练动作，躯干俯卧在训练凳上，缓慢控制下放然后用力向上挺身,超人式训练能有效激活下背肌群，俯卧位同时抬起双臂和双腿，保持2-3秒后放下,进行硬拉训练时注意保持脊柱中立位，避免腰椎过度弯曲，可有效强化下背肌群', NOW(3), NOW(3));
SET @mid_30 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('核心', NULL, NULL, '核心肌群的主要功能是维持脊柱和骨盆的稳定，参与躯干的屈曲、伸展、侧屈和旋转，并在运动过程中传递上下肢的力量，帮助保持姿势和防止腰背受伤。', '平板支撑（Plank）：保持身体呈直线，收紧腹横肌和竖脊肌，保持30秒至1分钟，逐步延长时间，以提升核心整体稳定性。,死虫（Dead Bug）：仰卧，双手伸向天花板，对侧手臂与腿部交替伸展，保持腹压，重点训练腹横肌和多裂肌的抗伸展能力。,俄罗斯转体（Russian Twist）或药球转体：坐姿，脚离地，转体时让药球触碰地面，锻炼腹内、外斜肌的旋转控制与力量。', NOW(3), NOW(3));
SET @mid_25 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('股四头肌', NULL, NULL, '股四头肌是膝关节的主要伸肌，负责伸展小腿，其中股直肌还参与屈曲髋关节，是行走、跑步、跳跃和蹲起等动作的关键肌肉', '深蹲是锻炼股四头肌最有效的复合动作，注意保持正确的下蹲姿势和膝盖与脚尖方向一致,腿举和腿屈伸训练可以孤立刺激股四头肌，建议在力量训练后进行孤立训练,箭步蹲和保加利亚分腿蹲不仅能强化股四头肌，还能提升平衡性和核心稳定性', NOW(3), NOW(3));
SET @mid_13 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('腘绳肌', NULL, NULL, '屈膝关节（主要功能）；伸髋关节（特别是长头参与髋伸展）；在膝关节屈曲时帮助胫骨内旋。', '1. 罗马尼亚硬拉：双脚与肩同宽，屈髋下放杠铃至腘绳肌拉伸感明显，保持背部平直，有效强化髋伸展能力。
2. 俯卧腿弯举：俯卧于训练凳，膝关节从完全伸展位弯举至最大屈曲，充分锻炼膝屈功能，注意控制离心阶段。
3. 北欧腿弯举（Nordic curl）：高难度训练，从跪姿逐渐放低身体，强化腘绳肌的离心力量和膝关节稳定性，对预防运动损伤特别有效。', NOW(3), NOW(3));
SET @mid_14 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('腿部', NULL, NULL, '腿部是人体最大、最强的肌群，承担行走、跑步、跳跃、蹲下、站立等基本动作。主要功能包括：髋关节的屈曲、伸展、外展、内收和旋转；膝关节的屈曲和伸展；踝关节的背屈和跖屈（尤其是小腿三头肌）。此外，腿部肌肉在维持姿势平衡、能量储存与释放（如弹簧效应）以及血液回流方面也发挥关键作用。', '综合多关节动作：如深蹲、硬拉和弓步，这些动作能够同时刺激股四头肌、臀大肌、腘绳肌以及小腿肌群，提高整体力量和协调性。,单侧训练：采用单腿深蹲、保加利亚分腿蹲或单腿硬拉，可以纠正左右腿力量不平衡，增强核心稳定性和踝关节的支撑力。,控制离心阶段：无论是深蹲还是腿举，都应在下降阶段保持2–3秒的控制，以最大化肌纤维损伤与增长，同时减少受伤风险。', NOW(3), NOW(3));
SET @mid_12 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('臀大肌', NULL, NULL, '主要功能是髋关节的伸展、外旋和上部纤维的轻度外展；在行走、跑步、爬楼梯时提供骨盆和骶髂关节的稳定性；通过髂胫束协助膝关节的伸展和稳定。', '1. 深蹲和硬拉等复合动作能全面激活臀大肌，建议在训练计划中占主要比例；
2. 臀推（Hip Thrust）和臀桥（Glute Bridge）是对臀大肌的高效Isolation训练，适合作为辅助动作加强收缩感；
3. 进行侧向跨步（侧弓步）和单腿蹲等单侧训练，可提升臀部肌肉的平衡与功能性力量。', NOW(3), NOW(3));
SET @mid_15 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('小腿肌群', NULL, NULL, '主要负责足踝的跖屈（小腿抬起足跟），并在行走、跑步、跳跃时提供推进力；腓肠肌还能辅助屈膝', '1. 站姿提踵：双脚与肩同宽，缓慢提起脚跟至最高点，然后慢慢放下，重复12-15次，进行3-4组；2. 坐姿提踵：坐在凳子或椅子上，双脚平放在地面，提起脚跟，着重刺激比目鱼肌；3. 跳绳或踏步训练：结合有氧运动进行短时间的快速提踵，提高爆发力和耐力。', NOW(3), NOW(3));
SET @mid_16 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('三角肌前束', NULL, NULL, '肩关节前屈、肩关节内旋、肩胛骨上抬，参与肩部水平内收和外展的初始阶段', '1. 前平举是训练三角肌前束的最佳动作，可采用哑铃或杠铃，注意控制重量避免借力；2. 推举类动作（如肩上推举）也能有效刺激前束，建议在训练计划中优先完成推举；3. 训练时注意肩胛骨的稳定性，避免过度耸肩导致斜方肌代偿，建议在动作顶端停顿1-2秒以增强肌肉收缩感', NOW(3), NOW(3));
SET @mid_18 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('三角肌中束', NULL, NULL, '主要负责肩关节的外展（将上臂向侧面抬起），是肩部外展的主要驱动肌；在外展的中段（约30°至90°）作用尤为突出；同时还能协助前束进行肩关节的屈曲和后束进行伸展，尤其在外展时的稳定作用显著', '侧平举（哑铃或绳索）：站立，双手持哑铃或握住绳索，向两侧抬起至与肩同高，保持肘部略屈，避免耸肩，重点感受中束的拉伸与收缩,坐姿侧平举：坐在凳子上，双手握住哑铃，身体略微前倾，将双臂向外抬起，帮助集中负荷在中束并减少前束代偿,俯身侧平举（俯身飞鸟）：俯身约45度，手臂自然下垂，掌心相对，向两侧抬起至手臂与肩平齐，可增强中束的力量并提升肩关节的稳定性', NOW(3), NOW(3));
SET @mid_19 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('三角肌后束', NULL, NULL, '三角肌后束的主要功能是肩关节的水平外展（后伸）和外旋，帮助将上臂向后拉动并在推举动作中稳定肩胛骨，参与肩部的整体力量和姿态控制', '1. 进行俯身反向飞鸟、面拉等练习，重点感受后束的收缩；2. 使用适中的重量，保持肩胛骨后收下沉，避免耸肩；3. 训练后进行肩部后束的伸展和滚筒放松，以维持关节灵活性和防止僵硬', NOW(3), NOW(3));
SET @mid_20 = LAST_INSERT_ID();

INSERT INTO muscles (name, parentId, description, function, trainingTips, created_at, updated_at)
VALUES ('肩部', NULL, NULL, '肩部肌肉群的主要功能包括：肩关节外展（三角肌和冈上肌）、前屈（三角肌前束）、后伸（三角肌后束）、内旋（肩胛下肌和三角肌前束）、外旋（冈下肌、小圆肌）、以及维持肩关节的稳定性和动态平衡', '1. 推举类动作（如杠铃推举、哑铃推举）可有效训练三角肌整体力量；2. 侧平举类动作重点强化三角肌中束，改善肩部宽度和轮廓；3. 肩袖肌群的训练（如面拉、旋转训练）对于肩部健康和预防损伤至关重要，建议每周安排专门的肩袖训练', NOW(3), NOW(3));
SET @mid_17 = LAST_INSERT_ID();

