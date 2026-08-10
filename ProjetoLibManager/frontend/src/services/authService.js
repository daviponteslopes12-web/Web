import { api } from '../api/api.js';

export async function login(email, senha) {

    const resposta = await api.post('/auth/login', { email, senha });

    return resposta.data;
}

export async function cadastrarBibliotecario(dados) {

    const resposta = await api.post('/bibliotecario', dados);

    return resposta.data;
}

/**
 * authService -> Chama rotas do back
 * AuthContext -> Salva no localStorage e state
 * Login.jsx -> Mostra formulário e conecta os dois
 */