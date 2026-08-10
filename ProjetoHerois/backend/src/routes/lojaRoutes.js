import { Router } from 'express';
import { lojaController } from '../controllers/lojaController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { comprarItemSchema, comprarHeroiLojaSchema } from '../schemas/lojaSchema.js';

const router = Router();

router.get('/', authMiddleware, lojaController.listarLoja);
router.post('/comprar-item', authMiddleware, validate(comprarItemSchema), lojaController.comprarItem);
router.post('/comprar-heroi', authMiddleware, validate(comprarHeroiLojaSchema), lojaController.comprarHeroiLoja);

export default router;