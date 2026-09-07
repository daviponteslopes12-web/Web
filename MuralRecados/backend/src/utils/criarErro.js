export function criarErro(mensagem, status = 500, erroBanco = null ) {

    if (erroBanco) {
        console.error("Erro de banco: ", erroBanco);
    }

    let erro = new Error(mensagem);
    erro.status = status;

    return erro;
}