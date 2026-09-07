CREATE DATABASE IF NOT EXISTS mural_recados;
USE mural_recados;

CREATE TABLE IF NOT EXISTS tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    `status` ENUM('em espera', 'em andamento' ,'concluida') DEFAULT espera,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);