import { useEffect, useState } from 'react'

function MysqlPage() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [saving, setSaving] = useState(false)

    const loadUsers = () => {
        setLoading(true)
        setError(null)
        fetch('/api/users')
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                return res.json()
            })
            .then((data) => setUsers(Array.isArray(data) ? data : []))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const resetForm = () => {
        setName('')
        setEmail('')
        setEditingId(null)
    }

    const submitForm = async (event) => {
        event.preventDefault()

        if (!name.trim() || !email.trim()) {
            setError('Preencha nome e email')
            return
        }

        setSaving(true)
        setError(null)

        const method = editingId ? 'PUT' : 'POST'
        const url = editingId ? `/api/users/${editingId}` : '/api/users'

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), email: email.trim() }),
            })

            if (!response.ok) {
                const payload = await response.json().catch(() => ({}))
                throw new Error(payload.error || `HTTP ${response.status}`)
            }

            resetForm()
            loadUsers()
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    const startEdit = (user) => {
        setEditingId(user.id)
        setName(user.name)
        setEmail(user.email)
    }

    const removeUser = async (id) => {
        const confirmDelete = window.confirm('Deseja realmente excluir este usuario?')
        if (!confirmDelete) return

        setError(null)
        try {
            const response = await fetch(`/api/users/${id}`, { method: 'DELETE' })
            if (!response.ok) {
                const payload = await response.json().catch(() => ({}))
                throw new Error(payload.error || `HTTP ${response.status}`)
            }
            loadUsers()
        } catch (err) {
            setError(err.message)
        }
    }

    if (loading) return <p>Carregando...</p>
    if (error) return <p style={{ color: 'red' }}>Erro: {error}</p>

    return (
        <>
            <h2>Usuários (MySQL)</h2>

            <form onSubmit={submitForm} style={{ marginBottom: 16 }}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                {' '}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                {' '}
                <button type="submit" disabled={saving}>
                    {saving ? 'Salvando...' : editingId ? 'Atualizar' : 'Criar'}
                </button>
                {' '}
                {editingId && (
                    <button type="button" onClick={resetForm}>
                        Cancelar
                    </button>
                )}
            </form>

            <ul>
                {users.map((u) => (
                    <li key={u.id}>
                        {u.name} — {u.email}
                        {' '}
                        <button type="button" onClick={() => startEdit(u)}>Editar</button>
                        {' '}
                        <button type="button" onClick={() => removeUser(u.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default MysqlPage
