import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Devido a uma atualização recente (v0.33.3), 
// o caminho de importação das rotas geradas pelo 
// 'vite-plugin-pages'mudou de '~pages' para '~react-pages'. 
import routes from '~react-pages';

// Cria o roteador usando as rotas geradas pelo plugin
// O plugin lê os arquivos dentro do diretório 
// 'src/pages' e gera as rotas automaticamente
const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    {/* 
    O strict mode é uma ferramenta para destacar 
    problemas potenciais no aplicativo. Ele ativa 
    verificações e avisos adicionais para as tags 
    filhas, como a renderização dupla. 
    Isso pode ajudar a identificar problemas de 
    desempenho, efeitos colaterais inesperados e 
    outros problemas comuns durante o desenvolvimento. 
    Ele não afeta o comportamento do aplicativo em 
    produção. 
    */}
    <RouterProvider router={router} />
  </StrictMode>
)
