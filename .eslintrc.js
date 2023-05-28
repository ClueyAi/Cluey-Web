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
    "no-var": "error",
    "indent": ["warn", 2],
    "no-unused-vars": "warn",
  },
};
