import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // loadPaths lets Sass find partials by short name
        loadPaths: [resolve(__dirname, 'src/styles')],
        // No additionalData — each partial imports variables directly
      },
    },
  },
})
