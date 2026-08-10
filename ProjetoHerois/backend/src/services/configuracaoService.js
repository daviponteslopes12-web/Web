import bcrypt from 'bcrypt';
import { usuarioRepository } from '../repositories/usuarioRepository.js';
import { criarErro } from '../utils/criarErro.js';

export const configuracaoService = {

    // Buscar dados do recrutador
    async buscarPerfil(usuarioId) {
        const usuario = await usuarioRepository.buscarPorId(usuarioId);

        if (!usuario) {
            throw criarErro(404, 'Recrutador não encontrado.');
        }

        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            moedas: usuario.moedas,
            xp: usuario.xp,
            nivel: usuario.nivel,
            caixa_atual: usuario.caixa_atual,
            criado_em: usuario.criado_em
        };
    },

    // Atualizar nome e email
    async atualizarNomeEmail(usuarioId, { nome, email }) {
        const usuario = await usuarioRepository.buscarPorId(usuarioId);

        if (!usuario) {
            throw criarErro(404, 'Recrutador não encontrado.');
        }

        // Verificar se o email já está em uso por outro
        if (email !== usuario.email) {
            const emailExiste = await usuarioRepository.buscarPorEmail(email);
            if (emailExiste) {
                throw criarErro(409, 'Email já está em uso.');
            }
        }

        await usuarioRepository.atualizarNomeEmail(usuarioId, nome, email);

        // Easter egg
        let caixaAtual = usuario.caixa_atual;

        if (nome === 'MARLOS') {
            caixaAtual = 'dev';
            await usuarioRepository.atualizarCaixa(usuarioId, 'dev');
        } else if (usuario.caixa_atual === 'dev' && nome !== 'MARLOS') {
            caixaAtual = 'madeira';
            await usuarioRepository.atualizarCaixa(usuarioId, 'madeira');
        }

        return {
            nome,
            email,
            caixa_atual: caixaAtual,
            easterEgg: nome === 'MARLOS'
        };
    },

    // Atualizar senha
    async atualizarSenha(usuarioId, { senhaAtual, novaSenha }) {
        const usuario = await usuarioRepository.buscarPorId(usuarioId);

        if (!usuario) {
            throw criarErro(404, 'Recrutador não encontrado.');
        }

        const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);

        if (!senhaValida) {
            throw criarErro(400, 'Senha atual incorreta.');
        }

        const novaSenhaHash = await bcrypt.hash(novaSenha, 10);

        await usuarioRepository.atualizarSenha(usuarioId, novaSenhaHash);

        return { mensagem: 'Senha atualizada com sucesso.' };
    },

    // Deletar conta
    async deletarConta(usuarioId, { senha }) {
        const usuario = await usuarioRepository.buscarPorId(usuarioId);

        if (!usuario) {
            throw criarErro(404, 'Recrutador não encontrado.');
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            throw criarErro(400, 'Senha incorreta.');
        }

        await usuarioRepository.deletarUsuario(usuarioId);

        return { mensagem: 'Conta deletada com sucesso.' };
    }
};