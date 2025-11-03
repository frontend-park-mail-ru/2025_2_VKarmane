import js from "@eslint/js";
import globals from "globals";
import css from "@eslint/css";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // --- JS ---
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: [js.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.browser,
        Handlebars: "readonly",
      },
    },
  },

  // --- Node.js ---
  {
    files: ["server/**/*.{js,mjs,cjs}", "index.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // --- CSS ---
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: [css.configs.recommended],
    rules: {
      "css/use-baseline": "off",
      "css/font-family-fallbacks": "off",
    },
  },

  // --- TS ---
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off"
    },
  },

  // --- исключения ---
  {
    files: ["src/templates/templates.js"],
    rules: {
      "no-unused-vars": "off",
    },
  },
]);
