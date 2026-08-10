import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authRepository } from "../repositories/authRepository.js";
import { criarErro } from '../utils/criarErro.js';

export const authService = {

    // Função de login, busca bibliotecario por email
    async login(email, senha) {

        const bibliotecario = await authRepository.buscarPorEmail(email);

        // Se não achar, lança erro
        if (!bibliotecario) {
            
            // Lança erro para ser usado no controller, pode ser usado ou não pelo controller
            throw criarErro(401, 'Email ou senha inválidos.');
        }

        // Se achar bibliotecario, compara a senha com a senha do banco
        const senhaValida = await bcrypt.compare(senha, bibliotecario.senha);

        // Se senha não bater, lança erro
        if (!senhaValida) {
            
            // Mesmo que não seja usada, importante para parar execução
            throw criarErro(401, 'Email ou senha inválidos.')
        }

        // Configura token ao logar
        const token = jwt.sign(
            {id: bibliotecario.id, nome: bibliotecario.nome},
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        // Retorna o token com info. do bibliotecário para o frontend
        return {
            token,
            bibliotecario: {
                id: bibliotecario.id,
                nome: bibliotecario.nome,
                email: bibliotecario.email
            }
        };
    }
}