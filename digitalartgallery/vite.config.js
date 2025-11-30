import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: GitHub Pages requires this base path
  base: "/Virtual-Art-Gallery-Project-FEDF/",
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const parts = id.toString().split('node_modules/')[1].split('/');
            if (parts[0].startsWith('@') && parts.length > 1) {
              return parts[0] + '/' + parts[1];
            }
            return parts[0];
          }
        }
      }
    }
  }
})
