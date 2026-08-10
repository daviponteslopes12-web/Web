import { bibliotecarioService } from "../services/bibliotecarioService.js";

export const bibliotecarioController = {

    // Cadastrar bibliotecário
    async cadastrar(req, res) {

        try {
            const { nome, email, senha } = req.body;


            const resultado = await bibliotecarioService.cadastrar(nome, email, senha);

            return res.status(201).json({ mensagem: 'Bibliotecário cadastrado com sucesso.', bibliotecario: resultado });

        } catch (error) {
            console.error(error);
            return res.status(error.status || 500).json({ 
                mensagem: error.status ? error.message : 'Erro interno do servidor. Volte mais tarde!' });
        }
    },


    // Atualizar email, nome do bibliotecário
    async atualizarDados(req, res) {

        try {
            const id = req.usuario.id;
            const { nome, email } = req.body;

            const resultado = await bibliotecarioService.atualizarDados(id, { nome, email });

            return res.status(200).json(resultado);

        } catch (error) {
            console.error(error);
            return res.status(error.status || 500).json({ 
                mensagem: error.status ? error.message : 'Erro interno do servidor. Volte mais tarde!' });
        }
    },


    // Atualizar senha do bibliotecário
    async atualizarSenha(req, res) {

        try {

            const id = req.usuario.id;
            const { senhaAtual, senhaNova, senhaConfirmar } = req.body;

            const resultado = await bibliotecarioService.atualizarSenha(id, senhaAtual, senhaNova);

            return res.status(200).json(resultado);

        } catch (error) {
            console.error(error);
            return res.status(error.status || 500).json({ 
                mensagem: error.status ? error.message : 'Erro interno do servidor. Volte mais tarde!' });
        }
    },


    // Deletar bibliotecário
    async deletar(req, res) {

        try {
            const id = req.usuario.id;

            const resultado = await bibliotecarioService.deletar(id);

            return res.status(200).json(resultado);

        } catch (error) {
            console.error(error);
            return res.status(error.status || 500).json({ 
                mensagem: error.status ? error.message : 'Erro interno do servidor. Volte mais tarde!' });
        }
    }
}