import "dotenv/config";

export const port = process.env.PORT;
export const db_port = Number(process.env.DB_PORT);
export const db_host = process.env.DB_HOST!;
export const db_user = process.env.DB_USER!;
export const db_name = process.env.DB_NAME!;
export const db_pass = process.env.DB_PASS!;