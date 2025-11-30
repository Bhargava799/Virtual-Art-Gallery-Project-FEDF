import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use a relative base so asset URLs work regardless of Pages path (prevents 404s)
  base: "./",
  build: {
    // Increase warning limit slightly and split vendor code into separate chunks
    chunkSizeWarningLimit: 1200, // in KB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Put each top-level dependency into its own chunk (e.g. react, @mui, chart.js)
            const parts = id.toString().split('node_modules/')[1].split('/');
            // Handle scoped packages like @mui/material
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
