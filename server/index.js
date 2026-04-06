/* global process */

// dotenv/config é um pacote que carrega as variáveis de ambiente do arquivo .env 
// para process.env (variável superglobal do Node.js). Ele é importado aqui para 
// garantir que as variáveis estejam disponíveis antes de qualquer outro código ser 
// executado.
import 'dotenv/config'

// Importa  o express que é um framework web para Node.js, o cors para lidar com 
// requisições de origens diferentes (CORS) e a função query do arquivo db.js 
// para interagir com o banco de dados MySQL.
import express from 'express'

// Sem cors, o navegador normalmente bloqueia a chamada por política de segurança 
// chamada CORS: Cross-Origin Resource Sharing. Na prática, ele adiciona headers 
// HTTP como: "Access-Control-Allow-Origin: *" para permitir que o frontend 
// (que roda em outro domínio/porta) acesse os dados do backend sem ser bloqueado. 
// O cors é um middleware que facilita a configuração dessas permissões.
import cors from 'cors'
import { query } from './db.js'

const app = express()
app.use(cors())
app.use(express.json())

// GET /api/users — retorna todos os usuários do MySQL
app.get('/api/users', async (req, res) => {
    try {
        const users = await query('SELECT id, name, email FROM users')
        res.json(users)
    } catch (err) {
        console.error('Erro em /api/users:', err)
        res.status(500).json({ error: err.message })
    }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))
