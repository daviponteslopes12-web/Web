import { useNavigate } from 'react-router-dom';
import { useBuscarProdutos } from '../../hooks/useProdutos.js';
import { useListarCombos } from '../../hooks/useCombos.js';
import DashboardLayout from '../../components/DashboardLayout.jsx';

function Dashboard() {
    const navigate = useNavigate();
    const { data: produtos } = useBuscarProdutos();
    const { data: combos } = useListarCombos();

    const totalProdutos = produtos?.length || 0;
    const produtosAtivos = produtos?.filter((p) => p.ativo).length || 0;
    const totalCombos = combos?.length || 0;
    const combosAtivos = combos?.filter((c) => c.ativo).length || 0;

    return (
        <DashboardLayout modo="gerente">
            {(aba) => {
                if (aba === 'dashboard') {
                    return (
                        <div>
                            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

                            {/* Cards de resumo */}
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-gray-500 text-sm">Total de Produtos</h3>
                                    <p className="text-3xl font-bold mt-2">{totalProdutos}</p>
                                    <p className="text-green-600 text-sm mt-1">{produtosAtivos} ativos</p>
                                </div>
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-gray-500 text-sm">Total de Combos</h3>
                                    <p className="text-3xl font-bold mt-2">{totalCombos}</p>
                                    <p className="text-green-600 text-sm mt-1">{combosAtivos} ativos</p>
                                </div>
                            </div>

                            {/* Ações rápidas */}
                            <h2 className="text-xl font-bold mb-4">Ações rápidas</h2>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => navigate('/gerente/produtos')}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Gerenciar Produtos
                                </button>
                                <button
                                    onClick={() => navigate('/gerente/combos')}
                                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                                >
                                    Gerenciar Combos
                                </button>
                            </div>
                        </div>
                    );
                }

                // Para qualquer outra aba, redireciona para a página correta
                if (aba === 'combos') {
                    navigate('/gerente/combos');
                } else {
                    navigate('/gerente/produtos');
                }

                return null;
            }}
        </DashboardLayout>
    );
}

export default Dashboard;