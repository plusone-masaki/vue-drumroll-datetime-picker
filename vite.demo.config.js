import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: resolve(__dirname, 'src/demo'),
  base: '/vue-drumroll-datetime-picker',
  plugins: [vue()],
  build: {
    outDir: resolve(__dirname, 'docs'),
  },
})
