// src/routes/task.routes.ts
import { Router } from 'express';
import { TaskController } from '../controllers';
import { validate } from '../../middleware';
import { requireAuth } from '../../middleware';
import { createTaskSchema, updateTaskSchema } from '../validators';

const router = Router();
const controller = new TaskController();

router.use(requireAuth);

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', validate(createTaskSchema), controller.create);
router.put('/:id', validate(updateTaskSchema), controller.update);
router.delete('/:id', controller.delete);

export default router;
