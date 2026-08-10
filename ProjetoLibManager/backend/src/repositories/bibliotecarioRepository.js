import { pool } from '../config/db.js';

// Criação das queries para bibliotecário
export const bibliotecarioRepository = {

    
    // Cadastrar bibliotecário
    async cadastrar(nome, email, senha) {

        const [resultado] = await pool.query(`
            INSERT INTO bibliotecarios
            (nome, email, senha)
            VALUES (?, ?, ?)
            `, [nome, email, senha]);

        return resultado.insertId;
    },


    // Buscar bibliotecário por Email
    async buscarPorEmail(email) {

        const [resultado] = await pool.query(`
            SELECT id, nome, email
            FROM bibliotecarios
            WHERE email = ?
            `, [email]);

        return resultado[0] || null;
    },


    // Buscar senha por ID
    async buscarSenhaPorId(id) {

        const [resultado] = await pool.query(`
            SELECT senha 
            FROM bibliotecarios
            WHERE id = ?
            `, [id]);

        return resultado[0] || null;
    },


    // Deletar Conta do bibliotecário
    async deletar(id) {

        const [resultado] = await pool.query(`
            DELETE FROM bibliotecarios
            WHERE id = ?
            `, [id]);

        return resultado.affectedRows;
    },


    // Atualizar email ou nome
    async atualizarDados(id, dados) {

        const campos = [];
        const valores = [];

        // Verificar se o nome foi alterado
        if (dados.nome) {
            campos.push('nome = ?');
            valores.push(dados.nome);
        }

        // Verificar se o email foi alterado
        if (dados.email) {
            campos.push('email = ?');
            valores.push(dados.email);
        }

        // Verificar se pelo menos um campo foi preenchido 
        if (campos.length === 0) {
            return null;
        }

        // Adiciona id no array de valores [nome, email, id]
        valores.push(id);

        // Adiciona dinamicamente os campos com join e usa valores para preencher (valores são usados na ordem do array)
        const [resultado] = await pool.query(`
            UPDATE bibliotecarios
            SET ${campos.join(', ')} 
            WHERE id = ?
            `, valores);

        return resultado.affectedRows;
    },


    // Atualizar senha do bibliotecário
    async atualizarSenha(id, senha) {

        const [resultado] = await pool.query(`
            UPDATE bibliotecarios
            SET senha = ?
            WHERE id = ?
            `, [senha, id]);

        return resultado.affectedRows
    }
}