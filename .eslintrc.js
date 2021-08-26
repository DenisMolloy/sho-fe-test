module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['react-app', 'react-app/jest', 'prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'import/no-anonymous-default-export': 'off',
    'no-console': 'error',
    'default-case': 'off',
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'any', prev: 'directive', next: 'directive' },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
      { blankLine: 'always', prev: ['case', 'default'], next: '*' },
    ],
  },
}
