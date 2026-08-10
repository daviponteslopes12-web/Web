import { categoriaRepository } from "../repositories/categoriaRepository.js";
import { criarErro } from '../utils/criarErro.js';

export const categoriaService = {

    async cadastrar(nome) {

        const nomeExiste = await categoriaRepository.buscarPorNome(nome);

        if (nomeExiste) {
            throw criarErro(409, 'Categoria já cadastrada.');
        }

        const id = await categoriaRepository.cadastrar(nome);

        return { id, nome };


    },

    async listar() {

        const categorias = await categoriaRepository.listar();

        return categorias;
    },

    async atualizar(id, nome) {

        const nomeExistente = await categoriaRepository.buscarPorNome(nome);

        if (nomeExistente && nomeExistente.id !== id) {
            throw criarErro(409, 'Já existe uma categoria com esse nome.');
        }

        const linhasAfetadas = await categoriaRepository.atualizar(id, nome);

        if (linhasAfetadas === 0) {
            throw criarErro(404, 'Categoria não encontrada.');
        }

        return { mensagem: 'Categoria atualizada com sucesso.' }
    },

    async deletar(id) {

        const linhasAfetadas = await categoriaRepository.deletar(id);

        if (linhasAfetadas === 0) {
            throw criarErro(404, 'Categoria não encontrada.');
        }
        
        return { mensagem: 'Categoria deletada com sucesso.' }
    }
}