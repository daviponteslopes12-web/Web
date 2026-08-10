import { useEffect } from 'react';

function Mensagem({ tipo, texto, aoFechar }) {

    useEffect(() => {

        if (!texto) {
            return;
        }

        const tempo = setTimeout(() => {
            if (aoFechar) aoFechar();
        }, 4000);

        return () => clearTimeout(tempo);
    }, [texto, aoFechar]);


    if (!texto) {
        return null;
    }


    const estilos = {
        sucesso: 'bg-green-100 text-green-800 border-green-300',
        erro: 'bg-red-100 text-red-800 border-red-300',
    };

    return (
        <div className={`flex items-center justify-between p-3 rounded-lg border ${estilos[tipo]}`}>
            <span className="text-sm">{texto}</span>
            {aoFechar && (
                <button
                    onClick={aoFechar}
                    className="ml-4 text-lg leading-none hover:opacity-70"
                >
                    ✕
                </button>
            )}
        </div>
    );
}

export default Mensagem;