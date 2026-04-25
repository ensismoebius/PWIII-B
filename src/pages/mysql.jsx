import { useEffect, useState } from 'react'
import './App.css'

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

    if (loading) return <p className="loading-message">Carregando...</p>
    if (error) return <p className="error-message cb-status-error">Erro: {error}</p>

    return (
        <div className="exuberant-div">
            <h2 className="exuberant-title">Usuários (MySQL)</h2>

            <form className="exuberant-form" onSubmit={submitForm}>
                <input
                    className="exuberant-input"
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <input
                    className="exuberant-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <button type="submit" className="exuberant-button" disabled={saving}>
                    {saving ? 'Salvando...' : editingId ? 'Atualizar' : 'Criar'}
                </button>
                {editingId && (
                    <button type="button" className="exuberant-button exuberant-button-cancel" onClick={resetForm}>
                        Cancelar
                    </button>
                )}
            </form>

            {users.length === 0 ? (
                <p className="exuberant-empty">Nenhum usuário cadastrado</p>
            ) : (
                <table className="exuberant-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>
                                    <button type="button" className="exuberant-button exuberant-button-small" onClick={() => startEdit(u)}>Editar</button>
                                    <button type="button" className="exuberant-button exuberant-button-small exuberant-button-danger" onClick={() => removeUser(u.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default MysqlPage