import { emprestimoRepository } from "../repositories/emprestimoRepository.js";
import { livroRepository } from "../repositories/livroRepository.js";
import { criarErro } from '../utils/criarErro.js';

export const livroService = {

    async cadastrar(titulo, autor, anoPublicacao, quantidadeTotal, categoriaId) {

        const quantidadeDisponivel = quantidadeTotal;

        const id = await livroRepository.cadastrar(titulo, autor, anoPublicacao, quantidadeTotal, quantidadeDisponivel, categoriaId);

        return { id, titulo, autor }
    },

    async listar() {

        const livros = await livroRepository.listar();

        return livros;

    },

    async deletar(id) {

        const emprestimosAtivos = await emprestimoRepository.buscarPorLivro(id);

        if (emprestimosAtivos.length > 0) {
            throw criarErro(409, 'Não é possível deletar. Este livro possui um empréstimo ativo.');
        }

        await emprestimoRepository.deletarPorLivro(id);
        const resposta = await livroRepository.deletar(id);

        if (resposta === 0) {
            throw criarErro(404, 'Livro não encontrado.');
        }

        return { mensagem: 'Livro deletado com sucesso.' };
    }


}