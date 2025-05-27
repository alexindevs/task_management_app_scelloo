import { Router } from 'express';
import authRoutes from './auth.routes';
import taskRoutes from './task.routes'
import reportRoutes from './report.routes'

const router = Router();

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes)
router.use('reports', reportRoutes)

export default router;
