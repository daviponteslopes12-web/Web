import express from "express";
import { conectarBanco } from "./database/connection.js";
import tarefaRoutes from "./routes/tarefaRoutes.js";

// Config. do express
const app = express();
app.use(express.json());



// Rotas
app.use("/tarefas", tarefaRoutes);




// Função que liga o servidor
async function iniciarServidor() {
    try {
        await conectarBanco();


        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000");
        });

    } catch (erro) {
        console.error("Erro ao iniciar o servidor: ", erro);
    }
}

iniciarServidor();