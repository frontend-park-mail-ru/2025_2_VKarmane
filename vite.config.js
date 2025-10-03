
import { defineConfig } from "vite";
import string from "vite-plugin-string";
import babel from "vite-plugin-babel";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    string({
      include: "**/*.hbs",
    }),
<<<<<<< HEAD
    babel({
      babelConfig: {
        presets: [
          ["@babel/preset-env", { modules: false }],
          "@babel/preset-typescript",
        ],
      },
    }),
  ],
});
=======
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
>>>>>>> 72f80fa (ts conversion)
