import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Netflix/',
     build: {
    chunkSizeWarningLimit: 1000, // Increase limit
    rollupOptions: {
      input: {
        main: './index.html',
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Split vendor chunks
          }
        }
        }
      }
    }
  }
})
