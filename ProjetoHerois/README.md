# Projeto Heróis 🦸

Um projeto full-stack que gerencia informações sobre heróis, com autenticação segura e banco de dados MySQL.

## 📋 Visão Geral

Este projeto é uma aplicação web completa desenvolvida com **Node.js + Express** no backend e **React + Vite** no frontend. Ele permite que usuários se registrem, façam login e gerenciem dados sobre heróis com segurança e performance.

## 🛠️ Stack Tecnológico

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express 5.2
- **Banco de Dados**: MySQL 2
- **Autenticação**: JWT (JSON Web Tokens)
- **Segurança**: Bcrypt para hash de senhas
- **Validação**: Zod
- **CORS**: Habilitado para requisições cross-origin
- **Desenvolvimento**: Nodemon para hot reload

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Roteamento**: React Router v7
- **HTTP Client**: Axios
- **State Management**: TanStack React Query
- **Animações**: Framer Motion
- **Estilos**: Tailwind CSS
- **Validação**: Zod
- **Linter**: ESLint

## 🚀 Como Começar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- MySQL Server
- npm ou yarn

### Instalação

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### Configuração

1. **Backend** - Crie um arquivo `.env` na pasta `backend`:
```env
DB_HOST=localhost
DB_USER=seu_usuario_mysql
DB_PASSWORD=sua_senha
DB_NAME=projeto_herois
JWT_SECRET=sua_chave_secreta_super_segura
```

2. **Frontend** - Configure a URL da API no arquivo de configuração (se necessário)

### Executando o Projeto

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
O servidor rodará em `http://localhost:3000` (ajuste conforme sua configuração)

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
A aplicação abrirá em `http://localhost:5173`

## 📦 Scripts Disponíveis

### Backend
- `npm run dev` - Inicia o servidor em modo desenvolvimento com hot reload
- `npm run cache` - Executa script para popular cache de dados populares

### Frontend
- `npm run dev` - Inicia o servidor de desenvolvimento Vite
- `npm run build` - Constrói a aplicação para produção
- `npm run lint` - Executa o ESLint para verificar código
- `npm run preview` - Visualiza a build de produção localmente

## 📁 Estrutura do Projeto

```
ProjetoHerois/
├── backend/
│   ├── server.js
│   ├── src/
│   │   └── scripts/
│   │       └── popularCache.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
└── README.md
```

## 🔐 Segurança

- Senhas são criptografadas com **Bcrypt**
- Autenticação via **JWT** (tokens seguros)
- CORS configurado para controlar requisições entre domínios
- Validação de dados com **Zod**
- Ambiente de variáveis sensíveis em `.env`

## 🎯 Funcionalidades Principais

- ✅ Autenticação de usuários com JWT
- ✅ Registro seguro com bcrypt
- ✅ Gerenciamento de dados de heróis
- ✅ API RESTful
- ✅ Interface moderna com React
- ✅ Validação robusta de dados
- ✅ Cache de dados populares

## 🤝 Contribuindo

Sinta-se livre para abrir issues e pull requests! Qualquer contribuição é bem-vinda.

## 📄 Licença

Este projeto está disponível como open source. Verifique o arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor

**davi41933-svg** - [GitHub](https://github.com/davi41933-svg)

---

**Desenvolvido com ❤️ usando Node.js e React**
