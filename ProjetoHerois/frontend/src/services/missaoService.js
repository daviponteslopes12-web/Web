import api from '../api/api';

export default {
    async listarMissoes() {
        const resposta = await api.get('/missao');
        return resposta.data;
    },

    async executarMissao(missaoId, guildaId) {
        const resposta = await api.post(`/missao/${missaoId}/executar`, { guilda_id: guildaId });
        return resposta.data;
    }
};