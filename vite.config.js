import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/react-gioco-di-carte-con-api/",
  plugins: [react()],
})
