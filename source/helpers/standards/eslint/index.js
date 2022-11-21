const defaultRules = {
  'no-console': process.env.NODE_ENV !== 'development' ? 'error' : 'off',
  'no-debugger': process.env.NODE_ENV !== 'development' ? 'error' : 'off',
  'prettier/prettier': 'error',
  semi: ['error', 'never'],
  'max-len': ['error', { code: 120 }],
  'no-multiple-empty-lines': 'error',
  'eol-last': ['error', 'always'],
  'no-duplicate-imports': 'error',
  'arrow-parens': ['error', 'always'],
  'no-trailing-spaces': 'error',
  'no-tabs': 'error',
  'vue/script-indent': ['error', 2, { baseIndent: 1 }],
}

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['eslint:recommended', 'prettier'],
  rules: defaultRules,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.ts', '*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      // ignorePatterns: ['*.d.ts'],
      rules: {
        ...defaultRules,
        'no-undef': 'off',
        '@typescript-eslint/ban-ts-comment': 'error',
        // Aiming to refactor projects and make this rule error later on
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
      },
    },
  ],
}
