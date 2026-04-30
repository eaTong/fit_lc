import { Router } from 'express';
import { albumService } from '../services/albumService';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/photos', authMiddleware, async (req, res) => {
  const { year, month } = req.query;
  const photos = await albumService.getPhotosByMonth(
    req.user!.id,
    Number(year),
    Number(month)
  );
  res.json({ success: true, data: photos });
});

router.delete('/photos/:id', authMiddleware, async (req, res) => {
  try {
    await albumService.deletePhoto(Number(req.params.id), req.user!.id);
    res.json({ success: true });
  } catch (e) {
    res.status(404).json({ success: false, error: 'Not found' });
  }
});

export default router;