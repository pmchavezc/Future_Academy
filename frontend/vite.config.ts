import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // rutas absolutas para assets
  build: {
    outDir: 'dist', // salida en 'dist'
  },
  plugins: [react()],
})
