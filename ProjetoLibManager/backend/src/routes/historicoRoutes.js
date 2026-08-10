import { historicoController } from "../controllers/historicoController.js";
import { Router } from 'express';
import { autenticar } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', autenticar, historicoController.listar);

export default router;