import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

// Link de rota para a página About

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>Mikail Alexandrovichy Bakunin</p>
      <p>
        <Link to="/about">Sobre</Link>
      </p>
    </>
  )
}

export default App
