import { configuracaoService } from '../services/configuracaoService.js';

export const configuracaoController = {

    async buscarPerfil(req, res) {
        try {
            const resultado = await configuracaoService.buscarPerfil(req.usuario.id);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(error.status || 500)
                .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    },

    async atualizarNomeEmail(req, res) {
        try {
            const resultado = await configuracaoService.atualizarNomeEmail(req.usuario.id, req.body);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(error.status || 500)
                .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    },

    async atualizarSenha(req, res) {
        try {
            const resultado = await configuracaoService.atualizarSenha(req.usuario.id, req.body);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(error.status || 500)
                .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    },

    async deletarConta(req, res) {
        try {
            const resultado = await configuracaoService.deletarConta(req.usuario.id, req.body);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(error.status || 500)
                .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    }
};