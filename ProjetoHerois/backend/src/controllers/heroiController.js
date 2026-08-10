import { heroiService } from '../services/heroiService.js';

export const heroiController = {

    async listarDoUsuario(req, res) {
        try {
            const herois = await heroiService.listarDoUsuario(req.usuario.id);
            return res.status(200).json(herois);
        } catch (error) {
            return res.status(error.status || 500)
                .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    },

    async sortear(req, res) {
        try {
            const resultado = await heroiService.sortear(req.usuario.id);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(error.status || 500)
                .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    },

    async criar(req, res) {
        try {
            const resultado = await heroiService.criar(req.usuario.id, req.body);
            return res.status(201).json(resultado);
        } catch (error) {
            return res.status(error.status || 500)
                .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    },

    async listarTodos(req, res) {
        try {
            const pagina = parseInt(req.query.pagina) || 1;
            const limite = parseInt(req.query.limite) || 20;
            const resultado = await heroiService.listarTodos(pagina, limite);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(error.status || 500)
                .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    }
};