import { Router } from "express";
import { listar } from "../controllers/tarefaController.js"

const router = Router();

router.get("/", listar);

export default router;