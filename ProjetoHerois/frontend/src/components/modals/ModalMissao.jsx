import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import missaoService from '../../services/missaoService';
import useAuth from '../../hooks/useAuth';
import Botao from '../ui/Botao';

export default function ModalMissao({ aberto, onClose, missao, guildas }) {
    const [guildaSelecionada, setGuildaSelecionada] = useState(null);
    const [resultado, setResultado] = useState(null);
    const [mostrandoAnimacao, setMostrandoAnimacao] = useState(false);
    const { atualizarUsuario } = useAuth();
    const queryClient = useQueryClient();

    const executarMutation = useMutation({
        mutationFn: (guildaId) => missaoService.executarMissao(missao?.id, guildaId),
        onSuccess: (data) => {
            setMostrandoAnimacao(true);

            setTimeout(() => {
                setResultado(data);
                setMostrandoAnimacao(false);

                if (data.venceu && data.usuario) {
                    atualizarUsuario(data.usuario);
                }

                queryClient.invalidateQueries(['missoes']);
                queryClient.invalidateQueries(['guildas']);
            }, 2000);
        },
        onError: (error) => {
            setResultado({ erro: error.response?.data?.mensagem || 'Erro ao executar missão' });
        }
    });

    function handleExecutar() {
        if (!guildaSelecionada) return;
        setResultado(null);
        executarMutation.mutate(guildaSelecionada);
    }

    function handleClose() {
        setResultado(null);
        setGuildaSelecionada(null);
        onClose();
    }

    if (!aberto || !missao) return null;

    return (
        <div className="fixed inset-0 bg-bg/90 backdrop-blur-sm z-50 flex items-center justify-center" onClick={handleClose}>
            <div className="bg-surface rounded-2xl p-8 max-w-md w-full mx-4 border border-text-muted/10" onClick={(e) => e.stopPropagation()}>

                {/* Animação de combate */}
                {mostrandoAnimacao && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="text-6xl animate-bounce">⚔️</div>
                        <p className="text-accent font-bold mt-4">Em combate...</p>
                    </div>
                )}

                {/* Resultado */}
                {resultado && !mostrandoAnimacao && (
                    <div className="text-center">
                        {resultado.erro ? (
                            <p className="text-danger">{resultado.erro}</p>
                        ) : resultado.venceu ? (
                            <>
                                <div className="text-6xl mb-4">🏆</div>
                                <h2 className="font-display font-bold text-2xl text-accent mb-4">
                                    Vitória!
                                </h2>
                                <div className="flex flex-col gap-2 text-sm mb-4">
                                    <span className="text-text-muted">
                                        Poder da Guilda: <span className="text-accent">{resultado.poder_guilda}</span>
                                    </span>
                                    <span className="text-text-muted">
                                        Poder do Inimigo: <span className="text-danger">{resultado.poder_inimigo}</span>
                                    </span>
                                </div>
                                <div className="bg-surface-light rounded-lg p-4">
                                    <p className="text-text-muted text-sm mb-2">Recompensas:</p>
                                    <div className="flex justify-center gap-4">
                                        <span className="text-accent">🪙 {resultado.recompensas.moedas}</span>
                                        <span className="text-accent">⭐ {resultado.recompensas.xp_recrutador} XP</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-6xl mb-4">💀</div>
                                <h2 className="font-display font-bold text-2xl text-danger mb-4">
                                    Derrota
                                </h2>
                                <div className="flex flex-col gap-2 text-sm">
                                    <span className="text-text-muted">
                                        Poder da Guilda: <span className="text-accent">{resultado.poder_guilda}</span>
                                    </span>
                                    <span className="text-text-muted">
                                        Poder do Inimigo: <span className="text-danger">{resultado.poder_inimigo}</span>
                                    </span>
                                </div>
                                <p className="text-text-muted text-sm mt-4">
                                    Guilda descansando por 5 minutos...
                                </p>
                            </>
                        )}

                        <Botao onClick={handleClose} className="w-full mt-6">
                            Fechar
                        </Botao>
                    </div>
                )}

                {/* Seleção de guilda */}
                {!resultado && !mostrandoAnimacao && (
                    <>
                        <h2 className="font-display font-bold text-2xl text-accent text-center mb-2">
                            {missao.nome}
                        </h2>
                        <p className="text-text-muted text-sm text-center mb-6">
                            {missao.descricao}
                        </p>

                        <div className="mb-4">
                            <label className="text-text-muted text-sm mb-2 block">
                                Escolha sua Guilda
                            </label>
                            {guildas?.length > 0 ? (
                                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                                    {guildas.map((guilda) => (
                                        <button
                                            key={guilda.id}
                                            onClick={() => setGuildaSelecionada(guilda.id)}
                                            className={`
                                                px-4 py-3 rounded-lg text-left text-sm
                                                border transition-all cursor-pointer
                                                ${guildaSelecionada === guilda.id
                                                    ? 'border-accent bg-accent/10 text-accent'
                                                    : 'border-text-muted/20 text-text-muted hover:border-text-muted/40'
                                                }
                                            `}
                                        >
                                            {guilda.nome}
                                            <span className="text-xs ml-2 text-text-muted">
                                                ({guilda.elemento} • {guilda.herois?.length || 0} heróis)
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-text-muted text-sm text-center">
                                    Você não tem guildas. Crie uma primeiro.
                                </p>
                            )}
                        </div>

                        <Botao
                            onClick={handleExecutar}
                            desabilitado={!guildaSelecionada || executarMutation.isPending}
                            className="w-full"
                        >
                            {executarMutation.isPending ? 'Executando...' : 'Executar Missão'}
                        </Botao>

                        <Botao variante="secundario" onClick={handleClose} className="w-full mt-2">
                            Cancelar
                        </Botao>
                    </>
                )}
            </div>
        </div>
    );
}