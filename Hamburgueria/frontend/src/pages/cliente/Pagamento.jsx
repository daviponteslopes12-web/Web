import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../../context/useCarrinho.js';
import { useCriarPedido } from '../../hooks/usePedidos.js';
import { formatarPreco } from '../../utils/formatar.js';

function Pagamento() {
    const navigate = useNavigate();
    const { itens, total, limparCarrinho } = useCarrinho();
    const criarPedido = useCriarPedido();

    const [formaPagamento, setFormaPagamento] = useState(null);

    const formasPagamento = [
        { id: 'pix', nome: 'PIX', icone: '💲' },
        { id: 'cartao', nome: 'Cartão', icone: '💳' },
        { id: 'boleto', nome: 'Boleto', icone: '📄' },
    ];

    function handlePagamento(forma) {
        setFormaPagamento(forma);

        const pedido = {
            forma_pagamento: forma,
            itens: itens.map((item) => ({
                tipo: item.tipo,
                id: item.id,
                quantidade: item.quantidade,
                preco: item.preco,
            })),
        };

        criarPedido.mutate(pedido, {
            onSuccess: () => {
                limparCarrinho();
                navigate('/sucesso');
            },
            onError: () => {
                setFormaPagamento(null);
            },
        });
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => navigate('/carrinho')}
                    className="text-blue-600 mb-4 hover:underline"
                >
                    ← Voltar ao carrinho
                </button>

                <h1 className="text-2xl font-bold mb-6">Pagamento</h1>

                {/* Resumo do pedido */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="font-bold text-lg mb-4">Resumo do pedido</h2>
                    <div className="divide-y">
                        {itens.map((item) => (
                            <div key={`${item.tipo}-${item.id}`} className="py-2 flex justify-between">
                                <span>{item.quantidade}x {item.nome}</span>
                                <span className="text-green-600 font-bold">
                                    {formatarPreco(item.preco * item.quantidade)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t flex justify-between">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-2xl text-green-600 font-bold">{formatarPreco(total)}</span>
                    </div>
                </div>

                {/* Formas de pagamento */}
                <h2 className="font-bold text-lg mb-4">Escolha a forma de pagamento</h2>
                <div className="grid grid-cols-3 gap-4">
                    {formasPagamento.map((forma) => (
                        <button
                            key={forma.id}
                            onClick={() => handlePagamento(forma.id)}
                            disabled={formaPagamento !== null}
                            className={`bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${
                                formaPagamento === forma.id ? 'ring-2 ring-blue-600' : ''
                            }`}
                        >
                            <span className="text-4xl block mb-2">{forma.icone}</span>
                            <span className="font-bold">{forma.nome}</span>
                        </button>
                    ))}
                </div>

                {/* Erro */}
                {criarPedido.isError && (
                    <p className="text-red-500 text-center mt-4">
                        Erro ao finalizar pedido. Tente novamente.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Pagamento;