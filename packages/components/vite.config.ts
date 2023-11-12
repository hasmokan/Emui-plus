import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

// import { defineConfig } from 'vite'
export default {
  build: {
    //打包后文件目录
    outDir: '../emui',
    cssCodeSplit: false,
    //压缩
    minify: false,
    rollupOptions: {
      //忽略打包vue文件
      external: ['vue'],
      //input: ["index.ts"],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    lib: {
      entry: './index.ts',
      name: 'emui',
      fileName: 'emui',
      formats: ['es', 'umd', 'cjs']
    }
  },
  plugins: [vue(), visualizer()]
}
