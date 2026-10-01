import { Router } from "express";
import { 
    listar, 
    criar, 
    buscarPorId,
    deletar,
    atualizar
} from "../controllers/tarefaController.js"

const router = Router();


router.get("/", listar);
router.post("/", criar);

router.get("/:id", buscarPorId);
router.delete("/:id", deletar);
router.put("/:id", atualizar);


export default router;