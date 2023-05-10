/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  trailingComma: "none",
  useTabs: true,
  tabWidth: 1,
  arrowParens: "always",
  bracketSpacing: true,
  insertPragma: false,
  jsxSingleQuote: true,
  singleQuote: true,
  jsxBracketSameLine: false,
  printWidth: 120,

  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tailwindConfig: "./packages/config/tailwind",
};
