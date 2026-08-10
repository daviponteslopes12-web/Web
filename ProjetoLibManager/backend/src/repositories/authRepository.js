import { pool } from '../config/db.js';

export const authRepository = {

    async buscarPorEmail(email) {

        const [resultado] = await pool.query(`
            SELECT *
            FROM bibliotecarios
            WHERE email = ?
            `, [email]);

        // retorna null para não retornar undefined
        return resultado[0] || null;
    }

}