import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import heroiService from '../services/heroiService';
import Botao from '../components/ui/Botao';
import Loader from '../components/ui/Loader';
import PageContainer from '../components/ui/PageContainer';

export default function TodosHerois() {
    const [pagina, setPagina] = useState(1);
    const limite = 20;

    const { data, isLoading } = useQuery({
        queryKey: ['todosHerois', pagina],
        queryFn: () => heroiService.listarTodos(pagina, limite)
    });

    if (isLoading) return <Loader />;

    return (
        <PageContainer>
            <div>
                <h1 className="font-display font-bold text-3xl text-text-primary mb-2">
                    Todos os Heróis
                </h1>
                <p className="text-text-muted mb-8">
                    {data?.total || 0} heróis disponíveis
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
                    {data?.herois?.map((heroi) => (
                        <div
                            key={heroi.heroi_api_id}
                            className="bg-surface rounded-xl p-4 border border-text-muted/10"
                        >
                            <img
                                src={heroi.imagem}
                                alt={heroi.nome}
                                className="w-full aspect-square object-cover rounded-lg bg-surface-light mb-3"
                            />
                            <h3 className="font-bold text-sm text-text-primary truncate">
                                {heroi.nome}
                            </h3>
                            <div className="flex gap-2 mt-1 text-xs text-text-muted">
                                <span>STR: {heroi.strength}</span>
                                <span>SPD: {heroi.speed}</span>
                            </div>
                            <div className="flex gap-2 text-xs text-text-muted">
                                <span>INT: {heroi.intelligence}</span>
                                <span>PWR: {heroi.power_stat}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Paginação */}
                <div className="flex items-center justify-center gap-4">
                    <Botao
                        variante="secundario"
                        onClick={() => setPagina((p) => Math.max(1, p - 1))}
                        desabilitado={pagina === 1}
                    >
                        Anterior
                    </Botao>

                    <span className="text-text-muted">
                        {data?.pagina} / {data?.totalPaginas}
                    </span>

                    <Botao
                        variante="secundario"
                        onClick={() => setPagina((p) => Math.min(data?.totalPaginas, p + 1))}
                        desabilitado={pagina === data?.totalPaginas}
                    >
                        Próxima
                    </Botao>
                </div>
            </div>
        </PageContainer>
    );
}