import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: resolve(__dirname, 'src/demo'),
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'vue-drumroll-datetime-picker',
      fileName: 'dist/vue-drumroll-datetime-picker.js',
    },
  },
})
