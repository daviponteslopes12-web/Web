import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import missaoService from '../services/missaoService';
import guildaService from '../services/guildaService';
import MissaoCard from '../components/cards/MissaoCard';
import ModalMissao from '../components/modals/ModalMissao';
import Loader from '../components/ui/Loader';
import PageContainer from '../components/ui/PageContainer';

export default function Missoes() {
    const [modalAberto, setModalAberto] = useState(false);
    const [missaoSelecionada, setMissaoSelecionada] = useState(null);

    const { data: missoes, isLoading: carregandoMissoes } = useQuery({
        queryKey: ['missoes'],
        queryFn: () => missaoService.listarMissoes(),
        refetchInterval: 30000
    });

    const { data: guildas, isLoading: carregandoGuildas } = useQuery({
        queryKey: ['guildas'],
        queryFn: () => guildaService.listarDoUsuario()
    });

    function handleExecutar(missao) {
        setMissaoSelecionada(missao);
        setModalAberto(true);
    }

    function handleCloseModal() {
        setModalAberto(false);
        setMissaoSelecionada(null);
    }

    if (carregandoMissoes || carregandoGuildas) return <Loader />;

    return (
        <PageContainer>
            <div>
                <h1 className="font-display font-bold text-3xl text-text-primary mb-2">
                    Missões
                </h1>
                <p className="text-text-muted mb-8">
                    Escolha uma missão e envie sua guilda
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {missoes?.map((missao) => (
                        <MissaoCard
                            key={missao.id}
                            missao={missao}
                            onExecutar={handleExecutar}
                        />
                    ))}
                </div>

                <ModalMissao
                    aberto={modalAberto}
                    onClose={handleCloseModal}
                    missao={missaoSelecionada}
                    guildas={guildas}
                />
            </div>
        </PageContainer>
    );
}