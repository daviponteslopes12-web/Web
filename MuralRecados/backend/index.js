import env from "dotenv/config";
import express from "express";
import cors from "cors";

import { middlewareDeErro } from "./middlewares/errorMiddleware.js";
import tarefaRoutes from "./src/routes/tarefaRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/tarefas", tarefaRoutes);


app.use(middlewareDeErro);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});