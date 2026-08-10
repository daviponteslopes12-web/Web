import { pool } from '../config/db.js';

export const lojaRepository = {

    // Buscar todos os itens fixos da loja
    async buscarItensFixos() {
        const [rows] = await pool.query(`
            SELECT *
            FROM itens_loja
            WHERE ativo = TRUE
            ORDER BY tipo, nivel_requisito ASC
        `);

        return rows;
    },

    // Buscar item por ID
    async buscarItemPorId(id) {
        const [rows] = await pool.query(`
            SELECT *
            FROM itens_loja
            WHERE id = ?
        `, [id]);

        return rows[0] || null;
    },

    // Buscar item comprado do recrutador
    async buscarItemDoUsuario(usuarioId, itemId) {
        const [rows] = await pool.query(`
            SELECT *
            FROM usuario_itens
            WHERE usuario_id = ? AND item_id = ?
        `, [usuarioId, itemId]);

        return rows[0] || null;
    },

    // Criar item comprado
    async criarItemUsuario({ usuarioId, itemId, nivelBoost }) {
        const [resultado] = await pool.query(`
            INSERT INTO usuario_itens (usuario_id, item_id, nivel_boost)
            VALUES (?, ?, ?)
        `, [usuarioId, itemId, nivelBoost]);

        return resultado.insertId;
    },

    // Atualizar nível do boost
    async atualizarNivelBoost(usuarioId, itemId, nivelBoost) {
        const [resultado] = await pool.query(`
            UPDATE usuario_itens
            SET nivel_boost = ?
            WHERE usuario_id = ? AND item_id = ?
        `, [nivelBoost, usuarioId, itemId]);

        return resultado.affectedRows;
    },

    // Buscar heróis disponíveis na loja rotativa
    async buscarLojaRotativa() {
        const [rows] = await pool.query(`
            SELECT *
            FROM loja_rotativa
            WHERE disponivel_ate > NOW()
            AND comprado = FALSE
            ORDER BY id ASC
        `);

        return rows;
    },

    // Buscar herói da loja rotativa por ID
    async buscarHeroiLojaPorId(id) {
        const [rows] = await pool.query(`
            SELECT *
            FROM loja_rotativa
            WHERE id = ?
        `, [id]);

        return rows[0] || null;
    },

    // Marcar herói como comprado na loja rotativa
    async marcarComoComprado(id) {
        const [resultado] = await pool.query(`
            UPDATE loja_rotativa
            SET comprado = TRUE
            WHERE id = ?
        `, [id]);

        return resultado.affectedRows;
    },

    // Limpar heróis expirados da loja rotativa
    async limparExpirados() {
        const [resultado] = await pool.query(`
            DELETE FROM loja_rotativa
            WHERE disponivel_ate <= NOW()
            OR comprado = TRUE
        `);

        return resultado.affectedRows;
    },

    // Criar herói na loja rotativa
    async criarHeroiLoja({ heroiApiId, nomeHeroi, imagemHeroi, elemento, raridade, poderBase, preco, disponivelAte }) {
        const [resultado] = await pool.query(`
            INSERT INTO loja_rotativa
            (heroi_api_id, nome_heroi, imagem_heroi, elemento, raridade,
             poder_base, preco, disponivel_ate)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [heroiApiId, nomeHeroi, imagemHeroi, elemento, raridade,
            poderBase, preco, disponivelAte]);

        return resultado.insertId;
    },

    // Contar quantos slots de heróis estão na loja rotativa ativa
    async contarLojaRotativa() {
        const [rows] = await pool.query(`
            SELECT COUNT(*) as total
            FROM loja_rotativa
            WHERE disponivel_ate > NOW()
            AND comprado = FALSE
        `);

        return rows[0].total;
    }
};