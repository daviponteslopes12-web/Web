import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACK_URL || 'http://localhost:3000',
});


// interceptors que ficam entre o back e o front
// coloca token no header antes de enviar para o back
api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

// se o back retornar que o token está expirado, ele remove do localStorage, direciona para o login e retorna Promise para component tratar
api.interceptors.response.use(
    (resposta) => resposta,
    (erro) => {
        if (erro.response && erro.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('bibliotecario');
            window.location.href = '/login';
        }

        return Promise.reject(erro);
    }
);
