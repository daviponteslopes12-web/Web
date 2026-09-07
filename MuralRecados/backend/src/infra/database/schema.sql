CREATE DATABASE IF NOT EXISTS projeto_mural;
USE projeto_mural;

CREATE TABLE IF NOT EXISTS tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    `status` ENUM('em espera', 'em andamento' ,'concluida') DEFAULT 'em espera',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);