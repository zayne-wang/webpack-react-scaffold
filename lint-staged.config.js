/**
 * @type {import("@types/lint-staged").Config}
 */

const config = {
  "**/*.json": "prettier",
  "**/*.js": ["eslint", "prettier"],
  "**/*.css": "stylelint"
};

export default config;
