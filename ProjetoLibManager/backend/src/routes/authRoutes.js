import { Router } from 'express'
import { validar } from '../middlewares/validateMiddleware.js'
import { authController } from "../controllers/authController.js";
import { schemaLogin } from '../schemas/authSchema.js';

const router = Router();

router.post('/login', validar(schemaLogin), authController.login);

export default router;