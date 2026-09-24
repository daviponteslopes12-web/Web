import express from "express";
import cors from "cors";
import { port } from "./config/configs.js";
import { pool } from "./database/connection.js";
import produtoRoutes from "./routes/produto.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/produtos", produtoRoutes);



const testarConexao = async (): Promise<void> => {

    try {

        const connection = await pool.getConnection();


        console.log("Conectado ao MySQL");


        connection.release();
    } catch (erro) {
        console.error("Erro ao conectar com o MySQL:", erro);
    }
}


testarConexao();


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})