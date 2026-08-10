import jwt from 'jsonwebtoken';

// Middleware para autenticar Token
export function autenticar(req, res, next) {

    // Pegar o cabecalho da autorização e verificar se existe
    const cabecalhoAutorizacao = req.headers.authorization;

    if (!cabecalhoAutorizacao) {
        return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    // Pegar o token e cortar a parte 'Baerer', split corta o espaço entre 'Bearer' e o token
    const partes = cabecalhoAutorizacao.split(' ');

    // Verifica o formato do cabecalho -> Bearer 023835ighbj435jk54h3j23fc4
    if (partes.length !== 2 || partes[0] !== 'Bearer') {
        return res.status(401).json({ mensagem: 'Token com formato inválido' });
    }

    const token = partes[1];

    // Verificar o token e enviar resultado para o front
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = decoded;
        next();

    } catch (err) {
        console.error("Erro ao verificar token: ", err);
        return res.status(401).json({ erro: err });
    }
}