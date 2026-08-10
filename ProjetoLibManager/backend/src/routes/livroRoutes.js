import { Router } from 'express';
import { livroController } from '../controllers/livroController.js';
import { schemaCadastrar } from '../schemas/livroSchemas.js';
import { autenticar } from '../middlewares/authMiddleware.js';
import { validar } from '../middlewares/validateMiddleware.js';


const router = Router();

router.post('/', autenticar, validar(schemaCadastrar), livroController.cadastrar);
router.get('/', autenticar, livroController.listar);
router.delete('/:id', autenticar, livroController.deletar);

export default router;