import { pool } from '../database/connection.js';

// type -> indica que estou usando esse import só para o TypeScript usar como tipo
import type { Produto } from '../interfaces/produto.interface.js';

// tipo fornecido pelo mysql2 para representar uma linha retornada de uma consulta SQL.
import type { RowDataPacket } from 'mysql2';



// Combinação de tipos
//O & em TypeScript é uma interseção de tipos. Ele significa: ProdutoRow precisa possuir as características de Produto e de RowDataPacket.
type ProdutoRow = Produto & RowDataPacket;

export const ProdutoRepository = {

    // Promise indica que esse resultado será obtido de forma assíncrona e Produto[] é a forma como será o resultado
    async listarTodosProdutos(): Promise<Produto[]> {

        try {

            // Fala para o mysql como ele vai retonar o resultado
            const [rows] = await pool.query<ProdutoRow[]>(`
                SELECT * 
                FROM produtos
            `);

            return rows;

        } catch (erro) {

            console.error("[ERRO DE BANCO]: ", erro);
            throw erro;

        }
    }
};