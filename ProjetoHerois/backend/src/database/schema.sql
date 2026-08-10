CREATE DATABASE IF NOT EXISTS herois;
USE herois;

-- Recrutadores
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    moedas INT NOT NULL DEFAULT 0,
    xp INT NOT NULL DEFAULT 0,
    nivel INT NOT NULL DEFAULT 1,
    caixa_atual VARCHAR(50) NOT NULL DEFAULT 'madeira',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Guildas
CREATE TABLE IF NOT EXISTS guildas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    elemento ENUM('normal','fogo','agua','natureza','luz','trevas','lendario','atemporal') NOT NULL DEFAULT 'normal',
    descanso_ate DATETIME DEFAULT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Heróis dos recrutadores
CREATE TABLE IF NOT EXISTS usuario_herois (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    heroi_api_id VARCHAR(20),
    nome_heroi VARCHAR(200) NOT NULL,
    imagem_heroi VARCHAR(500) NOT NULL,
    elemento ENUM('fogo','agua','natureza','luz','trevas','lendario','atemporal','normal') NOT NULL,
    classe ENUM('mago','elfo','anao','orc','guerreiro') NOT NULL,
    raridade ENUM('comum','raro','epico','lendario','mitico','secreto') NOT NULL,
    poder_base INT NOT NULL,
    nivel INT NOT NULL DEFAULT 1,
    xp INT NOT NULL DEFAULT 0,
    guilda_id INT DEFAULT NULL,
    adquirido_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (guilda_id) REFERENCES guildas(id) ON DELETE SET NULL,
    UNIQUE KEY unique_usuario_heroi (usuario_id, heroi_api_id)
);


-- Missões dos recrutadores (12 slots)
CREATE TABLE IF NOT EXISTS usuario_missoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    posicao INT NOT NULL,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT,
    elemento ENUM('fogo','agua','natureza','luz','trevas','lendario','atemporal','normal') NOT NULL,
    dificuldade ENUM('facil','medio','dificil','especial') NOT NULL,
    poder_inimigo INT NOT NULL,
    recompensa_moedas INT NOT NULL,
    recompensa_xp INT NOT NULL,
    recompensa_xp_heroi INT NOT NULL,
    eh_especial BOOLEAN NOT NULL DEFAULT FALSE,
    status ENUM('disponivel','concluida','cooldown') NOT NULL DEFAULT 'disponivel',
    pode_refazer_em DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE KEY unique_missao_posicao (usuario_id, posicao)
);

-- Itens fixos da loja
CREATE TABLE IF NOT EXISTS itens_loja (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    tipo ENUM('caixa','boost_herois','boost_auto') NOT NULL,
    preco INT NOT NULL,
    nivel_requisito INT NOT NULL DEFAULT 1,
    dados_extra JSON,
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

-- Itens comprados pelo recrutador
CREATE TABLE IF NOT EXISTS usuario_itens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    item_id INT NOT NULL,
    nivel_boost INT NOT NULL DEFAULT 0,
    comprado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES itens_loja(id),
    UNIQUE KEY unique_usuario_item (usuario_id, item_id)
);

-- Loja rotativa (heróis à venda)
CREATE TABLE IF NOT EXISTS loja_rotativa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    heroi_api_id VARCHAR(20),
    nome_heroi VARCHAR(200) NOT NULL,
    imagem_heroi VARCHAR(500) NOT NULL,
    elemento ENUM('fogo','agua','natureza','luz','trevas','lendario','atemporal','normal') NOT NULL,
    raridade ENUM('epico','lendario') NOT NULL,
    poder_base INT NOT NULL,
    preco INT NOT NULL,
    disponivel_ate DATETIME NOT NULL,
    comprado BOOLEAN NOT NULL DEFAULT FALSE
);


-- Cache de heróis da API externa
CREATE TABLE IF NOT EXISTS cache_herois (
    id INT AUTO_INCREMENT PRIMARY KEY,
    heroi_api_id VARCHAR(20) NOT NULL UNIQUE,
    nome VARCHAR(200) NOT NULL,
    imagem VARCHAR(500) NOT NULL,
    intelligence INT,
    strength INT,
    speed INT,
    `durability` INT,
    power_stat INT,
    combat INT,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);