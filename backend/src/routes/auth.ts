import { Router } from 'express';
import { authService } from '../services/authService';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const result = await authService.register(email, password);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const result = await authService.login(email, password);
    res.json(result);
  } catch (err) {
    if (err.message === 'Invalid credentials') {
      res.status(401).json({ error: '密码错误' });
    } else {
      res.status(401).json({ error: err.message });
    }
  }
});

export default router;