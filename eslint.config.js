import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

/**
 * @type {import("@types/eslint").Linter.FlatConfig}
 */
const commonConfig = {
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2021,
      ...globals.node
    }
  },
  rules: {
    "no-unused-vars": "off"
  }
};

/**
 * @type {import("@types/eslint").Linter.FlatConfig}
 */
const tsconfig = {
  files: ["**/*.ts"],
  plugins: {
    "@typescript-eslint": tsPlugin
  },

  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    }
  },

  rules: {
    ...tsPlugin.configs.recommended.rules,
    "@typescript-eslint/no-unused-vars": "off"
  }
};

export default [js.configs.recommended, commonConfig, tsconfig];
