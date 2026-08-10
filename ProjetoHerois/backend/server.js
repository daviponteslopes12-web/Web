import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import heroiRoutes from './src/routes/heroiRoutes.js';
import guildaRoutes from './src/routes/guildaRoutes.js';
import missaoRoutes from './src/routes/missaoRoutes.js';
import lojaRoutes from './src/routes/lojaRoutes.js';
import configuracaoRoutes from './src/routes/configuracaoRoutes.js';

const app = express();


app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));


app.use('/auth', authRoutes);
app.use('/heroi', heroiRoutes);
app.use('/guilda', guildaRoutes);
app.use('/missao', missaoRoutes);
app.use('/loja', lojaRoutes);
app.use('/configuracao', configuracaoRoutes);
app.get('/teste', (req, res) => {
    return res.json({ mensagem: "ok" })
})



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
})