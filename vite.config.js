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
            '/api': 'http://localhost:3200',
            // '/api': 'https://binno-members-repo-production-b8c4.up.railway.app/',
        },
        host: true,
    },
})
