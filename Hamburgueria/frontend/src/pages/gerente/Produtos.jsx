import { useState } from 'react';
import {
    useBuscarProdutos,
    useCadastrarProduto,
    useEditarProduto,
    useDeletarProduto,
    useAlternarAtivoProduto,
} from '../../hooks/useProdutos.js';
import DashboardLayout from '../../components/DashboardLayout.jsx';
import CardProduto from '../../components/CardProduto.jsx';
import Modal from '../../components/Modal.jsx';
import Feedback from '../../components/Feedback.jsx';
import FormProduto from '../../components/FormProduto.jsx';
import Loading from '../../components/Loading.jsx';

function Produtos() {
    const { data: produtos, isLoading } = useBuscarProdutos();
    const cadastrar = useCadastrarProduto();
    const editar = useEditarProduto();
    const deletar = useDeletarProduto();
    const alternarAtivo = useAlternarAtivoProduto();

    const [modal, setModal] = useState({ aberto: false, tipo: '', dados: null });

    function fecharModal() {
        setModal({ aberto: false, tipo: '', dados: null });
    }

    function handleCadastrar(dados) {
        cadastrar.mutate(dados, {
            onSuccess: () => {
                setModal({ aberto: true, tipo: 'sucesso', dados: 'Produto cadastrado com sucesso!' });
            },
            onError: () => {
                setModal({ aberto: true, tipo: 'erro', dados: 'Erro ao cadastrar produto.' });
            },
        });
    }

    function handleEditar(dados) {
        editar.mutate(
            { id: modal.dados.id, dados },
            {
                onSuccess: () => {
                    fecharModal();
                    setModal({ aberto: true, tipo: 'sucesso', dados: 'Produto atualizado com sucesso!' });
                },
                onError: () => {
                    fecharModal();
                    setModal({ aberto: true, tipo: 'erro', dados: 'Erro ao atualizar produto.' });
                },
            }
        );
    }

    function handleDeletar() {
        deletar.mutate(modal.dados.id, {
            onSuccess: () => {
                fecharModal();
                setModal({ aberto: true, tipo: 'sucesso', dados: 'Produto deletado com sucesso!' });
            },
            onError: () => {
                fecharModal();
                setModal({ aberto: true, tipo: 'erro', dados: 'Erro ao deletar produto.' });
            },
        });
    }

    if (isLoading) return <Loading />;

    return (
        <DashboardLayout modo="gerente">
            {(aba) => {
                if (aba === 'dashboard') return null;

                const produtosFiltrados = produtos?.filter((p) => p.categoria === aba) || [];

                return (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold capitalize">{aba}s</h1>
                            <button
                                onClick={() => setModal({ aberto: true, tipo: 'criar', dados: null })}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                + Cadastrar
                            </button>
                        </div>

                        {/* Grid de produtos */}
                        <div className="grid grid-cols-3 gap-4">
                            {produtosFiltrados.map((produto) => (
                                <CardProduto
                                    key={produto.id}
                                    modo="gerente"
                                    produto={produto}
                                    onEditar={(p) => setModal({ aberto: true, tipo: 'editar', dados: p })}
                                    onAlternarAtivo={(id, ativo) => alternarAtivo.mutate({ id, ativo })}
                                />
                            ))}
                        </div>

                        {produtosFiltrados.length === 0 && (
                            <p className="text-gray-500 text-center mt-10">
                                Nenhum produto cadastrado nesta categoria.
                            </p>
                        )}

                        {/* Modal de Criar */}
                        <Modal aberto={modal.tipo === 'criar'} onFechar={fecharModal}>
                            <FormProduto onSalvar={handleCadastrar} onCancelar={fecharModal} />
                        </Modal>

                        {/* Modal de Editar */}
                        <Modal aberto={modal.tipo === 'editar'} onFechar={fecharModal}>
                            <FormProduto produto={modal.dados} onSalvar={handleEditar} onCancelar={fecharModal} />
                        </Modal>

                        {/* Modal de Deletar */}
                        <Modal aberto={modal.tipo === 'deletar'} onFechar={fecharModal}>
                            <Feedback
                                tipo="confirmacao"
                                mensagem={`Tem certeza que deseja deletar "${modal.dados?.nome}"?`}
                                onConfirmar={handleDeletar}
                                onFechar={fecharModal}
                            />
                        </Modal>

                        {/* Modal de Sucesso */}
                        <Modal aberto={modal.tipo === 'sucesso'} onFechar={fecharModal}>
                            <Feedback
                                tipo="sucesso"
                                mensagem={modal.dados}
                                onFechar={fecharModal}
                            />
                        </Modal>

                        {/* Modal de Erro */}
                        <Modal aberto={modal.tipo === 'erro'} onFechar={fecharModal}>
                            <Feedback
                                tipo="erro"
                                mensagem={modal.dados}
                                onFechar={fecharModal}
                            />
                        </Modal>
                    </div>
                );
            }}
        </DashboardLayout>
    );
}

export default Produtos;