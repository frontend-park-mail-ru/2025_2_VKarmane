import js from "@eslint/js";
import globals from "globals";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        Handlebars: "readonly",
      },
    },
  },
  {
    files: ["server/**/*.{js,mjs,cjs}", "index.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
    rules: {
      "css/use-baseline": "off",
      "css/font-family-fallbacks": "off",
    },
  },
  {
    files: ["public/templates/templates.js"],
    rules: {
      "no-unused-vars": "off"
    }
  }
]);
