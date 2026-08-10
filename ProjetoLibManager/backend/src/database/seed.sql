-- Seed para o LibManager
-- Execute DEPOIS de criar as tabelas

USE libmanager;

-- Bibliotecários (cole o hash da senha manualmente)
INSERT INTO bibliotecarios (nome, email, senha) VALUES
('bibliotecario', 'bibliotecario@gmail.com', '$2b$10$zhGJj7i17BvCKfekLdLQyOoVieaP8D8cI11y34X5OLlcq5LDJLQze');

-- Categorias
INSERT INTO categorias (nome) VALUES
('Programação'),
('Ficção Científica'),
('Romance'),
('Tecnologia'),
('História'),
('Fantasia');

-- Livros
INSERT INTO livros (titulo, autor, ano_publicacao, quantidade_total, quantidade_disponivel, categoria_id) VALUES
('Clean Code', 'Robert C. Martin', 2008, 3, 2, 1),
('Refactoring', 'Martin Fowler', 1999, 2, 1, 1),
('O Guia do Mochileiro das Galáxias', 'Douglas Adams', 1979, 4, 4, 2),
('Duna', 'Frank Herbert', 1965, 2, 2, 2),
('Orgulho e Preconceito', 'Jane Austen', 1813, 3, 3, 3),
('Dom Casmurro', 'Machado de Assis', 1899, 2, 2, 3),
('Entendendo Algoritmos', 'Aditya Bhargava', 2016, 3, 3, 4),
('A Arte da Guerra', 'Sun Tzu', -500, 2, 2, 5),
('O Hobbit', 'J.R.R. Tolkien', 1937, 4, 3, 6),
('Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 1997, 3, 3, 6),
('Design Patterns', 'Gang of Four', 1994, 2, 2, 1),
('Neuromancer', 'William Gibson', 1984, 2, 2, 2);

-- Usuários (leitores)
INSERT INTO usuarios (nome, email, telefone) VALUES
('Carlos Oliveira', 'carlos@email.com', '(11) 99999-1111'),
('Ana Souza', 'ana@email.com', '(11) 99999-2222'),
('Pedro Lima', 'pedro@email.com', '(11) 99999-3333'),
('Juliana Costa', 'juliana@email.com', '(11) 99999-4444'),
('Lucas Mendes', 'lucas@email.com', '(11) 99999-5555'),
('Fernanda Alves', 'fernanda@email.com', '(21) 99999-6666'),
('Rafael Torres', 'rafael@email.com', '(21) 99999-7777'),
('Beatriz Rocha', 'beatriz@email.com', '(31) 99999-8888');

-- Empréstimos
INSERT INTO emprestimos (livro_id, usuario_id, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status) VALUES
-- Ativos
(1, 1, '2026-06-10', '2026-06-24', NULL, 'ativo'),
(2, 2, '2026-06-12', '2026-06-26', NULL, 'ativo'),
(9, 3, '2026-06-15', '2026-06-29', NULL, 'ativo'),
-- Atrasados
(1, 4, '2026-05-20', '2026-06-03', NULL, 'atrasado'),
-- Devolvidos
(3, 5, '2026-05-01', '2026-05-15', '2026-05-14', 'devolvido'),
(4, 1, '2026-04-10', '2026-04-24', '2026-04-22', 'devolvido'),
(5, 6, '2026-03-15', '2026-03-29', '2026-03-28', 'devolvido'),
(6, 7, '2026-02-01', '2026-02-15', '2026-02-13', 'devolvido'),
(7, 8, '2026-01-10', '2026-01-24', '2026-01-22', 'devolvido'),
(10, 2, '2026-12-05', '2026-12-19', '2026-12-18', 'devolvido');

-- Histórico
INSERT INTO historico (livro, autor, usuario, data_emprestimo, data_devolucao_prevista) VALUES
('Clean Code', 'Robert C. Martin', 'Carlos Oliveira', '2026-06-10', '2026-06-24'),
('Refactoring', 'Martin Fowler', 'Ana Souza', '2026-06-12', '2026-06-26'),
('O Hobbit', 'J.R.R. Tolkien', 'Pedro Lima', '2026-06-15', '2026-06-29'),
('Clean Code', 'Robert C. Martin', 'Juliana Costa', '2026-05-20', '2026-06-03'),
('O Guia do Mochileiro das Galáxias', 'Douglas Adams', 'Lucas Mendes', '2026-05-01', '2026-05-15'),
('Duna', 'Frank Herbert', 'Carlos Oliveira', '2026-04-10', '2026-04-24'),
('Orgulho e Preconceito', 'Jane Austen', 'Fernanda Alves', '2026-03-15', '2026-03-29'),
('Dom Casmurro', 'Machado de Assis', 'Rafael Torres', '2026-02-01', '2026-02-15'),
('Entendendo Algoritmos', 'Aditya Bhargava', 'Beatriz Rocha', '2026-01-10', '2026-01-24'),
('Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 'Ana Souza', '2026-12-05', '2026-12-19');