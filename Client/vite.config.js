import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    commonjsOptions: {
      include: [],
    },
  },
  optimizeDeps: {
    disabled: false,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: '@testing-library/jest-dom',
    mockReset: true,
  }
})

