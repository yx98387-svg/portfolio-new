import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/portfolio-new/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
})
