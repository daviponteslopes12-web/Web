import { emprestimoService } from "../services/emprestimoService.js";

export const emprestimoController = {

    async cadastrar(req, res) {

        try {

            const { livroId, usuarioId } = req.body;

            const resultado = await emprestimoService.cadastrar(livroId, usuarioId);

            return res.status(201).json({ mensagem: 'Empréstimo cadastrado com sucesso', emprestimo: resultado });


        } catch (error) {
            console.error(error);
            return res.status(error.status || 500).json({ 
                mensagem: error.status ? error.message : 'Erro interno do servidor. Volte mais tarde!' });
        }
    },

    async listar(req, res) {

        try {

            // query para quando é um filtro opcional
            const { status } = req.query;

            const resultado = await emprestimoService.listar(status);

            return res.status(200).json(resultado);

        } catch (error) {
            console.error(error);
            return res.status(error.status || 500).json({ 
                mensagem: error.status ? error.message : 'Erro interno do servidor. Volte mais tarde!' });
        }
    },

    async devolver(req, res) {

        try {

            const { id } = req.params;

            const resultado = await emprestimoService.devolver(id);

            return res.status(200).json(resultado);

        } catch (error) {
           console.error(error);
            return res.status(error.status || 500).json({ 
                mensagem: error.status ? error.message : 'Erro interno do servidor. Volte mais tarde!' });
        }
    }
}