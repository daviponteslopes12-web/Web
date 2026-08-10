const coresDificuldade = {
    facil: 'text-elemento-natureza border-elemento-natureza/30',
    medio: 'text-accent border-accent/30',
    dificil: 'text-danger border-danger/30',
    especial: 'text-rarity-secreto border-rarity-secreto/30'
};

const coresElemento = {
    fogo: 'bg-elemento-fogo/10 text-elemento-fogo',
    agua: 'bg-elemento-agua/10 text-elemento-agua',
    natureza: 'bg-elemento-natureza/10 text-elemento-natureza',
    luz: 'bg-elemento-luz/10 text-elemento-luz',
    trevas: 'bg-elemento-trevas/10 text-elemento-trevas',
    lendario: 'bg-elemento-lendario/10 text-elemento-lendario',
    atemporal: 'bg-elemento-atemporal/10 text-elemento-atemporal',
    normal: 'bg-elemento-normal/10 text-elemento-normal'
};

export default function MissaoCard({ missao, onExecutar }) {
    const estaDisponivel = missao.status === 'disponivel';

    function getTempoRestante() {
        if (!missao.pode_refazer_em) return null;
        const diff = new Date(missao.pode_refazer_em) - new Date();
        if (diff <= 0) return null;
        const minutos = Math.ceil(diff / 60000);
        return `${minutos}min`;
    }

    return (
        <div className={`
            bg-surface rounded-xl border p-5
            ${coresDificuldade[missao.dificuldade]}
            ${!estaDisponivel ? 'opacity-60' : ''}
        `}>
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="font-bold text-text-primary text-sm">
                        {missao.nome}
                    </h3>
                    <p className="text-text-muted text-xs mt-1">
                        {missao.descricao}
                    </p>
                </div>
                {missao.eh_especial && (
                    <span className="text-rarity-secreto text-xs font-bold">
                        ⭐ ESPECIAL
                    </span>
                )}
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-3">
                <span className={`px-2 py-1 rounded text-xs ${coresElemento[missao.elemento]}`}>
                    {missao.elemento}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${coresDificuldade[missao.dificuldade]}`}>
                    {missao.dificuldade}
                </span>
            </div>

            {/* Poder inimigo */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-text-muted text-xs">Poder inimigo:</span>
                <span className="text-danger font-bold text-sm">{missao.poder_inimigo}</span>
            </div>

            {/* Recompensas */}
            <div className="flex gap-4 mb-4 text-xs text-text-muted">
                <span>🪙 {missao.recompensa_moedas}</span>
                <span>⭐ {missao.recompensa_xp} XP</span>
            </div>

            {/* Ação */}
            {estaDisponivel && (
                <button
                    onClick={() => onExecutar(missao)}
                    className="w-full py-2 bg-accent text-bg rounded-lg font-bold text-sm
                               hover:bg-accent-hover transition-colors cursor-pointer"
                >
                    Executar Missão
                </button>
            )}

            {!estaDisponivel && (
                <div className="text-center text-text-muted text-xs">
                    ⏳ Cooldown: {getTempoRestante() || 'Carregando...'}
                </div>
            )}
        </div>
    );
}