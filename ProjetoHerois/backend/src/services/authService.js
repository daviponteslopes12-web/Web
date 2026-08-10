import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { usuarioRepository } from '../repositories/usuarioRepository.js';
import { criarErro } from '../utils/criarErro.js';

export const authService = {

    gerarToken(usuario) {
        return jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
    },

    async cadastrar({ nome, email, senha }) {
        const usuarioExiste = await usuarioRepository.buscarPorEmail(email);

        if (usuarioExiste) {
            throw criarErro(409, 'Email já cadastrado');
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuarioId = await usuarioRepository.criarUsuario({ nome, email, senhaHash });

        const usuario = { id: usuarioId, nome, email };
        const token = this.gerarToken(usuario);

        return {
            token,
            usuario: {
                id: usuarioId,
                nome,
                email,
                moedas: 0,
                xp: 0,
                nivel: 1,
                caixa_atual: 'madeira'
            }
        };
    },

    async login({ email, senha }) {
        const usuario = await usuarioRepository.buscarPorEmail(email);

        if (!usuario) {
            throw criarErro(404, 'Usuário não encontrado.');
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            throw criarErro(400, 'Email ou senha inválidos.');
        }

        const token = this.gerarToken(usuario);

        return {
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                moedas: usuario.moedas,
                xp: usuario.xp,
                nivel: usuario.nivel,
                caixa_atual: usuario.caixa_atual
            }
        };
    },

    async atualizarNome(usuarioId, nome) {
        await usuarioRepository.atualizarNome(usuarioId, nome);

        // Easter egg
        if (nome === 'MARLOS') {
            await usuarioRepository.atualizarCaixa(usuarioId, 'dev');
            return { nome, caixa_atual: 'dev', easterEgg: true };
        }

        // Se mudar o nome para outra coisa, volta para madeira
        const usuario = await usuarioRepository.buscarPorId(usuarioId);
        if (usuario.caixa_atual === 'dev' && nome !== 'dev') {
            await usuarioRepository.atualizarCaixa(usuarioId, 'madeira');
        }

        return { nome, caixa_atual: usuario.caixa_atual, easterEgg: false };
    }
};