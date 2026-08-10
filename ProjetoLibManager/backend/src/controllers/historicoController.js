import { historicoService } from "../services/historicoService.js";

export const historicoController = {

    async listar(req, res) {
        try {

            const resultado = await historicoService.listar();
            return res.status(200).json(resultado);

        } catch (error) {
            console.error(error);
            return res.status(error.status || 500).json({ mensagem: error.status ? error.message : 'Erro interno do Servidor' });
        }
    },
};