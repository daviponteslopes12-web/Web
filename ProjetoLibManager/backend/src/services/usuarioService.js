import { emprestimoRepository } from "../repositories/emprestimoRepository.js";
import { usuarioRepository } from "../repositories/usuarioRepository.js";
import { criarErro } from '../utils/criarErro.js';

export const usuarioService = {

    async cadastrar(nome, email, telefone) {

        const usuarioExiste = await usuarioRepository.buscarPorEmail(email);

        if (usuarioExiste) {
            throw criarErro(409, 'Este usuário já está cadastrado.');
        }

        const id = await usuarioRepository.cadastrar(nome, email, telefone);

        return { id, nome, email };
    },

    async listar() {

        const resultado = await usuarioRepository.listar();

        return resultado;
    },

    async deletar(id) {

        const emprestimosAtivos = await emprestimoRepository.buscarPorUsuario(id);

        if (emprestimosAtivos.length > 0) {
            throw criarErro(409, 'Não é possível deletar. Este usuário possui empréstimo ativo.');
        }

        await emprestimoRepository.deletarPorUsuario(id);
        const resposta = await usuarioRepository.deletar(id);

        if (resposta === 0) {
            throw criarErro(404, 'Usuário não encontrado');
        }

        return { mensagem: 'Usuário deletado com sucesso.' };
    },
}