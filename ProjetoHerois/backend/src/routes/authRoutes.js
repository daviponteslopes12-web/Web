import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { cadastrarSchema, loginSchema } from '../schemas/authSchema.js';

const router = Router();

router.post('/cadastrar', validate(cadastrarSchema), authController.cadastrar);
router.post('/login', validate(loginSchema), authController.login);

export default router;