// @ts-nocheck
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { authMiddleware, requireRole } from '../middleware/auth';
import { exerciseRepository } from '../repositories/exerciseRepository';
import { exerciseVariantRepository } from '../repositories/exerciseVariantRepository';
import { exerciseAIService } from '../services/exerciseAIService';

const router = Router();

router.use(authMiddleware);
router.use(requireRole('admin'));

// Helper to get string from query param
function getQueryString(val: unknown): string | undefined {
  if (typeof val === 'string') return val;
  return undefined;
}

// Validation schemas
const createExerciseSchema = z.object({
  name: z.string().min(1, '动作名称不能为空'),
  category: z.enum(['chest', 'back', 'legs', 'shoulders', 'arms', 'core']),
  equipment: z.enum(['barbell', 'dumbbell', 'cable', 'machine', 'bodyweight', 'kettlebell', 'bands', 'other']),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  description: z.string().optional(),
  steps: z.string().optional(),
  safetyNotes: z.string().optional(),
  commonMistakes: z.string().optional(),
  adjustmentNotes: z.string().optional(),
  exerciseType: z.enum(['compound', 'isolation']).optional(),
  variantType: z.enum(['equipment', 'difficulty', 'posture']).optional(),
  status: z.enum(['draft', 'published']).default('draft'),
  muscles: z.array(z.object({
    muscleId: z.number(),
    role: z.enum(['agonist', 'synergist', 'antagonist', 'stabilizer'])
  })).optional()
});

const updateExerciseSchema = createExerciseSchema.partial();

// GET /api/admin/exercises - 动作列表
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, equipment, difficulty, status } = req.query;
    const exercises = await exerciseRepository.findAll({
      category: getQueryString(category),
      equipment: getQueryString(equipment),
      difficulty: getQueryString(difficulty),
      status: getQueryString(status)
    });
    res.json(exercises);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/exercises - 创建动作
router.post('/', async (req: Request, res: Response) => {
  try {
    const validationResult = createExerciseSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Invalid exercise data',
        details: validationResult.error.errors
      });
    }
    const exercise = await exerciseRepository.create(validationResult.data);
    res.json(exercise);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/admin/exercises/:id - 更新动作
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const validationResult = updateExerciseSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Invalid exercise data',
        details: validationResult.error.errors
      });
    }
    const exercise = await exerciseRepository.update(
      parseInt(String(req.params.id)),
      validationResult.data
    );
    res.json(exercise);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/admin/exercises/:id - 删除动作
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await exerciseRepository.delete(parseInt(String(req.params.id)));
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/admin/exercises/:id/publish - 发布动作
router.patch('/:id/publish', async (req: Request, res: Response) => {
  try {
    const exercise = await exerciseRepository.update(
      parseInt(String(req.params.id)),
      { status: 'published' }
    );
    res.json(exercise);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/admin/exercises/generate - AI 生成动作详情
router.post('/generate', async (req: Request, res: Response) => {
  try {
    const { name, category, equipment, difficulty, targetMuscles } = req.body;
    if (!name || !category || !equipment || !difficulty) {
      return res.status(400).json({ error: 'name, category, equipment, difficulty 是必填项' });
    }
    const details = await exerciseAIService.generateExerciseDetails(
      { name, category, equipment, difficulty },
      targetMuscles
    );
    res.json(details);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Validation schemas
const variantRelationSchema = z.object({
  variantId: z.number().min(1, '请选择变体动作'),
  variantType: z.enum(['equipment', 'difficulty', 'posture']),
  differenceNotes: z.string().optional(),
});

const updateVariantSchema = z.object({
  variantType: z.enum(['equipment', 'difficulty', 'posture']).optional(),
  differenceNotes: z.string().optional(),
});

// GET /api/admin/exercises/:id/variants - 获取某动作的所有变体关系
router.get('/:id/variants', async (req: Request, res: Response) => {
  try {
    const exerciseId = parseInt(String(req.params.id));
    const result = await exerciseVariantRepository.findByExerciseId(exerciseId);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/exercises/:id/variants - 添加变体关系
router.post('/:id/variants', async (req: Request, res: Response) => {
  try {
    const validationResult = variantRelationSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ error: 'Invalid data', details: validationResult.error.errors });
    }
    const exerciseId = parseInt(String(req.params.id));
    const variant = await exerciseVariantRepository.create({
      exerciseId,
      ...validationResult.data,
    });
    res.json(variant);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/admin/exercises/variants/:id - 编辑变体关系 (:id = ExerciseVariant.id)
router.put('/variants/:id', async (req: Request, res: Response) => {
  try {
    const validationResult = updateVariantSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ error: 'Invalid data', details: validationResult.error.errors });
    }
    const variant = await exerciseVariantRepository.update(
      parseInt(String(req.params.id)),
      validationResult.data
    );
    res.json(variant);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/admin/exercises/variants/:id - 删除变体关系
router.delete('/variants/:id', async (req: Request, res: Response) => {
  try {
    await exerciseVariantRepository.delete(parseInt(String(req.params.id)));
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;