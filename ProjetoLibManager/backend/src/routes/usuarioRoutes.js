import { Router } from 'express';
import { schemaCadastrar } from '../schemas/usuarioSchema.js';
import { usuarioController } from '../controllers/usuarioController.js';
import { autenticar } from '../middlewares/authMiddleware.js';
import { validar } from '../middlewares/validateMiddleware.js';

const router = Router();

router.post('/', autenticar, validar(schemaCadastrar), usuarioController.cadastrar);
router.get('/', autenticar, usuarioController.listar);
router.delete('/:id', autenticar, usuarioController.deletar);

export default router;