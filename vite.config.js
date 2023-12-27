import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import typescript from 'rollup-plugin-typescript2'

export default defineConfig({
  root: __dirname,
  plugins: [vue(), typescript()],
  build: {
    outDir: resolve(__dirname, 'dist'),
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'vue-drumroll-datetime-picker',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: { vue: 'vue' },
      },
    },
  },
})
