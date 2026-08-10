import { pool } from '../config/db.js';

export const heroiRepository = {

    async buscarHeroisDoUsuario(usuarioId) {
        const [resultado] = await pool.query(`
            SELECT *
            FROM usuario_herois
            WHERE usuario_id = ?
            ORDER BY adquirido_em DESC
            `, [usuarioId]);

        return resultado;
    },

    async buscarHeroiDoUsuario(usuarioId, heroiApiId) {
        const [resultado] = await pool.query(`
            SELECT *
            FROM usuario_herois
            WHERE usuario_id = ?
            AND heroi_api_id = ?
            `, [usuarioId, heroiApiId]);

        return resultado[0] || null;
    },

    async salvarHeroi({ usuarioId, heroiApiId, nomeHeroi, imagemHeroi, elemento, classe, raridade, poderBase }) {
        const [resultado] = await pool.query(`
            INSERT INTO usuario_herois
            (usuario_id, heroi_api_id, nome_heroi, imagem_heroi, elemento, classe, raridade, poder_base)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `, [usuarioId, heroiApiId, nomeHeroi, imagemHeroi, elemento, classe, raridade ,poderBase]);

        return resultado.insertId;
    },

    async atualizarXpHeroi(id, xp, nivel) {
        const [resultado] = await pool.query(`
            UPDATE usuario_herois
            SET xp = ?, nivel = ?
            WHERE id = ?
            `, [xp, nivel, id]);

        return resultado.affectedRows;
    },

    async buscarHeroiAleatorio() {
        const [resultado] = await pool.query(`
            SELECT * 
            FROM cache_herois
            ORDER BY RAND()
            LIMIT 1
            `);

        return resultado[0] || null; 
    },

        async buscarHeroisAleatorio(quantidade) {
        const [resultado] = await pool.query(`
            SELECT * 
            FROM cache_herois
            ORDER BY RAND()
            LIMIT ?
            `, [quantidade]);

        return resultado; 
    },

    async buscarTodosHerois(pagina, limite) {
        const offset = (pagina - 1) * limite;

        const [herois] = await pool.query(`
            SELECT *
            FROM cache_herois
            ORDER BY nome
            LIMIT ? OFFSET ?
        `, [limite, offset]);

        const [countResult] = await pool.query(`
            SELECT COUNT(*) as total
            FROM cache_herois
        `);

        return {
            herois,
            total: countResult[0].total,
            pagina,
            totalPaginas: Math.ceil(countResult[0].total / limite)
        };
    },

    // Buscar nível do boost de um tipo
    async buscarNivelBoost(usuarioId, tipoBoost) {
        const [resultado] = await pool.query(`
            SELECT ui.nivel_boost
            FROM usuario_itens ui
            JOIN itens_loja il ON ui.item_id = il.id
            WHERE ui.usuario_id = ? AND il.tipo = ?
            ORDER BY ui.nivel_boost DESC
            LIMIT 1
        `, [usuarioId, tipoBoost]);

        return resultado[0]?.nivel_boost || 0;
    },

    async buscarHeroiPorId(id) {
        const [resultado] = await pool.query(`
            SELECT * 
            FROM usuario_herois
            WHERE id = ?
            `, [id]);

        return resultado[0] || null;
    }
};