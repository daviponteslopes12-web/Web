import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import heroiService from '../services/heroiService';
import useAuth from '../hooks/useAuth';
import HeroiCard from '../components/cards/HeroiCard';
import ModalGiro from '../components/modals/ModalGiro';
import Botao from '../components/ui/Botao';
import Loader from '../components/ui/Loader';
import PageContainer from '../components/ui/PageContainer';

export default function Dashboard() {
    const [modalAberto, setModalAberto] = useState(false);
    const [resultadoGiro, setResultadoGiro] = useState(null);
    const { usuario, atualizarUsuario } = useAuth();
    const queryClient = useQueryClient();

    const { data: herois, isLoading } = useQuery({
        queryKey: ['herois'],
        queryFn: () => heroiService.listarDoUsuario()
    });

    const sortearMutation = useMutation({
        mutationFn: () => heroiService.sortear(),
        onSuccess: (data) => {
            setResultadoGiro(data);
            setModalAberto(true);
            atualizarUsuario(data.usuario);
            queryClient.invalidateQueries(['herois']);
        }
    });

    function handleFecharModal() {
        setModalAberto(false);
        setResultadoGiro(null);
    }

    if (isLoading) return <Loader />;

    const heroisPreview = herois?.slice(0, 6) || [];

    return (
        <PageContainer>
            <div>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="font-display font-bold text-3xl text-text-primary">
                            Dashboard
                        </h1>
                        <p className="text-text-muted mt-1">
                            Bem-vindo, {usuario?.nome}
                        </p>
                    </div>

                    <Botao
                        onClick={() => sortearMutation.mutate()}
                        desabilitado={sortearMutation.isPending}
                    >
                        {sortearMutation.isPending ? 'Girando...' : '🎲 Girar Caixa'}
                    </Botao>
                </div>

                {/* Acesso rápido */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <Link to="/galeria">
                        <div className="bg-surface rounded-xl p-5 border border-text-muted/10 hover:border-accent/30 transition-colors">
                            <span className="text-3xl">📦</span>
                            <h3 className="font-bold text-text-primary mt-2">Galeria</h3>
                            <p className="text-text-muted text-sm">{herois?.length || 0} heróis</p>
                        </div>
                    </Link>
                    <Link to="/herois">
                        <div className="bg-surface rounded-xl p-5 border border-text-muted/10 hover:border-accent/30 transition-colors">
                            <span className="text-3xl">🦸</span>
                            <h3 className="font-bold text-text-primary mt-2">Heróis</h3>
                            <p className="text-text-muted text-sm">Todos disponíveis</p>
                        </div>
                    </Link>
                    <Link to="/missoes">
                        <div className="bg-surface rounded-xl p-5 border border-text-muted/10 hover:border-accent/30 transition-colors">
                            <span className="text-3xl">⚔️</span>
                            <h3 className="font-bold text-text-primary mt-2">Missões</h3>
                            <p className="text-text-muted text-sm">12 missões</p>
                        </div>
                    </Link>
                    <Link to="/loja">
                        <div className="bg-surface rounded-xl p-5 border border-text-muted/10 hover:border-accent/30 transition-colors">
                            <span className="text-3xl">🏪</span>
                            <h3 className="font-bold text-text-primary mt-2">Loja</h3>
                            <p className="text-text-muted text-sm">Itens e boosts</p>
                        </div>
                    </Link>
                    <Link to="/guildas">
                        <div className="bg-surface rounded-xl p-5 border border-text-muted/10 hover:border-accent/30 transition-colors">
                            <span className="text-3xl">🏰</span>
                            <h3 className="font-bold text-text-primary mt-2">Guildas</h3>
                            <p className="text-text-muted text-sm">Organizar heróis</p>
                        </div>
                    </Link>
                </div>

                {/* Heróis recentes */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-xl text-text-primary">
                        Seus Heróis
                    </h2>
                    {herois?.length > 6 && (
                        <Link to="/galeria" className="text-accent text-sm hover:text-accent-hover">
                            Ver todos →
                        </Link>
                    )}
                </div>

                {heroisPreview.length > 0 ? (
                    <div className="grid grid-cols-6 gap-4">
                        {heroisPreview.map((heroi, index) => (
                            <HeroiCard
                                key={heroi.id}
                                heroi={heroi}
                                animacaoDelay={index * 0.05}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-surface rounded-xl p-12 text-center border border-text-muted/10">
                        <p className="text-text-muted text-lg mb-4">
                            Você ainda não tem heróis
                        </p>
                        <Botao onClick={() => sortearMutation.mutate()}>
                            🎲 Girar sua primeira caixa
                        </Botao>
                    </div>
                )}

                <ModalGiro
                    aberto={modalAberto}
                    onClose={handleFecharModal}
                    resultado={resultadoGiro}
                />
            </div>
        </PageContainer>
    );
}