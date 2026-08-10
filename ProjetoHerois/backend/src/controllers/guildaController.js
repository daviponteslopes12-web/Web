import { guildaService } from '../services/guildaService.js';

export const guildaController = {

    async listarDoUsuario(req, res) {
        try {
            const guildas = await guildaService.listarDoUsuario(req.usuario.id);
            return res.status(200).json(guildas);
        } catch (error) {
            return res.status(error.status || 500)
                .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    },

    async criar(req, res) {
        try {
            const resultado = await guildaService.criar(req.usuario.id, req.body);
            return res.status(201).json(resultado);
        } catch (error) {
            return res.status(error.status || 500)
                .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    },

    async adicionarHeroi(req, res) {
        try {
            const { id } = req.params;
            const { heroi_id } = req.body;
            const resultado = await guildaService.adicionarHeroi(req.usuario.id, parseInt(id), heroi_id);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(error.status || 500)
                .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    },

    async removerHeroi(req, res) {
        try {
            const { id, heroiId } = req.params;
            const resultado = await guildaService.removerHeroi(req.usuario.id, parseInt(id), parseInt(heroiId));
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(error.status || 500)
                .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await guildaService.deletar(req.usuario.id, parseInt(id));
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(error.status || 500)
                .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    }
};