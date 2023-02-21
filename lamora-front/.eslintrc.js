module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['dist', 'coverage', '**/*.spec.ts', '/*.*'],
  extends: [
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    createDefaultProgram: true,
    project: ['./tsconfig.json'],
    warnOnUnsupportedTypeScriptVersion: false,
  },
  rules: {
    'prettier/prettier': ['warn', { endOfLine: 'auto' }],
  },
  overrides: [
    {
      files: ['*.ts'],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: ['./tsconfig.json'],
        warnOnUnsupportedTypeScriptVersion: false,
        ecmaFeatures: {
          modules: true,
          experimentalObjectRestSpread: true,
        },
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        //* Angular Rules
        '@angular-eslint/component-selector': [
          'error',
          {
            prefix: 'sp',
            type: 'element',
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            prefix: 'sp',
            type: 'attribute',
            style: 'camelCase',
          },
        ],
        //* Custom Rules
        'no-var': 'error',
        'no-console': 'off',
        'padded-blocks': 'off',
        'no-multi-spaces': 'off',
        'no-empty-function': 'off',
        'no-trailing-spaces': 'off',
        'import/no-unresolved': 'off',
        'no-use-before-define': 'error',
        'class-methods-use-this': 'off',
        'no-multiple-empty-lines': 'off',
        'arrow-parens': [2, 'as-needed'],
        'block-spacing': ['error', 'never'],
        'lines-between-class-members': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-useless-constructor': 'warn',
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
        'no-use-before-define': ['error', { functions: false, classes: false }],
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {},
    },
    //* NOTE: WE ARE NOT APPLYING @ANGULAR-ESLINT/TEMPLATE IN THIS OVERRIDE, ONLY PRETTIER
    {
      files: ['*.html'],
      excludedFiles: ['*inline-template-*.component.html'],
      extends: ['plugin:prettier/recommended'],
      rules: {
        //* NOTE: WE ARE OVERRIDING THE DEFAULT CONFIG TO ALWAYS SET THE PARSER TO ANGULAR (SEE BELOW)
        'prettier/prettier': ['error', { parser: 'angular' }],
      },
    },
  ],
};
