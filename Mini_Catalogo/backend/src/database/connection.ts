import mysql from "mysql2/promise";
// Importa variaveis configuradas no configs
import {
    db_port,
    db_host,
    db_user,
    db_name,
    db_pass
} from "../config/configs.js";

// Conexão com banco
export const pool = mysql.createPool({
    port: db_port,
    host: db_host,
    user: db_user,
    database: db_name,
    password: db_pass
});



