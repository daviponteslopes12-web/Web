CREATE Database lista_tarefas;

USE lista_tarefas;

CREATE TABLE tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    concluida BOOLEAN NOT NULL DEFAULT false
);

