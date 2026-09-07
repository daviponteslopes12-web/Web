import { Router } from "express";
import { TarefaController } from "../controller/tarefaController.js";

const tarefaController = new TarefaController();
const routes = Router();


routes.get("/", tarefaController.buscarTodasTarefas);
routes.post("/", tarefaController.criarTarefa);
routes.patch("/:id/status", tarefaController.atualizarStatus);
routes.patch("/:id", tarefaController.atualizarInformacoes);
routes.delete("/:id", tarefaController.deletarTarefa);


export default routes;