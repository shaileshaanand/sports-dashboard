module.exports = {
  plugins: ["prettier"],
  extends: ["mantine", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    "import/no-duplicates": "error",
    "prettier/prettier": "error",
  },
  overrides: [
    {
      files: ["**/*.{js,jsx,ts,tsx}", "postcss.config.js"],
    },
  ],
};
