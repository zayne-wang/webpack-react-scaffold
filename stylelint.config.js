/**
 * @type {import("stylelint/types/stylelint").Config}
 */
const config = {
  fix: true,
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-recess-order",
    "stylelint-config-recommended-scss"
  ]
};

export default config;
