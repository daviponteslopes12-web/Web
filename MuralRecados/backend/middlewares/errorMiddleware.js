export function middlewareDeErro(erro, res, res, next) {
    return res.status(erro.status || 500).json({ mensagem: erro.mensagem || 'Erro interno do servidor' });
}