import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [usuario, setUsuario] = useState(() => {
        const salvo = localStorage.getItem('usuario');
        return salvo ? JSON.parse(salvo) : null;
    });

    const navigate = useNavigate();

    function login(tokenRecebido, usuarioRecebido) {
        localStorage.setItem('token', tokenRecebido);
        localStorage.setItem('usuario', JSON.stringify(usuarioRecebido));
        setToken(tokenRecebido);
        setUsuario(usuarioRecebido);
        navigate('/dashboard');
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setToken(null);
        setUsuario(null);
        navigate('/login');
    }

    function atualizarUsuario(dadosAtualizados) {
        const novoUsuario = { ...usuario, ...dadosAtualizados };
        localStorage.setItem('usuario', JSON.stringify(novoUsuario));
        setUsuario(novoUsuario);
    }

    const autenticado = !!token;

    return (
        <AuthContext.Provider value={{
            usuario,
            token,
            autenticado,
            login,
            logout,
            atualizarUsuario
        }}>
            {children}
        </AuthContext.Provider>
    );
}