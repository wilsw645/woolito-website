import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  publicDir: 'Public',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main:              resolve(__dirname, 'index.html'),
        portfolio:         resolve(__dirname, 'portfolio.html'),
        'theme-esg':       resolve(__dirname, 'portfolio/esg.html'),
        'theme-heritage':  resolve(__dirname, 'portfolio/heritage.html'),
        'theme-product':   resolve(__dirname, 'portfolio/product.html'),
        'theme-gov':       resolve(__dirname, 'portfolio/gov.html'),
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
