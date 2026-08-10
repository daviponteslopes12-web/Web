# ProjetoLibManager

Breve descrição
ProjetoLibManager é uma aplicação web para gerenciar um acervo (livros), usuários e empréstimos. O projeto está dividido em backend (API) e frontend (cliente web).

Tecnologias
- Backend
  - Node.js (ES Modules)
  - Express 5
  - MySQL (mysql2)
  - Autenticação: jsonwebtoken
  - Criptografia de senhas: bcrypt
  - Validação: zod
  - Configuração: dotenv
  - Ambiente de desenvolvimento: nodemon

- Frontend
  - React (Vite)
  - Vite (dev server/build)
  - React Router
  - Axios (requisições HTTP)
  - @tanstack/react-query
  - Tailwind CSS
  - ESLint

Pré-requisitos
- Node.js e npm instalados (recomenda-se Node 16+)
- Banco de dados MySQL em execução (ou ajuste para outro DB conforme necessário)
- Variáveis de ambiente para conexão com o banco e secrets

Como rodar o projeto (passo a passo)
1. Clonar o repositório
```
git clone https://github.com/davi41933-svg/ProjetoLibManager.git
cd ProjetoLibManager
```

2. Backend
```
cd backend
npm install
```
Crie um arquivo .env na pasta backend com as variáveis necessárias (exemplo):
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
JWT_SECRET=seu_segredo_jwt
```
(dependendo do código, pode haver outras variáveis; ajuste conforme necessário)

Iniciar backend em modo de desenvolvimento:
```
npm run dev
```
Por padrão o servidor geralmente escuta na PORT definida (ex.: http://localhost:3000).

3. Frontend
Abra outro terminal:
```
cd ProjetoLibManager/frontend
npm install
```
Se o frontend consumir a API por variáveis de ambiente, crie um .env na pasta frontend:
```
VITE_API_URL=http://localhost:3000
```
Iniciar frontend em modo de desenvolvimento:
```
npm run dev
```
O Vite normalmente roda em http://localhost:5173 (ver saída do comando para o endereço exato).

Observações finais
- Garanta que o banco de dados esteja criado e que as credenciais no .env estejam corretas antes de iniciar a API.
- Se houver scripts de migração ou seed, rode-os conforme a documentação/arquivos do projeto (não detectei scripts de migration nos package.json).
- Para rodar ambos ao mesmo tempo, mantenha dois terminais: um para o backend e outro para o frontend.

Quer que eu crie esse README.md diretamente no repositório (branch main)? Se sim eu adiciono o arquivo com esse conteúdo.
