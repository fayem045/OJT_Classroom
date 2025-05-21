import { FlatCompat } from "@eslint/eslintrc";
<<<<<<< HEAD
import * as tseslint from "@typescript-eslint/eslint-plugin";
// @ts-ignore -- no types for this plugin
import drizzle from "eslint-plugin-drizzle";

const compat = new FlatCompat();

export default [
  {
    ignores: ["**/node_modules/**", ".next/**", "dist/**"],
=======
import tseslint from "typescript-eslint";
// @ts-ignore -- no types for this plugin
import drizzle from "eslint-plugin-drizzle";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default tseslint.config(
  {
    ignores: [".next"],
>>>>>>> 5af29285aac4e7d151f054d48591d05624f3fa77
  },
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
<<<<<<< HEAD
      "@typescript-eslint": tseslint,
      drizzle: drizzle,
    },
    rules: {
      "drizzle/enforce-delete-with-where": ["error"],
      "drizzle/enforce-update-with-where": ["error"],
    },
  },
];
=======
      drizzle,
    },
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "drizzle/enforce-delete-with-where": [
        "error",
        { drizzleObjectName: ["db", "ctx.db"] },
      ],
      "drizzle/enforce-update-with-where": [
        "error",
        { drizzleObjectName: ["db", "ctx.db"] },
      ],
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
);
>>>>>>> 5af29285aac4e7d151f054d48591d05624f3fa77
