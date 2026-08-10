import { pool } from '../config/db.js';

export const categoriaRepository = {

    async cadastrar(nome) {

        const [resultado] = await pool.query(`
            INSERT INTO categorias
            (nome)
            VALUES (?)
            `, [nome]);

        return resultado.insertId;
    },

    async listar() {

        const [resultado] = await pool.query(`
            SELECT id, nome
            FROM categorias
            `,);

        return resultado;
    },

    async atualizar(id, nome) {

        const [resultado] = await pool.query(`
            UPDATE categorias
            SET nome = ?
            WHERE id = ?
            `, [nome, id]);

        return resultado.affectedRows
    },

    async deletar(id) {

        const [resultado] = await pool.query(`
            DELETE 
            FROM categorias
            WHERE id = ?
            `, [id]);

        return resultado.affectedRows;
    },

    async buscarPorNome(nome) {

        const [resultado] = await pool.query(`
            SELECT id, nome
            FROM categorias
            WHERE nome = ?
            `, [nome]);

            return resultado[0] || null;
    }
}