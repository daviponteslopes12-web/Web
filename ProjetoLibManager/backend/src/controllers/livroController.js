import { livroService } from "../services/livroService.js";

export const livroController = {

    async cadastrar(req, res) {

        try {

            const { titulo, autor, anoPublicacao, quantidadeTotal, categoriaId } = req.body;

            const resultado = await livroService.cadastrar(titulo, autor, anoPublicacao, quantidadeTotal, categoriaId);

            return res.status(201).json({
                mensagem: 'Livro cadastrado com sucesso.',
                livro: resultado
            });

        } catch (error) {
           console.error(error);
            return res.status(error.status || 500).json({ 
                mensagem: error.status ? error.message : 'Erro interno do servidor. Volte mais tarde!' });
        }

    },

    async listar(req, res) {

        try {

            const resultado = await livroService.listar();

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

            const resultado = await livroService.deletar(id);

            return res.status(200).json(resultado);

        } catch (error) {
            console.error(error);
            return res.status(error.status || 500).json({ 
                mensagem: error.status ? error.message : 'Erro interno do servidor. Volte mais tarde!' });
        }
    }
}