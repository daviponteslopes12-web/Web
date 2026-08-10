import { Router } from 'express';
import { configuracaoController } from '../controllers/configuracaoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { atualizarNomeEmailSchema, atualizarSenhaSchema, deletarContaSchema } from '../schemas/configuracaoSchema.js';

const router = Router();

router.get('/perfil', authMiddleware, configuracaoController.buscarPerfil);
router.put('/nome-email', authMiddleware, validate(atualizarNomeEmailSchema), configuracaoController.atualizarNomeEmail);
router.put('/senha', authMiddleware, validate(atualizarSenhaSchema), configuracaoController.atualizarSenha);
router.delete('/conta', authMiddleware, validate(deletarContaSchema), configuracaoController.deletarConta);

export default router;