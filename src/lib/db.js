const STORAGE_KEY = 'pwiii-items';

export function saveItems(items) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(items)
        );
    } catch (error) {
        console.error("Erro ao salvar os itens no localStorage", error);
    }
}

export function loadItems() {
    try {
        const infoBruta = localStorage.getItem(STORAGE_KEY);
        return infoBruta ? JSON.parse(infoBruta) : [];
    } catch (error) {
        console.error("Erro ao carregar os itens do localStorage", error);
        return [];
    }
}

export function addItem(single_item) {

    // Carrega os itens existentes do 
    // localStorage usando a função loadItems.
    const items = loadItems();

    // Cria um id unico para o novo item usando a data e hora atual.
    const identifica = Date.now().toString();

    // Cria um novo item com o id e o texto fornecido.
    const newItem = { id: identifica, text: single_item };

    // Adiciona o novo item à lista de itens existente.
    const updatedItems = [...items, newItem];

    // Salva a lista atualizada de itens no localStorage usando a função saveItems.
    saveItems(updatedItems);
}