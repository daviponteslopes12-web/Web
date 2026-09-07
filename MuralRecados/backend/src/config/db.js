import mysql from "mysql2/promise";

export const db = mysql.createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    user: process.env.DB_USER
});

