import { Router } from 'express';
import { heroiController } from '../controllers/heroiController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { criarHeroiSchema } from '../schemas/heroiSchema.js';

const router = Router();

router.get('/meus', authMiddleware, heroiController.listarDoUsuario);
router.post('/sortear', authMiddleware, heroiController.sortear);
router.post('/criar', authMiddleware, validate(criarHeroiSchema), heroiController.criar);
router.get('/todos', authMiddleware, heroiController.listarTodos);

export default router;