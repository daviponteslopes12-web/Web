import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Sucesso() {
    const navigate = useNavigate();
    const [mostrarMensagem, setMostrarMensagem] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMostrarMensagem(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (mostrarMensagem) {
            const timer = setTimeout(() => {
                navigate('/cardapio');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [mostrarMensagem, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {!mostrarMensagem ? (
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-500 mt-4">Processando pagamento...</p>
                </div>
            ) : (
                <div className="text-center">
                    <span className="text-green-600 text-6xl block">✓</span>
                    <h1 className="text-2xl font-bold mt-4">Compra realizada com sucesso!</h1>
                    <p className="text-gray-500 mt-2">Obrigado pelo seu pedido</p>
                    <p className="text-sm text-gray-400 mt-4">Voltando ao cardápio...</p>
                </div>
            )}
        </div>
    );
}

export default Sucesso;