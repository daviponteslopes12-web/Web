import { useState } from 'react';
import { useLogin } from '../../hooks/useGerente.js';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const login = useLogin();

    function handleSubmit(e) {
        e.preventDefault();
        login.mutate({ email, senha });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-96">
                <h1 className="text-2xl font-bold text-center mb-6">Área do Gerente</h1>

                {/* Email */}
                <div className="mb-4">
                    <label className="block font-bold mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="gerente@email.com"
                    />
                </div>

                {/* Senha */}
                <div className="mb-6">
                    <label className="block font-bold mb-1">Senha</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Sua senha"
                    />
                </div>

                {/* Erro */}
                {login.isError && (
                    <p className="text-red-500 text-center mb-4">
                        {login.error.response?.data?.mensagem || 'Erro ao fazer login'}
                    </p>
                )}

                {/* Botão */}
                <button
                    type="submit"
                    disabled={login.isPending}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {login.isPending ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
        </div>
    );
}

export default Login;