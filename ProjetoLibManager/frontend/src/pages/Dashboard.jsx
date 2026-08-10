import { useState } from 'react';
import { useEmprestimos, useCadastrarEmprestimo, useDevolverEmprestimo } from '../hooks/useEmprestimos.js';
import { useLivros } from '../hooks/useLivros.js';
import { useUsuarios } from '../hooks/useUsuarios.js';
import Modal from '../components/Modal.jsx';
import Mensagem from '../components/Mensagem.jsx';

function Dashboard() {

    // State do filtro de status
    const [filtro, setFiltro] = useState(undefined);
    const [filtroData, setFiltroData] = useState('');
    const [filtroDataFim, setFiltroDataFim] = useState('');

    // State do modal de empréstimo
    const [modalAberto, setModalAberto] = useState(false);
    const [livroSelecionado, setLivroSelecionado] = useState(null);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState('');

    // State de feedback
    const [mensagem, setMensagem] = useState(null);
    const [tipoMensagem, setTipoMensagem] = useState(null);

    // TanStack queries
    const { data: emprestimos, isLoading: carregandoEmprestimos } = useEmprestimos(filtro);
    const { data: livros, isLoading: carregandoLivros } = useLivros();
    const { data: usuarios, isLoading: carregandoUsuarios } = useUsuarios();

    // TanStack mutations
    const cadastrarEmprestimo = useCadastrarEmprestimo();
    const devolverEmprestimo = useDevolverEmprestimo();

    // Abre o modal de empréstimo com o livro selecionado
    function abrirModalEmprestimo(livro) {
        setLivroSelecionado(livro);
        setUsuarioSelecionado('');
        setModalAberto(true);
    }

    // Envia o empréstimo
    async function handleEmprestimo(e) {
        e.preventDefault();

        try {
            await cadastrarEmprestimo.mutateAsync({
                livroId: livroSelecionado.id,
                usuarioId: Number(usuarioSelecionado),
            });

            setMensagem('Empréstimo cadastrado com sucesso.');
            setTipoMensagem('sucesso');
            setModalAberto(false);

        } catch (erro) {
            const msg = erro.response?.data?.mensagem || 'Erro ao cadastrar empréstimo.';
            setMensagem(msg);
            setTipoMensagem('erro');
        }
    }

    // Devolve um empréstimo
    async function handleDevolver(id) {
        try {
            await devolverEmprestimo.mutateAsync(id);

            setMensagem('Livro devolvido com sucesso.');
            setTipoMensagem('sucesso');

        } catch (erro) {
            const msg = erro.response?.data?.mensagem || 'Erro ao devolver empréstimo.';
            setMensagem(msg);
            setTipoMensagem('erro');
        }
    }

    // Formata a data para o padrão brasileiro
    function formatarData(data) {
        if (!data) return '-';

        const apenasData = data.substring(0, 10);

        const [ano, mes, dia] = apenasData.split('-');

        return `${dia}/${mes}/${ano}`;
    }

    // Cor do status
    function corStatus(status) {
        switch (status) {
            case 'ativo': return 'text-blue-600 bg-blue-100';
            case 'atrasado': return 'text-red-600 bg-red-100';
            case 'devolvido': return 'text-green-600 bg-green-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    }

    const emprestimosFiltrados = (emprestimos || []).filter((e) => {
        const data = e.data_emprestimo?.substring(0, 10);

        if (filtroData && data < filtroData) return false;
        if (filtroDataFim && data > filtroDataFim) return false;

        return true;
    });

    // Carregamento
    if (carregandoEmprestimos || carregandoLivros || carregandoUsuarios) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Carregando...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Cabeçalho */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

            {/* Mensagem */}
            <Mensagem
                tipo={tipoMensagem}
                texto={mensagem}
                aoFechar={() => setMensagem(null)}
            />

            {/* Cards de resumo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 mt-4">
                <div className="bg-white rounded-lg shadow p-4">
                    <p className="text-sm text-gray-500">Total de títulos</p>
                    <p className="text-2xl font-bold text-gray-800">{livros?.length || 0}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <p className="text-sm text-gray-500">Empréstimos ativos</p>
                    <p className="text-2xl font-bold text-blue-600">
                        {emprestimosFiltrados?.filter((e) => e.status === 'ativo').length || 0}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <p className="text-sm text-gray-500">Empréstimos atrasados</p>
                    <p className="text-2xl font-bold text-red-600">
                        {emprestimosFiltrados?.filter((e) => e.status === 'atrasado').length || 0}
                    </p>
                </div>
            </div>

            {/* Filtros */}
            <div className="flex gap-2 mb-4">
                {[
                    { label: 'Todos', valor: undefined },
                    { label: 'Ativos', valor: 'ativo' },
                    { label: 'Atrasados', valor: 'atrasado' },
                    { label: 'Devolvidos', valor: 'devolvido' },
                ].map((botao) => (
                    <button
                        key={botao.label}
                        onClick={() => setFiltro(botao.valor)}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                            filtro === botao.valor
                                ? 'bg-gray-800 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {botao.label}
                    </button>
                ))}
                <label className="block text-sm text-gray-600 mb-1">De</label>
                <input 
                type="date"
                value={filtroData}
                onChange={(e) => setFiltroData(e.target.value)}
                className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500' 
                />
                <label className="block text-sm text-gray-600 mb-1">Até</label>
                <input 
                type='date'
                value={filtroDataFim}
                onChange={(e) => setFiltroDataFim(e.target.value)}
                className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                />
            </div>

            {/* Tabela de empréstimos */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Usuário</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Livro</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Empréstimo</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Devolução prevista</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Devolução real</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {emprestimosFiltrados?.map((emprestimo) => (
                            <tr key={emprestimo.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-800">{emprestimo.usuario}</td>
                                <td className="px-4 py-3 text-sm text-gray-800">{emprestimo.livro}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{formatarData(emprestimo.data_emprestimo)}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{formatarData(emprestimo.data_devolucao_prevista)}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{formatarData(emprestimo.data_devolucao_real)}</td>
                                <td className="px-4 py-3 text-sm">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${corStatus(emprestimo.status)}`}>
                                        {emprestimo.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    {emprestimo.status !== 'devolvido' && (
                                        <button
                                            onClick={() => handleDevolver(emprestimo.id)}
                                            className="text-green-600 hover:text-green-800 font-medium"
                                        >
                                            Devolver
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Tabela de livros disponíveis para empréstimo */}
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Acervo de Livros</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Título</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Autor</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ano</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Disponível</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {livros?.map((livro) => (
                            <tr key={livro.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-800">{livro.titulo}</td>
                                <td className="px-4 py-3 text-sm text-gray-800">{livro.autor}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{livro.ano_publicacao || '-'}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{livro.quantidade_disponivel}</td>
                                <td className="px-4 py-3 text-sm">
                                    {livro.quantidade_disponivel > 0 ? (
                                        <button
                                            onClick={() => abrirModalEmprestimo(livro)}
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Emprestar
                                        </button>
                                    ) : (
                                        <span className="text-gray-400">Indisponível</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de empréstimo */}
            <Modal
                aberto={modalAberto}
                aoFechar={() => setModalAberto(false)}
                titulo={`Emprestar: ${livroSelecionado?.titulo}`}
            >
                <form onSubmit={handleEmprestimo} className="space-y-4">

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Selecionar leitor
                        </label>
                        <select
                            value={usuarioSelecionado}
                            onChange={(e) => setUsuarioSelecionado(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Selecione um leitor</option>
                            {usuarios?.map((usuario) => (
                                <option key={usuario.id} value={usuario.id}>
                                    {usuario.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 justify-end">
                        <button
                            type="button"
                            onClick={() => setModalAberto(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={cadastrarEmprestimo.isPending}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {cadastrarEmprestimo.isPending ? 'Emprestando...' : 'Confirmar'}
                        </button>
                    </div>

                </form>
            </Modal>

        </div>
    );
}

export default Dashboard;