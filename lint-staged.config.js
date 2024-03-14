/**
 * @type {import("@types/lint-staged").Config}
 */

const config = {
  "**/*.json": "prettier",
  "**/*.{ts,js,tsx,jsx}": ["eslint", "prettier"],
  "**/*.css": "stylelint"
};

export default config;
