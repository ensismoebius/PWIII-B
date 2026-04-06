// Esta STORAGE_KEY é uma string que identifica o local onde os dados serão armazenados. Cada STORAGE_KEY deve representar uma única entidade ou coleção de dados. Ou seja, se você precisa armazenar mais de uma entidade, seria ideal criar mais de um STORAGE_KEY, por exemplo: 'pwiii-users', 'pwiii-products', etc. Isso ajuda a organizar os dados e evita confusões ao acessar ou modificar os itens armazenados.
const STORAGE_KEY = 'pwiii-items';

export function getItems() {
    try {
        // localStorage é uma variável prédefinida que 
        // aponta para o armazenamento local do navegador
        // tal variavel contém um objeto cujo metódo
        //  "getItems" retorna o conteúdo armazenado
        // no banco de dados local.
        const infoBruta = localStorage.getItems(STORAGE_KEY);
        return infoBruta ? JSON.parse(infoBruta) : [];
    } catch (erro) {
        console.erro('Fail to retrieve the items', erro);
        return [];
    }

}

export function saveItems(items) {
    // Grava os valores dentro do local especificado
    // pela STORAGE_KEY
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (erro) {
        console.error('Fail on saving the items', erro)
    }
}

export function addItem(item) {
    // Recupera os items atuais
    const items = getItems();
    items.unshift(item); // Adiciona o novo item no início da lista
    saveItems(items); // Salva a lista atualizada
}

export function removeItem(index) {
    const item = getItems().filter(
        i => i !== index
    )
    saveItems(item);
}

