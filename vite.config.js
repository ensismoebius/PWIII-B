import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Instale o 'vite-plugin-pages' para
// gerar rotas automaticamente com base 
// na estrutura de arquivos. Os arquivos
// por padrão ficam no diretório 'src/pages'.
// Mas você pode configurar o diretório de 
// páginas com a opção 'pagesDir' do plugin.
import Pages from 'vite-plugin-pages'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Pages(), // Configura o plugin de rotas automáticas
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
