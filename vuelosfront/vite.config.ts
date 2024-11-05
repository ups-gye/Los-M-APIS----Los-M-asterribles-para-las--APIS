// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://pdim.edg-ec.com/Vuelos/VueloSoap.asmx',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false, // Permite HTTPS sin certificado válido (si es necesario)
      },
    },
  },
});
