/* global process */
import mysql from 'mysql2/promise'

// Pool de conexões reutilizáveis com o MySQL.
// As credenciais vêm do arquivo .env na raiz do projeto.
const pool = mysql.createPool({
    // process é um objeto global do Node.js que contém as variáveis de ambiente
    // é como se fosse uma variável superglobal do php, mas para JavaScript no backend
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'test',
})

// Executa uma query e retorna as linhas resultantes
export async function query(sql, params = []) {
    const [rows] = await pool.execute(sql, params)
    return rows
}
