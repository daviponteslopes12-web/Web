import express from 'express';
import cors from 'cors';

import authRoutes from './src/routes/authRoutes.js';
import bibliotecarioRoutes from './src/routes/bibliotecarioRoutes.js'; 
import categoriaRoutes from './src/routes/categoriaRoutes.js';
import livroRoutes from './src/routes/livroRoutes.js';
import usuarioRoutes from './src/routes/usuarioRoutes.js';
import emprestimoRoutes from './src/routes/emprestimoRoutes.js';
import historicoRoutes from './src/routes/historicoRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/bibliotecario', bibliotecarioRoutes);
app.use('/categoria',categoriaRoutes);
app.use('/livro', livroRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/emprestimo', emprestimoRoutes);
app.use('/historico', historicoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅Servidor rodando na porta ${PORT}`);
});