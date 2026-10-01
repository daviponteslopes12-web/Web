import { listarTarefas } from "../services/tarefaService.js";
import { Request, Response } from "express";

export async function listar(req: Request, res: Response) {
    try {
        const tarefas = await listarTarefas();

        res.json(tarefas);

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            error: "Erro ao buscar tarefas"
        });
    }
}