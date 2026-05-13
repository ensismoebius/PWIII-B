import { useState } from "react"
import { updateItem, saveItems, loadItems, addItem } from "../lib/db"

export default function Data() {

    // Esse estado é para armazenar a lista de dados que será exibida na página, perceba a inicialização como um array vazio.
    const [listaDeDados, setListaDeDados] = useState(loadItems())

    // Esse estado é para armazenar o texto digitado pelo usuário, perceba a inicialização como uma string vazia.
    const [texto, setTexto] = useState("")

    // Esse estado é usado para informar que o app/site está no modo edição
    const [editando, setEditando] = useState(false);

    // Esse estado guarda o id do objeto que está sendo editado
    const [idEditado, setIdEditado] = useState(0);

    function atualizarValor(){
        if(!editando){
            return;
        }
        const atualizacoes = {text: texto};

        setListaDeDados(
            updateItem(
                idEditado, 
                atualizacoes
            )
        );
    }

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

    function ativarEdicao(id, valorOriginal){
        setEditando(true);
        setIdEditado(id);
        setTexto(valorOriginal);
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
                value={editando ? "Atualizar" : "Adicionar"}
                onClick={() => {
                    if(editando){
                        // Próxima aula: Ver porque não está adicionando
                        console.log("editando");
                        atualizarValor();
                    }else{
                        console.log("adicionando");
                        addItemFront();
                    }
                }}
            />

            <p>Aqui estão os dados</p>
            <table>
                <thead>
                    <tr>
                        <th>indice</th>
                        <th>valor</th>
                        <th>Operações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaDeDados.length === 0 ? (
                            <tr>
                                <td colSpan="3">Nenhum dado encontrado</td>
                            </tr>
                        ) : (
                            listaDeDados.map(
                                (dado, indice) => (
                                    // Para a próxima aula
                                    <tr key={dado.id}>
                                        <td>{dado.id}</td>
                                        <td>{dado.text}</td>
                                        <td>
                                        <button
                                        onClick={
                                            () => {
                                                ativarEdicao(
                                                    dado.id,
                                                    dado.text
                                                )
                                            }
                                        }
                                        >✏️</button>
                                        </td>
                                    </tr>
                                )
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}