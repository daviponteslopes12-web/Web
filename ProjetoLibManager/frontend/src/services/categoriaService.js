import { api } from '../api/api.js';

export async function listarCategorias() {
    const resposta = await api.get('/categoria');
    return resposta.data;
}

export async function cadastrarCategoria(dados) {
    const resposta = await api.post('/categoria', dados);
    return resposta.data;
}

export async function atualizarCategoria(id, dados) {
    const resposta = await api.patch(`/categoria/${id}`, dados);
    return resposta.data;
}

export async function deletarCategoria(id) {
    const resposta = await api.delete(`/categoria/${id}`);
    return resposta.data;
}