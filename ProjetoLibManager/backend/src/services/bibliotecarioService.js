import bcrypt from 'bcrypt';
import { bibliotecarioRepository } from "../repositories/bibliotecarioRepository.js";
import { criarErro } from '../utils/criarErro.js';

export const bibliotecarioService = {

    // Cadastrar bibliotecário
    async cadastrar(nome, email, senha) {

        const emailExiste = await bibliotecarioRepository.buscarPorEmail(email);

        if (emailExiste) {
            throw criarErro(409, 'Email já cadastrado.');
        }

        const senhaHash = await bcrypt.hash(senha, 10);
        const id = await bibliotecarioRepository.cadastrar(nome, email, senhaHash);

        return { id, nome, email };
    },
    

    // Deletar bibliotecário
    async deletar(id) {

        const resposta = await bibliotecarioRepository.deletar(id);

        if (resposta === 0) {
            throw criarErro(404, 'Bibliotecario não encontrado.');
        }

        return { mensagem: 'Bibliotecário deletado com sucesso.' };
    },


    // Atualizar email, nome do bibliotecário
    async atualizarDados(id, dados) {

        if (dados.email) {
            const emailExistente = await bibliotecarioRepository.buscarPorEmail(dados.email);

            if (emailExistente && emailExistente.id !== id) {
                throw criarErro(409, 'Email já cadastrado.');
            }
        }

        const resposta = await bibliotecarioRepository.atualizarDados(id, dados);

        if (!resposta) {
            throw criarErro(400, 'Nenhum dado para atualizar.');
        }

        return { mensagem: 'Dados atualizados com sucesso.' };
    },


    // Atualizar senha do bibliotecário
    async atualizarSenha(id, senhaAtual, senhaNova) {

        const bibliotecario = await bibliotecarioRepository.buscarSenhaPorId(id);

        if (!bibliotecario) {
            throw criarErro(400, 'Bibliotecário não encontrado.');
        }

        const senhaValida = await bcrypt.compare(senhaAtual, bibliotecario.senha);

        if (!senhaValida) {
            throw criarErro(400, 'Senha atual incorreta.');
        }

        const novaSenhaHash = await bcrypt.hash(senhaNova, 10);

        await bibliotecarioRepository.atualizarSenha(id, novaSenhaHash);

        return { mensagem: 'Senha atualizada com sucesso.' };
    }
}
