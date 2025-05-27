// src/routes/report.routes.ts
import { Router } from 'express';
import { requireAuth, requireRole } from '../../middleware';
import { ReportController } from '../controllers';

const router = Router();
const controller = new ReportController();

router.use(requireAuth);

router.get('/', requireRole('admin'), controller.getAdminReport);
router.get('/report-time', controller.getTime);

export default router;
