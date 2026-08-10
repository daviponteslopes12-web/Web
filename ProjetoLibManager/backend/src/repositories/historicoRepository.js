import { pool } from '../config/db.js';

export const historicoRepository = {

    async criar(dados) {
        
        const [resultado] = await pool.query(`
            INSERT INTO historico
            (livro, autor, usuario, data_emprestimo, data_devolucao_prevista)
            VALUES (?, ?, ?, ?, ?)
            `, [
                dados.livro,
                dados.autor || null,
                dados.usuario,
                dados.dataEmprestimo,
                dados.dataDevolucaoPrevista,
            ]);

        return resultado.insertId;
    },

    async listar() {

        const [resultado] = await pool.query(`
            SELECT * 
            FROM historico
            ORDER BY data_emprestimo 
            DESC
            `);

            return resultado;
    } 
}