import { FlatCompat } from '@eslint/eslintrc';
import pluginImport from 'eslint-plugin-import';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Enables compatibility with legacy ESLint config ("extends" style)
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Load base Next.js and TypeScript rules
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Add custom rules for import/export sorting
  {
    plugins: {
      import: pluginImport,
      'simple-import-sort': pluginSimpleImportSort,
    },
    rules: {
      // Enforce sorted imports with custom grouping
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // 1. Next.js packages (e.g. next/router, next/image)
            ['^next', '^@next'],
            // 2. React and related (react, react-dom, etc.)
            ['^react', '^@?react'],
            // 3. Other external packages
            ['^@?\\w'],
            // 4. Internal aliases (e.g. @components/, @utils/)
            ['^@/'],
            // 5. Parent imports
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // 6. Sibling imports
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // 7. Side effect imports (e.g. import './style.css')
            ['^\\u0000'],
            // 8. Style imports (e.g. .css, .scss)
            ['\\.css$', '\\.scss$'],
          ],
        },
      ],
      // Export sorting
      'simple-import-sort/exports': 'warn',

      // Optional: group/order with import/order if you also want visual structure
      'import/order': 'off', // Disable if using simple-import-sort
    },
    settings: {
      // Support TypeScript path aliases
      'import/resolver': {
        typescript: {},
      },
    },
  },
];

export default eslintConfig;
