import { Link } from 'react-router-dom';

function PaginaNaoEncontrada() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl text-gray-500 mt-4">Página não encontrada</p>
            <Link to="/" className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                Voltar ao início
            </Link>
        </div>
    );
}

export default PaginaNaoEncontrada;