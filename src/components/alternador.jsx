export default function Alternador({ estadoBooleano, setEstadoBooleano }) {
    return (
        <div className="exuberant-toggle-container">
            <input 
                className="exuberant-checkbox"
                type="checkbox" 
                checked={estadoBooleano}
                onChange={() => setEstadoBooleano(!estadoBooleano)}
                id="alternador-checkbox"
            />
            <label className="exuberant-toggle-label" htmlFor="alternador-checkbox">
                <span className="toggle-indicator"></span>
                Alternador
            </label>
        </div>
    )
}