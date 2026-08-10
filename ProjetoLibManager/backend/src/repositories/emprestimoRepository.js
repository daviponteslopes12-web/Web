import { pool } from '../config/db.js';

export const emprestimoRepository = {

    async cadastrar(livroId, usuarioId, dataEmprestimo, dataDevolucaoPrevista) {

        const [resultado] = await pool.query(`
            INSERT INTO emprestimos
            (livro_id, usuario_id, data_emprestimo, data_devolucao_prevista)
            VALUES (?, ?, ?, ?)
            `, [livroId, usuarioId, dataEmprestimo, dataDevolucaoPrevista]);

        await pool.query(`
                UPDATE livros
                SET quantidade_disponivel = quantidade_disponivel - 1
                WHERE id = ?
                `, [livroId]);

        return resultado.insertId;

    },

    // Listagem que filtra por todos ou status específico
     async listar(status) {

        let query = `
            SELECT 
            emprestimos.id,
            usuarios.nome AS usuario,
            livros.titulo AS livro,
            emprestimos.data_emprestimo,
            emprestimos.data_devolucao_prevista,
            emprestimos.data_devolucao_real,
            emprestimos.status
            FROM emprestimos
            INNER JOIN livros ON emprestimos.livro_id = livros.id
            INNER JOIN usuarios ON emprestimos.usuario_id = usuarios.id
            `;

            // Cai aqui se for filtrar por status
            if (status) {
                query += ` WHERE emprestimos.status = ?`;
                const [resultado] = await pool.query(query, [status]);
                return resultado;
            }

            const [resultado] = await pool.query(query);
            return resultado;

     },

    async buscarPorId(id) {

        const [resultado] = await pool.query(`
            SELECT id, livro_id, status
            FROM emprestimos
            WHERE id = ?
            `, [id]);

        return resultado[0] || null;
    },

    async devolver(emprestimoId, livroId, dataDevolucaoReal) {

        await pool.query(`
            UPDATE emprestimos
            SET data_devolucao_real = ?, status = 'devolvido'
            WHERE id = ?
            `, [dataDevolucaoReal, emprestimoId]);

        await pool.query(`
            UPDATE livros
            SET quantidade_disponivel = quantidade_disponivel + 1
            WHERE id = ?
            `, [livroId]);
    },

    async atualizarStatusAtrasado(id) {

        await pool.query(`
            UPDATE emprestimos
            SET status = 'atrasado'
            WHERE id = ?
            `, [id]);
    },

    async buscarPorLivro(livroId) {
    const [resultado] = await pool.query(`
        SELECT id FROM emprestimos
        WHERE livro_id = ? AND status IN ('ativo', 'atrasado')
    `, [livroId]);
    return resultado;
},

    async buscarPorUsuario(usuarioId) {
        const [resultado] = await pool.query(`
            SELECT id FROM emprestimos
            WHERE usuario_id = ? AND status IN ('ativo', 'atrasado')
        `, [usuarioId]);
        return resultado;
    },

    async deletarPorLivro(livroId) {
        const [resultado] = await pool.query(`
            DELETE FROM emprestimos WHERE livro_id = ?
        `, [livroId]);
        return resultado.affectedRows;
    },

    async deletarPorUsuario(usuarioId) {
        const [resultado] = await pool.query(`
            DELETE FROM emprestimos WHERE usuario_id = ?
        `, [usuarioId]);
        return resultado.affectedRows;
    },
}