import { missaoService } from '../services/missaoService.js';

export const missaoController = {

    async listarMissoes(req, res) {
        try {
            const missoes = await missaoService.listarMissoes(req.usuario.id);
            return res.status(200).json(missoes);
        } catch (error) {
            return res.status(error.status || 500)
                .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    },

    async executarMissao(req, res) {
        try {
            const { id } = req.params;
            const { guilda_id } = req.body;
            const resultado = await missaoService.executarMissao(
                req.usuario.id, parseInt(id), guilda_id
            );
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(error.status || 500)
                .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    }
};