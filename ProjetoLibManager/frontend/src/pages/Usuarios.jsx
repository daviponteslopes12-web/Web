import { useState } from 'react';
import { useUsuarios, useCadastrarUsuario, useDeletarUsuario } from '../hooks/useUsuarios.js';
import Modal from '../components/Modal.jsx';
import Mensagem from '../components/Mensagem.jsx';

function Usuarios() {

    // State do modal
    const [modalAberto, setModalAberto] = useState(false);

    // State do formulário
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    // State de feedback
    const [mensagem, setMensagem] = useState(null);
    const [tipoMensagem, setTipoMensagem] = useState(null);

    // TanStack queries
    const { data: usuarios, isLoading } = useUsuarios();

    // TanStack mutations
    const cadastrarUsuario = useCadastrarUsuario();
    const deletarUsuario = useDeletarUsuario();

    // Limpa o formulário
    function limparFormulario() {
        setNome('');
        setEmail('');
        setTelefone('');
    }

    // Cadastra um usuário
    async function handleCadastrar(e) {
        e.preventDefault();

        try {
            await cadastrarUsuario.mutateAsync({ nome, email, telefone });

            setMensagem('Usuário cadastrado com sucesso.');
            setTipoMensagem('sucesso');
            limparFormulario();
            setModalAberto(false);

        } catch (erro) {
            const msg = erro.response?.data?.mensagem || 'Erro ao cadastrar usuário.';
            setMensagem(msg);
            setTipoMensagem('erro');
        }
    }

    // Deleta um usuário
    async function handleDeletar(id) {
        try {
            await deletarUsuario.mutateAsync(id);

            setMensagem('Usuário deletado com sucesso.');
            setTipoMensagem('sucesso');

        } catch (erro) {
            const msg = erro.response?.data?.mensagem || 'Erro ao deletar usuário.';
            setMensagem(msg);
            setTipoMensagem('erro');
        }
    }

    // Carregamento
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Carregando...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Usuários</h1>
                <button
                    onClick={() => setModalAberto(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Novo Usuário
                </button>
            </div>

            {/* Mensagem */}
            <Mensagem
                tipo={tipoMensagem}
                texto={mensagem}
                aoFechar={() => setMensagem(null)}
            />

            {/* Tabela de usuários */}
            <div className="bg-white rounded-lg shadow overflow-hidden mt-4">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Nome</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Telefone</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {usuarios?.map((usuario) => (
                            <tr key={usuario.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-800">{usuario.nome}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{usuario.email}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{usuario.telefone || '-'}</td>
                                <td className="px-4 py-3 text-sm">
                                    <button
                                        onClick={() => handleDeletar(usuario.id)}
                                        className="text-red-600 hover:text-red-800 font-medium"
                                    >
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de cadastrar usuário */}
            <Modal
                aberto={modalAberto}
                aoFechar={() => { setModalAberto(false); limparFormulario(); }}
                titulo="Cadastrar Novo Leitor"
            >

                                        {/* Mensagem */}
                <Mensagem
                    tipo={tipoMensagem}
                    texto={mensagem}
                    aoFechar={() => setMensagem(null)}
                />
                        
                <form onSubmit={handleCadastrar} className="space-y-4">

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Nome</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Nome completo do leitor"
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
                            placeholder="Ex: leitor@email.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Telefone</label>
                        <input
                            type="text"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            placeholder="Ex: (11) 99999-9999"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex gap-3 justify-end pt-2">
                        <button
                            type="button"
                            onClick={() => { setModalAberto(false); limparFormulario(); }}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={cadastrarUsuario.isPending}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {cadastrarUsuario.isPending ? 'Cadastrando...' : 'Salvar'}
                        </button>
                    </div>

                </form>
            </Modal>

        </div>
    );
}

export default Usuarios;