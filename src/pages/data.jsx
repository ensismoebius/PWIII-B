import { useState } from "react"

export default function Data() {

    // Esse estado é para armazenar a lista de dados que será exibida na página, perceba a inicialização como um array vazio.
    const [listaDeDados, setListaDeDados] = useState([])

    // Esse estado é para armazenar o texto digitado pelo usuário, perceba a inicialização como uma string vazia.
    const [texto, setTexto] = useState("")

    function addItem(evento) {
        // Previne o comportamento padrão do formulário, que é recarregar a página.
        evento.preventDefault()

        // Cria um novo array de dados, adicionando o texto atual ao final da lista de dados existente.
        const novaListaDeDados = [
            ...listaDeDados,
            evento.target.value
        ]

        // Atualiza o estado da lista de dados com a nova lista, o que fará com que a página seja re-renderizada e exiba o novo item.
        setListaDeDados(novaListaDeDados)

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
                onClick={ }
            />

            <p>Aqui estão os dados</p>
            <ul>
                {
                    // Mapeia cada item da lista de dados para um elemento <li> que será exibido na página.
                    listaDeDados.map((item, index) =>
                    (
                        <li key={index}>{item}</li>
                    ))
                }
            </ul>
        </div>
    )
}