import { Router } from 'express';
import { emprestimoController } from '../controllers/emprestimoController.js';
import { autenticar } from '../middlewares/authMiddleware.js';
import { validar } from '../middlewares/validateMiddleware.js';
import { schemaCadastrar } from '../schemas/emprestimoSchema.js';

const router = Router();

router.post('/', autenticar, validar(schemaCadastrar), emprestimoController.cadastrar);
router.get('/', autenticar, emprestimoController.listar);
router.patch('/:id/devolver', autenticar, emprestimoController.devolver);

export default router;