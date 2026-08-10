import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { api } from '../api/api.js';
import Modal from '../components/Modal.jsx';
import Mensagem from '../components/Mensagem.jsx';

function Configuracoes() {

    // Dados do bibliotecário logado
    const { bibliotecario, atualizarBibliotecario, logout } = useAuth();

    // State dos modais
    const [modalDados, setModalDados] = useState(false);
    const [modalSenha, setModalSenha] = useState(false);
    const [modalDeletar, setModalDeletar] = useState(false);

    // State do formulário de dados
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    // State do formulário de senha
    const [senhaAtual, setSenhaAtual] = useState('');
    const [senhaNova, setSenhaNova] = useState('');
    const [senhaConfirmar, setSenhaConfirmar] = useState('');

    // State de feedback
    const [mensagem, setMensagem] = useState(null);
    const [tipoMensagem, setTipoMensagem] = useState(null);

    // Abre modal de dados com os valores atuais preenchidos
    function abrirModalDados() {
        setNome(bibliotecario.nome);
        setEmail(bibliotecario.email);
        setModalDados(true);
    }

    // Abre modal de senha com campos vazios
    function abrirModalSenha() {
        setSenhaAtual('');
        setSenhaNova('');
        setSenhaConfirmar('');
        setModalSenha(true);
    }

    // Atualiza nome e/ou email
    async function handleAtualizarDados(e) {
        e.preventDefault();

        try {
            const resposta = await api.patch('/bibliotecario/dados', { nome, email });

            // Atualiza o AuthContext (localStorage + state)
            atualizarBibliotecario({ nome, email });

            setMensagem(resposta.data.mensagem || 'Dados atualizados com sucesso.');
            setTipoMensagem('sucesso');
            setModalDados(false);

        } catch (erro) {
            const msg = erro.response?.data?.mensagem || 'Erro ao atualizar dados.';
            setMensagem(msg);
            setTipoMensagem('erro');
        }
    }

    // Atualiza senha
    async function handleAtualizarSenha(e) {
        e.preventDefault();

        // Valida se senhas conferem antes de enviar
        if (senhaNova !== senhaConfirmar) {
            setMensagem('Senhas não conferem.');
            setTipoMensagem('erro');
            return;
        }

        try {
            const resposta = await api.patch('/bibliotecario/senha', {
                senhaAtual,
                senhaNova,
                senhaConfirmar,
            });

            setMensagem(resposta.data.mensagem || 'Senha atualizada com sucesso.');
            setTipoMensagem('sucesso');
            setModalSenha(false);

        } catch (erro) {
            const msg = erro.response?.data?.mensagem || 'Erro ao atualizar senha.';
            setMensagem(msg);
            setTipoMensagem('erro');
        }
    }

    // Deleta a conta do bibliotecário
    async function handleDeletar() {
        try {
            await api.delete('/bibliotecario');

            // Faz logout (limpa localStorage e state) e volta pro login
            logout();

        } catch (erro) {
            const msg = erro.response?.data?.mensagem || 'Erro ao deletar conta.';
            setMensagem(msg);
            setTipoMensagem('erro');
            setModalDeletar(false);
        }
    }

    return (
        <div>
            {/* Cabeçalho */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Configurações</h1>

            {/* Mensagem */}
            <Mensagem
                tipo={tipoMensagem}
                texto={mensagem}
                aoFechar={() => setMensagem(null)}
            />

            {/* Card de dados pessoais */}
            <div className="bg-white rounded-lg shadow p-6 mt-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Dados Pessoais</h2>
                    <button
                        onClick={abrirModalDados}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                        Editar
                    </button>
                </div>
                <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                        <span className="font-medium text-gray-700">Nome:</span> {bibliotecario?.nome}
                    </p>
                    <p className="text-sm text-gray-500">
                        <span className="font-medium text-gray-700">Email:</span> {bibliotecario?.email}
                    </p>
                </div>
            </div>

            {/* Card de senha */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Senha</h2>
                    <button
                        onClick={abrirModalSenha}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                        Alterar Senha
                    </button>
                </div>
                <p className="text-sm text-gray-500">••••••••</p>
            </div>

            {/* Card de deletar conta */}
            <div className="bg-white rounded-lg shadow p-6 border border-red-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-red-600">Zona de Perigo</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Ao deletar sua conta, todos os dados serão removidos permanentemente.
                        </p>
                    </div>
                    <button
                        onClick={() => setModalDeletar(true)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                        Deletar Conta
                    </button>
                </div>
            </div>

            {/* Modal de editar dados */}
            <Modal
                aberto={modalDados}
                aoFechar={() => setModalDados(false)}
                titulo="Editar Dados"
            >
                <form onSubmit={handleAtualizarDados} className="space-y-4">

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Nome</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="flex gap-3 justify-end pt-2">
                        <button
                            type="button"
                            onClick={() => setModalDados(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Salvar
                        </button>
                    </div>

                </form>
            </Modal>

            {/* Modal de alterar senha */}
            <Modal
                aberto={modalSenha}
                aoFechar={() => setModalSenha(false)}
                titulo="Alterar Senha"
            >

                            {/* Mensagem */}
                <Mensagem
                    tipo={tipoMensagem}
                    texto={mensagem}
                    aoFechar={() => setMensagem(null)}
                />

                <form onSubmit={handleAtualizarSenha} className="space-y-4">

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Senha Atual</label>
                        <input
                            type="password"
                            value={senhaAtual}
                            onChange={(e) => setSenhaAtual(e.target.value)}
                            placeholder="Digite sua senha atual"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Nova Senha</label>
                        <input
                            type="password"
                            value={senhaNova}
                            onChange={(e) => setSenhaNova(e.target.value)}
                            placeholder="Mínimo 6 caracteres"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Confirmar Nova Senha</label>
                        <input
                            type="password"
                            value={senhaConfirmar}
                            onChange={(e) => setSenhaConfirmar(e.target.value)}
                            placeholder="Repita a nova senha"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="flex gap-3 justify-end pt-2">
                        <button
                            type="button"
                            onClick={() => setModalSenha(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Alterar Senha
                        </button>
                    </div>

                </form>
            </Modal>

            {/* Modal de confirmação de deletar */}
            <Modal
                aberto={modalDeletar}
                aoFechar={() => setModalDeletar(false)}
                titulo="Deletar Conta"
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.
                    </p>
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={() => setModalDeletar(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleDeletar}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Sim, Deletar
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    );
}

export default Configuracoes;