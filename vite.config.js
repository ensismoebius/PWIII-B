import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Importa o plugin de rotas do Vite,
// para usá-lo é preciso instalar o pacote 
// 'vite-plugin-pages' e adicioná-lo à lista 
// de plugins (será feito no próximo passo).
import Pages from 'vite-plugin-pages';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Pages(), // Ativa o plugin de rotas do Vite
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
