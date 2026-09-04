import env from "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})