import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../../middleware';
import { registerSchema, loginSchema } from '../validators';

const router = Router();
const controller = new AuthController();

router.post('/register', validate(registerSchema), controller.register);
router.post('/login', validate(loginSchema), controller.login);

export default router;
