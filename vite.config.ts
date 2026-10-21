import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/Career-Quest-/',
  build: {
    rollupOptions: {
      input: {
        // List every HTML file in your project here:
        main: resolve(__dirname, 'index.html'),
        intake: resolve(__dirname, 'step-0-intake.html'),
        quiz: resolve(__dirname, 'step-1-quiz.html'),
        // Add step-2, step-3, etc. matching your exact file names
      }
    }
  }
})