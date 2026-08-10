import { Router } from 'express';
import { guildaController } from '../controllers/guildaController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { criarGuildaSchema, adicionarHeroiSchema } from '../schemas/guildaSchema.js';

const router = Router();

router.get('/minhas', authMiddleware, guildaController.listarDoUsuario);
router.post('/criar', authMiddleware, validate(criarGuildaSchema), guildaController.criar);
router.post('/:id/heroi', authMiddleware, validate(adicionarHeroiSchema), guildaController.adicionarHeroi);
router.delete('/:id/heroi/:heroiId', authMiddleware, guildaController.removerHeroi);
router.delete('/:id', authMiddleware, guildaController.deletar);

export default router;