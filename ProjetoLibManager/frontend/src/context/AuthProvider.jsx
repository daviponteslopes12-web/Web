import { useState, useEffect } from 'react';
import { api } from '../api/api.js';
import { AuthContext } from './AuthContext.jsx';


// children -> componentes dentro do provider
function AuthProvider({ children }) {

    const [token, setToken] = useState(null);
    const [bibliotecario, setBibliotecario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    
    // JSON.stringify -> transforma em strig, JSON.parse -> voltar a ser objeto
    //Restaura dados no storage para o state, usuário não precisa logar denovo
    useEffect(() => {

        function restaurarLogin() {
            const tokenSalvo = localStorage.getItem('token');
            const bibliotecarioSalvo = localStorage.getItem('bibliotecario');

            if (tokenSalvo && bibliotecarioSalvo) {
                setToken(tokenSalvo); // Salva dados no state
                setBibliotecario(JSON.parse(bibliotecarioSalvo));
            }

            setCarregando(false);
        }

        restaurarLogin();

    }, []);

    // Loga e salva login e dados no storage e no state
    async function login(email, senha) {

        const resposta = await api.post('/auth/login', { email, senha });

        const { token, bibliotecario } = resposta.data;

        localStorage.setItem('token', token);
        localStorage.setItem('bibliotecario', JSON.stringify(bibliotecario));

        setToken(token);
        setBibliotecario(bibliotecario);
    }


    // Ao sair, remove token e bibliotecario do localstorage e dos states
    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('bibliotecario');

        setToken(null);
        setBibliotecario(null);
    }

    // Ao editar nome ou email do bibliotecario, atualiza dados no localstorage e no state
    // Pega dados antigos e sobescreve com os novos (campos iguais, dados mais novos ficam)
    function atualizarBibliotecario(novosDados) {

        const atualizado = { ...bibliotecario, ...novosDados }; 

        localStorage.setItem('bibliotecario', JSON.stringify(atualizado));
        setBibliotecario(atualizado);
    }

    // disponibiliza todos os valores para componentes filho
    return (
        <AuthContext.Provider value={{
            token,
            bibliotecario,
            carregando,
            login,
            logout,
            atualizarBibliotecario
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;

/**
===AuthContext===
é como um cofre que cuida de funcionalidades relacionadas ao token e dados;
como 
- guardar o token e os dados no storage e no state no login
- atualizar o storage e o state quando atualiza dados
- restaurar state quando o usuário entrar denovo
- remover dados e token quando faz logout
 */