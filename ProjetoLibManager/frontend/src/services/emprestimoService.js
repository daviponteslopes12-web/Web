import { api } from '../api/api.js';

export async function listarEmprestimos(status) {

    const params = status ? { status } : {};

    const resposta = await api.get('/emprestimo', { params });
    return resposta.data;
}

export async function cadastrarEmprestimo(dados) {
    const resposta = await api.post('/emprestimo', dados);
    return resposta.data;
}

export async function devolverEmprestimo(id) {
    const resposta = await api.patch(`/emprestimo/${id}/devolver`);
    return resposta.data;
}