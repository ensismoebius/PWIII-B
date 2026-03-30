import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Importa o método 'createBrowserRouter' do React Router,
// para criar o roteador da aplicação, e o componente
// 'RouterProvider', para disponibilizar o roteador
// para toda a aplicação.
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importa as rotas geradas pelo plugin de rotas do Vite,
// que estão disponíveis no caminho '~react-pages'.
// A versão atual do vite-plugin-pages (v0.33.3) exporta
// as rotas como  '~react-pages', diferente da versão 
// anterior que exportava com '~pages'.
import routes from '~react-pages';

// Cria o roteador da aplicação a partir 
// das rotas geradas.
const roteador = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* O strict mode cria um ambiente de desenvolvimento mais rígido para o React de forma a evitar erros comumente encontrados. Ele garante que o software em produção não 
    contenha problemas como componentes mal implementados. */}

    {/* Disponibiliza o roteador para toda a aplicação,
    permitindo que os componentes de rota sejam 
    renderizados. Este componente verifica o diretório
    'pages' procurando pelo arquivo 'index.jsx' por 
    padrão. */}
    <RouterProvider router={roteador} />
  </StrictMode>,
)

