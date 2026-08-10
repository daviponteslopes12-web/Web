import { pool } from '../config/db.js';

export const livroRepository = {

    async cadastrar(titulo, autor, anoPublicacao, quantidadeTotal, quantidadeDisponivel, categoriaId) {

        const [resultado] = await pool.query(`
            INSERT INTO livros
            (titulo, autor, ano_publicacao, quantidade_total, quantidade_disponivel, categoria_id)
            VALUES (?, ?, ?, ?, ?, ?)
            `, [titulo, autor, anoPublicacao, quantidadeTotal, quantidadeDisponivel, categoriaId]);

        return resultado.insertId;
    },

    async listar() {

        const [resultado] = await pool.query(`
            SELECT 
            livros.id,
            livros.titulo,
            livros.autor,
            livros.ano_publicacao,
            livros.quantidade_total,
            livros.quantidade_disponivel,
            categorias.nome AS categoria
            FROM livros
            INNER JOIN categorias ON livros.categoria_id = categorias.id
            `);

        return resultado;
    },

    // Usado para quando for deletar um livro (verificar se ele existe)
    async existePorId(id) {

        const [resultado] = await pool.query(`
            SELECT id 
            FROM livros
            WHERE id = ?
            `, [id]);

        return resultado[0] || null;
    },

    async buscarQuantidadePorId(id) {
        
        const [resultado] = await pool.query(`
            SELECT id, quantidade_disponivel 
            FROM livros
            WHERE id = ?
            `, [id]);

        return resultado[0] || null;
    },

    async deletar(id) {

        const [resultado] = await pool.query(`
            DELETE 
            FROM livros
            WHERE id = ?
            `, [id]);

        return resultado.affectedRows;
    },

    async buscarLivro(id) {

        const [resultado] = await pool.query(`
            SELECT * 
            FROM livros
            WHERE id = ?
            `, [id]);

        return resultado[0] || null;
    }
}