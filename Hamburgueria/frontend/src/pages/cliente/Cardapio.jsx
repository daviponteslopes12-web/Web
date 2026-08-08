import { useBuscarProdutosAtivos } from '../../hooks/useProdutos.js';
import { useListarCombosAtivos } from '../../hooks/useCombos.js';
import { useCarrinho } from '../../context/useCarrinho.js';
import { formatarPreco } from '../../utils/formatar.js';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout.jsx';
import CardProduto from '../../components/CardProduto.jsx';
import CardCombo from '../../components/CardCombo.jsx';
import Loading from '../../components/Loading.jsx';

function Cardapio() {
    const navigate = useNavigate();
    const { data: produtos, isLoading: loadingProdutos } = useBuscarProdutosAtivos();
    const { data: combos, isLoading: loadingCombos } = useListarCombosAtivos();
    const { itens, total, totalItens } = useCarrinho();

    if (loadingProdutos || loadingCombos) return <Loading />;

    return (
        <DashboardLayout modo="cliente">
            {(aba) => {
                if (aba === 'combos') {
                    return (
                        <div>
                            <h1 className="text-2xl font-bold mb-6">Combos</h1>
                            <div className="grid grid-cols-2 gap-4">
                                {combos?.map((combo) => (
                                    <CardCombo key={combo.id} modo="cliente" combo={combo} />
                                ))}
                            </div>
                            {combos?.length === 0 && (
                                <p className="text-gray-500 text-center mt-10">
                                    Nenhum combo disponível no momento.
                                </p>
                            )}
                        </div>
                    );
                }

                const produtosFiltrados = produtos?.filter((p) => p.categoria === aba) || [];

                return (
                    <div>
                        <h1 className="text-2xl font-bold mb-6 capitalize">{aba}s</h1>
                        <div className="grid grid-cols-3 gap-4">
                            {produtosFiltrados.map((produto) => (
                                <CardProduto key={produto.id} modo="cliente" produto={produto} />
                            ))}
                        </div>
                        {produtosFiltrados.length === 0 && (
                            <p className="text-gray-500 text-center mt-10">
                                Nenhum produto disponível nesta categoria.
                            </p>
                        )}
                    </div>
                );
            }}

            {/* Carrinho fixo no canto inferior */}
            {itens.length > 0 && (
                <div className="fixed bottom-0 right-0 w-96 bg-white border-t border-l shadow-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">{totalItens} itens</span>
                        <span className="text-green-600 font-bold text-lg">
                            {formatarPreco(total)}
                        </span>
                    </div>
                    <button
                        onClick={() => navigate('/carrinho')}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Ver Carrinho
                    </button>
                </div>
            )}
        </DashboardLayout>
    );
}

export default Cardapio;