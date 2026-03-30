import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getItems, addItem, removeItem } from '../lib/db'
import './App.css'

function DataPage() {
    const [items, setItems] = useState([])
    const [text, setText] = useState('')

    useEffect(() => {
        setItems(getItems())
    }, [])

    function handleAdd(e) {
        e.preventDefault()
        const value = text.trim()
        if (!value) return
        const item = addItem({ text: value })
        setItems(prev => [item, ...prev])
        setText('')
    }

    function handleRemove(id) {
        removeItem(id)
        setItems(prev => prev.filter(i => i.id !== id))
    }

    return (
        <>
            <h1>Dados (localStorage)</h1>
            <form onSubmit={handleAdd} style={{ marginBottom: 12 }}>
                <input value={text} onChange={e => setText(e.target.value)} placeholder="Novo item" />
                <button type="submit">Adicionar</button>
            </form>

            <ul>
                {items.map(item => (
                    <li key={item.id} style={{ marginBottom: 6 }}>
                        {item.text}{' '}
                        <button onClick={() => handleRemove(item.id)}>Remover</button>
                    </li>
                ))}
            </ul>

            <p>
                <Link to="/">Voltar para Início</Link>
            </p>
        </>
    )
}

export default DataPage
