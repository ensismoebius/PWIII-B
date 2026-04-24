// Instale as dependências necessárias para o projeto, como express, cors e mysql2.
// npm install express cors mysql2 dotenv

// Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente para 
// configurar a conexão com o MySQL:
// MYSQL_HOST=localhost
// MYSQL_USER=root
// MYSQL_PASSWORD=sua_senha
// MYSQL_DATABASE=seu_banco_de_dados
// PORT=4000

// O código abaixo é o servidor backend que expõe uma API REST (REST - Representational 
// State Transfer) para acessar os dados dos usuários armazenados em um banco de dados 
// MySQL. Ele utiliza o framework Express para criar rotas e o pacote mysql2 para se 
// conectar ao banco de dados. O middleware CORS é usado para permitir que o frontend 
// (que roda em outro domínio/porta) acesse a API sem ser bloqueado por políticas de 
// segurança do navegador. O servidor escuta na porta definida na variável de ambiente 
// PORT ou na porta 4000 por padrão. 

//Execute o servidor com o comando: node server/index.js

// dotenv/config é um pacote que carrega as variáveis de ambiente do arquivo .env 
// para process.env (variável superglobal do Node.js). Ele é importado aqui para 
// garantir que as variáveis estejam disponíveis antes de qualquer outro código ser 
// executado.
import 'dotenv/config'

// Importa  o express que é um framework web para Node.js, o cors para lidar com 
// requisições de origens diferentes (CORS - Cross-Origin Resource Sharing) e a 
// função query do arquivo db.js para interagir com o banco de dados MySQL.
import express from 'express'

// Sem cors, o navegador normalmente bloqueia a chamada por política de segurança 
// chamada CORS. Na prática, ele adiciona headers 
// HTTP como: "Access-Control-Allow-Origin: *" para permitir que o frontend 
// (que roda em outro domínio/porta) acesse os dados do backend sem ser bloqueado. 
// O cors é um middleware que facilita a configuração dessas permissões.
import cors from 'cors'
import { createUser, deleteUser, getUsers, updateUser } from './db.js'

// request - Representa o que chegou do cliente (navegador, frontend, etc.).
// request.params: parâmetros da rota
// request.query: query string
// request.body: corpo do POST/PUT
// request.headers, req.method, req.path
////////////////////////////////////////
// response - Representa o que o servidor vai enviar de volta para o cliente. 
// response.json(data): envia uma resposta JSON
// response.status(code): define o status HTTP da resposta
// response.send(data): envia uma resposta genérica
async function loadUsers(request, response) {
    try {
        const users = await getUsers()
        response.json(users)
    } catch (err) {
        console.error('Erro em /api/users:', err)
        response.status(500).json({ error: err.message })
    }
}

async function addUser(request, response) {
    try {
        const { name, email } = request.body
        if (!name || !email) {
            response.status(400).json({ error: 'name e email sao obrigatorios' })
            return
        }
        const user = await createUser({ name, email })
        response.status(201).json(user)
    } catch (err) {
        console.error('Erro em POST /api/users:', err)
        response.status(500).json({ error: err.message })
    }
}

async function editUser(request, response) {
    try {
        const { id } = request.params
        const { name, email } = request.body
        if (!name || !email) {
            response.status(400).json({ error: 'name e email sao obrigatorios' })
            return
        }
        const user = await updateUser(id, { name, email })
        if (!user) {
            response.status(404).json({ error: 'usuario nao encontrado' })
            return
        }
        response.json(user)
    } catch (err) {
        console.error('Erro em PUT /api/users/:id:', err)
        response.status(500).json({ error: err.message })
    }
}

async function removeUser(request, response) {
    try {
        const { id } = request.params
        const removed = await deleteUser(id)
        if (!removed) {
            response.status(404).json({ error: 'usuario nao encontrado' })
            return
        }
        response.status(204).end()
    } catch (err) {
        console.error('Erro em DELETE /api/users/:id:', err)
        response.status(500).json({ error: err.message })
    }
}

// Cria uma instância do aplicativo Express, configura o middleware 
// para parsear JSON e lidar com CORS, define as rotas da API e inicia 
// o servidor na porta especificada.
// middleware - função que é executada antes de chegar na rota. 
// Pode ser usada para autenticação, log, etc.
// requisição -> middleware 1 -> middleware 2 -> route handler -> resposta
const app = express()
app.use(express.json()) // Middleware para validar e ler JSON no corpo das requisições
app.use(cors()) // Middleware para habilitar CORS (Cross-Origin Resource Sharing)

// Define as rotas da API para lidar com operações CRUD (Create, Read, Update, Delete)
app.get('/api/users', loadUsers)
app.post('/api/users', addUser)
app.put('/api/users/:id', editUser)
app.delete('/api/users/:id', removeUser)

// Inicia o servidor na porta definida na variável de ambiente PORT ou 4000 por padrão
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))
