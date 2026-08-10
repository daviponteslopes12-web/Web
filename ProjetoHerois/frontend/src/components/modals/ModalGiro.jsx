export default function ModalGiro({ aberto, onClose, resultado }) {
    if (!aberto || !resultado) return null;

    const herois = resultado.resultados || [];

    return (
        <div className="fixed inset-0 bg-bg/90 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-surface rounded-2xl p-8 max-w-lg w-full mx-4 border border-text-muted/10" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-display font-bold text-2xl text-accent text-center mb-6">
                    Heróis Obtidos!
                </h2>

                {/* Cards dos heróis */}
                <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
                    {herois.map((item, index) => (
                        <div
                            key={index}
                            className={`
                                bg-surface-light rounded-xl p-4 flex items-center gap-4
                                border-2 ${item.tipo === 'novo' ? 'border-accent' : 'border-text-muted/20'}
                            `}
                        >
                            <img
                                src={item.heroi.imagem_heroi}
                                alt={item.heroi.nome_heroi}
                                className="w-20 h-20 rounded-lg object-cover bg-bg"
                            />
                            <div className="flex-1">
                                <h3 className="font-bold text-text-primary">
                                    {item.heroi.nome_heroi}
                                </h3>
                                {item.tipo === 'novo' ? (
                                    <div className="flex gap-2 mt-1">
                                        <span className={`text-xs text-rarity-${item.heroi.raridade}`}>
                                            {item.heroi.raridade}
                                        </span>
                                        <span className={`text-xs text-elemento-${item.heroi.elemento}`}>
                                            {item.heroi.elemento}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-text-muted text-xs">
                                        Repetido! +{item.heroi.xpGanho} XP
                                    </span>
                                )}
                            </div>
                            {item.tipo === 'novo' && (
                                <span className="text-accent font-bold text-lg">✨</span>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-6 py-3 bg-accent text-bg rounded-lg font-bold
                               hover:bg-accent-hover transition-colors cursor-pointer"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
}