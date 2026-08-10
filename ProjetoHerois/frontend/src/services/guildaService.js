
import api from '../api/api';

export default {
    async listarDoUsuario() {
        const resposta = await api.get('/guilda/minhas');
        return resposta.data;
    },

    async criar(dados) {
        const resposta = await api.post('/guilda/criar', dados);
        return resposta.data;
    },

    async adicionarHeroi(guildaId, heroiId) {
        const resposta = await api.post(`/guilda/${guildaId}/heroi`, { heroi_id: heroiId });
        return resposta.data;
    },

    async removerHeroi(guildaId, heroiId) {
        const resposta = await api.delete(`/guilda/${guildaId}/heroi/${heroiId}`);
        return resposta.data;
    },

    async deletar(guildaId) {
        const resposta = await api.delete(`/guilda/${guildaId}`);
        return resposta.data;
    }
};