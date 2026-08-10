import api from '../api/api';

export default {
    async buscarPerfil() {
        const resposta = await api.get('/configuracao/perfil');
        return resposta.data;
    },

    async atualizarNomeEmail(dados) {
        const resposta = await api.put('/configuracao/nome-email', dados);
        return resposta.data;
    },

    async atualizarSenha(dados) {
        const resposta = await api.put('/configuracao/senha', dados);
        return resposta.data;
    },

    async deletarConta(senha) {
        const resposta = await api.delete('/configuracao/conta', { data: { senha } });
        return resposta.data;
    }
};