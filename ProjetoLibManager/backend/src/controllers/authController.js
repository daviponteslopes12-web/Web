import { authService } from "../services/authService.js";

export const authController = {

    async login(req, res) {

        try {
            const { email, senha } = req.body;

            const resultado = await authService.login(email, senha);

            return res.status(200).json({
                mensagem: 'Login realizado com sucesso.',
                token: resultado.token,
                bibliotecario: resultado.bibliotecario
            });

        } catch (error) {
            console.error(error);
            return res.status(error.status || 500).json({ 
                mensagem: error.status ? error.message : 'Erro interno do servidor. Volte mais tarde!' });
        }
    }
    
}
