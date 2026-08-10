import { api } from '../api/api.js';

export async function listarHistorico() {
    const resposta = await api.get('/historico');
    return resposta.data;
}