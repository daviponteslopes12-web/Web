export default function Botao({ children, variante = 'primario', desabilitado = false, onClick, tipo = 'button', className = '' }) {
    const estilos = {
        primario: 'bg-accent text-bg hover:bg-accent-hover font-bold',
        secundario: 'bg-surface-light text-text-primary hover:bg-surface border border-text-muted/20',
        perigo: 'bg-danger/20 text-danger hover:bg-danger/30 border border-danger/30'
    };

    return (
        <button
            type={tipo}
            onClick={onClick}
            disabled={desabilitado}
            className={`
                px-6 py-3 rounded-lg transition-colors duration-200 cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed
                ${estilos[variante]}
                ${className}
            `}
        >
            {children}
        </button>
    );
}