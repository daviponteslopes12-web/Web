import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import lojaService from '../services/lojaService';
import useAuth from '../hooks/useAuth';
import Botao from '../components/ui/Botao';
import Loader from '../components/ui/Loader';
import PageContainer from '../components/ui/PageContainer';

export default function Loja() {
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const { atualizarUsuario } = useAuth();
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ['loja'],
        queryFn: () => lojaService.listarLoja(),
        refetchInterval: 60000
    });

    const comprarItemMutation = useMutation({
        mutationFn: (itemId) => lojaService.comprarItem(itemId),
        onSuccess: (data) => {
            setSucesso(data.mensagem);
            setErro('');
            if (data.usuario) atualizarUsuario(data.usuario);
            if (data.caixa_atual) atualizarUsuario({ caixa_atual: data.caixa_atual });
            queryClient.invalidateQueries(['loja']);
            setTimeout(() => setSucesso(''), 3000);
        },
        onError: (error) => {
            setErro(error.response?.data?.mensagem || 'Erro ao comprar item');
            setSucesso('');
            setTimeout(() => setErro(''), 3000);
        }
    });

    const comprarHeroiMutation = useMutation({
        mutationFn: (lojaId) => lojaService.comprarHeroi(lojaId),
        onSuccess: (data) => {
            setSucesso('Herói comprado com sucesso!');
            setErro('');
            if (data.usuario) atualizarUsuario(data.usuario);
            queryClient.invalidateQueries(['loja']);
            queryClient.invalidateQueries(['herois']);
            setTimeout(() => setSucesso(''), 3000);
        },
        onError: (error) => {
            setErro(error.response?.data?.mensagem || 'Erro ao comprar herói');
            setSucesso('');
            setTimeout(() => setErro(''), 3000);
        }
    });

    if (isLoading) return <Loader />;

    return (
        <PageContainer>
            <div>
                <h1 className="font-display font-bold text-3xl text-text-primary mb-2">
                    Loja
                </h1>
                <p className="text-text-muted mb-8">
                    Compre itens, caixas e heróis
                </p>

                {erro && (
                    <div className="bg-danger/10 border border-danger/30 text-danger rounded-lg p-4 mb-4 text-sm">
                        {erro}
                    </div>
                )}
                {sucesso && (
                    <div className="bg-elemento-natureza/10 border border-elemento-natureza/30 text-elemento-natureza rounded-lg p-4 mb-4 text-sm">
                        {sucesso}
                    </div>
                )}

                {/* Itens fixos */}
                <h2 className="font-bold text-xl text-text-primary mb-4">
                    Itens
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                    {data?.itens_fixos?.map((item) => (
                        <div
                            key={item.id}
                            className="bg-surface rounded-xl p-5 border border-text-muted/10"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-bold text-text-primary text-sm">
                                    {item.nome}
                                </h3>
                                <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">
                                    {item.tipo === 'caixa' ? 'Caixa' :
                                        item.tipo === 'boost_herois' ? 'Heróis' : 'Auto'}
                                </span>
                            </div>

                            <p className="text-text-muted text-xs mb-3">{item.descricao}</p>

                            {item.comprado && (
                                <p className="text-text-muted text-xs mb-2">
                                    Nível: {item.comprado.nivel_boost}
                                </p>
                            )}

                            <div className="flex items-center justify-between">
                                <span className="text-accent font-bold">
                                    {item.preco > 0 ? `🪙 ${item.preco}` : 'Grátis'}
                                </span>

                                <Botao
                                    onClick={() => comprarItemMutation.mutate(item.id)}
                                    desabilitado={!item.podeComprar || comprarItemMutation.isPending}
                                    className="text-xs px-4 py-2"
                                >
                                    {item.motivo || 'Comprar'}
                                </Botao>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Loja rotativa */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-xl text-text-primary">
                        Heróis à Venda
                    </h2>
                    <span className="text-text-muted text-xs">
                        Renova a cada 15 minutos
                    </span>
                </div>

                {data?.herois_rotativos?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.herois_rotativos.map((heroi) => (
                            <div
                                key={heroi.id}
                                className={`bg-surface rounded-xl p-5 border-2 border-rarity-${heroi.raridade}`}
                            >
                                <img
                                    src={heroi.imagem_heroi}
                                    alt={heroi.nome_heroi}
                                    className="w-24 h-24 rounded-lg object-cover bg-surface-light mx-auto mb-3"
                                />
                                <h3 className="font-bold text-text-primary text-center">
                                    {heroi.nome_heroi}
                                </h3>
                                <div className="flex justify-center gap-2 mt-1">
                                    <span className={`text-xs text-rarity-${heroi.raridade}`}>
                                        {heroi.raridade}
                                    </span>
                                    <span className={`text-xs text-elemento-${heroi.elemento}`}>
                                        {heroi.elemento}
                                    </span>
                                </div>
                                <div className="text-center mt-2">
                                    <span className="text-accent font-bold text-lg">
                                        🪙 {heroi.preco}
                                    </span>
                                </div>
                                <Botao
                                    onClick={() => comprarHeroiMutation.mutate(heroi.id)}
                                    desabilitado={comprarHeroiMutation.isPending}
                                    className="w-full mt-3"
                                >
                                    Comprar
                                </Botao>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-surface rounded-xl p-8 text-center border border-text-muted/10">
                        <p className="text-text-muted">Nenhum herói disponível no momento</p>
                    </div>
                )}
            </div>
        </PageContainer>
    );
}