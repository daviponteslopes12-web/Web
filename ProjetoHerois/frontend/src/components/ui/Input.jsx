export default function Input({ label, error, ...props }) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-text-muted text-sm">
                    {label}
                </label>
            )}
            <input
                {...props}
                className={`
                    bg-surface border rounded-lg px-4 py-3
                    text-text-primary placeholder-text-muted/50
                    outline-none transition-colors duration-200
                    focus:border-accent
                    ${error ? 'border-danger' : 'border-text-muted/20'}
                    ${props.className || ''}
                `}
            />
            {error && (
                <span className="text-danger text-xs">{error}</span>
            )}
        </div>
    );
}