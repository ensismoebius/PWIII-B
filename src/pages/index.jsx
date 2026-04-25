import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="exuberant-div">
      <h1>Menu</h1>
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