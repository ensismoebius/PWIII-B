// Define a chave usada para armazenar e recuperar os itens no localStorage
const STORAGE_KEY = 'pwiii.items'

// Exporta a função getItems que lê e retorna os itens armazenados
export function getItems() {
    // Tenta ler os dados do localStorage
    try {
        // Recupera a string JSON armazenada sob a chave definida
        const raw = localStorage.getItem(STORAGE_KEY)
        // Se houver dados, faz o parse do JSON; caso contrário, retorna um array vazio
        return raw ? JSON.parse(raw) : []
    } catch (e) {
        // Em caso de erro (por exemplo JSON inválido), registra o erro no console
        console.error('Failed to read items', e)
        // Retorna um array vazio como fallback seguro
        return []
    }
}

// Exporta a função saveItems que salva um array de itens no localStorage
export function saveItems(items) {
    // Tenta serializar os itens e gravar no localStorage
    try {
        // Converte o array de itens em string JSON e grava usando a chave
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
        // Em caso de erro na serialização ou gravação, registra no console
        console.error('Failed to save items', e)
    }
}

// Exporta a função addItem que cria um novo item e o adiciona ao início da lista
export function addItem(payload) {
    // Recupera os itens atuais
    const items = getItems()
    // Cria um objeto item com id único (timestamp) e as propriedades fornecidas
    const item = { id: Date.now().toString(), ...payload }
    // Insere o novo item no começo do array
    items.unshift(item)
    // Persiste o array atualizado no localStorage
    saveItems(items)
    // Retorna o item criado
    return item
}

// Exporta a função removeItem que exclui um item pelo seu id
export function removeItem(id) {
    // Filtra os itens mantendo apenas os que não possuem o id informado
    const items = getItems().filter(i => i.id !== id)
    // Persiste a lista filtrada
    saveItems(items)
}

// Exporta a função updateItem que atualiza um item existente
export function updateItem(id, updates) {
    // Mapeia os itens substituindo o item cujo id corresponde pelos updates aplicados
    const items = getItems().map(i => (i.id === id ? { ...i, ...updates } : i))
    // Persiste os itens atualizados
    saveItems(items)
    // Retorna o item atualizado (procura pelo id)
    return items.find(i => i.id === id)
}

// Exporta um objeto padrão contendo as funções disponíveis
export default { getItems, saveItems, addItem, removeItem, updateItem }
