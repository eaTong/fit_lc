import { Router } from 'express';
import { authMiddleware, requireRole } from '../middleware/auth';
import { muscleRepository } from '../repositories/muscleRepository';
import { muscleAIService } from '../services/muscleAIService';

const router = Router();

router.use(authMiddleware);
router.use(requireRole('admin'));

/**
 * @swagger
 * /admin/muscles:
 *   get:
 *     summary: 获取肌肉列表（管理员）
 *     tags: [管理-肌肉]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 肌肉列表（含层级）
 */
// GET /api/admin/muscles - 肌肉列表（含层级）
router.get('/', async (req, res) => {
  try {
    const muscles = await muscleRepository.getHierarchy();
    res.json(muscles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /admin/muscles:
 *   post:
 *     summary: 创建肌肉（管理员）
 *     tags: [管理-肌肉]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - group
 *             properties:
 *               name:
 *                 type: string
 *                 description: 肌肉名称
 *               group:
 *                 type: string
 *                 description: 肌肉组
 *               parentId:
 *                 type: integer
 *                 description: 父肌肉ID
 *     responses:
 *       200:
 *         description: 创建成功
 */
// POST /api/admin/muscles - 创建肌肉
router.post('/', async (req, res) => {
  try {
    const muscle = await muscleRepository.create(req.body);
    res.json(muscle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /admin/muscles/{id}:
 *   put:
 *     summary: 更新肌肉（管理员）
 *     tags: [管理-肌肉]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 肌肉ID
 *     responses:
 *       200:
 *         description: 更新成功
 */
// PUT /api/admin/muscles/:id - 更新肌肉
router.put('/:id', async (req, res) => {
  try {
    const muscle = await muscleRepository.update(
      parseInt(req.params.id),
      req.body
    );
    res.json(muscle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /admin/muscles/{id}:
 *   delete:
 *     summary: 删除肌肉（管理员）
 *     tags: [管理-肌肉]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 肌肉ID
 *     responses:
 *       200:
 *         description: 删除成功
 */
// DELETE /api/admin/muscles/:id - 删除肌肉
router.delete('/:id', async (req, res) => {
  try {
    await muscleRepository.delete(parseInt(req.params.id));
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /admin/muscles/generate:
 *   post:
 *     summary: AI 生成肌肉详情（管理员）
 *     tags: [管理-肌肉]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - group
 *             properties:
 *               name:
 *                 type: string
 *                 description: 肌肉名称
 *               group:
 *                 type: string
 *                 description: 肌肉组
 *               parentMuscleName:
 *                 type: string
 *                 description: 父肌肉名称
 *     responses:
 *       200:
 *         description: 生成成功
 */
// POST /api/admin/muscles/generate - AI 生成肌肉详情
router.post('/generate', async (req, res) => {
  try {
    const { name, group, parentMuscleName } = req.body;
    if (!name || !group) {
      return res.status(400).json({ error: 'name 和 group 是必填项' });
    }
    const details = await muscleAIService.generateMuscleDetails({ name, group }, parentMuscleName);
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;