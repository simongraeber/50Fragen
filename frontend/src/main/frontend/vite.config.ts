import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Set output directory to Spring Boot's static resources directory
    outDir: '../resources/static/',
    emptyOutDir: true,
  },

})
