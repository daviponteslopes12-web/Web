export function middlewareDeErro(erro, req, res, next) {
    return res.status(erro.status || 500).json({ mensagem: erro.message || 'Erro interno do servidor' });
}