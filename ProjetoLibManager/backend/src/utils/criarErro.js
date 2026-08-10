export function criarErro(status, mensagem) {
    const error = new Error(mensagem);
    error.status = status;
    return error;
}