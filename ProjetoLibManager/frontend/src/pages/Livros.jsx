import { useState } from 'react';
import { useLivros, useCadastrarLivro, useDeletarLivro } from '../hooks/useLivros.js';
import { useCategorias, useCadastrarCategoria } from '../hooks/useCategorias.js';
import Modal from '../components/Modal.jsx';
import Mensagem from '../components/Mensagem.jsx';

function Livros() {

    // State dos modais
    const [modalLivro, setModalLivro] = useState(false);
    const [modalCategoria, setModalCategoria] = useState(false);

    // State do formulário de livro
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [anoPublicacao, setAnoPublicacao] = useState('');
    const [quantidadeTotal, setQuantidadeTotal] = useState('');
    const [categoriaId, setCategoriaId] = useState('');

    // State do formulário de categoria
    const [nomeCategoria, setNomeCategoria] = useState('');

    // State de feedback
    const [mensagem, setMensagem] = useState(null);
    const [tipoMensagem, setTipoMensagem] = useState(null);

    // TanStack queries
    const { data: livros, isLoading: carregandoLivros } = useLivros();
    const { data: categorias, isLoading: carregandoCategorias } = useCategorias();

    // TanStack mutations
    const cadastrarLivro = useCadastrarLivro();
    const deletarLivro = useDeletarLivro();
    const cadastrarCategoria = useCadastrarCategoria();

    // Limpa o formulário de livro
    function limparFormularioLivro() {
        setTitulo('');
        setAutor('');
        setAnoPublicacao('');
        setQuantidadeTotal('');
        setCategoriaId('');
    }

    // Cadastra um livro
    async function handleCadastrarLivro(e) {
        e.preventDefault();

        try {
            await cadastrarLivro.mutateAsync({
                titulo,
                autor,
                anoPublicacao: Number(anoPublicacao),
                quantidadeTotal: Number(quantidadeTotal),
                categoriaId: Number(categoriaId),
            });

            setMensagem('Livro cadastrado com sucesso.');
            setTipoMensagem('sucesso');
            limparFormularioLivro();
            setModalLivro(false);

        } catch (erro) {
            const msg = erro.response?.data?.mensagem || 'Erro ao cadastrar livro.';
            setMensagem(msg);
            setTipoMensagem('erro');
        }
    }

    // Deleta um livro
    async function handleDeletarLivro(id) {
        try {
            await deletarLivro.mutateAsync(id);

            setMensagem('Livro deletado com sucesso.');
            setTipoMensagem('sucesso');

        } catch (erro) {
            const msg = erro.response?.data?.mensagem || 'Erro ao deletar livro.';
            setMensagem(msg);
            setTipoMensagem('erro');
        }
    }

    // Cadastra uma categoria
    async function handleCadastrarCategoria(e) {
        e.preventDefault();

        try {
            await cadastrarCategoria.mutateAsync({ nome: nomeCategoria });

            setMensagem('Categoria cadastrada com sucesso.');
            setTipoMensagem('sucesso');
            setNomeCategoria('');
            setModalCategoria(false);

        } catch (erro) {
            const msg = erro.response?.data?.mensagem || 'Erro ao cadastrar categoria.';
            setMensagem(msg);
            setTipoMensagem('erro');
        }
    }

    // Carregamento
    if (carregandoLivros || carregandoCategorias) {
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
                <h1 className="text-2xl font-bold text-gray-800">Livros</h1>
                <div className="flex gap-3">
                    <button
                        onClick={() => setModalCategoria(true)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Nova Categoria
                    </button>
                    <button
                        onClick={() => setModalLivro(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Novo Livro
                    </button>
                </div>
            </div>

            {/* Mensagem */}
            <Mensagem
                tipo={tipoMensagem}
                texto={mensagem}
                aoFechar={() => setMensagem(null)}
            />

            {/* Tabela de livros */}
            <div className="bg-white rounded-lg shadow overflow-hidden mt-4">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Título</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Autor</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ano</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Categoria</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Total</th>
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
                                <td className="px-4 py-3 text-sm text-gray-500">{livro.categoria}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{livro.quantidade_total}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{livro.quantidade_disponivel}</td>
                                <td className="px-4 py-3 text-sm">
                                    <button
                                        onClick={() => handleDeletarLivro(livro.id)}
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

            {/* Modal de cadastrar livro */}
            <Modal
                aberto={modalLivro}
                aoFechar={() => { setModalLivro(false); limparFormularioLivro(); }}
                titulo="Cadastrar Novo Livro"
            >

                            {/* Mensagem */}
                <Mensagem
                    tipo={tipoMensagem}
                    texto={mensagem}
                    aoFechar={() => setMensagem(null)}
                />
                
                <form onSubmit={handleCadastrarLivro} className="space-y-4">

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Título</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Digite o título do livro"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Autor</label>
                        <input
                            type="text"
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                            placeholder="Digite o nome do autor"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Categoria</label>
                        <select
                            value={categoriaId}
                            onChange={(e) => setCategoriaId(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Selecione a categoria</option>
                            {categorias?.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.nome}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-400 mt-1">
                            Não tem a categoria?{' '}
                            <button
                                type="button"
                                onClick={() => { setModalLivro(false); setModalCategoria(true); }}
                                className="text-blue-500 hover:underline"
                            >
                                Cadastre aqui
                            </button>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Ano de Publicação</label>
                            <input
                                type="number"
                                value={anoPublicacao}
                                onChange={(e) => setAnoPublicacao(e.target.value)}
                                placeholder="Ex: 2024"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Quantidade</label>
                            <input
                                type="number"
                                value={quantidadeTotal}
                                onChange={(e) => setQuantidadeTotal(e.target.value)}
                                placeholder="Ex: 3"
                                min="1"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end pt-2">
                        <button
                            type="button"
                            onClick={() => { setModalLivro(false); limparFormularioLivro(); }}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={cadastrarLivro.isPending}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {cadastrarLivro.isPending ? 'Cadastrando...' : 'Salvar'}
                        </button>
                    </div>

                </form>
            </Modal>

            {/* Modal de cadastrar categoria */}
            <Modal
                aberto={modalCategoria}
                aoFechar={() => { setModalCategoria(false); setNomeCategoria(''); }}
                titulo="Cadastrar Nova Categoria"
            >
                <form onSubmit={handleCadastrarCategoria} className="space-y-4">

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Nome da Categoria</label>
                        <input
                            type="text"
                            value={nomeCategoria}
                            onChange={(e) => setNomeCategoria(e.target.value)}
                            placeholder="Ex: Aventura, Ficção, Romance"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="flex gap-3 justify-end pt-2">
                        <button
                            type="button"
                            onClick={() => { setModalCategoria(false); setNomeCategoria(''); }}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={cadastrarCategoria.isPending}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {cadastrarCategoria.isPending ? 'Cadastrando...' : 'Salvar'}
                        </button>
                    </div>

                </form>
            </Modal>

        </div>
    );
}

export default Livros;