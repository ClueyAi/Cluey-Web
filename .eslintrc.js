module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "prefer-arrow-callback": "error",
    "arrow-body-style": ["error", "always"],
    "indent": ["error", 2],
    "no-var": "error",
    "no-unused-vars": "warn",
    "no-console": "warn",
  },
};
