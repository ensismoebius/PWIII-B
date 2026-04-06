# Integração React + Express + MySQL

Este projeto demonstra como conectar uma aplicação React (frontend) a um banco de dados MySQL por meio de um servidor Express (backend).

---

## Conceitos

```
Browser (React)
    │  fetch('/api/users')
    ▼
Servidor Express  ←  server/index.js (Node.js, porta 4000)
    │  SELECT * FROM users
    ▼
MySQL
```

- **React** roda no navegador e **não** acessa o banco diretamente.
- **Express** roda no Node.js, recebe as requisições HTTP do React, consulta o MySQL e devolve JSON.
- **Vite proxy** (`/api → localhost:4000`) evita problemas de CORS no desenvolvimento.

---

## Pré-requisitos

- Node.js 18+
- MySQL rodando localmente (ou remoto)
- Uma tabela `users` com as colunas `id`, `name` e `email`:

```sql
CREATE DATABASE IF NOT EXISTS test;
USE test;

CREATE TABLE IF NOT EXISTS users (
  id    INT AUTO_INCREMENT PRIMARY KEY,
  name  VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);

INSERT INTO users (name, email) VALUES
  ('Alice', 'alice@example.com'),
  ('Bob',   'bob@example.com');
```

---

## Instalação

Instale todas as dependências do projeto de uma vez:

```bash
npm install
```

Isso instala automaticamente:

| Pacote | Para quê |
|---|---|
| `react`, `react-dom` | Interface do usuário |
| `react-router-dom` | Roteamento de páginas |
| `express` | Servidor HTTP (backend) |
| `cors` | Permitir requisições cross-origin |
| `mysql2` | Driver de conexão com o MySQL |
| `dotenv` | Carregar variáveis do arquivo `.env` no backend |

Se quiser instalar manualmente só o que foi necessário para a integração com MySQL no backend, o comando é:

```bash
npm install express cors mysql2 dotenv
```

---

## Configuração do banco de dados

Edite o arquivo `.env` na raiz do projeto com as credenciais do seu MySQL:

```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=sua_senha
MYSQL_DATABASE=test
PORT=4000
```

---

## Estrutura dos arquivos criados

```
server/
  db.js        ← cria o pool de conexões MySQL
  index.js     ← servidor Express com a rota GET /api/users
src/pages/
  mysql.jsx    ← página React que lista os usuários
.env           ← credenciais do banco (não versionar!)
vite.config.js ← proxy /api → localhost:4000
```

### `server/db.js` — pool de conexão

```js
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host:     process.env.MYSQL_HOST     || 'localhost',
  user:     process.env.MYSQL_USER     || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'test',
})

export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params)
  return rows
}
```

### `server/index.js` — servidor Express

```js
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { query } from './db.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/users', async (req, res) => {
  try {
    const users = await query('SELECT id, name, email FROM users')
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))
```

### `vite.config.js` — proxy para o backend

```js
server: {
  proxy: {
    '/api': 'http://localhost:4000',
  },
},
```

### `src/pages/mysql.jsx` — página React

```jsx
import { useEffect, useState } from 'react'

function MysqlPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/users')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Carregando...</p>
  if (error) return <p style={{ color: 'red' }}>Erro: {error}</p>

  return (
    <>
      <h2>Usuários (MySQL)</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} — {u.email}</li>
        ))}
      </ul>
    </>
  )
}

export default MysqlPage
```

---

## Como rodar

Abra **dois terminais**:

**Terminal 1 — backend Express:**
```bash
npm run server
```

**Terminal 2 — frontend Vite:**
```bash
npm run dev
```

Acesse `http://localhost:5173` e clique em **MySQL** para ver os usuários listados.

## Como ver erros do servidor

No código atual, os erros do backend são devolvidos pela API como resposta HTTP 500 com JSON, e a página React mostra a mensagem de erro na tela.

O terminal onde você executou o backend é:

```bash
npm run server
```

Se houver erro de conexão com o MySQL, credenciais incorretas no `.env` ou problema na query SQL, a rota `/api/users` responderá com erro e a página `/mysql` exibirá essa falha.

Se você quiser também ver o erro detalhado no terminal, ajuste o `catch` em `server/index.js` assim:

```js
} catch (err) {
  console.error('Erro em /api/users:', err)
  res.status(500).json({ error: err.message })
}
```

## Problemas comuns

### 1. `ECONNREFUSED` ou `connect ECONNREFUSED 127.0.0.1:3306`

O MySQL não está rodando, está em outra porta, ou o `MYSQL_HOST` está incorreto.

Verifique:

```bash
sudo systemctl status mysql
```

ou confirme a porta e host configurados no `.env`.

### 2. `Access denied for user`

Usuário ou senha do MySQL estão incorretos no `.env`.

Revise:

```env
MYSQL_USER=seu_usuario
MYSQL_PASSWORD=sua_senha
```

### 3. `Unknown database 'test'`

O banco informado em `MYSQL_DATABASE` não existe.

Crie o banco manualmente:

```sql
CREATE DATABASE test;
```

ou ajuste o valor no `.env`.

### 4. `Table '...users' doesn't exist`

A tabela `users` ainda não foi criada no banco.

Crie a tabela:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);
```

### 5. A página mostra `Erro: HTTP 500`

Isso significa que o frontend conseguiu falar com o backend, mas o backend falhou ao consultar o banco.

As causas mais comuns são:

- credenciais incorretas no `.env`
- banco inexistente
- tabela `users` inexistente
- colunas diferentes de `id`, `name` e `email`

Se quiser ver o stack completo no terminal, adicione `console.error` no `catch` da rota e então rode:

```bash
npm run server
```

### 6. A página não carrega dados e o backend parece correto

Verifique se os dois processos estão rodando:

```bash
npm run server
npm run dev
```

Também confirme que o proxy está configurado em `vite.config.js`:

```js
server: {
  proxy: {
    '/api': 'http://localhost:4000',
  },
}
```
