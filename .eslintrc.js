module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
    mocha: true
  },
  extends: "eslint:recommended",
  globals: {},
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "no-prototype-builtins": "off",
    "no-console": "off",
    "require-atomic-updates": "off"
  }
};
