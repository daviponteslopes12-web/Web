import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cadastrarBibliotecario } from '../services/authService.js';
import Mensagem from '../components/Mensagem.jsx';

function Cadastro() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [mensagem, setMensagem] = useState(null);
    const [tipoMensagem, setTipoMensagem] = useState(null);
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {

        e.preventDefault();

        setMensagem(null);

        if (senha !== confirmarSenha) {
            setMensagem('Senhas não conferem.');
            setTipoMensagem('erro');
            return;
        }

        setCarregando(true);

        try {
            await cadastrarBibliotecario({ nome, email, senha });

            setMensagem('Cadastro realizado com sucesso.');
            setTipoMensagem('sucesso');

            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (erro) {
            const msg = erro.response?.data?.mensagem || 'Erro ao cadastrar.';
            setMensagem(msg);
            setTipoMensagem('erro');
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">

            {/* Card do cadastro */}
            <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-sm p-8">

                {/* Logo */}
                <h1 className="text-2xl font-bold text-white text-center mb-8">
                    LibManager
                </h1>

                {/* Mensagem */}
                <Mensagem
                    tipo={tipoMensagem}
                    texto={mensagem}
                    aoFechar={() => setMensagem(null)}
                />

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="space-y-5 mt-4">

                    {/* Nome */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Nome
                        </label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Digite seu nome"
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-500"
                            required
                        />
                    </div>

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
                            placeholder="Mínimo 6 caracteres"
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-500"
                            required
                        />
                    </div>

                    {/* Confirmar senha */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Confirmar senha
                        </label>
                        <input
                            type="password"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            placeholder="Repita a senha"
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-500"
                            required
                        />
                    </div>

                    {/* Botão cadastrar */}
                    <button
                        type="submit"
                        disabled={carregando}
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {carregando ? 'Cadastrando...' : 'Cadastrar'}
                    </button>

                </form>

                {/* Link para login */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                        Já tem conta?{' '}
                        <Link to="/login" className="text-blue-400 hover:underline">
                            Entrar
                        </Link>
                    </p>
                </div>

            </div>

        </div>
    );
}

export default Cadastro;