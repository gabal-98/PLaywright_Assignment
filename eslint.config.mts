import js from '@eslint/js';
import globals from 'globals';
import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores([
        'node_modules/',
        'playwright-report/',
        'test-results/',
        'results/',
        'playwright/.auth/',
        'package-lock.json',
    ]),
    {
        files: ['**/*.ts'],
        extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked],
        languageOptions: {
            globals: globals.node,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/explicit-function-return-type': [
                'error',
                { allowExpressions: true, allowTypedFunctionExpressions: true },
            ],
        },
    },
    {
        ...playwright.configs['flat/recommended'],
        files: ['tests/**/*.ts'],
    },
]);
