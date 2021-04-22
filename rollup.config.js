import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import sass from 'rollup-plugin-sass'

export default {
  input: 'src/main.js',
  output: {
    name: 'VueDrumrollDatetimePicker',
    file: 'dist/vue-drumroll-datetime-picker.js',
    format: 'commonjs',
    exports: 'named',
    globals: {
      vue: 'Vue',
    },
  },
  external: [
    'Vue',
    'dayjs',
    'vue-scroll-picker',
  ],
  plugins: [
    vue({
      css: true, // css を <style> タグとして注入
      compileTemplate: true, // 明示的にテンプレートを描画関数に変換
    }),
    sass({
      output: 'dist/style.css',
    }),
    nodeResolve(),
    commonjs({
      include: /node_modules/,
    }),
  ],
}
