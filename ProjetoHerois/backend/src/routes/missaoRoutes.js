import { Router } from 'express';
import { missaoController } from '../controllers/missaoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { executarMissaoSchema } from '../schemas/missaoSchema.js';

const router = Router();

router.get('/', authMiddleware, missaoController.listarMissoes);
router.post('/:id/executar', authMiddleware, validate(executarMissaoSchema), missaoController.executarMissao);

export default router;