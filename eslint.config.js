import js from "@eslint/js";
import tseslint from "typescript-eslint";

/**
 * @type {import("@types/eslint").Linter.FlatConfig}
 */
const config = {
  files: ["**/*.{ts,js}"],

  plugins: {
    "@typescript-eslint": tseslint.plugin
  },

  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      sourceType: "module"
    }
  },

  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off"
  }
};

export default [js.configs.recommended, ...tseslint.configs.recommended, config];
