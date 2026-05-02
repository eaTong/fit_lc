import { Router } from 'express';
import { muscleRepository } from '../repositories/muscleRepository';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /muscles:
 *   get:
 *     summary: 获取肌肉列表
 *     tags: [肌肉]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 肌肉列表
 */
router.get('/', async (req, res) => {
  try {
    const hierarchy = await muscleRepository.getHierarchy();
    res.json({ hierarchy });
  } catch (err) {
    console.error('Get muscle hierarchy error:', err);
    res.status(500).json({ error: 'Failed to get muscle hierarchy' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const muscle = await muscleRepository.findById(parseInt(req.params.id));
    if (!muscle) return res.status(404).json({ error: 'Muscle not found' });
    res.json({ muscle });
  } catch (err) {
    console.error('Get muscle error:', err);
    res.status(500).json({ error: 'Failed to get muscle' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, group, parentId, sortOrder } = req.body;
    if (!name || !group) {
      return res.status(400).json({ error: 'Name and group are required' });
    }
    const muscle = await muscleRepository.create({ name, group, parentId, sortOrder });
    res.json({ muscle });
  } catch (err) {
    console.error('Create muscle error:', err);
    res.status(500).json({ error: 'Failed to create muscle' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, sortOrder } = req.body;
    const muscle = await muscleRepository.update(parseInt(req.params.id), { name, sortOrder });
    if (!muscle) return res.status(404).json({ error: 'Muscle not found' });
    res.json({ muscle });
  } catch (err) {
    console.error('Update muscle error:', err);
    res.status(500).json({ error: 'Failed to update muscle' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await muscleRepository.delete(parseInt(req.params.id));
    res.json({ success: true });
  } catch (err) {
    console.error('Delete muscle error:', err);
    res.status(500).json({ error: 'Failed to delete muscle' });
  }
});

export default router;