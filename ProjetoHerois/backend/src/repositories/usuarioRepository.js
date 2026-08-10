import { pool } from '../config/db.js';

export const usuarioRepository = {

    async buscarPorEmail(email) {
        const [resultado] = await pool.query(`
            SELECT *
            FROM usuarios
            WHERE email = ?
            `, [email]);

        return resultado[0] || null;
    },

    async buscarPorId(id) {
        const [resultado] = await pool.query(`
            SELECT * 
            FROM usuarios
            WHERE id = ?
            `, [id]);

        return resultado[0] || null;
    },

    async criarUsuario({ nome, email, senhaHash }) {
        const [resultado] = await pool.query(`
            INSERT INTO usuarios
            (nome, email, senha, moedas, xp, nivel, caixa_atual)
            VALUES (?, ?, ?, 0, 0, 1, 'madeira')
            `, [nome, email, senhaHash]);

        return resultado.insertId;
    },

    async atualizarMoedas(id, novasMoedas) {
        const [resultado] = await pool.query(`
            UPDATE usuarios
            SET moedas = ?
            WHERE id = ?
            `, [novasMoedas, id]);

        return resultado.affectedRows;
    },

    async atualizarXpENivel(id, xp, nivel) {
        const [resultado] = await pool.query(`
            UPDATE usuarios
            SET xp = ?, nivel = ?
            WHERE id = ?
            `, [xp, nivel, id]);
        
        return resultado.affectedRows;
    },


    async atualizarCaixa(id, caixaAtual) {
        const [resultado] = await pool.query(`
            UPDATE usuarios
            SET caixa_atual = ?
            WHERE id = ?
        `, [caixaAtual, id]);

        return resultado.affectedRows;
    },

        // Adicionar dentro do objeto usuarioRepository

    async atualizarNomeEmail(id, nome, email) {
        const [resultado] = await pool.query(`
            UPDATE usuarios
            SET nome = ?, email = ?
            WHERE id = ?
        `, [nome, email, id]);

        return resultado.affectedRows;
    },

    async atualizarSenha(id, novaSenha) {
        const [resultado] = await pool.query(`
            UPDATE usuarios
            SET senha = ?
            WHERE id = ?
        `, [novaSenha, id]);

        return resultado.affectedRows;
    },

    async deletarUsuario(id) {
        const [resultado] = await pool.query(`
            DELETE FROM usuarios
            WHERE id = ?
        `, [id]);

        return resultado.affectedRows;
    }
}