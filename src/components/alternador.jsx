export default function Alternador(
    { estadoBooleano, setEstadoBooleano }
) {
    return (
        <div>
            <input 
            type="checkbox" 
            checked={estadoBooleano}
            onChange={
                () => setEstadoBooleano(!estadoBooleano)
            }
            />
            <label>Alternador</label>
        </div>
    )
}