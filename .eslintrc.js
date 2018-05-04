module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'no-unused-vars': ['error', { varsIgnorePattern: '^h$' }],
  },
};
