import { Router } from "express";
import { listarProdutos } from "../controller/produto.controller.js";

const router = Router();

router.get("/", listarProdutos);

export default router;