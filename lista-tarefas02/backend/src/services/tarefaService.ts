import { conectarBanco } from "../database/connection.js";
import { Tarefa } from "../types/tarefa.js";


export async function listarTarefas() {
    const conn = await conectarBanco();

    const [resultado] = await conn.query(`
        SELECT * FROM tarefas
    `);

    return resultado as Tarefa[];
}