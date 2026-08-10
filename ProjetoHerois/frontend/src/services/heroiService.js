import api from '../api/api';

export default {
    async listarDoUsuario() {
        const resposta = await api.get('/heroi/meus');
        return resposta.data;
    },

    async sortear() {
        const resposta = await api.post('/heroi/sortear');
        return resposta.data;
    },

    async criar(dados) {
        const resposta = await api.post('/heroi/criar', dados);
        return resposta.data;
    },

    async listarTodos(pagina = 1, limite = 20) {
        const resposta = await api.get(`/heroi/todos?pagina=${pagina}&limite=${limite}`);
        return resposta.data;
    }
};