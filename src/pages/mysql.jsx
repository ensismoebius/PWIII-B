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
