import { useNavigate } from 'react-router-dom';

function Erro() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">

            <div className="text-center">
                {/* Ícone de erro */}
                <h1 className="text-6xl font-bold text-red-500 mb-4">!</h1>

                {/* Mensagem */}
                <h2 className="text-2xl font-bold text-white mb-2">
                    Oops! Algo deu errado.
                </h2>
                <p className="text-gray-400 mb-8">
                    Acesso negado ou página não encontrada.
                </p>

                {/* Botão voltar */}
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Voltar ao Início
                </button>
            </div>

        </div>
    );
}

export default Erro;