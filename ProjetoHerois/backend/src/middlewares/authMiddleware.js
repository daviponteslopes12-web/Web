import jwt from 'jsonwebtoken';
import { criarErro } from '../utils/criarErro.js';

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw criarErro(401, 'Token não fornecido.');
        }

        const [, token] = authHeader.split(' ');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = decoded;

        next();

    } catch (error) {
        return res.status(401).json({ mensagem: 'Token inválido' });
    }
}