import { useState } from 'react';
import {
    useListarCombos,
    useCadastrarCombo,
    useEditarCombo,
    useDeletarCombo,
    useAlternarAtivoCombo,
} from '../../hooks/useCombos.js';
import { useBuscarProdutosAtivos } from '../../hooks/useProdutos.js';
import DashboardLayout from '../../components/DashboardLayout.jsx';
import CardCombo from '../../components/CardCombo.jsx';
import Modal from '../../components/Modal.jsx';
import Feedback from '../../components/Feedback.jsx';
import FormCombo from '../../components/FormCombo.jsx';
import Loading from '../../components/Loading.jsx';

function Combos() {
    const { data: combos, isLoading } = useListarCombos();
    const { data: produtos } = useBuscarProdutosAtivos();
    const cadastrar = useCadastrarCombo();
    const editar = useEditarCombo();
    const deletar = useDeletarCombo();
    const alternarAtivo = useAlternarAtivoCombo();

    const [modal, setModal] = useState({ aberto: false, tipo: '', dados: null });

    function fecharModal() {
        setModal({ aberto: false, tipo: '', dados: null });
    }

    function handleCadastrar(dados) {
        cadastrar.mutate(dados, {
            onSuccess: () => {
                fecharModal();
                setModal({ aberto: true, tipo: 'sucesso', dados: 'Combo criado com sucesso!' });
            },
            onError: () => {
                fecharModal();
                setModal({ aberto: true, tipo: 'erro', dados: 'Erro ao criar combo.' });
            },
        });
    }

    function handleEditar(dados) {
        editar.mutate(
            { id: modal.dados.id, dados },
            {
                onSuccess: () => {
                    fecharModal();
                    setModal({ aberto: true, tipo: 'sucesso', dados: 'Combo atualizado com sucesso!' });
                },
                onError: () => {
                    fecharModal();
                    setModal({ aberto: true, tipo: 'erro', dados: 'Erro ao atualizar combo.' });
                },
            }
        );
    }

    function handleDeletar() {
        deletar.mutate(modal.dados.id, {
            onSuccess: () => {
                fecharModal();
                setModal({ aberto: true, tipo: 'sucesso', dados: 'Combo deletado com sucesso!' });
            },
            onError: () => {
                fecharModal();
                setModal({ aberto: true, tipo: 'erro', dados: 'Erro ao deletar combo.' });
            },
        });
    }

    if (isLoading) return <Loading />;

    return (
        <DashboardLayout modo="gerente">
            {(aba) => {
                if (aba === 'dashboard') return null;

                return (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Combos</h1>
                            <button
                                onClick={() => setModal({ aberto: true, tipo: 'criar', dados: null })}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                            >
                                + Criar Combo
                            </button>
                        </div>

                        {/* Grid de combos */}
                        <div className="grid grid-cols-2 gap-4">
                            {combos?.map((combo) => (
                                <CardCombo
                                    key={combo.id}
                                    modo="gerente"
                                    combo={combo}
                                    onEditar={(c) => setModal({ aberto: true, tipo: 'editar', dados: c })}
                                    onAlternarAtivo={(id, ativo) => alternarAtivo.mutate({ id, ativo })}
                                    onDeletar={(id) => setModal({ aberto: true, tipo: 'deletar', dados: { id, nome: combo.nome } })}
                                />
                            ))}
                        </div>

                        {combos?.length === 0 && (
                            <p className="text-gray-500 text-center mt-10">
                                Nenhum combo cadastrado.
                            </p>
                        )}

                        {/* Modal de Criar */}
                        <Modal aberto={modal.tipo === 'criar'} onFechar={fecharModal}>
                            <FormCombo
                                produtos={produtos || []}
                                onSalvar={handleCadastrar}
                                onCancelar={fecharModal}
                            />
                        </Modal>

                        {/* Modal de Editar */}
                        <Modal aberto={modal.tipo === 'editar'} onFechar={fecharModal}>
                            <FormCombo
                                combo={modal.dados}
                                produtos={produtos || []}
                                onSalvar={handleEditar}
                                onCancelar={fecharModal}
                            />
                        </Modal>

                        {/* Modal de Deletar */}
                        <Modal aberto={modal.tipo === 'deletar'} onFechar={fecharModal}>
                            <Feedback
                                tipo="confirmacao"
                                mensagem={`Tem certeza que deseja deletar o combo "${modal.dados?.nome}"?`}
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

export default Combos;