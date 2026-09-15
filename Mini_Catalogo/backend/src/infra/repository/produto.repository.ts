import { pool } from "../database/connection.js";

export const buscarTodosProdutos = async () => {
    const [resultado] = await pool.query(`
        SELECT * 
        FROM produtos
    `);

    return resultado;
};
