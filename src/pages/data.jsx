import { useState } from "react"
import { saveItems, loadItems, addItem } from "../lib/db"

export default function Data() {

    // Esse estado é para armazenar a lista de dados que será exibida na página, perceba a inicialização como um array vazio.
    const [listaDeDados, setListaDeDados] = useState(loadItems())

    // Esse estado é para armazenar o texto digitado pelo usuário, perceba a inicialização como uma string vazia.
    const [texto, setTexto] = useState("")

    function addItemFront(evento) {
        // Previne o comportamento padrão do formulário, que é recarregar a página.
        evento.preventDefault()

        // Adiciona um novo item à lista de dados no localStorage usando a função addItem importada do arquivo db.js.
        addItem(texto)

        // Atualiza o estado da lista de dados com a nova lista, o que fará com que a página seja re-renderizada e exiba o novo item.
        setListaDeDados(loadItems())

        // Limpa o campo de texto após adicionar o item.
        setTexto("")
    }

    return (
        <div>
            <h1>Dados</h1>
            <input
                type="text"
                value={texto}
                onChange={
                    (evento) => setTexto(evento.target.value)
                }
            />
            <input
                type="button"
                value="Adicionar"
                onClick={addItemFront}
            />

            <p>Aqui estão os dados</p>
            <table>
                <thead>
                    <tr>
                        <th>indice</th>
                        <th>valor</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaDeDados.length === 0 ? (
                            <tr>
                                <td colSpan="2">Nenhum dado encontrado</td>
                            </tr>
                        ) : (
                            listaDeDados.map(
                                (dado, indice) => (
                                    <tr key={indice}>
                                        <td>{indice}</td>
                                        <td>{dado}</td>
                                    </tr>
                                    // Para a próxima aula
                                    // <tr key={dado.id}>
                                    //     <td>{dado.id}</td>
                                    //     <td>{dado.text}</td>
                                    // </tr>
                                )
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}