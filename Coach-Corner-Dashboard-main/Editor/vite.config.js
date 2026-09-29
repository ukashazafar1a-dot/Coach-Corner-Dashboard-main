import { fileURLToPath, URL } from 'node:url'

import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: '../public/editor',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: "chunk-vendors.[ext]",
        chunkFileNames: "akdjlf.[ext]",
        entryFileNames: "chunk-vendors.js"
      }
    }
  }
})
