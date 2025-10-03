import { defineConfig } from 'vite'
import  string  from 'vite-plugin-string'
import babel from 'vite-plugin-babel';


export default defineConfig({
  root: 'src', // папка, где лежит index.html
  build: {
    outDir: '../dist', // куда складывать готовый билд
    emptyOutDir: true  // очищать dist перед билдом
  },
  server: {
    port: 3000,        // порт dev-сервера
    open: true         // автооткрытие браузера
  },
  plugins: [
    string({
      include: '**/*.hbs' // говорим Vite, что все .hbs импортируем как строки
    }),
   babel({
  babelConfig: {
    presets: [
      ["@babel/preset-env", { modules: false }],
      "@babel/preset-typescript",
    ]
  }
})
  ]
})
