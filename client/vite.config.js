import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
   server: {
    host: true,  
    port: 5173,
    strictPort: true,

  },
   hmr: {
      host: '192.168.31.216',  
      protocol: 'ws',
      port: 5173
    }
})
