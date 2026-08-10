import { api } from '../api/api.js';

export async function listarUsuarios() {
    const resposta = await api.get('/usuario');
    return resposta.data;
}

export async function cadastrarUsuario(dados) {
    const resposta = await api.post('/usuario', dados);
    return resposta.data;
}

export async function deletarUsuario(id) {
    const resposta = await api.delete(`/usuario/${id}`);
    return resposta.data;
}