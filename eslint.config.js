import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import svelteParser from "svelte-eslint-parser";
import svelte from "eslint-plugin-svelte";
import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs["flat/recommended"],
  prettier,
  {
    ignores: [
      ".svelte-kit",
      "build",
      "dist",
      "node_modules",
      "playwright-report",
      "test-results",
      "docs",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      parser: tsParser,
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "no-undef": "off",
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".svelte"],
      },
      globals: { ...globals.browser },
    },
    rules: {
      "no-undef": "off",
    },
  },
  {
    rules: {
      "svelte/no-navigation-without-resolve": "off",
      "svelte/no-at-html-tags": "off",
    },
  },
];
