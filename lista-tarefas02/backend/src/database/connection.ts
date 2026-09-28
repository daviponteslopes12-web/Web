import mysql from "mysql2/promise";


export async function conectarBanco() {

    const conn = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1234",
        database: "lista_tarefas"
    });

    return conn;
    
}