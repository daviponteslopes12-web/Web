import { useQuery } from '@tanstack/react-query';
import heroiService from '../services/heroiService';
import HeroiCard from '../components/cards/HeroiCard';
import Loader from '../components/ui/Loader';
import PageContainer from '../components/ui/PageContainer';

export default function Galeria() {
    const { data: herois, isLoading } = useQuery({
        queryKey: ['herois'],
        queryFn: () => heroiService.listarDoUsuario()
    });

    if (isLoading) return <Loader />;

    return (
        <PageContainer>
            <div>
                <h1 className="font-display font-bold text-3xl text-text-primary mb-2">
                    Galeria
                </h1>
                <p className="text-text-muted mb-8">
                    {herois?.length || 0} heróis no seu inventário
                </p>

                {herois?.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {herois.map((heroi, index) => (
                            <HeroiCard
                                key={heroi.id}
                                heroi={heroi}
                                animacaoDelay={index * 0.03}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-surface rounded-xl p-12 text-center border border-text-muted/10">
                        <p className="text-text-muted text-lg">
                            Nenhum herói ainda. Vá ao Dashboard e gire uma caixa!
                        </p>
                    </div>
                )}
            </div>
        </PageContainer>
    );
}