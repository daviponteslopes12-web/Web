import api from '../api/api';

export default {
    async listarLoja() {
        const resposta = await api.get('/loja');
        return resposta.data;
    },

    async comprarItem(itemId) {
        const resposta = await api.post('/loja/comprar-item', { item_id: itemId });
        return resposta.data;
    },

    async comprarHeroi(lojaId) {
        const resposta = await api.post('/loja/comprar-heroi', { loja_id: lojaId });
        return resposta.data;
    }
};