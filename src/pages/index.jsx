import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>
        <p>Clique em "Sobre nós" para ver pessoas gostosas</p>
        <Link to="/about">Sobre nós</Link>
        <br />
        <Link to="/data">Dados</Link>
      </p>
    </>
  )
}

export default App
