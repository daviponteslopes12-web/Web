import api from '../api/api';

export default {
    async cadastrar(dados) {
        const resposta = await api.post('/auth/cadastrar', dados);
        return resposta.data;
    },

    async login(dados) {
        const resposta = await api.post('/auth/login', dados);
        return resposta.data;
    }
};