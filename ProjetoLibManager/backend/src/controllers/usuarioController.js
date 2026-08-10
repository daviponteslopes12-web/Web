import { usuarioService } from "../services/usuarioService.js";

export const usuarioController = {

    async cadastrar(req, res) {

        try {

            const { nome, email, telefone } = req.body;

            const resultado = await usuarioService.cadastrar(nome, email, telefone);

            return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.' });

        } catch (error) {
          console.error(error);
            return res.status(error.status || 500).json({ 
                mensagem: error.status ? error.message : 'Erro interno do servidor. Volte mais tarde!' });
        }
    },

    async listar(req, res) {

        try {

            const resultado = await usuarioService.listar();

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

            const resultado = await usuarioService.deletar(id);

            return res.status(200).json({ mensagem: 'Usuário deletado com sucesso' });

        } catch (error) {
           console.error(error);
            return res.status(error.status || 500).json({ 
                mensagem: error.status ? error.message : 'Erro interno do servidor. Volte mais tarde!' });
        }
    }
}