import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import guildaService from '../services/guildaService';
import heroiService from '../services/heroiService';
import ModalGuilda from '../components/modals/ModalGuilda';
import Botao from '../components/ui/Botao';
import Loader from '../components/ui/Loader';
import PageContainer from '../components/ui/PageContainer';

const coresElemento = {
    normal: 'border-elemento-normal text-elemento-normal',
    fogo: 'border-elemento-fogo text-elemento-fogo',
    agua: 'border-elemento-agua text-elemento-agua',
    natureza: 'border-elemento-natureza text-elemento-natureza',
    luz: 'border-elemento-luz text-elemento-luz',
    trevas: 'border-elemento-trevas text-elemento-trevas',
    lendario: 'border-elemento-lendario text-elemento-lendario',
    atemporal: 'border-elemento-atemporal text-elemento-atemporal'
};

export default function Guildas() {
    const [modalAberto, setModalAberto] = useState(false);
    const [guildaExpandida, setGuildaExpandida] = useState(null);
    const [erro, setErro] = useState('');
    const queryClient = useQueryClient();

    const { data: guildas, isLoading: carregandoGuildas } = useQuery({
        queryKey: ['guildas'],
        queryFn: () => guildaService.listarDoUsuario()
    });

    const { data: herois, isLoading: carregandoHerois } = useQuery({
        queryKey: ['herois'],
        queryFn: () => heroiService.listarDoUsuario()
    });

    const adicionarMutation = useMutation({
        mutationFn: ({ guildaId, heroiId }) => guildaService.adicionarHeroi(guildaId, heroiId),
        onSuccess: () => {
            queryClient.invalidateQueries(['guildas']);
            queryClient.invalidateQueries(['herois']);
            setErro('');
        },
        onError: (error) => {
            setErro(error.response?.data?.mensagem || 'Erro ao adicionar herói');
        }
    });

    const removerMutation = useMutation({
        mutationFn: ({ guildaId, heroiId }) => guildaService.removerHeroi(guildaId, heroiId),
        onSuccess: () => {
            queryClient.invalidateQueries(['guildas']);
            queryClient.invalidateQueries(['herois']);
            setErro('');
        },
        onError: (error) => {
            setErro(error.response?.data?.mensagem || 'Erro ao remover herói');
        }
    });

    const deletarMutation = useMutation({
        mutationFn: (guildaId) => guildaService.deletar(guildaId),
        onSuccess: () => {
            queryClient.invalidateQueries(['guildas']);
            queryClient.invalidateQueries(['herois']);
            setGuildaExpandida(null);
        },
        onError: (error) => {
            setErro(error.response?.data?.mensagem || 'Erro ao deletar guilda');
        }
    });

    if (carregandoGuildas || carregandoHerois) return <Loader />;

    // Heróis que não estão em nenhuma guilda
    const heroisDisponiveis = herois?.filter(h => !h.guilda_id) || [];

    return (
        <PageContainer>
            <div>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="font-display font-bold text-3xl text-text-primary">
                            Guildas
                        </h1>
                        <p className="text-text-muted mt-1">
                            Crie guildas e organize seus heróis
                        </p>
                    </div>

                    <Botao onClick={() => setModalAberto(true)}>
                        + Criar Guilda
                    </Botao>
                </div>

                {erro && (
                    <div className="bg-danger/10 border border-danger/30 text-danger rounded-lg p-4 mb-4 text-sm">
                        {erro}
                    </div>
                )}

                {guildas?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {guildas.map((guilda) => (
                            <div
                                key={guilda.id}
                                className={`bg-surface rounded-xl p-5 border-2 ${coresElemento[guilda.elemento] || 'border-text-muted/20'}`}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-text-primary">
                                            {guilda.nome}
                                        </h3>
                                        <span className={`text-xs ${coresElemento[guilda.elemento]}`}>
                                            {guilda.elemento}
                                        </span>
                                    </div>
                                    <span className="text-text-muted text-xs">
                                        {guilda.herois?.length || 0}/6 heróis
                                    </span>
                                </div>

                                {/* Heróis da guilda */}
                                <div className="flex flex-col gap-2 mb-4">
                                    {guilda.herois?.map((heroi) => (
                                        <div
                                            key={heroi.id}
                                            className="flex items-center gap-3 bg-surface-light rounded-lg p-2"
                                        >
                                            <img
                                                src={heroi.imagem_heroi}
                                                alt={heroi.nome_heroi}
                                                className="w-10 h-10 rounded object-cover"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-text-primary text-sm truncate">
                                                    {heroi.nome_heroi}
                                                </p>
                                                <p className="text-text-muted text-xs">
                                                    Lv.{heroi.nivel} • ⚡{heroi.poder_base}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removerMutation.mutate({
                                                    guildaId: guilda.id,
                                                    heroiId: heroi.id
                                                })}
                                                className="text-danger/50 hover:text-danger text-xs cursor-pointer"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Adicionar herói */}
                                {(guilda.herois?.length || 0) < 6 && (
                                    <div>
                                        {guildaExpandida === guilda.id ? (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-text-muted text-xs">
                                                        Escolher herói:
                                                    </span>
                                                    <button
                                                        onClick={() => setGuildaExpandida(null)}
                                                        className="text-text-muted text-xs hover:text-text-primary cursor-pointer"
                                                    >
                                                        Fechar
                                                    </button>
                                                </div>
                                                <div className="max-h-40 overflow-y-auto flex flex-col gap-1">
                                                    {heroisDisponiveis.length > 0 ? (
                                                        heroisDisponiveis.map((heroi) => (
                                                            <button
                                                                key={heroi.id}
                                                                onClick={() => {
                                                                    adicionarMutation.mutate({
                                                                        guildaId: guilda.id,
                                                                        heroiId: heroi.id
                                                                    });
                                                                    setGuildaExpandida(null);
                                                                }}
                                                                className="flex items-center gap-2 p-2 rounded-lg
                                                                       hover:bg-surface-light text-left cursor-pointer"
                                                            >
                                                                <img
                                                                    src={heroi.imagem_heroi}
                                                                    alt={heroi.nome_heroi}
                                                                    className="w-8 h-8 rounded object-cover"
                                                                />
                                                                <span className="text-text-primary text-xs truncate">
                                                                    {heroi.nome_heroi}
                                                                </span>
                                                            </button>
                                                        ))
                                                    ) : (
                                                        <p className="text-text-muted text-xs text-center py-2">
                                                            Nenhum herói disponível
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <Botao
                                                variante="secundario"
                                                onClick={() => setGuildaExpandida(guilda.id)}
                                                className="w-full text-xs py-2"
                                            >
                                                + Adicionar Herói
                                            </Botao>
                                        )}
                                    </div>
                                )}

                                {/* Deletar guilda */}
                                <button
                                    onClick={() => deletarMutation.mutate(guilda.id)}
                                    className="w-full mt-3 py-2 text-danger/50 hover:text-danger text-xs
                                           hover:bg-danger/10 rounded-lg transition-colors cursor-pointer"
                                >
                                    Deletar Guilda
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-surface rounded-xl p-12 text-center border border-text-muted/10">
                        <p className="text-text-muted text-lg mb-4">
                            Você ainda não tem guildas
                        </p>
                        <Botao onClick={() => setModalAberto(true)}>
                            + Criar Primeira Guilda
                        </Botao>
                    </div>
                )}

                <ModalGuilda
                    aberto={modalAberto}
                    onClose={() => setModalAberto(false)}
                />
            </div>
        </PageContainer>
    );
}