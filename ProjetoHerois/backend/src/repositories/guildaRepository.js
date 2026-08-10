import { pool } from '../config/db.js';

export const guildaRepository = {


    async buscarGuildasDoUsuario(usuarioId) {
        const [rows] = await pool.query(`
            SELECT *
            FROM guildas
            WHERE usuario_id = ?
            ORDER BY criado_em DESC
        `, [usuarioId]);

        return rows;
    },


    async buscarPorId(id) {
        const [rows] = await pool.query(`
            SELECT *
            FROM guildas
            WHERE id = ?
        `, [id]);

        return rows[0] || null;
    },


    async criarGuilda({ usuarioId, nome, elemento }) {
        const [resultado] = await pool.query(`
            INSERT INTO guildas (usuario_id, nome, elemento)
            VALUES (?, ?, ?)
        `, [usuarioId, nome, elemento]);

        return resultado.insertId;
    },


    async deletarGuilda(id) {
        const [resultado] = await pool.query(`
            DELETE FROM guildas
            WHERE id = ?
        `, [id]);

        return resultado.affectedRows;
    },


    async contarHerois(guildaId) {
        const [rows] = await pool.query(`
            SELECT COUNT(*) as total
            FROM usuario_herois
            WHERE guilda_id = ?
        `, [guildaId]);

        return rows[0].total;
    },


    async buscarHeroisDaGuilda(guildaId) {
        const [rows] = await pool.query(`
            SELECT *
            FROM usuario_herois
            WHERE guilda_id = ?
        `, [guildaId]);

        return rows;
    },

    async buscarHeroiPorId(id) {
        const [resultado] = await pool.query(`
            SELECT *
            FROM usuarios_herois
            WHERE id = ?
            ,`, [id]);

        return resultado[0] || null;
    },

    async setDescando(guildaId, descansoAte) {
        const [resultado] = await pool.query(`
            UPDATE guildas
            SET descanso_ate = ?
            WHERE id = ?
            `, [descansoAte, guildaId]);

        return resultado.affectedRows;
    }
};