import { pool } from '../config/db.js';

export const usuarioRepository = {

    async cadastrar(nome, email, telefone) {

        const [resultado] = await pool.query(`
            INSERT INTO usuarios
            (nome, email, telefone)
            VALUES (?, ?, ?)
            `, [nome, email, telefone]);

        return resultado.insertId;
    },

    async listar() {

        const [resultado] = await pool.query(`
            SELECT id, nome, email, telefone
            FROM usuarios
            `);

        return resultado;
    },

    async buscarPorEmail(email) {

        const [resultado] = await pool.query(`
            SELECT * 
            FROM usuarios
            WHERE email = ?
            `, [email]);

        return resultado[0] || null;
    },

    async existePorId(id) {

        const [resultado] = await pool.query(`
            SELECT id
            FROM usuarios
            WHERE id = ?
            `, [id]);

        return resultado[0] || null;
    },

    async deletar(id) {

        const [resultado] = await pool.query(`
            DELETE 
            FROM usuarios
            WHERE id = ?
            `, [id]);

        return resultado.affectedRows
    },

    async buscarUsuario(id) {

        const [resultado] = await pool.query(`
            SELECT * 
            FROM usuarios
            WHERE id = ?
            `, [id]);

        return resultado[0] || null;
    }
}