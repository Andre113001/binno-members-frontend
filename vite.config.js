import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    mainFields: [],
  },

  server: {
    port: 3300,
    proxy: {
      '/api': 'https://binno-members-repo-production.up.railway.app/api/'
    },
    host: true
  },
})
