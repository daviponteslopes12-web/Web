import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Mensagem from '../components/Mensagem.jsx';

function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [mensagem, setMensagem] = useState(null);
    const [tipoMensagem, setTipoMensagem] = useState(null);
    const [carregando, setCarregando] = useState(false);

    const { login } = useAuth();

    const navigate = useNavigate();

    async function handleSubmit(e) {

        e.preventDefault();

        setMensagem(null);
        setCarregando(true);

        try {
            await login(email, senha);

            navigate('/');

        } catch (erro) {
            const msg = erro.response?.data?.mensagem || 'Erro ao fazer login';
            setMensagem(msg);
            setTipoMensagem('erro');
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">

            {/* Card do login */}
            <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-sm p-8">

                {/* Logo */}
                <h1 className="text-2xl font-bold text-white text-center mb-8">
                    LibManager
                </h1>

                {/* Mensagem de erro */}
                <Mensagem
                    tipo={tipoMensagem}
                    texto={mensagem}
                    aoFechar={() => setMensagem(null)}
                />

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="space-y-5 mt-4">

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            E-mail
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ex: bibliotecario@biblioteca.com"
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-500"
                            required
                        />
                    </div>

                    {/* Senha */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Senha
                        </label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Digite sua senha"
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-500"
                            required
                        />
                    </div>

                    {/* Botão entrar */}
                    <button
                        type="submit"
                        disabled={carregando}
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {carregando ? 'Entrando...' : 'Entrar'}
                    </button>

                </form>

                {/* Links */}
                <div className="mt-6 text-center space-y-2">
                    <p className="text-sm text-gray-500">
                        Esqueceu a senha?
                    </p>
                    <p className="text-sm text-gray-400">
                        Não tem conta?{' '}
                        <Link to="/cadastro" className="text-blue-400 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </div>

            </div>

        </div>
    );
}

export default Login;