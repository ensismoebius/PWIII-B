import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getItems, addItem, removeItem } from '../lib/db'

function DataPage() {
    const [items, setItems] = useState(() => getItems())
    const [text, setText] = useState('')

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
        <div className="exuberant-div">
            <h1 className="exuberant-title">Dados (localStorage)</h1>
            <form className="exuberant-form" onSubmit={handleAdd}>
                <input 
                    className="exuberant-input" 
                    value={text} 
                    onChange={e => setText(e.target.value)} 
                    placeholder="Novo item" 
                />
                <button type="submit" className="exuberant-button">Adicionar</button>
            </form>

            <ul className="exuberant-list">
                {items.length === 0 ? (
                    <li className="exuberant-empty">Nenhum item ainda</li>
                ) : (
                    items.map(item => (
                        <li key={item.id} className="exuberant-list-item">
                            <span className="item-text">{item.text}</span>
                            <button 
                                className="exuberant-button exuberant-button-small" 
                                onClick={() => handleRemove(item.id)}
                            >
                                Remover
                            </button>
                        </li>
                    ))
                )}
            </ul>

            <p>
                <Link to="/" className="exuberant-link">Voltar para Início</Link>
            </p>
        </div>
    )
}

export default DataPage