import { lojaService } from '../services/lojaService.js';

export const lojaController = {

    async listarLoja(req, res) {
        try {
            const resultado = await lojaService.listarLoja(req.usuario.id);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(error.status || 500)
                .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    },

    async comprarItem(req, res) {
        try {
            const { item_id } = req.body;
            const resultado = await lojaService.comprarItem(req.usuario.id, item_id);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(error.status || 500)
                .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    },

    async comprarHeroiLoja(req, res) {
        try {
            const { loja_id } = req.body;
            const resultado = await lojaService.comprarHeroiLoja(req.usuario.id, loja_id);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(error.status || 500)
                .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    }
};