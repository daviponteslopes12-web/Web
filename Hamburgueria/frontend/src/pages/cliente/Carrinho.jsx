import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../../context/useCarrinho.js';
import { formatarPreco } from '../../utils/formatar.js';

function Carrinho() {
    const navigate = useNavigate();
    const { itens, total, totalItens, removerItem, aumentarQuantidade, diminuirQuantidade } = useCarrinho();

    if (itens.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <h1 className="text-2xl font-bold">Carrinho vazio</h1>
                <p className="text-gray-500 mt-2">Adicione itens do cardápio</p>
                <button
                    onClick={() => navigate('/cardapio')}
                    className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    Ver Cardápio
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => navigate('/cardapio')}
                    className="text-blue-600 mb-4 hover:underline"
                >
                    ← Voltar ao cardápio
                </button>

                <h1 className="text-2xl font-bold mb-6">Seu Carrinho</h1>

                {/* Itens */}
                <div className="bg-white rounded-lg shadow divide-y">
                    {itens.map((item) => (
                        <div key={`${item.tipo}-${item.id}`} className="p-4 flex justify-between items-center">
                            <div className="flex-1">
                                <h3 className="font-bold">{item.nome}</h3>
                                <span className="text-sm text-gray-500 capitalize">{item.tipo}</span>
                            </div>

                            {/* Quantidade */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => diminuirQuantidade(item.id, item.tipo)}
                                    className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition"
                                >
                                    -
                                </button>
                                <span className="w-8 text-center font-bold">{item.quantidade}</span>
                                <button
                                    onClick={() => aumentarQuantidade(item.id, item.tipo)}
                                    className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition"
                                >
                                    +
                                </button>
                            </div>

                            {/* Preço */}
                            <div className="flex items-center gap-4 ml-6">
                                <span className="text-green-600 font-bold">
                                    {formatarPreco(item.preco * item.quantidade)}
                                </span>
                                <button
                                    onClick={() => removerItem(item.id, item.tipo)}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total */}
                <div className="bg-white rounded-lg shadow mt-4 p-4 flex justify-between items-center">
                    <span className="text-lg font-bold">Total ({totalItens} itens)</span>
                    <span className="text-2xl text-green-600 font-bold">{formatarPreco(total)}</span>
                </div>

                {/* Botão de pagamento */}
                <button
                    onClick={() => navigate('/pagamento')}
                    className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-green-700 transition"
                >
                    Finalizar Pedido
                </button>
            </div>
        </div>
    );
}

export default Carrinho;