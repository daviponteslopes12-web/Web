import { useState } from 'react';
import { useHistorico } from '../hooks/useHistorico.js';

function Historico() {

    // Filtros
    const [filtroLivro, setFiltroLivro] = useState('');
    const [filtroUsuario, setFiltroUsuario] = useState('');
    const [filtroDataInicio, setFiltroDataInicio] = useState('');
    const [filtroDataFim, setFiltroDataFim] = useState('');

    // TanStack
    const { data: historico, isLoading } = useHistorico();

    // Filtros do frontend
    const historicoFiltrado = (historico || []).filter((item) => {
        // Filtro por livro
        if (filtroLivro && !item.livro.toLowerCase().includes(filtroLivro.toLowerCase())) {
            return false;
        }

        // Filtro por usuário
        if (filtroUsuario && !item.usuario.toLowerCase().includes(filtroUsuario.toLowerCase())) {
            return false;
        }

        // Filtro por data início
        if (filtroDataInicio && item.data_emprestimo.substring(0, 10) < filtroDataInicio) {
            return false;
        }

        // Filtro por data fim
        if (filtroDataFim && item.data_emprestimo.substring(0, 10) > filtroDataFim) {
            return false;
        }

        return true;
    });

    // Formata data para padrão brasileiro
    function formatarData(data) {
        if (!data) return '-';
        const [ano, mes, dia] = data.substring(0, 10).split('-');
        return `${dia}/${mes}/${ano}`;
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
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Histórico</h1>

            {/* Filtros */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Filtro por livro */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Livro</label>
                        <input
                            type="text"
                            value={filtroLivro}
                            onChange={(e) => setFiltroLivro(e.target.value)}
                            placeholder="Buscar por livro"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Filtro por usuário */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Usuário</label>
                        <input
                            type="text"
                            value={filtroUsuario}
                            onChange={(e) => setFiltroUsuario(e.target.value)}
                            placeholder="Buscar por usuário"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Filtro por data início */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">De</label>
                        <input
                            type="date"
                            value={filtroDataInicio}
                            onChange={(e) => setFiltroDataInicio(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Filtro por data fim */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Até</label>
                        <input
                            type="date"
                            value={filtroDataFim}
                            onChange={(e) => setFiltroDataFim(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                </div>
            </div>

            {/* Tabela de histórico */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Livro</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Autor</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Usuário</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Empréstimo</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Devolução prevista</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {historicoFiltrado.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-800">{item.livro}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{item.autor || '-'}</td>
                                <td className="px-4 py-3 text-sm text-gray-800">{item.usuario}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{formatarData(item.data_emprestimo)}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{formatarData(item.data_devolucao_prevista)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Historico;