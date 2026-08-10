import { api } from '../api/api.js';

export async function listarLivros() {
    const resposta = await api.get('/livro');
    return resposta.data;
}

export async function cadastrarLivro(dados) {
    const resposta = await api.post('/livro', dados);
    return resposta.data;
}

export async function deletarLivro(id) {
    const resposta = await api.delete(`/livro/${id}`);
    return resposta.data;
}