import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Rutas absolutas para producción
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true // Limpia la carpeta dist antes de cada build
  }
});
