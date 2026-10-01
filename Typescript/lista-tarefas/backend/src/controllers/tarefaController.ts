import { Request, Response } from "express";
import { 
    listarTarefas, 
    criarTarefa, 
    buscarTarefaPorId,
    deletarTarefa,
    atualizarTarefa
} from "../services/tarefaService.js";

export async function listar(req: Request, res: Response) {
    try {
        const tarefas = await listarTarefas();

        res.json(tarefas);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Erro ao buscar tarefas"
        });
    }
}
export async function criar(req: Request, res: Response) {
    try {
        // TypeScript não valida por que req.body vem de uma requisição HTTP externa
        const { titulo } = req.body;
        
        if (typeof titulo !== "string" || titulo.trim() === "") {
            return res.status(400).json({
                error: "O título é obrigatório"
            });
        }

        const tarefa = await criarTarefa(titulo);

        res.status(201).json(tarefa);

    } catch (error) {
        console.error("[ERRO] - tarefaController:", error);
        
        res.status(500).json({
            error: "Erro ao criar tarefa"
        });
    }
}
export async function buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "ID inválido"
        });
    }

    try {
        const tarefa = await buscarTarefaPorId(id);

        if (tarefa === null) {
            return res.status(404).json({
                error: "Tarefa não encontrada"
            });
        }

        res.status(200).json(tarefa);

    } catch (error) {
        console.error("[ERRO] tarefaController: ", error);

        res.status(500).json({
            error: "Erro ao buscar tarefa por ID"
        });
    }
}
export async function deletar(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "ID inválido"
        });
    }

    try {
        const deletou = await deletarTarefa(id);

        if (!deletou) {
            return res.status(404).json({
                error: "Tarefa não encontrada"
            });
        }

        res.status(200).json(deletou);

    } catch (error) {
        console.error("[ERRO] - tarefaController", error);

        res.status(500).json({
            error: "Erro ao deletar tarefa"
        });
    }
}
export async function atualizar(req: Request, res: Response) {
    const { titulo, concluida } = req.body;
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "ID inválido"
        });
    }

    if (typeof titulo !== "string" || titulo.trim() === "") {
        return res.status(400).json({
            error: "Título inválido"
        });
    }

    if (typeof concluida !== "boolean") {
        return res.status(400).json({
            error: "Campo 'concluida' inválido"
        })
    }

    try {
        const atualizou = await atualizarTarefa(titulo, concluida, id);

        if (!atualizou) {
            return res.status(404).json({
                error: "Tarefa não encontrada"
            });
        }

        return res.status(200).json(atualizou);

    } catch (error) {
        console.error("[ERRO] - tarefaController:", error);

        res.status(500).json({
            error: "Erro ao atualizar a tarefa"
        });
    }
}