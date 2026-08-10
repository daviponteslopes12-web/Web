import { criarErro } from "../utils/criarErro.js";

export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();

    } catch (error) {
        const mensagens = error.issues.map(issue => issue.message);
        return res.status(400).json({ mensagens });
    }
}