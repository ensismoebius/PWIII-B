import { Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="exuberant-div">
      <p className="exuberant-text">Mikail Alexandrovichy Bakunin</p>
      <p className="exuberant-links">
        <Link to="/about" className="exuberant-link">Sobre</Link>
        <br />
        <Link to="/data" className="exuberant-link">Dados</Link>
        <br />
        <Link to="/mysql" className="exuberant-link">MySQL</Link>
      </p>
    </div>
  )
}

export default App