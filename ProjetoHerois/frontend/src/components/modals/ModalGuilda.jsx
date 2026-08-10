import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import guildaService from '../../services/guildaService';
import useAuth from '../../hooks/useAuth';
import Botao from '../ui/Botao';
import Input from '../ui/Input';

const ELEMENTOS = [
    { valor: 'normal', label: 'Normal', custo: 0 },
    { valor: 'fogo', label: 'Fogo', custo: 50 },
    { valor: 'agua', label: 'Água', custo: 50 },
    { valor: 'natureza', label: 'Natureza', custo: 50 },
    { valor: 'luz', label: 'Luz', custo: 100 },
    { valor: 'trevas', label: 'Trevas', custo: 100 },
    { valor: 'lendario', label: 'Lendário', custo: 200 },
    { valor: 'atemporal', label: 'Atemporal', custo: 200 }
];

export default function ModalGuilda({ aberto, onClose }) {
    const [nome, setNome] = useState('');
    const [elemento, setElemento] = useState('normal');
    const [erro, setErro] = useState('');
    const { atualizarUsuario } = useAuth();
    const queryClient = useQueryClient();

    const criarMutation = useMutation({
        mutationFn: () => guildaService.criar({ nome, elemento }),
        onSuccess: (data) => {
            atualizarUsuario({ moedas: data.usuario.moedas });
            queryClient.invalidateQueries(['guildas']);
            setNome('');
            setElemento('normal');
            setErro('');
            onClose();
        },
        onError: (error) => {
            setErro(error.response?.data?.mensagem || 'Erro ao criar guilda');
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        setErro('');

        if (nome.length < 2) {
            setErro('Nome deve ter pelo menos 2 caracteres');
            return;
        }

        criarMutation.mutate();
    }

    if (!aberto) return null;

    const elementoSelecionado = ELEMENTOS.find(el => el.valor === elemento);

    return (
        <div className="fixed inset-0 bg-bg/90 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-surface rounded-2xl p-8 max-w-md w-full mx-4 border border-text-muted/10" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-display font-bold text-2xl text-accent text-center mb-6">
                    Criar Guilda
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        label="Nome da Guilda"
                        placeholder="Ex: Guardiões de Fogo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    {/* Seleção de elemento */}
                    <div>
                        <label className="text-text-muted text-sm mb-2 block">
                            Elemento
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {ELEMENTOS.map((el) => (
                                <button
                                    key={el.valor}
                                    type="button"
                                    onClick={() => setElemento(el.valor)}
                                    className={`
                                        px-3 py-2 rounded-lg text-sm
                                        border transition-all cursor-pointer
                                        ${elemento === el.valor
                                            ? 'border-accent bg-accent/10 text-accent'
                                            : 'border-text-muted/20 text-text-muted hover:border-text-muted/40'
                                        }
                                    `}
                                >
                                    {el.label}
                                    {el.custo > 0 && (
                                        <span className="text-xs ml-1">({el.custo}🪙)</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="text-center text-text-muted text-sm">
                        Custo: <span className="text-accent font-bold">
                            {elementoSelecionado?.custo || 0} moedas
                        </span>
                    </div>

                    {erro && <p className="text-danger text-sm text-center">{erro}</p>}

                    <Botao tipo="submit" desabilitado={criarMutation.isPending} className="w-full">
                        {criarMutation.isPending ? 'Criando...' : 'Criar Guilda'}
                    </Botao>

                    <Botao variante="secundario" onClick={onClose} className="w-full">
                        Cancelar
                    </Botao>
                </form>
            </div>
        </div>
    );
}