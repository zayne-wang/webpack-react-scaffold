import js from "@eslint/js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

/**
 * @type {import("@types/eslint").Linter.FlatConfig}
 */
const commonConfig = {
  files: ["**/*.{js,cjs,mjs,jsx,tsx,ts}"],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2021,
      ...globals.node
    }
  },
  rules: {
    "react/prop-types": "off",
    "no-unused-vars": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};

/**
 * @type {import("@types/eslint").Linter.FlatConfig}
 */
const tsconfig = {
  files: ["**/*.{tsx,ts}"],
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
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/triple-slash-reference": "off"
  },
};

export default [js.configs.recommended, reactRecommended, reactJsxRuntime, commonConfig, tsconfig];
