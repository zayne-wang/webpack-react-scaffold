/**
 * @type {import("@types/lint-staged").Config}
 */

const config = {
  "**/*.json": () => "prettier --write",
  "**/*.js": () => ["eslint", "prettier --write"]
};

export default config;
