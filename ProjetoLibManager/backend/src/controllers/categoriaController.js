import { categoriaService } from "../services/categoriaService.js";

export const categoriaController = {

    async cadastrar(req, res) {

        try {

            const { nome } = req.body;

            const resultado = await categoriaService.cadastrar(nome);

            return res.status(201).json({ mensagem: 'Categoria cadastrada com sucesso' });

        } catch (error) {
            console.error(error);
            return res.status(error.status || 500).json({ 
                mensagem: error.status ? error.message : 'Erro interno do servidor. Volte mais tarde!' });
        }
    },

    async listar(req, res) {

        try {

            const resultado = await categoriaService.listar();

            return res.status(200).json(resultado);

        } catch (error) {
            console.error(error);
            return res.status(error.status || 500).json({ 
                mensagem: error.status ? error.message : 'Erro interno do servidor. Volte mais tarde!' });
        }
    },

    async atualizar(req, res) {

        try {

            const { id } = req.params;
            const { nome } = req.body;

            const resultado = await categoriaService.atualizar(id, nome);

            return res.status(200).json(resultado);

        } catch (error) {
            console.error(error);
            return res.status(error.status || 500).json({ 
                mensagem: error.status ? error.message : 'Erro interno do servidor. Volte mais tarde!' });
        }
    },

    async deletar(req, res) {

        try {

            const { id } = req.params;

            const resultado = await categoriaService.deletar(id);

            return res.status(200).json({ mensagem: 'Categoria deletada com sucesso' });

        } catch (error) {
            console.error(error);
            return res.status(error.status || 500).json({ 
                mensagem: error.status ? error.message : 'Erro interno do servidor. Volte mais tarde!' });
        }
    }
}