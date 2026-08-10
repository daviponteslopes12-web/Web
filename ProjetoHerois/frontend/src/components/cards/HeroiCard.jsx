const coresRaridade = {
    comum: 'border-rarity-comum',
    raro: 'border-rarity-raro',
    epico: 'border-rarity-epico',
    lendario: 'border-rarity-lendario',
    mitico: 'border-rarity-mitico',
    secreto: 'border-rarity-secreto'
};

export default function HeroiCard({ heroi, onClick }) {
    const progressoXp = (heroi.xp / (heroi.nivel * 50)) * 100;

    return (
        <div
            onClick={onClick}
            className={`
                bg-surface rounded-xl border-2 p-4 cursor-pointer
                hover:scale-105 hover:-translate-y-1 transition-all duration-200
                ${coresRaridade[heroi.raridade] || 'border-text-muted/20'}
            `}
        >
            {/* Imagem */}
            <div className="relative mb-3">
                <img
                    src={heroi.imagem_heroi}
                    alt={heroi.nome_heroi}
                    className="w-full aspect-square object-cover rounded-lg bg-surface-light"
                />
                <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold uppercase bg-bg/80 text-rarity-${heroi.raridade}`}>
                    {heroi.raridade}
                </span>
            </div>

            {/* Nome */}
            <h3 className="font-bold text-sm text-text-primary truncate mb-1">
                {heroi.nome_heroi}
            </h3>

            {/* Elemento + Classe */}
            <div className="flex gap-2 mb-2">
                <span className={`text-xs text-elemento-${heroi.elemento}`}>
                    {heroi.elemento}
                </span>
                <span className="text-xs text-text-muted">
                    {heroi.classe}
                </span>
            </div>

            {/* Poder + Nível */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-accent font-bold text-sm">
                    ⚡ {heroi.poder_base}
                </span>
                <span className="text-text-muted text-xs">
                    Lv.{heroi.nivel}
                </span>
            </div>

            {/* Barra de XP */}
            <div className="w-full h-1.5 bg-surface-light rounded-full overflow-hidden">
                <div
                    className="h-full bg-accent rounded-full transition-all duration-300"
                    style={{ width: `${progressoXp}%` }}
                />
            </div>
        </div>
    );
}