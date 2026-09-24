import { ProdutoRepository } from '../repository/produto.repository.js';
import type { Produto } from '../interfaces/produto.interface.js';




export const ProdutoService = {

    async listarTodosProdutos(): Promise<Produto[]> {

        const resposta = await ProdutoRepository.listarTodosProdutos();

        return resposta;

    }
};