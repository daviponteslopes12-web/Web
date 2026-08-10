import { pool } from '../config/db.js';

export const missaoRepository = {

    // Buscar todas as missões do recrutador
    async buscarMissoes(usuarioId) {
        const [rows] = await pool.query(`
            SELECT *
            FROM usuario_missoes
            WHERE usuario_id = ?
            ORDER BY posicao ASC
        `, [usuarioId]);

        return rows;
    },

    // Buscar missão por ID
    async buscarPorId(id) {
        const [rows] = await pool.query(`
            SELECT *
            FROM usuario_missoes
            WHERE id = ?
        `, [id]);

        return rows[0] || null;
    },

    // Criar missão
    async criarMissao({ usuarioId, posicao, nome, descricao, elemento, dificuldade, poderInimigo, recompensaMoedas, recompensaXp, recompensaXpHeroi, ehEspecial }) {
        const [resultado] = await pool.query(`
            INSERT INTO usuario_missoes
            (usuario_id, posicao, nome, descricao, elemento, dificuldade,
             poder_inimigo, recompensa_moedas, recompensa_xp, recompensa_xp_heroi,
             eh_especial, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'disponivel')
        `, [usuarioId, posicao, nome, descricao, elemento, dificuldade,
            poderInimigo, recompensaMoedas, recompensaXp, recompensaXpHeroi, ehEspecial]);

        return resultado.insertId;
    },

    // Marcar missão como concluída
    async concluirMissao(id, podeRefazerEm) {
        const [resultado] = await pool.query(`
            UPDATE usuario_missoes
            SET status = 'concluida', pode_refazer_em = ?
            WHERE id = ?
        `, [podeRefazerEm, id]);

        return resultado.affectedRows;
    },

    // Remover missões concluídas que já passaram do cooldown
    async removerMissoesExpiradas(usuarioId) {
        const [resultado] = await pool.query(`
            DELETE FROM usuario_missoes
            WHERE usuario_id = ?
            AND status = 'concluida'
            AND pode_refazer_em IS NOT NULL
            AND pode_refazer_em <= NOW()
        `, [usuarioId]);

        return resultado.affectedRows;
    }
};