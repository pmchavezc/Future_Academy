import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',             // 👈 EN RENDER debe ser raíz
  plugins: [react()],
  build: { outDir: 'dist' }
})