import { Router } from 'express';
import { bibliotecarioController } from '../controllers/bibliotecarioController.js';
import { validar } from '../middlewares/validateMiddleware.js';
import { autenticar } from '../middlewares/authMiddleware.js';
import { schemaCadastro, schemaAtualizarDados, schemaAtualizarSenha } from '../schemas/bibliotecarioSchema.js';

const router = Router();

router.post('/', validar(schemaCadastro), bibliotecarioController.cadastrar);
router.patch('/dados/', autenticar, validar(schemaAtualizarDados), bibliotecarioController.atualizarDados);
router.patch('/senha/', autenticar, validar(schemaAtualizarSenha), bibliotecarioController.atualizarSenha);
router.delete('/', autenticar, bibliotecarioController.deletar);

export default router;