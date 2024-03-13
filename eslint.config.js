import js from "@eslint/js";

/**
 * @type {import("@types/eslint").Linter.FlatConfig}
 */
const config = {
  files: ["src/**/*.js"],
  rules: {
    "no-unused-vars": "off",
  },
};

export default [js.configs.recommended, config];
