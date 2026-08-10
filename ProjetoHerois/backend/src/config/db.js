import dotenv from 'dotenv/config';
import mysql2 from 'mysql2/promise';

export const pool = mysql2.createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
});