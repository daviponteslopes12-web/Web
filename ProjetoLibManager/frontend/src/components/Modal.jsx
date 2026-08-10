function Modal({ aberto, aoFechar, titulo, children }) {

    if (!aberto) {
        return null;
    }

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">

                {/* Cabeçalho */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">{titulo}</h2>
                    <button
                        onClick={aoFechar}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Conteúdo */}
                <div className="p-4">
                    {children}
                </div>

            </div>
        </div>
    );
}

export default Modal;