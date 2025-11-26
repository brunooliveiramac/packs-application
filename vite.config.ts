import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      // Proxy API calls to the local packs-service to avoid CORS in dev
      '/api': {
        target: 'http://localhost:8082',
        changeOrigin: true
      },
      '/health': {
        target: 'http://localhost:8082',
        changeOrigin: true
      }
    }
  }
})


