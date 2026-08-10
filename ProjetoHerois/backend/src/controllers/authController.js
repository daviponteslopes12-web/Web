import { authService } from "../services/authService.js";

export const authController = {

    async cadastrar(req, res) {
        try {
            const resultado = await authService.cadastrar(req.body);
            return res.status(201).json(resultado);
        } catch (error) {
            return res.status(error.status || 500)
            .json({ mensagem: error.message || 'Erro interno do servidor' });
        }
    },

    async login(req, res) {
        try {

            const resultado = await authService.login(req.body);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(error.status || 500)
            .json({ mensagem: error.message || 'Erro interno do servidor' }); 
        }
    }
}