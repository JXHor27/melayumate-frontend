import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   build: {
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  plugins: [react(), tailwindcss()],
  define: {
    global: "window",
  }
})

