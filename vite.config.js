import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Importa o plugin de rotas do Vite,
// para usá-lo é preciso instalar o pacote 
// 'vite-plugin-pages' e adicioná-lo à lista 
// de plugins (será feito no próximo passo).
import Pages from 'vite-plugin-pages';
import mysql from 'mysql2/promise';

// Pool de conexões com o MySQL — configurado via variáveis de ambiente (.env)
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'test',
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Pages(), // Ativa o plugin de rotas do Vite
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),

    // Plugin que expõe /api/users dentro do servidor de dev do Vite
    // Não precisa de Express nem de processo separado — basta `npm run dev`
    {
      name: 'mysql-api',
      configureServer(server) {
        server.middlewares.use('/api/users', async (req, res) => {
          try {
            const [rows] = await pool.execute('SELECT id, name, email FROM users')
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(rows))
          } catch (err) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: err.message }))
          }
        })
      },
    },
  ],
})
