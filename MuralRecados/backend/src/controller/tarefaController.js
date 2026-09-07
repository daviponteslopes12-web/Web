import { TarefaService } from "../service/tarefaService.js";

const tarefaService = new TarefaService();

export class TarefaController {

    async criarTarefa(req, res, next) {
        try {

            const { titulo, descricao, status } = req.body;

            await tarefaService.criarTarefa(titulo, descricao, status);

            return res.status(201).json({ mensagem: "Tarefa criada com sucesso" });

        }  catch (erro) {
            next(erro);
        }

    }


    async buscarTodasTarefas(req, res, next) {
        try {

            const resultado = await tarefaService.buscarTodasTarefas();

            return res.status(200).json({ mensagem: "Tarefas buscados com sucesso", resultado });
        }  catch (erro) {
            next(erro);
        }

    }

    async deletarTarefa(req, res, next) {
        try {

            const { id } = req.params;

            const resultado = await tarefaService.deletarTarefa(id);

            return res.status(200).json({ mensagem: "Tarefa deletada com sucesso" });
        }  catch (erro) {
            next(erro);
        }

    }

    async atualizarInformacoes(req, res, next) {
        try {

            const { id } = req.params;
            const { titulo, descricao } = req.body;

            const resultado = await tarefaService.atualizarInformacoes(id, titulo, descricao);

            return res.status(200).json({ mensagem: "Tarefa atualizada com sucesso" });

        }  catch (erro) {
            next(erro);
        }

    }

    async atualizarStatus(req, res, next) {
        try {

            const { id } = req.params;
            const { status } = req.body;

            const resultado = await tarefaService.atualizarStatus(id, status);

            return res.status(200).json({ mensagem: "Status atualizado com sucesso" });
        }  catch (erro) {
            next(erro);
        }

    }
}