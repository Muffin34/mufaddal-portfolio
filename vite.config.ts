import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // React app (film library at /work) lives in app.html; the home page is public/index.html.
  build: {
    rollupOptions: { input: 'app.html' },
  },
})
