import { conectarBanco } from "../database/connection.js";
import { Tarefa } from "../types/tarefa.js";
import { ResultSetHeader } from "mysql2";

export async function listarTarefas(): Promise<Tarefa[]> {
    const conn = await conectarBanco();

    try {    
        const [resultado] = await conn.query(`
            SELECT * FROM tarefas
        `);
            
        return resultado as Tarefa[];

    } catch (error) {
        console.error("[ERRO] - tarefaService:", error);
        throw error;

    } finally {
        await conn.end();
    }
}
export async function criarTarefa(titulo: string): Promise<Tarefa> {
    const conn = await conectarBanco();

    try {
        const [resultado] = await conn.execute<ResultSetHeader>(`
            INSERT INTO tarefas (titulo) VALUES (?)
            `, [titulo]
        );

        const insertId: number = resultado.insertId;

        return {
            id: insertId,
            titulo,
            concluida: false
        }

    } catch (error) {
        console.error("[ERRO] - tarefaService: ", error);
        throw error;

    } finally {
        await conn.end();
    }
}
export async function buscarTarefaPorId(id: number): Promise<Tarefa | null> {
    const conn = await conectarBanco();

    try {
        const [resultado] = await conn.execute(`
            SELECT * 
            FROM tarefas
            WHERE id = ?    
            `, [id]
        );

        const tarefas = resultado as Tarefa[];

        return tarefas[0] ?? null;

    } catch (error) {
        console.error("[ERRO] - tarefaService:", error);
        throw error;

    } finally {
        await conn.end();
    }
}
export async function deletarTarefa(id: number): Promise<boolean> {
    const conn = await conectarBanco();

    try {
        const [resultado] = await conn.execute<ResultSetHeader>(`
            DELETE FROM tarefas
            WHERE id = ?
            `, [id]
        );

        return resultado.affectedRows > 0;

    } catch (error) {
        console.error("[ERRO] - tarefaService:", error);
        throw error;

    } finally {
        await conn.end();
    }
}
export async function atualizarTarefa(titulo: string, concluida: boolean, id: number): Promise<boolean> {
    const conn = await conectarBanco();

    try {
        const [resultado] = await conn.execute<ResultSetHeader>(`
            UPDATE tarefas
            SET titulo = ?, concluida = ?
            WHERE id = ?    
            `, [titulo, concluida, id]
        );

        return resultado.affectedRows > 0;

    } catch (error) {
        console.error("[ERRO] - tarefaService:", error);
        throw error;

    } finally {
        await conn.end();
    }
}