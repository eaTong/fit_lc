import { Router } from 'express';
import { exerciseRepository } from '../repositories/exerciseRepository';
import { muscleRepository } from '../repositories/muscleRepository';
import { authMiddleware } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const { category, equipment, difficulty, status } = req.query;
    const exercises = await exerciseRepository.findAll({
      category: category as string,
      equipment: equipment as string,
      difficulty: difficulty as string,
      status: status as string,
    });
    res.json({ exercises });
  } catch (err) {
    console.error('Get exercises error:', err);
    res.status(500).json({ error: 'Failed to get exercises' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const exercise = await exerciseRepository.findById(parseInt(req.params.id));
    if (!exercise) return res.status(404).json({ error: 'Exercise not found' });
    res.json({ exercise });
  } catch (err) {
    console.error('Get exercise error:', err);
    res.status(500).json({ error: 'Failed to get exercise' });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      name,
      category,
      equipment,
      difficulty,
      description,
      adjustmentNotes,
      videoUrl,
      isVariant,
      parentId,
      tags,
      status,
      muscles,
    } = req.body;

    if (!name || !category || !equipment || !difficulty) {
      return res.status(400).json({ error: 'Name, category, equipment, difficulty are required' });
    }

    // Use transaction to ensure atomicity: create exercise + associate muscles
    const exercise = await prisma.$transaction(async (tx) => {
      const newExercise = await tx.exercise.create({
        data: {
          name,
          category,
          equipment,
          difficulty,
          description,
          adjustmentNotes,
          videoUrl,
          isVariant,
          parentId,
          tags: tags ? JSON.stringify(tags) : null,
          status,
        },
      });

      if (muscles && Array.isArray(muscles) && muscles.length > 0) {
        for (const m of muscles) {
          await tx.exerciseMuscle.create({
            data: {
              exerciseId: newExercise.id,
              muscleId: m.muscleId,
              role: m.role,
            },
          });
        }
      }

      return newExercise;
    });

    const result = await exerciseRepository.findById(exercise.id);
    res.json({ exercise: result });
  } catch (err) {
    console.error('Create exercise error:', err);
    res.status(500).json({ error: 'Failed to create exercise' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      category,
      equipment,
      difficulty,
      description,
      adjustmentNotes,
      videoUrl,
      tags,
      status,
      muscles,
    } = req.body;

    // Use transaction to ensure atomicity: update exercise + update muscles
    const exercise = await prisma.$transaction(async (tx) => {
      const updated = await tx.exercise.update({
        where: { id: parseInt(id) },
        data: {
          name,
          category,
          equipment,
          difficulty,
          description,
          adjustmentNotes,
          videoUrl,
          tags: tags ? JSON.stringify(tags) : null,
          status,
        },
      });

      if (muscles && Array.isArray(muscles)) {
        // Delete existing and recreate
        await tx.exerciseMuscle.deleteMany({ where: { exerciseId: parseInt(id) } });
        for (const m of muscles) {
          await tx.exerciseMuscle.create({
            data: {
              exerciseId: parseInt(id),
              muscleId: m.muscleId,
              role: m.role,
            },
          });
        }
      }

      return updated;
    });

    const result = await exerciseRepository.findById(parseInt(id));
    res.json({ exercise: result });
  } catch (err) {
    console.error('Update exercise error:', err);
    res.status(500).json({ error: 'Failed to update exercise' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await exerciseRepository.delete(parseInt(req.params.id));
    res.json({ success: true });
  } catch (err) {
    console.error('Delete exercise error:', err);
    res.status(500).json({ error: 'Failed to delete exercise' });
  }
});

export default router;