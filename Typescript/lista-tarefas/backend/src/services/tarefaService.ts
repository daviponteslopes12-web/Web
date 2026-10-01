import { conectarBanco } from "../database/connection.js";
import { Tarefa } from "../types/tarefa.js";
import { ResultSetHeader } from "mysql2";

export async function listarTarefas() {
    const conn = await conectarBanco();

    const [resultado] = await conn.query(`
        SELECT * FROM tarefas
    `);

    return resultado as Tarefa[];
}


export async function criarTarefa(titulo: string): Promise<Tarefa> {
    const conn = await conectarBanco();

    const [resultado] = await conn.execute<ResultSetHeader>(`
        INSERT INTO tarefas (titulo) VALUES (?)
        `, [titulo]
    );

    // 
    const insertId: number = resultado.insertId;

    return {
        id: insertId,
        titulo,
        concluida: false
    }
}