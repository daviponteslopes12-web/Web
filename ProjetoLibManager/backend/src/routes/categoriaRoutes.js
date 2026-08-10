import { Router } from 'express';
import { categoriaController } from '../controllers/categoriaController.js';
import { autenticar } from '../middlewares/authMiddleware.js';
import { validar } from '../middlewares/validateMiddleware.js';
import { schemaCadastrar, schemaAtualizar } from '../schemas/categoriaSchema.js';

const router = Router();

router.post('/', autenticar, validar(schemaCadastrar), categoriaController.cadastrar);
router.get('/', autenticar, categoriaController.listar);
router.patch('/:id', autenticar, validar(schemaAtualizar), categoriaController.atualizar);
router.delete('/:id', autenticar, categoriaController.deletar);

export default router;